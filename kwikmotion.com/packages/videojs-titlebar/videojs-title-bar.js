/**
 * videojs-title-bar
 * @version 1.0.0
 * @copyright 2019 NOC
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsTitleBar = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

// Default options for the plugin.
var defaults = { title: undefined };

/**
 * Function to invoke when the player is ready.
 *
 * @function onPlayerReady
 * @param    {Player} player
 * @param    {Object} [options={}]
 */
var onPlayerReady = function onPlayerReady(player, options) {
  var videoEl = player.el();
  var div = document.createElement('div');

  player.addClass('vjs-title-bar');

  if (!options.title) {
    return;
  }

  div.innerHTML = options.title;
  div.classList.add('vjs-title-bar-content');

  videoEl.appendChild(div);
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function titleBar
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
var titleBar = function titleBar(options) {
  var _this = this;

  this.ready(function () {
    onPlayerReady(_this, _videoJs2['default'].mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
var registerPlugin = _videoJs2['default'].registerPlugin || _videoJs2['default'].plugin;
registerPlugin('titleBar', titleBar);

// Include the version number.
titleBar.VERSION = '1.0.0';

exports['default'] = titleBar;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});
