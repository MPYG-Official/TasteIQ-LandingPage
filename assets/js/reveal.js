/**
 * TasteIQ scroll-reveal — progressive enhancement.
 * Content stays visible without JS. With JS, optional fade-in via html.js-reveal.
 */
(function () {
  'use strict';
  var nodes = document.querySelectorAll('.reveal');
  if (!nodes.length) return;

  function show(el) {
    el.classList.add('is-visible');
  }

  // Mark already in-view elements BEFORE enabling hide-until-visible CSS
  nodes.forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) show(el);
  });
  document.documentElement.classList.add('js-reveal');

  if (!('IntersectionObserver' in window)) {
    nodes.forEach(show);
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        show(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

  nodes.forEach(function (el) {
    if (!el.classList.contains('is-visible')) io.observe(el);
  });

  setTimeout(function () {
    nodes.forEach(show);
  }, 900);
})();
