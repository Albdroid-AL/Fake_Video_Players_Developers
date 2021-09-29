/*! @name videojs-ad-button @version 0.0.1 @license Apache-2.0 */
'use strict';

(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? module.exports = factory(require('video.js'))
    :
    typeof define === 'function' && define.amd
      ? define(['video.js'], factory)
      :
      (global.videojsAdListenerPlugin = factory(global.videojs));
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
    if (superClass) {
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass,
        superClass) : subClass.__proto__ = superClass;
    }
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

  var AdListenerPlugin = function(_Plugin) {
    inherits(AdListenerPlugin, _Plugin);

    /**
     * Initializes AdListenerPlugin instance.
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
    function AdListenerPlugin(player, options) {
      classCallCheck(this, AdListenerPlugin);
      var _this = possibleConstructorReturn(this, _Plugin.call(this, player));

      var playAd = function(tag) {
        if (tag) {
          player.ima.changeAdTag(tag);
          player.ima.requestAds();
        }
      };

      var getJSON = function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
          var status = xhr.status;
          if (status === 200) {
            callback(null, xhr.response);
          } else {
            callback(status, xhr.response);
          }
        };
        xhr.send();
      };

      _this.options = videojs.mergeOptions({}, options);

      _this.player.ready(function() {
        if (player.ima.changeAdTag) {

          if (options.event) {
            _this.player.on(options.event, function(event) {
              playAd(event.tag);
            });
          }

          if (options.json) {
            var interval;

            function listen() {
              if (!interval) {
                _this.player.one('playing', function() {
                  console.log('listening');

                  interval = setInterval(function() {
                    getJSON(options.json, function(error, data) {
                      if (error) {
                        console.error(error);
                      } else if (data) {
                        console.log(data);
                        data.trigger && playAd(data.tag);
                      }
                    });
                  }, 3000);
                });
              }
            }

            function resumeListening() {
              if (interval) {
                console.log('interval cleared');
                clearInterval(interval);
                interval = null;
              }
            }

            _this.player.on('pause', function() {
              console.log('pause - interval cleared');
              resumeListening();
              listen();
            });

            _this.player.on('ads-ad-started', function() {
              console.log('ad - interval cleared');
              resumeListening();
            });

            _this.player.on('adend', function() {
              console.log('ad - listening');
              listen();
            });

            listen();
          }
        }
      });

      return _this;
    }

    return AdListenerPlugin;
  }(Plugin);

  AdListenerPlugin.VERSION = '0.0.1';

  videojs.registerPlugin('adListener', AdListenerPlugin);

  return AdListenerPlugin;
})));

