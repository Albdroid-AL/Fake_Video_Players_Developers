<?php

//CORS HEADERS
header('content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT');
header('Access-Control-Allow-Headers: accept, content-type');

if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === 'off') {
  $protocol = 'http://';
} else {
  $protocol = 'https://';
}

$ROOT_PATH = $protocol . $_SERVER['SERVER_NAME'] . dirname($_SERVER['PHP_SELF']) . "/";
$ROOT_URL = $protocol . $_SERVER['SERVER_NAME'] . dirname($_SERVER['PHP_SELF']) . "/";
$useragent = isset($_GET['ua']) ? $_GET['ua'] : null;
$title = isset($_GET['title']) && !empty($_GET['title']) ? $_GET['title'] : "TRC4";
$referrer = isset($_GET['referrer']) && !empty($_GET['referrer']) ? $_GET['referrer'] : "kodi.al";
$image = isset($_GET['image']) && !empty($_GET['image']) ? $_GET['image'] : "https://png.kodi.al/tv/albdroid/black.png";
if (!isset($_GET['url'])) {

$empty_url = array(
"App" => "HLS Proxy",
	"Version" => "1.1",
	"Platform" => "Web Player API",
    "Message" => "HLS URL Parameter Required",
    "Parameters" => "?url=STREAM_URL&title=MY TITLE&referrer=MY REFERER&image=MY IMAGE URL",
	"Without Title" => "{$ROOT_URL}?url=https://abr.de1se01.v2beat.live/playlist.m3u8",
	"With Title" => "{$ROOT_URL}?url=https://abr.de1se01.v2beat.live/playlist.m3u8&title=BuBA&image=http://albdroid.al/uploads/system_logo/logo.png",
    "With Title and Referrer" => "{$ROOT_URL}?url=https://abr.de1se01.v2beat.live/playlist.m3u8&title=BuBA&referrer=www.trc4.com",
    "PHP Code Generated From Host" => "demo.kodi.al",
    "PHP Code Generated Date" => "Friday, 08 January 2021 - 04:23:14"
);

$print_empty_url = json_encode($empty_url);
echo $print_empty_url;
  return -1;
}

if(isset($_POST["url"]) && !empty($_POST["url"])) {
    } else { 
    $url = $_GET["url"];

// REMOVE SPACES FROM HTTP(s) LINKS
$url = str_replace(
    array(" "),
    array("%20"),
    $url
);

$i = 1;
$json_data = [
"id" => $i++,
"title" => $title,
"image" => $image,
"live" => true,
"live_done" => false,
"countdown" => false,
"countdown_timestamp" => "",
"file" => ($url),
"sources" => [],
"referrer" => $referrer
];
$json_data = str_replace('\\/', '/', json_encode($json_data));
echo $json_data;
}
?>