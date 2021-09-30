<!----/>
FAKE PLAYERS BY FAKE AUTHORS
THIS FAKE AUTHOR HAS CHANGED ONLY SOME FUNCTIONS NAMES AND CLAIMS TO BE THE ORIGINAL AUTHOR
ALL PLUGINS BELONG TO -> BRIGHTCOVE https://www.brightcove.com/
YOU CAN DO WHATEVER YOU WANT WITH THESE CODES
THE JOB IS FOR YOU NOW!!!
<!---->

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Vari Karin</title>
<link rel="shortcut icon" href="https://kodi.al/panel.ico"/>
<link rel="icon" href="https://kodi.al/panel.ico"/>
<style>
</style>
</head>
<body>
<div id="divPlayer">
</div>
<script src="player_loader.js"></script>
<script type="text/javascript">
// MAIN PLAYER API
var playerContainerId = 'divPlayer';
// Global variable for store player
var kwikplayer = {};
var kwikoptions = {
  width: 720,
  height: 406,
  userid: 'vari@karin.al',
  image: "https://png.kodi.al/tv/albdroid/black.png",
  //aspectratio: "16:9",
 // controls: true,
 // usefullscreen: true,
  preload: "auto",
 // autostart: true,
  debug: true,
  chromecast: {
    receiverAppID: '385CEAF7'
  }
 // mute: false,
//  mediaid: "uwPUXEHxeBRpHcpRmarona"
}

// ALL BELOW IS TEST DATA 
// IN PRODUCTION JUST USE kwikMotion(containerId, kwikoptions)

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
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
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
// CustomEvent polyfill for IE
(function () {
  if ( typeof window.CustomEvent === "function" ) return false; //If not IE

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();

var playerConfig = [];
// simple player rsplayer4
playerConfig.push(Object.assign({}, kwikoptions, {
  mediaid: "uwPUXEHxeBRpHcpRmaronb",
  name: 'Simple With Enabled Autoplay And ADS',
  adblocker: '<b style="color:green;">Please dont use this!!!!</b>',
  autostart: true,
  levelswitch: 'current',
  stat: {
    url: '',
	//url: 'https://stat.kwikmotion.com/', // IGNORE
    events: ['play', 'pause', 'adstart', 'adend', 'adserror', 'ads-ad-started','timeupdate'],
    title: 'Video Name',
    interval: 10 // timeupdate interval
  },
  file: 'https://abr.de1se01.v2beat.live/playlist.m3u8',

  tracks: [{
//file: "enter vtt url",
kind: "thumbnails"
}
    
],

advertising: {
  schedule: {
   adBreak5: {
    tag: 'https://pubads.g.doubleclick.net/gampad/live/ads?sz=400x225&iu=/38740535/AlTazaj-Pre&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=[timestamp]',
      offset: 'pre'
    },

    adBreak6: {
    tag: 'https://pubads.g.doubleclick.net/gampad/live/ads?sz=400x225&iu=/38740535/AlTazaj-Pre&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=[timestamp]',
    offset: 'pos'
    },
   }
   }
}));

// simple player rsplayer4
playerConfig.push(Object.assign({}, kwikoptions, {
  mediaid: "uwPUXEHxeBRpHcpRmaronb",
  name: 'Simple With VMAP ADS',
  aspectratio: "16:9",
   mediaid: "MTVLive",
   autostart: false,
	 sources: [
      {
	  file: "https://clvod.itworkscdn.net/bloombergvod/smil:itwfcdn/bloomberg/620888-7MBV757bJJW26g3.smil/playlist.m3u8"
	  },
      {
	  file: "https://svs.itworkscdn.net/mtvlebanonlive/mtvlive.smil/manifest.mpd"
	  },
      {
	  file: "https://svs.itworkscdn.net/mtvlebanonlive/mtvlive.smil/manifest"
	  }
	  ],

        advertising: {

            schedule: {
                adbreak1: {
                    offset: 'pre',
                    tag: 'https://googleads.g.doubleclick.net/pagead/ads?ad_type=video&client=ca-video-pub-4968145218643279&videoad_start_delay=0&description_url=http%3A%2F%2Fwww.google.com&max_ad_duration=40000&adtest=on'
                }
            }
        }
 
// advertising: {
// schedule: "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=vmap&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ar%3Dpremidpostpodbumper&cmsid=496&vid=short_onecue&correlator="
//                  }
//advertising: {
//      schedule: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/40784803/Adx_Video_Test&description_url=http%3A%2F%2Frotana.net&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=400x225|400x300|480x320|640x480&unviewed_position_start=1'
//}

}));

// HLS (m3u8) player
// XML PLAYLIST
playerConfig.push(Object.assign({}, kwikoptions, {
  mediaid: "Vari Karin",
  name: 'HLS MPD Player',
  levelswitch: 'instant',
  context: {
    view: false
  },

//  videojs: 'video.js-7.0.4',
  series: "", // see at xml/feed.xml
//  file: 'https://clvod.itworkscdn.net/lbcivods/token=nva=1550051756~dirs=2~hash=0ba5a3944d4246e1ac0c2/pd/lbci/631259-4-Encoded-67818614-240p.mp4'
//  file: 'https://clvod.itworkscdn.net/lbcivods/token=nva=1570460124~dirs=3~hash=018eaa33d9ee4d2210a3e/smil:itwfcdn/lbci/769478-S15rA9SWyF45M5h.smil/playlist.m3u8',
// HLS MPD SMOTH MANIFEST
    sources: [
{
    file: "https://abr.de1se01.v2beat.live/playlist.m3u8" // SET MPD TO CHANGE PLAYER MODE
},
{
	file: "https://abr.de1se01.v2beat.live/playlist.m3u8"
},
{
	file: "https://abr.de1se01.v2beat.live/playlist.m3u8"
}
]
  //resume: true,
  //preload: "auto",
  //file: "https://abr.de1se01.v2beat.live/playlist.m3u8"
}));

// HLS (m3u8) player with resolution switcher rsplayer1
playerConfig.push(Object.assign({}, kwikoptions, {
  mediaid: "uwPUXEHxeBRpHcpRmarond",
  name: 'HLS Player With Thumbnails Resolution Switcher',
  //resume: true,
  autostart: false,
  preload: "auto",
  sources: [
  {
  file: "https://abr.de1se01.v2beat.live/playlist.m3u8"
  }
  ],
/*
{
file: "https://abr.de1se01.v2beat.live/playlist.m3u8"
}
],	
*/
/*
sources: [
{
file: "https://abr.de1se01.v2beat.live/playlist.m3u8"
},
{
file: "https://abr.de1se01.v2beat.live/playlist.m3u8"
},
{
file: "https://abr.de1se01.v2beat.live/playlist.m3u8"
}
],
title: 'Vari Karin',
tracks: [{
file: 'enter vtt url',
kind: 'thumbnails'
}
]
*/
}));

// DASH player
playerConfig.push(Object.assign({}, kwikoptions, {
  mediaid: "Vari Karin",
  name: 'DASH player',
  sources: [
            {
			file: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
			},
//            { file: "https://abr.de1se01.v2beat.live/playlist.m3u8" },
            {
			file: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
			}
        ]
}));

// AES encoded stream
playerConfig.push(Object.assign({}, kwikoptions, {
  mediaid: "Vari Karin", // IGNORE mediaid
  name: 'AES Encoded Stream',
  file: "ENTER_AES_Encoded_Stream_URL",
  aesSetup: {
    key: 'ENTER_AES_KEY_HERE',
    iv: 'ENTER_AES_IV_HERE'
  }
}));

// AES encoded stream
playerConfig.push(Object.assign({}, kwikoptions, {
  mediaid: "Vari Karin",  // IGNORE mediaid
  name: 'AES Encoded Stream (Override XMLHttpRequest)',
  file: "ENTER_AES_Encoded_Stream_URL",
  aes: {
    key: 'ENTER_AES_KEY_HERE',
    iv: 'ENTER_AES_IV_HERE'
  }
}));
// ISM stream
playerConfig.push(Object.assign({}, kwikoptions, {
  mediaid: "Vari Karin",  // IGNORE mediaid
  name: 'ISM Stream',
  file: "https://playready.directtaps.net/smoothstreaming/TTLSS720VC1/To_The_Limit_720.ism/Manifest"
}));

// MP3 Live stream
playerConfig.push(Object.assign({}, kwikoptions, {
  mediaid: "Vari Karin",  // IGNORE mediaid
  name: 'MP3 Live Stream',
  type: "mp3",
  file: "https://stream-eurodance90.fr/radio/8000/128.mp3"
}));

// MP3 Live stream
playerConfig.push(Object.assign({}, kwikoptions, {
  mediaid: "Vari Karin",  // IGNORE mediaid
  name: 'MP3 Live Stream Video',
  file: "https://stream-eurodance90.fr/radio/8000/128.mp3"
}));

// HLS Low Latency
playerConfig.push(Object.assign({}, kwikoptions, {
  mediaid: "Vari Karin", // IGNORE mediaid
  name: 'HLS Low Latency',
  file: "https://5d6e17f1ca731.streamlock.net/LowLatencyBBB/myStream/playlist.m3u8"
}));

// DVR player
playerConfig.push(Object.assign({}, kwikoptions, {
name: 'DVR player',
aspectratio: "16:9",
   mediaid: "Vari Karin", // IGNORE mediaid
      sources: [
      {
	  file: "https://URL/playlist.m3u8?DVR"
	  },
      {
	  file: "https://URL/manifest.mpd?DVR"
	  },
      {
	  file: "https://URL/Manifest"
	  }
	  ],
     }));

// DVR auto detection
playerConfig.push(Object.assign({}, kwikoptions, {
name: 'HLS DVR Auto Detection',
aspectratio: "16:9",
   mediaid: "Vari Karin", // IGNORE mediaid
   file: 'https://URL//playlist_dvr.m3u8'
    }));

// DVR DASH auto detection
playerConfig.push(Object.assign({}, kwikoptions, {
  name: 'DASH DVR Auto Detection',
aspectratio: "16:9",
   mediaid: "Vari Karin", // IGNORE mediaid
   file: 'https://URL/manifest_dvr.mpd'
     }));

// COLORED PLAYER
// with sharing, advertizing and design studio rsplayer
playerConfig.push(Object.assign({}, kwikoptions, {
  mediaid: "Vari Karin", // IGNORE mediaid
  name: 'Designed Player with Adv, Subs and Sharing',
  logo: {
      file: "https://png.kodi.al/tv/albdroid/logo.png",
      hide: true,
      link: "ENTER SHARE URL HERE",
      margin: "10",
      position: "top-left"
  },

  designStudio: {
      logo: "https://png.kodi.al/tv/albdroid/logo.png",
      hideLogo: true,
      link: "http://varikarin.al",
      position: "top-right",
      logoMargin: "10",
      primary: '#ff0000',
      highlight: '#ffff00',
      background: 'rgba(50,50,240,0)',
      thumbContainerBG: '#333333',
      playProgressColor: '#ff0000',
      loadProgressColor: '#00ff00',
      progressHolderColor: '#0000ff'
  },

  sharing: "ENTER SHARE URL HERE",
  tracks: [{
      file: "ENTER VTT URL HERE .vtt",
      kind: "thumbnails"
    }, {
      file: "ENTER VTT URL HERE .vtt",
      label: "English",  // change srclang = lower(label) in JS
      kind: "captions"  // change to subtitles in JS
      //  "default": true // set in JS default
    }, {
      file: "ENTER VTT URL HERE .vtt",
      kind: "captions",
      label: "Shqip"
      // "default": true // set in JS default
  }],
  file:"https://kodi.al/app_stream_tester/Artiola%20Toska%20-%20Unaza.mp4",
  sadvertising: {

  //    client: "googima", //Not Required
  //    /* (default is googima )  Chooses the ad client that will be used to display advertisements: "googima": Use the Google IMA SDK - Required for certain ad tags
  //    no other options supported for the timebeing but vast, freewheel might  be supported later  */

  //    admessage: "Advertisment", //Not Required
  //    /* (default is Advertisment )  later we might change text with respect to culture  */
  schedule: {
  adBreak1: {
      tag: "ENTER ADS URL HERE .XML",
      offset: 'pre' // values( time in seconds //  pre/pos )
    }
   }
  }
}));

// playlist with ads Playlist with ads.m3u8
playerConfig.push(Object.assign({}, kwikoptions, {
  name: "Playlist With ADS",
  	playlist: [{
		file: "http://content.jwplatform.com/manifests/1sc0kL2N.m3u8",
		mediaid: "Vari Karin", // IGNORE mediaid
    
		//adschedule: {
		//	adbreak1: {
		//		offset: "pre",
		//		ad: {
		//			tag: "http://search.spotxchange.com/vast/2.00/85394?VPAID=js&content_page_url=www.testing123.com&cb=random-number&device[devicetype]=1&device[dnt]=0"
		//		}
		//	},
		//	adbreak2: {
		//		offset: 5,
		//		ad: {
		//			tag: "http://demo.jwplayer.com/android/vast-tags/preroll.xml" // xml/preroll.xml
		//		}
		//	}
		//}
	}, {
		file: "https://clvod.itworkscdn.net/bloombergvod/smil:itwfcdn/bloomberg/620888-7MBV757bJJW26g3.smil/playlist.m3u8",
		mediaid: "Vari Karin", // IGNORE mediaid
	}, {
		file: "http://content.jwplatform.com/manifests/fhFgWKJj.m3u8",
		mediaid: "Vari Karin", // IGNORE mediaid
		adschedule: {
			adbreak1: {
				offset: "pre",
				ad: {
					tag: "ENTER VAST ADS URL HERE .XML"
				}
			}
		}
	}]
}));

// playlist with multiple sources Playlist Multiple Sources.m3u8
playerConfig.push(Object.assign({}, kwikoptions, {
  name: "Playlist Multiple Sources",
  playlist:  [{
		file: "http://content.jwplatform.com/manifests/1sc0kL2N.m3u8", // mediaid -> 1sc0kL2N
		mediaid: "1sc0kL2N", // IGNORE mediaid
    }]
}));

playerConfig.push(Object.assign({}, kwikoptions, {
  name: "360 Video",
  stereomode: 'monoscopic',
  file: 'https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8',
  tracks: [{
    file: "ENTER VTT URL HERE .vtt",
    kind: "thumbnails"
  }

  ]
}));

playerConfig.push(Object.assign({}, kwikoptions, {
  //mediaid: "Vari Karin", // IGNORE mediaid
  name: 'P2P Player',
  p2p: true,
  file: "https://abr.de1se01.v2beat.live/playlist.m3u8"
}));

playerConfig.push(Object.assign({}, kwikoptions, {
  //mediaid: "Vari Karin", // IGNORE mediaid
  name: 'DRM Player (DASH)',

  file: 'https://protect.videoticket.ru/vod/sample.mp4/manifest.mpd',
  drm: {
    type: 'com.widevine.alpha',
    license: 'https://rng.stage.ott.irdeto.com/licenseServer/widevine/v1/ITWORKSME/license?contentId=ITWORKSME-Content'
  }
}));
playerConfig.push(Object.assign({}, kwikoptions, {
  //mediaid: "Vari Karin", // IGNORE mediaid
  name: 'Level load error',
  errors: {
    MANIFEST_LOAD_ERROR: "Please don't press something",
    LEVEL_LOAD_ERROR: "Please don't press something"
  },
  sources: [
{
file: "https://cllive.itworkscdn.net/mtvlebanonlive/token=nva=1552074810~dirs=1~hash=0e3f9a78cc1ba6522e8ba/mtvlive.smil/playlist.m3u8"
},

{
file: "https://cllive.itworkscdn.net/mtvlebanonlive/token=nva=1552074810~dirs=1~hash=0e3f9a78cc1ba6522e8ba/mtvlive.smil/manifest.mpd"},

{
file: "https://cllive.itworkscdn.net/mtvlebanonlive/token=nva=1552074810~dirs=1~hash=0e3f9a78cc1ba6522e8ba/mtvlive.smil/Manifest"
}
],
}));

var selector = document.createElement('select');
selector.addEventListener('change', function(){
  if(!location.search.match(new RegExp("\\?" + this.value + "$"))) { 
    location.href = "?" + this.value;
    return;
  }

  var currentPlayer = document.getElementsByClassName('video-js');
  if(typeof videojs != 'undefined' && currentPlayer.length) {
    videojs(currentPlayer[0].id).dispose();
    document.getElementById(playerContainerId).innerHTML = '';
  }
  kwikMotion(playerContainerId, playerConfig[this.value]);
})

for(var i=0; i<playerConfig.length; i++ ){
  var option = document.createElement('option');
  if(location.search.match(new RegExp("\\?" + i + "$"))) {
    option.setAttribute('selected', 'selected');
  }
  option.value = i;
  option.innerHTML = playerConfig[i].name;
  selector.appendChild(option);
}
var event = new CustomEvent("change");
selector.dispatchEvent(event);
document.body.appendChild(selector);

</script>
</body>