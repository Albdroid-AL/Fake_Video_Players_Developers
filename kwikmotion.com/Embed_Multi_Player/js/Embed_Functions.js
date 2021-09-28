
var playerType = $(".HiddenPlayerType").val();
var TypeVideojs = "videojs";
var TypeBitdash = "bitdash";
var TypeKwikMotion = "kwikmotion";
var Typejwplayer = "jwplayer";

$(document).ready(function () {
    if (playerType == TypeVideojs) {
        var player = videojs('itwplayer');
        player.on("play", function () {
            if ($('.HiddenCompTag').val() != "" && $('.HiddenCompTag').val() == "lbci") {
                window.location = 'lbci:play';
            }
            parent.postMessage("Play/" + $('.HiddenVideoTitle').val(), "*");
        });
        player.on("pause", function () {
            if ($('.HiddenCompTag').val() != "" && $('.HiddenCompTag').val() == "lbci") {
                window.location = 'lbci:pause';
            }
            parent.postMessage("Pause/" + $('.HiddenVideoTitle').val(), "*");
        });
    }
    else if (playerType == TypeBitdash) {
        var player = bitmovin.player('player');
        player.addEventHandler("onPlay", function () {
            parent.postMessage("Play/" + $('.HiddenVideoTitle').val(), "*");
        });
        player.addEventHandler("onPause", function () {
            parent.postMessage("Pause/" + $('.HiddenVideoTitle').val(), "*");
        });

    }
    else if (playerType == Typejwplayer) {
        jwplayer().on('play', function () {
            parent.postMessage("Play/" + $('.HiddenVideoTitle').val(), "*");
        });
        jwplayer().on('pause', function () {
            parent.postMessage("Pause/" + $('.HiddenVideoTitle').val(), "*");
        });
        jwplayer().on('stop', function () {
            parent.postMessage("Stop/" + $('.HiddenVideoTitle').val(), "*");
        });
    }
    else {
        //kwikmotion
        var player = kwikMotion('player');
        player.on("play", function () {
            if ($('.HiddenCompTag').val() != "" && $('.HiddenCompTag').val() == "lbci") {
                window.location = 'lbci:play';
            }
            parent.postMessage("Play/" + $('.HiddenVideoTitle').val(), "*");
        });
        player.on("pause", function () {
            if ($('.HiddenCompTag').val() != "" && $('.HiddenCompTag').val() == "lbci") {
                window.location = 'lbci:pause';
            }
            parent.postMessage("Pause/" + $('.HiddenVideoTitle').val(), "*");
        });
        player.on('customclicked', function () {
            parent.postMessage("customclicked/" + $('.HiddenVideoTitle').val(), "*");
        });
        player.on('timeupdate', function () {
            var currentTime = this.currentTime();
            var percentPlayed = Math.floor(currentTime * 100 / this.duration());
            parent.postMessage("percentPlayed/" + percentPlayed, "*");
            parent.postMessage("Time/" + currentTime, "*");

        });
    }
});

function switchFeed() {
    $('.StreamingCount').show();
    var counter = 6;

    setInterval(function () {
        counter--;
        if (counter >= 0) {
            span = document.getElementById("count");
            span.innerHTML = "Switching Stream in " + counter + " seconds";
        }
        // Display 'counter' wherever you want to display it.
        if (counter === 0) {
            $('.StreamingCount').fadeOut();
            $('.FirstPlayer').hide();
            $('.PlayerOnError').fadeIn();
            clearInterval(counter);
        }
    }, 1000);
}

function PlayPauseMyVideo() {
    if (playerType == TypeVideojs) {
        var player = videojs('itwplayer');
        if (player.paused()) {
            player.play();
        }
        else
            player.pause();
    }
    else if (playerType == TypeBitdash) {
        var player = bitmovin.player('player');
        player.play();
    }
    else if (playerType == Typejwplayer) {
        jwplayer().play();
    }
    else {
        //kwikmotion
        var player = kwikMotion('player');
        if (player.paused()) {
            player.play();
        }
        else
            player.pause();
    }
}

function PlayMyVideo() {

    if (playerType == TypeVideojs) {
        var player = videojs('itwplayer');
        player.play();
    }
    else if (playerType == TypeBitdash) {
        var player = bitmovin.player('player');
        player.play();
    }
    else if (playerType == Typejwplayer) {
        jwplayer().play('true');
    }
    else {
        //kwikmotion
        var player = kwikMotion('player');
        player.play();
    }
}

function PauseMyVideo() {
    if (playerType == TypeVideojs) {
        var player = videojs('itwplayer');
        player.pause();
    }
    else if (playerType == TypeBitdash) {
        var player = bitmovin.player('player');
        player.pause();
    }
    else if (playerType == Typejwplayer) {
        jwplayer().pause('true');
    }
    else {
        //kwikmotion
        var player = kwikMotion('player');
        player.pause();
    }
}

function StopMyVideo() {
    if (playerType == TypeVideojs) {
        var player = videojs('itwplayer');
        player.pause();
    }
    else if (playerType == TypeBitdash) {
        var player = bitmovin.player('player');
        player.pause();
    }
    else if (playerType == Typejwplayer) {
        jwplayer().stop();
    }
    else {
        //kwikmotion
        var player = kwikMotion('player');
        player.pause();
    }
}

function ForwardVideo(obj) {
    if (playerType == TypeVideojs) {
        var player = videojs('itwplayer');
        var position = player.currentTime();
        position = parseInt(position, 10) + parseInt(obj, 10);
        player.currentTime(position);
    }
    else if (playerType == TypeBitdash) {
        var player = bitmovin.player('player');
        var position = player.getCurrentTime();
        position = parseInt(position, 10) + parseInt(obj, 10);
        player.seek(position);
    }
    else if (playerType == Typejwplayer) {
        var position = jwplayer().getPosition();
        position = parseInt(position, 10) + parseInt(obj, 10);
        setTimeout(function () {
            jwplayer().seek(position);
        }, 7000);
    }
    else {
        //kwikmotion
        var player = kwikMotion('player');
        var position = player.currentTime();
        position = parseInt(position, 10) + parseInt(obj, 10);
        player.currentTime(position);
    }

}
function BackwardVideo(obj) {
    if (playerType == TypeVideojs) {
        var player = videojs('itwplayer');
        var position = player.currentTime();
        position = parseInt(position, 10) - parseInt(obj, 10);
        player.currentTime(position);
    }
    else if (playerType == TypeBitdash) {
        var player = bitmovin.player('player');
        var position = player.getCurrentTime();
        position = parseInt(position, 10) - parseInt(obj, 10);
        player.seek(position);
    }
    else if (playerType == Typejwplayer) {
        var position = jwplayer().getPosition();
        position = parseInt(position, 10) - parseInt(obj, 10);
        jwplayer().seek(position);
    }
    else if (playerType == TypeKwikMotion) {
        //kwikmotion
        var player = kwikMotion('player');
        var position = player.currentTime();
        position = parseInt(position, 10) - parseInt(obj, 10);
        player.currentTime(position);
    }

}
function SetVolumePlayer(obj) {
    if (playerType == TypeVideojs) {
        var player = videojs('itwplayer');
        player.volume(parseInt(obj, 10) / 100);
    }
    else if (playerType == TypeBitdash) {
        var player = bitmovin.player('player');
        player.setVolume(parseInt(obj, 10));
    }
    else if (playerType == Typejwplayer) {
        jwplayer().setVolume(parseInt(obj, 10));
    }
    else {
        //kwikmotion
        var player = kwikMotion('player');
        player.volume(parseInt(obj, 10) / 100);
    }
}

function SetMutePlayer() {
    if (playerType == TypeVideojs) {
        var player = videojs('itwplayer');
        player.muted(true);
    }
    else if (playerType == TypeBitdash) {
        var player = bitmovin.player('player');
        player.mute()
    }
    else if (playerType == Typejwplayer) {
        jwplayer().setMute();
    }
    else {
        //kwikmotion
        var player = kwikMotion('player');
        player.muted(true);
    }


}

function unmute() {
    if (playerType == TypeVideojs) {
        var player = videojs('itwplayer');
        player.muted(false);
    }
    else if (playerType == TypeBitdash) {
        var player = bitmovin.player('player');
        player.unmute()
    }
    else if (playerType == Typejwplayer) {
        jwplayer().setMute(false);
    }
    else {
        //kwikmotion
        var player = kwikMotion('player');
        player.muted(false);
    }
}

function enterFullscreen() {
    if (playerType == TypeVideojs) {
        var player = videojs('itwplayer');
        player.enterFullScreen();
    }
    else if (playerType == TypeBitdash) {
        var player = bitmovin.player('player');
        player.enterFullscreen()
    }
    else if (playerType == Typejwplayer) {

    }
    else {
        //kwikmotion
        var player = kwikMotion('player');
        player.enterFullScreen();
    }
}

function exitFullscreen() {
    if (playerType == TypeVideojs) {
        var player = videojs('itwplayer');
        player.exitFullscreen();
    }
    else if (playerType == TypeBitdash) {
        var player = bitmovin.player('player');
        player.exitFullscreen()
    }
    else if (playerType == Typejwplayer) {

    }
    else {
        //kwikmotion
        var player = kwikMotion('player');
        player.enterFullScreen();
    }
}

function IncreaseVolumePlayer(obj) {

    var player;
    var Volume;
    if (playerType == TypeVideojs) {
        var player = videojs('itwplayer');
        Volume = player.volume() * 100;
    }
    else if (playerType == TypeBitdash) {
        player = bitmovin.player('player');
        Volume = player.getVolume();
    }
    else if (playerType == Typejwplayer) {
        Volume = jwplayer().getVolume();
    }
    else {
        //kwikmotion
        var player = kwikMotion('player');
        Volume = player.volume() * 100;
    }


    if (Volume + parseInt(obj, 10) > 100) {
        Volume = 100;
    }
    else {
        Volume += parseInt(obj, 10);
    }


    if (playerType == TypeVideojs) {
        player.volume(Volume / 100);
    }
    else if (playerType == TypeBitdash) {
        player.setVolume(Volume);
    }
    else if (playerType == Typejwplayer) {
        jwplayer().setVolume(Volume);
    }
    else {
        //kwikmotion
        player.volume(Volume / 100);
    }

}
function DecreaseVolumePlayer(obj) {

    var player;
    var Volume;
    if (playerType == TypeVideojs) {
        var player = videojs('itwplayer');
        Volume = player.volume() * 100;
    }
    else if (playerType == TypeBitdash) {
        player = bitmovin.player('player');
        Volume = player.getVolume();
    }
    else if (playerType == Typejwplayer) {
        Volume = jwplayer().getVolume();
    }
    else {
        //kwikmotion
        var player = kwikMotion('player');
        Volume = player.volume() * 100;
    }

    if (Volume >= parseInt(obj, 10)) {
        Volume -= parseInt(obj, 10);
    }
    else {
        Volume = 0;
    }

    if (playerType == TypeVideojs) {
        player.volume(Volume / 100);
    }
    else if (playerType == TypeBitdash) {
        player.setVolume(Volume);
    }
    else if (playerType == Typejwplayer) {
        jwplayer().setVolume(Volume);
    }
    else {
        //kwikmotion
        player.volume(Volume / 100);
    }
}
function NextVideo() {
    if (playerType == TypeVideojs) {

    }
    else if (playerType == TypeBitdash) {

    }
    else if (playerType == Typejwplayer) {
        var Myplaylist = jwplayer().getPlaylist();
        var listItemsCount = Myplaylist.length;
        var NowPlayingIndex = jwplayer().getPlaylistIndex();

        if (NowPlayingIndex + 1 <= listItemsCount - 1) {
            jwplayer().playlistItem(NowPlayingIndex + 1)
        }
        // getPlaylistItem(5)
    }
    else {
        //kwikmotion
    }
}
function PreviousVideo() {
    if (playerType == TypeVideojs) {

    }
    else if (playerType == TypeBitdash) {

    }
    else if (playerType == Typejwplayer) {
        var NowPlayingIndex = jwplayer().getPlaylistIndex();
        if (NowPlayingIndex - 1 >= 0) {
            jwplayer().playlistItem(NowPlayingIndex - 1)
        }
    }
    else {
        //kwikmotion
    }
}

function getState() {
    if (playerType == TypeVideojs) {
        var player = videojs('itwplayer');

        if (player.ended()) {
            parent.postMessage("State/complete", "*");
            return;
        }

        var state = player.readyState();

        if (!player.paused() && state >= 2) {
            parent.postMessage("State/playing", "*");
            return;
        }
        if (player.paused() && state >= 2) {
            parent.postMessage("State/paused", "*");
            return;
        }
        if (state == 0)
            parent.postMessage("State/idle", "*");
        if (state == 1)
            parent.postMessage("State/buffering", "*");



    }
    else if (playerType == TypeBitdash) {
        var player = bitmovin.player('player');
        if (player.hasEnded()) {
            parent.postMessage("State/complete", "*");
            return;
        }
        if (player.isPlaying()) {
            parent.postMessage("State/playing", "*");
            return;
        }
        if (player.isPaused()) {
            parent.postMessage("State/paused", "*");
            return;
        }
        if (player.isReady()) {
            parent.postMessage("State/idle", "*");
        }
        if (player.isStalled()) {
            parent.postMessage("State/buffering", "*");
        }

    } else if (playerType == Typejwplayer) {
        var Mystate = jwplayer().getState();
        parent.postMessage("State/" + Mystate, "*");
    }
    else {
        //kwikmotion
        var player = kwikMotion('player');

        if (player.ended()) {
            parent.postMessage("State/complete", "*");
            return;
        }

        var state = player.readyState();

        if (!player.paused() && state >= 2) {
            parent.postMessage("State/playing", "*");
            return;
        }
        if (player.paused() && state >= 2) {
            parent.postMessage("State/paused", "*");
            return;
        }
        if (state == 0)
            parent.postMessage("State/idle", "*");
        if (state == 1)
            parent.postMessage("State/buffering", "*");
    }
}

function getStateWithKey() {
    if (playerType == TypeVideojs) {
        var player = videojs('itwplayer');

        var state = player.readyState();

        if (player.ended()) {
            parent.postMessage("stateWithKey/complete" + '-' + $('.HiddenKey').val(), "*");
            return;
        }

        if (!player.paused() && state >= 2) {
            parent.postMessage("stateWithKey/playing" + '-' + $('.HiddenKey').val(), "*");
            return;
        }
        if (player.paused() && state >= 2) {
            parent.postMessage("stateWithKey/paused" + '-' + $('.HiddenKey').val(), "*");
            return;
        }
        if (state == 0)
            parent.postMessage("stateWithKey/idle" + '-' + $('.HiddenKey').val(), "*");
        if (state == 1)
            parent.postMessage("stateWithKey/buffering" + '-' + $('.HiddenKey').val(), "*");
    }
    else if (playerType == TypeBitdash) {
        var player = bitmovin.player('player');

        if (player.hasEnded()) {
            parent.postMessage("stateWithKey/complete" + '-' + $('.HiddenKey').val(), "*");
            return;
        }

        if (player.isPlaying()) {
            parent.postMessage("stateWithKey/playing" + '-' + $('.HiddenKey').val(), "*");
            return;
        }
        if (player.isPaused()) {
            parent.postMessage("stateWithKey/paused" + '-' + $('.HiddenKey').val(), "*");
            return;
        }
        if (player.isReady()) {
            parent.postMessage("stateWithKey/idle" + '-' + $('.HiddenKey').val(), "*");
        }
        if (player.isStalled()) {
            parent.postMessage("stateWithKey/buffering" + '-' + $('.HiddenKey').val(), "*");
        }
    }
    else if (playerType == Typejwplayer) {

        var Mystate = jwplayer().getState() + '-' + $('.HiddenKey').val();
        parent.postMessage("stateWithKey/" + Mystate, "*");
    }
    else {
        //kwikmotion
        var player = kwikMotion('player');

        var state = player.readyState();

        if (player.ended()) {
            parent.postMessage("stateWithKey/complete" + '-' + $('.HiddenKey').val(), "*");
            return;
        }

        if (!player.paused() && state >= 2) {
            parent.postMessage("stateWithKey/playing" + '-' + $('.HiddenKey').val(), "*");
            return;
        }
        if (player.paused() && state >= 2) {
            parent.postMessage("stateWithKey/paused" + '-' + $('.HiddenKey').val(), "*");
            return;
        }
        if (state == 0)
            parent.postMessage("stateWithKey/idle" + '-' + $('.HiddenKey').val(), "*");
        if (state == 1)
            parent.postMessage("stateWithKey/buffering" + '-' + $('.HiddenKey').val(), "*");
    }
}


function GoToVideo(obj) {
    if (playerType == TypeVideojs) {

    }
    else if (playerType == TypeBitdash) {
    }
    else if (playerType == Typejwplayer) {
        jwplayer().playlistItem(parseInt(obj, 10))
    }
}
function getPosition() {
    if (playerType == TypeVideojs) {
        var player = videojs('itwplayer');
        var position = player.currentTime();
        parent.postMessage("Position/" + position, "*");
    }
    else if (playerType == TypeBitdash) {

        var player = bitmovin.player('player');
        var position = player.getCurrentTime();
        parent.postMessage("Position/" + position, "*");
    }
    else if (playerType == Typejwplayer) {
        var position = jwplayer().getPosition();
        //return position;
        parent.postMessage("Position/" + position, "*");
    }
    else {
        //kwikmotion
        var player = kwikMotion('player');
        var position = player.currentTime();
        parent.postMessage("Position/" + position, "*");
    }
}

function getDuration() {
    if (playerType == TypeVideojs) {
        var player = videojs('itwplayer');
        var Duration = player.duration();
        parent.postMessage("Duration/" + Duration, "*");
    }
    else if (playerType == TypeBitdash) {
        var player = bitmovin.player('player');
        var Duration = player.getDuration();
        parent.postMessage("Duration/" + Duration, "*");
    }
    else if (playerType == Typejwplayer) {
        var Duration = jwplayer().getDuration();
        //return Duration;
        parent.postMessage("Duration/" + Duration, "*");
    }
    else {
        //kwikmotion
        var player = kwikMotion('player');
        var Duration = player.duration();
        parent.postMessage("Duration/" + Duration, "*");
    }
}

function onSeek() {
    if (playerType == TypeVideojs) {
        var seek = $('.SeekFrom').val() + '/' + $('.SeekTo').val();
        parent.postMessage("Seek/" + seek, "*");
    }
    else if (playerType == TypeBitdash) {
        var seek = $('.SeekFrom').val() + '/' + $('.SeekTo').val();
        parent.postMessage("Seek/" + seek, "*");
    }
    else if (playerType == Typejwplayer) {
        var seek = $('.SeekFrom').val() + '/' + $('.SeekTo').val();
        parent.postMessage("Seek/" + seek, "*");
    }
    else {
        //kwikmotion
        var seek = $('.SeekFrom').val() + '/' + $('.SeekTo').val();
        parent.postMessage("Seek/" + seek, "*");
    }
}

function onTime() {
    if (playerType == TypeVideojs) {
        var Time = $('.callbackPosition').val();
        parent.postMessage("Time/" + Time, "*");
    }
    else if (playerType == TypeBitdash) {
        var Time = $('.callbackPosition').val();
        parent.postMessage("Time/" + Time, "*");
    }
    else if (playerType == Typejwplayer) {
        var Time = $('.callbackPosition').val(); // + '/' + $('.callbackduration').val() ;
        parent.postMessage("Time/" + Time, "*");
    }
    else {
        //kwikmotion
        var Time = $('.callbackPosition').val();
        parent.postMessage("Time/" + Time, "*");


    }
}
function goFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function toggleFullScreen() {
    //debugger;

    if (playerType == TypeVideojs) {
        goFullscreen(document.getElementById("itwplayer"));
    }
    else if (playerType == TypeBitdash) {
        var player = bitmovin.player('player');
        player.enterFullscreen();
    }
    else if (playerType == Typejwplayer) {
        //jwplayer().play('true');
    }
    else {
        //kwikmotion
        // goFullscreen(document.getElementById("player"));

        if (!kwikMotion("player").isFullscreen())
            kwikMotion("player").requestFullscreen();
        else
            kwikMotion("player").exitFullscreen();
    }
}

// Here "addEventListener" is for standards-compliant web browsers and "attachEvent" is for IE Browsers.
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

eventer(messageEvent, function (e) {
    console.log(e);
    if (e.data.type == "returnMeta") return



    var MyObj = e.data;
    console.log('1: ' + MyObj);
    $('.hiddenPostIF').val(e.data);
    var MyParam1 = ''
    //if (MyObj != '') {

    if (typeof MyObj == "string") {
        // try {
        MyParam1 = $('.hiddenPostIF').val().substring(MyObj.indexOf("/") + 1);
        // }
        // catch (e) {

        // }

        //  if (MyObj != 'onTime') alert(MyObj);

        if (MyObj == "PlayPauseMyVideo") {
            PlayPauseMyVideo();
        }
        if (MyObj == "PauseMyVideo") {
            PauseMyVideo();
        }
        if (MyObj == "PlayMyVideo") {
            PlayMyVideo();
        }
        if (MyObj == "StopMyVideo") {
            StopMyVideo();
        }
        if (MyObj.indexOf("BackwardVideo") > -1) {
            BackwardVideo(MyParam1);
        }
        if (MyObj.indexOf("ForwardVideo") > -1) {
            ForwardVideo(MyParam1);
        }
        if (MyObj.indexOf("SetVolumePlayer") > -1) {
            SetVolumePlayer(MyParam1);
        }
        if (MyObj.indexOf("IncreaseVolumePlayer") > -1) {
            IncreaseVolumePlayer(MyParam1);
        }
        if (MyObj.indexOf("DecreaseVolumePlayer") > -1) {
            DecreaseVolumePlayer(MyParam1);
        }
        if (MyObj == "NextVideo") {
            NextVideo();
        }
        if (MyObj == "PreviousVideo") {
            PreviousVideo();
        }
        if (MyObj == "SetMutePlayer") {
            SetMutePlayer();
        }

        if (MyObj == "getPosition") {
            getPosition();
        }
        if (MyObj == "getState") {
            getState();
        }
        if (MyObj == "getStateWithKey") {
            getStateWithKey();
        }
        if (MyObj == "getDuration") {
            getDuration();
        }
        if (MyObj == "onSeek") {
            onSeek();
        }

        if (MyObj == "onTime") {
            onTime();
        }

        if (MyObj == "toggleFullScreen") {
            toggleFullScreen();
        }


        // bitdash only
        if (MyObj == "unMute") {
            unmute();
        }
        if (MyObj == "enterFullscreen") {
            enterFullscreen();
        }
        if (MyObj == "exitFullscreen") {
            exitFullscreen();
        }
        if (MyObj == "customclicked") {
        }
    }
    //}
}, false);


