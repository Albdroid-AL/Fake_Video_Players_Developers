/**
 * videojs-analytics
 * @version 0.1.2
 * @copyright 2019 Adam Oliver <mail@adamoliver.net>
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsAnalytics = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Default options for the plugin.
var defaults = {
  events: [],
  assetName: 'Video',
  defaultVideoCategory: 'Video',
  defaultAudioCategory: 'Audio'
};

var analyticsMode = {
  googleAnalytics: 'GA',
  googleTags: 'GTAG'
};

window.ga = window.ga || function () {
  return void 0;
};

window.gtag = window.gtag || function () {
  return void 0;
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function analytics
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
var analytics = function analytics(options) {
  var _this = this;

  options = _video2.default.mergeOptions(defaults, options);

  var pluginConsoleName = 'Analytics';

  this.ready(function () {
    var progress = {
      quarter: false,
      half: false,
      threeQuarters: false
    };

    function track(player, action, label) {
      var category = options.defaultVideoCategory;
      var customDimensions = options.customDimensions || {};

      if (player.isAudio()) {
        category = options.defaultAudioCategory;
      }

      if (!label) {
        label = '';
      }

      if (options.mode === analyticsMode.googleTags) {
        window.gtag('event', action,
        /* eslint camelcase: 0 */
        { event_category: category, event_label: label, customDimensions: customDimensions });
      } else {
        window.ga('send', 'event', category, action, label);
      }

      if (options.debug) {
        debug('Mode: "'
          + (options.mode === analyticsMode.googleTags ? 'gtag' : 'ga')
          + '", Category: "' + category
          + '", Action: "' + action
          + '", Label: "' + label + '"');
        if (Object.keys(customDimensions).length) {
          debug({str: 'Custom dimensions: ', obj: customDimensions});
        }
      }
    }

    function play(player, event) {
      track(player, event.action, event.label);
      track(player, 'Asset name', options.assetName);
    }

    function autoplay(player, event) {
      if (player.options().autostart) {
        track(player, event.action, event.label);
      }
    }

    function fullscreenchange(player, event) {
      var label = player.isFullscreen() ? event.label.open : event.label.exit;

      track(player, event.action, label);
    }

    function resolutionchange(player, event) {
      var resolution = {
        label: ''
      };

      // It's possible that resolutionchange is used as an event where
      // the video object doesn't have currentResolution
      // so we need to check for it's existance first.
      if (player.currentResolution) {
        resolution = player.currentResolution();
      }
      var label = resolution.label ? resolution.label : 'Default';

      track(player, event.action, label);
    }

    function timeupdate(player, event) {
      var elapsed = Math.round(player.currentTime());
      var duration = Math.round(player.duration());
      var percent = Math.round(elapsed / duration * 100);

      if (!progress.quarter && percent > 25) {
        track(player, event.action, 'Complete 25%');
        progress.quarter = true;
      }

      if (!progress.half && percent > 50) {
        track(player, event.action, 'Complete 50%');
        progress.half = true;
      }

      if (!progress.threeQuarters && percent > 75) {
        track(player, event.action, 'Complete 75%');
        progress.threeQuarters = true;
      }
    }

    function mute(player, event) {
      if (player.muted() || player.volume() === 0) {
        track(player, event.action, event.label);
      }
    }

    function volumechange(player, event) {
      if (!player.muted() && player.volume() !== 0) {
        track(player, event.action, event.label);
      }
    }

    function handleEvent(player, event) {
      track(player, event.action, event.label);
    }

    // For any other event that doesn't require special processing
    // we will use the handleEvent event handler

    var _loop = function _loop() {
      if (_isArray) {
        if (_i >= _iterator.length) return 'break';
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) return 'break';
        _ref = _i.value;
      }

      var event = _ref;
      var eventName = event.name;

      switch (eventName) {
        case 'autoplay':
          _this.one('play', function () {
            autoplay(this, event);
          });
          break;
        case 'play':
          _this.one('play', function () {
            play(this, event);
          });
          break;
        case 'ended':
          _this.one('ended', function () {
            handleEvent(this, event);
          });
          break;
        case 'resolutionchange':
          _this.on('resolutionchange', function () {
            resolutionchange(this, event);
          });
          break;
        case 'fullscreenchange':
          _this.on('fullscreenchange', function () {
            fullscreenchange(this, event);
          });
          break;
        case 'timeupdate':
          var usesDvrux = false;
          _this.one('dvruxinited', function() {
            usesDvrux = true;
          });

          _this.one('timeupdate', function() {
            if (!usesDvrux && isFinite(_this.duration())) {
              _this.on('timeupdate', function() {
                timeupdate(this, event);
              });
            }
          });
          break;
        case 'mute':
          _this.one('play', function () {
            _this.on('volumechange', function () {
              mute(this, event);
            });
          });
          break;
        case 'volumechange':
          _this.one('play', function () {
            _this.on('volumechange', function () {
              volumechange(this, event);
            });
          });
          break;
        default:
          _this.on(eventName, function () {
            handleEvent(this, event);
          });
          break;
      }
    };

    for (var _iterator = options.events, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      var _ret = _loop();

      if (_ret === 'break') break;
    }
  });

  /**
   * Prints console messages with the selected color.
   * @param {string | Object} msg   Message to be console logged.
   * @param {?string} color         Color to be used for the print.
   */
  function debug(msg) {

    var color = arguments.length > 1 && arguments[1] !== undefined
      ? arguments[1]
      : 'orange';

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
};

// Register the plugin with video.js.
var registerPlugin = _video2.default.registerPlugin || _video2.default.plugin;
registerPlugin('analytics', analytics);

// Include the version number.
analytics.VERSION = '0.1.2';

exports.default = analytics;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});
