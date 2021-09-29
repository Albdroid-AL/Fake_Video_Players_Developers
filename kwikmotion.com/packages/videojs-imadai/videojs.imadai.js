/*! @name videojs-imadai @version 0.0.1 @license Apache-2.0 */
'use strict';

(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
      ? module.exports = factory(require('video.js'))
      :
      typeof define === 'function' && define.amd
          ? define(['video.js'], factory)
          :
          (global.videojsImaDaiPlugin = factory(global.videojs));
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
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass,
        superClass) : subClass.__proto__ = superClass;
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

  var ImaDaiPlugin = function(_Plugin) {
    inherits(ImaDaiPlugin, _Plugin);

    /**
     * Initializes ImaDaiPlugin instance.
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
    function ImaDaiPlugin(player, options) {
      classCallCheck(this, ImaDaiPlugin);
      var _this = possibleConstructorReturn(this, _Plugin.call(this, player));

      // FIELDS
      var live = (!(typeof options.live === 'undefined' || !options.live));
      live = setFieldData({live: options.live});
      var urlJump = setFieldData({urlJump: options.urlJump});
      var backupStream = setFieldData({backupStream: options.backupStream});
      var apiKey = setFieldData({apiKey: options.apiKey});
      var assetKey, cmsId, videoId;
      if (live) {
        assetKey = setFieldData({assetKey: options.assetKey});
      } else {
        cmsId = setFieldData({cmsId: options.cmsId});
        videoId = setFieldData({videoId: options.videoId});
      }

      player.options().imadai = Object.assign({},
          player.options().imadai,
          {live: live},
          {urlJump: urlJump},
          {backupStream: backupStream},
          {apiKey: apiKey},
          {assetKey: assetKey},
          {cmsId: cmsId},
          {videoId: videoId}
      );

      debug(Object.assign({}, {
        str: 'Configured with params: ',
        obj: player.options().imadai
      }));

      // Video element
      var videoElement = player.el().querySelector('video');
      // Click element
      var clickElement;

      if (!videoElement) {
        videoElement.addEventListener('load', imadaiLogic);
      } else {
        imadaiLogic();
      }

      var isIos = bowser.ios || bowser.safari || bowser.mac;

      // StreamManager which will be used to request ad-enabled streams.
      // var streamManager = null;
      // _this.streamManager;

      // METHODS
      /**
       * Main plugin logic implementation.
       */
      function imadaiLogic() {
        clickElement = createClickElement();
        initStreamManager();
        if (!live) requestVODStream();
        else requestLiveStream();
      }

      /**
       * Default DAI settings.
       * May be used in a test mode or when the non-required fields are not set.
       * @returns {{vodFields: {apiKey: string, backupStream: string, urlJump: boolean, live: boolean, required: {cmsId: string, videoId: string}}} & {liveFields: {apiKey: string, backupStream: string, urlJump: boolean, required: {live: boolean, assetKey: string}}}}
       */
      function defaultDaiValues() {
        // This stream will be played if ad-enabled playback fails
        var BACKUP_STREAM =
            'http://storage.googleapis.com/testtopbox-public/video_content/bbb/' +
            'master.m3u8';
        var vodFields = {
          live: false,
          // This stream will be played if ad-enabled playback fails
          backupStream: BACKUP_STREAM,
          // VOD API key
          apiKey: '',
          // Flag that indicates whether URL jumps are allowed (on video tap
          // during an ad play)
          urlJump: true,
          // Fields that are required if not in a test mode (mode: 'test')
          required: {
            // VOD content source id
            cmsId: '2528370',
            // VOD video ID
            videoId: 'tears-of-steel'
          }
        };
        var liveFields = {
          // This stream will be played if ad-enabled playback fails
          backupStream: BACKUP_STREAM,
          // Live API key
          apiKey: '',
          // Flag that indicates whether URL jumps are allowed (on video tap
          // during an ad play)
          urlJump: true,
          // Fields that are required if not in a test mode (mode: 'test')
          required: {
            live: true,
            // Live stream asset key
            assetKey: 'sN_IYUG8STe1ZzhIIE_ksA'
          }
        };
        return Object.assign({}, {vodFields: vodFields},
            {liveFields: liveFields});
      }

      /**
       * Sets fields from player configuration if possible,
       * otherwise sets field from the default DAI config.
       * @param actualData
       * @returns {*}
       */
      function setFieldData(actualData) {
        var fieldName = Object.keys(actualData)[0];
        var actualValue = actualData[fieldName];
        if (typeof actualValue !== 'undefined' && actualValue !== '') {
          return actualValue;
        } else {
          if (options.mode && options.mode === 'test') {
            if (live) {
              return typeof defaultDaiValues().liveFields[fieldName] !==
              'undefined'
                  ? defaultDaiValues().liveFields[fieldName]
                  : defaultDaiValues().liveFields.required[fieldName];
            } else {
              return typeof defaultDaiValues().vodFields[fieldName] !==
              'undefined'
                  ? defaultDaiValues().vodFields[fieldName]
                  : defaultDaiValues().vodFields.required[fieldName];
            }
          } else {
            var defaultValue = live
                ? defaultDaiValues().liveFields[fieldName]
                : defaultDaiValues().vodFields[fieldName];
            if (typeof defaultValue !== 'undefined') {
              return defaultValue;
            } else {
              error('Necessary data was not provided: '.concat(fieldName));
              return null;
            }
          }
        }
      }

      /**
       * Creates clickElement layer over the video layer.
       * @returns {HTMLElement|null}
       */
      function createClickElement() {
        if (urlJump) {
          var outerDiv = document.getElementById(options.outerId);

          var wrapperDiv = document.createElement('DIV');
          var id = 'daiWrapper';
          wrapperDiv.id = id;
          wrapperDiv.style.position = 'relative';
          outerDiv.appendChild(wrapperDiv);

          wrapperDiv = document.getElementById(id);
          var upperSibling = wrapperDiv.previousSibling;
          wrapperDiv.style.width = '100%';
          wrapperDiv.style.height = outerDiv.offsetHeight + 'px';
          upperSibling.style.position = 'absolute';
          wrapperDiv.appendChild(upperSibling);

          id = 'daiClickElement';
          var divClick = document.createElement('DIV');
          divClick.id = id;
          divClick.style.display = 'none';
          divClick.style.width = '100%';
          divClick.style.height = outerDiv.offsetHeight + 'px';
          divClick.style.cursor = 'pointer';
          divClick.style.position = 'absolute';
          wrapperDiv.appendChild(divClick);
          return document.getElementById(id);
        } else {
          return null;
        }
      }

      /**
       * StreamManager initialization.
       */
      function initStreamManager() {
        _this.streamManager = new google.ima.dai.api.StreamManager(
            videoElement);
        _this.streamManager.setClickElement(clickElement);
        _this.streamManager.addEventListener(
            [
              google.ima.dai.api.StreamEvent.Type.LOADED,
              google.ima.dai.api.StreamEvent.Type.ERROR,
              google.ima.dai.api.StreamEvent.Type.AD_BREAK_STARTED,
              google.ima.dai.api.StreamEvent.Type.AD_BREAK_ENDED,
              google.ima.dai.api.StreamEvent.Type.CLICK,
              google.ima.dai.api.StreamEvent.Type.STARTED
            ],
            onStreamEvent, false);

        if (!isIos) {
          // Add metadata listener. Only used in LIVE streams. Timed metadata
          // is handled differently by different video players, and the IMA SDK provides
          // two ways to pass in metadata, StreamManager.processMetadata() and
          // StreamManager.onTimedMetadata().
          //
          // Use StreamManager.onTimedMetadata() if your video player parses
          // the metadata itself.
          // Use StreamManager.processMetadata() if your video player provides raw
          // ID3 tags, as with hls.js.
          player.tech_.on('hlsManifestParsed', function(event, data) {
            if (_this.streamManager && data) {
              // For each ID3 tag in our metadata, we pass in the type - ID3, the
              // tag data (a byte array), and the presentation timestamp (PTS).
              data.samples.forEach(function(sample) {
                _this.streamManager.processMetadata('ID3', sample.data,
                    sample.pts);
              });
            }
          });
        }

        _this.daiAdIsPlaying = false;

        debug('Initialized.');
      }

      /**
       * Requests a VOD stream with ads.
       */
      function requestVODStream() {
        var streamRequest = new google.ima.dai.api.VODStreamRequest();
        streamRequest.contentSourceId = cmsId;
        streamRequest.videoId = videoId;
        streamRequest.apiKey = apiKey;
        _this.streamManager.requestStream(streamRequest);
      }

      /**
       * Requests a Live stream with ads.
       */
      function requestLiveStream() {
        var streamRequest = new google.ima.dai.api.LiveStreamRequest();
        streamRequest.assetKey = assetKey;
        streamRequest.apiKey = apiKey;
        _this.streamManager.requestStream(streamRequest);
      }

      /**
       * Responds to a stream event.
       * @param  {StreamEvent} e
       */
      function onStreamEvent(e) {
        switch (e.type) {
          case google.ima.dai.api.StreamEvent.Type.LOADED:
            debug('Stream loaded.');
            loadStream(e.getStreamData());
            break;
          case google.ima.dai.api.StreamEvent.Type.ERROR:
            error('Error loading stream, playing backup stream: '.concat(live
                ? defaultDaiValues().liveFields.backupStream
                : defaultDaiValues().vodFields.backupStream));
            player.controls(true);
            if (clickElement) clickElement.style.display = 'none';
            _this.daiAdIsPlaying = false;
            player.src(backupStream);
            break;
          case google.ima.dai.api.StreamEvent.Type.AD_BREAK_STARTED:
            var logic = function() {
              debug('Ad Break Started');
              player.controls(false);
              if (clickElement) clickElement.style.display = 'block';
              // next flag will be used to hide 'bigpausebutton' with controls (+-15s)
              // that can allow user to skip ads (see videojs-bigpausebutton.js)
              _this.daiAdIsPlaying = true;
            };
            player.one('timeupdate', logic);

            break;
          case google.ima.dai.api.StreamEvent.Type.AD_BREAK_ENDED:
            debug('Ad Break Ended');
            player.controls(true);
            if (clickElement) clickElement.style.display = 'none';
            _this.daiAdIsPlaying = false;
            break;
          case google.ima.dai.api.StreamEvent.Type.CLICK:
            debug('URL jump!');
            break;
          case  google.ima.dai.api.StreamEvent.Type.STARTED:
            // debug({str: 'Ad info: ', obj: e.getAd()});
            break;
          default:
            break;
        }
      }

      /**
       * Loads Url.
       * @param  {string} data
       */
      function loadStream(data) {
        var url = data['url'];
        debug('Loading: ' + url);
        player.src(url);
        if (isIos) {
          videoElement.textTracks.addEventListener('addtrack', onAddTrack);
        }
        debug('Video is Ready to Play...');
      }

      /**
       * Called to process metadata for the video element.
       * @param {Event} event The add track event.
       */
      function onAddTrack(event) {
        var track = event.track;
        if (track.kind === 'metadata') {
          track.mode = 'hidden';
          track.addEventListener('cuechange', function() {
            for (var cue in track.activeCues) {
              var metadata = {};
              metadata[cue.value.key] = cue.value.data;
              _this.streamManager.onTimedMetadata(metadata);
            }
          });
        }
      }

      /**
       * Prints console messages with the selected color.
       * @param {string | Object} msg
       * @param {?string} color
       */
      function debug(msg) {

        var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'orange';

        function colorPrint(str) {
          console.log('%c[DAI] '.concat(str), "color:".concat(color, "; font-weight: bold"));
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
       * Prints DAI errors to console.
       * @param msg
       */
      function error(msg) {
        console.error('[DAI] '.concat(msg));
      }

      return _this;
    }

    return ImaDaiPlugin;
  }(Plugin);

  ImaDaiPlugin.VERSION = '0.0.1';

  videojs.registerPlugin('imadai', ImaDaiPlugin);

  return ImaDaiPlugin;

})));

