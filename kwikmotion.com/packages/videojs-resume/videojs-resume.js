(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* Copyright (c) 2010-2013 Marcus Westin */
(function(e){function o(){try{return r in e&&e[r]}catch(t){return!1}}var t={},n=e.document,r="localStorage",i="script",s;t.disabled=!1,t.version="1.3.17",t.set=function(e,t){},t.get=function(e,t){},t.has=function(e){return t.get(e)!==undefined},t.remove=function(e){},t.clear=function(){},t.transact=function(e,n,r){r==null&&(r=n,n=null),n==null&&(n={});var i=t.get(e,n);r(i),t.set(e,i)},t.getAll=function(){},t.forEach=function(){},t.serialize=function(e){return JSON.stringify(e)},t.deserialize=function(e){if(typeof e!="string")return undefined;try{return JSON.parse(e)}catch(t){return e||undefined}};if(o())s=e[r],t.set=function(e,n){return n===undefined?t.remove(e):(s.setItem(e,t.serialize(n)),n)},t.get=function(e,n){var r=t.deserialize(s.getItem(e));return r===undefined?n:r},t.remove=function(e){s.removeItem(e)},t.clear=function(){s.clear()},t.getAll=function(){var e={};return t.forEach(function(t,n){e[t]=n}),e},t.forEach=function(e){for(var n=0;n<s.length;n++){var r=s.key(n);e(r,t.get(r))}};else if(n.documentElement.addBehavior){var u,a;try{a=new ActiveXObject("htmlfile"),a.open(),a.write("<"+i+">document.w=window</"+i+'><iframe src="/favicon.ico"></iframe>'),a.close(),u=a.w.frames[0].document,s=u.createElement("div")}catch(f){s=n.createElement("div"),u=n.body}var l=function(e){return function(){var n=Array.prototype.slice.call(arguments,0);n.unshift(s),u.appendChild(s),s.addBehavior("#default#userData"),s.load(r);var i=e.apply(t,n);return u.removeChild(s),i}},c=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g");function h(e){return e.replace(/^d/,"___$&").replace(c,"___")}t.set=l(function(e,n,i){return n=h(n),i===undefined?t.remove(n):(e.setAttribute(n,t.serialize(i)),e.save(r),i)}),t.get=l(function(e,n,r){n=h(n);var i=t.deserialize(e.getAttribute(n));return i===undefined?r:i}),t.remove=l(function(e,t){t=h(t),e.removeAttribute(t),e.save(r)}),t.clear=l(function(e){var t=e.XMLDocument.documentElement.attributes;e.load(r);for(var n=0,i;i=t[n];n++)e.removeAttribute(i.name);e.save(r)}),t.getAll=function(e){var n={};return t.forEach(function(e,t){n[e]=t}),n},t.forEach=l(function(e,n){var r=e.XMLDocument.documentElement.attributes;for(var i=0,s;s=r[i];++i)n(s.name,t.deserialize(e.getAttribute(s.name)))})}try{var p="__storejs__";t.set(p,p),t.get(p)!=p&&(t.disabled=!0),t.remove(p)}catch(f){t.disabled=!0}t.enabled=!t.disabled,typeof module!="undefined"&&module.exports&&this.module!==module?module.exports=t:typeof define=="function"&&define.amd?define(t):e.store=t})(Function("return this")())
},{}],2:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

//import store from 'store';

var store = global.store = require('store/store.min');

var Button = _videoJs2['default'].getComponent('Button');
var Component = _videoJs2['default'].getComponent('Component');
var ModalDialog = _videoJs2['default'].getComponent('ModalDialog');

var ResumeButton = (function (_Button) {
  _inherits(ResumeButton, _Button);

  function ResumeButton(player, options) {
    _classCallCheck(this, ResumeButton);

    _get(Object.getPrototypeOf(ResumeButton.prototype), 'constructor', this).call(this, player, options);
    this.resumeFromTime = options.resumeFromTime;
    this.player = player;
  }

  _createClass(ResumeButton, [{
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-resume';
    }
  }, {
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(ResumeButton.prototype), 'createEl', this).call(this, 'button', {
        innerHTML: '' + this.options_.buttonText
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      var plres = this.player || this.player_;
      plres.resumeModal.close();
      plres.currentTime(this.resumeFromTime);
      plres.play();
      plres.trigger('resumevideo');
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(event) {
      var plres = this.player || this.player_;
      // Check for space bar (32) or enter (13) keys
      if (event.which === 32 || event.which === 13) {
        if (plres.paused()) {
          plres.play();
        } else {
          plres.pause();
        }
        event.preventDefault();
      }
    }
  }]);

  return ResumeButton;
})(Button);

ResumeButton.prototype.controlText_ = 'Resume';

var ResumeCancelButton = (function (_Button2) {
  _inherits(ResumeCancelButton, _Button2);

  function ResumeCancelButton(player, options) {
    _classCallCheck(this, ResumeCancelButton);

    _get(Object.getPrototypeOf(ResumeCancelButton.prototype), 'constructor', this).call(this, player, options);
    this.player = player;
  }

  _createClass(ResumeCancelButton, [{
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-no-resume';
    }
  }, {
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(ResumeCancelButton.prototype), 'createEl', this).call(this, 'button', {
        innerHTML: '' + this.options_.buttonText
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      var plres = this.player || this.player_;
      plres.resumeModal.close();
      plres.play();
      console.log('[videojs-resume] Resume stored key by cancel button');
      store.remove(this.options_.key);
    }
  }]);

  return ResumeCancelButton;
})(Button);

var ModalButtons = (function (_Component) {
  _inherits(ModalButtons, _Component);

  function ModalButtons(player, options) {
    _classCallCheck(this, ModalButtons);

    _get(Object.getPrototypeOf(ModalButtons.prototype), 'constructor', this).call(this, player, options);
    this.addChild('ResumeButton', {
      buttonText: options.resumeButtonText,
      resumeFromTime: options.resumeFromTime
    });
    this.addChild('ResumeCancelButton', {
      buttonText: options.cancelButtonText,
      key: options.key
    });
  }

  _createClass(ModalButtons, [{
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(ModalButtons.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-resume-modal-buttons',
        innerHTML: '\n        <p>' + this.options_.title + '</p>\n      '
      });
    }
  }]);

  return ModalButtons;
})(Component);

var ResumeModal = (function (_ModalDialog) {
  _inherits(ResumeModal, _ModalDialog);

  function ResumeModal(player, options) {
    _classCallCheck(this, ResumeModal);

    _get(Object.getPrototypeOf(ResumeModal.prototype), 'constructor', this).call(this, player, options);
    this.player_.resumeModal = this;
    this.open();
    this.addChild('ModalButtons', {
      title: options.title,
      resumeButtonText: options.resumeButtonText,
      cancelButtonText: options.cancelButtonText,
      resumeFromTime: options.resumeFromTime,
      key: options.key
    });
  }

  _createClass(ResumeModal, [{
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-resume-modal ' + _get(Object.getPrototypeOf(ResumeModal.prototype), 'buildCSSClass', this).call(this);
    }
  }]);

  return ResumeModal;
})(ModalDialog);

_videoJs2['default'].registerComponent('ResumeButton', ResumeButton);
_videoJs2['default'].registerComponent('ResumeCancelButton', ResumeCancelButton);
_videoJs2['default'].registerComponent('ModalButtons', ModalButtons);
_videoJs2['default'].registerComponent('ResumeModal', ResumeModal);

var Resume = function Resume(options) {
  var msg = undefined;

  if (!store) {
    return _videoJs2['default'].log('store.js is not available');
  }
  if (!store.enabled) {
    msg = 'Local storage is not supported by your browser.';
    msg += ' Please disable "Private Mode", or upgrade to a modern browser.';
    return _videoJs2['default'].log(msg);
  }

  var videoId = options.uuid;
  var title = options.title || 'Resume from where you left off?';
  var resumeButtonText = options.resumeButtonText || 'Resume';
  var cancelButtonText = options.cancelButtonText || 'No Thanks';
  var playbackOffset = options.playbackOffset || 0;
  var key = 'videojs-resume:' + videoId;

  this.on('timeupdate', function () {
    if (this.duration() === Infinity) {
      // No store for live
      return false;
    }
    console.log('[videojs-resume] Store time ' + this.currentTime());
    store.set(key, this.currentTime());
  });

  this.one(['ended', 'contentended'], function (e) {
    console.log('[videojs-resume] Remove key on play ended event:' + e.type);
    store.remove(key);
  });

  var resumeFromTime = store.get(key);

  this.ready(function () {
    if (this.duration() === Infinity) {
      // No store for live
      return false;
    }
    console.log('[videojs-resume] You have stored time for this media. mediaid: ' + key + ' time: ' + resumeFromTime);

    if (resumeFromTime) {
      if (resumeFromTime >= 5) {
        resumeFromTime -= playbackOffset;
      }
      if (resumeFromTime <= 2 || resumeFromTime > this.duration() - 2) {
        resumeFromTime = 0;
        return false;
      }
      if (this.options_ && this.options_.autostart) {
        this.options_.autostart = false;
      }
      this.addChild('ResumeModal', {
        title: title,
        resumeButtonText: resumeButtonText,
        cancelButtonText: cancelButtonText,
        resumeFromTime: resumeFromTime,
        key: key
      });
    }
  });
  return resumeFromTime;
};

_videoJs2['default'].registerPlugin('Resume', Resume);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"store/store.min":1}]},{},[2]);
