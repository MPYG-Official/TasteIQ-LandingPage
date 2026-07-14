/**
 * TasteIQ limited-time offer countdown.
 * Rolls to end-of-month (local time); if under 48h remain, rolls to next month end.
 * Works on any page with [data-offer-countdown] markup; labels stay in HTML for i18n.
 */
(function () {
  'use strict';

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function offerEndMs(now) {
    now = now || new Date();
    // Last ms of current calendar month
    var end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    if (end.getTime() - now.getTime() < 48 * 60 * 60 * 1000) {
      end = new Date(now.getFullYear(), now.getMonth() + 2, 0, 23, 59, 59, 999);
    }
    return end.getTime();
  }

  function readValues(root) {
    return {
      days: root.querySelector('[data-cd="days"]'),
      hours: root.querySelector('[data-cd="hours"]'),
      mins: root.querySelector('[data-cd="mins"]'),
      secs: root.querySelector('[data-cd="secs"]')
    };
  }

  function tick(els, endMs) {
    var remaining = endMs - Date.now();
    if (remaining < 0) {
      // Recompute next window (month rolled over while page was open)
      endMs = offerEndMs(new Date());
      remaining = endMs - Date.now();
    }
    var days = Math.floor(remaining / 86400000);
    var hours = Math.floor((remaining % 86400000) / 3600000);
    var mins = Math.floor((remaining % 3600000) / 60000);
    var secs = Math.floor((remaining % 60000) / 1000);
    if (els.days) els.days.textContent = pad(days);
    if (els.hours) els.hours.textContent = pad(hours);
    if (els.mins) els.mins.textContent = pad(mins);
    if (els.secs) els.secs.textContent = pad(secs);
    return endMs;
  }

  function initRoot(root) {
    var els = readValues(root);
    if (!els.days && !els.hours) {
      // legacy nth-child structure fallback
      var vals = root.querySelectorAll('.countdown-value');
      if (vals.length >= 4) {
        els = { days: vals[0], hours: vals[1], mins: vals[2], secs: vals[3] };
      } else {
        return;
      }
    }
    var endMs = offerEndMs();
    endMs = tick(els, endMs);
    setInterval(function () {
      endMs = tick(els, endMs);
    }, 1000);
  }

  function boot() {
    var roots = document.querySelectorAll('[data-offer-countdown]');
    if (!roots.length) {
      // legacy: any .countdown-timer in .timer-box
      var legacy = document.querySelector('.timer-box .countdown-timer');
      if (legacy) {
        var box = legacy.closest('.timer-box') || legacy;
        box.setAttribute('data-offer-countdown', '');
        roots = [box];
      }
    }
    roots.forEach(initRoot);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
