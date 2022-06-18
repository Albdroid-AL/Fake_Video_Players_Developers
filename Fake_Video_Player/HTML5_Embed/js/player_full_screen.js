var PLAYER = PLAYER || {};
PLAYER.FullScreen = PLAYER.FullScreen || {}, PLAYER.FullScreen.available = function() {
    return this._hasWebkitFullScreen || this._hasMozFullScreen || this._hasMsFullScreen
}, PLAYER.FullScreen.activated = function() {
    return this._hasWebkitFullScreen ? document.webkitIsFullScreen : this._hasMozFullScreen ? document.mozFullScreen : this._hasMsFullScreen ? document.msFullscreenElement : void console.assert(!1)
}, PLAYER.FullScreen.request = function(e) {
    e = e || document.body, this._hasWebkitFullScreen ? e.webkitRequestFullScreen() : this._hasMozFullScreen ? e.mozRequestFullScreen() : this._hasMsFullScreen ? e.msRequestFullscreen() : console.assert(!1)
}, PLAYER.FullScreen.cancel = function() {
    this._hasWebkitFullScreen ? document.webkitCancelFullScreen() : this._hasMozFullScreen ? document.mozCancelFullScreen() : this._hasMsFullScreen ? document.msExitFullscreen() : console.assert(!1)
}, PLAYER.FullScreen._hasWebkitFullScreen = "webkitCancelFullScreen" in document, PLAYER.FullScreen._hasMozFullScreen = "mozCancelFullScreen" in document, PLAYER.FullScreen._hasMsFullScreen = "msExitFullscreen" in document;