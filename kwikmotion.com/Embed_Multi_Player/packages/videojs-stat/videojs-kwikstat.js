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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);

var JSON_PIWIK = window.JSON; // asynchronous tracker (or proxy)

window._paq = window._paq || []; // Piwik singleton and namespace

if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(window.Piwik) !== 'object') {
  window.Matomo = window.Piwik = function () {
    'use strict';
    /************************************************************
         * Private data
         ************************************************************/

    var expireDateTime;
    /* plugins */

    var plugins = {};
    var eventHandlers = {};
    /* alias frequently used globals for added minification */

    var documentAlias = document;
    var navigatorAlias = navigator;
    var screenAlias = screen;
    var windowAlias = window;
    /* performance timing */

    var performanceAlias = windowAlias.performance || windowAlias.mozPerformance || windowAlias.msPerformance || windowAlias.webkitPerformance;
    /* encode */

    var encodeWrapper = windowAlias.encodeURIComponent;
    /* decode */

    var decodeWrapper = windowAlias.decodeURIComponent;
    /* urldecode */

    var urldecode = unescape;
    /* asynchronous tracker */

    var asyncTrackers = [];
    /* iterator */

    var iterator;
    /* local Piwik */

    var Piwik;
    var missedPluginTrackerCalls = [];
    var isPageUnloading = false;
    /************************************************************
         * Private methods
         ************************************************************/

    /**
         * See https://github.com/piwik/piwik/issues/8413
         * To prevent Javascript Error: Uncaught URIError: URI malformed when encoding is not UTF-8. Use this method
         * instead of decodeWrapper if a text could contain any non UTF-8 encoded characters eg
         * a URL like http://apache.piwik/test.html?%F6%E4%FC or a link like
         * <a href="test-with-%F6%E4%FC/story/0">(encoded iso-8859-1 URL)</a>
         */

    function safeDecodeWrapper(url) {
      try {
        return decodeWrapper(url);
      } catch (e) {
        return unescape(url);
      }
    }
    /*
         * Is property defined?
         */


    function isDefined(property) {
      // workaround https://github.com/douglascrockford/JSLint/commit/24f63ada2f9d7ad65afc90e6d949f631935c2480
      var propertyType = _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(property);

      return propertyType !== 'undefined';
    }
    /*
         * Is property a function?
         */


    function isFunction(property) {
      return typeof property === 'function';
    }
    /*
         * Is property an object?
         *
         * @return bool Returns true if property is null, an Object, or subclass of Object (i.e., an instanceof String, Date, etc.)
         */


    function isObject(property) {
      return _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(property) === 'object';
    }
    /*
         * Is property a string?
         */


    function isString(property) {
      return typeof property === 'string' || property instanceof String;
    }

    function isObjectEmpty(property) {
      if (!property) {
        return true;
      }

      var i;
      var isEmpty = true;

      for (i in property) {
        if (Object.prototype.hasOwnProperty.call(property, i)) {
          isEmpty = false;
        }
      }

      return isEmpty;
    }
    /**
         * Logs an error in the console.
         *  Note: it does not generate a JavaScript error, so make sure to also generate an error if needed.
         * @param message
         */


    function logConsoleError(message) {
      // needed to write it this way for jslint
      var consoleType = typeof console === "undefined" ? "undefined" : _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(console);

      if (consoleType !== 'undefined' && console && console.error) {
        console.error(message);
      }
    }
    /*
         * apply wrapper
         *
         * @param array parameterArray An array comprising either:
         *      [ 'methodName', optional_parameters ]
         * or:
         *      [ functionObject, optional_parameters ]
         */


    function apply() {
      var i, j, f, parameterArray, trackerCall;

      for (i = 0; i < arguments.length; i += 1) {
        trackerCall = null;

        if (arguments[i] && arguments[i].slice) {
          trackerCall = arguments[i].slice();
        }

        parameterArray = arguments[i];
        f = parameterArray.shift();
        var fParts, context;
        var isStaticPluginCall = isString(f) && f.indexOf('::') > 0;

        if (isStaticPluginCall) {
          // a static method will not be called on a tracker and is not dependent on the existence of a
          // tracker etc
          fParts = f.split('::');
          context = fParts[0];
          f = fParts[1];

          if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(Piwik[context]) === 'object' && typeof Piwik[context][f] === 'function') {
            Piwik[context][f].apply(Piwik[context], parameterArray);
          } else if (trackerCall) {
            // we try to call that method again later as the plugin might not be loaded yet
            // a plugin can call "Piwik.retryMissedPluginCalls();" once it has been loaded and then the
            // method call to "Piwik[context][f]" may be executed
            missedPluginTrackerCalls.push(trackerCall);
          }
        } else {
          for (j = 0; j < asyncTrackers.length; j++) {
            if (isString(f)) {
              context = asyncTrackers[j];
              var isPluginTrackerCall = f.indexOf('.') > 0;

              if (isPluginTrackerCall) {
                fParts = f.split('.');

                if (context && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(context[fParts[0]]) === 'object') {
                  context = context[fParts[0]];
                  f = fParts[1];
                } else if (trackerCall) {
                  // we try to call that method again later as the plugin might not be loaded yet
                  missedPluginTrackerCalls.push(trackerCall);
                  break;
                }
              }

              if (context[f]) {
                context[f].apply(context, parameterArray);
              } else {
                var message = 'The method \'' + f + '\' was not found in "_paq" variable.  Please have a look at the Piwik tracker documentation: https://developer.piwik.org/api-reference/tracking-javascript';
                logConsoleError(message);

                if (!isPluginTrackerCall) {
                  // do not trigger an error if it is a call to a plugin as the plugin may just not be
                  // loaded yet etc
                  throw new TypeError(message);
                }
              }

              if (f === 'addTracker') {
                // addTracker adds an entry to asyncTrackers and would otherwise result in an endless loop
                break;
              }

              if (f === 'setTrackerUrl' || f === 'setSiteId') {
                // these two methods should be only executed on the first tracker
                break;
              }
            } else {
              f.apply(asyncTrackers[j], parameterArray);
            }
          }
        }
      }
    }
    /*
         * Cross-browser helper function to add event handler
         */


    function _addEventListener(element, eventType, eventHandler, useCapture) {
      if (element.addEventListener) {
        element.addEventListener(eventType, eventHandler, useCapture);
        return true;
      }

      if (element.attachEvent) {
        return element.attachEvent('on' + eventType, eventHandler);
      }

      element['on' + eventType] = eventHandler;
    }

    function trackCallbackOnLoad(callback) {
      if (documentAlias.readyState === 'complete') {
        callback();
      } else if (windowAlias.addEventListener) {
        windowAlias.addEventListener('load', callback, false);
      } else if (windowAlias.attachEvent) {
        windowAlias.attachEvent('onload', callback);
      }
    }

    function trackCallbackOnReady(callback) {
      var loaded = false;

      if (documentAlias.attachEvent) {
        loaded = documentAlias.readyState === 'complete';
      } else {
        loaded = documentAlias.readyState !== 'loading';
      }

      if (loaded) {
        callback();
        return;
      }

      var _timer;

      if (documentAlias.addEventListener) {
        _addEventListener(documentAlias, 'DOMContentLoaded', function ready() {
          documentAlias.removeEventListener('DOMContentLoaded', ready, false);

          if (!loaded) {
            loaded = true;
            callback();
          }
        });
      } else if (documentAlias.attachEvent) {
        documentAlias.attachEvent('onreadystatechange', function ready() {
          if (documentAlias.readyState === 'complete') {
            documentAlias.detachEvent('onreadystatechange', ready);

            if (!loaded) {
              loaded = true;
              callback();
            }
          }
        });

        if (documentAlias.documentElement.doScroll && windowAlias === windowAlias.top) {
          (function ready() {
            if (!loaded) {
              try {
                documentAlias.documentElement.doScroll('left');
              } catch (error) {
                setTimeout(ready, 0);
                return;
              }

              loaded = true;
              callback();
            }
          })();
        }
      } // fallback


      _addEventListener(windowAlias, 'load', function () {
        if (!loaded) {
          loaded = true;
          callback();
        }
      }, false);
    }
    /*
         * Call plugin hook methods
         */


    function executePluginMethod(methodName, params, callback) {
      if (!methodName) {
        return '';
      }

      var result = '';
      var i;
      var pluginMethod;
      var value;
      var isFunction;

      for (i in plugins) {
        if (Object.prototype.hasOwnProperty.call(plugins, i)) {
          isFunction = plugins[i] && typeof plugins[i][methodName] === 'function';

          if (isFunction) {
            pluginMethod = plugins[i][methodName];
            value = pluginMethod(params || {}, callback);

            if (value) {
              result += value;
            }
          }
        }
      }

      return result;
    }
    /*
         * Handle beforeunload event
         *
         * Subject to Safari's "Runaway JavaScript Timer" and
         * Chrome V8 extension that terminates JS that exhibits
         * "slow unload", i.e., calling getTime() > 1000 times
         */


    function beforeUnloadHandler() {
      var now;
      isPageUnloading = true;
      executePluginMethod('unload');
      /*
             * Delay/pause (blocks UI)
             */

      if (expireDateTime) {
        // the things we do for backwards compatibility...
        // in ECMA-262 5th ed., we could simply use:
        //     while (Date.now() < expireDateTime) { }
        do {
          now = new Date();
        } while (now.getTimeAlias() < expireDateTime);
      }
    }
    /*
         * Load JavaScript file (asynchronously)
         */


    function loadScript(src, onLoad) {
      var script = documentAlias.createElement('script');
      script.type = 'text/javascript';
      script.src = src;

      if (script.readyState) {
        script.onreadystatechange = function () {
          var state = this.readyState;

          if (state === 'loaded' || state === 'complete') {
            script.onreadystatechange = null;
            onLoad();
          }
        };
      } else {
        script.onload = onLoad;
      }

      documentAlias.getElementsByTagName('head')[0].appendChild(script);
    }
    /*
         * Get page referrer
         */


    function getReferrer() {
      var referrer = '';

      try {
        referrer = windowAlias.top.document.referrer;
      } catch (e) {
        if (windowAlias.parent) {
          try {
            referrer = windowAlias.parent.document.referrer;
          } catch (e2) {
            referrer = '';
          }
        }
      }

      if (referrer === '') {
        referrer = documentAlias.referrer;
      }

      return referrer;
    }
    /*
         * Extract scheme/protocol from URL
         */


    function getProtocolScheme(url) {
      var e = new RegExp('^([a-z]+):');
      var matches = e.exec(url);
      return matches ? matches[1] : null;
    }
    /*
         * Extract hostname from URL
         */


    function getHostName(url) {
      // scheme : // [username [: password] @] hostame [: port] [/ [path] [? query] [# fragment]]
      var e = new RegExp('^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)');
      var matches = e.exec(url);
      return matches ? matches[1] : url;
    }

    function stringStartsWith(str, prefix) {
      str = String(str);
      return str.lastIndexOf(prefix, 0) === 0;
    }

    function stringEndsWith(str, suffix) {
      str = String(str);
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    function stringContains(str, needle) {
      str = String(str);
      return str.indexOf(needle) !== -1;
    }

    function removeCharactersFromEndOfString(str, numCharactersToRemove) {
      str = String(str);
      return str.substr(0, str.length - numCharactersToRemove);
    }
    /**
         * We do not check whether URL contains already url parameter, please use removeUrlParameter() if needed
         * before calling this method.
         * This method makes sure to append URL parameters before a possible hash. Will escape (encode URI component)
         * the set name and value
         */


    function addUrlParameter(url, name, value) {
      url = String(url);

      if (!value) {
        value = '';
      }

      var hashPos = url.indexOf('#');
      var urlLength = url.length;

      if (hashPos === -1) {
        hashPos = urlLength;
      }

      var baseUrl = url.substr(0, hashPos);
      var urlHash = url.substr(hashPos, urlLength - hashPos);

      if (baseUrl.indexOf('?') === -1) {
        baseUrl += '?';
      } else if (!stringEndsWith(baseUrl, '?')) {
        baseUrl += '&';
      } // nothing to if ends with ?


      return baseUrl + encodeWrapper(name) + '=' + encodeWrapper(value) + urlHash;
    }

    function removeUrlParameter(url, name) {
      url = String(url);

      if (url.indexOf('?' + name + '=') === -1 && url.indexOf('&' + name + '=') === -1) {
        // nothing to remove, url does not contain this parameter
        return url;
      }

      var searchPos = url.indexOf('?');

      if (searchPos === -1) {
        // nothing to remove, no query parameters
        return url;
      }

      var queryString = url.substr(searchPos + 1);
      var baseUrl = url.substr(0, searchPos);

      if (queryString) {
        var urlHash = '';
        var hashPos = queryString.indexOf('#');

        if (hashPos !== -1) {
          urlHash = queryString.substr(hashPos + 1);
          queryString = queryString.substr(0, hashPos);
        }

        var param;
        var paramsArr = queryString.split('&');
        var i = paramsArr.length - 1;

        for (i; i >= 0; i--) {
          param = paramsArr[i].split('=')[0];

          if (param === name) {
            paramsArr.splice(i, 1);
          }
        }

        var newQueryString = paramsArr.join('&');

        if (newQueryString) {
          baseUrl = baseUrl + '?' + newQueryString;
        }

        if (urlHash) {
          baseUrl += '#' + urlHash;
        }
      }

      return baseUrl;
    }
    /*
         * Extract parameter from URL
         */


    function getUrlParameter(url, name) {
      var regexSearch = '[\\?&#]' + name + '=([^&#]*)';
      var regex = new RegExp(regexSearch);
      var results = regex.exec(url);
      return results ? decodeWrapper(results[1]) : '';
    }

    function trim(text) {
      if (text && String(text) === text) {
        return text.replace(/^\s+|\s+$/g, '');
      }

      return text;
    }
    /*
         * UTF-8 encoding
         */


    function utf8_encode(argString) {
      return unescape(encodeWrapper(argString));
    }
    /************************************************************
         * sha1
         * - based on sha1 from http://phpjs.org/functions/sha1:512 (MIT / GPL v2)
         ************************************************************/


    function sha1(str) {
      // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
      // + namespaced by: Michael White (http://getsprink.com)
      // +      input by: Brett Zamir (http://brett-zamir.me)
      // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // +   jslinted by: Anthon Pang (http://piwik.org)
      var rotate_left = function rotate_left(n, s) {
        return n << s | n >>> 32 - s;
      };

      var cvt_hex = function cvt_hex(val) {
        var strout = '';
        var i;
        var v;

        for (i = 7; i >= 0; i--) {
          v = val >>> i * 4 & 0x0f;
          strout += v.toString(16);
        }

        return strout;
      };

      var blockstart;
      var i;
      var j;
      var W = [];
      var H0 = 0x67452301;
      var H1 = 0xEFCDAB89;
      var H2 = 0x98BADCFE;
      var H3 = 0x10325476;
      var H4 = 0xC3D2E1F0;
      var A;
      var B;
      var C;
      var D;
      var E;
      var temp;
      var str_len;
      var word_array = [];
      str = utf8_encode(str);
      str_len = str.length;

      for (i = 0; i < str_len - 3; i += 4) {
        j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
        word_array.push(j);
      }

      switch (str_len & 3) {
        case 0:
          i = 0x080000000;
          break;

        case 1:
          i = str.charCodeAt(str_len - 1) << 24 | 0x0800000;
          break;

        case 2:
          i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 0x08000;
          break;

        case 3:
          i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) << 8 | 0x80;
          break;
      }

      word_array.push(i);

      while ((word_array.length & 15) !== 14) {
        word_array.push(0);
      }

      word_array.push(str_len >>> 29);
      word_array.push(str_len << 3 & 0x0ffffffff);

      for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
        for (i = 0; i < 16; i++) {
          W[i] = word_array[blockstart + i];
        }

        for (i = 16; i <= 79; i++) {
          W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
        }

        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;

        for (i = 0; i <= 19; i++) {
          temp = rotate_left(A, 5) + (B & C | ~B & D) + E + W[i] + 0x5A827999 & 0x0ffffffff;
          E = D;
          D = C;
          C = rotate_left(B, 30);
          B = A;
          A = temp;
        }

        for (i = 20; i <= 39; i++) {
          temp = rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1 & 0x0ffffffff;
          E = D;
          D = C;
          C = rotate_left(B, 30);
          B = A;
          A = temp;
        }

        for (i = 40; i <= 59; i++) {
          temp = rotate_left(A, 5) + (B & C | B & D | C & D) + E + W[i] + 0x8F1BBCDC & 0x0ffffffff;
          E = D;
          D = C;
          C = rotate_left(B, 30);
          B = A;
          A = temp;
        }

        for (i = 60; i <= 79; i++) {
          temp = rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6 & 0x0ffffffff;
          E = D;
          D = C;
          C = rotate_left(B, 30);
          B = A;
          A = temp;
        }

        H0 = H0 + A & 0x0ffffffff;
        H1 = H1 + B & 0x0ffffffff;
        H2 = H2 + C & 0x0ffffffff;
        H3 = H3 + D & 0x0ffffffff;
        H4 = H4 + E & 0x0ffffffff;
      }

      temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
      return temp.toLowerCase();
    }
    /************************************************************
         * end sha1
         ************************************************************/

    /*
         * Fix-up URL when page rendered from search engine cache or translated page
         */


    function urlFixup(hostName, href, referrer) {
      if (!hostName) {
        hostName = '';
      }

      if (!href) {
        href = '';
      }

      if (hostName === 'translate.googleusercontent.com') {
        // Google
        if (referrer === '') {
          referrer = href;
        }

        href = getUrlParameter(href, 'u');
        hostName = getHostName(href);
      } else if (hostName === 'cc.bingj.com' || // Bing
      hostName === 'webcache.googleusercontent.com' || // Google
      hostName.slice(0, 5) === '74.6.') {
        // Yahoo (via Inktomi 74.6.0.0/16)
        href = documentAlias.links[0].href;
        hostName = getHostName(href);
      }

      return [hostName, href, referrer];
    }
    /*
         * Fix-up domain
         */


    function domainFixup(domain) {
      var dl = domain.length; // remove trailing '.'

      if (domain.charAt(--dl) === '.') {
        domain = domain.slice(0, dl);
      } // remove leading '*'


      if (domain.slice(0, 2) === '*.') {
        domain = domain.slice(1);
      }

      if (domain.indexOf('/') !== -1) {
        domain = domain.substr(0, domain.indexOf('/'));
      }

      return domain;
    }
    /*
         * Title fixup
         */


    function titleFixup(title) {
      title = title && title.text ? title.text : title;

      if (!isString(title)) {
        var tmp = documentAlias.getElementsByTagName('title');

        if (tmp && isDefined(tmp[0])) {
          title = tmp[0].text;
        }
      }

      return title;
    }

    function getChildrenFromNode(node) {
      if (!node) {
        return [];
      }

      if (!isDefined(node.children) && isDefined(node.childNodes)) {
        return node.children;
      }

      if (isDefined(node.children)) {
        return node.children;
      }

      return [];
    }

    function containsNodeElement(node, containedNode) {
      if (!node || !containedNode) {
        return false;
      }

      if (node.contains) {
        return node.contains(containedNode);
      }

      if (node === containedNode) {
        return true;
      }

      if (node.compareDocumentPosition) {
        return !!(node.compareDocumentPosition(containedNode) & 16);
      }

      return false;
    } // Polyfill for IndexOf for IE6-IE8


    function indexOfArray(theArray, searchElement) {
      if (theArray && theArray.indexOf) {
        return theArray.indexOf(searchElement);
      } // 1. Let O be the result of calling ToObject passing
      //    the this value as the argument.


      if (!isDefined(theArray) || theArray === null) {
        return -1;
      }

      if (!theArray.length) {
        return -1;
      }

      var len = theArray.length;

      if (len === 0) {
        return -1;
      }

      var k = 0; // 9. Repeat, while k < len

      while (k < len) {
        // a. Let Pk be ToString(k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the
        //    HasProperty internal method of O with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        //    i.  Let elementK be the result of calling the Get
        //        internal method of O with the argument ToString(k).
        //   ii.  Let same be the result of applying the
        //        Strict Equality Comparison Algorithm to
        //        searchElement and elementK.
        //  iii.  If same is true, return k.
        if (theArray[k] === searchElement) {
          return k;
        }

        k++;
      }

      return -1;
    }
    /************************************************************
         * Element Visiblility
         ************************************************************/

    /**
         * Author: Jason Farrell
         * Author URI: http://useallfive.com/
         *
         * Description: Checks if a DOM element is truly visible.
         * Package URL: https://github.com/UseAllFive/true-visibility
         * License: MIT (https://github.com/UseAllFive/true-visibility/blob/master/LICENSE.txt)
         */


    function isVisible(node) {
      if (!node) {
        return false;
      } // -- Cross browser method to get style properties:


      function _getStyle(el, property) {
        if (windowAlias.getComputedStyle) {
          return documentAlias.defaultView.getComputedStyle(el, null)[property];
        }

        if (el.currentStyle) {
          return el.currentStyle[property];
        }
      }

      function _elementInDocument(element) {
        element = element.parentNode;

        while (element) {
          if (element === documentAlias) {
            return true;
          }

          element = element.parentNode;
        }

        return false;
      }
      /**
             * Checks if a DOM element is visible. Takes into
             * consideration its parents and overflow.
             *
             * @param (el)      the DOM element to check if is visible
             *
             * These params are optional that are sent in recursively,
             * you typically won't use these:
             *
             * @param (t)       Top corner position number
             * @param (r)       Right corner position number
             * @param (b)       Bottom corner position number
             * @param (l)       Left corner position number
             * @param (w)       Element width number
             * @param (h)       Element height number
             */


      function _isVisible(el, t, r, b, l, w, h) {
        var p = el.parentNode;
        var VISIBLE_PADDING = 1; // has to be visible at least one px of the element

        if (!_elementInDocument(el)) {
          return false;
        } // -- Return true for document node


        if (p.nodeType === 9) {
          return true;
        } // -- Return false if our element is invisible


        if (_getStyle(el, 'opacity') === '0' || _getStyle(el, 'display') === 'none' || _getStyle(el, 'visibility') === 'hidden') {
          return false;
        }

        if (!isDefined(t) || !isDefined(r) || !isDefined(b) || !isDefined(l) || !isDefined(w) || !isDefined(h)) {
          t = el.offsetTop;
          l = el.offsetLeft;
          b = t + el.offsetHeight;
          r = l + el.offsetWidth;
          w = el.offsetWidth;
          h = el.offsetHeight;
        }

        if (node === el && (h === 0 || w === 0) && _getStyle(el, 'overflow') === 'hidden') {
          return false;
        } // -- If we have a parent, let's continue:


        if (p) {
          // -- Check if the parent can hide its children.
          if (_getStyle(p, 'overflow') === 'hidden' || _getStyle(p, 'overflow') === 'scroll') {
            // -- Only check if the offset is different for the parent
            if ( // -- If the target element is to the right of the parent elm
            l + VISIBLE_PADDING > p.offsetWidth + p.scrollLeft || // -- If the target element is to the left of the parent elm
            l + w - VISIBLE_PADDING < p.scrollLeft || // -- If the target element is under the parent elm
            t + VISIBLE_PADDING > p.offsetHeight + p.scrollTop || // -- If the target element is above the parent elm
            t + h - VISIBLE_PADDING < p.scrollTop) {
              // -- Our target element is out of bounds:
              return false;
            }
          } // -- Add the offset parent's left/top coords to our element's offset:


          if (el.offsetParent === p) {
            l += p.offsetLeft;
            t += p.offsetTop;
          } // -- Let's recursively check upwards:


          return _isVisible(p, t, r, b, l, w, h);
        }

        return true;
      }

      return _isVisible(node);
    }
    /************************************************************
         * Query
         ************************************************************/


    var query = {
      htmlCollectionToArray: function htmlCollectionToArray(foundNodes) {
        var nodes = [];
        var index;

        if (!foundNodes || !foundNodes.length) {
          return nodes;
        }

        for (index = 0; index < foundNodes.length; index++) {
          nodes.push(foundNodes[index]);
        }

        return nodes;
      },
      find: function find(selector) {
        // we use querySelectorAll only on document, not on nodes because of its unexpected behavior. See for
        // instance http://stackoverflow.com/questions/11503534/jquery-vs-document-queryselectorall and
        // http://jsfiddle.net/QdMc5/ and http://ejohn.org/blog/thoughts-on-queryselectorall
        if (!document.querySelectorAll || !selector) {
          return []; // we do not support all browsers
        }

        var foundNodes = document.querySelectorAll(selector);
        return this.htmlCollectionToArray(foundNodes);
      },
      findMultiple: function findMultiple(selectors) {
        if (!selectors || !selectors.length) {
          return [];
        }

        var index, foundNodes;
        var nodes = [];

        for (index = 0; index < selectors.length; index++) {
          foundNodes = this.find(selectors[index]);
          nodes = nodes.concat(foundNodes);
        }

        nodes = this.makeNodesUnique(nodes);
        return nodes;
      },
      findNodesByTagName: function findNodesByTagName(node, tagName) {
        if (!node || !tagName || !node.getElementsByTagName) {
          return [];
        }

        var foundNodes = node.getElementsByTagName(tagName);
        return this.htmlCollectionToArray(foundNodes);
      },
      makeNodesUnique: function makeNodesUnique(nodes) {
        var copy = [].concat(nodes);
        nodes.sort(function (n1, n2) {
          if (n1 === n2) {
            return 0;
          }

          var index1 = indexOfArray(copy, n1);
          var index2 = indexOfArray(copy, n2);

          if (index1 === index2) {
            return 0;
          }

          return index1 > index2 ? -1 : 1;
        });

        if (nodes.length <= 1) {
          return nodes;
        }

        var index = 0;
        var numDuplicates = 0;
        var duplicates = [];
        var node;
        node = nodes[index++];

        while (node) {
          if (node === nodes[index]) {
            numDuplicates = duplicates.push(index);
          }

          node = nodes[index++] || null;
        }

        while (numDuplicates--) {
          nodes.splice(duplicates[numDuplicates], 1);
        }

        return nodes;
      },
      getAttributeValueFromNode: function getAttributeValueFromNode(node, attributeName) {
        if (!this.hasNodeAttribute(node, attributeName)) {
          return;
        }

        if (node && node.getAttribute) {
          return node.getAttribute(attributeName);
        }

        if (!node || !node.attributes) {
          return;
        }

        var typeOfAttr = _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(node.attributes[attributeName]);

        if (typeOfAttr === 'undefined') {
          return;
        }

        if (node.attributes[attributeName].value) {
          return node.attributes[attributeName].value; // nodeValue is deprecated ie Chrome
        }

        if (node.attributes[attributeName].nodeValue) {
          return node.attributes[attributeName].nodeValue;
        }

        var index;
        var attrs = node.attributes;

        if (!attrs) {
          return;
        }

        for (index = 0; index < attrs.length; index++) {
          if (attrs[index].nodeName === attributeName) {
            return attrs[index].nodeValue;
          }
        }

        return null;
      },
      hasNodeAttributeWithValue: function hasNodeAttributeWithValue(node, attributeName) {
        var value = this.getAttributeValueFromNode(node, attributeName);
        return !!value;
      },
      hasNodeAttribute: function hasNodeAttribute(node, attributeName) {
        if (node && node.hasAttribute) {
          return node.hasAttribute(attributeName);
        }

        if (node && node.attributes) {
          var typeOfAttr = _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(node.attributes[attributeName]);

          return typeOfAttr !== 'undefined';
        }

        return false;
      },
      hasNodeCssClass: function hasNodeCssClass(node, klassName) {
        if (node && klassName && node.className) {
          var classes = typeof node.className === 'string' ? node.className.split(' ') : [];

          if (indexOfArray(classes, klassName) !== -1) {
            return true;
          }
        }

        return false;
      },
      findNodesHavingAttribute: function findNodesHavingAttribute(nodeToSearch, attributeName, nodes) {
        if (!nodes) {
          nodes = [];
        }

        if (!nodeToSearch || !attributeName) {
          return nodes;
        }

        var children = getChildrenFromNode(nodeToSearch);

        if (!children || !children.length) {
          return nodes;
        }

        var index, child;

        for (index = 0; index < children.length; index++) {
          child = children[index];

          if (this.hasNodeAttribute(child, attributeName)) {
            nodes.push(child);
          }

          nodes = this.findNodesHavingAttribute(child, attributeName, nodes);
        }

        return nodes;
      },
      findFirstNodeHavingAttribute: function findFirstNodeHavingAttribute(node, attributeName) {
        if (!node || !attributeName) {
          return;
        }

        if (this.hasNodeAttribute(node, attributeName)) {
          return node;
        }

        var nodes = this.findNodesHavingAttribute(node, attributeName);

        if (nodes && nodes.length) {
          return nodes[0];
        }
      },
      findFirstNodeHavingAttributeWithValue: function findFirstNodeHavingAttributeWithValue(node, attributeName) {
        if (!node || !attributeName) {
          return;
        }

        if (this.hasNodeAttributeWithValue(node, attributeName)) {
          return node;
        }

        var nodes = this.findNodesHavingAttribute(node, attributeName);

        if (!nodes || !nodes.length) {
          return;
        }

        var index;

        for (index = 0; index < nodes.length; index++) {
          if (this.getAttributeValueFromNode(nodes[index], attributeName)) {
            return nodes[index];
          }
        }
      },
      findNodesHavingCssClass: function findNodesHavingCssClass(nodeToSearch, className, nodes) {
        if (!nodes) {
          nodes = [];
        }

        if (!nodeToSearch || !className) {
          return nodes;
        }

        if (nodeToSearch.getElementsByClassName) {
          var foundNodes = nodeToSearch.getElementsByClassName(className);
          return this.htmlCollectionToArray(foundNodes);
        }

        var children = getChildrenFromNode(nodeToSearch);

        if (!children || !children.length) {
          return [];
        }

        var index, child;

        for (index = 0; index < children.length; index++) {
          child = children[index];

          if (this.hasNodeCssClass(child, className)) {
            nodes.push(child);
          }

          nodes = this.findNodesHavingCssClass(child, className, nodes);
        }

        return nodes;
      },
      findFirstNodeHavingClass: function findFirstNodeHavingClass(node, className) {
        if (!node || !className) {
          return;
        }

        if (this.hasNodeCssClass(node, className)) {
          return node;
        }

        var nodes = this.findNodesHavingCssClass(node, className);

        if (nodes && nodes.length) {
          return nodes[0];
        }
      },
      isLinkElement: function isLinkElement(node) {
        if (!node) {
          return false;
        }

        var elementName = String(node.nodeName).toLowerCase();
        var linkElementNames = ['a', 'area'];
        var pos = indexOfArray(linkElementNames, elementName);
        return pos !== -1;
      },
      setAnyAttribute: function setAnyAttribute(node, attrName, attrValue) {
        if (!node || !attrName) {
          return;
        }

        if (node.setAttribute) {
          node.setAttribute(attrName, attrValue);
        } else {
          node[attrName] = attrValue;
        }
      }
      /************************************************************
           * Content Tracking
           ************************************************************/

    };
    var content = {
      location: undefined,
      setLocation: function setLocation(location) {
        this.location = location;
      },
      getLocation: function getLocation() {
        var locationAlias = this.location || windowAlias.location;

        if (!locationAlias.origin) {
          locationAlias.origin = locationAlias.protocol + '//' + locationAlias.hostname + (locationAlias.port ? ':' + locationAlias.port : '');
        }

        return locationAlias;
      },
      toAbsoluteUrl: function toAbsoluteUrl(url) {
        if ((!url || String(url) !== url) && url !== '') {
          // we only handle strings
          return url;
        }

        if (url === '') {
          return this.getLocation().href;
        } // Eg //example.com/test.jpg


        if (url.search(/^\/\//) !== -1) {
          return this.getLocation().protocol + url;
        } // Eg http://example.com/test.jpg


        if (url.search(/:\/\//) !== -1) {
          return url;
        } // Eg #test.jpg


        if (url.indexOf('#') === 0) {
          return this.getLocation().origin + this.getLocation().pathname + url;
        } // Eg ?x=5


        if (url.indexOf('?') === 0) {
          return this.getLocation().origin + this.getLocation().pathname + url;
        } // Eg mailto:x@y.z tel:012345, ... market:... sms:..., javasript:... ecmascript: ... and many more


        if (url.search('^[a-zA-Z]{2,11}:') === 0) {
          return url;
        } // Eg /test.jpg


        if (url.search(/^\//) !== -1) {
          return this.getLocation().origin + url;
        } // Eg test.jpg


        var regexMatchDir = '(.*\/)';
        var base = this.getLocation().origin + this.getLocation().pathname.match(new RegExp(regexMatchDir))[0];
        return base + url;
      }
    };

    function isInsideAnIframe() {
      var frameElement;

      try {
        // If the parent window has another origin, then accessing frameElement
        // throws an Error in IE. see issue #10105.
        frameElement = windowAlias.frameElement;
      } catch (e) {
        // When there was an Error, then we know we are inside an iframe.
        return true;
      }

      if (isDefined(frameElement)) {
        return !!(frameElement && String(frameElement.nodeName).toLowerCase() === 'iframe');
      }

      try {
        return windowAlias.self !== windowAlias.top;
      } catch (e2) {
        return true;
      }
    }
    /************************************************************
         * End Page Overlay
         ************************************************************/

    /*
         * Piwik Tracker class
         *
         * trackerUrl and trackerSiteId are optional arguments to the constructor
         *
         * See: Tracker.setTrackerUrl() and Tracker.setSiteId()
         */


    function Tracker(trackerUrl, siteId, mediaId) {
      /************************************************************
             * Private members
             ************************************************************/
      var
      /* <DEBUG> */

      /*
               * registered test hooks
               */
      registeredHooks = {};
      /* </DEBUG> */

      var trackerInstance = this; // Current URL and Referrer URL

      var locationArray = urlFixup(documentAlias.domain, windowAlias.location.href, getReferrer());
      var domainAlias = domainFixup(locationArray[0]);
      var locationHrefAlias = safeDecodeWrapper(locationArray[1]);
      var configReferrerUrl = safeDecodeWrapper(locationArray[2]);
      var enableJSErrorTracking = false;
      var defaultRequestMethod = 'GET'; // Request method (GET or POST)

      var configRequestMethod = defaultRequestMethod;
      var defaultRequestContentType = 'application/x-www-form-urlencoded; charset=UTF-8'; // Request Content-Type header value; applicable when POST request method is used for submitting tracking events

      var configRequestContentType = defaultRequestContentType; // Tracker URL

      var configTrackerUrl = trackerUrl || ''; // This string is appended to the Tracker URL Request (eg. to send data that is not handled by the existing setters/getters)

      var configAppendToTrackingUrl = ''; // Site ID

      var configTrackerSiteId = siteId || ''; // Media ID

      var configTrackerMediaId = mediaId || ''; // User ID

      var configUserId = ''; // Visitor UUID

      var visitorUUID = ''; // Document URL

      var configCustomUrl; // Document title

      var configTitle = ''; // Extensions to be treated as download links

      var configDownloadExtensions = ['7z', 'aac', 'apk', 'arc', 'arj', 'asf', 'asx', 'avi', 'azw3', 'bin', 'csv', 'deb', 'dmg', 'doc', 'docx', 'epub', 'exe', 'flv', 'gif', 'gz', 'gzip', 'hqx', 'ibooks', 'jar', 'jpg', 'jpeg', 'js', 'mobi', 'mp2', 'mp3', 'mp4', 'mpg', 'mpeg', 'mov', 'movie', 'msi', 'msp', 'odb', 'odf', 'odg', 'ods', 'odt', 'ogg', 'ogv', 'pdf', 'phps', 'png', 'ppt', 'pptx', 'qt', 'qtm', 'ra', 'ram', 'rar', 'rpm', 'sea', 'sit', 'tar', 'tbz', 'tbz2', 'bz', 'bz2', 'tgz', 'torrent', 'txt', 'wav', 'wma', 'wmv', 'wpd', 'xls', 'xlsx', 'xml', 'z', 'zip']; // Hosts or alias(es) to not treat as outlinks

      var configHostsAlias = [domainAlias]; // HTML anchor element classes to not track

      var configIgnoreClasses = []; // HTML anchor element classes to treat as downloads

      var configDownloadClasses = []; // HTML anchor element classes to treat at outlinks

      var configLinkClasses = []; // Maximum delay to wait for web bug image to be fetched (in milliseconds)

      var configTrackerPause = 500; // Minimum visit time after initial page view (in milliseconds)

      var configMinimumVisitTime; // Recurring heart beat after initial ping (in milliseconds)

      var configHeartBeatDelay; // alias to circumvent circular function dependency (JSLint requires this)

      var heartBeatPingIfActivityAlias; // Disallow hash tags in URL

      var configDiscardHashTag; // Custom data

      var configCustomData; // Campaign names

      var configCampaignNameParameters = ['pk_campaign', 'piwik_campaign', 'utm_campaign', 'utm_source', 'utm_medium']; // Campaign keywords

      var configCampaignKeywordParameters = ['pk_kwd', 'piwik_kwd', 'utm_term']; // First-party cookie name prefix

      var configCookieNamePrefix = '_pk_'; // the URL parameter that will store the visitorId if cross domain linking is enabled
      // pk_vid = visitor ID
      // first part of this URL parameter will be 16 char visitor Id.
      // The second part is the 10 char current timestamp and the third and last part will be a 6 characters deviceId
      // timestamp is needed to prevent reusing the visitorId when the URL is shared. The visitorId will be
      // only reused if the timestamp is less than 45 seconds old.
      // deviceId parameter is needed to prevent reusing the visitorId when the URL is shared. The visitorId
      // will be only reused if the device is still the same when opening the link.
      // VDI = visitor device identifier

      var configVisitorIdUrlParameter = 'pk_vid'; // Cross domain linking, the visitor ID is transmitted only in the 180 seconds following the click.

      var configVisitorIdUrlParameterTimeoutInSeconds = 180; // First-party cookie domain
      // User agent defaults to origin hostname

      var configCookieDomain; // First-party cookie path
      // Default is user agent defined.

      var configCookiePath; // Whether to use "Secure" cookies that only work over SSL

      var configCookieIsSecure = false; // First-party cookies are disabled

      var configCookiesDisabled = false; // Do Not Track

      var configDoNotTrack; // Count sites which are pre-rendered

      var configCountPreRendered; // Do we attribute the conversion to the first referrer or the most recent referrer?

      var configConversionAttributionFirstReferrer; // Life of the visitor cookie (in milliseconds)

      var configVisitorCookieTimeout = 33955200000; // 13 months (365 days + 28days)
      // Life of the session cookie (in milliseconds)

      var configSessionCookieTimeout = 1800000; // 30 minutes
      // Life of the referral cookie (in milliseconds)

      var configReferralCookieTimeout = 15768000000; // 6 months
      // Is performance tracking enabled

      var configPerformanceTrackingEnabled = true; // Generation time set from the server

      var configPerformanceGenerationTime = 0; // Whether Custom Variables scope "visit" should be stored in a cookie during the time of the visit

      var configStoreCustomVariablesInCookie = false; // Custom Variables read from cookie, scope "visit"

      var customVariables = false;
      var configCustomRequestContentProcessing; // Custom Variables, scope "page"

      var customVariablesPage = {}; // Custom Variables, scope "event"

      var customVariablesEvent = {}; // Custom Dimensions (can be any scope)

      var customDimensions = {}; // Custom Variables names and values are each truncated before being sent in the request or recorded in the cookie

      var customVariableMaximumLength = 200; // Browser features via client-side data collection

      var browserFeatures = {}; // Guard to prevent empty visits see #6415. If there is a new visitor and the first 2 (or 3 or 4)
      // tracking requests are at nearly same time (eg trackPageView and trackContentImpression) 2 or more
      // visits will be created

      var timeNextTrackingRequestCanBeExecutedImmediately = false; // Guard against installing the link tracker more than once per Tracker instance

      var linkTrackingInstalled = false;
      var linkTrackingEnabled = false;
      var crossDomainTrackingEnabled = false; // Guard against installing the activity tracker more than once per Tracker instance

      var heartBeatSetUp = false; // bool used to detect whether this browser window had focus at least once. So far we cannot really
      // detect this 100% correct for an iframe so whenever Piwik is loaded inside an iframe we presume
      // the window had focus at least once.

      var hadWindowFocusAtLeastOnce = isInsideAnIframe(); // Timestamp of last tracker request sent to Piwik

      var lastTrackerRequestTime = null; // Handle to the current heart beat timeout

      var heartBeatTimeout; // Internal state of the pseudo click handler

      var lastButton;
      var lastTarget; // Hash function

      var hash = sha1; // Domain hash value

      var domainHash;
      var configIdPageView; // we measure how many pageviews have been tracked so plugins can use it to eg detect if a
      // pageview was already tracked or not

      var numTrackedPageviews = 0;
      var configCookiesToDelete = ['id', 'ses', 'cvar', 'ref']; // Document title

      try {
        configTitle = documentAlias.title;
      } catch (e) {
        configTitle = '';
      }
      /*
             * Set cookie value
             */


      function setCookie(cookieName, value, msToExpire, path, domain, isSecure) {
        if (configCookiesDisabled) {
          return;
        }

        var expiryDate; // relative time to expire in milliseconds

        if (msToExpire) {
          expiryDate = new Date();
          expiryDate.setTime(expiryDate.getTime() + msToExpire);
        }

        documentAlias.cookie = cookieName + '=' + encodeWrapper(value) + (msToExpire ? ';expires=' + expiryDate.toGMTString() : '') + ';path=' + (path || '/') + (domain ? ';domain=' + domain : '') + (isSecure ? ';secure' : '');
      }
      /*
             * Get cookie value
             */


      function getCookie(cookieName) {
        if (configCookiesDisabled) {
          return 0;
        }

        var cookiePattern = new RegExp('(^|;)[ ]*' + cookieName + '=([^;]*)');
        var cookieMatch = cookiePattern.exec(documentAlias.cookie);
        return cookieMatch ? decodeWrapper(cookieMatch[2]) : 0;
      }
      /*
             * Removes hash tag from the URL
             *
             * URLs are purified before being recorded in the cookie,
             * or before being sent as GET parameters
             */


      function purify(url) {
        var targetPattern; // we need to remove this parameter here, they wouldn't be removed in Piwik tracker otherwise eg
        // for outlinks or referrers

        url = removeUrlParameter(url, configVisitorIdUrlParameter);

        if (configDiscardHashTag) {
          targetPattern = new RegExp('#.*');
          return url.replace(targetPattern, '');
        }

        return url;
      }
      /*
             * Resolve relative reference
             *
             * Note: not as described in rfc3986 section 5.2
             */


      function resolveRelativeReference(baseUrl, url) {
        var protocol = getProtocolScheme(url);
        var i;

        if (protocol) {
          return url;
        }

        if (url.slice(0, 1) === '/') {
          return getProtocolScheme(baseUrl) + '://' + getHostName(baseUrl) + url;
        }

        baseUrl = purify(baseUrl);
        i = baseUrl.indexOf('?');

        if (i >= 0) {
          baseUrl = baseUrl.slice(0, i);
        }

        i = baseUrl.lastIndexOf('/');

        if (i !== baseUrl.length - 1) {
          baseUrl = baseUrl.slice(0, i + 1);
        }

        return baseUrl + url;
      }

      function isSameHost(hostName, alias) {
        var offset;
        hostName = String(hostName).toLowerCase();
        alias = String(alias).toLowerCase();

        if (hostName === alias) {
          return true;
        }

        if (alias.slice(0, 1) === '.') {
          if (hostName === alias.slice(1)) {
            return true;
          }

          offset = hostName.length - alias.length;

          if (offset > 0 && hostName.slice(offset) === alias) {
            return true;
          }
        }

        return false;
      }
      /*
             * Extract pathname from URL. element.pathname is actually supported by pretty much all browsers including
             * IE6 apart from some rare very old ones
             */


      function getPathName(url) {
        var parser = document.createElement('a');

        if (url.indexOf('//') !== 0 && url.indexOf('http') !== 0) {
          if (url.indexOf('*') === 0) {
            url = url.substr(1);
          }

          if (url.indexOf('.') === 0) {
            url = url.substr(1);
          }

          url = 'http://' + url;
        }

        parser.href = content.toAbsoluteUrl(url);

        if (parser.pathname) {
          return parser.pathname;
        }

        return '';
      }

      function isSitePath(path, pathAlias) {
        if (!stringStartsWith(pathAlias, '/')) {
          pathAlias = '/' + pathAlias;
        }

        if (!stringStartsWith(path, '/')) {
          path = '/' + path;
        }

        var matchesAnyPath = pathAlias === '/' || pathAlias === '/*';

        if (matchesAnyPath) {
          return true;
        }

        if (path === pathAlias) {
          return true;
        }

        pathAlias = String(pathAlias).toLowerCase();
        path = String(path).toLowerCase(); // wildcard path support

        if (stringEndsWith(pathAlias, '*')) {
          // remove the final '*' before comparing
          pathAlias = pathAlias.slice(0, -1); // Note: this is almost duplicated from just few lines above

          matchesAnyPath = !pathAlias || pathAlias === '/';

          if (matchesAnyPath) {
            return true;
          }

          if (path === pathAlias) {
            return true;
          } // wildcard match


          return path.indexOf(pathAlias) === 0;
        } // we need to append slashes so /foobarbaz won't match a site /foobar


        if (!stringEndsWith(path, '/')) {
          path += '/';
        }

        if (!stringEndsWith(pathAlias, '/')) {
          pathAlias += '/';
        }

        return path.indexOf(pathAlias) === 0;
      }
      /**
             * Whether the specified domain name and path belong to any of the alias domains (eg. set via setDomains).
             *
             * Note: this function is used to determine whether a click on a URL will be considered an "Outlink".
             *
             * @param host
             * @param path
             * @returns {boolean}
             */


      function isSiteHostPath(host, path) {
        var i, alias, configAlias, aliasHost, aliasPath;

        for (i = 0; i < configHostsAlias.length; i++) {
          aliasHost = domainFixup(configHostsAlias[i]);
          aliasPath = getPathName(configHostsAlias[i]);

          if (isSameHost(host, aliasHost) && isSitePath(path, aliasPath)) {
            return true;
          }
        }

        return false;
      }
      /*
             * Is the host local? (i.e., not an outlink)
             */


      function isSiteHostName(hostName) {
        var i, alias, offset;

        for (i = 0; i < configHostsAlias.length; i++) {
          alias = domainFixup(configHostsAlias[i].toLowerCase());

          if (hostName === alias) {
            return true;
          }

          if (alias.slice(0, 1) === '.') {
            if (hostName === alias.slice(1)) {
              return true;
            }

            offset = hostName.length - alias.length;

            if (offset > 0 && hostName.slice(offset) === alias) {
              return true;
            }
          }
        }

        return false;
      }
      /*
             * Send image request to Piwik server using GET.
             * The infamous web bug (or beacon) is a transparent, single pixel (1x1) image
             */


      function getImage(request, callback) {
        // make sure to actually load an image so callback gets invoked
        request = request.replace('send_image=0', 'send_image=1');
        var image = new Image(1, 1);

        image.onload = function () {
          iterator = 0; // To avoid JSLint warning of empty block

          if (typeof callback === 'function') {
            callback();
          }
        };

        image.src = configTrackerUrl + (configTrackerUrl.indexOf('?') < 0 ? '?' : '&') + request;
      }

      function sendPostRequestViaSendBeacon(request) {
        var supportsSendBeacon = _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(navigatorAlias) === 'object' && typeof navigatorAlias.sendBeacon === 'function' && typeof Blob === 'function';

        if (!supportsSendBeacon) {
          return false;
        }

        var headers = {
          type: 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        var success = false;

        try {
          var blob = new Blob([request], headers);
          success = navigatorAlias.sendBeacon(configTrackerUrl, blob); // returns true if the user agent is able to successfully queue the data for transfer,
          // Otherwise it returns false and we need to try the regular way
        } catch (e) {
          return false;
        }

        return success;
      }
      /*
             * POST request to Piwik server using XMLHttpRequest.
             */


      function sendXmlHttpRequest(request, callback, fallbackToGet) {
        if (!isDefined(fallbackToGet) || fallbackToGet === null) {
          fallbackToGet = true;
        }

        if (isPageUnloading && sendPostRequestViaSendBeacon(request)) {
          return;
        }

        setTimeout(function () {
          // we execute it with a little delay in case the unload event occurred just after sending this request
          // this is to avoid the following behaviour: Eg on form submit a tracking request is sent via POST
          // in this method. Then a few ms later the browser wants to navigate to the new page and the unload
          // event occurrs and the browser cancels the just triggered POST request. This causes or fallback
          // method to be triggered and we execute the same request again (either as fallbackGet or sendBeacon).
          // The problem is that we do not know whether the inital POST request was already fully transferred
          // to the server or not when the onreadystatechange callback is executed and we might execute the
          // same request a second time. To avoid this, we delay the actual execution of this POST request just
          // by 50ms which gives it usually enough time to detect the unload event in most cases.
          if (isPageUnloading && sendPostRequestViaSendBeacon(request)) {
            return;
          }

          var sentViaBeacon;

          try {
            // we use the progid Microsoft.XMLHTTP because
            // IE5.5 included MSXML 2.5; the progid MSXML2.XMLHTTP
            // is pinned to MSXML2.XMLHTTP.3.0
            var xhr = windowAlias.XMLHttpRequest ? new windowAlias.XMLHttpRequest() : windowAlias.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : null;
            xhr.open('POST', configTrackerUrl, true); // fallback on error

            xhr.onreadystatechange = function () {
              if (this.readyState === 4 && !(this.status >= 200 && this.status < 300)) {
                var sentViaBeacon = isPageUnloading && sendPostRequestViaSendBeacon(request);

                if (!sentViaBeacon && fallbackToGet) {
                  getImage(request, callback);
                }
              } else {
                if (this.readyState === 4 && typeof callback === 'function') {
                  callback();
                }
              }
            };

            xhr.setRequestHeader('Content-Type', configRequestContentType);
            xhr.send(request);
          } catch (e) {
            sentViaBeacon = isPageUnloading && sendPostRequestViaSendBeacon(request);

            if (!sentViaBeacon && fallbackToGet) {
              getImage(request, callback);
            }
          }
        }, 50);
      }

      function setExpireDateTime(delay) {
        var now = new Date();
        var time = now.getTime() + delay;

        if (!expireDateTime || time > expireDateTime) {
          expireDateTime = time;
        }
      }
      /*
             * Sets up the heart beat timeout.
             */


      function heartBeatUp(delay) {
        if (heartBeatTimeout || !configHeartBeatDelay) {
          return;
        }

        heartBeatTimeout = setTimeout(function heartBeat() {
          heartBeatTimeout = null;

          if (!hadWindowFocusAtLeastOnce) {
            // if browser does not support .hasFocus (eg IE5), we assume that the window has focus.
            hadWindowFocusAtLeastOnce = !documentAlias.hasFocus || documentAlias.hasFocus();
          }

          if (!hadWindowFocusAtLeastOnce) {
            // only send a ping if the tab actually had focus at least once. For example do not send a ping
            // if window was opened via "right click => open in new window" and never had focus see #9504
            heartBeatUp(configHeartBeatDelay);
            return;
          }

          if (heartBeatPingIfActivityAlias()) {
            return;
          }

          var now = new Date();
          var heartBeatDelay = configHeartBeatDelay - (now.getTime() - lastTrackerRequestTime); // sanity check

          heartBeatDelay = Math.min(configHeartBeatDelay, heartBeatDelay);
          heartBeatUp(heartBeatDelay);
        }, delay || configHeartBeatDelay);
      }
      /*
             * Removes the heart beat timeout.
             */


      function heartBeatDown() {
        if (!heartBeatTimeout) {
          return;
        }

        clearTimeout(heartBeatTimeout);
        heartBeatTimeout = null;
      }

      function heartBeatOnFocus() {
        hadWindowFocusAtLeastOnce = true; // since it's possible for a user to come back to a tab after several hours or more, we try to send
        // a ping if the page is active. (after the ping is sent, the heart beat timeout will be set)

        if (heartBeatPingIfActivityAlias()) {
          return;
        }

        heartBeatUp();
      }

      function heartBeatOnBlur() {
        heartBeatDown();
      }
      /*
             * Setup event handlers and timeout for initial heart beat.
             */


      function setUpHeartBeat() {
        if (heartBeatSetUp || !configHeartBeatDelay) {
          return;
        }

        heartBeatSetUp = true;

        _addEventListener(windowAlias, 'focus', heartBeatOnFocus);

        _addEventListener(windowAlias, 'blur', heartBeatOnBlur);

        heartBeatUp();
      }

      function makeSureThereIsAGapAfterFirstTrackingRequestToPreventMultipleVisitorCreation(callback) {
        var now = new Date();
        var timeNow = now.getTime();
        lastTrackerRequestTime = timeNow;

        if (timeNextTrackingRequestCanBeExecutedImmediately && timeNow < timeNextTrackingRequestCanBeExecutedImmediately) {
          // we are in the time frame shortly after the first request. we have to delay this request a bit to make sure
          // a visitor has been created meanwhile.
          var timeToWait = timeNextTrackingRequestCanBeExecutedImmediately - timeNow;
          setTimeout(callback, timeToWait);
          setExpireDateTime(timeToWait + 50); // set timeout is not necessarily executed at timeToWait so delay a bit more

          timeNextTrackingRequestCanBeExecutedImmediately += 50; // delay next tracking request by further 50ms to next execute them at same time

          return;
        }

        if (timeNextTrackingRequestCanBeExecutedImmediately === false) {
          // it is the first request, we want to execute this one directly and delay all the next one(s) within a delay.
          // All requests after this delay can be executed as usual again
          var delayInMs = 800;
          timeNextTrackingRequestCanBeExecutedImmediately = timeNow + delayInMs;
        }

        callback();
      }
      /*
             * Send request
             */


      function sendRequest(request, delay, callback) {
        if (!configDoNotTrack && request) {
          makeSureThereIsAGapAfterFirstTrackingRequestToPreventMultipleVisitorCreation(function () {
            if (configRequestMethod === 'POST' || String(request).length > 2000) {
              sendXmlHttpRequest(request, callback);
            } else {
              getImage(request, callback);
            }

            setExpireDateTime(delay);
          });
        }

        if (!heartBeatSetUp) {
          setUpHeartBeat(); // setup window events too, but only once
        } else {
          heartBeatUp();
        }
      }

      function canSendBulkRequest(requests) {
        if (configDoNotTrack) {
          return false;
        }

        return requests && requests.length;
      }
      /*
             * Send requests using bulk
             */


      function sendBulkRequest(requests, delay) {
        if (!canSendBulkRequest(requests)) {
          return;
        }

        var bulk = '{"requests":["?' + requests.join('","?') + '"]}';
        makeSureThereIsAGapAfterFirstTrackingRequestToPreventMultipleVisitorCreation(function () {
          sendXmlHttpRequest(bulk, null, false);
          setExpireDateTime(delay);
        });
      }
      /*
             * Get cookie name with prefix and domain hash
             */


      function getCookieName(baseName) {
        // NOTE: If the cookie name is changed, we must also update the PiwikTracker.php which
        // will attempt to discover first party cookies. eg. See the PHP Client method getVisitorId()
        return configCookieNamePrefix + baseName + '.' + configTrackerSiteId + '.' + domainHash;
      }
      /*
             * Does browser have cookies enabled (for this site)?
             */


      function hasCookies() {
        if (configCookiesDisabled) {
          return '0';
        }

        if (!isDefined(navigatorAlias.cookieEnabled)) {
          var testCookieName = getCookieName('testcookie');
          setCookie(testCookieName, '1');
          return getCookie(testCookieName) === '1' ? '1' : '0';
        }

        return navigatorAlias.cookieEnabled ? '1' : '0';
      }
      /*
             * Update domain hash
             */


      function updateDomainHash() {
        domainHash = hash((configCookieDomain || domainAlias) + (configCookiePath || '/')).slice(0, 4); // 4 hexits = 16 bits
      }
      /*
             * Inits the custom variables object
             */


      function getCustomVariablesFromCookie() {
        var cookieName = getCookieName('cvar');
        var cookie = getCookie(cookieName);

        if (cookie.length) {
          cookie = JSON_PIWIK.parse(cookie);

          if (isObject(cookie)) {
            return cookie;
          }
        }

        return {};
      }
      /*
             * Lazy loads the custom variables from the cookie, only once during this page view
             */


      function loadCustomVariables() {
        if (customVariables === false) {
          customVariables = getCustomVariablesFromCookie();
        }
      }
      /*
             * Generate a pseudo-unique ID to fingerprint this user
             * 16 hexits = 64 bits
             * note: this isn't a RFC4122-compliant UUID
             */


      function generateRandomUuid() {
        return hash((navigatorAlias.userAgent || '') + (navigatorAlias.platform || '') + JSON_PIWIK.stringify(browserFeatures) + new Date().getTime() + Math.random()).slice(0, 16);
      }

      function generateBrowserSpecificId() {
        return hash((navigatorAlias.userAgent || '') + (navigatorAlias.platform || '') + JSON_PIWIK.stringify(browserFeatures)).slice(0, 6);
      }

      function getCurrentTimestampInSeconds() {
        return Math.floor(new Date().getTime() / 1000);
      }

      function makeCrossDomainDeviceId() {
        var timestamp = getCurrentTimestampInSeconds();
        var browserId = generateBrowserSpecificId();
        var deviceId = String(timestamp) + browserId;
        return deviceId;
      }

      function isSameCrossDomainDevice(deviceIdFromUrl) {
        deviceIdFromUrl = String(deviceIdFromUrl);
        var thisBrowserId = generateBrowserSpecificId();
        var lengthBrowserId = thisBrowserId.length;
        var browserIdInUrl = deviceIdFromUrl.substr(-1 * lengthBrowserId, lengthBrowserId);
        var timestampInUrl = parseInt(deviceIdFromUrl.substr(0, deviceIdFromUrl.length - lengthBrowserId), 10);

        if (timestampInUrl && browserIdInUrl && browserIdInUrl === thisBrowserId) {
          // we only reuse visitorId when used on same device / browser
          var currentTimestampInSeconds = getCurrentTimestampInSeconds();

          if (configVisitorIdUrlParameterTimeoutInSeconds <= 0) {
            return true;
          }

          if (currentTimestampInSeconds >= timestampInUrl && currentTimestampInSeconds <= timestampInUrl + configVisitorIdUrlParameterTimeoutInSeconds) {
            // we only use visitorId if it was generated max 180 seconds ago
            return true;
          }
        }

        return false;
      }

      function getVisitorIdFromUrl(url) {
        if (!crossDomainTrackingEnabled) {
          return '';
        } // problem different timezone or when the time on the computer is not set correctly it may re-use
        // the same visitorId again. therefore we also have a factor like hashed user agent to reduce possible
        // activation of a visitorId on other device


        var visitorIdParam = getUrlParameter(url, configVisitorIdUrlParameter);

        if (!visitorIdParam) {
          return '';
        }

        visitorIdParam = String(visitorIdParam);
        var pattern = new RegExp('^[a-zA-Z0-9]+$');

        if (visitorIdParam.length === 32 && pattern.test(visitorIdParam)) {
          var visitorDevice = visitorIdParam.substr(16, 32);

          if (isSameCrossDomainDevice(visitorDevice)) {
            var visitorId = visitorIdParam.substr(0, 16);
            return visitorId;
          }
        }

        return '';
      }

      var cookId;
      /*
             * Load visitor ID cookie
             */

      function loadVisitorIdCookie() {
        if (!visitorUUID) {
          // we are using locationHrefAlias and not currentUrl on purpose to for sure get the passed URL parameters
          // from original URL
          visitorUUID = getVisitorIdFromUrl(locationHrefAlias);
        }

        var now = new Date();
        var nowTs = Math.round(now.getTime() / 1000);
        var visitorIdCookieName = getCookieName('id');
        var id = getCookie(visitorIdCookieName);
        var cookieValue;
        var uuid;

        if (cookId) {
          id = cookId;
        } // Visitor ID cookie found


        if (id) {
          cookieValue = id.split('.'); // returning visitor flag

          cookieValue.unshift('0');

          if (visitorUUID.length) {
            cookieValue[1] = visitorUUID;
          }

          return cookieValue;
        }

        if (visitorUUID.length) {
          uuid = visitorUUID;
        } else if (hasCookies() === '0') {
          uuid = '';
        } else {
          uuid = generateRandomUuid();
        } // No visitor ID cookie, let's create a new one


        cookieValue = [// new visitor
        '1', // uuid
        uuid, // creation timestamp - seconds since Unix epoch
        nowTs, // visitCount - 0 = no previous visit
        0, // current visit timestamp
        nowTs, // last visit timestamp - blank = no previous visit
        '', // last ecommerce order timestamp
        ''];
        cookId = cookieValue.slice(1).join('.');
        return cookieValue;
      }
      /**
             * Loads the Visitor ID cookie and returns a named array of values
             */


      function getValuesFromVisitorIdCookie() {
        var cookieVisitorIdValue = loadVisitorIdCookie();
        var newVisitor = cookieVisitorIdValue[0];
        var uuid = cookieVisitorIdValue[1];
        var createTs = cookieVisitorIdValue[2];
        var visitCount = cookieVisitorIdValue[3];
        var currentVisitTs = cookieVisitorIdValue[4];
        var lastVisitTs = cookieVisitorIdValue[5]; // case migrating from pre-1.5 cookies

        if (!isDefined(cookieVisitorIdValue[6])) {
          cookieVisitorIdValue[6] = '';
        }

        return {
          newVisitor: newVisitor,
          uuid: uuid,
          createTs: createTs,
          visitCount: visitCount,
          currentVisitTs: currentVisitTs,
          lastVisitTs: lastVisitTs
        };
      }

      function getRemainingVisitorCookieTimeout() {
        var now = new Date();
        var nowTs = now.getTime();
        var cookieCreatedTs = getValuesFromVisitorIdCookie().createTs;
        var createTs = parseInt(cookieCreatedTs, 10);
        var originalTimeout = createTs * 1000 + configVisitorCookieTimeout - nowTs;
        return originalTimeout;
      }
      /*
             * Sets the Visitor ID cookie
             */


      function setVisitorIdCookie(visitorIdCookieValues) {
        if (!configTrackerSiteId) {
          // when called before Site ID was set
          return;
        }

        var now = new Date();
        var nowTs = Math.round(now.getTime() / 1000);

        if (!isDefined(visitorIdCookieValues)) {
          visitorIdCookieValues = getValuesFromVisitorIdCookie();
        }

        var cookieValue = visitorIdCookieValues.uuid + '.' + visitorIdCookieValues.createTs + '.' + visitorIdCookieValues.visitCount + '.' + nowTs + '.' + visitorIdCookieValues.lastVisitTs;
        setCookie(getCookieName('id'), cookieValue, getRemainingVisitorCookieTimeout(), configCookiePath, configCookieDomain, configCookieIsSecure);
      }
      /*
             * Loads the referrer attribution information
             *
             * @returns array
             *  0: campaign name
             *  1: campaign keyword
             *  2: timestamp
             *  3: raw URL
             */


      function loadReferrerAttributionCookie() {
        // NOTE: if the format of the cookie changes,
        // we must also update JS tests, PHP tracker, System tests,
        // and notify other tracking clients (eg. Java) of the changes
        var cookie = getCookie(getCookieName('ref'));

        if (cookie.length) {
          try {
            cookie = JSON_PIWIK.parse(cookie);

            if (isObject(cookie)) {
              return cookie;
            }
          } catch (ignore) {// Pre 1.3, this cookie was not JSON encoded
          }
        }

        return ['', '', 0, ''];
      }

      function deleteCookie(cookieName, path, domain) {
        setCookie(cookieName, '', -86400, path, domain);
      }

      function isPossibleToSetCookieOnDomain(domainToTest) {
        var valueToSet = 'testvalue';
        setCookie('test', valueToSet, 10000, null, domainToTest);

        if (getCookie('test') === valueToSet) {
          deleteCookie('test', null, domainToTest);
          return true;
        }

        return false;
      }

      function deleteCookies() {
        var savedConfigCookiesDisabled = configCookiesDisabled; // Temporarily allow cookies just to delete the existing ones

        configCookiesDisabled = false;
        var index, cookieName;

        for (index = 0; index < configCookiesToDelete.length; index++) {
          cookieName = getCookieName(configCookiesToDelete[index]);
        }

        configCookiesDisabled = savedConfigCookiesDisabled;
      }

      function setSiteId(siteId) {
        configTrackerSiteId = siteId;
        setVisitorIdCookie();
      }

      function setMediaId(mediaId) {
        configTrackerMediaId = mediaId;
      }

      function sortObjectByKeys(value) {
        if (!value || !isObject(value)) {
          return;
        } // Object.keys(value) is not supported by all browsers, we get the keys manually


        var keys = [];
        var key;

        for (key in value) {
          if (Object.prototype.hasOwnProperty.call(value, key)) {
            keys.push(key);
          }
        }

        var normalized = {};
        keys.sort();
        var len = keys.length;
        var i;

        for (i = 0; i < len; i++) {
          normalized[keys[i]] = value[keys[i]];
        }

        return normalized;
      }
      /**
             * Creates the session cookie
             */


      function setSessionCookie() {
        setCookie(getCookieName('ses'), '*', configSessionCookieTimeout, configCookiePath, configCookieDomain, configCookieIsSecure);
      }

      function generateUniqueId() {
        var lut = Array(256).fill().map(function (_, i) {
          return (i < 16 ? '0' : '') + i.toString(16);
        });

        var formatUuid = function formatUuid(_ref) {
          var d0 = _ref.d0;
          var d1 = _ref.d1;
          var d2 = _ref.d2;
          var d3 = _ref.d3;
          return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' + lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' + lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] + lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
        };

        var getRandomValuesFunc = window.crypto && window.crypto.getRandomValues ? function () {
          var dvals = new Uint32Array(4);
          window.crypto.getRandomValues(dvals);
          return {
            d0: dvals[0],
            d1: dvals[1],
            d2: dvals[2],
            d3: dvals[3]
          };
        } : function () {
          return {
            d0: Math.random() * 0x100000000 >>> 0,
            d1: Math.random() * 0x100000000 >>> 0,
            d2: Math.random() * 0x100000000 >>> 0,
            d3: Math.random() * 0x100000000 >>> 0
          };
        };
        return formatUuid(getRandomValuesFunc());
      }
      /**
             * Returns the URL to call piwik.php,
             * with the standard parameters (plugins, resolution, url, referrer, etc.).
             * Sends the pageview and browser settings with every request in case of race conditions.
             */


      function getRequest(request, customData, pluginMethod) {
        var i;
        var now = new Date();
        var nowTs = Math.round(now.getTime() / 1000);
        var referralTs;
        var referralUrl;
        var referralUrlMaxLength = 1024;
        var currentReferrerHostName;
        var originalReferrerHostName;
        var customVariablesCopy = customVariables;
        var cookieSessionName = getCookieName('ses');
        var cookieReferrerName = getCookieName('ref');
        var cookieCustomVariablesName = getCookieName('cvar');
        var cookieSessionValue = getCookie(cookieSessionName);
        var attributionCookie = loadReferrerAttributionCookie();
        var currentUrl = configCustomUrl || locationHrefAlias;
        var campaignNameDetected;
        var campaignKeywordDetected;

        if (configCookiesDisabled) {
          deleteCookies();
        }

        if (configDoNotTrack) {
          return '';
        }

        var cookieVisitorIdValues = getValuesFromVisitorIdCookie(); // send charset if document charset is not utf-8. sometimes encoding
        // of urls will be the same as this and not utf-8, which will cause problems
        // do not send charset if it is utf8 since it's assumed by default in Piwik

        var charSet = documentAlias.characterSet || documentAlias.charset;

        if (!charSet || charSet.toLowerCase() === 'utf-8') {
          charSet = null;
        }

        campaignNameDetected = attributionCookie[0];
        campaignKeywordDetected = attributionCookie[1];
        referralTs = attributionCookie[2];
        referralUrl = attributionCookie[3];

        if (!cookieSessionValue) {
          // cookie 'ses' was not found: we consider this the start of a 'session'
          // here we make sure that if 'ses' cookie is deleted few times within the visit
          // and so this code path is triggered many times for one visit,
          // we only increase visitCount once per Visit window (default 30min)
          var visitDuration = configSessionCookieTimeout / 1000;

          if (!cookieVisitorIdValues.lastVisitTs || nowTs - cookieVisitorIdValues.lastVisitTs > visitDuration) {
            cookieVisitorIdValues.visitCount++;
            cookieVisitorIdValues.lastVisitTs = cookieVisitorIdValues.currentVisitTs;
          } // Detect the campaign information from the current URL
          // Only if campaign wasn't previously set
          // Or if it was set but we must attribute to the most recent one
          // Note: we are working on the currentUrl before purify() since we can parse the campaign parameters in the hash tag


          if (!configConversionAttributionFirstReferrer || !campaignNameDetected.length) {
            for (i in configCampaignNameParameters) {
              if (Object.prototype.hasOwnProperty.call(configCampaignNameParameters, i)) {
                campaignNameDetected = getUrlParameter(currentUrl, configCampaignNameParameters[i]);

                if (campaignNameDetected.length) {
                  break;
                }
              }
            }

            for (i in configCampaignKeywordParameters) {
              if (Object.prototype.hasOwnProperty.call(configCampaignKeywordParameters, i)) {
                campaignKeywordDetected = getUrlParameter(currentUrl, configCampaignKeywordParameters[i]);

                if (campaignKeywordDetected.length) {
                  break;
                }
              }
            }
          } // Store the referrer URL and time in the cookie;
          // referral URL depends on the first or last referrer attribution


          currentReferrerHostName = getHostName(configReferrerUrl);
          originalReferrerHostName = referralUrl.length ? getHostName(referralUrl) : '';

          if (currentReferrerHostName.length && // there is a referrer
          !isSiteHostName(currentReferrerHostName) && ( // domain is not the current domain
          !configConversionAttributionFirstReferrer || // attribute to last known referrer
          !originalReferrerHostName.length || // previously empty
          isSiteHostName(originalReferrerHostName))) {
            // previously set but in current domain
            referralUrl = configReferrerUrl;
          } // Set the referral cookie if we have either a Referrer URL, or detected a Campaign (or both)


          if (referralUrl.length || campaignNameDetected.length) {
            referralTs = nowTs;
            attributionCookie = [campaignNameDetected, campaignKeywordDetected, referralTs, purify(referralUrl.slice(0, referralUrlMaxLength))];
            setCookie(cookieReferrerName, JSON_PIWIK.stringify(attributionCookie), configReferralCookieTimeout, configCookiePath, configCookieDomain);
          }
        } // build out the rest of the request


        request += '&idsite=' + configTrackerSiteId + (configTrackerMediaId ? '&idmedia=' + configTrackerMediaId : '') + '&rec=1' + '&r=' + String(Math.random()).slice(2, 8) + // keep the string to a minimum
        '&h=' + now.getHours() + '&m=' + now.getMinutes() + '&s=' + now.getSeconds() + '&url=' + encodeWrapper(purify(currentUrl)) + (configReferrerUrl.length ? '&urlref=' + encodeWrapper(purify(configReferrerUrl)) : '') + (configUserId && configUserId.length ? '&uid=' + encodeWrapper(configUserId) : '') + '&_id=' + cookieVisitorIdValues.uuid + '&_idts=' + cookieVisitorIdValues.createTs + '&_idvc=' + cookieVisitorIdValues.visitCount + '&_idn=' + cookieVisitorIdValues.newVisitor + ( // currently unused
        campaignNameDetected.length ? '&_rcn=' + encodeWrapper(campaignNameDetected) : '') + (campaignKeywordDetected.length ? '&_rck=' + encodeWrapper(campaignKeywordDetected) : '') + '&_refts=' + referralTs + '&_viewts=' + cookieVisitorIdValues.lastVisitTs + (String(referralUrl).length ? '&_ref=' + encodeWrapper(purify(referralUrl.slice(0, referralUrlMaxLength))) : '') + (charSet ? '&cs=' + encodeWrapper(charSet) : '') + '&send_image=0'; // browser features

        for (i in browserFeatures) {
          if (Object.prototype.hasOwnProperty.call(browserFeatures, i)) {
            request += '&' + i + '=' + browserFeatures[i];
          }
        }

        var customDimensionIdsAlreadyHandled = [];

        if (customData) {
          for (i in customData) {
            if (Object.prototype.hasOwnProperty.call(customData, i) && /^dimension\d+$/.test(i)) {
              var index = i.replace('dimension', '');
              customDimensionIdsAlreadyHandled.push(parseInt(index, 10));
              customDimensionIdsAlreadyHandled.push(String(index));
              request += '&' + i + '=' + customData[i];
              delete customData[i];
            }
          }
        }

        if (customData && isObjectEmpty(customData)) {
          customData = null; // we deleted all keys from custom data
        } // custom dimensions


        for (i in customDimensions) {
          if (Object.prototype.hasOwnProperty.call(customDimensions, i)) {
            var isNotSetYet = indexOfArray(customDimensionIdsAlreadyHandled, i) === -1;

            if (isNotSetYet) {
              request += '&dimension' + i + '=' + customDimensions[i];
            }
          }
        } // custom data


        if (customData) {
          request += '&data=' + encodeWrapper(JSON_PIWIK.stringify(customData));
        } else if (configCustomData) {
          request += '&data=' + encodeWrapper(JSON_PIWIK.stringify(configCustomData));
        } // Custom Variables, scope "page"


        function appendCustomVariablesToRequest(customVariables, parameterName) {
          var customVariablesStringified = JSON_PIWIK.stringify(customVariables);

          if (customVariablesStringified.length > 2) {
            return '&' + parameterName + '=' + encodeWrapper(customVariablesStringified);
          }

          return '';
        }

        var sortedCustomVarPage = sortObjectByKeys(customVariablesPage);
        var sortedCustomVarEvent = sortObjectByKeys(customVariablesEvent);
        request += appendCustomVariablesToRequest(sortedCustomVarPage, 'cvar');
        request += appendCustomVariablesToRequest(sortedCustomVarEvent, 'e_cvar'); // Custom Variables, scope "visit"

        if (customVariables) {
          request += appendCustomVariablesToRequest(customVariables, '_cvar'); // Don't save deleted custom variables in the cookie

          for (i in customVariablesCopy) {
            if (Object.prototype.hasOwnProperty.call(customVariablesCopy, i)) {
              if (customVariables[i][0] === '' || customVariables[i][1] === '') {
                delete customVariables[i];
              }
            }
          }

          if (configStoreCustomVariablesInCookie) {
            setCookie(cookieCustomVariablesName, JSON_PIWIK.stringify(customVariables), configSessionCookieTimeout, configCookiePath, configCookieDomain);
          }
        } // performance tracking


        if (configPerformanceTrackingEnabled) {
          if (configPerformanceGenerationTime) {
            request += '&gt_ms=' + configPerformanceGenerationTime;
          } else if (performanceAlias && performanceAlias.timing && performanceAlias.timing.requestStart && performanceAlias.timing.responseEnd) {
            request += '&gt_ms=' + (performanceAlias.timing.responseEnd - performanceAlias.timing.requestStart);
          }
        }

        if (configIdPageView) {
          request += '&pv_id=' + configIdPageView;
        } // update cookies


        setVisitorIdCookie(cookieVisitorIdValues);
        setSessionCookie(); // tracker plugin hook

        request += executePluginMethod(pluginMethod, {
          tracker: trackerInstance,
          request: request
        });

        if (configAppendToTrackingUrl.length) {
          request += '&' + configAppendToTrackingUrl;
        }

        if (isFunction(configCustomRequestContentProcessing)) {
          request = configCustomRequestContentProcessing(request);
        }

        return request;
      }
      /*
             * If there was user activity since the last check, and it's been configHeartBeatDelay seconds
             * since the last tracker, send a ping request (the heartbeat timeout will be reset by sendRequest).
             */


      heartBeatPingIfActivityAlias = function heartBeatPingIfActivity() {
        var now = new Date();

        if (lastTrackerRequestTime + configHeartBeatDelay <= now.getTime()) {
          var requestPing = getRequest('ping=1', null, 'ping');
          sendRequest(requestPing, configTrackerPause);
          return true;
        }

        return false;
      };
      /*
             * Log the page view / visit
             */


      function logPageView(customTitle, customData, callback) {
        configIdPageView = generateUniqueId();
        var request = getRequest('action_name=' + encodeWrapper(titleFixup(customTitle || configTitle)), customData, 'log');
        sendRequest(request, configTrackerPause, callback);
      }
      /*
             * Construct regular expression of classes
             */


      function getClassesRegExp(configClasses, defaultClass) {
        var i;
        var classesRegExp = '(^| )(piwik[_-]' + defaultClass;

        if (configClasses) {
          for (i = 0; i < configClasses.length; i++) {
            classesRegExp += '|' + configClasses[i];
          }
        }

        classesRegExp += ')( |$)';
        return new RegExp(classesRegExp);
      }

      function startsUrlWithTrackerUrl(url) {
        return configTrackerUrl && url && String(url).indexOf(configTrackerUrl) === 0;
      }
      /*
             * Link or Download?
             */


      function getLinkType(className, href, isInLink, hasDownloadAttribute) {
        if (startsUrlWithTrackerUrl(href)) {
          return 0;
        } // does class indicate whether it is an (explicit/forced) outlink or a download?


        var downloadPattern = getClassesRegExp(configDownloadClasses, 'download');
        var linkPattern = getClassesRegExp(configLinkClasses, 'link'); // does file extension indicate that it is a download?

        var downloadExtensionsPattern = new RegExp('\\.(' + configDownloadExtensions.join('|') + ')([?&#]|$)', 'i');

        if (linkPattern.test(className)) {
          return 'link';
        }

        if (hasDownloadAttribute || downloadPattern.test(className) || downloadExtensionsPattern.test(href)) {
          return 'download';
        }

        if (isInLink) {
          return 0;
        }

        return 'link';
      }

      function getSourceElement(sourceElement) {
        var parentElement;
        parentElement = sourceElement.parentNode;

        while (parentElement !== null &&
        /* buggy IE5.5 */
        isDefined(parentElement)) {
          if (query.isLinkElement(sourceElement)) {
            break;
          }

          sourceElement = parentElement;
          parentElement = sourceElement.parentNode;
        }

        return sourceElement;
      }

      function getLinkIfShouldBeProcessed(sourceElement) {
        sourceElement = getSourceElement(sourceElement);

        if (!query.hasNodeAttribute(sourceElement, 'href')) {
          return;
        }

        if (!isDefined(sourceElement.href)) {
          return;
        }

        var href = query.getAttributeValueFromNode(sourceElement, 'href');

        if (startsUrlWithTrackerUrl(href)) {
          return;
        }

        var originalSourcePath = sourceElement.pathname || getPathName(sourceElement.href); // browsers, such as Safari, don't downcase hostname and href

        var originalSourceHostName = sourceElement.hostname || getHostName(sourceElement.href);
        var sourceHostName = originalSourceHostName.toLowerCase();
        var sourceHref = sourceElement.href.replace(originalSourceHostName, sourceHostName); // browsers, such as Safari, don't downcase hostname and href

        var scriptProtocol = new RegExp('^(javascript|vbscript|jscript|mocha|livescript|ecmascript|mailto|tel):', 'i');

        if (!scriptProtocol.test(sourceHref)) {
          // track outlinks and all downloads
          var linkType = getLinkType(sourceElement.className, sourceHref, isSiteHostPath(sourceHostName, originalSourcePath), query.hasNodeAttribute(sourceElement, 'download'));

          if (linkType) {
            return {
              type: linkType,
              href: sourceHref
            };
          }
        }
      }

      function buildEventRequest(category, action, name, value) {
        return 'e_c=' + encodeWrapper(category) + '&e_a=' + encodeWrapper(action) + (isDefined(name) ? '&e_n=' + encodeWrapper(name) : '') + (isDefined(value) ? '&e_v=' + encodeWrapper(value) : '');
      }
      /*
             * Log the event
             */


      function logEvent(category, action, name, value, customData, callback) {
        // Category and Action are required parameters
        if (trim(String(category)).length === 0 || trim(String(action)).length === 0) {
          logConsoleError('Error while logging event: Parameters `category` and `action` must not be empty or filled with whitespaces');
          return false;
        }

        var request = getRequest(buildEventRequest(category, action, name, value), customData, 'event');
        sendRequest(request, configTrackerPause, callback);
      }
      /*
             * Log the link or click with the server
             */


      function logLink(url, linkType, customData, callback, sourceElement) {
        var linkParams = linkType + '=' + encodeWrapper(purify(url));
        var interaction = getContentInteractionToRequestIfPossible(sourceElement, 'click', url);

        if (interaction) {
          linkParams += '&' + interaction;
        }

        var request = getRequest(linkParams, customData, 'link');
        sendRequest(request, configTrackerPause, callback);
      }
      /*
             * Browser prefix
             */


      function prefixPropertyName(prefix, propertyName) {
        if (prefix !== '') {
          return prefix + propertyName.charAt(0).toUpperCase() + propertyName.slice(1);
        }

        return propertyName;
      }
      /*
             * Check for pre-rendered web pages, and log the page view/link/goal
             * according to the configuration and/or visibility
             *
             * @see http://dvcs.w3.org/hg/webperf/raw-file/tip/specs/PageVisibility/Overview.html
             */


      function trackCallback(callback) {
        var isPreRendered;
        var i; // Chrome 13, IE10, FF10

        var prefixes = ['', 'webkit', 'ms', 'moz'];
        var prefix;

        if (!configCountPreRendered) {
          for (i = 0; i < prefixes.length; i++) {
            prefix = prefixes[i]; // does this browser support the page visibility API?

            if (Object.prototype.hasOwnProperty.call(documentAlias, prefixPropertyName(prefix, 'hidden'))) {
              // if pre-rendered, then defer callback until page visibility changes
              if (documentAlias[prefixPropertyName(prefix, 'visibilityState')] === 'prerender') {
                isPreRendered = true;
              }

              break;
            }
          }
        }

        if (isPreRendered) {
          // note: the event name doesn't follow the same naming convention as vendor properties
          _addEventListener(documentAlias, prefix + 'visibilitychange', function ready() {
            documentAlias.removeEventListener(prefix + 'visibilitychange', ready, false);
            callback();
          });

          return;
        } // configCountPreRendered === true || isPreRendered === false


        callback();
      }

      function getCrossDomainVisitorId() {
        var visitorId = getValuesFromVisitorIdCookie().uuid;
        var deviceId = makeCrossDomainDeviceId();
        return visitorId + deviceId;
      }

      function isIE8orOlder() {
        return documentAlias.all && !documentAlias.addEventListener;
      }

      function getKeyCodeFromEvent(event) {
        // event.which is deprecated https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/which
        var which = event.which;
        /**
                 1 : Left mouse button
                 2 : Wheel button or middle button
                 3 : Right mouse button
                 */

        var typeOfEventButton = _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(event.button);

        if (!which && typeOfEventButton !== 'undefined') {
          /**
                     -1: No button pressed
                     0 : Main button pressed, usually the left button
                     1 : Auxiliary button pressed, usually the wheel button or themiddle button (if present)
                     2 : Secondary button pressed, usually the right button
                     3 : Fourth button, typically the Browser Back button
                     4 : Fifth button, typically the Browser Forward button
                      IE8 and earlier has different values:
                     1 : Left mouse button
                     2 : Right mouse button
                     4 : Wheel button or middle button
                      For a left-hand configured mouse, the return values are reversed. We do not take care of that.
                     */
          if (isIE8orOlder()) {
            if (event.button & 1) {
              which = 1;
            } else if (event.button & 2) {
              which = 3;
            } else if (event.button & 4) {
              which = 2;
            }
          } else {
            if (event.button === 0 || event.button === '0') {
              which = 1;
            } else if (event.button & 1) {
              which = 2;
            } else if (event.button & 2) {
              which = 3;
            }
          }
        }

        return which;
      }

      function getNameOfClickedButton(event) {
        switch (getKeyCodeFromEvent(event)) {
          case 1:
            return 'left';

          case 2:
            return 'middle';

          case 3:
            return 'right';
        }
      }

      function getTargetElementFromEvent(event) {
        return event.target || event.srcElement;
      }
      /*
             * Browser features (plugins, resolution, cookies)
             */


      function detectBrowserFeatures() {
        var i;
        var mimeType;
        var pluginMap = {
          // document types
          pdf: 'application/pdf',
          // media players
          qt: 'video/quicktime',
          realp: 'audio/x-pn-realaudio-plugin',
          wma: 'application/x-mplayer2',
          // interactive multimedia
          dir: 'application/x-director',
          fla: 'application/x-shockwave-flash',
          // RIA
          java: 'application/x-java-vm',
          gears: 'application/x-googlegears',
          ag: 'application/x-silverlight' // detect browser features except IE < 11 (IE 11 user agent is no longer MSIE)

        };

        if (!new RegExp('MSIE').test(navigatorAlias.userAgent)) {
          // general plugin detection
          if (navigatorAlias.mimeTypes && navigatorAlias.mimeTypes.length) {
            for (i in pluginMap) {
              if (Object.prototype.hasOwnProperty.call(pluginMap, i)) {
                mimeType = navigatorAlias.mimeTypes[pluginMap[i]];
                browserFeatures[i] = mimeType && mimeType.enabledPlugin ? '1' : '0';
              }
            }
          } // Safari and Opera
          // IE6/IE7 navigator.javaEnabled can't be aliased, so test directly
          // on Edge navigator.javaEnabled() always returns `true`, so ignore it


          if (!new RegExp('Edge[ /](\\d+[\\.\\d]+)').test(navigatorAlias.userAgent) && typeof navigator.javaEnabled !== 'unknown' && isDefined(navigatorAlias.javaEnabled) && navigatorAlias.javaEnabled()) {
            browserFeatures.java = '1';
          } // Firefox


          if (isFunction(windowAlias.GearsFactory)) {
            browserFeatures.gears = '1';
          } // other browser features


          browserFeatures.cookie = hasCookies();
        }

        var width = parseInt(screenAlias.width, 10);
        var height = parseInt(screenAlias.height, 10);
        browserFeatures.res = parseInt(width, 10) + 'x' + parseInt(height, 10);
      }
      /* <DEBUG> */

      /*
             * Register a test hook. Using eval() permits access to otherwise
             * privileged members.
             */


      function registerHook(hookName, userHook) {
        var hookObj = null;

        if (isString(hookName) && !isDefined(registeredHooks[hookName]) && userHook) {
          if (isObject(userHook)) {
            hookObj = userHook;
          } else if (isString(userHook)) {
            try {
              eval('hookObj =' + userHook);
            } catch (ignore) {}
          }

          registeredHooks[hookName] = hookObj;
        }

        return hookObj;
      }
      /* </DEBUG> */

      /************************************************************
             * Constructor
             ************************************************************/

      /*
             * initialize tracker
             */


      detectBrowserFeatures();
      updateDomainHash();
      setVisitorIdCookie();
      /* <DEBUG> */

      /*
             * initialize test plugin
             */

      executePluginMethod('run', null, registerHook);
      /* </DEBUG> */

      /************************************************************
             * Public data and methods
             ************************************************************/

      /* <DEBUG> */

      /*
             * Test hook accessors
             */

      this.hook = registeredHooks;

      this.getHook = function (hookName) {
        return registeredHooks[hookName];
      };

      this.getQuery = function () {
        return query;
      };

      this.getContent = function () {
        return content;
      };

      this.setVisitorId = function (visitorId) {
        visitorUUID = visitorId;
      };

      this.trackCallbackOnLoad = trackCallbackOnLoad;
      this.trackCallbackOnReady = trackCallbackOnReady;
      this.internalIsNodeVisible = isVisible;

      this.getDomains = function () {
        return configHostsAlias;
      };

      this.getConfigIdPageView = function () {
        return configIdPageView;
      };

      this.clearConfigIdPageView = function () {
        configIdPageView = undefined;
      };

      this.getConfigDownloadExtensions = function () {
        return configDownloadExtensions;
      };

      this.getConfigVisitorCookieTimeout = function () {
        return configVisitorCookieTimeout;
      };

      this.removeAllAsyncTrackersButFirst = function () {
        var firstTracker = asyncTrackers[0];
        asyncTrackers = [firstTracker];
      };

      this.getRemainingVisitorCookieTimeout = getRemainingVisitorCookieTimeout;
      /* </DEBUG> */

      /**
             * Get visitor ID (from first party cookie)
             *
             * @return string Visitor ID in hexits (or empty string, if not yet known)
             */

      this.getVisitorId = function () {
        return getValuesFromVisitorIdCookie().uuid;
      };
      /**
             * Get the visitor information (from first party cookie)
             *
             * @return array
             */


      this.getVisitorInfo = function () {
        // Note: in a new method, we could return also return getValuesFromVisitorIdCookie()
        //       which returns named parameters rather than returning integer indexed array
        return loadVisitorIdCookie();
      };
      /**
             * Get the Attribution information, which is an array that contains
             * the Referrer used to reach the site as well as the campaign name and keyword
             * It is useful only when used in conjunction with Tracker API function setAttributionInfo()
             * To access specific data point, you should use the other functions getAttributionReferrer* and getAttributionCampaign*
             *
             * @return array Attribution array, Example use:
             *   1) Call JSON_PIWIK.stringify(piwikTracker.getAttributionInfo())
             *   2) Pass this json encoded string to the Tracking API (php or java client): setAttributionInfo()
             */


      this.getAttributionInfo = function () {
        return loadReferrerAttributionCookie();
      };
      /**
             * Get the Campaign name that was parsed from the landing page URL when the visitor
             * landed on the site originally
             *
             * @return string
             */


      this.getAttributionCampaignName = function () {
        return loadReferrerAttributionCookie()[0];
      };
      /**
             * Get the Campaign keyword that was parsed from the landing page URL when the visitor
             * landed on the site originally
             *
             * @return string
             */


      this.getAttributionCampaignKeyword = function () {
        return loadReferrerAttributionCookie()[1];
      };
      /**
             * Get the time at which the referrer (used for Goal Attribution) was detected
             *
             * @return int Timestamp or 0 if no referrer currently set
             */


      this.getAttributionReferrerTimestamp = function () {
        return loadReferrerAttributionCookie()[2];
      };
      /**
             * Get the full referrer URL that will be used for Goal Attribution
             *
             * @return string Raw URL, or empty string '' if no referrer currently set
             */


      this.getAttributionReferrerUrl = function () {
        return loadReferrerAttributionCookie()[3];
      };
      /**
             * Specify the Piwik tracking URL
             *
             * @param string trackerUrl
             */


      this.setTrackerUrl = function (trackerUrl) {
        configTrackerUrl = trackerUrl;
      };
      /**
             * Returns the Piwik tracking URL
             * @returns string
             */


      this.getTrackerUrl = function () {
        return configTrackerUrl;
      };
      /**
             * Adds a new tracker. All sent requests will be also sent to the given siteId and piwikUrl.
             *
             * @param string piwikUrl  The tracker URL of the current tracker instance
             * @param int|string siteId
             * @return Tracker
             */


      this.addTracker = function (piwikUrl, siteId, mediaId) {
        if (!siteId) {
          throw new Error('A siteId must be given to add a new tracker');
        }

        if (!isDefined(piwikUrl) || piwikUrl === null) {
          piwikUrl = this.getTrackerUrl();
        }

        var tracker = new Tracker(piwikUrl, siteId, mediaId);
        asyncTrackers.push(tracker);
        return tracker;
      };
      /**
             * Returns the site ID
             *
             * @returns int
             */


      this.getSiteId = function () {
        return configTrackerSiteId;
      };
      /**
             * Returns the media ID
             *
             * @returns int
             */


      this.getMediaId = function () {
        return configTrackerMediaId;
      };
      /**
             * Specify the site ID
             *
             * @param int|string siteId
             */


      this.setSiteId = function (siteId) {
        setSiteId(siteId);
      };
      /**
             * Specify the media ID
             *
             * @param int|string mediaId
             */


      this.setMediaId = function (mediaId) {
        setMediaId(mediaId);
      };
      /**
             * Clears the User ID and generates a new visitor id.
             */


      this.resetUserId = function () {
        configUserId = '';
      };
      /**
             * Sets a User ID to this user (such as an email address or a username)
             *
             * @param string User ID
             */


      this.setUserId = function (userId) {
        if (!isDefined(userId) || !userId.length) {
          return;
        }

        configUserId = userId;
      };
      /**
             * Gets the User ID if set.
             *
             * @returns string User ID
             */


      this.getUserId = function () {
        return configUserId;
      };
      /**
             * Pass custom data to the server
             *
             * Examples:
             *   tracker.setCustomData(object);
             *   tracker.setCustomData(key, value);
             *
             * @param mixed key_or_obj
             * @param mixed opt_value
             */


      this.setCustomData = function (key_or_obj, opt_value) {
        if (isObject(key_or_obj)) {
          configCustomData = key_or_obj;
        } else {
          if (!configCustomData) {
            configCustomData = {};
          }

          configCustomData[key_or_obj] = opt_value;
        }
      };
      /**
             * Get custom data
             *
             * @return mixed
             */


      this.getCustomData = function () {
        return configCustomData;
      };
      /**
             * Configure function with custom request content processing logic.
             * It gets called after request content in form of query parameters string has been prepared and before request content gets sent.
             *
             * Examples:
             *   tracker.setCustomRequestProcessing(function(request){
             *     var pairs = request.split('&');
             *     var result = {};
             *     pairs.forEach(function(pair) {
             *       pair = pair.split('=');
             *       result[pair[0]] = decodeURIComponent(pair[1] || '');
             *     });
             *     return JSON.stringify(result);
             *   });
             *
             * @param function customRequestContentProcessingLogic
             */


      this.setCustomRequestProcessing = function (customRequestContentProcessingLogic) {
        configCustomRequestContentProcessing = customRequestContentProcessingLogic;
      };
      /**
             * Appends the specified query string to the piwik.php?... Tracking API URL
             *
             * @param string queryString eg. 'lat=140&long=100'
             */


      this.appendToTrackingUrl = function (queryString) {
        configAppendToTrackingUrl = queryString;
      };
      /**
             * Returns the query string for the current HTTP Tracking API request.
             * Piwik would prepend the hostname and path to Piwik: http://example.org/piwik/piwik.php?
             * prior to sending the request.
             *
             * @param request eg. "param=value&param2=value2"
             */


      this.getRequest = function (request) {
        return getRequest(request);
      };
      /**
             * Add plugin defined by a name and a callback function.
             * The callback function will be called whenever a tracking request is sent.
             * This can be used to append data to the tracking request, or execute other custom logic.
             *
             * @param string pluginName
             * @param Object pluginObj
             */


      this.addPlugin = function (pluginName, pluginObj) {
        plugins[pluginName] = pluginObj;
      };
      /**
             * Set Custom Dimensions. Set Custom Dimensions will not be cleared after a tracked pageview and will
             * be sent along all following tracking requests. It is possible to remove/clear a value via `deleteCustomDimension`.
             *
             * @param int index A Custom Dimension index
             * @param string value
             */


      this.setCustomDimension = function (customDimensionId, value) {
        customDimensionId = parseInt(customDimensionId, 10);

        if (customDimensionId > 0) {
          if (!isDefined(value)) {
            value = '';
          }

          if (!isString(value)) {
            value = String(value);
          }

          customDimensions[customDimensionId] = value;
        }
      };
      /**
             * Get a stored value for a specific Custom Dimension index.
             *
             * @param int index A Custom Dimension index
             */


      this.getCustomDimension = function (customDimensionId) {
        customDimensionId = parseInt(customDimensionId, 10);

        if (customDimensionId > 0 && Object.prototype.hasOwnProperty.call(customDimensions, customDimensionId)) {
          return customDimensions[customDimensionId];
        }
      };
      /**
             * Delete a custom dimension.
             *
             * @param int index Custom dimension Id
             */


      this.deleteCustomDimension = function (customDimensionId) {
        customDimensionId = parseInt(customDimensionId, 10);

        if (customDimensionId > 0) {
          delete customDimensions[customDimensionId];
        }
      };
      /**
             * Set custom variable within this visit
             *
             * @param int index Custom variable slot ID from 1-5
             * @param string name
             * @param string value
             * @param string scope Scope of Custom Variable:
             *                     - "visit" will store the name/value in the visit and will persist it in the cookie for the duration of the visit,
             *                     - "page" will store the name/value in the next page view tracked.
             *                     - "event" will store the name/value in the next event tracked.
             */


      this.setCustomVariable = function (index, name, value, scope) {
        var toRecord;

        if (!isDefined(scope)) {
          scope = 'visit';
        }

        if (!isDefined(name)) {
          return;
        }

        if (!isDefined(value)) {
          value = '';
        }

        if (index > 0) {
          name = !isString(name) ? String(name) : name;
          value = !isString(value) ? String(value) : value;
          toRecord = [name.slice(0, customVariableMaximumLength), value.slice(0, customVariableMaximumLength)]; // numeric scope is there for GA compatibility

          if (scope === 'visit' || scope === 2) {
            loadCustomVariables();
            customVariables[index] = toRecord;
          } else if (scope === 'page' || scope === 3) {
            customVariablesPage[index] = toRecord;
          } else if (scope === 'event') {
            /* GA does not have 'event' scope but we do */
            customVariablesEvent[index] = toRecord;
          }
        }
      };
      /**
             * Get custom variable
             *
             * @param int index Custom variable slot ID from 1-5
             * @param string scope Scope of Custom Variable: "visit" or "page" or "event"
             */


      this.getCustomVariable = function (index, scope) {
        var cvar;

        if (!isDefined(scope)) {
          scope = 'visit';
        }

        if (scope === 'page' || scope === 3) {
          cvar = customVariablesPage[index];
        } else if (scope === 'event') {
          cvar = customVariablesEvent[index];
        } else if (scope === 'visit' || scope === 2) {
          loadCustomVariables();
          cvar = customVariables[index];
        }

        if (!isDefined(cvar) || cvar && cvar[0] === '') {
          return false;
        }

        return cvar;
      };
      /**
             * Delete custom variable
             *
             * @param int index Custom variable slot ID from 1-5
             * @param string scope
             */


      this.deleteCustomVariable = function (index, scope) {
        // Only delete if it was there already
        if (this.getCustomVariable(index, scope)) {
          this.setCustomVariable(index, '', '', scope);
        }
      };
      /**
             * Deletes all custom variables for a certain scope.
             *
             * @param string scope
             */


      this.deleteCustomVariables = function (scope) {
        if (scope === 'page' || scope === 3) {
          customVariablesPage = {};
        } else if (scope === 'event') {
          customVariablesEvent = {};
        } else if (scope === 'visit' || scope === 2) {
          customVariables = {};
        }
      };
      /**
             * When called then the Custom Variables of scope "visit" will be stored (persisted) in a first party cookie
             * for the duration of the visit. This is useful if you want to call getCustomVariable later in the visit.
             *
             * By default, Custom Variables of scope "visit" are not stored on the visitor's computer.
             */


      this.storeCustomVariablesInCookie = function () {
        configStoreCustomVariablesInCookie = true;
      };
      /**
             * Set delay for link tracking (in milliseconds)
             *
             * @param int delay
             */


      this.setLinkTrackingTimer = function (delay) {
        configTrackerPause = delay;
      };
      /**
             * Get delay for link tracking (in milliseconds)
             *
             * @param int delay
             */


      this.getLinkTrackingTimer = function () {
        return configTrackerPause;
      };
      /**
             * Set list of file extensions to be recognized as downloads
             *
             * @param string|array extensions
             */


      this.setDownloadExtensions = function (extensions) {
        if (isString(extensions)) {
          extensions = extensions.split('|');
        }

        configDownloadExtensions = extensions;
      };
      /**
             * Specify additional file extensions to be recognized as downloads
             *
             * @param string|array extensions  for example 'custom' or ['custom1','custom2','custom3']
             */


      this.addDownloadExtensions = function (extensions) {
        var i;

        if (isString(extensions)) {
          extensions = extensions.split('|');
        }

        for (i = 0; i < extensions.length; i++) {
          configDownloadExtensions.push(extensions[i]);
        }
      };
      /**
             * Removes specified file extensions from the list of recognized downloads
             *
             * @param string|array extensions  for example 'custom' or ['custom1','custom2','custom3']
             */


      this.removeDownloadExtensions = function (extensions) {
        var i;
        var newExtensions = [];

        if (isString(extensions)) {
          extensions = extensions.split('|');
        }

        for (i = 0; i < configDownloadExtensions.length; i++) {
          if (indexOfArray(extensions, configDownloadExtensions[i]) === -1) {
            newExtensions.push(configDownloadExtensions[i]);
          }
        }

        configDownloadExtensions = newExtensions;
      };
      /**
             * Set array of domains to be treated as local. Also supports path, eg '.piwik.org/subsite1'. In this
             * case all links that don't go to '*.piwik.org/subsite1/ *' would be treated as outlinks.
             * For example a link to 'piwik.org/' or 'piwik.org/subsite2' both would be treated as outlinks.
             *
             * Also supports page wildcard, eg 'piwik.org/index*'. In this case all links
             * that don't go to piwik.org/index* would be treated as outlinks.
             *
             * The current domain will be added automatically if no given host alias contains a path and if no host
             * alias is already given for the current host alias. Say you are on "example.org" and set
             * "hostAlias = ['example.com', 'example.org/test']" then the current "example.org" domain will not be
             * added as there is already a more restrictive hostAlias 'example.org/test' given. We also do not add
             * it automatically if there was any other host specifying any path like
             * "['example.com', 'example2.com/test']". In this case we would also not add the current
             * domain "example.org" automatically as the "path" feature is used. As soon as someone uses the path
             * feature, for Piwik JS Tracker to work correctly in all cases, one needs to specify all hosts
             * manually.
             *
             * @param string|array hostsAlias
             */


      this.setDomains = function (hostsAlias) {
        configHostsAlias = isString(hostsAlias) ? [hostsAlias] : hostsAlias;
        var hasDomainAliasAlready = false;
        var i = 0;
        var alias;

        for (i; i < configHostsAlias.length; i++) {
          alias = String(configHostsAlias[i]);

          if (isSameHost(domainAlias, domainFixup(alias))) {
            hasDomainAliasAlready = true;
            break;
          }

          var pathName = getPathName(alias);

          if (pathName && pathName !== '/' && pathName !== '/*') {
            hasDomainAliasAlready = true;
            break;
          }
        } // The current domain will be added automatically if no given host alias contains a path
        // and if no host alias is already given for the current host alias.


        if (!hasDomainAliasAlready) {
          /**
                     * eg if domainAlias = 'piwik.org' and someone set hostsAlias = ['piwik.org/foo'] then we should
                     * not add piwik.org as it would increase the allowed scope.
                     */
          configHostsAlias.push(domainAlias);
        }
      };
      /**
             * Enables cross domain linking. By default, the visitor ID that identifies a unique visitor is stored in
             * the browser's first party cookies. This means the cookie can only be accessed by pages on the same domain.
             * If you own multiple domains and would like to track all the actions and pageviews of a specific visitor
             * into the same visit, you may enable cross domain linking. Whenever a user clicks on a link it will append
             * a URL parameter pk_vid to the clicked URL which consists of these parts: 16 char visitorId, a 10 character
             * current timestamp and the last 6 characters are an id based on the userAgent to identify the users device).
             * This way the current visitorId is forwarded to the page of the different domain.
             *
             * On the different domain, the Piwik tracker will recognize the set visitorId from the URL parameter and
             * reuse this parameter if the page was loaded within 45 seconds. If cross domain linking was not enabled,
             * it would create a new visit on that page because we wouldn't be able to access the previously created
             * cookie. By enabling cross domain linking you can track several different domains into one website and
             * won't lose for example the original referrer.
             *
             * To make cross domain linking work you need to set which domains should be considered as your domains by
             * calling the method "setDomains()" first. We will add the URL parameter to links that go to a
             * different domain but only if the domain was previously set with "setDomains()" to make sure not to append
             * the URL parameters when a link actually goes to a third-party URL.
             */


      this.enableCrossDomainLinking = function () {
        crossDomainTrackingEnabled = true;
      };
      /**
             * Disable cross domain linking if it was previously enabled. See enableCrossDomainLinking();
             */


      this.disableCrossDomainLinking = function () {
        crossDomainTrackingEnabled = false;
      };
      /**
             * Detect whether cross domain linking is enabled or not. See enableCrossDomainLinking();
             * @returns bool
             */


      this.isCrossDomainLinkingEnabled = function () {
        return crossDomainTrackingEnabled;
      };
      /**
             * By default, the two visits across domains will be linked together
             * when the link is click and the page is loaded within 180 seconds.
             * @param timeout in seconds
             */


      this.setCrossDomainLinkingTimeout = function (timeout) {
        configVisitorIdUrlParameterTimeoutInSeconds = timeout;
      };
      /**
             * Returns the query parameter appended to link URLs so cross domain visits
             * can be detected.
             *
             * If your application creates links dynamically, then you'll have to add this
             * query parameter manually to those links (since the JavaScript tracker cannot
             * detect when those links are added).
             *
             * Eg:
             *
             * var url = 'http://myotherdomain.com/?' + piwikTracker.getCrossDomainLinkingUrlParameter();
             * $element.append('<a href="' + url + '"/>');
             */


      this.getCrossDomainLinkingUrlParameter = function () {
        return encodeWrapper(configVisitorIdUrlParameter) + '=' + encodeWrapper(getCrossDomainVisitorId());
      };
      /**
             * Set array of classes to be ignored if present in link
             *
             * @param string|array ignoreClasses
             */


      this.setIgnoreClasses = function (ignoreClasses) {
        configIgnoreClasses = isString(ignoreClasses) ? [ignoreClasses] : ignoreClasses;
      };
      /**
             * Set request method
             *
             * @param string method GET or POST; default is GET
             */


      this.setRequestMethod = function (method) {
        configRequestMethod = method || defaultRequestMethod;
      };
      /**
             * Set request Content-Type header value, applicable when POST request method is used for submitting tracking events.
             * See XMLHttpRequest Level 2 spec, section 4.7.2 for invalid headers
             * @link http://dvcs.w3.org/hg/xhr/raw-file/tip/Overview.html
             *
             * @param string requestContentType; default is 'application/x-www-form-urlencoded; charset=UTF-8'
             */


      this.setRequestContentType = function (requestContentType) {
        configRequestContentType = requestContentType || defaultRequestContentType;
      };
      /**
             * Override referrer
             *
             * @param string url
             */


      this.setReferrerUrl = function (url) {
        configReferrerUrl = url;
      };
      /**
             * Override url
             *
             * @param string url
             */


      this.setCustomUrl = function (url) {
        configCustomUrl = resolveRelativeReference(locationHrefAlias, url);
      };
      /**
             * Returns the current url of the page that is currently being visited. If a custom URL was set, the
             * previously defined custom URL will be returned.
             */


      this.getCurrentUrl = function () {
        return configCustomUrl || locationHrefAlias;
      };
      /**
             * Override document.title
             *
             * @param string title
             */


      this.setDocumentTitle = function (title) {
        configTitle = title;
      };
      /**
             * Set array of classes to be treated as downloads
             *
             * @param string|array downloadClasses
             */


      this.setDownloadClasses = function (downloadClasses) {
        configDownloadClasses = isString(downloadClasses) ? [downloadClasses] : downloadClasses;
      };
      /**
             * Set array of classes to be treated as outlinks
             *
             * @param string|array linkClasses
             */


      this.setLinkClasses = function (linkClasses) {
        configLinkClasses = isString(linkClasses) ? [linkClasses] : linkClasses;
      };
      /**
             * Set array of campaign name parameters
             *
             * @see http://piwik.org/faq/how-to/#faq_120
             * @param string|array campaignNames
             */


      this.setCampaignNameKey = function (campaignNames) {
        configCampaignNameParameters = isString(campaignNames) ? [campaignNames] : campaignNames;
      };
      /**
             * Set array of campaign keyword parameters
             *
             * @see http://piwik.org/faq/how-to/#faq_120
             * @param string|array campaignKeywords
             */


      this.setCampaignKeywordKey = function (campaignKeywords) {
        configCampaignKeywordParameters = isString(campaignKeywords) ? [campaignKeywords] : campaignKeywords;
      };
      /**
             * Strip hash tag (or anchor) from URL
             * Note: this can be done in the Piwik>Settings>Websites on a per-website basis
             *
             * @deprecated
             * @param bool enableFilter
             */


      this.discardHashTag = function (enableFilter) {
        configDiscardHashTag = enableFilter;
      };
      /**
             * Set first-party cookie name prefix
             *
             * @param string cookieNamePrefix
             */


      this.setCookieNamePrefix = function (cookieNamePrefix) {
        configCookieNamePrefix = cookieNamePrefix; // Re-init the Custom Variables cookie

        customVariables = getCustomVariablesFromCookie();
      };
      /**
             * Set first-party cookie domain
             *
             * @param string domain
             */


      this.setCookieDomain = function (domain) {
        var domainFixed = domainFixup(domain);

        if (isPossibleToSetCookieOnDomain(domainFixed)) {
          configCookieDomain = domainFixed;
          updateDomainHash();
        }
      };
      /**
             * Get first-party cookie domain
             */


      this.getCookieDomain = function () {
        return configCookieDomain;
      };
      /**
             * Detect if cookies are enabled and supported by browser.
             */


      this.hasCookies = function () {
        return hasCookies() === '1';
      };
      /**
             * Set a first-party cookie for the duration of the session.
             *
             * @param string cookieName
             * @param string cookieValue
             * @param int msToExpire Defaults to session cookie timeout
             */


      this.setSessionCookie = function (cookieName, cookieValue, msToExpire) {
        if (!cookieName) {
          throw new Error('Missing cookie name');
        }

        if (!isDefined(msToExpire)) {
          msToExpire = configSessionCookieTimeout;
        }

        configCookiesToDelete.push(cookieName);
        setCookie(getCookieName(cookieName), cookieValue, msToExpire, configCookiePath, configCookieDomain);
      };
      /**
             * Get first-party cookie value.
             *
             * Returns null if cookies are disabled or if no cookie could be found for this name.
             *
             * @param string cookieName
             */


      this.getCookie = function (cookieName) {
        var cookieValue = getCookie(getCookieName(cookieName));

        if (cookieValue === 0) {
          return null;
        }

        return cookieValue;
      };
      /**
             * Set first-party cookie path.
             *
             * @param string domain
             */


      this.setCookiePath = function (path) {
        configCookiePath = path;
        updateDomainHash();
      };
      /**
             * Get first-party cookie path.
             *
             * @param string domain
             */


      this.getCookiePath = function (path) {
        return configCookiePath;
      };
      /**
             * Set visitor cookie timeout (in seconds)
             * Defaults to 13 months (timeout=33955200)
             *
             * @param int timeout
             */


      this.setVisitorCookieTimeout = function (timeout) {
        configVisitorCookieTimeout = timeout * 1000;
      };
      /**
             * Set session cookie timeout (in seconds).
             * Defaults to 30 minutes (timeout=1800)
             *
             * @param int timeout
             */


      this.setSessionCookieTimeout = function (timeout) {
        configSessionCookieTimeout = timeout * 1000;
      };
      /**
             * Get session cookie timeout (in seconds).
             */


      this.getSessionCookieTimeout = function () {
        return configSessionCookieTimeout;
      };
      /**
             * Set referral cookie timeout (in seconds).
             * Defaults to 6 months (15768000000)
             *
             * @param int timeout
             */


      this.setReferralCookieTimeout = function (timeout) {
        configReferralCookieTimeout = timeout * 1000;
      };
      /**
             * Set conversion attribution to first referrer and campaign
             *
             * @param bool if true, use first referrer (and first campaign)
             *             if false, use the last referrer (or campaign)
             */


      this.setConversionAttributionFirstReferrer = function (enable) {
        configConversionAttributionFirstReferrer = enable;
      };
      /**
             * Enable the Secure cookie flag on all first party cookies.
             * This should be used when your website is only available under HTTPS
             * so that all tracking cookies are always sent over secure connection.
             *
             * @param bool
             */


      this.setSecureCookie = function (enable) {
        configCookieIsSecure = enable;
      };
      /**
             * Disables all cookies from being set
             *
             * Existing cookies will be deleted on the next call to track
             */


      this.disableCookies = function () {
        configCookiesDisabled = true;
        browserFeatures.cookie = '0';

        if (configTrackerSiteId) {
          deleteCookies();
        }
      };
      /**
             * One off cookies clearing. Useful to call this when you know for sure a new visitor is using the same browser,
             * it maybe helps to "reset" tracking cookies to prevent data reuse for different users.
             */


      this.deleteCookies = function () {
        deleteCookies();
      };
      /**
             * Handle do-not-track requests
             *
             * @param bool enable If true, don't track if user agent sends 'do-not-track' header
             */


      this.setDoNotTrack = function (enable) {
        var dnt = navigatorAlias.doNotTrack || navigatorAlias.msDoNotTrack;
        configDoNotTrack = enable && (dnt === 'yes' || dnt === '1'); // do not track also disables cookies and deletes existing cookies

        if (configDoNotTrack) {
          this.disableCookies();
        }
      };
      /**
             * Add click listener to a specific link element.
             * When clicked, Piwik will log the click automatically.
             *
             * @param DOMElement element
             * @param bool enable If false, do not use pseudo click-handler (middle click + context menu)
             */


      this.addListener = function (element, enable) {
        addClickListener(element, enable);
      };
      /**
             * Enable tracking of uncatched JavaScript errors
             *
             * If enabled, uncaught JavaScript Errors will be tracked as an event by defining a
             * window.onerror handler. If a window.onerror handler is already defined we will make
             * sure to call this previously registered error handler after tracking the error.
             *
             * By default we return false in the window.onerror handler to make sure the error still
             * appears in the browser's console etc. Note: Some older browsers might behave differently
             * so it could happen that an actual JavaScript error will be suppressed.
             * If a window.onerror handler was registered we will return the result of this handler.
             *
             * Make sure not to overwrite the window.onerror handler after enabling the JS error
             * tracking as the error tracking won't work otherwise. To capture all JS errors we
             * recommend to include the Piwik JavaScript tracker in the HTML as early as possible.
             * If possible directly in <head></head> before loading any other JavaScript.
             */


      this.enableJSErrorTracking = function () {
        if (enableJSErrorTracking) {
          return;
        }

        enableJSErrorTracking = true;
        var onError = windowAlias.onerror;

        windowAlias.onerror = function (message, url, linenumber, column, error) {
          trackCallback(function () {
            var category = 'JavaScript Errors';
            var action = url + ':' + linenumber;

            if (column) {
              action += ':' + column;
            }

            logEvent(category, action, message);
          });

          if (onError) {
            return onError(message, url, linenumber, column, error);
          }

          return false;
        };
      };
      /**
             * Disable automatic performance tracking
             */


      this.disablePerformanceTracking = function () {
        configPerformanceTrackingEnabled = false;
      };
      /**
             * Set the server generation time.
             * If set, the browser's performance.timing API in not used anymore to determine the time.
             *
             * @param int generationTime
             */


      this.setGenerationTimeMs = function (generationTime) {
        configPerformanceGenerationTime = parseInt(generationTime, 10);
      };
      /**
             * Set heartbeat (in seconds)
             *
             * @param int heartBeatDelayInSeconds Defaults to 15. Cannot be lower than 1.
             */


      this.enableHeartBeatTimer = function (heartBeatDelayInSeconds) {
        heartBeatDelayInSeconds = Math.max(heartBeatDelayInSeconds, 1);
        configHeartBeatDelay = (heartBeatDelayInSeconds || 15) * 1000; // if a tracking request has already been sent, start the heart beat timeout

        if (lastTrackerRequestTime !== null) {
          setUpHeartBeat();
        }
      };
      /**
             * Disable heartbeat if it was previously activated.
             */


      this.disableHeartBeatTimer = function () {
        heartBeatDown();

        if (configHeartBeatDelay || heartBeatSetUp) {
          if (windowAlias.removeEventListener) {
            windowAlias.removeEventListener('focus', heartBeatOnFocus, true);
            windowAlias.removeEventListener('blur', heartBeatOnBlur, true);
          } else if (windowAlias.detachEvent) {
            windowAlias.detachEvent('onfocus', heartBeatOnFocus);
            windowAlias.detachEvent('onblur', heartBeatOnBlur);
          }
        }

        configHeartBeatDelay = null;
        heartBeatSetUp = false;
      };
      /**
             * Frame buster
             */


      this.killFrame = function () {
        if (windowAlias.location !== windowAlias.top.location) {
          windowAlias.top.location = windowAlias.location;
        }
      };
      /**
             * Redirect if browsing offline (aka file: buster)
             *
             * @param string url Redirect to this URL
             */


      this.redirectFile = function (url) {
        if (windowAlias.location.protocol === 'file:') {
          windowAlias.location = url;
        }
      };
      /**
             * Count sites in pre-rendered state
             *
             * @param bool enable If true, track when in pre-rendered state
             */


      this.setCountPreRendered = function (enable) {
        configCountPreRendered = enable;
      };
      /**
             * Manually log a click from your own code
             *
             * @param string sourceUrl
             * @param string linkType
             * @param mixed customData
             * @param function callback
             */


      this.trackLink = function (sourceUrl, linkType, customData, callback) {
        trackCallback(function () {
          logLink(sourceUrl, linkType, customData, callback);
        });
      };
      /**
             * Get the number of page views that have been tracked so far within the currently loaded page.
             */


      this.getNumTrackedPageViews = function () {
        return numTrackedPageviews;
      };
      /**
             * Log visit to this page
             *
             * @param string customTitle
             * @param mixed customData
             * @param function callback
             */


      this.trackPageView = function (customTitle, customData, callback) {
        trackCallback(function () {
          numTrackedPageviews++;
          logPageView(customTitle, customData, callback);
        });
      };
      /**
             * Records an event
             *
             * @param string category The Event Category (Videos, Music, Games...)
             * @param string action The Event's Action (Play, Pause, Duration, Add Playlist, Downloaded, Clicked...)
             * @param string name (optional) The Event's object Name (a particular Movie name, or Song name, or File name...)
             * @param float value (optional) The Event's value
             * @param function callback
             * @param mixed customData
             */


      this.trackEvent = function (category, action, name, value, customData, callback) {
        trackCallback(function () {
          logEvent(category, action, name, value, customData, callback);
        });
      };
      /**
             * Sends a tracking request with custom request parameters.
             * Piwik will prepend the hostname and path to Piwik, as well as all other needed tracking request
             * parameters prior to sending the request. Useful eg if you track custom dimensions via a plugin.
             *
             * @param request eg. "param=value&param2=value2"
             * @param customData
             * @param callback
             * @param pluginMethod
             */


      this.trackRequest = function (request, customData, callback, pluginMethod) {
        trackCallback(function () {
          var fullRequest = getRequest(request, customData, pluginMethod);
          sendRequest(fullRequest, configTrackerPause, callback);
        });
      };

      Piwik.trigger('TrackerSetup', [this]);
    }

    function TrackerProxy() {
      return {
        push: apply
      };
    }
    /**
         * Applies the given methods in the given order if they are present in paq.
         *
         * @param {Array} paq
         * @param {Array} methodsToApply an array containing method names in the order that they should be applied
         *                 eg ['setSiteId', 'setTrackerUrl']
         * @returns {Array} the modified paq array with the methods that were already applied set to undefined
         */


    function applyMethodsInOrder(paq, methodsToApply) {
      var appliedMethods = {};
      var index, iterator;

      for (index = 0; index < methodsToApply.length; index++) {
        var methodNameToApply = methodsToApply[index];
        appliedMethods[methodNameToApply] = 1;

        for (iterator = 0; iterator < paq.length; iterator++) {
          if (paq[iterator] && paq[iterator][0]) {
            var methodName = paq[iterator][0];

            if (methodNameToApply === methodName) {
              apply(paq[iterator]);
              delete paq[iterator];

              if (appliedMethods[methodName] > 1 && methodName !== 'addTracker') {
                logConsoleError('The method ' + methodName + ' is registered more than once in "_paq" variable. Only the last call has an effect. Please have a look at the multiple Piwik trackers documentation: https://developer.piwik.org/guides/tracking-javascript-guide#multiple-piwik-trackers');
              }

              appliedMethods[methodName]++;
            }
          }
        }
      }

      return paq;
    }
    /************************************************************
         * Constructor
         ************************************************************/


    var applyFirst = ['addTracker', 'disableCookies', 'setTrackerUrl', 'enableCrossDomainLinking', 'setCrossDomainLinkingTimeout', 'setSecureCookie', 'setCookiePath', 'setCookieDomain', 'setDomains', 'setUserId', 'setSiteId', 'setMediaId'];

    function createFirstTracker(piwikUrl, siteId, mediaId) {
      var tracker = new Tracker(piwikUrl, siteId, mediaId);
      asyncTrackers.push(tracker);
      _paq = applyMethodsInOrder(_paq, applyFirst); // apply the queue of actions

      for (iterator = 0; iterator < _paq.length; iterator++) {
        if (_paq[iterator]) {
          apply(_paq[iterator]);
        }
      } // replace initialization array with proxy object


      _paq = new TrackerProxy();
      return tracker;
    }
    /************************************************************
         * Proxy object
         * - this allows the caller to continue push()'ing to _paq
         *   after the Tracker has been initialized and loaded
         ************************************************************/
    // initialize the Piwik singleton


    _addEventListener(windowAlias, 'beforeunload', beforeUnloadHandler, false);

    Date.prototype.getTimeAlias = Date.prototype.getTime;
    /************************************************************
         * Public data and methods
         ************************************************************/

    Piwik = {
      initialized: false,
      JSON: JSON_PIWIK,

      /**
             * DOM Document related methods
             */
      DOM: {
        /**
                 * Adds an event listener to the given element.
                 * @param element
                 * @param eventType
                 * @param eventHandler
                 * @param useCapture  Optional
                 */
        addEventListener: function addEventListener(element, eventType, eventHandler, useCapture) {
          var captureType = _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(useCapture);

          if (captureType === 'undefined') {
            useCapture = false;
          }

          _addEventListener(element, eventType, eventHandler, useCapture);
        },

        /**
                 * Specify a function to execute when the DOM is fully loaded.
                 *
                 * If the DOM is already loaded, the function will be executed immediately.
                 *
                 * @param function callback
                 */
        onLoad: trackCallbackOnLoad,

        /**
                 * Specify a function to execute when the DOM is ready.
                 *
                 * If the DOM is already ready, the function will be executed immediately.
                 *
                 * @param function callback
                 */
        onReady: trackCallbackOnReady,

        /**
                 * Detect whether a node is visible right now.
                 */
        isNodeVisible: isVisible
      },

      /**
             * Listen to an event and invoke the handler when a the event is triggered.
             *
             * @param string event
             * @param function handler
             */
      on: function on(event, handler) {
        if (!eventHandlers[event]) {
          eventHandlers[event] = [];
        }

        eventHandlers[event].push(handler);
      },

      /**
             * Remove a handler to no longer listen to the event. Must pass the same handler that was used when
             * attaching the event via ".on".
             * @param string event
             * @param function handler
             */
      off: function off(event, handler) {
        if (!eventHandlers[event]) {
          return;
        }

        var i = 0;

        for (i; i < eventHandlers[event].length; i++) {
          if (eventHandlers[event][i] === handler) {
            eventHandlers[event].splice(i, 1);
          }
        }
      },

      /**
             * Triggers the given event and passes the parameters to all handlers.
             *
             * @param string event
             * @param Array extraParameters
             * @param Object context  If given the handler will be executed in this context
             */
      trigger: function trigger(event, extraParameters, context) {
        if (!eventHandlers[event]) {
          return;
        }

        var i = 0;

        for (i; i < eventHandlers[event].length; i++) {
          eventHandlers[event][i].apply(context || windowAlias, extraParameters);
        }
      },

      /**
             * Add plugin
             *
             * @param string pluginName
             * @param Object pluginObj
             */
      addPlugin: function addPlugin(pluginName, pluginObj) {
        plugins[pluginName] = pluginObj;
      },

      /**
             * Get Tracker (factory method)
             *
             * @param string piwikUrl
             * @param int|string siteId
             * @return Tracker
             */
      getTracker: function getTracker(piwikUrl, siteId, mediaId) {
        if (!isDefined(siteId)) {
          siteId = this.getAsyncTracker().getSiteId();
        }

        if (!isDefined(piwikUrl)) {
          piwikUrl = this.getAsyncTracker().getTrackerUrl();
        }

        if (!isDefined(mediaId)) {
          mediaId = this.getAsyncTracker().getMediaId();
        }

        return new Tracker(piwikUrl, siteId, mediaId);
      },

      /**
             * Get all created async trackers
             *
             * @return Tracker[]
             */
      getAsyncTrackers: function getAsyncTrackers() {
        return asyncTrackers;
      },

      /**
             * Adds a new tracker. All sent requests will be also sent to the given siteId and piwikUrl.
             * If piwikUrl is not set, current url will be used.
             *
             * @param null|string piwikUrl  If null, will reuse the same tracker URL of the current tracker instance
             * @param int|string siteId
             * @return Tracker
             */
      addTracker: function addTracker(piwikUrl, siteId, mediaId) {
        var tracker;

        if (!asyncTrackers.length) {
          tracker = createFirstTracker(piwikUrl, siteId, mediaId);
        } else {
          tracker = asyncTrackers[0].addTracker(piwikUrl, siteId, mediaId);
        }

        return tracker;
      },

      /**
             * Get internal asynchronous tracker object.
             *
             * If no parameters are given, it returns the internal asynchronous tracker object. If a piwikUrl and idSite
             * is given, it will try to find an optional
             *
             * @param string piwikUrl
             * @param int|string siteId
             * @return Tracker
             */
      getAsyncTracker: function getAsyncTracker(piwikUrl, siteId, mediaId) {
        var firstTracker;

        if (asyncTrackers && asyncTrackers.length && asyncTrackers[0]) {
          firstTracker = asyncTrackers[0];
        } else {
          return createFirstTracker(piwikUrl, siteId, mediaId);
        }

        if (!siteId && !piwikUrl && !mediaId) {
          // for BC and by default we just return the initially created tracker
          return firstTracker;
        } // we look for another tracker created via `addTracker` method


        if ((!isDefined(siteId) || siteId === null) && firstTracker) {
          siteId = firstTracker.getSiteId();
        }

        if ((!isDefined(mediaId) || mediaId === null) && firstTracker) {
          mediaId = firstTracker.getMediaId();
        }

        if ((!isDefined(piwikUrl) || piwikUrl === null) && firstTracker) {
          piwikUrl = firstTracker.getTrackerUrl();
        }

        var tracker;
        var i = 0;

        for (i; i < asyncTrackers.length; i++) {
          tracker = asyncTrackers[i];

          if (tracker && String(tracker.getSiteId()) === String(siteId) && String(tracker.getMediaId()) === String(mediaId) && tracker.getTrackerUrl() === piwikUrl) {
            return tracker;
          }
        }
      },

      /**
             * When calling plugin methods via "_paq.push(['...'])" and the plugin is loaded separately because
             * piwik.js is not writable then there is a chance that first piwik.js is loaded and later the plugin.
             * In this case we would have already executed all "_paq.push" methods and they would not have succeeded
             * because the plugin will be loaded only later. In this case, once a plugin is loaded, it should call
             * "Piwik.retryMissedPluginCalls()" so they will be executed after all.
             *
             * @param string piwikUrl
             * @param int|string siteId
             * @return Tracker
             */
      retryMissedPluginCalls: function retryMissedPluginCalls() {
        var missedCalls = missedPluginTrackerCalls;
        missedPluginTrackerCalls = [];
        var i = 0;

        for (i; i < missedCalls.length; i++) {
          apply(missedCalls[i]);
        }
      } // Expose Piwik as an AMD module

    };

    if (typeof define === 'function' && __webpack_require__(5)) {
      define('piwik', [], function () {
        return Piwik;
      });
      define('matomo', [], function () {
        return Piwik;
      });
    }

    return Piwik;
  }();
}
/*! ! pluginTrackerHook */


(function () {
  'use strict';

  function hasPaqConfiguration() {
    if ((typeof _paq === "undefined" ? "undefined" : _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(_paq)) !== 'object') {
      return false;
    } // needed to write it this way for jslint


    var lengthType = _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(window._paq.length);

    if (lengthType === 'undefined') {
      return false;
    }

    return !!window._paq.length;
  }

  if (window && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(window.piwikPluginAsyncInit) === 'object' && window.piwikPluginAsyncInit.length) {
    var i = 0;

    for (i; i < window.piwikPluginAsyncInit.length; i++) {
      if (typeof window.piwikPluginAsyncInit[i] === 'function') {
        window.piwikPluginAsyncInit[i]();
      }
    }
  }

  if (window && window.piwikAsyncInit) {
    window.piwikAsyncInit();
  }

  if (!window.Piwik.getAsyncTrackers().length) {
    // we only create an initial tracker when no other async tracker has been created yet in piwikAsyncInit()
    if (hasPaqConfiguration()) {
      // we only create an initial tracker if there is a configuration for it via _paq. Otherwise
      // Piwik.getAsyncTrackers() would return unconfigured trackers
      window.Piwik.addTracker();
    } else {
      window._paq = {
        push: function push(args) {
          // needed to write it this way for jslint
          var consoleType = typeof console === "undefined" ? "undefined" : _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(console);

          if (consoleType !== 'undefined' && console && console.error) {
            console.error('_paq.push() was used but Piwik tracker was not initialized before the piwik.js file was loaded. Make sure to configure the tracker via _paq.push before loading piwik.js. Alternatively, you can create a tracker via Piwik.addTracker() manually and then use _paq.push but it may not fully work as tracker methods may not be executed in the correct order.', args);
          }
        }
      };
    }
  }

  window.Piwik.trigger('PiwikInitialized', []);
  window.Piwik.initialized = true;
})();

if (![].fill) {
  Array.prototype.fill = function (value) {
    var O = Object(this);
    var len = parseInt(O.length, 10);
    var start = arguments[1];
    var relativeStart = parseInt(start, 10) || 0;
    var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
    var end = arguments[2];
    var relativeEnd = end === undefined ? len : parseInt(end) || 0;
    var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);

    for (; k < final; k++) {
      O[k] = value;
    }

    return O;
  };
}

/* harmony default export */ __webpack_exports__["a"] = (window.Piwik);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _piwik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);



var piwikDefault = {
  // site_id, already used next values: 0 - js, 1 - lbci android, 2 - lbci ios, 3 - our android
  siteId: '0',
  // Default category, don't know how use it now
  category: 'Player',
  // video_key
  mediaId: '',
  // Stat API url
  url: (document.location.protocol === 'https:' ? 'https' : 'http') + '://stat.kwikmotion.com/',
  // Events which you want to track. You can manage all possible video.js events, but i listed more usable. "adstart" - start ad block, "ads-ad-started" - start ad in block, forexample if you have two or more prerolls
  // events: ['play', 'pause', 'adstart', 'adend', 'adserror', 'ads-ad-started','timeupdate'],
  events: ['adserror', 'ads-ad-started', 'timeupdate', 'ended', 'loadedmetadata'],
  // without this parameter stat will send mediaid, if exists, or <title> tag's value
  // title: 'Video Name',
  // Do not need send each seconds timeupdate event,  you can send it each 5 seconds
  interval: 5 // on: function to subscribe on player events
  // off: function to unsubscribe from player events

};

var Kwikstat =
/*#__PURE__*/
function () {
  function Kwikstat() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Kwikstat);

    for (var optidx in piwikDefault) {
      if (typeof opt[optidx] === 'undefined') {
        this[optidx] = piwikDefault[optidx];
      } else {
        this[optidx] = opt[optidx];
      }
    }

    this.init(this.mediaId, opt.userId);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Kwikstat, [{
    key: "init",
    value: function init(mediaId, userId) {
      this.piwik = _piwik__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].getTracker(this.url, this.siteId, mediaId);

      if (userId) {
        this.piwik.setUserId(userId + '');
      }

      if (typeof this.title !== 'undefined' || mediaId !== '') {
        this.piwik.setDocumentTitle(typeof this.title !== 'undefined' ? this.title : this.mediaId);
      }

      this.eventsEmitted = [];
      this.qualityBitrate = 0;
      this.lastTimeUpdate = -1 * this.interval;
    }
  }, {
    key: "initPageView",
    value: function initPageView(src) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (this.piwik.getConfigIdPageView() && this.piwik.getConfigIdPageView() !== '' && !force) {
        return false;
      }

      this.piwik.setReferrerUrl(this.piwik.getCurrentUrl());
      this.piwik.setCustomUrl(src);
      this.piwik.trackPageView();
      return true;
    }
  }, {
    key: "trackEvent",
    value: function trackEvent(event, variable, value) {
      var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      if (once && this.eventsEmitted.indexOf(event) !== -1) {
        return;
      }

      this.eventsEmitted.push(event);

      if (typeof variable !== 'undefined') {
        this.piwik.trackEvent(this.category, event, variable, value);
      } else {
        this.piwik.trackEvent(this.category, event);
      }
    }
  }, {
    key: "handleTimeupdate",
    value: function handleTimeupdate(time, duration, bitrate) {
      // must handle firstplay after play event because some guys makes seek after player loaded
      if (this.eventsEmitted.indexOf('firstplay') === -1) {
        return false;
      }

      if (time > this.lastTimeUpdate + this.interval) {
        // track timeupdate events each this.interval secs
        this.lastTimeUpdate = time;
        this.trackEvent('timeupdate', 'duration', time, false);

        if (bitrate !== this.qualityBitrate) {
          // track quality event if it changed
          this.qualityBitrate = bitrate;
          this.trackEvent('quality', 'bitrate', this.qualityBitrate, false);
        }
      } // track quartile events


      if (!this.quartileEvents && typeof duration === 'number' && duration > 0 && duration !== Infinity) {
        this.quartileEvents = {
          'first-quartile': duration / 4,
          'midpoint': duration / 2,
          'third-quartile': duration * 3 / 4
        };
      }

      if (this.quartileEvents && typeof this.quartileEvents !== 'undefined') {
        for (var qev in this.quartileEvents) {
          if (time > this.quartileEvents[qev]) {
            // it called once by default
            this.trackEvent(qev);
          }
        }
      }
    }
  }]);

  return Kwikstat;
}();

window.Kwikstat = Kwikstat;
/* harmony default export */ __webpack_exports__["default"] = (Kwikstat);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(0);

var assertThisInitialized = __webpack_require__(11);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(12);

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
/* 9 */
/***/ (function(module) {

module.exports = {"a":"0.0.0"};

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
var _package_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(9, 1);
/* harmony import */ var _kwikstat_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4);






var Plugin = videojs.getPlugin('plugin'); // import btnIco from './assets/circular.svg'
// Default options for the plugin.

var defaults = {};
/**
 * An advanced Video.js plugin. For more information on the API
 *
 * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
 */

var KwikstatPlugin =
/*#__PURE__*/
function (_Plugin) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(KwikstatPlugin, _Plugin);

  /**
   * Create a Kwikstat plugin instance.
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
  function KwikstatPlugin(player, options) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, KwikstatPlugin);

    // the parent class will add player under this.player
    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(KwikstatPlugin).call(this, player));
    _this.options = videojs.mergeOptions(defaults, options);
    _this.player.kwikStat = new _kwikstat_js__WEBPACK_IMPORTED_MODULE_5__["default"](_this.options);

    _this.player.ready(function () {
      _this.player.addClass('vjs-kwikstat');

      _this.player.one('play', function () {
        _this.player.kwikStat.initPageView(_this.player.currentSrc());

        _this.player.one('timeupdate', function () {
          _this.player.kwikStat.trackEvent('firstplay');
        });
      });

      _this.player.on(_this.player.kwikStat.events, function (e) {
        if (_this.player.tech_ && _this.player.tech_.name && _this.player.tech_.name() === 'ChromecastSender') {
          return false;
        }

        _this.player.kwikStat.initPageView(_this.player.currentSrc()); // double to check if it does not sent yet
        // handle events


        switch (e.type) {
          case 'timeupdate':
            // check bitrate
            var qualityBitrate = 0;

            if (_this.player.tech(true) && _this.player.tech(true).name() === 'StreamrootHlsjs' && _this.player.tech(true).hlsProvider.duration() !== 0) {
              var currentQuality = _this.player.tech(true).hlsProvider.getQuality();

              if (typeof currentQuality !== 'undefined' && typeof currentQuality.bitrate !== 'undefined') {
                qualityBitrate = currentQuality.bitrate;
              }
            } else if (typeof _this.player.tech(true).hls !== 'undefined' && typeof _this.player.tech(true).hls.selectPlaylist !== 'undefined') {
              // contrib-hlsjs
              var currentPlaylist = _this.player.tech(true).hls.selectPlaylist();

              if (typeof currentPlaylist.attributes !== 'undefined' && currentPlaylist.attributes.BANDWIDTH) {
                qualityBitrate = currentPlaylist.attributes.BANDWIDTH;
              }
            } else if (_this.player.tech(true) && typeof _this.player.tech(true).shakaPlayer !== 'undefined') {
              // shaka for dash stream
              var currentStat = _this.player.tech(true).shakaPlayer.getStats();

              if (typeof currentStat.streamBandwidth !== 'undefined') {
                qualityBitrate = currentStat.streamBandwidth;
              }
            }

            _this.player.kwikStat.handleTimeupdate(_this.player.currentTime(), _this.player.duration(), qualityBitrate);

            break;

          case 'ads-ad-started':
            _this.player.kwikStat.trackEvent(e.type, 'type', _this.player.ads._state.constructor._getName(), false);

            break;

          case 'pause':
            _this.player.kwikStat.trackEvent(e.type, 'duration', _this.player.currentTime(), false);

            break;

          case 'ended':
            _this.player.kwikStat.trackEvent(e.type, 'duration', _this.player.currentTime());

            break;

          case 'adserror':
            _this.player.kwikStat.trackEvent(e.type, 'message', e.data.AdError, false);

            break;

          default:
            _this.player.kwikStat.trackEvent(e.type);

            break;
        }
      });
    });

    return _this;
  }

  return KwikstatPlugin;
}(Plugin); // Define default values for the plugin's `state` object here.


KwikstatPlugin.defaultState = {}; // Include the version number.

KwikstatPlugin.VERSION = _package_json__WEBPACK_IMPORTED_MODULE_4__[/* version */ "a"]; // Register the plugin with video.js.

videojs.registerPlugin('kwikstat', KwikstatPlugin);
/* harmony default export */ __webpack_exports__["default"] = (KwikstatPlugin);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ })
/******/ ]);