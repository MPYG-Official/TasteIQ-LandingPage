/**
 * TasteIQ site chrome — consistent navbar + professional footer for GitHub Pages.
 * Placeholders: #site-nav and #site-footer with optional data-root / data-active
 */
(function () {
  'use strict';

  var navEl = document.getElementById('site-nav');
  var footEl = document.getElementById('site-footer');
  if (!navEl && !footEl) return;

  var root = (navEl && navEl.getAttribute('data-root')) ||
    (footEl && footEl.getAttribute('data-root')) || '';
  if (root && root.slice(-1) !== '/' && root !== '') root += '/';

  var active = (navEl && navEl.getAttribute('data-active')) ||
    (footEl && footEl.getAttribute('data-active')) || '';

  function href(path) {
    return root + path;
  }

  function aiReceptionistHref() {
    return currentLocaleCode() === 'hi'
      ? href('hi/features/ai-receptionist.html')
      : href('features/ai-receptionist.html');
  }

  function isActive(key) {
    return active === key ? ' active' : '';
  }

  function restActive() {
    return (active === 'hotels' || active === 'ota') ? '' : ' is-active';
  }
  function hotelsActive() {
    return (active === 'hotels' || active === 'ota') ? ' is-active' : '';
  }

  function currentLocaleCode() {
    var path = window.location.pathname;
    var m = path.match(/\/(hi|ar|vi|zh|sw|fr|pt)(?:\/|$)/);
    return m ? m[1] : 'en';
  }

  function pageKind() {
    var path = window.location.pathname;
    if (/hotels\.html/.test(path) || active === 'hotels' || active === 'ota') return 'hotels';
    return 'index';
  }

  var LOCALE_OPTIONS = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'ar', label: 'العربية' },
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'zh', label: '中文' },
    { code: 'sw', label: 'Kiswahili' },
    { code: 'fr', label: 'Français' },
    { code: 'pt', label: 'Português' }
  ];

  function localePath(code) {
    var kind = pageKind();
    if (code === 'en') {
      return kind === 'hotels' ? href('hotels.html') : href('index.html');
    }
    return kind === 'hotels'
      ? href(code + '/hotels.html')
      : href(code + '/index.html');
  }

  function localeMenuHtml() {
    var cur = currentLocaleCode();
    var html = '<div class="locale-menu" data-locale-menu>';
    html += '<button type="button" class="locale-icon-btn" id="tasteiq-locale-btn" aria-expanded="false" aria-haspopup="true" aria-controls="tasteiq-locale-panel" title="Language" aria-label="Change language">';
    html += '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.75"/><path d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3z" stroke="currentColor" stroke-width="1.75"/></svg>';
    html += '</button>';
    html += '<div class="locale-menu__panel" id="tasteiq-locale-panel" hidden role="menu">';
    LOCALE_OPTIONS.forEach(function (loc) {
      var isCur = loc.code === cur;
      html += '<a class="locale-menu__item' + (isCur ? ' is-active' : '') + '" role="menuitem" href="' + localePath(loc.code) + '"' + (isCur ? ' aria-current="true"' : '') + '>' + loc.label + '</a>';
    });
    html += '</div></div>';
    return html;
  }

  if (navEl) {
    navEl.outerHTML =
      '<nav class="navbar navbar-expand-lg navbar-light sticky-top site-nav-bar" aria-label="Primary">' +
        '<div class="container navbar-shell">' +
          '<a class="navbar-brand" href="' + href('index.html') + '">TasteIQ</a>' +
          '<div class="nav-trailing">' +
            localeMenuHtml() +
            '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#siteNavbarNav" aria-controls="siteNavbarNav" aria-expanded="false" aria-label="Toggle navigation">' +
              '<span class="navbar-toggler-icon"></span>' +
            '</button>' +
          '</div>' +
          '<nav class="audience-switch" aria-label="Choose your business type">' +
            '<a class="audience-switch__link' + restActive() + '" href="' + href('index.html') + '"><span class="as-full">Restaurants &amp; Cafés</span><span class="as-short">Restaurants</span></a>' +
            '<a class="audience-switch__link' + hotelsActive() + '" href="' + href('hotels.html') + '"><span class="as-full">Hotels &amp; Properties</span><span class="as-short">Hotels</span></a>' +
          '</nav>' +
          '<div class="collapse navbar-collapse" id="siteNavbarNav">' +
            '<ul class="navbar-nav ms-auto">' +
              '<li class="nav-item"><a class="nav-link' + isActive('pricing') + '" href="' + href('pricing.html') + '">Pricing</a></li>' +
              '<li class="nav-item"><a class="nav-link' + isActive('features') + '" href="' + aiReceptionistHref() + '">AI Receptionist</a></li>' +
              '<li class="nav-item"><a class="nav-link' + isActive('partners') + '" href="' + href('sales-partner.html') + '">Partners</a></li>' +
              '<li class="nav-item"><a class="nav-link' + isActive('articles') + '" href="' + href('articles/index.html') + '">Guides</a></li>' +
              '<li class="nav-item"><a class="nav-link' + isActive('journeys') + '" href="' + href('journeys/index.html') + '">New outlet</a></li>' +
              '<li class="nav-item"><a class="nav-link' + isActive('support') + '" href="' + href('support.html') + '">Support</a></li>' +
              '<li class="nav-item"><a class="nav-link btn-nav-cta" href="' + href('index.html') + '#contact">Book Demo</a></li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
      '</nav>';

    var btn = document.getElementById('tasteiq-locale-btn');
    var panel = document.getElementById('tasteiq-locale-panel');
    if (btn && panel) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = panel.hasAttribute('hidden');
        if (open) {
          panel.removeAttribute('hidden');
          btn.setAttribute('aria-expanded', 'true');
        } else {
          panel.setAttribute('hidden', '');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
      document.addEventListener('click', function () {
        panel.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
      });
      panel.addEventListener('click', function (e) { e.stopPropagation(); });
      panel.querySelectorAll('a[role="menuitem"]').forEach(function (a, idx) {
        a.addEventListener('click', function () {
          try {
            localStorage.setItem('tasteiq_locale_pref', LOCALE_OPTIONS[idx].code);
          } catch (err) {}
        });
      });
    }
  }

  if (footEl) {
    var year = new Date().getFullYear();
    footEl.outerHTML =
      '<footer class="site-footer" id="site-footer">' +
        '<div class="container">' +
          '<div class="site-footer__top">' +
            '<div class="site-footer__cta-strip">' +
              '<div>' +
                '<strong>Ready to go live?</strong>' +
                '<span>Book a 15-min demo or chat on WhatsApp—restaurants, cafés &amp; hotels welcome.</span>' +
              '</div>' +
              '<div class="site-footer__cta-actions">' +
                '<a class="btn-whatsapp" href="https://wa.me/916207466460?text=Hi%20TasteIQ%2C%20I%20want%20a%20demo" target="_blank" rel="noopener noreferrer">WhatsApp</a>' +
                '<a class="btn btn-light btn-sm px-3" href="' + href('index.html') + '#contact">Book demo</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="site-footer__grid">' +
            '<div class="site-footer__brand">' +
              '<a class="footer-brand" href="' + href('index.html') + '">TasteIQ</a>' +
              '<p>Hospitality OS with native property management plus F&amp;B for restaurants, cafés, bakeries, bars, and hotels worldwide—rooms, billing, inventory, OTA sync, and guest ordering.</p>' +
              '<p class="site-footer__meta">MPYG Technologies Pvt. Ltd.<br>Bangalore · founders@tasteiq.in · +91 62074 66460</p>' +
            '</div>' +
            '<div>' +
              '<h3>Product</h3>' +
              '<ul>' +
                '<li><a href="' + href('index.html') + '">Restaurants &amp; Cafés</a></li>' +
                '<li><a href="' + href('hotels.html') + '">Hotels &amp; Properties</a></li>' +
                '<li><a href="' + href('pricing.html') + '">Pricing</a></li>' +
                '<li><a href="' + aiReceptionistHref() + '">AI Receptionist</a></li>' +
                '<li><a href="' + href('hotel-ota-management.html') + '">OTA management</a></li>' +
                '<li><a href="' + href('sales-partner.html') + '">Partner program</a></li>' +
              '</ul>' +
            '</div>' +
            '<div>' +
              '<h3>Grow &amp; learn</h3>' +
              '<ul>' +
                '<li><a href="' + href('articles/index.html') + '">Operator guides</a></li>' +
                '<li><a href="' + href('journeys/index.html') + '">New outlet journeys</a></li>' +
                '<li><a href="' + href('compare/index.html') + '">Compare POS options</a></li>' +
                '<li><a href="' + (currentLocaleCode() === 'hi' ? href('hi/features/index.html') : href('features/index.html')) + '">On-demand features</a></li>' +
                '<li><a href="' + href('journeys/fssai-license-for-restaurants.html') + '">FSSAI help</a></li>' +
              '</ul>' +
            '</div>' +
            '<div>' +
              '<h3>Company</h3>' +
              '<ul>' +
                '<li><a href="' + href('support.html') + '">Support</a></li>' +
                '<li><a href="' + href('privacy-policy.html') + '">Privacy policy</a></li>' +
                '<li><a href="' + href('terms-and-condition.html') + '">Terms</a></li>' +
                '<li><a href="' + href('refund-and-cancellation-policy.html') + '">Refunds</a></li>' +
                '<li><a href="mailto:founders@tasteiq.in">founders@tasteiq.in</a></li>' +
              '</ul>' +
            '</div>' +
          '</div>' +
          '<div class="site-footer__bottom">' +
            '<p>&copy; ' + year + ' TasteIQ by MPYG Technologies. All rights reserved.</p>' +
            '<p class="site-footer__locales">Languages: English · हिन्दी · العربية · Việt · 中文 · Kiswahili · Français · Português</p>' +
          '</div>' +
        '</div>' +
      '</footer>';
  }

  function syncNavOffset() {
    var nav = document.querySelector('.site-nav-bar');
    if (!nav) return;
    var h = Math.ceil(nav.getBoundingClientRect().height);
    if (h > 40) {
      document.documentElement.style.setProperty('--nav-offset', h + 'px');
      document.body.style.setProperty('--nav-offset', h + 'px');
    }
  }

  document.body.classList.add('has-site-chrome');
  syncNavOffset();
  window.addEventListener('resize', syncNavOffset);
  if (window.ResizeObserver) {
    var nav = document.querySelector('.site-nav-bar');
    if (nav) new ResizeObserver(syncNavOffset).observe(nav);
  }

  try {
    window.dispatchEvent(new Event('tasteiq:chrome-ready'));
  } catch (e) {}
})();
