/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "../dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(6);

var assertThisInitialized = __webpack_require__(7);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(8);

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),
/* 4 */
/***/ (function(module) {

module.exports = {"a":"0.0.1"};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(0);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(1);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(2);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inherits.js
var inherits = __webpack_require__(3);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: ./package.json
var package_0 = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(5);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// CONCATENATED MODULE: ./src/appear.js



var appear_Appear =
/*#__PURE__*/
function () {
  function Appear() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    classCallCheck_default()(this, Appear);

    this.scrollLastPos = null;
    this.scrollTimer = 0;
    this.scroll = {};
    this.initd = false;
    this.elements = [];
    this.reappear = [];
    this.appeared = 0;
    this.disappeared = 0;
    document.addEventListener('scroll', this.track.bind(this), false); // assign the fn to execute when a node is visible

    this.opts = {
      // a function to be run when the dom is ready (allows for any setup work)
      init: obj.init,
      // either an array of elements or a function that will return an htmlCollection
      elements: obj.elements,
      // function to call when an element is "viewable", will be passed the element to work with
      appear: obj.appear,
      // function to call when an element is no longer "viewable", will be passed the element to work with
      disappear: obj.disappear,
      // function to call when all the elements have "appeared"
      done: obj.done,
      // keep tracking the elements
      reappear: obj.reappear,
      // the extra border around an element to make it viewable outside of the true viewport
      bounds: obj.bounds || 0,
      // the debounce timeout
      debounce: obj.debounce || 50,
      // appear.js will also check for items on continuous slow scrolling
      // you can controll how slow the scrolling should be  (deltaSpeed)
      // and when it will check again (deltaTimeout) after it has inspected the dom/viewport;
      delta: {
        speed: obj.deltaSpeed || 50,
        timeout: obj.deltaTimeout || 500
      } // add an event listener to init when dom is ready

    };
    addEventListener('DOMContentLoaded', this.init.bind(this), false); // call init if document is ready to be worked with and we missed the event

    if (document.readyState === 'complete' || document.readyState === 'loaded' || document.readyState === 'interactive') {
      this.init();
    }

    var appearInst = this;
    return {
      // manually fire check for visibility of tracked elements
      trigger: function trigger() {
        appearInst.doCheckAppear();
      },
      // pause tracking of elements
      pause: function pause() {
        appearInst.removeListeners();
      },
      // resume tracking of elements after a pause
      resume: function resume() {
        appearInst.begin();
      },
      // provide a means to stop monitoring all elements
      destroy: function destroy() {
        appearInst.end();
      }
    };
  }

  createClass_default()(Appear, [{
    key: "track",
    value: function track() {
      var _this = this;

      var newPos = window.scrollY || window.pageYOffset; // pageYOffset for IE9

      if (this.scrollLastPos != null) {
        scroll.velocity = newPos - this.scrollLastPos;
        scroll.delta = scroll.velocity >= 0 ? scroll.velocity : -1 * scroll.velocity;
      }

      this.scrollLastPos = newPos;

      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer);
      }

      this.scrollTimer = setTimeout(function () {
        _this.scrollLastPos = null;
      }, 30);
    }
  }, {
    key: "viewable",
    value: function viewable(el) {
      var rect = el.getBoundingClientRect();
      return rect.top + rect.height >= rect.height * 0.5 && // view at least 50%
      rect.left + rect.width >= rect.width * 0.5 && rect.bottom - rect.height <= (window.innerHeight || document.documentElement.clientHeight) - rect.height * 0.5 && // view at least 50%
      rect.right - rect.width <= (window.innerWidth || document.documentElement.clientWidth) - rect.height * 0.5;
    } // handle debouncing a function for better performance on scroll

  }, {
    key: "debounce",
    value: function debounce(fn, delay) {
      var _this2 = this,
          _arguments = arguments;

      return function () {
        var self = _this2;
        var args = _arguments;
        clearTimeout(_this2.timer);
        _this2.timer = setTimeout(function () {
          fn.apply(self, args);
        }, delay);
      };
    } // called on scroll and resize event, so debounce the actual function that does
    // the heavy work of determining if an item is viewable and then "appearing" it

  }, {
    key: "checkAppear",
    value: function checkAppear() {
      var _this3 = this;

      if (this.scroll.delta < this.opts.delta.speed) {
        if (!this.deltaSet) {
          this.deltaSet = true;
          this.doCheckAppear();
          setTimeout(function () {
            _this3.deltaSet = false;
          }, this.opts.delta.timeout);
        }
      }

      this.debounce(function () {
        _this3.doCheckAppear();
      }, this.opts.debounce)();
    }
  }, {
    key: "begin",
    value: function begin() {
      // initial appear check before any scroll or resize event
      this.doCheckAppear(); // add relevant listeners

      addEventListener('scroll', this.checkAppear.bind(this), false);
      addEventListener('resize', this.checkAppear.bind(this), false);
    }
  }, {
    key: "end",
    value: function end() {
      this.elements = [];

      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.removeListeners();
    }
  }, {
    key: "removeListeners",
    value: function removeListeners() {
      removeEventListener('scroll', this.checkAppear.bind(this), false);
      removeEventListener('resize', this.checkAppear.bind(this), false);
    }
  }, {
    key: "doCheckAppear",
    value: function doCheckAppear() {
      var _this4 = this;
console.log('!!!!!1!!!!!!!!')
      if (this.done) {
        return;
      }
console.log('!!!!!w!!!!!!!!')

      this.elements.forEach(function (n, i) {
        if (n && _this4.viewable(n, _this4.opts.bounds)) {
          // only act if the element is eligible to reappear
          console.log(_this4.reappear[i]  )
          if (_this4.reappear[i]) {
            // mark this element as not eligible to appear
            _this4.reappear[i] = false; // increment the count of appeared items

            _this4.appeared++; // call the appear fn
console.log('!!!!!2!!!!!!!!')
            if (_this4.opts.appear) {
              _this4.opts.appear(n);
            } // if not tracking reappears or disappears, need to remove node here


            if (!_this4.opts.disappear && !_this4.opts.reappear) {
              // stop tracking this node, which is now viewable
              _this4.elements[i] = null;
            }
          }
        } else {
          if (_this4.reappear[i] === false) {
            if (_this4.opts.disappear) {
              _this4.opts.disappear(n);
            } // increment the dissappeared count


            _this4.disappeared++; // if not tracking reappears, need to remove node here

            if (!_this4.opts.reappear) {
              // stop tracking this node, which is now viewable
              _this4.elements[i] = null;
            }
          } // element is out of view and eligible to be appeared again


          _this4.reappear[i] = true;
        }
      }); // remove listeners if all items have (re)appeared

      if (!this.opts.reappear && (!this.opts.appear || this.opts.appear && this.appeared === this.elementsLength) && (!this.opts.disappear || this.opts.disappear && this.disappeared === this.elementsLength)) {
        // ensure done is only called once (could be called from a trailing debounce/throttle)
        this.done = true;
        this.removeListeners(); // all items have appeared, so call the done fn

        if (this.opts.done) {
          this.opts.done();
        }
      }
    }
  }, {
    key: "init",
    value: function init() {
      // make sure we only init once
      if (this.initd) {
        return;
      }

      this.initd = true; // call the obj init fn

      if (this.opts.init) {
        this.opts.init();
      } // get the elements to work with


      var els;

      if (typeof this.opts.elements === 'function') {
        els = this.opts.elements();
      } else {
        els = this.opts.elements;
      }

      if (els) {
        //  put elements into an array object to work with
        this.elementsLength = els.length;

        for (var i = 0; i < this.elementsLength; i += 1) {
          this.elements.push(els[i]);
          this.reappear.push(true);
        }

        this.begin();
      }
    }
  }]);

  return Appear;
}();


// CONCATENATED MODULE: ./src/plugin.js






var Plugin = videojs.getPlugin('plugin'); // Default options for the plugin.

var defaults = {};
/**
 * An advanced Video.js plugin. For more information on the API
 */

var plugin_ViewablePlugin =
/*#__PURE__*/
function (_Plugin) {
  inherits_default()(ViewablePlugin, _Plugin);

  /**
   * Create a Viewable plugin instance.
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
  function ViewablePlugin(player, options) {
    var _this;

    classCallCheck_default()(this, ViewablePlugin);

    // the parent class will add player under this.player
    _this = possibleConstructorReturn_default()(this, getPrototypeOf_default()(ViewablePlugin).call(this, player));
    _this.options = videojs.mergeOptions(defaults, options);

    _this.player.on('loadedmetadata', function () {
      _this.player.addClass('vjs-viewable');

      _this.player.appear = new appear_Appear({
        init: function init() {},
        elements: [_this.player.el()],
        appear: function appear(el) {
          console.log('!!!!!!!!!!!!!!', player)
          player.viewable = true;
          player.trigger('viewable');
        },
        disappear: function disappear(el) {
          player.viewable = false;
          player.trigger('viewable');
        },
        reappear: true
      });
      _this.player.getViewable = _this.player.appear.trigger;
    });

    return _this;
  }

  return ViewablePlugin;
}(Plugin); // Define default values for the plugin's `state` object here.


plugin_ViewablePlugin.defaultState = {}; // Include the version number.

plugin_ViewablePlugin.VERSION = package_0["a" /* version */]; // Register the plugin with video.js.

videojs.registerPlugin('viewable', plugin_ViewablePlugin);
/* harmony default export */ var src_plugin = __webpack_exports__["default"] = (plugin_ViewablePlugin);

/***/ })
/******/ ]);