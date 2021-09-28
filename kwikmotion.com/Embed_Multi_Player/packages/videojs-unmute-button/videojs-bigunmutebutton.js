/*! @name videojs-bigunmutebutton @version 0.0.1 @license Apache-2.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js')) :
  typeof define === 'function' && define.amd ? define(['video.js'], factory) :
  (global.videojsBigunmutebutton = factory(global.videojs));
}(this, (function (videojs) { 'use strict';

  videojs = videojs && videojs.hasOwnProperty('default') ? videojs['default'] : videojs;

  var version = "0.0.1";

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var Plugin = videojs.getPlugin('plugin');

  // Default options for the plugin.
  var defaults$1 = {};

  /**
   * An advanced Video.js plugin. For more information on the API
   *
   * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
   */

  var Bigunmutebutton = function (_Plugin) {
    inherits(Bigunmutebutton, _Plugin);

    /**
     * Create a Bigunmutebutton plugin instance.
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
    function Bigunmutebutton(player, options) {
      classCallCheck(this, Bigunmutebutton);

      var _this = possibleConstructorReturn(this, _Plugin.call(this, player));
      // the parent class will add player under this.player


      _this.options = videojs.mergeOptions(defaults$1, options);

      var Component = videojs.getComponent('BigPlayButton');
      var videoJsBigUnmuteButton = videojs.extend(Component, {
        constructor: function constructor(player, options) {
          Component.call(this, player, options);
          this.addClass('vjs-big-unmute-button');
          this.addClass('vjs-icon-volume-mute');
          this.removeClass('vjs-big-play-button');
        },
        handleClick: function handleClick() {
          this.player().muted(false);
          this.player().removeChild('videoJsBigUnmuteButton');
        }
      });
      videoJsBigUnmuteButton.prototype.controlText_ = 'Unmute Video';
      videojs.registerComponent('videoJsBigUnmuteButton', videoJsBigUnmuteButton);

      _this.player.ready(function () {
        _this.player.addClass('vjs-bigunmutebutton');
        _this.player.one('playing', function () {
          if (_this.player.muted() && !_this.player.getChild('videoJsBigUnmuteButton')) {
            _this.player.addChild('videoJsBigUnmuteButton');
          }
        });
        _this.player.on('volumechange', function () {
          if (_this.player.muted() && !_this.player.getChild('videoJsBigUnmuteButton')) {
            _this.player.addChild('videoJsBigUnmuteButton');
          } else if (_this.player.getChild('videoJsBigUnmuteButton')) {
            _this.player.removeChild('videoJsBigUnmuteButton');
          }
        });
      });
      return _this;
    }

    return Bigunmutebutton;
  }(Plugin);

  // Define default values for the plugin's `state` object here.


  Bigunmutebutton.defaultState = {};

  // Include the version number.
  Bigunmutebutton.VERSION = version;

  // Register the plugin with video.js.
  videojs.registerPlugin('bigunmutebutton', Bigunmutebutton);

  return Bigunmutebutton;

})));
