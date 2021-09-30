/*
 * Video.js design studio 
 *
 * Licensed under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define['amd']) {
        define(['video.js', 'videojs-contrib-ads'], function (videojs) { factory(window, document, videojs) });
    } else if (typeof exports === 'object' && typeof module === 'object') {
        var vjs = require('video.js');
        factory(window, document, vjs);
    } else {
        factory(window, document, videojs);
    }
})(function (window, document, videojs) {
    "use strict";

    var extend = function (obj) {
        var arg;
        var index;
        var key;
        for (index = 1; index < arguments.length; index++) {
            arg = arguments[index];
            for (key in arg) {
                if (arg.hasOwnProperty(key)) {
                    obj[key] = arg[key];
                }
            }
        }
        return obj;
    };

    var defaults = {
        logo: '',
        hideLogo: true,
        link: '#',
        position: 'TopLeft',
        logoMargin: '0',
        primary: '',
        highlight: '',
        background: '',
        thumbContainerBG: '',
        playProgressColor: '',
        loadProgressColor: '',
        progressHolderColor: ''
    };

    var init = function (options, readyCallback) {
        this.designStudio = new designStudio(this, options);
    };
                              
    var designStudio =function (player, options) {
                   
        this.ChangeOptions=function(options)
        {
            var settings = videojs.mergeOptions(defaults, options);

            var link;
            if (settings.link != '#') {              
                link = document.createElement("a");
                link.id = "vjs-logo-link";
                link.href = settings.link;
                link.target = "_blank";
            }

            if (settings.logo != '') {
                var image = document.createElement('img');
                image.id = 'vjs-logo-image';

                image.src = settings.logo;
                if (settings.logoMargin != "")
                    image.style.margin = settings.logoMargin + "px";
                image.className = settings.position;
                if (link) {
                    var cObj = document.getElementById("vjs-logo-link");
                    if (cObj)
                        cObj.parentNode.removeChild(cObj);

                    link.appendChild(image);
                    player.el().appendChild(link);
                }
                else {
                    var cObj = document.getElementById("vjs-logo-image");
                    if (cObj)
                        cObj.parentNode.removeChild(cObj);
                    player.el().appendChild(image);
                }

                if (settings.hideLogo) {
                    image.classList.add("HideOnPlay");
                }
                else
                { image.classList.remove("HideOnPlay");}
            }

            var curStyle = document.getElementById("vjs-style")
            if (curStyle)
            {
                curStyle.parentNode.removeChild(curStyle);
            }

            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = '';
            style.id = "vjs-style";
            if (settings.background) {
                style.innerHTML += '.vjs-loading-spinner{border: 6px solid ' + settings.background + '}';
                style.innerHTML += '.vjs-control-bar,.vjs-big-play-button,.vjs-menu-content,.vjs-volume-control,.vjs-mouse-display .vjs-time-tooltip,.playlistOpenIcon{background-color:' + GetRgba(settings.background, "0.7") + '!important; }';
                style.innerHTML += '.vjs-play-progress .vjs-time-tooltip{color:' + settings.background + '}';
                style.innerHTML += '.vjs-ScrollStyle::-webkit-scrollbar,.vjs-ScrollStyle::-webkit-scrollbar-track{background-color:' + settings.background + "}";
            }
            if (settings.primary) {
                style.innerHTML += '.vjs-menu-button,.vjs-control,.vjs-icon-placeholder,.vjs-menu-item, .vjs-mouse-display .vjs-time-tooltip,.vjs-playlist-name { color: ' + settings.primary + '!important; }';
                style.innerHTML += '.vjs-play-progress:before,.vjs-menu-content .vjs-selected:hover{color:' + settings.primary + '!important; }';
                style.innerHTML += '.vjs-volume-bar,.vjs-play-progress .vjs-time-tooltip{background-color:' + settings.primary + '!important; }';
                style.innerHTML += '.vjs-ScrollStyle::-webkit-scrollbar-thumb{ background-color:' +  settings.primary  + '!important;}'
            }
            if (settings.highlight) {
                style.innerHTML += '.vjs-control:hover,.vjs-button:hover,.vjs-icon-placeholder:hover, .vjs-menu-item:hover,.vjs-hls-active,.vjs-playlist-now-playing-text, .vjs-up-next-text{color:' + settings.highlight + '!important;}';
                style.innerHTML += '.vjs-menu-content .vjs-selected{background-color:' + settings.highlight + '!important;}';
            }
            if (settings.thumbContainerBG) {

                style.innerHTML += '.vjs-all-thumbnail-holder{background-color:' + GetRgba(settings.thumbContainerBG, "0.5") + '!important;}';
            }

            if (settings.playProgressColor) {
                style.innerHTML += '.vjs-play-progress,.vjs-volume-level{background-color: ' + settings.playProgressColor + '!important;}';
            }
            if (settings.loadProgressColor) {
                style.innerHTML += '.vjs-load-progress div{background: ' + GetRgba(settings.loadProgressColor, "0.75") + '!important;}';
            }
            if (settings.progressHolderColor) {
                style.innerHTML += '.vjs-progress-holder{background-color: ' + settings.progressHolderColor + '!important;}';
            }

            document.getElementsByTagName('head')[0].appendChild(style);
}

        this.ChangeOptions(options);

        function GetRgba(hex, alpha) {
            if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
                var c = hex.substring(1).split('');
                if (c.length == 3) {
                    c = [c[0], c[0], c[1], c[1], c[2], c[2]];
                }
                c = '0x' + c.join('');
                return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
            }

        }

    }

    videojs.registerPlugin('designStudio', init);

    });