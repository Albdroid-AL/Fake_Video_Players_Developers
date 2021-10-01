<?php
/*
EVERYONE IS FAKE
WTF IS THE fcplayer?
EVERYONE CHANGES PLAYERS NAMES/FUNCTIONS AND BECOMES FAKE AUTHORS
I THOUGHT WOWZA WAS SERIOUS BUT IN FACT IT WAS A BIG SHIT
YOU CAN SEE THAT EVERYTHING IS MODIFIED

Sources Video.js http://videojs.com
Copyright Brightcove, Inc. https://www.brightcove.com

YOU CAN MODIFY IT AS YOU WISH
THE /API/ PATH IT'S A GIFT FROM ME
*/

// START MY CODE
// eshte me stream reconnect
// STREAMS
$stream_url = isset($_GET['url']) && !empty($_GET['url']) ? $_GET['url'] : "https://nesertv.live/ntv/livestream/index.m3u8";
$stream_url = str_replace(
    array(" "),
    array("%20"),
    $stream_url
);

// ?url=[URL]&poster=POSTER URL
$poster = @$_GET["poster"];
if(!$poster)
	$poster = "https://png.kodi.al/tv/albdroid/black.png"; // DEFAULT POSTER

// ?url=[URL]&logo=LOGO URL
$logo = @$_GET["logo"];
if(!$logo)
	$logo = "http://albdroid.al/uploads/system_logo/logo.png"; // DEFAULT LOGO

// ?url=[URL]&title=BLA BLA BLA
$title = @$title["title"];
if(!$title)
	$title = "NTV AL LIVE"; // DEFAULT TITLE

if((!empty( $_SERVER['HTTP_X_FORWARDED_HOST'])) || (!empty( $_SERVER['HTTP_X_FORWARDED_FOR'])) ) {
 	$_SERVER['HTTP_HOST'] = $_SERVER['HTTP_X_FORWARDED_HOST'];
 	$_SERVER['HTTPS'] = 'on';
 }

if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === 'off') {
  $protocol = 'http://';
} else {
  $protocol = 'https://';
}

$ROOT_URL_MAIN = $protocol . $_SERVER['SERVER_NAME'] . dirname($_SERVER['PHP_SELF']) . "/";
$VIDEOJS_DIR = $protocol . $_SERVER['SERVER_NAME'] . dirname($_SERVER['PHP_SELF']) . "/js/libs/videojs_5/";
$LIBRARY_DIR = $protocol . $_SERVER['SERVER_NAME'] . dirname($_SERVER['PHP_SELF']) . "/js/libs/";
$JS_DIR = $protocol . $_SERVER['SERVER_NAME'] . dirname($_SERVER['PHP_SELF']) . "/js/";
$PHP_FILE_PATH = $protocol . $_SERVER['SERVER_NAME'] . ($_SERVER['PHP_SELF']) . "";

// API
$BUILD_PHP_API = $PHP_FILE_PATH . "?url=" . $stream_url;
$BUILD_API_PATH = $ROOT_URL_MAIN . "api/?url=" . $stream_url;
$JSON_API_PATH = $ROOT_URL_MAIN . "api/" . "";
$JSON_API_URL_CALL = $JSON_API_PATH . "?url=" . $stream_url;
// CSS
$EMBED_CSS_PATH = $ROOT_URL_MAIN . "css/" . "wowza_embed.css";
$PLAYER_CSS_PATH = $ROOT_URL_MAIN . "css/" . "player.css";
// VIDEO JS LIBS
$VIDEOJS_CSS_PATH = $VIDEOJS_DIR . "" . "video-js.css";
// LIBS
// cryptojs
$CRYPTOJS_JS_PATH = $LIBRARY_DIR . "" . "crypto-js/crypto-js.min.js";
$CRYPTOJS_HMAC_SHA256_JS_PATH = $LIBRARY_DIR . "" . "crypto-js/hmac-sha256.js";
// htmlsanitize
$HTMLSANITIZE_JS_PATH = $JS_DIR . "" . "html-sanitize.js";
$VJSWRAPPER_JS_PATH = $JS_DIR . "" . "vjs-wrapper.js";
?>
<!DOCTYPE html>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<title><?php echo $title; ?></title>
<link rel="shortcut icon" href="https://kodi.al/panel.ico"/>
<link rel="icon" href="https://kodi.al/panel.ico"/>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<meta content="<?php echo $title; ?>" property="og:title">
<meta content="application/x-shockwave-flash" property="og:video:type">
<meta content="640" property="og:video:width">
<meta content="360" property="og:video:height">
<link href="<?php echo $PLAYER_CSS_PATH; ?>" rel="stylesheet" type="text/css">
<script src="<?php echo $CRYPTOJS_JS_PATH; ?>" type="text/javascript"></script>
<script src="<?php echo $CRYPTOJS_HMAC_SHA256_JS_PATH; ?>" type="text/javascript"></script>
</head>
<body>
<div id="wowza_player_content">
<script src="<?php echo $HTMLSANITIZE_JS_PATH; ?>" type="text/javascript"></script>
<style scoped="">
@import url("<?php echo $PLAYER_CSS_PATH; ?>")
</style>
<div class="header">
<div id="header_logo">
</div>
<h1 class="logo-text" id="header_text">
<center><?php echo $title; ?></center>
</h1>
</div>
<hr>
<div id="wowza_player"></div>
<div class="player-description" id="player_desc">
</div>
<!----/>
<div class="generated">
This page last generated on Friday, October 1, 2021 Florence, Metropolitan City of Florence
</div>
<!---->
</div>
<script>
(function(e, t, n) {
    var r = "attachEvent",
        i = "addEventListener",
        s = "DOMContentLoaded";
    if (!t[i]) i = t[r] ? (s = "onreadystatechange") && r : "";
    e[n] = function(r) {
        /in/.test(t.readyState) ? !i ? setTimeout(function() {
            e[n](r)
        }, 9) : t[i](s, r, false) : r()
    }
})(window, document, "domReady");

domReady(function() {
  var wowza_css=document.createElement('link');
  wowza_css.rel='stylesheet';
  wowza_css.href= "<?php echo $PLAYER_CSS_PATH; ?>";
  wowza_css.onload=loadVideoJSCSS;
  document.getElementsByTagName('head')[0].appendChild(wowza_css);

  function loadVideoJSCSS() {
    var ls = document.createElement('link');
    ls.rel='stylesheet';
    ls.href= "<?php echo $VIDEOJS_CSS_PATH; ?>";
    ls.onload = loadPlayer;
    document.getElementsByTagName('head')[0].appendChild(ls);
  };

  function loadPlayer() {
    var playerText="<div id='fcplayer_wrapper' class='fcplayer' style='position: relative; background-image: url(); background-size: cover;'><div style='height: 0; padding-bottom: 56.25%'></div>"
    playerText+="<video id='fcplayer' class='video-js vjs-default-skin vjs-big-play-centered' style='position: absolute; left: 0; top:0; width:100%;height:100%;' controls>"
    playerText+="<source id='fcplayer_source' src='<?php echo $stream_url; ?>' type='application/x-mpegURL'></source>"
    playerText+="</div>"

    var doc = document.createElement('div');
    doc.innerHTML = playerText;
    var playerDiv = doc.firstChild;
    w_ie('wowza_player', playerDiv);

    function w_ie(id, div) {
      document.getElementById(id).appendChild(div);
    }

    params = {
      poster:              "<?php echo $poster; ?>", // Poster URL
      preload:             "none",
      autoplay:            false,
      playlist: [{
      mediaid:             "<?php echo $title; ?>",
      title:               "<?php echo $title; ?>",
      file:                "<?php echo $stream_url; ?>",
      sources:             [],
      live:                true, // Live flag
      countdown:           false, // Countdown flag
      countdown_timestamp: "", // UNIX timestamp of the countdown date (required to show the countdown)
      live_done:           false                  // Show the "Thanks for watching message"
      }],
      freecaster: {
        player_root:         "<?php echo $ROOT_URL_MAIN; ?>",
        get_video_path:      "<?php echo $JSON_API_URL_CALL; ?>", // Will call player_root + get_video_path to get updated playlist item wowza.json
        noactions:           true, // Disable internal views counter
        template_livedate:   "%a %e %b %Y @ %H:%M",
        template_countdown:  "%days day(s) %hours:%minutes:%seconds",
        live_done_message:   "Thanks for Watching my Fake Player!",
        live_done_image:     null, // Optional image to append below the live_done message
        watermark_path:      "<?php echo $logo; ?>", // Path to SVG
        watermark_href:      "#", // Watermark link URL
        watermark_position:  "top-right"
      }
    };

    var wpTechOrder=document.getElementById('wowza_player').getAttribute('techOrder')

    if (wpTechOrder) {
      params.techOrder=wpTechOrder.split(' ');
    }

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "<?php echo $VJSWRAPPER_JS_PATH; ?>"
    document.getElementsByTagName("head")[0].appendChild(script);

    var node = document.createElement('style');
    node.innerHTML = '\n.vjs-error .vjs-error-display:before {\n  content: \"\" !important;\n}\n\n.vjs-error-display.vjs-modal-dialog {\n  background: none !important;\n}\n\n.fc-poster #fcplayer_freecaster_countdown {\n  height: 95px !important;\n  width: 280px !important;\n  font-size: 18px !important;\n  top: 70px !important;\n\n  font-weight: bold;\n  line-height: 25px;\n  padding-left: 40px;\n  padding-top: 10px;\n  border-radius: 0px 20px 20px 0px;\n  background: rgba(0,0,0,0.5);\n  color: #FFFFFF;\n  z-index: 1000;\n}\n\n.fc-poster #fcplayer_freecaster_countdown #fcplayer_freecaster_countdown_livedate::before {\n    content: \"Stream will start on:\";\n    font-size: 15px;\n    font-weight: bold;\n    display: block;\n    color: #FFFFFF;\n    clear: both;\n}\n\n.fc-overlays {\n    pointer-events: none;\n}\n';
    document.getElementsByTagName("head")[0].appendChild(node);
  }
});
</script>

<script>
  function updatePlaybackUrl() {
    var playerUrl = "<?php echo $stream_url; ?>";
    var secrect = ascii_to_hex(document.getElementById('passphrase_input').value);
    var paramUrl = generateToken(playerUrl,secrect);
    setNewUrl(paramUrl);
  };
  
  function setNewUrl(url) {
    if ("freecaster_vjs" == "wowza") {
      var player = WowzaPlayer.get('wowza_player');
      player.setConfig({"sourceURL": url});
    } else if ("freecaster_vjs" == "freecaster_vjs") {
      var clean_url = url.replace(/^https?\:/i, "");
      videojs('fcplayer').ready(function() {
        var player = this;
        player.src({"type": "application/x-mpegURL", "src": clean_url, "withCredentials": true});
        params.playlist[0].file = clean_url;
      });
      var source = document.getElementById('fcplayer_source');
      source.src = clean_url;
  
    }
  };
  
  function generateToken(url, secrect) {
    var hashSource = [];
    var newToken = [];
    // Token expires 8 hours from entering
    newToken.push("exp=" + Math.round(Date.now()/1000 + 60*8*60));
    splits = url.split("/");
    streamId = splits[4];
    hashSource = newToken.slice();
    hashSource.push("stream_id=" + streamId);
  
    var hmac = CryptoJS.HmacSHA256(hashSource.join('~'), secrect);
    newToken.push("hmac=" + hmac);
    newToken = newToken.join('~');
    var queryParams = "?hdnts="+newToken;
    return url+queryParams;
  };
  
  function ascii_to_hex(str) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n ++)  {
      var hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join('');
  };
</script>
</body>
</html>