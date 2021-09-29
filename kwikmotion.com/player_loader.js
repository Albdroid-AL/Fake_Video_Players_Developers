var KEY_ACCESS = "Iw=="; // #
var ScriptPath = 'packages/'; // Plugins Path or URL

var Design_Studio_Player_Options = {logo :   '',
hideLogo :   '',
link :   '',
position :   '',
logoMargin :   '',
primary :   '',
highlight :   '',
background :   '',
thumbContainerBG :   '',
playProgressColor :   '',
loadProgressColor :   '',
progressHolderColor :   '',
};
var CustomCSSPath = '';

function kwikMotion(videoId, opts) {

    try {
        if (opts == {} || opts == undefined | opts == '') {
  
        }
        else {
 if (opts.designStudio != undefined && Design_Studio_Player_Options!=undefined) {

 Design_Studio_Player_Options.logo = (opts.designStudio.logo == undefined ? Design_Studio_Player_Options.logo : opts.designStudio.logo);
 Design_Studio_Player_Options.hideLogo = (opts.designStudio.hideLogo == undefined ? Design_Studio_Player_Options.hideLogo : opts.designStudio.hideLogo);
 Design_Studio_Player_Options.link = (opts.designStudio.link == undefined ? Design_Studio_Player_Options.link : opts.designStudio.link);
 Design_Studio_Player_Options.position = (opts.designStudio.position == undefined ? Design_Studio_Player_Options.position : opts.designStudio.position);
 Design_Studio_Player_Options.logoMargin = (opts.designStudio.logoMargin == undefined ? Design_Studio_Player_Options.logoMargin : opts.designStudio.logoMargin);
 Design_Studio_Player_Options.primary  = (opts.designStudio.primary  == undefined ? Design_Studio_Player_Options.primary : opts.designStudio.primary);
 Design_Studio_Player_Options.highlight = (opts.designStudio.highlight  == undefined ? Design_Studio_Player_Options.highlight : opts.designStudio.highlight);
 Design_Studio_Player_Options.background = (opts.designStudio.background == undefined ? Design_Studio_Player_Options.background : opts.designStudio.background);
 Design_Studio_Player_Options.thumbContainerBG = (opts.designStudio.thumbContainerBG == undefined ? Design_Studio_Player_Options.thumbContainerBG : opts.designStudio.thumbContainerBG);
 Design_Studio_Player_Options.playProgressColor = (opts.designStudio.playProgressColor == undefined ? Design_Studio_Player_Options.playProgressColor : opts.designStudio.playProgressColor);
 Design_Studio_Player_Options.loadProgressColor = (opts.designStudio.loadProgressColor == undefined ? Design_Studio_Player_Options.loadProgressColor : opts.designStudio.loadProgressColor);
 Design_Studio_Player_Options.progressHolderColor = (opts.designStudio.progressHolderColor == undefined ? Design_Studio_Player_Options.progressHolderColor : opts.designStudio.progressHolderColor);
 
 }

 if (Design_Studio_Player_Options != undefined) {
 opts.designStudio = Design_Studio_Player_Options;
 }
}

        //setTimeout(function () {
        //    loadScriptKwikLink(ScriptPath + 'plugins_loader.js', function () {
        //        kwikMotionMain(videoId, opts, KEY_ACCESS, ScriptPath);
        //    });

        //}, 3000);

// var instance = {
// handlers: {},
// on: function(event, cb) {
// this.handlers[event] = (typeof this.handlers[event] === 'undefined') ? [] : this.handlers[event];
// this.handlers[event].push(cb);
// }
//        };
//        
//        opts.handlers = instance.handlers;
//        
//        loadScriptKwikLink(ScriptPath + 'plugins_loader.js', function () {
//        loadScriptKwikLink(ScriptPath + 'plugins_loader.php', function () {
// return kwikMotionMain(videoId, opts, KEY_ACCESS, ScriptPath, CustomCSSPath);
// 
//        });
//        
//        return instance;

        // get stored player data
        var el = document.getElementById(videoId);
        el.kwikplayer = el.kwikplayer ? el.kwikplayer : new kwikPlayer(videoId, opts);
        
        return el.kwikplayer;

    }
    catch (exp) {

    }
}

function loadScriptKwikLink(url, callback) {
    try {
        console.log("loadScript started");
        var script = document.createElement("script")
        script.type = "text/javascript";
		script.id = 'scrmotionmain';
		
        if (script.readyState) {  //IE
 script.onreadystatechange = function () {
 if (script.readyState == "loaded" ||
     script.readyState == "complete") {
     script.onreadystatechange = null;
     callback();
 }
 };
        } else {  //Others
 script.onload = function () {
 callback();
 };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
        console.log("loadScript ended");
    }
    catch (exp) {
        console.error("loadScript error", exp);
    }
}

function kwikPlayer(id, options) {
  
  this.handlers = {};
  
  if(!options) {
    return false;
  }
  var scr = document.getElementById('scrmotionmain'), k;
  if(!scr){
    // scrip did not created yet
    loadScriptKwikLink(ScriptPath + 'plugins_loader_v2.js', function () {
	// loadScriptKwikLink(ScriptPath + 'plugins_loader_v1.js', function () {
      k = new kwikMotionMain(id, options, KEY_ACCESS, ScriptPath, CustomCSSPath);
    });
    
  } else if (typeof kwikMotionMain === 'undefined') {
    // script did not loaded yet
    scr.addEventListener('load', function(){
      k = new kwikMotionMain(id, options, KEY_ACCESS, ScriptPath, CustomCSSPath);
    })
  } else {
    // script already exists
    k = new kwikMotionMain(id, options, KEY_ACCESS, ScriptPath, CustomCSSPath);
  }

}

kwikPlayer.prototype.on = function(event, cb) {
  this.handlers[event] = (typeof this.handlers[event] === 'undefined') ? [] : this.handlers[event];
  this.handlers[event].push(cb);
}


