/*! @name videojs-pip @version 0.0.1 @license Apache-2.0 */
'use strict';

(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
      ? module.exports = factory(require('video.js'))
      :
      typeof define === 'function' && define.amd
          ? define(['video.js'], factory)
          :
          (global.videojsPipPlugin = factory(global.videojs));
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

  var PipPlugin = function(_Plugin) {
    inherits(PipPlugin, _Plugin);

    /**
     * Initializes PipPlugin instance.
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
    function PipPlugin(player, options) {
      classCallCheck(this, PipPlugin);
      var _this = possibleConstructorReturn(this, _Plugin.call(this, player));

      var addButton = function addButtons(player) {
        player.addChild('VideoJsPipButton');
      };

      var removeButton = function removeButtons(player) {
        player.removeChild('VideoJsPipButton');
      };

      var Button = videojs.getComponent('Button');
      var videoJsPipButton = videojs.extend(Button, {
        constructor: function constructor(player, options) {
          Button.call(this, player, options);
          this.addClass('vjs-picture-in-picture-control');
          this.on(player, ['enterpictureinpicture', 'leavepictureinpicture'],
              this.handlePictureInPictureChange);
          if ((!document.pictureInPictureEnabled ||
              player.el().querySelector('video').disablePictureInPicture)) {
            this.disable();
          }
        },

        /**
         * Handles enterpictureinpicture and leavepictureinpicture on the player and change control text accordingly.
         *
         * @param {EventTarget~Event} [event]
         *        The {@link Player#enterpictureinpicture} or {@link Player#leavepictureinpicture} event that caused this function to be
         *        called.
         *
         * @listens Player#enterpictureinpicture
         * @listens Player#leavepictureinpicture
         */
        handlePictureInPictureChange: function handlePictureInPictureChange(event) {
          if (this.player_.isInPictureInPicture()) {
            this.controlText('Exit Picture-in-Picture');
          } else {
            this.controlText('Picture-in-Picture');
          }
        },

        /**
         * This gets called when an `PictureInPictureToggle` is "clicked". See
         * {@link ClickableComponent} for more detailed information on what a click can be.
         *
         * @param {EventTarget~Event} [event]
         *        The `keydown`, `tap`, or `click` event that caused this function to be
         *        called.
         *
         * @listens tap
         * @listens click
         */
        handleClick: function handleClick() {
          if (!this.player_.isInPictureInPicture()) {
            this.player_.requestPictureInPicture();
          } else {
            this.player_.exitPictureInPicture();
          }
        }
      });

      /**
       * The text that should display over the `PictureInPictureToggle`s controls. Added for localization.
       *
       * @type {string}
       * @private
       */
      PipPlugin.prototype.controlText_ = 'Picture-in-Picture';
      videojs.registerComponent('VideoJsPipButton', videoJsPipButton);

      _this.options = videojs.mergeOptions({}, options);

      _this.player.ready(function() {
        _this.player.one('loadedmetadata', function(e) {
          addButton(_this.player.controlBar, false);
        });
        _this.player.one('emptied', function(e) {
          removeButton(this.player());
        });
      });

      return _this;
    }

    return PipPlugin;
  }(Plugin);

  PipPlugin.VERSION = '0.0.1';

  videojs.registerPlugin('pip', PipPlugin);

  return PipPlugin;

})));

