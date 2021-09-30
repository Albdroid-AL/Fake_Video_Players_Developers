var KEY_ACCESS = "Iw=="; // ignore

var ScriptPath = 'packages/'; // ENTER FULL PATH OR URL TO /packages/ Plugins Path

var Design_Studio_Player_Options = {
  logo: '',
  hideLogo: '',
  link: '',
  position: '',
  logoMargin: '',
  primary: '#EEEEEE',
  highlight: '#0033FF',
  background: '#000000',
  thumbContainerBG: '#222222',
  playProgressColor: '#0033FF',
  loadProgressColor: '#BBBBBB',
  progressHolderColor: '#666666',
};

function kwikMotion(videoId, opts) {

  try {
    if (opts == {} || opts == undefined | opts == '') {

    } else {
      if (opts.designStudio != undefined && Design_Studio_Player_Options != undefined) {

        Design_Studio_Player_Options.logo = (opts.designStudio.logo == undefined
            ? Design_Studio_Player_Options.logo
            : opts.designStudio.logo);
        Design_Studio_Player_Options.hideLogo = (opts.designStudio.hideLogo == undefined
            ? Design_Studio_Player_Options.hideLogo
            : opts.designStudio.hideLogo);
        Design_Studio_Player_Options.link = (opts.designStudio.link == undefined
            ? Design_Studio_Player_Options.link
            : opts.designStudio.link);
        Design_Studio_Player_Options.position = (opts.designStudio.position == undefined
            ? Design_Studio_Player_Options.position
            : opts.designStudio.position);
        Design_Studio_Player_Options.logoMargin = (opts.designStudio.logoMargin == undefined
            ? Design_Studio_Player_Options.logoMargin
            : opts.designStudio.logoMargin);
        Design_Studio_Player_Options.primary = (opts.designStudio.primary == undefined
            ? Design_Studio_Player_Options.primary
            : opts.designStudio.primary);
        Design_Studio_Player_Options.highlight = (opts.designStudio.highlight == undefined
            ? Design_Studio_Player_Options.highlight
            : opts.designStudio.highlight);
        Design_Studio_Player_Options.background = (opts.designStudio.background == undefined
            ? Design_Studio_Player_Options.background
            : opts.designStudio.background);
        Design_Studio_Player_Options.thumbContainerBG = (opts.designStudio.thumbContainerBG ==
        undefined
            ? Design_Studio_Player_Options.thumbContainerBG
            : opts.designStudio.thumbContainerBG);
        Design_Studio_Player_Options.playProgressColor = (opts.designStudio.playProgressColor ==
        undefined
            ? Design_Studio_Player_Options.playProgressColor
            : opts.designStudio.playProgressColor);
        Design_Studio_Player_Options.loadProgressColor = (opts.designStudio.loadProgressColor ==
        undefined
            ? Design_Studio_Player_Options.loadProgressColor
            : opts.designStudio.loadProgressColor);
        Design_Studio_Player_Options.progressHolderColor = (opts.designStudio.progressHolderColor ==
        undefined
            ? Design_Studio_Player_Options.progressHolderColor
            : opts.designStudio.progressHolderColor);

      }

      if (Design_Studio_Player_Options != undefined) {
        opts.designStudio = Design_Studio_Player_Options;
      }
    }
    // get stored player data
    var el = document.getElementById(videoId);
    el.kwikplayer = el.kwikplayer ? el.kwikplayer : new kwikPlayer(videoId,
        opts);
    return el.kwikplayer;

  } catch (exp) {

  }
}

function loadScriptKwikLink(id, url, callback) {
  try {
    console.log('loadScript #' + id + ' started');
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = id;

    if (script.readyState) {  // IE
      script.onreadystatechange = function() {
        if (script.readyState == 'loaded' ||
            script.readyState == 'complete') {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {  // others
      script.onload = function() {
        callback();
      };
    }

    script.src = url;
    document.head.appendChild(script);
    console.log('loadScript #' + id + ' ended');
  } catch (exp) {
    console.error('loadScript #' + id + ' error', exp);
  }
}

function kwikPlayer(id, options) {
  this.handlers = {};
  if (!options) {
    return false;
  }
  var scr = document.getElementById('scrmotionmain'), k;
  if (!scr) {
    // script was not created yet
    loadScriptKwikLink('scrmotionmain', ScriptPath + 'plugins_loader_v2.js',
	//loadScriptKwikLink('scrmotionmain', ScriptPath + 'plugins_loader_v1.js',
        function() {
          k = new kwikMotionMain(id, options, KEY_ACCESS, ScriptPath, null);
        });
  } else if (typeof kwikMotionMain === 'undefined') {
    // script was not loaded yet
    scr.addEventListener('load', function() {
      k = new kwikMotionMain(id, options, KEY_ACCESS, ScriptPath, null);
    });
  } else {
    // script already exists
    k = new kwikMotionMain(id, options, KEY_ACCESS, ScriptPath, null);
  }
}

kwikPlayer.prototype.on = function(event, cb) {
  this.handlers[event] = (typeof this.handlers[event] === 'undefined')
      ? []
      : this.handlers[event];
  this.handlers[event].push(cb);
};
