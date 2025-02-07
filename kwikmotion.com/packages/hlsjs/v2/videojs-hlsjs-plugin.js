/*! For license information please see videojs-hlsjs-plugin.js.LICENSE.txt */ ! function() {
    var t = {
            8: function(t) {
                "use strict";
                var e = Object.prototype.hasOwnProperty,
                    r = "~";

                function i() {}

                function n(t, e, r) {
                    this.fn = t, this.context = e, this.once = r || !1
                }

                function a(t, e, i, a, s) {
                    if ("function" != typeof i) throw new TypeError("The listener must be a function");
                    var o = new n(i, a || t, s),
                        l = r ? r + e : e;
                    return t._events[l] ? t._events[l].fn ? t._events[l] = [t._events[l], o] : t._events[l].push(o) : (t._events[l] = o, t._eventsCount++), t
                }

                function s(t, e) {
                    0 == --t._eventsCount ? t._events = new i : delete t._events[e]
                }

                function o() {
                    this._events = new i, this._eventsCount = 0
                }
                Object.create && (i.prototype = Object.create(null), (new i).__proto__ || (r = !1)), o.prototype.eventNames = function() {
                    var t, i, n = [];
                    if (0 === this._eventsCount) return n;
                    for (i in t = this._events) e.call(t, i) && n.push(r ? i.slice(1) : i);
                    return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(t)) : n
                }, o.prototype.listeners = function(t) {
                    var e = r ? r + t : t,
                        i = this._events[e];
                    if (!i) return [];
                    if (i.fn) return [i.fn];
                    for (var n = 0, a = i.length, s = new Array(a); n < a; n++) s[n] = i[n].fn;
                    return s
                }, o.prototype.listenerCount = function(t) {
                    var e = r ? r + t : t,
                        i = this._events[e];
                    return i ? i.fn ? 1 : i.length : 0
                }, o.prototype.emit = function(t, e, i, n, a, s) {
                    var o = r ? r + t : t;
                    if (!this._events[o]) return !1;
                    var l, u, c = this._events[o],
                        d = arguments.length;
                    if (c.fn) {
                        switch (c.once && this.removeListener(t, c.fn, void 0, !0), d) {
                            case 1:
                                return c.fn.call(c.context), !0;
                            case 2:
                                return c.fn.call(c.context, e), !0;
                            case 3:
                                return c.fn.call(c.context, e, i), !0;
                            case 4:
                                return c.fn.call(c.context, e, i, n), !0;
                            case 5:
                                return c.fn.call(c.context, e, i, n, a), !0;
                            case 6:
                                return c.fn.call(c.context, e, i, n, a, s), !0
                        }
                        for (u = 1, l = new Array(d - 1); u < d; u++) l[u - 1] = arguments[u];
                        c.fn.apply(c.context, l)
                    } else {
                        var h, f = c.length;
                        for (u = 0; u < f; u++) switch (c[u].once && this.removeListener(t, c[u].fn, void 0, !0), d) {
                            case 1:
                                c[u].fn.call(c[u].context);
                                break;
                            case 2:
                                c[u].fn.call(c[u].context, e);
                                break;
                            case 3:
                                c[u].fn.call(c[u].context, e, i);
                                break;
                            case 4:
                                c[u].fn.call(c[u].context, e, i, n);
                                break;
                            default:
                                if (!l)
                                    for (h = 1, l = new Array(d - 1); h < d; h++) l[h - 1] = arguments[h];
                                c[u].fn.apply(c[u].context, l)
                        }
                    }
                    return !0
                }, o.prototype.on = function(t, e, r) {
                    return a(this, t, e, r, !1)
                }, o.prototype.once = function(t, e, r) {
                    return a(this, t, e, r, !0)
                }, o.prototype.removeListener = function(t, e, i, n) {
                    var a = r ? r + t : t;
                    if (!this._events[a]) return this;
                    if (!e) return s(this, a), this;
                    var o = this._events[a];
                    if (o.fn) o.fn !== e || n && !o.once || i && o.context !== i || s(this, a);
                    else {
                        for (var l = 0, u = [], c = o.length; l < c; l++)(o[l].fn !== e || n && !o[l].once || i && o[l].context !== i) && u.push(o[l]);
                        u.length ? this._events[a] = 1 === u.length ? u[0] : u : s(this, a)
                    }
                    return this
                }, o.prototype.removeAllListeners = function(t) {
                    var e;
                    return t ? (e = r ? r + t : t, this._events[e] && s(this, e)) : (this._events = new i, this._eventsCount = 0), this
                }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = r, o.EventEmitter = o, t.exports = o
            },
            75: function(t, e, r) {
                var i, n, a, s, o, l;

                function u(t) {
                    return (u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                        return typeof t
                    } : function(t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    })(t)
                }
                t = r.nmd(t), n = /^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/?#]*)?((?:[^\/?#]*\/)*[^;?#]*)?(;[^?#]*)?(\?[^#]*)?(#[^]*)?$/, a = /^([^\/?#]*)([^]*)$/, s = /(?:\/|^)\.(?=\/)/g, o = /(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g, l = {
                    buildAbsoluteURL: function(t, e, r) {
                        if (r = r || {}, t = t.trim(), !(e = e.trim())) {
                            if (!r.alwaysNormalize) return t;
                            var i = l.parseURL(t);
                            if (!i) throw new Error("Error trying to parse base URL.");
                            return i.path = l.normalizePath(i.path), l.buildURLFromParts(i)
                        }
                        var n = l.parseURL(e);
                        if (!n) throw new Error("Error trying to parse relative URL.");
                        if (n.scheme) return r.alwaysNormalize ? (n.path = l.normalizePath(n.path), l.buildURLFromParts(n)) : e;
                        var s = l.parseURL(t);
                        if (!s) throw new Error("Error trying to parse base URL.");
                        if (!s.netLoc && s.path && "/" !== s.path[0]) {
                            var o = a.exec(s.path);
                            s.netLoc = o[1], s.path = o[2]
                        }
                        s.netLoc && !s.path && (s.path = "/");
                        var u = {
                            scheme: s.scheme,
                            netLoc: n.netLoc,
                            path: null,
                            params: n.params,
                            query: n.query,
                            fragment: n.fragment
                        };
                        if (!n.netLoc && (u.netLoc = s.netLoc, "/" !== n.path[0]))
                            if (n.path) {
                                var c = s.path,
                                    d = c.substring(0, c.lastIndexOf("/") + 1) + n.path;
                                u.path = l.normalizePath(d)
                            } else u.path = s.path, n.params || (u.params = s.params, n.query || (u.query = s.query));
                        return null === u.path && (u.path = r.alwaysNormalize ? l.normalizePath(n.path) : n.path), l.buildURLFromParts(u)
                    },
                    parseURL: function(t) {
                        var e = n.exec(t);
                        return e ? {
                            scheme: e[1] || "",
                            netLoc: e[2] || "",
                            path: e[3] || "",
                            params: e[4] || "",
                            query: e[5] || "",
                            fragment: e[6] || ""
                        } : null
                    },
                    normalizePath: function(t) {
                        for (t = t.split("").reverse().join("").replace(s, ""); t.length !== (t = t.replace(o, "")).length;);
                        return t.split("").reverse().join("")
                    },
                    buildURLFromParts: function(t) {
                        return t.scheme + t.netLoc + t.path + t.params + t.query + t.fragment
                    }
                }, "object" === u(e) && "object" === u(t) ? t.exports = l : void 0 === (i = function() {
                    return l
                }.apply(e, [])) || (t.exports = i)
            },
            880: function(t, e, r) {
                var i = r(612);
                window.videojs && (i.registerConfigPlugin(window.videojs), i.registerSourceHandler(window.videojs)), t.exports = {
                    register: i.registerSourceHandler
                }
            },
            612: function(t, e, r) {
                function i(t) {
                    return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                        return typeof t
                    } : function(t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    })(t)
                }
                var n = r(631),
                    a = r(785).Z;

                function s(t) {
                    var e = this;
                    t && (e.srOptions_ || (e.srOptions_ = {}), e.srOptions_.hlsjsConfig || (e.srOptions_.hlsjsConfig = t.hlsjsConfig), e.srOptions_.captionConfig || (e.srOptions_.captionConfig = t.captionConfig))
                }
                t.exports = {
                    registerSourceHandler: function(t) {
                        var e = {};

                        function r(r, s) {
                            s.name_ = "StreamrootHlsjs";
                            var o, l, u = s.el(),
                                c = {},
                                d = null,
                                h = null,
                                f = null,
                                g = null,
                                v = null,
                                p = null,
                                m = t(s.options_.playerId),
                                y = m.qualityLevels && m.qualityLevels();
                            y && m.hlsQualitySelector && (s.hls = {});
                            var E = !1;

                            function T(t) {
                                !c[n.ErrorTypes.MEDIA_ERROR] || c[n.ErrorTypes.MEDIA_ERROR] <= 1 ? (console.info("trying to recover media error"), o.destroy(), o.startLoad(-1), o.recoverMediaError()) : 2 === c[n.ErrorTypes.MEDIA_ERROR] ? (console.info("2nd try to recover media error (by swapping audio codec"), o.swapAudioCodec(), o.recoverMediaError()) : c[n.ErrorTypes.MEDIA_ERROR] > 2 && (console.info("bubbling media error up to VIDEOJS"), s.error = function() {
                                    return t
                                }, s.trigger("error"))
                            }

                            function b(t) {
                                o.config.levelSwitchStrategy && "instant" === o.config.levelSwitchStrategy ? o.currentLevel = t : o.config.levelSwitchStrategy && "smooth" === o.config.levelSwitchStrategy ? o.nextLevel = t : o.loadLevel = t
                            }

                            function S(t, e) {
                                return !!y && ("boolean" == typeof e && (y[t]._enabled = e, function() {
                                    for (var t = !0, e = 0; e < y.length; e++)
                                        if (!y[e]._enabled) {
                                            t = !1;
                                            break
                                        } if (t) o.currentLevel = -1;
                                    else {
                                        var r;
                                        for (r = y.length - 1; r >= 0 && !y[r]._enabled; r--);
                                        o.currentLevel = r
                                    }
                                }()), y[t]._enabled)
                            }

                            function L(t, e) {
                                y && (y.selectedIndex_ = e.level, y.trigger({
                                    selectedIndex: e.level,
                                    type: "change"
                                }))
                            }

                            function A() {
                                if (h) {
                                    var t = [];
                                    if (h.levels.length > 1) {
                                        var e = {
                                            id: -1,
                                            label: "auto",
                                            selected: -1 === o.manualLevel
                                        };
                                        t.push(e)
                                    }
                                    h.levels.forEach((function(e, r) {
                                        var i = {};
                                        i.id = r, i.selected = r === o.manualLevel, i.label = function(t) {
                                            return t.height ? "".concat(t.height, "p") : t.width ? "".concat(Math.round(9 * t.width / 16), "p") : t.bitrate ? "".concat(t.bitrate / 1e3, "kbps") : 0
                                        }(e), t.push(i)
                                    }));
                                    var r = {
                                        qualityData: {
                                            video: t
                                        },
                                        qualitySwitchCallback: b
                                    };
                                    s.trigger("loadedqualitydata", r), u.removeEventListener("playing", A)
                                }
                            }

                            function D() {
                                for (var t = s.audioTracks(), e = 0; e < t.length; e++)
                                    if (t[e].enabled) {
                                        o.audioTrack = e;
                                        break
                                    }
                            }

                            function k() {
                                var e = o.audioTracks,
                                    r = s.audioTracks();
                                if (e.length > 1 && 0 === r.length) {
                                    for (var i = 0; i < e.length; i++) r.addTrack(new t.AudioTrack({
                                        id: i,
                                        kind: "alternative",
                                        label: e[i].name || e[i].lang,
                                        language: e[i].lang,
                                        enabled: i === o.audioTrack
                                    }));
                                    r.addEventListener("change", D)
                                }
                            }

                            function R(t) {
                                return t.label ? t.label : t.language
                            }

                            function _(t, e) {
                                return R(t) === R(e) && t.kind === e.kind
                            }

                            function I() {
                                for (var t = m.textTracks(), e = null, r = 0; r < t.length; r++)
                                    if ("showing" === t[r].mode) {
                                        e = t[r];
                                        break
                                    } for (var i = u.textTracks, n = 0; n < i.length; n++) "subtitles" !== i[n].kind && "captions" !== i[n].kind || (i[n].mode = e && _(i[n], e) ? "showing" : "disabled")
                            }

                            function w() {
                                o.stopLoad(), u.isLive && u.addEventListener("play", C)
                            }

                            function C() {
                                o.detachMedia(), o.startLoad(o.liveSyncPosition), o.attachMedia(u), u.play(), u.removeEventListener("play", C)
                            }

                            function O() {
                                o.startLoad(-1), u.removeEventListener("play", O)
                            }

                            function x() {
                                for (var t = function(t) {
                                        for (var e = [], r = 0; r < t.length; r++) "subtitles" !== t[r].kind && "captions" !== t[r].kind || e.push(t[r]);
                                        return e
                                    }(u.textTracks), e = m.textTracks(), r = 0; r < t.length; r++) {
                                    for (var i = !1, n = 0; n < e.length; n++)
                                        if (_(t[r], e[n])) {
                                            i = !0;
                                            break
                                        } if (!i) {
                                        var a = t[r];
                                        m.addRemoteTextTrack({
                                            kind: a.kind,
                                            label: R(a),
                                            language: a.language,
                                            srclang: a.language
                                        }, !1)
                                    }
                                }
                                I(), E || (e.addEventListener("change", I), E = !0)
                            }

                            function P(t, e) {
                                s.trigger("hlslevelloaded", e), void 0 === l && e.details.live && o.streamController.lastCurrentTime > 15 * (o.streamController.nextLoadPosition - o.streamController.lastCurrentTime) ? s.trigger("dvrsourcedetected") : e.details.live && void 0 === l && (o.config.maxMaxBufferLength = 30, u.isLive = !0, u.addEventListener("pause", w)), l = !0
                            }

                            function F(t, e) {
                                h = e,
                                    function() {
                                        if (h && (y = m.qualityLevels && m.qualityLevels())) {
                                            s.hls = {};
                                            for (var t = 0; t < h.levels.length; t++) {
                                                var e = h.levels[t],
                                                    r = "hlsjs-".concat(t),
                                                    i = {
                                                        id: r,
                                                        label: r,
                                                        width: e.width,
                                                        height: e.height,
                                                        bandwidth: e.bitrate,
                                                        bitrate: e.bitrate,
                                                        _enabled: !1
                                                    };
                                                i.enabled = S.bind(this, t), y.addQualityLevel(i)
                                            }
                                        }
                                    }(), A()
                            }
                            this.getQuality = function() {
                                    return o.levelController.levels[o.levelController.level]
                                }, this.duration = function() {
                                    return d || u.duration || 0
                                }, this.config = function() {
                                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                    Object.assign(o.config, t)
                                }, this.seekable = function() {
                                    if (o.media) {
                                        if (!f) return t.createTimeRanges(0, o.media.duration);
                                        var e = Math.round(o.media.duration - g),
                                            r = Math.round(o.media.duration - v);
                                        return t.createTimeRanges(e, r)
                                    }
                                    return t.createTimeRanges()
                                }, this.dispose = function() {
                                    u.removeEventListener("play", O), u.textTracks.removeEventListener("addtrack", x), u.removeEventListener("playing", A), m.textTracks().removeEventListener("change", I), E = !1, m.audioTracks().removeEventListener("change", D), o.destroy()
                                }, u.addEventListener("error", (function(t) {
                                    var e, r = t.currentTarget.error;
                                    switch (r.code) {
                                        case r.MEDIA_ERR_ABORTED:
                                            e = "You aborted the video playback";
                                            break;
                                        case r.MEDIA_ERR_DECODE:
                                            e = "The video playback was aborted due to a corruption problem or because the video used features your browser did not support", T(r);
                                            break;
                                        case r.MEDIA_ERR_NETWORK:
                                            e = "A network error caused the video download to fail part-way";
                                            break;
                                        case r.MEDIA_ERR_SRC_NOT_SUPPORTED:
                                            e = "The video could not be loaded, either because the server or network failed or because the format is not supported";
                                            break;
                                        default:
                                            e = r.message
                                    }
                                    console.error("MEDIA_ERROR: ", e)
                                })),
                                function() {
                                    var t = m.srOptions_ && m.srOptions_.hlsjsConfig || s.options_.hlsjsConfig;
                                    (p = t ? function(t) {
                                        for (var e = {}, r = Object.keys(t), i = 0; i < r.length; i++) e[r[i]] = t[r[i]];
                                        return e
                                    }(t) : {}).aesSetup && p.aesSetup.key && p.aesSetup.iv && (p.pLoader = a, p.fLoader = a), -1 !== ["", "auto"].indexOf(u.preload) || u.autoplay || void 0 !== p.autoStartLoad || (p.autoStartLoad = !1);
                                    var l = m.srOptions_ && m.srOptions_.captionConfig || s.options_.captionConfig;
                                    l && (p.cueHandler = function(t) {
                                            return {
                                                newCue: function(e, r, n, a) {
                                                    for (var s, o, l, u = window.VTTCue || window.TextTrackCue, c = 0; c < a.rows.length; c++)
                                                        if (l = "", !(s = a.rows[c]).isEmpty()) {
                                                            for (var d = 0; d < s.chars.length; d++) l += s.chars[d].uchar;
                                                            if (o = new u(r, n, l.trim()), null != t && "object" === i(t))
                                                                for (var h = Object.keys(t), f = 0; f < h.length; f++) o[h[f]] = t[h[f]];
                                                            e.addCue(o), n === r && e.addCue(new u(n + 5, ""))
                                                        }
                                                }
                                            }
                                        }(l)), !1 === p.autoStartLoad && u.addEventListener("play", O), u.addEventListener("playing", A), o = new n(p),
                                        function(t) {
                                            if (void 0 !== e[t])
                                                for (var r = 0; r < e[t].length; r++) e[t][r](m, o)
                                        }("beforeinitialize"), o.on(n.Events.ERROR, (function(t, e) {
                                            ! function(t, e) {
                                                var r = {
                                                    message: "HLS.js error: ".concat(e.type, " - fatal: ").concat(e.fatal, " - ").concat(e.details)
                                                };
                                                if (e.networkDetails && Object.assign(r, {
                                                        responseText: e.networkDetails.responseText || "",
                                                        status: e.networkDetails.status
                                                    }), console.error(r.message), c[e.type] ? c[e.type] += 1 : c[e.type] = 1, e.fatal) switch (e.type) {
                                                    case n.ErrorTypes.NETWORK_ERROR:
                                                        console.info("bubbling network error up to VIDEOJS"), r.code = 2, s.error = function() {
                                                            return r
                                                        }, s.trigger("error");
                                                        break;
                                                    case n.ErrorTypes.MEDIA_ERROR:
                                                        r.code = 3, T(r);
                                                        break;
                                                    default:
                                                        o.destroy(), console.info("bubbling error up to VIDEOJS"), s.error = function() {
                                                            return r
                                                        }, s.trigger("error")
                                                }
                                            }(0, e)
                                        })), o.on(n.Events.AUDIO_TRACKS_UPDATED, k), o.on(n.Events.MANIFEST_PARSED, F), o.on(n.Events.LEVEL_LOADED, (function(t, e) {
                                            p.liveSyncDuration ? v = p.liveSyncDuration : p.liveSyncDurationCount && (v = p.liveSyncDurationCount * e.details.targetduration), f = e.details.live, g = e.details.totalduration, d = f ? 1 / 0 : e.details.totalduration
                                        })), o.on(n.Events.LEVEL_LOADED, P), o.once(n.Events.FRAG_LOADED, (function() {
                                            s.trigger("loadedmetadata")
                                        })), o.on(n.Events.LEVEL_SWITCHED, L), o.on(n.Events.LEVEL_SWITCHED, (function(t, e) {
                                            s.trigger("hlslevelswitched", e)
                                        })), o.attachMedia(u), u.textTracks.addEventListener("addtrack", x), o.loadSource(r.src)
                                }()
                        }
                        if (r.addHook = function(t, r) {
                                e[t] = e[t] || [], e[t].push(r)
                            }, r.removeHook = function(t, r) {
                                if (void 0 === e[t]) return !1;
                                var i = e[t].indexOf(r);
                                return -1 !== i && (e[t].splice(i, 1), !0)
                            }, n.isSupported()) {
                            var s;
                            if ("function" == typeof t.getTech) s = t.getTech("Html5");
                            else {
                                if ("function" != typeof t.getComponent) return void console.error("Not supported version if video.js");
                                s = t.getComponent("Html5")
                            }
                            if (!s) return void console.error("Not supported version if video.js");
                            s.registerSourceHandler({
                                canHandleSource: function(t) {
                                    return /^application\/x-mpegURL|application\/vnd\.apple\.mpegurl$/i.test(t.type) ? "probably" : /\.m3u8/i.test(t.src) ? "maybe" : ""
                                },
                                handleSource: function(t, e) {
                                    return e.hlsProvider && e.hlsProvider.dispose(), e.hlsProvider = new r(t, e), e.hlsProvider
                                }
                            }, 0), t.Html5Hlsjs = r
                        } else console.warn("Hls.js is not supported in this browser!")
                    },
                    registerConfigPlugin: function(t) {
                        (t.registerPlugin || t.plugin)("streamrootHls", s)
                    }
                }
            },
            785: function(t, e, r) {
                "use strict";

                function i(t) {
                    return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                        return typeof t
                    } : function(t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    })(t)
                }

                function n(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                    }
                }

                function s(t, e) {
                    return (s = Object.setPrototypeOf || function(t, e) {
                        return t.__proto__ = e, t
                    })(t, e)
                }

                function o(t, e) {
                    if (e && ("object" === i(e) || "function" == typeof e)) return e;
                    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                    return function(t) {
                        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return t
                    }(t)
                }

                function l(t) {
                    return (l = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                        return t.__proto__ || Object.getPrototypeOf(t)
                    })(t)
                }
                r.d(e, {
                    Z: function() {
                        return G
                    }
                });
                var u = function(t) {
                        ! function(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && s(t, e)
                        }(d, t);
                        var e, r, i, u, c = (i = d, u = function() {
                            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                            if (Reflect.construct.sham) return !1;
                            if ("function" == typeof Proxy) return !0;
                            try {
                                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                            } catch (t) {
                                return !1
                            }
                        }(), function() {
                            var t, e = l(i);
                            if (u) {
                                var r = l(this).constructor;
                                t = Reflect.construct(e, arguments, r)
                            } else t = e.apply(this, arguments);
                            return o(this, t)
                        });

                        function d() {
                            return n(this, d), c.apply(this, arguments)
                        }
                        return e = d, (r = [{
                            key: "trigger",
                            value: function(t) {
                                for (var e = arguments.length, r = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++) r[i - 1] = arguments[i];
                                this.emit.apply(this, [t, t].concat(r))
                            }
                        }]) && a(e.prototype, r), d
                    }(r(8).EventEmitter),
                    c = function() {},
                    d = {
                        trace: c,
                        debug: c,
                        log: c,
                        warn: c,
                        info: c,
                        error: c
                    };

                function h(t, e, r) {
                    return e in t ? Object.defineProperty(t, e, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[e] = r, t
                }
                var f = function t() {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), h(this, "aborted", !1), h(this, "loaded", 0), h(this, "retry", 0), h(this, "total", 0), h(this, "chunkCount", 0), h(this, "bwEstimate", 0), h(this, "loading", {
                        start: 0,
                        first: 0,
                        end: 0
                    }), h(this, "parsing", {
                        start: 0,
                        end: 0
                    }), h(this, "buffering", {
                        start: 0,
                        first: 0,
                        end: 0
                    })
                };

                function g(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                    }
                }

                function v(t, e, r) {
                    return e in t ? Object.defineProperty(t, e, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[e] = r, t
                }
                var p = /^age:\s*[\d.]+\s*$/m,
                    m = function() {
                        function t(e) {
                            ! function(t, e) {
                                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                            }(this, t), v(this, "xhrSetup", void 0), v(this, "requestTimeout", void 0), v(this, "retryTimeout", void 0), v(this, "retryDelay", void 0), v(this, "config", null), v(this, "callbacks", null), v(this, "context", void 0), v(this, "loader", null), v(this, "stats", void 0), this.xhrSetup = e ? e.xhrSetup : null, this.stats = new f, this.retryDelay = 0
                        }
                        var e, r;
                        return e = t, (r = [{
                            key: "destroy",
                            value: function() {
                                this.callbacks = null, this.abortInternal(), this.loader = null, this.config = null
                            }
                        }, {
                            key: "abortInternal",
                            value: function() {
                                var t = this.loader;
                                self.clearTimeout(this.requestTimeout), self.clearTimeout(this.retryTimeout), t && (t.onreadystatechange = null, t.onprogress = null, 4 !== t.readyState && (this.stats.aborted = !0, t.abort()))
                            }
                        }, {
                            key: "abort",
                            value: function() {
                                var t;
                                this.abortInternal(), null !== (t = this.callbacks) && void 0 !== t && t.onAbort && this.callbacks.onAbort(this.stats, this.context, this.loader)
                            }
                        }, {
                            key: "load",
                            value: function(t, e, r) {
                                if (this.stats.loading.start) throw new Error("Loader can only be used once.");
                                this.stats.loading.start = self.performance.now(), this.context = t, this.config = e, this.callbacks = r, this.retryDelay = e.retryDelay, this.loadInternal()
                            }
                        }, {
                            key: "loadInternal",
                            value: function() {
                                var t = this.config,
                                    e = this.context;
                                if (t) {
                                    var r = this.loader = new self.XMLHttpRequest,
                                        i = this.stats;
                                    i.loading.first = 0, i.loaded = 0;
                                    var n = this.xhrSetup;
                                    try {
                                        if (n) try {
                                            n(r, e.url)
                                        } catch (t) {
                                            r.open("GET", e.url, !0), n(r, e.url)
                                        }
                                        r.readyState || r.open("GET", e.url, !0)
                                    } catch (t) {
                                        return void this.callbacks.onError({
                                            code: r.status,
                                            text: t.message
                                        }, e, r)
                                    }
                                    e.rangeEnd && r.setRequestHeader("Range", "bytes=" + e.rangeStart + "-" + (e.rangeEnd - 1)), r.onreadystatechange = this.readystatechange.bind(this), r.onprogress = this.loadprogress.bind(this), r.responseType = e.responseType, self.clearTimeout(this.requestTimeout), this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), t.timeout), r.send()
                                }
                            }
                        }, {
                            key: "readystatechange",
                            value: function() {
                                var t = this.context,
                                    e = this.loader,
                                    r = this.stats;
                                if (t && e) {
                                    var i = e.readyState,
                                        n = this.config;
                                    if (!r.aborted && i >= 2)
                                        if (self.clearTimeout(this.requestTimeout), 0 === r.loading.first && (r.loading.first = Math.max(self.performance.now(), r.loading.start)), 4 === i) {
                                            e.onreadystatechange = null, e.onprogress = null;
                                            var a = e.status;
                                            if (a >= 200 && a < 300) {
                                                var s, o;
                                                if (r.loading.end = Math.max(self.performance.now(), r.loading.first), o = "arraybuffer" === t.responseType ? (s = e.response).byteLength : (s = e.responseText).length, r.loaded = r.total = o, !this.callbacks) return;
                                                var l = this.callbacks.onProgress;
                                                if (l && l(r, t, s, e), !this.callbacks) return;
                                                var u = {
                                                    url: e.responseURL,
                                                    data: s
                                                };
                                                this.callbacks.onSuccess(u, r, t, e)
                                            } else r.retry >= n.maxRetry || a >= 400 && a < 499 ? (d.error("".concat(a, " while loading ").concat(t.url)), this.callbacks.onError({
                                                code: a,
                                                text: e.statusText
                                            }, t, e)) : (d.warn("".concat(a, " while loading ").concat(t.url, ", retrying in ").concat(this.retryDelay, "...")), this.abortInternal(), this.loader = null, self.clearTimeout(this.retryTimeout), this.retryTimeout = self.setTimeout(this.loadInternal.bind(this), this.retryDelay), this.retryDelay = Math.min(2 * this.retryDelay, n.maxRetryDelay), r.retry++)
                                        } else self.clearTimeout(this.requestTimeout), this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), n.timeout)
                                }
                            }
                        }, {
                            key: "loadtimeout",
                            value: function() {
                                d.warn("timeout while loading ".concat(this.context.url));
                                var t = this.callbacks;
                                t && (this.abortInternal(), t.onTimeout(this.stats, this.context, this.loader))
                            }
                        }, {
                            key: "loadprogress",
                            value: function(t) {
                                var e = this.stats;
                                e.loaded = t.loaded, t.lengthComputable && (e.total = t.total)
                            }
                        }, {
                            key: "getCacheAge",
                            value: function() {
                                var t = null;
                                if (this.loader && p.test(this.loader.getAllResponseHeaders())) {
                                    var e = this.loader.getResponseHeader("age");
                                    t = e ? parseFloat(e) : null
                                }
                                return t
                            }
                        }]) && g(e.prototype, r), t
                    }();

                function y(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                    }
                }

                function E(t, e, r) {
                    return e in t ? Object.defineProperty(t, e, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[e] = r, t
                }
                var T = function() {
                    function t(e, r) {
                        ! function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, t), E(this, "subtle", void 0), E(this, "aesIV", void 0), this.subtle = e, this.aesIV = r
                    }
                    var e, r;
                    return e = t, (r = [{
                        key: "decrypt",
                        value: function(t, e) {
                            return this.subtle.decrypt({
                                name: "AES-CBC",
                                iv: this.aesIV
                            }, e, t)
                        }
                    }]) && y(e.prototype, r), t
                }();

                function b(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                    }
                }

                function S(t, e, r) {
                    return e in t ? Object.defineProperty(t, e, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[e] = r, t
                }
                var L = function() {
                    function t(e, r) {
                        ! function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, t), S(this, "subtle", void 0), S(this, "key", void 0), this.subtle = e, this.key = r
                    }
                    var e, r;
                    return e = t, (r = [{
                        key: "expandKey",
                        value: function() {
                            return this.subtle.importKey("raw", this.key, {
                                name: "AES-CBC"
                            }, !1, ["encrypt", "decrypt"])
                        }
                    }]) && b(e.prototype, r), t
                }();

                function A(t, e, r) {
                    return Uint8Array.prototype.slice ? t.slice(e, r) : new Uint8Array(Array.prototype.slice.call(t, e, r))
                }

                function D(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                    }
                }

                function k(t, e, r) {
                    return e in t ? Object.defineProperty(t, e, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[e] = r, t
                }
                var R, _, I = function() {
                    function t() {
                        ! function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, t), k(this, "rcon", [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54]), k(this, "subMix", [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)]), k(this, "invSubMix", [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)]), k(this, "sBox", new Uint32Array(256)), k(this, "invSBox", new Uint32Array(256)), k(this, "key", new Uint32Array(0)), k(this, "ksRows", 0), k(this, "keySize", 0), k(this, "keySchedule", void 0), k(this, "invKeySchedule", void 0), this.initTable()
                    }
                    var e, r;
                    return e = t, (r = [{
                        key: "uint8ArrayToUint32Array_",
                        value: function(t) {
                            for (var e = new DataView(t), r = new Uint32Array(4), i = 0; i < 4; i++) r[i] = e.getUint32(4 * i);
                            return r
                        }
                    }, {
                        key: "initTable",
                        value: function() {
                            var t = this.sBox,
                                e = this.invSBox,
                                r = this.subMix,
                                i = r[0],
                                n = r[1],
                                a = r[2],
                                s = r[3],
                                o = this.invSubMix,
                                l = o[0],
                                u = o[1],
                                c = o[2],
                                d = o[3],
                                h = new Uint32Array(256),
                                f = 0,
                                g = 0,
                                v = 0;
                            for (v = 0; v < 256; v++) h[v] = v < 128 ? v << 1 : v << 1 ^ 283;
                            for (v = 0; v < 256; v++) {
                                var p = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4;
                                p = p >>> 8 ^ 255 & p ^ 99, t[f] = p, e[p] = f;
                                var m = h[f],
                                    y = h[m],
                                    E = h[y],
                                    T = 257 * h[p] ^ 16843008 * p;
                                i[f] = T << 24 | T >>> 8, n[f] = T << 16 | T >>> 16, a[f] = T << 8 | T >>> 24, s[f] = T, T = 16843009 * E ^ 65537 * y ^ 257 * m ^ 16843008 * f, l[p] = T << 24 | T >>> 8, u[p] = T << 16 | T >>> 16, c[p] = T << 8 | T >>> 24, d[p] = T, f ? (f = m ^ h[h[h[E ^ m]]], g ^= h[h[g]]) : f = g = 1
                            }
                        }
                    }, {
                        key: "expandKey",
                        value: function(t) {
                            for (var e = this.uint8ArrayToUint32Array_(t), r = !0, i = 0; i < e.length && r;) r = e[i] === this.key[i], i++;
                            if (!r) {
                                this.key = e;
                                var n = this.keySize = e.length;
                                if (4 !== n && 6 !== n && 8 !== n) throw new Error("Invalid aes key size=" + n);
                                var a, s, o, l, u = this.ksRows = 4 * (n + 6 + 1),
                                    c = this.keySchedule = new Uint32Array(u),
                                    d = this.invKeySchedule = new Uint32Array(u),
                                    h = this.sBox,
                                    f = this.rcon,
                                    g = this.invSubMix,
                                    v = g[0],
                                    p = g[1],
                                    m = g[2],
                                    y = g[3];
                                for (a = 0; a < u; a++) a < n ? o = c[a] = e[a] : (l = o, a % n == 0 ? (l = h[(l = l << 8 | l >>> 24) >>> 24] << 24 | h[l >>> 16 & 255] << 16 | h[l >>> 8 & 255] << 8 | h[255 & l], l ^= f[a / n | 0] << 24) : n > 6 && a % n == 4 && (l = h[l >>> 24] << 24 | h[l >>> 16 & 255] << 16 | h[l >>> 8 & 255] << 8 | h[255 & l]), c[a] = o = (c[a - n] ^ l) >>> 0);
                                for (s = 0; s < u; s++) a = u - s, l = 3 & s ? c[a] : c[a - 4], d[s] = s < 4 || a <= 4 ? l : v[h[l >>> 24]] ^ p[h[l >>> 16 & 255]] ^ m[h[l >>> 8 & 255]] ^ y[h[255 & l]], d[s] = d[s] >>> 0
                            }
                        }
                    }, {
                        key: "networkToHostOrderSwap",
                        value: function(t) {
                            return t << 24 | (65280 & t) << 8 | (16711680 & t) >> 8 | t >>> 24
                        }
                    }, {
                        key: "decrypt",
                        value: function(t, e, r) {
                            for (var i, n, a, s, o, l, u, c, d, h, f, g, v, p, m = this.keySize + 6, y = this.invKeySchedule, E = this.invSBox, T = this.invSubMix, b = T[0], S = T[1], L = T[2], A = T[3], D = this.uint8ArrayToUint32Array_(r), k = D[0], R = D[1], _ = D[2], I = D[3], w = new Int32Array(t), C = new Int32Array(w.length), O = this.networkToHostOrderSwap; e < w.length;) {
                                for (d = O(w[e]), h = O(w[e + 1]), f = O(w[e + 2]), g = O(w[e + 3]), o = d ^ y[0], l = g ^ y[1], u = f ^ y[2], c = h ^ y[3], v = 4, p = 1; p < m; p++) i = b[o >>> 24] ^ S[l >> 16 & 255] ^ L[u >> 8 & 255] ^ A[255 & c] ^ y[v], n = b[l >>> 24] ^ S[u >> 16 & 255] ^ L[c >> 8 & 255] ^ A[255 & o] ^ y[v + 1], a = b[u >>> 24] ^ S[c >> 16 & 255] ^ L[o >> 8 & 255] ^ A[255 & l] ^ y[v + 2], s = b[c >>> 24] ^ S[o >> 16 & 255] ^ L[l >> 8 & 255] ^ A[255 & u] ^ y[v + 3], o = i, l = n, u = a, c = s, v += 4;
                                i = E[o >>> 24] << 24 ^ E[l >> 16 & 255] << 16 ^ E[u >> 8 & 255] << 8 ^ E[255 & c] ^ y[v], n = E[l >>> 24] << 24 ^ E[u >> 16 & 255] << 16 ^ E[c >> 8 & 255] << 8 ^ E[255 & o] ^ y[v + 1], a = E[u >>> 24] << 24 ^ E[c >> 16 & 255] << 16 ^ E[o >> 8 & 255] << 8 ^ E[255 & l] ^ y[v + 2], s = E[c >>> 24] << 24 ^ E[o >> 16 & 255] << 16 ^ E[l >> 8 & 255] << 8 ^ E[255 & u] ^ y[v + 3], C[e] = O(i ^ k), C[e + 1] = O(s ^ R), C[e + 2] = O(a ^ _), C[e + 3] = O(n ^ I), k = d, R = h, _ = f, I = g, e += 4
                            }
                            return C.buffer
                        }
                    }]) && D(e.prototype, r), t
                }();

                function w(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function C(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                    }
                }

                function O(t, e, r) {
                    return e in t ? Object.defineProperty(t, e, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[e] = r, t
                }
                r(75), (_ = R || (R = {})).AUDIO = "audio", _.VIDEO = "video", _.AUDIOVIDEO = "audiovideo", Math.pow(2, 32);
                var x = function() {
                    function t(e, r) {
                        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                            n = i.removePKCS7Padding,
                            a = void 0 === n || n;
                        if (w(this, t), O(this, "logEnabled", !0), O(this, "observer", void 0), O(this, "config", void 0), O(this, "removePKCS7Padding", void 0), O(this, "subtle", null), O(this, "softwareDecrypter", null), O(this, "key", null), O(this, "fastAesKey", null), O(this, "remainderData", null), O(this, "currentIV", null), O(this, "currentResult", null), this.observer = e, this.config = r, this.removePKCS7Padding = a, a) try {
                            var s = self.crypto;
                            s && (this.subtle = s.subtle || s.webkitSubtle)
                        } catch (t) {}
                        null === this.subtle && (this.config.enableSoftwareAES = !0)
                    }
                    var e, r;
                    return e = t, (r = [{
                        key: "destroy",
                        value: function() {
                            this.observer = null
                        }
                    }, {
                        key: "isSync",
                        value: function() {
                            return this.config.enableSoftwareAES
                        }
                    }, {
                        key: "flush",
                        value: function() {
                            var t = this.currentResult;
                            if (t) {
                                var e, r, i, n = new Uint8Array(t);
                                return this.reset(), this.removePKCS7Padding ? (i = (r = (e = n).byteLength) && new DataView(e.buffer).getUint8(r - 1)) ? A(e, 0, r - i) : e : n
                            }
                            this.reset()
                        }
                    }, {
                        key: "reset",
                        value: function() {
                            this.currentResult = null, this.currentIV = null, this.remainderData = null, this.softwareDecrypter && (this.softwareDecrypter = null)
                        }
                    }, {
                        key: "decrypt",
                        value: function(t, e, r, i) {
                            if (this.config.enableSoftwareAES) {
                                this.softwareDecrypt(new Uint8Array(t), e, r);
                                var n = this.flush();
                                n && i(n.buffer)
                            } else this.webCryptoDecrypt(new Uint8Array(t), e, r).then(i)
                        }
                    }, {
                        key: "softwareDecrypt",
                        value: function(t, e, r) {
                            var i, n, a, s = this.currentIV,
                                o = this.currentResult,
                                l = this.remainderData;
                            this.logOnce("JS AES decrypt"), l && (i = l, n = t, (a = new Uint8Array(i.length + n.length)).set(i), a.set(n, i.length), t = a, this.remainderData = null);
                            var u = this.getValidChunk(t);
                            if (!u.length) return null;
                            s && (r = s);
                            var c = this.softwareDecrypter;
                            c || (c = this.softwareDecrypter = new I), c.expandKey(e);
                            var d = o;
                            return this.currentResult = c.decrypt(u.buffer, 0, r), this.currentIV = A(u, -16).buffer, d || null
                        }
                    }, {
                        key: "webCryptoDecrypt",
                        value: function(t, e, r) {
                            var i = this,
                                n = this.subtle;
                            return this.key === e && this.fastAesKey || (this.key = e, this.fastAesKey = new L(n, e)), this.fastAesKey.expandKey().then((function(e) {
                                return n ? new T(n, r).decrypt(t.buffer, e) : Promise.reject(new Error("web crypto not initialized"))
                            })).catch((function(n) {
                                return i.onWebCryptoError(n, t, e, r)
                            }))
                        }
                    }, {
                        key: "onWebCryptoError",
                        value: function(t, e, r, i) {
                            return d.warn("[decrypter.ts]: WebCrypto Error, disable WebCrypto API:", t), this.config.enableSoftwareAES = !0, this.logEnabled = !0, this.softwareDecrypt(e, r, i)
                        }
                    }, {
                        key: "getValidChunk",
                        value: function(t) {
                            var e = t,
                                r = t.length - t.length % 16;
                            return r !== t.length && (e = A(t, 0, r), this.remainderData = A(t, r)), e
                        }
                    }, {
                        key: "logOnce",
                        value: function(t) {
                            this.logEnabled && (d.log("[decrypter.ts]: ".concat(t)), this.logEnabled = !1)
                        }
                    }]) && C(e.prototype, r), t
                }();

                function P(t) {
                    return (P = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                        return typeof t
                    } : function(t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    })(t)
                }

                function F(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                    }
                }

                function M(t, e, r) {
                    return (M = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(t, e, r) {
                        var i = function(t, e) {
                            for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = B(t)););
                            return t
                        }(t, e);
                        if (i) {
                            var n = Object.getOwnPropertyDescriptor(i, e);
                            return n.get ? n.get.call(r) : n.value
                        }
                    })(t, e, r || t)
                }

                function N(t, e) {
                    return (N = Object.setPrototypeOf || function(t, e) {
                        return t.__proto__ = e, t
                    })(t, e)
                }

                function U(t, e) {
                    if (e && ("object" === P(e) || "function" == typeof e)) return e;
                    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                    return function(t) {
                        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return t
                    }(t)
                }

                function B(t) {
                    return (B = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                        return t.__proto__ || Object.getPrototypeOf(t)
                    })(t)
                }
                var G = function(t) {
                    ! function(t, e) {
                        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                        t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t,
                                writable: !0,
                                configurable: !0
                            }
                        }), e && N(t, e)
                    }(s, t);
                    var e, r, i, n, a = (i = s, n = function() {
                        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                        if (Reflect.construct.sham) return !1;
                        if ("function" == typeof Proxy) return !0;
                        try {
                            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                        } catch (t) {
                            return !1
                        }
                    }(), function() {
                        var t, e = B(i);
                        if (n) {
                            var r = B(this).constructor;
                            t = Reflect.construct(e, arguments, r)
                        } else t = e.apply(this, arguments);
                        return U(this, t)
                    });

                    function s(t) {
                        var e;
                        return function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, s), e = a.call(this, t), t && t.aesSetup && (e.aesSetup = t.aesSetup), e.observer = new u, e.decrypter = new x(e.observer, t), e
                    }
                    return e = s, (r = [{
                        key: "str2ab",
                        value: function(t) {
                            for (var e = new ArrayBuffer(t.length), r = new Uint8Array(e), i = 0, n = t.length; i < n; i++) r[i] = t.charCodeAt(i);
                            return e
                        }
                    }, {
                        key: "ab2str",
                        value: function(t) {
                            return String.fromCharCode.apply(null, new Uint8Array(t))
                        }
                    }, {
                        key: "load",
                        value: function(t, e, r) {
                            var i = this,
                                n = "arraybuffer" !== t.responseType;
                            t.responseType = "arraybuffer", M(B(s.prototype), "load", this).call(this, t, e, r);
                            var a = this.callbacks.onSuccess;
                            this.callbacks.onSuccess = function(t, e, r, s) {
                                i.decrypter.decrypt(t.data, i.str2ab(i.aesSetup.key), i.str2ab(i.aesSetup.iv), (function(o) {
                                    t.data = n ? i.ab2str(o) : o, "function" == typeof a && a(t, e, r, s)
                                }))
                            }
                        }
                    }]) && F(e.prototype, r), s
                }(m)
            },
            631: function(t) {
                var e;
                "undefined" != typeof window && (e = function() {
                    return function(t) {
                        var e = {};

                        function r(i) {
                            if (e[i]) return e[i].exports;
                            var n = e[i] = {
                                i: i,
                                l: !1,
                                exports: {}
                            };
                            return t[i].call(n.exports, n, n.exports, r), n.l = !0, n.exports
                        }
                        return r.m = t, r.c = e, r.d = function(t, e, i) {
                            r.o(t, e) || Object.defineProperty(t, e, {
                                enumerable: !0,
                                get: i
                            })
                        }, r.r = function(t) {
                            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                                value: "Module"
                            }), Object.defineProperty(t, "__esModule", {
                                value: !0
                            })
                        }, r.t = function(t, e) {
                            if (1 & e && (t = r(t)), 8 & e) return t;
                            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
                            var i = Object.create(null);
                            if (r.r(i), Object.defineProperty(i, "default", {
                                    enumerable: !0,
                                    value: t
                                }), 2 & e && "string" != typeof t)
                                for (var n in t) r.d(i, n, function(e) {
                                    return t[e]
                                }.bind(null, n));
                            return i
                        }, r.n = function(t) {
                            var e = t && t.__esModule ? function() {
                                return t.default
                            } : function() {
                                return t
                            };
                            return r.d(e, "a", e), e
                        }, r.o = function(t, e) {
                            return Object.prototype.hasOwnProperty.call(t, e)
                        }, r.p = "/dist/", r(r.s = "./src/hls.ts")
                    }({
                        "./node_modules/eventemitter3/index.js": function(t, e, r) {
                            "use strict";
                            var i = Object.prototype.hasOwnProperty,
                                n = "~";

                            function a() {}

                            function s(t, e, r) {
                                this.fn = t, this.context = e, this.once = r || !1
                            }

                            function o(t, e, r, i, a) {
                                if ("function" != typeof r) throw new TypeError("The listener must be a function");
                                var o = new s(r, i || t, a),
                                    l = n ? n + e : e;
                                return t._events[l] ? t._events[l].fn ? t._events[l] = [t._events[l], o] : t._events[l].push(o) : (t._events[l] = o, t._eventsCount++), t
                            }

                            function l(t, e) {
                                0 == --t._eventsCount ? t._events = new a : delete t._events[e]
                            }

                            function u() {
                                this._events = new a, this._eventsCount = 0
                            }
                            Object.create && (a.prototype = Object.create(null), (new a).__proto__ || (n = !1)), u.prototype.eventNames = function() {
                                var t, e, r = [];
                                if (0 === this._eventsCount) return r;
                                for (e in t = this._events) i.call(t, e) && r.push(n ? e.slice(1) : e);
                                return Object.getOwnPropertySymbols ? r.concat(Object.getOwnPropertySymbols(t)) : r
                            }, u.prototype.listeners = function(t) {
                                var e = n ? n + t : t,
                                    r = this._events[e];
                                if (!r) return [];
                                if (r.fn) return [r.fn];
                                for (var i = 0, a = r.length, s = new Array(a); i < a; i++) s[i] = r[i].fn;
                                return s
                            }, u.prototype.listenerCount = function(t) {
                                var e = n ? n + t : t,
                                    r = this._events[e];
                                return r ? r.fn ? 1 : r.length : 0
                            }, u.prototype.emit = function(t, e, r, i, a, s) {
                                var o = n ? n + t : t;
                                if (!this._events[o]) return !1;
                                var l, u, c = this._events[o],
                                    d = arguments.length;
                                if (c.fn) {
                                    switch (c.once && this.removeListener(t, c.fn, void 0, !0), d) {
                                        case 1:
                                            return c.fn.call(c.context), !0;
                                        case 2:
                                            return c.fn.call(c.context, e), !0;
                                        case 3:
                                            return c.fn.call(c.context, e, r), !0;
                                        case 4:
                                            return c.fn.call(c.context, e, r, i), !0;
                                        case 5:
                                            return c.fn.call(c.context, e, r, i, a), !0;
                                        case 6:
                                            return c.fn.call(c.context, e, r, i, a, s), !0
                                    }
                                    for (u = 1, l = new Array(d - 1); u < d; u++) l[u - 1] = arguments[u];
                                    c.fn.apply(c.context, l)
                                } else {
                                    var h, f = c.length;
                                    for (u = 0; u < f; u++) switch (c[u].once && this.removeListener(t, c[u].fn, void 0, !0), d) {
                                        case 1:
                                            c[u].fn.call(c[u].context);
                                            break;
                                        case 2:
                                            c[u].fn.call(c[u].context, e);
                                            break;
                                        case 3:
                                            c[u].fn.call(c[u].context, e, r);
                                            break;
                                        case 4:
                                            c[u].fn.call(c[u].context, e, r, i);
                                            break;
                                        default:
                                            if (!l)
                                                for (h = 1, l = new Array(d - 1); h < d; h++) l[h - 1] = arguments[h];
                                            c[u].fn.apply(c[u].context, l)
                                    }
                                }
                                return !0
                            }, u.prototype.on = function(t, e, r) {
                                return o(this, t, e, r, !1)
                            }, u.prototype.once = function(t, e, r) {
                                return o(this, t, e, r, !0)
                            }, u.prototype.removeListener = function(t, e, r, i) {
                                var a = n ? n + t : t;
                                if (!this._events[a]) return this;
                                if (!e) return l(this, a), this;
                                var s = this._events[a];
                                if (s.fn) s.fn !== e || i && !s.once || r && s.context !== r || l(this, a);
                                else {
                                    for (var o = 0, u = [], c = s.length; o < c; o++)(s[o].fn !== e || i && !s[o].once || r && s[o].context !== r) && u.push(s[o]);
                                    u.length ? this._events[a] = 1 === u.length ? u[0] : u : l(this, a)
                                }
                                return this
                            }, u.prototype.removeAllListeners = function(t) {
                                var e;
                                return t ? (e = n ? n + t : t, this._events[e] && l(this, e)) : (this._events = new a, this._eventsCount = 0), this
                            }, u.prototype.off = u.prototype.removeListener, u.prototype.addListener = u.prototype.on, u.prefixed = n, u.EventEmitter = u, t.exports = u
                        },
                        "./node_modules/url-toolkit/src/url-toolkit.js": function(t, e, r) {
                            var i, n, a, s, o;
                            i = /^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/?#]*)?((?:[^\/?#]*\/)*[^;?#]*)?(;[^?#]*)?(\?[^#]*)?(#[^]*)?$/, n = /^([^\/?#]*)([^]*)$/, a = /(?:\/|^)\.(?=\/)/g, s = /(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g, o = {
                                buildAbsoluteURL: function(t, e, r) {
                                    if (r = r || {}, t = t.trim(), !(e = e.trim())) {
                                        if (!r.alwaysNormalize) return t;
                                        var i = o.parseURL(t);
                                        if (!i) throw new Error("Error trying to parse base URL.");
                                        return i.path = o.normalizePath(i.path), o.buildURLFromParts(i)
                                    }
                                    var a = o.parseURL(e);
                                    if (!a) throw new Error("Error trying to parse relative URL.");
                                    if (a.scheme) return r.alwaysNormalize ? (a.path = o.normalizePath(a.path), o.buildURLFromParts(a)) : e;
                                    var s = o.parseURL(t);
                                    if (!s) throw new Error("Error trying to parse base URL.");
                                    if (!s.netLoc && s.path && "/" !== s.path[0]) {
                                        var l = n.exec(s.path);
                                        s.netLoc = l[1], s.path = l[2]
                                    }
                                    s.netLoc && !s.path && (s.path = "/");
                                    var u = {
                                        scheme: s.scheme,
                                        netLoc: a.netLoc,
                                        path: null,
                                        params: a.params,
                                        query: a.query,
                                        fragment: a.fragment
                                    };
                                    if (!a.netLoc && (u.netLoc = s.netLoc, "/" !== a.path[0]))
                                        if (a.path) {
                                            var c = s.path,
                                                d = c.substring(0, c.lastIndexOf("/") + 1) + a.path;
                                            u.path = o.normalizePath(d)
                                        } else u.path = s.path, a.params || (u.params = s.params, a.query || (u.query = s.query));
                                    return null === u.path && (u.path = r.alwaysNormalize ? o.normalizePath(a.path) : a.path), o.buildURLFromParts(u)
                                },
                                parseURL: function(t) {
                                    var e = i.exec(t);
                                    return e ? {
                                        scheme: e[1] || "",
                                        netLoc: e[2] || "",
                                        path: e[3] || "",
                                        params: e[4] || "",
                                        query: e[5] || "",
                                        fragment: e[6] || ""
                                    } : null
                                },
                                normalizePath: function(t) {
                                    for (t = t.split("").reverse().join("").replace(a, ""); t.length !== (t = t.replace(s, "")).length;);
                                    return t.split("").reverse().join("")
                                },
                                buildURLFromParts: function(t) {
                                    return t.scheme + t.netLoc + t.path + t.params + t.query + t.fragment
                                }
                            }, t.exports = o
                        },
                        "./node_modules/webworkify-webpack/index.js": function(t, e, r) {
                            function i(t) {
                                var e = {};

                                function r(i) {
                                    if (e[i]) return e[i].exports;
                                    var n = e[i] = {
                                        i: i,
                                        l: !1,
                                        exports: {}
                                    };
                                    return t[i].call(n.exports, n, n.exports, r), n.l = !0, n.exports
                                }
                                r.m = t, r.c = e, r.i = function(t) {
                                    return t
                                }, r.d = function(t, e, i) {
                                    r.o(t, e) || Object.defineProperty(t, e, {
                                        configurable: !1,
                                        enumerable: !0,
                                        get: i
                                    })
                                }, r.r = function(t) {
                                    Object.defineProperty(t, "__esModule", {
                                        value: !0
                                    })
                                }, r.n = function(t) {
                                    var e = t && t.__esModule ? function() {
                                        return t.default
                                    } : function() {
                                        return t
                                    };
                                    return r.d(e, "a", e), e
                                }, r.o = function(t, e) {
                                    return Object.prototype.hasOwnProperty.call(t, e)
                                }, r.p = "/", r.oe = function(t) {
                                    throw console.error(t), t
                                };
                                var i = r(r.s = ENTRY_MODULE);
                                return i.default || i
                            }
                            var n = "\\(\\s*(/\\*.*?\\*/)?\\s*.*?([\\.|\\-|\\+|\\w|/|@]+).*?\\)";

                            function a(t) {
                                return (t + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
                            }

                            function s(t, e, i) {
                                var s = {};
                                s[i] = [];
                                var o = e.toString(),
                                    l = o.match(/^function\s?\w*\(\w+,\s*\w+,\s*(\w+)\)/);
                                if (!l) return s;
                                for (var u, c = l[1], d = new RegExp("(\\\\n|\\W)" + a(c) + n, "g"); u = d.exec(o);) "dll-reference" !== u[3] && s[i].push(u[3]);
                                for (d = new RegExp("\\(" + a(c) + '\\("(dll-reference\\s([\\.|\\-|\\+|\\w|/|@]+))"\\)\\)' + n, "g"); u = d.exec(o);) t[u[2]] || (s[i].push(u[1]), t[u[2]] = r(u[1]).m), s[u[2]] = s[u[2]] || [], s[u[2]].push(u[4]);
                                for (var h, f = Object.keys(s), g = 0; g < f.length; g++)
                                    for (var v = 0; v < s[f[g]].length; v++) h = s[f[g]][v], isNaN(1 * h) || (s[f[g]][v] = 1 * s[f[g]][v]);
                                return s
                            }

                            function o(t) {
                                return Object.keys(t).reduce((function(e, r) {
                                    return e || t[r].length > 0
                                }), !1)
                            }
                            t.exports = function(t, e) {
                                e = e || {};
                                var n = {
                                        main: r.m
                                    },
                                    a = e.all ? {
                                        main: Object.keys(n.main)
                                    } : function(t, e) {
                                        for (var r = {
                                                main: [e]
                                            }, i = {
                                                main: []
                                            }, n = {
                                                main: {}
                                            }; o(r);)
                                            for (var a = Object.keys(r), l = 0; l < a.length; l++) {
                                                var u = a[l],
                                                    c = r[u].pop();
                                                if (n[u] = n[u] || {}, !n[u][c] && t[u][c]) {
                                                    n[u][c] = !0, i[u] = i[u] || [], i[u].push(c);
                                                    for (var d = s(t, t[u][c], u), h = Object.keys(d), f = 0; f < h.length; f++) r[h[f]] = r[h[f]] || [], r[h[f]] = r[h[f]].concat(d[h[f]])
                                                }
                                            }
                                        return i
                                    }(n, t),
                                    l = "";
                                Object.keys(a).filter((function(t) {
                                    return "main" !== t
                                })).forEach((function(t) {
                                    for (var e = 0; a[t][e];) e++;
                                    a[t].push(e), n[t][e] = "(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })", l = l + "var " + t + " = (" + i.toString().replace("ENTRY_MODULE", JSON.stringify(e)) + ")({" + a[t].map((function(e) {
                                        return JSON.stringify(e) + ": " + n[t][e].toString()
                                    })).join(",") + "});\n"
                                })), l = l + "new ((" + i.toString().replace("ENTRY_MODULE", JSON.stringify(t)) + ")({" + a.main.map((function(t) {
                                    return JSON.stringify(t) + ": " + n.main[t].toString()
                                })).join(",") + "}))(self);";
                                var u = new window.Blob([l], {
                                    type: "text/javascript"
                                });
                                if (e.bare) return u;
                                var c = (window.URL || window.webkitURL || window.mozURL || window.msURL).createObjectURL(u),
                                    d = new window.Worker(c);
                                return d.objectURL = c, d
                            }
                        },
                        "./src/config.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "hlsDefaultConfig", (function() {
                                return S
                            })), r.d(e, "mergeConfig", (function() {
                                return L
                            })), r.d(e, "enableStreamingMode", (function() {
                                return A
                            }));
                            var i = r("./src/controller/abr-controller.ts"),
                                n = r("./src/controller/audio-stream-controller.ts"),
                                a = r("./src/controller/audio-track-controller.ts"),
                                s = r("./src/controller/subtitle-stream-controller.ts"),
                                o = r("./src/controller/subtitle-track-controller.ts"),
                                l = r("./src/controller/buffer-controller.ts"),
                                u = r("./src/controller/timeline-controller.ts"),
                                c = r("./src/controller/cap-level-controller.ts"),
                                d = r("./src/controller/fps-controller.ts"),
                                h = r("./src/controller/eme-controller.ts"),
                                f = r("./src/utils/xhr-loader.ts"),
                                g = r("./src/utils/fetch-loader.ts"),
                                v = r("./src/utils/cues.ts"),
                                p = r("./src/utils/mediakeys-helper.ts"),
                                m = r("./src/utils/logger.ts");

                            function y() {
                                return (y = Object.assign || function(t) {
                                    for (var e = 1; e < arguments.length; e++) {
                                        var r = arguments[e];
                                        for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i])
                                    }
                                    return t
                                }).apply(this, arguments)
                            }

                            function E(t, e) {
                                var r = Object.keys(t);
                                if (Object.getOwnPropertySymbols) {
                                    var i = Object.getOwnPropertySymbols(t);
                                    e && (i = i.filter((function(e) {
                                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                                    }))), r.push.apply(r, i)
                                }
                                return r
                            }

                            function T(t) {
                                for (var e = 1; e < arguments.length; e++) {
                                    var r = null != arguments[e] ? arguments[e] : {};
                                    e % 2 ? E(Object(r), !0).forEach((function(e) {
                                        b(t, e, r[e])
                                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : E(Object(r)).forEach((function(e) {
                                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e))
                                    }))
                                }
                                return t
                            }

                            function b(t, e, r) {
                                return e in t ? Object.defineProperty(t, e, {
                                    value: r,
                                    enumerable: !0,
                                    configurable: !0,
                                    writable: !0
                                }) : t[e] = r, t
                            }
                            var S = T(T({
                                autoStartLoad: !0,
                                startPosition: -1,
                                defaultAudioCodec: void 0,
                                debug: !1,
                                capLevelOnFPSDrop: !1,
                                capLevelToPlayerSize: !1,
                                initialLiveManifestSize: 1,
                                maxBufferLength: 30,
                                backBufferLength: 1 / 0,
                                maxBufferSize: 6e7,
                                maxBufferHole: .1,
                                highBufferWatchdogPeriod: 2,
                                nudgeOffset: .1,
                                nudgeMaxRetry: 3,
                                maxFragLookUpTolerance: .25,
                                liveSyncDurationCount: 3,
                                liveMaxLatencyDurationCount: 1 / 0,
                                liveSyncDuration: void 0,
                                liveMaxLatencyDuration: void 0,
                                maxLiveSyncPlaybackRate: 1,
                                liveDurationInfinity: !1,
                                liveBackBufferLength: null,
                                maxMaxBufferLength: 600,
                                enableWorker: !0,
                                enableSoftwareAES: !0,
                                manifestLoadingTimeOut: 1e4,
                                manifestLoadingMaxRetry: 1,
                                manifestLoadingRetryDelay: 1e3,
                                manifestLoadingMaxRetryTimeout: 64e3,
                                startLevel: void 0,
                                levelLoadingTimeOut: 1e4,
                                levelLoadingMaxRetry: 4,
                                levelLoadingRetryDelay: 1e3,
                                levelLoadingMaxRetryTimeout: 64e3,
                                fragLoadingTimeOut: 2e4,
                                fragLoadingMaxRetry: 6,
                                fragLoadingRetryDelay: 1e3,
                                fragLoadingMaxRetryTimeout: 64e3,
                                startFragPrefetch: !1,
                                fpsDroppedMonitoringPeriod: 5e3,
                                fpsDroppedMonitoringThreshold: .2,
                                appendErrorMaxRetry: 3,
                                loader: f.default,
                                fLoader: void 0,
                                pLoader: void 0,
                                xhrSetup: void 0,
                                licenseXhrSetup: void 0,
                                licenseResponseCallback: void 0,
                                abrController: i.default,
                                bufferController: l.default,
                                capLevelController: c.default,
                                fpsController: d.default,
                                stretchShortVideoTrack: !1,
                                maxAudioFramesDrift: 1,
                                forceKeyFrameOnDiscontinuity: !0,
                                abrEwmaFastLive: 3,
                                abrEwmaSlowLive: 9,
                                abrEwmaFastVoD: 3,
                                abrEwmaSlowVoD: 9,
                                abrEwmaDefaultEstimate: 5e5,
                                abrBandWidthFactor: .95,
                                abrBandWidthUpFactor: .7,
                                abrMaxWithRealBitrate: !1,
                                maxStarvationDelay: 4,
                                maxLoadingDelay: 4,
                                minAutoBitrate: 0,
                                emeEnabled: !1,
                                widevineLicenseUrl: void 0,
                                drmSystemOptions: {},
                                requestMediaKeySystemAccessFunc: p.requestMediaKeySystemAccess,
                                testBandwidth: !0,
                                progressive: !1,
                                lowLatencyMode: !0
                            }, {
                                cueHandler: v.default,
                                enableCEA708Captions: !0,
                                enableWebVTT: !0,
                                enableIMSC1: !0,
                                captionsTextTrack1Label: "English",
                                captionsTextTrack1LanguageCode: "en",
                                captionsTextTrack2Label: "Spanish",
                                captionsTextTrack2LanguageCode: "es",
                                captionsTextTrack3Label: "Unknown CC",
                                captionsTextTrack3LanguageCode: "",
                                captionsTextTrack4Label: "Unknown CC",
                                captionsTextTrack4LanguageCode: "",
                                renderTextTracksNatively: !0
                            }), {}, {
                                subtitleStreamController: s.SubtitleStreamController,
                                subtitleTrackController: o.default,
                                timelineController: u.TimelineController,
                                audioStreamController: n.default,
                                audioTrackController: a.default,
                                emeController: h.default
                            });

                            function L(t, e) {
                                if ((e.liveSyncDurationCount || e.liveMaxLatencyDurationCount) && (e.liveSyncDuration || e.liveMaxLatencyDuration)) throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration");
                                if (void 0 !== e.liveMaxLatencyDurationCount && (void 0 === e.liveSyncDurationCount || e.liveMaxLatencyDurationCount <= e.liveSyncDurationCount)) throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be greater than "liveSyncDurationCount"');
                                if (void 0 !== e.liveMaxLatencyDuration && (void 0 === e.liveSyncDuration || e.liveMaxLatencyDuration <= e.liveSyncDuration)) throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be greater than "liveSyncDuration"');
                                return y({}, t, e)
                            }

                            function A(t) {
                                var e = t.loader;
                                e !== g.default && e !== f.default ? (m.logger.log("[config]: Custom loader detected, cannot enable progressive streaming"), t.progressive = !1) : Object(g.fetchSupported)() && (t.loader = g.default, t.progressive = !0, t.enableSoftwareAES = !0, m.logger.log("[config]: Progressive streaming enabled, using FetchLoader"))
                            }
                        },
                        "./src/controller/abr-controller.ts": function(t, e, r) {
                            "use strict";
                            r.r(e);
                            var i = r("./src/polyfills/number.ts"),
                                n = r("./src/utils/ewma-bandwidth-estimator.ts"),
                                a = r("./src/events.ts"),
                                s = r("./src/utils/buffer-helper.ts"),
                                o = r("./src/errors.ts"),
                                l = r("./src/types/loader.ts"),
                                u = r("./src/utils/logger.ts");

                            function c(t, e) {
                                for (var r = 0; r < e.length; r++) {
                                    var i = e[r];
                                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                                }
                            }
                            var d = function() {
                                function t(t) {
                                    this.hls = void 0, this.lastLoadedFragLevel = 0, this._nextAutoLevel = -1, this.timer = void 0, this.onCheck = this._abandonRulesCheck.bind(this), this.fragCurrent = null, this.partCurrent = null, this.bitrateTestDelay = 0, this.bwEstimator = void 0, this.hls = t;
                                    var e = t.config;
                                    this.bwEstimator = new n.default(e.abrEwmaSlowVoD, e.abrEwmaFastVoD, e.abrEwmaDefaultEstimate), this.registerListeners()
                                }
                                var e, r, d = t.prototype;
                                return d.registerListeners = function() {
                                    var t = this.hls;
                                    t.on(a.Events.FRAG_LOADING, this.onFragLoading, this), t.on(a.Events.FRAG_LOADED, this.onFragLoaded, this), t.on(a.Events.FRAG_BUFFERED, this.onFragBuffered, this), t.on(a.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.on(a.Events.ERROR, this.onError, this)
                                }, d.unregisterListeners = function() {
                                    var t = this.hls;
                                    t.off(a.Events.FRAG_LOADING, this.onFragLoading, this), t.off(a.Events.FRAG_LOADED, this.onFragLoaded, this), t.off(a.Events.FRAG_BUFFERED, this.onFragBuffered, this), t.off(a.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.off(a.Events.ERROR, this.onError, this)
                                }, d.destroy = function() {
                                    this.unregisterListeners(), this.clearTimer(), this.hls = this.onCheck = null, this.fragCurrent = this.partCurrent = null
                                }, d.onFragLoading = function(t, e) {
                                    var r, i = e.frag;
                                    i.type === l.PlaylistLevelType.MAIN && (this.timer || (this.fragCurrent = i, this.partCurrent = null != (r = e.part) ? r : null, this.timer = self.setInterval(this.onCheck, 100)))
                                }, d.onLevelLoaded = function(t, e) {
                                    var r = this.hls.config;
                                    e.details.live ? this.bwEstimator.update(r.abrEwmaSlowLive, r.abrEwmaFastLive) : this.bwEstimator.update(r.abrEwmaSlowVoD, r.abrEwmaFastVoD)
                                }, d._abandonRulesCheck = function() {
                                    var t = this.fragCurrent,
                                        e = this.partCurrent,
                                        r = this.hls,
                                        n = r.autoLevelEnabled,
                                        o = r.config,
                                        l = r.media;
                                    if (t && l) {
                                        var c = e ? e.stats : t.stats,
                                            d = e ? e.duration : t.duration;
                                        if (c.aborted) return u.logger.warn("frag loader destroy or aborted, disarm abandonRules"), this.clearTimer(), void(this._nextAutoLevel = -1);
                                        if (n && !l.paused && l.playbackRate && l.readyState) {
                                            var h = performance.now() - c.loading.start,
                                                f = Math.abs(l.playbackRate);
                                            if (!(h <= 500 * d / f)) {
                                                var g = r.levels,
                                                    v = r.minAutoLevel,
                                                    p = g[t.level],
                                                    m = c.total || Math.max(c.loaded, Math.round(d * p.maxBitrate / 8)),
                                                    y = Math.max(1, c.bwEstimate ? c.bwEstimate / 8 : 1e3 * c.loaded / h),
                                                    E = (m - c.loaded) / y,
                                                    T = l.currentTime,
                                                    b = (s.BufferHelper.bufferInfo(l, T, o.maxBufferHole).end - T) / f;
                                                if (!(b >= 2 * d / f || E <= b)) {
                                                    var S, L = Number.POSITIVE_INFINITY;
                                                    for (S = t.level - 1; S > v && !((L = d * g[S].maxBitrate / (6.4 * y)) < b); S--);
                                                    if (!(L >= E)) {
                                                        var A = this.bwEstimator.getEstimate();
                                                        u.logger.warn("Fragment " + t.sn + (e ? " part " + e.index : "") + " of level " + t.level + " is loading too slowly and will cause an underbuffer; aborting and switching to level " + S + "\n      Current BW estimate: " + (Object(i.isFiniteNumber)(A) ? (A / 1024).toFixed(3) : "Unknown") + " Kb/s\n      Estimated load time for current fragment: " + E.toFixed(3) + " s\n      Estimated load time for the next fragment: " + L.toFixed(3) + " s\n      Time to underbuffer: " + b.toFixed(3) + " s"), r.nextLoadLevel = S, this.bwEstimator.sample(h, c.loaded), this.clearTimer(), t.loader && (this.fragCurrent = this.partCurrent = null, t.loader.abort()), r.trigger(a.Events.FRAG_LOAD_EMERGENCY_ABORTED, {
                                                            frag: t,
                                                            part: e,
                                                            stats: c
                                                        })
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }, d.onFragLoaded = function(t, e) {
                                    var r = e.frag,
                                        n = e.part;
                                    if (r.type === l.PlaylistLevelType.MAIN && Object(i.isFiniteNumber)(r.sn)) {
                                        var s = n ? n.stats : r.stats,
                                            o = n ? n.duration : r.duration;
                                        if (this.clearTimer(), this.lastLoadedFragLevel = r.level, this._nextAutoLevel = -1, this.hls.config.abrMaxWithRealBitrate) {
                                            var u = this.hls.levels[r.level],
                                                c = (u.loaded ? u.loaded.bytes : 0) + s.loaded,
                                                d = (u.loaded ? u.loaded.duration : 0) + o;
                                            u.loaded = {
                                                bytes: c,
                                                duration: d
                                            }, u.realBitrate = Math.round(8 * c / d)
                                        }
                                        if (r.bitrateTest) {
                                            var h = {
                                                stats: s,
                                                frag: r,
                                                part: n,
                                                id: r.type
                                            };
                                            this.onFragBuffered(a.Events.FRAG_BUFFERED, h), r.bitrateTest = !1
                                        }
                                    }
                                }, d.onFragBuffered = function(t, e) {
                                    var r = e.frag,
                                        i = e.part,
                                        n = i ? i.stats : r.stats;
                                    if (!n.aborted && r.type === l.PlaylistLevelType.MAIN && "initSegment" !== r.sn) {
                                        var a = n.parsing.end - n.loading.start;
                                        this.bwEstimator.sample(a, n.loaded), n.bwEstimate = this.bwEstimator.getEstimate(), r.bitrateTest ? this.bitrateTestDelay = a / 1e3 : this.bitrateTestDelay = 0
                                    }
                                }, d.onError = function(t, e) {
                                    switch (e.details) {
                                        case o.ErrorDetails.FRAG_LOAD_ERROR:
                                        case o.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                            this.clearTimer()
                                    }
                                }, d.clearTimer = function() {
                                    self.clearInterval(this.timer), this.timer = void 0
                                }, d.getNextABRAutoLevel = function() {
                                    var t = this.fragCurrent,
                                        e = this.partCurrent,
                                        r = this.hls,
                                        i = r.maxAutoLevel,
                                        n = r.config,
                                        a = r.minAutoLevel,
                                        o = r.media,
                                        l = e ? e.duration : t ? t.duration : 0,
                                        c = o ? o.currentTime : 0,
                                        d = o && 0 !== o.playbackRate ? Math.abs(o.playbackRate) : 1,
                                        h = this.bwEstimator ? this.bwEstimator.getEstimate() : n.abrEwmaDefaultEstimate,
                                        f = (s.BufferHelper.bufferInfo(o, c, n.maxBufferHole).end - c) / d,
                                        g = this.findBestLevel(h, a, i, f, n.abrBandWidthFactor, n.abrBandWidthUpFactor);
                                    if (g >= 0) return g;
                                    u.logger.trace((f ? "rebuffering expected" : "buffer is empty") + ", finding optimal quality level");
                                    var v = l ? Math.min(l, n.maxStarvationDelay) : n.maxStarvationDelay,
                                        p = n.abrBandWidthFactor,
                                        m = n.abrBandWidthUpFactor;
                                    if (!f) {
                                        var y = this.bitrateTestDelay;
                                        y && (v = (l ? Math.min(l, n.maxLoadingDelay) : n.maxLoadingDelay) - y, u.logger.trace("bitrate test took " + Math.round(1e3 * y) + "ms, set first fragment max fetchDuration to " + Math.round(1e3 * v) + " ms"), p = m = 1)
                                    }
                                    return g = this.findBestLevel(h, a, i, f + v, p, m), Math.max(g, 0)
                                }, d.findBestLevel = function(t, e, r, i, n, a) {
                                    for (var s, o = this.fragCurrent, l = this.partCurrent, c = this.lastLoadedFragLevel, d = this.hls.levels, h = d[c], f = !(null == h || null === (s = h.details) || void 0 === s || !s.live), g = null == h ? void 0 : h.codecSet, v = l ? l.duration : o ? o.duration : 0, p = r; p >= e; p--) {
                                        var m = d[p];
                                        if (m && (!g || m.codecSet === g)) {
                                            var y, E = m.details,
                                                T = (l ? null == E ? void 0 : E.partTarget : null == E ? void 0 : E.averagetargetduration) || v;
                                            y = p <= c ? n * t : a * t;
                                            var b = d[p].maxBitrate,
                                                S = b * T / y;
                                            if (u.logger.trace("level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: " + p + "/" + Math.round(y) + "/" + b + "/" + T + "/" + i + "/" + S), y > b && (!S || f && !this.bitrateTestDelay || S < i)) return p
                                        }
                                    }
                                    return -1
                                }, e = t, (r = [{
                                    key: "nextAutoLevel",
                                    get: function() {
                                        var t = this._nextAutoLevel,
                                            e = this.bwEstimator;
                                        if (!(-1 === t || e && e.canEstimate())) return t;
                                        var r = this.getNextABRAutoLevel();
                                        return -1 !== t && (r = Math.min(t, r)), r
                                    },
                                    set: function(t) {
                                        this._nextAutoLevel = t
                                    }
                                }]) && c(e.prototype, r), t
                            }();
                            e.default = d
                        },
                        "./src/controller/audio-stream-controller.ts": function(t, e, r) {
                            "use strict";
                            r.r(e);
                            var i = r("./src/polyfills/number.ts"),
                                n = r("./src/controller/base-stream-controller.ts"),
                                a = r("./src/events.ts"),
                                s = r("./src/utils/buffer-helper.ts"),
                                o = r("./src/controller/fragment-tracker.ts"),
                                l = r("./src/types/level.ts"),
                                u = r("./src/types/loader.ts"),
                                c = r("./src/loader/fragment.ts"),
                                d = r("./src/demux/chunk-cache.ts"),
                                h = r("./src/demux/transmuxer-interface.ts"),
                                f = r("./src/types/transmuxer.ts"),
                                g = r("./src/controller/fragment-finders.ts"),
                                v = r("./src/utils/discontinuities.ts"),
                                p = r("./src/errors.ts"),
                                m = r("./src/utils/logger.ts");

                            function y() {
                                return (y = Object.assign || function(t) {
                                    for (var e = 1; e < arguments.length; e++) {
                                        var r = arguments[e];
                                        for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i])
                                    }
                                    return t
                                }).apply(this, arguments)
                            }

                            function E(t, e) {
                                return (E = Object.setPrototypeOf || function(t, e) {
                                    return t.__proto__ = e, t
                                })(t, e)
                            }
                            var T = function(t) {
                                var e, r;

                                function T(e, r) {
                                    var i;
                                    return (i = t.call(this, e, r, "[audio-stream-controller]") || this).videoBuffer = null, i.videoTrackCC = -1, i.waitingVideoCC = -1, i.audioSwitch = !1, i.trackId = -1, i.waitingData = null, i.mainDetails = null, i.bufferFlushed = !1, i._registerListeners(), i
                                }
                                r = t, (e = T).prototype = Object.create(r.prototype), e.prototype.constructor = e, E(e, r);
                                var b = T.prototype;
                                return b.onHandlerDestroying = function() {
                                    this._unregisterListeners(), this.mainDetails = null
                                }, b._registerListeners = function() {
                                    var t = this.hls;
                                    t.on(a.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.on(a.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(a.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.on(a.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.on(a.Events.AUDIO_TRACKS_UPDATED, this.onAudioTracksUpdated, this), t.on(a.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), t.on(a.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), t.on(a.Events.ERROR, this.onError, this), t.on(a.Events.BUFFER_RESET, this.onBufferReset, this), t.on(a.Events.BUFFER_CREATED, this.onBufferCreated, this), t.on(a.Events.BUFFER_FLUSHED, this.onBufferFlushed, this), t.on(a.Events.INIT_PTS_FOUND, this.onInitPtsFound, this), t.on(a.Events.FRAG_BUFFERED, this.onFragBuffered, this)
                                }, b._unregisterListeners = function() {
                                    var t = this.hls;
                                    t.off(a.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.off(a.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(a.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.off(a.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.off(a.Events.AUDIO_TRACKS_UPDATED, this.onAudioTracksUpdated, this), t.off(a.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), t.off(a.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), t.off(a.Events.ERROR, this.onError, this), t.off(a.Events.BUFFER_RESET, this.onBufferReset, this), t.off(a.Events.BUFFER_CREATED, this.onBufferCreated, this), t.off(a.Events.BUFFER_FLUSHED, this.onBufferFlushed, this), t.off(a.Events.INIT_PTS_FOUND, this.onInitPtsFound, this), t.off(a.Events.FRAG_BUFFERED, this.onFragBuffered, this)
                                }, b.onInitPtsFound = function(t, e) {
                                    var r = e.frag,
                                        i = e.id,
                                        a = e.initPTS;
                                    if ("main" === i) {
                                        var s = r.cc;
                                        this.initPTS[r.cc] = a, this.log("InitPTS for cc: " + s + " found from main: " + a), this.videoTrackCC = s, this.state === n.State.WAITING_INIT_PTS && this.tick()
                                    }
                                }, b.startLoad = function(t) {
                                    if (!this.levels) return this.startPosition = t, void(this.state = n.State.STOPPED);
                                    var e = this.lastCurrentTime;
                                    this.stopLoad(), this.setInterval(100), this.fragLoadError = 0, e > 0 && -1 === t ? (this.log("Override startPosition with lastCurrentTime @" + e.toFixed(3)), this.state = n.State.IDLE) : (this.loadedmetadata = !1, this.state = n.State.WAITING_TRACK), this.nextLoadPosition = this.startPosition = this.lastCurrentTime = t, this.tick()
                                }, b.doTick = function() {
                                    switch (this.state) {
                                        case n.State.IDLE:
                                            this.doTickIdle();
                                            break;
                                        case n.State.WAITING_TRACK:
                                            var e, r = this.levels,
                                                i = this.trackId,
                                                a = null == r || null === (e = r[i]) || void 0 === e ? void 0 : e.details;
                                            if (a) {
                                                if (this.waitForCdnTuneIn(a)) break;
                                                this.state = n.State.WAITING_INIT_PTS
                                            }
                                            break;
                                        case n.State.FRAG_LOADING_WAITING_RETRY:
                                            var o, l = performance.now(),
                                                u = this.retryDate;
                                            (!u || l >= u || null !== (o = this.media) && void 0 !== o && o.seeking) && (this.log("RetryDate reached, switch back to IDLE state"), this.state = n.State.IDLE);
                                            break;
                                        case n.State.WAITING_INIT_PTS:
                                            var c = this.waitingData;
                                            if (c) {
                                                var d = c.frag,
                                                    h = c.part,
                                                    f = c.cache,
                                                    v = c.complete;
                                                if (void 0 !== this.initPTS[d.cc]) {
                                                    this.waitingData = null, this.waitingVideoCC = -1, this.state = n.State.FRAG_LOADING;
                                                    var p = {
                                                        frag: d,
                                                        part: h,
                                                        payload: f.flush(),
                                                        networkDetails: null
                                                    };
                                                    this._handleFragmentLoadProgress(p), v && t.prototype._handleFragmentLoadComplete.call(this, p)
                                                } else if (this.videoTrackCC !== this.waitingVideoCC) m.logger.log("Waiting fragment cc (" + d.cc + ") cancelled because video is at cc " + this.videoTrackCC), this.clearWaitingFragment();
                                                else {
                                                    var y = this.getLoadPosition(),
                                                        E = s.BufferHelper.bufferInfo(this.mediaBuffer, y, this.config.maxBufferHole);
                                                    Object(g.fragmentWithinToleranceTest)(E.end, this.config.maxFragLookUpTolerance, d) < 0 && (m.logger.log("Waiting fragment cc (" + d.cc + ") @ " + d.start + " cancelled because another fragment at " + E.end + " is needed"), this.clearWaitingFragment())
                                                }
                                            } else this.state = n.State.IDLE
                                    }
                                    this.onTickEnd()
                                }, b.clearWaitingFragment = function() {
                                    var t = this.waitingData;
                                    t && (this.fragmentTracker.removeFragment(t.frag), this.waitingData = null, this.waitingVideoCC = -1, this.state = n.State.IDLE)
                                }, b.onTickEnd = function() {
                                    var t = this.media;
                                    if (t && t.readyState) {
                                        var e = (this.mediaBuffer ? this.mediaBuffer : t).buffered;
                                        !this.loadedmetadata && e.length && (this.loadedmetadata = !0), this.lastCurrentTime = t.currentTime
                                    }
                                }, b.doTickIdle = function() {
                                    var t, e, r = this.hls,
                                        i = this.levels,
                                        s = this.media,
                                        o = this.trackId,
                                        l = r.config;
                                    if (i && i[o] && (s || !this.startFragRequested && l.startFragPrefetch)) {
                                        var d = i[o].details;
                                        if (!d || d.live && this.levelLastLoaded !== o || this.waitForCdnTuneIn(d)) this.state = n.State.WAITING_TRACK;
                                        else {
                                            this.bufferFlushed && (this.bufferFlushed = !1, this.afterBufferFlushed(this.mediaBuffer ? this.mediaBuffer : this.media, c.ElementaryStreamTypes.AUDIO, u.PlaylistLevelType.AUDIO));
                                            var h = this.getFwdBufferInfo(this.mediaBuffer ? this.mediaBuffer : this.media, u.PlaylistLevelType.AUDIO);
                                            if (null !== h) {
                                                var f = h.len,
                                                    g = this.getMaxBufferLength(),
                                                    v = this.audioSwitch;
                                                if (!(f >= g) || v) {
                                                    if (!v && this._streamEnded(h, d)) return r.trigger(a.Events.BUFFER_EOS, {
                                                        type: "audio"
                                                    }), void(this.state = n.State.ENDED);
                                                    var p = d.fragments[0].start,
                                                        m = h.end;
                                                    if (v) {
                                                        var y = this.getLoadPosition();
                                                        m = y, d.PTSKnown && y < p && (h.end > p || h.nextStart) && (this.log("Alt audio track ahead of main track, seek to start of alt audio track"), s.currentTime = p + .05)
                                                    }
                                                    var E = this.getNextFragment(m, d);
                                                    E ? "identity" !== (null === (t = E.decryptdata) || void 0 === t ? void 0 : t.keyFormat) || null !== (e = E.decryptdata) && void 0 !== e && e.key ? this.loadFragment(E, d, m) : this.loadKey(E, d) : this.bufferFlushed = !0
                                                }
                                            }
                                        }
                                    }
                                }, b.getMaxBufferLength = function() {
                                    var e = t.prototype.getMaxBufferLength.call(this),
                                        r = this.getFwdBufferInfo(this.videoBuffer ? this.videoBuffer : this.media, u.PlaylistLevelType.MAIN);
                                    return null === r ? e : Math.max(e, r.len)
                                }, b.onMediaDetaching = function() {
                                    this.videoBuffer = null, t.prototype.onMediaDetaching.call(this)
                                }, b.onAudioTracksUpdated = function(t, e) {
                                    var r = e.audioTracks;
                                    this.resetTransmuxer(), this.levels = r.map((function(t) {
                                        return new l.Level(t)
                                    }))
                                }, b.onAudioTrackSwitching = function(t, e) {
                                    var r = !!e.url;
                                    this.trackId = e.id;
                                    var i = this.fragCurrent;
                                    null != i && i.loader && i.loader.abort(), this.fragCurrent = null, this.clearWaitingFragment(), r ? this.setInterval(100) : this.resetTransmuxer(), r ? (this.audioSwitch = !0, this.state = n.State.IDLE) : this.state = n.State.STOPPED, this.tick()
                                }, b.onManifestLoading = function() {
                                    this.mainDetails = null, this.fragmentTracker.removeAllFragments(), this.startPosition = this.lastCurrentTime = 0, this.bufferFlushed = !1
                                }, b.onLevelLoaded = function(t, e) {
                                    this.mainDetails = e.details
                                }, b.onAudioTrackLoaded = function(t, e) {
                                    var r, i = this.levels,
                                        a = e.details,
                                        s = e.id;
                                    if (i) {
                                        this.log("Track " + s + " loaded [" + a.startSN + "," + a.endSN + "],duration:" + a.totalduration);
                                        var o = i[s],
                                            l = 0;
                                        if (a.live || null !== (r = o.details) && void 0 !== r && r.live) {
                                            var u = this.mainDetails;
                                            if (a.fragments[0] || (a.deltaUpdateFailed = !0), a.deltaUpdateFailed || !u) return;
                                            !o.details && a.hasProgramDateTime && u.hasProgramDateTime ? (Object(v.alignPDT)(a, u), l = a.fragments[0].start) : l = this.alignPlaylists(a, o.details)
                                        }
                                        o.details = a, this.levelLastLoaded = s, this.startFragRequested || !this.mainDetails && a.live || this.setStartPosition(o.details, l), this.state !== n.State.WAITING_TRACK || this.waitForCdnTuneIn(a) || (this.state = n.State.IDLE), this.tick()
                                    } else this.warn("Audio tracks were reset while loading level " + s)
                                }, b._handleFragmentLoadProgress = function(t) {
                                    var e, r = t.frag,
                                        i = t.part,
                                        a = t.payload,
                                        s = this.config,
                                        o = this.trackId,
                                        l = this.levels;
                                    if (l) {
                                        var c = l[o];
                                        console.assert(c, "Audio track is defined on fragment load progress");
                                        var g = c.details;
                                        console.assert(g, "Audio track details are defined on fragment load progress");
                                        var v = s.defaultAudioCodec || c.audioCodec || "mp4a.40.2",
                                            p = this.transmuxer;
                                        p || (p = this.transmuxer = new h.default(this.hls, u.PlaylistLevelType.AUDIO, this._handleTransmuxComplete.bind(this), this._handleTransmuxerFlush.bind(this)));
                                        var y = this.initPTS[r.cc],
                                            E = null === (e = r.initSegment) || void 0 === e ? void 0 : e.data;
                                        if (void 0 !== y) {
                                            var T = i ? i.index : -1,
                                                b = -1 !== T,
                                                S = new f.ChunkMetadata(r.level, r.sn, r.stats.chunkCount, a.byteLength, T, b);
                                            p.push(a, E, v, "", r, i, g.totalduration, !1, S, y)
                                        } else m.logger.log("Unknown video PTS for cc " + r.cc + ", waiting for video PTS before demuxing audio frag " + r.sn + " of [" + g.startSN + " ," + g.endSN + "],track " + o), (this.waitingData = this.waitingData || {
                                            frag: r,
                                            part: i,
                                            cache: new d.default,
                                            complete: !1
                                        }).cache.push(new Uint8Array(a)), this.waitingVideoCC = this.videoTrackCC, this.state = n.State.WAITING_INIT_PTS
                                    } else this.warn("Audio tracks were reset while fragment load was in progress. Fragment " + r.sn + " of level " + r.level + " will not be buffered")
                                }, b._handleFragmentLoadComplete = function(e) {
                                    this.waitingData ? this.waitingData.complete = !0 : t.prototype._handleFragmentLoadComplete.call(this, e)
                                }, b.onBufferReset = function() {
                                    this.mediaBuffer = this.videoBuffer = null, this.loadedmetadata = !1
                                }, b.onBufferCreated = function(t, e) {
                                    var r = e.tracks.audio;
                                    r && (this.mediaBuffer = r.buffer), e.tracks.video && (this.videoBuffer = e.tracks.video.buffer)
                                }, b.onFragBuffered = function(t, e) {
                                    var r = e.frag,
                                        i = e.part;
                                    r.type === u.PlaylistLevelType.AUDIO && (this.fragContextChanged(r) ? this.warn("Fragment " + r.sn + (i ? " p: " + i.index : "") + " of level " + r.level + " finished buffering, but was aborted. state: " + this.state + ", audioSwitch: " + this.audioSwitch) : ("initSegment" !== r.sn && (this.fragPrevious = r, this.audioSwitch && (this.audioSwitch = !1, this.hls.trigger(a.Events.AUDIO_TRACK_SWITCHED, {
                                        id: this.trackId
                                    }))), this.fragBufferedComplete(r, i)))
                                }, b.onError = function(e, r) {
                                    switch (r.details) {
                                        case p.ErrorDetails.FRAG_LOAD_ERROR:
                                        case p.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                        case p.ErrorDetails.KEY_LOAD_ERROR:
                                        case p.ErrorDetails.KEY_LOAD_TIMEOUT:
                                            this.onFragmentOrKeyLoadError(u.PlaylistLevelType.AUDIO, r);
                                            break;
                                        case p.ErrorDetails.AUDIO_TRACK_LOAD_ERROR:
                                        case p.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT:
                                            this.state !== n.State.ERROR && this.state !== n.State.STOPPED && (this.state = r.fatal ? n.State.ERROR : n.State.IDLE, this.warn(r.details + " while loading frag, switching to " + this.state + " state"));
                                            break;
                                        case p.ErrorDetails.BUFFER_FULL_ERROR:
                                            if ("audio" === r.parent && (this.state === n.State.PARSING || this.state === n.State.PARSED)) {
                                                var i = !0,
                                                    a = this.getFwdBufferInfo(this.mediaBuffer, u.PlaylistLevelType.AUDIO);
                                                a && a.len > .5 && (i = !this.reduceMaxBufferLength(a.len)), i && (this.warn("Buffer full error also media.currentTime is not buffered, flush audio buffer"), this.fragCurrent = null, t.prototype.flushMainBuffer.call(this, 0, Number.POSITIVE_INFINITY, "audio")), this.resetLoadingState()
                                            }
                                    }
                                }, b.onBufferFlushed = function(t, e) {
                                    e.type === c.ElementaryStreamTypes.AUDIO && (this.bufferFlushed = !0)
                                }, b._handleTransmuxComplete = function(t) {
                                    var e, r = "audio",
                                        i = this.hls,
                                        s = t.remuxResult,
                                        o = t.chunkMeta,
                                        l = this.getCurrentContext(o);
                                    if (!l) return this.warn("The loading context changed while buffering fragment " + o.sn + " of level " + o.level + ". This chunk will not be buffered."), void this.resetLiveStartWhenNotLoaded(o.level);
                                    var u = l.frag,
                                        d = l.part,
                                        h = s.audio,
                                        f = s.text,
                                        g = s.id3,
                                        v = s.initSegment;
                                    if (!this.fragContextChanged(u)) {
                                        if (this.state = n.State.PARSING, this.audioSwitch && h && this.completeAudioSwitch(), null != v && v.tracks && (this._bufferInitSegment(v.tracks, u, o), i.trigger(a.Events.FRAG_PARSING_INIT_SEGMENT, {
                                                frag: u,
                                                id: r,
                                                tracks: v.tracks
                                            })), h) {
                                            var p = h.startPTS,
                                                m = h.endPTS,
                                                E = h.startDTS,
                                                T = h.endDTS;
                                            d && (d.elementaryStreams[c.ElementaryStreamTypes.AUDIO] = {
                                                startPTS: p,
                                                endPTS: m,
                                                startDTS: E,
                                                endDTS: T
                                            }), u.setElementaryStreamInfo(c.ElementaryStreamTypes.AUDIO, p, m, E, T), this.bufferFragmentData(h, u, d, o)
                                        }
                                        if (null != g && null !== (e = g.samples) && void 0 !== e && e.length) {
                                            var b = y({
                                                frag: u,
                                                id: r
                                            }, g);
                                            i.trigger(a.Events.FRAG_PARSING_METADATA, b)
                                        }
                                        if (f) {
                                            var S = y({
                                                frag: u,
                                                id: r
                                            }, f);
                                            i.trigger(a.Events.FRAG_PARSING_USERDATA, S)
                                        }
                                    }
                                }, b._bufferInitSegment = function(t, e, r) {
                                    if (this.state === n.State.PARSING) {
                                        t.video && delete t.video;
                                        var i = t.audio;
                                        if (i) {
                                            i.levelCodec = i.codec, i.id = "audio", this.log("Init audio buffer, container:" + i.container + ", codecs[parsed]=[" + i.codec + "]"), this.hls.trigger(a.Events.BUFFER_CODECS, t);
                                            var s = i.initSegment;
                                            if (null != s && s.byteLength) {
                                                var o = {
                                                    type: "audio",
                                                    frag: e,
                                                    part: null,
                                                    chunkMeta: r,
                                                    parent: e.type,
                                                    data: s
                                                };
                                                this.hls.trigger(a.Events.BUFFER_APPENDING, o)
                                            }
                                            this.tick()
                                        }
                                    }
                                }, b.loadFragment = function(e, r, a) {
                                    var s = this.fragmentTracker.getState(e);
                                    this.fragCurrent = e, (this.audioSwitch || s === o.FragmentState.NOT_LOADED || s === o.FragmentState.PARTIAL) && ("initSegment" === e.sn ? this._loadInitSegment(e) : r.live && !Object(i.isFiniteNumber)(this.initPTS[e.cc]) ? (this.log("Waiting for video PTS in continuity counter " + e.cc + " of live stream before loading audio fragment " + e.sn + " of level " + this.trackId), this.state = n.State.WAITING_INIT_PTS) : (this.startFragRequested = !0, t.prototype.loadFragment.call(this, e, r, a)))
                                }, b.completeAudioSwitch = function() {
                                    var e = this.hls,
                                        r = this.media,
                                        i = this.trackId;
                                    r && (this.log("Switching audio track : flushing all audio"), t.prototype.flushMainBuffer.call(this, 0, Number.POSITIVE_INFINITY, "audio")), this.audioSwitch = !1, e.trigger(a.Events.AUDIO_TRACK_SWITCHED, {
                                        id: i
                                    })
                                }, T
                            }(n.default);
                            e.default = T
                        },
                        "./src/controller/audio-track-controller.ts": function(t, e, r) {
                            "use strict";
                            r.r(e);
                            var i = r("./src/events.ts"),
                                n = r("./src/errors.ts"),
                                a = r("./src/controller/base-playlist-controller.ts"),
                                s = r("./src/types/loader.ts");

                            function o(t, e) {
                                for (var r = 0; r < e.length; r++) {
                                    var i = e[r];
                                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                                }
                            }

                            function l(t, e) {
                                return (l = Object.setPrototypeOf || function(t, e) {
                                    return t.__proto__ = e, t
                                })(t, e)
                            }
                            var u = function(t) {
                                var e, r;

                                function a(e) {
                                    var r;
                                    return (r = t.call(this, e, "[audio-track-controller]") || this).tracks = [], r.groupId = null, r.tracksInGroup = [], r.trackId = -1, r.trackName = "", r.selectDefaultTrack = !0, r.registerListeners(), r
                                }
                                r = t, (e = a).prototype = Object.create(r.prototype), e.prototype.constructor = e, l(e, r);
                                var u, c, d = a.prototype;
                                return d.registerListeners = function() {
                                    var t = this.hls;
                                    t.on(i.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.on(i.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.on(i.Events.LEVEL_LOADING, this.onLevelLoading, this), t.on(i.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), t.on(i.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), t.on(i.Events.ERROR, this.onError, this)
                                }, d.unregisterListeners = function() {
                                    var t = this.hls;
                                    t.off(i.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.off(i.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.off(i.Events.LEVEL_LOADING, this.onLevelLoading, this), t.off(i.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), t.off(i.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), t.off(i.Events.ERROR, this.onError, this)
                                }, d.destroy = function() {
                                    this.unregisterListeners(), this.tracks.length = 0, this.tracksInGroup.length = 0, t.prototype.destroy.call(this)
                                }, d.onManifestLoading = function() {
                                    this.tracks = [], this.groupId = null, this.tracksInGroup = [], this.trackId = -1, this.trackName = "", this.selectDefaultTrack = !0
                                }, d.onManifestParsed = function(t, e) {
                                    this.tracks = e.audioTracks || []
                                }, d.onAudioTrackLoaded = function(t, e) {
                                    var r = e.id,
                                        i = e.details,
                                        n = this.tracksInGroup[r];
                                    if (n) {
                                        var a = n.details;
                                        n.details = e.details, this.log("audioTrack " + r + " loaded [" + i.startSN + "-" + i.endSN + "]"), r === this.trackId && (this.retryCount = 0, this.playlistLoaded(r, e, a))
                                    } else this.warn("Invalid audio track id " + r)
                                }, d.onLevelLoading = function(t, e) {
                                    this.switchLevel(e.level)
                                }, d.onLevelSwitching = function(t, e) {
                                    this.switchLevel(e.level)
                                }, d.switchLevel = function(t) {
                                    var e = this.hls.levels[t];
                                    if (null != e && e.audioGroupIds) {
                                        var r = e.audioGroupIds[e.urlId];
                                        if (this.groupId !== r) {
                                            this.groupId = r;
                                            var n = this.tracks.filter((function(t) {
                                                return !r || t.groupId === r
                                            }));
                                            this.selectDefaultTrack && !n.some((function(t) {
                                                return t.default
                                            })) && (this.selectDefaultTrack = !1), this.tracksInGroup = n;
                                            var a = {
                                                audioTracks: n
                                            };
                                            this.log("Updating audio tracks, " + n.length + ' track(s) found in "' + r + '" group-id'), this.hls.trigger(i.Events.AUDIO_TRACKS_UPDATED, a), this.selectInitialTrack()
                                        }
                                    }
                                }, d.onError = function(e, r) {
                                    t.prototype.onError.call(this, e, r), !r.fatal && r.context && r.context.type === s.PlaylistContextType.AUDIO_TRACK && r.context.id === this.trackId && r.context.groupId === this.groupId && this.retryLoadingOrFail(r)
                                }, d.setAudioTrack = function(t) {
                                    var e = this.tracksInGroup;
                                    if (t < 0 || t >= e.length) this.warn("Invalid id passed to audio-track controller");
                                    else {
                                        this.clearTimer();
                                        var r = e[this.trackId];
                                        this.log("Now switching to audio-track index " + t);
                                        var n = e[t],
                                            a = n.id,
                                            s = n.groupId,
                                            o = void 0 === s ? "" : s,
                                            l = n.name,
                                            u = n.type,
                                            c = n.url;
                                        if (this.trackId = t, this.trackName = l, this.selectDefaultTrack = !1, this.hls.trigger(i.Events.AUDIO_TRACK_SWITCHING, {
                                                id: a,
                                                groupId: o,
                                                name: l,
                                                type: u,
                                                url: c
                                            }), !n.details || n.details.live) {
                                            var d = this.switchParams(n.url, null == r ? void 0 : r.details);
                                            this.loadPlaylist(d)
                                        }
                                    }
                                }, d.selectInitialTrack = function() {
                                    var t = this.tracksInGroup;
                                    console.assert(t.length, "Initial audio track should be selected when tracks are known");
                                    var e = this.trackName,
                                        r = this.findTrackId(e) || this.findTrackId(); - 1 !== r ? this.setAudioTrack(r) : (this.warn("No track found for running audio group-ID: " + this.groupId), this.hls.trigger(i.Events.ERROR, {
                                        type: n.ErrorTypes.MEDIA_ERROR,
                                        details: n.ErrorDetails.AUDIO_TRACK_LOAD_ERROR,
                                        fatal: !0
                                    }))
                                }, d.findTrackId = function(t) {
                                    for (var e = this.tracksInGroup, r = 0; r < e.length; r++) {
                                        var i = e[r];
                                        if ((!this.selectDefaultTrack || i.default) && (!t || t === i.name)) return i.id
                                    }
                                    return -1
                                }, d.loadPlaylist = function(t) {
                                    var e = this.tracksInGroup[this.trackId];
                                    if (this.shouldLoadTrack(e)) {
                                        var r = e.id,
                                            n = e.groupId,
                                            a = e.url;
                                        if (t) try {
                                            a = t.addDirectives(a)
                                        } catch (t) {
                                            this.warn("Could not construct new URL with HLS Delivery Directives: " + t)
                                        }
                                        this.log("loading audio-track playlist for id: " + r), this.clearTimer(), this.hls.trigger(i.Events.AUDIO_TRACK_LOADING, {
                                            url: a,
                                            id: r,
                                            groupId: n,
                                            deliveryDirectives: t || null
                                        })
                                    }
                                }, u = a, (c = [{
                                    key: "audioTracks",
                                    get: function() {
                                        return this.tracksInGroup
                                    }
                                }, {
                                    key: "audioTrack",
                                    get: function() {
                                        return this.trackId
                                    },
                                    set: function(t) {
                                        this.selectDefaultTrack = !1, this.setAudioTrack(t)
                                    }
                                }]) && o(u.prototype, c), a
                            }(a.default);
                            e.default = u
                        },
                        "./src/controller/base-playlist-controller.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "default", (function() {
                                return l
                            }));
                            var i = r("./src/polyfills/number.ts"),
                                n = r("./src/types/level.ts"),
                                a = r("./src/controller/level-helper.ts"),
                                s = r("./src/utils/logger.ts"),
                                o = r("./src/errors.ts"),
                                l = function() {
                                    function t(t, e) {
                                        this.hls = void 0, this.timer = -1, this.canLoad = !1, this.retryCount = 0, this.log = void 0, this.warn = void 0, this.log = s.logger.log.bind(s.logger, e + ":"), this.warn = s.logger.warn.bind(s.logger, e + ":"), this.hls = t
                                    }
                                    var e = t.prototype;
                                    return e.destroy = function() {
                                        this.clearTimer(), this.hls = this.log = this.warn = null
                                    }, e.onError = function(t, e) {
                                        e.fatal && e.type === o.ErrorTypes.NETWORK_ERROR && this.clearTimer()
                                    }, e.clearTimer = function() {
                                        clearTimeout(this.timer), this.timer = -1
                                    }, e.startLoad = function() {
                                        this.canLoad = !0, this.retryCount = 0, this.loadPlaylist()
                                    }, e.stopLoad = function() {
                                        this.canLoad = !1, this.clearTimer()
                                    }, e.switchParams = function(t, e) {
                                        var r = null == e ? void 0 : e.renditionReports;
                                        if (r)
                                            for (var a = 0; a < r.length; a++) {
                                                var s = r[a],
                                                    o = "" + s.URI;
                                                if (o === t.substr(-o.length)) {
                                                    var l = parseInt(s["LAST-MSN"]),
                                                        u = parseInt(s["LAST-PART"]);
                                                    if (e && this.hls.config.lowLatencyMode) {
                                                        var c = Math.min(e.age - e.partTarget, e.targetduration);
                                                        void 0 !== u && c > e.partTarget && (u += 1)
                                                    }
                                                    if (Object(i.isFiniteNumber)(l)) return new n.HlsUrlParameters(l, Object(i.isFiniteNumber)(u) ? u : void 0, n.HlsSkip.No)
                                                }
                                            }
                                    }, e.loadPlaylist = function(t) {}, e.shouldLoadTrack = function(t) {
                                        return this.canLoad && t && !!t.url && (!t.details || t.details.live)
                                    }, e.playlistLoaded = function(t, e, r) {
                                        var i = this,
                                            n = e.details,
                                            s = e.stats,
                                            o = s.loading.end ? Math.max(0, self.performance.now() - s.loading.end) : 0;
                                        if (n.advancedDateTime = Date.now() - o, n.live || null != r && r.live) {
                                            if (n.reloaded(r), r && this.log("live playlist " + t + " " + (n.advanced ? "REFRESHED " + n.lastPartSn + "-" + n.lastPartIndex : "MISSED")), r && n.fragments.length > 0 && Object(a.mergeDetails)(r, n), !this.canLoad || !n.live) return;
                                            var l, u = void 0,
                                                c = void 0;
                                            if (n.canBlockReload && n.endSN && n.advanced) {
                                                var d = this.hls.config.lowLatencyMode,
                                                    h = n.lastPartSn,
                                                    f = n.endSN,
                                                    g = n.lastPartIndex,
                                                    v = h === f; - 1 !== g ? (u = v ? f + 1 : h, c = v ? d ? 0 : g : g + 1) : u = f + 1;
                                                var p = n.age,
                                                    m = p + n.ageHeader,
                                                    y = Math.min(m - n.partTarget, 1.5 * n.targetduration);
                                                if (y > 0) {
                                                    if (r && y > r.tuneInGoal) this.warn("CDN Tune-in goal increased from: " + r.tuneInGoal + " to: " + y + " with playlist age: " + n.age), y = 0;
                                                    else {
                                                        var E = Math.floor(y / n.targetduration);
                                                        u += E, void 0 !== c && (c += Math.round(y % n.targetduration / n.partTarget)), this.log("CDN Tune-in age: " + n.ageHeader + "s last advanced " + p.toFixed(2) + "s goal: " + y + " skip sn " + E + " to part " + c)
                                                    }
                                                    n.tuneInGoal = y
                                                }
                                                if (l = this.getDeliveryDirectives(n, e.deliveryDirectives, u, c), d || !v) return void this.loadPlaylist(l)
                                            } else l = this.getDeliveryDirectives(n, e.deliveryDirectives, u, c);
                                            var T = Object(a.computeReloadInterval)(n, s);
                                            void 0 !== u && n.canBlockReload && (T -= n.partTarget || 1), this.log("reload live playlist " + t + " in " + Math.round(T) + " ms"), this.timer = self.setTimeout((function() {
                                                return i.loadPlaylist(l)
                                            }), T)
                                        } else this.clearTimer()
                                    }, e.getDeliveryDirectives = function(t, e, r, i) {
                                        var a = Object(n.getSkipValue)(t, r);
                                        return null != e && e.skip && t.deltaUpdateFailed && (r = e.msn, i = e.part, a = n.HlsSkip.No), new n.HlsUrlParameters(r, i, a)
                                    }, e.retryLoadingOrFail = function(t) {
                                        var e, r = this,
                                            i = this.hls.config,
                                            n = this.retryCount < i.levelLoadingMaxRetry;
                                        if (n)
                                            if (this.retryCount++, t.details.indexOf("LoadTimeOut") > -1 && null !== (e = t.context) && void 0 !== e && e.deliveryDirectives) this.warn("retry playlist loading #" + this.retryCount + ' after "' + t.details + '"'), this.loadPlaylist();
                                            else {
                                                var a = Math.min(Math.pow(2, this.retryCount) * i.levelLoadingRetryDelay, i.levelLoadingMaxRetryTimeout);
                                                this.timer = self.setTimeout((function() {
                                                    return r.loadPlaylist()
                                                }), a), this.warn("retry playlist loading #" + this.retryCount + " in " + a + ' ms after "' + t.details + '"')
                                            }
                                        else this.warn('cannot recover from error "' + t.details + '"'), this.clearTimer(), t.fatal = !0;
                                        return n
                                    }, t
                                }()
                        },
                        "./src/controller/base-stream-controller.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "State", (function() {
                                return b
                            })), r.d(e, "default", (function() {
                                return S
                            }));
                            var i = r("./src/polyfills/number.ts"),
                                n = r("./src/task-loop.ts"),
                                a = r("./src/controller/fragment-tracker.ts"),
                                s = r("./src/utils/buffer-helper.ts"),
                                o = r("./src/utils/logger.ts"),
                                l = r("./src/events.ts"),
                                u = r("./src/errors.ts"),
                                c = r("./src/types/transmuxer.ts"),
                                d = r("./src/utils/mp4-tools.ts"),
                                h = r("./src/utils/discontinuities.ts"),
                                f = r("./src/controller/fragment-finders.ts"),
                                g = r("./src/controller/level-helper.ts"),
                                v = r("./src/loader/fragment-loader.ts"),
                                p = r("./src/crypt/decrypter.ts"),
                                m = r("./src/utils/time-ranges.ts"),
                                y = r("./src/types/loader.ts");

                            function E(t, e) {
                                for (var r = 0; r < e.length; r++) {
                                    var i = e[r];
                                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                                }
                            }

                            function T(t, e) {
                                return (T = Object.setPrototypeOf || function(t, e) {
                                    return t.__proto__ = e, t
                                })(t, e)
                            }
                            var b = {
                                    STOPPED: "STOPPED",
                                    IDLE: "IDLE",
                                    KEY_LOADING: "KEY_LOADING",
                                    FRAG_LOADING: "FRAG_LOADING",
                                    FRAG_LOADING_WAITING_RETRY: "FRAG_LOADING_WAITING_RETRY",
                                    WAITING_TRACK: "WAITING_TRACK",
                                    PARSING: "PARSING",
                                    PARSED: "PARSED",
                                    BACKTRACKING: "BACKTRACKING",
                                    ENDED: "ENDED",
                                    ERROR: "ERROR",
                                    WAITING_INIT_PTS: "WAITING_INIT_PTS",
                                    WAITING_LEVEL: "WAITING_LEVEL"
                                },
                                S = function(t) {
                                    var e, r;

                                    function n(e, r, i) {
                                        var n;
                                        return (n = t.call(this) || this).hls = void 0, n.fragPrevious = null, n.fragCurrent = null, n.fragmentTracker = void 0, n.transmuxer = null, n._state = b.STOPPED, n.media = void 0, n.mediaBuffer = void 0, n.config = void 0, n.bitrateTest = !1, n.lastCurrentTime = 0, n.nextLoadPosition = 0, n.startPosition = 0, n.loadedmetadata = !1, n.fragLoadError = 0, n.retryDate = 0, n.levels = null, n.fragmentLoader = void 0, n.levelLastLoaded = null, n.startFragRequested = !1, n.decrypter = void 0, n.initPTS = [], n.onvseeking = null, n.onvended = null, n.logPrefix = "", n.log = void 0, n.warn = void 0, n.logPrefix = i, n.log = o.logger.log.bind(o.logger, i + ":"), n.warn = o.logger.warn.bind(o.logger, i + ":"), n.hls = e, n.fragmentLoader = new v.default(e.config), n.fragmentTracker = r, n.config = e.config, n.decrypter = new p.default(e, e.config), e.on(l.Events.KEY_LOADED, n.onKeyLoaded, function(t) {
                                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                            return t
                                        }(n)), n
                                    }
                                    r = t, (e = n).prototype = Object.create(r.prototype), e.prototype.constructor = e, T(e, r);
                                    var S, L, A = n.prototype;
                                    return A.doTick = function() {
                                        this.onTickEnd()
                                    }, A.onTickEnd = function() {}, A.startLoad = function(t) {}, A.stopLoad = function() {
                                        this.fragmentLoader.abort();
                                        var t = this.fragCurrent;
                                        t && this.fragmentTracker.removeFragment(t), this.resetTransmuxer(), this.fragCurrent = null, this.fragPrevious = null, this.clearInterval(), this.clearNextTick(), this.state = b.STOPPED
                                    }, A._streamEnded = function(t, e) {
                                        var r = this.fragCurrent,
                                            i = this.fragmentTracker;
                                        if (!e.live && r && r.sn === e.endSN && !t.nextStart) {
                                            var n = i.getState(r);
                                            return n === a.FragmentState.PARTIAL || n === a.FragmentState.OK
                                        }
                                        return !1
                                    }, A.onMediaAttached = function(t, e) {
                                        var r = this.media = this.mediaBuffer = e.media;
                                        this.onvseeking = this.onMediaSeeking.bind(this), this.onvended = this.onMediaEnded.bind(this), r.addEventListener("seeking", this.onvseeking), r.addEventListener("ended", this.onvended);
                                        var i = this.config;
                                        this.levels && i.autoStartLoad && this.state === b.STOPPED && this.startLoad(i.startPosition)
                                    }, A.onMediaDetaching = function() {
                                        var t = this.media;
                                        null != t && t.ended && (this.log("MSE detaching and video ended, reset startPosition"), this.startPosition = this.lastCurrentTime = 0), t && (t.removeEventListener("seeking", this.onvseeking), t.removeEventListener("ended", this.onvended), this.onvseeking = this.onvended = null), this.media = this.mediaBuffer = null, this.loadedmetadata = !1, this.fragmentTracker.removeAllFragments(), this.stopLoad()
                                    }, A.onMediaSeeking = function() {
                                        var t = this.config,
                                            e = this.fragCurrent,
                                            r = this.media,
                                            n = this.mediaBuffer,
                                            a = this.state,
                                            o = r ? r.currentTime : 0,
                                            l = s.BufferHelper.bufferInfo(n || r, o, t.maxBufferHole);
                                        if (this.log("media seeking to " + (Object(i.isFiniteNumber)(o) ? o.toFixed(3) : o) + ", state: " + a), a === b.ENDED) this.resetLoadingState();
                                        else if (e && !l.len) {
                                            var u = t.maxFragLookUpTolerance,
                                                c = e.start - u,
                                                d = o > e.start + e.duration + u;
                                            (o < c || d) && (d && e.loader && (this.log("seeking outside of buffer while fragment load in progress, cancel fragment load"), e.loader.abort()), this.resetLoadingState())
                                        }
                                        r && (this.lastCurrentTime = o), this.loadedmetadata || l.len || (this.nextLoadPosition = this.startPosition = o), this.tickImmediate()
                                    }, A.onMediaEnded = function() {
                                        this.startPosition = this.lastCurrentTime = 0
                                    }, A.onKeyLoaded = function(t, e) {
                                        if (this.state === b.KEY_LOADING && e.frag === this.fragCurrent && this.levels) {
                                            this.state = b.IDLE;
                                            var r = this.levels[e.frag.level].details;
                                            r && this.loadFragment(e.frag, r, e.frag.start)
                                        }
                                    }, A.onHandlerDestroying = function() {
                                        this.stopLoad(), t.prototype.onHandlerDestroying.call(this)
                                    }, A.onHandlerDestroyed = function() {
                                        this.state = b.STOPPED, this.hls.off(l.Events.KEY_LOADED, this.onKeyLoaded, this), this.fragmentLoader && this.fragmentLoader.destroy(), this.decrypter && this.decrypter.destroy(), this.hls = this.log = this.warn = this.decrypter = this.fragmentLoader = this.fragmentTracker = null, t.prototype.onHandlerDestroyed.call(this)
                                    }, A.loadKey = function(t, e) {
                                        this.log("Loading key for " + t.sn + " of [" + e.startSN + "-" + e.endSN + "], " + ("[stream-controller]" === this.logPrefix ? "level" : "track") + " " + t.level), this.state = b.KEY_LOADING, this.fragCurrent = t, this.hls.trigger(l.Events.KEY_LOADING, {
                                            frag: t
                                        })
                                    }, A.loadFragment = function(t, e, r) {
                                        this._loadFragForPlayback(t, e, r)
                                    }, A._loadFragForPlayback = function(t, e, r) {
                                        var i = this;
                                        this._doFragLoad(t, e, r, (function(e) {
                                            if (i.fragContextChanged(t)) return i.warn("Fragment " + t.sn + (e.part ? " p: " + e.part.index : "") + " of level " + t.level + " was dropped during download."), void i.fragmentTracker.removeFragment(t);
                                            t.stats.chunkCount++, i._handleFragmentLoadProgress(e)
                                        })).then((function(e) {
                                            if (e) {
                                                i.fragLoadError = 0;
                                                var r = i.state;
                                                if (!i.fragContextChanged(t)) return "payload" in e && (i.log("Loaded fragment " + t.sn + " of level " + t.level), i.hls.trigger(l.Events.FRAG_LOADED, e), i.state === b.BACKTRACKING) ? (i.fragmentTracker.backtrack(t, e), void i.resetFragmentLoading(t)) : void i._handleFragmentLoadComplete(e);
                                                (r === b.FRAG_LOADING || r === b.BACKTRACKING || !i.fragCurrent && r === b.PARSING) && (i.fragmentTracker.removeFragment(t), i.state = b.IDLE)
                                            }
                                        })).catch((function(e) {
                                            i.warn(e), i.resetFragmentLoading(t)
                                        }))
                                    }, A.flushMainBuffer = function(t, e, r) {
                                        if (void 0 === r && (r = null), t - e) {
                                            var i = {
                                                startOffset: t,
                                                endOffset: e,
                                                type: r
                                            };
                                            this.fragLoadError = 0, this.hls.trigger(l.Events.BUFFER_FLUSHING, i)
                                        }
                                    }, A._loadInitSegment = function(t) {
                                        var e = this;
                                        this._doFragLoad(t).then((function(r) {
                                            if (!r || e.fragContextChanged(t) || !e.levels) throw new Error("init load aborted");
                                            return r
                                        })).then((function(r) {
                                            var i = e.hls,
                                                n = r.payload,
                                                a = t.decryptdata;
                                            if (n && n.byteLength > 0 && a && a.key && a.iv && "AES-128" === a.method) {
                                                var s = self.performance.now();
                                                return e.decrypter.webCryptoDecrypt(new Uint8Array(n), a.key.buffer, a.iv.buffer).then((function(e) {
                                                    var n = self.performance.now();
                                                    return i.trigger(l.Events.FRAG_DECRYPTED, {
                                                        frag: t,
                                                        payload: e,
                                                        stats: {
                                                            tstart: s,
                                                            tdecrypt: n
                                                        }
                                                    }), r.payload = e, r
                                                }))
                                            }
                                            return r
                                        })).then((function(r) {
                                            var i = e.fragCurrent,
                                                n = e.hls,
                                                a = e.levels;
                                            if (!a) throw new Error("init load aborted, missing levels");
                                            var s = a[t.level].details;
                                            console.assert(s, "Level details are defined when init segment is loaded");
                                            var o = t.stats;
                                            e.state = b.IDLE, e.fragLoadError = 0, t.data = new Uint8Array(r.payload), o.parsing.start = o.buffering.start = self.performance.now(), o.parsing.end = o.buffering.end = self.performance.now(), r.frag === i && n.trigger(l.Events.FRAG_BUFFERED, {
                                                stats: o,
                                                frag: i,
                                                part: null,
                                                id: t.type
                                            }), e.tick()
                                        })).catch((function(r) {
                                            e.warn(r), e.resetFragmentLoading(t)
                                        }))
                                    }, A.fragContextChanged = function(t) {
                                        var e = this.fragCurrent;
                                        return !t || !e || t.level !== e.level || t.sn !== e.sn || t.urlId !== e.urlId
                                    }, A.fragBufferedComplete = function(t, e) {
                                        var r = this.mediaBuffer ? this.mediaBuffer : this.media;
                                        this.log("Buffered " + t.type + " sn: " + t.sn + (e ? " part: " + e.index : "") + " of " + ("[stream-controller]" === this.logPrefix ? "level" : "track") + " " + t.level + " " + m.default.toString(s.BufferHelper.getBuffered(r))), this.state = b.IDLE, this.tick()
                                    }, A._handleFragmentLoadComplete = function(t) {
                                        var e = this.transmuxer;
                                        if (e) {
                                            var r = t.frag,
                                                i = t.part,
                                                n = t.partsLoaded,
                                                a = !n || 0 === n.length || n.some((function(t) {
                                                    return !t
                                                })),
                                                s = new c.ChunkMetadata(r.level, r.sn, r.stats.chunkCount + 1, 0, i ? i.index : -1, !a);
                                            e.flush(s)
                                        }
                                    }, A._handleFragmentLoadProgress = function(t) {}, A._doFragLoad = function(t, e, r, n) {
                                        var a = this;
                                        if (void 0 === r && (r = null), !this.levels) throw new Error("frag load aborted, missing levels");
                                        if (r = Math.max(t.start, r || 0), this.config.lowLatencyMode && e) {
                                            var s = e.partList;
                                            if (s && n) {
                                                r > t.end && e.fragmentHint && (t = e.fragmentHint);
                                                var o = this.getNextPart(s, t, r);
                                                if (o > -1) {
                                                    var u = s[o];
                                                    return this.log("Loading part sn: " + t.sn + " p: " + u.index + " cc: " + t.cc + " of playlist [" + e.startSN + "-" + e.endSN + "] parts [0-" + o + "-" + (s.length - 1) + "] " + ("[stream-controller]" === this.logPrefix ? "level" : "track") + ": " + t.level + ", target: " + parseFloat(r.toFixed(3))), this.nextLoadPosition = u.start + u.duration, this.state = b.FRAG_LOADING, this.hls.trigger(l.Events.FRAG_LOADING, {
                                                        frag: t,
                                                        part: s[o],
                                                        targetBufferTime: r
                                                    }), this.doFragPartsLoad(t, s, o, n).catch((function(t) {
                                                        return a.handleFragLoadError(t)
                                                    }))
                                                }
                                                if (!t.url || this.loadedEndOfParts(s, r)) return Promise.resolve(null)
                                            }
                                        }
                                        return this.log("Loading fragment " + t.sn + " cc: " + t.cc + " " + (e ? "of [" + e.startSN + "-" + e.endSN + "] " : "") + ("[stream-controller]" === this.logPrefix ? "level" : "track") + ": " + t.level + ", target: " + parseFloat(r.toFixed(3))), Object(i.isFiniteNumber)(t.sn) && !this.bitrateTest && (this.nextLoadPosition = t.start + t.duration), this.state = b.FRAG_LOADING, this.hls.trigger(l.Events.FRAG_LOADING, {
                                            frag: t,
                                            targetBufferTime: r
                                        }), this.fragmentLoader.load(t, n).catch((function(t) {
                                            return a.handleFragLoadError(t)
                                        }))
                                    }, A.doFragPartsLoad = function(t, e, r, i) {
                                        var n = this;
                                        return new Promise((function(a, s) {
                                            var o = [];
                                            ! function r(u) {
                                                var c = e[u];
                                                n.fragmentLoader.loadPart(t, c, i).then((function(i) {
                                                    o[c.index] = i;
                                                    var s = i.part;
                                                    n.hls.trigger(l.Events.FRAG_LOADED, i);
                                                    var d = e[u + 1];
                                                    if (!d || d.fragment !== t) return a({
                                                        frag: t,
                                                        part: s,
                                                        partsLoaded: o
                                                    });
                                                    r(u + 1)
                                                })).catch(s)
                                            }(r)
                                        }))
                                    }, A.handleFragLoadError = function(t) {
                                        var e = t.data;
                                        return e && e.details === u.ErrorDetails.INTERNAL_ABORTED ? this.handleFragLoadAborted(e.frag, e.part) : this.hls.trigger(l.Events.ERROR, e), null
                                    }, A._handleTransmuxerFlush = function(t) {
                                        var e = this.getCurrentContext(t);
                                        if (e && this.state === b.PARSING) {
                                            var r = e.frag,
                                                i = e.part,
                                                n = e.level,
                                                a = self.performance.now();
                                            r.stats.parsing.end = a, i && (i.stats.parsing.end = a), this.updateLevelTiming(r, i, n, t.partial)
                                        } else this.fragCurrent || (this.state = b.IDLE)
                                    }, A.getCurrentContext = function(t) {
                                        var e = this.levels,
                                            r = t.level,
                                            i = t.sn,
                                            n = t.part;
                                        if (!e || !e[r]) return this.warn("Levels object was unset while buffering fragment " + i + " of level " + r + ". The current chunk will not be buffered."), null;
                                        var a = e[r],
                                            s = n > -1 ? Object(g.getPartWith)(a, i, n) : null,
                                            o = s ? s.fragment : Object(g.getFragmentWithSN)(a, i, this.fragCurrent);
                                        return o ? {
                                            frag: o,
                                            part: s,
                                            level: a
                                        } : null
                                    }, A.bufferFragmentData = function(t, e, r, i) {
                                        if (t && this.state === b.PARSING) {
                                            var n = t.data1,
                                                a = t.data2,
                                                s = n;
                                            if (n && a && (s = Object(d.appendUint8Array)(n, a)), s && s.length) {
                                                var o = {
                                                    type: t.type,
                                                    frag: e,
                                                    part: r,
                                                    chunkMeta: i,
                                                    parent: e.type,
                                                    data: s
                                                };
                                                this.hls.trigger(l.Events.BUFFER_APPENDING, o), t.dropped && t.independent && !r && this.flushBufferGap(e)
                                            }
                                        }
                                    }, A.flushBufferGap = function(t) {
                                        var e = this.media;
                                        if (e)
                                            if (s.BufferHelper.isBuffered(e, e.currentTime)) {
                                                var r = e.currentTime,
                                                    i = s.BufferHelper.bufferInfo(e, r, 0),
                                                    n = t.duration,
                                                    a = Math.min(2 * this.config.maxFragLookUpTolerance, .25 * n),
                                                    o = Math.max(Math.min(t.start - a, i.end - a), r + a);
                                                t.start - o > a && this.flushMainBuffer(o, t.start)
                                            } else this.flushMainBuffer(0, t.start)
                                    }, A.getFwdBufferInfo = function(t, e) {
                                        var r = this.config,
                                            n = this.getLoadPosition();
                                        if (!Object(i.isFiniteNumber)(n)) return null;
                                        var a = s.BufferHelper.bufferInfo(t, n, r.maxBufferHole);
                                        if (0 === a.len && void 0 !== a.nextStart) {
                                            var o = this.fragmentTracker.getBufferedFrag(n, e);
                                            if (o && a.nextStart < o.end) return s.BufferHelper.bufferInfo(t, n, Math.max(a.nextStart, r.maxBufferHole))
                                        }
                                        return a
                                    }, A.getMaxBufferLength = function(t) {
                                        var e, r = this.config;
                                        return e = t ? Math.max(8 * r.maxBufferSize / t, r.maxBufferLength) : r.maxBufferLength, Math.min(e, r.maxMaxBufferLength)
                                    }, A.reduceMaxBufferLength = function(t) {
                                        var e = this.config,
                                            r = t || e.maxBufferLength;
                                        return e.maxMaxBufferLength >= r && (e.maxMaxBufferLength /= 2, this.warn("Reduce max buffer length to " + e.maxMaxBufferLength + "s"), !0)
                                    }, A.getNextFragment = function(t, e) {
                                        var r, i, n = e.fragments,
                                            a = n.length;
                                        if (!a) return null;
                                        var s, o = this.config,
                                            l = n[0].start;
                                        if (e.live) {
                                            var u = o.initialLiveManifestSize;
                                            if (a < u) return this.warn("Not enough fragments to start playback (have: " + a + ", need: " + u + ")"), null;
                                            e.PTSKnown || this.startFragRequested || -1 !== this.startPosition || (s = this.getInitialLiveFragment(e, n), this.startPosition = s ? this.hls.liveSyncPosition || s.start : t)
                                        } else t <= l && (s = n[0]);
                                        if (!s) {
                                            var c = o.lowLatencyMode ? e.partEnd : e.fragmentEnd;
                                            s = this.getFragmentAtPosition(t, c, e)
                                        }
                                        return null === (r = s) || void 0 === r || !r.initSegment || null !== (i = s) && void 0 !== i && i.initSegment.data || this.bitrateTest || (s = s.initSegment), s
                                    }, A.getNextPart = function(t, e, r) {
                                        for (var i = -1, n = !1, a = !0, s = 0, o = t.length; s < o; s++) {
                                            var l = t[s];
                                            if (a = a && !l.independent, i > -1 && r < l.start) break;
                                            var u = l.loaded;
                                            !u && (n || l.independent || a) && l.fragment === e && (i = s), n = u
                                        }
                                        return i
                                    }, A.loadedEndOfParts = function(t, e) {
                                        var r = t[t.length - 1];
                                        return r && e > r.start && r.loaded
                                    }, A.getInitialLiveFragment = function(t, e) {
                                        var r = this.fragPrevious,
                                            i = null;
                                        if (r) {
                                            if (t.hasProgramDateTime && (this.log("Live playlist, switching playlist, load frag with same PDT: " + r.programDateTime), i = Object(f.findFragmentByPDT)(e, r.endProgramDateTime, this.config.maxFragLookUpTolerance)), !i) {
                                                var n = r.sn + 1;
                                                if (n >= t.startSN && n <= t.endSN) {
                                                    var a = e[n - t.startSN];
                                                    r.cc === a.cc && (i = a, this.log("Live playlist, switching playlist, load frag with next SN: " + i.sn))
                                                }
                                                i || (i = Object(f.findFragWithCC)(e, r.cc)) && this.log("Live playlist, switching playlist, load frag with same CC: " + i.sn)
                                            }
                                        } else {
                                            var s = this.hls.liveSyncPosition;
                                            null !== s && (i = this.getFragmentAtPosition(s, this.bitrateTest ? t.fragmentEnd : t.edge, t))
                                        }
                                        return i
                                    }, A.getFragmentAtPosition = function(t, e, r) {
                                        var i, n = this.config,
                                            s = this.fragPrevious,
                                            o = r.fragments,
                                            l = r.endSN,
                                            u = r.fragmentHint,
                                            c = n.maxFragLookUpTolerance,
                                            d = !!(n.lowLatencyMode && r.partList && u);
                                        if (d && u && !this.bitrateTest && (o = o.concat(u), l = u.sn), t < e) {
                                            var h = t > e - c ? 0 : c;
                                            i = Object(f.findFragmentByPTS)(s, o, t, h)
                                        } else i = o[o.length - 1];
                                        if (i) {
                                            var g = i.sn - r.startSN,
                                                v = s && i.level === s.level,
                                                p = o[g + 1];
                                            if (this.fragmentTracker.getState(i) === a.FragmentState.BACKTRACKED) {
                                                i = null;
                                                for (var m = g; o[m] && this.fragmentTracker.getState(o[m]) === a.FragmentState.BACKTRACKED;) i = s ? o[m--] : o[--m];
                                                i || (i = p)
                                            } else s && i.sn === s.sn && !d && v && (i.sn < l && this.fragmentTracker.getState(p) !== a.FragmentState.OK ? (this.log("SN " + i.sn + " just loaded, load next one: " + p.sn), i = p) : i = null)
                                        }
                                        return i
                                    }, A.synchronizeToLiveEdge = function(t) {
                                        var e = this.config,
                                            r = this.media;
                                        if (r) {
                                            var i = this.hls.liveSyncPosition,
                                                n = r.currentTime,
                                                a = t.fragments[0].start,
                                                s = t.edge,
                                                o = n >= a - e.maxFragLookUpTolerance && n <= s;
                                            if (null !== i && r.duration > i && (n < i || !o)) {
                                                var l = void 0 !== e.liveMaxLatencyDuration ? e.liveMaxLatencyDuration : e.liveMaxLatencyDurationCount * t.targetduration;
                                                (!o && r.readyState < 4 || n < s - l) && (this.loadedmetadata || (this.nextLoadPosition = i), r.readyState && (this.warn("Playback: " + n.toFixed(3) + " is located too far from the end of live sliding playlist: " + s + ", reset currentTime to : " + i.toFixed(3)), r.currentTime = i))
                                            }
                                        }
                                    }, A.alignPlaylists = function(t, e) {
                                        var r = this.levels,
                                            n = this.levelLastLoaded,
                                            a = this.fragPrevious,
                                            s = null !== n ? r[n] : null,
                                            o = t.fragments.length;
                                        if (!o) return this.warn("No fragments in live playlist"), 0;
                                        var l = t.fragments[0].start,
                                            u = !e,
                                            c = t.alignedSliding && Object(i.isFiniteNumber)(l);
                                        if (u || !c && !l) {
                                            Object(h.alignStream)(a, s, t);
                                            var d = t.fragments[0].start;
                                            return this.log("Live playlist sliding: " + d.toFixed(2) + " start-sn: " + (e ? e.startSN : "na") + "->" + t.startSN + " prev-sn: " + (a ? a.sn : "na") + " fragments: " + o), d
                                        }
                                        return l
                                    }, A.waitForCdnTuneIn = function(t) {
                                        return t.live && t.canBlockReload && t.tuneInGoal > Math.max(t.partHoldBack, 3 * t.partTarget)
                                    }, A.setStartPosition = function(t, e) {
                                        var r = this.startPosition;
                                        if (r < e && (r = -1), -1 === r || -1 === this.lastCurrentTime) {
                                            var n = t.startTimeOffset;
                                            Object(i.isFiniteNumber)(n) ? (r = e + n, n < 0 && (r += t.totalduration), r = Math.min(Math.max(e, r), e + t.totalduration), this.log("Start time offset " + n + " found in playlist, adjust startPosition to " + r), this.startPosition = r) : t.live ? r = this.hls.liveSyncPosition || e : this.startPosition = r = 0, this.lastCurrentTime = r
                                        }
                                        this.nextLoadPosition = r
                                    }, A.getLoadPosition = function() {
                                        var t = this.media,
                                            e = 0;
                                        return this.loadedmetadata && t ? e = t.currentTime : this.nextLoadPosition && (e = this.nextLoadPosition), e
                                    }, A.handleFragLoadAborted = function(t, e) {
                                        this.transmuxer && "initSegment" !== t.sn && t.stats.aborted && (this.warn("Fragment " + t.sn + (e ? " part" + e.index : "") + " of level " + t.level + " was aborted"), this.resetFragmentLoading(t))
                                    }, A.resetFragmentLoading = function(t) {
                                        this.fragCurrent && this.fragContextChanged(t) || (this.state = b.IDLE)
                                    }, A.onFragmentOrKeyLoadError = function(t, e) {
                                        if (!e.fatal) {
                                            var r = e.frag;
                                            if (r && r.type === t) {
                                                var i = this.fragCurrent;
                                                console.assert(i && r.sn === i.sn && r.level === i.level && r.urlId === i.urlId, "Frag load error must match current frag to retry");
                                                var n = this.config;
                                                if (this.fragLoadError + 1 <= n.fragLoadingMaxRetry) {
                                                    if (this.resetLiveStartWhenNotLoaded(r.level)) return;
                                                    var a = Math.min(Math.pow(2, this.fragLoadError) * n.fragLoadingRetryDelay, n.fragLoadingMaxRetryTimeout);
                                                    this.warn("Fragment " + r.sn + " of " + t + " " + r.level + " failed to load, retrying in " + a + "ms"), this.retryDate = self.performance.now() + a, this.fragLoadError++, this.state = b.FRAG_LOADING_WAITING_RETRY
                                                } else e.levelRetry ? (t === y.PlaylistLevelType.AUDIO && (this.fragCurrent = null), this.fragLoadError = 0, this.state = b.IDLE) : (o.logger.error(e.details + " reaches max retry, redispatch as fatal ..."), e.fatal = !0, this.hls.stopLoad(), this.state = b.ERROR)
                                            }
                                        }
                                    }, A.afterBufferFlushed = function(t, e, r) {
                                        if (t) {
                                            var i = s.BufferHelper.getBuffered(t);
                                            this.fragmentTracker.detectEvictedFragments(e, i, r), this.state === b.ENDED && this.resetLoadingState()
                                        }
                                    }, A.resetLoadingState = function() {
                                        this.fragCurrent = null, this.fragPrevious = null, this.state = b.IDLE
                                    }, A.resetLiveStartWhenNotLoaded = function(t) {
                                        if (!this.loadedmetadata) {
                                            this.startFragRequested = !1;
                                            var e = this.levels ? this.levels[t].details : null;
                                            if (null != e && e.live) return this.startPosition = -1, this.setStartPosition(e, 0), this.resetLoadingState(), !0;
                                            this.nextLoadPosition = this.startPosition
                                        }
                                        return !1
                                    }, A.updateLevelTiming = function(t, e, r, i) {
                                        var n = this,
                                            a = r.details;
                                        console.assert(!!a, "level.details must be defined"), Object.keys(t.elementaryStreams).reduce((function(e, s) {
                                            var o = t.elementaryStreams[s];
                                            if (o) {
                                                var u = o.endPTS - o.startPTS;
                                                if (u <= 0) return n.warn("Could not parse fragment " + t.sn + " " + s + " duration reliably (" + u + ") resetting transmuxer to fallback to playlist timing"), n.resetTransmuxer(), e || !1;
                                                var c = i ? 0 : Object(g.updateFragPTSDTS)(a, t, o.startPTS, o.endPTS, o.startDTS, o.endDTS);
                                                return n.hls.trigger(l.Events.LEVEL_PTS_UPDATED, {
                                                    details: a,
                                                    level: r,
                                                    drift: c,
                                                    type: s,
                                                    frag: t,
                                                    start: o.startPTS,
                                                    end: o.endPTS
                                                }), !0
                                            }
                                            return e
                                        }), !1) ? (this.state = b.PARSED, this.hls.trigger(l.Events.FRAG_PARSED, {
                                            frag: t,
                                            part: e
                                        })) : this.resetLoadingState()
                                    }, A.resetTransmuxer = function() {
                                        this.transmuxer && (this.transmuxer.destroy(), this.transmuxer = null)
                                    }, S = n, (L = [{
                                        key: "state",
                                        get: function() {
                                            return this._state
                                        },
                                        set: function(t) {
                                            var e = this._state;
                                            e !== t && (this._state = t, this.log(e + "->" + t))
                                        }
                                    }]) && E(S.prototype, L), n
                                }(n.default)
                        },
                        "./src/controller/buffer-controller.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "default", (function() {
                                return f
                            }));
                            var i = r("./src/polyfills/number.ts"),
                                n = r("./src/events.ts"),
                                a = r("./src/utils/logger.ts"),
                                s = r("./src/errors.ts"),
                                o = r("./src/utils/buffer-helper.ts"),
                                l = r("./src/utils/mediasource-helper.ts"),
                                u = r("./src/loader/fragment.ts"),
                                c = r("./src/controller/buffer-operation-queue.ts"),
                                d = Object(l.getMediaSource)(),
                                h = /([ha]vc.)(?:\.[^.,]+)+/,
                                f = function() {
                                    function t(t) {
                                        var e = this;
                                        this.details = null, this._objectUrl = null, this.operationQueue = void 0, this.listeners = void 0, this.hls = void 0, this.bufferCodecEventsExpected = 0, this._bufferCodecEventsTotal = 0, this.media = null, this.mediaSource = null, this.appendError = 0, this.tracks = {}, this.pendingTracks = {}, this.sourceBuffer = void 0, this._onMediaSourceOpen = function() {
                                            var t = e.hls,
                                                r = e.media,
                                                i = e.mediaSource;
                                            a.logger.log("[buffer-controller]: Media source opened"), r && (e.updateMediaElementDuration(), t.trigger(n.Events.MEDIA_ATTACHED, {
                                                media: r
                                            })), i && i.removeEventListener("sourceopen", e._onMediaSourceOpen), e.checkPendingTracks()
                                        }, this._onMediaSourceClose = function() {
                                            a.logger.log("[buffer-controller]: Media source closed")
                                        }, this._onMediaSourceEnded = function() {
                                            a.logger.log("[buffer-controller]: Media source ended")
                                        }, this.hls = t, this._initSourceBuffer(), this.registerListeners()
                                    }
                                    var e = t.prototype;
                                    return e.hasSourceTypes = function() {
                                        return this.getSourceBufferTypes().length > 0 || Object.keys(this.pendingTracks).length > 0
                                    }, e.destroy = function() {
                                        this.unregisterListeners(), this.details = null
                                    }, e.registerListeners = function() {
                                        var t = this.hls;
                                        t.on(n.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), t.on(n.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(n.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.on(n.Events.BUFFER_RESET, this.onBufferReset, this), t.on(n.Events.BUFFER_APPENDING, this.onBufferAppending, this), t.on(n.Events.BUFFER_CODECS, this.onBufferCodecs, this), t.on(n.Events.BUFFER_EOS, this.onBufferEos, this), t.on(n.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), t.on(n.Events.LEVEL_UPDATED, this.onLevelUpdated, this), t.on(n.Events.FRAG_PARSED, this.onFragParsed, this), t.on(n.Events.FRAG_CHANGED, this.onFragChanged, this)
                                    }, e.unregisterListeners = function() {
                                        var t = this.hls;
                                        t.off(n.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), t.off(n.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(n.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.off(n.Events.BUFFER_RESET, this.onBufferReset, this), t.off(n.Events.BUFFER_APPENDING, this.onBufferAppending, this), t.off(n.Events.BUFFER_CODECS, this.onBufferCodecs, this), t.off(n.Events.BUFFER_EOS, this.onBufferEos, this), t.off(n.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), t.off(n.Events.LEVEL_UPDATED, this.onLevelUpdated, this), t.off(n.Events.FRAG_PARSED, this.onFragParsed, this), t.off(n.Events.FRAG_CHANGED, this.onFragChanged, this)
                                    }, e._initSourceBuffer = function() {
                                        this.sourceBuffer = {}, this.operationQueue = new c.default(this.sourceBuffer), this.listeners = {
                                            audio: [],
                                            video: [],
                                            audiovideo: []
                                        }
                                    }, e.onManifestParsed = function(t, e) {
                                        var r = 2;
                                        (e.audio && !e.video || !e.altAudio) && (r = 1), this.bufferCodecEventsExpected = this._bufferCodecEventsTotal = r, this.details = null, a.logger.log(this.bufferCodecEventsExpected + " bufferCodec event(s) expected")
                                    }, e.onMediaAttaching = function(t, e) {
                                        var r = this.media = e.media;
                                        if (r && d) {
                                            var i = this.mediaSource = new d;
                                            i.addEventListener("sourceopen", this._onMediaSourceOpen), i.addEventListener("sourceended", this._onMediaSourceEnded), i.addEventListener("sourceclose", this._onMediaSourceClose), r.src = self.URL.createObjectURL(i), this._objectUrl = r.src
                                        }
                                    }, e.onMediaDetaching = function() {
                                        var t = this.media,
                                            e = this.mediaSource,
                                            r = this._objectUrl;
                                        if (e) {
                                            if (a.logger.log("[buffer-controller]: media source detaching"), "open" === e.readyState) try {
                                                e.endOfStream()
                                            } catch (t) {
                                                a.logger.warn("[buffer-controller]: onMediaDetaching: " + t.message + " while calling endOfStream")
                                            }
                                            this.onBufferReset(), e.removeEventListener("sourceopen", this._onMediaSourceOpen), e.removeEventListener("sourceended", this._onMediaSourceEnded), e.removeEventListener("sourceclose", this._onMediaSourceClose), t && (r && self.URL.revokeObjectURL(r), t.src === r ? (t.removeAttribute("src"), t.load()) : a.logger.warn("[buffer-controller]: media.src was changed by a third party - skip cleanup")), this.mediaSource = null, this.media = null, this._objectUrl = null, this.bufferCodecEventsExpected = this._bufferCodecEventsTotal, this.pendingTracks = {}, this.tracks = {}
                                        }
                                        this.hls.trigger(n.Events.MEDIA_DETACHED, void 0)
                                    }, e.onBufferReset = function() {
                                        var t = this;
                                        this.getSourceBufferTypes().forEach((function(e) {
                                            var r = t.sourceBuffer[e];
                                            try {
                                                r && (t.removeBufferListeners(e), t.mediaSource && t.mediaSource.removeSourceBuffer(r), t.sourceBuffer[e] = void 0)
                                            } catch (t) {
                                                a.logger.warn("[buffer-controller]: Failed to reset the " + e + " buffer", t)
                                            }
                                        })), this._initSourceBuffer()
                                    }, e.onBufferCodecs = function(t, e) {
                                        var r = this,
                                            i = this.getSourceBufferTypes().length;
                                        Object.keys(e).forEach((function(t) {
                                            if (i) {
                                                var n = r.tracks[t];
                                                if (n && "function" == typeof n.buffer.changeType) {
                                                    var a = e[t],
                                                        s = a.codec,
                                                        o = a.levelCodec,
                                                        l = a.container;
                                                    if ((n.levelCodec || n.codec).replace(h, "$1") !== (o || s).replace(h, "$1")) {
                                                        var u = l + ";codecs=" + (o || s);
                                                        r.appendChangeType(t, u)
                                                    }
                                                }
                                            } else r.pendingTracks[t] = e[t]
                                        })), i || (this.bufferCodecEventsExpected = Math.max(this.bufferCodecEventsExpected - 1, 0), this.mediaSource && "open" === this.mediaSource.readyState && this.checkPendingTracks())
                                    }, e.appendChangeType = function(t, e) {
                                        var r = this,
                                            i = this.operationQueue,
                                            n = {
                                                execute: function() {
                                                    var n = r.sourceBuffer[t];
                                                    n && (a.logger.log("[buffer-controller]: changing " + t + " sourceBuffer type to " + e), n.changeType(e)), i.shiftAndExecuteNext(t)
                                                },
                                                onStart: function() {},
                                                onComplete: function() {},
                                                onError: function(e) {
                                                    a.logger.warn("[buffer-controller]: Failed to change " + t + " SourceBuffer type", e)
                                                }
                                            };
                                        i.append(n, t)
                                    }, e.onBufferAppending = function(t, e) {
                                        var r = this,
                                            i = this.hls,
                                            l = this.operationQueue,
                                            u = this.tracks,
                                            c = e.data,
                                            d = e.type,
                                            h = e.frag,
                                            f = e.part,
                                            g = e.chunkMeta,
                                            v = g.buffering[d],
                                            p = self.performance.now();
                                        v.start = p;
                                        var m = h.stats.buffering,
                                            y = f ? f.stats.buffering : null;
                                        0 === m.start && (m.start = p), y && 0 === y.start && (y.start = p);
                                        var E = u.audio,
                                            T = "audio" === d && 1 === g.id && "audio/mpeg" === (null == E ? void 0 : E.container),
                                            b = {
                                                execute: function() {
                                                    if (v.executeStart = self.performance.now(), T) {
                                                        var t = r.sourceBuffer[d];
                                                        if (t) {
                                                            var e = h.start - t.timestampOffset;
                                                            Math.abs(e) >= .1 && (a.logger.log("[buffer-controller]: Updating audio SourceBuffer timestampOffset to " + h.start + " (delta: " + e + ") sn: " + h.sn + ")"), t.timestampOffset = h.start)
                                                        }
                                                    }
                                                    r.appendExecutor(c, d)
                                                },
                                                onStart: function() {},
                                                onComplete: function() {
                                                    var t = self.performance.now();
                                                    v.executeEnd = v.end = t, 0 === m.first && (m.first = t), y && 0 === y.first && (y.first = t);
                                                    var e = r.sourceBuffer,
                                                        i = {};
                                                    for (var a in e) i[a] = o.BufferHelper.getBuffered(e[a]);
                                                    r.appendError = 0, r.hls.trigger(n.Events.BUFFER_APPENDED, {
                                                        type: d,
                                                        frag: h,
                                                        part: f,
                                                        chunkMeta: g,
                                                        parent: h.type,
                                                        timeRanges: i
                                                    })
                                                },
                                                onError: function(t) {
                                                    a.logger.error("[buffer-controller]: Error encountered while trying to append to the " + d + " SourceBuffer", t);
                                                    var e = {
                                                        type: s.ErrorTypes.MEDIA_ERROR,
                                                        parent: h.type,
                                                        details: s.ErrorDetails.BUFFER_APPEND_ERROR,
                                                        err: t,
                                                        fatal: !1
                                                    };
                                                    t.code === DOMException.QUOTA_EXCEEDED_ERR ? e.details = s.ErrorDetails.BUFFER_FULL_ERROR : (r.appendError++, e.details = s.ErrorDetails.BUFFER_APPEND_ERROR, r.appendError > i.config.appendErrorMaxRetry && (a.logger.error("[buffer-controller]: Failed " + i.config.appendErrorMaxRetry + " times to append segment in sourceBuffer"), e.fatal = !0)), i.trigger(n.Events.ERROR, e)
                                                }
                                            };
                                        l.append(b, d)
                                    }, e.onBufferFlushing = function(t, e) {
                                        var r = this,
                                            i = this.operationQueue,
                                            s = function(t) {
                                                return {
                                                    execute: r.removeExecutor.bind(r, t, e.startOffset, e.endOffset),
                                                    onStart: function() {},
                                                    onComplete: function() {
                                                        r.hls.trigger(n.Events.BUFFER_FLUSHED, {
                                                            type: t
                                                        })
                                                    },
                                                    onError: function(e) {
                                                        a.logger.warn("[buffer-controller]: Failed to remove from " + t + " SourceBuffer", e)
                                                    }
                                                }
                                            };
                                        e.type ? i.append(s(e.type), e.type) : this.getSourceBufferTypes().forEach((function(t) {
                                            i.append(s(t), t)
                                        }))
                                    }, e.onFragParsed = function(t, e) {
                                        var r = this,
                                            i = e.frag,
                                            s = e.part,
                                            o = [],
                                            l = s ? s.elementaryStreams : i.elementaryStreams;
                                        l[u.ElementaryStreamTypes.AUDIOVIDEO] ? o.push("audiovideo") : (l[u.ElementaryStreamTypes.AUDIO] && o.push("audio"), l[u.ElementaryStreamTypes.VIDEO] && o.push("video")), 0 === o.length && a.logger.warn("Fragments must have at least one ElementaryStreamType set. type: " + i.type + " level: " + i.level + " sn: " + i.sn), this.blockBuffers((function() {
                                            var t = self.performance.now();
                                            i.stats.buffering.end = t, s && (s.stats.buffering.end = t);
                                            var e = s ? s.stats : i.stats;
                                            r.hls.trigger(n.Events.FRAG_BUFFERED, {
                                                frag: i,
                                                part: s,
                                                stats: e,
                                                id: i.type
                                            })
                                        }), o)
                                    }, e.onFragChanged = function(t, e) {
                                        this.flushBackBuffer()
                                    }, e.onBufferEos = function(t, e) {
                                        var r = this;
                                        this.getSourceBufferTypes().reduce((function(t, i) {
                                            var n = r.sourceBuffer[i];
                                            return e.type && e.type !== i || n && !n.ended && (n.ended = !0, a.logger.log("[buffer-controller]: " + i + " sourceBuffer now EOS")), t && !(n && !n.ended)
                                        }), !0) && this.blockBuffers((function() {
                                            var t = r.mediaSource;
                                            t && "open" === t.readyState && t.endOfStream()
                                        }))
                                    }, e.onLevelUpdated = function(t, e) {
                                        var r = e.details;
                                        r.fragments.length && (this.details = r, this.getSourceBufferTypes().length ? this.blockBuffers(this.updateMediaElementDuration.bind(this)) : this.updateMediaElementDuration())
                                    }, e.flushBackBuffer = function() {
                                        var t = this.hls,
                                            e = this.details,
                                            r = this.media,
                                            a = this.sourceBuffer;
                                        if (r && null !== e) {
                                            var s = this.getSourceBufferTypes();
                                            if (s.length) {
                                                var l = e.live && null !== t.config.liveBackBufferLength ? t.config.liveBackBufferLength : t.config.backBufferLength;
                                                if (Object(i.isFiniteNumber)(l) && !(l < 0)) {
                                                    var u = r.currentTime,
                                                        c = e.levelTargetDuration,
                                                        d = Math.max(l, c),
                                                        h = Math.floor(u / c) * c - d;
                                                    s.forEach((function(r) {
                                                        var i = a[r];
                                                        if (i) {
                                                            var s = o.BufferHelper.getBuffered(i);
                                                            s.length > 0 && h > s.start(0) && (t.trigger(n.Events.BACK_BUFFER_REACHED, {
                                                                bufferEnd: h
                                                            }), e.live && t.trigger(n.Events.LIVE_BACK_BUFFER_REACHED, {
                                                                bufferEnd: h
                                                            }), t.trigger(n.Events.BUFFER_FLUSHING, {
                                                                startOffset: 0,
                                                                endOffset: h,
                                                                type: r
                                                            }))
                                                        }
                                                    }))
                                                }
                                            }
                                        }
                                    }, e.updateMediaElementDuration = function() {
                                        if (this.details && this.media && this.mediaSource && "open" === this.mediaSource.readyState) {
                                            var t = this.details,
                                                e = this.hls,
                                                r = this.media,
                                                n = this.mediaSource,
                                                s = t.fragments[0].start + t.totalduration,
                                                o = r.duration,
                                                l = Object(i.isFiniteNumber)(n.duration) ? n.duration : 0;
                                            t.live && e.config.liveDurationInfinity ? (a.logger.log("[buffer-controller]: Media Source duration is set to Infinity"), n.duration = 1 / 0, this.updateSeekableRange(t)) : (s > l && s > o || !Object(i.isFiniteNumber)(o)) && (a.logger.log("[buffer-controller]: Updating Media Source duration to " + s.toFixed(3)), n.duration = s)
                                        }
                                    }, e.updateSeekableRange = function(t) {
                                        var e = this.mediaSource,
                                            r = t.fragments;
                                        if (r.length && t.live && null != e && e.setLiveSeekableRange) {
                                            var i = Math.max(0, r[0].start),
                                                n = Math.max(i, i + t.totalduration);
                                            e.setLiveSeekableRange(i, n)
                                        }
                                    }, e.checkPendingTracks = function() {
                                        var t = this.bufferCodecEventsExpected,
                                            e = this.operationQueue,
                                            r = this.pendingTracks,
                                            i = Object.keys(r).length;
                                        if (i && !t || 2 === i) {
                                            this.createSourceBuffers(r), this.pendingTracks = {};
                                            var a = this.getSourceBufferTypes();
                                            if (0 === a.length) return void this.hls.trigger(n.Events.ERROR, {
                                                type: s.ErrorTypes.MEDIA_ERROR,
                                                details: s.ErrorDetails.BUFFER_INCOMPATIBLE_CODECS_ERROR,
                                                fatal: !0,
                                                reason: "could not create source buffer for media codec(s)"
                                            });
                                            a.forEach((function(t) {
                                                e.executeNext(t)
                                            }))
                                        }
                                    }, e.createSourceBuffers = function(t) {
                                        var e = this.sourceBuffer,
                                            r = this.mediaSource;
                                        if (!r) throw Error("createSourceBuffers called when mediaSource was null");
                                        var i = 0;
                                        for (var o in t)
                                            if (!e[o]) {
                                                var l = t[o];
                                                if (!l) throw Error("source buffer exists for track " + o + ", however track does not");
                                                var u = l.levelCodec || l.codec,
                                                    c = l.container + ";codecs=" + u;
                                                a.logger.log("[buffer-controller]: creating sourceBuffer(" + c + ")");
                                                try {
                                                    var d = e[o] = r.addSourceBuffer(c),
                                                        h = o;
                                                    this.addBufferListener(h, "updatestart", this._onSBUpdateStart), this.addBufferListener(h, "updateend", this._onSBUpdateEnd), this.addBufferListener(h, "error", this._onSBUpdateError), this.tracks[o] = {
                                                        buffer: d,
                                                        codec: u,
                                                        container: l.container,
                                                        levelCodec: l.levelCodec,
                                                        id: l.id
                                                    }, i++
                                                } catch (t) {
                                                    a.logger.error("[buffer-controller]: error while trying to add sourceBuffer: " + t.message), this.hls.trigger(n.Events.ERROR, {
                                                        type: s.ErrorTypes.MEDIA_ERROR,
                                                        details: s.ErrorDetails.BUFFER_ADD_CODEC_ERROR,
                                                        fatal: !1,
                                                        error: t,
                                                        mimeType: c
                                                    })
                                                }
                                            } i && this.hls.trigger(n.Events.BUFFER_CREATED, {
                                            tracks: this.tracks
                                        })
                                    }, e._onSBUpdateStart = function(t) {
                                        this.operationQueue.current(t).onStart()
                                    }, e._onSBUpdateEnd = function(t) {
                                        var e = this.operationQueue;
                                        e.current(t).onComplete(), e.shiftAndExecuteNext(t)
                                    }, e._onSBUpdateError = function(t, e) {
                                        a.logger.error("[buffer-controller]: " + t + " SourceBuffer error", e), this.hls.trigger(n.Events.ERROR, {
                                            type: s.ErrorTypes.MEDIA_ERROR,
                                            details: s.ErrorDetails.BUFFER_APPENDING_ERROR,
                                            fatal: !1
                                        });
                                        var r = this.operationQueue.current(t);
                                        r && r.onError(e)
                                    }, e.removeExecutor = function(t, e, r) {
                                        var n = this.media,
                                            s = this.mediaSource,
                                            o = this.operationQueue,
                                            l = this.sourceBuffer[t];
                                        if (!n || !s || !l) return a.logger.warn("[buffer-controller]: Attempting to remove from the " + t + " SourceBuffer, but it does not exist"), void o.shiftAndExecuteNext(t);
                                        var u = Object(i.isFiniteNumber)(n.duration) ? n.duration : 1 / 0,
                                            c = Object(i.isFiniteNumber)(s.duration) ? s.duration : 1 / 0,
                                            d = Math.max(0, e),
                                            h = Math.min(r, u, c);
                                        h > d ? (a.logger.log("[buffer-controller]: Removing [" + d + "," + h + "] from the " + t + " SourceBuffer"), console.assert(!l.updating, t + " sourceBuffer must not be updating"), l.remove(d, h)) : o.shiftAndExecuteNext(t)
                                    }, e.appendExecutor = function(t, e) {
                                        var r = this.operationQueue,
                                            i = this.sourceBuffer[e];
                                        if (!i) return a.logger.warn("[buffer-controller]: Attempting to append to the " + e + " SourceBuffer, but it does not exist"), void r.shiftAndExecuteNext(e);
                                        i.ended = !1, console.assert(!i.updating, e + " sourceBuffer must not be updating"), i.appendBuffer(t)
                                    }, e.blockBuffers = function(t, e) {
                                        var r = this;
                                        if (void 0 === e && (e = this.getSourceBufferTypes()), !e.length) return a.logger.log("[buffer-controller]: Blocking operation requested, but no SourceBuffers exist"), void Promise.resolve(t);
                                        var i = this.operationQueue,
                                            n = e.map((function(t) {
                                                return i.appendBlocker(t)
                                            }));
                                        Promise.all(n).then((function() {
                                            t(), e.forEach((function(t) {
                                                var e = r.sourceBuffer[t];
                                                e && e.updating || i.shiftAndExecuteNext(t)
                                            }))
                                        }))
                                    }, e.getSourceBufferTypes = function() {
                                        return Object.keys(this.sourceBuffer)
                                    }, e.addBufferListener = function(t, e, r) {
                                        var i = this.sourceBuffer[t];
                                        if (i) {
                                            var n = r.bind(this, t);
                                            this.listeners[t].push({
                                                event: e,
                                                listener: n
                                            }), i.addEventListener(e, n)
                                        }
                                    }, e.removeBufferListeners = function(t) {
                                        var e = this.sourceBuffer[t];
                                        e && this.listeners[t].forEach((function(t) {
                                            e.removeEventListener(t.event, t.listener)
                                        }))
                                    }, t
                                }()
                        },
                        "./src/controller/buffer-operation-queue.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "default", (function() {
                                return n
                            }));
                            var i = r("./src/utils/logger.ts"),
                                n = function() {
                                    function t(t) {
                                        this.buffers = void 0, this.queues = {
                                            video: [],
                                            audio: [],
                                            audiovideo: []
                                        }, this.buffers = t
                                    }
                                    var e = t.prototype;
                                    return e.append = function(t, e) {
                                        var r = this.queues[e];
                                        r.push(t), 1 === r.length && this.buffers[e] && this.executeNext(e)
                                    }, e.insertAbort = function(t, e) {
                                        this.queues[e].unshift(t), this.executeNext(e)
                                    }, e.appendBlocker = function(t) {
                                        var e, r = new Promise((function(t) {
                                                e = t
                                            })),
                                            i = {
                                                execute: e,
                                                onStart: function() {},
                                                onComplete: function() {},
                                                onError: function() {}
                                            };
                                        return this.append(i, t), r
                                    }, e.executeNext = function(t) {
                                        var e = this.buffers,
                                            r = this.queues,
                                            n = e[t],
                                            a = r[t];
                                        if (a.length) {
                                            var s = a[0];
                                            try {
                                                s.execute()
                                            } catch (e) {
                                                i.logger.warn("[buffer-operation-queue]: Unhandled exception executing the current operation"), s.onError(e), n && n.updating || (a.shift(), this.executeNext(t))
                                            }
                                        }
                                    }, e.shiftAndExecuteNext = function(t) {
                                        this.queues[t].shift(), this.executeNext(t)
                                    }, e.current = function(t) {
                                        return this.queues[t][0]
                                    }, t
                                }()
                        },
                        "./src/controller/cap-level-controller.ts": function(t, e, r) {
                            "use strict";
                            r.r(e);
                            var i = r("./src/events.ts");

                            function n(t, e) {
                                for (var r = 0; r < e.length; r++) {
                                    var i = e[r];
                                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                                }
                            }
                            var a = function() {
                                function t(t) {
                                    this.autoLevelCapping = void 0, this.firstLevel = void 0, this.media = void 0, this.restrictedLevels = void 0, this.timer = void 0, this.hls = void 0, this.streamController = void 0, this.clientRect = void 0, this.hls = t, this.autoLevelCapping = Number.POSITIVE_INFINITY, this.firstLevel = -1, this.media = null, this.restrictedLevels = [], this.timer = void 0, this.clientRect = null, this.registerListeners()
                                }
                                var e, r, a, s = t.prototype;
                                return s.setStreamController = function(t) {
                                    this.streamController = t
                                }, s.destroy = function() {
                                    this.unregisterListener(), this.hls.config.capLevelToPlayerSize && this.stopCapping(), this.media = null, this.clientRect = null, this.hls = this.streamController = null
                                }, s.registerListeners = function() {
                                    var t = this.hls;
                                    t.on(i.Events.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this), t.on(i.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), t.on(i.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.on(i.Events.BUFFER_CODECS, this.onBufferCodecs, this), t.on(i.Events.MEDIA_DETACHING, this.onMediaDetaching, this)
                                }, s.unregisterListener = function() {
                                    var t = this.hls;
                                    t.off(i.Events.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this), t.off(i.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), t.off(i.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.off(i.Events.BUFFER_CODECS, this.onBufferCodecs, this), t.off(i.Events.MEDIA_DETACHING, this.onMediaDetaching, this)
                                }, s.onFpsDropLevelCapping = function(e, r) {
                                    t.isLevelAllowed(r.droppedLevel, this.restrictedLevels) && this.restrictedLevels.push(r.droppedLevel)
                                }, s.onMediaAttaching = function(t, e) {
                                    this.media = e.media instanceof HTMLVideoElement ? e.media : null
                                }, s.onManifestParsed = function(t, e) {
                                    var r = this.hls;
                                    this.restrictedLevels = [], this.firstLevel = e.firstLevel, r.config.capLevelToPlayerSize && e.video && this.startCapping()
                                }, s.onBufferCodecs = function(t, e) {
                                    this.hls.config.capLevelToPlayerSize && e.video && this.startCapping()
                                }, s.onMediaDetaching = function() {
                                    this.stopCapping()
                                }, s.detectPlayerSize = function() {
                                    if (this.media && this.mediaHeight > 0 && this.mediaWidth > 0) {
                                        var t = this.hls.levels;
                                        if (t.length) {
                                            var e = this.hls;
                                            e.autoLevelCapping = this.getMaxLevel(t.length - 1), e.autoLevelCapping > this.autoLevelCapping && this.streamController && this.streamController.nextLevelSwitch(), this.autoLevelCapping = e.autoLevelCapping
                                        }
                                    }
                                }, s.getMaxLevel = function(e) {
                                    var r = this,
                                        i = this.hls.levels;
                                    if (!i.length) return -1;
                                    var n = i.filter((function(i, n) {
                                        return t.isLevelAllowed(n, r.restrictedLevels) && n <= e
                                    }));
                                    return this.clientRect = null, t.getMaxLevelByMediaSize(n, this.mediaWidth, this.mediaHeight)
                                }, s.startCapping = function() {
                                    this.timer || (this.autoLevelCapping = Number.POSITIVE_INFINITY, this.hls.firstLevel = this.getMaxLevel(this.firstLevel), self.clearInterval(this.timer), this.timer = self.setInterval(this.detectPlayerSize.bind(this), 1e3), this.detectPlayerSize())
                                }, s.stopCapping = function() {
                                    this.restrictedLevels = [], this.firstLevel = -1, this.autoLevelCapping = Number.POSITIVE_INFINITY, this.timer && (self.clearInterval(this.timer), this.timer = void 0)
                                }, s.getDimensions = function() {
                                    if (this.clientRect) return this.clientRect;
                                    var t = this.media,
                                        e = {
                                            width: 0,
                                            height: 0
                                        };
                                    if (t) {
                                        var r = t.getBoundingClientRect();
                                        e.width = r.width, e.height = r.height, e.width || e.height || (e.width = r.right - r.left || t.width || 0, e.height = r.bottom - r.top || t.height || 0)
                                    }
                                    return this.clientRect = e, e
                                }, t.isLevelAllowed = function(t, e) {
                                    return void 0 === e && (e = []), -1 === e.indexOf(t)
                                }, t.getMaxLevelByMediaSize = function(t, e, r) {
                                    if (!t || !t.length) return -1;
                                    for (var i, n, a = t.length - 1, s = 0; s < t.length; s += 1) {
                                        var o = t[s];
                                        if ((o.width >= e || o.height >= r) && (i = o, !(n = t[s + 1]) || i.width !== n.width || i.height !== n.height)) {
                                            a = s;
                                            break
                                        }
                                    }
                                    return a
                                }, e = t, a = [{
                                    key: "contentScaleFactor",
                                    get: function() {
                                        var t = 1;
                                        try {
                                            t = self.devicePixelRatio
                                        } catch (t) {}
                                        return t
                                    }
                                }], (r = [{
                                    key: "mediaWidth",
                                    get: function() {
                                        return this.getDimensions().width * t.contentScaleFactor
                                    }
                                }, {
                                    key: "mediaHeight",
                                    get: function() {
                                        return this.getDimensions().height * t.contentScaleFactor
                                    }
                                }]) && n(e.prototype, r), a && n(e, a), t
                            }();
                            e.default = a
                        },
                        "./src/controller/eme-controller.ts": function(t, e, r) {
                            "use strict";
                            r.r(e);
                            var i = r("./src/events.ts"),
                                n = r("./src/errors.ts"),
                                a = r("./src/utils/logger.ts"),
                                s = r("./src/utils/mediakeys-helper.ts");

                            function o(t, e) {
                                for (var r = 0; r < e.length; r++) {
                                    var i = e[r];
                                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                                }
                            }
                            var l = function() {
                                function t(t) {
                                    this.hls = void 0, this._widevineLicenseUrl = void 0, this._licenseXhrSetup = void 0, this._licenseResponseCallback = void 0, this._emeEnabled = void 0, this._requestMediaKeySystemAccess = void 0, this._drmSystemOptions = void 0, this._config = void 0, this._mediaKeysList = [], this._media = null, this._hasSetMediaKeys = !1, this._requestLicenseFailureCount = 0, this.mediaKeysPromise = null, this._onMediaEncrypted = this.onMediaEncrypted.bind(this), this.hls = t, this._config = t.config, this._widevineLicenseUrl = this._config.widevineLicenseUrl, this._licenseXhrSetup = this._config.licenseXhrSetup, this._licenseResponseCallback = this._config.licenseResponseCallback, this._emeEnabled = this._config.emeEnabled, this._requestMediaKeySystemAccess = this._config.requestMediaKeySystemAccessFunc, this._drmSystemOptions = this._config.drmSystemOptions, this._registerListeners()
                                }
                                var e, r, l = t.prototype;
                                return l.destroy = function() {
                                    this._unregisterListeners(), this.hls = this._onMediaEncrypted = null, this._requestMediaKeySystemAccess = null
                                }, l._registerListeners = function() {
                                    this.hls.on(i.Events.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.on(i.Events.MEDIA_DETACHED, this.onMediaDetached, this), this.hls.on(i.Events.MANIFEST_PARSED, this.onManifestParsed, this)
                                }, l._unregisterListeners = function() {
                                    this.hls.off(i.Events.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.off(i.Events.MEDIA_DETACHED, this.onMediaDetached, this), this.hls.off(i.Events.MANIFEST_PARSED, this.onManifestParsed, this)
                                }, l.getLicenseServerUrl = function(t) {
                                    switch (t) {
                                        case s.KeySystems.WIDEVINE:
                                            if (!this._widevineLicenseUrl) break;
                                            return this._widevineLicenseUrl
                                    }
                                    throw new Error('no license server URL configured for key-system "' + t + '"')
                                }, l._attemptKeySystemAccess = function(t, e, r) {
                                    var i = this,
                                        n = function(t, e, r, i) {
                                            switch (t) {
                                                case s.KeySystems.WIDEVINE:
                                                    return function(t, e, r) {
                                                        var i = {
                                                            audioCapabilities: [],
                                                            videoCapabilities: []
                                                        };
                                                        return t.forEach((function(t) {
                                                            i.audioCapabilities.push({
                                                                contentType: 'audio/mp4; codecs="' + t + '"',
                                                                robustness: r.audioRobustness || ""
                                                            })
                                                        })), e.forEach((function(t) {
                                                            i.videoCapabilities.push({
                                                                contentType: 'video/mp4; codecs="' + t + '"',
                                                                robustness: r.videoRobustness || ""
                                                            })
                                                        })), [i]
                                                    }(e, r, i);
                                                default:
                                                    throw new Error("Unknown key-system: " + t)
                                            }
                                        }(t, e, r, this._drmSystemOptions);
                                    a.logger.log("Requesting encrypted media key-system access");
                                    var o = this.requestMediaKeySystemAccess(t, n);
                                    this.mediaKeysPromise = o.then((function(e) {
                                        return i._onMediaKeySystemAccessObtained(t, e)
                                    })), o.catch((function(e) {
                                        a.logger.error('Failed to obtain key-system "' + t + '" access:', e)
                                    }))
                                }, l._onMediaKeySystemAccessObtained = function(t, e) {
                                    var r = this;
                                    a.logger.log('Access for key-system "' + t + '" obtained');
                                    var i = {
                                        mediaKeysSessionInitialized: !1,
                                        mediaKeySystemAccess: e,
                                        mediaKeySystemDomain: t
                                    };
                                    this._mediaKeysList.push(i);
                                    var n = Promise.resolve().then((function() {
                                        return e.createMediaKeys()
                                    })).then((function(e) {
                                        return i.mediaKeys = e, a.logger.log('Media-keys created for key-system "' + t + '"'), r._onMediaKeysCreated(), e
                                    }));
                                    return n.catch((function(t) {
                                        a.logger.error("Failed to create media-keys:", t)
                                    })), n
                                }, l._onMediaKeysCreated = function() {
                                    var t = this;
                                    this._mediaKeysList.forEach((function(e) {
                                        e.mediaKeysSession || (e.mediaKeysSession = e.mediaKeys.createSession(), t._onNewMediaKeySession(e.mediaKeysSession))
                                    }))
                                }, l._onNewMediaKeySession = function(t) {
                                    var e = this;
                                    a.logger.log("New key-system session " + t.sessionId), t.addEventListener("message", (function(r) {
                                        e._onKeySessionMessage(t, r.message)
                                    }), !1)
                                }, l._onKeySessionMessage = function(t, e) {
                                    a.logger.log("Got EME message event, creating license request"), this._requestLicense(e, (function(e) {
                                        a.logger.log("Received license data (length: " + (e ? e.byteLength : e) + "), updating key-session"), t.update(e)
                                    }))
                                }, l.onMediaEncrypted = function(t) {
                                    var e = this;
                                    if (a.logger.log('Media is encrypted using "' + t.initDataType + '" init data type'), !this.mediaKeysPromise) return a.logger.error("Fatal: Media is encrypted but no CDM access or no keys have been requested"), void this.hls.trigger(i.Events.ERROR, {
                                        type: n.ErrorTypes.KEY_SYSTEM_ERROR,
                                        details: n.ErrorDetails.KEY_SYSTEM_NO_KEYS,
                                        fatal: !0
                                    });
                                    var r = function(r) {
                                        e._media && (e._attemptSetMediaKeys(r), e._generateRequestWithPreferredKeySession(t.initDataType, t.initData))
                                    };
                                    this.mediaKeysPromise.then(r).catch(r)
                                }, l._attemptSetMediaKeys = function(t) {
                                    if (!this._media) throw new Error("Attempted to set mediaKeys without first attaching a media element");
                                    if (!this._hasSetMediaKeys) {
                                        var e = this._mediaKeysList[0];
                                        if (!e || !e.mediaKeys) return a.logger.error("Fatal: Media is encrypted but no CDM access or no keys have been obtained yet"), void this.hls.trigger(i.Events.ERROR, {
                                            type: n.ErrorTypes.KEY_SYSTEM_ERROR,
                                            details: n.ErrorDetails.KEY_SYSTEM_NO_KEYS,
                                            fatal: !0
                                        });
                                        a.logger.log("Setting keys for encrypted media"), this._media.setMediaKeys(e.mediaKeys), this._hasSetMediaKeys = !0
                                    }
                                }, l._generateRequestWithPreferredKeySession = function(t, e) {
                                    var r = this,
                                        s = this._mediaKeysList[0];
                                    if (!s) return a.logger.error("Fatal: Media is encrypted but not any key-system access has been obtained yet"), void this.hls.trigger(i.Events.ERROR, {
                                        type: n.ErrorTypes.KEY_SYSTEM_ERROR,
                                        details: n.ErrorDetails.KEY_SYSTEM_NO_ACCESS,
                                        fatal: !0
                                    });
                                    if (s.mediaKeysSessionInitialized) a.logger.warn("Key-Session already initialized but requested again");
                                    else {
                                        var o = s.mediaKeysSession;
                                        if (!o) return a.logger.error("Fatal: Media is encrypted but no key-session existing"), void this.hls.trigger(i.Events.ERROR, {
                                            type: n.ErrorTypes.KEY_SYSTEM_ERROR,
                                            details: n.ErrorDetails.KEY_SYSTEM_NO_SESSION,
                                            fatal: !0
                                        });
                                        if (!e) return a.logger.warn("Fatal: initData required for generating a key session is null"), void this.hls.trigger(i.Events.ERROR, {
                                            type: n.ErrorTypes.KEY_SYSTEM_ERROR,
                                            details: n.ErrorDetails.KEY_SYSTEM_NO_INIT_DATA,
                                            fatal: !0
                                        });
                                        a.logger.log('Generating key-session request for "' + t + '" init data type'), s.mediaKeysSessionInitialized = !0, o.generateRequest(t, e).then((function() {
                                            a.logger.debug("Key-session generation succeeded")
                                        })).catch((function(t) {
                                            a.logger.error("Error generating key-session request:", t), r.hls.trigger(i.Events.ERROR, {
                                                type: n.ErrorTypes.KEY_SYSTEM_ERROR,
                                                details: n.ErrorDetails.KEY_SYSTEM_NO_SESSION,
                                                fatal: !1
                                            })
                                        }))
                                    }
                                }, l._createLicenseXhr = function(t, e, r) {
                                    var i = new XMLHttpRequest;
                                    i.responseType = "arraybuffer", i.onreadystatechange = this._onLicenseRequestReadyStageChange.bind(this, i, t, e, r);
                                    var n = this._licenseXhrSetup;
                                    if (n) try {
                                        n.call(this.hls, i, t), n = void 0
                                    } catch (t) {
                                        a.logger.error(t)
                                    }
                                    try {
                                        i.readyState || i.open("POST", t, !0), n && n.call(this.hls, i, t)
                                    } catch (t) {
                                        throw new Error("issue setting up KeySystem license XHR " + t)
                                    }
                                    return i
                                }, l._onLicenseRequestReadyStageChange = function(t, e, r, s) {
                                    switch (t.readyState) {
                                        case 4:
                                            if (200 === t.status) {
                                                this._requestLicenseFailureCount = 0, a.logger.log("License request succeeded");
                                                var o = t.response,
                                                    l = this._licenseResponseCallback;
                                                if (l) try {
                                                    o = l.call(this.hls, t, e)
                                                } catch (t) {
                                                    a.logger.error(t)
                                                }
                                                s(o)
                                            } else {
                                                if (a.logger.error("License Request XHR failed (" + e + "). Status: " + t.status + " (" + t.statusText + ")"), this._requestLicenseFailureCount++, this._requestLicenseFailureCount > 3) return void this.hls.trigger(i.Events.ERROR, {
                                                    type: n.ErrorTypes.KEY_SYSTEM_ERROR,
                                                    details: n.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
                                                    fatal: !0
                                                });
                                                var u = 3 - this._requestLicenseFailureCount + 1;
                                                a.logger.warn("Retrying license request, " + u + " attempts left"), this._requestLicense(r, s)
                                            }
                                    }
                                }, l._generateLicenseRequestChallenge = function(t, e) {
                                    switch (t.mediaKeySystemDomain) {
                                        case s.KeySystems.WIDEVINE:
                                            return e
                                    }
                                    throw new Error("unsupported key-system: " + t.mediaKeySystemDomain)
                                }, l._requestLicense = function(t, e) {
                                    a.logger.log("Requesting content license for key-system");
                                    var r = this._mediaKeysList[0];
                                    if (!r) return a.logger.error("Fatal error: Media is encrypted but no key-system access has been obtained yet"), void this.hls.trigger(i.Events.ERROR, {
                                        type: n.ErrorTypes.KEY_SYSTEM_ERROR,
                                        details: n.ErrorDetails.KEY_SYSTEM_NO_ACCESS,
                                        fatal: !0
                                    });
                                    try {
                                        var s = this.getLicenseServerUrl(r.mediaKeySystemDomain),
                                            o = this._createLicenseXhr(s, t, e);
                                        a.logger.log("Sending license request to URL: " + s);
                                        var l = this._generateLicenseRequestChallenge(r, t);
                                        o.send(l)
                                    } catch (t) {
                                        a.logger.error("Failure requesting DRM license: " + t), this.hls.trigger(i.Events.ERROR, {
                                            type: n.ErrorTypes.KEY_SYSTEM_ERROR,
                                            details: n.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
                                            fatal: !0
                                        })
                                    }
                                }, l.onMediaAttached = function(t, e) {
                                    if (this._emeEnabled) {
                                        var r = e.media;
                                        this._media = r, r.addEventListener("encrypted", this._onMediaEncrypted)
                                    }
                                }, l.onMediaDetached = function() {
                                    var t = this._media,
                                        e = this._mediaKeysList;
                                    t && (t.removeEventListener("encrypted", this._onMediaEncrypted), this._media = null, this._mediaKeysList = [], Promise.all(e.map((function(t) {
                                        if (t.mediaKeysSession) return t.mediaKeysSession.close().catch((function() {}))
                                    }))).then((function() {
                                        return t.setMediaKeys(null)
                                    })).catch((function() {})))
                                }, l.onManifestParsed = function(t, e) {
                                    if (this._emeEnabled) {
                                        var r = e.levels.map((function(t) {
                                                return t.audioCodec
                                            })).filter((function(t) {
                                                return !!t
                                            })),
                                            i = e.levels.map((function(t) {
                                                return t.videoCodec
                                            })).filter((function(t) {
                                                return !!t
                                            }));
                                        this._attemptKeySystemAccess(s.KeySystems.WIDEVINE, r, i)
                                    }
                                }, e = t, (r = [{
                                    key: "requestMediaKeySystemAccess",
                                    get: function() {
                                        if (!this._requestMediaKeySystemAccess) throw new Error("No requestMediaKeySystemAccess function configured");
                                        return this._requestMediaKeySystemAccess
                                    }
                                }]) && o(e.prototype, r), t
                            }();
                            e.default = l
                        },
                        "./src/controller/fps-controller.ts": function(t, e, r) {
                            "use strict";
                            r.r(e);
                            var i = r("./src/events.ts"),
                                n = r("./src/utils/logger.ts"),
                                a = function() {
                                    function t(t) {
                                        this.hls = void 0, this.isVideoPlaybackQualityAvailable = !1, this.timer = void 0, this.media = null, this.lastTime = void 0, this.lastDroppedFrames = 0, this.lastDecodedFrames = 0, this.streamController = void 0, this.hls = t, this.registerListeners()
                                    }
                                    var e = t.prototype;
                                    return e.setStreamController = function(t) {
                                        this.streamController = t
                                    }, e.registerListeners = function() {
                                        this.hls.on(i.Events.MEDIA_ATTACHING, this.onMediaAttaching, this)
                                    }, e.unregisterListeners = function() {
                                        this.hls.off(i.Events.MEDIA_ATTACHING, this.onMediaAttaching)
                                    }, e.destroy = function() {
                                        this.timer && clearInterval(this.timer), this.unregisterListeners(), this.isVideoPlaybackQualityAvailable = !1, this.media = null
                                    }, e.onMediaAttaching = function(t, e) {
                                        var r = this.hls.config;
                                        if (r.capLevelOnFPSDrop) {
                                            var i = e.media instanceof self.HTMLVideoElement ? e.media : null;
                                            this.media = i, i && "function" == typeof i.getVideoPlaybackQuality && (this.isVideoPlaybackQualityAvailable = !0), self.clearInterval(this.timer), this.timer = self.setInterval(this.checkFPSInterval.bind(this), r.fpsDroppedMonitoringPeriod)
                                        }
                                    }, e.checkFPS = function(t, e, r) {
                                        var a = performance.now();
                                        if (e) {
                                            if (this.lastTime) {
                                                var s = a - this.lastTime,
                                                    o = r - this.lastDroppedFrames,
                                                    l = e - this.lastDecodedFrames,
                                                    u = 1e3 * o / s,
                                                    c = this.hls;
                                                if (c.trigger(i.Events.FPS_DROP, {
                                                        currentDropped: o,
                                                        currentDecoded: l,
                                                        totalDroppedFrames: r
                                                    }), u > 0 && o > c.config.fpsDroppedMonitoringThreshold * l) {
                                                    var d = c.currentLevel;
                                                    n.logger.warn("drop FPS ratio greater than max allowed value for currentLevel: " + d), d > 0 && (-1 === c.autoLevelCapping || c.autoLevelCapping >= d) && (d -= 1, c.trigger(i.Events.FPS_DROP_LEVEL_CAPPING, {
                                                        level: d,
                                                        droppedLevel: c.currentLevel
                                                    }), c.autoLevelCapping = d, this.streamController.nextLevelSwitch())
                                                }
                                            }
                                            this.lastTime = a, this.lastDroppedFrames = r, this.lastDecodedFrames = e
                                        }
                                    }, e.checkFPSInterval = function() {
                                        var t = this.media;
                                        if (t)
                                            if (this.isVideoPlaybackQualityAvailable) {
                                                var e = t.getVideoPlaybackQuality();
                                                this.checkFPS(t, e.totalVideoFrames, e.droppedVideoFrames)
                                            } else this.checkFPS(t, t.webkitDecodedFrameCount, t.webkitDroppedFrameCount)
                                    }, t
                                }();
                            e.default = a
                        },
                        "./src/controller/fragment-finders.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "findFragmentByPDT", (function() {
                                return a
                            })), r.d(e, "findFragmentByPTS", (function() {
                                return s
                            })), r.d(e, "fragmentWithinToleranceTest", (function() {
                                return o
                            })), r.d(e, "pdtWithinToleranceTest", (function() {
                                return l
                            })), r.d(e, "findFragWithCC", (function() {
                                return u
                            }));
                            var i = r("./src/polyfills/number.ts"),
                                n = r("./src/utils/binary-search.ts");

                            function a(t, e, r) {
                                if (null === e || !Array.isArray(t) || !t.length || !Object(i.isFiniteNumber)(e)) return null;
                                if (e < (t[0].programDateTime || 0)) return null;
                                if (e >= (t[t.length - 1].endProgramDateTime || 0)) return null;
                                r = r || 0;
                                for (var n = 0; n < t.length; ++n) {
                                    var a = t[n];
                                    if (l(e, r, a)) return a
                                }
                                return null
                            }

                            function s(t, e, r, i) {
                                void 0 === r && (r = 0), void 0 === i && (i = 0);
                                var a = null;
                                return t ? a = e[t.sn - e[0].sn + 1] || null : 0 === r && 0 === e[0].start && (a = e[0]), a && 0 === o(r, i, a) ? a : n.default.search(e, o.bind(null, r, i)) || a
                            }

                            function o(t, e, r) {
                                void 0 === t && (t = 0), void 0 === e && (e = 0);
                                var i = Math.min(e, r.duration + (r.deltaPTS ? r.deltaPTS : 0));
                                return r.start + r.duration - i <= t ? 1 : r.start - i > t && r.start ? -1 : 0
                            }

                            function l(t, e, r) {
                                var i = 1e3 * Math.min(e, r.duration + (r.deltaPTS ? r.deltaPTS : 0));
                                return (r.endProgramDateTime || 0) - i > t
                            }

                            function u(t, e) {
                                return n.default.search(t, (function(t) {
                                    return t.cc < e ? 1 : t.cc > e ? -1 : 0
                                }))
                            }
                        },
                        "./src/controller/fragment-tracker.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "FragmentState", (function() {
                                return i
                            })), r.d(e, "FragmentTracker", (function() {
                                return s
                            }));
                            var i, n = r("./src/events.ts"),
                                a = r("./src/types/loader.ts");
                            ! function(t) {
                                t.NOT_LOADED = "NOT_LOADED", t.BACKTRACKED = "BACKTRACKED", t.APPENDING = "APPENDING", t.PARTIAL = "PARTIAL", t.OK = "OK"
                            }(i || (i = {}));
                            var s = function() {
                                function t(t) {
                                    this.activeFragment = null, this.activeParts = null, this.fragments = Object.create(null), this.timeRanges = Object.create(null), this.bufferPadding = .2, this.hls = void 0, this.hls = t, this._registerListeners()
                                }
                                var e = t.prototype;
                                return e._registerListeners = function() {
                                    var t = this.hls;
                                    t.on(n.Events.BUFFER_APPENDED, this.onBufferAppended, this), t.on(n.Events.FRAG_BUFFERED, this.onFragBuffered, this), t.on(n.Events.FRAG_LOADED, this.onFragLoaded, this)
                                }, e._unregisterListeners = function() {
                                    var t = this.hls;
                                    t.off(n.Events.BUFFER_APPENDED, this.onBufferAppended, this), t.off(n.Events.FRAG_BUFFERED, this.onFragBuffered, this), t.off(n.Events.FRAG_LOADED, this.onFragLoaded, this)
                                }, e.destroy = function() {
                                    this._unregisterListeners(), this.fragments = this.timeRanges = null
                                }, e.getAppendedFrag = function(t, e) {
                                    if (e === a.PlaylistLevelType.MAIN) {
                                        var r = this.activeFragment,
                                            i = this.activeParts;
                                        if (!r) return null;
                                        if (i)
                                            for (var n = i.length; n--;) {
                                                var s = i[n],
                                                    o = s ? s.end : r.appendedPTS;
                                                if (s.start <= t && void 0 !== o && t <= o) return n > 9 && (this.activeParts = i.slice(n - 9)), s
                                            } else if (r.start <= t && void 0 !== r.appendedPTS && t <= r.appendedPTS) return r
                                    }
                                    return this.getBufferedFrag(t, e)
                                }, e.getBufferedFrag = function(t, e) {
                                    for (var r = this.fragments, i = Object.keys(r), n = i.length; n--;) {
                                        var a = r[i[n]];
                                        if ((null == a ? void 0 : a.body.type) === e && a.buffered) {
                                            var s = a.body;
                                            if (s.start <= t && t <= s.end) return s
                                        }
                                    }
                                    return null
                                }, e.detectEvictedFragments = function(t, e, r) {
                                    var i = this;
                                    Object.keys(this.fragments).forEach((function(n) {
                                        var a = i.fragments[n];
                                        if (a)
                                            if (a.buffered) {
                                                var s = a.range[t];
                                                s && s.time.some((function(t) {
                                                    var r = !i.isTimeBuffered(t.startPTS, t.endPTS, e);
                                                    return r && i.removeFragment(a.body), r
                                                }))
                                            } else a.body.type === r && i.removeFragment(a.body)
                                    }))
                                }, e.detectPartialFragments = function(t) {
                                    var e = this,
                                        r = this.timeRanges,
                                        i = t.frag,
                                        n = t.part;
                                    if (r && "initSegment" !== i.sn) {
                                        var a = l(i),
                                            s = this.fragments[a];
                                        s && (Object.keys(r).forEach((function(t) {
                                            var a = i.elementaryStreams[t];
                                            if (a) {
                                                var o = r[t],
                                                    l = null !== n || !0 === a.partial;
                                                s.range[t] = e.getBufferedTimes(i, n, l, o)
                                            }
                                        })), s.backtrack = s.loaded = null, Object.keys(s.range).length ? s.buffered = !0 : this.removeFragment(s.body))
                                    }
                                }, e.fragBuffered = function(t) {
                                    var e = l(t),
                                        r = this.fragments[e];
                                    r && (r.backtrack = r.loaded = null, r.buffered = !0)
                                }, e.getBufferedTimes = function(t, e, r, i) {
                                    for (var n = {
                                            time: [],
                                            partial: r
                                        }, a = e ? e.start : t.start, s = e ? e.end : t.end, o = t.minEndPTS || s, l = t.maxStartPTS || a, u = 0; u < i.length; u++) {
                                        var c = i.start(u) - this.bufferPadding,
                                            d = i.end(u) + this.bufferPadding;
                                        if (l >= c && o <= d) {
                                            n.time.push({
                                                startPTS: Math.max(a, i.start(u)),
                                                endPTS: Math.min(s, i.end(u))
                                            });
                                            break
                                        }
                                        if (a < d && s > c) n.partial = !0, n.time.push({
                                            startPTS: Math.max(a, i.start(u)),
                                            endPTS: Math.min(s, i.end(u))
                                        });
                                        else if (s <= c) break
                                    }
                                    return n
                                }, e.getPartialFragment = function(t) {
                                    var e, r, i, n = null,
                                        a = 0,
                                        s = this.bufferPadding,
                                        l = this.fragments;
                                    return Object.keys(l).forEach((function(u) {
                                        var c = l[u];
                                        c && o(c) && (r = c.body.start - s, i = c.body.end + s, t >= r && t <= i && (e = Math.min(t - r, i - t), a <= e && (n = c.body, a = e)))
                                    })), n
                                }, e.getState = function(t) {
                                    var e = l(t),
                                        r = this.fragments[e];
                                    return r ? r.buffered ? o(r) ? i.PARTIAL : i.OK : r.backtrack ? i.BACKTRACKED : i.APPENDING : i.NOT_LOADED
                                }, e.backtrack = function(t, e) {
                                    var r = l(t),
                                        i = this.fragments[r];
                                    if (!i || i.backtrack) return null;
                                    var n = i.backtrack = e || i.loaded;
                                    return i.loaded = null, n
                                }, e.getBacktrackData = function(t) {
                                    var e = l(t),
                                        r = this.fragments[e];
                                    if (r) {
                                        var i, n = r.backtrack;
                                        if (null != n && null !== (i = n.payload) && void 0 !== i && i.byteLength) return n;
                                        this.removeFragment(t)
                                    }
                                    return null
                                }, e.isTimeBuffered = function(t, e, r) {
                                    for (var i, n, a = 0; a < r.length; a++) {
                                        if (i = r.start(a) - this.bufferPadding, n = r.end(a) + this.bufferPadding, t >= i && e <= n) return !0;
                                        if (e <= i) return !1
                                    }
                                    return !1
                                }, e.onFragLoaded = function(t, e) {
                                    var r = e.frag,
                                        i = e.part;
                                    if ("initSegment" !== r.sn && !r.bitrateTest && !i) {
                                        var n = l(r);
                                        this.fragments[n] = {
                                            body: r,
                                            loaded: e,
                                            backtrack: null,
                                            buffered: !1,
                                            range: Object.create(null)
                                        }
                                    }
                                }, e.onBufferAppended = function(t, e) {
                                    var r = this,
                                        i = e.frag,
                                        n = e.part,
                                        s = e.timeRanges;
                                    if (i.type === a.PlaylistLevelType.MAIN)
                                        if (this.activeFragment = i, n) {
                                            var o = this.activeParts;
                                            o || (this.activeParts = o = []), o.push(n)
                                        } else this.activeParts = null;
                                    this.timeRanges = s, Object.keys(s).forEach((function(t) {
                                        var e = s[t];
                                        if (r.detectEvictedFragments(t, e), !n)
                                            for (var a = 0; a < e.length; a++) i.appendedPTS = Math.max(e.end(a), i.appendedPTS || 0)
                                    }))
                                }, e.onFragBuffered = function(t, e) {
                                    this.detectPartialFragments(e)
                                }, e.hasFragment = function(t) {
                                    var e = l(t);
                                    return !!this.fragments[e]
                                }, e.removeFragmentsInRange = function(t, e, r) {
                                    var i = this;
                                    Object.keys(this.fragments).forEach((function(n) {
                                        var a = i.fragments[n];
                                        if (a && a.buffered) {
                                            var s = a.body;
                                            s.type === r && s.start < e && s.end > t && i.removeFragment(s)
                                        }
                                    }))
                                }, e.removeFragment = function(t) {
                                    var e = l(t);
                                    t.stats.loaded = 0, t.clearElementaryStreamInfo(), delete this.fragments[e]
                                }, e.removeAllFragments = function() {
                                    this.fragments = Object.create(null), this.activeFragment = null, this.activeParts = null
                                }, t
                            }();

                            function o(t) {
                                var e, r;
                                return t.buffered && ((null === (e = t.range.video) || void 0 === e ? void 0 : e.partial) || (null === (r = t.range.audio) || void 0 === r ? void 0 : r.partial))
                            }

                            function l(t) {
                                return t.type + "_" + t.level + "_" + t.urlId + "_" + t.sn
                            }
                        },
                        "./src/controller/gap-controller.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "STALL_MINIMUM_DURATION_MS", (function() {
                                return o
                            })), r.d(e, "MAX_START_GAP_JUMP", (function() {
                                return l
                            })), r.d(e, "SKIP_BUFFER_HOLE_STEP_SECONDS", (function() {
                                return u
                            })), r.d(e, "SKIP_BUFFER_RANGE_START", (function() {
                                return c
                            })), r.d(e, "default", (function() {
                                return d
                            }));
                            var i = r("./src/utils/buffer-helper.ts"),
                                n = r("./src/errors.ts"),
                                a = r("./src/events.ts"),
                                s = r("./src/utils/logger.ts"),
                                o = 250,
                                l = 2,
                                u = .1,
                                c = .05,
                                d = function() {
                                    function t(t, e, r, i) {
                                        this.config = void 0, this.media = void 0, this.fragmentTracker = void 0, this.hls = void 0, this.nudgeRetry = 0, this.stallReported = !1, this.stalled = null, this.moved = !1, this.seeking = !1, this.config = t, this.media = e, this.fragmentTracker = r, this.hls = i
                                    }
                                    var e = t.prototype;
                                    return e.destroy = function() {
                                        this.hls = this.fragmentTracker = this.media = null
                                    }, e.poll = function(t) {
                                        var e = this.config,
                                            r = this.media,
                                            n = this.stalled,
                                            a = r.currentTime,
                                            u = r.seeking,
                                            c = this.seeking && !u,
                                            d = !this.seeking && u;
                                        if (this.seeking = u, a === t) {
                                            if ((d || c) && (this.stalled = null), !r.paused && !r.ended && 0 !== r.playbackRate && i.BufferHelper.getBuffered(r).length) {
                                                var h = i.BufferHelper.bufferInfo(r, a, 0),
                                                    f = h.len > 0,
                                                    g = h.nextStart || 0;
                                                if (f || g) {
                                                    if (u) {
                                                        var v = h.len > l,
                                                            p = !g || g - a > l && !this.fragmentTracker.getPartialFragment(a);
                                                        if (v || p) return;
                                                        this.moved = !1
                                                    }
                                                    if (!this.moved && null !== this.stalled) {
                                                        var m, y = Math.max(g, h.start || 0) - a,
                                                            E = this.hls.levels ? this.hls.levels[this.hls.currentLevel] : null,
                                                            T = (null == E || null === (m = E.details) || void 0 === m ? void 0 : m.live) ? 2 * E.details.targetduration : l;
                                                        if (y > 0 && y <= T) return void this._trySkipBufferHole(null)
                                                    }
                                                    var b = self.performance.now();
                                                    if (null !== n) {
                                                        var S = b - n;
                                                        !u && S >= o && this._reportStall(h.len);
                                                        var L = i.BufferHelper.bufferInfo(r, a, e.maxBufferHole);
                                                        this._tryFixBufferStall(L, S)
                                                    } else this.stalled = b
                                                }
                                            }
                                        } else if (this.moved = !0, null !== n) {
                                            if (this.stallReported) {
                                                var A = self.performance.now() - n;
                                                s.logger.warn("playback not stuck anymore @" + a + ", after " + Math.round(A) + "ms"), this.stallReported = !1
                                            }
                                            this.stalled = null, this.nudgeRetry = 0
                                        }
                                    }, e._tryFixBufferStall = function(t, e) {
                                        var r = this.config,
                                            i = this.fragmentTracker,
                                            n = this.media.currentTime,
                                            a = i.getPartialFragment(n);
                                        a && this._trySkipBufferHole(a) || t.len > r.maxBufferHole && e > 1e3 * r.highBufferWatchdogPeriod && (s.logger.warn("Trying to nudge playhead over buffer-hole"), this.stalled = null, this._tryNudgeBuffer())
                                    }, e._reportStall = function(t) {
                                        var e = this.hls,
                                            r = this.media;
                                        this.stallReported || (this.stallReported = !0, s.logger.warn("Playback stalling at @" + r.currentTime + " due to low buffer (buffer=" + t + ")"), e.trigger(a.Events.ERROR, {
                                            type: n.ErrorTypes.MEDIA_ERROR,
                                            details: n.ErrorDetails.BUFFER_STALLED_ERROR,
                                            fatal: !1,
                                            buffer: t
                                        }))
                                    }, e._trySkipBufferHole = function(t) {
                                        for (var e = this.config, r = this.hls, o = this.media, l = o.currentTime, d = 0, h = i.BufferHelper.getBuffered(o), f = 0; f < h.length; f++) {
                                            var g = h.start(f);
                                            if (l + e.maxBufferHole >= d && l < g) {
                                                var v = Math.max(g + c, o.currentTime + u);
                                                return s.logger.warn("skipping hole, adjusting currentTime from " + l + " to " + v), this.moved = !0, this.stalled = null, o.currentTime = v, t && r.trigger(a.Events.ERROR, {
                                                    type: n.ErrorTypes.MEDIA_ERROR,
                                                    details: n.ErrorDetails.BUFFER_SEEK_OVER_HOLE,
                                                    fatal: !1,
                                                    reason: "fragment loaded with buffer holes, seeking from " + l + " to " + v,
                                                    frag: t
                                                }), v
                                            }
                                            d = h.end(f)
                                        }
                                        return 0
                                    }, e._tryNudgeBuffer = function() {
                                        var t = this.config,
                                            e = this.hls,
                                            r = this.media,
                                            i = r.currentTime,
                                            o = (this.nudgeRetry || 0) + 1;
                                        if (this.nudgeRetry = o, o < t.nudgeMaxRetry) {
                                            var l = i + o * t.nudgeOffset;
                                            s.logger.warn("Nudging 'currentTime' from " + i + " to " + l), r.currentTime = l, e.trigger(a.Events.ERROR, {
                                                type: n.ErrorTypes.MEDIA_ERROR,
                                                details: n.ErrorDetails.BUFFER_NUDGE_ON_STALL,
                                                fatal: !1
                                            })
                                        } else s.logger.error("Playhead still not moving while enough data buffered @" + i + " after " + t.nudgeMaxRetry + " nudges"), e.trigger(a.Events.ERROR, {
                                            type: n.ErrorTypes.MEDIA_ERROR,
                                            details: n.ErrorDetails.BUFFER_STALLED_ERROR,
                                            fatal: !0
                                        })
                                    }, t
                                }()
                        },
                        "./src/controller/id3-track-controller.ts": function(t, e, r) {
                            "use strict";
                            r.r(e);
                            var i = r("./src/events.ts"),
                                n = r("./src/utils/texttrack-utils.ts"),
                                a = r("./src/demux/id3.ts"),
                                s = function() {
                                    function t(t) {
                                        this.hls = void 0, this.id3Track = null, this.media = null, this.hls = t, this._registerListeners()
                                    }
                                    var e = t.prototype;
                                    return e.destroy = function() {
                                        this._unregisterListeners()
                                    }, e._registerListeners = function() {
                                        var t = this.hls;
                                        t.on(i.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.on(i.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(i.Events.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this), t.on(i.Events.BUFFER_FLUSHING, this.onBufferFlushing, this)
                                    }, e._unregisterListeners = function() {
                                        var t = this.hls;
                                        t.off(i.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.off(i.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(i.Events.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this), t.off(i.Events.BUFFER_FLUSHING, this.onBufferFlushing, this)
                                    }, e.onMediaAttached = function(t, e) {
                                        this.media = e.media
                                    }, e.onMediaDetaching = function() {
                                        this.id3Track && (Object(n.clearCurrentCues)(this.id3Track), this.id3Track = null, this.media = null)
                                    }, e.getID3Track = function(t) {
                                        if (this.media) {
                                            for (var e = 0; e < t.length; e++) {
                                                var r = t[e];
                                                if ("metadata" === r.kind && "id3" === r.label) return Object(n.sendAddTrackEvent)(r, this.media), r
                                            }
                                            return this.media.addTextTrack("metadata", "id3")
                                        }
                                    }, e.onFragParsingMetadata = function(t, e) {
                                        if (this.media) {
                                            var r = e.frag,
                                                i = e.samples;
                                            this.id3Track || (this.id3Track = this.getID3Track(this.media.textTracks), this.id3Track.mode = "hidden");
                                            for (var n = self.WebKitDataCue || self.VTTCue || self.TextTrackCue, s = 0; s < i.length; s++) {
                                                var o = a.getID3Frames(i[s].data);
                                                if (o) {
                                                    var l = i[s].pts,
                                                        u = s < i.length - 1 ? i[s + 1].pts : r.end;
                                                    u - l <= 0 && (u = l + .25);
                                                    for (var c = 0; c < o.length; c++) {
                                                        var d = o[c];
                                                        if (!a.isTimeStampFrame(d)) {
                                                            var h = new n(l, u, "");
                                                            h.value = d, this.id3Track.addCue(h)
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }, e.onBufferFlushing = function(t, e) {
                                        var r = e.startOffset,
                                            i = e.endOffset,
                                            a = e.type;
                                        if (!a || "audio" === a) {
                                            var s = this.id3Track;
                                            s && Object(n.removeCuesInRange)(s, r, i)
                                        }
                                    }, t
                                }();
                            e.default = s
                        },
                        "./src/controller/latency-controller.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "default", (function() {
                                return o
                            }));
                            var i = r("./src/errors.ts"),
                                n = r("./src/events.ts"),
                                a = r("./src/utils/logger.ts");

                            function s(t, e) {
                                for (var r = 0; r < e.length; r++) {
                                    var i = e[r];
                                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                                }
                            }
                            var o = function() {
                                function t(t) {
                                    var e = this;
                                    this.hls = void 0, this.config = void 0, this.media = null, this.levelDetails = null, this.currentTime = 0, this.stallCount = 0, this._latency = null, this.timeupdateHandler = function() {
                                        return e.timeupdate()
                                    }, this.hls = t, this.config = t.config, this.registerListeners()
                                }
                                var e, r, o = t.prototype;
                                return o.destroy = function() {
                                    this.unregisterListeners(), this.onMediaDetaching(), this.levelDetails = null, this.hls = this.timeupdateHandler = null
                                }, o.registerListeners = function() {
                                    this.hls.on(n.Events.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.on(n.Events.MEDIA_DETACHING, this.onMediaDetaching, this), this.hls.on(n.Events.MANIFEST_LOADING, this.onManifestLoading, this), this.hls.on(n.Events.LEVEL_UPDATED, this.onLevelUpdated, this), this.hls.on(n.Events.ERROR, this.onError, this)
                                }, o.unregisterListeners = function() {
                                    this.hls.off(n.Events.MEDIA_ATTACHED, this.onMediaAttached), this.hls.off(n.Events.MEDIA_DETACHING, this.onMediaDetaching), this.hls.off(n.Events.MANIFEST_LOADING, this.onManifestLoading), this.hls.off(n.Events.LEVEL_UPDATED, this.onLevelUpdated), this.hls.off(n.Events.ERROR, this.onError)
                                }, o.onMediaAttached = function(t, e) {
                                    this.media = e.media, this.media.addEventListener("timeupdate", this.timeupdateHandler)
                                }, o.onMediaDetaching = function() {
                                    this.media && (this.media.removeEventListener("timeupdate", this.timeupdateHandler), this.media = null)
                                }, o.onManifestLoading = function() {
                                    this.levelDetails = null, this._latency = null, this.stallCount = 0
                                }, o.onLevelUpdated = function(t, e) {
                                    var r = e.details;
                                    this.levelDetails = r, r.advanced && this.timeupdate(), !r.live && this.media && this.media.removeEventListener("timeupdate", this.timeupdateHandler)
                                }, o.onError = function(t, e) {
                                    e.details === i.ErrorDetails.BUFFER_STALLED_ERROR && (this.stallCount++, a.logger.warn("[playback-rate-controller]: Stall detected, adjusting target latency"))
                                }, o.timeupdate = function() {
                                    var t = this.media,
                                        e = this.levelDetails;
                                    if (t && e) {
                                        this.currentTime = t.currentTime;
                                        var r = this.computeLatency();
                                        if (null !== r) {
                                            this._latency = r;
                                            var i = this.config,
                                                n = i.lowLatencyMode,
                                                a = i.maxLiveSyncPlaybackRate;
                                            if (n && 1 !== a) {
                                                var s = this.targetLatency;
                                                if (null !== s) {
                                                    var o = r - s,
                                                        l = o < Math.min(this.maxLatency, s + e.targetduration);
                                                    if (e.live && l && o > .05 && this.forwardBufferLength > 1) {
                                                        var u = Math.min(2, Math.max(1, a)),
                                                            c = Math.round(2 / (1 + Math.exp(-.75 * o - this.edgeStalled)) * 20) / 20;
                                                        t.playbackRate = Math.min(u, Math.max(1, c))
                                                    } else 1 !== t.playbackRate && 0 !== t.playbackRate && (t.playbackRate = 1)
                                                }
                                            }
                                        }
                                    }
                                }, o.estimateLiveEdge = function() {
                                    var t = this.levelDetails;
                                    return null === t ? null : t.edge + t.age
                                }, o.computeLatency = function() {
                                    var t = this.estimateLiveEdge();
                                    return null === t ? null : t - this.currentTime
                                }, e = t, (r = [{
                                    key: "latency",
                                    get: function() {
                                        return this._latency || 0
                                    }
                                }, {
                                    key: "maxLatency",
                                    get: function() {
                                        var t = this.config,
                                            e = this.levelDetails;
                                        return void 0 !== t.liveMaxLatencyDuration ? t.liveMaxLatencyDuration : e ? t.liveMaxLatencyDurationCount * e.targetduration : 0
                                    }
                                }, {
                                    key: "targetLatency",
                                    get: function() {
                                        var t = this.levelDetails;
                                        if (null === t) return null;
                                        var e = t.holdBack,
                                            r = t.partHoldBack,
                                            i = t.targetduration,
                                            n = this.config,
                                            a = n.liveSyncDuration,
                                            s = n.liveSyncDurationCount,
                                            o = n.lowLatencyMode,
                                            l = this.hls.userConfig,
                                            u = o && r || e;
                                        (l.liveSyncDuration || l.liveSyncDurationCount || 0 === u) && (u = void 0 !== a ? a : s * i);
                                        var c = i;
                                        return u + Math.min(1 * this.stallCount, c)
                                    }
                                }, {
                                    key: "liveSyncPosition",
                                    get: function() {
                                        var t = this.estimateLiveEdge(),
                                            e = this.targetLatency,
                                            r = this.levelDetails;
                                        if (null === t || null === e || null === r) return null;
                                        var i = r.edge,
                                            n = t - e - this.edgeStalled,
                                            a = i - r.totalduration,
                                            s = i - (this.config.lowLatencyMode && r.partTarget || r.targetduration);
                                        return Math.min(Math.max(a, n), s)
                                    }
                                }, {
                                    key: "drift",
                                    get: function() {
                                        var t = this.levelDetails;
                                        return null === t ? 1 : t.drift
                                    }
                                }, {
                                    key: "edgeStalled",
                                    get: function() {
                                        var t = this.levelDetails;
                                        if (null === t) return 0;
                                        var e = 3 * (this.config.lowLatencyMode && t.partTarget || t.targetduration);
                                        return Math.max(t.age - e, 0)
                                    }
                                }, {
                                    key: "forwardBufferLength",
                                    get: function() {
                                        var t = this.media,
                                            e = this.levelDetails;
                                        if (!t || !e) return 0;
                                        var r = t.buffered.length;
                                        return r ? t.buffered.end(r - 1) : e.edge - this.currentTime
                                    }
                                }]) && s(e.prototype, r), t
                            }()
                        },
                        "./src/controller/level-controller.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "default", (function() {
                                return g
                            }));
                            var i = r("./src/types/level.ts"),
                                n = r("./src/events.ts"),
                                a = r("./src/errors.ts"),
                                s = r("./src/utils/codecs.ts"),
                                o = r("./src/controller/level-helper.ts"),
                                l = r("./src/controller/base-playlist-controller.ts"),
                                u = r("./src/types/loader.ts");

                            function c() {
                                return (c = Object.assign || function(t) {
                                    for (var e = 1; e < arguments.length; e++) {
                                        var r = arguments[e];
                                        for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i])
                                    }
                                    return t
                                }).apply(this, arguments)
                            }

                            function d(t, e) {
                                for (var r = 0; r < e.length; r++) {
                                    var i = e[r];
                                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                                }
                            }

                            function h(t, e) {
                                return (h = Object.setPrototypeOf || function(t, e) {
                                    return t.__proto__ = e, t
                                })(t, e)
                            }
                            var f = /chrome|firefox/.test(navigator.userAgent.toLowerCase()),
                                g = function(t) {
                                    var e, r;

                                    function l(e) {
                                        var r;
                                        return (r = t.call(this, e, "[level-controller]") || this)._levels = [], r._firstLevel = -1, r._startLevel = void 0, r.currentLevelIndex = -1, r.manualLevelIndex = -1, r.onParsedComplete = void 0, r._registerListeners(), r
                                    }
                                    r = t, (e = l).prototype = Object.create(r.prototype), e.prototype.constructor = e, h(e, r);
                                    var g, v, p = l.prototype;
                                    return p._registerListeners = function() {
                                        var t = this.hls;
                                        t.on(n.Events.MANIFEST_LOADED, this.onManifestLoaded, this), t.on(n.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.on(n.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), t.on(n.Events.FRAG_LOADED, this.onFragLoaded, this), t.on(n.Events.ERROR, this.onError, this)
                                    }, p._unregisterListeners = function() {
                                        var t = this.hls;
                                        t.off(n.Events.MANIFEST_LOADED, this.onManifestLoaded, this), t.off(n.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.off(n.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), t.off(n.Events.FRAG_LOADED, this.onFragLoaded, this), t.off(n.Events.ERROR, this.onError, this)
                                    }, p.destroy = function() {
                                        this._unregisterListeners(), this.manualLevelIndex = -1, this._levels.length = 0, t.prototype.destroy.call(this)
                                    }, p.startLoad = function() {
                                        this._levels.forEach((function(t) {
                                            t.loadError = 0
                                        })), t.prototype.startLoad.call(this)
                                    }, p.onManifestLoaded = function(t, e) {
                                        var r, l, u = [],
                                            c = [],
                                            d = [],
                                            h = {},
                                            g = !1,
                                            v = !1,
                                            p = !1;
                                        if (e.levels.forEach((function(t) {
                                                var e = t.attrs;
                                                g = g || !(!t.width || !t.height), v = v || !!t.videoCodec, p = p || !!t.audioCodec, f && t.audioCodec && -1 !== t.audioCodec.indexOf("mp4a.40.34") && (t.audioCodec = void 0);
                                                var r = t.bitrate + "-" + t.attrs.RESOLUTION + "-" + t.attrs.CODECS;
                                                (l = h[r]) ? l.url.push(t.url): (l = new i.Level(t), h[r] = l, u.push(l)), e && (e.AUDIO && Object(o.addGroupId)(l, "audio", e.AUDIO), e.SUBTITLES && Object(o.addGroupId)(l, "text", e.SUBTITLES))
                                            })), (g || v) && p && (u = u.filter((function(t) {
                                                var e = t.videoCodec,
                                                    r = t.width,
                                                    i = t.height;
                                                return !!e || !(!r || !i)
                                            }))), u = u.filter((function(t) {
                                                var e = t.audioCodec,
                                                    r = t.videoCodec;
                                                return (!e || Object(s.isCodecSupportedInMp4)(e, "audio")) && (!r || Object(s.isCodecSupportedInMp4)(r, "video"))
                                            })), e.audioTracks && (c = e.audioTracks.filter((function(t) {
                                                return !t.audioCodec || Object(s.isCodecSupportedInMp4)(t.audioCodec, "audio")
                                            })), Object(o.assignTrackIdsByGroup)(c)), e.subtitles && (d = e.subtitles, Object(o.assignTrackIdsByGroup)(d)), u.length > 0) {
                                            r = u[0].bitrate, u.sort((function(t, e) {
                                                return t.bitrate - e.bitrate
                                            })), this._levels = u;
                                            for (var m = 0; m < u.length; m++)
                                                if (u[m].bitrate === r) {
                                                    this._firstLevel = m, this.log("manifest loaded, " + u.length + " level(s) found, first bitrate: " + r);
                                                    break
                                                } var y = p && !v,
                                                E = {
                                                    levels: u,
                                                    audioTracks: c,
                                                    subtitleTracks: d,
                                                    firstLevel: this._firstLevel,
                                                    stats: e.stats,
                                                    audio: p,
                                                    video: v,
                                                    altAudio: !y && c.some((function(t) {
                                                        return !!t.url
                                                    }))
                                                };
                                            this.hls.trigger(n.Events.MANIFEST_PARSED, E), (this.hls.config.autoStartLoad || this.hls.forceStartLoad) && this.hls.startLoad(this.hls.config.startPosition)
                                        } else this.hls.trigger(n.Events.ERROR, {
                                            type: a.ErrorTypes.MEDIA_ERROR,
                                            details: a.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR,
                                            fatal: !0,
                                            url: e.url,
                                            reason: "no level with compatible codecs found in manifest"
                                        })
                                    }, p.onError = function(e, r) {
                                        if (t.prototype.onError.call(this, e, r), !r.fatal) {
                                            var i = r.context,
                                                n = this._levels[this.currentLevelIndex];
                                            if (i && (i.type === u.PlaylistContextType.AUDIO_TRACK && n.audioGroupIds && i.groupId === n.audioGroupIds[n.urlId] || i.type === u.PlaylistContextType.SUBTITLE_TRACK && n.textGroupIds && i.groupId === n.textGroupIds[n.urlId])) this.redundantFailover(this.currentLevelIndex);
                                            else {
                                                var s, o = !1,
                                                    l = !0;
                                                switch (r.details) {
                                                    case a.ErrorDetails.FRAG_LOAD_ERROR:
                                                    case a.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                                    case a.ErrorDetails.KEY_LOAD_ERROR:
                                                    case a.ErrorDetails.KEY_LOAD_TIMEOUT:
                                                        if (r.frag) {
                                                            var c = this._levels[r.frag.level];
                                                            c ? (c.fragmentError++, c.fragmentError > this.hls.config.fragLoadingMaxRetry && (s = r.frag.level)) : s = r.frag.level
                                                        }
                                                        break;
                                                    case a.ErrorDetails.LEVEL_LOAD_ERROR:
                                                    case a.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                                                        i && (i.deliveryDirectives && (l = !1), s = i.level), o = !0;
                                                        break;
                                                    case a.ErrorDetails.REMUX_ALLOC_ERROR:
                                                        s = r.level, o = !0
                                                }
                                                void 0 !== s && this.recoverLevel(r, s, o, l)
                                            }
                                        }
                                    }, p.recoverLevel = function(t, e, r, i) {
                                        var n = t.details,
                                            a = this._levels[e];
                                        if (a.loadError++, r) {
                                            if (!this.retryLoadingOrFail(t)) return void(this.currentLevelIndex = -1);
                                            t.levelRetry = !0
                                        }
                                        if (i) {
                                            var s = a.url.length;
                                            if (s > 1 && a.loadError < s) t.levelRetry = !0, this.redundantFailover(e);
                                            else if (-1 === this.manualLevelIndex) {
                                                var o = 0 === e ? this._levels.length - 1 : e - 1;
                                                this.currentLevelIndex !== o && 0 === this._levels[o].loadError && (this.warn(n + ": switch to " + o), t.levelRetry = !0, this.hls.nextAutoLevel = o)
                                            }
                                        }
                                    }, p.redundantFailover = function(t) {
                                        var e = this._levels[t],
                                            r = e.url.length;
                                        if (r > 1) {
                                            var i = (e.urlId + 1) % r;
                                            this.warn("Switching to redundant URL-id " + i), this._levels.forEach((function(t) {
                                                t.urlId = i
                                            })), this.level = t
                                        }
                                    }, p.onFragLoaded = function(t, e) {
                                        var r = e.frag;
                                        if (void 0 !== r && r.type === u.PlaylistLevelType.MAIN) {
                                            var i = this._levels[r.level];
                                            void 0 !== i && (i.fragmentError = 0, i.loadError = 0)
                                        }
                                    }, p.onLevelLoaded = function(t, e) {
                                        var r, i, n = e.level,
                                            a = e.details,
                                            s = this._levels[n];
                                        if (!s) return this.warn("Invalid level index " + n), void(null !== (i = e.deliveryDirectives) && void 0 !== i && i.skip && (a.deltaUpdateFailed = !0));
                                        n === this.currentLevelIndex ? (0 === s.fragmentError && (s.loadError = 0, this.retryCount = 0), this.playlistLoaded(n, e, s.details)) : null !== (r = e.deliveryDirectives) && void 0 !== r && r.skip && (a.deltaUpdateFailed = !0)
                                    }, p.onAudioTrackSwitched = function(t, e) {
                                        var r = this.hls.levels[this.currentLevelIndex];
                                        if (r && r.audioGroupIds) {
                                            for (var i = -1, n = this.hls.audioTracks[e.id].groupId, a = 0; a < r.audioGroupIds.length; a++)
                                                if (r.audioGroupIds[a] === n) {
                                                    i = a;
                                                    break
                                                } i !== r.urlId && (r.urlId = i, this.startLoad())
                                        }
                                    }, p.loadPlaylist = function(t) {
                                        var e = this.currentLevelIndex,
                                            r = this._levels[e];
                                        if (this.canLoad && r && r.url.length > 0) {
                                            var i = r.urlId,
                                                a = r.url[i];
                                            if (t) try {
                                                a = t.addDirectives(a)
                                            } catch (t) {
                                                this.warn("Could not construct new URL with HLS Delivery Directives: " + t)
                                            }
                                            this.log("Attempt loading level index " + e + (t ? " at sn " + t.msn + " part " + t.part : "") + " with URL-id " + i + " " + a), this.clearTimer(), this.hls.trigger(n.Events.LEVEL_LOADING, {
                                                url: a,
                                                level: e,
                                                id: i,
                                                deliveryDirectives: t || null
                                            })
                                        }
                                    }, p.removeLevel = function(t, e) {
                                        var r = function(t, r) {
                                                return r !== e
                                            },
                                            i = this._levels.filter((function(i, n) {
                                                return n !== t || i.url.length > 1 && void 0 !== e && (i.url = i.url.filter(r), i.audioGroupIds && (i.audioGroupIds = i.audioGroupIds.filter(r)), i.textGroupIds && (i.textGroupIds = i.textGroupIds.filter(r)), i.urlId = 0, !0)
                                            })).map((function(t, e) {
                                                var r = t.details;
                                                return null != r && r.fragments && r.fragments.forEach((function(t) {
                                                    t.level = e
                                                })), t
                                            }));
                                        this._levels = i, this.hls.trigger(n.Events.LEVELS_UPDATED, {
                                            levels: i
                                        })
                                    }, g = l, (v = [{
                                        key: "levels",
                                        get: function() {
                                            return 0 === this._levels.length ? null : this._levels
                                        }
                                    }, {
                                        key: "level",
                                        get: function() {
                                            return this.currentLevelIndex
                                        },
                                        set: function(t) {
                                            var e, r = this._levels;
                                            if (0 !== r.length && (this.currentLevelIndex !== t || null === (e = r[t]) || void 0 === e || !e.details)) {
                                                if (t < 0 || t >= r.length) {
                                                    var i = t < 0;
                                                    if (this.hls.trigger(n.Events.ERROR, {
                                                            type: a.ErrorTypes.OTHER_ERROR,
                                                            details: a.ErrorDetails.LEVEL_SWITCH_ERROR,
                                                            level: t,
                                                            fatal: i,
                                                            reason: "invalid level idx"
                                                        }), i) return;
                                                    t = Math.min(t, r.length - 1)
                                                }
                                                this.clearTimer();
                                                var s = this.currentLevelIndex,
                                                    o = r[s],
                                                    l = r[t];
                                                this.log("switching to level " + t + " from " + s), this.currentLevelIndex = t;
                                                var u = c({}, l, {
                                                    level: t,
                                                    maxBitrate: l.maxBitrate,
                                                    uri: l.uri,
                                                    urlId: l.urlId
                                                });
                                                delete u._urlId, this.hls.trigger(n.Events.LEVEL_SWITCHING, u);
                                                var d = l.details;
                                                if (!d || d.live) {
                                                    var h = this.switchParams(l.uri, null == o ? void 0 : o.details);
                                                    this.loadPlaylist(h)
                                                }
                                            }
                                        }
                                    }, {
                                        key: "manualLevel",
                                        get: function() {
                                            return this.manualLevelIndex
                                        },
                                        set: function(t) {
                                            this.manualLevelIndex = t, void 0 === this._startLevel && (this._startLevel = t), -1 !== t && (this.level = t)
                                        }
                                    }, {
                                        key: "firstLevel",
                                        get: function() {
                                            return this._firstLevel
                                        },
                                        set: function(t) {
                                            this._firstLevel = t
                                        }
                                    }, {
                                        key: "startLevel",
                                        get: function() {
                                            if (void 0 === this._startLevel) {
                                                var t = this.hls.config.startLevel;
                                                return void 0 !== t ? t : this._firstLevel
                                            }
                                            return this._startLevel
                                        },
                                        set: function(t) {
                                            this._startLevel = t
                                        }
                                    }, {
                                        key: "nextLoadLevel",
                                        get: function() {
                                            return -1 !== this.manualLevelIndex ? this.manualLevelIndex : this.hls.nextAutoLevel
                                        },
                                        set: function(t) {
                                            this.level = t, -1 === this.manualLevelIndex && (this.hls.nextAutoLevel = t)
                                        }
                                    }]) && d(g.prototype, v), l
                                }(l.default)
                        },
                        "./src/controller/level-helper.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "addGroupId", (function() {
                                return a
                            })), r.d(e, "assignTrackIdsByGroup", (function() {
                                return s
                            })), r.d(e, "updatePTS", (function() {
                                return o
                            })), r.d(e, "updateFragPTSDTS", (function() {
                                return u
                            })), r.d(e, "mergeDetails", (function() {
                                return c
                            })), r.d(e, "mapPartIntersection", (function() {
                                return d
                            })), r.d(e, "mapFragmentIntersection", (function() {
                                return h
                            })), r.d(e, "adjustSliding", (function() {
                                return f
                            })), r.d(e, "addSliding", (function() {
                                return g
                            })), r.d(e, "computeReloadInterval", (function() {
                                return v
                            })), r.d(e, "getFragmentWithSN", (function() {
                                return p
                            })), r.d(e, "getPartWith", (function() {
                                return m
                            }));
                            var i = r("./src/polyfills/number.ts"),
                                n = r("./src/utils/logger.ts");

                            function a(t, e, r) {
                                switch (e) {
                                    case "audio":
                                        t.audioGroupIds || (t.audioGroupIds = []), t.audioGroupIds.push(r);
                                        break;
                                    case "text":
                                        t.textGroupIds || (t.textGroupIds = []), t.textGroupIds.push(r)
                                }
                            }

                            function s(t) {
                                var e = {};
                                t.forEach((function(t) {
                                    var r = t.groupId || "";
                                    t.id = e[r] = e[r] || 0, e[r]++
                                }))
                            }

                            function o(t, e, r) {
                                l(t[e], t[r])
                            }

                            function l(t, e) {
                                var r = e.startPTS;
                                if (Object(i.isFiniteNumber)(r)) {
                                    var n, a = 0;
                                    e.sn > t.sn ? (a = r - t.start, n = t) : (a = t.start - r, n = e), n.duration !== a && (n.duration = a)
                                } else e.sn > t.sn ? t.cc === e.cc && t.minEndPTS ? e.start = t.start + (t.minEndPTS - t.start) : e.start = t.start + t.duration : e.start = Math.max(t.start - e.duration, 0)
                            }

                            function u(t, e, r, a, s, o) {
                                a - r <= 0 && (n.logger.warn("Fragment should have a positive duration", e), a = r + e.duration, o = s + e.duration);
                                var u = r,
                                    c = a,
                                    d = e.startPTS,
                                    h = e.endPTS;
                                if (Object(i.isFiniteNumber)(d)) {
                                    var f = Math.abs(d - r);
                                    Object(i.isFiniteNumber)(e.deltaPTS) ? e.deltaPTS = Math.max(f, e.deltaPTS) : e.deltaPTS = f, u = Math.max(r, d), r = Math.min(r, d), s = Math.min(s, e.startDTS), c = Math.min(a, h), a = Math.max(a, h), o = Math.max(o, e.endDTS)
                                }
                                e.duration = a - r;
                                var g = r - e.start;
                                e.appendedPTS = a, e.start = e.startPTS = r, e.maxStartPTS = u, e.startDTS = s, e.endPTS = a, e.minEndPTS = c, e.endDTS = o;
                                var v, p = e.sn;
                                if (!t || p < t.startSN || p > t.endSN) return 0;
                                var m = p - t.startSN,
                                    y = t.fragments;
                                for (y[m] = e, v = m; v > 0; v--) l(y[v], y[v - 1]);
                                for (v = m; v < y.length - 1; v++) l(y[v], y[v + 1]);
                                return t.fragmentHint && l(y[y.length - 1], t.fragmentHint), t.PTSKnown = t.alignedSliding = !0, g
                            }

                            function c(t, e) {
                                for (var r = null, a = t.fragments, s = a.length - 1; s >= 0; s--) {
                                    var o = a[s].initSegment;
                                    if (o) {
                                        r = o;
                                        break
                                    }
                                }
                                t.fragmentHint && delete t.fragmentHint.endPTS;
                                var l, c = 0;
                                if (h(t, e, (function(t, n) {
                                        var a;
                                        t.relurl && (c = t.cc - n.cc), Object(i.isFiniteNumber)(t.startPTS) && Object(i.isFiniteNumber)(t.endPTS) && (n.start = n.startPTS = t.startPTS, n.startDTS = t.startDTS, n.appendedPTS = t.appendedPTS, n.maxStartPTS = t.maxStartPTS, n.endPTS = t.endPTS, n.endDTS = t.endDTS, n.minEndPTS = t.minEndPTS, n.duration = t.endPTS - t.startPTS, n.duration && (l = n), e.PTSKnown = e.alignedSliding = !0), n.elementaryStreams = t.elementaryStreams, n.loader = t.loader, n.stats = t.stats, n.urlId = t.urlId, t.initSegment ? (n.initSegment = t.initSegment, r = t.initSegment) : n.initSegment && n.initSegment.relurl != (null === (a = r) || void 0 === a ? void 0 : a.relurl) || (n.initSegment = r)
                                    })), e.skippedSegments && (e.deltaUpdateFailed = e.fragments.some((function(t) {
                                        return !t
                                    })), e.deltaUpdateFailed)) {
                                    n.logger.warn("[level-helper] Previous playlist missing segments skipped in delta playlist");
                                    for (var g = e.skippedSegments; g--;) e.fragments.shift();
                                    e.startSN = e.fragments[0].sn, e.startCC = e.fragments[0].cc
                                }
                                var v = e.fragments;
                                if (c) {
                                    n.logger.warn("discontinuity sliding from playlist, take drift into account");
                                    for (var p = 0; p < v.length; p++) v[p].cc += c
                                }
                                e.skippedSegments && (e.startCC = e.fragments[0].cc), d(t.partList, e.partList, (function(t, e) {
                                    e.elementaryStreams = t.elementaryStreams, e.stats = t.stats
                                })), l ? u(e, l, l.startPTS, l.endPTS, l.startDTS, l.endDTS) : f(t, e), v.length && (e.totalduration = e.edge - v[0].start), e.driftStartTime = t.driftStartTime, e.driftStart = t.driftStart;
                                var m = e.advancedDateTime;
                                if (e.advanced && m) {
                                    var y = e.edge;
                                    e.driftStart || (e.driftStartTime = m, e.driftStart = y), e.driftEndTime = m, e.driftEnd = y
                                } else e.driftEndTime = t.driftEndTime, e.driftEnd = t.driftEnd, e.advancedDateTime = t.advancedDateTime
                            }

                            function d(t, e, r) {
                                if (t && e)
                                    for (var i = 0, n = 0, a = t.length; n <= a; n++) {
                                        var s = t[n],
                                            o = e[n + i];
                                        s && o && s.index === o.index && s.fragment.sn === o.fragment.sn ? r(s, o) : i--
                                    }
                            }

                            function h(t, e, r) {
                                for (var i = e.skippedSegments, n = Math.max(t.startSN, e.startSN) - e.startSN, a = (t.fragmentHint ? 1 : 0) + (i ? e.endSN : Math.min(t.endSN, e.endSN)) - e.startSN, s = e.startSN - t.startSN, o = e.fragmentHint ? e.fragments.concat(e.fragmentHint) : e.fragments, l = t.fragmentHint ? t.fragments.concat(t.fragmentHint) : t.fragments, u = n; u <= a; u++) {
                                    var c = l[s + u],
                                        d = o[u];
                                    i && !d && u < i && (d = e.fragments[u] = c), c && d && r(c, d)
                                }
                            }

                            function f(t, e) {
                                var r = e.startSN + e.skippedSegments - t.startSN,
                                    i = t.fragments;
                                r < 0 || r >= i.length || g(e, i[r].start)
                            }

                            function g(t, e) {
                                if (e) {
                                    for (var r = t.fragments, i = t.skippedSegments; i < r.length; i++) r[i].start += e;
                                    t.fragmentHint && (t.fragmentHint.start += e)
                                }
                            }

                            function v(t, e) {
                                var r, i = 1e3 * t.levelTargetDuration,
                                    n = i / 2,
                                    a = t.age,
                                    s = a > 0 && a < 3 * i,
                                    o = e.loading.end - e.loading.start,
                                    l = t.availabilityDelay;
                                if (!1 === t.updated)
                                    if (s) {
                                        var u = 333 * t.misses;
                                        r = Math.max(Math.min(n, 2 * o), u), t.availabilityDelay = (t.availabilityDelay || 0) + r
                                    } else r = n;
                                else s ? (l = Math.min(l || i / 2, a), t.availabilityDelay = l, r = l + i - a) : r = i - o;
                                return Math.round(r)
                            }

                            function p(t, e, r) {
                                if (!t || !t.details) return null;
                                var i = t.details,
                                    n = i.fragments[e - i.startSN];
                                return n || ((n = i.fragmentHint) && n.sn === e ? n : e < i.startSN && r && r.sn === e ? r : null)
                            }

                            function m(t, e, r) {
                                if (!t || !t.details) return null;
                                var i = t.details.partList;
                                if (i)
                                    for (var n = i.length; n--;) {
                                        var a = i[n];
                                        if (a.index === r && a.fragment.sn === e) return a
                                    }
                                return null
                            }
                        },
                        "./src/controller/stream-controller.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "default", (function() {
                                return y
                            }));
                            var i = r("./src/polyfills/number.ts"),
                                n = r("./src/controller/base-stream-controller.ts"),
                                a = r("./src/is-supported.ts"),
                                s = r("./src/events.ts"),
                                o = r("./src/utils/buffer-helper.ts"),
                                l = r("./src/controller/fragment-tracker.ts"),
                                u = r("./src/types/loader.ts"),
                                c = r("./src/loader/fragment.ts"),
                                d = r("./src/demux/transmuxer-interface.ts"),
                                h = r("./src/types/transmuxer.ts"),
                                f = r("./src/controller/gap-controller.ts"),
                                g = r("./src/errors.ts"),
                                v = r("./src/utils/logger.ts");

                            function p(t, e) {
                                for (var r = 0; r < e.length; r++) {
                                    var i = e[r];
                                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                                }
                            }

                            function m(t, e) {
                                return (m = Object.setPrototypeOf || function(t, e) {
                                    return t.__proto__ = e, t
                                })(t, e)
                            }
                            var y = function(t) {
                                var e, r;

                                function y(e, r) {
                                    var i;
                                    return (i = t.call(this, e, r, "[stream-controller]") || this).audioCodecSwap = !1, i.gapController = null, i.level = -1, i._forceStartLoad = !1, i.altAudio = !1, i.audioOnly = !1, i.fragPlaying = null, i.onvplaying = null, i.onvseeked = null, i.fragLastKbps = 0, i.stalled = !1, i.couldBacktrack = !1, i.audioCodecSwitch = !1, i.videoBuffer = null, i._registerListeners(), i
                                }
                                r = t, (e = y).prototype = Object.create(r.prototype), e.prototype.constructor = e, m(e, r);
                                var E, T, b = y.prototype;
                                return b._registerListeners = function() {
                                    var t = this.hls;
                                    t.on(s.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.on(s.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(s.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.on(s.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.on(s.Events.LEVEL_LOADING, this.onLevelLoading, this), t.on(s.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.on(s.Events.FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this), t.on(s.Events.ERROR, this.onError, this), t.on(s.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), t.on(s.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), t.on(s.Events.BUFFER_CREATED, this.onBufferCreated, this), t.on(s.Events.BUFFER_FLUSHED, this.onBufferFlushed, this), t.on(s.Events.LEVELS_UPDATED, this.onLevelsUpdated, this), t.on(s.Events.FRAG_BUFFERED, this.onFragBuffered, this)
                                }, b._unregisterListeners = function() {
                                    var t = this.hls;
                                    t.off(s.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.off(s.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(s.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.off(s.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.off(s.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.off(s.Events.FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this), t.off(s.Events.ERROR, this.onError, this), t.off(s.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), t.off(s.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), t.off(s.Events.BUFFER_CREATED, this.onBufferCreated, this), t.off(s.Events.BUFFER_FLUSHED, this.onBufferFlushed, this), t.off(s.Events.LEVELS_UPDATED, this.onLevelsUpdated, this), t.off(s.Events.FRAG_BUFFERED, this.onFragBuffered, this)
                                }, b.onHandlerDestroying = function() {
                                    this._unregisterListeners(), this.onMediaDetaching()
                                }, b.startLoad = function(t) {
                                    if (this.levels) {
                                        var e = this.lastCurrentTime,
                                            r = this.hls;
                                        if (this.stopLoad(), this.setInterval(100), this.level = -1, this.fragLoadError = 0, !this.startFragRequested) {
                                            var i = r.startLevel; - 1 === i && (r.config.testBandwidth ? (i = 0, this.bitrateTest = !0) : i = r.nextAutoLevel), this.level = r.nextLoadLevel = i, this.loadedmetadata = !1
                                        }
                                        e > 0 && -1 === t && (this.log("Override startPosition with lastCurrentTime @" + e.toFixed(3)), t = e), this.state = n.State.IDLE, this.nextLoadPosition = this.startPosition = this.lastCurrentTime = t, this.tick()
                                    } else this._forceStartLoad = !0, this.state = n.State.STOPPED
                                }, b.stopLoad = function() {
                                    this._forceStartLoad = !1, t.prototype.stopLoad.call(this)
                                }, b.doTick = function() {
                                    switch (this.state) {
                                        case n.State.IDLE:
                                            this.doTickIdle();
                                            break;
                                        case n.State.WAITING_LEVEL:
                                            var t, e = this.levels,
                                                r = this.level,
                                                i = null == e || null === (t = e[r]) || void 0 === t ? void 0 : t.details;
                                            if (i && (!i.live || this.levelLastLoaded === this.level)) {
                                                if (this.waitForCdnTuneIn(i)) break;
                                                this.state = n.State.IDLE;
                                                break
                                            }
                                            break;
                                        case n.State.FRAG_LOADING_WAITING_RETRY:
                                            var a, s = self.performance.now(),
                                                o = this.retryDate;
                                            (!o || s >= o || null !== (a = this.media) && void 0 !== a && a.seeking) && (this.log("retryDate reached, switch back to IDLE state"), this.state = n.State.IDLE)
                                    }
                                    this.onTickEnd()
                                }, b.onTickEnd = function() {
                                    t.prototype.onTickEnd.call(this), this.checkBuffer(), this.checkFragmentChanged()
                                }, b.doTickIdle = function() {
                                    var t, e, r = this.hls,
                                        i = this.levelLastLoaded,
                                        a = this.levels,
                                        o = this.media,
                                        d = r.config,
                                        h = r.nextLoadLevel;
                                    if (null !== i && (o || !this.startFragRequested && d.startFragPrefetch) && (!this.altAudio || !this.audioOnly) && a && a[h]) {
                                        var f = a[h];
                                        this.level = r.nextLoadLevel = h;
                                        var g = f.details;
                                        if (!g || this.state === n.State.WAITING_LEVEL || g.live && this.levelLastLoaded !== h) this.state = n.State.WAITING_LEVEL;
                                        else {
                                            var v = this.getFwdBufferInfo(this.mediaBuffer ? this.mediaBuffer : o, u.PlaylistLevelType.MAIN);
                                            if (null !== v && !(v.len >= this.getMaxBufferLength(f.maxBitrate))) {
                                                if (this._streamEnded(v, g)) {
                                                    var p = {};
                                                    return this.altAudio && (p.type = "video"), this.hls.trigger(s.Events.BUFFER_EOS, p), void(this.state = n.State.ENDED)
                                                }
                                                var m = v.end,
                                                    y = this.getNextFragment(m, g);
                                                if (this.couldBacktrack && !this.fragPrevious && y && "initSegment" !== y.sn) {
                                                    var E = y.sn - g.startSN;
                                                    E > 1 && (y = g.fragments[E - 1], this.fragmentTracker.removeFragment(y))
                                                }
                                                if (y && this.fragmentTracker.getState(y) === l.FragmentState.OK && this.nextLoadPosition > m) {
                                                    var T = this.audioOnly && !this.altAudio ? c.ElementaryStreamTypes.AUDIO : c.ElementaryStreamTypes.VIDEO;
                                                    this.afterBufferFlushed(o, T, u.PlaylistLevelType.MAIN), y = this.getNextFragment(this.nextLoadPosition, g)
                                                }
                                                y && (!y.initSegment || y.initSegment.data || this.bitrateTest || (y = y.initSegment), "identity" !== (null === (t = y.decryptdata) || void 0 === t ? void 0 : t.keyFormat) || null !== (e = y.decryptdata) && void 0 !== e && e.key ? this.loadFragment(y, g, m) : this.loadKey(y, g))
                                            }
                                        }
                                    }
                                }, b.loadFragment = function(e, r, i) {
                                    var n, a = this.fragmentTracker.getState(e);
                                    if (this.fragCurrent = e, a === l.FragmentState.BACKTRACKED) {
                                        var s = this.fragmentTracker.getBacktrackData(e);
                                        if (s) return this._handleFragmentLoadProgress(s), void this._handleFragmentLoadComplete(s);
                                        a = l.FragmentState.NOT_LOADED
                                    }
                                    a === l.FragmentState.NOT_LOADED || a === l.FragmentState.PARTIAL ? "initSegment" === e.sn ? this._loadInitSegment(e) : this.bitrateTest ? (e.bitrateTest = !0, this.log("Fragment " + e.sn + " of level " + e.level + " is being downloaded to test bitrate and will not be buffered"), this._loadBitrateTestFrag(e)) : (this.startFragRequested = !0, t.prototype.loadFragment.call(this, e, r, i)) : a === l.FragmentState.APPENDING ? this.reduceMaxBufferLength(e.duration) && this.fragmentTracker.removeFragment(e) : 0 === (null === (n = this.media) || void 0 === n ? void 0 : n.buffered.length) && this.fragmentTracker.removeAllFragments()
                                }, b.getAppendedFrag = function(t) {
                                    var e = this.fragmentTracker.getAppendedFrag(t, u.PlaylistLevelType.MAIN);
                                    return e && "fragment" in e ? e.fragment : e
                                }, b.getBufferedFrag = function(t) {
                                    return this.fragmentTracker.getBufferedFrag(t, u.PlaylistLevelType.MAIN)
                                }, b.followingBufferedFrag = function(t) {
                                    return t ? this.getBufferedFrag(t.end + .5) : null
                                }, b.immediateLevelSwitch = function() {
                                    this.abortCurrentFrag(), this.flushMainBuffer(0, Number.POSITIVE_INFINITY)
                                }, b.nextLevelSwitch = function() {
                                    var t = this.levels,
                                        e = this.media;
                                    if (null != e && e.readyState) {
                                        var r, i = this.getAppendedFrag(e.currentTime);
                                        if (i && i.start > 1 && this.flushMainBuffer(0, i.start - 1), !e.paused && t) {
                                            var n = t[this.hls.nextLoadLevel],
                                                a = this.fragLastKbps;
                                            r = a && this.fragCurrent ? this.fragCurrent.duration * n.maxBitrate / (1e3 * a) + 1 : 0
                                        } else r = 0;
                                        var s = this.getBufferedFrag(e.currentTime + r);
                                        if (s) {
                                            var o = this.followingBufferedFrag(s);
                                            if (o) {
                                                this.abortCurrentFrag();
                                                var l = o.maxStartPTS ? o.maxStartPTS : o.start,
                                                    u = o.duration,
                                                    c = Math.max(s.end, l + Math.min(Math.max(u - this.config.maxFragLookUpTolerance, .5 * u), .75 * u));
                                                this.flushMainBuffer(c, Number.POSITIVE_INFINITY)
                                            }
                                        }
                                    }
                                }, b.abortCurrentFrag = function() {
                                    var t = this.fragCurrent;
                                    this.fragCurrent = null, null != t && t.loader && t.loader.abort(), this.state === n.State.KEY_LOADING && (this.state = n.State.IDLE), this.nextLoadPosition = this.getLoadPosition()
                                }, b.flushMainBuffer = function(e, r) {
                                    t.prototype.flushMainBuffer.call(this, e, r, this.altAudio ? "video" : null)
                                }, b.onMediaAttached = function(e, r) {
                                    t.prototype.onMediaAttached.call(this, e, r);
                                    var i = r.media;
                                    this.onvplaying = this.onMediaPlaying.bind(this), this.onvseeked = this.onMediaSeeked.bind(this), i.addEventListener("playing", this.onvplaying), i.addEventListener("seeked", this.onvseeked), this.gapController = new f.default(this.config, i, this.fragmentTracker, this.hls)
                                }, b.onMediaDetaching = function() {
                                    var e = this.media;
                                    e && (e.removeEventListener("playing", this.onvplaying), e.removeEventListener("seeked", this.onvseeked), this.onvplaying = this.onvseeked = null, this.videoBuffer = null), this.fragPlaying = null, this.gapController && (this.gapController.destroy(), this.gapController = null), t.prototype.onMediaDetaching.call(this)
                                }, b.onMediaPlaying = function() {
                                    this.tick()
                                }, b.onMediaSeeked = function() {
                                    var t = this.media,
                                        e = t ? t.currentTime : null;
                                    Object(i.isFiniteNumber)(e) && this.log("Media seeked to " + e.toFixed(3)), this.tick()
                                }, b.onManifestLoading = function() {
                                    this.log("Trigger BUFFER_RESET"), this.hls.trigger(s.Events.BUFFER_RESET, void 0), this.fragmentTracker.removeAllFragments(), this.couldBacktrack = this.stalled = !1, this.startPosition = this.lastCurrentTime = 0, this.fragPlaying = null
                                }, b.onManifestParsed = function(t, e) {
                                    var r, i = !1,
                                        n = !1;
                                    e.levels.forEach((function(t) {
                                        (r = t.audioCodec) && (-1 !== r.indexOf("mp4a.40.2") && (i = !0), -1 !== r.indexOf("mp4a.40.5") && (n = !0))
                                    })), this.audioCodecSwitch = i && n && !Object(a.changeTypeSupported)(), this.audioCodecSwitch && this.log("Both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"), this.levels = e.levels, this.startFragRequested = !1
                                }, b.onLevelLoading = function(t, e) {
                                    var r = this.levels;
                                    if (r && this.state === n.State.IDLE) {
                                        var i = r[e.level];
                                        (!i.details || i.details.live && this.levelLastLoaded !== e.level || this.waitForCdnTuneIn(i.details)) && (this.state = n.State.WAITING_LEVEL)
                                    }
                                }, b.onLevelLoaded = function(t, e) {
                                    var r, i = this.levels,
                                        a = e.level,
                                        o = e.details,
                                        l = o.totalduration;
                                    if (i) {
                                        this.log("Level " + a + " loaded [" + o.startSN + "," + o.endSN + "], cc [" + o.startCC + ", " + o.endCC + "] duration:" + l);
                                        var u = this.fragCurrent;
                                        !u || this.state !== n.State.FRAG_LOADING && this.state !== n.State.FRAG_LOADING_WAITING_RETRY || u.level !== e.level && u.loader && (this.state = n.State.IDLE, u.loader.abort());
                                        var c = i[a],
                                            d = 0;
                                        if (o.live || null !== (r = c.details) && void 0 !== r && r.live) {
                                            if (o.fragments[0] || (o.deltaUpdateFailed = !0), o.deltaUpdateFailed) return;
                                            d = this.alignPlaylists(o, c.details)
                                        }
                                        if (c.details = o, this.levelLastLoaded = a, this.hls.trigger(s.Events.LEVEL_UPDATED, {
                                                details: o,
                                                level: a
                                            }), this.state === n.State.WAITING_LEVEL) {
                                            if (this.waitForCdnTuneIn(o)) return;
                                            this.state = n.State.IDLE
                                        }
                                        this.startFragRequested ? o.live && this.synchronizeToLiveEdge(o) : this.setStartPosition(o, d), this.tick()
                                    } else this.warn("Levels were reset while loading level " + a)
                                }, b._handleFragmentLoadProgress = function(t) {
                                    var e, r = t.frag,
                                        i = t.part,
                                        n = t.payload,
                                        a = this.levels;
                                    if (a) {
                                        var s = a[r.level],
                                            o = s.details;
                                        if (o) {
                                            var l = s.videoCodec,
                                                c = o.PTSKnown || !o.live,
                                                f = null === (e = r.initSegment) || void 0 === e ? void 0 : e.data,
                                                g = this._getAudioCodec(s),
                                                v = this.transmuxer = this.transmuxer || new d.default(this.hls, u.PlaylistLevelType.MAIN, this._handleTransmuxComplete.bind(this), this._handleTransmuxerFlush.bind(this)),
                                                p = i ? i.index : -1,
                                                m = -1 !== p,
                                                y = new h.ChunkMetadata(r.level, r.sn, r.stats.chunkCount, n.byteLength, p, m),
                                                E = this.initPTS[r.cc];
                                            v.push(n, f, g, l, r, i, o.totalduration, c, y, E)
                                        } else this.warn("Dropping fragment " + r.sn + " of level " + r.level + " after level details were reset")
                                    } else this.warn("Levels were reset while fragment load was in progress. Fragment " + r.sn + " of level " + r.level + " will not be buffered")
                                }, b.onAudioTrackSwitching = function(t, e) {
                                    var r = this.altAudio,
                                        i = !!e.url,
                                        n = e.id;
                                    if (!i) {
                                        if (this.mediaBuffer !== this.media) {
                                            this.log("Switching on main audio, use media.buffered to schedule main fragment loading"), this.mediaBuffer = this.media;
                                            var a = this.fragCurrent;
                                            null != a && a.loader && (this.log("Switching to main audio track, cancel main fragment load"), a.loader.abort()), this.resetTransmuxer(), this.resetLoadingState()
                                        } else this.audioOnly && this.resetTransmuxer();
                                        var o = this.hls;
                                        r && o.trigger(s.Events.BUFFER_FLUSHING, {
                                            startOffset: 0,
                                            endOffset: Number.POSITIVE_INFINITY,
                                            type: "audio"
                                        }), o.trigger(s.Events.AUDIO_TRACK_SWITCHED, {
                                            id: n
                                        })
                                    }
                                }, b.onAudioTrackSwitched = function(t, e) {
                                    var r = e.id,
                                        i = !!this.hls.audioTracks[r].url;
                                    if (i) {
                                        var n = this.videoBuffer;
                                        n && this.mediaBuffer !== n && (this.log("Switching on alternate audio, use video.buffered to schedule main fragment loading"), this.mediaBuffer = n)
                                    }
                                    this.altAudio = i, this.tick()
                                }, b.onBufferCreated = function(t, e) {
                                    var r, i, n = e.tracks,
                                        a = !1;
                                    for (var s in n) {
                                        var o = n[s];
                                        if ("main" === o.id) {
                                            if (i = s, r = o, "video" === s) {
                                                var l = n[s];
                                                l && (this.videoBuffer = l.buffer)
                                            }
                                        } else a = !0
                                    }
                                    a && r ? (this.log("Alternate track found, use " + i + ".buffered to schedule main fragment loading"), this.mediaBuffer = r.buffer) : this.mediaBuffer = this.media
                                }, b.onFragBuffered = function(t, e) {
                                    var r = e.frag,
                                        i = e.part;
                                    if (!r || r.type === u.PlaylistLevelType.MAIN) {
                                        if (this.fragContextChanged(r)) return this.warn("Fragment " + r.sn + (i ? " p: " + i.index : "") + " of level " + r.level + " finished buffering, but was aborted. state: " + this.state), void(this.state === n.State.PARSED && (this.state = n.State.IDLE));
                                        var a = i ? i.stats : r.stats;
                                        this.fragLastKbps = Math.round(8 * a.total / (a.buffering.end - a.loading.first)), "initSegment" !== r.sn && (this.fragPrevious = r), this.fragBufferedComplete(r, i)
                                    }
                                }, b.onError = function(t, e) {
                                    switch (e.details) {
                                        case g.ErrorDetails.FRAG_LOAD_ERROR:
                                        case g.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                        case g.ErrorDetails.KEY_LOAD_ERROR:
                                        case g.ErrorDetails.KEY_LOAD_TIMEOUT:
                                            this.onFragmentOrKeyLoadError(u.PlaylistLevelType.MAIN, e);
                                            break;
                                        case g.ErrorDetails.LEVEL_LOAD_ERROR:
                                        case g.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                                            this.state !== n.State.ERROR && (e.fatal ? (this.warn("" + e.details), this.state = n.State.ERROR) : e.levelRetry || this.state !== n.State.WAITING_LEVEL || (this.state = n.State.IDLE));
                                            break;
                                        case g.ErrorDetails.BUFFER_FULL_ERROR:
                                            if ("main" === e.parent && (this.state === n.State.PARSING || this.state === n.State.PARSED)) {
                                                var r = !0,
                                                    i = this.getFwdBufferInfo(this.media, u.PlaylistLevelType.MAIN);
                                                i && i.len > .5 && (r = !this.reduceMaxBufferLength(i.len)), r && (this.warn("buffer full error also media.currentTime is not buffered, flush main"), this.immediateLevelSwitch()), this.resetLoadingState()
                                            }
                                    }
                                }, b.checkBuffer = function() {
                                    var t = this.media,
                                        e = this.gapController;
                                    if (t && e && t.readyState) {
                                        var r = o.BufferHelper.getBuffered(t);
                                        !this.loadedmetadata && r.length ? (this.loadedmetadata = !0, this.seekToStartPos()) : e.poll(this.lastCurrentTime), this.lastCurrentTime = t.currentTime
                                    }
                                }, b.onFragLoadEmergencyAborted = function() {
                                    this.state = n.State.IDLE, this.loadedmetadata || (this.startFragRequested = !1, this.nextLoadPosition = this.startPosition), this.tickImmediate()
                                }, b.onBufferFlushed = function(t, e) {
                                    var r = e.type;
                                    if (r !== c.ElementaryStreamTypes.AUDIO || this.audioOnly && !this.altAudio) {
                                        var i = (r === c.ElementaryStreamTypes.VIDEO ? this.videoBuffer : this.mediaBuffer) || this.media;
                                        this.afterBufferFlushed(i, r, u.PlaylistLevelType.MAIN)
                                    }
                                }, b.onLevelsUpdated = function(t, e) {
                                    this.levels = e.levels
                                }, b.swapAudioCodec = function() {
                                    this.audioCodecSwap = !this.audioCodecSwap
                                }, b.seekToStartPos = function() {
                                    var t = this.media,
                                        e = t.currentTime,
                                        r = this.startPosition;
                                    if (r >= 0 && e < r) {
                                        if (t.seeking) return void v.logger.log("could not seek to " + r + ", already seeking at " + e);
                                        var i = o.BufferHelper.getBuffered(t),
                                            n = (i.length ? i.start(0) : 0) - r;
                                        n > 0 && n < this.config.maxBufferHole && (v.logger.log("adjusting start position by " + n + " to match buffer start"), r += n, this.startPosition = r), this.log("seek to target start position " + r + " from current time " + e), t.currentTime = r
                                    }
                                }, b._getAudioCodec = function(t) {
                                    var e = this.config.defaultAudioCodec || t.audioCodec;
                                    return this.audioCodecSwap && e && (this.log("Swapping audio codec"), e = -1 !== e.indexOf("mp4a.40.5") ? "mp4a.40.2" : "mp4a.40.5"), e
                                }, b._loadBitrateTestFrag = function(t) {
                                    var e = this;
                                    this._doFragLoad(t).then((function(r) {
                                        var i = e.hls;
                                        if (r && !i.nextLoadLevel && !e.fragContextChanged(t)) {
                                            e.fragLoadError = 0, e.state = n.State.IDLE, e.startFragRequested = !1, e.bitrateTest = !1;
                                            var a = t.stats;
                                            a.parsing.start = a.parsing.end = a.buffering.start = a.buffering.end = self.performance.now(), i.trigger(s.Events.FRAG_LOADED, r)
                                        }
                                    }))
                                }, b._handleTransmuxComplete = function(t) {
                                    var e, r = "main",
                                        a = this.hls,
                                        o = t.remuxResult,
                                        l = t.chunkMeta,
                                        u = this.getCurrentContext(l);
                                    if (!u) return this.warn("The loading context changed while buffering fragment " + l.sn + " of level " + l.level + ". This chunk will not be buffered."), void this.resetLiveStartWhenNotLoaded(l.level);
                                    var d = u.frag,
                                        h = u.part,
                                        f = u.level,
                                        g = o.video,
                                        v = o.text,
                                        p = o.id3,
                                        m = o.initSegment,
                                        y = this.altAudio ? void 0 : o.audio;
                                    if (!this.fragContextChanged(d)) {
                                        if (this.state = n.State.PARSING, m) {
                                            m.tracks && (this._bufferInitSegment(f, m.tracks, d, l), a.trigger(s.Events.FRAG_PARSING_INIT_SEGMENT, {
                                                frag: d,
                                                id: r,
                                                tracks: m.tracks
                                            }));
                                            var E = m.initPTS,
                                                T = m.timescale;
                                            Object(i.isFiniteNumber)(E) && (this.initPTS[d.cc] = E, a.trigger(s.Events.INIT_PTS_FOUND, {
                                                frag: d,
                                                id: r,
                                                initPTS: E,
                                                timescale: T
                                            }))
                                        }
                                        if (g && !1 !== o.independent) {
                                            if (f.details) {
                                                var b = g.startPTS,
                                                    S = g.endPTS,
                                                    L = g.startDTS,
                                                    A = g.endDTS;
                                                if (h) h.elementaryStreams[g.type] = {
                                                    startPTS: b,
                                                    endPTS: S,
                                                    startDTS: L,
                                                    endDTS: A
                                                };
                                                else if (g.firstKeyFrame && g.independent && (this.couldBacktrack = !0), g.dropped && g.independent) {
                                                    if (this.getLoadPosition() + this.config.maxBufferHole < b) return void this.backtrack(d);
                                                    d.setElementaryStreamInfo(g.type, d.start, S, d.start, A, !0)
                                                }
                                                d.setElementaryStreamInfo(g.type, b, S, L, A), this.bufferFragmentData(g, d, h, l)
                                            }
                                        } else if (!1 === o.independent) return void this.backtrack(d);
                                        if (y) {
                                            var D = y.startPTS,
                                                k = y.endPTS,
                                                R = y.startDTS,
                                                _ = y.endDTS;
                                            h && (h.elementaryStreams[c.ElementaryStreamTypes.AUDIO] = {
                                                startPTS: D,
                                                endPTS: k,
                                                startDTS: R,
                                                endDTS: _
                                            }), d.setElementaryStreamInfo(c.ElementaryStreamTypes.AUDIO, D, k, R, _), this.bufferFragmentData(y, d, h, l)
                                        }
                                        if (null != p && null !== (e = p.samples) && void 0 !== e && e.length) {
                                            var I = {
                                                frag: d,
                                                id: r,
                                                samples: p.samples
                                            };
                                            a.trigger(s.Events.FRAG_PARSING_METADATA, I)
                                        }
                                        if (v) {
                                            var w = {
                                                frag: d,
                                                id: r,
                                                samples: v.samples
                                            };
                                            a.trigger(s.Events.FRAG_PARSING_USERDATA, w)
                                        }
                                    }
                                }, b._bufferInitSegment = function(t, e, r, i) {
                                    var a = this;
                                    if (this.state === n.State.PARSING) {
                                        this.audioOnly = !!e.audio && !e.video, this.altAudio && !this.audioOnly && delete e.audio;
                                        var o = e.audio,
                                            l = e.video,
                                            u = e.audiovideo;
                                        if (o) {
                                            var c = t.audioCodec,
                                                d = navigator.userAgent.toLowerCase();
                                            this.audioCodecSwitch && (c && (c = -1 !== c.indexOf("mp4a.40.5") ? "mp4a.40.2" : "mp4a.40.5"), 1 !== o.metadata.channelCount && -1 === d.indexOf("firefox") && (c = "mp4a.40.5")), -1 !== d.indexOf("android") && "audio/mpeg" !== o.container && (c = "mp4a.40.2", this.log("Android: force audio codec to " + c)), t.audioCodec && t.audioCodec !== c && this.log('Swapping manifest audio codec "' + t.audioCodec + '" for "' + c + '"'), o.levelCodec = c, o.id = "main", this.log("Init audio buffer, container:" + o.container + ", codecs[selected/level/parsed]=[" + (c || "") + "/" + (t.audioCodec || "") + "/" + o.codec + "]")
                                        }
                                        l && (l.levelCodec = t.videoCodec, l.id = "main", this.log("Init video buffer, container:" + l.container + ", codecs[level/parsed]=[" + (t.videoCodec || "") + "/" + l.codec + "]")), u && this.log("Init audiovideo buffer, container:" + u.container + ", codecs[level/parsed]=[" + (t.attrs.CODECS || "") + "/" + u.codec + "]"), this.hls.trigger(s.Events.BUFFER_CODECS, e), Object.keys(e).forEach((function(t) {
                                            var n = e[t].initSegment;
                                            null != n && n.byteLength && a.hls.trigger(s.Events.BUFFER_APPENDING, {
                                                type: t,
                                                data: n,
                                                frag: r,
                                                part: null,
                                                chunkMeta: i,
                                                parent: r.type
                                            })
                                        })), this.tick()
                                    }
                                }, b.backtrack = function(t) {
                                    this.couldBacktrack = !0, this.resetTransmuxer(), this.flushBufferGap(t);
                                    var e = this.fragmentTracker.backtrack(t);
                                    this.fragPrevious = null, this.nextLoadPosition = t.start, e ? this.resetFragmentLoading(t) : this.state = n.State.BACKTRACKING
                                }, b.checkFragmentChanged = function() {
                                    var t = this.media,
                                        e = null;
                                    if (t && t.readyState > 1 && !1 === t.seeking) {
                                        var r = t.currentTime;
                                        if (o.BufferHelper.isBuffered(t, r) ? e = this.getAppendedFrag(r) : o.BufferHelper.isBuffered(t, r + .1) && (e = this.getAppendedFrag(r + .1)), e) {
                                            var i = this.fragPlaying,
                                                n = e.level;
                                            i && e.sn === i.sn && i.level === n && e.urlId === i.urlId || (this.hls.trigger(s.Events.FRAG_CHANGED, {
                                                frag: e
                                            }), i && i.level === n || this.hls.trigger(s.Events.LEVEL_SWITCHED, {
                                                level: n
                                            }), this.fragPlaying = e)
                                        }
                                    }
                                }, E = y, (T = [{
                                    key: "nextLevel",
                                    get: function() {
                                        var t = this.nextBufferedFrag;
                                        return t ? t.level : -1
                                    }
                                }, {
                                    key: "currentLevel",
                                    get: function() {
                                        var t = this.media;
                                        if (t) {
                                            var e = this.getAppendedFrag(t.currentTime);
                                            if (e) return e.level
                                        }
                                        return -1
                                    }
                                }, {
                                    key: "nextBufferedFrag",
                                    get: function() {
                                        var t = this.media;
                                        if (t) {
                                            var e = this.getAppendedFrag(t.currentTime);
                                            return this.followingBufferedFrag(e)
                                        }
                                        return null
                                    }
                                }, {
                                    key: "forceStartLoad",
                                    get: function() {
                                        return this._forceStartLoad
                                    }
                                }]) && p(E.prototype, T), y
                            }(n.default)
                        },
                        "./src/controller/subtitle-stream-controller.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "SubtitleStreamController", (function() {
                                return v
                            }));
                            var i = r("./src/events.ts"),
                                n = r("./src/utils/logger.ts"),
                                a = r("./src/utils/buffer-helper.ts"),
                                s = r("./src/controller/fragment-finders.ts"),
                                o = r("./src/utils/discontinuities.ts"),
                                l = r("./src/controller/level-helper.ts"),
                                u = r("./src/controller/fragment-tracker.ts"),
                                c = r("./src/controller/base-stream-controller.ts"),
                                d = r("./src/types/loader.ts"),
                                h = r("./src/types/level.ts");

                            function f(t, e) {
                                for (var r = 0; r < e.length; r++) {
                                    var i = e[r];
                                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                                }
                            }

                            function g(t, e) {
                                return (g = Object.setPrototypeOf || function(t, e) {
                                    return t.__proto__ = e, t
                                })(t, e)
                            }
                            var v = function(t) {
                                var e, r;

                                function v(e, r) {
                                    var i;
                                    return (i = t.call(this, e, r, "[subtitle-stream-controller]") || this).levels = [], i.currentTrackId = -1, i.tracksBuffered = [], i.mainDetails = null, i._registerListeners(), i
                                }
                                r = t, (e = v).prototype = Object.create(r.prototype), e.prototype.constructor = e, g(e, r);
                                var p, m, y = v.prototype;
                                return y.onHandlerDestroying = function() {
                                    this._unregisterListeners(), this.mainDetails = null
                                }, y._registerListeners = function() {
                                    var t = this.hls;
                                    t.on(i.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.on(i.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(i.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.on(i.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.on(i.Events.ERROR, this.onError, this), t.on(i.Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), t.on(i.Events.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch, this), t.on(i.Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), t.on(i.Events.SUBTITLE_FRAG_PROCESSED, this.onSubtitleFragProcessed, this), t.on(i.Events.BUFFER_FLUSHING, this.onBufferFlushing, this)
                                }, y._unregisterListeners = function() {
                                    var t = this.hls;
                                    t.off(i.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.off(i.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(i.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.off(i.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.off(i.Events.ERROR, this.onError, this), t.off(i.Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), t.off(i.Events.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch, this), t.off(i.Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), t.off(i.Events.SUBTITLE_FRAG_PROCESSED, this.onSubtitleFragProcessed, this), t.off(i.Events.BUFFER_FLUSHING, this.onBufferFlushing, this)
                                }, y.startLoad = function() {
                                    this.stopLoad(), this.state = c.State.IDLE, this.setInterval(500), this.tick()
                                }, y.onManifestLoading = function() {
                                    this.mainDetails = null, this.fragmentTracker.removeAllFragments()
                                }, y.onLevelLoaded = function(t, e) {
                                    this.mainDetails = e.details
                                }, y.onSubtitleFragProcessed = function(t, e) {
                                    var r = e.frag,
                                        i = e.success;
                                    if (this.fragPrevious = r, this.state = c.State.IDLE, i) {
                                        var n = this.tracksBuffered[this.currentTrackId];
                                        if (n) {
                                            for (var a, s = r.start, o = 0; o < n.length; o++)
                                                if (s >= n[o].start && s <= n[o].end) {
                                                    a = n[o];
                                                    break
                                                } var l = r.start + r.duration;
                                            a ? a.end = l : (a = {
                                                start: s,
                                                end: l
                                            }, n.push(a)), this.fragmentTracker.fragBuffered(r)
                                        }
                                    }
                                }, y.onBufferFlushing = function(t, e) {
                                    var r = e.startOffset,
                                        i = e.endOffset;
                                    if (0 === r && i !== Number.POSITIVE_INFINITY) {
                                        var n = this.currentTrackId,
                                            a = this.levels;
                                        if (!a.length || !a[n] || !a[n].details) return;
                                        var s = i - a[n].details.targetduration;
                                        if (s <= 0) return;
                                        e.endOffsetSubtitles = Math.max(0, s), this.tracksBuffered.forEach((function(t) {
                                            for (var e = 0; e < t.length;)
                                                if (t[e].end <= s) t.shift();
                                                else {
                                                    if (!(t[e].start < s)) break;
                                                    t[e].start = s, e++
                                                }
                                        })), this.fragmentTracker.removeFragmentsInRange(r, s, d.PlaylistLevelType.SUBTITLE)
                                    }
                                }, y.onError = function(t, e) {
                                    var r, i = e.frag;
                                    i && i.type === d.PlaylistLevelType.SUBTITLE && (null !== (r = this.fragCurrent) && void 0 !== r && r.loader && this.fragCurrent.loader.abort(), this.state = c.State.IDLE)
                                }, y.onSubtitleTracksUpdated = function(t, e) {
                                    var r = this,
                                        i = e.subtitleTracks;
                                    this.tracksBuffered = [], this.levels = i.map((function(t) {
                                        return new h.Level(t)
                                    })), this.fragmentTracker.removeAllFragments(), this.fragPrevious = null, this.levels.forEach((function(t) {
                                        r.tracksBuffered[t.id] = []
                                    })), this.mediaBuffer = null
                                }, y.onSubtitleTrackSwitch = function(t, e) {
                                    if (this.currentTrackId = e.id, this.levels.length && -1 !== this.currentTrackId) {
                                        var r = this.levels[this.currentTrackId];
                                        null != r && r.details ? (this.mediaBuffer = this.mediaBufferTimeRanges, this.setInterval(500)) : this.mediaBuffer = null
                                    } else this.clearInterval()
                                }, y.onSubtitleTrackLoaded = function(t, e) {
                                    var r, i = e.details,
                                        n = e.id,
                                        a = this.currentTrackId,
                                        u = this.levels;
                                    if (u.length) {
                                        var d = u[a];
                                        if (!(n >= u.length || n !== a) && d) {
                                            if (this.mediaBuffer = this.mediaBufferTimeRanges, i.live || null !== (r = d.details) && void 0 !== r && r.live) {
                                                var h = this.mainDetails;
                                                if (i.deltaUpdateFailed || !h) return;
                                                var f = h.fragments[0];
                                                d.details ? 0 === this.alignPlaylists(i, d.details) && f && Object(l.addSliding)(i, f.start) : i.hasProgramDateTime && h.hasProgramDateTime ? Object(o.alignPDT)(i, h) : f && Object(l.addSliding)(i, f.start)
                                            }
                                            d.details = i, this.levelLastLoaded = n, this.tick(), i.live && !this.fragCurrent && this.media && this.state === c.State.IDLE && (Object(s.findFragmentByPTS)(null, i.fragments, this.media.currentTime, 0) || (this.warn("Subtitle playlist not aligned with playback"), d.details = void 0))
                                        }
                                    }
                                }, y._handleFragmentLoadComplete = function(t) {
                                    var e = t.frag,
                                        r = t.payload,
                                        n = e.decryptdata,
                                        a = this.hls;
                                    if (!this.fragContextChanged(e) && r && r.byteLength > 0 && n && n.key && n.iv && "AES-128" === n.method) {
                                        var s = performance.now();
                                        this.decrypter.webCryptoDecrypt(new Uint8Array(r), n.key.buffer, n.iv.buffer).then((function(t) {
                                            var r = performance.now();
                                            a.trigger(i.Events.FRAG_DECRYPTED, {
                                                frag: e,
                                                payload: t,
                                                stats: {
                                                    tstart: s,
                                                    tdecrypt: r
                                                }
                                            })
                                        }))
                                    }
                                }, y.doTick = function() {
                                    if (this.media) {
                                        if (this.state === c.State.IDLE) {
                                            var t, e = this.currentTrackId,
                                                r = this.levels;
                                            if (!r.length || !r[e] || !r[e].details) return;
                                            var o = r[e].details,
                                                l = o.targetduration,
                                                d = this.config,
                                                h = this.media,
                                                f = a.BufferHelper.bufferedInfo(this.mediaBufferTimeRanges, h.currentTime - l, d.maxBufferHole),
                                                g = f.end;
                                            if (f.len > this.getMaxBufferLength() + l) return;
                                            console.assert(o, "Subtitle track details are defined on idle subtitle stream controller tick");
                                            var v, p = o.fragments,
                                                m = p.length,
                                                y = o.edge,
                                                E = this.fragPrevious;
                                            if (g < y) {
                                                var T = d.maxFragLookUpTolerance;
                                                E && o.hasProgramDateTime && (v = Object(s.findFragmentByPDT)(p, E.endProgramDateTime, T)), v || !(v = Object(s.findFragmentByPTS)(E, p, g, T)) && E && E.start < p[0].start && (v = p[0])
                                            } else v = p[m - 1];
                                            null !== (t = v) && void 0 !== t && t.encrypted ? (n.logger.log("Loading key for " + v.sn), this.state = c.State.KEY_LOADING, this.hls.trigger(i.Events.KEY_LOADING, {
                                                frag: v
                                            })) : v && this.fragmentTracker.getState(v) === u.FragmentState.NOT_LOADED && this.loadFragment(v, o, g)
                                        }
                                    } else this.state = c.State.IDLE
                                }, y.loadFragment = function(e, r, i) {
                                    this.fragCurrent = e, t.prototype.loadFragment.call(this, e, r, i)
                                }, p = v, (m = [{
                                    key: "mediaBufferTimeRanges",
                                    get: function() {
                                        return this.tracksBuffered[this.currentTrackId] || []
                                    }
                                }]) && f(p.prototype, m), v
                            }(c.default)
                        },
                        "./src/controller/subtitle-track-controller.ts": function(t, e, r) {
                            "use strict";
                            r.r(e);
                            var i = r("./src/events.ts"),
                                n = r("./src/utils/texttrack-utils.ts"),
                                a = r("./src/controller/base-playlist-controller.ts"),
                                s = r("./src/types/loader.ts");

                            function o(t, e) {
                                for (var r = 0; r < e.length; r++) {
                                    var i = e[r];
                                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                                }
                            }

                            function l(t, e) {
                                return (l = Object.setPrototypeOf || function(t, e) {
                                    return t.__proto__ = e, t
                                })(t, e)
                            }
                            var u = function(t) {
                                var e, r;

                                function a(e) {
                                    var r;
                                    return (r = t.call(this, e, "[subtitle-track-controller]") || this).media = null, r.tracks = [], r.groupId = null, r.tracksInGroup = [], r.trackId = -1, r.selectDefaultTrack = !0, r.queuedDefaultTrack = -1, r.trackChangeListener = function() {
                                        return r.onTextTracksChanged()
                                    }, r.asyncPollTrackChange = function() {
                                        return r.pollTrackChange(0)
                                    }, r.useTextTrackPolling = !1, r.subtitlePollingInterval = -1, r.subtitleDisplay = !0, r.registerListeners(), r
                                }
                                r = t, (e = a).prototype = Object.create(r.prototype), e.prototype.constructor = e, l(e, r);
                                var u, d, h = a.prototype;
                                return h.destroy = function() {
                                    this.unregisterListeners(), this.tracks.length = 0, this.tracksInGroup.length = 0, this.trackChangeListener = this.asyncPollTrackChange = null, t.prototype.destroy.call(this)
                                }, h.registerListeners = function() {
                                    var t = this.hls;
                                    t.on(i.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.on(i.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(i.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.on(i.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.on(i.Events.LEVEL_LOADING, this.onLevelLoading, this), t.on(i.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), t.on(i.Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), t.on(i.Events.ERROR, this.onError, this)
                                }, h.unregisterListeners = function() {
                                    var t = this.hls;
                                    t.off(i.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.off(i.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(i.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.off(i.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.off(i.Events.LEVEL_LOADING, this.onLevelLoading, this), t.off(i.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), t.off(i.Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), t.off(i.Events.ERROR, this.onError, this)
                                }, h.onMediaAttached = function(t, e) {
                                    this.media = e.media, this.media && (this.queuedDefaultTrack > -1 && (this.subtitleTrack = this.queuedDefaultTrack, this.queuedDefaultTrack = -1), this.useTextTrackPolling = !(this.media.textTracks && "onchange" in this.media.textTracks), this.useTextTrackPolling ? this.pollTrackChange(500) : this.media.textTracks.addEventListener("change", this.asyncPollTrackChange))
                                }, h.pollTrackChange = function(t) {
                                    self.clearInterval(this.subtitlePollingInterval), this.subtitlePollingInterval = self.setInterval(this.trackChangeListener, t)
                                }, h.onMediaDetaching = function() {
                                    this.media && (self.clearInterval(this.subtitlePollingInterval), this.useTextTrackPolling || this.media.textTracks.removeEventListener("change", this.asyncPollTrackChange), this.trackId > -1 && (this.queuedDefaultTrack = this.trackId), c(this.media.textTracks).forEach((function(t) {
                                        Object(n.clearCurrentCues)(t)
                                    })), this.subtitleTrack = -1, this.media = null)
                                }, h.onManifestLoading = function() {
                                    this.tracks = [], this.groupId = null, this.tracksInGroup = [], this.trackId = -1, this.selectDefaultTrack = !0
                                }, h.onManifestParsed = function(t, e) {
                                    this.tracks = e.subtitleTracks
                                }, h.onSubtitleTrackLoaded = function(t, e) {
                                    var r = e.id,
                                        i = e.details,
                                        n = this.trackId,
                                        a = this.tracksInGroup[n];
                                    if (a) {
                                        var s = a.details;
                                        a.details = e.details, this.log("subtitle track " + r + " loaded [" + i.startSN + "-" + i.endSN + "]"), r === this.trackId && (this.retryCount = 0, this.playlistLoaded(r, e, s))
                                    } else this.warn("Invalid subtitle track id " + r)
                                }, h.onLevelLoading = function(t, e) {
                                    this.switchLevel(e.level)
                                }, h.onLevelSwitching = function(t, e) {
                                    this.switchLevel(e.level)
                                }, h.switchLevel = function(t) {
                                    var e = this.hls.levels[t];
                                    if (null != e && e.textGroupIds) {
                                        var r = e.textGroupIds[e.urlId];
                                        if (this.groupId !== r) {
                                            var n = this.tracksInGroup ? this.tracksInGroup[this.trackId] : void 0,
                                                a = this.tracks.filter((function(t) {
                                                    return !r || t.groupId === r
                                                }));
                                            this.tracksInGroup = a;
                                            var s = this.findTrackId(null == n ? void 0 : n.name) || this.findTrackId();
                                            this.groupId = r;
                                            var o = {
                                                subtitleTracks: a
                                            };
                                            this.log("Updating subtitle tracks, " + a.length + ' track(s) found in "' + r + '" group-id'), this.hls.trigger(i.Events.SUBTITLE_TRACKS_UPDATED, o), -1 !== s && this.setSubtitleTrack(s, n)
                                        }
                                    }
                                }, h.findTrackId = function(t) {
                                    for (var e = this.tracksInGroup, r = 0; r < e.length; r++) {
                                        var i = e[r];
                                        if ((!this.selectDefaultTrack || i.default) && (!t || t === i.name)) return i.id
                                    }
                                    return -1
                                }, h.onError = function(e, r) {
                                    t.prototype.onError.call(this, e, r), !r.fatal && r.context && r.context.type === s.PlaylistContextType.SUBTITLE_TRACK && r.context.id === this.trackId && r.context.groupId === this.groupId && this.retryLoadingOrFail(r)
                                }, h.loadPlaylist = function(t) {
                                    var e = this.tracksInGroup[this.trackId];
                                    if (this.shouldLoadTrack(e)) {
                                        var r = e.id,
                                            n = e.groupId,
                                            a = e.url;
                                        if (t) try {
                                            a = t.addDirectives(a)
                                        } catch (t) {
                                            this.warn("Could not construct new URL with HLS Delivery Directives: " + t)
                                        }
                                        this.log("Loading subtitle playlist for id " + r), this.hls.trigger(i.Events.SUBTITLE_TRACK_LOADING, {
                                            url: a,
                                            id: r,
                                            groupId: n,
                                            deliveryDirectives: t || null
                                        })
                                    }
                                }, h.toggleTrackModes = function(t) {
                                    var e = this,
                                        r = this.media,
                                        i = this.subtitleDisplay,
                                        n = this.trackId;
                                    if (r) {
                                        var a = c(r.textTracks),
                                            s = a.filter((function(t) {
                                                return t.groupId === e.groupId
                                            }));
                                        if (-1 === t)[].slice.call(a).forEach((function(t) {
                                            t.mode = "disabled"
                                        }));
                                        else {
                                            var o = s[n];
                                            o && (o.mode = "disabled")
                                        }
                                        var l = s[t];
                                        l && (l.mode = i ? "showing" : "hidden")
                                    }
                                }, h.setSubtitleTrack = function(t, e) {
                                    var r, n = this.tracksInGroup;
                                    if (this.media) {
                                        if (this.trackId !== t && this.toggleTrackModes(t), !(this.trackId === t && (-1 === t || null !== (r = n[t]) && void 0 !== r && r.details) || t < -1 || t >= n.length)) {
                                            this.clearTimer();
                                            var a = n[t];
                                            if (this.log("Switching to subtitle track " + t), this.trackId = t, a) {
                                                var s = a.id,
                                                    o = a.groupId,
                                                    l = void 0 === o ? "" : o,
                                                    u = a.name,
                                                    c = a.type,
                                                    d = a.url;
                                                this.hls.trigger(i.Events.SUBTITLE_TRACK_SWITCH, {
                                                    id: s,
                                                    groupId: l,
                                                    name: u,
                                                    type: c,
                                                    url: d
                                                });
                                                var h = this.switchParams(a.url, null == e ? void 0 : e.details);
                                                this.loadPlaylist(h)
                                            } else this.hls.trigger(i.Events.SUBTITLE_TRACK_SWITCH, {
                                                id: t
                                            })
                                        }
                                    } else this.queuedDefaultTrack = t
                                }, h.onTextTracksChanged = function() {
                                    if (this.useTextTrackPolling || self.clearInterval(this.subtitlePollingInterval), this.media && this.hls.config.renderTextTracksNatively) {
                                        for (var t = -1, e = c(this.media.textTracks), r = 0; r < e.length; r++)
                                            if ("hidden" === e[r].mode) t = r;
                                            else if ("showing" === e[r].mode) {
                                            t = r;
                                            break
                                        }
                                        this.subtitleTrack !== t && (this.subtitleTrack = t)
                                    }
                                }, u = a, (d = [{
                                    key: "subtitleTracks",
                                    get: function() {
                                        return this.tracksInGroup
                                    }
                                }, {
                                    key: "subtitleTrack",
                                    get: function() {
                                        return this.trackId
                                    },
                                    set: function(t) {
                                        this.selectDefaultTrack = !1;
                                        var e = this.tracksInGroup ? this.tracksInGroup[this.trackId] : void 0;
                                        this.setSubtitleTrack(t, e)
                                    }
                                }]) && o(u.prototype, d), a
                            }(a.default);

                            function c(t) {
                                for (var e = [], r = 0; r < t.length; r++) {
                                    var i = t[r];
                                    "subtitles" === i.kind && i.label && e.push(t[r])
                                }
                                return e
                            }
                            e.default = u
                        },
                        "./src/controller/timeline-controller.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "TimelineController", (function() {
                                return h
                            }));
                            var i = r("./src/polyfills/number.ts"),
                                n = r("./src/events.ts"),
                                a = r("./src/utils/cea-608-parser.ts"),
                                s = r("./src/utils/output-filter.ts"),
                                o = r("./src/utils/webvtt-parser.ts"),
                                l = r("./src/utils/texttrack-utils.ts"),
                                u = r("./src/utils/imsc1-ttml-parser.ts"),
                                c = r("./src/types/loader.ts"),
                                d = r("./src/utils/logger.ts"),
                                h = function() {
                                    function t(t) {
                                        if (this.hls = void 0, this.media = null, this.config = void 0, this.enabled = !0, this.Cues = void 0, this.textTracks = [], this.tracks = [], this.initPTS = [], this.timescale = [], this.unparsedVttFrags = [], this.captionsTracks = {}, this.nonNativeCaptionsTracks = {}, this.cea608Parser1 = void 0, this.cea608Parser2 = void 0, this.lastSn = -1, this.prevCC = -1, this.vttCCs = {
                                                ccOffset: 0,
                                                presentationOffset: 0,
                                                0: {
                                                    start: 0,
                                                    prevCC: -1,
                                                    new: !1
                                                }
                                            }, this.captionsProperties = void 0, this.hls = t, this.config = t.config, this.Cues = t.config.cueHandler, this.captionsProperties = {
                                                textTrack1: {
                                                    label: this.config.captionsTextTrack1Label,
                                                    languageCode: this.config.captionsTextTrack1LanguageCode
                                                },
                                                textTrack2: {
                                                    label: this.config.captionsTextTrack2Label,
                                                    languageCode: this.config.captionsTextTrack2LanguageCode
                                                },
                                                textTrack3: {
                                                    label: this.config.captionsTextTrack3Label,
                                                    languageCode: this.config.captionsTextTrack3LanguageCode
                                                },
                                                textTrack4: {
                                                    label: this.config.captionsTextTrack4Label,
                                                    languageCode: this.config.captionsTextTrack4LanguageCode
                                                }
                                            }, this.config.enableCEA708Captions) {
                                            var e = new s.default(this, "textTrack1"),
                                                r = new s.default(this, "textTrack2"),
                                                i = new s.default(this, "textTrack3"),
                                                o = new s.default(this, "textTrack4");
                                            this.cea608Parser1 = new a.default(1, e, r), this.cea608Parser2 = new a.default(3, i, o)
                                        }
                                        t.on(n.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), t.on(n.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(n.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.on(n.Events.MANIFEST_LOADED, this.onManifestLoaded, this), t.on(n.Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), t.on(n.Events.FRAG_LOADING, this.onFragLoading, this), t.on(n.Events.FRAG_LOADED, this.onFragLoaded, this), t.on(n.Events.FRAG_PARSING_USERDATA, this.onFragParsingUserdata, this), t.on(n.Events.FRAG_DECRYPTED, this.onFragDecrypted, this), t.on(n.Events.INIT_PTS_FOUND, this.onInitPtsFound, this), t.on(n.Events.SUBTITLE_TRACKS_CLEARED, this.onSubtitleTracksCleared, this), t.on(n.Events.BUFFER_FLUSHING, this.onBufferFlushing, this)
                                    }
                                    var e = t.prototype;
                                    return e.destroy = function() {
                                        var t = this.hls;
                                        t.off(n.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), t.off(n.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(n.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.off(n.Events.MANIFEST_LOADED, this.onManifestLoaded, this), t.off(n.Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), t.off(n.Events.FRAG_LOADING, this.onFragLoading, this), t.off(n.Events.FRAG_LOADED, this.onFragLoaded, this), t.off(n.Events.FRAG_PARSING_USERDATA, this.onFragParsingUserdata, this), t.off(n.Events.FRAG_DECRYPTED, this.onFragDecrypted, this), t.off(n.Events.INIT_PTS_FOUND, this.onInitPtsFound, this), t.off(n.Events.SUBTITLE_TRACKS_CLEARED, this.onSubtitleTracksCleared, this), t.off(n.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), this.hls = this.config = this.cea608Parser1 = this.cea608Parser2 = null
                                    }, e.addCues = function(t, e, r, i, a) {
                                        for (var s, o, l, u, c = !1, d = a.length; d--;) {
                                            var h = a[d],
                                                f = (s = h[0], o = h[1], l = e, u = r, Math.min(o, u) - Math.max(s, l));
                                            if (f >= 0 && (h[0] = Math.min(h[0], e), h[1] = Math.max(h[1], r), c = !0, f / (r - e) > .5)) return
                                        }
                                        if (c || a.push([e, r]), this.config.renderTextTracksNatively) {
                                            var g = this.captionsTracks[t];
                                            this.Cues.newCue(g, e, r, i)
                                        } else {
                                            var v = this.Cues.newCue(null, e, r, i);
                                            this.hls.trigger(n.Events.CUES_PARSED, {
                                                type: "captions",
                                                cues: v,
                                                track: t
                                            })
                                        }
                                    }, e.onInitPtsFound = function(t, e) {
                                        var r = this,
                                            i = e.frag,
                                            a = e.id,
                                            s = e.initPTS,
                                            o = e.timescale,
                                            l = this.unparsedVttFrags;
                                        "main" === a && (this.initPTS[i.cc] = s, this.timescale[i.cc] = o), l.length && (this.unparsedVttFrags = [], l.forEach((function(t) {
                                            r.onFragLoaded(n.Events.FRAG_LOADED, t)
                                        })))
                                    }, e.getExistingTrack = function(t) {
                                        var e = this.media;
                                        if (e)
                                            for (var r = 0; r < e.textTracks.length; r++) {
                                                var i = e.textTracks[r];
                                                if (i[t]) return i
                                            }
                                        return null
                                    }, e.createCaptionsTrack = function(t) {
                                        this.config.renderTextTracksNatively ? this.createNativeTrack(t) : this.createNonNativeTrack(t)
                                    }, e.createNativeTrack = function(t) {
                                        if (!this.captionsTracks[t]) {
                                            var e = this.captionsProperties,
                                                r = this.captionsTracks,
                                                i = this.media,
                                                n = e[t],
                                                a = n.label,
                                                s = n.languageCode,
                                                o = this.getExistingTrack(t);
                                            if (o) r[t] = o, Object(l.clearCurrentCues)(r[t]), Object(l.sendAddTrackEvent)(r[t], i);
                                            else {
                                                var u = this.createTextTrack("captions", a, s);
                                                u && (u[t] = !0, r[t] = u)
                                            }
                                        }
                                    }, e.createNonNativeTrack = function(t) {
                                        if (!this.nonNativeCaptionsTracks[t]) {
                                            var e = this.captionsProperties[t];
                                            if (e) {
                                                var r = {
                                                    _id: t,
                                                    label: e.label,
                                                    kind: "captions",
                                                    default: !!e.media && !!e.media.default,
                                                    closedCaptions: e.media
                                                };
                                                this.nonNativeCaptionsTracks[t] = r, this.hls.trigger(n.Events.NON_NATIVE_TEXT_TRACKS_FOUND, {
                                                    tracks: [r]
                                                })
                                            }
                                        }
                                    }, e.createTextTrack = function(t, e, r) {
                                        var i = this.media;
                                        if (i) return i.addTextTrack(t, e, r)
                                    }, e.onMediaAttaching = function(t, e) {
                                        this.media = e.media, this._cleanTracks()
                                    }, e.onMediaDetaching = function() {
                                        var t = this.captionsTracks;
                                        Object.keys(t).forEach((function(e) {
                                            Object(l.clearCurrentCues)(t[e]), delete t[e]
                                        })), this.nonNativeCaptionsTracks = {}
                                    }, e.onManifestLoading = function() {
                                        this.lastSn = -1, this.prevCC = -1, this.vttCCs = {
                                            ccOffset: 0,
                                            presentationOffset: 0,
                                            0: {
                                                start: 0,
                                                prevCC: -1,
                                                new: !1
                                            }
                                        }, this._cleanTracks(), this.tracks = [], this.captionsTracks = {}, this.nonNativeCaptionsTracks = {}, this.textTracks = [], this.unparsedVttFrags = this.unparsedVttFrags || [], this.initPTS = [], this.timescale = [], this.cea608Parser1 && this.cea608Parser2 && (this.cea608Parser1.reset(), this.cea608Parser2.reset())
                                    }, e._cleanTracks = function() {
                                        var t = this.media;
                                        if (t) {
                                            var e = t.textTracks;
                                            if (e)
                                                for (var r = 0; r < e.length; r++) Object(l.clearCurrentCues)(e[r])
                                        }
                                    }, e.onSubtitleTracksUpdated = function(t, e) {
                                        var r = this;
                                        this.textTracks = [];
                                        var i = e.subtitleTracks || [],
                                            a = i.some((function(t) {
                                                return t.textCodec === u.IMSC1_CODEC
                                            }));
                                        if (this.config.enableWebVTT || a && this.config.enableIMSC1) {
                                            var s = this.tracks && i && this.tracks.length === i.length;
                                            if (this.tracks = i || [], this.config.renderTextTracksNatively) {
                                                var o = this.media ? this.media.textTracks : [];
                                                this.tracks.forEach((function(t, e) {
                                                    var i;
                                                    if (e < o.length) {
                                                        for (var n = null, a = 0; a < o.length; a++)
                                                            if (f(o[a], t)) {
                                                                n = o[a];
                                                                break
                                                            } n && (i = n)
                                                    }
                                                    i ? Object(l.clearCurrentCues)(i) : (i = r.createTextTrack("subtitles", t.name, t.lang)) && (i.mode = "disabled"), i && (i.groupId = t.groupId, r.textTracks.push(i))
                                                }))
                                            } else if (!s && this.tracks && this.tracks.length) {
                                                var c = this.tracks.map((function(t) {
                                                    return {
                                                        label: t.name,
                                                        kind: t.type.toLowerCase(),
                                                        default: t.default,
                                                        subtitleTrack: t
                                                    }
                                                }));
                                                this.hls.trigger(n.Events.NON_NATIVE_TEXT_TRACKS_FOUND, {
                                                    tracks: c
                                                })
                                            }
                                        }
                                    }, e.onManifestLoaded = function(t, e) {
                                        var r = this;
                                        this.config.enableCEA708Captions && e.captions && e.captions.forEach((function(t) {
                                            var e = /(?:CC|SERVICE)([1-4])/.exec(t.instreamId);
                                            if (e) {
                                                var i = "textTrack" + e[1],
                                                    n = r.captionsProperties[i];
                                                n && (n.label = t.name, t.lang && (n.languageCode = t.lang), n.media = t)
                                            }
                                        }))
                                    }, e.onFragLoading = function(t, e) {
                                        var r = this.cea608Parser1,
                                            i = this.cea608Parser2,
                                            n = this.lastSn;
                                        if (this.enabled && r && i && e.frag.type === c.PlaylistLevelType.MAIN) {
                                            var a = e.frag.sn;
                                            a !== n + 1 && (r.reset(), i.reset()), this.lastSn = a
                                        }
                                    }, e.onFragLoaded = function(t, e) {
                                        var r = e.frag,
                                            a = e.payload,
                                            s = this.initPTS,
                                            o = this.unparsedVttFrags;
                                        if (r.type === c.PlaylistLevelType.SUBTITLE)
                                            if (a.byteLength) {
                                                if (!Object(i.isFiniteNumber)(s[r.cc])) return o.push(e), void(s.length && this.hls.trigger(n.Events.SUBTITLE_FRAG_PROCESSED, {
                                                    success: !1,
                                                    frag: r,
                                                    error: new Error("Missing initial subtitle PTS")
                                                }));
                                                var l = r.decryptdata;
                                                if (null == l || null == l.key || "AES-128" !== l.method) {
                                                    var d = this.tracks[r.level],
                                                        h = this.vttCCs;
                                                    h[r.cc] || (h[r.cc] = {
                                                        start: r.start,
                                                        prevCC: this.prevCC,
                                                        new: !0
                                                    }, this.prevCC = r.cc), d && d.textCodec === u.IMSC1_CODEC ? this._parseIMSC1(r, a) : this._parseVTTs(r, a, h)
                                                }
                                            } else this.hls.trigger(n.Events.SUBTITLE_FRAG_PROCESSED, {
                                                success: !1,
                                                frag: r,
                                                error: new Error("Empty subtitle payload")
                                            })
                                    }, e._parseIMSC1 = function(t, e) {
                                        var r = this,
                                            i = this.hls;
                                        Object(u.parseIMSC1)(e, this.initPTS[t.cc], this.timescale[t.cc], (function(e) {
                                            r._appendCues(e, t.level), i.trigger(n.Events.SUBTITLE_FRAG_PROCESSED, {
                                                success: !0,
                                                frag: t
                                            })
                                        }), (function(e) {
                                            d.logger.log("Failed to parse IMSC1: " + e), i.trigger(n.Events.SUBTITLE_FRAG_PROCESSED, {
                                                success: !1,
                                                frag: t,
                                                error: e
                                            })
                                        }))
                                    }, e._parseVTTs = function(t, e, r) {
                                        var i = this,
                                            a = this.hls;
                                        Object(o.parseWebVTT)(e, this.initPTS[t.cc], this.timescale[t.cc], r, t.cc, t.start, (function(e) {
                                            i._appendCues(e, t.level), a.trigger(n.Events.SUBTITLE_FRAG_PROCESSED, {
                                                success: !0,
                                                frag: t
                                            })
                                        }), (function(r) {
                                            i._fallbackToIMSC1(t, e), d.logger.log("Failed to parse VTT cue: " + r), a.trigger(n.Events.SUBTITLE_FRAG_PROCESSED, {
                                                success: !1,
                                                frag: t,
                                                error: r
                                            })
                                        }))
                                    }, e._fallbackToIMSC1 = function(t, e) {
                                        var r = this,
                                            i = this.tracks[t.level];
                                        i.textCodec || Object(u.parseIMSC1)(e, this.initPTS[t.cc], this.timescale[t.cc], (function() {
                                            i.textCodec = u.IMSC1_CODEC, r._parseIMSC1(t, e)
                                        }), (function() {
                                            i.textCodec = "wvtt"
                                        }))
                                    }, e._appendCues = function(t, e) {
                                        var r = this.hls;
                                        if (this.config.renderTextTracksNatively) {
                                            var i = this.textTracks[e];
                                            if ("disabled" === i.mode) return;
                                            t.forEach((function(t) {
                                                return Object(l.addCueToTrack)(i, t)
                                            }))
                                        } else {
                                            var a = this.tracks[e].default ? "default" : "subtitles" + e;
                                            r.trigger(n.Events.CUES_PARSED, {
                                                type: "subtitles",
                                                cues: t,
                                                track: a
                                            })
                                        }
                                    }, e.onFragDecrypted = function(t, e) {
                                        var r = e.frag;
                                        if (r.type === c.PlaylistLevelType.SUBTITLE) {
                                            if (!Object(i.isFiniteNumber)(this.initPTS[r.cc])) return void this.unparsedVttFrags.push(e);
                                            this.onFragLoaded(n.Events.FRAG_LOADED, e)
                                        }
                                    }, e.onSubtitleTracksCleared = function() {
                                        this.tracks = [], this.captionsTracks = {}
                                    }, e.onFragParsingUserdata = function(t, e) {
                                        var r = this.cea608Parser1,
                                            i = this.cea608Parser2;
                                        if (this.enabled && r && i)
                                            for (var n = 0; n < e.samples.length; n++) {
                                                var a = e.samples[n].bytes;
                                                if (a) {
                                                    var s = this.extractCea608Data(a);
                                                    r.addData(e.samples[n].pts, s[0]), i.addData(e.samples[n].pts, s[1])
                                                }
                                            }
                                    }, e.onBufferFlushing = function(t, e) {
                                        var r = e.startOffset,
                                            i = e.endOffset,
                                            n = e.endOffsetSubtitles,
                                            a = e.type,
                                            s = this.media;
                                        if (s && !(s.currentTime < i)) {
                                            if (!a || "video" === a) {
                                                var o = this.captionsTracks;
                                                Object.keys(o).forEach((function(t) {
                                                    return Object(l.removeCuesInRange)(o[t], r, i)
                                                }))
                                            }
                                            if (this.config.renderTextTracksNatively && 0 === r && void 0 !== n) {
                                                var u = this.textTracks;
                                                Object.keys(u).forEach((function(t) {
                                                    return Object(l.removeCuesInRange)(u[t], r, n)
                                                }))
                                            }
                                        }
                                    }, e.extractCea608Data = function(t) {
                                        for (var e = 31 & t[0], r = 2, i = [
                                                [],
                                                []
                                            ], n = 0; n < e; n++) {
                                            var a = t[r++],
                                                s = 127 & t[r++],
                                                o = 127 & t[r++],
                                                l = 3 & a;
                                            0 === s && 0 === o || 0 != (4 & a) && (0 !== l && 1 !== l || (i[l].push(s), i[l].push(o)))
                                        }
                                        return i
                                    }, t
                                }();

                            function f(t, e) {
                                return t && t.label === e.name && !(t.textTrack1 || t.textTrack2)
                            }
                        },
                        "./src/crypt/aes-crypto.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "default", (function() {
                                return i
                            }));
                            var i = function() {
                                function t(t, e) {
                                    this.subtle = void 0, this.aesIV = void 0, this.subtle = t, this.aesIV = e
                                }
                                return t.prototype.decrypt = function(t, e) {
                                    return this.subtle.decrypt({
                                        name: "AES-CBC",
                                        iv: this.aesIV
                                    }, e, t)
                                }, t
                            }()
                        },
                        "./src/crypt/aes-decryptor.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "removePadding", (function() {
                                return n
                            })), r.d(e, "default", (function() {
                                return a
                            }));
                            var i = r("./src/utils/typed-array.ts");

                            function n(t) {
                                var e = t.byteLength,
                                    r = e && new DataView(t.buffer).getUint8(e - 1);
                                return r ? Object(i.sliceUint8)(t, 0, e - r) : t
                            }
                            var a = function() {
                                function t() {
                                    this.rcon = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], this.subMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)], this.invSubMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)], this.sBox = new Uint32Array(256), this.invSBox = new Uint32Array(256), this.key = new Uint32Array(0), this.ksRows = 0, this.keySize = 0, this.keySchedule = void 0, this.invKeySchedule = void 0, this.initTable()
                                }
                                var e = t.prototype;
                                return e.uint8ArrayToUint32Array_ = function(t) {
                                    for (var e = new DataView(t), r = new Uint32Array(4), i = 0; i < 4; i++) r[i] = e.getUint32(4 * i);
                                    return r
                                }, e.initTable = function() {
                                    var t = this.sBox,
                                        e = this.invSBox,
                                        r = this.subMix,
                                        i = r[0],
                                        n = r[1],
                                        a = r[2],
                                        s = r[3],
                                        o = this.invSubMix,
                                        l = o[0],
                                        u = o[1],
                                        c = o[2],
                                        d = o[3],
                                        h = new Uint32Array(256),
                                        f = 0,
                                        g = 0,
                                        v = 0;
                                    for (v = 0; v < 256; v++) h[v] = v < 128 ? v << 1 : v << 1 ^ 283;
                                    for (v = 0; v < 256; v++) {
                                        var p = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4;
                                        p = p >>> 8 ^ 255 & p ^ 99, t[f] = p, e[p] = f;
                                        var m = h[f],
                                            y = h[m],
                                            E = h[y],
                                            T = 257 * h[p] ^ 16843008 * p;
                                        i[f] = T << 24 | T >>> 8, n[f] = T << 16 | T >>> 16, a[f] = T << 8 | T >>> 24, s[f] = T, T = 16843009 * E ^ 65537 * y ^ 257 * m ^ 16843008 * f, l[p] = T << 24 | T >>> 8, u[p] = T << 16 | T >>> 16, c[p] = T << 8 | T >>> 24, d[p] = T, f ? (f = m ^ h[h[h[E ^ m]]], g ^= h[h[g]]) : f = g = 1
                                    }
                                }, e.expandKey = function(t) {
                                    for (var e = this.uint8ArrayToUint32Array_(t), r = !0, i = 0; i < e.length && r;) r = e[i] === this.key[i], i++;
                                    if (!r) {
                                        this.key = e;
                                        var n = this.keySize = e.length;
                                        if (4 !== n && 6 !== n && 8 !== n) throw new Error("Invalid aes key size=" + n);
                                        var a, s, o, l, u = this.ksRows = 4 * (n + 6 + 1),
                                            c = this.keySchedule = new Uint32Array(u),
                                            d = this.invKeySchedule = new Uint32Array(u),
                                            h = this.sBox,
                                            f = this.rcon,
                                            g = this.invSubMix,
                                            v = g[0],
                                            p = g[1],
                                            m = g[2],
                                            y = g[3];
                                        for (a = 0; a < u; a++) a < n ? o = c[a] = e[a] : (l = o, a % n == 0 ? (l = h[(l = l << 8 | l >>> 24) >>> 24] << 24 | h[l >>> 16 & 255] << 16 | h[l >>> 8 & 255] << 8 | h[255 & l], l ^= f[a / n | 0] << 24) : n > 6 && a % n == 4 && (l = h[l >>> 24] << 24 | h[l >>> 16 & 255] << 16 | h[l >>> 8 & 255] << 8 | h[255 & l]), c[a] = o = (c[a - n] ^ l) >>> 0);
                                        for (s = 0; s < u; s++) a = u - s, l = 3 & s ? c[a] : c[a - 4], d[s] = s < 4 || a <= 4 ? l : v[h[l >>> 24]] ^ p[h[l >>> 16 & 255]] ^ m[h[l >>> 8 & 255]] ^ y[h[255 & l]], d[s] = d[s] >>> 0
                                    }
                                }, e.networkToHostOrderSwap = function(t) {
                                    return t << 24 | (65280 & t) << 8 | (16711680 & t) >> 8 | t >>> 24
                                }, e.decrypt = function(t, e, r) {
                                    for (var i, n, a, s, o, l, u, c, d, h, f, g, v, p, m = this.keySize + 6, y = this.invKeySchedule, E = this.invSBox, T = this.invSubMix, b = T[0], S = T[1], L = T[2], A = T[3], D = this.uint8ArrayToUint32Array_(r), k = D[0], R = D[1], _ = D[2], I = D[3], w = new Int32Array(t), C = new Int32Array(w.length), O = this.networkToHostOrderSwap; e < w.length;) {
                                        for (d = O(w[e]), h = O(w[e + 1]), f = O(w[e + 2]), g = O(w[e + 3]), o = d ^ y[0], l = g ^ y[1], u = f ^ y[2], c = h ^ y[3], v = 4, p = 1; p < m; p++) i = b[o >>> 24] ^ S[l >> 16 & 255] ^ L[u >> 8 & 255] ^ A[255 & c] ^ y[v], n = b[l >>> 24] ^ S[u >> 16 & 255] ^ L[c >> 8 & 255] ^ A[255 & o] ^ y[v + 1], a = b[u >>> 24] ^ S[c >> 16 & 255] ^ L[o >> 8 & 255] ^ A[255 & l] ^ y[v + 2], s = b[c >>> 24] ^ S[o >> 16 & 255] ^ L[l >> 8 & 255] ^ A[255 & u] ^ y[v + 3], o = i, l = n, u = a, c = s, v += 4;
                                        i = E[o >>> 24] << 24 ^ E[l >> 16 & 255] << 16 ^ E[u >> 8 & 255] << 8 ^ E[255 & c] ^ y[v], n = E[l >>> 24] << 24 ^ E[u >> 16 & 255] << 16 ^ E[c >> 8 & 255] << 8 ^ E[255 & o] ^ y[v + 1], a = E[u >>> 24] << 24 ^ E[c >> 16 & 255] << 16 ^ E[o >> 8 & 255] << 8 ^ E[255 & l] ^ y[v + 2], s = E[c >>> 24] << 24 ^ E[o >> 16 & 255] << 16 ^ E[l >> 8 & 255] << 8 ^ E[255 & u] ^ y[v + 3], C[e] = O(i ^ k), C[e + 1] = O(s ^ R), C[e + 2] = O(a ^ _), C[e + 3] = O(n ^ I), k = d, R = h, _ = f, I = g, e += 4
                                    }
                                    return C.buffer
                                }, t
                            }()
                        },
                        "./src/crypt/decrypter.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "default", (function() {
                                return u
                            }));
                            var i = r("./src/crypt/aes-crypto.ts"),
                                n = r("./src/crypt/fast-aes-key.ts"),
                                a = r("./src/crypt/aes-decryptor.ts"),
                                s = r("./src/utils/logger.ts"),
                                o = r("./src/utils/mp4-tools.ts"),
                                l = r("./src/utils/typed-array.ts"),
                                u = function() {
                                    function t(t, e, r) {
                                        var i = (void 0 === r ? {} : r).removePKCS7Padding,
                                            n = void 0 === i || i;
                                        if (this.logEnabled = !0, this.observer = void 0, this.config = void 0, this.removePKCS7Padding = void 0, this.subtle = null, this.softwareDecrypter = null, this.key = null, this.fastAesKey = null, this.remainderData = null, this.currentIV = null, this.currentResult = null, this.observer = t, this.config = e, this.removePKCS7Padding = n, n) try {
                                            var a = self.crypto;
                                            a && (this.subtle = a.subtle || a.webkitSubtle)
                                        } catch (t) {}
                                        null === this.subtle && (this.config.enableSoftwareAES = !0)
                                    }
                                    var e = t.prototype;
                                    return e.destroy = function() {
                                        this.observer = null
                                    }, e.isSync = function() {
                                        return this.config.enableSoftwareAES
                                    }, e.flush = function() {
                                        var t = this.currentResult;
                                        if (t) {
                                            var e = new Uint8Array(t);
                                            return this.reset(), this.removePKCS7Padding ? Object(a.removePadding)(e) : e
                                        }
                                        this.reset()
                                    }, e.reset = function() {
                                        this.currentResult = null, this.currentIV = null, this.remainderData = null, this.softwareDecrypter && (this.softwareDecrypter = null)
                                    }, e.decrypt = function(t, e, r, i) {
                                        if (this.config.enableSoftwareAES) {
                                            this.softwareDecrypt(new Uint8Array(t), e, r);
                                            var n = this.flush();
                                            n && i(n.buffer)
                                        } else this.webCryptoDecrypt(new Uint8Array(t), e, r).then(i)
                                    }, e.softwareDecrypt = function(t, e, r) {
                                        var i = this.currentIV,
                                            n = this.currentResult,
                                            s = this.remainderData;
                                        this.logOnce("JS AES decrypt"), s && (t = Object(o.appendUint8Array)(s, t), this.remainderData = null);
                                        var u = this.getValidChunk(t);
                                        if (!u.length) return null;
                                        i && (r = i);
                                        var c = this.softwareDecrypter;
                                        c || (c = this.softwareDecrypter = new a.default), c.expandKey(e);
                                        var d = n;
                                        return this.currentResult = c.decrypt(u.buffer, 0, r), this.currentIV = Object(l.sliceUint8)(u, -16).buffer, d || null
                                    }, e.webCryptoDecrypt = function(t, e, r) {
                                        var a = this,
                                            s = this.subtle;
                                        return this.key === e && this.fastAesKey || (this.key = e, this.fastAesKey = new n.default(s, e)), this.fastAesKey.expandKey().then((function(e) {
                                            return s ? new i.default(s, r).decrypt(t.buffer, e) : Promise.reject(new Error("web crypto not initialized"))
                                        })).catch((function(i) {
                                            return a.onWebCryptoError(i, t, e, r)
                                        }))
                                    }, e.onWebCryptoError = function(t, e, r, i) {
                                        return s.logger.warn("[decrypter.ts]: WebCrypto Error, disable WebCrypto API:", t), this.config.enableSoftwareAES = !0, this.logEnabled = !0, this.softwareDecrypt(e, r, i)
                                    }, e.getValidChunk = function(t) {
                                        var e = t,
                                            r = t.length - t.length % 16;
                                        return r !== t.length && (e = Object(l.sliceUint8)(t, 0, r), this.remainderData = Object(l.sliceUint8)(t, r)), e
                                    }, e.logOnce = function(t) {
                                        this.logEnabled && (s.logger.log("[decrypter.ts]: " + t), this.logEnabled = !1)
                                    }, t
                                }()
                        },
                        "./src/crypt/fast-aes-key.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "default", (function() {
                                return i
                            }));
                            var i = function() {
                                function t(t, e) {
                                    this.subtle = void 0, this.key = void 0, this.subtle = t, this.key = e
                                }
                                return t.prototype.expandKey = function() {
                                    return this.subtle.importKey("raw", this.key, {
                                        name: "AES-CBC"
                                    }, !1, ["encrypt", "decrypt"])
                                }, t
                            }()
                        },
                        "./src/demux/aacdemuxer.ts": function(t, e, r) {
                            "use strict";
                            r.r(e);
                            var i = r("./src/demux/base-audio-demuxer.ts"),
                                n = r("./src/demux/adts.ts"),
                                a = r("./src/utils/logger.ts"),
                                s = r("./src/demux/id3.ts");

                            function o(t, e) {
                                return (o = Object.setPrototypeOf || function(t, e) {
                                    return t.__proto__ = e, t
                                })(t, e)
                            }
                            var l = function(t) {
                                var e, r;

                                function i(e, r) {
                                    var i;
                                    return (i = t.call(this) || this).observer = void 0, i.config = void 0, i.observer = e, i.config = r, i
                                }
                                r = t, (e = i).prototype = Object.create(r.prototype), e.prototype.constructor = e, o(e, r);
                                var l = i.prototype;
                                return l.resetInitSegment = function(e, r, i) {
                                    t.prototype.resetInitSegment.call(this, e, r, i), this._audioTrack = {
                                        container: "audio/adts",
                                        type: "audio",
                                        id: 0,
                                        pid: -1,
                                        sequenceNumber: 0,
                                        isAAC: !0,
                                        samples: [],
                                        manifestCodec: e,
                                        duration: i,
                                        inputTimeScale: 9e4,
                                        dropped: 0
                                    }
                                }, i.probe = function(t) {
                                    if (!t) return !1;
                                    for (var e = (s.getID3Data(t, 0) || []).length, r = t.length; e < r; e++)
                                        if (n.probe(t, e)) return a.logger.log("ADTS sync word found !"), !0;
                                    return !1
                                }, l.canParse = function(t, e) {
                                    return n.canParse(t, e)
                                }, l.appendFrame = function(t, e, r) {
                                    n.initTrackConfig(t, this.observer, e, r, t.manifestCodec);
                                    var i = n.appendFrame(t, e, r, this.initPTS, this.frameIndex);
                                    if (i && 0 === i.missing) return i
                                }, i
                            }(i.default);
                            l.minProbeByteLength = 9, e.default = l
                        },
                        "./src/demux/adts.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "getAudioConfig", (function() {
                                return s
                            })), r.d(e, "isHeaderPattern", (function() {
                                return o
                            })), r.d(e, "getHeaderLength", (function() {
                                return l
                            })), r.d(e, "getFullFrameLength", (function() {
                                return u
                            })), r.d(e, "canGetFrameLength", (function() {
                                return c
                            })), r.d(e, "isHeader", (function() {
                                return d
                            })), r.d(e, "canParse", (function() {
                                return h
                            })), r.d(e, "probe", (function() {
                                return f
                            })), r.d(e, "initTrackConfig", (function() {
                                return g
                            })), r.d(e, "getFrameDuration", (function() {
                                return v
                            })), r.d(e, "parseFrameHeader", (function() {
                                return p
                            })), r.d(e, "appendFrame", (function() {
                                return m
                            }));
                            var i = r("./src/utils/logger.ts"),
                                n = r("./src/errors.ts"),
                                a = r("./src/events.ts");

                            function s(t, e, r, s) {
                                var o, l, u, c, d = navigator.userAgent.toLowerCase(),
                                    h = s,
                                    f = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];
                                o = 1 + ((192 & e[r + 2]) >>> 6);
                                var g = (60 & e[r + 2]) >>> 2;
                                if (!(g > f.length - 1)) return u = (1 & e[r + 2]) << 2, u |= (192 & e[r + 3]) >>> 6, i.logger.log("manifest codec:" + s + ", ADTS type:" + o + ", samplingIndex:" + g), /firefox/i.test(d) ? g >= 6 ? (o = 5, c = new Array(4), l = g - 3) : (o = 2, c = new Array(2), l = g) : -1 !== d.indexOf("android") ? (o = 2, c = new Array(2), l = g) : (o = 5, c = new Array(4), s && (-1 !== s.indexOf("mp4a.40.29") || -1 !== s.indexOf("mp4a.40.5")) || !s && g >= 6 ? l = g - 3 : ((s && -1 !== s.indexOf("mp4a.40.2") && (g >= 6 && 1 === u || /vivaldi/i.test(d)) || !s && 1 === u) && (o = 2, c = new Array(2)), l = g)), c[0] = o << 3, c[0] |= (14 & g) >> 1, c[1] |= (1 & g) << 7, c[1] |= u << 3, 5 === o && (c[1] |= (14 & l) >> 1, c[2] = (1 & l) << 7, c[2] |= 8, c[3] = 0), {
                                    config: c,
                                    samplerate: f[g],
                                    channelCount: u,
                                    codec: "mp4a.40." + o,
                                    manifestCodec: h
                                };
                                t.trigger(a.Events.ERROR, {
                                    type: n.ErrorTypes.MEDIA_ERROR,
                                    details: n.ErrorDetails.FRAG_PARSING_ERROR,
                                    fatal: !0,
                                    reason: "invalid ADTS sampling index:" + g
                                })
                            }

                            function o(t, e) {
                                return 255 === t[e] && 240 == (246 & t[e + 1])
                            }

                            function l(t, e) {
                                return 1 & t[e + 1] ? 7 : 9
                            }

                            function u(t, e) {
                                return (3 & t[e + 3]) << 11 | t[e + 4] << 3 | (224 & t[e + 5]) >>> 5
                            }

                            function c(t, e) {
                                return e + 5 < t.length
                            }

                            function d(t, e) {
                                return e + 1 < t.length && o(t, e)
                            }

                            function h(t, e) {
                                return c(t, e) && o(t, e) && u(t, e) <= t.length - e
                            }

                            function f(t, e) {
                                if (d(t, e)) {
                                    var r = l(t, e);
                                    if (e + r >= t.length) return !1;
                                    var i = u(t, e);
                                    if (i <= r) return !1;
                                    var n = e + i;
                                    return n === t.length || d(t, n)
                                }
                                return !1
                            }

                            function g(t, e, r, n, a) {
                                if (!t.samplerate) {
                                    var o = s(e, r, n, a);
                                    if (!o) return;
                                    t.config = o.config, t.samplerate = o.samplerate, t.channelCount = o.channelCount, t.codec = o.codec, t.manifestCodec = o.manifestCodec, i.logger.log("parsed codec:" + t.codec + ", rate:" + o.samplerate + ", channels:" + o.channelCount)
                                }
                            }

                            function v(t) {
                                return 9216e4 / t
                            }

                            function p(t, e, r, i, n) {
                                var a = l(t, e),
                                    s = u(t, e);
                                if ((s -= a) > 0) return {
                                    headerLength: a,
                                    frameLength: s,
                                    stamp: r + i * n
                                }
                            }

                            function m(t, e, r, i, n) {
                                var a = p(e, r, i, n, v(t.samplerate));
                                if (a) {
                                    var s, o = a.frameLength,
                                        l = a.headerLength,
                                        u = a.stamp,
                                        c = l + o,
                                        d = Math.max(0, r + c - e.length);
                                    d ? (s = new Uint8Array(c - l)).set(e.subarray(r + l, e.length), 0) : s = e.subarray(r + l, r + c);
                                    var h = {
                                        unit: s,
                                        pts: u
                                    };
                                    return d || t.samples.push(h), {
                                        sample: h,
                                        length: c,
                                        missing: d
                                    }
                                }
                            }
                        },
                        "./src/demux/base-audio-demuxer.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "initPTSFn", (function() {
                                return u
                            }));
                            var i = r("./src/polyfills/number.ts"),
                                n = r("./src/demux/id3.ts"),
                                a = r("./src/demux/dummy-demuxed-track.ts"),
                                s = r("./src/utils/mp4-tools.ts"),
                                o = r("./src/utils/typed-array.ts"),
                                l = function() {
                                    function t() {
                                        this._audioTrack = void 0, this._id3Track = void 0, this.frameIndex = 0, this.cachedData = null, this.initPTS = null
                                    }
                                    var e = t.prototype;
                                    return e.resetInitSegment = function(t, e, r) {
                                        this._id3Track = {
                                            type: "id3",
                                            id: 0,
                                            pid: -1,
                                            inputTimeScale: 9e4,
                                            sequenceNumber: 0,
                                            samples: [],
                                            dropped: 0
                                        }
                                    }, e.resetTimeStamp = function() {}, e.resetContiguity = function() {}, e.canParse = function(t, e) {
                                        return !1
                                    }, e.appendFrame = function(t, e, r) {}, e.demux = function(t, e) {
                                        this.cachedData && (t = Object(s.appendUint8Array)(this.cachedData, t), this.cachedData = null);
                                        var r, i, l = n.getID3Data(t, 0),
                                            c = l ? l.length : 0,
                                            d = this._audioTrack,
                                            h = this._id3Track,
                                            f = l ? n.getTimeStamp(l) : void 0,
                                            g = t.length;
                                        for (0 !== this.frameIndex && null !== this.initPTS || (this.initPTS = u(f, e)), l && l.length > 0 && h.samples.push({
                                                pts: this.initPTS,
                                                dts: this.initPTS,
                                                data: l
                                            }), i = this.initPTS; c < g;) {
                                            if (this.canParse(t, c)) {
                                                var v = this.appendFrame(d, t, c);
                                                v ? (this.frameIndex++, i = v.sample.pts, r = c += v.length) : c = g
                                            } else n.canParse(t, c) ? (l = n.getID3Data(t, c), h.samples.push({
                                                pts: i,
                                                dts: i,
                                                data: l
                                            }), r = c += l.length) : c++;
                                            if (c === g && r !== g) {
                                                var p = Object(o.sliceUint8)(t, r);
                                                this.cachedData ? this.cachedData = Object(s.appendUint8Array)(this.cachedData, p) : this.cachedData = p
                                            }
                                        }
                                        return {
                                            audioTrack: d,
                                            avcTrack: Object(a.dummyTrack)(),
                                            id3Track: h,
                                            textTrack: Object(a.dummyTrack)()
                                        }
                                    }, e.demuxSampleAes = function(t, e, r) {
                                        return Promise.reject(new Error("[" + this + "] This demuxer does not support Sample-AES decryption"))
                                    }, e.flush = function(t) {
                                        var e = this.cachedData;
                                        return e && (this.cachedData = null, this.demux(e, 0)), this.frameIndex = 0, {
                                            audioTrack: this._audioTrack,
                                            avcTrack: Object(a.dummyTrack)(),
                                            id3Track: this._id3Track,
                                            textTrack: Object(a.dummyTrack)()
                                        }
                                    }, e.destroy = function() {}, t
                                }(),
                                u = function(t, e) {
                                    return Object(i.isFiniteNumber)(t) ? 90 * t : 9e4 * e
                                };
                            e.default = l
                        },
                        "./src/demux/chunk-cache.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "default", (function() {
                                return i
                            }));
                            var i = function() {
                                function t() {
                                    this.chunks = [], this.dataLength = 0
                                }
                                var e = t.prototype;
                                return e.push = function(t) {
                                    this.chunks.push(t), this.dataLength += t.length
                                }, e.flush = function() {
                                    var t, e = this.chunks,
                                        r = this.dataLength;
                                    return e.length ? (t = 1 === e.length ? e[0] : function(t, e) {
                                        for (var r = new Uint8Array(e), i = 0, n = 0; n < t.length; n++) {
                                            var a = t[n];
                                            r.set(a, i), i += a.length
                                        }
                                        return r
                                    }(e, r), this.reset(), t) : new Uint8Array(0)
                                }, e.reset = function() {
                                    this.chunks.length = 0, this.dataLength = 0
                                }, t
                            }()
                        },
                        "./src/demux/dummy-demuxed-track.ts": function(t, e, r) {
                            "use strict";

                            function i() {
                                return {
                                    type: "",
                                    id: -1,
                                    pid: -1,
                                    inputTimeScale: 9e4,
                                    sequenceNumber: -1,
                                    samples: [],
                                    dropped: 0
                                }
                            }
                            r.r(e), r.d(e, "dummyTrack", (function() {
                                return i
                            }))
                        },
                        "./src/demux/exp-golomb.ts": function(t, e, r) {
                            "use strict";
                            r.r(e);
                            var i = r("./src/utils/logger.ts"),
                                n = function() {
                                    function t(t) {
                                        this.data = void 0, this.bytesAvailable = void 0, this.word = void 0, this.bitsAvailable = void 0, this.data = t, this.bytesAvailable = t.byteLength, this.word = 0, this.bitsAvailable = 0
                                    }
                                    var e = t.prototype;
                                    return e.loadWord = function() {
                                        var t = this.data,
                                            e = this.bytesAvailable,
                                            r = t.byteLength - e,
                                            i = new Uint8Array(4),
                                            n = Math.min(4, e);
                                        if (0 === n) throw new Error("no bytes available");
                                        i.set(t.subarray(r, r + n)), this.word = new DataView(i.buffer).getUint32(0), this.bitsAvailable = 8 * n, this.bytesAvailable -= n
                                    }, e.skipBits = function(t) {
                                        var e;
                                        this.bitsAvailable > t ? (this.word <<= t, this.bitsAvailable -= t) : (t -= this.bitsAvailable, t -= (e = t >> 3) >> 3, this.bytesAvailable -= e, this.loadWord(), this.word <<= t, this.bitsAvailable -= t)
                                    }, e.readBits = function(t) {
                                        var e = Math.min(this.bitsAvailable, t),
                                            r = this.word >>> 32 - e;
                                        return t > 32 && i.logger.error("Cannot read more than 32 bits at a time"), this.bitsAvailable -= e, this.bitsAvailable > 0 ? this.word <<= e : this.bytesAvailable > 0 && this.loadWord(), (e = t - e) > 0 && this.bitsAvailable ? r << e | this.readBits(e) : r
                                    }, e.skipLZ = function() {
                                        var t;
                                        for (t = 0; t < this.bitsAvailable; ++t)
                                            if (0 != (this.word & 2147483648 >>> t)) return this.word <<= t, this.bitsAvailable -= t, t;
                                        return this.loadWord(), t + this.skipLZ()
                                    }, e.skipUEG = function() {
                                        this.skipBits(1 + this.skipLZ())
                                    }, e.skipEG = function() {
                                        this.skipBits(1 + this.skipLZ())
                                    }, e.readUEG = function() {
                                        var t = this.skipLZ();
                                        return this.readBits(t + 1) - 1
                                    }, e.readEG = function() {
                                        var t = this.readUEG();
                                        return 1 & t ? 1 + t >>> 1 : -1 * (t >>> 1)
                                    }, e.readBoolean = function() {
                                        return 1 === this.readBits(1)
                                    }, e.readUByte = function() {
                                        return this.readBits(8)
                                    }, e.readUShort = function() {
                                        return this.readBits(16)
                                    }, e.readUInt = function() {
                                        return this.readBits(32)
                                    }, e.skipScalingList = function(t) {
                                        for (var e = 8, r = 8, i = 0; i < t; i++) 0 !== r && (r = (e + this.readEG() + 256) % 256), e = 0 === r ? e : r
                                    }, e.readSPS = function() {
                                        var t, e, r, i = 0,
                                            n = 0,
                                            a = 0,
                                            s = 0,
                                            o = this.readUByte.bind(this),
                                            l = this.readBits.bind(this),
                                            u = this.readUEG.bind(this),
                                            c = this.readBoolean.bind(this),
                                            d = this.skipBits.bind(this),
                                            h = this.skipEG.bind(this),
                                            f = this.skipUEG.bind(this),
                                            g = this.skipScalingList.bind(this);
                                        o();
                                        var v = o();
                                        if (l(5), d(3), o(), f(), 100 === v || 110 === v || 122 === v || 244 === v || 44 === v || 83 === v || 86 === v || 118 === v || 128 === v) {
                                            var p = u();
                                            if (3 === p && d(1), f(), f(), d(1), c())
                                                for (e = 3 !== p ? 8 : 12, r = 0; r < e; r++) c() && g(r < 6 ? 16 : 64)
                                        }
                                        f();
                                        var m = u();
                                        if (0 === m) u();
                                        else if (1 === m)
                                            for (d(1), h(), h(), t = u(), r = 0; r < t; r++) h();
                                        f(), d(1);
                                        var y = u(),
                                            E = u(),
                                            T = l(1);
                                        0 === T && d(1), d(1), c() && (i = u(), n = u(), a = u(), s = u());
                                        var b = [1, 1];
                                        if (c() && c()) switch (o()) {
                                            case 1:
                                                b = [1, 1];
                                                break;
                                            case 2:
                                                b = [12, 11];
                                                break;
                                            case 3:
                                                b = [10, 11];
                                                break;
                                            case 4:
                                                b = [16, 11];
                                                break;
                                            case 5:
                                                b = [40, 33];
                                                break;
                                            case 6:
                                                b = [24, 11];
                                                break;
                                            case 7:
                                                b = [20, 11];
                                                break;
                                            case 8:
                                                b = [32, 11];
                                                break;
                                            case 9:
                                                b = [80, 33];
                                                break;
                                            case 10:
                                                b = [18, 11];
                                                break;
                                            case 11:
                                                b = [15, 11];
                                                break;
                                            case 12:
                                                b = [64, 33];
                                                break;
                                            case 13:
                                                b = [160, 99];
                                                break;
                                            case 14:
                                                b = [4, 3];
                                                break;
                                            case 15:
                                                b = [3, 2];
                                                break;
                                            case 16:
                                                b = [2, 1];
                                                break;
                                            case 255:
                                                b = [o() << 8 | o(), o() << 8 | o()]
                                        }
                                        return {
                                            width: Math.ceil(16 * (y + 1) - 2 * i - 2 * n),
                                            height: (2 - T) * (E + 1) * 16 - (T ? 2 : 4) * (a + s),
                                            pixelRatio: b
                                        }
                                    }, e.readSliceType = function() {
                                        return this.readUByte(), this.readUEG(), this.readUEG()
                                    }, t
                                }();
                            e.default = n
                        },
                        "./src/demux/id3.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "isHeader", (function() {
                                return n
                            })), r.d(e, "isFooter", (function() {
                                return a
                            })), r.d(e, "getID3Data", (function() {
                                return s
                            })), r.d(e, "canParse", (function() {
                                return l
                            })), r.d(e, "getTimeStamp", (function() {
                                return u
                            })), r.d(e, "isTimeStampFrame", (function() {
                                return c
                            })), r.d(e, "getID3Frames", (function() {
                                return h
                            })), r.d(e, "decodeFrame", (function() {
                                return f
                            })), r.d(e, "utf8ArrayToStr", (function() {
                                return y
                            })), r.d(e, "testables", (function() {
                                return E
                            }));
                            var i, n = function(t, e) {
                                    return e + 10 <= t.length && 73 === t[e] && 68 === t[e + 1] && 51 === t[e + 2] && t[e + 3] < 255 && t[e + 4] < 255 && t[e + 6] < 128 && t[e + 7] < 128 && t[e + 8] < 128 && t[e + 9] < 128
                                },
                                a = function(t, e) {
                                    return e + 10 <= t.length && 51 === t[e] && 68 === t[e + 1] && 73 === t[e + 2] && t[e + 3] < 255 && t[e + 4] < 255 && t[e + 6] < 128 && t[e + 7] < 128 && t[e + 8] < 128 && t[e + 9] < 128
                                },
                                s = function(t, e) {
                                    for (var r = e, i = 0; n(t, e);) i += 10, i += o(t, e + 6), a(t, e + 10) && (i += 10), e += i;
                                    if (i > 0) return t.subarray(r, r + i)
                                },
                                o = function(t, e) {
                                    var r = 0;
                                    return r = (127 & t[e]) << 21, r |= (127 & t[e + 1]) << 14, (r |= (127 & t[e + 2]) << 7) | 127 & t[e + 3]
                                },
                                l = function(t, e) {
                                    return n(t, e) && o(t, e + 6) + 10 <= t.length - e
                                },
                                u = function(t) {
                                    for (var e = h(t), r = 0; r < e.length; r++) {
                                        var i = e[r];
                                        if (c(i)) return m(i)
                                    }
                                },
                                c = function(t) {
                                    return t && "PRIV" === t.key && "com.apple.streaming.transportStreamTimestamp" === t.info
                                },
                                d = function(t) {
                                    var e = String.fromCharCode(t[0], t[1], t[2], t[3]),
                                        r = o(t, 4);
                                    return {
                                        type: e,
                                        size: r,
                                        data: t.subarray(10, 10 + r)
                                    }
                                },
                                h = function(t) {
                                    for (var e = 0, r = []; n(t, e);) {
                                        for (var i = o(t, e + 6), s = (e += 10) + i; e + 8 < s;) {
                                            var l = d(t.subarray(e)),
                                                u = f(l);
                                            u && r.push(u), e += l.size + 10
                                        }
                                        a(t, e) && (e += 10)
                                    }
                                    return r
                                },
                                f = function(t) {
                                    return "PRIV" === t.type ? g(t) : "W" === t.type[0] ? p(t) : v(t)
                                },
                                g = function(t) {
                                    if (!(t.size < 2)) {
                                        var e = y(t.data, !0),
                                            r = new Uint8Array(t.data.subarray(e.length + 1));
                                        return {
                                            key: t.type,
                                            info: e,
                                            data: r.buffer
                                        }
                                    }
                                },
                                v = function(t) {
                                    if (!(t.size < 2)) {
                                        if ("TXXX" === t.type) {
                                            var e = 1,
                                                r = y(t.data.subarray(e), !0);
                                            e += r.length + 1;
                                            var i = y(t.data.subarray(e));
                                            return {
                                                key: t.type,
                                                info: r,
                                                data: i
                                            }
                                        }
                                        var n = y(t.data.subarray(1));
                                        return {
                                            key: t.type,
                                            data: n
                                        }
                                    }
                                },
                                p = function(t) {
                                    if ("WXXX" === t.type) {
                                        if (t.size < 2) return;
                                        var e = 1,
                                            r = y(t.data.subarray(e), !0);
                                        e += r.length + 1;
                                        var i = y(t.data.subarray(e));
                                        return {
                                            key: t.type,
                                            info: r,
                                            data: i
                                        }
                                    }
                                    var n = y(t.data);
                                    return {
                                        key: t.type,
                                        data: n
                                    }
                                },
                                m = function(t) {
                                    if (8 === t.data.byteLength) {
                                        var e = new Uint8Array(t.data),
                                            r = 1 & e[3],
                                            i = (e[4] << 23) + (e[5] << 15) + (e[6] << 7) + e[7];
                                        return i /= 45, r && (i += 47721858.84), Math.round(i)
                                    }
                                },
                                y = function(t, e) {
                                    void 0 === e && (e = !1);
                                    var r = T();
                                    if (r) {
                                        var i = r.decode(t);
                                        if (e) {
                                            var n = i.indexOf("\0");
                                            return -1 !== n ? i.substring(0, n) : i
                                        }
                                        return i.replace(/\0/g, "")
                                    }
                                    for (var a, s, o, l = t.length, u = "", c = 0; c < l;) {
                                        if (0 === (a = t[c++]) && e) return u;
                                        if (0 !== a && 3 !== a) switch (a >> 4) {
                                            case 0:
                                            case 1:
                                            case 2:
                                            case 3:
                                            case 4:
                                            case 5:
                                            case 6:
                                            case 7:
                                                u += String.fromCharCode(a);
                                                break;
                                            case 12:
                                            case 13:
                                                s = t[c++], u += String.fromCharCode((31 & a) << 6 | 63 & s);
                                                break;
                                            case 14:
                                                s = t[c++], o = t[c++], u += String.fromCharCode((15 & a) << 12 | (63 & s) << 6 | (63 & o) << 0)
                                        }
                                    }
                                    return u
                                },
                                E = {
                                    decodeTextFrame: v
                                };

                            function T() {
                                return i || void 0 === self.TextDecoder || (i = new self.TextDecoder("utf-8")), i
                            }
                        },
                        "./src/demux/mp3demuxer.ts": function(t, e, r) {
                            "use strict";
                            r.r(e);
                            var i = r("./src/demux/base-audio-demuxer.ts"),
                                n = r("./src/demux/id3.ts"),
                                a = r("./src/utils/logger.ts"),
                                s = r("./src/demux/mpegaudio.ts");

                            function o(t, e) {
                                return (o = Object.setPrototypeOf || function(t, e) {
                                    return t.__proto__ = e, t
                                })(t, e)
                            }
                            var l = function(t) {
                                var e, r;

                                function i() {
                                    return t.apply(this, arguments) || this
                                }
                                r = t, (e = i).prototype = Object.create(r.prototype), e.prototype.constructor = e, o(e, r);
                                var l = i.prototype;
                                return l.resetInitSegment = function(e, r, i) {
                                    t.prototype.resetInitSegment.call(this, e, r, i), this._audioTrack = {
                                        container: "audio/mpeg",
                                        type: "audio",
                                        id: 0,
                                        pid: -1,
                                        sequenceNumber: 0,
                                        isAAC: !1,
                                        samples: [],
                                        manifestCodec: e,
                                        duration: i,
                                        inputTimeScale: 9e4,
                                        dropped: 0
                                    }
                                }, i.probe = function(t) {
                                    if (!t) return !1;
                                    for (var e = (n.getID3Data(t, 0) || []).length, r = t.length; e < r; e++)
                                        if (s.probe(t, e)) return a.logger.log("MPEG Audio sync word found !"), !0;
                                    return !1
                                }, l.canParse = function(t, e) {
                                    return s.canParse(t, e)
                                }, l.appendFrame = function(t, e, r) {
                                    if (null !== this.initPTS) return s.appendFrame(t, e, r, this.initPTS, this.frameIndex)
                                }, i
                            }(i.default);
                            l.minProbeByteLength = 4, e.default = l
                        },
                        "./src/demux/mp4demuxer.ts": function(t, e, r) {
                            "use strict";
                            r.r(e);
                            var i = r("./src/utils/mp4-tools.ts"),
                                n = r("./src/demux/dummy-demuxed-track.ts"),
                                a = function() {
                                    function t(t, e) {
                                        this.remainderData = null, this.config = void 0, this.config = e
                                    }
                                    var e = t.prototype;
                                    return e.resetTimeStamp = function() {}, e.resetInitSegment = function() {}, e.resetContiguity = function() {}, t.probe = function(t) {
                                        return Object(i.findBox)({
                                            data: t,
                                            start: 0,
                                            end: Math.min(t.length, 16384)
                                        }, ["moof"]).length > 0
                                    }, e.demux = function(t) {
                                        var e = t,
                                            r = Object(n.dummyTrack)();
                                        if (this.config.progressive) {
                                            this.remainderData && (e = Object(i.appendUint8Array)(this.remainderData, t));
                                            var a = Object(i.segmentValidRange)(e);
                                            this.remainderData = a.remainder, r.samples = a.valid || new Uint8Array
                                        } else r.samples = e;
                                        return {
                                            audioTrack: Object(n.dummyTrack)(),
                                            avcTrack: r,
                                            id3Track: Object(n.dummyTrack)(),
                                            textTrack: Object(n.dummyTrack)()
                                        }
                                    }, e.flush = function() {
                                        var t = Object(n.dummyTrack)();
                                        return t.samples = this.remainderData || new Uint8Array, this.remainderData = null, {
                                            audioTrack: Object(n.dummyTrack)(),
                                            avcTrack: t,
                                            id3Track: Object(n.dummyTrack)(),
                                            textTrack: Object(n.dummyTrack)()
                                        }
                                    }, e.demuxSampleAes = function(t, e, r) {
                                        return Promise.reject(new Error("The MP4 demuxer does not support SAMPLE-AES decryption"))
                                    }, e.destroy = function() {}, t
                                }();
                            a.minProbeByteLength = 1024, e.default = a
                        },
                        "./src/demux/mpegaudio.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "appendFrame", (function() {
                                return l
                            })), r.d(e, "parseHeader", (function() {
                                return u
                            })), r.d(e, "isHeaderPattern", (function() {
                                return c
                            })), r.d(e, "isHeader", (function() {
                                return d
                            })), r.d(e, "canParse", (function() {
                                return h
                            })), r.d(e, "probe", (function() {
                                return f
                            }));
                            var i = null,
                                n = [32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],
                                a = [44100, 48e3, 32e3, 22050, 24e3, 16e3, 11025, 12e3, 8e3],
                                s = [
                                    [0, 72, 144, 12],
                                    [0, 0, 0, 0],
                                    [0, 72, 144, 12],
                                    [0, 144, 144, 12]
                                ],
                                o = [0, 1, 1, 4];

                            function l(t, e, r, i, n) {
                                if (!(r + 24 > e.length)) {
                                    var a = u(e, r);
                                    if (a && r + a.frameLength <= e.length) {
                                        var s = i + n * (9e4 * a.samplesPerFrame / a.sampleRate),
                                            o = {
                                                unit: e.subarray(r, r + a.frameLength),
                                                pts: s,
                                                dts: s
                                            };
                                        return t.config = [], t.channelCount = a.channelCount, t.samplerate = a.sampleRate, t.samples.push(o), {
                                            sample: o,
                                            length: a.frameLength,
                                            missing: 0
                                        }
                                    }
                                }
                            }

                            function u(t, e) {
                                var r = t[e + 1] >> 3 & 3,
                                    l = t[e + 1] >> 1 & 3,
                                    u = t[e + 2] >> 4 & 15,
                                    c = t[e + 2] >> 2 & 3;
                                if (1 !== r && 0 !== u && 15 !== u && 3 !== c) {
                                    var d = t[e + 2] >> 1 & 1,
                                        h = t[e + 3] >> 6,
                                        f = 1e3 * n[14 * (3 === r ? 3 - l : 3 === l ? 3 : 4) + u - 1],
                                        g = a[3 * (3 === r ? 0 : 2 === r ? 1 : 2) + c],
                                        v = 3 === h ? 1 : 2,
                                        p = s[r][l],
                                        m = o[l],
                                        y = 8 * p * m,
                                        E = Math.floor(p * f / g + d) * m;
                                    if (null === i) {
                                        var T = (navigator.userAgent || "").match(/Chrome\/(\d+)/i);
                                        i = T ? parseInt(T[1]) : 0
                                    }
                                    return !!i && i <= 87 && 2 === l && f >= 224e3 && 0 === h && (t[e + 3] = 128 | t[e + 3]), {
                                        sampleRate: g,
                                        channelCount: v,
                                        frameLength: E,
                                        samplesPerFrame: y
                                    }
                                }
                            }

                            function c(t, e) {
                                return 255 === t[e] && 224 == (224 & t[e + 1]) && 0 != (6 & t[e + 1])
                            }

                            function d(t, e) {
                                return e + 1 < t.length && c(t, e)
                            }

                            function h(t, e) {
                                return c(t, e) && 4 <= t.length - e
                            }

                            function f(t, e) {
                                if (e + 1 < t.length && c(t, e)) {
                                    var r = u(t, e),
                                        i = 4;
                                    null != r && r.frameLength && (i = r.frameLength);
                                    var n = e + i;
                                    return n === t.length || d(t, n)
                                }
                                return !1
                            }
                        },
                        "./src/demux/sample-aes.ts": function(t, e, r) {
                            "use strict";
                            r.r(e);
                            var i = r("./src/crypt/decrypter.ts"),
                                n = r("./src/demux/tsdemuxer.ts"),
                                a = function() {
                                    function t(t, e, r) {
                                        this.keyData = void 0, this.decrypter = void 0, this.keyData = r, this.decrypter = new i.default(t, e, {
                                            removePKCS7Padding: !1
                                        })
                                    }
                                    var e = t.prototype;
                                    return e.decryptBuffer = function(t, e) {
                                        this.decrypter.decrypt(t, this.keyData.key.buffer, this.keyData.iv.buffer, e)
                                    }, e.decryptAacSample = function(t, e, r, i) {
                                        var n = t[e].unit,
                                            a = n.subarray(16, n.length - n.length % 16),
                                            s = a.buffer.slice(a.byteOffset, a.byteOffset + a.length),
                                            o = this;
                                        this.decryptBuffer(s, (function(a) {
                                            var s = new Uint8Array(a);
                                            n.set(s, 16), i || o.decryptAacSamples(t, e + 1, r)
                                        }))
                                    }, e.decryptAacSamples = function(t, e, r) {
                                        for (;; e++) {
                                            if (e >= t.length) return void r();
                                            if (!(t[e].unit.length < 32)) {
                                                var i = this.decrypter.isSync();
                                                if (this.decryptAacSample(t, e, r, i), !i) return
                                            }
                                        }
                                    }, e.getAvcEncryptedData = function(t) {
                                        for (var e = 16 * Math.floor((t.length - 48) / 160) + 16, r = new Int8Array(e), i = 0, n = 32; n <= t.length - 16; n += 160, i += 16) r.set(t.subarray(n, n + 16), i);
                                        return r
                                    }, e.getAvcDecryptedUnit = function(t, e) {
                                        for (var r = new Uint8Array(e), i = 0, n = 32; n <= t.length - 16; n += 160, i += 16) t.set(r.subarray(i, i + 16), n);
                                        return t
                                    }, e.decryptAvcSample = function(t, e, r, i, a, s) {
                                        var o = Object(n.discardEPB)(a.data),
                                            l = this.getAvcEncryptedData(o),
                                            u = this;
                                        this.decryptBuffer(l.buffer, (function(n) {
                                            a.data = u.getAvcDecryptedUnit(o, n), s || u.decryptAvcSamples(t, e, r + 1, i)
                                        }))
                                    }, e.decryptAvcSamples = function(t, e, r, i) {
                                        if (t instanceof Uint8Array) throw new Error("Cannot decrypt samples of type Uint8Array");
                                        for (;; e++, r = 0) {
                                            if (e >= t.length) return void i();
                                            for (var n = t[e].units; !(r >= n.length); r++) {
                                                var a = n[r];
                                                if (!(a.data.length <= 48 || 1 !== a.type && 5 !== a.type)) {
                                                    var s = this.decrypter.isSync();
                                                    if (this.decryptAvcSample(t, e, r, i, a, s), !s) return
                                                }
                                            }
                                        }
                                    }, t
                                }();
                            e.default = a
                        },
                        "./src/demux/transmuxer-interface.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "default", (function() {
                                return d
                            }));
                            var i = r("./node_modules/webworkify-webpack/index.js"),
                                n = r("./src/events.ts"),
                                a = r("./src/demux/transmuxer.ts"),
                                s = r("./src/utils/logger.ts"),
                                o = r("./src/errors.ts"),
                                l = r("./src/utils/mediasource-helper.ts"),
                                u = r("./node_modules/eventemitter3/index.js"),
                                c = Object(l.getMediaSource)() || {
                                    isTypeSupported: function() {
                                        return !1
                                    }
                                },
                                d = function() {
                                    function t(t, e, r, l) {
                                        var d = this;
                                        this.hls = void 0, this.id = void 0, this.observer = void 0, this.frag = null, this.part = null, this.worker = void 0, this.onwmsg = void 0, this.transmuxer = null, this.onTransmuxComplete = void 0, this.onFlush = void 0, this.hls = t, this.id = e, this.onTransmuxComplete = r, this.onFlush = l;
                                        var h = t.config,
                                            f = function(e, r) {
                                                (r = r || {}).frag = d.frag, r.id = d.id, t.trigger(e, r)
                                            };
                                        this.observer = new u.EventEmitter, this.observer.on(n.Events.FRAG_DECRYPTED, f), this.observer.on(n.Events.ERROR, f);
                                        var g = {
                                                mp4: c.isTypeSupported("video/mp4"),
                                                mpeg: c.isTypeSupported("audio/mpeg"),
                                                mp3: c.isTypeSupported('audio/mp4; codecs="mp3"')
                                            },
                                            v = navigator.vendor;
                                        if (h.enableWorker && "undefined" != typeof Worker) {
                                            var p;
                                            s.logger.log("demuxing in webworker");
                                            try {
                                                p = this.worker = i("./src/demux/transmuxer-worker.ts"), this.onwmsg = this.onWorkerMessage.bind(this), p.addEventListener("message", this.onwmsg), p.onerror = function(e) {
                                                    t.trigger(n.Events.ERROR, {
                                                        type: o.ErrorTypes.OTHER_ERROR,
                                                        details: o.ErrorDetails.INTERNAL_EXCEPTION,
                                                        fatal: !0,
                                                        event: "demuxerWorker",
                                                        error: new Error(e.message + "  (" + e.filename + ":" + e.lineno + ")")
                                                    })
                                                }, p.postMessage({
                                                    cmd: "init",
                                                    typeSupported: g,
                                                    vendor: v,
                                                    id: e,
                                                    config: JSON.stringify(h)
                                                })
                                            } catch (t) {
                                                s.logger.warn("Error in worker:", t), s.logger.error("Error while initializing DemuxerWorker, fallback to inline"), p && self.URL.revokeObjectURL(p.objectURL), this.transmuxer = new a.default(this.observer, g, h, v, e), this.worker = null
                                            }
                                        } else this.transmuxer = new a.default(this.observer, g, h, v, e)
                                    }
                                    var e = t.prototype;
                                    return e.destroy = function() {
                                        var t = this.worker;
                                        if (t) t.removeEventListener("message", this.onwmsg), t.terminate(), this.worker = null;
                                        else {
                                            var e = this.transmuxer;
                                            e && (e.destroy(), this.transmuxer = null)
                                        }
                                        var r = this.observer;
                                        r && r.removeAllListeners(), this.observer = null
                                    }, e.push = function(t, e, r, i, n, o, l, u, c, d) {
                                        var h = this;
                                        c.transmuxing.start = self.performance.now();
                                        var f = this.transmuxer,
                                            g = this.worker,
                                            v = o ? o.start : n.start,
                                            p = n.decryptdata,
                                            m = this.frag,
                                            y = !(m && n.cc === m.cc),
                                            E = !(m && c.level === m.level),
                                            T = m ? c.sn - m.sn : -1,
                                            b = this.part ? c.part - this.part.index : 1,
                                            S = !E && (1 === T || 0 === T && 1 === b),
                                            L = self.performance.now();
                                        (E || T || 0 === n.stats.parsing.start) && (n.stats.parsing.start = L), !o || !b && S || (o.stats.parsing.start = L);
                                        var A = new a.TransmuxState(y, S, u, E, v);
                                        if (!S || y) {
                                            s.logger.log("[transmuxer-interface, " + n.type + "]: Starting new transmux session for sn: " + c.sn + " p: " + c.part + " level: " + c.level + " id: " + c.id + "\n        discontinuity: " + y + "\n        trackSwitch: " + E + "\n        contiguous: " + S + "\n        accurateTimeOffset: " + u + "\n        timeOffset: " + v);
                                            var D = new a.TransmuxConfig(r, i, e, l, d);
                                            this.configureTransmuxer(D)
                                        }
                                        if (this.frag = n, this.part = o, g) g.postMessage({
                                            cmd: "demux",
                                            data: t,
                                            decryptdata: p,
                                            chunkMeta: c,
                                            state: A
                                        }, t instanceof ArrayBuffer ? [t] : []);
                                        else if (f) {
                                            var k = f.push(t, p, c, A);
                                            Object(a.isPromise)(k) ? k.then((function(t) {
                                                h.handleTransmuxComplete(t)
                                            })) : this.handleTransmuxComplete(k)
                                        }
                                    }, e.flush = function(t) {
                                        var e = this;
                                        t.transmuxing.start = self.performance.now();
                                        var r = this.transmuxer,
                                            i = this.worker;
                                        if (i) i.postMessage({
                                            cmd: "flush",
                                            chunkMeta: t
                                        });
                                        else if (r) {
                                            var n = r.flush(t);
                                            Object(a.isPromise)(n) ? n.then((function(r) {
                                                e.handleFlushResult(r, t)
                                            })) : this.handleFlushResult(n, t)
                                        }
                                    }, e.handleFlushResult = function(t, e) {
                                        var r = this;
                                        t.forEach((function(t) {
                                            r.handleTransmuxComplete(t)
                                        })), this.onFlush(e)
                                    }, e.onWorkerMessage = function(t) {
                                        var e = t.data,
                                            r = this.hls;
                                        switch (e.event) {
                                            case "init":
                                                self.URL.revokeObjectURL(this.worker.objectURL);
                                                break;
                                            case "transmuxComplete":
                                                this.handleTransmuxComplete(e.data);
                                                break;
                                            case "flush":
                                                this.onFlush(e.data);
                                                break;
                                            default:
                                                e.data = e.data || {}, e.data.frag = this.frag, e.data.id = this.id, r.trigger(e.event, e.data)
                                        }
                                    }, e.configureTransmuxer = function(t) {
                                        var e = this.worker,
                                            r = this.transmuxer;
                                        e ? e.postMessage({
                                            cmd: "configure",
                                            config: t
                                        }) : r && r.configure(t)
                                    }, e.handleTransmuxComplete = function(t) {
                                        t.chunkMeta.transmuxing.end = self.performance.now(), this.onTransmuxComplete(t)
                                    }, t
                                }()
                        },
                        "./src/demux/transmuxer-worker.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "default", (function() {
                                return o
                            }));
                            var i = r("./src/demux/transmuxer.ts"),
                                n = r("./src/events.ts"),
                                a = r("./src/utils/logger.ts"),
                                s = r("./node_modules/eventemitter3/index.js");

                            function o(t) {
                                var e = new s.EventEmitter,
                                    r = function(e, r) {
                                        t.postMessage({
                                            event: e,
                                            data: r
                                        })
                                    };
                                e.on(n.Events.FRAG_DECRYPTED, r), e.on(n.Events.ERROR, r), t.addEventListener("message", (function(n) {
                                    var s = n.data;
                                    switch (s.cmd) {
                                        case "init":
                                            var o = JSON.parse(s.config);
                                            t.transmuxer = new i.default(e, s.typeSupported, o, s.vendor, s.id), Object(a.enableLogs)(o.debug), r("init", null);
                                            break;
                                        case "configure":
                                            t.transmuxer.configure(s.config);
                                            break;
                                        case "demux":
                                            var u = t.transmuxer.push(s.data, s.decryptdata, s.chunkMeta, s.state);
                                            Object(i.isPromise)(u) ? u.then((function(e) {
                                                l(t, e)
                                            })) : l(t, u);
                                            break;
                                        case "flush":
                                            var d = s.chunkMeta,
                                                h = t.transmuxer.flush(d);
                                            Object(i.isPromise)(h) ? h.then((function(e) {
                                                c(t, e, d)
                                            })) : c(t, h, d)
                                    }
                                }))
                            }

                            function l(t, e) {
                                if ((r = e.remuxResult).audio || r.video || r.text || r.id3 || r.initSegment) {
                                    var r, i = [],
                                        n = e.remuxResult,
                                        a = n.audio,
                                        s = n.video;
                                    a && u(i, a), s && u(i, s), t.postMessage({
                                        event: "transmuxComplete",
                                        data: e
                                    }, i)
                                }
                            }

                            function u(t, e) {
                                e.data1 && t.push(e.data1.buffer), e.data2 && t.push(e.data2.buffer)
                            }

                            function c(t, e, r) {
                                e.forEach((function(e) {
                                    l(t, e)
                                })), t.postMessage({
                                    event: "flush",
                                    data: r
                                })
                            }
                        },
                        "./src/demux/transmuxer.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "default", (function() {
                                return y
                            })), r.d(e, "isPromise", (function() {
                                return T
                            })), r.d(e, "TransmuxConfig", (function() {
                                return b
                            })), r.d(e, "TransmuxState", (function() {
                                return S
                            }));
                            var i, n = r("./src/events.ts"),
                                a = r("./src/errors.ts"),
                                s = r("./src/crypt/decrypter.ts"),
                                o = r("./src/demux/aacdemuxer.ts"),
                                l = r("./src/demux/mp4demuxer.ts"),
                                u = r("./src/demux/tsdemuxer.ts"),
                                c = r("./src/demux/mp3demuxer.ts"),
                                d = r("./src/remux/mp4-remuxer.ts"),
                                h = r("./src/remux/passthrough-remuxer.ts"),
                                f = r("./src/demux/chunk-cache.ts"),
                                g = r("./src/utils/mp4-tools.ts"),
                                v = r("./src/utils/logger.ts");
                            try {
                                i = self.performance.now.bind(self.performance)
                            } catch (t) {
                                v.logger.debug("Unable to use Performance API on this environment"), i = self.Date.now
                            }
                            var p = [{
                                    demux: u.default,
                                    remux: d.default
                                }, {
                                    demux: l.default,
                                    remux: h.default
                                }, {
                                    demux: o.default,
                                    remux: d.default
                                }, {
                                    demux: c.default,
                                    remux: d.default
                                }],
                                m = 1024;
                            p.forEach((function(t) {
                                var e = t.demux;
                                m = Math.max(m, e.minProbeByteLength)
                            }));
                            var y = function() {
                                    function t(t, e, r, i, n) {
                                        this.observer = void 0, this.typeSupported = void 0, this.config = void 0, this.vendor = void 0, this.id = void 0, this.demuxer = void 0, this.remuxer = void 0, this.decrypter = void 0, this.probe = void 0, this.decryptionPromise = null, this.transmuxConfig = void 0, this.currentTransmuxState = void 0, this.cache = new f.default, this.observer = t, this.typeSupported = e, this.config = r, this.vendor = i, this.id = n
                                    }
                                    var e = t.prototype;
                                    return e.configure = function(t) {
                                        this.transmuxConfig = t, this.decrypter && this.decrypter.reset()
                                    }, e.push = function(t, e, r, n) {
                                        var a = this,
                                            s = r.transmuxing;
                                        s.executeStart = i();
                                        var o = new Uint8Array(t),
                                            l = this.cache,
                                            u = this.config,
                                            c = this.currentTransmuxState,
                                            d = this.transmuxConfig;
                                        n && (this.currentTransmuxState = n);
                                        var h = function(t, e) {
                                            var r = null;
                                            return t.byteLength > 0 && null != e && null != e.key && null !== e.iv && null != e.method && (r = e), r
                                        }(o, e);
                                        if (h && "AES-128" === h.method) {
                                            var f = this.getDecrypter();
                                            if (!u.enableSoftwareAES) return this.decryptionPromise = f.webCryptoDecrypt(o, h.key.buffer, h.iv.buffer).then((function(t) {
                                                var e = a.push(t, null, r);
                                                return a.decryptionPromise = null, e
                                            })), this.decryptionPromise;
                                            var v = f.softwareDecrypt(o, h.key.buffer, h.iv.buffer);
                                            if (!v) return s.executeEnd = i(), E(r);
                                            o = new Uint8Array(v)
                                        }
                                        var p = n || c,
                                            m = p.contiguous,
                                            y = p.discontinuity,
                                            T = p.trackSwitch,
                                            b = p.accurateTimeOffset,
                                            S = p.timeOffset,
                                            L = d.audioCodec,
                                            A = d.videoCodec,
                                            D = d.defaultInitPts,
                                            k = d.duration,
                                            R = d.initSegmentData;
                                        if ((y || T) && this.resetInitSegment(R, L, A, k), y && this.resetInitialTimestamp(D), m || this.resetContiguity(), this.needsProbing(o, y, T)) {
                                            if (l.dataLength) {
                                                var _ = l.flush();
                                                o = Object(g.appendUint8Array)(_, o)
                                            }
                                            this.configureTransmuxer(o, d)
                                        }
                                        var I = this.transmux(o, h, S, b, r),
                                            w = this.currentTransmuxState;
                                        return w.contiguous = !0, w.discontinuity = !1, w.trackSwitch = !1, s.executeEnd = i(), I
                                    }, e.flush = function(t) {
                                        var e = this,
                                            r = t.transmuxing;
                                        r.executeStart = i();
                                        var s = this.decrypter,
                                            o = this.cache,
                                            l = this.currentTransmuxState,
                                            u = this.decryptionPromise;
                                        if (u) return u.then((function() {
                                            return e.flush(t)
                                        }));
                                        var c = [],
                                            d = l.timeOffset;
                                        if (s) {
                                            var h = s.flush();
                                            h && c.push(this.push(h, null, t))
                                        }
                                        var f = o.dataLength;
                                        o.reset();
                                        var g = this.demuxer,
                                            v = this.remuxer;
                                        if (!g || !v) return f >= m && this.observer.emit(n.Events.ERROR, n.Events.ERROR, {
                                            type: a.ErrorTypes.MEDIA_ERROR,
                                            details: a.ErrorDetails.FRAG_PARSING_ERROR,
                                            fatal: !0,
                                            reason: "no demux matching with content found"
                                        }), r.executeEnd = i(), [E(t)];
                                        var p = g.flush(d);
                                        return T(p) ? p.then((function(r) {
                                            return e.flushRemux(c, r, t), c
                                        })) : (this.flushRemux(c, p, t), c)
                                    }, e.flushRemux = function(t, e, r) {
                                        var n = e.audioTrack,
                                            a = e.avcTrack,
                                            s = e.id3Track,
                                            o = e.textTrack,
                                            l = this.currentTransmuxState,
                                            u = l.accurateTimeOffset,
                                            c = l.timeOffset;
                                        v.logger.log("[transmuxer.ts]: Flushed fragment " + r.sn + (r.part > -1 ? " p: " + r.part : "") + " of level " + r.level);
                                        var d = this.remuxer.remux(n, a, s, o, c, u, !0, this.id);
                                        t.push({
                                            remuxResult: d,
                                            chunkMeta: r
                                        }), r.transmuxing.executeEnd = i()
                                    }, e.resetInitialTimestamp = function(t) {
                                        var e = this.demuxer,
                                            r = this.remuxer;
                                        e && r && (e.resetTimeStamp(t), r.resetTimeStamp(t))
                                    }, e.resetContiguity = function() {
                                        var t = this.demuxer,
                                            e = this.remuxer;
                                        t && e && (t.resetContiguity(), e.resetNextTimestamp())
                                    }, e.resetInitSegment = function(t, e, r, i) {
                                        var n = this.demuxer,
                                            a = this.remuxer;
                                        n && a && (n.resetInitSegment(e, r, i), a.resetInitSegment(t, e, r))
                                    }, e.destroy = function() {
                                        this.demuxer && (this.demuxer.destroy(), this.demuxer = void 0), this.remuxer && (this.remuxer.destroy(), this.remuxer = void 0)
                                    }, e.transmux = function(t, e, r, i, n) {
                                        return e && "SAMPLE-AES" === e.method ? this.transmuxSampleAes(t, e, r, i, n) : this.transmuxUnencrypted(t, r, i, n)
                                    }, e.transmuxUnencrypted = function(t, e, r, i) {
                                        var n = this.demuxer.demux(t, e, !1, !this.config.progressive),
                                            a = n.audioTrack,
                                            s = n.avcTrack,
                                            o = n.id3Track,
                                            l = n.textTrack;
                                        return {
                                            remuxResult: this.remuxer.remux(a, s, o, l, e, r, !1, this.id),
                                            chunkMeta: i
                                        }
                                    }, e.transmuxSampleAes = function(t, e, r, i, n) {
                                        var a = this;
                                        return this.demuxer.demuxSampleAes(t, e, r).then((function(t) {
                                            return {
                                                remuxResult: a.remuxer.remux(t.audioTrack, t.avcTrack, t.id3Track, t.textTrack, r, i, !1, a.id),
                                                chunkMeta: n
                                            }
                                        }))
                                    }, e.configureTransmuxer = function(t, e) {
                                        for (var r, i = this.config, n = this.observer, a = this.typeSupported, s = this.vendor, o = e.audioCodec, u = e.defaultInitPts, c = e.duration, d = e.initSegmentData, f = e.videoCodec, g = 0, m = p.length; g < m; g++)
                                            if (p[g].demux.probe(t)) {
                                                r = p[g];
                                                break
                                            } r || (v.logger.warn("Failed to find demuxer by probing frag, treating as mp4 passthrough"), r = {
                                            demux: l.default,
                                            remux: h.default
                                        });
                                        var y = this.demuxer,
                                            E = this.remuxer,
                                            T = r.remux,
                                            b = r.demux;
                                        E && E instanceof T || (this.remuxer = new T(n, i, a, s)), y && y instanceof b || (this.demuxer = new b(n, i, a), this.probe = b.probe), this.resetInitSegment(d, o, f, c), this.resetInitialTimestamp(u)
                                    }, e.needsProbing = function(t, e, r) {
                                        return !this.demuxer || !this.remuxer || e || r
                                    }, e.getDecrypter = function() {
                                        var t = this.decrypter;
                                        return t || (t = this.decrypter = new s.default(this.observer, this.config)), t
                                    }, t
                                }(),
                                E = function(t) {
                                    return {
                                        remuxResult: {},
                                        chunkMeta: t
                                    }
                                };

                            function T(t) {
                                return "then" in t && t.then instanceof Function
                            }
                            var b = function(t, e, r, i, n) {
                                    this.audioCodec = void 0, this.videoCodec = void 0, this.initSegmentData = void 0, this.duration = void 0, this.defaultInitPts = void 0, this.audioCodec = t, this.videoCodec = e, this.initSegmentData = r, this.duration = i, this.defaultInitPts = n
                                },
                                S = function(t, e, r, i, n) {
                                    this.discontinuity = void 0, this.contiguous = void 0, this.accurateTimeOffset = void 0, this.trackSwitch = void 0, this.timeOffset = void 0, this.discontinuity = t, this.contiguous = e, this.accurateTimeOffset = r, this.trackSwitch = i, this.timeOffset = n
                                }
                        },
                        "./src/demux/tsdemuxer.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "discardEPB", (function() {
                                return T
                            }));
                            var i = r("./src/demux/adts.ts"),
                                n = r("./src/demux/mpegaudio.ts"),
                                a = r("./src/demux/exp-golomb.ts"),
                                s = r("./src/demux/id3.ts"),
                                o = r("./src/demux/sample-aes.ts"),
                                l = r("./src/events.ts"),
                                u = r("./src/utils/mp4-tools.ts"),
                                c = r("./src/utils/logger.ts"),
                                d = r("./src/errors.ts"),
                                h = {
                                    video: 1,
                                    audio: 2,
                                    id3: 3,
                                    text: 4
                                },
                                f = function() {
                                    function t(t, e, r) {
                                        this.observer = void 0, this.config = void 0, this.typeSupported = void 0, this.sampleAes = null, this.pmtParsed = !1, this.audioCodec = void 0, this.videoCodec = void 0, this._duration = 0, this.aacLastPTS = null, this._initPTS = null, this._initDTS = null, this._pmtId = -1, this._avcTrack = void 0, this._audioTrack = void 0, this._id3Track = void 0, this._txtTrack = void 0, this.aacOverFlow = null, this.avcSample = null, this.remainderData = null, this.observer = t, this.config = e, this.typeSupported = r
                                    }
                                    t.probe = function(e) {
                                        var r = t.syncOffset(e);
                                        return !(r < 0 || (r && c.logger.warn("MPEG2-TS detected but first sync word found @ offset " + r + ", junk ahead ?"), 0))
                                    }, t.syncOffset = function(t) {
                                        for (var e = Math.min(1e3, t.length - 564), r = 0; r < e;) {
                                            if (71 === t[r] && 71 === t[r + 188] && 71 === t[r + 376]) return r;
                                            r++
                                        }
                                        return -1
                                    }, t.createTrack = function(t, e) {
                                        return {
                                            container: "video" === t || "audio" === t ? "video/mp2t" : void 0,
                                            type: t,
                                            id: h[t],
                                            pid: -1,
                                            inputTimeScale: 9e4,
                                            sequenceNumber: 0,
                                            samples: [],
                                            dropped: 0,
                                            duration: "audio" === t ? e : void 0
                                        }
                                    };
                                    var e = t.prototype;
                                    return e.resetInitSegment = function(e, r, i) {
                                        this.pmtParsed = !1, this._pmtId = -1, this._avcTrack = t.createTrack("video", i), this._audioTrack = t.createTrack("audio", i), this._id3Track = t.createTrack("id3", i), this._txtTrack = t.createTrack("text", i), this._audioTrack.isAAC = !0, this.aacOverFlow = null, this.aacLastPTS = null, this.avcSample = null, this.audioCodec = e, this.videoCodec = r, this._duration = i
                                    }, e.resetTimeStamp = function() {}, e.resetContiguity = function() {
                                        var t = this._audioTrack,
                                            e = this._avcTrack,
                                            r = this._id3Track;
                                        t && (t.pesData = null), e && (e.pesData = null), r && (r.pesData = null), this.aacOverFlow = null, this.aacLastPTS = null
                                    }, e.demux = function(e, r, i, n) {
                                        var a;
                                        void 0 === i && (i = !1), void 0 === n && (n = !1), i || (this.sampleAes = null);
                                        var s = this._avcTrack,
                                            o = this._audioTrack,
                                            h = this._id3Track,
                                            f = s.pid,
                                            g = s.pesData,
                                            y = o.pid,
                                            E = h.pid,
                                            T = o.pesData,
                                            b = h.pesData,
                                            S = !1,
                                            L = this.pmtParsed,
                                            A = this._pmtId,
                                            D = e.length;
                                        if (this.remainderData && (D = (e = Object(u.appendUint8Array)(this.remainderData, e)).length, this.remainderData = null), D < 188 && !n) return this.remainderData = e, {
                                            audioTrack: o,
                                            avcTrack: s,
                                            id3Track: h,
                                            textTrack: this._txtTrack
                                        };
                                        var k = Math.max(0, t.syncOffset(e));
                                        (D -= (D + k) % 188) < e.byteLength && !n && (this.remainderData = new Uint8Array(e.buffer, D, e.buffer.byteLength - D));
                                        for (var R = k; R < D; R += 188)
                                            if (71 === e[R]) {
                                                var _ = !!(64 & e[R + 1]),
                                                    I = ((31 & e[R + 1]) << 8) + e[R + 2],
                                                    w = void 0;
                                                if ((48 & e[R + 3]) >> 4 > 1) {
                                                    if ((w = R + 5 + e[R + 4]) === R + 188) continue
                                                } else w = R + 4;
                                                switch (I) {
                                                    case f:
                                                        _ && (g && (a = m(g)) && this.parseAVCPES(a, !1), g = {
                                                            data: [],
                                                            size: 0
                                                        }), g && (g.data.push(e.subarray(w, R + 188)), g.size += R + 188 - w);
                                                        break;
                                                    case y:
                                                        _ && (T && (a = m(T)) && (o.isAAC ? this.parseAACPES(a) : this.parseMPEGPES(a)), T = {
                                                            data: [],
                                                            size: 0
                                                        }), T && (T.data.push(e.subarray(w, R + 188)), T.size += R + 188 - w);
                                                        break;
                                                    case E:
                                                        _ && (b && (a = m(b)) && this.parseID3PES(a), b = {
                                                            data: [],
                                                            size: 0
                                                        }), b && (b.data.push(e.subarray(w, R + 188)), b.size += R + 188 - w);
                                                        break;
                                                    case 0:
                                                        _ && (w += e[w] + 1), A = this._pmtId = v(e, w);
                                                        break;
                                                    case A:
                                                        _ && (w += e[w] + 1);
                                                        var C = p(e, w, !0 === this.typeSupported.mpeg || !0 === this.typeSupported.mp3, i);
                                                        (f = C.avc) > 0 && (s.pid = f), (y = C.audio) > 0 && (o.pid = y, o.isAAC = C.isAAC), (E = C.id3) > 0 && (h.pid = E), S && !L && (c.logger.log("reparse from beginning"), S = !1, R = k - 188), L = this.pmtParsed = !0;
                                                        break;
                                                    case 17:
                                                    case 8191:
                                                        break;
                                                    default:
                                                        S = !0
                                                }
                                            } else this.observer.emit(l.Events.ERROR, l.Events.ERROR, {
                                                type: d.ErrorTypes.MEDIA_ERROR,
                                                details: d.ErrorDetails.FRAG_PARSING_ERROR,
                                                fatal: !1,
                                                reason: "TS packet did not start with 0x47"
                                            });
                                        s.pesData = g, o.pesData = T, h.pesData = b;
                                        var O = {
                                            audioTrack: o,
                                            avcTrack: s,
                                            id3Track: h,
                                            textTrack: this._txtTrack
                                        };
                                        return n && this.extractRemainingSamples(O), O
                                    }, e.flush = function() {
                                        var t, e = this.remainderData;
                                        return this.remainderData = null, t = e ? this.demux(e, -1, !1, !0) : {
                                            audioTrack: this._audioTrack,
                                            avcTrack: this._avcTrack,
                                            textTrack: this._txtTrack,
                                            id3Track: this._id3Track
                                        }, this.extractRemainingSamples(t), this.sampleAes ? this.decrypt(t, this.sampleAes) : t
                                    }, e.extractRemainingSamples = function(t) {
                                        var e, r = t.audioTrack,
                                            i = t.avcTrack,
                                            n = t.id3Track,
                                            a = i.pesData,
                                            s = r.pesData,
                                            o = n.pesData;
                                        a && (e = m(a)) ? (this.parseAVCPES(e, !0), i.pesData = null) : i.pesData = a, s && (e = m(s)) ? (r.isAAC ? this.parseAACPES(e) : this.parseMPEGPES(e), r.pesData = null) : (null != s && s.size && c.logger.log("last AAC PES packet truncated,might overlap between fragments"), r.pesData = s), o && (e = m(o)) ? (this.parseID3PES(e), n.pesData = null) : n.pesData = o
                                    }, e.demuxSampleAes = function(t, e, r) {
                                        var i = this.demux(t, r, !0, !this.config.progressive),
                                            n = this.sampleAes = new o.default(this.observer, this.config, e);
                                        return this.decrypt(i, n)
                                    }, e.decrypt = function(t, e) {
                                        return new Promise((function(r) {
                                            var i = t.audioTrack,
                                                n = t.avcTrack;
                                            i.samples && i.isAAC ? e.decryptAacSamples(i.samples, 0, (function() {
                                                n.samples ? e.decryptAvcSamples(n.samples, 0, 0, (function() {
                                                    r(t)
                                                })) : r(t)
                                            })) : n.samples && e.decryptAvcSamples(n.samples, 0, 0, (function() {
                                                r(t)
                                            }))
                                        }))
                                    }, e.destroy = function() {
                                        this._initPTS = this._initDTS = null, this._duration = 0
                                    }, e.parseAVCPES = function(t, e) {
                                        var r, i = this,
                                            n = this._avcTrack,
                                            o = this.parseAVCNALu(t.data),
                                            l = this.avcSample,
                                            u = !1;
                                        t.data = null, l && o.length && !n.audFound && (y(l, n), l = this.avcSample = g(!1, t.pts, t.dts, "")), o.forEach((function(e) {
                                            switch (e.type) {
                                                case 1:
                                                    r = !0, l || (l = i.avcSample = g(!0, t.pts, t.dts, "")), l.frame = !0;
                                                    var o = e.data;
                                                    if (u && o.length > 4) {
                                                        var c = new a.default(o).readSliceType();
                                                        2 !== c && 4 !== c && 7 !== c && 9 !== c || (l.key = !0)
                                                    }
                                                    break;
                                                case 5:
                                                    r = !0, l || (l = i.avcSample = g(!0, t.pts, t.dts, "")), l.key = !0, l.frame = !0;
                                                    break;
                                                case 6:
                                                    r = !0;
                                                    var d = new a.default(T(e.data));
                                                    d.readUByte();
                                                    for (var h = 0, f = 0, v = !1, p = 0; !v && d.bytesAvailable > 1;) {
                                                        h = 0;
                                                        do {
                                                            h += p = d.readUByte()
                                                        } while (255 === p);
                                                        f = 0;
                                                        do {
                                                            f += p = d.readUByte()
                                                        } while (255 === p);
                                                        if (4 === h && 0 !== d.bytesAvailable) {
                                                            if (v = !0, 181 === d.readUByte() && 49 === d.readUShort() && 1195456820 === d.readUInt() && 3 === d.readUByte()) {
                                                                for (var m = d.readUByte(), b = 31 & m, S = [m, d.readUByte()], L = 0; L < b; L++) S.push(d.readUByte()), S.push(d.readUByte()), S.push(d.readUByte());
                                                                E(i._txtTrack.samples, {
                                                                    type: 3,
                                                                    pts: t.pts,
                                                                    bytes: S
                                                                })
                                                            }
                                                        } else if (5 === h && 0 !== d.bytesAvailable) {
                                                            if (v = !0, f > 16) {
                                                                for (var A = [], D = 0; D < 16; D++) A.push(d.readUByte().toString(16)), 3 !== D && 5 !== D && 7 !== D && 9 !== D || A.push("-");
                                                                for (var k = f - 16, R = new Uint8Array(k), _ = 0; _ < k; _++) R[_] = d.readUByte();
                                                                E(i._txtTrack.samples, {
                                                                    pts: t.pts,
                                                                    payloadType: h,
                                                                    uuid: A.join(""),
                                                                    userData: Object(s.utf8ArrayToStr)(R),
                                                                    userDataBytes: R
                                                                })
                                                            }
                                                        } else if (f < d.bytesAvailable)
                                                            for (var I = 0; I < f; I++) d.readUByte()
                                                    }
                                                    break;
                                                case 7:
                                                    if (r = !0, u = !0, !n.sps) {
                                                        var w = new a.default(e.data).readSPS();
                                                        n.width = w.width, n.height = w.height, n.pixelRatio = w.pixelRatio, n.sps = [e.data], n.duration = i._duration;
                                                        for (var C = e.data.subarray(1, 4), O = "avc1.", x = 0; x < 3; x++) {
                                                            var P = C[x].toString(16);
                                                            P.length < 2 && (P = "0" + P), O += P
                                                        }
                                                        n.codec = O
                                                    }
                                                    break;
                                                case 8:
                                                    r = !0, n.pps || (n.pps = [e.data]);
                                                    break;
                                                case 9:
                                                    r = !1, n.audFound = !0, l && y(l, n), l = i.avcSample = g(!1, t.pts, t.dts, "");
                                                    break;
                                                case 12:
                                                    r = !1;
                                                    break;
                                                default:
                                                    r = !1, l && (l.debug += "unknown NAL " + e.type + " ")
                                            }
                                            l && r && l.units.push(e)
                                        })), e && l && (y(l, n), this.avcSample = null)
                                    }, e.getLastNalUnit = function() {
                                        var t, e, r = this.avcSample;
                                        if (!r || 0 === r.units.length) {
                                            var i = this._avcTrack.samples;
                                            r = i[i.length - 1]
                                        }
                                        if (null !== (t = r) && void 0 !== t && t.units) {
                                            var n = r.units;
                                            e = n[n.length - 1]
                                        }
                                        return e
                                    }, e.parseAVCNALu = function(t) {
                                        var e, r, i = t.byteLength,
                                            n = this._avcTrack,
                                            a = n.naluState || 0,
                                            s = a,
                                            o = [],
                                            l = 0,
                                            u = -1,
                                            c = 0;
                                        for (-1 === a && (u = 0, c = 31 & t[0], a = 0, l = 1); l < i;)
                                            if (e = t[l++], a)
                                                if (1 !== a)
                                                    if (e)
                                                        if (1 === e) {
                                                            if (u >= 0) {
                                                                var d = {
                                                                    data: t.subarray(u, l - a - 1),
                                                                    type: c
                                                                };
                                                                o.push(d)
                                                            } else {
                                                                var h = this.getLastNalUnit();
                                                                if (h && (s && l <= 4 - s && h.state && (h.data = h.data.subarray(0, h.data.byteLength - s)), (r = l - a - 1) > 0)) {
                                                                    var f = new Uint8Array(h.data.byteLength + r);
                                                                    f.set(h.data, 0), f.set(t.subarray(0, r), h.data.byteLength), h.data = f
                                                                }
                                                            }
                                                            l < i ? (u = l, c = 31 & t[l], a = 0) : a = -1
                                                        } else a = 0;
                                        else a = 3;
                                        else a = e ? 0 : 2;
                                        else a = e ? 0 : 1;
                                        if (u >= 0 && a >= 0) {
                                            var g = {
                                                data: t.subarray(u, i),
                                                type: c,
                                                state: a
                                            };
                                            o.push(g)
                                        }
                                        if (0 === o.length) {
                                            var v = this.getLastNalUnit();
                                            if (v) {
                                                var p = new Uint8Array(v.data.byteLength + t.byteLength);
                                                p.set(v.data, 0), p.set(t, v.data.byteLength), v.data = p
                                            }
                                        }
                                        return n.naluState = a, o
                                    }, e.parseAACPES = function(t) {
                                        var e, r, n, a, s, o = 0,
                                            u = this._audioTrack,
                                            h = this.aacOverFlow,
                                            f = t.data;
                                        if (h) {
                                            this.aacOverFlow = null;
                                            var g = h.sample.unit.byteLength,
                                                v = Math.min(h.missing, g),
                                                p = g - v;
                                            h.sample.unit.set(f.subarray(0, v), p), u.samples.push(h.sample), o = h.missing
                                        }
                                        for (e = o, r = f.length; e < r - 1 && !i.isHeader(f, e); e++);
                                        if (e === o || (e < r - 1 ? (n = "AAC PES did not start with ADTS header,offset:" + e, a = !1) : (n = "no ADTS header found in AAC PES", a = !0), c.logger.warn("parsing error:" + n), this.observer.emit(l.Events.ERROR, l.Events.ERROR, {
                                                type: d.ErrorTypes.MEDIA_ERROR,
                                                details: d.ErrorDetails.FRAG_PARSING_ERROR,
                                                fatal: a,
                                                reason: n
                                            }), !a)) {
                                            if (i.initTrackConfig(u, this.observer, f, e, this.audioCodec), void 0 !== t.pts) s = t.pts;
                                            else {
                                                if (!h) return void c.logger.warn("[tsdemuxer]: AAC PES unknown PTS");
                                                var m = i.getFrameDuration(u.samplerate);
                                                s = h.sample.pts + m
                                            }
                                            for (var y = 0; e < r;) {
                                                if (i.isHeader(f, e)) {
                                                    if (e + 5 < r) {
                                                        var E = i.appendFrame(u, f, e, s, y);
                                                        if (E) {
                                                            if (!E.missing) {
                                                                e += E.length, y++;
                                                                continue
                                                            }
                                                            this.aacOverFlow = E
                                                        }
                                                    }
                                                    break
                                                }
                                                e++
                                            }
                                        }
                                    }, e.parseMPEGPES = function(t) {
                                        var e = t.data,
                                            r = e.length,
                                            i = 0,
                                            a = 0,
                                            s = t.pts;
                                        if (void 0 !== s)
                                            for (; a < r;)
                                                if (n.isHeader(e, a)) {
                                                    var o = n.appendFrame(this._audioTrack, e, a, s, i);
                                                    if (!o) break;
                                                    a += o.length, i++
                                                } else a++;
                                        else c.logger.warn("[tsdemuxer]: MPEG PES unknown PTS")
                                    }, e.parseID3PES = function(t) {
                                        void 0 !== t.pts ? this._id3Track.samples.push(t) : c.logger.warn("[tsdemuxer]: ID3 PES unknown PTS")
                                    }, t
                                }();

                            function g(t, e, r, i) {
                                return {
                                    key: t,
                                    frame: !1,
                                    pts: e,
                                    dts: r,
                                    units: [],
                                    debug: i,
                                    length: 0
                                }
                            }

                            function v(t, e) {
                                return (31 & t[e + 10]) << 8 | t[e + 11]
                            }

                            function p(t, e, r, i) {
                                var n = {
                                        audio: -1,
                                        avc: -1,
                                        id3: -1,
                                        isAAC: !0
                                    },
                                    a = e + 3 + ((15 & t[e + 1]) << 8 | t[e + 2]) - 4;
                                for (e += 12 + ((15 & t[e + 10]) << 8 | t[e + 11]); e < a;) {
                                    var s = (31 & t[e + 1]) << 8 | t[e + 2];
                                    switch (t[e]) {
                                        case 207:
                                            if (!i) {
                                                c.logger.log("ADTS AAC with AES-128-CBC frame encryption found in unencrypted stream");
                                                break
                                            }
                                            case 15:
                                                -1 === n.audio && (n.audio = s);
                                                break;
                                            case 21:
                                                -1 === n.id3 && (n.id3 = s);
                                                break;
                                            case 219:
                                                if (!i) {
                                                    c.logger.log("H.264 with AES-128-CBC slice encryption found in unencrypted stream");
                                                    break
                                                }
                                                case 27:
                                                    -1 === n.avc && (n.avc = s);
                                                    break;
                                                case 3:
                                                case 4:
                                                    r ? -1 === n.audio && (n.audio = s, n.isAAC = !1) : c.logger.log("MPEG audio found, not supported in this browser");
                                                    break;
                                                case 36:
                                                    c.logger.warn("Unsupported HEVC stream type found")
                                    }
                                    e += 5 + ((15 & t[e + 3]) << 8 | t[e + 4])
                                }
                                return n
                            }

                            function m(t) {
                                var e, r, i, n, a, s = 0,
                                    o = t.data;
                                if (!t || 0 === t.size) return null;
                                for (; o[0].length < 19 && o.length > 1;) {
                                    var l = new Uint8Array(o[0].length + o[1].length);
                                    l.set(o[0]), l.set(o[1], o[0].length), o[0] = l, o.splice(1, 1)
                                }
                                if (1 === ((e = o[0])[0] << 16) + (e[1] << 8) + e[2]) {
                                    if ((r = (e[4] << 8) + e[5]) && r > t.size - 6) return null;
                                    var u = e[7];
                                    192 & u && (n = 536870912 * (14 & e[9]) + 4194304 * (255 & e[10]) + 16384 * (254 & e[11]) + 128 * (255 & e[12]) + (254 & e[13]) / 2, 64 & u ? n - (a = 536870912 * (14 & e[14]) + 4194304 * (255 & e[15]) + 16384 * (254 & e[16]) + 128 * (255 & e[17]) + (254 & e[18]) / 2) > 54e5 && (c.logger.warn(Math.round((n - a) / 9e4) + "s delta between PTS and DTS, align them"), n = a) : a = n);
                                    var d = (i = e[8]) + 9;
                                    if (t.size <= d) return null;
                                    t.size -= d;
                                    for (var h = new Uint8Array(t.size), f = 0, g = o.length; f < g; f++) {
                                        var v = (e = o[f]).byteLength;
                                        if (d) {
                                            if (d > v) {
                                                d -= v;
                                                continue
                                            }
                                            e = e.subarray(d), v -= d, d = 0
                                        }
                                        h.set(e, s), s += v
                                    }
                                    return r && (r -= i + 3), {
                                        data: h,
                                        pts: n,
                                        dts: a,
                                        len: r
                                    }
                                }
                                return null
                            }

                            function y(t, e) {
                                if (t.units.length && t.frame) {
                                    if (void 0 === t.pts) {
                                        var r = e.samples,
                                            i = r.length;
                                        if (!i) return void e.dropped++;
                                        var n = r[i - 1];
                                        t.pts = n.pts, t.dts = n.dts
                                    }
                                    e.samples.push(t)
                                }
                                t.debug.length && c.logger.log(t.pts + "/" + t.dts + ":" + t.debug)
                            }

                            function E(t, e) {
                                var r = t.length;
                                if (r > 0) {
                                    if (e.pts >= t[r - 1].pts) t.push(e);
                                    else
                                        for (var i = r - 1; i >= 0; i--)
                                            if (e.pts < t[i].pts) {
                                                t.splice(i, 0, e);
                                                break
                                            }
                                } else t.push(e)
                            }

                            function T(t) {
                                for (var e = t.byteLength, r = [], i = 1; i < e - 2;) 0 === t[i] && 0 === t[i + 1] && 3 === t[i + 2] ? (r.push(i + 2), i += 2) : i++;
                                if (0 === r.length) return t;
                                var n = e - r.length,
                                    a = new Uint8Array(n),
                                    s = 0;
                                for (i = 0; i < n; s++, i++) s === r[0] && (s++, r.shift()), a[i] = t[s];
                                return a
                            }
                            f.minProbeByteLength = 188, e.default = f
                        },
                        "./src/errors.ts": function(t, e, r) {
                            "use strict";
                            var i, n;
                            r.r(e), r.d(e, "ErrorTypes", (function() {
                                    return i
                                })), r.d(e, "ErrorDetails", (function() {
                                    return n
                                })),
                                function(t) {
                                    t.NETWORK_ERROR = "networkError", t.MEDIA_ERROR = "mediaError", t.KEY_SYSTEM_ERROR = "keySystemError", t.MUX_ERROR = "muxError", t.OTHER_ERROR = "otherError"
                                }(i || (i = {})),
                                function(t) {
                                    t.KEY_SYSTEM_NO_KEYS = "keySystemNoKeys", t.KEY_SYSTEM_NO_ACCESS = "keySystemNoAccess", t.KEY_SYSTEM_NO_SESSION = "keySystemNoSession", t.KEY_SYSTEM_LICENSE_REQUEST_FAILED = "keySystemLicenseRequestFailed", t.KEY_SYSTEM_NO_INIT_DATA = "keySystemNoInitData", t.MANIFEST_LOAD_ERROR = "manifestLoadError", t.MANIFEST_LOAD_TIMEOUT = "manifestLoadTimeOut", t.MANIFEST_PARSING_ERROR = "manifestParsingError", t.MANIFEST_INCOMPATIBLE_CODECS_ERROR = "manifestIncompatibleCodecsError", t.LEVEL_EMPTY_ERROR = "levelEmptyError", t.LEVEL_LOAD_ERROR = "levelLoadError", t.LEVEL_LOAD_TIMEOUT = "levelLoadTimeOut", t.LEVEL_SWITCH_ERROR = "levelSwitchError", t.AUDIO_TRACK_LOAD_ERROR = "audioTrackLoadError", t.AUDIO_TRACK_LOAD_TIMEOUT = "audioTrackLoadTimeOut", t.SUBTITLE_LOAD_ERROR = "subtitleTrackLoadError", t.SUBTITLE_TRACK_LOAD_TIMEOUT = "subtitleTrackLoadTimeOut", t.FRAG_LOAD_ERROR = "fragLoadError", t.FRAG_LOAD_TIMEOUT = "fragLoadTimeOut", t.FRAG_DECRYPT_ERROR = "fragDecryptError", t.FRAG_PARSING_ERROR = "fragParsingError", t.REMUX_ALLOC_ERROR = "remuxAllocError", t.KEY_LOAD_ERROR = "keyLoadError", t.KEY_LOAD_TIMEOUT = "keyLoadTimeOut", t.BUFFER_ADD_CODEC_ERROR = "bufferAddCodecError", t.BUFFER_INCOMPATIBLE_CODECS_ERROR = "bufferIncompatibleCodecsError", t.BUFFER_APPEND_ERROR = "bufferAppendError", t.BUFFER_APPENDING_ERROR = "bufferAppendingError", t.BUFFER_STALLED_ERROR = "bufferStalledError", t.BUFFER_FULL_ERROR = "bufferFullError", t.BUFFER_SEEK_OVER_HOLE = "bufferSeekOverHole", t.BUFFER_NUDGE_ON_STALL = "bufferNudgeOnStall", t.INTERNAL_EXCEPTION = "internalException", t.INTERNAL_ABORTED = "aborted", t.UNKNOWN = "unknown"
                                }(n || (n = {}))
                        },
                        "./src/events.ts": function(t, e, r) {
                            "use strict";
                            var i;
                            r.r(e), r.d(e, "Events", (function() {
                                    return i
                                })),
                                function(t) {
                                    t.MEDIA_ATTACHING = "hlsMediaAttaching", t.MEDIA_ATTACHED = "hlsMediaAttached", t.MEDIA_DETACHING = "hlsMediaDetaching", t.MEDIA_DETACHED = "hlsMediaDetached", t.BUFFER_RESET = "hlsBufferReset", t.BUFFER_CODECS = "hlsBufferCodecs", t.BUFFER_CREATED = "hlsBufferCreated", t.BUFFER_APPENDING = "hlsBufferAppending", t.BUFFER_APPENDED = "hlsBufferAppended", t.BUFFER_EOS = "hlsBufferEos", t.BUFFER_FLUSHING = "hlsBufferFlushing", t.BUFFER_FLUSHED = "hlsBufferFlushed", t.MANIFEST_LOADING = "hlsManifestLoading", t.MANIFEST_LOADED = "hlsManifestLoaded", t.MANIFEST_PARSED = "hlsManifestParsed", t.LEVEL_SWITCHING = "hlsLevelSwitching", t.LEVEL_SWITCHED = "hlsLevelSwitched", t.LEVEL_LOADING = "hlsLevelLoading", t.LEVEL_LOADED = "hlsLevelLoaded", t.LEVEL_UPDATED = "hlsLevelUpdated", t.LEVEL_PTS_UPDATED = "hlsLevelPtsUpdated", t.LEVELS_UPDATED = "hlsLevelsUpdated", t.AUDIO_TRACKS_UPDATED = "hlsAudioTracksUpdated", t.AUDIO_TRACK_SWITCHING = "hlsAudioTrackSwitching", t.AUDIO_TRACK_SWITCHED = "hlsAudioTrackSwitched", t.AUDIO_TRACK_LOADING = "hlsAudioTrackLoading", t.AUDIO_TRACK_LOADED = "hlsAudioTrackLoaded", t.SUBTITLE_TRACKS_UPDATED = "hlsSubtitleTracksUpdated", t.SUBTITLE_TRACKS_CLEARED = "hlsSubtitleTracksCleared", t.SUBTITLE_TRACK_SWITCH = "hlsSubtitleTrackSwitch", t.SUBTITLE_TRACK_LOADING = "hlsSubtitleTrackLoading", t.SUBTITLE_TRACK_LOADED = "hlsSubtitleTrackLoaded", t.SUBTITLE_FRAG_PROCESSED = "hlsSubtitleFragProcessed", t.CUES_PARSED = "hlsCuesParsed", t.NON_NATIVE_TEXT_TRACKS_FOUND = "hlsNonNativeTextTracksFound", t.INIT_PTS_FOUND = "hlsInitPtsFound", t.FRAG_LOADING = "hlsFragLoading", t.FRAG_LOAD_EMERGENCY_ABORTED = "hlsFragLoadEmergencyAborted", t.FRAG_LOADED = "hlsFragLoaded", t.FRAG_DECRYPTED = "hlsFragDecrypted", t.FRAG_PARSING_INIT_SEGMENT = "hlsFragParsingInitSegment", t.FRAG_PARSING_USERDATA = "hlsFragParsingUserdata", t.FRAG_PARSING_METADATA = "hlsFragParsingMetadata", t.FRAG_PARSED = "hlsFragParsed", t.FRAG_BUFFERED = "hlsFragBuffered", t.FRAG_CHANGED = "hlsFragChanged", t.FPS_DROP = "hlsFpsDrop", t.FPS_DROP_LEVEL_CAPPING = "hlsFpsDropLevelCapping", t.ERROR = "hlsError", t.DESTROYING = "hlsDestroying", t.KEY_LOADING = "hlsKeyLoading", t.KEY_LOADED = "hlsKeyLoaded", t.LIVE_BACK_BUFFER_REACHED = "hlsLiveBackBufferReached", t.BACK_BUFFER_REACHED = "hlsBackBufferReached"
                                }(i || (i = {}))
                        },
                        "./src/hls.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "default", (function() {
                                return y
                            }));
                            var i = r("./node_modules/url-toolkit/src/url-toolkit.js"),
                                n = r("./src/loader/playlist-loader.ts"),
                                a = r("./src/loader/key-loader.ts"),
                                s = r("./src/controller/id3-track-controller.ts"),
                                o = r("./src/controller/latency-controller.ts"),
                                l = r("./src/controller/level-controller.ts"),
                                u = r("./src/controller/fragment-tracker.ts"),
                                c = r("./src/controller/stream-controller.ts"),
                                d = r("./src/is-supported.ts"),
                                h = r("./src/utils/logger.ts"),
                                f = r("./src/config.ts"),
                                g = r("./node_modules/eventemitter3/index.js"),
                                v = r("./src/events.ts"),
                                p = r("./src/errors.ts");

                            function m(t, e) {
                                for (var r = 0; r < e.length; r++) {
                                    var i = e[r];
                                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                                }
                            }
                            var y = function() {
                                function t(e) {
                                    void 0 === e && (e = {}), this.config = void 0, this.userConfig = void 0, this.coreComponents = void 0, this.networkControllers = void 0, this._emitter = new g.EventEmitter, this._autoLevelCapping = void 0, this.abrController = void 0, this.bufferController = void 0, this.capLevelController = void 0, this.latencyController = void 0, this.levelController = void 0, this.streamController = void 0, this.audioTrackController = void 0, this.subtitleTrackController = void 0, this.emeController = void 0, this._media = null, this.url = null;
                                    var r = this.config = Object(f.mergeConfig)(t.DefaultConfig, e);
                                    this.userConfig = e, Object(h.enableLogs)(r.debug), this._autoLevelCapping = -1, r.progressive && Object(f.enableStreamingMode)(r);
                                    var i = r.abrController,
                                        d = r.bufferController,
                                        v = r.capLevelController,
                                        p = r.fpsController,
                                        m = this.abrController = new i(this),
                                        y = this.bufferController = new d(this),
                                        E = this.capLevelController = new v(this),
                                        T = new p(this),
                                        b = new n.default(this),
                                        S = new a.default(this),
                                        L = new s.default(this),
                                        A = this.levelController = new l.default(this),
                                        D = new u.FragmentTracker(this),
                                        k = this.streamController = new c.default(this, D);
                                    E.setStreamController(k), T.setStreamController(k);
                                    var R = [A, k];
                                    this.networkControllers = R;
                                    var _ = [b, S, m, y, E, T, L, D];
                                    this.audioTrackController = this.createController(r.audioTrackController, null, R), this.createController(r.audioStreamController, D, R), this.subtitleTrackController = this.createController(r.subtitleTrackController, null, R), this.createController(r.subtitleStreamController, D, R), this.createController(r.timelineController, null, _), this.emeController = this.createController(r.emeController, null, _), this.latencyController = this.createController(o.default, null, _), this.coreComponents = _
                                }
                                t.isSupported = function() {
                                    return Object(d.isSupported)()
                                };
                                var e, r, y, E = t.prototype;
                                return E.createController = function(t, e, r) {
                                    if (t) {
                                        var i = e ? new t(this, e) : new t(this);
                                        return r && r.push(i), i
                                    }
                                    return null
                                }, E.on = function(t, e, r) {
                                    void 0 === r && (r = this), this._emitter.on(t, e, r)
                                }, E.once = function(t, e, r) {
                                    void 0 === r && (r = this), this._emitter.once(t, e, r)
                                }, E.removeAllListeners = function(t) {
                                    this._emitter.removeAllListeners(t)
                                }, E.off = function(t, e, r, i) {
                                    void 0 === r && (r = this), this._emitter.off(t, e, r, i)
                                }, E.listeners = function(t) {
                                    return this._emitter.listeners(t)
                                }, E.emit = function(t, e, r) {
                                    return this._emitter.emit(t, e, r)
                                }, E.trigger = function(t, e) {
                                    if (this.config.debug) return this.emit(t, t, e);
                                    try {
                                        return this.emit(t, t, e)
                                    } catch (e) {
                                        h.logger.error("An internal error happened while handling event " + t + '. Error message: "' + e.message + '". Here is a stacktrace:', e), this.trigger(v.Events.ERROR, {
                                            type: p.ErrorTypes.OTHER_ERROR,
                                            details: p.ErrorDetails.INTERNAL_EXCEPTION,
                                            fatal: !1,
                                            event: t,
                                            error: e
                                        })
                                    }
                                    return !1
                                }, E.listenerCount = function(t) {
                                    return this._emitter.listenerCount(t)
                                }, E.destroy = function() {
                                    h.logger.log("destroy"), this.trigger(v.Events.DESTROYING, void 0), this.detachMedia(), this.removeAllListeners(), this._autoLevelCapping = -1, this.url = null, this.networkControllers.forEach((function(t) {
                                        return t.destroy()
                                    })), this.networkControllers.length = 0, this.coreComponents.forEach((function(t) {
                                        return t.destroy()
                                    })), this.coreComponents.length = 0
                                }, E.attachMedia = function(t) {
                                    h.logger.log("attachMedia"), this._media = t, this.trigger(v.Events.MEDIA_ATTACHING, {
                                        media: t
                                    })
                                }, E.detachMedia = function() {
                                    h.logger.log("detachMedia"), this.trigger(v.Events.MEDIA_DETACHING, void 0), this._media = null
                                }, E.loadSource = function(t) {
                                    this.stopLoad();
                                    var e = this.media,
                                        r = this.url,
                                        n = this.url = i.buildAbsoluteURL(self.location.href, t, {
                                            alwaysNormalize: !0
                                        });
                                    h.logger.log("loadSource:" + n), e && r && r !== n && this.bufferController.hasSourceTypes() && (this.detachMedia(), this.attachMedia(e)), this.trigger(v.Events.MANIFEST_LOADING, {
                                        url: t
                                    })
                                }, E.startLoad = function(t) {
                                    void 0 === t && (t = -1), h.logger.log("startLoad(" + t + ")"), this.networkControllers.forEach((function(e) {
                                        e.startLoad(t)
                                    }))
                                }, E.stopLoad = function() {
                                    h.logger.log("stopLoad"), this.networkControllers.forEach((function(t) {
                                        t.stopLoad()
                                    }))
                                }, E.swapAudioCodec = function() {
                                    h.logger.log("swapAudioCodec"), this.streamController.swapAudioCodec()
                                }, E.recoverMediaError = function() {
                                    h.logger.log("recoverMediaError");
                                    var t = this._media;
                                    this.detachMedia(), t && this.attachMedia(t)
                                }, E.removeLevel = function(t, e) {
                                    void 0 === e && (e = 0), this.levelController.removeLevel(t, e)
                                }, e = t, y = [{
                                    key: "version",
                                    get: function() {
                                        return "1.0.9"
                                    }
                                }, {
                                    key: "Events",
                                    get: function() {
                                        return v.Events
                                    }
                                }, {
                                    key: "ErrorTypes",
                                    get: function() {
                                        return p.ErrorTypes
                                    }
                                }, {
                                    key: "ErrorDetails",
                                    get: function() {
                                        return p.ErrorDetails
                                    }
                                }, {
                                    key: "DefaultConfig",
                                    get: function() {
                                        return t.defaultConfig ? t.defaultConfig : f.hlsDefaultConfig
                                    },
                                    set: function(e) {
                                        t.defaultConfig = e
                                    }
                                }], (r = [{
                                    key: "levels",
                                    get: function() {
                                        return this.levelController.levels || []
                                    }
                                }, {
                                    key: "currentLevel",
                                    get: function() {
                                        return this.streamController.currentLevel
                                    },
                                    set: function(t) {
                                        h.logger.log("set currentLevel:" + t), this.loadLevel = t, this.abrController.clearTimer(), this.streamController.immediateLevelSwitch()
                                    }
                                }, {
                                    key: "nextLevel",
                                    get: function() {
                                        return this.streamController.nextLevel
                                    },
                                    set: function(t) {
                                        h.logger.log("set nextLevel:" + t), this.levelController.manualLevel = t, this.streamController.nextLevelSwitch()
                                    }
                                }, {
                                    key: "loadLevel",
                                    get: function() {
                                        return this.levelController.level
                                    },
                                    set: function(t) {
                                        h.logger.log("set loadLevel:" + t), this.levelController.manualLevel = t
                                    }
                                }, {
                                    key: "nextLoadLevel",
                                    get: function() {
                                        return this.levelController.nextLoadLevel
                                    },
                                    set: function(t) {
                                        this.levelController.nextLoadLevel = t
                                    }
                                }, {
                                    key: "firstLevel",
                                    get: function() {
                                        return Math.max(this.levelController.firstLevel, this.minAutoLevel)
                                    },
                                    set: function(t) {
                                        h.logger.log("set firstLevel:" + t), this.levelController.firstLevel = t
                                    }
                                }, {
                                    key: "startLevel",
                                    get: function() {
                                        return this.levelController.startLevel
                                    },
                                    set: function(t) {
                                        h.logger.log("set startLevel:" + t), -1 !== t && (t = Math.max(t, this.minAutoLevel)), this.levelController.startLevel = t
                                    }
                                }, {
                                    key: "capLevelToPlayerSize",
                                    get: function() {
                                        return this.config.capLevelToPlayerSize
                                    },
                                    set: function(t) {
                                        var e = !!t;
                                        e !== this.config.capLevelToPlayerSize && (e ? this.capLevelController.startCapping() : (this.capLevelController.stopCapping(), this.autoLevelCapping = -1, this.streamController.nextLevelSwitch()), this.config.capLevelToPlayerSize = e)
                                    }
                                }, {
                                    key: "autoLevelCapping",
                                    get: function() {
                                        return this._autoLevelCapping
                                    },
                                    set: function(t) {
                                        this._autoLevelCapping !== t && (h.logger.log("set autoLevelCapping:" + t), this._autoLevelCapping = t)
                                    }
                                }, {
                                    key: "bandwidthEstimate",
                                    get: function() {
                                        var t = this.abrController.bwEstimator;
                                        return t ? t.getEstimate() : NaN
                                    }
                                }, {
                                    key: "autoLevelEnabled",
                                    get: function() {
                                        return -1 === this.levelController.manualLevel
                                    }
                                }, {
                                    key: "manualLevel",
                                    get: function() {
                                        return this.levelController.manualLevel
                                    }
                                }, {
                                    key: "minAutoLevel",
                                    get: function() {
                                        var t = this.levels,
                                            e = this.config.minAutoBitrate;
                                        if (!t) return 0;
                                        for (var r = t.length, i = 0; i < r; i++)
                                            if (t[i].maxBitrate > e) return i;
                                        return 0
                                    }
                                }, {
                                    key: "maxAutoLevel",
                                    get: function() {
                                        var t = this.levels,
                                            e = this.autoLevelCapping;
                                        return -1 === e && t && t.length ? t.length - 1 : e
                                    }
                                }, {
                                    key: "nextAutoLevel",
                                    get: function() {
                                        return Math.min(Math.max(this.abrController.nextAutoLevel, this.minAutoLevel), this.maxAutoLevel)
                                    },
                                    set: function(t) {
                                        this.abrController.nextAutoLevel = Math.max(this.minAutoLevel, t)
                                    }
                                }, {
                                    key: "audioTracks",
                                    get: function() {
                                        var t = this.audioTrackController;
                                        return t ? t.audioTracks : []
                                    }
                                }, {
                                    key: "audioTrack",
                                    get: function() {
                                        var t = this.audioTrackController;
                                        return t ? t.audioTrack : -1
                                    },
                                    set: function(t) {
                                        var e = this.audioTrackController;
                                        e && (e.audioTrack = t)
                                    }
                                }, {
                                    key: "subtitleTracks",
                                    get: function() {
                                        var t = this.subtitleTrackController;
                                        return t ? t.subtitleTracks : []
                                    }
                                }, {
                                    key: "subtitleTrack",
                                    get: function() {
                                        var t = this.subtitleTrackController;
                                        return t ? t.subtitleTrack : -1
                                    },
                                    set: function(t) {
                                        var e = this.subtitleTrackController;
                                        e && (e.subtitleTrack = t)
                                    }
                                }, {
                                    key: "media",
                                    get: function() {
                                        return this._media
                                    }
                                }, {
                                    key: "subtitleDisplay",
                                    get: function() {
                                        var t = this.subtitleTrackController;
                                        return !!t && t.subtitleDisplay
                                    },
                                    set: function(t) {
                                        var e = this.subtitleTrackController;
                                        e && (e.subtitleDisplay = t)
                                    }
                                }, {
                                    key: "lowLatencyMode",
                                    get: function() {
                                        return this.config.lowLatencyMode
                                    },
                                    set: function(t) {
                                        this.config.lowLatencyMode = t
                                    }
                                }, {
                                    key: "liveSyncPosition",
                                    get: function() {
                                        return this.latencyController.liveSyncPosition
                                    }
                                }, {
                                    key: "latency",
                                    get: function() {
                                        return this.latencyController.latency
                                    }
                                }, {
                                    key: "maxLatency",
                                    get: function() {
                                        return this.latencyController.maxLatency
                                    }
                                }, {
                                    key: "targetLatency",
                                    get: function() {
                                        return this.latencyController.targetLatency
                                    }
                                }, {
                                    key: "drift",
                                    get: function() {
                                        return this.latencyController.drift
                                    }
                                }, {
                                    key: "forceStartLoad",
                                    get: function() {
                                        return this.streamController.forceStartLoad
                                    }
                                }]) && m(e.prototype, r), y && m(e, y), t
                            }();
                            y.defaultConfig = void 0
                        },
                        "./src/is-supported.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "isSupported", (function() {
                                return a
                            })), r.d(e, "changeTypeSupported", (function() {
                                return s
                            }));
                            var i = r("./src/utils/mediasource-helper.ts");

                            function n() {
                                return self.SourceBuffer || self.WebKitSourceBuffer
                            }

                            function a() {
                                var t = Object(i.getMediaSource)();
                                if (!t) return !1;
                                var e = n(),
                                    r = t && "function" == typeof t.isTypeSupported && t.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'),
                                    a = !e || e.prototype && "function" == typeof e.prototype.appendBuffer && "function" == typeof e.prototype.remove;
                                return !!r && !!a
                            }

                            function s() {
                                var t, e = n();
                                return "function" == typeof(null == e || null === (t = e.prototype) || void 0 === t ? void 0 : t.changeType)
                            }
                        },
                        "./src/loader/fragment-loader.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "default", (function() {
                                return d
                            })), r.d(e, "LoadError", (function() {
                                return f
                            }));
                            var i = r("./src/polyfills/number.ts"),
                                n = r("./src/errors.ts");

                            function a(t) {
                                var e = "function" == typeof Map ? new Map : void 0;
                                return (a = function(t) {
                                    if (null === t || (r = t, -1 === Function.toString.call(r).indexOf("[native code]"))) return t;
                                    var r;
                                    if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
                                    if (void 0 !== e) {
                                        if (e.has(t)) return e.get(t);
                                        e.set(t, i)
                                    }

                                    function i() {
                                        return s(t, arguments, u(this).constructor)
                                    }
                                    return i.prototype = Object.create(t.prototype, {
                                        constructor: {
                                            value: i,
                                            enumerable: !1,
                                            writable: !0,
                                            configurable: !0
                                        }
                                    }), l(i, t)
                                })(t)
                            }

                            function s(t, e, r) {
                                return (s = o() ? Reflect.construct : function(t, e, r) {
                                    var i = [null];
                                    i.push.apply(i, e);
                                    var n = new(Function.bind.apply(t, i));
                                    return r && l(n, r.prototype), n
                                }).apply(null, arguments)
                            }

                            function o() {
                                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                                if (Reflect.construct.sham) return !1;
                                if ("function" == typeof Proxy) return !0;
                                try {
                                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                                } catch (t) {
                                    return !1
                                }
                            }

                            function l(t, e) {
                                return (l = Object.setPrototypeOf || function(t, e) {
                                    return t.__proto__ = e, t
                                })(t, e)
                            }

                            function u(t) {
                                return (u = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                                    return t.__proto__ || Object.getPrototypeOf(t)
                                })(t)
                            }
                            var c = Math.pow(2, 17),
                                d = function() {
                                    function t(t) {
                                        this.config = void 0, this.loader = null, this.partLoadTimeout = -1, this.config = t
                                    }
                                    var e = t.prototype;
                                    return e.destroy = function() {
                                        this.loader && (this.loader.destroy(), this.loader = null)
                                    }, e.abort = function() {
                                        this.loader && this.loader.abort()
                                    }, e.load = function(t, e) {
                                        var r = this,
                                            i = t.url;
                                        if (!i) return Promise.reject(new f({
                                            type: n.ErrorTypes.NETWORK_ERROR,
                                            details: n.ErrorDetails.FRAG_LOAD_ERROR,
                                            fatal: !1,
                                            frag: t,
                                            networkDetails: null
                                        }, "Fragment does not have a " + (i ? "part list" : "url")));
                                        this.abort();
                                        var a = this.config,
                                            s = a.fLoader,
                                            o = a.loader;
                                        return new Promise((function(i, l) {
                                            r.loader && r.loader.destroy();
                                            var u = r.loader = t.loader = s ? new s(a) : new o(a),
                                                d = h(t),
                                                g = {
                                                    timeout: a.fragLoadingTimeOut,
                                                    maxRetry: 0,
                                                    retryDelay: 0,
                                                    maxRetryDelay: a.fragLoadingMaxRetryTimeout,
                                                    highWaterMark: c
                                                };
                                            t.stats = u.stats, u.load(d, g, {
                                                onSuccess: function(e, n, a, s) {
                                                    r.resetLoader(t, u), i({
                                                        frag: t,
                                                        part: null,
                                                        payload: e.data,
                                                        networkDetails: s
                                                    })
                                                },
                                                onError: function(e, i, a) {
                                                    r.resetLoader(t, u), l(new f({
                                                        type: n.ErrorTypes.NETWORK_ERROR,
                                                        details: n.ErrorDetails.FRAG_LOAD_ERROR,
                                                        fatal: !1,
                                                        frag: t,
                                                        response: e,
                                                        networkDetails: a
                                                    }))
                                                },
                                                onAbort: function(e, i, a) {
                                                    r.resetLoader(t, u), l(new f({
                                                        type: n.ErrorTypes.NETWORK_ERROR,
                                                        details: n.ErrorDetails.INTERNAL_ABORTED,
                                                        fatal: !1,
                                                        frag: t,
                                                        networkDetails: a
                                                    }))
                                                },
                                                onTimeout: function(e, i, a) {
                                                    r.resetLoader(t, u), l(new f({
                                                        type: n.ErrorTypes.NETWORK_ERROR,
                                                        details: n.ErrorDetails.FRAG_LOAD_TIMEOUT,
                                                        fatal: !1,
                                                        frag: t,
                                                        networkDetails: a
                                                    }))
                                                },
                                                onProgress: function(r, i, n, a) {
                                                    e && e({
                                                        frag: t,
                                                        part: null,
                                                        payload: n,
                                                        networkDetails: a
                                                    })
                                                }
                                            })
                                        }))
                                    }, e.loadPart = function(t, e, r) {
                                        var i = this;
                                        this.abort();
                                        var a = this.config,
                                            s = a.fLoader,
                                            o = a.loader;
                                        return new Promise((function(l, u) {
                                            i.loader && i.loader.destroy();
                                            var d = i.loader = t.loader = s ? new s(a) : new o(a),
                                                g = h(t, e),
                                                v = {
                                                    timeout: a.fragLoadingTimeOut,
                                                    maxRetry: 0,
                                                    retryDelay: 0,
                                                    maxRetryDelay: a.fragLoadingMaxRetryTimeout,
                                                    highWaterMark: c
                                                };
                                            e.stats = d.stats, d.load(g, v, {
                                                onSuccess: function(n, a, s, o) {
                                                    i.resetLoader(t, d), i.updateStatsFromPart(t, e);
                                                    var u = {
                                                        frag: t,
                                                        part: e,
                                                        payload: n.data,
                                                        networkDetails: o
                                                    };
                                                    r(u), l(u)
                                                },
                                                onError: function(r, a, s) {
                                                    i.resetLoader(t, d), u(new f({
                                                        type: n.ErrorTypes.NETWORK_ERROR,
                                                        details: n.ErrorDetails.FRAG_LOAD_ERROR,
                                                        fatal: !1,
                                                        frag: t,
                                                        part: e,
                                                        response: r,
                                                        networkDetails: s
                                                    }))
                                                },
                                                onAbort: function(r, a, s) {
                                                    t.stats.aborted = e.stats.aborted, i.resetLoader(t, d), u(new f({
                                                        type: n.ErrorTypes.NETWORK_ERROR,
                                                        details: n.ErrorDetails.INTERNAL_ABORTED,
                                                        fatal: !1,
                                                        frag: t,
                                                        part: e,
                                                        networkDetails: s
                                                    }))
                                                },
                                                onTimeout: function(r, a, s) {
                                                    i.resetLoader(t, d), u(new f({
                                                        type: n.ErrorTypes.NETWORK_ERROR,
                                                        details: n.ErrorDetails.FRAG_LOAD_TIMEOUT,
                                                        fatal: !1,
                                                        frag: t,
                                                        part: e,
                                                        networkDetails: s
                                                    }))
                                                }
                                            })
                                        }))
                                    }, e.updateStatsFromPart = function(t, e) {
                                        var r = t.stats,
                                            i = e.stats,
                                            n = i.total;
                                        if (r.loaded += i.loaded, n) {
                                            var a = Math.round(t.duration / e.duration),
                                                s = Math.min(Math.round(r.loaded / n), a),
                                                o = (a - s) * Math.round(r.loaded / s);
                                            r.total = r.loaded + o
                                        } else r.total = Math.max(r.loaded, r.total);
                                        var l = r.loading,
                                            u = i.loading;
                                        l.start ? l.first += u.first - u.start : (l.start = u.start, l.first = u.first), l.end = u.end
                                    }, e.resetLoader = function(t, e) {
                                        t.loader = null, this.loader === e && (self.clearTimeout(this.partLoadTimeout), this.loader = null), e.destroy()
                                    }, t
                                }();

                            function h(t, e) {
                                void 0 === e && (e = null);
                                var r = e || t,
                                    n = {
                                        frag: t,
                                        part: e,
                                        responseType: "arraybuffer",
                                        url: r.url,
                                        rangeStart: 0,
                                        rangeEnd: 0
                                    },
                                    a = r.byteRangeStartOffset,
                                    s = r.byteRangeEndOffset;
                                return Object(i.isFiniteNumber)(a) && Object(i.isFiniteNumber)(s) && (n.rangeStart = a, n.rangeEnd = s), n
                            }
                            var f = function(t) {
                                var e, r;

                                function i(e) {
                                    for (var r, i = arguments.length, n = new Array(i > 1 ? i - 1 : 0), a = 1; a < i; a++) n[a - 1] = arguments[a];
                                    return (r = t.call.apply(t, [this].concat(n)) || this).data = void 0, r.data = e, r
                                }
                                return r = t, (e = i).prototype = Object.create(r.prototype), e.prototype.constructor = e, l(e, r), i
                            }(a(Error))
                        },
                        "./src/loader/fragment.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "ElementaryStreamTypes", (function() {
                                return i
                            })), r.d(e, "BaseSegment", (function() {
                                return f
                            })), r.d(e, "Fragment", (function() {
                                return g
                            })), r.d(e, "Part", (function() {
                                return v
                            }));
                            var i, n = r("./src/polyfills/number.ts"),
                                a = r("./node_modules/url-toolkit/src/url-toolkit.js"),
                                s = r("./src/utils/logger.ts"),
                                o = r("./src/loader/level-key.ts"),
                                l = r("./src/loader/load-stats.ts");

                            function u(t, e) {
                                t.prototype = Object.create(e.prototype), t.prototype.constructor = t, c(t, e)
                            }

                            function c(t, e) {
                                return (c = Object.setPrototypeOf || function(t, e) {
                                    return t.__proto__ = e, t
                                })(t, e)
                            }

                            function d(t, e) {
                                for (var r = 0; r < e.length; r++) {
                                    var i = e[r];
                                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                                }
                            }

                            function h(t, e, r) {
                                return e && d(t.prototype, e), r && d(t, r), t
                            }! function(t) {
                                t.AUDIO = "audio", t.VIDEO = "video", t.AUDIOVIDEO = "audiovideo"
                            }(i || (i = {}));
                            var f = function() {
                                    function t(t) {
                                        var e;
                                        this._byteRange = null, this._url = null, this.baseurl = void 0, this.relurl = void 0, this.elementaryStreams = ((e = {})[i.AUDIO] = null, e[i.VIDEO] = null, e[i.AUDIOVIDEO] = null, e), this.baseurl = t
                                    }
                                    return t.prototype.setByteRange = function(t, e) {
                                        var r = t.split("@", 2),
                                            i = [];
                                        1 === r.length ? i[0] = e ? e.byteRangeEndOffset : 0 : i[0] = parseInt(r[1]), i[1] = parseInt(r[0]) + i[0], this._byteRange = i
                                    }, h(t, [{
                                        key: "byteRange",
                                        get: function() {
                                            return this._byteRange ? this._byteRange : []
                                        }
                                    }, {
                                        key: "byteRangeStartOffset",
                                        get: function() {
                                            return this.byteRange[0]
                                        }
                                    }, {
                                        key: "byteRangeEndOffset",
                                        get: function() {
                                            return this.byteRange[1]
                                        }
                                    }, {
                                        key: "url",
                                        get: function() {
                                            return !this._url && this.baseurl && this.relurl && (this._url = Object(a.buildAbsoluteURL)(this.baseurl, this.relurl, {
                                                alwaysNormalize: !0
                                            })), this._url || ""
                                        },
                                        set: function(t) {
                                            this._url = t
                                        }
                                    }]), t
                                }(),
                                g = function(t) {
                                    function e(e, r) {
                                        var i;
                                        return (i = t.call(this, r) || this)._decryptdata = null, i.rawProgramDateTime = null, i.programDateTime = null, i.tagList = [], i.duration = 0, i.sn = 0, i.levelkey = void 0, i.type = void 0, i.loader = null, i.level = -1, i.cc = 0, i.startPTS = void 0, i.endPTS = void 0, i.appendedPTS = void 0, i.startDTS = void 0, i.endDTS = void 0, i.start = 0, i.deltaPTS = void 0, i.maxStartPTS = void 0, i.minEndPTS = void 0, i.stats = new l.LoadStats, i.urlId = 0, i.data = void 0, i.bitrateTest = !1, i.title = null, i.initSegment = null, i.type = e, i
                                    }
                                    u(e, t);
                                    var r = e.prototype;
                                    return r.createInitializationVector = function(t) {
                                        for (var e = new Uint8Array(16), r = 12; r < 16; r++) e[r] = t >> 8 * (15 - r) & 255;
                                        return e
                                    }, r.setDecryptDataFromLevelKey = function(t, e) {
                                        var r = t;
                                        return "AES-128" === (null == t ? void 0 : t.method) && t.uri && !t.iv && ((r = o.LevelKey.fromURI(t.uri)).method = t.method, r.iv = this.createInitializationVector(e), r.keyFormat = "identity"), r
                                    }, r.setElementaryStreamInfo = function(t, e, r, i, n, a) {
                                        void 0 === a && (a = !1);
                                        var s = this.elementaryStreams,
                                            o = s[t];
                                        o ? (o.startPTS = Math.min(o.startPTS, e), o.endPTS = Math.max(o.endPTS, r), o.startDTS = Math.min(o.startDTS, i), o.endDTS = Math.max(o.endDTS, n)) : s[t] = {
                                            startPTS: e,
                                            endPTS: r,
                                            startDTS: i,
                                            endDTS: n,
                                            partial: a
                                        }
                                    }, r.clearElementaryStreamInfo = function() {
                                        var t = this.elementaryStreams;
                                        t[i.AUDIO] = null, t[i.VIDEO] = null, t[i.AUDIOVIDEO] = null
                                    }, h(e, [{
                                        key: "decryptdata",
                                        get: function() {
                                            if (!this.levelkey && !this._decryptdata) return null;
                                            if (!this._decryptdata && this.levelkey) {
                                                var t = this.sn;
                                                "number" != typeof t && (this.levelkey && "AES-128" === this.levelkey.method && !this.levelkey.iv && s.logger.warn('missing IV for initialization segment with method="' + this.levelkey.method + '" - compliance issue'), t = 0), this._decryptdata = this.setDecryptDataFromLevelKey(this.levelkey, t)
                                            }
                                            return this._decryptdata
                                        }
                                    }, {
                                        key: "end",
                                        get: function() {
                                            return this.start + this.duration
                                        }
                                    }, {
                                        key: "endProgramDateTime",
                                        get: function() {
                                            if (null === this.programDateTime) return null;
                                            if (!Object(n.isFiniteNumber)(this.programDateTime)) return null;
                                            var t = Object(n.isFiniteNumber)(this.duration) ? this.duration : 0;
                                            return this.programDateTime + 1e3 * t
                                        }
                                    }, {
                                        key: "encrypted",
                                        get: function() {
                                            var t;
                                            return !(null === (t = this.decryptdata) || void 0 === t || !t.keyFormat || !this.decryptdata.uri)
                                        }
                                    }]), e
                                }(f),
                                v = function(t) {
                                    function e(e, r, i, n, a) {
                                        var s;
                                        (s = t.call(this, i) || this).fragOffset = 0, s.duration = 0, s.gap = !1, s.independent = !1, s.relurl = void 0, s.fragment = void 0, s.index = void 0, s.stats = new l.LoadStats, s.duration = e.decimalFloatingPoint("DURATION"), s.gap = e.bool("GAP"), s.independent = e.bool("INDEPENDENT"), s.relurl = e.enumeratedString("URI"), s.fragment = r, s.index = n;
                                        var o = e.enumeratedString("BYTERANGE");
                                        return o && s.setByteRange(o, a), a && (s.fragOffset = a.fragOffset + a.duration), s
                                    }
                                    return u(e, t), h(e, [{
                                        key: "start",
                                        get: function() {
                                            return this.fragment.start + this.fragOffset
                                        }
                                    }, {
                                        key: "end",
                                        get: function() {
                                            return this.start + this.duration
                                        }
                                    }, {
                                        key: "loaded",
                                        get: function() {
                                            var t = this.elementaryStreams;
                                            return !!(t.audio || t.video || t.audiovideo)
                                        }
                                    }]), e
                                }(f)
                        },
                        "./src/loader/key-loader.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "default", (function() {
                                return s
                            }));
                            var i = r("./src/events.ts"),
                                n = r("./src/errors.ts"),
                                a = r("./src/utils/logger.ts"),
                                s = function() {
                                    function t(t) {
                                        this.hls = void 0, this.loaders = {}, this.decryptkey = null, this.decrypturl = null, this.hls = t, this._registerListeners()
                                    }
                                    var e = t.prototype;
                                    return e._registerListeners = function() {
                                        this.hls.on(i.Events.KEY_LOADING, this.onKeyLoading, this)
                                    }, e._unregisterListeners = function() {
                                        this.hls.off(i.Events.KEY_LOADING, this.onKeyLoading)
                                    }, e.destroy = function() {
                                        for (var t in this._unregisterListeners(), this.loaders) {
                                            var e = this.loaders[t];
                                            e && e.destroy()
                                        }
                                        this.loaders = {}
                                    }, e.onKeyLoading = function(t, e) {
                                        var r = e.frag,
                                            n = r.type,
                                            s = this.loaders[n];
                                        if (r.decryptdata) {
                                            var o = r.decryptdata.uri;
                                            if (o !== this.decrypturl || null === this.decryptkey) {
                                                var l = this.hls.config;
                                                if (s && (a.logger.warn("abort previous key loader for type:" + n), s.abort()), !o) return void a.logger.warn("key uri is falsy");
                                                var u = l.loader,
                                                    c = r.loader = this.loaders[n] = new u(l);
                                                this.decrypturl = o, this.decryptkey = null;
                                                var d = {
                                                        url: o,
                                                        frag: r,
                                                        responseType: "arraybuffer"
                                                    },
                                                    h = {
                                                        timeout: l.fragLoadingTimeOut,
                                                        maxRetry: 0,
                                                        retryDelay: l.fragLoadingRetryDelay,
                                                        maxRetryDelay: l.fragLoadingMaxRetryTimeout,
                                                        highWaterMark: 0
                                                    },
                                                    f = {
                                                        onSuccess: this.loadsuccess.bind(this),
                                                        onError: this.loaderror.bind(this),
                                                        onTimeout: this.loadtimeout.bind(this)
                                                    };
                                                c.load(d, h, f)
                                            } else this.decryptkey && (r.decryptdata.key = this.decryptkey, this.hls.trigger(i.Events.KEY_LOADED, {
                                                frag: r
                                            }))
                                        } else a.logger.warn("Missing decryption data on fragment in onKeyLoading")
                                    }, e.loadsuccess = function(t, e, r) {
                                        var n = r.frag;
                                        n.decryptdata ? (this.decryptkey = n.decryptdata.key = new Uint8Array(t.data), n.loader = null, delete this.loaders[n.type], this.hls.trigger(i.Events.KEY_LOADED, {
                                            frag: n
                                        })) : a.logger.error("after key load, decryptdata unset")
                                    }, e.loaderror = function(t, e) {
                                        var r = e.frag,
                                            a = r.loader;
                                        a && a.abort(), delete this.loaders[r.type], this.hls.trigger(i.Events.ERROR, {
                                            type: n.ErrorTypes.NETWORK_ERROR,
                                            details: n.ErrorDetails.KEY_LOAD_ERROR,
                                            fatal: !1,
                                            frag: r,
                                            response: t
                                        })
                                    }, e.loadtimeout = function(t, e) {
                                        var r = e.frag,
                                            a = r.loader;
                                        a && a.abort(), delete this.loaders[r.type], this.hls.trigger(i.Events.ERROR, {
                                            type: n.ErrorTypes.NETWORK_ERROR,
                                            details: n.ErrorDetails.KEY_LOAD_TIMEOUT,
                                            fatal: !1,
                                            frag: r
                                        })
                                    }, t
                                }()
                        },
                        "./src/loader/level-details.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "LevelDetails", (function() {
                                return a
                            }));
                            var i = r("./src/polyfills/number.ts");

                            function n(t, e) {
                                for (var r = 0; r < e.length; r++) {
                                    var i = e[r];
                                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                                }
                            }
                            var a = function() {
                                function t(t) {
                                    this.PTSKnown = !1, this.alignedSliding = !1, this.averagetargetduration = void 0, this.endCC = 0, this.endSN = 0, this.fragments = void 0, this.fragmentHint = void 0, this.partList = null, this.live = !0, this.ageHeader = 0, this.advancedDateTime = void 0, this.updated = !0, this.advanced = !0, this.availabilityDelay = void 0, this.misses = 0, this.needSidxRanges = !1, this.startCC = 0, this.startSN = 0, this.startTimeOffset = null, this.targetduration = 0, this.totalduration = 0, this.type = null, this.url = void 0, this.m3u8 = "", this.version = null, this.canBlockReload = !1, this.canSkipUntil = 0, this.canSkipDateRanges = !1, this.skippedSegments = 0, this.recentlyRemovedDateranges = void 0, this.partHoldBack = 0, this.holdBack = 0, this.partTarget = 0, this.preloadHint = void 0, this.renditionReports = void 0, this.tuneInGoal = 0, this.deltaUpdateFailed = void 0, this.driftStartTime = 0, this.driftEndTime = 0, this.driftStart = 0, this.driftEnd = 0, this.fragments = [], this.url = t
                                }
                                var e, r;
                                return t.prototype.reloaded = function(t) {
                                    if (!t) return this.advanced = !0, void(this.updated = !0);
                                    var e = this.lastPartSn - t.lastPartSn,
                                        r = this.lastPartIndex - t.lastPartIndex;
                                    this.updated = this.endSN !== t.endSN || !!r || !!e, this.advanced = this.endSN > t.endSN || e > 0 || 0 === e && r > 0, this.updated || this.advanced ? this.misses = Math.floor(.6 * t.misses) : this.misses = t.misses + 1, this.availabilityDelay = t.availabilityDelay
                                }, e = t, (r = [{
                                    key: "hasProgramDateTime",
                                    get: function() {
                                        return !!this.fragments.length && Object(i.isFiniteNumber)(this.fragments[this.fragments.length - 1].programDateTime)
                                    }
                                }, {
                                    key: "levelTargetDuration",
                                    get: function() {
                                        return this.averagetargetduration || this.targetduration || 10
                                    }
                                }, {
                                    key: "drift",
                                    get: function() {
                                        var t = this.driftEndTime - this.driftStartTime;
                                        return t > 0 ? 1e3 * (this.driftEnd - this.driftStart) / t : 1
                                    }
                                }, {
                                    key: "edge",
                                    get: function() {
                                        return this.partEnd || this.fragmentEnd
                                    }
                                }, {
                                    key: "partEnd",
                                    get: function() {
                                        var t;
                                        return null !== (t = this.partList) && void 0 !== t && t.length ? this.partList[this.partList.length - 1].end : this.fragmentEnd
                                    }
                                }, {
                                    key: "fragmentEnd",
                                    get: function() {
                                        var t;
                                        return null !== (t = this.fragments) && void 0 !== t && t.length ? this.fragments[this.fragments.length - 1].end : 0
                                    }
                                }, {
                                    key: "age",
                                    get: function() {
                                        return this.advancedDateTime ? Math.max(Date.now() - this.advancedDateTime, 0) / 1e3 : 0
                                    }
                                }, {
                                    key: "lastPartIndex",
                                    get: function() {
                                        var t;
                                        return null !== (t = this.partList) && void 0 !== t && t.length ? this.partList[this.partList.length - 1].index : -1
                                    }
                                }, {
                                    key: "lastPartSn",
                                    get: function() {
                                        var t;
                                        return null !== (t = this.partList) && void 0 !== t && t.length ? this.partList[this.partList.length - 1].fragment.sn : this.endSN
                                    }
                                }]) && n(e.prototype, r), t
                            }()
                        },
                        "./src/loader/level-key.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "LevelKey", (function() {
                                return a
                            }));
                            var i = r("./node_modules/url-toolkit/src/url-toolkit.js");

                            function n(t, e) {
                                for (var r = 0; r < e.length; r++) {
                                    var i = e[r];
                                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                                }
                            }
                            var a = function() {
                                function t(t, e) {
                                    this._uri = null, this.method = null, this.keyFormat = null, this.keyFormatVersions = null, this.keyID = null, this.key = null, this.iv = null, this._uri = e ? Object(i.buildAbsoluteURL)(t, e, {
                                        alwaysNormalize: !0
                                    }) : t
                                }
                                var e, r;
                                return t.fromURL = function(e, r) {
                                    return new t(e, r)
                                }, t.fromURI = function(e) {
                                    return new t(e)
                                }, e = t, (r = [{
                                    key: "uri",
                                    get: function() {
                                        return this._uri
                                    }
                                }]) && n(e.prototype, r), t
                            }()
                        },
                        "./src/loader/load-stats.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "LoadStats", (function() {
                                return i
                            }));
                            var i = function() {
                                this.aborted = !1, this.loaded = 0, this.retry = 0, this.total = 0, this.chunkCount = 0, this.bwEstimate = 0, this.loading = {
                                    start: 0,
                                    first: 0,
                                    end: 0
                                }, this.parsing = {
                                    start: 0,
                                    end: 0
                                }, this.buffering = {
                                    start: 0,
                                    first: 0,
                                    end: 0
                                }
                            }
                        },
                        "./src/loader/m3u8-parser.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "default", (function() {
                                return p
                            }));
                            var i = r("./src/polyfills/number.ts"),
                                n = r("./node_modules/url-toolkit/src/url-toolkit.js"),
                                a = r("./src/loader/fragment.ts"),
                                s = r("./src/loader/level-details.ts"),
                                o = r("./src/loader/level-key.ts"),
                                l = r("./src/utils/attr-list.ts"),
                                u = r("./src/utils/logger.ts"),
                                c = r("./src/utils/codecs.ts"),
                                d = /#EXT-X-STREAM-INF:([^\r\n]*)(?:[\r\n](?:#[^\r\n]*)?)*([^\r\n]+)|#EXT-X-SESSION-DATA:([^\r\n]*)[\r\n]+/g,
                                h = /#EXT-X-MEDIA:(.*)/g,
                                f = new RegExp([/#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source, /(?!#) *(\S[\S ]*)/.source, /#EXT-X-BYTERANGE:*(.+)/.source, /#EXT-X-PROGRAM-DATE-TIME:(.+)/.source, /#.*/.source].join("|"), "g"),
                                g = new RegExp([/#(EXTM3U)/.source, /#EXT-X-(PLAYLIST-TYPE):(.+)/.source, /#EXT-X-(MEDIA-SEQUENCE): *(\d+)/.source, /#EXT-X-(SKIP):(.+)/.source, /#EXT-X-(TARGETDURATION): *(\d+)/.source, /#EXT-X-(KEY):(.+)/.source, /#EXT-X-(START):(.+)/.source, /#EXT-X-(ENDLIST)/.source, /#EXT-X-(DISCONTINUITY-SEQ)UENCE: *(\d+)/.source, /#EXT-X-(DIS)CONTINUITY/.source, /#EXT-X-(VERSION):(\d+)/.source, /#EXT-X-(MAP):(.+)/.source, /#EXT-X-(SERVER-CONTROL):(.+)/.source, /#EXT-X-(PART-INF):(.+)/.source, /#EXT-X-(GAP)/.source, /#EXT-X-(BITRATE):\s*(\d+)/.source, /#EXT-X-(PART):(.+)/.source, /#EXT-X-(PRELOAD-HINT):(.+)/.source, /#EXT-X-(RENDITION-REPORT):(.+)/.source, /(#)([^:]*):(.*)/.source, /(#)(.*)(?:.*)\r?\n?/.source].join("|")),
                                v = /\.(mp4|m4s|m4v|m4a)$/i,
                                p = function() {
                                    function t() {}
                                    return t.findGroup = function(t, e) {
                                        for (var r = 0; r < t.length; r++) {
                                            var i = t[r];
                                            if (i.id === e) return i
                                        }
                                    }, t.convertAVC1ToAVCOTI = function(t) {
                                        var e = t.split(".");
                                        if (e.length > 2) {
                                            var r = e.shift() + ".";
                                            return (r += parseInt(e.shift()).toString(16)) + ("000" + parseInt(e.shift()).toString(16)).substr(-4)
                                        }
                                        return t
                                    }, t.resolve = function(t, e) {
                                        return n.buildAbsoluteURL(e, t, {
                                            alwaysNormalize: !0
                                        })
                                    }, t.parseMasterPlaylist = function(e, r) {
                                        var i, n = [],
                                            a = {},
                                            s = !1;
                                        for (d.lastIndex = 0; null != (i = d.exec(e));)
                                            if (i[1]) {
                                                var o = new l.AttrList(i[1]),
                                                    u = {
                                                        attrs: o,
                                                        bitrate: o.decimalInteger("AVERAGE-BANDWIDTH") || o.decimalInteger("BANDWIDTH"),
                                                        name: o.NAME,
                                                        url: t.resolve(i[2], r)
                                                    },
                                                    c = o.decimalResolution("RESOLUTION");
                                                c && (u.width = c.width, u.height = c.height), m((o.CODECS || "").split(/[ ,]+/).filter((function(t) {
                                                    return t
                                                })), u), u.videoCodec && -1 !== u.videoCodec.indexOf("avc1") && (u.videoCodec = t.convertAVC1ToAVCOTI(u.videoCodec)), n.push(u)
                                            } else if (i[3]) {
                                            var h = new l.AttrList(i[3]);
                                            h["DATA-ID"] && (s = !0, a[h["DATA-ID"]] = h)
                                        }
                                        return {
                                            levels: n,
                                            sessionData: s ? a : null
                                        }
                                    }, t.parseMasterPlaylistMedia = function(e, r, i, n) {
                                        var a;
                                        void 0 === n && (n = []);
                                        var s = [],
                                            o = 0;
                                        for (h.lastIndex = 0; null !== (a = h.exec(e));) {
                                            var u = new l.AttrList(a[1]);
                                            if (u.TYPE === i) {
                                                var c = {
                                                    attrs: u,
                                                    bitrate: 0,
                                                    id: o++,
                                                    groupId: u["GROUP-ID"],
                                                    instreamId: u["INSTREAM-ID"],
                                                    name: u.NAME || u.LANGUAGE || "",
                                                    type: i,
                                                    default: u.bool("DEFAULT"),
                                                    autoselect: u.bool("AUTOSELECT"),
                                                    forced: u.bool("FORCED"),
                                                    lang: u.LANGUAGE,
                                                    url: u.URI ? t.resolve(u.URI, r) : ""
                                                };
                                                if (n.length) {
                                                    var d = t.findGroup(n, c.groupId) || n[0];
                                                    y(c, d, "audioCodec"), y(c, d, "textCodec")
                                                }
                                                s.push(c)
                                            }
                                        }
                                        return s
                                    }, t.parseLevelPlaylist = function(t, e, r, c, d) {
                                        var h, p, m, y = new s.LevelDetails(e),
                                            T = y.fragments,
                                            b = null,
                                            S = 0,
                                            L = 0,
                                            A = 0,
                                            D = 0,
                                            k = null,
                                            R = new a.Fragment(c, e),
                                            _ = -1,
                                            I = !1;
                                        for (f.lastIndex = 0, y.m3u8 = t; null !== (h = f.exec(t));) {
                                            I && (I = !1, (R = new a.Fragment(c, e)).start = A, R.sn = S, R.cc = D, R.level = r, b && (R.initSegment = b, R.rawProgramDateTime = b.rawProgramDateTime));
                                            var w = h[1];
                                            if (w) {
                                                R.duration = parseFloat(w);
                                                var C = (" " + h[2]).slice(1);
                                                R.title = C || null, R.tagList.push(C ? ["INF", w, C] : ["INF", w])
                                            } else if (h[3]) Object(i.isFiniteNumber)(R.duration) && (R.start = A, m && (R.levelkey = m), R.sn = S, R.level = r, R.cc = D, R.urlId = d, T.push(R), R.relurl = (" " + h[3]).slice(1), E(R, k), k = R, A += R.duration, S++, L = 0, I = !0);
                                            else if (h[4]) {
                                                var O = (" " + h[4]).slice(1);
                                                k ? R.setByteRange(O, k) : R.setByteRange(O)
                                            } else if (h[5]) R.rawProgramDateTime = (" " + h[5]).slice(1), R.tagList.push(["PROGRAM-DATE-TIME", R.rawProgramDateTime]), -1 === _ && (_ = T.length);
                                            else {
                                                if (!(h = h[0].match(g))) {
                                                    u.logger.warn("No matches on slow regex match for level playlist!");
                                                    continue
                                                }
                                                for (p = 1; p < h.length && void 0 === h[p]; p++);
                                                var x = (" " + h[p]).slice(1),
                                                    P = (" " + h[p + 1]).slice(1),
                                                    F = h[p + 2] ? (" " + h[p + 2]).slice(1) : "";
                                                switch (x) {
                                                    case "PLAYLIST-TYPE":
                                                        y.type = P.toUpperCase();
                                                        break;
                                                    case "MEDIA-SEQUENCE":
                                                        S = y.startSN = parseInt(P);
                                                        break;
                                                    case "SKIP":
                                                        var M = new l.AttrList(P),
                                                            N = M.decimalInteger("SKIPPED-SEGMENTS");
                                                        if (Object(i.isFiniteNumber)(N)) {
                                                            y.skippedSegments = N;
                                                            for (var U = N; U--;) T.unshift(null);
                                                            S += N
                                                        }
                                                        var B = M.enumeratedString("RECENTLY-REMOVED-DATERANGES");
                                                        B && (y.recentlyRemovedDateranges = B.split("\t"));
                                                        break;
                                                    case "TARGETDURATION":
                                                        y.targetduration = parseFloat(P);
                                                        break;
                                                    case "VERSION":
                                                        y.version = parseInt(P);
                                                        break;
                                                    case "EXTM3U":
                                                        break;
                                                    case "ENDLIST":
                                                        y.live = !1;
                                                        break;
                                                    case "#":
                                                        (P || F) && R.tagList.push(F ? [P, F] : [P]);
                                                        break;
                                                    case "DIS":
                                                        D++;
                                                    case "GAP":
                                                        R.tagList.push([x]);
                                                        break;
                                                    case "BITRATE":
                                                        R.tagList.push([x, P]);
                                                        break;
                                                    case "DISCONTINUITY-SEQ":
                                                        D = parseInt(P);
                                                        break;
                                                    case "KEY":
                                                        var G, j = new l.AttrList(P),
                                                            K = j.enumeratedString("METHOD"),
                                                            H = j.URI,
                                                            V = j.hexadecimalInteger("IV"),
                                                            W = j.enumeratedString("KEYFORMATVERSIONS"),
                                                            q = j.enumeratedString("KEYID"),
                                                            Y = null != (G = j.enumeratedString("KEYFORMAT")) ? G : "identity";
                                                        if (["com.apple.streamingkeydelivery", "com.microsoft.playready", "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed", "com.widevine"].indexOf(Y) > -1) {
                                                            u.logger.warn("Keyformat " + Y + " is not supported from the manifest");
                                                            continue
                                                        }
                                                        if ("identity" !== Y) continue;
                                                        K && (m = o.LevelKey.fromURL(e, H), H && ["AES-128", "SAMPLE-AES", "SAMPLE-AES-CENC"].indexOf(K) >= 0 && (m.method = K, m.keyFormat = Y, q && (m.keyID = q), W && (m.keyFormatVersions = W), m.iv = V));
                                                        break;
                                                    case "START":
                                                        var X = new l.AttrList(P).decimalFloatingPoint("TIME-OFFSET");
                                                        Object(i.isFiniteNumber)(X) && (y.startTimeOffset = X);
                                                        break;
                                                    case "MAP":
                                                        var z = new l.AttrList(P);
                                                        R.relurl = z.URI, z.BYTERANGE && R.setByteRange(z.BYTERANGE), R.level = r, R.sn = "initSegment", m && (R.levelkey = m), R.initSegment = null, b = R, I = !0;
                                                        break;
                                                    case "SERVER-CONTROL":
                                                        var Q = new l.AttrList(P);
                                                        y.canBlockReload = Q.bool("CAN-BLOCK-RELOAD"), y.canSkipUntil = Q.optionalFloat("CAN-SKIP-UNTIL", 0), y.canSkipDateRanges = y.canSkipUntil > 0 && Q.bool("CAN-SKIP-DATERANGES"), y.partHoldBack = Q.optionalFloat("PART-HOLD-BACK", 0), y.holdBack = Q.optionalFloat("HOLD-BACK", 0);
                                                        break;
                                                    case "PART-INF":
                                                        var $ = new l.AttrList(P);
                                                        y.partTarget = $.decimalFloatingPoint("PART-TARGET");
                                                        break;
                                                    case "PART":
                                                        var J = y.partList;
                                                        J || (J = y.partList = []);
                                                        var Z = L > 0 ? J[J.length - 1] : void 0,
                                                            tt = L++,
                                                            et = new a.Part(new l.AttrList(P), R, e, tt, Z);
                                                        J.push(et), R.duration += et.duration;
                                                        break;
                                                    case "PRELOAD-HINT":
                                                        var rt = new l.AttrList(P);
                                                        y.preloadHint = rt;
                                                        break;
                                                    case "RENDITION-REPORT":
                                                        var it = new l.AttrList(P);
                                                        y.renditionReports = y.renditionReports || [], y.renditionReports.push(it);
                                                        break;
                                                    default:
                                                        u.logger.warn("line parsed but not handled: " + h)
                                                }
                                            }
                                        }
                                        k && !k.relurl ? (T.pop(), A -= k.duration, y.partList && (y.fragmentHint = k)) : y.partList && (E(R, k), R.cc = D, y.fragmentHint = R);
                                        var nt = T.length,
                                            at = T[0],
                                            st = T[nt - 1];
                                        if ((A += y.skippedSegments * y.targetduration) > 0 && nt && st) {
                                            y.averagetargetduration = A / nt;
                                            var ot = st.sn;
                                            y.endSN = "initSegment" !== ot ? ot : 0, at && (y.startCC = at.cc, at.initSegment || y.fragments.every((function(t) {
                                                return t.relurl && (e = t.relurl, v.test(null != (r = null === (i = n.parseURL(e)) || void 0 === i ? void 0 : i.path) ? r : ""));
                                                var e, r, i
                                            })) && (u.logger.warn("MP4 fragments found but no init segment (probably no MAP, incomplete M3U8), trying to fetch SIDX"), (R = new a.Fragment(c, e)).relurl = st.relurl, R.level = r, R.sn = "initSegment", at.initSegment = R, y.needSidxRanges = !0))
                                        } else y.endSN = 0, y.startCC = 0;
                                        return y.fragmentHint && (A += y.fragmentHint.duration), y.totalduration = A, y.endCC = D, _ > 0 && function(t, e) {
                                            for (var r = t[e], i = e; i--;) {
                                                var n = t[i];
                                                if (!n) return;
                                                n.programDateTime = r.programDateTime - 1e3 * n.duration, r = n
                                            }
                                        }(T, _), y
                                    }, t
                                }();

                            function m(t, e) {
                                ["video", "audio", "text"].forEach((function(r) {
                                    var i = t.filter((function(t) {
                                        return Object(c.isCodecType)(t, r)
                                    }));
                                    if (i.length) {
                                        var n = i.filter((function(t) {
                                            return 0 === t.lastIndexOf("avc1", 0) || 0 === t.lastIndexOf("mp4a", 0)
                                        }));
                                        e[r + "Codec"] = n.length > 0 ? n[0] : i[0], t = t.filter((function(t) {
                                            return -1 === i.indexOf(t)
                                        }))
                                    }
                                })), e.unknownCodecs = t
                            }

                            function y(t, e, r) {
                                var i = e[r];
                                i && (t[r] = i)
                            }

                            function E(t, e) {
                                t.rawProgramDateTime ? t.programDateTime = Date.parse(t.rawProgramDateTime) : null != e && e.programDateTime && (t.programDateTime = e.endProgramDateTime), Object(i.isFiniteNumber)(t.programDateTime) || (t.programDateTime = null, t.rawProgramDateTime = null)
                            }
                        },
                        "./src/loader/playlist-loader.ts": function(t, e, r) {
                            "use strict";
                            r.r(e);
                            var i = r("./src/polyfills/number.ts"),
                                n = r("./src/events.ts"),
                                a = r("./src/errors.ts"),
                                s = r("./src/utils/logger.ts"),
                                o = r("./src/utils/mp4-tools.ts"),
                                l = r("./src/loader/m3u8-parser.ts"),
                                u = r("./src/types/loader.ts"),
                                c = r("./src/utils/attr-list.ts");

                            function d(t, e) {
                                var r = t.url;
                                return void 0 !== r && 0 !== r.indexOf("data:") || (r = e.url), r
                            }
                            var h = function() {
                                function t(t) {
                                    this.hls = void 0, this.loaders = Object.create(null), this.hls = t, this.registerListeners()
                                }
                                var e = t.prototype;
                                return e.registerListeners = function() {
                                    var t = this.hls;
                                    t.on(n.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.on(n.Events.LEVEL_LOADING, this.onLevelLoading, this), t.on(n.Events.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this), t.on(n.Events.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this)
                                }, e.unregisterListeners = function() {
                                    var t = this.hls;
                                    t.off(n.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.off(n.Events.LEVEL_LOADING, this.onLevelLoading, this), t.off(n.Events.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this), t.off(n.Events.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this)
                                }, e.createInternalLoader = function(t) {
                                    var e = this.hls.config,
                                        r = e.pLoader,
                                        i = e.loader,
                                        n = new(r || i)(e);
                                    return t.loader = n, this.loaders[t.type] = n, n
                                }, e.getInternalLoader = function(t) {
                                    return this.loaders[t.type]
                                }, e.resetInternalLoader = function(t) {
                                    this.loaders[t] && delete this.loaders[t]
                                }, e.destroyInternalLoaders = function() {
                                    for (var t in this.loaders) {
                                        var e = this.loaders[t];
                                        e && e.destroy(), this.resetInternalLoader(t)
                                    }
                                }, e.destroy = function() {
                                    this.unregisterListeners(), this.destroyInternalLoaders()
                                }, e.onManifestLoading = function(t, e) {
                                    var r = e.url;
                                    this.load({
                                        id: null,
                                        groupId: null,
                                        level: 0,
                                        responseType: "text",
                                        type: u.PlaylistContextType.MANIFEST,
                                        url: r,
                                        deliveryDirectives: null
                                    })
                                }, e.onLevelLoading = function(t, e) {
                                    var r = e.id,
                                        i = e.level,
                                        n = e.url,
                                        a = e.deliveryDirectives;
                                    this.load({
                                        id: r,
                                        groupId: null,
                                        level: i,
                                        responseType: "text",
                                        type: u.PlaylistContextType.LEVEL,
                                        url: n,
                                        deliveryDirectives: a
                                    })
                                }, e.onAudioTrackLoading = function(t, e) {
                                    var r = e.id,
                                        i = e.groupId,
                                        n = e.url,
                                        a = e.deliveryDirectives;
                                    this.load({
                                        id: r,
                                        groupId: i,
                                        level: null,
                                        responseType: "text",
                                        type: u.PlaylistContextType.AUDIO_TRACK,
                                        url: n,
                                        deliveryDirectives: a
                                    })
                                }, e.onSubtitleTrackLoading = function(t, e) {
                                    var r = e.id,
                                        i = e.groupId,
                                        n = e.url,
                                        a = e.deliveryDirectives;
                                    this.load({
                                        id: r,
                                        groupId: i,
                                        level: null,
                                        responseType: "text",
                                        type: u.PlaylistContextType.SUBTITLE_TRACK,
                                        url: n,
                                        deliveryDirectives: a
                                    })
                                }, e.load = function(t) {
                                    var e, r, i, n, a, o, l = this.hls.config,
                                        c = this.getInternalLoader(t);
                                    if (c) {
                                        var d = c.context;
                                        if (d && d.url === t.url) return void s.logger.trace("[playlist-loader]: playlist request ongoing");
                                        s.logger.log("[playlist-loader]: aborting previous loader for type: " + t.type), c.abort()
                                    }
                                    switch (t.type) {
                                        case u.PlaylistContextType.MANIFEST:
                                            r = l.manifestLoadingMaxRetry, i = l.manifestLoadingTimeOut, n = l.manifestLoadingRetryDelay, a = l.manifestLoadingMaxRetryTimeout;
                                            break;
                                        case u.PlaylistContextType.LEVEL:
                                        case u.PlaylistContextType.AUDIO_TRACK:
                                        case u.PlaylistContextType.SUBTITLE_TRACK:
                                            r = 0, i = l.levelLoadingTimeOut;
                                            break;
                                        default:
                                            r = l.levelLoadingMaxRetry, i = l.levelLoadingTimeOut, n = l.levelLoadingRetryDelay, a = l.levelLoadingMaxRetryTimeout
                                    }
                                    if (c = this.createInternalLoader(t), null !== (e = t.deliveryDirectives) && void 0 !== e && e.part && (t.type === u.PlaylistContextType.LEVEL && null !== t.level ? o = this.hls.levels[t.level].details : t.type === u.PlaylistContextType.AUDIO_TRACK && null !== t.id ? o = this.hls.audioTracks[t.id].details : t.type === u.PlaylistContextType.SUBTITLE_TRACK && null !== t.id && (o = this.hls.subtitleTracks[t.id].details), o)) {
                                        var h = o.partTarget,
                                            f = o.targetduration;
                                        h && f && (i = Math.min(1e3 * Math.max(3 * h, .8 * f), i))
                                    }
                                    var g = {
                                            timeout: i,
                                            maxRetry: r,
                                            retryDelay: n,
                                            maxRetryDelay: a,
                                            highWaterMark: 0
                                        },
                                        v = {
                                            onSuccess: this.loadsuccess.bind(this),
                                            onError: this.loaderror.bind(this),
                                            onTimeout: this.loadtimeout.bind(this)
                                        };
                                    c.load(t, g, v)
                                }, e.loadsuccess = function(t, e, r, i) {
                                    if (void 0 === i && (i = null), r.isSidxRequest) return this.handleSidxRequest(t, r), void this.handlePlaylistLoaded(t, e, r, i);
                                    this.resetInternalLoader(r.type);
                                    var n = t.data;
                                    0 === n.indexOf("#EXTM3U") ? (e.parsing.start = performance.now(), n.indexOf("#EXTINF:") > 0 || n.indexOf("#EXT-X-TARGETDURATION:") > 0 ? this.handleTrackOrLevelPlaylist(t, e, r, i) : this.handleMasterPlaylist(t, e, r, i)) : this.handleManifestParsingError(t, r, "no EXTM3U delimiter", i)
                                }, e.loaderror = function(t, e, r) {
                                    void 0 === r && (r = null), this.handleNetworkError(e, r, !1, t)
                                }, e.loadtimeout = function(t, e, r) {
                                    void 0 === r && (r = null), this.handleNetworkError(e, r, !0)
                                }, e.handleMasterPlaylist = function(t, e, r, i) {
                                    var a = this.hls,
                                        o = t.data,
                                        u = d(t, r),
                                        h = l.default.parseMasterPlaylist(o, u),
                                        f = h.levels,
                                        g = h.sessionData;
                                    if (f.length) {
                                        var v = f.map((function(t) {
                                                return {
                                                    id: t.attrs.AUDIO,
                                                    audioCodec: t.audioCodec
                                                }
                                            })),
                                            p = f.map((function(t) {
                                                return {
                                                    id: t.attrs.SUBTITLES,
                                                    textCodec: t.textCodec
                                                }
                                            })),
                                            m = l.default.parseMasterPlaylistMedia(o, u, "AUDIO", v),
                                            y = l.default.parseMasterPlaylistMedia(o, u, "SUBTITLES", p),
                                            E = l.default.parseMasterPlaylistMedia(o, u, "CLOSED-CAPTIONS");
                                        m.length && (m.some((function(t) {
                                            return !t.url
                                        })) || !f[0].audioCodec || f[0].attrs.AUDIO || (s.logger.log("[playlist-loader]: audio codec signaled in quality level, but no embedded audio track signaled, create one"), m.unshift({
                                            type: "main",
                                            name: "main",
                                            default: !1,
                                            autoselect: !1,
                                            forced: !1,
                                            id: -1,
                                            attrs: new c.AttrList({}),
                                            bitrate: 0,
                                            url: ""
                                        }))), a.trigger(n.Events.MANIFEST_LOADED, {
                                            levels: f,
                                            audioTracks: m,
                                            subtitles: y,
                                            captions: E,
                                            url: u,
                                            stats: e,
                                            networkDetails: i,
                                            sessionData: g
                                        })
                                    } else this.handleManifestParsingError(t, r, "no level found in manifest", i)
                                }, e.handleTrackOrLevelPlaylist = function(t, e, r, s) {
                                    var o = this.hls,
                                        h = r.id,
                                        f = r.level,
                                        g = r.type,
                                        v = d(t, r),
                                        p = Object(i.isFiniteNumber)(h) ? h : 0,
                                        m = Object(i.isFiniteNumber)(f) ? f : p,
                                        y = function(t) {
                                            switch (t.type) {
                                                case u.PlaylistContextType.AUDIO_TRACK:
                                                    return u.PlaylistLevelType.AUDIO;
                                                case u.PlaylistContextType.SUBTITLE_TRACK:
                                                    return u.PlaylistLevelType.SUBTITLE;
                                                default:
                                                    return u.PlaylistLevelType.MAIN
                                            }
                                        }(r),
                                        E = l.default.parseLevelPlaylist(t.data, v, m, y, p);
                                    if (E.fragments.length) {
                                        if (g === u.PlaylistContextType.MANIFEST) {
                                            var T = {
                                                attrs: new c.AttrList({}),
                                                bitrate: 0,
                                                details: E,
                                                name: "",
                                                url: v
                                            };
                                            o.trigger(n.Events.MANIFEST_LOADED, {
                                                levels: [T],
                                                audioTracks: [],
                                                url: v,
                                                stats: e,
                                                networkDetails: s,
                                                sessionData: null
                                            })
                                        }
                                        if (e.parsing.end = performance.now(), E.needSidxRanges) {
                                            var b, S = null === (b = E.fragments[0].initSegment) || void 0 === b ? void 0 : b.url;
                                            this.load({
                                                url: S,
                                                isSidxRequest: !0,
                                                type: g,
                                                level: f,
                                                levelDetails: E,
                                                id: h,
                                                groupId: null,
                                                rangeStart: 0,
                                                rangeEnd: 2048,
                                                responseType: "arraybuffer",
                                                deliveryDirectives: null
                                            })
                                        } else r.levelDetails = E, this.handlePlaylistLoaded(t, e, r, s)
                                    } else o.trigger(n.Events.ERROR, {
                                        type: a.ErrorTypes.NETWORK_ERROR,
                                        details: a.ErrorDetails.LEVEL_EMPTY_ERROR,
                                        fatal: !1,
                                        url: v,
                                        reason: "no fragments found in level",
                                        level: "number" == typeof r.level ? r.level : void 0
                                    })
                                }, e.handleSidxRequest = function(t, e) {
                                    var r = Object(o.parseSegmentIndex)(new Uint8Array(t.data));
                                    if (r) {
                                        var i = r.references,
                                            n = e.levelDetails;
                                        i.forEach((function(t, e) {
                                            var i = t.info,
                                                a = n.fragments[e];
                                            0 === a.byteRange.length && a.setByteRange(String(1 + i.end - i.start) + "@" + String(i.start)), a.initSegment && a.initSegment.setByteRange(String(r.moovEndOffset) + "@0")
                                        }))
                                    }
                                }, e.handleManifestParsingError = function(t, e, r, i) {
                                    this.hls.trigger(n.Events.ERROR, {
                                        type: a.ErrorTypes.NETWORK_ERROR,
                                        details: a.ErrorDetails.MANIFEST_PARSING_ERROR,
                                        fatal: e.type === u.PlaylistContextType.MANIFEST,
                                        url: t.url,
                                        reason: r,
                                        response: t,
                                        context: e,
                                        networkDetails: i
                                    })
                                }, e.handleNetworkError = function(t, e, r, i) {
                                    void 0 === r && (r = !1), s.logger.warn("[playlist-loader]: A network " + (r ? "timeout" : "error") + " occurred while loading " + t.type + " level: " + t.level + " id: " + t.id + ' group-id: "' + t.groupId + '"');
                                    var o = a.ErrorDetails.UNKNOWN,
                                        l = !1,
                                        c = this.getInternalLoader(t);
                                    switch (t.type) {
                                        case u.PlaylistContextType.MANIFEST:
                                            o = r ? a.ErrorDetails.MANIFEST_LOAD_TIMEOUT : a.ErrorDetails.MANIFEST_LOAD_ERROR, l = !0;
                                            break;
                                        case u.PlaylistContextType.LEVEL:
                                            o = r ? a.ErrorDetails.LEVEL_LOAD_TIMEOUT : a.ErrorDetails.LEVEL_LOAD_ERROR, l = !1;
                                            break;
                                        case u.PlaylistContextType.AUDIO_TRACK:
                                            o = r ? a.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT : a.ErrorDetails.AUDIO_TRACK_LOAD_ERROR, l = !1;
                                            break;
                                        case u.PlaylistContextType.SUBTITLE_TRACK:
                                            o = r ? a.ErrorDetails.SUBTITLE_TRACK_LOAD_TIMEOUT : a.ErrorDetails.SUBTITLE_LOAD_ERROR, l = !1
                                    }
                                    c && this.resetInternalLoader(t.type);
                                    var d = {
                                        type: a.ErrorTypes.NETWORK_ERROR,
                                        details: o,
                                        fatal: l,
                                        url: t.url,
                                        loader: c,
                                        context: t,
                                        networkDetails: e
                                    };
                                    i && (d.response = i), this.hls.trigger(n.Events.ERROR, d)
                                }, e.handlePlaylistLoaded = function(t, e, r, i) {
                                    var a = r.type,
                                        s = r.level,
                                        o = r.id,
                                        l = r.groupId,
                                        c = r.loader,
                                        d = r.levelDetails,
                                        h = r.deliveryDirectives;
                                    if (null != d && d.targetduration) {
                                        if (c) switch (d.live && (c.getCacheAge && (d.ageHeader = c.getCacheAge() || 0), c.getCacheAge && !isNaN(d.ageHeader) || (d.ageHeader = 0)), a) {
                                            case u.PlaylistContextType.MANIFEST:
                                            case u.PlaylistContextType.LEVEL:
                                                this.hls.trigger(n.Events.LEVEL_LOADED, {
                                                    details: d,
                                                    level: s || 0,
                                                    id: o || 0,
                                                    stats: e,
                                                    networkDetails: i,
                                                    deliveryDirectives: h
                                                });
                                                break;
                                            case u.PlaylistContextType.AUDIO_TRACK:
                                                this.hls.trigger(n.Events.AUDIO_TRACK_LOADED, {
                                                    details: d,
                                                    id: o || 0,
                                                    groupId: l || "",
                                                    stats: e,
                                                    networkDetails: i,
                                                    deliveryDirectives: h
                                                });
                                                break;
                                            case u.PlaylistContextType.SUBTITLE_TRACK:
                                                this.hls.trigger(n.Events.SUBTITLE_TRACK_LOADED, {
                                                    details: d,
                                                    id: o || 0,
                                                    groupId: l || "",
                                                    stats: e,
                                                    networkDetails: i,
                                                    deliveryDirectives: h
                                                })
                                        }
                                    } else this.handleManifestParsingError(t, r, "invalid target duration", i)
                                }, t
                            }();
                            e.default = h
                        },
                        "./src/polyfills/number.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "isFiniteNumber", (function() {
                                return i
                            })), r.d(e, "MAX_SAFE_INTEGER", (function() {
                                return n
                            }));
                            var i = Number.isFinite || function(t) {
                                    return "number" == typeof t && isFinite(t)
                                },
                                n = Number.MAX_SAFE_INTEGER || 9007199254740991
                        },
                        "./src/remux/aac-helper.ts": function(t, e, r) {
                            "use strict";
                            r.r(e);
                            var i = function() {
                                function t() {}
                                return t.getSilentFrame = function(t, e) {
                                    switch (t) {
                                        case "mp4a.40.2":
                                            if (1 === e) return new Uint8Array([0, 200, 0, 128, 35, 128]);
                                            if (2 === e) return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]);
                                            if (3 === e) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]);
                                            if (4 === e) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]);
                                            if (5 === e) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]);
                                            if (6 === e) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]);
                                            break;
                                        default:
                                            if (1 === e) return new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                                            if (2 === e) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                                            if (3 === e) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94])
                                    }
                                }, t
                            }();
                            e.default = i
                        },
                        "./src/remux/mp4-generator.ts": function(t, e, r) {
                            "use strict";
                            r.r(e);
                            var i = Math.pow(2, 32) - 1,
                                n = function() {
                                    function t() {}
                                    return t.init = function() {
                                        var e;
                                        for (e in t.types = {
                                                avc1: [],
                                                avcC: [],
                                                btrt: [],
                                                dinf: [],
                                                dref: [],
                                                esds: [],
                                                ftyp: [],
                                                hdlr: [],
                                                mdat: [],
                                                mdhd: [],
                                                mdia: [],
                                                mfhd: [],
                                                minf: [],
                                                moof: [],
                                                moov: [],
                                                mp4a: [],
                                                ".mp3": [],
                                                mvex: [],
                                                mvhd: [],
                                                pasp: [],
                                                sdtp: [],
                                                stbl: [],
                                                stco: [],
                                                stsc: [],
                                                stsd: [],
                                                stsz: [],
                                                stts: [],
                                                tfdt: [],
                                                tfhd: [],
                                                traf: [],
                                                trak: [],
                                                trun: [],
                                                trex: [],
                                                tkhd: [],
                                                vmhd: [],
                                                smhd: []
                                            }, t.types) t.types.hasOwnProperty(e) && (t.types[e] = [e.charCodeAt(0), e.charCodeAt(1), e.charCodeAt(2), e.charCodeAt(3)]);
                                        var r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0]),
                                            i = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]);
                                        t.HDLR_TYPES = {
                                            video: r,
                                            audio: i
                                        };
                                        var n = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1]),
                                            a = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
                                        t.STTS = t.STSC = t.STCO = a, t.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), t.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]), t.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), t.STSD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);
                                        var s = new Uint8Array([105, 115, 111, 109]),
                                            o = new Uint8Array([97, 118, 99, 49]),
                                            l = new Uint8Array([0, 0, 0, 1]);
                                        t.FTYP = t.box(t.types.ftyp, s, l, s, o), t.DINF = t.box(t.types.dinf, t.box(t.types.dref, n))
                                    }, t.box = function(t) {
                                        for (var e = 8, r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++) i[n - 1] = arguments[n];
                                        for (var a = i.length, s = a; a--;) e += i[a].byteLength;
                                        var o = new Uint8Array(e);
                                        for (o[0] = e >> 24 & 255, o[1] = e >> 16 & 255, o[2] = e >> 8 & 255, o[3] = 255 & e, o.set(t, 4), a = 0, e = 8; a < s; a++) o.set(i[a], e), e += i[a].byteLength;
                                        return o
                                    }, t.hdlr = function(e) {
                                        return t.box(t.types.hdlr, t.HDLR_TYPES[e])
                                    }, t.mdat = function(e) {
                                        return t.box(t.types.mdat, e)
                                    }, t.mdhd = function(e, r) {
                                        r *= e;
                                        var n = Math.floor(r / (i + 1)),
                                            a = Math.floor(r % (i + 1));
                                        return t.box(t.types.mdhd, new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, n >> 24, n >> 16 & 255, n >> 8 & 255, 255 & n, a >> 24, a >> 16 & 255, a >> 8 & 255, 255 & a, 85, 196, 0, 0]))
                                    }, t.mdia = function(e) {
                                        return t.box(t.types.mdia, t.mdhd(e.timescale, e.duration), t.hdlr(e.type), t.minf(e))
                                    }, t.mfhd = function(e) {
                                        return t.box(t.types.mfhd, new Uint8Array([0, 0, 0, 0, e >> 24, e >> 16 & 255, e >> 8 & 255, 255 & e]))
                                    }, t.minf = function(e) {
                                        return "audio" === e.type ? t.box(t.types.minf, t.box(t.types.smhd, t.SMHD), t.DINF, t.stbl(e)) : t.box(t.types.minf, t.box(t.types.vmhd, t.VMHD), t.DINF, t.stbl(e))
                                    }, t.moof = function(e, r, i) {
                                        return t.box(t.types.moof, t.mfhd(e), t.traf(i, r))
                                    }, t.moov = function(e) {
                                        for (var r = e.length, i = []; r--;) i[r] = t.trak(e[r]);
                                        return t.box.apply(null, [t.types.moov, t.mvhd(e[0].timescale, e[0].duration)].concat(i).concat(t.mvex(e)))
                                    }, t.mvex = function(e) {
                                        for (var r = e.length, i = []; r--;) i[r] = t.trex(e[r]);
                                        return t.box.apply(null, [t.types.mvex].concat(i))
                                    }, t.mvhd = function(e, r) {
                                        r *= e;
                                        var n = Math.floor(r / (i + 1)),
                                            a = Math.floor(r % (i + 1)),
                                            s = new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, n >> 24, n >> 16 & 255, n >> 8 & 255, 255 & n, a >> 24, a >> 16 & 255, a >> 8 & 255, 255 & a, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]);
                                        return t.box(t.types.mvhd, s)
                                    }, t.sdtp = function(e) {
                                        var r, i, n = e.samples || [],
                                            a = new Uint8Array(4 + n.length);
                                        for (r = 0; r < n.length; r++) i = n[r].flags, a[r + 4] = i.dependsOn << 4 | i.isDependedOn << 2 | i.hasRedundancy;
                                        return t.box(t.types.sdtp, a)
                                    }, t.stbl = function(e) {
                                        return t.box(t.types.stbl, t.stsd(e), t.box(t.types.stts, t.STTS), t.box(t.types.stsc, t.STSC), t.box(t.types.stsz, t.STSZ), t.box(t.types.stco, t.STCO))
                                    }, t.avc1 = function(e) {
                                        var r, i, n, a = [],
                                            s = [];
                                        for (r = 0; r < e.sps.length; r++) n = (i = e.sps[r]).byteLength, a.push(n >>> 8 & 255), a.push(255 & n), a = a.concat(Array.prototype.slice.call(i));
                                        for (r = 0; r < e.pps.length; r++) n = (i = e.pps[r]).byteLength, s.push(n >>> 8 & 255), s.push(255 & n), s = s.concat(Array.prototype.slice.call(i));
                                        var o = t.box(t.types.avcC, new Uint8Array([1, a[3], a[4], a[5], 255, 224 | e.sps.length].concat(a).concat([e.pps.length]).concat(s))),
                                            l = e.width,
                                            u = e.height,
                                            c = e.pixelRatio[0],
                                            d = e.pixelRatio[1];
                                        return t.box(t.types.avc1, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l >> 8 & 255, 255 & l, u >> 8 & 255, 255 & u, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 18, 100, 97, 105, 108, 121, 109, 111, 116, 105, 111, 110, 47, 104, 108, 115, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 17, 17]), o, t.box(t.types.btrt, new Uint8Array([0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192])), t.box(t.types.pasp, new Uint8Array([c >> 24, c >> 16 & 255, c >> 8 & 255, 255 & c, d >> 24, d >> 16 & 255, d >> 8 & 255, 255 & d])))
                                    }, t.esds = function(t) {
                                        var e = t.config.length;
                                        return new Uint8Array([0, 0, 0, 0, 3, 23 + e, 0, 1, 0, 4, 15 + e, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([e]).concat(t.config).concat([6, 1, 2]))
                                    }, t.mp4a = function(e) {
                                        var r = e.samplerate;
                                        return t.box(t.types.mp4a, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, e.channelCount, 0, 16, 0, 0, 0, 0, r >> 8 & 255, 255 & r, 0, 0]), t.box(t.types.esds, t.esds(e)))
                                    }, t.mp3 = function(e) {
                                        var r = e.samplerate;
                                        return t.box(t.types[".mp3"], new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, e.channelCount, 0, 16, 0, 0, 0, 0, r >> 8 & 255, 255 & r, 0, 0]))
                                    }, t.stsd = function(e) {
                                        return "audio" === e.type ? e.isAAC || "mp3" !== e.codec ? t.box(t.types.stsd, t.STSD, t.mp4a(e)) : t.box(t.types.stsd, t.STSD, t.mp3(e)) : t.box(t.types.stsd, t.STSD, t.avc1(e))
                                    }, t.tkhd = function(e) {
                                        var r = e.id,
                                            n = e.duration * e.timescale,
                                            a = e.width,
                                            s = e.height,
                                            o = Math.floor(n / (i + 1)),
                                            l = Math.floor(n % (i + 1));
                                        return t.box(t.types.tkhd, new Uint8Array([1, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r, 0, 0, 0, 0, o >> 24, o >> 16 & 255, o >> 8 & 255, 255 & o, l >> 24, l >> 16 & 255, l >> 8 & 255, 255 & l, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, a >> 8 & 255, 255 & a, 0, 0, s >> 8 & 255, 255 & s, 0, 0]))
                                    }, t.traf = function(e, r) {
                                        var n = t.sdtp(e),
                                            a = e.id,
                                            s = Math.floor(r / (i + 1)),
                                            o = Math.floor(r % (i + 1));
                                        return t.box(t.types.traf, t.box(t.types.tfhd, new Uint8Array([0, 0, 0, 0, a >> 24, a >> 16 & 255, a >> 8 & 255, 255 & a])), t.box(t.types.tfdt, new Uint8Array([1, 0, 0, 0, s >> 24, s >> 16 & 255, s >> 8 & 255, 255 & s, o >> 24, o >> 16 & 255, o >> 8 & 255, 255 & o])), t.trun(e, n.length + 16 + 20 + 8 + 16 + 8 + 8), n)
                                    }, t.trak = function(e) {
                                        return e.duration = e.duration || 4294967295, t.box(t.types.trak, t.tkhd(e), t.mdia(e))
                                    }, t.trex = function(e) {
                                        var r = e.id;
                                        return t.box(t.types.trex, new Uint8Array([0, 0, 0, 0, r >> 24, r >> 16 & 255, r >> 8 & 255, 255 & r, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]))
                                    }, t.trun = function(e, r) {
                                        var i, n, a, s, o, l, u = e.samples || [],
                                            c = u.length,
                                            d = 12 + 16 * c,
                                            h = new Uint8Array(d);
                                        for (r += 8 + d, h.set([0, 0, 15, 1, c >>> 24 & 255, c >>> 16 & 255, c >>> 8 & 255, 255 & c, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r], 0), i = 0; i < c; i++) a = (n = u[i]).duration, s = n.size, o = n.flags, l = n.cts, h.set([a >>> 24 & 255, a >>> 16 & 255, a >>> 8 & 255, 255 & a, s >>> 24 & 255, s >>> 16 & 255, s >>> 8 & 255, 255 & s, o.isLeading << 2 | o.dependsOn, o.isDependedOn << 6 | o.hasRedundancy << 4 | o.paddingValue << 1 | o.isNonSync, 61440 & o.degradPrio, 15 & o.degradPrio, l >>> 24 & 255, l >>> 16 & 255, l >>> 8 & 255, 255 & l], 12 + 16 * i);
                                        return t.box(t.types.trun, h)
                                    }, t.initSegment = function(e) {
                                        t.types || t.init();
                                        var r = t.moov(e),
                                            i = new Uint8Array(t.FTYP.byteLength + r.byteLength);
                                        return i.set(t.FTYP), i.set(r, t.FTYP.byteLength), i
                                    }, t
                                }();
                            n.types = void 0, n.HDLR_TYPES = void 0, n.STTS = void 0, n.STSC = void 0, n.STCO = void 0, n.STSZ = void 0, n.VMHD = void 0, n.SMHD = void 0, n.STSD = void 0, n.FTYP = void 0, n.DINF = void 0, e.default = n
                        },
                        "./src/remux/mp4-remuxer.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "default", (function() {
                                return v
                            })), r.d(e, "normalizePts", (function() {
                                return p
                            }));
                            var i = r("./src/polyfills/number.ts"),
                                n = r("./src/remux/aac-helper.ts"),
                                a = r("./src/remux/mp4-generator.ts"),
                                s = r("./src/events.ts"),
                                o = r("./src/errors.ts"),
                                l = r("./src/utils/logger.ts"),
                                u = r("./src/types/loader.ts"),
                                c = r("./src/utils/timescale-conversion.ts");

                            function d() {
                                return (d = Object.assign || function(t) {
                                    for (var e = 1; e < arguments.length; e++) {
                                        var r = arguments[e];
                                        for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i])
                                    }
                                    return t
                                }).apply(this, arguments)
                            }
                            var h = null,
                                f = null,
                                g = !1,
                                v = function() {
                                    function t(t, e, r, i) {
                                        if (void 0 === i && (i = ""), this.observer = void 0, this.config = void 0, this.typeSupported = void 0, this.ISGenerated = !1, this._initPTS = void 0, this._initDTS = void 0, this.nextAvcDts = null, this.nextAudioPts = null, this.isAudioContiguous = !1, this.isVideoContiguous = !1, this.observer = t, this.config = e, this.typeSupported = r, this.ISGenerated = !1, null === h) {
                                            var n = (navigator.userAgent || "").match(/Chrome\/(\d+)/i);
                                            h = n ? parseInt(n[1]) : 0
                                        }
                                        if (null === f) {
                                            var a = navigator.userAgent.match(/Safari\/(\d+)/i);
                                            f = a ? parseInt(a[1]) : 0
                                        }
                                        g = !!h && h < 75 || !!f && f < 600
                                    }
                                    var e = t.prototype;
                                    return e.destroy = function() {}, e.resetTimeStamp = function(t) {
                                        l.logger.log("[mp4-remuxer]: initPTS & initDTS reset"), this._initPTS = this._initDTS = t
                                    }, e.resetNextTimestamp = function() {
                                        l.logger.log("[mp4-remuxer]: reset next timestamp"), this.isVideoContiguous = !1, this.isAudioContiguous = !1
                                    }, e.resetInitSegment = function() {
                                        l.logger.log("[mp4-remuxer]: ISGenerated flag reset"), this.ISGenerated = !1
                                    }, e.getVideoStartPts = function(t) {
                                        var e = !1,
                                            r = t.reduce((function(t, r) {
                                                var i = r.pts - t;
                                                return i < -4294967296 ? (e = !0, p(t, r.pts)) : i > 0 ? t : r.pts
                                            }), t[0].pts);
                                        return e && l.logger.debug("PTS rollover detected"), r
                                    }, e.remux = function(t, e, r, i, n, a, s, o) {
                                        var c, d, h, f, g, v, m = n,
                                            y = n,
                                            E = t.pid > -1,
                                            T = e.pid > -1,
                                            b = e.samples.length,
                                            S = t.samples.length > 0,
                                            L = b > 1;
                                        if ((!E || S) && (!T || L) || this.ISGenerated || s) {
                                            this.ISGenerated || (h = this.generateIS(t, e, n));
                                            var A = this.isVideoContiguous,
                                                D = -1;
                                            if (L && (D = function(t) {
                                                    for (var e = 0; e < t.length; e++)
                                                        if (t[e].key) return e;
                                                    return -1
                                                }(e.samples), !A && this.config.forceKeyFrameOnDiscontinuity))
                                                if (v = !0, D > 0) {
                                                    l.logger.warn("[mp4-remuxer]: Dropped " + D + " out of " + b + " video samples due to a missing keyframe");
                                                    var k = this.getVideoStartPts(e.samples);
                                                    e.samples = e.samples.slice(D), e.dropped += D, y += (e.samples[0].pts - k) / (e.timescale || 9e4)
                                                } else -1 === D && (l.logger.warn("[mp4-remuxer]: No keyframe found out of " + b + " video samples"), v = !1);
                                            if (this.ISGenerated) {
                                                if (S && L) {
                                                    var R = this.getVideoStartPts(e.samples),
                                                        _ = (p(t.samples[0].pts, R) - R) / e.inputTimeScale;
                                                    m += Math.max(0, _), y += Math.max(0, -_)
                                                }
                                                if (S) {
                                                    if (t.samplerate || (l.logger.warn("[mp4-remuxer]: regenerate InitSegment as audio detected"), h = this.generateIS(t, e, n)), d = this.remuxAudio(t, m, this.isAudioContiguous, a, T || L || o === u.PlaylistLevelType.AUDIO ? y : void 0), L) {
                                                        var I = d ? d.endPTS - d.startPTS : 0;
                                                        e.inputTimeScale || (l.logger.warn("[mp4-remuxer]: regenerate InitSegment as video detected"), h = this.generateIS(t, e, n)), c = this.remuxVideo(e, y, A, I)
                                                    }
                                                } else L && (c = this.remuxVideo(e, y, A, 0));
                                                c && (c.firstKeyFrame = D, c.independent = -1 !== D)
                                            }
                                        }
                                        return this.ISGenerated && (r.samples.length && (g = this.remuxID3(r, n)), i.samples.length && (f = this.remuxText(i, n))), {
                                            audio: d,
                                            video: c,
                                            initSegment: h,
                                            independent: v,
                                            text: f,
                                            id3: g
                                        }
                                    }, e.generateIS = function(t, e, r) {
                                        var n, s, o, l = t.samples,
                                            u = e.samples,
                                            c = this.typeSupported,
                                            d = {},
                                            h = !Object(i.isFiniteNumber)(this._initPTS),
                                            f = "audio/mp4";
                                        if (h && (n = s = 1 / 0), t.config && l.length && (t.timescale = t.samplerate, t.isAAC || (c.mpeg ? (f = "audio/mpeg", t.codec = "") : c.mp3 && (t.codec = "mp3")), d.audio = {
                                                id: "audio",
                                                container: f,
                                                codec: t.codec,
                                                initSegment: !t.isAAC && c.mpeg ? new Uint8Array(0) : a.default.initSegment([t]),
                                                metadata: {
                                                    channelCount: t.channelCount
                                                }
                                            }, h && (o = t.inputTimeScale, n = s = l[0].pts - Math.round(o * r))), e.sps && e.pps && u.length && (e.timescale = e.inputTimeScale, d.video = {
                                                id: "main",
                                                container: "video/mp4",
                                                codec: e.codec,
                                                initSegment: a.default.initSegment([e]),
                                                metadata: {
                                                    width: e.width,
                                                    height: e.height
                                                }
                                            }, h)) {
                                            o = e.inputTimeScale;
                                            var g = this.getVideoStartPts(u),
                                                v = Math.round(o * r);
                                            s = Math.min(s, p(u[0].dts, g) - v), n = Math.min(n, g - v)
                                        }
                                        if (Object.keys(d).length) return this.ISGenerated = !0, h && (this._initPTS = n, this._initDTS = s), {
                                            tracks: d,
                                            initPTS: n,
                                            timescale: o
                                        }
                                    }, e.remuxVideo = function(t, e, r, i) {
                                        var n, u, f, v = t.inputTimeScale,
                                            y = t.samples,
                                            E = [],
                                            T = y.length,
                                            b = this._initPTS,
                                            S = this.nextAvcDts,
                                            L = 8,
                                            A = Number.POSITIVE_INFINITY,
                                            D = Number.NEGATIVE_INFINITY,
                                            k = 0,
                                            R = !1;
                                        r && null !== S || (S = e * v - (y[0].pts - p(y[0].dts, y[0].pts)));
                                        for (var _ = 0; _ < T; _++) {
                                            var I = y[_];
                                            I.pts = p(I.pts - b, S), I.dts = p(I.dts - b, S), I.dts > I.pts && (k = Math.max(Math.min(k, I.pts - I.dts), -18e3)), I.dts < y[_ > 0 ? _ - 1 : _].dts && (R = !0)
                                        }
                                        R && y.sort((function(t, e) {
                                            var r = t.dts - e.dts,
                                                i = t.pts - e.pts;
                                            return r || i
                                        })), u = y[0].dts, f = y[y.length - 1].dts;
                                        var w = Math.round((f - u) / (T - 1));
                                        if (k < 0) {
                                            if (k < -2 * w) {
                                                l.logger.warn("PTS < DTS detected in video samples, offsetting DTS from PTS by " + Object(c.toMsFromMpegTsClock)(-w, !0) + " ms");
                                                for (var C = k, O = 0; O < T; O++) y[O].dts = C = Math.max(C, y[O].pts - w), y[O].pts = Math.max(C, y[O].pts)
                                            } else {
                                                l.logger.warn("PTS < DTS detected in video samples, shifting DTS by " + Object(c.toMsFromMpegTsClock)(k, !0) + " ms to overcome this issue");
                                                for (var x = 0; x < T; x++) y[x].dts = y[x].dts + k
                                            }
                                            u = y[0].dts
                                        }
                                        if (r) {
                                            var P = u - S,
                                                F = P > w;
                                            if (F || P < -1) {
                                                F ? l.logger.warn("AVC: " + Object(c.toMsFromMpegTsClock)(P, !0) + " ms (" + P + "dts) hole between fragments detected, filling it") : l.logger.warn("AVC: " + Object(c.toMsFromMpegTsClock)(-P, !0) + " ms (" + P + "dts) overlapping between fragments detected"), u = S;
                                                var M = y[0].pts - P;
                                                y[0].dts = u, y[0].pts = M, l.logger.log("Video: First PTS/DTS adjusted: " + Object(c.toMsFromMpegTsClock)(M, !0) + "/" + Object(c.toMsFromMpegTsClock)(u, !0) + ", delta: " + Object(c.toMsFromMpegTsClock)(P, !0) + " ms")
                                            }
                                        }
                                        g && (u = Math.max(0, u));
                                        for (var N = 0, U = 0, B = 0; B < T; B++) {
                                            for (var G = y[B], j = G.units, K = j.length, H = 0, V = 0; V < K; V++) H += j[V].data.length;
                                            U += H, N += K, G.length = H, G.dts = Math.max(G.dts, u), G.pts = Math.max(G.pts, G.dts, 0), A = Math.min(G.pts, A), D = Math.max(G.pts, D)
                                        }
                                        f = y[T - 1].dts;
                                        var W, q = U + 4 * N + 8;
                                        try {
                                            W = new Uint8Array(q)
                                        } catch (t) {
                                            return void this.observer.emit(s.Events.ERROR, s.Events.ERROR, {
                                                type: o.ErrorTypes.MUX_ERROR,
                                                details: o.ErrorDetails.REMUX_ALLOC_ERROR,
                                                fatal: !1,
                                                bytes: q,
                                                reason: "fail allocating video mdat " + q
                                            })
                                        }
                                        var Y = new DataView(W.buffer);
                                        Y.setUint32(0, q), W.set(a.default.types.mdat, 4);
                                        for (var X = 0; X < T; X++) {
                                            for (var z = y[X], Q = z.units, $ = 0, J = 0, Z = Q.length; J < Z; J++) {
                                                var tt = Q[J],
                                                    et = tt.data,
                                                    rt = tt.data.byteLength;
                                                Y.setUint32(L, rt), L += 4, W.set(et, L), L += rt, $ += 4 + rt
                                            }
                                            if (X < T - 1) n = y[X + 1].dts - z.dts;
                                            else {
                                                var it = this.config,
                                                    nt = z.dts - y[X > 0 ? X - 1 : X].dts;
                                                if (it.stretchShortVideoTrack && null !== this.nextAudioPts) {
                                                    var at = Math.floor(it.maxBufferHole * v),
                                                        st = (i ? A + i * v : this.nextAudioPts) - z.pts;
                                                    st > at ? ((n = st - nt) < 0 && (n = nt), l.logger.log("[mp4-remuxer]: It is approximately " + st / 90 + " ms to the next segment; using duration " + n / 90 + " ms for the last video frame.")) : n = nt
                                                } else n = nt
                                            }
                                            var ot = Math.round(z.pts - z.dts);
                                            E.push(new m(z.key, n, $, ot))
                                        }
                                        if (E.length && h && h < 70) {
                                            var lt = E[0].flags;
                                            lt.dependsOn = 2, lt.isNonSync = 0
                                        }
                                        console.assert(void 0 !== n, "mp4SampleDuration must be computed"), this.nextAvcDts = S = f + n, this.isVideoContiguous = !0;
                                        var ut = {
                                            data1: a.default.moof(t.sequenceNumber++, u, d({}, t, {
                                                samples: E
                                            })),
                                            data2: W,
                                            startPTS: A / v,
                                            endPTS: (D + n) / v,
                                            startDTS: u / v,
                                            endDTS: S / v,
                                            type: "video",
                                            hasAudio: !1,
                                            hasVideo: !0,
                                            nb: E.length,
                                            dropped: t.dropped
                                        };
                                        return t.samples = [], t.dropped = 0, console.assert(W.length, "MDAT length must not be zero"), ut
                                    }, e.remuxAudio = function(t, e, r, i, u) {
                                        var c = t.inputTimeScale,
                                            h = c / (t.samplerate ? t.samplerate : c),
                                            f = t.isAAC ? 1024 : 1152,
                                            g = f * h,
                                            v = this._initPTS,
                                            y = !t.isAAC && this.typeSupported.mpeg,
                                            E = [],
                                            T = t.samples,
                                            b = y ? 0 : 8,
                                            S = this.nextAudioPts || -1,
                                            L = e * c;
                                        if (this.isAudioContiguous = r = r || T.length && S > 0 && (i && Math.abs(L - S) < 9e3 || Math.abs(p(T[0].pts - v, L) - S) < 20 * g), T.forEach((function(t) {
                                                t.pts = p(t.pts - v, L)
                                            })), !r || S < 0) {
                                            if (!(T = T.filter((function(t) {
                                                    return t.pts >= 0
                                                }))).length) return;
                                            S = 0 === u ? 0 : i ? Math.max(0, L) : T[0].pts
                                        }
                                        if (t.isAAC)
                                            for (var A = void 0 !== u, D = this.config.maxAudioFramesDrift, k = 0, R = S; k < T.length; k++) {
                                                var _ = T[k],
                                                    I = _.pts,
                                                    w = I - R,
                                                    C = Math.abs(1e3 * w / c);
                                                if (w <= -D * g && A) 0 === k && (l.logger.warn("Audio frame @ " + (I / c).toFixed(3) + "s overlaps nextAudioPts by " + Math.round(1e3 * w / c) + " ms."), this.nextAudioPts = S = R = I);
                                                else if (w >= D * g && C < 1e4 && A) {
                                                    var O = Math.round(w / g);
                                                    (R = I - O * g) < 0 && (O--, R += g), 0 === k && (this.nextAudioPts = S = R), l.logger.warn("[mp4-remuxer]: Injecting " + O + " audio frame @ " + (R / c).toFixed(3) + "s due to " + Math.round(1e3 * w / c) + " ms gap.");
                                                    for (var x = 0; x < O; x++) {
                                                        var P = Math.max(R, 0),
                                                            F = n.default.getSilentFrame(t.manifestCodec || t.codec, t.channelCount);
                                                        F || (l.logger.log("[mp4-remuxer]: Unable to get silent frame for given audio codec; duplicating last frame instead."), F = _.unit.subarray()), T.splice(k, 0, {
                                                            unit: F,
                                                            pts: P
                                                        }), R += g, k++
                                                    }
                                                }
                                                _.pts = R, R += g
                                            }
                                        for (var M, N = null, U = null, B = 0, G = T.length; G--;) B += T[G].unit.byteLength;
                                        for (var j = 0, K = T.length; j < K; j++) {
                                            var H = T[j],
                                                V = H.unit,
                                                W = H.pts;
                                            if (null !== U) E[j - 1].duration = Math.round((W - U) / h);
                                            else {
                                                if (r && t.isAAC && (W = S), N = W, !(B > 0)) return;
                                                B += b;
                                                try {
                                                    M = new Uint8Array(B)
                                                } catch (t) {
                                                    return void this.observer.emit(s.Events.ERROR, s.Events.ERROR, {
                                                        type: o.ErrorTypes.MUX_ERROR,
                                                        details: o.ErrorDetails.REMUX_ALLOC_ERROR,
                                                        fatal: !1,
                                                        bytes: B,
                                                        reason: "fail allocating audio mdat " + B
                                                    })
                                                }
                                                y || (new DataView(M.buffer).setUint32(0, B), M.set(a.default.types.mdat, 4))
                                            }
                                            M.set(V, b);
                                            var q = V.byteLength;
                                            b += q, E.push(new m(!0, f, q, 0)), U = W
                                        }
                                        var Y = E.length;
                                        if (Y) {
                                            var X = E[E.length - 1];
                                            this.nextAudioPts = S = U + h * X.duration;
                                            var z = y ? new Uint8Array(0) : a.default.moof(t.sequenceNumber++, N / h, d({}, t, {
                                                samples: E
                                            }));
                                            t.samples = [];
                                            var Q = N / c,
                                                $ = S / c,
                                                J = {
                                                    data1: z,
                                                    data2: M,
                                                    startPTS: Q,
                                                    endPTS: $,
                                                    startDTS: Q,
                                                    endDTS: $,
                                                    type: "audio",
                                                    hasAudio: !0,
                                                    hasVideo: !1,
                                                    nb: Y
                                                };
                                            return this.isAudioContiguous = !0, console.assert(M.length, "MDAT length must not be zero"), J
                                        }
                                    }, e.remuxEmptyAudio = function(t, e, r, i) {
                                        var a = t.inputTimeScale,
                                            s = a / (t.samplerate ? t.samplerate : a),
                                            o = this.nextAudioPts,
                                            u = (null !== o ? o : i.startDTS * a) + this._initDTS,
                                            c = i.endDTS * a + this._initDTS,
                                            d = 1024 * s,
                                            h = Math.ceil((c - u) / d),
                                            f = n.default.getSilentFrame(t.manifestCodec || t.codec, t.channelCount);
                                        if (l.logger.warn("[mp4-remuxer]: remux empty Audio"), f) {
                                            for (var g = [], v = 0; v < h; v++) {
                                                var p = u + v * d;
                                                g.push({
                                                    unit: f,
                                                    pts: p,
                                                    dts: p
                                                })
                                            }
                                            return t.samples = g, this.remuxAudio(t, e, r, !1)
                                        }
                                        l.logger.trace("[mp4-remuxer]: Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec")
                                    }, e.remuxID3 = function(t, e) {
                                        var r = t.samples.length;
                                        if (r) {
                                            for (var i = t.inputTimeScale, n = this._initPTS, a = this._initDTS, s = 0; s < r; s++) {
                                                var o = t.samples[s];
                                                o.pts = p(o.pts - n, e * i) / i, o.dts = p(o.dts - a, e * i) / i
                                            }
                                            var l = t.samples;
                                            return t.samples = [], {
                                                samples: l
                                            }
                                        }
                                    }, e.remuxText = function(t, e) {
                                        var r = t.samples.length;
                                        if (r) {
                                            for (var i = t.inputTimeScale, n = this._initPTS, a = 0; a < r; a++) {
                                                var s = t.samples[a];
                                                s.pts = p(s.pts - n, e * i) / i
                                            }
                                            t.samples.sort((function(t, e) {
                                                return t.pts - e.pts
                                            }));
                                            var o = t.samples;
                                            return t.samples = [], {
                                                samples: o
                                            }
                                        }
                                    }, t
                                }();

                            function p(t, e) {
                                var r;
                                if (null === e) return t;
                                for (r = e < t ? -8589934592 : 8589934592; Math.abs(t - e) > 4294967296;) t += r;
                                return t
                            }
                            var m = function(t, e, r, i) {
                                    this.size = void 0, this.duration = void 0, this.cts = void 0, this.flags = void 0, this.duration = e, this.size = r, this.cts = i, this.flags = new y(t)
                                },
                                y = function(t) {
                                    this.isLeading = 0, this.isDependedOn = 0, this.hasRedundancy = 0, this.degradPrio = 0, this.dependsOn = 1, this.isNonSync = 1, this.dependsOn = t ? 2 : 1, this.isNonSync = t ? 0 : 1
                                }
                        },
                        "./src/remux/passthrough-remuxer.ts": function(t, e, r) {
                            "use strict";
                            r.r(e);
                            var i = r("./src/polyfills/number.ts"),
                                n = r("./src/utils/mp4-tools.ts"),
                                a = r("./src/loader/fragment.ts"),
                                s = r("./src/utils/logger.ts"),
                                o = function() {
                                    function t() {
                                        this.emitInitSegment = !1, this.audioCodec = void 0, this.videoCodec = void 0, this.initData = void 0, this.initPTS = void 0, this.initTracks = void 0, this.lastEndDTS = null
                                    }
                                    var e = t.prototype;
                                    return e.destroy = function() {}, e.resetTimeStamp = function(t) {
                                        this.initPTS = t, this.lastEndDTS = null
                                    }, e.resetNextTimestamp = function() {
                                        this.lastEndDTS = null
                                    }, e.resetInitSegment = function(t, e, r) {
                                        this.audioCodec = e, this.videoCodec = r, this.generateInitSegment(t), this.emitInitSegment = !0
                                    }, e.generateInitSegment = function(t) {
                                        var e = this.audioCodec,
                                            r = this.videoCodec;
                                        if (!t || !t.byteLength) return this.initTracks = void 0, void(this.initData = void 0);
                                        var i = this.initData = Object(n.parseInitSegment)(t);
                                        e || (e = u(i.audio, a.ElementaryStreamTypes.AUDIO)), r || (r = u(i.video, a.ElementaryStreamTypes.VIDEO));
                                        var o = {};
                                        i.audio && i.video ? o.audiovideo = {
                                            container: "video/mp4",
                                            codec: e + "," + r,
                                            initSegment: t,
                                            id: "main"
                                        } : i.audio ? o.audio = {
                                            container: "audio/mp4",
                                            codec: e,
                                            initSegment: t,
                                            id: "audio"
                                        } : i.video ? o.video = {
                                            container: "video/mp4",
                                            codec: r,
                                            initSegment: t,
                                            id: "main"
                                        } : s.logger.warn("[passthrough-remuxer.ts]: initSegment does not contain moov or trak boxes."), this.initTracks = o
                                    }, e.remux = function(t, e, r, a, o) {
                                        var u = this.initPTS,
                                            c = this.lastEndDTS,
                                            d = {
                                                audio: void 0,
                                                video: void 0,
                                                text: a,
                                                id3: r,
                                                initSegment: void 0
                                            };
                                        Object(i.isFiniteNumber)(c) || (c = this.lastEndDTS = o || 0);
                                        var h = e.samples;
                                        if (!h || !h.length) return d;
                                        var f = {
                                                initPTS: void 0,
                                                timescale: 1
                                            },
                                            g = this.initData;
                                        if (g && g.length || (this.generateInitSegment(h), g = this.initData), !g || !g.length) return s.logger.warn("[passthrough-remuxer.ts]: Failed to generate initSegment."), d;
                                        this.emitInitSegment && (f.tracks = this.initTracks, this.emitInitSegment = !1), Object(i.isFiniteNumber)(u) || (this.initPTS = f.initPTS = u = l(g, h, c));
                                        var v = Object(n.getDuration)(h, g),
                                            p = c,
                                            m = v + p;
                                        Object(n.offsetStartDTS)(g, h, u), v > 0 ? this.lastEndDTS = m : (s.logger.warn("Duration parsed from mp4 should be greater than zero"), this.resetNextTimestamp());
                                        var y = !!g.audio,
                                            E = !!g.video,
                                            T = "";
                                        y && (T += "audio"), E && (T += "video");
                                        var b = {
                                            data1: h,
                                            startPTS: p,
                                            startDTS: p,
                                            endPTS: m,
                                            endDTS: m,
                                            type: T,
                                            hasAudio: y,
                                            hasVideo: E,
                                            nb: 1,
                                            dropped: 0
                                        };
                                        return d.audio = "audio" === b.type ? b : void 0, d.video = "audio" !== b.type ? b : void 0, d.text = a, d.id3 = r, d.initSegment = f, d
                                    }, t
                                }(),
                                l = function(t, e, r) {
                                    return Object(n.getStartDTS)(t, e) - r
                                };

                            function u(t, e) {
                                var r = null == t ? void 0 : t.codec;
                                return r && r.length > 4 ? r : "hvc1" === r ? "hvc1.1.c.L120.90" : "av01" === r ? "av01.0.04M.08" : "avc1" === r || e === a.ElementaryStreamTypes.VIDEO ? "avc1.42e01e" : "mp4a.40.5"
                            }
                            e.default = o
                        },
                        "./src/task-loop.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "default", (function() {
                                return i
                            }));
                            var i = function() {
                                function t() {
                                    this._boundTick = void 0, this._tickTimer = null, this._tickInterval = null, this._tickCallCount = 0, this._boundTick = this.tick.bind(this)
                                }
                                var e = t.prototype;
                                return e.destroy = function() {
                                    this.onHandlerDestroying(), this.onHandlerDestroyed()
                                }, e.onHandlerDestroying = function() {
                                    this.clearNextTick(), this.clearInterval()
                                }, e.onHandlerDestroyed = function() {}, e.hasInterval = function() {
                                    return !!this._tickInterval
                                }, e.hasNextTick = function() {
                                    return !!this._tickTimer
                                }, e.setInterval = function(t) {
                                    return !this._tickInterval && (this._tickInterval = self.setInterval(this._boundTick, t), !0)
                                }, e.clearInterval = function() {
                                    return !!this._tickInterval && (self.clearInterval(this._tickInterval), this._tickInterval = null, !0)
                                }, e.clearNextTick = function() {
                                    return !!this._tickTimer && (self.clearTimeout(this._tickTimer), this._tickTimer = null, !0)
                                }, e.tick = function() {
                                    this._tickCallCount++, 1 === this._tickCallCount && (this.doTick(), this._tickCallCount > 1 && this.tickImmediate(), this._tickCallCount = 0)
                                }, e.tickImmediate = function() {
                                    this.clearNextTick(), this._tickTimer = self.setTimeout(this._boundTick, 0)
                                }, e.doTick = function() {}, t
                            }()
                        },
                        "./src/types/level.ts": function(t, e, r) {
                            "use strict";

                            function i(t, e) {
                                for (var r = 0; r < e.length; r++) {
                                    var i = e[r];
                                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                                }
                            }
                            var n;

                            function a(t, e) {
                                var r = t.canSkipUntil,
                                    i = t.canSkipDateRanges,
                                    a = t.endSN;
                                return r && (void 0 !== e ? e - a : 0) < r ? i ? n.v2 : n.Yes : n.No
                            }
                            r.r(e), r.d(e, "HlsSkip", (function() {
                                    return n
                                })), r.d(e, "getSkipValue", (function() {
                                    return a
                                })), r.d(e, "HlsUrlParameters", (function() {
                                    return s
                                })), r.d(e, "Level", (function() {
                                    return o
                                })),
                                function(t) {
                                    t.No = "", t.Yes = "YES", t.v2 = "v2"
                                }(n || (n = {}));
                            var s = function() {
                                    function t(t, e, r) {
                                        this.msn = void 0, this.part = void 0, this.skip = void 0, this.msn = t, this.part = e, this.skip = r
                                    }
                                    return t.prototype.addDirectives = function(t) {
                                        var e = new self.URL(t);
                                        return void 0 !== this.msn && e.searchParams.set("_HLS_msn", this.msn.toString()), void 0 !== this.part && e.searchParams.set("_HLS_part", this.part.toString()), this.skip && e.searchParams.set("_HLS_skip", this.skip), e.toString()
                                    }, t
                                }(),
                                o = function() {
                                    function t(t) {
                                        this.attrs = void 0, this.audioCodec = void 0, this.bitrate = void 0, this.codecSet = void 0, this.height = void 0, this.id = void 0, this.name = void 0, this.videoCodec = void 0, this.width = void 0, this.unknownCodecs = void 0, this.audioGroupIds = void 0, this.details = void 0, this.fragmentError = 0, this.loadError = 0, this.loaded = void 0, this.realBitrate = 0, this.textGroupIds = void 0, this.url = void 0, this._urlId = 0, this.url = [t.url], this.attrs = t.attrs, this.bitrate = t.bitrate, t.details && (this.details = t.details), this.id = t.id || 0, this.name = t.name, this.width = t.width || 0, this.height = t.height || 0, this.audioCodec = t.audioCodec, this.videoCodec = t.videoCodec, this.unknownCodecs = t.unknownCodecs, this.codecSet = [t.videoCodec, t.audioCodec].filter((function(t) {
                                            return t
                                        })).join(",").replace(/\.[^.,]+/g, "")
                                    }
                                    var e, r;
                                    return e = t, (r = [{
                                        key: "maxBitrate",
                                        get: function() {
                                            return Math.max(this.realBitrate, this.bitrate)
                                        }
                                    }, {
                                        key: "uri",
                                        get: function() {
                                            return this.url[this._urlId] || ""
                                        }
                                    }, {
                                        key: "urlId",
                                        get: function() {
                                            return this._urlId
                                        },
                                        set: function(t) {
                                            var e = t % this.url.length;
                                            this._urlId !== e && (this.details = void 0, this._urlId = e)
                                        }
                                    }]) && i(e.prototype, r), t
                                }()
                        },
                        "./src/types/loader.ts": function(t, e, r) {
                            "use strict";
                            var i, n;
                            r.r(e), r.d(e, "PlaylistContextType", (function() {
                                    return i
                                })), r.d(e, "PlaylistLevelType", (function() {
                                    return n
                                })),
                                function(t) {
                                    t.MANIFEST = "manifest", t.LEVEL = "level", t.AUDIO_TRACK = "audioTrack", t.SUBTITLE_TRACK = "subtitleTrack"
                                }(i || (i = {})),
                                function(t) {
                                    t.MAIN = "main", t.AUDIO = "audio", t.SUBTITLE = "subtitle"
                                }(n || (n = {}))
                        },
                        "./src/types/transmuxer.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "ChunkMetadata", (function() {
                                return i
                            }));
                            var i = function(t, e, r, i, n, a) {
                                void 0 === i && (i = 0), void 0 === n && (n = -1), void 0 === a && (a = !1), this.level = void 0, this.sn = void 0, this.part = void 0, this.id = void 0, this.size = void 0, this.partial = void 0, this.transmuxing = {
                                    start: 0,
                                    executeStart: 0,
                                    executeEnd: 0,
                                    end: 0
                                }, this.buffering = {
                                    audio: {
                                        start: 0,
                                        executeStart: 0,
                                        executeEnd: 0,
                                        end: 0
                                    },
                                    video: {
                                        start: 0,
                                        executeStart: 0,
                                        executeEnd: 0,
                                        end: 0
                                    },
                                    audiovideo: {
                                        start: 0,
                                        executeStart: 0,
                                        executeEnd: 0,
                                        end: 0
                                    }
                                }, this.level = t, this.sn = e, this.id = r, this.size = i, this.part = n, this.partial = a
                            }
                        },
                        "./src/utils/attr-list.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "AttrList", (function() {
                                return a
                            }));
                            var i = /^(\d+)x(\d+)$/,
                                n = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g,
                                a = function() {
                                    function t(e) {
                                        for (var r in "string" == typeof e && (e = t.parseAttrList(e)), e) e.hasOwnProperty(r) && (this[r] = e[r])
                                    }
                                    var e = t.prototype;
                                    return e.decimalInteger = function(t) {
                                        var e = parseInt(this[t], 10);
                                        return e > Number.MAX_SAFE_INTEGER ? 1 / 0 : e
                                    }, e.hexadecimalInteger = function(t) {
                                        if (this[t]) {
                                            var e = (this[t] || "0x").slice(2);
                                            e = (1 & e.length ? "0" : "") + e;
                                            for (var r = new Uint8Array(e.length / 2), i = 0; i < e.length / 2; i++) r[i] = parseInt(e.slice(2 * i, 2 * i + 2), 16);
                                            return r
                                        }
                                        return null
                                    }, e.hexadecimalIntegerAsNumber = function(t) {
                                        var e = parseInt(this[t], 16);
                                        return e > Number.MAX_SAFE_INTEGER ? 1 / 0 : e
                                    }, e.decimalFloatingPoint = function(t) {
                                        return parseFloat(this[t])
                                    }, e.optionalFloat = function(t, e) {
                                        var r = this[t];
                                        return r ? parseFloat(r) : e
                                    }, e.enumeratedString = function(t) {
                                        return this[t]
                                    }, e.bool = function(t) {
                                        return "YES" === this[t]
                                    }, e.decimalResolution = function(t) {
                                        var e = i.exec(this[t]);
                                        if (null !== e) return {
                                            width: parseInt(e[1], 10),
                                            height: parseInt(e[2], 10)
                                        }
                                    }, t.parseAttrList = function(t) {
                                        var e, r = {};
                                        for (n.lastIndex = 0; null !== (e = n.exec(t));) {
                                            var i = e[2];
                                            0 === i.indexOf('"') && i.lastIndexOf('"') === i.length - 1 && (i = i.slice(1, -1)), r[e[1]] = i
                                        }
                                        return r
                                    }, t
                                }()
                        },
                        "./src/utils/binary-search.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), e.default = {
                                search: function(t, e) {
                                    for (var r = 0, i = t.length - 1, n = null, a = null; r <= i;) {
                                        var s = e(a = t[n = (r + i) / 2 | 0]);
                                        if (s > 0) r = n + 1;
                                        else {
                                            if (!(s < 0)) return a;
                                            i = n - 1
                                        }
                                    }
                                    return null
                                }
                            }
                        },
                        "./src/utils/buffer-helper.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "BufferHelper", (function() {
                                return a
                            }));
                            var i = r("./src/utils/logger.ts"),
                                n = {
                                    length: 0,
                                    start: function() {
                                        return 0
                                    },
                                    end: function() {
                                        return 0
                                    }
                                },
                                a = function() {
                                    function t() {}
                                    return t.isBuffered = function(e, r) {
                                        try {
                                            if (e)
                                                for (var i = t.getBuffered(e), n = 0; n < i.length; n++)
                                                    if (r >= i.start(n) && r <= i.end(n)) return !0
                                        } catch (t) {}
                                        return !1
                                    }, t.bufferInfo = function(e, r, i) {
                                        try {
                                            if (e) {
                                                var n, a = t.getBuffered(e),
                                                    s = [];
                                                for (n = 0; n < a.length; n++) s.push({
                                                    start: a.start(n),
                                                    end: a.end(n)
                                                });
                                                return this.bufferedInfo(s, r, i)
                                            }
                                        } catch (t) {}
                                        return {
                                            len: 0,
                                            start: r,
                                            end: r,
                                            nextStart: void 0
                                        }
                                    }, t.bufferedInfo = function(t, e, r) {
                                        e = Math.max(0, e), t.sort((function(t, e) {
                                            return t.start - e.start || e.end - t.end
                                        }));
                                        var i = [];
                                        if (r)
                                            for (var n = 0; n < t.length; n++) {
                                                var a = i.length;
                                                if (a) {
                                                    var s = i[a - 1].end;
                                                    t[n].start - s < r ? t[n].end > s && (i[a - 1].end = t[n].end) : i.push(t[n])
                                                } else i.push(t[n])
                                            } else i = t;
                                        for (var o, l = 0, u = e, c = e, d = 0; d < i.length; d++) {
                                            var h = i[d].start,
                                                f = i[d].end;
                                            if (e + r >= h && e < f) u = h, l = (c = f) - e;
                                            else if (e + r < h) {
                                                o = h;
                                                break
                                            }
                                        }
                                        return {
                                            len: l,
                                            start: u || 0,
                                            end: c || 0,
                                            nextStart: o
                                        }
                                    }, t.getBuffered = function(t) {
                                        try {
                                            return t.buffered
                                        } catch (t) {
                                            return i.logger.log("failed to get media.buffered", t), n
                                        }
                                    }, t
                                }()
                        },
                        "./src/utils/cea-608-parser.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "Row", (function() {
                                return y
                            })), r.d(e, "CaptionScreen", (function() {
                                return E
                            }));
                            var i, n = r("./src/utils/logger.ts"),
                                a = {
                                    42: 225,
                                    92: 233,
                                    94: 237,
                                    95: 243,
                                    96: 250,
                                    123: 231,
                                    124: 247,
                                    125: 209,
                                    126: 241,
                                    127: 9608,
                                    128: 174,
                                    129: 176,
                                    130: 189,
                                    131: 191,
                                    132: 8482,
                                    133: 162,
                                    134: 163,
                                    135: 9834,
                                    136: 224,
                                    137: 32,
                                    138: 232,
                                    139: 226,
                                    140: 234,
                                    141: 238,
                                    142: 244,
                                    143: 251,
                                    144: 193,
                                    145: 201,
                                    146: 211,
                                    147: 218,
                                    148: 220,
                                    149: 252,
                                    150: 8216,
                                    151: 161,
                                    152: 42,
                                    153: 8217,
                                    154: 9473,
                                    155: 169,
                                    156: 8480,
                                    157: 8226,
                                    158: 8220,
                                    159: 8221,
                                    160: 192,
                                    161: 194,
                                    162: 199,
                                    163: 200,
                                    164: 202,
                                    165: 203,
                                    166: 235,
                                    167: 206,
                                    168: 207,
                                    169: 239,
                                    170: 212,
                                    171: 217,
                                    172: 249,
                                    173: 219,
                                    174: 171,
                                    175: 187,
                                    176: 195,
                                    177: 227,
                                    178: 205,
                                    179: 204,
                                    180: 236,
                                    181: 210,
                                    182: 242,
                                    183: 213,
                                    184: 245,
                                    185: 123,
                                    186: 125,
                                    187: 92,
                                    188: 94,
                                    189: 95,
                                    190: 124,
                                    191: 8764,
                                    192: 196,
                                    193: 228,
                                    194: 214,
                                    195: 246,
                                    196: 223,
                                    197: 165,
                                    198: 164,
                                    199: 9475,
                                    200: 197,
                                    201: 229,
                                    202: 216,
                                    203: 248,
                                    204: 9487,
                                    205: 9491,
                                    206: 9495,
                                    207: 9499
                                },
                                s = function(t) {
                                    var e = t;
                                    return a.hasOwnProperty(t) && (e = a[t]), String.fromCharCode(e)
                                },
                                o = 15,
                                l = 100,
                                u = {
                                    17: 1,
                                    18: 3,
                                    21: 5,
                                    22: 7,
                                    23: 9,
                                    16: 11,
                                    19: 12,
                                    20: 14
                                },
                                c = {
                                    17: 2,
                                    18: 4,
                                    21: 6,
                                    22: 8,
                                    23: 10,
                                    19: 13,
                                    20: 15
                                },
                                d = {
                                    25: 1,
                                    26: 3,
                                    29: 5,
                                    30: 7,
                                    31: 9,
                                    24: 11,
                                    27: 12,
                                    28: 14
                                },
                                h = {
                                    25: 2,
                                    26: 4,
                                    29: 6,
                                    30: 8,
                                    31: 10,
                                    27: 13,
                                    28: 15
                                },
                                f = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "black", "transparent"];
                            ! function(t) {
                                t[t.ERROR = 0] = "ERROR", t[t.TEXT = 1] = "TEXT", t[t.WARNING = 2] = "WARNING", t[t.INFO = 2] = "INFO", t[t.DEBUG = 3] = "DEBUG", t[t.DATA = 3] = "DATA"
                            }(i || (i = {}));
                            var g = function() {
                                    function t() {
                                        this.time = null, this.verboseLevel = i.ERROR
                                    }
                                    return t.prototype.log = function(t, e) {
                                        this.verboseLevel >= t && n.logger.log(this.time + " [" + t + "] " + e)
                                    }, t
                                }(),
                                v = function(t) {
                                    for (var e = [], r = 0; r < t.length; r++) e.push(t[r].toString(16));
                                    return e
                                },
                                p = function() {
                                    function t(t, e, r, i, n) {
                                        this.foreground = void 0, this.underline = void 0, this.italics = void 0, this.background = void 0, this.flash = void 0, this.foreground = t || "white", this.underline = e || !1, this.italics = r || !1, this.background = i || "black", this.flash = n || !1
                                    }
                                    var e = t.prototype;
                                    return e.reset = function() {
                                        this.foreground = "white", this.underline = !1, this.italics = !1, this.background = "black", this.flash = !1
                                    }, e.setStyles = function(t) {
                                        for (var e = ["foreground", "underline", "italics", "background", "flash"], r = 0; r < e.length; r++) {
                                            var i = e[r];
                                            t.hasOwnProperty(i) && (this[i] = t[i])
                                        }
                                    }, e.isDefault = function() {
                                        return "white" === this.foreground && !this.underline && !this.italics && "black" === this.background && !this.flash
                                    }, e.equals = function(t) {
                                        return this.foreground === t.foreground && this.underline === t.underline && this.italics === t.italics && this.background === t.background && this.flash === t.flash
                                    }, e.copy = function(t) {
                                        this.foreground = t.foreground, this.underline = t.underline, this.italics = t.italics, this.background = t.background, this.flash = t.flash
                                    }, e.toString = function() {
                                        return "color=" + this.foreground + ", underline=" + this.underline + ", italics=" + this.italics + ", background=" + this.background + ", flash=" + this.flash
                                    }, t
                                }(),
                                m = function() {
                                    function t(t, e, r, i, n, a) {
                                        this.uchar = void 0, this.penState = void 0, this.uchar = t || " ", this.penState = new p(e, r, i, n, a)
                                    }
                                    var e = t.prototype;
                                    return e.reset = function() {
                                        this.uchar = " ", this.penState.reset()
                                    }, e.setChar = function(t, e) {
                                        this.uchar = t, this.penState.copy(e)
                                    }, e.setPenState = function(t) {
                                        this.penState.copy(t)
                                    }, e.equals = function(t) {
                                        return this.uchar === t.uchar && this.penState.equals(t.penState)
                                    }, e.copy = function(t) {
                                        this.uchar = t.uchar, this.penState.copy(t.penState)
                                    }, e.isEmpty = function() {
                                        return " " === this.uchar && this.penState.isDefault()
                                    }, t
                                }(),
                                y = function() {
                                    function t(t) {
                                        this.chars = void 0, this.pos = void 0, this.currPenState = void 0, this.cueStartTime = void 0, this.logger = void 0, this.chars = [];
                                        for (var e = 0; e < l; e++) this.chars.push(new m);
                                        this.logger = t, this.pos = 0, this.currPenState = new p
                                    }
                                    var e = t.prototype;
                                    return e.equals = function(t) {
                                        for (var e = !0, r = 0; r < l; r++)
                                            if (!this.chars[r].equals(t.chars[r])) {
                                                e = !1;
                                                break
                                            } return e
                                    }, e.copy = function(t) {
                                        for (var e = 0; e < l; e++) this.chars[e].copy(t.chars[e])
                                    }, e.isEmpty = function() {
                                        for (var t = !0, e = 0; e < l; e++)
                                            if (!this.chars[e].isEmpty()) {
                                                t = !1;
                                                break
                                            } return t
                                    }, e.setCursor = function(t) {
                                        this.pos !== t && (this.pos = t), this.pos < 0 ? (this.logger.log(i.DEBUG, "Negative cursor position " + this.pos), this.pos = 0) : this.pos > l && (this.logger.log(i.DEBUG, "Too large cursor position " + this.pos), this.pos = l)
                                    }, e.moveCursor = function(t) {
                                        var e = this.pos + t;
                                        if (t > 1)
                                            for (var r = this.pos + 1; r < e + 1; r++) this.chars[r].setPenState(this.currPenState);
                                        this.setCursor(e)
                                    }, e.backSpace = function() {
                                        this.moveCursor(-1), this.chars[this.pos].setChar(" ", this.currPenState)
                                    }, e.insertChar = function(t) {
                                        t >= 144 && this.backSpace();
                                        var e = s(t);
                                        this.pos >= l ? this.logger.log(i.ERROR, "Cannot insert " + t.toString(16) + " (" + e + ") at position " + this.pos + ". Skipping it!") : (this.chars[this.pos].setChar(e, this.currPenState), this.moveCursor(1))
                                    }, e.clearFromPos = function(t) {
                                        var e;
                                        for (e = t; e < l; e++) this.chars[e].reset()
                                    }, e.clear = function() {
                                        this.clearFromPos(0), this.pos = 0, this.currPenState.reset()
                                    }, e.clearToEndOfRow = function() {
                                        this.clearFromPos(this.pos)
                                    }, e.getTextString = function() {
                                        for (var t = [], e = !0, r = 0; r < l; r++) {
                                            var i = this.chars[r].uchar;
                                            " " !== i && (e = !1), t.push(i)
                                        }
                                        return e ? "" : t.join("")
                                    }, e.setPenStyles = function(t) {
                                        this.currPenState.setStyles(t), this.chars[this.pos].setPenState(this.currPenState)
                                    }, t
                                }(),
                                E = function() {
                                    function t(t) {
                                        this.rows = void 0, this.currRow = void 0, this.nrRollUpRows = void 0, this.lastOutputScreen = void 0, this.logger = void 0, this.rows = [];
                                        for (var e = 0; e < o; e++) this.rows.push(new y(t));
                                        this.logger = t, this.currRow = 14, this.nrRollUpRows = null, this.lastOutputScreen = null, this.reset()
                                    }
                                    var e = t.prototype;
                                    return e.reset = function() {
                                        for (var t = 0; t < o; t++) this.rows[t].clear();
                                        this.currRow = 14
                                    }, e.equals = function(t) {
                                        for (var e = !0, r = 0; r < o; r++)
                                            if (!this.rows[r].equals(t.rows[r])) {
                                                e = !1;
                                                break
                                            } return e
                                    }, e.copy = function(t) {
                                        for (var e = 0; e < o; e++) this.rows[e].copy(t.rows[e])
                                    }, e.isEmpty = function() {
                                        for (var t = !0, e = 0; e < o; e++)
                                            if (!this.rows[e].isEmpty()) {
                                                t = !1;
                                                break
                                            } return t
                                    }, e.backSpace = function() {
                                        this.rows[this.currRow].backSpace()
                                    }, e.clearToEndOfRow = function() {
                                        this.rows[this.currRow].clearToEndOfRow()
                                    }, e.insertChar = function(t) {
                                        this.rows[this.currRow].insertChar(t)
                                    }, e.setPen = function(t) {
                                        this.rows[this.currRow].setPenStyles(t)
                                    }, e.moveCursor = function(t) {
                                        this.rows[this.currRow].moveCursor(t)
                                    }, e.setCursor = function(t) {
                                        this.logger.log(i.INFO, "setCursor: " + t), this.rows[this.currRow].setCursor(t)
                                    }, e.setPAC = function(t) {
                                        this.logger.log(i.INFO, "pacData = " + JSON.stringify(t));
                                        var e = t.row - 1;
                                        if (this.nrRollUpRows && e < this.nrRollUpRows - 1 && (e = this.nrRollUpRows - 1), this.nrRollUpRows && this.currRow !== e) {
                                            for (var r = 0; r < o; r++) this.rows[r].clear();
                                            var n = this.currRow + 1 - this.nrRollUpRows,
                                                a = this.lastOutputScreen;
                                            if (a) {
                                                var s = a.rows[n].cueStartTime,
                                                    l = this.logger.time;
                                                if (s && null !== l && s < l)
                                                    for (var u = 0; u < this.nrRollUpRows; u++) this.rows[e - this.nrRollUpRows + u + 1].copy(a.rows[n + u])
                                            }
                                        }
                                        this.currRow = e;
                                        var c = this.rows[this.currRow];
                                        if (null !== t.indent) {
                                            var d = t.indent,
                                                h = Math.max(d - 1, 0);
                                            c.setCursor(t.indent), t.color = c.chars[h].penState.foreground
                                        }
                                        var f = {
                                            foreground: t.color,
                                            underline: t.underline,
                                            italics: t.italics,
                                            background: "black",
                                            flash: !1
                                        };
                                        this.setPen(f)
                                    }, e.setBkgData = function(t) {
                                        this.logger.log(i.INFO, "bkgData = " + JSON.stringify(t)), this.backSpace(), this.setPen(t), this.insertChar(32)
                                    }, e.setRollUpRows = function(t) {
                                        this.nrRollUpRows = t
                                    }, e.rollUp = function() {
                                        if (null !== this.nrRollUpRows) {
                                            this.logger.log(i.TEXT, this.getDisplayText());
                                            var t = this.currRow + 1 - this.nrRollUpRows,
                                                e = this.rows.splice(t, 1)[0];
                                            e.clear(), this.rows.splice(this.currRow, 0, e), this.logger.log(i.INFO, "Rolling up")
                                        } else this.logger.log(i.DEBUG, "roll_up but nrRollUpRows not set yet")
                                    }, e.getDisplayText = function(t) {
                                        t = t || !1;
                                        for (var e = [], r = "", i = -1, n = 0; n < o; n++) {
                                            var a = this.rows[n].getTextString();
                                            a && (i = n + 1, t ? e.push("Row " + i + ": '" + a + "'") : e.push(a.trim()))
                                        }
                                        return e.length > 0 && (r = t ? "[" + e.join(" | ") + "]" : e.join("\n")), r
                                    }, e.getTextAndFormat = function() {
                                        return this.rows
                                    }, t
                                }(),
                                T = function() {
                                    function t(t, e, r) {
                                        this.chNr = void 0, this.outputFilter = void 0, this.mode = void 0, this.verbose = void 0, this.displayedMemory = void 0, this.nonDisplayedMemory = void 0, this.lastOutputScreen = void 0, this.currRollUpRow = void 0, this.writeScreen = void 0, this.cueStartTime = void 0, this.logger = void 0, this.chNr = t, this.outputFilter = e, this.mode = null, this.verbose = 0, this.displayedMemory = new E(r), this.nonDisplayedMemory = new E(r), this.lastOutputScreen = new E(r), this.currRollUpRow = this.displayedMemory.rows[14], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null, this.logger = r
                                    }
                                    var e = t.prototype;
                                    return e.reset = function() {
                                        this.mode = null, this.displayedMemory.reset(), this.nonDisplayedMemory.reset(), this.lastOutputScreen.reset(), this.outputFilter.reset(), this.currRollUpRow = this.displayedMemory.rows[14], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null
                                    }, e.getHandler = function() {
                                        return this.outputFilter
                                    }, e.setHandler = function(t) {
                                        this.outputFilter = t
                                    }, e.setPAC = function(t) {
                                        this.writeScreen.setPAC(t)
                                    }, e.setBkgData = function(t) {
                                        this.writeScreen.setBkgData(t)
                                    }, e.setMode = function(t) {
                                        t !== this.mode && (this.mode = t, this.logger.log(i.INFO, "MODE=" + t), "MODE_POP-ON" === this.mode ? this.writeScreen = this.nonDisplayedMemory : (this.writeScreen = this.displayedMemory, this.writeScreen.reset()), "MODE_ROLL-UP" !== this.mode && (this.displayedMemory.nrRollUpRows = null, this.nonDisplayedMemory.nrRollUpRows = null), this.mode = t)
                                    }, e.insertChars = function(t) {
                                        for (var e = 0; e < t.length; e++) this.writeScreen.insertChar(t[e]);
                                        var r = this.writeScreen === this.displayedMemory ? "DISP" : "NON_DISP";
                                        this.logger.log(i.INFO, r + ": " + this.writeScreen.getDisplayText(!0)), "MODE_PAINT-ON" !== this.mode && "MODE_ROLL-UP" !== this.mode || (this.logger.log(i.TEXT, "DISPLAYED: " + this.displayedMemory.getDisplayText(!0)), this.outputDataUpdate())
                                    }, e.ccRCL = function() {
                                        this.logger.log(i.INFO, "RCL - Resume Caption Loading"), this.setMode("MODE_POP-ON")
                                    }, e.ccBS = function() {
                                        this.logger.log(i.INFO, "BS - BackSpace"), "MODE_TEXT" !== this.mode && (this.writeScreen.backSpace(), this.writeScreen === this.displayedMemory && this.outputDataUpdate())
                                    }, e.ccAOF = function() {}, e.ccAON = function() {}, e.ccDER = function() {
                                        this.logger.log(i.INFO, "DER- Delete to End of Row"), this.writeScreen.clearToEndOfRow(), this.outputDataUpdate()
                                    }, e.ccRU = function(t) {
                                        this.logger.log(i.INFO, "RU(" + t + ") - Roll Up"), this.writeScreen = this.displayedMemory, this.setMode("MODE_ROLL-UP"), this.writeScreen.setRollUpRows(t)
                                    }, e.ccFON = function() {
                                        this.logger.log(i.INFO, "FON - Flash On"), this.writeScreen.setPen({
                                            flash: !0
                                        })
                                    }, e.ccRDC = function() {
                                        this.logger.log(i.INFO, "RDC - Resume Direct Captioning"), this.setMode("MODE_PAINT-ON")
                                    }, e.ccTR = function() {
                                        this.logger.log(i.INFO, "TR"), this.setMode("MODE_TEXT")
                                    }, e.ccRTD = function() {
                                        this.logger.log(i.INFO, "RTD"), this.setMode("MODE_TEXT")
                                    }, e.ccEDM = function() {
                                        this.logger.log(i.INFO, "EDM - Erase Displayed Memory"), this.displayedMemory.reset(), this.outputDataUpdate(!0)
                                    }, e.ccCR = function() {
                                        this.logger.log(i.INFO, "CR - Carriage Return"), this.writeScreen.rollUp(), this.outputDataUpdate(!0)
                                    }, e.ccENM = function() {
                                        this.logger.log(i.INFO, "ENM - Erase Non-displayed Memory"), this.nonDisplayedMemory.reset()
                                    }, e.ccEOC = function() {
                                        if (this.logger.log(i.INFO, "EOC - End Of Caption"), "MODE_POP-ON" === this.mode) {
                                            var t = this.displayedMemory;
                                            this.displayedMemory = this.nonDisplayedMemory, this.nonDisplayedMemory = t, this.writeScreen = this.nonDisplayedMemory, this.logger.log(i.TEXT, "DISP: " + this.displayedMemory.getDisplayText())
                                        }
                                        this.outputDataUpdate(!0)
                                    }, e.ccTO = function(t) {
                                        this.logger.log(i.INFO, "TO(" + t + ") - Tab Offset"), this.writeScreen.moveCursor(t)
                                    }, e.ccMIDROW = function(t) {
                                        var e = {
                                            flash: !1
                                        };
                                        if (e.underline = t % 2 == 1, e.italics = t >= 46, e.italics) e.foreground = "white";
                                        else {
                                            var r = Math.floor(t / 2) - 16;
                                            e.foreground = ["white", "green", "blue", "cyan", "red", "yellow", "magenta"][r]
                                        }
                                        this.logger.log(i.INFO, "MIDROW: " + JSON.stringify(e)), this.writeScreen.setPen(e)
                                    }, e.outputDataUpdate = function(t) {
                                        void 0 === t && (t = !1);
                                        var e = this.logger.time;
                                        null !== e && this.outputFilter && (null !== this.cueStartTime || this.displayedMemory.isEmpty() ? this.displayedMemory.equals(this.lastOutputScreen) || (this.outputFilter.newCue(this.cueStartTime, e, this.lastOutputScreen), t && this.outputFilter.dispatchCue && this.outputFilter.dispatchCue(), this.cueStartTime = this.displayedMemory.isEmpty() ? null : e) : this.cueStartTime = e, this.lastOutputScreen.copy(this.displayedMemory))
                                    }, e.cueSplitAtTime = function(t) {
                                        this.outputFilter && (this.displayedMemory.isEmpty() || (this.outputFilter.newCue && this.outputFilter.newCue(this.cueStartTime, t, this.displayedMemory), this.cueStartTime = t))
                                    }, t
                                }(),
                                b = function() {
                                    function t(t, e, r) {
                                        this.channels = void 0, this.currentChannel = 0, this.cmdHistory = void 0, this.logger = void 0;
                                        var i = new g;
                                        this.channels = [null, new T(t, e, i), new T(t + 1, r, i)], this.cmdHistory = {
                                            a: null,
                                            b: null
                                        }, this.logger = i
                                    }
                                    var e = t.prototype;
                                    return e.getHandler = function(t) {
                                        return this.channels[t].getHandler()
                                    }, e.setHandler = function(t, e) {
                                        this.channels[t].setHandler(e)
                                    }, e.addData = function(t, e) {
                                        var r, n, a, s = !1;
                                        this.logger.time = t;
                                        for (var o = 0; o < e.length; o += 2)
                                            if (n = 127 & e[o], a = 127 & e[o + 1], 0 !== n || 0 !== a) {
                                                if (this.logger.log(i.DATA, "[" + v([e[o], e[o + 1]]) + "] -> (" + v([n, a]) + ")"), (r = this.parseCmd(n, a)) || (r = this.parseMidrow(n, a)), r || (r = this.parsePAC(n, a)), r || (r = this.parseBackgroundAttributes(n, a)), !r && (s = this.parseChars(n, a))) {
                                                    var l = this.currentChannel;
                                                    l && l > 0 ? this.channels[l].insertChars(s) : this.logger.log(i.WARNING, "No channel found yet. TEXT-MODE?")
                                                }
                                                r || s || this.logger.log(i.WARNING, "Couldn't parse cleaned data " + v([n, a]) + " orig: " + v([e[o], e[o + 1]]))
                                            }
                                    }, e.parseCmd = function(t, e) {
                                        var r = this.cmdHistory;
                                        if (!((20 === t || 28 === t || 21 === t || 29 === t) && e >= 32 && e <= 47 || (23 === t || 31 === t) && e >= 33 && e <= 35)) return !1;
                                        if (L(t, e, r)) return S(null, null, r), this.logger.log(i.DEBUG, "Repeated command (" + v([t, e]) + ") is dropped"), !0;
                                        var n = 20 === t || 21 === t || 23 === t ? 1 : 2,
                                            a = this.channels[n];
                                        return 20 === t || 21 === t || 28 === t || 29 === t ? 32 === e ? a.ccRCL() : 33 === e ? a.ccBS() : 34 === e ? a.ccAOF() : 35 === e ? a.ccAON() : 36 === e ? a.ccDER() : 37 === e ? a.ccRU(2) : 38 === e ? a.ccRU(3) : 39 === e ? a.ccRU(4) : 40 === e ? a.ccFON() : 41 === e ? a.ccRDC() : 42 === e ? a.ccTR() : 43 === e ? a.ccRTD() : 44 === e ? a.ccEDM() : 45 === e ? a.ccCR() : 46 === e ? a.ccENM() : 47 === e && a.ccEOC() : a.ccTO(e - 32), S(t, e, r), this.currentChannel = n, !0
                                    }, e.parseMidrow = function(t, e) {
                                        var r = 0;
                                        if ((17 === t || 25 === t) && e >= 32 && e <= 47) {
                                            if ((r = 17 === t ? 1 : 2) !== this.currentChannel) return this.logger.log(i.ERROR, "Mismatch channel in midrow parsing"), !1;
                                            var n = this.channels[r];
                                            return !!n && (n.ccMIDROW(e), this.logger.log(i.DEBUG, "MIDROW (" + v([t, e]) + ")"), !0)
                                        }
                                        return !1
                                    }, e.parsePAC = function(t, e) {
                                        var r, i = this.cmdHistory;
                                        if (!((t >= 17 && t <= 23 || t >= 25 && t <= 31) && e >= 64 && e <= 127 || (16 === t || 24 === t) && e >= 64 && e <= 95)) return !1;
                                        if (L(t, e, i)) return S(null, null, i), !0;
                                        var n = t <= 23 ? 1 : 2;
                                        r = e >= 64 && e <= 95 ? 1 === n ? u[t] : d[t] : 1 === n ? c[t] : h[t];
                                        var a = this.channels[n];
                                        return !!a && (a.setPAC(this.interpretPAC(r, e)), S(t, e, i), this.currentChannel = n, !0)
                                    }, e.interpretPAC = function(t, e) {
                                        var r, i = {
                                            color: null,
                                            italics: !1,
                                            indent: null,
                                            underline: !1,
                                            row: t
                                        };
                                        return r = e > 95 ? e - 96 : e - 64, i.underline = 1 == (1 & r), r <= 13 ? i.color = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "white"][Math.floor(r / 2)] : r <= 15 ? (i.italics = !0, i.color = "white") : i.indent = 4 * Math.floor((r - 16) / 2), i
                                    }, e.parseChars = function(t, e) {
                                        var r, n, a = null,
                                            o = null;
                                        if (t >= 25 ? (r = 2, o = t - 8) : (r = 1, o = t), o >= 17 && o <= 19 ? (n = 17 === o ? e + 80 : 18 === o ? e + 112 : e + 144, this.logger.log(i.INFO, "Special char '" + s(n) + "' in channel " + r), a = [n]) : t >= 32 && t <= 127 && (a = 0 === e ? [t] : [t, e]), a) {
                                            var l = v(a);
                                            this.logger.log(i.DEBUG, "Char codes =  " + l.join(",")), S(t, e, this.cmdHistory)
                                        }
                                        return a
                                    }, e.parseBackgroundAttributes = function(t, e) {
                                        var r;
                                        if (!((16 === t || 24 === t) && e >= 32 && e <= 47 || (23 === t || 31 === t) && e >= 45 && e <= 47)) return !1;
                                        var i = {};
                                        16 === t || 24 === t ? (r = Math.floor((e - 32) / 2), i.background = f[r], e % 2 == 1 && (i.background = i.background + "_semi")) : 45 === e ? i.background = "transparent" : (i.foreground = "black", 47 === e && (i.underline = !0));
                                        var n = t <= 23 ? 1 : 2;
                                        return this.channels[n].setBkgData(i), S(t, e, this.cmdHistory), !0
                                    }, e.reset = function() {
                                        for (var t = 0; t < Object.keys(this.channels).length; t++) {
                                            var e = this.channels[t];
                                            e && e.reset()
                                        }
                                        this.cmdHistory = {
                                            a: null,
                                            b: null
                                        }
                                    }, e.cueSplitAtTime = function(t) {
                                        for (var e = 0; e < this.channels.length; e++) {
                                            var r = this.channels[e];
                                            r && r.cueSplitAtTime(t)
                                        }
                                    }, t
                                }();

                            function S(t, e, r) {
                                r.a = t, r.b = e
                            }

                            function L(t, e, r) {
                                return r.a === t && r.b === e
                            }
                            e.default = b
                        },
                        "./src/utils/codecs.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "isCodecType", (function() {
                                return n
                            })), r.d(e, "isCodecSupportedInMp4", (function() {
                                return a
                            }));
                            var i = {
                                audio: {
                                    a3ds: !0,
                                    "ac-3": !0,
                                    "ac-4": !0,
                                    alac: !0,
                                    alaw: !0,
                                    dra1: !0,
                                    "dts+": !0,
                                    "dts-": !0,
                                    dtsc: !0,
                                    dtse: !0,
                                    dtsh: !0,
                                    "ec-3": !0,
                                    enca: !0,
                                    g719: !0,
                                    g726: !0,
                                    m4ae: !0,
                                    mha1: !0,
                                    mha2: !0,
                                    mhm1: !0,
                                    mhm2: !0,
                                    mlpa: !0,
                                    mp4a: !0,
                                    "raw ": !0,
                                    Opus: !0,
                                    samr: !0,
                                    sawb: !0,
                                    sawp: !0,
                                    sevc: !0,
                                    sqcp: !0,
                                    ssmv: !0,
                                    twos: !0,
                                    ulaw: !0
                                },
                                video: {
                                    avc1: !0,
                                    avc2: !0,
                                    avc3: !0,
                                    avc4: !0,
                                    avcp: !0,
                                    av01: !0,
                                    drac: !0,
                                    dvav: !0,
                                    dvhe: !0,
                                    encv: !0,
                                    hev1: !0,
                                    hvc1: !0,
                                    mjp2: !0,
                                    mp4v: !0,
                                    mvc1: !0,
                                    mvc2: !0,
                                    mvc3: !0,
                                    mvc4: !0,
                                    resv: !0,
                                    rv60: !0,
                                    s263: !0,
                                    svc1: !0,
                                    svc2: !0,
                                    "vc-1": !0,
                                    vp08: !0,
                                    vp09: !0
                                },
                                text: {
                                    stpp: !0,
                                    wvtt: !0
                                }
                            };

                            function n(t, e) {
                                var r = i[e];
                                return !!r && !0 === r[t.slice(0, 4)]
                            }

                            function a(t, e) {
                                return MediaSource.isTypeSupported((e || "video") + '/mp4;codecs="' + t + '"')
                            }
                        },
                        "./src/utils/cues.ts": function(t, e, r) {
                            "use strict";
                            r.r(e);
                            var i = r("./src/utils/vttparser.ts"),
                                n = r("./src/utils/webvtt-parser.ts"),
                                a = r("./src/utils/texttrack-utils.ts"),
                                s = /\s/,
                                o = {
                                    newCue: function(t, e, r, o) {
                                        for (var l, u, c, d, h, f = [], g = self.VTTCue || self.TextTrackCue, v = 0; v < o.rows.length; v++)
                                            if (c = !0, d = 0, h = "", !(l = o.rows[v]).isEmpty()) {
                                                for (var p = 0; p < l.chars.length; p++) s.test(l.chars[p].uchar) && c ? d++ : (h += l.chars[p].uchar, c = !1);
                                                l.cueStartTime = e, e === r && (r += 1e-4), d >= 16 ? d-- : d++;
                                                var m = Object(i.fixLineBreaks)(h.trim()),
                                                    y = Object(n.generateCueId)(e, r, m);
                                                t && t.cues && t.cues.getCueById(y) || ((u = new g(e, r, m)).id = y, u.line = v + 1, u.align = "left", u.position = 10 + Math.min(80, 10 * Math.floor(8 * d / 32)), f.push(u))
                                            } return t && f.length && (f.sort((function(t, e) {
                                            return "auto" === t.line || "auto" === e.line ? 0 : t.line > 8 && e.line > 8 ? e.line - t.line : t.line - e.line
                                        })), f.forEach((function(e) {
                                            return Object(a.addCueToTrack)(t, e)
                                        }))), f
                                    }
                                };
                            e.default = o
                        },
                        "./src/utils/discontinuities.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "findFirstFragWithCC", (function() {
                                return s
                            })), r.d(e, "shouldAlignOnDiscontinuities", (function() {
                                return o
                            })), r.d(e, "findDiscontinuousReferenceFrag", (function() {
                                return l
                            })), r.d(e, "adjustSlidingStart", (function() {
                                return c
                            })), r.d(e, "alignStream", (function() {
                                return d
                            })), r.d(e, "alignPDT", (function() {
                                return h
                            }));
                            var i = r("./src/polyfills/number.ts"),
                                n = r("./src/utils/logger.ts"),
                                a = r("./src/controller/level-helper.ts");

                            function s(t, e) {
                                for (var r = null, i = 0, n = t.length; i < n; i++) {
                                    var a = t[i];
                                    if (a && a.cc === e) {
                                        r = a;
                                        break
                                    }
                                }
                                return r
                            }

                            function o(t, e, r) {
                                return !(!e.details || !(r.endCC > r.startCC || t && t.cc < r.startCC))
                            }

                            function l(t, e) {
                                var r = t.fragments,
                                    i = e.fragments;
                                if (i.length && r.length) {
                                    var a = s(r, i[0].cc);
                                    if (a && (!a || a.startPTS)) return a;
                                    n.logger.log("No frag in previous level to align on")
                                } else n.logger.log("No fragments to align")
                            }

                            function u(t, e) {
                                if (t) {
                                    var r = t.start + e;
                                    t.start = t.startPTS = r, t.endPTS = r + t.duration
                                }
                            }

                            function c(t, e) {
                                for (var r = e.fragments, i = 0, n = r.length; i < n; i++) u(r[i], t);
                                e.fragmentHint && u(e.fragmentHint, t), e.alignedSliding = !0
                            }

                            function d(t, e, r) {
                                e && (function(t, e, r) {
                                    if (o(t, r, e)) {
                                        var a = l(r.details, e);
                                        a && Object(i.isFiniteNumber)(a.start) && (n.logger.log("Adjusting PTS using last level due to CC increase within current level " + e.url), c(a.start, e))
                                    }
                                }(t, r, e), !r.alignedSliding && e.details && h(r, e.details), r.alignedSliding || !e.details || r.skippedSegments || Object(a.adjustSliding)(e.details, r))
                            }

                            function h(t, e) {
                                if (e.fragments.length && t.hasProgramDateTime && e.hasProgramDateTime) {
                                    var r = e.fragments[0].programDateTime,
                                        a = t.fragments[0].programDateTime,
                                        s = (a - r) / 1e3 + e.fragments[0].start;
                                    s && Object(i.isFiniteNumber)(s) && (n.logger.log("Adjusting PTS using programDateTime delta " + (a - r) + "ms, sliding:" + s.toFixed(3) + " " + t.url + " "), c(s, t))
                                }
                            }
                        },
                        "./src/utils/ewma-bandwidth-estimator.ts": function(t, e, r) {
                            "use strict";
                            r.r(e);
                            var i = r("./src/utils/ewma.ts"),
                                n = function() {
                                    function t(t, e, r) {
                                        this.defaultEstimate_ = void 0, this.minWeight_ = void 0, this.minDelayMs_ = void 0, this.slow_ = void 0, this.fast_ = void 0, this.defaultEstimate_ = r, this.minWeight_ = .001, this.minDelayMs_ = 50, this.slow_ = new i.default(t), this.fast_ = new i.default(e)
                                    }
                                    var e = t.prototype;
                                    return e.update = function(t, e) {
                                        var r = this.slow_,
                                            n = this.fast_;
                                        this.slow_.halfLife !== t && (this.slow_ = new i.default(t, r.getEstimate(), r.getTotalWeight())), this.fast_.halfLife !== e && (this.fast_ = new i.default(e, n.getEstimate(), n.getTotalWeight()))
                                    }, e.sample = function(t, e) {
                                        var r = (t = Math.max(t, this.minDelayMs_)) / 1e3,
                                            i = 8 * e / r;
                                        this.fast_.sample(r, i), this.slow_.sample(r, i)
                                    }, e.canEstimate = function() {
                                        var t = this.fast_;
                                        return t && t.getTotalWeight() >= this.minWeight_
                                    }, e.getEstimate = function() {
                                        return this.canEstimate() ? Math.min(this.fast_.getEstimate(), this.slow_.getEstimate()) : this.defaultEstimate_
                                    }, e.destroy = function() {}, t
                                }();
                            e.default = n
                        },
                        "./src/utils/ewma.ts": function(t, e, r) {
                            "use strict";
                            r.r(e);
                            var i = function() {
                                function t(t, e, r) {
                                    void 0 === e && (e = 0), void 0 === r && (r = 0), this.halfLife = void 0, this.alpha_ = void 0, this.estimate_ = void 0, this.totalWeight_ = void 0, this.halfLife = t, this.alpha_ = t ? Math.exp(Math.log(.5) / t) : 0, this.estimate_ = e, this.totalWeight_ = r
                                }
                                var e = t.prototype;
                                return e.sample = function(t, e) {
                                    var r = Math.pow(this.alpha_, t);
                                    this.estimate_ = e * (1 - r) + r * this.estimate_, this.totalWeight_ += t
                                }, e.getTotalWeight = function() {
                                    return this.totalWeight_
                                }, e.getEstimate = function() {
                                    if (this.alpha_) {
                                        var t = 1 - Math.pow(this.alpha_, this.totalWeight_);
                                        if (t) return this.estimate_ / t
                                    }
                                    return this.estimate_
                                }, t
                            }();
                            e.default = i
                        },
                        "./src/utils/fetch-loader.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "fetchSupported", (function() {
                                return d
                            }));
                            var i = r("./src/polyfills/number.ts"),
                                n = r("./src/loader/load-stats.ts"),
                                a = r("./src/demux/chunk-cache.ts");

                            function s(t) {
                                var e = "function" == typeof Map ? new Map : void 0;
                                return (s = function(t) {
                                    if (null === t || (r = t, -1 === Function.toString.call(r).indexOf("[native code]"))) return t;
                                    var r;
                                    if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
                                    if (void 0 !== e) {
                                        if (e.has(t)) return e.get(t);
                                        e.set(t, i)
                                    }

                                    function i() {
                                        return o(t, arguments, c(this).constructor)
                                    }
                                    return i.prototype = Object.create(t.prototype, {
                                        constructor: {
                                            value: i,
                                            enumerable: !1,
                                            writable: !0,
                                            configurable: !0
                                        }
                                    }), u(i, t)
                                })(t)
                            }

                            function o(t, e, r) {
                                return (o = l() ? Reflect.construct : function(t, e, r) {
                                    var i = [null];
                                    i.push.apply(i, e);
                                    var n = new(Function.bind.apply(t, i));
                                    return r && u(n, r.prototype), n
                                }).apply(null, arguments)
                            }

                            function l() {
                                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                                if (Reflect.construct.sham) return !1;
                                if ("function" == typeof Proxy) return !0;
                                try {
                                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                                } catch (t) {
                                    return !1
                                }
                            }

                            function u(t, e) {
                                return (u = Object.setPrototypeOf || function(t, e) {
                                    return t.__proto__ = e, t
                                })(t, e)
                            }

                            function c(t) {
                                return (c = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                                    return t.__proto__ || Object.getPrototypeOf(t)
                                })(t)
                            }

                            function d() {
                                if (self.fetch && self.AbortController && self.ReadableStream && self.Request) try {
                                    return new self.ReadableStream({}), !0
                                } catch (t) {}
                                return !1
                            }
                            var h = function() {
                                function t(t) {
                                    this.fetchSetup = void 0, this.requestTimeout = void 0, this.request = void 0, this.response = void 0, this.controller = void 0, this.context = void 0, this.config = null, this.callbacks = null, this.stats = void 0, this.loader = null, this.fetchSetup = t.fetchSetup || f, this.controller = new self.AbortController, this.stats = new n.LoadStats
                                }
                                var e = t.prototype;
                                return e.destroy = function() {
                                    this.loader = this.callbacks = null, this.abortInternal()
                                }, e.abortInternal = function() {
                                    var t = this.response;
                                    t && t.ok || (this.stats.aborted = !0, this.controller.abort())
                                }, e.abort = function() {
                                    var t;
                                    this.abortInternal(), null !== (t = this.callbacks) && void 0 !== t && t.onAbort && this.callbacks.onAbort(this.stats, this.context, this.response)
                                }, e.load = function(t, e, r) {
                                    var n = this,
                                        a = this.stats;
                                    if (a.loading.start) throw new Error("Loader can only be used once.");
                                    a.loading.start = self.performance.now();
                                    var s = function(t, e) {
                                            var r = {
                                                method: "GET",
                                                mode: "cors",
                                                credentials: "same-origin",
                                                signal: e
                                            };
                                            return t.rangeEnd && (r.headers = new self.Headers({
                                                Range: "bytes=" + t.rangeStart + "-" + String(t.rangeEnd - 1)
                                            })), r
                                        }(t, this.controller.signal),
                                        o = r.onProgress,
                                        l = "arraybuffer" === t.responseType,
                                        u = l ? "byteLength" : "length";
                                    this.context = t, this.config = e, this.callbacks = r, this.request = this.fetchSetup(t, s), self.clearTimeout(this.requestTimeout), this.requestTimeout = self.setTimeout((function() {
                                        n.abortInternal(), r.onTimeout(a, t, n.response)
                                    }), e.timeout), self.fetch(this.request).then((function(r) {
                                        if (n.response = n.loader = r, !r.ok) {
                                            var s = r.status,
                                                u = r.statusText;
                                            throw new g(u || "fetch, bad network response", s, r)
                                        }
                                        return a.loading.first = Math.max(self.performance.now(), a.loading.start), a.total = parseInt(r.headers.get("Content-Length") || "0"), o && Object(i.isFiniteNumber)(e.highWaterMark) ? n.loadProgressively(r, a, t, e.highWaterMark, o) : l ? r.arrayBuffer() : r.text()
                                    })).then((function(s) {
                                        var l = n.response;
                                        self.clearTimeout(n.requestTimeout), a.loading.end = Math.max(self.performance.now(), a.loading.first), a.loaded = a.total = s[u];
                                        var c = {
                                            url: l.url,
                                            data: s
                                        };
                                        o && !Object(i.isFiniteNumber)(e.highWaterMark) && o(a, t, s, l), r.onSuccess(c, a, t, l)
                                    })).catch((function(e) {
                                        if (self.clearTimeout(n.requestTimeout), !a.aborted) {
                                            var i = e.code || 0;
                                            r.onError({
                                                code: i,
                                                text: e.message
                                            }, t, e.details)
                                        }
                                    }))
                                }, e.getCacheAge = function() {
                                    var t = null;
                                    if (this.response) {
                                        var e = this.response.headers.get("age");
                                        t = e ? parseFloat(e) : null
                                    }
                                    return t
                                }, e.loadProgressively = function(t, e, r, i, n) {
                                    void 0 === i && (i = 0);
                                    var s = new a.default,
                                        o = t.body.getReader();
                                    return function a() {
                                        return o.read().then((function(o) {
                                            if (o.done) return s.dataLength && n(e, r, s.flush(), t), Promise.resolve(new ArrayBuffer(0));
                                            var l = o.value,
                                                u = l.length;
                                            return e.loaded += u, u < i || s.dataLength ? (s.push(l), s.dataLength >= i && n(e, r, s.flush(), t)) : n(e, r, l, t), a()
                                        })).catch((function() {
                                            return Promise.reject()
                                        }))
                                    }()
                                }, t
                            }();

                            function f(t, e) {
                                return new self.Request(t.url, e)
                            }
                            var g = function(t) {
                                var e, r;

                                function i(e, r, i) {
                                    var n;
                                    return (n = t.call(this, e) || this).code = void 0, n.details = void 0, n.code = r, n.details = i, n
                                }
                                return r = t, (e = i).prototype = Object.create(r.prototype), e.prototype.constructor = e, u(e, r), i
                            }(s(Error));
                            e.default = h
                        },
                        "./src/utils/imsc1-ttml-parser.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "IMSC1_CODEC", (function() {
                                return c
                            })), r.d(e, "parseIMSC1", (function() {
                                return g
                            }));
                            var i = r("./src/utils/mp4-tools.ts"),
                                n = r("./src/utils/vttparser.ts"),
                                a = r("./src/utils/vttcue.ts"),
                                s = r("./src/demux/id3.ts"),
                                o = r("./src/utils/timescale-conversion.ts"),
                                l = r("./src/utils/webvtt-parser.ts");

                            function u() {
                                return (u = Object.assign || function(t) {
                                    for (var e = 1; e < arguments.length; e++) {
                                        var r = arguments[e];
                                        for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i])
                                    }
                                    return t
                                }).apply(this, arguments)
                            }
                            var c = "stpp.ttml.im1t",
                                d = /^(\d{2,}):(\d{2}):(\d{2}):(\d{2})\.?(\d+)?$/,
                                h = /^(\d*(?:\.\d*)?)(h|m|s|ms|f|t)$/,
                                f = {
                                    left: "start",
                                    center: "center",
                                    right: "end",
                                    start: "start",
                                    end: "end"
                                };

                            function g(t, e, r, n, c) {
                                var d = Object(i.findBox)(new Uint8Array(t), ["mdat"]);
                                if (0 !== d.length) {
                                    var h = d[0],
                                        g = Object(s.utf8ArrayToStr)(new Uint8Array(t, h.start, h.end - h.start)),
                                        b = Object(o.toTimescaleFromScale)(e, 1, r);
                                    try {
                                        n(function(t, e) {
                                            var r = (new DOMParser).parseFromString(t, "text/xml").getElementsByTagName("tt")[0];
                                            if (!r) throw new Error("Invalid ttml");
                                            var i = {
                                                    frameRate: 30,
                                                    subFrameRate: 1,
                                                    frameRateMultiplier: 0,
                                                    tickRate: 0
                                                },
                                                n = Object.keys(i).reduce((function(t, e) {
                                                    return t[e] = r.getAttribute("ttp:" + e) || i[e], t
                                                }), {}),
                                                s = "preserve" !== r.getAttribute("xml:space"),
                                                o = p(v(r, "styling", "style")),
                                                c = p(v(r, "layout", "region")),
                                                d = v(r, "body", "[begin]");
                                            return [].map.call(d, (function(t) {
                                                var r = m(t, s);
                                                if (!r || !t.hasAttribute("begin")) return null;
                                                var i = T(t.getAttribute("begin"), n),
                                                    d = T(t.getAttribute("dur"), n),
                                                    h = T(t.getAttribute("end"), n);
                                                if (null === i) throw E(t);
                                                if (null === h) {
                                                    if (null === d) throw E(t);
                                                    h = i + d
                                                }
                                                var g = new a.default(i - e, h - e, r);
                                                g.id = Object(l.generateCueId)(g.startTime, g.endTime, g.text);
                                                var v = c[t.getAttribute("region")],
                                                    p = o[t.getAttribute("style")];
                                                g.position = 10, g.size = 80;
                                                var b = function(t, e) {
                                                        var r = "http://www.w3.org/ns/ttml#styling";
                                                        return ["displayAlign", "textAlign", "color", "backgroundColor", "fontSize", "fontFamily"].reduce((function(i, n) {
                                                            var a = y(e, r, n) || y(t, r, n);
                                                            return a && (i[n] = a), i
                                                        }), {})
                                                    }(v, p),
                                                    S = b.textAlign;
                                                if (S) {
                                                    var L = f[S];
                                                    L && (g.lineAlign = L), g.align = S
                                                }
                                                return u(g, b), g
                                            })).filter((function(t) {
                                                return null !== t
                                            }))
                                        }(g, b))
                                    } catch (t) {
                                        c(t)
                                    }
                                } else c(new Error("Could not parse IMSC1 mdat"))
                            }

                            function v(t, e, r) {
                                var i = t.getElementsByTagName(e)[0];
                                return i ? [].slice.call(i.querySelectorAll(r)) : []
                            }

                            function p(t) {
                                return t.reduce((function(t, e) {
                                    var r = e.getAttribute("xml:id");
                                    return r && (t[r] = e), t
                                }), {})
                            }

                            function m(t, e) {
                                return [].slice.call(t.childNodes).reduce((function(t, r, i) {
                                    var n;
                                    return "br" === r.nodeName && i ? t + "\n" : null !== (n = r.childNodes) && void 0 !== n && n.length ? m(r, e) : e ? t + r.textContent.trim().replace(/\s+/g, " ") : t + r.textContent
                                }), "")
                            }

                            function y(t, e, r) {
                                return t.hasAttributeNS(e, r) ? t.getAttributeNS(e, r) : null
                            }

                            function E(t) {
                                return new Error("Could not parse ttml timestamp " + t)
                            }

                            function T(t, e) {
                                if (!t) return null;
                                var r = Object(n.parseTimeStamp)(t);
                                return null === r && (d.test(t) ? r = function(t, e) {
                                    var r = d.exec(t),
                                        i = (0 | r[4]) + (0 | r[5]) / e.subFrameRate;
                                    return 3600 * (0 | r[1]) + 60 * (0 | r[2]) + (0 | r[3]) + i / e.frameRate
                                }(t, e) : h.test(t) && (r = function(t, e) {
                                    var r = h.exec(t),
                                        i = Number(r[1]);
                                    switch (r[2]) {
                                        case "h":
                                            return 3600 * i;
                                        case "m":
                                            return 60 * i;
                                        case "ms":
                                            return 1e3 * i;
                                        case "f":
                                            return i / e.frameRate;
                                        case "t":
                                            return i / e.tickRate
                                    }
                                    return i
                                }(t, e))), r
                            }
                        },
                        "./src/utils/logger.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "enableLogs", (function() {
                                return o
                            })), r.d(e, "logger", (function() {
                                return l
                            }));
                            var i = function() {},
                                n = {
                                    trace: i,
                                    debug: i,
                                    log: i,
                                    warn: i,
                                    info: i,
                                    error: i
                                },
                                a = n;

                            function s(t) {
                                var e = self.console[t];
                                return e ? e.bind(self.console, "[" + t + "] >") : i
                            }

                            function o(t) {
                                if (self.console && !0 === t || "object" == typeof t) {
                                    ! function(t) {
                                        for (var e = arguments.length, r = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++) r[i - 1] = arguments[i];
                                        r.forEach((function(e) {
                                            a[e] = t[e] ? t[e].bind(t) : s(e)
                                        }))
                                    }(t, "debug", "log", "info", "warn", "error");
                                    try {
                                        a.log()
                                    } catch (t) {
                                        a = n
                                    }
                                } else a = n
                            }
                            var l = n
                        },
                        "./src/utils/mediakeys-helper.ts": function(t, e, r) {
                            "use strict";
                            var i;
                            r.r(e), r.d(e, "KeySystems", (function() {
                                    return i
                                })), r.d(e, "requestMediaKeySystemAccess", (function() {
                                    return n
                                })),
                                function(t) {
                                    t.WIDEVINE = "com.widevine.alpha", t.PLAYREADY = "com.microsoft.playready"
                                }(i || (i = {}));
                            var n = "undefined" != typeof self && self.navigator && self.navigator.requestMediaKeySystemAccess ? self.navigator.requestMediaKeySystemAccess.bind(self.navigator) : null
                        },
                        "./src/utils/mediasource-helper.ts": function(t, e, r) {
                            "use strict";

                            function i() {
                                return self.MediaSource || self.WebKitMediaSource
                            }
                            r.r(e), r.d(e, "getMediaSource", (function() {
                                return i
                            }))
                        },
                        "./src/utils/mp4-tools.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "bin2str", (function() {
                                return o
                            })), r.d(e, "readUint16", (function() {
                                return l
                            })), r.d(e, "readUint32", (function() {
                                return u
                            })), r.d(e, "writeUint32", (function() {
                                return c
                            })), r.d(e, "findBox", (function() {
                                return d
                            })), r.d(e, "parseSegmentIndex", (function() {
                                return h
                            })), r.d(e, "parseInitSegment", (function() {
                                return f
                            })), r.d(e, "getStartDTS", (function() {
                                return g
                            })), r.d(e, "getDuration", (function() {
                                return v
                            })), r.d(e, "computeRawDurationFromSamples", (function() {
                                return p
                            })), r.d(e, "offsetStartDTS", (function() {
                                return m
                            })), r.d(e, "segmentValidRange", (function() {
                                return y
                            })), r.d(e, "appendUint8Array", (function() {
                                return E
                            }));
                            var i = r("./src/utils/typed-array.ts"),
                                n = r("./src/loader/fragment.ts"),
                                a = Math.pow(2, 32) - 1,
                                s = [].push;

                            function o(t) {
                                return String.fromCharCode.apply(null, t)
                            }

                            function l(t, e) {
                                "data" in t && (e += t.start, t = t.data);
                                var r = t[e] << 8 | t[e + 1];
                                return r < 0 ? 65536 + r : r
                            }

                            function u(t, e) {
                                "data" in t && (e += t.start, t = t.data);
                                var r = t[e] << 24 | t[e + 1] << 16 | t[e + 2] << 8 | t[e + 3];
                                return r < 0 ? 4294967296 + r : r
                            }

                            function c(t, e, r) {
                                "data" in t && (e += t.start, t = t.data), t[e] = r >> 24, t[e + 1] = r >> 16 & 255, t[e + 2] = r >> 8 & 255, t[e + 3] = 255 & r
                            }

                            function d(t, e) {
                                var r, i, n, a = [];
                                if (!e.length) return a;
                                "data" in t ? (r = t.data, i = t.start, n = t.end) : (i = 0, n = (r = t).byteLength);
                                for (var l = i; l < n;) {
                                    var c = u(r, l),
                                        h = c > 1 ? l + c : n;
                                    if (o(r.subarray(l + 4, l + 8)) === e[0])
                                        if (1 === e.length) a.push({
                                            data: r,
                                            start: l + 8,
                                            end: h
                                        });
                                        else {
                                            var f = d({
                                                data: r,
                                                start: l + 8,
                                                end: h
                                            }, e.slice(1));
                                            f.length && s.apply(a, f)
                                        } l = h
                                }
                                return a
                            }

                            function h(t) {
                                var e = d(t, ["moov"])[0],
                                    r = e ? e.end : null,
                                    i = d(t, ["sidx"]);
                                if (!i || !i[0]) return null;
                                var n = [],
                                    a = i[0],
                                    s = a.data[0],
                                    o = 0 === s ? 8 : 16,
                                    c = u(a, o);
                                o += 4, o += 0 === s ? 8 : 16, o += 2;
                                var h = a.end + 0,
                                    f = l(a, o);
                                o += 2;
                                for (var g = 0; g < f; g++) {
                                    var v = o,
                                        p = u(a, v);
                                    v += 4;
                                    var m = 2147483647 & p;
                                    if (1 == (2147483648 & p) >>> 31) return console.warn("SIDX has hierarchical references (not supported)"), null;
                                    var y = u(a, v);
                                    v += 4, n.push({
                                        referenceSize: m,
                                        subsegmentDuration: y,
                                        info: {
                                            duration: y / c,
                                            start: h,
                                            end: h + m - 1
                                        }
                                    }), h += m, o = v += 4
                                }
                                return {
                                    earliestPresentationTime: 0,
                                    timescale: c,
                                    version: s,
                                    referencesCount: f,
                                    references: n,
                                    moovEndOffset: r
                                }
                            }

                            function f(t) {
                                for (var e = [], r = d(t, ["moov", "trak"]), i = 0; i < r.length; i++) {
                                    var a = r[i],
                                        s = d(a, ["tkhd"])[0];
                                    if (s) {
                                        var l = s.data[s.start],
                                            c = 0 === l ? 12 : 20,
                                            h = u(s, c),
                                            f = d(a, ["mdia", "mdhd"])[0];
                                        if (f) {
                                            var g = u(f, c = 0 === (l = f.data[f.start]) ? 12 : 20),
                                                v = d(a, ["mdia", "hdlr"])[0];
                                            if (v) {
                                                var p = o(v.data.subarray(v.start + 8, v.start + 12)),
                                                    m = {
                                                        soun: n.ElementaryStreamTypes.AUDIO,
                                                        vide: n.ElementaryStreamTypes.VIDEO
                                                    } [p];
                                                if (m) {
                                                    var y = d(a, ["mdia", "minf", "stbl", "stsd"])[0],
                                                        E = void 0;
                                                    y && (E = o(y.data.subarray(y.start + 12, y.start + 16))), e[h] = {
                                                        timescale: g,
                                                        type: m
                                                    }, e[m] = {
                                                        timescale: g,
                                                        id: h,
                                                        codec: E
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                return d(t, ["moov", "mvex", "trex"]).forEach((function(t) {
                                    var r = u(t, 4),
                                        i = e[r];
                                    i && (i.default = {
                                        duration: u(t, 12),
                                        flags: u(t, 20)
                                    })
                                })), e
                            }

                            function g(t, e) {
                                return d(e, ["moof", "traf"]).reduce((function(e, r) {
                                    var i = d(r, ["tfdt"])[0],
                                        n = i.data[i.start],
                                        a = d(r, ["tfhd"]).reduce((function(e, r) {
                                            var a = u(r, 4),
                                                s = t[a];
                                            if (s) {
                                                var o = u(i, 4);
                                                1 === n && (o *= Math.pow(2, 32), o += u(i, 8));
                                                var l = o / (s.timescale || 9e4);
                                                if (isFinite(l) && (null === e || l < e)) return l
                                            }
                                            return e
                                        }), null);
                                    return null !== a && isFinite(a) && (null === e || a < e) ? a : e
                                }), null) || 0
                            }

                            function v(t, e) {
                                for (var r = 0, i = 0, a = 0, s = d(t, ["moof", "traf"]), o = 0; o < s.length; o++) {
                                    var l = s[o],
                                        c = d(l, ["tfhd"])[0],
                                        f = e[u(c, 4)];
                                    if (f) {
                                        var g = f.default,
                                            v = u(c, 0) | (null == g ? void 0 : g.flags),
                                            m = null == g ? void 0 : g.duration;
                                        8 & v && (m = u(c, 2 & v ? 12 : 8));
                                        for (var y = f.timescale || 9e4, E = d(l, ["trun"]), T = 0; T < E.length; T++) r = m ? m * u(E[T], 4) : p(E[T]), f.type === n.ElementaryStreamTypes.VIDEO ? i += r / y : f.type === n.ElementaryStreamTypes.AUDIO && (a += r / y)
                                    }
                                }
                                if (0 === i && 0 === a) {
                                    var b = h(t);
                                    if (null != b && b.references) return b.references.reduce((function(t, e) {
                                        return t + e.info.duration || 0
                                    }), 0)
                                }
                                return i || a
                            }

                            function p(t) {
                                var e = u(t, 0),
                                    r = 8;
                                1 & e && (r += 4), 4 & e && (r += 4);
                                for (var i = 0, n = u(t, 4), a = 0; a < n; a++) 256 & e && (i += u(t, r), r += 4), 512 & e && (r += 4), 1024 & e && (r += 4), 2048 & e && (r += 4);
                                return i
                            }

                            function m(t, e, r) {
                                d(e, ["moof", "traf"]).forEach((function(e) {
                                    d(e, ["tfhd"]).forEach((function(i) {
                                        var n = u(i, 4),
                                            s = t[n];
                                        if (s) {
                                            var o = s.timescale || 9e4;
                                            d(e, ["tfdt"]).forEach((function(t) {
                                                var e = t.data[t.start],
                                                    i = u(t, 4);
                                                if (0 === e) c(t, 4, i - r * o);
                                                else {
                                                    i *= Math.pow(2, 32), i += u(t, 8), i -= r * o, i = Math.max(i, 0);
                                                    var n = Math.floor(i / (a + 1)),
                                                        s = Math.floor(i % (a + 1));
                                                    c(t, 4, n), c(t, 8, s)
                                                }
                                            }))
                                        }
                                    }))
                                }))
                            }

                            function y(t) {
                                var e = {
                                        valid: null,
                                        remainder: null
                                    },
                                    r = d(t, ["moof"]);
                                if (!r) return e;
                                if (r.length < 2) return e.remainder = t, e;
                                var n = r[r.length - 1];
                                return e.valid = Object(i.sliceUint8)(t, 0, n.start - 8), e.remainder = Object(i.sliceUint8)(t, n.start - 8), e
                            }

                            function E(t, e) {
                                var r = new Uint8Array(t.length + e.length);
                                return r.set(t), r.set(e, t.length), r
                            }
                        },
                        "./src/utils/output-filter.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "default", (function() {
                                return i
                            }));
                            var i = function() {
                                function t(t, e) {
                                    this.timelineController = void 0, this.cueRanges = [], this.trackName = void 0, this.startTime = null, this.endTime = null, this.screen = null, this.timelineController = t, this.trackName = e
                                }
                                var e = t.prototype;
                                return e.dispatchCue = function() {
                                    null !== this.startTime && (this.timelineController.addCues(this.trackName, this.startTime, this.endTime, this.screen, this.cueRanges), this.startTime = null)
                                }, e.newCue = function(t, e, r) {
                                    (null === this.startTime || this.startTime > t) && (this.startTime = t), this.endTime = e, this.screen = r, this.timelineController.createCaptionsTrack(this.trackName)
                                }, e.reset = function() {
                                    this.cueRanges = []
                                }, t
                            }()
                        },
                        "./src/utils/texttrack-utils.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "sendAddTrackEvent", (function() {
                                return n
                            })), r.d(e, "addCueToTrack", (function() {
                                return a
                            })), r.d(e, "clearCurrentCues", (function() {
                                return s
                            })), r.d(e, "removeCuesInRange", (function() {
                                return o
                            })), r.d(e, "getCuesInRange", (function() {
                                return l
                            }));
                            var i = r("./src/utils/logger.ts");

                            function n(t, e) {
                                var r;
                                try {
                                    r = new Event("addtrack")
                                } catch (t) {
                                    (r = document.createEvent("Event")).initEvent("addtrack", !1, !1)
                                }
                                r.track = t, e.dispatchEvent(r)
                            }

                            function a(t, e) {
                                var r = t.mode;
                                if ("disabled" === r && (t.mode = "hidden"), t.cues && !t.cues.getCueById(e.id)) try {
                                    if (t.addCue(e), !t.cues.getCueById(e.id)) throw new Error("addCue is failed for: " + e)
                                } catch (r) {
                                    i.logger.debug("[texttrack-utils]: " + r);
                                    var n = new self.TextTrackCue(e.startTime, e.endTime, e.text);
                                    n.id = e.id, t.addCue(n)
                                }
                                "disabled" === r && (t.mode = r)
                            }

                            function s(t) {
                                var e = t.mode;
                                if ("disabled" === e && (t.mode = "hidden"), t.cues)
                                    for (var r = t.cues.length; r--;) t.removeCue(t.cues[r]);
                                "disabled" === e && (t.mode = e)
                            }

                            function o(t, e, r) {
                                var i = t.mode;
                                if ("disabled" === i && (t.mode = "hidden"), t.cues && t.cues.length > 0)
                                    for (var n = l(t.cues, e, r), a = 0; a < n.length; a++) t.removeCue(n[a]);
                                "disabled" === i && (t.mode = i)
                            }

                            function l(t, e, r) {
                                var i = [],
                                    n = function(t, e) {
                                        if (e < t[0].startTime) return 0;
                                        var r = t.length - 1;
                                        if (e > t[r].endTime) return -1;
                                        for (var i = 0, n = r; i <= n;) {
                                            var a = Math.floor((n + i) / 2);
                                            if (e < t[a].startTime) n = a - 1;
                                            else {
                                                if (!(e > t[a].startTime && i < r)) return a;
                                                i = a + 1
                                            }
                                        }
                                        return t[i].startTime - e < e - t[n].startTime ? i : n
                                    }(t, e);
                                if (n > -1)
                                    for (var a = n, s = t.length; a < s; a++) {
                                        var o = t[a];
                                        if (o.startTime >= e && o.endTime <= r) i.push(o);
                                        else if (o.startTime > r) return i
                                    }
                                return i
                            }
                        },
                        "./src/utils/time-ranges.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), e.default = {
                                toString: function(t) {
                                    for (var e = "", r = t.length, i = 0; i < r; i++) e += "[" + t.start(i).toFixed(3) + "," + t.end(i).toFixed(3) + "]";
                                    return e
                                }
                            }
                        },
                        "./src/utils/timescale-conversion.ts": function(t, e, r) {
                            "use strict";

                            function i(t, e, r, i) {
                                void 0 === r && (r = 1), void 0 === i && (i = !1);
                                var n = t * e * r;
                                return i ? Math.round(n) : n
                            }

                            function n(t, e, r, n) {
                                return void 0 === r && (r = 1), void 0 === n && (n = !1), i(t, e, 1 / r, n)
                            }

                            function a(t, e) {
                                return void 0 === e && (e = !1), i(t, 1e3, 1 / 9e4, e)
                            }

                            function s(t, e) {
                                return void 0 === e && (e = 1), i(t, 9e4, 1 / e)
                            }
                            r.r(e), r.d(e, "toTimescaleFromBase", (function() {
                                return i
                            })), r.d(e, "toTimescaleFromScale", (function() {
                                return n
                            })), r.d(e, "toMsFromMpegTsClock", (function() {
                                return a
                            })), r.d(e, "toMpegTsClockFromTimescale", (function() {
                                return s
                            }))
                        },
                        "./src/utils/typed-array.ts": function(t, e, r) {
                            "use strict";

                            function i(t, e, r) {
                                return Uint8Array.prototype.slice ? t.slice(e, r) : new Uint8Array(Array.prototype.slice.call(t, e, r))
                            }
                            r.r(e), r.d(e, "sliceUint8", (function() {
                                return i
                            }))
                        },
                        "./src/utils/vttcue.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), e.default = function() {
                                if ("undefined" != typeof self && self.VTTCue) return self.VTTCue;
                                var t = ["", "lr", "rl"],
                                    e = ["start", "middle", "end", "left", "right"];

                                function r(t, e) {
                                    if ("string" != typeof e) return !1;
                                    if (!Array.isArray(t)) return !1;
                                    var r = e.toLowerCase();
                                    return !!~t.indexOf(r) && r
                                }

                                function i(t) {
                                    return r(e, t)
                                }

                                function n(t) {
                                    for (var e = arguments.length, r = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++) r[i - 1] = arguments[i];
                                    for (var n = 1; n < arguments.length; n++) {
                                        var a = arguments[n];
                                        for (var s in a) t[s] = a[s]
                                    }
                                    return t
                                }

                                function a(e, a, s) {
                                    var o = this,
                                        l = {
                                            enumerable: !0
                                        };
                                    o.hasBeenReset = !1;
                                    var u = "",
                                        c = !1,
                                        d = e,
                                        h = a,
                                        f = s,
                                        g = null,
                                        v = "",
                                        p = !0,
                                        m = "auto",
                                        y = "start",
                                        E = 50,
                                        T = "middle",
                                        b = 50,
                                        S = "middle";
                                    Object.defineProperty(o, "id", n({}, l, {
                                        get: function() {
                                            return u
                                        },
                                        set: function(t) {
                                            u = "" + t
                                        }
                                    })), Object.defineProperty(o, "pauseOnExit", n({}, l, {
                                        get: function() {
                                            return c
                                        },
                                        set: function(t) {
                                            c = !!t
                                        }
                                    })), Object.defineProperty(o, "startTime", n({}, l, {
                                        get: function() {
                                            return d
                                        },
                                        set: function(t) {
                                            if ("number" != typeof t) throw new TypeError("Start time must be set to a number.");
                                            d = t, this.hasBeenReset = !0
                                        }
                                    })), Object.defineProperty(o, "endTime", n({}, l, {
                                        get: function() {
                                            return h
                                        },
                                        set: function(t) {
                                            if ("number" != typeof t) throw new TypeError("End time must be set to a number.");
                                            h = t, this.hasBeenReset = !0
                                        }
                                    })), Object.defineProperty(o, "text", n({}, l, {
                                        get: function() {
                                            return f
                                        },
                                        set: function(t) {
                                            f = "" + t, this.hasBeenReset = !0
                                        }
                                    })), Object.defineProperty(o, "region", n({}, l, {
                                        get: function() {
                                            return g
                                        },
                                        set: function(t) {
                                            g = t, this.hasBeenReset = !0
                                        }
                                    })), Object.defineProperty(o, "vertical", n({}, l, {
                                        get: function() {
                                            return v
                                        },
                                        set: function(e) {
                                            var i = function(e) {
                                                return r(t, e)
                                            }(e);
                                            if (!1 === i) throw new SyntaxError("An invalid or illegal string was specified.");
                                            v = i, this.hasBeenReset = !0
                                        }
                                    })), Object.defineProperty(o, "snapToLines", n({}, l, {
                                        get: function() {
                                            return p
                                        },
                                        set: function(t) {
                                            p = !!t, this.hasBeenReset = !0
                                        }
                                    })), Object.defineProperty(o, "line", n({}, l, {
                                        get: function() {
                                            return m
                                        },
                                        set: function(t) {
                                            if ("number" != typeof t && "auto" !== t) throw new SyntaxError("An invalid number or illegal string was specified.");
                                            m = t, this.hasBeenReset = !0
                                        }
                                    })), Object.defineProperty(o, "lineAlign", n({}, l, {
                                        get: function() {
                                            return y
                                        },
                                        set: function(t) {
                                            var e = i(t);
                                            if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                                            y = e, this.hasBeenReset = !0
                                        }
                                    })), Object.defineProperty(o, "position", n({}, l, {
                                        get: function() {
                                            return E
                                        },
                                        set: function(t) {
                                            if (t < 0 || t > 100) throw new Error("Position must be between 0 and 100.");
                                            E = t, this.hasBeenReset = !0
                                        }
                                    })), Object.defineProperty(o, "positionAlign", n({}, l, {
                                        get: function() {
                                            return T
                                        },
                                        set: function(t) {
                                            var e = i(t);
                                            if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                                            T = e, this.hasBeenReset = !0
                                        }
                                    })), Object.defineProperty(o, "size", n({}, l, {
                                        get: function() {
                                            return b
                                        },
                                        set: function(t) {
                                            if (t < 0 || t > 100) throw new Error("Size must be between 0 and 100.");
                                            b = t, this.hasBeenReset = !0
                                        }
                                    })), Object.defineProperty(o, "align", n({}, l, {
                                        get: function() {
                                            return S
                                        },
                                        set: function(t) {
                                            var e = i(t);
                                            if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                                            S = e, this.hasBeenReset = !0
                                        }
                                    })), o.displayState = void 0
                                }
                                return a.prototype.getCueAsHTML = function() {
                                    return self.WebVTT.convertCueToDOMTree(self, this.text)
                                }, a
                            }()
                        },
                        "./src/utils/vttparser.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "parseTimeStamp", (function() {
                                return a
                            })), r.d(e, "fixLineBreaks", (function() {
                                return d
                            })), r.d(e, "VTTParser", (function() {
                                return h
                            }));
                            var i = r("./src/utils/vttcue.ts"),
                                n = function() {
                                    function t() {}
                                    return t.prototype.decode = function(t, e) {
                                        if (!t) return "";
                                        if ("string" != typeof t) throw new Error("Error - expected string data.");
                                        return decodeURIComponent(encodeURIComponent(t))
                                    }, t
                                }();

                            function a(t) {
                                function e(t, e, r, i) {
                                    return 3600 * (0 | t) + 60 * (0 | e) + (0 | r) + parseFloat(i || 0)
                                }
                                var r = t.match(/^(?:(\d+):)?(\d{2}):(\d{2})(\.\d+)?/);
                                return r ? parseFloat(r[2]) > 59 ? e(r[2], r[3], 0, r[4]) : e(r[1], r[2], r[3], r[4]) : null
                            }
                            var s = function() {
                                function t() {
                                    this.values = Object.create(null)
                                }
                                var e = t.prototype;
                                return e.set = function(t, e) {
                                    this.get(t) || "" === e || (this.values[t] = e)
                                }, e.get = function(t, e, r) {
                                    return r ? this.has(t) ? this.values[t] : e[r] : this.has(t) ? this.values[t] : e
                                }, e.has = function(t) {
                                    return t in this.values
                                }, e.alt = function(t, e, r) {
                                    for (var i = 0; i < r.length; ++i)
                                        if (e === r[i]) {
                                            this.set(t, e);
                                            break
                                        }
                                }, e.integer = function(t, e) {
                                    /^-?\d+$/.test(e) && this.set(t, parseInt(e, 10))
                                }, e.percent = function(t, e) {
                                    if (/^([\d]{1,3})(\.[\d]*)?%$/.test(e)) {
                                        var r = parseFloat(e);
                                        if (r >= 0 && r <= 100) return this.set(t, r), !0
                                    }
                                    return !1
                                }, t
                            }();

                            function o(t, e, r, i) {
                                var n = i ? t.split(i) : [t];
                                for (var a in n)
                                    if ("string" == typeof n[a]) {
                                        var s = n[a].split(r);
                                        2 === s.length && e(s[0], s[1])
                                    }
                            }
                            var l = new i.default(0, 0, ""),
                                u = "middle" === l.align ? "middle" : "center";

                            function c(t, e, r) {
                                var i = t;

                                function n() {
                                    var e = a(t);
                                    if (null === e) throw new Error("Malformed timestamp: " + i);
                                    return t = t.replace(/^[^\sa-zA-Z-]+/, ""), e
                                }

                                function c() {
                                    t = t.replace(/^\s+/, "")
                                }
                                if (c(), e.startTime = n(), c(), "-->" !== t.substr(0, 3)) throw new Error("Malformed time stamp (time stamps must be separated by '-->'): " + i);
                                t = t.substr(3), c(), e.endTime = n(), c(),
                                    function(t, e) {
                                        var i = new s;
                                        o(t, (function(t, e) {
                                            var n;
                                            switch (t) {
                                                case "region":
                                                    for (var a = r.length - 1; a >= 0; a--)
                                                        if (r[a].id === e) {
                                                            i.set(t, r[a].region);
                                                            break
                                                        } break;
                                                case "vertical":
                                                    i.alt(t, e, ["rl", "lr"]);
                                                    break;
                                                case "line":
                                                    n = e.split(","), i.integer(t, n[0]), i.percent(t, n[0]) && i.set("snapToLines", !1), i.alt(t, n[0], ["auto"]), 2 === n.length && i.alt("lineAlign", n[1], ["start", u, "end"]);
                                                    break;
                                                case "position":
                                                    n = e.split(","), i.percent(t, n[0]), 2 === n.length && i.alt("positionAlign", n[1], ["start", u, "end", "line-left", "line-right", "auto"]);
                                                    break;
                                                case "size":
                                                    i.percent(t, e);
                                                    break;
                                                case "align":
                                                    i.alt(t, e, ["start", u, "end", "left", "right"])
                                            }
                                        }), /:/, /\s/), e.region = i.get("region", null), e.vertical = i.get("vertical", "");
                                        var n = i.get("line", "auto");
                                        "auto" === n && -1 === l.line && (n = -1), e.line = n, e.lineAlign = i.get("lineAlign", "start"), e.snapToLines = i.get("snapToLines", !0), e.size = i.get("size", 100), e.align = i.get("align", u);
                                        var a = i.get("position", "auto");
                                        "auto" === a && 50 === l.position && (a = "start" === e.align || "left" === e.align ? 0 : "end" === e.align || "right" === e.align ? 100 : 50), e.position = a
                                    }(t, e)
                            }

                            function d(t) {
                                return t.replace(/<br(?: \/)?>/gi, "\n")
                            }
                            var h = function() {
                                function t() {
                                    this.state = "INITIAL", this.buffer = "", this.decoder = new n, this.regionList = [], this.cue = null, this.oncue = void 0, this.onparsingerror = void 0, this.onflush = void 0
                                }
                                var e = t.prototype;
                                return e.parse = function(t) {
                                    var e = this;

                                    function r() {
                                        var t = e.buffer,
                                            r = 0;
                                        for (t = d(t); r < t.length && "\r" !== t[r] && "\n" !== t[r];) ++r;
                                        var i = t.substr(0, r);
                                        return "\r" === t[r] && ++r, "\n" === t[r] && ++r, e.buffer = t.substr(r), i
                                    }
                                    t && (e.buffer += e.decoder.decode(t, {
                                        stream: !0
                                    }));
                                    try {
                                        var n = "";
                                        if ("INITIAL" === e.state) {
                                            if (!/\r\n|\n/.test(e.buffer)) return this;
                                            var a = (n = r()).match(/^(ï»¿)?WEBVTT([ \t].*)?$/);
                                            if (!a || !a[0]) throw new Error("Malformed WebVTT signature.");
                                            e.state = "HEADER"
                                        }
                                        for (var s = !1; e.buffer;) {
                                            if (!/\r\n|\n/.test(e.buffer)) return this;
                                            switch (s ? s = !1 : n = r(), e.state) {
                                                case "HEADER":
                                                    /:/.test(n) ? o(n, (function(t, e) {}), /:/) : n || (e.state = "ID");
                                                    continue;
                                                case "NOTE":
                                                    n || (e.state = "ID");
                                                    continue;
                                                case "ID":
                                                    if (/^NOTE($|[ \t])/.test(n)) {
                                                        e.state = "NOTE";
                                                        break
                                                    }
                                                    if (!n) continue;
                                                    if (e.cue = new i.default(0, 0, ""), e.state = "CUE", -1 === n.indexOf("-->")) {
                                                        e.cue.id = n;
                                                        continue
                                                    }
                                                    case "CUE":
                                                        if (!e.cue) {
                                                            e.state = "BADCUE";
                                                            continue
                                                        }
                                                        try {
                                                            c(n, e.cue, e.regionList)
                                                        } catch (t) {
                                                            e.cue = null, e.state = "BADCUE";
                                                            continue
                                                        }
                                                        e.state = "CUETEXT";
                                                        continue;
                                                    case "CUETEXT":
                                                        var l = -1 !== n.indexOf("-->");
                                                        if (!n || l && (s = !0)) {
                                                            e.oncue && e.cue && e.oncue(e.cue), e.cue = null, e.state = "ID";
                                                            continue
                                                        }
                                                        if (null === e.cue) continue;
                                                        e.cue.text && (e.cue.text += "\n"), e.cue.text += n;
                                                        continue;
                                                    case "BADCUE":
                                                        n || (e.state = "ID")
                                            }
                                        }
                                    } catch (t) {
                                        "CUETEXT" === e.state && e.cue && e.oncue && e.oncue(e.cue), e.cue = null, e.state = "INITIAL" === e.state ? "BADWEBVTT" : "BADCUE"
                                    }
                                    return this
                                }, e.flush = function() {
                                    var t = this;
                                    try {
                                        if ((t.cue || "HEADER" === t.state) && (t.buffer += "\n\n", t.parse()), "INITIAL" === t.state || "BADWEBVTT" === t.state) throw new Error("Malformed WebVTT signature.")
                                    } catch (e) {
                                        t.onparsingerror && t.onparsingerror(e)
                                    }
                                    return t.onflush && t.onflush(), this
                                }, t
                            }()
                        },
                        "./src/utils/webvtt-parser.ts": function(t, e, r) {
                            "use strict";
                            r.r(e), r.d(e, "generateCueId", (function() {
                                return d
                            })), r.d(e, "parseWebVTT", (function() {
                                return h
                            }));
                            var i = r("./src/polyfills/number.ts"),
                                n = r("./src/utils/vttparser.ts"),
                                a = r("./src/demux/id3.ts"),
                                s = r("./src/utils/timescale-conversion.ts"),
                                o = r("./src/remux/mp4-remuxer.ts"),
                                l = /\r\n|\n\r|\n|\r/g,
                                u = function(t, e, r) {
                                    return void 0 === r && (r = 0), t.substr(r, e.length) === e
                                },
                                c = function(t) {
                                    for (var e = 5381, r = t.length; r;) e = 33 * e ^ t.charCodeAt(--r);
                                    return (e >>> 0).toString()
                                };

                            function d(t, e, r) {
                                return c(t.toString()) + c(e.toString()) + c(r)
                            }

                            function h(t, e, r, c, h, f, g, v) {
                                var p, m = new n.VTTParser,
                                    y = Object(a.utf8ArrayToStr)(new Uint8Array(t)).trim().replace(l, "\n").split("\n"),
                                    E = [],
                                    T = Object(s.toMpegTsClockFromTimescale)(e, r),
                                    b = "00:00.000",
                                    S = 0,
                                    L = 0,
                                    A = !0,
                                    D = !1;
                                m.oncue = function(t) {
                                    var e = c[h],
                                        r = c.ccOffset,
                                        i = (S - T) / 9e4;
                                    if (null != e && e.new && (void 0 !== L ? r = c.ccOffset = e.start : function(t, e, r) {
                                            var i = t[e],
                                                n = t[i.prevCC];
                                            if (!n || !n.new && i.new) return t.ccOffset = t.presentationOffset = i.start, void(i.new = !1);
                                            for (; null !== (a = n) && void 0 !== a && a.new;) {
                                                var a;
                                                t.ccOffset += i.start - n.start, i.new = !1, n = t[(i = n).prevCC]
                                            }
                                            t.presentationOffset = r
                                        }(c, h, i)), i && (r = i - c.presentationOffset), D) {
                                        var n = t.endTime - t.startTime,
                                            a = Object(o.normalizePts)(9e4 * (t.startTime + r - L), 9e4 * f) / 9e4;
                                        t.startTime = a, t.endTime = a + n
                                    }
                                    var s = t.text.trim();
                                    t.text = decodeURIComponent(encodeURIComponent(s)), t.id || (t.id = d(t.startTime, t.endTime, s)), t.endTime > 0 && E.push(t)
                                }, m.onparsingerror = function(t) {
                                    p = t
                                }, m.onflush = function() {
                                    p ? v(p) : g(E)
                                }, y.forEach((function(t) {
                                    if (A) {
                                        if (u(t, "X-TIMESTAMP-MAP=")) {
                                            A = !1, D = !0, t.substr(16).split(",").forEach((function(t) {
                                                u(t, "LOCAL:") ? b = t.substr(6) : u(t, "MPEGTS:") && (S = parseInt(t.substr(7)))
                                            }));
                                            try {
                                                L = function(t) {
                                                    var e = parseInt(t.substr(-3)),
                                                        r = parseInt(t.substr(-6, 2)),
                                                        n = parseInt(t.substr(-9, 2)),
                                                        a = t.length > 9 ? parseInt(t.substr(0, t.indexOf(":"))) : 0;
                                                    if (!(Object(i.isFiniteNumber)(e) && Object(i.isFiniteNumber)(r) && Object(i.isFiniteNumber)(n) && Object(i.isFiniteNumber)(a))) throw Error("Malformed X-TIMESTAMP-MAP: Local:" + t);
                                                    return e += 1e3 * r, (e += 6e4 * n) + 36e5 * a
                                                }(b) / 1e3
                                            } catch (t) {
                                                D = !1, p = t
                                            }
                                            return
                                        }
                                        "" === t && (A = !1)
                                    }
                                    m.parse(t + "\n")
                                })), m.flush()
                            }
                        },
                        "./src/utils/xhr-loader.ts": function(t, e, r) {
                            "use strict";
                            r.r(e);
                            var i = r("./src/utils/logger.ts"),
                                n = r("./src/loader/load-stats.ts"),
                                a = /^age:\s*[\d.]+\s*$/m,
                                s = function() {
                                    function t(t) {
                                        this.xhrSetup = void 0, this.requestTimeout = void 0, this.retryTimeout = void 0, this.retryDelay = void 0, this.config = null, this.callbacks = null, this.context = void 0, this.loader = null, this.stats = void 0, this.xhrSetup = t ? t.xhrSetup : null, this.stats = new n.LoadStats, this.retryDelay = 0
                                    }
                                    var e = t.prototype;
                                    return e.destroy = function() {
                                        this.callbacks = null, this.abortInternal(), this.loader = null, this.config = null
                                    }, e.abortInternal = function() {
                                        var t = this.loader;
                                        self.clearTimeout(this.requestTimeout), self.clearTimeout(this.retryTimeout), t && (t.onreadystatechange = null, t.onprogress = null, 4 !== t.readyState && (this.stats.aborted = !0, t.abort()))
                                    }, e.abort = function() {
                                        var t;
                                        this.abortInternal(), null !== (t = this.callbacks) && void 0 !== t && t.onAbort && this.callbacks.onAbort(this.stats, this.context, this.loader)
                                    }, e.load = function(t, e, r) {
                                        if (this.stats.loading.start) throw new Error("Loader can only be used once.");
                                        this.stats.loading.start = self.performance.now(), this.context = t, this.config = e, this.callbacks = r, this.retryDelay = e.retryDelay, this.loadInternal()
                                    }, e.loadInternal = function() {
                                        var t = this.config,
                                            e = this.context;
                                        if (t) {
                                            var r = this.loader = new self.XMLHttpRequest,
                                                i = this.stats;
                                            i.loading.first = 0, i.loaded = 0;
                                            var n = this.xhrSetup;
                                            try {
                                                if (n) try {
                                                    n(r, e.url)
                                                } catch (t) {
                                                    r.open("GET", e.url, !0), n(r, e.url)
                                                }
                                                r.readyState || r.open("GET", e.url, !0)
                                            } catch (t) {
                                                return void this.callbacks.onError({
                                                    code: r.status,
                                                    text: t.message
                                                }, e, r)
                                            }
                                            e.rangeEnd && r.setRequestHeader("Range", "bytes=" + e.rangeStart + "-" + (e.rangeEnd - 1)), r.onreadystatechange = this.readystatechange.bind(this), r.onprogress = this.loadprogress.bind(this), r.responseType = e.responseType, self.clearTimeout(this.requestTimeout), this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), t.timeout), r.send()
                                        }
                                    }, e.readystatechange = function() {
                                        var t = this.context,
                                            e = this.loader,
                                            r = this.stats;
                                        if (t && e) {
                                            var n = e.readyState,
                                                a = this.config;
                                            if (!r.aborted && n >= 2)
                                                if (self.clearTimeout(this.requestTimeout), 0 === r.loading.first && (r.loading.first = Math.max(self.performance.now(), r.loading.start)), 4 === n) {
                                                    e.onreadystatechange = null, e.onprogress = null;
                                                    var s = e.status;
                                                    if (s >= 200 && s < 300) {
                                                        var o, l;
                                                        if (r.loading.end = Math.max(self.performance.now(), r.loading.first), l = "arraybuffer" === t.responseType ? (o = e.response).byteLength : (o = e.responseText).length, r.loaded = r.total = l, !this.callbacks) return;
                                                        var u = this.callbacks.onProgress;
                                                        if (u && u(r, t, o, e), !this.callbacks) return;
                                                        var c = {
                                                            url: e.responseURL,
                                                            data: o
                                                        };
                                                        this.callbacks.onSuccess(c, r, t, e)
                                                    } else r.retry >= a.maxRetry || s >= 400 && s < 499 ? (i.logger.error(s + " while loading " + t.url), this.callbacks.onError({
                                                        code: s,
                                                        text: e.statusText
                                                    }, t, e)) : (i.logger.warn(s + " while loading " + t.url + ", retrying in " + this.retryDelay + "..."), this.abortInternal(), this.loader = null, self.clearTimeout(this.retryTimeout), this.retryTimeout = self.setTimeout(this.loadInternal.bind(this), this.retryDelay), this.retryDelay = Math.min(2 * this.retryDelay, a.maxRetryDelay), r.retry++)
                                                } else self.clearTimeout(this.requestTimeout), this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), a.timeout)
                                        }
                                    }, e.loadtimeout = function() {
                                        i.logger.warn("timeout while loading " + this.context.url);
                                        var t = this.callbacks;
                                        t && (this.abortInternal(), t.onTimeout(this.stats, this.context, this.loader))
                                    }, e.loadprogress = function(t) {
                                        var e = this.stats;
                                        e.loaded = t.loaded, t.lengthComputable && (e.total = t.total)
                                    }, e.getCacheAge = function() {
                                        var t = null;
                                        if (this.loader && a.test(this.loader.getAllResponseHeaders())) {
                                            var e = this.loader.getResponseHeader("age");
                                            t = e ? parseFloat(e) : null
                                        }
                                        return t
                                    }, t
                                }();
                            e.default = s
                        }
                    }).default
                }, t.exports = e())
            }
        },
        e = {};

    function r(i) {
        var n = e[i];
        if (void 0 !== n) return n.exports;
        var a = e[i] = {
            id: i,
            loaded: !1,
            exports: {}
        };
        return t[i].call(a.exports, a, a.exports, r), a.loaded = !0, a.exports
    }
    r.d = function(t, e) {
        for (var i in e) r.o(e, i) && !r.o(t, i) && Object.defineProperty(t, i, {
            enumerable: !0,
            get: e[i]
        })
    }, r.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, r.nmd = function(t) {
        return t.paths = [], t.children || (t.children = []), t
    }, r(880)
}();