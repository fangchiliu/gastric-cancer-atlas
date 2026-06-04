(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  // Group elements by direct parent so siblings stagger together
  function groupByParent(selector) {
    const map = new Map();
    gsap.utils.toArray(selector).forEach(el => {
      const key = el.parentElement;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(el);
    });
    return map;
  }

  const ease = 'power2.out';

  // ── Load animations (above the fold) ─────────────────────────

  // Hero section (index.html)
  const hero = document.querySelector('.hero');
  if (hero) {
    const inner = hero.querySelector(':scope > div');
    if (inner) {
      gsap.from([...inner.children], {
        opacity: 0, y: 24, duration: 0.65, ease, stagger: 0.13
      });
    }
  }

  // Dark gradient page header (methods / results / about)
  const pageHdr = document.querySelector('body > div[style*="linear-gradient"]');
  if (pageHdr) {
    gsap.from(pageHdr.querySelectorAll('.hero-label, h1, p'), {
      opacity: 0, y: 20, duration: 0.6, ease, stagger: 0.1
    });
  }

  // ── Section eyebrows ──────────────────────────────────────────
  gsap.utils.toArray('.section-eyebrow').forEach(el => {
    gsap.from(el, {
      opacity: 0, y: 14, duration: 0.45, ease,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  // ── Section headings ──────────────────────────────────────────
  gsap.utils.toArray('h2').forEach(el => {
    gsap.from(el, {
      opacity: 0, y: 18, duration: 0.5, ease,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  // ── Cards — staggered by parent container ─────────────────────
  groupByParent('.card, .card-accent').forEach((cards, parent) => {
    gsap.from(cards, {
      opacity: 0, y: 28, duration: 0.6, stagger: 0.1, ease,
      scrollTrigger: { trigger: parent, start: 'top 85%', once: true }
    });
  });

  // ── Stat numbers (dataset cards) ─────────────────────────────
  groupByParent('.stat-number').forEach((stats, parent) => {
    gsap.from(stats, {
      opacity: 0, y: 12, duration: 0.45, stagger: 0.07, ease,
      scrollTrigger: { trigger: parent, start: 'top 88%', once: true }
    });
  });

  // ── Pipeline steps (methods page) ────────────────────────────
  gsap.utils.toArray('.pipeline-step').forEach(el => {
    if (el.querySelector('.step-connector')) return; // skip connector spacers
    gsap.from(el, {
      opacity: 0, x: -18, duration: 0.55, ease,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  // ── Result sections ───────────────────────────────────────────
  gsap.utils.toArray('.result-section').forEach(el => {
    gsap.from(el, {
      opacity: 0, y: 22, duration: 0.6, ease,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    });
  });

  // ── Chart placeholders — staggered by parent ──────────────────
  groupByParent('.chart-placeholder').forEach((charts, parent) => {
    gsap.from(charts, {
      opacity: 0, y: 20, duration: 0.55, stagger: 0.12, ease,
      scrollTrigger: { trigger: parent, start: 'top 85%', once: true }
    });
  });

  // ── Table rows ────────────────────────────────────────────────
  gsap.utils.toArray('tbody tr').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, x: -10, duration: 0.38, delay: i * 0.05, ease,
      scrollTrigger: { trigger: el, start: 'top 92%', once: true }
    });
  });

  // ── Skill bars (about page) ───────────────────────────────────
  gsap.utils.toArray('.skill-bar-fill').forEach(el => {
    const target = el.style.width;
    gsap.fromTo(el,
      { width: '0%' },
      {
        width: target, duration: 0.85, ease,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      }
    );
  });

  // ── Finding chips ─────────────────────────────────────────────
  groupByParent('.finding-chip').forEach((chips, parent) => {
    gsap.from(chips, {
      opacity: 0, scale: 0.88, duration: 0.38, stagger: 0.07, ease: 'back.out(1.4)',
      scrollTrigger: { trigger: parent, start: 'top 90%', once: true }
    });
  });

  // ── Avatar (about page) ───────────────────────────────────────
  const avatar = document.querySelector('.avatar-ring');
  if (avatar) {
    gsap.from(avatar, {
      opacity: 0, scale: 0.82, duration: 0.6, ease: 'back.out(1.5)',
      scrollTrigger: { trigger: avatar, start: 'top 88%', once: true }
    });
  }

  // ── Key finding highlight boxes ───────────────────────────────
  gsap.utils.toArray('.result-section-body').forEach(body => {
    const box = body.querySelector('[style*="background:#f0fdfa"]');
    if (!box) return;
    gsap.from(box, {
      opacity: 0, y: 14, duration: 0.5, ease,
      scrollTrigger: { trigger: box, start: 'top 88%', once: true }
    });
  });

})();
