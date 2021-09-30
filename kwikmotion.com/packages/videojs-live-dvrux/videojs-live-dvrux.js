/**
 * @brightcove/videojs-live-dvrux
 * @version 1.3.5
 * @copyright 2018 Brightcove
 * @license UNLICENSED
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsLiveDvrux = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
(function (global){
/**
 * videojs-overlay
 * @version 1.1.4
 * @copyright 2017 Brightcove, Inc.
 * @license Apache-2.0
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsOverlay = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
module.exports = function tsmlj(ts) {
  var out = '';
  var i = 0;

  // Match normal template string behavior to get the full, formatted string.
  for (; i < arguments.length; i++) {
    out += ts[i] + (arguments[i + 1] || '');
  }

  return out.replace(/\s+/g, ' ').trim();
};

},{}],3:[function(_dereq_,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _templateObject = _taggedTemplateLiteral(['\n      created, listening to "', '" for "start" and\n      "', '" for "end"\n    '], ['\n      created, listening to "', '" for "start" and\n      "', '" for "end"\n    ']),
    _templateObject2 = _taggedTemplateLiteral(['\n          hiding; ', ' is an integer and overlay should not show at this time\n        '], ['\n          hiding; ', ' is an integer and overlay should not show at this time\n        ']),
    _templateObject3 = _taggedTemplateLiteral(['\n          hiding; show point (', ') is before now (', ') and end\n          point (', ') is an event\n        '], ['\n          hiding; show point (', ') is before now (', ') and end\n          point (', ') is an event\n        ']);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _tsmlj = _dereq_('tsmlj');

var _tsmlj2 = _interopRequireDefault(_tsmlj);

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _globalWindow = _dereq_('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

var defaults = {
  align: 'top-left',
  'class': '',
  content: 'This overlay will show up while the video is playing',
  debug: false,
  showBackground: true,
  attachToControlBar: false,
  overlays: [{
    start: 'playing',
    end: 'paused'
  }]
};

var Component = _videoJs2['default'].getComponent('Component');

// These are for cross-compatibility between Video.js 5 and 6.
var dom = _videoJs2['default'].dom || _videoJs2['default'];
var registerPlugin = _videoJs2['default'].registerPlugin || _videoJs2['default'].plugin;

/**
 * Whether the value is a `Number`.
 *
 * Both `Infinity` and `-Infinity` are accepted, but `NaN` is not.
 *
 * @param  {Number} n
 * @return {Boolean}
 */

/* eslint-disable no-self-compare */
var isNumber = function isNumber(n) {
  return typeof n === 'number' && n === n;
};
/* eslint-enable no-self-compare */

/**
 * Whether a value is a string with no whitespace.
 *
 * @param  {String} s
 * @return {Boolean}
 */
var hasNoWhitespace = function hasNoWhitespace(s) {
  return typeof s === 'string' && /^\S+$/.test(s);
};

/**
 * Overlay component.
 *
 * @class   Overlay
 * @extends {videojs.Component}
 */

var Overlay = (function (_Component) {
  _inherits(Overlay, _Component);

  function Overlay(player, options) {
    var _this = this;

    _classCallCheck(this, Overlay);

    _get(Object.getPrototypeOf(Overlay.prototype), 'constructor', this).call(this, player, options);

    ['start', 'end'].forEach(function (key) {
      var value = _this.options_[key];

      if (isNumber(value)) {
        _this[key + 'Event_'] = 'timeupdate';
      } else if (hasNoWhitespace(value)) {
        _this[key + 'Event_'] = value;

        // An overlay MUST have a start option. Otherwise, it's pointless.
      } else if (key === 'start') {
          throw new Error('invalid "start" option; expected number or string');
        }
    });

    // video.js does not like components with multiple instances binding
    // events to the player because it tracks them at the player level,
    // not at the level of the object doing the binding. This could also be
    // solved with Function.prototype.bind (but not videojs.bind because of
    // its GUID magic), but the anonymous function approach avoids any issues
    // caused by crappy libraries clobbering Function.prototype.bind.
    // - https://github.com/videojs/video.js/issues/3097
    ['endListener_', 'rewindListener_', 'startListener_'].forEach(function (name) {
      _this[name] = function (e) {
        return Overlay.prototype[name].call(_this, e);
      };
    });

    // If the start event is a timeupdate, we need to watch for rewinds (i.e.,
    // when the user seeks backward).
    if (this.startEvent_ === 'timeupdate') {
      this.on(player, 'timeupdate', this.rewindListener_);
    }

    this.debug((0, _tsmlj2['default'])(_templateObject, this.startEvent_, this.endEvent_ || 'nothing'));

    this.hide();
  }

  _createClass(Overlay, [{
    key: 'createEl',
    value: function createEl() {
      var options = this.options_;
      var content = options.content;

      var background = options.showBackground ? 'vjs-overlay-background' : 'vjs-overlay-no-background';
      var el = dom.createEl('div', {
        className: '\n        vjs-overlay\n        vjs-overlay-' + options.align + '\n        ' + options['class'] + '\n        ' + background + '\n        vjs-hidden\n      '
      });

      if (typeof content === 'string') {
        el.innerHTML = content;
      } else if (content instanceof _globalWindow2['default'].DocumentFragment) {
        el.appendChild(content);
      } else {
        dom.appendContent(el, content);
      }

      return el;
    }

    /**
     * Logs debug errors
     * @param  {...[type]} args [description]
     * @return {[type]}         [description]
     */
  }, {
    key: 'debug',
    value: function debug() {
      if (!this.options_.debug) {
        return;
      }

      var log = _videoJs2['default'].log;
      var fn = log;

      // Support `videojs.log.foo` calls.

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (log.hasOwnProperty(args[0]) && typeof log[args[0]] === 'function') {
        fn = log[args.shift()];
      }

      fn.apply(undefined, ['overlay#' + this.id() + ': '].concat(args));
    }

    /**
     * Overrides the inherited method to perform some event binding
     *
     * @return {Overlay}
     */
  }, {
    key: 'hide',
    value: function hide() {
      _get(Object.getPrototypeOf(Overlay.prototype), 'hide', this).call(this);

      this.debug('hidden');
      this.debug('bound `startListener_` to "' + this.startEvent_ + '"');

      // Overlays without an "end" are valid.
      if (this.endEvent_) {
        this.debug('unbound `endListener_` from "' + this.endEvent_ + '"');
        this.off(this.player(), this.endEvent_, this.endListener_);
      }

      this.on(this.player(), this.startEvent_, this.startListener_);

      return this;
    }

    /**
     * Determine whether or not the overlay should hide.
     *
     * @param  {Number} time
     *         The current time reported by the player.
     * @param  {String} type
     *         An event type.
     * @return {Boolean}
     */
  }, {
    key: 'shouldHide_',
    value: function shouldHide_(time, type) {
      var end = this.options_.end;

      return isNumber(end) ? time >= end : end === type;
    }

    /**
     * Overrides the inherited method to perform some event binding
     *
     * @return {Overlay}
     */
  }, {
    key: 'show',
    value: function show() {
      _get(Object.getPrototypeOf(Overlay.prototype), 'show', this).call(this);
      this.off(this.player(), this.startEvent_, this.startListener_);
      this.debug('shown');
      this.debug('unbound `startListener_` from "' + this.startEvent_ + '"');

      // Overlays without an "end" are valid.
      if (this.endEvent_) {
        this.debug('bound `endListener_` to "' + this.endEvent_ + '"');
        this.on(this.player(), this.endEvent_, this.endListener_);
      }

      return this;
    }

    /**
     * Determine whether or not the overlay should show.
     *
     * @param  {Number} time
     *         The current time reported by the player.
     * @param  {String} type
     *         An event type.
     * @return {Boolean}
     */
  }, {
    key: 'shouldShow_',
    value: function shouldShow_(time, type) {
      var start = this.options_.start;
      var end = this.options_.end;

      if (isNumber(start)) {

        if (isNumber(end)) {
          return time >= start && time < end;

          // In this case, the start is a number and the end is a string. We need
          // to check whether or not the overlay has shown since the last seek.
        } else if (!this.hasShownSinceSeek_) {
            this.hasShownSinceSeek_ = true;
            return time >= start;
          }

        // In this case, the start is a number and the end is a string, but
        // the overlay has shown since the last seek. This means that we need
        // to be sure we aren't re-showing it at a later time than it is
        // scheduled to appear.
        return Math.floor(time) === start;
      }

      return start === type;
    }

    /**
     * Event listener that can trigger the overlay to show.
     *
     * @param  {Event} e
     */
  }, {
    key: 'startListener_',
    value: function startListener_(e) {
      var time = this.player().currentTime();

      if (this.shouldShow_(time, e.type)) {
        this.show();
      }
    }

    /**
     * Event listener that can trigger the overlay to show.
     *
     * @param  {Event} e
     */
  }, {
    key: 'endListener_',
    value: function endListener_(e) {
      var time = this.player().currentTime();

      if (this.shouldHide_(time, e.type)) {
        this.hide();
      }
    }

    /**
     * Event listener that can looks for rewinds - that is, backward seeks
     * and may hide the overlay as needed.
     *
     * @param  {Event} e
     */
  }, {
    key: 'rewindListener_',
    value: function rewindListener_(e) {
      var time = this.player().currentTime();
      var previous = this.previousTime_;
      var start = this.options_.start;
      var end = this.options_.end;

      // Did we seek backward?
      if (time < previous) {
        this.debug('rewind detected');

        // The overlay remains visible if two conditions are met: the end value
        // MUST be an integer and the the current time indicates that the
        // overlay should NOT be visible.
        if (isNumber(end) && !this.shouldShow_(time)) {
          this.debug((0, _tsmlj2['default'])(_templateObject2, end));
          this.hasShownSinceSeek_ = false;
          this.hide();

          // If the end value is an event name, we cannot reliably decide if the
          // overlay should still be displayed based solely on time; so, we can
          // only queue it up for showing if the seek took us to a point before
          // the start time.
        } else if (hasNoWhitespace(end) && time < start) {
            this.debug((0, _tsmlj2['default'])(_templateObject3, start, time, end));
            this.hasShownSinceSeek_ = false;
            this.hide();
          }
      }

      this.previousTime_ = time;
    }
  }]);

  return Overlay;
})(Component);

_videoJs2['default'].registerComponent('Overlay', Overlay);

/**
 * Initialize the plugin.
 *
 * @function plugin
 * @param    {Object} [options={}]
 */
var plugin = function plugin(options) {
  var _this2 = this;

  var settings = _videoJs2['default'].mergeOptions(defaults, options);

  // De-initialize the plugin if it already has an array of overlays.
  if (Array.isArray(this.overlays_)) {
    this.overlays_.forEach(function (overlay) {
      _this2.removeChild(overlay);
      if (_this2.controlBar) {
        _this2.controlBar.removeChild(overlay);
      }
      overlay.dispose();
    });
  }

  var overlays = settings.overlays;

  // We don't want to keep the original array of overlay options around
  // because it doesn't make sense to pass it to each Overlay component.
  delete settings.overlays;

  this.overlays_ = overlays.map(function (o) {
    var mergeOptions = _videoJs2['default'].mergeOptions(settings, o);

    // Attach bottom aligned overlays to the control bar so
    // they will adjust positioning when the control bar minimizes
    if (mergeOptions.attachToControlBar && _this2.controlBar && mergeOptions.align.indexOf('bottom') !== -1) {
      return _this2.controlBar.addChild('overlay', mergeOptions);
    }

    return _this2.addChild('overlay', mergeOptions);
  });
};

plugin.VERSION = '1.1.4';

registerPlugin('overlay', plugin);

exports['default'] = plugin;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"global/window":1,"tsmlj":2}]},{},[3])(3)
});'use strict';

(function (window, videojs) {
  'use strict';
  var dvrux = undefined;
  var defaults = {
    verbose: false
  };

  videojs.dvrux = {};
  var bookendChecker = undefined;

  var recheckBookends = function recheckBookends(dvrPlayer, startDate) {
    if (new Date() >= startDate) {
      dvrPlayer.one(dvrPlayer, 'timeupdate', function () {
        dvrPlayer.trigger('clearBeforeBookend');
        videojs.dvrux.seekToLive(dvrPlayer);
        clearInterval(bookendChecker);
      });
      if (dvrPlayer.tech_.hls && dvrPlayer.tech_.hls.playlists) {
        (function () {
          // hls.playlists is a `Stream` and does not have a `.one` function
          var handleLoadedPlaylist = function handleLoadedPlaylist() {
            dvrPlayer.trigger('clearBeforeBookend');
            videojs.dvrux.seekToLive(dvrPlayer);
            clearInterval(bookendChecker);
            dvrPlayer.tech_.hls.playlists.off('loadedplaylist', handleLoadedPlaylist);
          };

          dvrPlayer.tech_.hls.playlists.on('loadedplaylist', handleLoadedPlaylist);
        })();
      }
    }
  };

  var bookendContent = function bookendContent(settings, defaultText) {
    var content = null;

    switch (settings.type) {
      case 'image':
        content = '<img src="' + settings.src + '" width="100%" height="100%" />';
        break;
      case 'custom':
        content = settings.src;
        break;
      // case 'text'
      default:
        content = settings.src ? '<p>' + settings.src + '</p>' : '<p>' + defaultText + '</p>';
    }
    return content;
  };

  /**
   * @returns true if the player head is at the live point, and false otherwise
   */
  videojs.dvrux.playerIsLive = function (contentPlayer) {
    var segEnd = undefined;
    var seekable = contentPlayer.seekable();

    if (seekable && seekable.length) {
      segEnd = seekable.end(0);
      if (Math.ceil(contentPlayer.currentTime()) >= Math.floor(segEnd) || segEnd === Infinity) {
        return true;
      }
    }
    return false;
  };

  /**
   * @returns the total time currently playable in this stream's sliding window
   */
  videojs.dvrux.totalWindowTime = function (contentPlayer) {
    var seekable = contentPlayer.seekable();

    if (!seekable || !seekable.length) {
      return 0;
    }

    return seekable.end(0) - seekable.start(0);
  };

  /**
   * Initialize the plugin.
   *
   * @param options (optional) {Object} configuration for the plugin
   *
   * @returns
   */
  // Warn if another alias other than player is used for this
  /* eslint consistent-this: [1, "player"] */
  dvrux = function (options) {
    var settings = videojs.mergeOptions(defaults, options);
    var player = this;
    var startDate = undefined;
    var overlays = [];
    var init = function init() {
      // Unsupported platform, give up
      if (!player.seekable() && !player.tech_.hls) {
        return -1;
      }

      player.dvrux.controls = videojs.dvrux.Controls(player, settings);

      if (settings.bookendBefore) {
        var customClass = settings.bookendBefore['class'] || '';

        startDate = new Date(settings.bookendBefore.startTime);
        if (startDate > new Date()) {
          overlays.push({
            content: bookendContent(settings.bookendBefore, 'This event starts on ' + startDate),
            start: 'durationchange',
            end: 'play',
            'class': 'vjs-livedvr-overlay ' + customClass
          });

          bookendChecker = setInterval(function () {
            recheckBookends(player, startDate);
          }, 5000);
        }
      }

      if (settings.bookendAfter) {
        var bookendEvent = 'ended';
        var customClass = settings.bookendAfter['class'] || '';

        startDate = new Date(settings.bookendAfter.startTime);
        if (startDate < new Date()) {
          bookendEvent = 'durationchange';
        }
        // we don't currently use the end event for this overlay
        // as we expect the bookendAfter to remain over the screen
        overlays.push({
          content: bookendContent(settings.bookendAfter, 'This event ended on ' + startDate),
          start: bookendEvent,
          end: 'clearAfterBookend',
          'class': customClass
        });
      }

      if (overlays.length > 0) {
        player.overlay({ overlays: overlays });
      }
    };

    player.ready(init, true);
  };

  /**
   * Append messages to the console using the videojs logging system.  All messages are
   * prefixed with 'dvrux: '.
   */
  dvrux.log = function () {
    videojs.log('dvrux: ' + Array.prototype.join.call(arguments, ' '));
  };

  videojs.dvrux.VERSION = '1.3.5';

  // register the plugin
  var registerPlugin = videojs.registerPlugin || videojs.plugin;

  registerPlugin('dvrux', dvrux);
})(window, window.videojs);'use strict';

(function (window, document, videojs) {
  videojs.dvrux.Controls = function (player) {
    // grab the tech element (HTML5 video element or Flash object)
    var tech = player.el().querySelector('.vjs-tech');
    // create ad container overlay element and insert into player
    var adContainer = document.createElement('div');

    player.controlBar.addClass('vjs-livedvr-control-bar');
    // we need to dispose these on video.js6 only
    if (/^6/.test(videojs.VERSION)) {
      var oldProgressControl = player.controlBar.getChild('progressControl');
      var oldLiveDisplay = player.controlBar.getChild('liveDisplay');

      oldProgressControl.dispose();
      oldLiveDisplay.dispose();
    }
    player.controlBar.removeChild('progressControl');
    player.controlBar.removeChild('liveDisplay');

    var liveButton = new videojs.dvrux.LiveButton(player, { name: 'LiveButtonDVR' });
    var progressControl = new videojs.dvrux.ProgressControl(player, { name: 'ProgressControlDVR' });
    var seekBar = new videojs.dvrux.SeekBar(player, { name: 'SeekBarDVR' });
    var loadProgressBar = new videojs.dvrux.LoadProgressBar(player, {
      name: 'LoadProgressBarDVR',
      parent: progressControl
    });
    var playProgressBar = new videojs.dvrux.PlayProgressBar(player, {
      name: 'PlayProgressBarDVR',
      parent: progressControl
    });
    var mouseTimeDisplay = new videojs.dvrux.MouseTimeDisplay(player, {
      name: 'MouseTimeDisplayDVR',
      parent: progressControl
    });
    var fullscreenButton = player.controlBar.getChild('FullscreenToggle');
    var progressControlFallback = player.controlBar.getChild('RemainingTimeDisplay') || player.controlBar.getChild('DurationDisplay') || player.controlBar.getChild('TimeDivider') || player.controlBar.getChild('CurrentTimeDisplay');

    seekBar.bar = playProgressBar;
    seekBar.addChild(loadProgressBar);
    seekBar.addChild(playProgressBar);
    seekBar.addChild(mouseTimeDisplay);

    progressControl.addChild(seekBar);

    var fullscreenButtonIndex = player.controlBar.children_.indexOf(fullscreenButton);

    player.controlBar.addChild(liveButton, videojs.mergeOptions(liveButton.options_, {
      name: 'LiveButtonDVR'
    }), fullscreenButtonIndex);
    var progressControlFallbackIndex = player.controlBar.children_.indexOf(progressControlFallback);

    player.controlBar.addChild(progressControl, {}, progressControlFallbackIndex);
    player.controlBar.addClass('vjs-live-status-ready');

    seekBar.on(player, 'timeupdate', seekBar.update);
    if (player.tech_.hls && player.tech_.hls.playlists) {
      player.tech_.hls.playlists.on('loadedplaylist', seekBar.update);
    }

    // initialize the ad container
    adContainer.className = 'vjs-dvrux-ad-container';
    tech.parentNode.insertBefore(adContainer, tech.nextSibling);

    var dvrControls = videojs.dvrux.player(adContainer, {
      contentPlayer: player
    });

    /** On Loadded metadata detects whether or not the stream has ended
      * and removes the Live status control if there is EndList tag
      */

    player.on('loadedmetadata', function () {
      var liveDVRButton = player.controlBar.getChild('LiveButtonDVR');

      if (player.duration() !== Infinity) {
        player.controlBar.removeClass('vjs-livedvr-control-bar');
        liveDVRButton.hide();
      } else {
        player.controlBar.addClass('vjs-livedvr-control-bar');
        liveDVRButton.show();
      }
    });

    return dvrControls;
  };

  /*
   Sets the player head to the live point, and updates the control bar accordingly
   */
  videojs.dvrux.seekToLive = function (contentPlayer) {
    var seekable = contentPlayer.seekable();
    var livePoint = seekable && seekable.length && seekable.end(0);

    // don't do anything if the source isn't live
    if (contentPlayer.duration() !== Infinity || !(livePoint > 0)) {
      return;
    }

    contentPlayer.currentTime(livePoint);

    contentPlayer.controlBar.addClass('vjs-live-status-live');
    contentPlayer.controlBar.removeClass('vjs-live-status-ready');
    contentPlayer.controlBar.removeClass('vjs-live-status-dvr');

    contentPlayer.play();
  };

  /**
   * A minimalist player that extends Component and uses that to construct
   * a separate control bar to playback the ad and content.
   */
  videojs.dvrux.ControlProxy = videojs.extend(videojs.getComponent('Component'), {
    buffered: function buffered() {
      return [];
    },
    /* eslint-disable object-shorthand */
    constructor: function constructor(elem, options, ready) {
      // run the prototype initializers
      videojs.getComponent('Component').call(this, this, options, ready);
    },
    /* eslint-enable object-shorthand */
    localize: function localize() {},
    getChild: function getChild(childName) {
      if (childName === 'textTrackSettings') {
        return this.options_.contentPlayer.getChild('textTrackSettings');
      }

      return this.getChild();
    }
  });

  /**
   * This player is then specialized by dvrux timeline to provide controls for ad
   * and content playback.
   * Returns a player decorated to proxy calls back and forth with the core videojs
   * @param options {object} a hash of options to pass to the player
   *
   * @returns {object} a videojs.dvrux.Controls
   */
  videojs.dvrux.player = function (elem, options) {
    var controlProxy = new videojs.dvrux.ControlProxy(elem, options);
    var contentPlayer = options.contentPlayer;

    // seekToLive on first play only
    contentPlayer.one('play', function () {
      // This is delayed to allow the correct live time to be used
      this.one('timeupdate', function () {
        videojs.dvrux.seekToLive(contentPlayer);
      });
    });

    contentPlayer.on('play', function () {
      controlProxy.trigger('play');
      // check if live
      controlProxy.updateLiveStatus();
    });

    contentPlayer.on('playing', function () {
      controlProxy.trigger('playing');
      controlProxy.updateLiveStatus();
    });

    // When the live stream stalls, the play progress updates
    // but the live button doesn't
    contentPlayer.on('stalled', function () {
      controlProxy.trigger('stalled');

      this.one(contentPlayer, 'timeupdate', function () {
        controlProxy.updateLiveStatus();
      });
    });

    contentPlayer.on('pause', function () {
      controlProxy.trigger('pause');
      contentPlayer.controlBar.addClass('vjs-live-status-dvr');
      contentPlayer.controlBar.removeClass('vjs-live-status-ready');
      contentPlayer.controlBar.removeClass('vjs-live-status-live');
    });

    controlProxy.pause = function () {
      controlProxy.trigger('pause');
      return contentPlayer.pause();
    };

    controlProxy.paused = function () {
      return contentPlayer.paused();
    };

    controlProxy.play = function () {
      controlProxy.trigger('play');
      return contentPlayer.play();
    };

    controlProxy.updateLiveStatus = function () {
      if (videojs.dvrux.playerIsLive(contentPlayer)) {
        contentPlayer.controlBar.addClass('vjs-live-status-live');
        contentPlayer.controlBar.removeClass('vjs-live-status-ready');
        contentPlayer.controlBar.removeClass('vjs-live-status-dvr');
      } else {
        contentPlayer.controlBar.addClass('vjs-live-status-dvr');
        contentPlayer.controlBar.removeClass('vjs-live-status-ready');
        contentPlayer.controlBar.removeClass('vjs-live-status-live');
      }
    };

    return controlProxy;
  };
})(window, window.document, window.videojs);'use strict';

(function (window, videojs) {
  var dom = videojs.dom || videojs;

  videojs.dvrux.LiveButton = videojs.extend(videojs.getComponent('Button'), {
    /* eslint-disable object-shorthand */
    constructor: function constructor(player, options) {
      videojs.getComponent('Button').call(this, player, options);
    }
    /* eslint-enable object-shorthand */
  });

  videojs.dvrux.LiveButton.prototype.handleClick = function () {
    videojs.dvrux.seekToLive(this.player_);
  };

  videojs.dvrux.LiveButton.prototype.createEl = function () {
    var el = videojs.getComponent('Button').prototype.createEl.call(this, 'button', {
      className: 'vjs-live-controls vjs-control'
    });

    this.contentEl_ = dom.createEl('button', {
      className: 'vjs-live-display',
      innerHTML: this.localize('LIVE').toLowerCase() + '<span class="vjs-control-text">' + this.localize('Stream Type') + '</span>'
    }, {
      'aria-live': 'off'
    });

    if (videojs.IS_ANDROID) {
      el.className += ' vjs-android-live-display';
    } else if (videojs.IS_EDGE) {
      el.className += ' vjs-edge-live-display';
    }

    el.appendChild(this.contentEl_);

    return el;
  };
})(window, window.videojs);'use strict';

(function (window, videojs) {
  /**
   * The Progress Control component contains the seek bar
   *
   * @param {vjs.Player|Object} player
   * @param {Object=} options
   * @constructor
   */
  videojs.dvrux.ProgressControl = videojs.extend(videojs.getComponent('Component'), {
    /** @constructor */
    /* eslint-disable object-shorthand */
    constructor: function constructor(player, options) {
      videojs.getComponent('Component').call(this, player, options);

      if (videojs.IS_ANDROID || videojs.IS_EDGE) {
        this.addClass('vjs-hidden');
      }
    }
    /* eslint-enable object-shorthand */
  });

  videojs.dvrux.ProgressControl.prototype.options_ = {};

  videojs.dvrux.ProgressControl.prototype.createEl = function () {
    return videojs.getComponent('Component').prototype.createEl.call(this, 'div', {
      className: 'vjs-progress-control vjs-control'
    });
  };

  /**
  * Formats the current time as a time behind live
  * where `live` is considered time `0:00`.
  * @param time in milliseconds
  * @param seekable the player's seekable
  * @return a formatted time string
  */
  videojs.dvrux.ProgressControl.formatBehindLiveTime = function (time, seekable) {
    var formatTime = seekable.end(0) - time;

    formatTime = formatTime < 0 || formatTime === Infinity ? 0 : formatTime;
    formatTime = (time === 0 ? '' : '-') + videojs.formatTime(formatTime, seekable.end(0));
    return formatTime;
  };

  /**
  * Get's the current live time, whether the play is scrubbing or not
  * @param the player to use
  * @return a formatted time string
  */
  videojs.dvrux.ProgressControl.getLiveTime = function (player) {
    var time = undefined;
    var seekable = player.seekable();

    if (!(seekable && seekable.length)) {
      return '-0:00';
    }

    if (player.scrubbing()) {
      time = player.getCache().currentTime;
    } else {
      time = player.currentTime();
    }

    return videojs.dvrux.ProgressControl.formatBehindLiveTime(time, seekable);
  };

  /**
  * @return the setting of keepTooltipsInside
  */
  videojs.dvrux.ProgressControl.shouldKeepTooltipsInside = function (options) {
    return options.playerOptions && options.playerOptions.controlBar && options.playerOptions.controlBar.progressControl && options.playerOptions.controlBar.progressControl.keepTooltipsInside;
  };
})(window, window.videojs);'use strict';

(function (window, videojs) {
  var TIME_FUDGE_FACTOR = 1 / 30;

  /**
  * The Seek Bar component contains the load progress, play progress and mouse display
  *
  * @param {vjs.Player|Object} player
  * @param {Object} options
  * @constructor
  */
  videojs.dvrux.SeekBar = videojs.extend(videojs.getComponent('SeekBar'), {
    /* eslint-disable object-shorthand */
    constructor: function constructor(player, options) {
      var _this = this;

      videojs.getComponent('SeekBar').call(this, player, options);
      this.on(player, 'timeupdate', this.updateARIAAttributes);
      this.on(player, 'ended', this.updateARIAAttributes);

      if (player.tech_.hls && player.tech_.hls.playlists) {
        player.tech_.hls.playlists.on('loadedplaylist', function () {
          return _this.updateARIAAttributes;
        });
      }

      player.ready(videojs.bind(this, this.updateARIAAttributes));

      if (videojs.dvrux.ProgressControl.shouldKeepTooltipsInside(player.options_)) {
        this.keepTooltipsInside = player.options_.playerOptions.controlBar.progressControl.keepTooltipsInside;
        this.tooltipProgressBar = new videojs.dvrux.TooltipProgressBar(player, {
          name: 'tooltipProgressBarDVR'
        });
      }
    }
    /* eslint-enable object-shorthand */
  });

  videojs.dvrux.SeekBar.prototype.options_ = {
    barName: 'playProgressBarDVR'
  };

  videojs.dvrux.SeekBar.prototype.createEl = function () {
    return videojs.getComponent('SeekBar').prototype.createEl.call(this, 'div', {
      className: 'vjs-progress-holder'
    }, {
      'aria-label': 'progress bar'
    });
  };

  /**
  * Updates the ARIA values set on the Seek Bar
  */
  videojs.dvrux.SeekBar.prototype.updateARIAAttributes = function () {
    var formatTime = videojs.dvrux.ProgressControl.getLiveTime(this.player_);

    if (formatTime) {
      // machine readable value of progress bar (percentage complete)
      this.el_.setAttribute('aria-valuenow', Number((this.getPercent() * 100).toFixed(2)));
      // user-friendly representation of value of progress bar (time complete)
      this.el_.setAttribute('aria-valuetext', formatTime);
    }
  };

  /**
  * Calculates the percentage of the stream watched over the total watchable time
  */
  videojs.dvrux.SeekBar.prototype.getPercent = function () {
    var seekable = this.player_.seekable();

    if (!seekable || !seekable.length || videojs.dvrux.playerIsLive(this.player_)) {
      return 1;
    }

    return (this.player_.currentTime() - seekable.start(0)) / videojs.dvrux.totalWindowTime(this.player_);
  };

  /**
  * Signals the beginning of scrubbing on the Seek Bar and pauses the player
  *
  * @param {Object} event Mouse event
  */
  videojs.dvrux.SeekBar.prototype.handleMouseDown = function (event) {
    videojs.getComponent('Slider').prototype.handleMouseDown.call(this, event);

    this.player_.scrubbing(true);
    this.player_.addClass('vjs-scrubbing');

    this.videoWasPlaying = !this.player_.paused();
    this.player_.pause();
  };

  /**
  * Handles scrubbing the Seek Bar with a mouse and changes the current time.
  *
  * @param event Mouse event
  */
  videojs.dvrux.SeekBar.prototype.handleMouseMove = function (event) {
    var newTime = undefined;
    var seekable = this.player_.seekable();

    if (seekable && seekable.length) {
      var seekableStart = seekable.start(0);
      var seekBarTime = this.calculateDistance(event) * videojs.dvrux.totalWindowTime(this.player_);

      newTime = seekableStart + seekBarTime;

      if (newTime !== Infinity) {
        var seekableEnd = seekable.end(0);

        // Don't let video end while scrubbing.
        if (newTime >= seekableEnd) {
          newTime = seekableEnd - TIME_FUDGE_FACTOR;
        }

        // Compensate for precision differences
        // so that currentTime is not less
        // than seekable start
        // Ex.
        //   seekable.start(0) = 1.99999999
        //   currentTime(seekable.start(0))
        //   currentTime() => 1.999999
        //   currentTime() < seekable.start(0) => true
        if (newTime <= seekableStart) {
          newTime = seekableStart + TIME_FUDGE_FACTOR;
        }

        // Set new time (tell player to seek to new time)
        this.player_.currentTime(newTime);
      }
    }
  };

  /**
  * Signals the end of scrubbing on the Seek Bar and goes to play state
  *
  * @param {Object} event Mouse event
  */
  videojs.dvrux.SeekBar.prototype.handleMouseUp = function (event) {
    videojs.getComponent('Slider').prototype.handleMouseUp.call(this, event);

    // Check currentTime one last time to avoid falling
    // out of the live window
    if (this.player_.currentTime() < this.player_.seekable().start(0)) {
      this.player_.currentTime(this.player_.seekable().start(0) + TIME_FUDGE_FACTOR);
    }

    this.player_.scrubbing(false);
    this.player_.removeClass('vjs-scrubbing');
    if (this.videoWasPlaying) {
      this.player_.play();
    }
  };

  videojs.dvrux.SeekBar.prototype.stepForward = function () {
    // more quickly fast forward for keyboard-only users
    this.player_.currentTime(this.player_.currentTime() + 5);

    if (videojs.dvrux.playerIsLive(this.player_)) {
      this.player_.controlBar.addClass('vjs-live-status-live');
      this.player_.controlBar.removeClass('vjs-live-status-ready');
      this.player_.controlBar.removeClass('vjs-live-status-dvr');
    }
  };

  videojs.dvrux.SeekBar.prototype.stepBack = function () {
    this.player_.controlBar.removeClass('vjs-live-status-ready');
    this.player_.controlBar.removeClass('vjs-live-status-live');
    this.player_.controlBar.addClass('vjs-live-status-dvr');

    // more quickly rewind for keyboard-only users
    this.player_.currentTime(this.player_.currentTime() - 5);
  };
})(window, window.videojs);'use strict';

(function (window, videojs) {
  /**
   * The Play Progress bar shows the region of the video that has been `watched`.
   *
   * @param {vjs.Player|Object} player
   * @param {Object} options
   */
  videojs.dvrux.PlayProgressBar = videojs.extend(videojs.getComponent('Component'), {
    /* eslint-disable object-shorthand */
    constructor: function constructor(player, options) {
      videojs.getComponent('Component').call(this, player, options);
      this.updateDataAttr();
      this.on(player, 'timeupdate', this.updateDataAttr);
      player.ready(videojs.bind(this, this.updateDataAttr));

      if (videojs.dvrux.ProgressControl.shouldKeepTooltipsInside(player.options_)) {
        this.keepTooltipsInside = player.options_.playerOptions.controlBar.progressControl.keepTooltipsInside;
        this.addClass('vjs-keep-tooltips-inside');
      }
    }
    /* eslint-enable object-shorthand */
  });

  videojs.dvrux.PlayProgressBar.prototype.options_ = {
    children: []
  };

  videojs.dvrux.PlayProgressBar.prototype.createEl = function () {
    return videojs.getComponent('Component').prototype.createEl.call(this, 'div', {
      className: 'vjs-play-progress vjs-slider-bar',
      innerHTML: '<span class="vjs-control-text"><span>' + this.localize('Progress') + '</span>: 0%</span>'
    });
  };

  /**
  * Updates the current live time,
  * and displays it in the inline tooltip if appropriate
  */
  videojs.dvrux.PlayProgressBar.prototype.updateDataAttr = function () {
    var formatTime = videojs.dvrux.ProgressControl.getLiveTime(this.player_);

    if (formatTime) {
      this.el_.setAttribute('data-current-time', formatTime);
    }
  };
  videojs.dvrux.PlayProgressBar.prototype.update = function () {};
})(window, window.videojs);'use strict';

(function (window, videojs) {
  var dom = videojs.dom || videojs;

  /**
   * The Load Progress bar contains and displays buffered segments in the progress bar.
   *
   * @param {vjs.Player|Object} player
   * @param {Object} options
   */
  videojs.dvrux.LoadProgressBar = videojs.extend(videojs.getComponent('Component'), {
    /* eslint-disable object-shorthand */
    constructor: function constructor(player, options) {
      var _this = this;

      videojs.getComponent('Component').call(this, player, options);
      this.on(player, 'progress', this.update);

      if (player.tech_.hls && player.tech_.hls.playlists) {
        player.tech_.hls.playlists.on('loadedplaylist', function () {
          return _this.update;
        });
      }
    }
    /* eslint-enable object-shorthand */
  });

  videojs.dvrux.LoadProgressBar.prototype.createEl = function () {
    return videojs.getComponent('Component').prototype.createEl.call(this, 'div', {
      className: 'vjs-load-progress',
      innerHTML: '<span class="vjs-control-text"><span>' + this.localize('Loaded') + '</span>: 0%</span>'
    });
  };

  /**
  * Styles elements representing buffered segments, and creates them if necessary.
  */
  videojs.dvrux.LoadProgressBar.prototype.update = function () {
    var buffered = this.player_.buffered();
    var bufferedEnd = buffered.end(0);
    var duration = videojs.dvrux.totalWindowTime(this.player_);
    var children = this.el_.children;
    // get the percent width of a time compared to the total end
    var percentify = function percentify(time, end) {
      // no NaN
      var percent = time / end || 0;

      return (percent >= 1 ? 100 : percent * 100) + '%';
    };

    // update the width of the progress bar
    this.el_.style.width = percentify(bufferedEnd, duration);

    // add child elements to represent the individual buffered time ranges
    for (var i = 0; i < buffered.length; i++) {
      var start = buffered.start(i);
      var end = buffered.end(i);
      var part = children[i];

      if (!part) {
        part = this.el_.appendChild(dom.createEl());
      }

      // set the percent based on the width of the progress bar (bufferedEnd)
      part.style.left = percentify(start, bufferedEnd);
      part.style.width = percentify(end - start, bufferedEnd);
    }

    // remove unused buffered range elements
    for (var i = children.length; i > buffered.length; i--) {
      this.el_.removeChild(children[i - 1]);
    }
  };
})(window, window.videojs);'use strict';

(function (window, document, videojs) {
  /**
  * Calls func at most once after `wait` milliseconds.
  *
  * @param func, the function to be throttled
  * @param wait, the amount of time(ms) to throttle function executions
  * @returns a throttled function
  **/
  // Warn if another alias other than thisArg is used for this
  /* eslint consistent-this: [1, "thisArg"] */
  var throttle = function throttle(func, wait) {
    var args = undefined;
    var throttled = undefined;
    var thisArg = this;
    var count = 0;
    var fixedWait = Math.max(0, wait || 0);
    var lastCallTime = 0;
    var remainingTime = 0;
    var maxTimeout = null;
    var reset = function reset() {
      clearTimeout(maxTimeout);
      maxTimeout = null;
      count = 0;
    };
    var delayedFunc = function delayedFunc() {
      reset();
      lastCallTime = new Date().getTime();
      throttled = func.apply(thisArg, args);
    };

    return function () {
      var now = new Date().getTime();

      thisArg = this;
      args = arguments;
      count++;

      if (!maxTimeout) {
        lastCallTime = now;
      }

      remainingTime = fixedWait - (now - lastCallTime);
      if (remainingTime <= 0) {
        lastCallTime = now;
        clearTimeout(maxTimeout);
        maxTimeout = null;
        throttled = func.apply(thisArg, args);
      } else if (!maxTimeout && remainingTime > 0) {
        maxTimeout = setTimeout(delayedFunc, remainingTime);
      }

      return throttled;
    };
  };

  /**
  * Find the x-coordinate of the element's position
  * getBoundingClientRect technique from
  * John Resig http://ejohn.org/blog/getboundingclientrect-is-awesome/
  */
  var findElX = function findElX(el) {
    var box = undefined;

    if (el.getBoundingClientRect && el.parentNode) {
      box = el.getBoundingClientRect();
    }

    if (!box) {
      return 0;
    }

    var docEl = document.documentElement;
    var body = document.body;

    var clientLeft = docEl.clientLeft || body.clientLeft || 0;
    var scrollLeft = window.pageXOffset || body.scrollLeft;
    var left = box.left + scrollLeft - clientLeft;

    // Android sometimes returns slightly off decimal values, so need to round
    return Math.round(left);
  };

  /**
  * Find the x-coordinate of the mouse pointer position
  */
  var getPointerX = function getPointerX(el, event) {
    var pageX = undefined;
    var boxW = el.offsetWidth;
    var boxX = findElX(el);

    if (event.changedTouches) {
      pageX = event.changedTouches[0].pageX;
    } else {
      pageX = event.pageX;
    }

    return Math.max(0, Math.min(1, (pageX - boxX) / boxW));
  };

  /**
   * The Mouse Time Display shows the time behind live when a
   * user hovers over the progress bar.
   *
   * @param {vjs.Player|Object} player
   * @param {Object} options
   */
  videojs.dvrux.MouseTimeDisplay = videojs.extend(videojs.getComponent('MouseTimeDisplay'), {
    /* eslint-disable object-shorthand */
    constructor: function constructor(player, options) {
      videojs.getComponent('Component').call(this, player, options);
      var progressControl = options.parent;

      if (videojs.dvrux.ProgressControl.shouldKeepTooltipsInside(player.options_)) {
        this.keepTooltipsInside = player.options_.playerOptions.controlBar.progressControl.keepTooltipsInside;
        this.tooltip = videojs.getComponent('Component').prototype.createEl.call(this, 'div', {
          className: 'vjs-time-tooltip'
        }, {
          'aria-label': 'time tooltip'
        });
        this.el_.appendChild(this.tooltip);
        this.addClass('vjs-keep-toolstips-inside');

        if (videojs.IS_TOUCH_ENABLED || videojs.IS_IPHONE || videojs.IS_EDGE || videojs.IS_ANDROID) {
          this.addClass('vjs-hide-tooltips');
        }
      }

      this.update();

      this.on(progressControl.el(), 'mousemove', throttle(videojs.bind(this, this.handleMouseMove), 25));

      this.on(progressControl.el(), ['touchmove', 'touchend'], throttle(videojs.bind(this, this.handleMouseMove), 25));
    }
    /* eslint-enable object-shorthand */
  });

  videojs.dvrux.MouseTimeDisplay.prototype.createEl = function () {
    return videojs.getComponent('Component').prototype.createEl.call(this, 'div', {
      className: 'vjs-mouse-display'
    }, {
      'aria-live': 'assertive'
    });
  };

  /**
  * This gets the time to be shown in the tooltip and its position based
  * on the current mouse position over the progress bar.
  *
  * @param event Mouse event
  */
  videojs.dvrux.MouseTimeDisplay.prototype.handleMouseMove = function (event) {
    var seekable = this.player_.seekable();
    var duration = this.player_.duration() !== Infinity || !(seekable && seekable.length) ? videojs.dvrux.totalWindowTime(this.player_) : seekable.end(0);

    var newTime = getPointerX(this.el().parentNode, event) * duration;
    var position = event.pageX - findElX(this.el().parentNode);

    this.update(newTime, position);
  };

  /**
  * Style this element based on the position given and update the time shown.
  * If keepTooltipsInside is set, make sure the tooltip does not get cut off
  * outside the bounds of the player.
  *
  * @param newTime the time to be set in the tooltip in milliseconds
  * @param position the position to align the tooltip to
  */
  videojs.dvrux.MouseTimeDisplay.prototype.update = function (newTime, position) {
    var time = undefined;
    var seekable = this.player_.seekable();

    if (!newTime) {
      if (!(seekable && seekable.length)) {
        time = videojs.formatTime(0, videojs.dvrux.totalWindowTime(this.player_));
      } else {
        time = videojs.dvrux.ProgressControl.getLiveTime(this.player_);
      }
    } else if (this.player_.duration() !== Infinity) {
      time = videojs.formatTime(newTime, newTime);
    } else {
      time = videojs.dvrux.ProgressControl.formatBehindLiveTime(newTime, seekable);
    }

    var positionX = undefined;
    var parent = this.player_.controlBar;

    if (!position) {
      positionX = findElX(parent) + parent.currentWidth();
    } else {
      positionX = position;
    }

    this.el().style.left = positionX + 'px';
    this.el().setAttribute('data-current-time', time);

    // vjs6 support
    if (this.getChild('timeTooltip')) {
      this.getChild('timeTooltip').el().innerHTML = time;
    }

    if (this.keepTooltipsInside) {
      var tooltipWidth = parseFloat(window.getComputedStyle(this.tooltip).width) || 0;
      var tooltipWidthHalf = tooltipWidth / 2;
      var clampedPosition = this.clampPosition_(positionX, tooltipWidthHalf);
      var difference = positionX - clampedPosition + 1;
      var rightPosition = tooltipWidthHalf - difference;

      this.tooltip.innerHTML = time;
      this.tooltip.style.right = '-' + rightPosition + 'px';
    }
  };

  /**
   * Takes in a horizontal position for the bar and returns a clamped position.
   * Clamped position means that it will keep the tooltip on the player if the
   * user hovers off the left or right side of the progress bar.
   * It will only clamp the position if `keepTooltipsInside` option is set.
   *
   * @param {Number} position the position the bar wants to be
   * @return {Number} newPosition the (potentially) clamped position
   */
  videojs.dvrux.MouseTimeDisplay.prototype.clampPosition_ = function (position, tooltipWidthHalf) {
    if (!this.keepTooltipsInside) {
      return position;
    }

    var playerWidth = parseFloat(window.getComputedStyle(this.player_.el()).width);
    var actualPosition = position;

    if (position < tooltipWidthHalf) {
      actualPosition = Math.ceil(tooltipWidthHalf);
    } else if (position > playerWidth - tooltipWidthHalf) {
      actualPosition = Math.floor(playerWidth - tooltipWidthHalf);
    }

    return actualPosition;
  };
})(window, window.document, window.videojs);'use strict';

(function (window, videojs) {
  /**
   * The Tooltip Progress bar is a component that contains the current live time.
   * It can be included in either the Play Progress bar or the Mouse Time Display.
   *
   * @param {vjs.Player|Object} player
   * @param {Object} options
   */
  videojs.dvrux.TooltipProgressBar = videojs.extend(videojs.getComponent('Component'), {
    /* eslint-disable object-shorthand */
    constructor: function constructor(player, options) {
      var _this = this;

      videojs.getComponent('Component').call(this, player, options);
      this.on(player, 'timeupdate', this.updateDataAttr);

      if (player.tech_.hls && player.tech_.hls.playlists) {
        player.tech_.hls.playlists.on('loadedplaylist', function () {
          return _this.updateDataAttr;
        });
      }

      player.ready(videojs.bind(this, this.updateDataAttr));
    }
    /* eslint-enable object-shorthand */
  });

  videojs.dvrux.TooltipProgressBar.prototype.createEl = function () {
    var el = videojs.getComponent('Component').prototype.createEl.call(this, 'div', {
      className: 'vjs-tooltip-progress-bar vjs-slider-bar',
      innerHTML: '<div class="vjs-time-tooltip"></div>' + '<span class="vjs-control-text"><span>' + this.localize('Progress') + '</span>: 0%</span>'
    });

    this.tooltip = el.querySelector('.vjs-time-tooltip');
    return el;
  };

  /**
  * Updates the current live time and displays it within this element.
  */
  videojs.dvrux.TooltipProgressBar.prototype.updateDataAttr = function () {
    var formatTime = videojs.dvrux.ProgressControl.getLiveTime(this.player_);

    if (formatTime) {
      this.el_.setAttribute('data-current-time', formatTime);
      this.tooltip.innerHTML = formatTime;
    }
  };
})(window, window.videojs);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});