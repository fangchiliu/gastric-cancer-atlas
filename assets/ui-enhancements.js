/* ════════════════════════════════════════════════════════════
   UI ENHANCEMENTS  — particle trail · navbar scroll
   Loaded on every page (before nav.js).
════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── 1. Mouse particle trail ───────────────────────────────
     Spawns 2-3 glowing teal particles per movement event.
     Each fades out over 600 ms while drifting downward.
     Skipped on touch-only devices (no fine pointer).
  ─────────────────────────────────────────────────────────── */
  if (window.matchMedia('(pointer: fine)').matches) {

    var lastX = -9999, lastY = -9999;

    function spawnParticles(cx, cy) {
      var count = 2 + Math.floor(Math.random() * 2); // 2 or 3
      for (var i = 0; i < count; i++) {
        var size = 4 + Math.random() * 4;            // 4–8 px
        var ox   = (Math.random() - 0.5) * 10;       // ±5 px
        var oy   = (Math.random() - 0.5) * 10;

        var p = document.createElement('div');
        p.className = 'cursor-particle';

        var glow = size * 2;
        p.style.cssText =
          'width:'      + size + 'px;' +
          'height:'     + size + 'px;' +
          'left:'       + (cx + ox - size * 0.5) + 'px;' +
          'top:'        + (cy + oy - size * 0.5) + 'px;' +
          'box-shadow:0 0 ' + glow + 'px rgba(0,212,170,0.85),' +
                          '0 0 ' + (glow * 2) + 'px rgba(0,212,170,0.35);' +
          'animation-duration:' + (520 + Math.random() * 160) + 'ms;' +
          'animation-delay:'    + (Math.random() * 40)         + 'ms;';

        document.body.appendChild(p);

        /* Remove after animation completes */
        setTimeout(function (el) {
          if (el.parentNode) el.parentNode.removeChild(el);
        }, 750, p);
      }
    }

    document.addEventListener('mousemove', function (e) {
      var dx = e.clientX - lastX;
      var dy = e.clientY - lastY;
      /* Only spawn when cursor moves at least 4 px — avoids over-spawning
         on micro-jitter while still producing a dense trail on fast moves */
      if (dx * dx + dy * dy < 16) return;
      lastX = e.clientX;
      lastY = e.clientY;
      spawnParticles(e.clientX, e.clientY);
    });
  }

  /* ── 2. Navbar scroll behaviour ────────────────────────────
     <50 px  → nav-at-top  (transparent)
     ≥50 px  → nav-scrolled (frosted dark glass + teal glow)
  ─────────────────────────────────────────────────────────── */
  var nav = document.getElementById('site-nav');
  if (nav) {
    function updateNav() {
      if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
        nav.classList.remove('nav-at-top');
      } else {
        nav.classList.remove('nav-scrolled');
        nav.classList.add('nav-at-top');
      }
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

})();
