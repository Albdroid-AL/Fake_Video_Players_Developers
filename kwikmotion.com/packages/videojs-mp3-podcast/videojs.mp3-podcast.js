/*! @name videojs-mp3-podcast @version 0.0.1 @license Apache-2.0 */
'use strict';

(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? module.exports = factory(require('video.js'))
    :
    typeof define === 'function' && define.amd
      ? define(['video.js'], factory)
      :
      (global.videojsMp3PodcastPlugin = factory(global.videojs));
}(this, (function(videojs) {
  videojs = videojs && videojs.hasOwnProperty('default')
    ? videojs['default']
    : videojs;

  var version = '0.0.1';

  var classCallCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  };

  var inherits = function(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError(
        'Super expression must either be null or a function, not ' +
        typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) {
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass,
        superClass) : subClass.__proto__ = superClass;
    }
  };

  var possibleConstructorReturn = function(self, call) {
    if (!self) {
      throw new ReferenceError(
        'this hasn\'t been initialised - super() hasn\'t been called');
    }

    return call && (typeof call === 'object' || typeof call === 'function')
      ? call
      : self;
  };

  var Plugin = videojs.getPlugin('plugin');

  var Mp3PodcastPlugin = function(_Plugin) {
    inherits(Mp3PodcastPlugin, _Plugin);

    /**
     * Initializes Mp3PodcastPlugin instance.
     *
     * @param  {Player} player
     *         A Video.js Player instance.
     *
     * @param  {Object} [options]
     *         An optional options object.
     *
     *         While not a core part of the Video.js plugin architecture, a
     *         second argument of options is a convenient way to accept inputs
     *         from your plugin's caller.
     */
    function Mp3PodcastPlugin(player, options) {
      classCallCheck(this, Mp3PodcastPlugin);
      var _this = possibleConstructorReturn(this, _Plugin.call(this, player));

      var pluginConsoleName = 'podcast';

      if (options.type !== 'mp3') {
        error('Podcast settings are compatible only with {type: "mp3"}' +
          ' config.\n' +
          ' Please, add it to the plugin configuration or' +
          ' remove/comment podcast settings block (podcast: {})');
        return;
      }

      var PLAYBACK_RATE_MIN = 0.5;
      var PLAYBACK_RATE_MAX = 2;
      var PLAYBACK_RATE_STEP = 0.25;

      var HEADER_WRAPPER_CLASS = 'vjs-podcast-header';
      var BUTTONS_WRAPPER_CLASS = 'vjs-podcast-buttons';

      // FIELDS

      // <audio> element
      var audioElement = player.el().querySelector('audio');
      var audio = options.file;

      // get <audio> wrapper
      var audioWrapper = audioElement.parentElement;

      var audioDownloadName = setFieldData({ audioDownloadName: options.audioDownloadName });
      var defaultPlaybackRate = parseFloat(setFieldData({ defaultPlaybackRate: options.defaultPlaybackRate }));
      if (!defaultPlaybackRate || defaultPlaybackRate < PLAYBACK_RATE_MIN || defaultPlaybackRate > PLAYBACK_RATE_MAX) {
        defaultPlaybackRate = defaultPodcastValues().defaultPlaybackRate;
      }
      var direction = setFieldData({ direction: options.direction });
      var downloadButtonText = setFieldData({ downloadButtonText: options.downloadButtonText });
      var enableDownload = setFieldData({ enableDownload: options.enableDownload });
      var enableShare = setFieldData({ enableShare: options.enableShare });
      var enableSpeed = setFieldData({ enableSpeed: options.enableSpeed });
      var poweredByLink = setFieldData({ poweredByLink: options.poweredByLink });
      var poweredByLogo = setFieldData({ poweredByLogo: options.poweredByLogo });
      var poweredByTitle = setFieldData({ poweredByTitle: options.poweredByTitle });
      var progressHolderColor = setFieldData({ progressHolderColor: options.progressHolderColor });
      var shareButtonText = setFieldData({ shareButtonText: options.shareButtonText });
      var showConfigPrompt = setFieldData({ showConfigPrompt: options.showConfigPrompt });
      var speedButtonText = setFieldData({ speedButtonText: options.speedButtonText });
      var themeColor = setFieldData({ themeColor: options.themeColor });
      var title = setFieldData({ title: options.title });
      var transparentBackground = setFieldData({ transparentBackground: options.transparentBackground });
      var volumeControl = setFieldData({ volumeControl: options.volumeControl });
      var waveBasedOnAudioBuffer = setFieldData({ waveBasedOnAudioBuffer: options.waveBasedOnAudioBuffer });

      showConfigCard('left', 'User config');

      player.options().podcast = Object.assign({},
        player.options().podcast,
        { audioDownloadName: audioDownloadName },
        { defaultPlaybackRate: defaultPlaybackRate },
        { direction: direction },
        { downloadButtonText: downloadButtonText },
        { enableDownload: enableDownload },
        { enableShare: enableShare },
        { enableSpeed: enableSpeed },
        { poweredByLink: poweredByLink },
        { poweredByLogo: poweredByLogo },
        { poweredByTitle: poweredByTitle },
        { progressHolderColor: progressHolderColor },
        { shareButtonText: shareButtonText },
        { showConfigPrompt: showConfigPrompt },
        { speedButtonText: speedButtonText },
        { themeColor: themeColor },
        { title: title },
        { transparentBackground: transparentBackground },
        { volumeControl: volumeControl },
        { waveBasedOnAudioBuffer: waveBasedOnAudioBuffer },
      );

      showConfigCard('right', 'Final config');

      debug(Object.assign({}, {
        str: 'Configured with params: ',
        obj: player.options().podcast
      }));

      if (!audioElement) {
        audioElement.addEventListener('load', podcastLogic);
      } else {
        podcastLogic();
      }

      // METHODS

      /**
       * Main plugin logic implementation.
       */
      function podcastLogic() {
        // change default playback rate
        audioElement.playbackRate = defaultPlaybackRate;

        // change videojs defaults
        applyInitialStyles();

        // apply direction
        applyControlDirection();

        // implement canvas' logic
        createMp3Visualization();

        // wrapper for audioWrapper,
        // needed in case of switched buttons or title/powered by
        var audioSuperWrapper;

        // add title or 'powered by' if they are enabled
        if (title || poweredByTitle || poweredByLogo) {
          audioSuperWrapper = wrapAudioWrapperWithDiv();
          var headerWrapper = document.createElement('DIV');
          headerWrapper.classList.add(HEADER_WRAPPER_CLASS);
          headerWrapper.setAttribute('dir', direction);
          audioWrapper.insertBefore(headerWrapper, audioElement);
          addTitle();
          addPoweredBy();
        }

        // add buttons if any are enabled
        if (enableDownload || enableSpeed || enableShare) {
          // if title or 'powered by' were not enabled and
          // there's nor wrapper yet
          if (!audioSuperWrapper) {
            audioSuperWrapper = wrapAudioWrapperWithDiv();
          }

          var buttonsWrapper = document.createElement('DIV');
          buttonsWrapper.classList.add(BUTTONS_WRAPPER_CLASS);
          buttonsWrapper.setAttribute('dir', direction);
          audioWrapper.appendChild(buttonsWrapper);
          if (enableDownload) {
            addButton(downloadButtonText, 'download', 3);
          }
          if (enableSpeed) {
            addButton(getFullSpeedButtonText(), 'speed', 2);
          }
          if (enableShare) {
            addButton(shareButtonText, 'share', 1);
          }
        }
      }

      /**
       * Applies style changes to the player.
       */
      function applyInitialStyles() {
        // add css class
        audioWrapper.classList.add('vjs-podcast');
        if (transparentBackground) {
          audioWrapper.classList.add('vjs-podcast_bg_transparent');
          // if (showConfigPrompt) {
          //   audioWrapper.style.backgroundColor = 'black';
          // }
        }

        // apply theme color
        var elementsWithBG = audioWrapper.querySelectorAll(
          'button, .vjs-play-progress, .vjs-time-tooltip');
        for (var i = 0; i < elementsWithBG.length; i++) {
          elementsWithBG[i].style.backgroundColor = themeColor;
        }
        var timeTooltip = audioWrapper.querySelector('.vjs-time-tooltip');
        timeTooltip
          ? timeTooltip.style.backgroundColor = themeColor
          : '';
        var caretTimeTooltip = audioWrapper.querySelector(
          '.vjs-mouse-display .vjs-time-tooltip');
        caretTimeTooltip
          ? caretTimeTooltip.style.color = themeColor
          : '';
      }

      /**
       * Applies direction attribute for control bar of podcast player.
       */
      function applyControlDirection() {
        if (direction === 'rtl') {
          var controlBar = audioWrapper.querySelector('.vjs-control-bar');
          if (controlBar) {
            controlBar.setAttribute('dir', direction);
          }

          var progressControl = audioWrapper.querySelector('.vjs-progress-control');
          var progressControlCopy = progressControl.cloneNode(true);
          progressControl.parentNode.replaceChild(progressControlCopy, progressControl);

          var currentTimeTooltipWrapper = controlBar.querySelector('.vjs-play-progress');
          if (currentTimeTooltipWrapper) {
            var currentTimeTooltip = currentTimeTooltipWrapper.querySelector('.vjs-time-tooltip');
            if (currentTimeTooltip) {
              currentTimeTooltip.innerHTML = '0:00';
              currentTimeTooltip.classList.add('vjs-time-tooltip_rtl');
              player.on('timeupdate', function() {
                currentTimeTooltip.innerHTML = printTime(player.currentTime());
                var filled = getWidthForDefinedTime(player.currentTime()) + 'px';
                currentTimeTooltip.style.right = filled;
                currentTimeTooltipWrapper.style.width = filled;
              });
            }
          }

          var pointerTimeTooltipWrapper = controlBar.querySelector('.vjs-mouse-display');
          if (pointerTimeTooltipWrapper) {
            var pointerTimeTooltip = pointerTimeTooltipWrapper.querySelector('.vjs-time-tooltip');
            if (pointerTimeTooltip) {
              pointerTimeTooltip.innerHTML = '0:00';
              pointerTimeTooltip.classList.add('vjs-time-tooltip_rtl');

              progressControlCopy.addEventListener('mousemove', function(event) {
                pointerTimeTooltip.innerHTML = printTime(getTimeUnderPointer(event));
                pointerTimeTooltipWrapper.style.right = getWidthForDefinedTime(
                  getTimeUnderPointer(event)) + 'px';
              });
            }
          }

          progressControlCopy.addEventListener('mousedown', function(event) {
            player.currentTime(getTimeUnderPointer(event));
          });
          progressControlCopy.addEventListener('touchstart', function(event) {
            player.currentTime(getTimeUnderPointer(event));
          });
        }
      }

      /**
       * Returns seconds in human time format.
       * @param seconds     Raw seconds.
       * @returns {string}  Result.
       */
      function printTime(seconds) {
        if (seconds < 60) {
          return '0:' + addZerosIfNecessary(parseInt(seconds, 10));
        } else if (seconds < 3600) {
          return addZerosIfNecessary(parseInt(seconds / 60, 10)) + ':' +
            addZerosIfNecessary(parseInt(seconds % 60, 10));
        } else {
          return parseInt(seconds / 3600, 10) + ':' +
            addZerosIfNecessary(parseInt(parseInt(seconds % 3600, 10) / 60, 10)) + ':' +
            addZerosIfNecessary(parseInt(parseInt(seconds % 3600, 10) % 60, 10));
        }
      }

      /**
       * Adds 0 before digit less than 10.
       * @param seconds     Digit to convert.
       * @returns {string}  Result of conversion.
       */
      function addZerosIfNecessary(seconds) {
        if (seconds < 10) {
          return '0' + seconds;
        }
        return seconds.toString();
      }

      /**
       * Returns seconds of progress bar that are supposed to be under user's cursor.
       * @param event
       * @returns {number}
       */
      function getTimeUnderPointer(event) {
        var progressControl = audioWrapper.querySelector('.vjs-progress-control');
        if (progressControl) {
          var fullWidth = progressControl.offsetWidth;
          var fullTime = player.duration();
          var pageX = event.pageX ? event.pageX : event.targetTouches[0].pageX;
          var cursorPositionX = pageX - progressControl.getBoundingClientRect().left;
          if (direction === 'ltr') {
            return (cursorPositionX * fullTime) / fullWidth;
          } else {
            return fullTime - (cursorPositionX * fullTime) / fullWidth;
          }
        }
      }

      /**
       * Returns width of progress bar for defined current seconds.
       * @param seconds
       * @returns {number}
       */
      function getWidthForDefinedTime(seconds) {
        var progressControl = audioWrapper.querySelector('.vjs-progress-control');
        if (progressControl) {
          var fullWidth = progressControl.offsetWidth;
          var fullTime = player.duration();
          return (fullWidth * seconds) / fullTime;
        }
      }

      /**
       * Creates canvas with the mp3 curve upon the progress bar.
       */
      function createMp3Visualization() {
        // build visualization using random array
        if (!bowser.msie && !waveBasedOnAudioBuffer) {
          if (isValidURL(audio)) {
            audioWrapper.classList.add('vjs-podcast-visualization');

            var i = 0;

            function visualizeUsingRandomValues() {
              if (audioWrapper.getBoundingClientRect().width) {
                debug('Building random visualization...');

                var numberOfSamples = getNumberOfSamples();

                var arrayWithRandomValues = [];
                for (var j = 0; j < numberOfSamples; j++) {
                  arrayWithRandomValues.push(Math.random());
                }

                draw(arrayWithRandomValues, false);
                draw(arrayWithRandomValues, true);

                debug('Visualisation built.');
              } else if (i < 50) {
                setTimeout(function() {
                  i++;
                  visualizeUsingRandomValues();
                }, 50);
              }
            }

            visualizeUsingRandomValues();
          } else {
            audioWrapper.classList.add('vjs-podcast-no-visualization');
            error('Error while building a visualization.');
          }
        }

        // build visualization using audio buffer array
        if (!bowser.msie && waveBasedOnAudioBuffer) {
          // Set up audio context
          // p.s. Safari has implemented AudioContext as webkitAudioContext
          var audioContext = !bowser.safari
            ? new window.AudioContext()
            : new window.webkitAudioContext();

          if (isValidURL(audio)) {
            fetch(audio)
              .then(function(response) {
                return response.arrayBuffer();
              })
              .then(function(arrayBuffer) {
                return !bowser.safari
                  ? audioContext.decodeAudioData(arrayBuffer)
                  : new Promise(function(resolve, reject) {
                    audioContext.decodeAudioData(arrayBuffer, function(buffer) {
                      resolve(buffer);
                    }, function(e) {
                      reject(e);
                    });
                  });
              })
              .then(function(audioBuffer) {
                return visualizeUsingAudioBuffer(audioBuffer);
              })
              .catch(function(e) {
                audioWrapper.classList.add('vjs-podcast-no-visualization');
                error('Error while building a visualization.');
                console.log(e);
              });
          } else {
            var arrayBuffer = audio.arrayBuffer();
            var audioBuffer = audioContext.decodeAudioData(arrayBuffer);
            visualizeUsingAudioBuffer(audioBuffer);
          }
        }

        if (bowser.msie) {
          audioWrapper.classList.add('vjs-podcast-no-visualization');
        }

        function visualizeUsingAudioBuffer(audioBuffer) {
          debug('Data was loaded. Starting to build a visualization...');
          audioWrapper.classList.add('vjs-podcast-visualization');
          draw(normalizeData(filterData(audioBuffer)), false);
          draw(normalizeData(filterData(audioBuffer)), true);
          debug('Visualisation built.');
        }

        function filterData(audioBuffer) {
          // We only need to work with one channel of data
          var rawData = audioBuffer.getChannelData(0);
          // Number of samples we want to have in our final data set
          var samples = getNumberOfSamples();

          var blockSize = Math.floor(rawData.length / samples); // Number of samples in each
                                                                // subdivision
          var filteredData = [];
          for (var i = 0; i < samples; i++) {
            var blockStart = blockSize * i; // the location of the first sample in the block
            var sum = 0;
            for (var j = 0; j < blockSize; j++) {
              sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in
                                                             // the block
            }
            filteredData.push(sum / blockSize); // divide the sum by the block size to get the
                                                // average
          }
          return filteredData;
        }

        function normalizeData(filteredData) {

          // IE polyfills (to replace array ... operator)

          function _toConsumableArray(arr) {
            return _arrayWithoutHoles(arr) || _iterableToArray(arr) ||
              _unsupportedIterableToArray(arr) ||
              _nonIterableSpread();
          }

          function _nonIterableSpread() {
            throw new TypeError(
              'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
          }

          function _unsupportedIterableToArray(o, minLen) {
            if (!o) {
              return;
            }
            if (typeof o === 'string') {
              return _arrayLikeToArray(o, minLen);
            }
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === 'Object' && o.constructor) {
              n = o.constructor.name;
            }
            if (n === 'Map' || n === 'Set') {
              return Array.from(o);
            }
            if (n === 'Arguments' ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
              return _arrayLikeToArray(o,
                minLen);
            }
          }

          function _iterableToArray(iter) {
            if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(iter)) {
              return Array.from(
                iter);
            }
          }

          function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr)) {
              return _arrayLikeToArray(arr);
            }
          }

          function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) {
              len = arr.length;
            }
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          }

          // Logic itself

          var multiplier = Math.pow(Math.max.apply(Math, _toConsumableArray(filteredData)), -1);
          return filteredData.map(function(n) {
            return n * multiplier;
          });
        }

        function getNumberOfSamples() {
          var numberOfSamples = 200;
          var wrapperWidth = audioWrapper.getBoundingClientRect().width;

          if (wrapperWidth <= 1440) {
            numberOfSamples = 180;
          }
          if (wrapperWidth <= 1100) {
            numberOfSamples = 150;
          }
          if (wrapperWidth <= 850) {
            numberOfSamples = 120;
          }
          if (wrapperWidth <= 700) {
            numberOfSamples = 85;
          }
          if (wrapperWidth <= 425) {
            numberOfSamples = 65;
          }
          if (wrapperWidth <= 300) {
            numberOfSamples = 45;
          }
          return numberOfSamples;
        }

        function draw(audioBuffer, isProgressLine) {
          // create canvas
          var progressHolder = audioWrapper.querySelector('.vjs-progress-holder');
          var canvas = document.createElement('CANVAS');

          var wrapper = audioWrapper.querySelector('.vjs-mp3-canvas-wrapper');
          wrapper = document.createElement('DIV');
          wrapper.classList.add('vjs-mp3-canvas-wrapper');
          progressHolder.appendChild(wrapper);

          canvas.classList.add('vjs-mp3-canvas');

          if (isProgressLine) {
            wrapper.style.width = '0';
            var nativeProgressBar = audioWrapper.querySelector('.vjs-play-progress');
            if (nativeProgressBar) {
              player.on('timeupdate', function() {
                wrapper.style.width = getWidthForDefinedTime(player.currentTime()) + 'px';
              });
            }
          } else {
            canvas.classList.add('vjs-mp3-canvas_bg');
          }
          wrapper.append(canvas);

          // var dpr = window.devicePixelRatio || 1;
          var dpr = 1;

          var padding = 8;
          if (isProgressLine) {
            var bgCanvas = audioWrapper.querySelector('.vjs-mp3-canvas_bg');
            canvas.width = bgCanvas.width;
            canvas.style.width = bgCanvas.width + 'px';
            canvas.height = bgCanvas.height;
            window.addEventListener('resize', function() {
              canvas.style.width = bgCanvas.offsetWidth + 'px';
            });
          } else {
            canvas.width = canvas.offsetWidth * dpr;
            canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
          }
          var ctx = canvas.getContext('2d');
          ctx.scale(dpr, dpr);
          ctx.translate(0, canvas.offsetHeight / 2 + padding); // Set Y = 0 to be in the middle of
                                                               // the canvas

          // draw the line segments
          var width = canvas.offsetWidth / audioBuffer.length;
          for (var i = 0; i < audioBuffer.length; i++) {
            var x = width * i;
            var height = audioBuffer[i] * canvas.offsetHeight - padding;
            if (height < 0) {
              height = 0;
            } else if (height > canvas.offsetHeight / 2) {
              height = height > canvas.offsetHeight / 2;
            }

            var lineColor = progressHolderColor;
            if (isProgressLine) {
              lineColor = themeColor;
            }
            drawLineSegment(ctx, x, height, width, (i + 1) % 2, lineColor);
          }

          if (!transparentBackground) {
            // revert colors of the canvas
            ctx.globalCompositeOperation = 'xor';
            ctx.fillStyle = 'white';
          } else {
            ctx.fillStyle = 'transparent';
          }

          ctx.fillRect(0, -canvas.height / 2, canvas.width, canvas.height);
        }

        function drawLineSegment(ctx, x, y, width, isEven, lineColor) {
          ctx.lineWidth = bowser.mobile ? 2 : 2.5; // how thick the line is
          ctx.strokeStyle = lineColor;  // what color our line is
          ctx.beginPath();
          y = isEven ? y : -y;
          ctx.moveTo(x, 0);
          ctx.lineTo(x, y);
          ctx.arc(x + width / 2, y, width / 2, Math.PI, 0, isEven);
          ctx.lineTo(x + width, 0);
          ctx.stroke();
        }
      }

      /**
       * Creates a wrapper for audioWrapper (for comfy adding of title and buttons divs).
       * @return {HTMLElement}  New wrapper for audioWrapper.
       */
      function wrapAudioWrapperWithDiv() {
        // get audioWrapper current wrapper
        var audioGrandpa = audioWrapper.parentElement;
        // create our future wrapper
        var audioSuperWrapper = document.createElement('DIV');
        // and add it to a new wrapper
        audioSuperWrapper.classList.add('divPlayer_itwplayer-dimensions');
        // place new wrapper inside of the old one
        audioGrandpa.appendChild(audioSuperWrapper);
        // move audioWrapper to a new wrapper
        audioSuperWrapper.appendChild(audioWrapper);

        return audioSuperWrapper;
      }

      /**
       * Adds 'Title' to the header wrapper (must be created earlier).
       */
      function addTitle() {
        var wrapper = document.querySelector('.' + HEADER_WRAPPER_CLASS);
        var titleDiv = document.createElement('DIV');
        if (title) {
          titleDiv.innerText = title;
          titleDiv.style.color = themeColor;
        }
        wrapper.appendChild(titleDiv);
      }

      /**
       * Adds 'Powered By' to the header wrapper (must be created earlier).
       */
      function addPoweredBy() {
        if (poweredByTitle || poweredByLogo) {
          var wrapper = document.querySelector('.' + HEADER_WRAPPER_CLASS);
          var poweredBy = document.createElement('A');
          poweredBy.style.color = themeColor;
          if (poweredByLogo) {
            var img = document.createElement('IMG');
            img.src = poweredByLogo;
            img.alt = poweredByTitle ? poweredByTitle : '';
            poweredBy.appendChild(img);
          } else if (poweredByTitle) {
            poweredBy.innerText = poweredByTitle;
          }

          if (poweredByLink) {
            poweredBy.href = poweredByLink;
            poweredBy.style.cursor = 'pointer';
          }
          wrapper.appendChild(poweredBy);
        }
      }

      /**
       * Adds a new button to the buttons' wrapper (must be created earlier).
       * @param {string} text    Text to appear on the button.
       * @param {string} action  Type of action that should be fired on button's click event.
       * @param {number} order   Order # inside of the flex wrapper that a new button will have.
       */
      function addButton(text, action, order) {
        var wrapper = document.querySelector('.' + BUTTONS_WRAPPER_CLASS);
        var button;
        button = document.createElement('BUTTON');
        button.innerText = text;
        button.style.borderColor = themeColor;
        button.style.color = themeColor;
        if (order) {
          button.style.order = order;
        }
        wrapper.appendChild(button);
        button.addEventListener('click', function(e) {
          e.preventDefault();
          switch (action) {
          case 'download':
            downloadAudio();
            break;
          case 'speed':
            changePlaybackRate(button);
            break;
          case 'share':
            clickShareButton();
            break;
          default:
            break;
          }
        });
      }

      /**
       * Initializes audio download.
       */
      function downloadAudio() {
        debug('Download initialized...');

        var xhr = new XMLHttpRequest();
        xhr.open('GET', audio);
        xhr.responseType = 'blob';

        xhr.onload = function() {
          if (xhr.status === 200) {
            var a = document.createElement('a');
            // a workaround for IE, so that it doesn't complain about blob format
            var blob = new Blob([xhr.response], { type: 'audio/mpeg' });
            if (bowser.msie) {
              window.navigator.msSaveBlob(blob, audioDownloadName);
            } else {
              // logic for other browsers
              a.href = window.URL.createObjectURL(blob);
              a.download = audioDownloadName;
              a.style.display = 'none';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }
          }
        };
        xhr.onprogress = function(event) {
          if (event.lengthComputable) {
            debug(Math.round(event.loaded * 100 / event.total) + '/100 completed!');
          } else {
            // if there's no Content-Length header
            debug(event.loaded + ' bytes were received ;)');
          }
        };
        xhr.onerror = function() {
          error('Couldn\'t download the audio.');
        };

        xhr.send();
      }

      /**
       * Changes audio speed (its playback rate).
       * @param {HTMLElement} button  Button that fired click event with 'speed' action.
       */
      function changePlaybackRate(button) {
        if (defaultPlaybackRate + PLAYBACK_RATE_STEP <= PLAYBACK_RATE_MAX) {
          defaultPlaybackRate += PLAYBACK_RATE_STEP;
        } else {
          defaultPlaybackRate = PLAYBACK_RATE_MIN;
        }
        audioElement.playbackRate = defaultPlaybackRate;
        button.innerText = getFullSpeedButtonText();
      }

      /**
       * Returns Speed button text.
       * @returns {string}  Formatted text with special '×' sign.
       */
      function getFullSpeedButtonText() {
        return speedButtonText
          ? speedButtonText + ' ×' + defaultPlaybackRate
          : '×' + defaultPlaybackRate;
      }

      /**
       * Simulates click on the Share button.
       */
      function clickShareButton() {
        var shareButton = audioWrapper.querySelector('.vjs-control-bar button[title=Share]');
        shareButton.click();
      }

      /**
       * Checks if a string passed as param is a correct URL.
       * @param {string} str  Audio file URL to be checked.
       * @returns {boolean}
       */
      function isValidURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
      }

      /**
       * Default values used by plugin.
       * @returns {{defaultPlaybackRate: number, enableDownload: boolean, audioDownloadName:
       *   string, speedButtonText: string, themeColor: string, downloadButtonText: string,
       *   enableShare: boolean, enableSpeed: boolean}}
       */
      function defaultPodcastValues() {
        return {
          audioDownloadName: 'podcast.mp3',
          defaultPlaybackRate: 1.0,
          direction: 'ltr',
          downloadButtonText: 'Download',
          enableDownload: false,
          enableShare: false,
          enableSpeed: false,
          poweredByLink: '',
          poweredByLogo: '',
          poweredByTitle: '',
          progressHolderColor: 'gray',
          shareButtonText: 'Share',
          showConfigPrompt: false,
          speedButtonText: 'Speed',
          themeColor: '#19bc9c',
          title: '',
          transparentBackground: false,
          volumeControl: false,
          waveBasedOnAudioBuffer: false
        };
      }

      /**
       * Sets fields from player configuration if possible,
       * otherwise sets field from the default podcast config.
       * @param {Object} actualData   Specific field from Plugin configuration passed by user.
       * @returns {*}                 Correct config for Plugin specific field taken from
       *                              user's config or from default values.
       */
      function setFieldData(actualData) {
        var fieldName = Object.keys(actualData)[0];
        var actualValue = actualData[fieldName];
        if (typeof actualValue !== 'undefined' &&
          // allow no text for speed button
          (actualValue !== '' || fieldName === 'speedButtonText')) {
          return actualValue;
        } else {
          return defaultPodcastValues()[fieldName];
        }
      }

      /**
       * Draws config from player.options().podcast in the screen.
       * @param {String} side Screen side where to draw a card.
       * @param {String} msg  Card's title.
       */
      function showConfigCard(side, msg) {
        if (showConfigPrompt) {
          var wrapper = document.createElement('CODE');
          wrapper.classList.add('config-prompt');
          wrapper.style[side] = '10px';
          var text = msg + '<br><br><strong>podcast:</strong> {';
          var keys = Object.keys(player.options().podcast);
          for (var i = 0; i < keys.length; i++) {
            text = text + '<span><strong>' + keys[i] + ':</strong> '
              + (typeof player.options().podcast[keys[i]] === 'string'
                  ? '"' + player.options().podcast[keys[i]] + '"'
                  : player.options().podcast[keys[i]]
              )
              + ',</span>';
          }
          text = text + '}';
          wrapper.innerHTML = text;
          audioWrapper.appendChild(wrapper);
        }
      }

      /**
       * Prints console messages with the selected color.
       * @param {string | Object} msg   Message to be console logged.
       * @param {?string} color         Color to be used for the print.
       */
      function debug(msg) {

        var color = arguments.length > 1 && arguments[1] !== undefined
          ? arguments[1]
          : 'hotpink';

        function colorPrint(str) {
          console.log('%c['.concat(pluginConsoleName).concat('] ').concat(str),
            'color:'.concat(color, '; font-weight: bold'));
        }

        if (options.debug) {
          if (typeof msg === 'string') {
            colorPrint(msg);
          } else {
            colorPrint(msg.str);
            console.log(msg.obj);
          }
        }
      }

      /**
       * Prints errors to console.
       * @param {string} msg  Error to be console logged.
       */
      function error(msg) {
        console.error('['.concat(pluginConsoleName).concat('] ').concat(msg));
      }

      return _this;
    }

    return Mp3PodcastPlugin;
  }(Plugin);

  Mp3PodcastPlugin.VERSION = '0.0.1';

  videojs.registerPlugin('mp3Podcast', Mp3PodcastPlugin);

  return Mp3PodcastPlugin;

})));
