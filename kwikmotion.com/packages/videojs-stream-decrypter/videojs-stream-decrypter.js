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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export LineStream */
/* unused harmony export ParseStream */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Parser; });
/* harmony import */ var global_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var global_window__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(global_window__WEBPACK_IMPORTED_MODULE_0__);
/*! @name m3u8-parser @version 4.4.0 @license Apache-2.0 */


function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/**
 * @file stream.js
 */

/**
 * A lightweight readable stream implementation that handles event dispatching.
 *
 * @class Stream
 */
var Stream =
/*#__PURE__*/
function () {
  function Stream() {
    this.listeners = {};
  }
  /**
   * Add a listener for a specified event type.
   *
   * @param {string} type the event name
   * @param {Function} listener the callback to be invoked when an event of
   * the specified type occurs
   */


  var _proto = Stream.prototype;

  _proto.on = function on(type, listener) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }

    this.listeners[type].push(listener);
  }
  /**
   * Remove a listener for a specified event type.
   *
   * @param {string} type the event name
   * @param {Function} listener  a function previously registered for this
   * type of event through `on`
   * @return {boolean} if we could turn it off or not
   */
  ;

  _proto.off = function off(type, listener) {
    if (!this.listeners[type]) {
      return false;
    }

    var index = this.listeners[type].indexOf(listener);
    this.listeners[type].splice(index, 1);
    return index > -1;
  }
  /**
   * Trigger an event of the specified type on this stream. Any additional
   * arguments to this function are passed as parameters to event listeners.
   *
   * @param {string} type the event name
   */
  ;

  _proto.trigger = function trigger(type) {
    var callbacks = this.listeners[type];
    var i;
    var length;
    var args;

    if (!callbacks) {
      return;
    } // Slicing the arguments on every invocation of this method
    // can add a significant amount of overhead. Avoid the
    // intermediate object creation for the common case of a
    // single callback argument


    if (arguments.length === 2) {
      length = callbacks.length;

      for (i = 0; i < length; ++i) {
        callbacks[i].call(this, arguments[1]);
      }
    } else {
      args = Array.prototype.slice.call(arguments, 1);
      length = callbacks.length;

      for (i = 0; i < length; ++i) {
        callbacks[i].apply(this, args);
      }
    }
  }
  /**
   * Destroys the stream and cleans up.
   */
  ;

  _proto.dispose = function dispose() {
    this.listeners = {};
  }
  /**
   * Forwards all `data` events on this stream to the destination stream. The
   * destination stream should provide a method `push` to receive the data
   * events as they arrive.
   *
   * @param {Stream} destination the stream that will receive all `data` events
   * @see http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
   */
  ;

  _proto.pipe = function pipe(destination) {
    this.on('data', function (data) {
      destination.push(data);
    });
  };

  return Stream;
}();

/**
 * A stream that buffers string input and generates a `data` event for each
 * line.
 *
 * @class LineStream
 * @extends Stream
 */

var LineStream =
/*#__PURE__*/
function (_Stream) {
  _inheritsLoose(LineStream, _Stream);

  function LineStream() {
    var _this;

    _this = _Stream.call(this) || this;
    _this.buffer = '';
    return _this;
  }
  /**
   * Add new data to be parsed.
   *
   * @param {string} data the text to process
   */


  var _proto = LineStream.prototype;

  _proto.push = function push(data) {
    var nextNewline;
    this.buffer += data;
    nextNewline = this.buffer.indexOf('\n');

    for (; nextNewline > -1; nextNewline = this.buffer.indexOf('\n')) {
      this.trigger('data', this.buffer.substring(0, nextNewline));
      this.buffer = this.buffer.substring(nextNewline + 1);
    }
  };

  return LineStream;
}(Stream);

/**
 * "forgiving" attribute list psuedo-grammar:
 * attributes -> keyvalue (',' keyvalue)*
 * keyvalue   -> key '=' value
 * key        -> [^=]*
 * value      -> '"' [^"]* '"' | [^,]*
 */

var attributeSeparator = function attributeSeparator() {
  var key = '[^=]*';
  var value = '"[^"]*"|[^,]*';
  var keyvalue = '(?:' + key + ')=(?:' + value + ')';
  return new RegExp('(?:^|,)(' + keyvalue + ')');
};
/**
 * Parse attributes from a line given the separator
 *
 * @param {string} attributes the attribute line to parse
 */


var parseAttributes = function parseAttributes(attributes) {
  // split the string using attributes as the separator
  var attrs = attributes.split(attributeSeparator());
  var result = {};
  var i = attrs.length;
  var attr;

  while (i--) {
    // filter out unmatched portions of the string
    if (attrs[i] === '') {
      continue;
    } // split the key and value


    attr = /([^=]*)=(.*)/.exec(attrs[i]).slice(1); // trim whitespace and remove optional quotes around the value

    attr[0] = attr[0].replace(/^\s+|\s+$/g, '');
    attr[1] = attr[1].replace(/^\s+|\s+$/g, '');
    attr[1] = attr[1].replace(/^['"](.*)['"]$/g, '$1');
    result[attr[0]] = attr[1];
  }

  return result;
};
/**
 * A line-level M3U8 parser event stream. It expects to receive input one
 * line at a time and performs a context-free parse of its contents. A stream
 * interpretation of a manifest can be useful if the manifest is expected to
 * be too large to fit comfortably into memory or the entirety of the input
 * is not immediately available. Otherwise, it's probably much easier to work
 * with a regular `Parser` object.
 *
 * Produces `data` events with an object that captures the parser's
 * interpretation of the input. That object has a property `tag` that is one
 * of `uri`, `comment`, or `tag`. URIs only have a single additional
 * property, `line`, which captures the entirety of the input without
 * interpretation. Comments similarly have a single additional property
 * `text` which is the input without the leading `#`.
 *
 * Tags always have a property `tagType` which is the lower-cased version of
 * the M3U8 directive without the `#EXT` or `#EXT-X-` prefix. For instance,
 * `#EXT-X-MEDIA-SEQUENCE` becomes `media-sequence` when parsed. Unrecognized
 * tags are given the tag type `unknown` and a single additional property
 * `data` with the remainder of the input.
 *
 * @class ParseStream
 * @extends Stream
 */


var ParseStream =
/*#__PURE__*/
function (_Stream) {
  _inheritsLoose(ParseStream, _Stream);

  function ParseStream() {
    var _this;

    _this = _Stream.call(this) || this;
    _this.customParsers = [];
    _this.tagMappers = [];
    return _this;
  }
  /**
   * Parses an additional line of input.
   *
   * @param {string} line a single line of an M3U8 file to parse
   */


  var _proto = ParseStream.prototype;

  _proto.push = function push(line) {
    var _this2 = this;

    var match;
    var event; // strip whitespace

    line = line.trim();

    if (line.length === 0) {
      // ignore empty lines
      return;
    } // URIs


    if (line[0] !== '#') {
      this.trigger('data', {
        type: 'uri',
        uri: line
      });
      return;
    } // map tags


    var newLines = this.tagMappers.reduce(function (acc, mapper) {
      var mappedLine = mapper(line); // skip if unchanged

      if (mappedLine === line) {
        return acc;
      }

      return acc.concat([mappedLine]);
    }, [line]);
    newLines.forEach(function (newLine) {
      for (var i = 0; i < _this2.customParsers.length; i++) {
        if (_this2.customParsers[i].call(_this2, newLine)) {
          return;
        }
      } // Comments


      if (newLine.indexOf('#EXT') !== 0) {
        _this2.trigger('data', {
          type: 'comment',
          text: newLine.slice(1)
        });

        return;
      } // strip off any carriage returns here so the regex matching
      // doesn't have to account for them.


      newLine = newLine.replace('\r', ''); // Tags

      match = /^#EXTM3U/.exec(newLine);

      if (match) {
        _this2.trigger('data', {
          type: 'tag',
          tagType: 'm3u'
        });

        return;
      }

      match = /^#EXTINF:?([0-9\.]*)?,?(.*)?$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'inf'
        };

        if (match[1]) {
          event.duration = parseFloat(match[1]);
        }

        if (match[2]) {
          event.title = match[2];
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-TARGETDURATION:?([0-9.]*)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'targetduration'
        };

        if (match[1]) {
          event.duration = parseInt(match[1], 10);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#ZEN-TOTAL-DURATION:?([0-9.]*)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'totalduration'
        };

        if (match[1]) {
          event.duration = parseInt(match[1], 10);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-VERSION:?([0-9.]*)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'version'
        };

        if (match[1]) {
          event.version = parseInt(match[1], 10);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-MEDIA-SEQUENCE:?(\-?[0-9.]*)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'media-sequence'
        };

        if (match[1]) {
          event.number = parseInt(match[1], 10);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-DISCONTINUITY-SEQUENCE:?(\-?[0-9.]*)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'discontinuity-sequence'
        };

        if (match[1]) {
          event.number = parseInt(match[1], 10);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-PLAYLIST-TYPE:?(.*)?$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'playlist-type'
        };

        if (match[1]) {
          event.playlistType = match[1];
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-BYTERANGE:?([0-9.]*)?@?([0-9.]*)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'byterange'
        };

        if (match[1]) {
          event.length = parseInt(match[1], 10);
        }

        if (match[2]) {
          event.offset = parseInt(match[2], 10);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-ALLOW-CACHE:?(YES|NO)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'allow-cache'
        };

        if (match[1]) {
          event.allowed = !/NO/.test(match[1]);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-MAP:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'map'
        };

        if (match[1]) {
          var attributes = parseAttributes(match[1]);

          if (attributes.URI) {
            event.uri = attributes.URI;
          }

          if (attributes.BYTERANGE) {
            var _attributes$BYTERANGE = attributes.BYTERANGE.split('@'),
                length = _attributes$BYTERANGE[0],
                offset = _attributes$BYTERANGE[1];

            event.byterange = {};

            if (length) {
              event.byterange.length = parseInt(length, 10);
            }

            if (offset) {
              event.byterange.offset = parseInt(offset, 10);
            }
          }
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-STREAM-INF:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'stream-inf'
        };

        if (match[1]) {
          event.attributes = parseAttributes(match[1]);

          if (event.attributes.RESOLUTION) {
            var split = event.attributes.RESOLUTION.split('x');
            var resolution = {};

            if (split[0]) {
              resolution.width = parseInt(split[0], 10);
            }

            if (split[1]) {
              resolution.height = parseInt(split[1], 10);
            }

            event.attributes.RESOLUTION = resolution;
          }

          if (event.attributes.BANDWIDTH) {
            event.attributes.BANDWIDTH = parseInt(event.attributes.BANDWIDTH, 10);
          }

          if (event.attributes['PROGRAM-ID']) {
            event.attributes['PROGRAM-ID'] = parseInt(event.attributes['PROGRAM-ID'], 10);
          }
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-MEDIA:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'media'
        };

        if (match[1]) {
          event.attributes = parseAttributes(match[1]);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-ENDLIST/.exec(newLine);

      if (match) {
        _this2.trigger('data', {
          type: 'tag',
          tagType: 'endlist'
        });

        return;
      }

      match = /^#EXT-X-DISCONTINUITY/.exec(newLine);

      if (match) {
        _this2.trigger('data', {
          type: 'tag',
          tagType: 'discontinuity'
        });

        return;
      }

      match = /^#EXT-X-PROGRAM-DATE-TIME:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'program-date-time'
        };

        if (match[1]) {
          event.dateTimeString = match[1];
          event.dateTimeObject = new Date(match[1]);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-KEY:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'key'
        };

        if (match[1]) {
          event.attributes = parseAttributes(match[1]); // parse the IV string into a Uint32Array

          if (event.attributes.IV) {
            if (event.attributes.IV.substring(0, 2).toLowerCase() === '0x') {
              event.attributes.IV = event.attributes.IV.substring(2);
            }

            event.attributes.IV = event.attributes.IV.match(/.{8}/g);
            event.attributes.IV[0] = parseInt(event.attributes.IV[0], 16);
            event.attributes.IV[1] = parseInt(event.attributes.IV[1], 16);
            event.attributes.IV[2] = parseInt(event.attributes.IV[2], 16);
            event.attributes.IV[3] = parseInt(event.attributes.IV[3], 16);
            event.attributes.IV = new Uint32Array(event.attributes.IV);
          }
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-START:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'start'
        };

        if (match[1]) {
          event.attributes = parseAttributes(match[1]);
          event.attributes['TIME-OFFSET'] = parseFloat(event.attributes['TIME-OFFSET']);
          event.attributes.PRECISE = /YES/.test(event.attributes.PRECISE);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-CUE-OUT-CONT:?(.*)?$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'cue-out-cont'
        };

        if (match[1]) {
          event.data = match[1];
        } else {
          event.data = '';
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-CUE-OUT:?(.*)?$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'cue-out'
        };

        if (match[1]) {
          event.data = match[1];
        } else {
          event.data = '';
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-CUE-IN:?(.*)?$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'cue-in'
        };

        if (match[1]) {
          event.data = match[1];
        } else {
          event.data = '';
        }

        _this2.trigger('data', event);

        return;
      } // unknown tag type


      _this2.trigger('data', {
        type: 'tag',
        data: newLine.slice(4)
      });
    });
  }
  /**
   * Add a parser for custom headers
   *
   * @param {Object}   options              a map of options for the added parser
   * @param {RegExp}   options.expression   a regular expression to match the custom header
   * @param {string}   options.customType   the custom type to register to the output
   * @param {Function} [options.dataParser] function to parse the line into an object
   * @param {boolean}  [options.segment]    should tag data be attached to the segment object
   */
  ;

  _proto.addParser = function addParser(_ref) {
    var _this3 = this;

    var expression = _ref.expression,
        customType = _ref.customType,
        dataParser = _ref.dataParser,
        segment = _ref.segment;

    if (typeof dataParser !== 'function') {
      dataParser = function dataParser(line) {
        return line;
      };
    }

    this.customParsers.push(function (line) {
      var match = expression.exec(line);

      if (match) {
        _this3.trigger('data', {
          type: 'custom',
          data: dataParser(line),
          customType: customType,
          segment: segment
        });

        return true;
      }
    });
  }
  /**
   * Add a custom header mapper
   *
   * @param {Object}   options
   * @param {RegExp}   options.expression   a regular expression to match the custom header
   * @param {Function} options.map          function to translate tag into a different tag
   */
  ;

  _proto.addTagMapper = function addTagMapper(_ref2) {
    var expression = _ref2.expression,
        map = _ref2.map;

    var mapFn = function mapFn(line) {
      if (expression.test(line)) {
        return map(line);
      }

      return line;
    };

    this.tagMappers.push(mapFn);
  };

  return ParseStream;
}(Stream);

function decodeB64ToUint8Array(b64Text) {
  var decodedString = global_window__WEBPACK_IMPORTED_MODULE_0___default.a.atob(b64Text || '');
  var array = new Uint8Array(decodedString.length);

  for (var i = 0; i < decodedString.length; i++) {
    array[i] = decodedString.charCodeAt(i);
  }

  return array;
}

/**
 * A parser for M3U8 files. The current interpretation of the input is
 * exposed as a property `manifest` on parser objects. It's just two lines to
 * create and parse a manifest once you have the contents available as a string:
 *
 * ```js
 * var parser = new m3u8.Parser();
 * parser.push(xhr.responseText);
 * ```
 *
 * New input can later be applied to update the manifest object by calling
 * `push` again.
 *
 * The parser attempts to create a usable manifest object even if the
 * underlying input is somewhat nonsensical. It emits `info` and `warning`
 * events during the parse if it encounters input that seems invalid or
 * requires some property of the manifest object to be defaulted.
 *
 * @class Parser
 * @extends Stream
 */

var Parser =
/*#__PURE__*/
function (_Stream) {
  _inheritsLoose(Parser, _Stream);

  function Parser() {
    var _this;

    _this = _Stream.call(this) || this;
    _this.lineStream = new LineStream();
    _this.parseStream = new ParseStream();

    _this.lineStream.pipe(_this.parseStream);
    /* eslint-disable consistent-this */


    var self = _assertThisInitialized(_this);
    /* eslint-enable consistent-this */


    var uris = [];
    var currentUri = {}; // if specified, the active EXT-X-MAP definition

    var currentMap; // if specified, the active decryption key

    var _key;

    var noop = function noop() {};

    var defaultMediaGroups = {
      'AUDIO': {},
      'VIDEO': {},
      'CLOSED-CAPTIONS': {},
      'SUBTITLES': {}
    }; // This is the Widevine UUID from DASH IF IOP. The same exact string is
    // used in MPDs with Widevine encrypted streams.

    var widevineUuid = 'urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed'; // group segments into numbered timelines delineated by discontinuities

    var currentTimeline = 0; // the manifest is empty until the parse stream begins delivering data

    _this.manifest = {
      allowCache: true,
      discontinuityStarts: [],
      segments: []
    }; // update the manifest with the m3u8 entry from the parse stream

    _this.parseStream.on('data', function (entry) {
      var mediaGroup;
      var rendition;
      ({
        tag: function tag() {
          // switch based on the tag type
          (({
            'allow-cache': function allowCache() {
              this.manifest.allowCache = entry.allowed;

              if (!('allowed' in entry)) {
                this.trigger('info', {
                  message: 'defaulting allowCache to YES'
                });
                this.manifest.allowCache = true;
              }
            },
            byterange: function byterange() {
              var byterange = {};

              if ('length' in entry) {
                currentUri.byterange = byterange;
                byterange.length = entry.length;

                if (!('offset' in entry)) {
                  this.trigger('info', {
                    message: 'defaulting offset to zero'
                  });
                  entry.offset = 0;
                }
              }

              if ('offset' in entry) {
                currentUri.byterange = byterange;
                byterange.offset = entry.offset;
              }
            },
            endlist: function endlist() {
              this.manifest.endList = true;
            },
            inf: function inf() {
              if (!('mediaSequence' in this.manifest)) {
                this.manifest.mediaSequence = 0;
                this.trigger('info', {
                  message: 'defaulting media sequence to zero'
                });
              }

              if (!('discontinuitySequence' in this.manifest)) {
                this.manifest.discontinuitySequence = 0;
                this.trigger('info', {
                  message: 'defaulting discontinuity sequence to zero'
                });
              }

              if (entry.duration > 0) {
                currentUri.duration = entry.duration;
              }

              if (entry.duration === 0) {
                currentUri.duration = 0.01;
                this.trigger('info', {
                  message: 'updating zero segment duration to a small value'
                });
              }

              this.manifest.segments = uris;
            },
            key: function key() {
              if (!entry.attributes) {
                this.trigger('warn', {
                  message: 'ignoring key declaration without attribute list'
                });
                return;
              } // clear the active encryption key


              if (entry.attributes.METHOD === 'NONE') {
                _key = null;
                return;
              }

              if (!entry.attributes.URI) {
                this.trigger('warn', {
                  message: 'ignoring key declaration without URI'
                });
                return;
              } // check if the content is encrypted for Widevine
              // Widevine/HLS spec: https://storage.googleapis.com/wvdocs/Widevine_DRM_HLS.pdf


              if (entry.attributes.KEYFORMAT === widevineUuid) {
                var VALID_METHODS = ['SAMPLE-AES', 'SAMPLE-AES-CTR', 'SAMPLE-AES-CENC'];

                if (VALID_METHODS.indexOf(entry.attributes.METHOD) === -1) {
                  this.trigger('warn', {
                    message: 'invalid key method provided for Widevine'
                  });
                  return;
                }

                if (entry.attributes.METHOD === 'SAMPLE-AES-CENC') {
                  this.trigger('warn', {
                    message: 'SAMPLE-AES-CENC is deprecated, please use SAMPLE-AES-CTR instead'
                  });
                }

                if (entry.attributes.URI.substring(0, 23) !== 'data:text/plain;base64,') {
                  this.trigger('warn', {
                    message: 'invalid key URI provided for Widevine'
                  });
                  return;
                }

                if (!(entry.attributes.KEYID && entry.attributes.KEYID.substring(0, 2) === '0x')) {
                  this.trigger('warn', {
                    message: 'invalid key ID provided for Widevine'
                  });
                  return;
                } // if Widevine key attributes are valid, store them as `contentProtection`
                // on the manifest to emulate Widevine tag structure in a DASH mpd


                this.manifest.contentProtection = {
                  'com.widevine.alpha': {
                    attributes: {
                      schemeIdUri: entry.attributes.KEYFORMAT,
                      // remove '0x' from the key id string
                      keyId: entry.attributes.KEYID.substring(2)
                    },
                    // decode the base64-encoded PSSH box
                    pssh: decodeB64ToUint8Array(entry.attributes.URI.split(',')[1])
                  }
                };
                return;
              }

              if (!entry.attributes.METHOD) {
                this.trigger('warn', {
                  message: 'defaulting key method to AES-128'
                });
              } // setup an encryption key for upcoming segments


              _key = {
                method: entry.attributes.METHOD || 'AES-128',
                uri: entry.attributes.URI
              };

              if (typeof entry.attributes.IV !== 'undefined') {
                _key.iv = entry.attributes.IV;
              }
            },
            'media-sequence': function mediaSequence() {
              if (!isFinite(entry.number)) {
                this.trigger('warn', {
                  message: 'ignoring invalid media sequence: ' + entry.number
                });
                return;
              }

              this.manifest.mediaSequence = entry.number;
            },
            'discontinuity-sequence': function discontinuitySequence() {
              if (!isFinite(entry.number)) {
                this.trigger('warn', {
                  message: 'ignoring invalid discontinuity sequence: ' + entry.number
                });
                return;
              }

              this.manifest.discontinuitySequence = entry.number;
              currentTimeline = entry.number;
            },
            'playlist-type': function playlistType() {
              if (!/VOD|EVENT/.test(entry.playlistType)) {
                this.trigger('warn', {
                  message: 'ignoring unknown playlist type: ' + entry.playlist
                });
                return;
              }

              this.manifest.playlistType = entry.playlistType;
            },
            map: function map() {
              currentMap = {};

              if (entry.uri) {
                currentMap.uri = entry.uri;
              }

              if (entry.byterange) {
                currentMap.byterange = entry.byterange;
              }
            },
            'stream-inf': function streamInf() {
              this.manifest.playlists = uris;
              this.manifest.mediaGroups = this.manifest.mediaGroups || defaultMediaGroups;

              if (!entry.attributes) {
                this.trigger('warn', {
                  message: 'ignoring empty stream-inf attributes'
                });
                return;
              }

              if (!currentUri.attributes) {
                currentUri.attributes = {};
              }

              _extends(currentUri.attributes, entry.attributes);
            },
            media: function media() {
              this.manifest.mediaGroups = this.manifest.mediaGroups || defaultMediaGroups;

              if (!(entry.attributes && entry.attributes.TYPE && entry.attributes['GROUP-ID'] && entry.attributes.NAME)) {
                this.trigger('warn', {
                  message: 'ignoring incomplete or missing media group'
                });
                return;
              } // find the media group, creating defaults as necessary


              var mediaGroupType = this.manifest.mediaGroups[entry.attributes.TYPE];
              mediaGroupType[entry.attributes['GROUP-ID']] = mediaGroupType[entry.attributes['GROUP-ID']] || {};
              mediaGroup = mediaGroupType[entry.attributes['GROUP-ID']]; // collect the rendition metadata

              rendition = {
                default: /yes/i.test(entry.attributes.DEFAULT)
              };

              if (rendition.default) {
                rendition.autoselect = true;
              } else {
                rendition.autoselect = /yes/i.test(entry.attributes.AUTOSELECT);
              }

              if (entry.attributes.LANGUAGE) {
                rendition.language = entry.attributes.LANGUAGE;
              }

              if (entry.attributes.URI) {
                rendition.uri = entry.attributes.URI;
              }

              if (entry.attributes['INSTREAM-ID']) {
                rendition.instreamId = entry.attributes['INSTREAM-ID'];
              }

              if (entry.attributes.CHARACTERISTICS) {
                rendition.characteristics = entry.attributes.CHARACTERISTICS;
              }

              if (entry.attributes.FORCED) {
                rendition.forced = /yes/i.test(entry.attributes.FORCED);
              } // insert the new rendition


              mediaGroup[entry.attributes.NAME] = rendition;
            },
            discontinuity: function discontinuity() {
              currentTimeline += 1;
              currentUri.discontinuity = true;
              this.manifest.discontinuityStarts.push(uris.length);
            },
            'program-date-time': function programDateTime() {
              if (typeof this.manifest.dateTimeString === 'undefined') {
                // PROGRAM-DATE-TIME is a media-segment tag, but for backwards
                // compatibility, we add the first occurence of the PROGRAM-DATE-TIME tag
                // to the manifest object
                // TODO: Consider removing this in future major version
                this.manifest.dateTimeString = entry.dateTimeString;
                this.manifest.dateTimeObject = entry.dateTimeObject;
              }

              currentUri.dateTimeString = entry.dateTimeString;
              currentUri.dateTimeObject = entry.dateTimeObject;
            },
            targetduration: function targetduration() {
              if (!isFinite(entry.duration) || entry.duration < 0) {
                this.trigger('warn', {
                  message: 'ignoring invalid target duration: ' + entry.duration
                });
                return;
              }

              this.manifest.targetDuration = entry.duration;
            },
            totalduration: function totalduration() {
              if (!isFinite(entry.duration) || entry.duration < 0) {
                this.trigger('warn', {
                  message: 'ignoring invalid total duration: ' + entry.duration
                });
                return;
              }

              this.manifest.totalDuration = entry.duration;
            },
            start: function start() {
              if (!entry.attributes || isNaN(entry.attributes['TIME-OFFSET'])) {
                this.trigger('warn', {
                  message: 'ignoring start declaration without appropriate attribute list'
                });
                return;
              }

              this.manifest.start = {
                timeOffset: entry.attributes['TIME-OFFSET'],
                precise: entry.attributes.PRECISE
              };
            },
            'cue-out': function cueOut() {
              currentUri.cueOut = entry.data;
            },
            'cue-out-cont': function cueOutCont() {
              currentUri.cueOutCont = entry.data;
            },
            'cue-in': function cueIn() {
              currentUri.cueIn = entry.data;
            }
          })[entry.tagType] || noop).call(self);
        },
        uri: function uri() {
          currentUri.uri = entry.uri;
          uris.push(currentUri); // if no explicit duration was declared, use the target duration

          if (this.manifest.targetDuration && !('duration' in currentUri)) {
            this.trigger('warn', {
              message: 'defaulting segment duration to the target duration'
            });
            currentUri.duration = this.manifest.targetDuration;
          } // annotate with encryption information, if necessary


          if (_key) {
            currentUri.key = _key;
          }

          currentUri.timeline = currentTimeline; // annotate with initialization segment information, if necessary

          if (currentMap) {
            currentUri.map = currentMap;
          } // prepare for the next URI


          currentUri = {};
        },
        comment: function comment() {// comments are not important for playback
        },
        custom: function custom() {
          // if this is segment-level data attach the output to the segment
          if (entry.segment) {
            currentUri.custom = currentUri.custom || {};
            currentUri.custom[entry.customType] = entry.data; // if this is manifest-level data attach to the top level manifest object
          } else {
            this.manifest.custom = this.manifest.custom || {};
            this.manifest.custom[entry.customType] = entry.data;
          }
        }
      })[entry.type].call(self);
    });

    return _this;
  }
  /**
   * Parse the input string and update the manifest object.
   *
   * @param {string} chunk a potentially incomplete portion of the manifest
   */


  var _proto = Parser.prototype;

  _proto.push = function push(chunk) {
    this.lineStream.push(chunk);
  }
  /**
   * Flush any remaining input. This can be handy if the last line of an M3U8
   * manifest did not contain a trailing newline but the file has been
   * completely received.
   */
  ;

  _proto.end = function end() {
    // flush any buffered input
    this.lineStream.push('\n');
  }
  /**
   * Add an additional parser for non-standard tags
   *
   * @param {Object}   options              a map of options for the added parser
   * @param {RegExp}   options.expression   a regular expression to match the custom header
   * @param {string}   options.type         the type to register to the output
   * @param {Function} [options.dataParser] function to parse the line into an object
   * @param {boolean}  [options.segment]    should tag data be attached to the segment object
   */
  ;

  _proto.addParser = function addParser(options) {
    this.parseStream.addParser(options);
  }
  /**
   * Add a custom header mapper
   *
   * @param {Object}   options
   * @param {RegExp}   options.expression   a regular expression to match the custom header
   * @param {Function} options.map          function to translate tag into a different tag
   */
  ;

  _proto.addTagMapper = function addTagMapper(options) {
    this.parseStream.addTagMapper(options);
  };

  return Parser;
}(Stream);




/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(0);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(1);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// CONCATENATED MODULE: ./src/crypt/aes-crypto.js



var aes_crypto_AESCrypto =
/*#__PURE__*/
function () {
  function AESCrypto(subtle, iv) {
    classCallCheck_default()(this, AESCrypto);

    this.subtle = subtle;
    this.aesIV = iv;
  }

  createClass_default()(AESCrypto, [{
    key: "decrypt",
    value: function decrypt(data, key) {
      return this.subtle.decrypt({
        name: 'AES-CBC',
        iv: this.aesIV
      }, key, data);
    }
  }]);

  return AESCrypto;
}();


// CONCATENATED MODULE: ./src/crypt/fast-aes-key.js



var fast_aes_key_FastAESKey =
/*#__PURE__*/
function () {
  function FastAESKey(subtle, key) {
    classCallCheck_default()(this, FastAESKey);

    this.subtle = subtle;
    this.key = key;
  }

  createClass_default()(FastAESKey, [{
    key: "expandKey",
    value: function expandKey() {
      return this.subtle.importKey('raw', this.key, {
        name: 'AES-CBC'
      }, false, ['encrypt', 'decrypt']);
    }
  }]);

  return FastAESKey;
}();

/* harmony default export */ var fast_aes_key = (fast_aes_key_FastAESKey);
// CONCATENATED MODULE: ./src/crypt/aes-decryptor.js


// PKCS7
function removePadding(buffer) {
  var outputBytes = buffer.byteLength;
  var paddingBytes = outputBytes && new DataView(buffer).getUint8(outputBytes - 1);

  if (paddingBytes) {
    return buffer.slice(0, outputBytes - paddingBytes);
  } else {
    return buffer;
  }
}

var aes_decryptor_AESDecryptor =
/*#__PURE__*/
function () {
  function AESDecryptor() {
    classCallCheck_default()(this, AESDecryptor);

    // Static after running initTable
    this.rcon = [0x0, 0x1, 0x2, 0x4, 0x8, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
    this.subMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)];
    this.invSubMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)];
    this.sBox = new Uint32Array(256);
    this.invSBox = new Uint32Array(256); // Changes during runtime

    this.key = new Uint32Array(0);
    this.initTable();
  } // Using view.getUint32() also swaps the byte order.


  createClass_default()(AESDecryptor, [{
    key: "uint8ArrayToUint32Array_",
    value: function uint8ArrayToUint32Array_(arrayBuffer) {
      var view = new DataView(arrayBuffer);
      var newArray = new Uint32Array(4);

      for (var i = 0; i < 4; i++) {
        newArray[i] = view.getUint32(i * 4);
      }

      return newArray;
    }
  }, {
    key: "initTable",
    value: function initTable() {
      var sBox = this.sBox;
      var invSBox = this.invSBox;
      var subMix = this.subMix;
      var subMix0 = subMix[0];
      var subMix1 = subMix[1];
      var subMix2 = subMix[2];
      var subMix3 = subMix[3];
      var invSubMix = this.invSubMix;
      var invSubMix0 = invSubMix[0];
      var invSubMix1 = invSubMix[1];
      var invSubMix2 = invSubMix[2];
      var invSubMix3 = invSubMix[3];
      var d = new Uint32Array(256);
      var x = 0;
      var xi = 0;
      var i = 0;

      for (i = 0; i < 256; i++) {
        if (i < 128) {
          d[i] = i << 1;
        } else {
          d[i] = i << 1 ^ 0x11b;
        }
      }

      for (i = 0; i < 256; i++) {
        var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
        sx = sx >>> 8 ^ sx & 0xff ^ 0x63;
        sBox[x] = sx;
        invSBox[sx] = x; // Compute multiplication

        var x2 = d[x];
        var x4 = d[x2];
        var x8 = d[x4]; // Compute sub/invSub bytes, mix columns tables

        var t = d[sx] * 0x101 ^ sx * 0x1010100;
        subMix0[x] = t << 24 | t >>> 8;
        subMix1[x] = t << 16 | t >>> 16;
        subMix2[x] = t << 8 | t >>> 24;
        subMix3[x] = t; // Compute inv sub bytes, inv mix columns tables

        t = x8 * 0x1010101 ^ x4 * 0x10001 ^ x2 * 0x101 ^ x * 0x1010100;
        invSubMix0[sx] = t << 24 | t >>> 8;
        invSubMix1[sx] = t << 16 | t >>> 16;
        invSubMix2[sx] = t << 8 | t >>> 24;
        invSubMix3[sx] = t; // Compute next counter

        if (!x) {
          x = xi = 1;
        } else {
          x = x2 ^ d[d[d[x8 ^ x2]]];
          xi ^= d[d[xi]];
        }
      }
    }
  }, {
    key: "expandKey",
    value: function expandKey(keyBuffer) {
      // convert keyBuffer to Uint32Array
      var key = this.uint8ArrayToUint32Array_(keyBuffer);
      var sameKey = true;
      var offset = 0;

      while (offset < key.length && sameKey) {
        sameKey = key[offset] === this.key[offset];
        offset++;
      }

      if (sameKey) {
        return;
      }

      this.key = key;
      var keySize = this.keySize = key.length;

      if (keySize !== 4 && keySize !== 6 && keySize !== 8) {
        throw new Error('Invalid aes key size=' + keySize);
      }

      var ksRows = this.ksRows = (keySize + 6 + 1) * 4;
      var ksRow;
      var invKsRow;
      var keySchedule = this.keySchedule = new Uint32Array(ksRows);
      var invKeySchedule = this.invKeySchedule = new Uint32Array(ksRows);
      var sbox = this.sBox;
      var rcon = this.rcon;
      var invSubMix = this.invSubMix;
      var invSubMix0 = invSubMix[0];
      var invSubMix1 = invSubMix[1];
      var invSubMix2 = invSubMix[2];
      var invSubMix3 = invSubMix[3];
      var prev;
      var t;

      for (ksRow = 0; ksRow < ksRows; ksRow++) {
        if (ksRow < keySize) {
          prev = keySchedule[ksRow] = key[ksRow];
          continue;
        }

        t = prev;

        if (ksRow % keySize === 0) {
          // Rot word
          t = t << 8 | t >>> 24; // Sub word

          t = sbox[t >>> 24] << 24 | sbox[t >>> 16 & 0xff] << 16 | sbox[t >>> 8 & 0xff] << 8 | sbox[t & 0xff]; // Mix Rcon

          t ^= rcon[ksRow / keySize | 0] << 24;
        } else if (keySize > 6 && ksRow % keySize === 4) {
          // Sub word
          t = sbox[t >>> 24] << 24 | sbox[t >>> 16 & 0xff] << 16 | sbox[t >>> 8 & 0xff] << 8 | sbox[t & 0xff];
        }

        keySchedule[ksRow] = prev = (keySchedule[ksRow - keySize] ^ t) >>> 0;
      }

      for (invKsRow = 0; invKsRow < ksRows; invKsRow++) {
        ksRow = ksRows - invKsRow;

        if (invKsRow & 3) {
          t = keySchedule[ksRow];
        } else {
          t = keySchedule[ksRow - 4];
        }

        if (invKsRow < 4 || ksRow <= 4) {
          invKeySchedule[invKsRow] = t;
        } else {
          invKeySchedule[invKsRow] = invSubMix0[sbox[t >>> 24]] ^ invSubMix1[sbox[t >>> 16 & 0xff]] ^ invSubMix2[sbox[t >>> 8 & 0xff]] ^ invSubMix3[sbox[t & 0xff]];
        }

        invKeySchedule[invKsRow] = invKeySchedule[invKsRow] >>> 0;
      }
    } // Adding this as a method greatly improves performance.

  }, {
    key: "networkToHostOrderSwap",
    value: function networkToHostOrderSwap(word) {
      return word << 24 | (word & 0xff00) << 8 | (word & 0xff0000) >> 8 | word >>> 24;
    }
  }, {
    key: "decrypt",
    value: function decrypt(inputArrayBuffer, offset, aesIV, removePKCS7Padding) {
      var nRounds = this.keySize + 6;
      var invKeySchedule = this.invKeySchedule;
      var invSBOX = this.invSBox;
      var invSubMix = this.invSubMix;
      var invSubMix0 = invSubMix[0];
      var invSubMix1 = invSubMix[1];
      var invSubMix2 = invSubMix[2];
      var invSubMix3 = invSubMix[3];
      var initVector = this.uint8ArrayToUint32Array_(aesIV);
      var initVector0 = initVector[0];
      var initVector1 = initVector[1];
      var initVector2 = initVector[2];
      var initVector3 = initVector[3];
      var inputInt32 = new Int32Array(inputArrayBuffer);
      var outputInt32 = new Int32Array(inputInt32.length);
      var t0, t1, t2, t3;
      var s0, s1, s2, s3;
      var inputWords0, inputWords1, inputWords2, inputWords3;
      var ksRow, i;
      var swapWord = this.networkToHostOrderSwap;

      while (offset < inputInt32.length) {
        inputWords0 = swapWord(inputInt32[offset]);
        inputWords1 = swapWord(inputInt32[offset + 1]);
        inputWords2 = swapWord(inputInt32[offset + 2]);
        inputWords3 = swapWord(inputInt32[offset + 3]);
        s0 = inputWords0 ^ invKeySchedule[0];
        s1 = inputWords3 ^ invKeySchedule[1];
        s2 = inputWords2 ^ invKeySchedule[2];
        s3 = inputWords1 ^ invKeySchedule[3];
        ksRow = 4; // Iterate through the rounds of decryption

        for (i = 1; i < nRounds; i++) {
          t0 = invSubMix0[s0 >>> 24] ^ invSubMix1[s1 >> 16 & 0xff] ^ invSubMix2[s2 >> 8 & 0xff] ^ invSubMix3[s3 & 0xff] ^ invKeySchedule[ksRow];
          t1 = invSubMix0[s1 >>> 24] ^ invSubMix1[s2 >> 16 & 0xff] ^ invSubMix2[s3 >> 8 & 0xff] ^ invSubMix3[s0 & 0xff] ^ invKeySchedule[ksRow + 1];
          t2 = invSubMix0[s2 >>> 24] ^ invSubMix1[s3 >> 16 & 0xff] ^ invSubMix2[s0 >> 8 & 0xff] ^ invSubMix3[s1 & 0xff] ^ invKeySchedule[ksRow + 2];
          t3 = invSubMix0[s3 >>> 24] ^ invSubMix1[s0 >> 16 & 0xff] ^ invSubMix2[s1 >> 8 & 0xff] ^ invSubMix3[s2 & 0xff] ^ invKeySchedule[ksRow + 3]; // Update state

          s0 = t0;
          s1 = t1;
          s2 = t2;
          s3 = t3;
          ksRow = ksRow + 4;
        } // Shift rows, sub bytes, add round key


        t0 = invSBOX[s0 >>> 24] << 24 ^ invSBOX[s1 >> 16 & 0xff] << 16 ^ invSBOX[s2 >> 8 & 0xff] << 8 ^ invSBOX[s3 & 0xff] ^ invKeySchedule[ksRow];
        t1 = invSBOX[s1 >>> 24] << 24 ^ invSBOX[s2 >> 16 & 0xff] << 16 ^ invSBOX[s3 >> 8 & 0xff] << 8 ^ invSBOX[s0 & 0xff] ^ invKeySchedule[ksRow + 1];
        t2 = invSBOX[s2 >>> 24] << 24 ^ invSBOX[s3 >> 16 & 0xff] << 16 ^ invSBOX[s0 >> 8 & 0xff] << 8 ^ invSBOX[s1 & 0xff] ^ invKeySchedule[ksRow + 2];
        t3 = invSBOX[s3 >>> 24] << 24 ^ invSBOX[s0 >> 16 & 0xff] << 16 ^ invSBOX[s1 >> 8 & 0xff] << 8 ^ invSBOX[s2 & 0xff] ^ invKeySchedule[ksRow + 3];
        ksRow = ksRow + 3; // Write

        outputInt32[offset] = swapWord(t0 ^ initVector0);
        outputInt32[offset + 1] = swapWord(t3 ^ initVector1);
        outputInt32[offset + 2] = swapWord(t2 ^ initVector2);
        outputInt32[offset + 3] = swapWord(t1 ^ initVector3); // reset initVector to last 4 unsigned int

        initVector0 = inputWords0;
        initVector1 = inputWords1;
        initVector2 = inputWords2;
        initVector3 = inputWords3;
        offset = offset + 4;
      }

      return removePKCS7Padding ? removePadding(outputInt32.buffer) : outputInt32.buffer;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.key = undefined;
      this.keySize = undefined;
      this.ksRows = undefined;
      this.sBox = undefined;
      this.invSBox = undefined;
      this.subMix = undefined;
      this.invSubMix = undefined;
      this.keySchedule = undefined;
      this.invKeySchedule = undefined;
      this.rcon = undefined;
    }
  }]);

  return AESDecryptor;
}();

/* harmony default export */ var aes_decryptor = (aes_decryptor_AESDecryptor);
// CONCATENATED MODULE: ./src/utils/get-self-scope.js
function getSelfScope() {
  // see https://stackoverflow.com/a/11237259/589493
  if (typeof window === 'undefined') {
    /* eslint-disable-next-line no-undef */
    return self;
  } else {
    return window;
  }
}
// CONCATENATED MODULE: ./src/crypt/decrypter.js





 // see https://stackoverflow.com/a/11237259/589493

var global = getSelfScope(); // safeguard for code that might run both on worker and main thread

var decrypter_Decrypter =
/*#__PURE__*/
function () {
  function Decrypter() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$removePKCS7Paddi = _ref.removePKCS7Padding,
        removePKCS7Padding = _ref$removePKCS7Paddi === void 0 ? true : _ref$removePKCS7Paddi;

    classCallCheck_default()(this, Decrypter);

    this.logEnabled = true;
    this.config = config;
    this.removePKCS7Padding = removePKCS7Padding; // built in decryptor expects PKCS7 padding

    if (removePKCS7Padding) {
      try {
        var browserCrypto = global.crypto;

        if (browserCrypto) {
          this.subtle = browserCrypto.subtle || browserCrypto.webkitSubtle;
        }
      } catch (e) {}
    }

    this.disableWebCrypto = !this.subtle;
  }

  createClass_default()(Decrypter, [{
    key: "isSync",
    value: function isSync() {
      return this.disableWebCrypto && this.config.enableSoftwareAES;
    }
  }, {
    key: "decrypt",
    value: function decrypt(data, key, iv, callback) {
      var _this = this;

      if (this.disableWebCrypto && this.config.enableSoftwareAES) {
        if (this.logEnabled) {
          this.logEnabled = false;
        }

        var decryptor = this.decryptor;

        if (!decryptor) {
          this.decryptor = decryptor = new aes_decryptor();
        }

        decryptor.expandKey(key);
        callback(decryptor.decrypt(data, 0, iv, this.removePKCS7Padding));
      } else {
        if (this.logEnabled) {
          this.logEnabled = false;
        }

        var subtle = this.subtle;

        if (this.key !== key) {
          this.key = key;
          this.fastAesKey = new fast_aes_key(subtle, key);
        }

        this.fastAesKey.expandKey().then(function (aesKey) {
          // decrypt using web crypto
          var crypto = new aes_crypto_AESCrypto(subtle, iv);
          crypto.decrypt(data, aesKey).catch(function (err) {
            _this.onWebCryptoError(err, data, key, iv, callback);
          }).then(function (result) {
            callback(result);
          });
        }).catch(function (err) {
          _this.onWebCryptoError(err, data, key, iv, callback);
        });
      }
    }
  }, {
    key: "onWebCryptoError",
    value: function onWebCryptoError(err, data, key, iv, callback) {
      if (this.config.enableSoftwareAES) {
        console.log('WebCrypto Error, disable WebCrypto API');
        this.disableWebCrypto = true;
        this.logEnabled = true;
        this.decrypt(data, key, iv, callback);
      } else {
        console.error("decrypting error : ".concat(err.message));
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var decryptor = this.decryptor;

      if (decryptor) {
        decryptor.destroy();
        this.decryptor = undefined;
      }
    }
  }]);

  return Decrypter;
}();

/* harmony default export */ var decrypter = __webpack_exports__["a"] = (decrypter_Decrypter);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _crypt_decrypter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var m3u8_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



var playbackStreamDecrypter = function playbackStreamDecrypter(player) {
  var decrypter = new _crypt_decrypter__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]({
    enableSoftwareAES: true
  });

  function str2ab(str) {
    var buf = new ArrayBuffer(str.length); // 2 bytes for each char

    var bufView = new Uint8Array(buf);

    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }

    return buf;
  }

  function str2hex(str) {
    var hex = '';

    for (var i = 0; i < str.length; i++) {
      hex += '' + str.charCodeAt(i).toString(16);
    }

    return hex;
  }

  function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
  }

  function ab2b64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;

    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return global.btoa(binary);
  }

  function hasNativeHlsPlayback(player_) {
    if (player_ && player_.plugins && player_.plugins instanceof Array && player_.plugins.indexOf('hls') !== -1) {
      return false;
    } // check native support


    var video = document.createElement('video'); // HLS manifests can go by many mime-types

    var canPlay = [// Apple santioned
    'application/vnd.apple.mpegurl', // Apple sanctioned for backwards compatibility
    'audio/mpegurl', // Very common
    'audio/x-mpegurl', // Very common
    'application/x-mpegurl', // Included for completeness
    'video/x-mpegurl', 'video/mpegurl', 'application/mpegurl'];

    for (var cplidx = 0; cplidx < canPlay.length; cplidx++) {
      // if one of this supported - browser has native HLS support
      if (/maybe|probably/i.test(video.canPlayType(canPlay[cplidx]))) {
        return true;
      }
    }

    return false;
  }

  return {
    currentSource: undefined,
    currentSrc: undefined,
    currentChunk: undefined,
    hasNativeHlsPlayback: hasNativeHlsPlayback(player),
    ab2str: ab2str,
    getFileByUrl: function getFileByUrl(srcObj, next) {
      var _this = this;

      var aesSetup = player.options().aes;
      var manifestUrl = srcObj.src;
      var manifestPath = manifestUrl.replace(/[^/]+$/, '');
      this.currentSrc = manifestUrl;
      this.currentChunk = {
        src: manifestUrl + '?decrypted',
        type: srcObj.type
      };
      var xhrObj = typeof videojs !== 'undefined' ? videojs.xhr : xhr;
      xhrObj({
        uri: manifestUrl,
        responseType: 'arraybuffer'
      }, function (err, res, body) {
        if (err) {
          console.error('Error in retrieving file', err);
          next(null, srcObj);
          return;
        }

        decrypter.decrypt(body, str2ab(aesSetup.key), str2ab(aesSetup.iv), function (decryptedData) {
          if (!_this.hasNativeHlsPlayback) {
            var decriptionSelf = _this; // HLS.js case - we can just override XHttpRrequest
            // Override XMLHttpRequest to catch nex requests

            (function (open, send) {
              // ...overrides of the XHR open and send methods are now encapsulated within a closure
              XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
                if (url.match(/\.(m3u8)$/i)) {
                  url = url.replace(/^(data:application\/|blob:)/i, manifestPath);
                  decriptionSelf.currentChunk.src = url + '?decrypted';
                  this.aesEncoded = true;
                }

                if (url.match(/^data:text\/plain;charset=utf-8,([0-9a-f]{16})$/)) {
                  // IE 11 does not understand data: url in http requests, but understand blob:
                  url = URL.createObjectURL(new Blob([RegExp.$1], {
                    type: 'text/plain'
                  }));
                }

                open.apply(this, [method, url, async, user, password]); // reset/reapply original open method
              };

              XMLHttpRequest.prototype.send = function (data) {
                var _this2 = this;

                if (this.aesEncoded) {
                  this.responseType = 'arraybuffer';

                  (function (readystatechange) {
                    _this2.onreadystatechange = function (event) {
                      if (_this2.readyState === XMLHttpRequest.DONE && _this2.status === 200) {
                        decrypter.decrypt(_this2.response, str2ab(aesSetup.key), str2ab(aesSetup.iv), function (decryptedData) {
                          var response = ab2str(decryptedData);
                          response = response.replace(/^#EXTINF/im, '#EXT-X-KEY:METHOD=AES-128,URI="data:text/plain;charset=utf-8,' + aesSetup.key + '",IV=0x' + str2hex(aesSetup.iv) + '\r\n#EXTINF');
                          response = response.replace(/^(#EXTINF:[\0-\uFFFF]+?,[\n\r]+)/img, '$1' + manifestPath);
                          var resp = {
                            responseType: 'text',
                            readyState: XMLHttpRequest.DONE,
                            response: response,
                            responseText: response,
                            status: _this2.status,
                            responseURL: _this2.responseURL
                          };

                          if (decriptionSelf.currentSource) {
                            URL.revokeObjectURL(decriptionSelf.currentSource);
                          }

                          decriptionSelf.currentSource = {
                            src: URL.createObjectURL(new Blob([response], {
                              type: srcObj.type
                            })),
                            // 'data:' + srcObj.type + ';base64,' + ab2b64(str2ab(response)),
                            type: srcObj.type
                          };
                          readystatechange.apply(_this2, [{
                            currentTarget: resp
                          }]);
                        });
                      } else {
                        readystatechange.apply(_this2, [event]);
                      }
                    };
                  })(this.onreadystatechange);
                }

                send.apply(this, arguments); // reset/reapply original send method
              };
            })(XMLHttpRequest.prototype.open, XMLHttpRequest.prototype.send);

            if (_this.currentSource) {
              URL.revokeObjectURL(_this.currentSource);
            }

            var response = ab2str(decryptedData);
            response = response.replace(/^#EXTINF/im, '#EXT-X-KEY:METHOD=AES-128,URI="data:text/plain;charset=utf-8,' + aesSetup.key + '",IV=0x' + str2hex(aesSetup.iv) + '\r\n#EXTINF');
            response = response.replace(/^(#EXTINF:[\0-\uFFFF]+?,[\n\r]+)/img, '$1' + manifestPath);
            response = response.replace(/^(#EXT\x2DX\x2DSTREAM\x2DINF:[\0-\uFFFF]+?[\n\r]+)/img, '$1' + manifestPath);
            _this.currentSource = {
              src: URL.createObjectURL(new Blob([response], {
                type: srcObj.type
              })),
              // 'data:' + srcObj.type + ';base64,' + ab2b64(str2ab(response)),
              type: srcObj.type
            };
            next(null, _this.currentSource);
            return;
          } // in iOS case we should use our custom m3u8 parser for all levels


          var parser = new m3u8_parser__WEBPACK_IMPORTED_MODULE_1__[/* Parser */ "a"]();
          parser.push(ab2str(decryptedData));
          parser.end();

          if (parser.manifest && parser.manifest.playlists && parser.manifest.playlists.length) {
            // get first. in next versions we could make adaptive bitrate selection
            var playlist = parser.manifest.playlists.shift();

            _this.getFileByUrl({
              type: srcObj.type,
              src: srcObj.src.replace(/\/[^/]+$/, '/' + playlist.uri)
            }, next);
          } else if (parser.manifest && parser.manifest.segments && parser.manifest.segments.length) {
            var _response = ab2str(decryptedData);

            var _manifestPath = srcObj.src.replace(/\/[^/]+$/, '/');

            _response = _response.replace(/^#EXTINF/im, '#EXT-X-KEY:METHOD=AES-128,URI="data:text/plain;charset=utf-8,' + aesSetup.key + '",IV=0x' + str2hex(aesSetup.iv) + '\r\n#EXTINF');
            _response = _response.replace(/^(#EXTINF:[\0-\uFFFF]+?,[\n\r]+)/img, '$1' + _manifestPath);

            if (_this.currentSource) {
              URL.revokeObjectURL(_this.currentSource);
            }

            _this.currentSource = {
              src: URL.createObjectURL(new Blob([_response], {
                type: srcObj.type
              })),
              // 'data:' + srcObj.type + ';base64,' + ab2b64(str2ab(response)),
              type: srcObj.type
            };
            next(null, _this.currentSource);
          } else {
            throw new Error('Decoded wrong m3u8 manifest');
          }
        });
      });
    },
    setSource: function setSource(srcObj, next) {
      var _this3 = this;

      if (player.options().aes && !srcObj.src.match(/^(data:application\/|blob:)/) && !srcObj.src.match(/\?decrypted/)) {
        // call it just at once, when it starts from data:application it already decoded
        this.getFileByUrl(srcObj, next); // prototype methods to return valid source

        player.currentSrc = function () {
          return _this3.currentSrc;
        };

        player.currentSource = function () {
          // console.log('get currentSource!!!!', this.currentSource)
          return _this3.currentSource;
        };

        player.currentSources = function () {
          // console.log('get currentSources!!!!', [this.currentChunk])
          return [_this3.currentChunk]; // for chromecast we show current chunk in current quality
        };
      } else {
        srcObj.src = srcObj.src.replace(/\?decrypted/, '');
        next(null, srcObj);
      }
    }
  };
}; // Register the plugin with video.js.


if (typeof videojs !== 'undefined') {
  videojs.use('*', playbackStreamDecrypter);
} // Include the version number.


playbackStreamDecrypter.VERSION = '__VERSION__';
/* harmony default export */ __webpack_exports__["default"] = (playbackStreamDecrypter);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ })
/******/ ]);