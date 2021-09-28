<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1" />
<title>Fake Developer</title>
<link rel="shortcut icon" href="https://kodi.al/panel.ico"/>
<link rel="icon" href="https://kodi.al/panel.ico"/>
<style type="text/css">
body,td,th {
	color: #0F0;
}
body {
	background-color: #000;
}
a:link {
	color: #0FC;
}
a:visited {
	color: #3F6;
}
a:hover {
	color: #09F;
}
a:active {
	color: #009;
}
</style>
<style>
    #player {
      height: auto !important;
      width: 100% !important;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto !important;
    }

video {
  object-fit: fill;
  <!-- object-fit: contain; -->
}
</style>
</head>
<body>
<div class="live__broadcast">
<div class="img-container video-container">
<!----/>
<div id="player"></div>
<!---->
<div id="player" style="width:100%; height:100%">
<div id="playeraudioOnly"></div>
<div id="dvMessage" style="display: none; height: 50px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; margin: auto; text-align: center; color: white; font-size: 20px; max-width: 500px; width: 100%; font-family: Myriad Pro, Arial">
<span id="lblMessage">an error has occured or your browser is out of date please update</span>
<script type="text/javascript" src="player_loader.js"></script>
<script>
kwikMotion("player", {
    aspectratio: "16:9",
    autostart: false,
    mediaid: "vari karin",

    image: "https://www.vibee.tv/SMS/art/artbig/bg-chart-parallax.jpg",
	title: "vibee.tv",
    autostart: "false",
	// playing hls/mpd/smil/Manifest/mp4/mp3 and any media shit
    sources: [
	{
        file: "https://abr.de1se01.v2beat.live/playlist.m3u8"
    },

	{
        file: "https://kodi.al/app_stream_tester/Capital%20T%20ft%20Cliqme%20X%20ft%20Koach2.0%20-%20Across%20The%20World.mp4"
    },

	{
        file: "https://kodi.al/app_stream_tester/Artiola%20Toska%20-%20Unaza.mp4"
    }
],
});
</script>
</div>
</div>
</div>
</div>
</body>
</html>