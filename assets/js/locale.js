/**
 * TasteIQ locale helper for static GitHub Pages.
 * - Suggests translated pages via banner (SEO-safe: real URLs, not JS-only content)
 * - Persists preference in localStorage
 * - Renders locale switcher when [data-locale-switcher] is present
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'tasteiq_locale_pref';
  var DISMISS_KEY = 'tasteiq_locale_banner_dismiss';
  function configUrl() {
    // Root-absolute on custom domain (tasteiq.in); relative fallback for project Pages paths
    var parts = window.location.pathname.split('/').filter(Boolean);
    if (parts.length && parts[parts.length - 1].indexOf('.html') !== -1) parts.pop();
    // Known locale prefixes
    if (parts[0] === 'hi' || parts[0] === 'ar' || parts[0] === 'compare') {
      return '../'.repeat(parts.length) + 'assets/config/locales.json';
    }
    return '/assets/config/locales.json';
  }
  var CONFIG_URL = configUrl();

  function getPageKey() {
    var path = window.location.pathname.replace(/^\//, '');
    if (path === '' || path === 'index.html') return 'index';
    if (path === 'hotels.html') return 'hotels';
    if (path === 'hotel-ota-management.html') return 'hotel-ota';
    if (path === 'restaurant-pos-software.html') return 'restaurant-pos';
    if (path.indexOf('hi/hotels') === 0 || path === 'hi/hotels.html') return 'hotels';
    if (path.indexOf('ar/hotels') === 0 || path === 'ar/hotels.html') return 'hotels';
    if (path.indexOf('hi/index') === 0 || path === 'hi/index.html') return 'index';
    if (path.indexOf('ar/index') === 0 || path === 'ar/index.html') return 'index';
    return null;
  }

  function currentLocaleFromPath() {
    var path = window.location.pathname;
    if (path.indexOf('/hi/') !== -1 || path.indexOf('hi/') === 0) return 'hi';
    if (path.indexOf('/ar/') !== -1 || path.indexOf('ar/') === 0) return 'ar';
    return 'en';
  }

  function detectBrowserLocale() {
    var langs = navigator.languages || [navigator.language || 'en'];
    for (var i = 0; i < langs.length; i++) {
      var code = (langs[i] || 'en').split('-')[0].toLowerCase();
      if (code === 'hi' || code === 'ar') return code;
    }
    return 'en';
  }

  function injectBanner(targetLocale, config, pageKey) {
    if (localStorage.getItem(DISMISS_KEY) === '1') return;
    if (currentLocaleFromPath() === targetLocale) return;

    var pages = config.pages[pageKey];
    if (!pages || !pages[targetLocale]) return;

    var loc = config.locales[targetLocale];
    var targetUrl = pages[targetLocale];
    var banner = document.createElement('div');
    banner.className = 'locale-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Language suggestion');
    banner.innerHTML =
      '<div class="locale-banner__inner">' +
        '<span class="locale-banner__text">' + (loc.banner || 'View in ' + loc.label) + '</span>' +
        '<a class="locale-banner__cta" href="' + targetUrl + '">' + loc.label + '</a>' +
        '<button type="button" class="locale-banner__dismiss" aria-label="Dismiss">×</button>' +
      '</div>';
    document.body.insertBefore(banner, document.body.firstChild);
    document.body.classList.add('has-locale-banner');

    banner.querySelector('.locale-banner__dismiss').addEventListener('click', function () {
      localStorage.setItem(DISMISS_KEY, '1');
      banner.remove();
      document.body.classList.remove('has-locale-banner');
    });
  }

  function renderSwitcher(config, pageKey) {
    var nodes = document.querySelectorAll('[data-locale-switcher]');
    if (!nodes.length || !pageKey) return;

    var pages = config.pages[pageKey] || {};
    var current = currentLocaleFromPath();

    nodes.forEach(function (el) {
      var html = '<div class="locale-switch" role="navigation" aria-label="Language">';
      Object.keys(config.locales).forEach(function (code) {
        if (!pages[code]) return;
        var loc = config.locales[code];
        var active = code === current ? ' is-active' : '';
        var aria = code === current ? ' aria-current="true"' : '';
        html += '<a class="locale-switch__link' + active + '" href="' + pages[code] + '" hreflang="' + loc.hreflang + '"' + aria + '>' + loc.label + '</a>';
      });
      html += '</div>';
      el.innerHTML = html;
    });
  }

  function applyDocumentDir(config) {
    var current = currentLocaleFromPath();
    var loc = config.locales[current];
    if (loc && loc.dir === 'rtl') {
      document.documentElement.setAttribute('dir', 'rtl');
    }
  }

  fetch(CONFIG_URL)
    .then(function (r) { return r.json(); })
    .catch(function () { return null; })
    .then(function (config) {
      if (!config) return;

      var pageKey = getPageKey();
      var current = currentLocaleFromPath();
      applyDocumentDir(config);
      renderSwitcher(config, pageKey);

      var preferred = localStorage.getItem(STORAGE_KEY);
      var suggested = preferred || detectBrowserLocale();
      if (pageKey && suggested && suggested !== current && suggested !== 'en') {
        injectBanner(suggested, config, pageKey);
      }

      document.querySelectorAll('[data-locale-switcher] a').forEach(function (link) {
        link.addEventListener('click', function () {
          var href = link.getAttribute('href') || '';
          if (href.indexOf('/hi/') !== -1) localStorage.setItem(STORAGE_KEY, 'hi');
          else if (href.indexOf('/ar/') !== -1) localStorage.setItem(STORAGE_KEY, 'ar');
          else localStorage.setItem(STORAGE_KEY, 'en');
        });
      });
    });
})();
