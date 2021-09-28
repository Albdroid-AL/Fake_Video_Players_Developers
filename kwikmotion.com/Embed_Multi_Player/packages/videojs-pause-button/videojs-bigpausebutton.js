/*! @name videojs-bigpausebutton @version 0.0.1 @license Apache-2.0 */
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? module.exports = factory(require('video.js'))
    :
    typeof define === 'function' && define.amd
      ? define(['video.js'], factory)
      :
      (global.videojsBigpausebutton = factory(global.videojs));
}(this, (function(videojs) {
  'use strict';

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
  // import btnIco from './assets/circular.svg'

  // Default options for the plugin.
  var defaults$1 = {};

  /**
   * An advanced Video.js plugin. For more information on the API
   *
   * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
   */

  var Bigpausebutton = function(_Plugin) {
    inherits(Bigpausebutton, _Plugin);

    /**
     * Create a Bigpausebutton plugin instance.
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
    function Bigpausebutton(player, options) {
      classCallCheck(this, Bigpausebutton);

      var _this = possibleConstructorReturn(this, _Plugin.call(this, player));
      // the parent class will add player under this.player

      var removeButtons = function removeButtons(player) {
        player.removeChild('videoJsBigPauseButton');
        player.removeChild('videoJsStepForwardButton');
        player.removeChild('videoJsStepBackwardButton');
      };

      var addButtons = function addButtons(player) {
        var addPause = arguments.length > 1 && arguments[1] !== undefined
          ? arguments[1]
          : true;

        player.addClass('vjs-big-pause-buttons');
        if (addPause) {
          player.addChild('VideoJsBigPauseButton');
        }
        if (player.duration && player.duration() !== Infinity &&
          player.duration() > 0 || player.player().duration &&
          player.player().duration() !== Infinity &&
          player.player().duration() > 0) {
          if (typeof player.getChild('VideoJsStepForwardButton') ===
            'undefined' || !player.getChild('VideoJsStepForwardButton')) {
            player.addChild('VideoJsStepForwardButton');
          }
          if (typeof player.getChild('VideoJsStepBackwardButton') ===
            'undefined' || !player.getChild('VideoJsStepBackwardButton')) {
            player.addChild('VideoJsStepBackwardButton');
          }
        }
      };

      var seekInterval = options && options.seek ? options.seek : 15;

      var Component = videojs.getComponent('BigPlayButton');
      var Button = videojs.getComponent('Button');

      var videoJsBigPauseButton = videojs.extend(Component, {
        constructor: function constructor(player, options) {
          Component.call(this, player, options);
          this.addClass('vjs-big-button');
          this.addClass('vjs-big-pause-button');
          this.addClass('vjs-icon-pause');
          this.removeClass('vjs-big-play-button');
        },
        handleClick: function handleClick() {
          this.player().pause();
          this.player().addClass('vjs-play-paused');

          this.player().one('play', function() {
            this.removeClass('vjs-play-paused');
          });
          removeButtons(this.player());
        }
      });

      videojs.registerComponent('VideoJsBigPauseButton', videoJsBigPauseButton);

      var videoJsStepForwardButton = videojs.extend(Button, {
        constructor: function constructor(player, options) {
          Button.call(this, player, options);
          // this.el().querySelector('.vjs-icon-placeholder').insertAdjacentHTML('afterbegin',
          // btnIco );
          if (videojs.browser.TOUCH_ENABLED) {
            this.addClass('vjs-big-button');
          }
          this.addClass('vjs-big-step-forward-button');
        },
        handleClick: function handleClick() {
          this.player().currentTime(Math.min(this.player().duration(),
            this.player().currentTime() + seekInterval));
          removeButtons(this.player());
        }
      });
      videoJsStepForwardButton.prototype.controlText_ = seekInterval;
      videojs.registerComponent('VideoJsStepForwardButton',
        videoJsStepForwardButton);

      var videoJsStepBackwardButton = videojs.extend(Button, {
        constructor: function constructor(player, options) {
          Button.call(this, player, options);
          // this.el().querySelector('.vjs-icon-placeholder').insertAdjacentHTML('afterbegin',
          // btnIco );
          if (videojs.browser.TOUCH_ENABLED) {
            this.addClass('vjs-big-button');
          }
          this.addClass('vjs-big-step-backward-button');
        },
        handleClick: function handleClick() {
          this.player().currentTime(
            Math.max(0, this.player().currentTime() - seekInterval));
          removeButtons(this.player());
        }
      });
      videoJsStepBackwardButton.prototype.controlText_ = seekInterval;
      videojs.registerComponent('VideoJsStepBackwardButton',
        videoJsStepBackwardButton);

      _this.options = videojs.mergeOptions(defaults$1, options);

      _this.player.ready(function() {
        _this.player.addClass('vjs-bigpausebutton');
        var justcreated = false;
        _this.player.on('touchstart', function(e) {

          //check if clicked area is not a button
          var isControlBarButtonClicked = false;
          var controlButtons = _this.player.el().querySelectorAll('.vjs-control-bar .vjs-control');
          for (var i = 0; i < controlButtons.length; i++) {
            if (!controlButtons[i].classList.contains('vjs-progress-control') &&
              controlButtons[i].contains(e.target)) {
              isControlBarButtonClicked = true;
              break;
            }
          }
          // check if menu if opened
          var isMenuOpened = !!_this.player.el()
            .querySelectorAll('.vjs-control-bar .vjs-control .vjs-lock-showing').length;

          // hide buttons on button click or when menu is opened
          if ((isMenuOpened || isControlBarButtonClicked) &&
            _this.player.getChild('VideoJsBigPauseButton')) {
            removeButtons(_this.player);
          }

          if (isMenuOpened || isControlBarButtonClicked || _this.player.paused()
            || _this.player.muted() &&
            _this.player.getChild('VideoJsBigMuteButton') /*don't show if we show unmute button*/
            || e.touches.length != 1
            || _this.player.ads && _this.player.ads.isAdPlaying()
            || _this.player.options().imadai && _this.player.imadai().daiAdIsPlaying
          ) {

            return false;
          }
          if (typeof _this.player.getChild('VideoJsBigPauseButton') ==
            'undefined' || !_this.player.getChild('VideoJsBigPauseButton')) {
            justcreated = true;
            addButtons(_this.player);
          }
        });
        _this.player.on('userinactive', function() {
          // removeButtons(this.player)
        });
        _this.player.on('touchend', function() {
          if (justcreated) {
            // fix wrong behaviour when player active and we make a touch
            _this.player.userActive(true);
            justcreated = false;
          }
        });
        _this.player.on('play', function() {
          // removeButtons(this.player)
        });

        // var buttons = _this.player.el().querySelectorAll('.vjs-control-bar .vjs-control');
        // for (var i = 0; i < buttons.length; i++) {
        //   console.log(buttons[i]);
        //   buttons[i].addEventListener('click', function(e) {
        //     e.preventDefault();
        //     console.log(e.target);
        //     removeButtons(_this.player);
        //   });
        // }
        //
        // var controlBar = _this.player.el().querySelector('.vjs-control-bar');
        // controlBar.addEventListener('click', function(e) {
        //   console.log(e.target);
        //   removeButtons(_this.player);
        // });

        // _this.player.el().addEventListener('click', function(e) {
        //   console.log(e.target);
        //   removeButtons(_this.player);
        // });

        _this.player.on('durationchange', function() {
          if (!videojs.browser.TOUCH_ENABLED) {
            // add seek buttons directly on control bar
            addButtons(_this.player.controlBar, false);
          }
        });

      });

      return _this;
    }

    return Bigpausebutton;
  }(Plugin);

  // Define default values for the plugin's `state` object here.

  Bigpausebutton.defaultState = {};

  // Include the version number.
  Bigpausebutton.VERSION = version;

  // Register the plugin with video.js.
  videojs.registerPlugin('bigpausebutton', Bigpausebutton);

  return Bigpausebutton;

})));
