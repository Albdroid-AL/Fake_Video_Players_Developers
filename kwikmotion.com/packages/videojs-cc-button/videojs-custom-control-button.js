/*! @name videojs-custom-control-button @version 0.0.0 @license MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js')) :
  typeof define === 'function' && define.amd ? define(['video.js'], factory) :
  (global.videojsCustomControlButton = factory(global.videojs));
}(this, (function (videojs) { 'use strict';

  videojs = videojs && videojs.hasOwnProperty('default') ? videojs['default'] : videojs;

  var version = "0.0.0";

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

  var VjsButton = videojs.getComponent('Button');

  var CustomButton = function (_VjsButton) {
    inherits(CustomButton, _VjsButton);

    function CustomButton(player, options) {
      classCallCheck(this, CustomButton);

      var _this = possibleConstructorReturn(this, _VjsButton.call(this, player));

      _this.options = options;
      if (_this.options.className && !Array.isArray(_this.options.className)) {
        _this.options.className = _this.options.className.split(' ');
      }
      for (var clidx = 0; clidx < _this.options.className.length; clidx++) {
        _this.el().classList.add(_this.options.className[clidx]);
      }
      if (_this.options.style) {
        _this.el().setAttribute('style', _this.options.style);
      }
      return _this;
    }

    CustomButton.prototype.handleClick = function handleClick() {
      _VjsButton.prototype.handleClick.call(this);
      this.player().trigger(this.options.eventName);
    };

    return CustomButton;
  }(VjsButton);

  /**
   * An advanced Video.js plugin. For more information on the API
   *
   * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
   */


  var CustomControlButton = function (_Plugin) {
    inherits(CustomControlButton, _Plugin);

    /**
     * Create a CustomControlButton plugin instance.
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
    function CustomControlButton(player, options) {
      classCallCheck(this, CustomControlButton);

      var _this2 = possibleConstructorReturn(this, _Plugin.call(this, player));
      // the parent class will add player under this.player


      _this2.options = videojs.mergeOptions(defaults$1, options);

      _this2.player.ready(function () {
        var customButton = new CustomButton(player, options);
        player.controlBar.addChild(customButton);
      });
      return _this2;
    }

    return CustomControlButton;
  }(Plugin);

  // Define default values for the plugin's `state` object here.


  CustomControlButton.defaultState = {};

  // Include the version number.
  CustomControlButton.VERSION = version;

  // Register the plugin with video.js.
  videojs.registerPlugin('customControlButton', CustomControlButton);

  return CustomControlButton;

})));
