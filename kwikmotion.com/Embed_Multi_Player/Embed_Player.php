<?php
    /*
    Player Types
    videojs was renamed by this fake developer to kwikmotion
    bitdash
    kwikmotion <<-- fake name , In fact this is videojs player
    jwplayer
    
BEFORE TO CHANGE PLAYER TYPES SET STREAM URLS
JWPLAYER IS AS DEFAULT
IF PLAYER IS bitdash MODE AS DEFAULT PLAYING MPD STREAM, IF YOU WANT TO PLAY HLS LEAVE EMPTY $mpd_url & $manifest_url INPUT ONLY M3U8 SOURCE
*/
$Player_Type = "jwplayer"; // SET PLAYER

$image_url = "https://png.kodi.al/tv/albdroid/black.png";
$hls_url = "https://abr.de1se01.v2beat.live/playlist.m3u8";

$mpd_url = ""; // MPD URL
$manifest_url = ""; // smil/Manifest URL

$vtt_url = ""; // vtt URL

$related_url = "related_videos.php";
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head id="Head1" data-cast-api-enabled="true">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Fake Player</title>
<link rel="shortcut icon" href="https://kodi.al/panel.ico"/>
<link rel="icon" href="https://kodi.al/panel.ico"/>
<meta name="referrer" content="origin" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta property="og:image" content="https://png.kodi.al/tv/albdroid/black.png" />
<meta property="geo.region" content="AL" />

<style>
body,
html {
    background-color: #000;
    margin: 0px;
    padding: 0;
    width: 100%;
    height: 100%;
    border: none;
}

#player{position:absolute;width:100%!important;height:100%!important;}
</style>
<style>
.fullWidth {
width: 100%;
height: 100%;
}
</style>
</head>
<body style="margin: 0; padding: 0; background-color: black;">

<script src="js/jquery-1.7.2.min.js" type="text/javascript"></script>

<div id="player">
</div>

<!---->
    <!-- JW library -->
	<!-- RED PLAYER -->
    <script src="https://content.jwplatform.com/libraries/VYeXGx84.js" type="text/javascript"></script>
	<!-- RED PLAYER -->

    <!-- DEFAULT PLAYER --/>
    <script src="//content.jwplatform.com/libraries/IDzF9Zmk.js" type="text/javascript"></script>
<!-- DEFAULT PLAYER -->

<!-- Bitmovin PLAYER -->
<script src="https://bitmovin-a.akamaihd.net/bitmovin-player/stable/7.6/bitmovinplayer.js"></script>

<script src="player_loader.js"></script>

<script type = "text/javascript">

var changeMyHeight = 0;
var w = 0;
var h = 0;

var BitdashW = "100%";
var BitdashH = "100%";

var kwikplayer;
Setwidthheight();

$("form").submit(function(e) {
    e.preventDefault();
});

$(window).resize(function() {
    Setwidthheight()
});

function Setwidthheight() {

    if ($('.HiddenMyHeight').val() > 0 && $('.HiddenMyWidth').val() > 0) {
        w = $('.HiddenMyWidth').val();
        h = $('.HiddenMyHeight').val();

        BitdashW = $('.HiddenMyWidth').val() + 'px';
        BitdashH = $('.HiddenMyHeight').val() + 'px';

    } else {
        w = parseInt(document.body.offsetWidth);
        h = parseInt($(window).height());
    }
}

//<![CDATA[
function playVideo(AutoStart, Mute) {
    Setwidthheight()
    var VideoName = $('.HiddenFilename').val();
    var VideoImage = $('.HiddenThumbnail').val();
    var VideoSharingLink = $('.HiddenSharingLink').val();
    var HiddenVttName = $('.HiddenVttName').val();
    var HiddenBufferLength1 = $('.HiddenBufferLength').val();
    var HiddenSkin1 = $('.HiddenSkin').val();
    /*
    Player Types
    */
    var PlayerType = "<?php echo $Player_Type; ?>";
    var staticUrl = '';
    var url = (window.location != window.parent.location) ?
        document.referrer :
        document.location.href;
    if (!url || url.indexOf("vod-platform") >= 0)
        url = staticUrl;
    url = removeURLParameter(url, "utm_source");
    url = removeURLParameter(url, "utm_medium");
    url = removeURLParameter(url, "utm_campaign");
    url = removeURLParameter(url, "utm_term");

    if (url.indexOf("?") > -1)
        url = url + "&utm_source=FakePlayer&utm_medium=Share&utm_campaign=FakePlayer";
    else
        url = url + "?utm_source=FakePlayer&utm_medium=Share&utm_campaign=FakePlayer";

// FIXED THIS PLAYER PLAYING AS FIRST STREAM MPD FORMAT
    if (PlayerType == 'bitdash') {
        $('.HiddenIsBitdash').val(1);
        var myhHlsLink = $('.HiddenmyhHlsLink').val();
        var myDashLink = $('.HiddenmyDashLink').val();
        var Poster = $('. HiddenThumbnail.Value').val();
        var VttName = $('. HiddenVttName.Value').val();
        var aspectratio = $('. Hiddenaspectratio.Value').val();

        var conf = {
            key: "000",

            source: {
                hls: "<?php echo $hls_url; ?>",
                dash: "<?php echo $mpd_url; ?>",
                poster: "<?php echo $image_url; ?>",
                tracks: [
				{
                    file: "<?php echo $vtt_url; ?>",
                    kind: 'thumbnails'
                }
				]
            },

            playback: {
                autoplay: AutoStart,
                muted: Mute,
                playsInline: true

            },

            style: {
                width: BitdashW,
                aspectratio: "16:9"
            },

            tweaks: {
                autoqualityswitching: true,
                trun_version: 1,
                startup_threshold: 3,
                max_buffer_level: 300,
                context_menu_entries: [{
                    name: 'VOD Platform',
                    url: "https://www.varikarin.com"
                }],
            },

            cast: {
                enable: true,
				receiverStylesheetUrl: "css/itw.css"
            },

            events: {
                onPlay: function(data) {
                    if ($('.HiddenSeek').val() != '0') {
                        ForwardVideo($('.HiddenSeek').val());
                        $('.HiddenSeek').val('0');
                    }
                },

                onTimeChanged: function(e) {
                    $('.callbackPosition').val(e.time);
                    var percentPlayed = Math.floor(e.time * 100 / player.getDuration());
                    LogPlay(percentPlayed);
                },

                onSeek: function(e) {
                    $('.SeekFrom').val(e.position);
                    $('.SeekTo').val(e.seekTarget);
                }
            },

            skin: {
            "screenLogoUrl": "https://www.varikarin.com"
            }
        };

        var player = bitmovin.player("player");
        player.setup(conf).then(function(value) {
        },
		function(reason) {
        });

    } else
    if (PlayerType == "kwikmotion") {

        if ($('.HiddenMyWidth').val() === "100%" && $('.HiddenMyHeight').val() === "100%") {
            $('.DivPlayer,.FirstPlayer,#player').addClass("fullWidth");
            setTimeout(function() {
                $('#player').find('.dvJsPlayer').addClass('fullWidth');
                $('#player').find('.dvJsPlayer').find('#player_itwplayer').addClass('fullWidth');
                $('#player').find('.dvJsPlayer').find('.player_itwplayer-dimensions').find('.vjs-tech').addClass('fullWidth');
            }, 1000);
        }

        kwikMotion("player", {
            image: $("#HiddenThumbnail").val(),
            ga: {
                events: ['play', 'timeupdate', 'ended']
            },

            inlinevolume: false,
            preload: "none",
            adblocker: false,
            resume: false,
            aspectratio: "16:9",
            sharing: url,
            mediaid: $("#HiddenMyKey").val(),
            autostart: AutoStart,
            mute: Mute,
            sources: [
			{
                file: "<?php echo $hls_url; ?>"
            },
            {
            file: "<?php echo $mpd_url; ?>"
            },
            {
            file: "<?php echo $manifest_url; ?>"
            }
            ],
            tracks: [{
                file: "<?php echo $vtt_url; ?>",
                kind: "thumbnails"
            }],
        });

        //kwikMotion("player").on('timeupdate', function () {
        // var currentTime = this.currentTime();
        // var percentPlayed = Math.floor(currentTime * 100 / this.duration());
        //    //var Time = $('.callbackPosition').val();
        //    //parent.postMessage("Time/" + Time, "*");
        //    //var Time = $('.callbackPosition').val();
        //    parent.postMessage("PercentPlayed/" + percentPlayed, "*");
        //    //LogPlay(percentPlayed);
        //    //console.log(percentPlayed);
        //});

        window.addEventListener("resize", function() {
        });

        window.addEventListener("orientationchange", function() {
            if (screen.orientation.angle != 0) {
            } else {
            }
        });

    } else {

// JW PLAYER FIXED
        jwplayer('player').setup({
            width: '100%',
            aspectratio: "16:9",
            autostart: AutoStart,
            mute: Mute,
            preload: "auto",
            cast: {},
            stretching: "uniform",
            abouttext: "JW Player",
            aboutlink: "https://www.jwplayer.com/",

            playlist: [{
                    image: "<?php echo $image_url; ?>",
                    sources: [
					{
                        file: "<?php echo $hls_url; ?>"
                    },
                    {
                        file: "<?php echo $mpd_url; ?>"
                    },
                    {
                    file: "<?php echo $manifest_url; ?>"
                    }
                    ],
                    tracks: [
					{
                        file: "<?php echo $vtt_url; ?>",
                        kind: "thumbnails"
                        }
                    ]
                }],

            related: {
                file: "<?php echo $related_url; ?>",
                onclick: 'play'
            },

            sharing: {
                link: url,
                sites: ['facebook', 'twitter', 'googleplus', 'pinterest', 'linkedin', 'reddit', 'tumblr', 'email']
            },

            ga: {}
        });

        jwplayer().on("time", function(event) {

            if ($('.HiddenEndSeeking').val() != '0') {
                if (event.position > $('.HiddenEndSeeking').val()) {
                    jwplayer().stop();
                }
            }
        });

        jwplayer().on("play", function(event) {
            if ($('.HiddenSeek').val() != '0') {
                ForwardVideo($('.HiddenSeek').val());
                $('.HiddenSeek').val('0');
            }
        });

        if ($('input#HiddenCountPlay').val() == 1) {
            jwplayer().on('time', function(e) {
                var percentPlayed = Math.floor(e.position * 100 / e.duration);
                LogPlay(percentPlayed);
            });
        }

        jwplayer().on('seek', function(event) {
            $('.SeekFrom').val(event.position);
            $('.SeekTo').val(event.offset);
        });

        jwplayer().on('fullscreen', function(event) {
            try {
                var remote_form = parent.document.forms["myForm"];
                var function1 = remote_form.callFunction;
                function1.click();
            } catch (e) {
                var ee = e.message || 0;
            }
        });

        jwplayer().on('time', function(event) {
            var Position = event.position;

            var OntimeGR = $('.OntimeGR').val();
            var OntimeLT = $('.OntimeLT').val();

            $('.callbackduration').val(event.duration);
            $('.callbackPosition').val(event.position);

        });

        jwplayer().on('adBlock', function() {
            if ($("#HiddenBlockMessage").val() != "" && $("#HiddenHasAds").val() == 1) {
                $("#dvBlock").show();
                jwplayer().remove();
            }
        });
    }
}

function removeURLParameter(url, parameter) {

    var urlparts = url.split('?');
    if (urlparts.length >= 2) {

        var prefix = encodeURIComponent(parameter) + '=';
        var pars = urlparts[1].split(/[&;]/g);

        for (var i = pars.length; i-- > 0;) {

            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }

        url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
        return url;
    } else {
        return url;
    }
}
//]]>
</script>

<script src="js/Embed_Functions.js?v=86&v2=1" type="text/javascript"></script>
</div>
<script type="text/javascript">
//<![CDATA[
playVideo(false, false)//]]>
</script>
</form>
</body>
</html>
