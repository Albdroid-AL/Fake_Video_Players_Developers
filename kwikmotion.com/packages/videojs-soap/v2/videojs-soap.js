/*! @name videojs-soap @version 0.0.2 @license MIT */
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(
    require('video.js')) :
    typeof define === 'function' && define.amd ? define(['video.js'], factory) :
      (global.videojsSoap = factory(global.videojs));
}(this, (function(videojs$1) {
  'use strict';

  videojs$1 = videojs$1 && videojs$1.hasOwnProperty('default') ? videojs$1['default'] : videojs$1;

  var version = '0.0.1';

  var classCallCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  };

  var inherits = function(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError(
        'Super expression must either be null or a function, not ' + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) {
      Object.setPrototypeOf
        ? Object.setPrototypeOf(subClass, superClass)
        : subClass.__proto__ = superClass;
    }
  };

  var possibleConstructorReturn = function(self, call) {
    if (!self) {
      throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
    }

    return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
  };

  var VjsMenu = videojs.getComponent('Menu');

  var SoapMenu = function(_VjsMenu) {
    inherits(SoapMenu, _VjsMenu);

    function SoapMenu() {
      classCallCheck(this, SoapMenu);
      return possibleConstructorReturn(this, _VjsMenu.apply(this, arguments));
    }

    return SoapMenu;
  }(VjsMenu);

  var arrowDown = '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="4" viewBox="0 0 8 4"><g><g><path fill="#fff" d="M4 4L0 0h8z"/></g></g></svg>';

  var VjsMenuItem = videojs.getComponent('MenuItem');

  function ensureInView(container, element) {

    //Determine container top and bottom
    var cTop = container.scrollTop;
    var cBottom = cTop + container.clientHeight;

    //Determine element top and bottom
    var eTop = element.offsetTop;
    var eBottom = eTop + element.clientHeight;

    //Check if out of view
    if (eTop < cTop) {
      container.scrollTop -= cTop - eTop;
    } else if (eBottom > cBottom) {
      container.scrollTop += eBottom - cBottom;
    }
  }

  var SoapMenuItem = function(_VjsMenuItem) {
    inherits(SoapMenuItem, _VjsMenuItem);

    function SoapMenuItem() {
      classCallCheck(this, SoapMenuItem);
      return possibleConstructorReturn(this, _VjsMenuItem.apply(this, arguments));
    }

    SoapMenuItem.prototype.handleClick = function handleClick(e) {
      var menu = this.player().getChild('ControlBar').getChild('soap').menu;

      if (this.options_.mainmenu) {
        // CREATE SEASONS MENU
        menu.lockShowing();
        menu.el().classList.remove('vjs-soap-menu-select');
        if (menu.el().querySelector('.vjs-episodes-list.active')) {
          menu.el().querySelector('.vjs-episodes-list.active').classList.remove('active');
        }
        while (menu.children_.length) {
          var elem = menu.children_.shift();
          menu.removeChild(elem);
          elem.dispose();
        }
        menu.player().getChild('ControlBar').getChild('soap').createSeasonsMenu();
      } else if (this.options_.episodes) {
        // CREATE EPISODES MENU
        menu.el().classList.add('vjs-episodes-list');
        while (menu.children_.length) {
          var _elem = menu.children_.shift();
          menu.removeChild(_elem);
          _elem.dispose();
        }
        menu.el().classList.add('vjs-soap-menu-select');
        menu.player().getChild('ControlBar').getChild('soap')
          .createEpisodesMenu(menu, this.options_);
        menu.lockShowing();
      } else if (e.target.href || e.target.parentNode && e.target.parentNode.href) {
        // OPEN EPISODE
        window.top.location.href = e.target.href ? e.target.href : e.target.parentNode.href;
      } else if (this.el()) {
        // TOGGLE EPISODE'S DESCRIPTION
        var radioCheck = this.el().querySelector('input[type="radio"]');
        if (radioCheck) {
          radioCheck.checked = !radioCheck.checked;
          ensureInView(menu.el(), this.el().querySelector('.vjs-episode-description'));
        }
      }
      return true;
    };

    SoapMenuItem.prototype.createEl = function createEl(type, props, attrs) {
      var el = _VjsMenuItem.prototype.createEl.call(this, type, props, attrs);
      if (this.options_.className) {
        el.classList.add(this.options_.className);
      }
      return el;
    };

    return SoapMenuItem;
  }(VjsMenuItem);

  var btnIco = '<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 116 89"><path d="M43 22.5V27h-9v9H22v40h50V65h12V55h8V18H43v4.5zM83 38c0 10.3-.1 11-2 11s-2-.7-2-9v-9H64c-14.3 0-15-.1-15-2s.7-2 17-2h17v11zm-8 8.5V58h-6V39H55c-13.3 0-14-.1-14-2s.7-2 17-2h17v11.5zm-10 10V69H31V44h34v12.5z"/></svg>';

  var VjsButton = videojs.getComponent('MenuButton');

  var SoapButton = function(_VjsButton) {
    inherits(SoapButton, _VjsButton);

    function SoapButton(player, options) {
      classCallCheck(this, SoapButton);

      var _this = possibleConstructorReturn(this, _VjsButton.call(this, player, options));

      _this.el()
        .querySelector('button')
        .insertAdjacentHTML('afterbegin', '<div class="vjs-soap-ico">' + btnIco + '</div>');
      return _this;
    }

    // pause on click

    // SoapButton.prototype.handleClick = function handleClick(e) {
    //   var menu = this.player().getChild('ControlBar').getChild('soap').menu;
    //   if (!menu.el().classList.contains('vjs-lock-showing')) {
    //     this.player().pause();
    //     menu.lockShowing();
    //   } else {
    //     menu.el().classList.remove('vjs-lock-showing');
    //   }
    // }

    SoapButton.prototype.createMenu = function createMenu() {
      // get current season
      var season = this.options_.seasons.firstChild;
      var currentSeason = false;
      while (season) {
        if (!(season.nodeType === 1 && season.nodeName && season.nodeName.match(/(\d+)/i))) {
          season = season.nextSibling;
        } else {
          var episode = season.firstChild;
          while (episode) {
            if (episode.nodeName && episode.nodeName.match(/^episode(\d+)/i)) {
              var url = episode.querySelector('url');
              url = url.firstChild.data;
              if (decodeURI(window.location.href).includes(decodeURI(url))) {
                currentSeason = season;
                break;
              }
            }
            episode = episode.nextSibling;
          }
          if (currentSeason) {
            break;
          }
          season = season.nextSibling;
        }
      }
      var currentExists = !!currentSeason;
      if (!currentSeason) {
        season = this.options_.seasons.firstChild;
        while (season) {
          if (!(season.nodeType === 1 && season.nodeName && season.nodeName.match(/(\d+)/i))) {
            season = season.nextSibling;
          } else {
            currentSeason = season;
            break;
          }
        }
      }
      // create menu
      var menu = this.menu ? this.menu : new SoapMenu(this.player(), this.options_);
      var options;
      var seasonId = RegExp.$1;
      var seasonName = currentSeason.nodeName;
      var episodes = [];
      var episode = currentSeason.firstChild;
      while (episode) {
        if (episode.nodeName && episode.nodeName.match(/^episode(\d+)/i)) {
          var epObj = {
            season: seasonId,
            id: RegExp.$1
          };
          var nodes = episode.querySelectorAll('title,image,description,url');
          for (var nidx = 0; nidx < nodes.length; nidx++) {
            epObj[nodes[nidx].nodeName] = nodes[nidx].firstChild.data;
          }
          episodes.push(epObj);
        }
        episode = episode.nextSibling;
      }
      options = {
        'label': arrowDown + seasonName,
        'selectable': true,
        'episodes': episodes,
        currentExists: currentExists,
        className: 'vjs-soap-seasons',
        controlText: seasonName,
        designStudio: this.options_.designStudio
      };
      this.createEpisodesMenu(menu, options);
      return menu;
    };

    SoapButton.prototype.createSeasonsMenu = function createSeasonsMenu() {
      var menu = this.menu ? this.menu : new SoapMenu(this.player(), this.options_);
      var menuItem;
      var options;
      if (this.options_.title && this.options_.title != '') {
        options = {
          name: 'seasonstitle',
          'label': this.options_.title,
          className: 'vjs-seasons-title',
          'selectable': false,
          mainmenu: true
        };
        menuItem = new SoapMenuItem(this.player(), options);
        menuItem.el().style = 'border-color: ' + this.options_.designStudio.highlight;
        menu.addItem(menuItem);
      }
      var season = this.options_.seasons.firstChild;
      while (season) {
        if (season.nodeType === 1 && season.nodeName && season.nodeName.match(/(\d+)/i)) {
          var seasonId = RegExp.$1;
          var seasonName = season.nodeName;
          var episodes = [];
          var episode = season.firstChild;
          while (episode) {
            if (episode.nodeName && episode.nodeName.match(/^episode(\d+)/i)) {
              var epObj = {
                season: seasonId,
                id: RegExp.$1
              };
              var nodes = episode.querySelectorAll('title,image,description,url');
              for (var nidx = 0; nidx < nodes.length; nidx++) {
                epObj[nodes[nidx].nodeName] = nodes[nidx].firstChild.data;
              }
              episodes.push(epObj);
            }
            episode = episode.nextSibling;
          }
          options = {
            'label': arrowDown + seasonName,
            'selectable': true,
            'episodes': episodes,
            className: 'vjs-soap-seasons',
            controlText: seasonName,
            designStudio: this.options_.designStudio
          };
          menuItem = new SoapMenuItem(this.player(), options);
          menu.addItem(menuItem);
        }
        season = season.nextSibling;
      }
      return menu;
    };

    SoapButton.prototype.createEpisodesMenu = function createEpisodesMenu(menu, options) {
      if (options) {
        menu.el().classList.add('vjs-episodes-list');
        menu.el().classList.add('vjs-soap-menu-select');
        var titleOptions = {
          name: 'seasonstitle',
          'label': arrowDown + options.controlText,
          className: 'vjs-seasons-title',
          'selectable': true,
          mainmenu: true
        };
        var menuItem = new SoapMenuItem(menu.player(), titleOptions);
        menuItem.el().style = 'cursor: pointer; border-color: ' + options.designStudio.highlight;
        menu.addItem(menuItem);
        if (options.episodes && options.episodes.length) {
          var _loop = function _loop(idx) {
            var uniqId = 'episode_' + options.episodes[idx].season + '_' + idx;
            var uniqName = 'episode_' + options.episodes[idx].season;
            var checked = '';
            if (decodeURI(window.location.href).includes(decodeURI(options.episodes[idx].url))
              || !options.currentExists && idx === 0) {
              checked = 'checked="checked"';
            }
            var maxWidth = '';
            if (options.episodes[idx].description) {
              maxWidth = 'max-width:100px';
            }
            var contentOptions = {
              'label': '<input type="radio" name="' + uniqName + '" id="' + uniqId + '" ' +
                checked + '">' +
                '<label for="' + uniqId + '" class="vjs-episode-title">' +
                options.episodes[idx].title +
                '</label>' +
                '<a class="vjs-episode-description" target="_blank" href="' +
                options.episodes[idx].url +
                '">' +
                '<span>' + options.episodes[idx].description + '</span>' +
                '<img src="' + options.episodes[idx].image + '" style="' + maxWidth + '"/>' +
                '</a>',
              'selectable': true,
              className: 'vjs-episode-item'
            };
            var newmenuItem = new SoapMenuItem(menu.player(), contentOptions);
            (function(url) {
              newmenuItem.el().querySelector('.vjs-episode-description')
                .addEventListener('touchstart', function() {
                  window.top.location.href = url;
                });
            })(options.episodes[idx].url);
            menu.addItem(newmenuItem);
          };

          for (var idx = 0; idx < options.episodes.length; idx++) {
            _loop(idx);
          }
        }
      }
    };

    SoapButton.prototype.createEl = function createEl() {
      var el = _VjsButton.prototype.createEl.call(this);
      el.classList.add('vjs-soap-button');
      return el;
    };

    SoapButton.prototype.buildCSSClass = function buildCSSClass() {
      return 'vjs-icon-soap';
    };

    return SoapButton;
  }(VjsButton);

  var Plugin = videojs$1.getPlugin('plugin');

  // Default options for the plugin.
  var defaults$1 = {};

  /**
   * An advanced Video.js plugin. For more information on the API
   *
   * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
   */

  var Soap = function(_Plugin) {
    inherits(Soap, _Plugin);

    /**
     * Create a Soap plugin instance.
     *
     * @param  {Player} player
     *         A Video.js Player instance.
     *
     * @param  {Object} [options]
     *         An optional options object.
     *
     *         While not a core part of the Video.js plugin architecture, a
     *         second argument of options is a convenient way to accept inputs
     *         from your plugin's caller.
     */
    function Soap(player, options) {
      classCallCheck(this, Soap);

      var _this = possibleConstructorReturn(this, _Plugin.call(this, player));
      // the parent class will add player under this.player

      _this.options = videojs$1.mergeOptions(defaults$1, options);
      _this.buildMenu = function(error, response, responseBody) {
        if (error) {
          return videojs$1.log.error(error);
        }
        var soapButton = player.controlBar.getChild('soap');
        if (soapButton) {
          soapButton.dispose();
          player.controlBar.removeChild(soapButton);
        }

        if (responseBody && responseBody.childNodes && responseBody.childNodes.length) {
          var titleNode = responseBody.evaluate('//title[1]', responseBody, null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null);
          var seasonsNode = responseBody.evaluate('//playlist[1]/seasons[1]', responseBody, null,
            XPathResult.FIRST_ORDERED_NODE_TYPE, null);
          if (seasonsNode.singleNodeValue) {
            soapButton = new SoapButton(player, {
              name: 'soap',
              title: titleNode && titleNode.singleNodeValue
                ? titleNode.singleNodeValue.firstChild.data
                : '',
              seasons: seasonsNode.singleNodeValue,
              designStudio: options.designStudio
            });
            player.controlBar.addChild(soapButton);
          }
        }
      };
      if (options.url) {
        videojs$1.xhr({
          uri: options.url,
          responseType: 'document'
        }, _this.buildMenu.bind(_this));
      }
      _this.player.ready(function() {
        _this.player.addClass('vjs-soap');
      });
      return _this;
    }

    return Soap;
  }(Plugin);

  // Define default values for the plugin's `state` object here.

  Soap.defaultState = {};

  // Include the version number.
  Soap.VERSION = version;

  // Register the plugin with video.js.
  videojs$1.registerPlugin('soap', Soap);

  return Soap;

})));
