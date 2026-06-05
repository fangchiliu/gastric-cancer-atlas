/* ════════════════════════════════════════════════════════════
   UI ENHANCEMENTS  — custom cursor · navbar scroll
   Loaded on every page (before nav.js).
════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── 1. Custom cursor ──────────────────────────────────────
     Teal dot (fast lerp) + outer ring (slow lerp).
     Only on devices with a fine pointer (mouse/trackpad).
  ─────────────────────────────────────────────────────────── */
  if (window.matchMedia('(pointer: fine)').matches) {
    document.documentElement.classList.add('has-custom-cursor');

    var dot  = document.createElement('div');
    var ring = document.createElement('div');
    dot.className  = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(ring);
    document.body.appendChild(dot);

    var mx = 0, my = 0;   // raw mouse position
    var dx = 0, dy = 0;   // dot  (fast lerp)
    var rx = 0, ry = 0;   // ring (slow lerp)
    var visible = false;

    /* Show on first move; snap both cursors to starting position */
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        dx = rx = mx;
        dy = ry = my;
        dot.style.opacity  = '1';
        ring.style.opacity = '1';
      }
    });

    document.addEventListener('mouseleave', function () {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function () {
      if (visible) {
        dot.style.opacity  = '1';
        ring.style.opacity = '1';
      }
    });

    /* Hover state via delegation — covers dynamically added elements */
    document.addEventListener('mouseover', function (e) {
      var over = !!e.target.closest(
        'a, button, [role="button"], input, select, textarea, label'
      );
      dot.classList.toggle('is-hovering',  over);
      ring.classList.toggle('is-hovering', over);
    });

    /* Animation loop — lerp both cursors toward mouse */
    (function tick() {
      dx += (mx - dx) * 0.32;
      dy += (my - dy) * 0.32;
      rx += (mx - rx) * 0.10;
      ry += (my - ry) * 0.10;

      dot.style.left  = dx + 'px';
      dot.style.top   = dy + 'px';
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';

      requestAnimationFrame(tick);
    })();
  }

  /* ── 2. Navbar scroll behaviour ────────────────────────────
     <50px  → nav-at-top  (transparent)
     ≥50px  → nav-scrolled (frosted dark glass + teal glow)
     #site-nav exists in HTML before nav.js injects content,
     so classList operations are safe to run immediately.
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
    updateNav(); // set correct class on initial load
  }

})();
