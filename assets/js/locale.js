/**
 * TasteIQ locale: auto-detect redirect + preference storage.
 * Language <select> options are injected by site-chrome.js (no fetch required).
 * This script only enhances change handling + first-visit redirects.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'tasteiq_locale_pref';
  var AUTO_KEY = 'tasteiq_locale_autoredirect';

  function configUrl() {
    var parts = window.location.pathname.split('/').filter(Boolean);
    if (parts.length && parts[parts.length - 1].indexOf('.html') !== -1) parts.pop();
    var prefixes = { hi: 1, ar: 1, vi: 1, zh: 1, sw: 1, fr: 1, pt: 1, compare: 1, articles: 1, journeys: 1 };
    if (parts[0] && prefixes[parts[0]]) {
      return '../'.repeat(parts.length) + 'assets/config/locales.json';
    }
    return 'assets/config/locales.json';
  }

  function currentLocaleFromPath() {
    var path = window.location.pathname;
    var m = path.match(/\/(hi|ar|vi|zh|sw|fr|pt)(?:\/|$)/);
    if (m) return m[1];
    return 'en';
  }

  function getPageKey() {
    var path = window.location.pathname.replace(/^\//, '');
    if (!path || path === 'index.html') return 'index';
    if (path === 'hotels.html') return 'hotels';
    if (/^(hi|ar|vi|zh|sw|fr|pt)\/hotels\.html$/.test(path)) return 'hotels';
    if (/^(hi|ar|vi|zh|sw|fr|pt)\/index\.html$/.test(path)) return 'index';
    if (path.indexOf('hotels') !== -1) return 'hotels';
    return 'index';
  }

  function detectBrowserLocale(config) {
    var langs = navigator.languages || [navigator.language || 'en'];
    for (var i = 0; i < langs.length; i++) {
      var raw = (langs[i] || 'en').toLowerCase();
      var short = raw.split('-')[0];
      if (config.browserMap[raw]) return config.browserMap[raw];
      if (config.browserMap[short]) return config.browserMap[short];
      if (config.locales[short]) return short;
    }
    return 'en';
  }

  function absoluteUrl(path) {
    if (!path) return null;
    if (path.indexOf('http') === 0) return path;
    return path.charAt(0) === '/' ? path : '/' + path;
  }

  function bindSelects(config, pageKey) {
    var selects = document.querySelectorAll('[data-locale-select], #tasteiq-locale-select');
    if (!selects.length) return;
    var pages = (config && config.pages && (config.pages[pageKey] || config.pages.index)) || {};

    selects.forEach(function (sel) {
      // Never wipe chrome-injected options. Only refill if empty.
      if (sel.options.length < 2 && config && config.locales) {
        Object.keys(config.locales).forEach(function (code) {
          if (!pages[code]) return;
          var opt = document.createElement('option');
          opt.value = pages[code];
          opt.textContent = config.locales[code].label;
          if (code === currentLocaleFromPath()) opt.selected = true;
          sel.appendChild(opt);
        });
      }

      if (sel._tasteiqBound) return;
      sel._tasteiqBound = true;
      sel.addEventListener('change', function () {
        var url = sel.value;
        if (!url) return;
        var code = currentLocaleFromPath();
        Object.keys(pages).forEach(function (c) {
          if (pages[c] === url || absoluteUrl(pages[c]) === absoluteUrl(url)) code = c;
        });
        // Relative paths from chrome (e.g. hi/index.html)
        if (code === currentLocaleFromPath()) {
          var m = String(url).match(/(?:^|\/)(hi|ar|vi|zh|sw|fr|pt)(?:\/|$)/);
          if (m) code = m[1];
          else if (/index\.html$|hotels\.html$/.test(url) && url.indexOf('/') === -1) code = 'en';
          else if (url === '/' || url === '/index.html') code = 'en';
        }
        try { localStorage.setItem(STORAGE_KEY, code); } catch (e) {}
        window.location.href = url.indexOf('http') === 0 || url.charAt(0) === '/'
          ? absoluteUrl(url)
          : url;
      });
    });
  }

  function applyDir(config) {
    var current = currentLocaleFromPath();
    var loc = config.locales[current];
    if (loc && loc.dir === 'rtl') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', loc.hreflang || current);
    }
  }

  function maybeAutoRedirect(config, pageKey) {
    try {
      if (sessionStorage.getItem(AUTO_KEY) === '1') return;
      if (localStorage.getItem(STORAGE_KEY)) return;
      if (currentLocaleFromPath() !== 'en') return;
      if (/[?&]lang=en\b/.test(window.location.search)) return;

      var suggested = detectBrowserLocale(config);
      if (!suggested || suggested === 'en') return;
      var pages = config.pages[pageKey];
      if (!pages || !pages[suggested]) return;

      sessionStorage.setItem(AUTO_KEY, '1');
      localStorage.setItem(STORAGE_KEY, suggested);
      window.location.replace(absoluteUrl(pages[suggested]));
    } catch (e) {}
  }

  function boot(config) {
    var pageKey = getPageKey();
    if (config) {
      applyDir(config);
      maybeAutoRedirect(config, pageKey);
    }
    bindSelects(config, pageKey);
  }

  function load() {
    // Bind immediately so dropdown works even if fetch fails
    bindSelects(null, getPageKey());

    fetch(configUrl())
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(boot)
      .catch(function () {
        fetch('/assets/config/locales.json')
          .then(function (r) { return r.json(); })
          .then(boot)
          .catch(function () { boot(null); });
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    setTimeout(load, 0);
  }
  window.addEventListener('tasteiq:chrome-ready', load);
})();
