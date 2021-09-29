var ACCESS_KEY = '';

var JSVersion = 1307;

var scriptPool = {};

var finishedLoading = false;
var adsArr = [];
var AdCount = 0;
var loaded = 0;
var client = 'googima'; // default is ima
var muted;

//var addedNonLiveControls = false;

var path = 'http://localhost/Player/packages/'; // load player plugins

// provided for client to know the structure of options
// The plugins list which will initialized after player ready
var pluginList = [
  // CUSTOM CONTEXT MENU
  {
    name: 'context',
    forceReinit: true, // for multiply player instances
    js: [
      path + 'videojs-contextmenu-ui/videojs-contextmenu-ui.min.js?v=' +
      JSVersion
    ],
    css: [
      path + 'videojs-contextmenu-ui/videojs-contextmenu-ui.css?v=' + JSVersion
    ],
    enabled: function() {
      return !bowser.mobile && !this.isMp3Podcast();
    },
    init: function(player) {
      var contextOptions = {
        content: [
          {
            // A plain old link.
            href: 'https://videojs.com/',
            label: 'Videojs Player'
          }, {
            // A link with a listener. Its `href` will automatically be `#`.
            label: 'Version V8.0.7'
          }
        ]

      };

      if (typeof this.options.context !== 'undefined') {
        for (var key in this.options.context) {
          contextOptions[key] = this.options.context[key];
        }
      }
      player.contextmenuUI(contextOptions);
    }
  },
   // GOOGLE ANALYTICS
  {
    name: 'ga',
    forceReinit: true, // for multiply player instances and correct recreation after disposal
    js: [
      path + 'videojs-analytics/videojs-analytics.min.js?v=' + JSVersion
      // path + 'videojs-analytics/videojs-analytics.js?v=' + JSVersion
    ],
    enabled: function() {
      return typeof this.options.ga === 'undefined' || !!this.options.ga;
    },
    init: function(player) {
      var gaopts = {
        debug: this.options.ga ? (this.options.ga.debug || false) : false,
        assetName: document.title,
        events: []
      };
      var gaevents = [
        {
          name: 'loadedmetadata',
          action: 'loaded',
          label: 'video loaded',
          enabled: true
        },
        {
          name: 'autoplay',
          label: 'video autoplay',
          action: 'autoplay',
          enabled: true
        },
        {
          name: 'play',
          label: 'video play',
          action: 'play',
          enabled: true
        },
        {
          name: 'playing',
          label: 'video playing',
          action: 'playing',
          enabled: true
        },
        {
          name: 'pause',
          label: 'video pause',
          action: 'pause',
          enabled: true
        },
        {
          name: 'ended',
          label: 'video ended',
          action: 'ended',
          enabled: true
        },
        {
          name: 'fullscreenchange',
          label: {
            open: 'video fullscreen open',
            exit: 'video fullscreen exit'
          },
          action: 'fullscreenchange',
          enabled: true
        },
        {
          name: 'volumechange',
          label: 'volume changed',
          action: 'volumechange',
          enabled: true
        },
        {
          name: 'error',
          label: 'error',
          action: 'error',
          enabled: true
        },
        {
          name: 'resolutionchange',
          action: 'resolutionchange',
          enabled: true
        },
        {
          name: 'mute',
          action: 'mute',
          label: 'video muted',
          enabled: true
        }
      ];

      var timeupdateEvent = {
        name: 'timeupdate',
        action: 'timeupdate',
        enabled: true
      };
      if (!this.hasDvrConfig()) {
        gaevents.push(timeupdateEvent);
      }

      if (this.options.ga && this.options.ga.mode) {
        gaopts.mode = this.options.ga.mode;
      } else if (window.gtag && window.gtag.name === 'gtag') {
        gaopts.mode = 'GTAG';
      } else {
        gaopts.mode = 'GA';
      }

      for (var idx = 0; idx < gaevents.length; idx++) {
        if (gaevents[idx].enabled && (!this.options.ga || !this.options.ga.events || this.options.ga.events.indexOf(gaevents[idx].name) !== -1)
          && gaopts.events.map(function(event) {
            return event.name;
          }).indexOf(gaevents[idx].name) === -1) {
          gaopts.events.push(gaevents[idx]);
        }
      }

      player.analytics(gaopts);
    }
  },
  // HOTKEYS PLUGIN
  {
    name: 'hotkey',
    js: [
      path + 'videojs-hotkeys/videojs.hotkeys.min.js?v=' + JSVersion
    ],
    enabled: function() {
      return !bowser.mobile;
    },
    init: function(player) {
      player.hotkeys({ enableVolumeScroll: false });
    }
  },
  // THUMBNAILS PLUGIN
  {
    name: 'thumbnails',
    js: [
      path + 'videojs-thumbnail/videojs.thumbnails.min.js?v=' + JSVersion
    ],
    css: [
      path + 'videojs-thumbnail/videojs.thumbnails.min.css?v=' + JSVersion
    ],
    enabled: function() {
      return !bowser.mobile && !this.isMp3Podcast();
    },
    init: function(player) {
      player.thumbnails({});
    }
  },
  // GOOGLE VR PLUGIN
  {
    name: 'googlevr',
    js: [
      path + 'videojs-panorama/three.min.js?v=' + JSVersion,
      path + 'videojs-panorama/videojs-panorama-6.min.js?v=' + JSVersion
    ],
    jsorder: 'defer',
    css: [
      path + 'videojs-panorama/videojs-panorama.min.css?v=' + JSVersion
    ],
    enabled: function() {
      return typeof this.options.stereomode !== 'undefined'
        && this.options.stereomode === 'monoscopic'
        && !(bowser.safari && eval(bowser.version) < 11)
        && !this.isMp3Podcast();
    },
    init: function(player) {
      var videoElement = player.el_;
      var width = videoElement.offsetWidth;
      var height = videoElement.offsetHeight;
      player.width(width);
      player.height(height);
      player.panorama({
        clickToToggle: (!bowser.mobile),
        autoMobileOrientation: true,
        initFov: 100,
        NoticeMessage: (bowser.mobile)
          ? 'please drag and drop the video'
          : 'please use your mouse drag and drop the video',
        callback: function() {
        }
      });
      window.addEventListener('resize', function() {
        var canvas = player.getChild('Canvas');
        if (canvas) {
          canvas.handleResize();
        }
      });
      window.addEventListener('message', function(event) {
        if (typeof event.data === 'object') {
          if (event.data.type === 'device-motion') {
            var canvas = player.getChild('Canvas');
            if (canvas) {
              canvas.handleMobileOrientation(event.data.events);
            }
          }
        }
      }, false);

      if (bowser.ios && !navigator.platform.match(/linux/i)) {
        player.controlBar.fullscreenToggle.on('tap', function() {
          if (!player.isFullscreen()) {
            parent.postMessage('enterFullWindow', '*');
          } else {
            parent.postMessage('exitFullWindow', '*');
          }
        });
      }
    }
  },
  // RTMP FLASH STREAM
  {
    name: 'flash',
    js: [
      path + 'videojs-flash/videojs-flash.min.js?v=' + JSVersion
    ],
    css: [],
    enabled: function(player) {
      return player.options_.techOrder.indexOf('flash') > -1
        || typeof this.options.file !== 'undefined'
        && this.options.file.match(/^rtmp[set]?:\/\//i)
        && !this.isMp3Podcast();
    },
    init: function(player) {
      return false;
    }
  },
  // HLS PLUGIN
  {
    name: 'hls',
    order: 3,
    forceReinit: true, // for multiply player instances and correct recreation after disposal
    js: [
      function() {
        return (navigator.appVersion.match(/Windows NT 6\.[01]/) && bowser.msie && eval(bowser.version) <= 11)
          ? path + 'videojs-http-streaming/videojs-http-streaming.min.js?v=' + JSVersion // We are using http-streaming only for win7 and msie
          : path + 'hlsjs/v2/videojs-hlsjs-plugin.min.js?v=' + JSVersion;
      },
      function() {
        if (this.options && this.options.p2p) {
          return path + 'hlsjs/p2p-media-loader-hlsjs.min.js?v=' + JSVersion;
        }
      },
      path + 'hlsjs/vjs-quality-picker.min.js?v=' + JSVersion
    ],
    enabled: function(player, opts) {
      if (!this.isHLSource() || this.isMp3Podcast() || this.isDashDrm()) {
        return false;
      }
      if (this.options && this.options.debug) {
        console.log('HLS source found');
      }

      // alert(navigator.platform + " " +  navigator.vendor)
      if (bowser.chrome && !bowser.ios) {
        return true;
      }

      var nativeHlsSupport = this.hasNativeHlsSupport();
      if (nativeHlsSupport) {
        if (this.options && this.options.debug) {
          console.log('Browser has native HLS support: ' + nativeHlsSupport);
        }
        return false;
      }
      return true;
    },
    init: function(player) {
      player.qualityPickerPlugin({});
      if (this.options && this.options.p2p && window.p2pml && window.p2pml.hlsjs.Engine.isSupported()) {
        localStorage.debug = 'p2pml:*';
        var engine = new p2pml.hlsjs.Engine();
        p2pml.hlsjs.initVideoJsHlsJsPlugin();
        player.on('loadedmetadata', function() {
          this.tech_.hlsProvider.config({
            liveSyncDurationCount: 7,
            loader: engine.createLoaderClass()
          });
        });
      }
      player.on('loadedmetadata', function() {
        if (this.duration() < 60 && bowser.android && bowser.chrome) {
          // reduce maxMaxBufferLength for android devices and short video
          // avoiding PIPELINE_ERROR_DECODE: video decoder reinitialization
          // failed
          this.tech_.hlsProvider.config({
            maxMaxBufferLength: 2
          });
        }
      });

      // setup beforeinitialize hook
      var this_ = this;
      if (typeof videojs.Html5Hlsjs !== 'undefined') {
        videojs.Html5Hlsjs.addHook('beforeinitialize',
          function(videojsPlayer, hlsjsInstance) {
            // here you can interact with hls.js instance and/or video.js
            // playback is initialized
            // if ((typeof this_.options.file !== 'undefined' && this_.options.file.match(/\.m3u8(\?|$)/))) {
            //
            // }
          });
      }
    }
  },
  // DASH PLUGIN
  {
    name: 'dash',
    js: [
      path + 'videojs-shaka-player/v2/videojs-shaka-player.min.js?v=' + JSVersion
    ],
    forceReinit: true, // for multiply player instances and correct recreation after disposal
    order: 4,
    enabled: function(player, opts) {
      return !this.isMp3Podcast() && this.hasDash();
    },
    init: function(player) {
      if (this.hasDrmConfig()) {
        var licenceType = this.options.drm.type;
        var drmConfig = {};
        drmConfig[licenceType] = this.options.drm.license;
        player.one('ready', function() {
          if (typeof player.tech_.shakaPlayer !== 'undefined') {
            // https://shaka-player-demo.appspot.com/docs/api/tutorial-drm-config.html
            player.tech_.shakaPlayer.configure({
              drm: {
                servers: drmConfig,
                // It is recommended that a robustness level be specified.
                // Not specifying the robustness level could result in
                // unexpected behavior.
                advanced: _defineProperty({}, licenceType, {
                  'videoRobustness': 'SW_SECURE_CRYPTO',
                  'audioRobustness': 'SW_SECURE_CRYPTO'
                })
              }
            });

            player.tech_.on('shakatecherror', function(e) {
              player.error(e);
            });
          }

          function _defineProperty(obj, key, value) {
            if (key in obj) {
              Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
              });
            } else {
              obj[key] = value;
            }
            return obj;
          }
        });
      }
      player.options_.techOrder.splice(player.options_.techOrder.indexOf('html5') + 1, 0, 'shaka');
    }
  },
  // ISM PLUGIN
  {
    name: 'ism',
    js: [
      // path + 'videojs-contrib-dash/dash.all.min.js?v=' + JSVersion,
      // path + 'videojs-contrib-dash/dash.mss.min.js?v=' + JSVersion, //
      // include this file inside videojs-dash.min
      path + 'videojs-contrib-dash/videojs-dash.min.js?v=' + JSVersion
    ],
    // jsorder: "sync",
    enabled: function(player, opts) {
      return ((typeof this.options.file !== 'undefined' && this.options.file.match(/\/Manifest(\?|$)/))
        || (typeof this.options.sources !== 'undefined' && this.options.sources.find(function(a) {
          return typeof a.file !== 'undefined' && a.file.match(/\/Manifest(\?|$)/);
        })))
        && !this.isMp3Podcast()
        && (!this.isDashDrm() || bowser.msie || bowser.msedge)
        || (this.hasDash() && (bowser.msie || bowser.msedge));
    },
    init: function(player) {
      return false;
    }
  },
  // CHROMECAST PLUGIN
  {
    name: 'chromecast',
    js: [
      path + 'chromecast/cast_sender.js?loadCastFramework=1&v=' + JSVersion,
      // '//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1&v=' + JSVersion,
      path + 'videojs-schromecast/silvermine-videojs-chromecast.min.js?v=' + JSVersion
    ],
    jsorder: 'defer',
    css: [
      path + 'videojs-schromecast/videojs.chromecast.min.css?v=' + JSVersion
    ],
    enabled: function(player) {
      return document.location.protocol === 'https:'
        && player.options_.techOrder.indexOf('chromecast') > -1
        && !this.isMp3Podcast();
    },
    init: function(player) {
      var opts = this.options.chromecast || { receiverAppID: '385CEAF7' };
      player.chromecast(opts);
      return false;
    }
  },
  // AIRPLAY PLUGIN
  {
    name: 'airplay',
    js: [
      path + 'videojs-sairplay/silvermine-videojs-airplay.min.js?v=' + JSVersion
    ],
    css: [
      path + 'videojs-sairplay/videojs.airplay.css?v=' + JSVersion
    ],
    enabled: function() {
      return (bowser.safari || bowser.ios)
        && !this.isMp3Podcast() && this.isHLSource();
    },
    init: function(player) {
      player.airPlay({});
      return false;
    }
  },
  // DESIGN STUDIO PLUGIN
  {
    name: 'design',
    js: [
      path + 'videojs-design-studio/videojs-design-studio.min.js?v=' + JSVersion
    ],
    css: [],
    enabled: function() {
      return (typeof this.options.logo !== 'undefined' ||
        typeof this.options.designStudio !== 'undefined')
        // disable design studio for mp3 podcast mode
        // in order to override progress colors without struggling with
        // !important
        && !this.isMp3Podcast();
    },
    init: function(player) {
      var myDesignStudio_Logo = '';
      var myDesignStudio_HideLogo = false;
      var myDesignStudio_Link = '';
      var myDesignStudio_Position = '';
      var myDesignStudio_LogoMargin = '';

      var myDesignStudio_Primary = '';
      var myDesignStudio_Highlight = '';
      var myDesignStudio_Background = '';
      var myDesignStudio_ThumbContainerBG = '';
      var myDesignStudio_PlayProgressColor = '';
      var myDesignStudio_LoadProgressColor = '';
      var myDesignStudio_ProgressHolderColor = '';

      if (this.options.logo != undefined) {
        myDesignStudio_Logo = this.options.logo ? this.options.logo.file : '';
        if (myDesignStudio_Logo) {
          myDesignStudio_HideLogo = this.options.logo.hide || false;
          myDesignStudio_Link =  this.options.logo.link || '';
          myDesignStudio_Position = this.options.logo.position || 'top-right';
          myDesignStudio_LogoMargin = this.options.logo.margin || '';
        }
        if (this.options.designStudio != undefined) {
          myDesignStudio_Primary = this.options.designStudio.primary || '';
          myDesignStudio_Highlight = this.options.designStudio.highlight || '';
          myDesignStudio_Background = this.options.designStudio.background || '';
          myDesignStudio_ThumbContainerBG = this.options.designStudio.thumbContainerBG || '';
          myDesignStudio_PlayProgressColor = this.options.designStudio.playProgressColor || '';
          myDesignStudio_LoadProgressColor = this.options.designStudio.loadProgressColor || '';
          myDesignStudio_ProgressHolderColor = this.options.designStudio.progressHolderColor || '';
        }
      } else if (this.options.designStudio != undefined) {
        myDesignStudio_Logo = this.options.designStudio.logo || '';
        if (myDesignStudio_Logo) {
          myDesignStudio_HideLogo = this.options.designStudio.hideLogo || false;
          myDesignStudio_Link =  this.options.designStudio.link || '';
          myDesignStudio_Position = this.options.designStudio.position || 'top-right';
          myDesignStudio_LogoMargin = this.options.designStudio.logoMargin || '';
        }
        myDesignStudio_Primary = this.options.designStudio.primary || '';
        myDesignStudio_Highlight = this.options.designStudio.highlight || '';
        myDesignStudio_Background = this.options.designStudio.background || '';
        myDesignStudio_ThumbContainerBG = this.options.designStudio.thumbContainerBG || '';
        myDesignStudio_PlayProgressColor = this.options.designStudio.playProgressColor || '';
        myDesignStudio_LoadProgressColor = this.options.designStudio.loadProgressColor || '';
        myDesignStudio_ProgressHolderColor = this.options.designStudio.progressHolderColor || '';
      }
      player.designStudio({
        logo: myDesignStudio_Logo,
        hideLogo: myDesignStudio_HideLogo,
        link: myDesignStudio_Link,
        position: myDesignStudio_Position,
        logoMargin: myDesignStudio_LogoMargin,
        primary: myDesignStudio_Primary,
        highlight: myDesignStudio_Highlight,
        background: myDesignStudio_Background,
        thumbContainerBG: myDesignStudio_ThumbContainerBG,
        playProgressColor: myDesignStudio_PlayProgressColor,
        loadProgressColor: myDesignStudio_LoadProgressColor,
        progressHolderColor: myDesignStudio_ProgressHolderColor
      });
    }
  },
  // SHARE PLUGIN
  {
    name: 'share',
    js: [
      path + 'videojs-share/videojs-share.min.js?v=' + JSVersion
    ],
    forceReinit: true, // for multiply player instances and correct recreation after disposal
    css: [
      path + 'videojs-share/videojs-share.min.css?v=' + JSVersion
    ],
    enabled: function() {
      return !this.isMp3() || (this.isMp3Podcast() && this.options.podcast.enableShare);
    },
    init: function(player) {
      var shareOptions = {
        socials: [
          'fbButton',
          'tw',
          'messenger',
          'linkedin',
          'telegram',
          'whatsapp',
          'viber',
          'vk',
          'ok',
          'mail'
        ],
        url: document.referrer || window.location.href,
        title: '',
        description: '',
        showEmbed: false,
        image: '',
        isVkParse: true
      };

      if (isADefinedProperty(this.options.sharing) && typeof this.options.sharing === 'string') {
        shareOptions.url = this.options.sharing;
      }
      if (Array.isArray(this.options.sharingSocials)) {
        if (this.options.sharingSocials.length) {
          this.options.sharingSocials = this.options.sharingSocials.filter(function(social) {
            return typeof social === 'string';
          });
        }
        shareOptions.socials = this.options.sharingSocials;
      }

      player.share(shareOptions);

      return false;
    }
  },
  // CHECK ADBLOCKER PLUGIN
  {
    name: 'adblocker',
    js: [
      path + 'blockadblock.min.js?v=' + JSVersion
    ],
    css: [],
    enabled: function() {
      return (typeof this.options.adblocker === 'undefined' || this.options.adblocker)
        && typeof this.options.advertising !== 'undefined'
        && this.options.advertising !== {} && this.options.advertising !== ''
        && this.options.advertising != null;
    },
    init: function(player) {
      // Recommended audit because AdBlock lock the file 'blockadblock.js'
      // If the file is not called, the variable does not exist 'blockAdBlock'
      // This means that AdBlock is present
      var this_ = this;
      if (typeof blockAdBlock === 'undefined') {
        (adBlockDetected.bind(this))(player);
        return false;
      }
      blockAdBlock.setOption({
        checkOnLoad: false,
        resetOnEnd: true
      });
      blockAdBlock.onDetected(function() {
        (adBlockDetected.bind(this_))(player);
      });
      blockAdBlock.check(false);

      return false;
    }
  },
  // ADS plugin
  {
    name: 'ads',
    order: 1, // this plugin redispatch for all events so we have to include it first
    js: [
      function() {
        return (!!this.options.advertising && !!this.options.advertising.js && this.options.advertising.js.imaSdk) || 'https://imasdk.googleapis.com/js/sdkloader/ima3.js';
      },
      function() {
        return (!!this.options.advertising && !!this.options.advertising.js && this.options.advertising.js.videojsContribAds) || (path + 'videojs-contrib-ads/videojs.ads.min.js?v=' + JSVersion);
      },
      function() {
        return (!!this.options.advertising && !!this.options.advertising.js && this.options.advertising.js.videojsIma) || (path + 'videojs-ima/videojs.ima.js?v=' + JSVersion);
      }
    ],
    // Disabled when we get Error from Edge browser 'videojs-contrib-ads has
    // not seen a loadstart event 5 seconds after being initialized' jsorder:
    // "defer",
    jsorder: 'defer',
    css: [
      path + 'videojs-contrib-ads/videojs.ads.css?v=' + JSVersion,
      path + 'videojs-ima/videojs.ima.min.css?v=' + JSVersion,
      function() {
        return this.isMp3Podcast()
          ? path + 'videojs-mp3-podcast/videojs.mp3-podcast.ima.min.css?v=' + JSVersion
          // ? path + 'videojs-mp3-podcast/scss/videojs.mp3-podcast.ima.css?v=' + JSVersion
          : false;
      }
    ],
    enabled: function(player, opts) {
      return isNotAnEmptyObject(this.options.adschedule) || (isNotAnEmptyObject(this.options.advertising) &&
        (this.options.advertising.schedule || this.adListenerConfigured()));
    },
    init: function(player) {

      var scope_ = this;
      // initialize ima plugin
      var imaOptions = {
        id: player.el_.id,
        debug: this.options.debug,
        forceNonLinearFullSlot: true,
        disableCustomPlaybackForIOS10Plus: true,
        adsRenderingSettings: {
          //enablePreloading: true,
          loadVideoTimeout: 15000
        },
        //adsWillAutoplay: true,
        //adsWillPlayMuted: true,
        //vpaidAllowed: true,
        vpaidMode: 'ENABLED',
        contribAdsSettings: {
          timeout: 15000,
          prerollTimeout: 5000,
          postrollTimeout: 5000
        },
        showCountdown: !this.isMp3Podcast()
      };
      if (isNotAnEmptyObject(this.options.advertising) && this.options.advertising.admessage) {
        imaOptions.adLabel = this.options.advertising.admessage;
      }

      player.loadSchedule = function(schedule, adTypes) {
        function formatTime(time) {
          var hours = Math.floor(time / 3600);
          var minutes = Math.floor((time - (hours * 3600)) / 60);
          var seconds = time - (hours * 3600) - (minutes * 60);

          if (hours < 10) {
            hours = '0' + hours;
          }
          if (minutes < 10) {
            minutes = '0' + minutes;
          }
          if (seconds < 10) {
            seconds = '0' + seconds;
          }
          return hours + ':' + minutes + ':' + seconds;
        }

        if (typeof schedule === 'string') {
          return { adTagUrl: schedule };
        }
        this.adstate = {
          inventory: {},
          lastTime: 0
        };
        var vmap = '<?xml version="1.0" encoding="UTF-8"?><vmap:VMAP xmlns:vmap="http://www.iab.net/videosuite/vmap" version="1.0">';
        var vmapLength = 0;
        for (var adIdx in schedule) {
          if (adTypes && adTypes.length &&
            adTypes.indexOf(schedule[adIdx].offset) === -1) {
            continue;
          }
          if (isNumeric(schedule[adIdx].offset)) {
            this.adstate.inventory.mid = this.adstate.inventory.mid
              ? this.adstate.inventory.mid
              : {};
            this.adstate.inventory.mid[schedule[adIdx].offset] = this.adstate.inventory.mid[schedule[adIdx].offset]
              ? this.adstate.inventory.mid[schedule[adIdx].offset]
              : [];
            this.adstate.inventory.mid[schedule[adIdx].offset].push(
              { tag: schedule[adIdx].tag });
          } else {
            var schedOffset = schedule[adIdx].offset === 'pre' ? 'start' : 'end';
            var schedType = schedule[adIdx].offset === 'pre'
              ? 'preroll'
              : 'postroll';
            vmap += '<vmap:AdBreak timeOffset="' + schedOffset +
              '" breakType="linear" breakId="' + schedType +
              '"><vmap:AdSource id="' + schedType + '-ad-' + adIdx +
              '" allowMultipleAds="true" followRedirects="true"><vmap:AdTagURI templateType="vast3"><![CDATA[' +
              schedule[adIdx].tag +
              ']]></vmap:AdTagURI></vmap:AdSource></vmap:AdBreak>';
            vmapLength++;
          }
        }
        vmap += '</vmap:VMAP>';
        return vmapLength ? { adsResponse: vmap } : {};
      };

      if (isNotAnEmptyObject(this.options.advertising) && isNotAnEmptyObject(this.options.advertising.schedule)) {
        player.adschedule = player.loadSchedule(this.options.advertising.schedule);
        // Object.assign(imaOptions, player.adschedule);
        if (player.adschedule.adsResponse) {
          player.one('play', function() {
            this.changeAdsResponse(this.adschedule.adsResponse);
            player.ima.requestAds();
          });
        }
        player.adschedule.source = this.options.advertising.schedule;
      }

      player.ima(imaOptions);

      player.ima.changeAdsResponse = function(adsResponse) {
        this.controller.reset();
        this.controller.settings.adTagUrl = undefined;
        this.controller.settings.adsResponse = adsResponse;
      };

      player.changeAdsResponse = function(adsResponse) {
        this.ima.changeAdsResponse(adsResponse);
      };

      if (bowser.ios && !navigator.platform.match(/linux/i)) {
        player.ima.controller.adUi.fullscreenDiv.style.display = 'none';
      }
      /**
       * Initializes the AdDisplayContainer. On mobile, this must be done as a
       * result of user action.
       */

      // chrome and firefox on win and android init container automatically

      if ((!bowser.chrome && !bowser.firefox) || bowser.ios) {
        // player.one('loadedmetadata', function() {
        // player.ima.initializeAdDisplayContainer();
        // });
        if (bowser.mobile) {
          player.one('touchend', function() {
            player.ima.initializeAdDisplayContainer();
          });
        } else {
          player.one('click', function() {
            player.ima.initializeAdDisplayContainer();
          });
        }
      }

      // play an ad, given an opportunity
      playAd = function(tag) {
        // tell videojs to load the ad
        player.ima.changeAdTag(tag);
        player.ima.requestAds();
      };

      player.on('adstart', function() {
        if (bowser.ios && !navigator.platform.match(/linux/i) &&
          this.isFullscreen()) {
          this.exitFullscreen();
          this.isForceExitFS = true;
        }
      });

      player.on(['adend', 'adskip'], function(event) {
        if (bowser.ios && !navigator.platform.match(/linux/i) &&
          this.isForceExitFS) {
          this.requestFullscreen();
          this.isForceExitFS = false;
        }
      });

      player.on(['adend', 'adskip', 'adtimeout', 'adserror'], function(event) {
        if (this.adstate) {
          this.adstate.midrollPlayed = false;
        }

        if (!isFinite(this.duration())) {
          this.play();
        }

      });

      player.on(['readyforpostroll'], function(event) {
        // Restore adsresponse if we override it by adTag when midroll played
        // (problem with postroll after midroll)
        if (this.tech_.name() === 'ChromecastSender') {
          return false;
        }
        if (player.ima && player.adschedule && player.adschedule.adsResponse &&
          player.adstate.inventory) {
          var cuttedSched = player.loadSchedule(player.adschedule.source,
            ['pos', 'post']);
          if (cuttedSched.adsResponse) {
            cuttedSched.adsResponse = cuttedSched.adsResponse.replace(
              /timeOffset="end"/ig, 'timeOffset="start"');
            player.ima.initializeAdDisplayContainer();
            player.ima.changeAdsResponse(cuttedSched.adsResponse);
            player.ima.requestAds();
          }
        }
      });

      // found available midrolls
      // if we haven't played a midroll already
      player.on(['timeupdate', 'adend', 'adskip', 'adtimeout', 'adserror'],
        function(event) {
          if (typeof this.adstate === 'undefined' ||
            this.adstate.midrollPlayed || !this.adstate.inventory.mid) {
            return;
          }
          if (this.tech_.name() === 'ChromecastSender') {
            return false;
          }
          var currentTime = this.currentTime(),
            opportunity,
            opIdx;
          if ('lastTime' in this.adstate) {
            for (var midIdx in this.adstate.inventory.mid) {
              if (currentTime > parseInt(midIdx)) {
                opportunity = this.adstate.inventory.mid[midIdx].shift();
                if (!this.adstate.inventory.mid[midIdx].length) {
                  delete this.adstate.inventory.mid[midIdx];
                }
                opIdx = midIdx;
                break;
              }
            }
          }
          this.adstate.lastTime = currentTime;
          if (opportunity) {
            if (scope_ && scope_.options && scope_.options.debug) {
              console.log('Start play midrol from sec ', opIdx);
            }
            this.adstate.midrollPlayed = parseInt(opIdx);
            playAd(opportunity.tag);
          }

        });

      player.on('ads-manager', function(response) {
        var adsManager = response.adsManager;
        adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, function(adEvent) {
          player.trigger({
            type: 'onadloaded',
            ad: adEvent.getAd().g
          });
        });
        adsManager.addEventListener(google.ima.AdEvent.Type.CLICK, function(adEvent) {
          player.trigger('onadclicked');
        });
        adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED, function(adEvent) {
          player.trigger('onadskipped');
        });
        adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, function(adEvent) {
          player.trigger('onadstarted');
        });
        adsManager.addEventListener(google.ima.AdEvent.Type.RESUMED, function(adEvent) {
          player.trigger('onadresumed');
        });
        adsManager.addEventListener(google.ima.AdEvent.Type.PAUSED, function(adEvent) {
          player.trigger('onadpaused');
        });
        adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, function(adEvent) {
          player.trigger('onadcompleted');
        });
        adsManager.addEventListener(google.ima.AdEvent.Type.AD_PROGRESS, function(adEvent) {
          player.trigger({
            type: 'onadprogress',
            progress: adEvent.getAdData()
          });
        });
      });

      if (this.isMp3Podcast()) {
        var skipButton;
        var timeout;
        var manager;

        var createSkipButton = function(config) {
          var currentAd = manager.getCurrentAd();
          if (!currentAd.isLinear() || manager.getAdSkippableState() || !(currentAd.g && currentAd.g.skippable)) {
            return null;
          }

          var target = player.el().querySelector(config.target);
          var button = document.createElement('BUTTON');
          button.classList.add(config.class);
          button.disabled = true;
          button.innerHTML = '<span>' + currentAd.g.skipTimeOffset + '</span> <span class="removable">seconds</span>';
          target.appendChild(button);

          return button;
        };

        var updateSkipButton = function(button) {
          if (button && button.disabled) {
            var timeLeft = button.querySelector('span') ? parseInt(button.querySelector('span').innerText, 10) : 0;

            if (timeLeft < 1) {
              button.disabled = false;
              button.innerHTML = 'Skip <span class="removable">Ad</span>';
              button.addEventListener('click', function() {
                manager.skip();
              }, { once: true });
              clearTimeout(timeout);
            } else {
              timeout = setTimeout(function() {
                button.querySelector('span').innerText = (timeLeft - 1).toString();
                updateSkipButton(button);
              }, 1000);
            }
          }
        };

        var removeSkipButton = function(button) {
          if (button) {
            clearTimeout(timeout);
            button.parentNode.removeChild(button);
          }
        };

        player.on('onadstarted', function() {
          manager = player.ima.getAdsManager();
          skipButton = createSkipButton({
            target: '.ima-controls-div',
            class: 'ima-skip-button'
          });
          updateSkipButton(skipButton);

          if (!bowser.msie) {
            var volumeSlider = player.el().querySelector('.ima-slider-level-div');
            if (volumeSlider) {
              var input = document.createElement('INPUT');
              input.type = 'range';
              input.min = 0;
              input.max = 10;
              input.value = manager.getVolume() * 10;
              input.classList.add('ima-slider-level-range');
              volumeSlider.parentElement.appendChild(input);
              volumeSlider.parentElement.removeChild(volumeSlider);
              input.addEventListener('change', function(e) {
                var value = parseInt(e.target.value, 10) / 10;
                manager.setVolume(value);
              });
            }
          }
        });

        player.on('onadpaused', function() {
          skipButton && clearTimeout(timeout);
        });

        player.on('onadresumed', function() {
          updateSkipButton(skipButton, manager);
        });

        player.on('onadskipped', function() {
          removeSkipButton(skipButton);
        });

        player.on('onadcompleted', function() {
          removeSkipButton(skipButton);
        });

        player.on('podcastready', function() {
          var elementsWithBG = player.el().querySelectorAll('.ima-play-pause-div, .ima-progress-div, .ima-mute-div, .ima-slider-level-div');
          for (var i = 0; i < elementsWithBG.length; i++) {
            elementsWithBG[i].style.backgroundColor = player.options().podcast.themeColor;
          }
        });

        var countdownPassed = document.createElement('DIV');
        countdownPassed.classList.add('ima-countdown-passed');
        countdownPassed.innerText = '00:00';
        var countdownLeft = document.createElement('DIV');
        countdownLeft.classList.add('ima-countdown-left');
        countdownLeft.innerText = '-00:00';
        var controlBar = player.el()
          .querySelector('.ima-controls-div');
        controlBar.appendChild(countdownPassed);
        controlBar.appendChild(countdownLeft);
        if (this.options.podcast.direction && this.options.podcast.direction === 'rtl') {
          controlBar.dir = 'rtl';
        }
        var adPosition = document.createElement('DIV');
        adPosition.classList.add('ima-ad-position');
        adPosition.innerText = 'Ad';
        controlBar.querySelector('.ima-seek-bar-div').appendChild(adPosition);

        function formatSeconds(seconds) {
          var h = Math.floor(seconds / 3600);
          var min = Math.floor((seconds - (h * 3600)) / 60);
          var sec = Math.floor(seconds - (h * 3600) - (min * 60));
          return (h ? (h.toString().padStart(2, '0') + ':') : '') +
            min.toString().padStart(2, '0') + ':' +
            sec.toString().padStart(2, '0');
        }

        player.on('onadprogress', function(e) {
          var currentTime = e.progress.currentTime;
          var timeLeft = e.progress.duration - currentTime;
          countdownPassed.innerText = formatSeconds(currentTime);
          countdownLeft.innerText = '-' + formatSeconds(timeLeft);
          if (e.progress.totalAds > 1) {
            adPosition.innerHTML = 'Ad ' + e.progress.adPosition + ' of ' + e.progress.totalAds;
          }
        });
      }

      return false;
    }
  },
  // PLAYLIST PLUGIN
  {
    name: 'playlist',
    js: [
      path + 'videojs-playlist/videojs-playlist.min.js?v=' + JSVersion,
      path + 'videojs-playlist-ui/videojs-playlist-ui.min.js?v=' + JSVersion
    ],
    css: [
      path + 'videojs-playlist-ui/videojs-playlist-ui.vertical.css?v=' + JSVersion
    ],
    forceReinit: true, // for multiply player instances and correct recreation after disposal
    enabled: function() {
      return this.options.playlist && !this.isMp3Podcast();
    },
    init: function(player) {
      var MenuButton = videojs.getComponent('Button');
      var PlaylistMenuButton = videojs.extend(MenuButton, {
        constructor: function(player, options) {
          MenuButton.call(this, player, options);
          videojs.dom.addClass(this.el(), 'vjs-playlist-menu');
          videojs.dom.addClass(this.el().firstChild, 'vjs-icon-chapters');
          this.controlText('Playlist');
        }
      });
      PlaylistMenuButton.prototype.handleClick = function() {
        var menu = player.getChild('VideoJsPlaylist').el_;
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
      };

      videojs.registerComponent('PlaylistMenuButton', PlaylistMenuButton);
      var Component = videojs.getComponent('Component');
      var videoJsPlaylist = videojs.extend(Component, {
        constructor: function(player, options) {
          Component.call(this, player, options);
          videojs.dom.addClass(this.el(), 'vjs-playlist');
        }
      });

      videojs.registerComponent('VideoJsPlaylist', videoJsPlaylist);
      player.addChild('VideoJsPlaylist');

      var menuButton = new PlaylistMenuButton(player, {});
      player.controlBar.playlistmenu = player.controlBar.el_.insertBefore(
        menuButton.el_, player.controlBar.getChild('fullscreenToggle').el_);
      player.controlBar.playlistmenu.dispose = function() {
        this.parentNode.removeChild(this);
      };

      var opts = this.options;
      var pltimeout = 5000;

      player.one('play', function() {
        if (!!opts.loop) {
          this.playlist.repeat(true);
        }

        // initial auto-advance
        if (this.upnext) {
          this.playlist.autoadvance(pltimeout);
        } else {
          this.playlist.autoadvance(0);
        }
      });


      player.on('playlistitem', function(event, currentItem) {
        var currentIndex = this.playlist.indexOf(currentItem);
        var firstPlaylistStart = this.playlist.indexOf(currentItem) < 1;

        this.player_.poster(opts.playlist[currentIndex].image || '');

        if (typeof this.kwikStat !== 'undefined') {
          this.kwikStat.init(currentItem.mediaid);
          if (!firstPlaylistStart) {
            this.kwikStat.initPageView(this.currentSrc(), true);
            this.one('timeupdate', function() {
              this.kwikStat.trackEvent('firstplay');
            });
          }
        }

        var playlist_ = this.playlist;
        this.upnext({
          timeout: pltimeout,
          headText: 'Up Next',
          cancelText: 'Cancel',
          getTitle: function() {
            var nextItem = opts.playlist[currentIndex + 1] || opts.playlist[0];
            return (nextItem && nextItem.title) || '';
          },
          next: function() {
            playlist_.next();
            var container = this.player_.el().querySelector('.vjs-upnext-content');
            container.parentElement.removeChild(container);
          }
        });

        if (typeof this.ads === 'undefined') {
          // no need parse ads
          return false;
        }
        // load advertizement
        if (typeof currentItem.advertising !== 'undefined' &&
          typeof currentItem.advertising.schedule !== 'undefined') {
          var sched = this.loadSchedule(currentItem.advertising.schedule);
          if (sched && sched.adsResponse) {
            this.ima.changeAdsResponse(sched.adsResponse);
          }
          if (sched && sched.adTagUrl) {
            this.ima.changeAdTag(sched.adTagUrl);
          }
          if (sched && (sched.adsResponse || sched.adTagUrl)) {
            this.ima.requestAds();
          }
        } else {
          this.loadSchedule({});
        }
      });

      return false;
    }
  },
  // Parser for m3u8s
  {
    name: 'hls-parser',
    js: [
      path + 'hls-parser/hls-parser.min.js?v=' + JSVersion
    ],
    enabled: function(player) {
      return (bowser.ios || bowser.mac) && !navigator.platform.match(/linux/i) &&
        this.isHLSource() && this.hasNativeHlsSupport();
    },
    init: function(player) {
      // will be inited later in the code
      return false;
    }
  },
  // DVRUX PLUGIN
  {
    name: 'dvrux',
    js: [
      path + 'videojs-dvr/videojs-dvr.min.js?v=' + JSVersion
    ],
    css: [
      path + 'videojs-dvr/videojs-dvr.css?v=' + JSVersion
    ],
    enabled: function(player, opts) {
      return this.hasDvrConfig() && !this.isMp3Podcast();
    },
    init: function(player) {
      player.dvr();
      return false;
    }
  },
  // RESUME PLUGIN
  {
    name: 'resume',
    js: [
      path + 'videojs-resume/videojs-resume.min.js?v=0.3'
    ],
    css: [
      path + 'videojs-resume/videojs-resume.min.css'
    ],
    enabled: function() {
      return this.options.resume
        && !this.isMp3()
        && this.options.mediaid && this.options.mediaid !== '';
    },
    init: function(player) {
      if (this.options.mediaid) {
        for (var plidx in pluginList) {
          if (pluginList[plidx].name === 'resume') {
            var resume = player.Resume(
              pluginList[plidx].opts(player, this.options.mediaid));
            if (resume && resume > 2) {
              // disable autoplay
              this.options.autostart = false;
            }
          }
        }
      }
      return false;
    },
    opts: function(player, mediaid) {
      var userLang = navigator.language || navigator.userLanguage;
      var isArabian = userLang.match(/^ar(_|-|$)/i);
      return {
        uuid: mediaid,
        playbackOffset: 0, // begin playing video this number of seconds before
                           // it otherwise would.
        title: ' ',
        resumeButtonText: !isArabian
          ? 'Resume watching from where you left?'
          : 'متابعة المشاهدة',
        cancelButtonText: !isArabian
          ? 'Watch from beginning?'
          : 'إعادة المشاهدة من البداية'
      };
    }
  },
  // UPNEXT PLUGIN
  {
    name: 'upnext',
    js: [
      path + 'videojs-upnext/videojs-upnext.min.js'
    ],
    css: [
      path + 'videojs-upnext/videojs-upnext.css'
    ],
    enabled: function() {
      return this.options.playlist && this.options.playlist.length &&
        !this.isMp3() &&
        (typeof this.options.upnext === 'undefined' || this.options.upnext);
    },
    init: function(player) {
      return false;
    }
  },
  // PERSIST VOLUME PLUGIN
  {
    name: 'persistvolume',
    js: [
      path + 'videojs-persistvolume/videojs.persistvolume.min.js'
    ],
    css: [],
    enabled: function() {
      return !this.isMp3Podcast();
    },
    init: function(player) {
      player.persistvolume({
        namespace: 'kwikplayer-volume'
      });
      return false;
    }
  },
  {
    name: 'bigpausebutton',
    forceReinit: true, // for multiply player instances and correct recreation after disposal
    js: [
      path + 'videojs-pause-button/videojs-bigpausebutton.min.js'
    ],
    css: [
      path + 'videojs-pause-button/videojs-pause-button.min.css'
    ],
    enabled: function() {
      return !this.isMp3Podcast();
    },
    init: function(player) {
      player.bigpausebutton();
      return false;
    }
  },
  {
    name: 'bigunmutebutton',
    forceReinit: true, // for multiply player instances and correct recreation after disposal
    js: [
      path + 'videojs-unmute-button/videojs-bigunmutebutton.min.js'
    ],
    css: [
      path + 'videojs-unmute-button/videojs-bigunmutebutton.css'
    ],
    enabled: function() {
      return !this.isMp3Podcast();
    },
    init: function(player) {
      player.bigunmutebutton();
      return false;
    }
  },
  {
    name: 'canautoplay',
    js: [
      path + 'can-autoplay/can-autoplay.min.js'
    ],
    enabled: function() {
      return true;
    },
    init: function(player) {
      return false;
    }
  },
  {
    name: 'soap',
    forceReinit: true, // for multiply player instances and correct recreation after disposal
    js: [
      path + 'videojs-soap/v2/videojs-soap.min.js'
    ],
    css: [
      path + 'videojs-soap/v2/videojs-soap.min.css'
    ],
    enabled: function() {
      return !bowser.msie && !!this.options.series && !this.isMp3Podcast();
    },
    init: function(player) {
      player.soap({
        url: this.options.series,
        designStudio: this.options.designStudio
      });
      return false;
    }
  },
  {
    name: 'hotspots',
    forceReinit: true, // for multiply player instances and correct recreation after disposal
    js: [
      path + 'videojs-hotspots/videojs-hotspots.min.js'
    ],
    css: [
      path + 'videojs-hotspots/videojs-hotspots.css',
      function() {
        var bNeedFont = false;
        for (var idx = 0; idx < this.options.hotspots.length; idx++) {
          if (this.options.hotspots[idx].ico) {
            bNeedFont = true;
          }
        }
        return bNeedFont
          ? path + 'videojs-hotspots/fonts/hotspotfont.css'
          : false;
      }
    ],
    enabled: function() {
      return !!this.options.hotspots && !this.isMp3Podcast();
    },
    init: function(player) {
      player.hotspots({ hotspots: this.options.hotspots });
      return false;
    }
  },
  {
    name: 'hotspotseditor',
    forceReinit: true, // for multiply player instances and correct recreation after disposal
    js: [
      path + 'videojs-hotspots/videojs-hotspot-editor.min.js'
    ],
    css: [
      path + 'videojs-hotspots/videojs-hotspots.css'
    ],
    enabled: function() {
      return !!this.options.hotspotEditor && !this.isMp3Podcast();
    },
    init: function(player) {
      player.hotspotEditor(this.options.hotspotEditor);
      return false;
    }
  },
  {
    name: 'custombutton',
    forceReinit: true, // for multiply player instances and correct recreation after disposal
    js: [
      path + 'videojs-cc-button/v2/videojs-custom-control-button.min.js'
    ],
    css: [
      function() {
        return this.options.ccbutton.css;
      }
    ],
    enabled: function() {
      return !!this.options.ccbutton && !this.isMp3Podcast();
    },
    init: function(player) {
      player.customControlButton(this.options.ccbutton);
      return false;
    }
  },
  // Stat analytics plugin for analytics.kwikmotion.com
  {
    name: 'stat',
    forceReinit: true, // for multiply player instances and correct recreation after disposal
    order: 2,
    js: [
      path + 'videojs-stat/videojs-kwikstat.min.js?ver=0.3'
    ],
    css: [],
    enabled: function() {
      return typeof this.options.stat === 'undefined' || !!this.options.stat;
    },
    init: function(player) {
      this.options.stat = typeof this.options.stat === 'undefined'
        ? {}
        : this.options.stat;
      if (this.options.mediaid) {
        this.options.stat.mediaId = this.options.mediaid;
      }
      if (this.options.userid) {
        this.options.stat.userId = this.options.userid;
      }
      player.kwikstat(this.options.stat);
    }
  },
  {
    name: 'titlebar',
    forceReinit: true, // for multiply player instances and correct recreation after disposal
    js: [
      path + 'videojs-titlebar/videojs-title-bar.min.js'
    ],
    css: [
      path + 'videojs-titlebar/videojs-title-bar.css'
    ],
    enabled: function() {
      return typeof this.options.title !== 'undefined' && !this.isMp3Podcast() && !this.options.playlist;
    },
    init: function(player) {
      player.titleBar({ title: this.options.title });
      return false;
    }
  },
  {
    name: 'drm',
    order: 0,
    js: [
      path + 'videojs-contrib-eme/v3.7.1/videojs-contrib-eme.min.js'
    ],
    css: [],
    enabled: function() {
      return typeof this.options.drm !== 'undefined' &&
        typeof this.options.drm.license !== 'undefined';
    },
    init: function(player) {
      player.eme();
      return false;
    }
  },
  {
    name: 'streamdecrypter',
    js: [
      path + 'videojs-stream-decrypter/videojs-stream-decrypter.min.js?v0.1'
    ],
    css: [],
    enabled: function() {
      return typeof this.options.aes !== 'undefined';
    },
    init: function(player) {
      return false;
    }
  },
  {
    name: 'viewable',
    js: [
      path + 'videojs-viewable/videojs-viewable.min.js'
    ],
    css: [],
    enabled: function() {
      return typeof this.options.viewable !== 'undefined' &&
        this.options.viewable;
    },
    init: function(player) {
      player.viewable();
      return false;
    }
  },
  // IMA DAI SDK
  // https://developers.google.com/interactive-media-ads/docs/sdks/html5/dai
  {
    name: 'imadai',
    order: 5,
    js: [
      // 'https://imasdk.googleapis.com/js/sdkloader/ima3_dai.js',
      path + 'videojs-imadai/ima3_dai.min.js',
      path + 'videojs-imadai/videojs.imadai.min.js?v=' + JSVersion
      // path + 'videojs-imadai/videojs.imadai.js?v=' + JSVersion,
    ],
    css: [],
    enabled: function() {
      return this.isImaDai() && !this.isMp3();
    },
    init: function(player) {
      player.imadai(Object.assign({}, { outerId: this.options.videoId },
        { debug: this.options.debug }, this.options.imadai));
      return false;
    }
  },
  // Picture In Picture button
  {
    name: 'pipbutton',
    forceReinit: true, // for multiply player instances and correct recreation after disposal
    js: [
      path + 'videojs-pip/videojs.pip.min.js?v=' + JSVersion
    ],
    css: [],
    enabled: function() {
      return !this.isMp3() && (!bowser.mobile || bowser.ios && bowser.version >= 14)
        && (bowser.chrome || bowser.safari);
    },
    init: function(player) {
      player.pip();
      return false;
    }
  },
  // MP3 podcast mode
  {
    name: 'mp3-podcast',
    forceReinit: true, // for multiply player instances and correct recreation after disposal
    js: [
      path + 'videojs-mp3-podcast/videojs.mp3-podcast.min.js?v=' + JSVersion
    ],
    css: [
      path + 'videojs-mp3-podcast/videojs.mp3-podcast.min.css?v=' + JSVersion
    ],
    enabled: function() {
      // no check for file format here, because it's realized later in plugin
      return this.isPodcast();
    },
    init: function(player) {
      var file = '';
      if (this.options.sources && this.options.sources.length) {
        file = this.options.sources[0].file;
      } else if (this.options.file) {
        file = this.options.file;
      }
      player.mp3Podcast(Object.assign(
        {},
        { outerId: this.options.videoId },
        { type: this.options.type },
        { file: file },
        { debug: this.options.debug },
        { title: this.options.title }, // if exists in podcast settings, this
        // one will be overwritten
        this.options.podcast));
      player.trigger('podcastready');
      return false;
    }
  },
  // FairPlay
  {
    name: 'fairplay',
    js: [
      path + 'videojs-fairplay/videojs.fairplay.min.js?v=' + JSVersion,
      path + 'videojs-fairplay/videojs-fairplay.js?v=' + JSVersion
    ],
    css: [],
    enabled: function() {
      return this.isFairPlay();
    },
    init: function(player) {
      player.fairplay(Object.assign(
        {},
        { debug: this.options.debug },
        this.options.fairplay));
      return false;
    }
  },
  // https://github.com/videojs/videojs-playbackrate-adjuster
  {
    name: 'playbackrate',
    forceReinit: true, // for multiply player instances and correct recreation after disposal
    js: [
      path + 'videojs-playbackrate-adjuster/videojs-playbackrate-adjuster.min.js?v=' + JSVersion
    ],
    css: [
      path + 'videojs-playbackrate-adjuster/videojs-playbackrate-adjuster.min.css?v=' + JSVersion
    ],
    enabled: function(player) {
      return this.canUsePlaybackRates();
    },
    init: function(player) {
      function togglePlaybackrateControl(i) {
        var playbackrateControl = player.el_ && player.el_.querySelector('.vjs-playback-rate.vjs-control');

        if (playbackrateControl) {
          player.one('timeupdate', function() {
            if (!isFinite(player.duration())) {
              playbackrateControl = removePlaybackrateControl(playbackrateControl);
            }
          });
          player.one('dvruxinited', function() {
            playbackrateControl = removePlaybackrateControl(playbackrateControl);
          });
        } else if (!i || i < 50) {
          setTimeout(function() {
            togglePlaybackrateControl((i || 0) + 1);
          }, 100);
        }
      }

      function removePlaybackrateControl(playbackrateControl) {
        if (playbackrateControl && playbackrateControl.parentNode) {
          playbackrateControl.parentNode.removeChild(playbackrateControl);
          return undefined;
        }
        return playbackrateControl;
      }

      togglePlaybackrateControl();
    }
  },
  {
    name: 'ad-listener',
    forceReinit: true, // for multiply player instances and correct recreation after disposal
    js: [
      path + 'videojs-ad-listener/videojs-ad-listener.js?v=' + JSVersion
    ],
    css: [],
    enabled: function(player) {
      return this.adListenerConfigured() && player.ima;
    },
    init: function(player) {
      player.adListener(this.options.advertising.listener);
      return false;
    }
  },
  // Default plugin template for copy-paste
  {
    name: 'test',
    js: [
      ''
    ],
    css: [],
    enabled: function(player) {
      return false;
    },
    init: function(player) {
      return false;
    }
  }
  // End copy-paste
];

function isADefinedProperty(property) {
  return typeof property !== 'undefined' && property !== '' && property !== null && property !== undefined;
}

function isNotAnEmptyObject(obj) {
  return isADefinedProperty(obj) && !!Object.keys(obj).length;
}

var startTime,
  endTime;

/** @description Determines the area of a circle that has the specified radius parameter.
 * @param {string} videoId The Id of Video.
 * @param {typeof options} options The Id of Video.
 */
function kwikMotionMain(videoId, opts, key, _path, _CustomCSSPath) {

  // fill internal properties
  this.el_ = document.getElementById(videoId);

  if (!isADefinedProperty(opts.file) && !isADefinedProperty(opts.sources)
    && isADefinedProperty(opts.playlist) && opts.playlist.length) {
    this.options = Object.assign({}, opts, opts.playlist[0]);
  } else {
    this.options = Object.assign({}, opts);
  }

  this.options.debug = (!(typeof opts.debug === 'undefined' || !opts.debug));
  this.options.videoId = videoId;
  this.playerId = videoId + '_itwplayer';
  this.CustomCSSPath = _CustomCSSPath;
  if (this.options.imadai) {
    if (this.options.imadai.live) {
      this.options.preload = 'none';
    }
    if (!this.options.sources && !this.options.file) {
      this.options.file = 'http://storage.googleapis.com/testtopbox-public/video_content/bbb/' +
        'master.m3u8';
    }
  }
  this.options.playbackRates = typeof opts.playbackRates !== 'undefined'
    ? opts.playbackRates
    : [0.5, 0.7, 1, 1.5, 2];

  // check conditions for plugin list
  this.isMp3 = function() {
    return this.options.type === 'mp3'
      || this.options.file && this.options.file.match(/\.mp3$/)
      || (isADefinedProperty(this.options.sources)
        && this.options.sources.length
        && this.options.sources[0].file
        && this.options.sources[0].file.match(/\.mp3$/));
  };
  this.isImaDai = function() {
    return isNotAnEmptyObject(this.options.imadai);
  };
  this.isPodcast = function() {
    return isADefinedProperty(this.options.podcast);
  };
  this.isMp3Podcast = function() {
    return this.isMp3() && this.isPodcast();
  };
  this.isHLSource = function() {
    return typeof this.options.file !== 'undefined'
      && this.options.file.match(/\.m3u8(\?|$)/)
      || typeof this.options.sources !== 'undefined'
      && this.options.sources.find(function(a) {
        return typeof a.file !== 'undefined' &&
          a.file.match(/\.m3u8(\?|$)/);
      });
  };
  this.hasFairPlayConfig = function() {
    return isNotAnEmptyObject(this.options.fairplay);
  };
  this.isFairPlay = function() {
    // return this.isHLSource() && this.hasFairPlayConfig();
    return this.isHLSource() && this.hasFairPlayConfig() && bowser.safari;
  };
  this.hasDvrConfig = function() {
    return (typeof this.options.file !== 'undefined' && this.options.file.match(/(\?|\&)DVR(\&|$)/))
      || (typeof this.options.sources !== 'undefined' && this.options.sources.find(function(a) {
        return typeof a.file !== 'undefined' &&
          a.file.match(/(\?|\&)DVR(\&|$)/);
      }));
  };
  this.hasDrmConfig = function() {
    return isNotAnEmptyObject(this.options.drm)
      && isADefinedProperty(this.options.drm.type)
      && isADefinedProperty(this.options.drm.license);
  };
  this.hasDash = function() {
    return (typeof this.options.file !== 'undefined' && this.options.file.match(/\.mpd(\?|$)/))
      || (typeof this.options.sources !== 'undefined' &&
        this.options.sources.find(function(a) {
          return typeof a.file !== 'undefined' &&
            a.file.match(/\.mpd(\?|$)/);
        }));
  };
  this.isDashDrm = function() {
    return this.hasDash() && this.hasDrmConfig() && !bowser.safari;
  };
  this.hasNativeHlsSupport = function() {
    // check native support
    var video = document.createElement('video');
    // HLS manifests can go by many mime-types
    var canPlay = [
      // Apple santioned
      'application/vnd.apple.mpegurl',
      // Apple sanctioned for backwards compatibility
      'audio/mpegurl',
      // Very common
      'audio/x-mpegurl',
      // Very common
      'application/x-mpegurl',
      // Included for completeness
      'video/x-mpegurl',
      'video/mpegurl',
      'application/mpegurl'
    ];
    for (var cplidx = 0; cplidx < canPlay.length; cplidx++) {
      // if one of this supported - browser has native HLS support
      if ((bowser.ios || bowser.mac) && !navigator.platform.match(/linux/i) && (/maybe|probably/i).test(video.canPlayType(canPlay[cplidx]))) {
        return canPlay[cplidx];
      }
    }
    return false;
  };
  this.initHlsParser = function(cb) {
    var i = 0;
    var player_ = this;

    function assignHlsParser() {
      if (typeof HlsParser !== 'undefined') {
        var url = '';
        if (player_.options.file) {
          url = player_.options.file;
        } else if (player_.options.sources && player_.options.sources.length) {
          url = player_.options.sources[0].file;
        }

        player_.hlsParser = new HlsParser(url);
        cb.bind(player_)();

      } else if (i < 25) {
        // try up to 2.5 secs till hlsParser initialization
        setTimeout(function() {
          i++;
          assignHlsParser();
        }, 100);
      }
    }

    assignHlsParser();
  };
  this.canUsePlaybackRates = function() {
    return (!this.isMp3Podcast() && !this.hasDvrConfig() && isADefinedProperty(this.options.playbackRates)
      && this.options.playbackRates.length && this.options.playbackRates.every(function(rate) {
        return parseFloat(rate);
      })) || (this.isMp3Podcast() && this.options.podcast.enableSpeed);
  };
  this.adListenerConfigured = function() {
    return isNotAnEmptyObject(this.options.advertising)
      && isNotAnEmptyObject(this.options.advertising.listener)
      && (isADefinedProperty(this.options.advertising.listener.button) ||
        isADefinedProperty(this.options.advertising.listener.json));
  };

  // methods
  this.embedVideoTags = function() {

    var divId = this.el_;
    var type = this.options.type;
    var tracks = this.options.tracks;
    if (this.options.playlist) {
      tracks = this.options.playlist[0].tracks;
    }
    var myTracks = '';

    if (this.isMp3()) {
      divId.innerHTML =
        '<div id= "' + this.options.videoId
        +
        '_dvMessage" style= "display: none; height: 50px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; margin: auto; text-align: center; color: white; font-size: 20px; max-width: 500px; width: 100%; font-family: Myriad Pro, Arial" >'
        + '    <span id="' + this.options.videoId
        +
        '_lblMessage">an error has occured or your browser is out of date please update</span>'
        + '</div >'
        + '<div class="dvJsPlayer" style="display: none; width: 100%;">'
        + '     <audio id= "' + this.playerId
        + '" class="video-js vjs-default-skin vjs-big-play-centered' +
        (this.isMp3Podcast() ? ' vjs-hidden' : '')
        + '" controls preload="' + (this.options.preload || 'auto')
        + '"  playsinline x-webkit-airplay="allow"       >'
        //+ '         <source src="' + this.options.file + '" type="audio/mp3"
        // />'
        + '   ' + myTracks
        + '     </audio >'
        + '</div>';
    } else if (tracks == null) {
      divId.innerHTML =
        '<div id= "' + this.options.videoId
        +
        '_dvMessage" style= "display: none; height: 50px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; margin: auto; text-align: center; color: white; font-size: 20px; max-width: 500px; width: 100%; font-family: Myriad Pro, Arial" >'
        + '    <span id="' + this.options.videoId
        +
        '_lblMessage">an error has occured or your browser is out of date please update</span>'
        + '</div >'
        + '<div class="dvJsPlayer" style="display: none; width: 100%;">'
        + '    <video id="' + this.playerId
        + '" class="video-js vjs-default-skin vjs-big-play-centered" preload="'
        + (this.options.preload || 'auto')
        + '" controls playsinline x-webkit-airplay="allow">'
        + '    </video>'
        + ' </div>';
    } else {
      divId.innerHTML =
        '<div id= "' + this.options.videoId
        +
        '_dvMessage" style= "display: none; height: 50px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; margin: auto; text-align: center; color: white; font-size: 20px; max-width: 500px; width: 100%; font-family: Myriad Pro, Arial" >'
        + '    <span id="' + this.options.videoId
        +
        '_lblMessage">an error has occured or your browser is out of date please update</span>'
        + '</div >'
        + '<div class="dvJsPlayer" style="display: none; width: 100%;">'
        + '    <video id="' + this.playerId
        + '" class="video-js vjs-default-skin vjs-big-play-centered" preload="'
        + (this.options.preload || 'auto')
        + '" controls playsinline x-webkit-airplay="allow" >'
        + '      ' + myTracks
        + '    </video>'
        + ' </div>';
    }

  };

  this.insideLoad = function() {
    var videojspath = (typeof this.options.videojs !== 'undefined')
      ? this.options.videojs
      : 'video.js-7.7.4';

    // load stylesheets
    loadStyleSheet(path + videojspath + '/video-js.min.css?v=' + JSVersion);

    if (this.CustomCSSPath) {
      loadStyleSheet(this.CustomCSSPath + '?v=' + JSVersion);
    } else if (this.options.CustomCSSPath) {
      loadStyleSheet(path + this.options.CustomCSSPath + '?v=' + JSVersion);
    } else {
      loadStyleSheet(path + 'videojs-custom.min.css?v=' + JSVersion);
    }

    if (this.options.type === 'mp3') {
      loadStyleSheet(path + 'videojs-audio.min.css?v=' + JSVersion);
    }

    var initialLoad = {
      'bowser': path + 'bowser.min.js?v=' + JSVersion,
      'videojs': path + videojspath + '/video.core.min.js?v=' + JSVersion
    };

    var scrCount = Object.keys(initialLoad).length,
      instance_ = this;

    (function(ins) {
      for (var scrIdx in initialLoad) {
        loadScript.bind(this)(initialLoad[scrIdx], function(url) {
          scrCount--;
          if (!scrCount) {
            setTimeout(function() {
              // execute in new flow (if script already loaded - it executes
              // immediately)
              construct.bind(ins)();
            }, 10);
          }
        }, 'defer', scrIdx); // changed from 'defer' after Edge error
      }
    })(instance_);
  };

  // Constructor
// JUST IGNORE KEY ITS ONLY FAKE
  ACCESS_KEY = key;
  path = _path;

  if (!Validate()) {
    return;
  }
  startTime = new Date();

  try {
    if (this.options.debug) {
      console.log('construction start');
    }
    if (videoId == undefined || videoId === '' || !this.el_) {
      console.error('Not all constructor parameters provided');
      return;
    }
    if (this.options === {} || this.options == undefined || this.options === '') {
      console.error('options not set; cannot initialize.');
    } else {
      this.embedVideoTags();
      this.insideLoad();
      if (this.options.debug) {
        console.log('construction done');
      }
      return this;
    }
  } catch (exp) {
    console.error('construction error', exp);
  }
}

function preparePlaylist(playlist) {
  var ret = [];
  for (var i = 0; i < playlist.length; i++) {
    var playlistItem = {
      mediaid: playlist[i].mediaid,
      name: playlist[i].title,
      sources: typeof playlist[i].sources !== 'undefined'
        ? playlist[i].sources.map(function(a) {
          return { src: a.file };
        })
        : [{ src: playlist[i].file }],
      thumbnail: playlist[i].image ? [{ src: playlist[i].image }] : undefined,
      tracks: playlist[i].tracks ? playlist[i].tracks : undefined
    };
    if (typeof playlist[i].adschedule !== 'undefined') {
      playlistItem.advertising = prepareAdSchedule(playlist[i].adschedule);
    }
    ret.push(playlistItem);
  }
  return ret;
}

function prepareAdSchedule(schedule) {
  Object.keys(schedule)
    .map(function(key, index) {
      schedule[key] = {
        'offset': schedule[key].offset,
        'tag': schedule[key].ad ? schedule[key].ad.tag : schedule[key].tag
      };
    });
  return { 'schedule': schedule };
}

function construct() {

  var playerOptions = {
    html5: {
      // HLS CONFIG. IT DOESN'T SWITCH ON HLS PLUGIN
      nativeTextTracks: EnableNativeTextTrack.bind(this)(),
      nativeAudioTracks: true, // important for audio tracks on Safari!
      nativeVideoTracks: false,
      hlsjsConfig: {
        aesSetup: this.options.aesSetup != undefined ? this.options.aesSetup : false,
        appendErrorMaxRetry: 5, // default: 3
        backBufferLength: 0, // default: Infinity
        // debug: !!this.options.debug,
        fragLoadingTimeOut: 60000, // default: 20000
        levelLoadingTimeOut: 60000, // default: 10000
        manifestLoadingMaxRetry: 2, // default: 1
        manifestLoadingTimeOut: 60000, // default: 10000
        maxMaxBufferLength: bowser.chrome && bowser.android ? 120 : 600, // default: 600
        nudgeMaxRetry: 5, // default: 3
        nudgeOffset: 0.3, // default: 0.1
      }
    },
    techOrder: getTech.bind(this)(),
    fluid: this.options.aspectratio != undefined ? true : false,
    poster: this.options.image,
    thumbnail: this.options.thumbnail,
    controls: this.options.controls == undefined ? true : this.options.controls,
    aspectRatio: this.options.aspectratio == undefined && this.options.width == undefined && this.options.height == undefined ? '16:9' : this.options.aspectratio,
    autostart: this.options.autostart, //we are managing autoplay byself with promises and don't use options.autoplay
    preload: this.options.preload != undefined ? this.options.preload : 'auto',
    imadai: this.options.imadai,
    podcast: this.options.podcast,
    fairplay: this.options.fairplay,
    playbackRates: this.canUsePlaybackRates() ? this.options.playbackRates : []
  };
  if (this.options.aes) {
    playerOptions.aes = this.options.aes;
  }
  if (this.options.levelswitch) {
    playerOptions.html5.hlsjsConfig.levelSwitchStrategy = this.options.levelswitch;
  }

  if (this.options.type === 'mp3') {
    // disable all the buttons when in podcast mode
    // options taken from list in preinitPlayer()
    if (this.isPodcast()) {
      playerOptions.controlBar = {
        volumePanel: !!this.options.podcast.volumeControl ? {
          inline: false
        } : false,
        currentTimeDisplay: false,
        timeDivider: false,
        durationDisplay: false,
        liveDisplay: false,
        remainingTimeDisplay: false,
        customControlSpacer: false,
        airPlayButton: false,
        chromeCastButton: false,
        ResolutionButton: false,
        fullscreenToggle: false,
        playbackRateMenuButton: false,
        chaptersButton: false,
        descriptionsButton: false,
        subsCapsButton: false,
        audioTrackButton: false
      };
    } else {
      // settings for simple mp3 mode
      playerOptions.controlBar = {
        fullscreenToggle: false
      };
    }
  } else {
    playerOptions.controlBar = {
      volumePanel: {
        inline: this.options.inlinevolume == undefined
          ? false
          : this.options.inlinevolume
      },
      fullscreenToggle: (this.options.usefullscreen == undefined
        ? true
        : this.options.usefullscreen)
    };
  }

  var selectedVtt = null,
    firstTimeReady = true;
  preinitPlayer();

  var scope_ = this,
    handlers = this.el_.kwikplayer.handlers;
  //if (this.options.chromecast) {
  // custom chromecast receiver
  playerOptions.chromecast = {
    requestCustomDataFn: function(source) {
      return scope_.options;
    }
  };
  //}
  // Create player instance
  this.el_.kwikplayer = videojs(this.playerId, playerOptions);
  var disposeFunc = this.el_.kwikplayer.dispose;

  this.el_.kwikplayer.dispose = function() {
    if (scope_ && scope_.el_ && scope_.el_.kwikplayer) {
      if (bowser.msie) {
        var keys = Object.keys(scriptPool);
        for (var i = 0; i < keys.length; i++) {
          document.getElementsByTagName('head')[0].removeChild(scriptPool[keys[i]]);
          console.log('script deleted (IE) - ' + Object.keys(scriptPool)[i]);
        }
        scriptPool = {};
      }

      var messageDiv = scope_.el_.querySelector('#' + scope_.el_.id + '_dvMessage');
      if (messageDiv) {
        messageDiv.innerHTML = '';
        messageDiv.style.zIndex = 0;
        messageDiv.style.display = 'none';
      }

      disposeFunc.call(scope_.el_.kwikplayer);
      delete scope_.el_.kwikplayer;
    }
  };

  // this.el_.kwikplayer.on(["dispose", "posterchange", "loadstart",
  //     "texttrackchange", "play", "pause", "ended", "volumechange",
  //     "controlsvisible", "timeupdate", "progress", "playing", "waiting",
  //     "durationchange", "loadedmetadata", "fullscreenchange", "ratechange",
  //     "ready", "error", "mousedown", "mousemove", "mouseup", "keydown", "keyup",
  //     "stageclick", "seeking", "seeked", "contentended", "readyforpreroll",
  //     "suspend", "abort", "emptied", "stalled", "loadeddata", "canplay",
  //     "canplaythrough", "resize", "firstplay", "loadedalldata",
  //     "contenttimeupdate", "addurationchange", "adcanplay", "nopreroll",
  //     "nopostroll", "contentchanged", "adsready", "adscanceled", "adskip",
  //     "adserror", "adtimeout", "ads-ad-started", "contentresumed",
  //     "readyforpostroll", "touchend", "adend", "chromecastConnected",
  //     "chromecastDisconnected", "chromecastDevicesAvailable",
  //     "chromecastDevicesUnavailable", "chromecastRequested"], function (e) {
  //     console.log(e.type)
  //     if (e.type === 'pause') {
  //         console.trace();
  //     }
  // })

  this.el_.kwikplayer.one('ready', function(e) {
    if (this.error() || !firstTimeReady) {
      // player ready after error
      return;
    }
    firstTimeReady = false;
    // Main waterfall for init all plugins, techs, etc.
    waterfall(
      [
        justifyPlayer.bind(this),
        registerSyncPlugins.bind(this),
        registerPlugins.bind(this),
        registerHandlers.bind(this),
        catchError.bind(this),
        initPlayerSrc.bind(this),
        startPlay.bind(this)
      ], function() {
        if (scope_.options.debug) {
          console.log('Player was inited successfully');
        }
      });
  });

  function preinitPlayer() {
    videojs.options.flash.swf = path + 'video-js-swf/video-js.swf';

    videojs.getComponent('ControlBar').prototype.options_ = {
      children: [
        'playToggle',
        'volumePanel',
        'currentTimeDisplay',
        'timeDivider',
        'progressControl',
        'durationDisplay',
        'liveDisplay',
        'remainingTimeDisplay',
        'customControlSpacer',
        'airPlayButton',
        'chromeCastButton',
        'ResolutionButton',
        'fullscreenToggle',
        'playbackRateMenuButton',
        'chaptersButton',
        'descriptionsButton',
        'subsCapsButton',
        'audioTrackButton'
      ]
    };
  }

  function registerSyncPlugins(cb) {
    // first - we do select plugins by order and register it in sync mode
    registerPlugins.bind(this)(cb, true);
  }

  function registerPlugins(cb, sync) {

    var player_ = this,
      plugCount = 0,
      syncMode = typeof sync === 'undefined' ? false : sync;
    player_.plugins = player_.plugins ? player_.plugins : [];
    if (scope_.options.debug) {
      console.log('Start register plugins' + (sync ? ' synchronously' : ''));
    }
    var selectedPlugins = {};
    // check enabled plugins for current options
    for (var idx = 0; idx < pluginList.length; idx++) {
      if ((!syncMode || typeof pluginList[idx].order !== 'undefined') &&
        (typeof scope_.options.disablePlugin === 'undefined' || scope_.options.disablePlugin.indexOf(pluginList[idx].name) === -1) &&
        pluginList[idx].enabled.bind(scope_)(player_)) {
        selectedPlugins[pluginList[idx].name] = pluginList[idx];
        player_.plugins.push(pluginList[idx].name);
      }
    }
    // check enabled plugins for playlist
    if (scope_.options.playlist) {
      for (var plidx = 0; plidx < scope_.options.playlist.length; plidx++) {
        for (var idx = 0; idx < pluginList.length; idx++) {
          if (
            typeof selectedPlugins[pluginList[idx].name] === 'undefined' &&
            (typeof scope_.options.disablePlugin === 'undefined' ||
              scope_.options.disablePlugin.indexOf(pluginList[idx].name) ===
              -1) &&
            (!syncMode || typeof pluginList[idx].order !== 'undefined') &&
            pluginList[idx].enabled.bind(scope_)(player_,
              scope_.options.playlist[plidx])
          ) {
            selectedPlugins[pluginList[idx].name] = pluginList[idx];
          }
        }
      }
    }
    if (typeof sync === 'undefined' && scope_.options &&
      scope_.options.externalPlugin) {
      selectedPlugins.external = {
        name: 'external',
        css: [],
        js: [scope_.options.externalPlugin],

        init: function(player) {
          return true;
        },
        enabled: function(player) {
          return true;
        }
      };
    }
    var plugKeys = Object.keys(selectedPlugins);
    if (syncMode) {
      plugKeys = plugKeys.sort(function(a, b) {
        return selectedPlugins[a].order - selectedPlugins[b].order;
      });
      // We must rewrite sync mode after we have more than one sync plugin (Now
      // we have just ADS)
    }
    if (!plugKeys.length) {
      // no plugins in list
      cb();
      return false;
    }

    plugCount = plugKeys.length;

    for (var keyidx = 0; keyidx < plugKeys.length; keyidx++) {
      var idx = plugKeys[keyidx];
      var plugin = selectedPlugins[idx];
      (function(plug) {
        var loaded = true;
        plug.css = plug.css ? plug.css : [];
        plug.js = plug.js ? plug.js : [];
        for (var styleIdx = 0; styleIdx < plug.css.length; styleIdx++) {
          var styleSheetUrl = typeof plug.css[styleIdx] === 'function'
            ? plug.css[styleIdx].bind(scope_)()
            : plug.css[styleIdx];
          loadStyleSheet(styleSheetUrl);
        }
        var jsCount = plug.js.length;
        for (var jsIdx = 0; jsIdx < plug.js.length; jsIdx++) {
          var scriptUrl = typeof plug.js[jsIdx] === 'function'
            ? (plug.js[jsIdx].bind(scope_))()
            : plug.js[jsIdx];
          loadScript.bind(scope_)(scriptUrl, function(url, inited) {
            var needInit = !inited || plug.forceReinit;
            jsCount--;
            loaded = loaded && url;
            if (jsCount < 1 && typeof plug.init !== 'undefined') {
              if (loaded && needInit) {
                try {
                  plug.init.bind(scope_)(player_);
                } catch (e) {
                  console.log('[ERROR] initialization plugin ', plug.name, e);
                }
              }
              plugCount--;
              if (plugCount < 1) {
                if (scope_.options.debug) {
                  console.log('End register plugins' + (sync ? ' synchronously' : ''));
                }
                cb();
              }
            }
          }, typeof plug.jsorder !== 'undefined' ? plug.jsorder : 'async');
        }
      })(plugin);
    }
  }

  function registerHandlers(cb) {
    // After register all plugin's handlers we add custom user handlers
    // Merge stored handlers into new player
    if (handlers && handlers.ready) {
      for (var hidx = 0; hidx < handlers.ready.length; hidx++) {
        handlers.ready[hidx]();
      }
    }
    if (handlers && Object.keys(handlers).length) {
      for (var hanidx in handlers) {
        if (hanidx !== 'ready') {
          for (var hanjdx = 0; hanjdx < handlers[hanidx].length; hanjdx++) {
            this.on(hanidx, handlers[hanidx][hanjdx].bind(this));
          }
        }
      }
    }
    cb();
  }

  function startAutoPlay(player_, cb) {
    var playPromise = player_.play();
    // In browsers that don’t yet support this functionality,
    // playPromise won’t be defined.
    if (playPromise != undefined && playPromise != null) {
      playPromise.then(
        // autoplay works fine
        function() {
          if (scope_ && scope_.options && scope_.options.debug) {
            console.log('autoplay promise works fine');
          }
          cb();
        })
        .catch(
          // Autoplay error, if video not muted - try to mute it
          function(error) {
            if (player_.ads && bowser.mobile &&
              error.message.match(
                /request was interrupted by a call to pause/)) {
              // contrib-ads does not use player middleware to pause main
              // player for mobile, so it interrupted promise
              cb();
              return false;
            }

            if (!player_.muted()) {
              if (scope_ && scope_.options && scope_.options.debug) {
                console.log('try to mute player for autoplay');
              }
              player_.muted(true);
              player_.play()
                .then(function() {
                  if (scope_ && scope_.options && scope_.options.debug) {
                    console.log('autoplay with muted data started');
                  }
                  cb();
                })
                .catch(function(e) {
                  if (scope_ && scope_.options && scope_.options.debug) {
                    console.log('autoplay muted error ', e);
                  }
                  cb();
                });
            } else {
              if (scope_ && scope_.options && scope_.options.debug) {
                console.log('player already muted');
              }
              cb();
            }
          }
        );
    } else {
      if (scope_ && scope_.options && scope_.options.debug) {
        console.log('autoplay without promise');
      }
      cb();
    }
  }

  function startPlay(cb) {
    if (scope_ && scope_.options && scope_.options.mute) {
      this.muted(true);
    }
    if (scope_ && scope_.options && scope_.options.debug) {
      console.log('Start play');
    }
    if (this.error()) {
      if (scope_ && scope_.options && scope_.options.debug) {
        console.log('Can\'t play because error');
      }
      return;
    }

    if (typeof scope_.options.playlist !== 'undefined' &&
      typeof this.playlist() === 'undefined') {
      this.playlist(preparePlaylist(scope_.options.playlist));
      this.playlistUi({ playOnSelect: true });
      this.on('playlistitem', function(e, v) {
        if (this.getChild('VideoJsPlaylist')) {
          this.getChild('VideoJsPlaylist').el_.style.display = 'none';
        }
        Object.assign(scope_.options, v);
        waterfall(
          [
            initPlayerSrc.bind(this),
            startPlay.bind(this)
          ],
          function() {
            if (scope_ && scope_.options && scope_.options.debug) {
              console.log('Playlist switched successfully');
            }
          });
      });
    }

    try {
      if (scope_.options.autostart) {
        var player_ = this;
        if (scope_ && scope_.options && scope_.options.debug) {
          console.log('try to make autoplay');
        }

        // If options contain imadai then we need to wait till the google
        // stream is loaded (see dai.js), else just do stuff without awaiting
        function playWithCheckForDai(callback) {
          if (scope_ && scope_.options && scope_.options.imadai &&
            player_.imadai().streamManager) {
            player_.imadai()
              .streamManager
              .addEventListener(
                google.ima.dai.api.StreamEvent.Type.LOADED, function() {
                  callback();
                });
          } else {
            callback();
          }
        }

        // Try autoplay if options.autostart
        if (typeof canAutoplay === 'undefined') {
          playWithCheckForDai(function() {
            startAutoPlay(player_, cb);
          });

        } else {
          canAutoplay.video({ 'muted': false })
            .then(function(status) {
              if (status.result === false) {
                // Unmuted autoplay is not allowed.
                // Autoplay error, if video not muted - try to mute it

                canAutoplay.video({ muted: true })
                  .then(function(status) {
                    if (status.result === false) {
                      // Muted autoplay is not allowed.
                      if (scope_ && scope_.options &&
                        scope_.options.debug) {
                        console.log('muted autoplay error ' + status.error);
                      }
                      // try to play by old method
                      playWithCheckForDai(function() {
                        startAutoPlay(player_, cb);
                      });

                    } else {
                      // Muted autoplay is allowed.
                      player_.muted(true);
                      playWithCheckForDai(function() {
                        player_.play();
                        if (scope_ && scope_.options &&
                          scope_.options.debug) {
                          console.log('muted autoplay promise works fine');
                        }
                        cb();
                      });
                    }
                  });

              } else {
                // Unmuted autoplay is allowed.
                playWithCheckForDai(function() {
                  player_.play();
                  if (scope_ && scope_.options && scope_.options.debug) {
                    console.log('autoplay promise works fine');
                  }
                  cb();
                });
              }
            });
        }
      } else {
        cb();
      }

    } catch (exp) {
      console.error('loadedmetadata error', exp);
      cb();
    }
  }

  function initPlayerSrc(cb) {
    if (scope_ && scope_.options && scope_.options.debug) {
      console.log('Start init player src');
    }

    var sources = [];

    if (scope_.options.sources !== [] && scope_.options.sources != undefined &&
      scope_.options.sources !== '' && scope_.options.sources != null) {
      for (var s = 0; s < scope_.options.sources.length; s++) {
        if (scope_.options.sources[s].file || scope_.options.sources[s].src) {

          // resolve Android bug with native HLS (with not adding m3u8)
          if (scope_.isDashDrm() && !(scope_.options.sources[s].src &&
            scope_.options.sources[s].src.split('?')[0].split('.').pop().toLowerCase() === 'm3u8' ||
            scope_.options.sources[s].file &&
            scope_.options.sources[s].file.split('?')[0].split('.').pop().toLowerCase() === 'm3u8')) {

            sources.push(getStreamingSource(scope_.options.type,
              scope_.options.sources[s].file ||
              scope_.options.sources[s].src));

          } else if (!scope_.isDashDrm()) {

            sources.push(getStreamingSource(scope_.options.type,
              scope_.options.sources[s].file ||
              scope_.options.sources[s].src));

          }
        }
      }
    } else if (isADefinedProperty(scope_.options.file)) {
      sources.push(getStreamingSource(scope_.options.type, scope_.options.file));
    } else if (!sources.length) {
      console.error('Missing stream file source(s)');
    }
    var firstLoad = false;
    var eventName = bowser.msie || bowser.msedge ? [
      'loadstart',
      'ready',
      'userinactive'
    ] : 'loadstart';
    if (bowser.msedge) {
      // unknown error with MSEdge - player does not trigger loadstart, we
      // should do it manually
      this.trigger('loadstart');
    }

    function initDvrux(player_) {
      for (var idx = 0; idx < pluginList.length; idx++) {
        if (pluginList[idx].name === 'dvrux') {
          (function(plug) {
            loadScript.bind(this)(plug.js[0], function(url) {
              if (url) {
                plug.init(player_);
              }
            });
            loadStyleSheet(plug.css[0]);
            player_.trigger('dvruxinited');
          })(pluginList[idx]);
        }
      }
    }

    this.one(eventName, function(e) {
      if (this.tech_ !== 'undefined' && this.tech_.name_ === 'StreamrootHlsjs') {
        this.tech_.one(['loadedqualitydata', 'hlslevelloaded'], function() {
          // For HLS we start playing after manifest was loaded (error with
          // chrome reload)
          if (scope_ && scope_.options && scope_.options.debug) {
            console.log('End init player src for HLS.js');
          }
          if (!firstLoad) {
            cb();
            firstLoad = true;
          }
        });
      } else if (!firstLoad) {
        firstLoad = true;
        if (scope_ && scope_.options && scope_.options.debug) {
          console.log('End init player src');
        }
        cb();
      }
      // handle if DVR support is needed
      var player_ = this;
      if (this.tech_ && this.tech_.one) {
        this.tech_.one('dvrsourcedetected', function() {
          initDvrux(player_);
        });
      }
    });

    var player_ = this;
    if ((bowser.ios || bowser.mac) && !navigator.platform.match(/linux/i) &&
      scope_.hasNativeHlsSupport()) {

      scope_.initHlsParser(function() {
        var scope__ = this;
        var i = 0;

        function checkAndInitDvrux() {
          if (scope__.hlsParser && scope__.hlsParser.chunksNumber) {
            if (!scope__.hlsParser.isVod && scope__.hlsParser.chunksNumber > 12) {
              initDvrux(player_);
            }
          } else if (i < 25) {
            setTimeout(function() {
              i++;
              checkAndInitDvrux();
            }, 100);
          }
        }

        checkAndInitDvrux();
      });
    }

    if (sources.length && scope_.options && typeof scope_.options.drm !==
      'undefined' && typeof scope_.options.drm.type !== 'undefined' &&
      typeof scope_.options.drm.license !== 'undefined') {
      for (var sidx = 0; sidx < sources.length; sidx++) {
        sources[sidx]['keySystems'] = {};
        sources[sidx]['keySystems'][scope_.options.drm.type] = scope_.options.drm.license;
      }
    }

    if (scope_.isFairPlay()) {
      for (var i = 0; i < sources.length; i++) {
        if (sources[i].src.split('?')[0].split('.').pop().toLowerCase() === 'm3u8') {
          sources[i] = Object.assign({}, sources[i], {
            protection: {
              keySystem: 'com.apple.fps.1_0',
              certificateUrl: scope_.options.fairplay.certificate,
              licenseUrl: scope_.options.fairplay.license
            }
          });
        }
      }
    }

    this.src(sources);

    var thumbs = getVttThumbnails(scope_.options.tracks);
    var curTracks = this.remoteTextTracks();
    for (var txi = 0; txi < curTracks.length; txi++) {
      this.removeRemoteTextTrack(curTracks[txi]);
    }
    if (thumbs.length) {
      for (var ti = 0; ti < thumbs.length; ti++) {
        this.addRemoteTextTrack(thumbs[ti], false);
      }
      if (typeof this.thumbnails !== 'undefined') {
        this.thumbnails({});
      }
    }
  }

  function getVttThumbnails(tracks) {
    if (!tracks) {
      return [];
    }
    var thumbnails = [];
    for (var tidx = 0; tidx < tracks.length; tidx++) {
      if (tracks[tidx].kind === 'thumbnails') {
        thumbnails.push({
          src: tracks[tidx].file,
          kind: 'metadata'
        });
      }
      if (tracks[tidx].kind === 'captions' || tracks[tidx].kind ===
        'subtitles') {

        thumbnails.push({
          src: tracks[tidx].file,
          kind: 'subtitles',
          label: tracks[tidx].label,
          srclang: tracks[tidx].language || tracks[tidx].label,
          default: tracks[tidx].default || false
        });
      }
    }
    return thumbnails;
  }

  function getStreamingSource(type, link) {
    var sourceType;
    if (link.split('?')[0].split('.').pop().toLowerCase() === 'm3u8') {
      sourceType = 'application/x-mpegURL';
    } else if (link.split('?')[0].split('.').pop().toLowerCase() === 'mpd') {
      sourceType = 'application/dash+xml';
    } else if (link.split('?')[0].split('.').pop().toLowerCase() === 'mp4') {
      sourceType = 'video/mp4';
    } else if (link.split('?')[0].split('.').pop().toLowerCase() === 'ogv') {
      sourceType = 'video/ogg';
    } else if (link.split('?')[0].split('.').pop().toLowerCase() === 'webm') {
      sourceType = 'video/webm';
    } else if ((type != undefined && type.toLowerCase() === 'mp3') ||
      link.split('?')[0].split('.').pop().toLowerCase() === 'mp3') {
      sourceType = 'audio/mp3';
    } else if (link.match(/\/manifest(\?|$)/i)) {
      sourceType = 'application/vnd.ms-sstr+xml';
    }
    return {
      type: sourceType,
      src: link
    };
  }

  function justifyPlayer(cb) {
    if (scope_ && scope_.options && scope_.options.debug) {
      console.log('Start justify player');
    }
    var container = this.el_.parentElement.parentElement;
    this.el_.parentElement.style.display = 'block';
    var playerWidth = scope_.options.width;
    var playerHeight = scope_.options.height;
    var objPlayerdiv = this.el_;

    var parentWidth = container.clientWidth;
    var parentHeight = container.clientHeight;
    if (scope_.options.width != undefined && !isNumeric(scope_.options.width)) {
      playerWidth = parseInt(scope_.options.width.replace('%', '')) *
        parentWidth / 100;
    }

    if (scope_.options.height != undefined &&
      !isNumeric(scope_.options.height)) {
      playerHeight = parseInt(scope_.options.height.replace('%', '')) *
        parentHeight / 100;
    }

    if (playerWidth != undefined) {
      this.width(playerWidth);
    } else {
      this.width(parentWidth);
    }

    if (playerHeight != undefined) {
      this.height(playerHeight);
    } else {
      this.height(parentHeight);
    }
    var videojspath = (typeof scope_.options.videojs !== 'undefined')
      ? scope_.options.videojs
      : 'video.js-7.7.4';

    // load videojs icons (it has very slow render :( )
    if (typeof scope_.options.icons === 'undefined' ||
      typeof scope_.options.icons !== false) {
      loadStyleSheet(path + videojspath + '/' +
        (typeof scope_.options.icons !== 'undefined'
          ? scope_.options.icons
          : 'video-js-icons.min.css') + '?v=' + JSVersion);
    }

    // Hide some elements for mobile browsers
    if (bowser.mobile) {
      try {
        if (scope_ && scope_.options && scope_.options.debug) {
          console.log('mobile start');
        }
        if (scope_ && scope_.options && scope_.options.debug) {
          console.log('mobile end');
        }
      } catch (exp) {
        console.error('mobile error', exp);
      }
    }
    if (document.getElementsByClassName('vjs-progress-control').length) {
      document.getElementsByClassName('vjs-progress-control')[0].addEventListener(
        'mouseover', function() {
          try {
            document.getElementsByClassName('vjs-control-bar')[0].classList.add('vjs-control-bar-show');
          } catch (exp) {
            console.error('vjs-progress-control mouseover error', exp);
          }
        });
      document.getElementsByClassName('vjs-progress-control')[0].addEventListener(
        'mouseout', function() {
          try {
            document.getElementsByClassName('vjs-control-bar')[0].classList.remove('vjs-control-bar-show');
          } catch (exp) {
            console.error('.vjs-progress-control mouseout error', exp);
          }
        });
    }
    if (scope_ && scope_.options && scope_.options.debug) {
      console.log('End justify player');
    }
    cb();
  }

  function catchError(cb) {
    if (scope_ && scope_.options && scope_.options.debug) {
      console.log('Start register error events catcher');
    }
    this.on('error', function(e) {
      if (scope_ && scope_.options && scope_.options.debug) {
        console.log('player error player.error() ', this.error());
      }
      var player_ = this;
      var error = this.error();

      function displayError(message) {
        var messageDiv = document.getElementById(scope_.options.videoId + '_dvMessage');
        var modalDialog = player_.el().querySelector('.vjs-error-display .vjs-modal-dialog-content');

        if (messageDiv) {
          messageDiv.innerHTML = message;
          if (!modalDialog) {
            messageDiv.style.display = 'block';
            messageDiv.style.zIndex = '1';
          }
        }
        if (modalDialog) {
          modalDialog.innerHTML = message;
          if (messageDiv) {
            setTimeout(function() {
              if (modalDialog.parentElement.getAttribute('aria-hidden') === 'true') {
                messageDiv.style.display = 'block';
                messageDiv.style.zIndex = '1';
              }
            }, 500);
          }
        }
      }

      var customErrorMessagesAreDefined = scope_ && isNotAnEmptyObject(scope_.options) && isNotAnEmptyObject(scope_.options.errors);
      var MANIFEST_LOAD_ERROR = customErrorMessagesAreDefined && scope_.options.errors.MANIFEST_LOAD_ERROR;
      var LEVEL_LOAD_ERROR = customErrorMessagesAreDefined && scope_.options.errors.LEVEL_LOAD_ERROR;
      var DEFAULT_ERROR_MESSAGE = customErrorMessagesAreDefined && scope_.options.errors.DEFAULT_ERROR_MESSAGE;

      var errorMessage = DEFAULT_ERROR_MESSAGE || error.message;

      switch (error.code) {
        case 4:
          if (error.message.indexOf('network') > -1 && MANIFEST_LOAD_ERROR) {
            errorMessage = MANIFEST_LOAD_ERROR;
          }
          break;
        case 3:
        case 2:
          if (error.status == 403) {
            errorMessage = DEFAULT_ERROR_MESSAGE || 'Access Forbidden: You do not have permission to access this content';
          }
          if (error.status == 0) {
            errorMessage = DEFAULT_ERROR_MESSAGE || 'Unable to fetch HTTP over HTTPS';
          }

          if (error.message.toLowerCase().indexOf('hls.js') > -1) {
            if (error.message.indexOf('manifestLoadError') > -1) {
              errorMessage = DEFAULT_ERROR_MESSAGE || 'Source File not found or access is forbidden';
            }
            if (error.message.indexOf('levelLoadError') > -1) {
              errorMessage = LEVEL_LOAD_ERROR || DEFAULT_ERROR_MESSAGE || 'Check your internet connection or reload the page';
            }
          }

          if (error.status == 401 && MANIFEST_LOAD_ERROR) {
            errorMessage = MANIFEST_LOAD_ERROR;
          }

          if (error.message.indexOf('The media playback was aborted due to a corruption problem') > -1 && (!scope_.coruptionError || scope_.coruptionError < 2)) {
            scope_.coruptionError = (scope_.coruptionError || 0) + 1;
            // if (player_.tech_ && player_.tech_.name_ === 'StreamrootHlsjs') {
            // player_.tech_.hlsProvider.dispose()
            // }
            initPlayerSrc.bind(player_)(function() {
              player_.currentTime(scope_.currentTime);
              player_.play();
            });
          }
          break;
        case 1:
          console.error(e);
          this.pause();
          break;
        default:
          console.error('error 2: ', e);
          break;
      }

      if (errorMessage) {
        displayError(errorMessage);
        this.pause(); //Requested by Sam, if media is not loaded
      }

      e.stopImmediatePropagation();
    });
    if (scope_ && scope_.options && scope_.options.debug) {
      console.log('Errors catcher registered successfully');
    }
    cb();
  }

  // start waterfall polyfill
  var nextTick = function(fn) {
    if (typeof setImmediate === 'function') {
      setImmediate(fn);
    } else if (typeof process !== 'undefined' && process.nextTick) {
      process.nextTick(fn);
    } else {
      setTimeout(fn, 0);
    }
  };

  var makeIterator = function(tasks) {
    var prevIndex = -1;
    var makeCallback = function(index) {
      var fn = function() {
        // if (tasks.length ) {
        if (tasks.length && index !== prevIndex) {
          prevIndex = index;
          tasks[index].apply(null, arguments);
        }
        return fn.next();
      };
      fn.next = function() {
        return (index < tasks.length - 1) ? makeCallback(index + 1) : null;
      };
      return fn;
    };
    return makeCallback(0);
  };

  var _isArray = Array.isArray || function(maybeArray) {
    return Object.prototype.toString.call(maybeArray) === '[object Array]';
  };

  var waterfall = function(tasks, callback) {
    callback = callback || function() {
    };
    if (!_isArray(tasks)) {
      var err = new Error(
        'First argument to waterfall must be an array of functions');
      return callback(err);
    }
    if (!tasks.length) {
      return callback();
    }
    var wrapIterator = function(iterator) {
      return function(err) {
        if (err) {
          callback.apply(null, arguments);
          callback = function() {
          };
        } else {
          var args = Array.prototype.slice.call(arguments, 1);
          var next = iterator.next();
          if (next) {
            args.push(wrapIterator(next));
          } else {
            args.push(callback);
          }
          nextTick(function() {
            iterator.apply(null, args);
          });
        }
      };
    };
    wrapIterator(makeIterator(tasks))();
  };
  // end waterfall polyfill
}

function loadScript(url, callback, jsorder, checkObject) {
  if (!url) {
    callback(true);
    return true;
  }
  try {
    // check if script already loaded
    var script,
      itsFirst = false;

    if (scriptPool[url]) {
      script = scriptPool[url];
      if ((checkObject && window[checkObject]) ||
        (typeof checkObject === 'undefined')) {
        if (script.getAttribute('loaded')) {
          // script already loaded
          return callback(url, true);
        }
      }
    } else if (!scriptPool[url]) {
      script = document.createElement('script');
      script.type = 'text/javascript';
      script.setAttribute(jsorder, jsorder);
      scriptPool[url] = script;
      itsFirst = true;
    }
    if (script.readyState) {  //IE
      script.addEventListener('readystatechange', function() {
        if (script.readyState === 'loaded' ||
          script.readyState === 'complete') {
          script.onreadystatechange = null;
          script.setAttribute('loaded', '1');
          callback(url);
        }
      });
    } else {  //Others
      script.addEventListener('load', function() {
        script.setAttribute('loaded', '1');
        callback(url);
      });
      script.addEventListener('error', function() {
        script.setAttribute('loaded', '1');
        callback(false);
      });
    }

    if (itsFirst) {
      script.src = url;
      document.getElementsByTagName('head')[0].appendChild(script);
      if (this.options && this.options.debug) {
        console.log('loadScript ended ' + url);
      }
    }

  } catch (exp) {
    console.error('loadScript error', exp);
  }
}

function loadStyleSheet(url) {
  var fileref = document.createElement('link');
  fileref.setAttribute('rel', 'stylesheet');
  fileref.setAttribute('type', 'text/css');
  fileref.setAttribute('href', url);
  var loaded = document.getElementsByTagName('head')[0].querySelector(
    'link[href="' + url + '"][type="text/css"][rel=stylesheet]');
  if (typeof fileref !== 'undefined' && !loaded) {
    document.getElementsByTagName('head')[0].appendChild(fileref);
  }
}

function adBlockDetected(pl) {
  try {
    if (typeof pl !== 'undefined' && typeof pl.el_ !== 'undefined' &&
      typeof pl.el_.id !== 'undefined') {
      videojs(pl.el_.id)
        .dispose();
    }
    document.getElementById(
      this.options.videoId).innerHTML = '<div style="width:' +
      this.options.width + 'px; height: ' + this.options.height +
      'px;text-align: center; color: red; font-size: 20px; max-width: 100%; background-color: black; font-family: Myriad Pro, Arial"><p>' +
      (typeof this.options.adblocker === 'string'
        ? this.options.adblocker
        : 'Kindly turn off ad blocker to watch our videos.') + '</p></div>';

  } catch (exp) {
    console.error('adBlockDetected error', exp);
  }
}

function EnableNativeTextTrack() {
  try {
    if (this.options && this.options.debug) {
      console.log('EnableNativeTextTrack start');
    }

    if (bowser.ios && GetDeviceSize() !== 'Desktop') {
      if (eval(bowser.version) < 11) {
        return false;
      } else {
        return true;
      }

    } else {
      if (this.options && this.options.debug) {
        console.log('EnableNativeTextTrack end');
      }
      return false;
    }

  } catch (exp) {
    console.error('EnableNativeTextTrack error', exp);
  }
}

function GetDeviceSize() {
  try {
    if (typeof scope_ !== 'undefined' && scope_.options &&
      scope_.options.debug) {
      console.log('GetDeviceSize()');
    }

    if (bowser.tablet) {
      return 'Tablet';
    }
    if (bowser.mobile) {
      return 'Mobile';
    }
    return 'Desktop';

  } catch (exp) {
    console.error('GetDeviceSize() error', exp);
  }
}

function getTech() {
  try {
    if (this.options && this.options.debug) {
      console.log('getTech');
    }
    if (this.options.file && this.options.file.match(/\.mp3$/)) {
      return document.location.protocol === 'https:' && bowser.chrome
        ? ['chromecast', 'html5']
        : ['html5'];
    }
    if (bowser.firefox && eval(bowser.version) < 47) {
      return ['flash', 'html5'];
    }
    if (document.location.protocol === 'https:' && bowser.chrome &&
      eval(bowser.version) < 40) {
      return ['chromecast', 'flash', 'html5'];
    } else if (bowser.chrome && eval(bowser.version) < 40) {
      return ['flash', 'html5'];
    }
    if (bowser.msie && eval(bowser.version) <= 11) {
      return ['flash', 'html5'];
    } else if (bowser.chrome && document.location.protocol === 'https:') {
      return ['chromecast', 'html5', 'flash'];
    } else if (bowser.chrome) {
      return ['html5', 'flash'];
    } else if (!bowser.ios && !bowser.safari) {
      return ['html5', 'flash'];
    } else {
      return ['html5'];
    }

  } catch (exp) {
    console.error('getTech error', exp);
  }
}

function GetMute(AutoStart, Mute) {
  try {
    if (scope_ && scope_.options && scope_.options.debug) {
      console.log('GetMute');
    }
    var DeviceType = GetDeviceType();
    var DeviceSize = GetDeviceSize();
    muted = Mute;
    if (AutoStart && DeviceSize !== 'Desktop' && (DeviceType === 'IOS' || DeviceType === 'ANDROID')) {
      muted = true;
      return true;
    }
    return Mute;
  } catch (exp) {
    console.error('GetMute error', exp);
  }
}

function GetDeviceType() {
  try {
    if (scope_ && scope_.options && scope_.options.debug) {
      console.log('GetDeviceType');
    }
    if (bowser.ios) {
      return 'IOS';
    }
    if (bowser.android) {
      return 'ANDROID';
    }
    if (bowser.windowsphone) {
      return 'WINDOWSPHONE';
    }
    if (bowser.blackberry) {
      return 'BLACKBERRY';
    }
    if (bowser.windows) {
      return 'WINDOWS';
    }
    if (bowser.linux) {
      return 'Linux';
    }
    if (bowser.mac) {
      return 'MAC';
    } else {
      return 'OTHER';
    }

  } catch (exp) {
    console.error('GetDeviceType error', exp);
  }
}

//added for Javascript Mode
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function Validate() {
  //$(':button').prop('disabled', true); // Disable all the buttons
  var valid = false;

  try {

    var url = window.location.href;
    var keykey = window.atob(ACCESS_KEY);

    var keys = keykey.split('#');
    var domains = keys[0].split(',');

    var message = 'License not valid.';
    for (var i = 0; i < domains.length; i++) {

      if (url.toLowerCase().indexOf(domains[i].toLowerCase()) > -1) {
        valid = true;
        break;
      }
    }

    var now = new Date();
    var expiry = new Date(keys[1]);//assuming this has a valid date
    if (expiry < now) {
      valid = false;
      message = message + ' And also expired.';
    }

    if (valid) {
      //$(':button').prop('disabled', false); // Enable all the button

    } else {
      alert(message);
    }

  } catch (exp) {

  }

  return valid;
}

// find polyfill for old IE
Array.prototype.find = Array.prototype.find || function(callback) {
  if (this === null) {
    throw new TypeError('Array.prototype.find called on null or undefined');
  } else if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }
  var list = Object(this);
  // Makes sures is always has an positive integer as length.
  var length = list.length >>> 0;
  var thisArg = arguments[1];
  for (var i = 0; i < length; i++) {
    var element = list[i];
    if (callback.call(thisArg, element, i, list)) {
      return element;
    }
  }
};

// Assign polyfill  for IE
if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }
        nextSource = Object(nextSource);

        var keysArray = Object.keys(nextSource);
        for (var nextIndex = 0, len = keysArray.length; nextIndex <
        len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}
