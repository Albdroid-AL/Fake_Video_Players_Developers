(function () {
    var defaults = {
        width: 0, height: 0, basePath: ""
    },
        extend = function () {
            var args, target, i, object, property;
            args = Array.prototype.slice.call(arguments);
            target = args.shift() || {};
            for (i in args) {
                object = args[i];
                for (property in object) {
                    if (object.hasOwnProperty(property)) {
                        if (typeof object[property] === 'object') {
                            target[property] = extend(target[property], object[property]);
                        } else {
                            target[property] = object[property];
                        }
                    }
                }
            }
            return target;
        },
        getComputedStyle = function (el, pseudo) {
            return function (prop) {
                if (window.getComputedStyle) {
                    return window.getComputedStyle(el, pseudo)[prop];
                } else {
                    return el.currentStyle[prop];
                }
            };
        },
        offsetParent = function (el) {
            if (el.nodeName !== 'HTML' && getComputedStyle(el)('position') === 'static') {
                return offsetParent(el.offsetParent);
            }
            return el;
        },
        getScrollOffset = function () {
            if (window.pageXOffset) {
                return {
                    x: window.pageXOffset,
                    y: window.pageYOffset
                };
            }
            return {
                x: document.documentElement.scrollLeft,
                y: document.documentElement.scrollTop
            };
        },
        parseImageLink = function (imglocation) {
            var lsrc, clip, hashindex, hashstring;
            hashindex = imglocation.indexOf('#');
            if (hashindex === -1) {
                return { src: imglocation, w: 0, h: 0, x: 0, y: 0 };
            }
            lsrc = imglocation.substring(0, hashindex);
            hashstring = imglocation.substring(hashindex + 1);
            if (hashstring.substring(0, 5) !== 'xywh=') {
                return { src: defaults.basePath + lsrc, w: 0, h: 0, x: 0, y: 0 };
            }
            var data = hashstring.substring(5).split(',');
            return { src: defaults.basePath + lsrc, w: parseInt(data[2]), h: parseInt(data[3]), x: parseInt(data[0]), y: parseInt(data[1]) };
        };

    isMobileDevice = function () {
        return (/Android/.test(window.navigator.userAgent) || /iP(hone|ad|od)/i.test(window.navigator.userAgent));
    };
    /**
     * register the thubmnails plugin
     */
    var registerPlugin = videojs.registerPlugin || videojs.plugin;
    registerPlugin('thumbnails', function (options) {
        var div, dvAllThumb, dvAllThumbWrapper, settings, img, player, progressControl, duration, moveListener, moveCancel, thumbTrack, toHolder;
        defaults.basePath = options.basePath || defaults.basePath;
        settings = extend({}, defaults, options);
        player = this;
        //detect which track we use. For now we just use the first metadata track
        player.on("loadedmetadata", function () {

            var numtracks = player.textTracks().length;
            if (numtracks === 0) {
                return;
            }
            i = 0;
            while (i < numtracks) {
                var tt = player.textTracks()[i];
                if (tt.kind === 'metadata' && tt.src && tt.src.indexOf(".vtt") > 0) {
                    thumbTrack = player.textTracks()[i];
                    //Chrome needs this
                    thumbTrack.mode = 'hidden';
                    break;
                }
                i++;
            }
            (function () {
                var progressControl, addFakeActive, removeFakeActive;
                // Android doesn't support :active and :hover on non-anchor and non-button elements
                // so, we need to fake the :active selector for thumbnails to show up.
                if (navigator.userAgent.toLowerCase().indexOf("android") !== -1) {
                    progressControl = player.controlBar.progressControl;

                    addFakeActive = function () {
                        progressControl.addClass('fake-active');
                    };
                    removeFakeActive = function () {
                        progressControl.removeClass('fake-active');
                    };

                    progressControl.on('touchstart', addFakeActive);
                    progressControl.on('touchend', removeFakeActive);
                    progressControl.on('touchcancel', removeFakeActive);
                }
            })();

            // create the thumbnail
            div = document.createElement('div');
            div.className = 'vjs-thumbnail-holder';
            img = document.createElement('img');
            div.appendChild(img);
            img.className = 'vjs-thumbnail';

            // create the div that will hold all the thumbnials
            dvAllThumb = document.createElement('div');
            dvAllThumb.className = 'vjs-all-thumbnail-holder';
            dvAllThumbWrapper = document.createElement('div');
            dvAllThumbWrapper.className = 'vjs-all-thumbnail-wrapper';
            dvAllThumb.appendChild(dvAllThumbWrapper);
            // keep track of the duration to calculate correct thumbnail to display
            duration = player.duration();

            player.controlBar.el().appendChild(dvAllThumb);

            // when the container is MP4
            player.on('durationchange', function (event) {
                duration = player.duration();
            });

            // when the container is HLS
            player.on('loadedmetadata', function (event) {
                duration = player.duration();
            });

            // add the thumbnail to the player
            progressControl = player.controlBar.progressControl;
            progressControl.el().appendChild(div);


            moveListener = function (event) {
                var mouseTime, time, active, left, setting, pageX, right, width, halfWidth, pageXOffset, clientRect, ccue;
                active = 0;
                pageXOffset = getScrollOffset().x;
                clientRect = offsetParent(progressControl.el()).getBoundingClientRect();
                right = (clientRect.width || clientRect.right) + pageXOffset;

                pageX = event.pageX;
                if (event.changedTouches) {
                    pageX = event.changedTouches[0].pageX;
                }

                // find the page offset of the mouse
                left = pageX || (event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
                // subtract the page offset of the positioned offset parent
                left -= offsetParent(progressControl.el()).getBoundingClientRect().left + pageXOffset;

                // apply updated styles to the thumbnail if necessary
                // mouseTime is the position of the mouse along the progress control bar
                // `left` applies to the mouse position relative to the player so we need
                // to remove the progress control's left offset to know the mouse position
                // relative to the progress control
                //mouseTime = Math.floor((Math.abs(left - progressControl.el().offsetLeft)) / progressControl.width() * duration);

                mouseTime = Math.floor((left - 10) / progressControl.seekBar.width() * duration);
                //console.log("left: " + (left - 10) + " offset left:" + progressControl.el().offsetLeft + "width:" + progressControl.seekBar.width() + " " + mouseTime);
                //Now check which of the cues applies
                var cnum = thumbTrack && thumbTrack.cues.length;
                // save the index of the ccue because i will be set to 0 later;
                if (toHolder)
                    clearTimeout(toHolder);
                var ind;
                i = 0;
                while (i < cnum) {
                    ccue = thumbTrack.cues[i];
                    if (ccue.startTime <= mouseTime && ccue.endTime >= mouseTime) {
                        setting = parseImageLink(ccue.text);
                        break;
                    }
                    i++;
                }
                ind = i;
                //create all the thumbnails
                if (!isMobileDevice()) {
                    dvAllThumbWrapper.innerHTML = '';
                    dvAllThumbWrapper.style.width = (player.controlBar.width() + 220) + "px";
                    var CountImg = Math.ceil(player.controlBar.width() / 110);
                    if (CountImg % 2 == 0)
                        CountImg++;

                    var x = Math.round(i - CountImg / 2);
                    //if (x <= 0)
                    //    x = 0;
                    //else
                    if (cnum - x < CountImg) {
                        x = cnum - CountImg;
                    }
                    if (x <= 0)
                        x = 0;

                    i = 0;
                    while (x < cnum && i < CountImg) {
                        ccue = thumbTrack.cues[x];
                        var setting2 = parseImageLink(ccue.text);
                        imgThumb = document.createElement('img');
                        imgThumb.className = 'vjs-small-thumbnail';
                        imgThumb.src = setting2.src;
                        dvAllThumbWrapper.appendChild(imgThumb);
                        if (x == ind) {
                            imgThumb.className = 'vjs-selected-thumbnail';
                        }
                        x++;
                        i++;
                    }
                }


                //None found, so show nothing
                if (typeof setting === 'undefined') {
                    return;
                }

                //Changed image?
                if (setting.src && img.src != setting.src) {
                    img.src = setting.src;
                }

                //Fall back to plugin defaults in case no height/width is specified
                if (settings.width) {
                    setting.w = settings.width;
                }
                if (settings.height) {
                    setting.h = settings.height;
                }

                //Set the container width/height if it changed
                if (div.style.width != setting.w || div.style.height != setting.h) {
                    div.style.width = setting.w + 'px';
                    div.style.height = setting.h + 'px';
                }
                //Set the image cropping
                img.style.left = -(setting.x) + 'px';
                img.style.top = -(setting.y) + 'px';
                //added by ahmad
                img.style.width = setting.w + 'px';
                img.style.height = setting.h + 'px'
                img.style.clip = 'rect(' + setting.y + 'px,' + (setting.w + setting.x) + 'px,' + (setting.y + setting.h) + 'px,' + setting.x + 'px)';

                width = setting.w;
                halfWidth = width / 2;

                // make sure that the thumbnail doesn't fall off the right side of the left side of the player
                if ((left + halfWidth) > right) {
                    left = right - width;
                } else if (left < halfWidth) {
                    left = 0;
                } else {
                    left = left - halfWidth;
                }

                div.style.left = left + 'px';
                if (!isMobileDevice()) {
                    dvAllThumb.style.opacity = 1;
                    img.style.display = "none";
                    dvAllThumb.style.height = "105px";
                }

            };

            // update the thumbnail while hovering
            progressControl.on('mousemove', moveListener);
            progressControl.on('touchmove', moveListener);


            moveCancel = function (event) {
                div.style.left = '-1000px';
                if (toHolder)
                    clearTimeout(toHolder);
                toHolder = setTimeout(function () {
                    dvAllThumb.style.opacity = 0;
                    dvAllThumb.style.height = "0px";
                }, 500)

            };

            // move the placeholder out of the way when not hovering
            progressControl.on('mouseout', moveCancel);
            progressControl.on('touchcancel', moveCancel);
            progressControl.on('touchend', moveCancel);
            //player.on('userinactive', moveCancel);

        });

    });
})();
