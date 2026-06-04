/**
 * Page enhancements — methods · results · about
 * GSAP + ScrollTrigger scroll animations, replacing scroll-anim.js on these pages.
 */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  const ease = 'power2.out';

  /* Helper: group elements by direct parent for sibling stagger */
  function byParent(selector) {
    const map = new Map();
    gsap.utils.toArray(selector).forEach(el => {
      const key = el.parentElement;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(el);
    });
    return map;
  }

  /* ── 1. Page header — cinematic staggered entrance ─────────── */
  const hdr = document.querySelector('body > div[style*="linear-gradient"]');
  if (hdr) {
    const label = hdr.querySelector('.hero-label');
    const h1    = hdr.querySelector('h1');
    const p     = hdr.querySelector('p');
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from(label, { opacity: 0, y: 18, duration: 0.55 }, label ? 0 : 999)
      .from(h1,    { opacity: 0, y: 34, duration: 0.75 }, '-=0.3')
      .from(p,     { opacity: 0, y: 20, duration: 0.6  }, '-=0.45');
  }

  /* ── 2. Section eyebrows slide in from left ─────────────────── */
  gsap.utils.toArray('.section-eyebrow').forEach(el => {
    gsap.from(el, {
      opacity: 0, x: -18, duration: 0.45, ease,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  /* ── 3. H2 headings — slide from left ──────────────────────── */
  gsap.utils.toArray('h2').forEach(el => {
    gsap.from(el, {
      opacity: 0, x: -44, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%', once: true }
    });
  });

  /* ── 4. HR dividers — draw themselves left → right ─────────── */
  gsap.utils.toArray('hr.divider').forEach(hr => {
    gsap.from(hr, {
      scaleX: 0, transformOrigin: 'left center',
      duration: 1.15, ease: 'power2.out',
      scrollTrigger: { trigger: hr, start: 'top 88%', once: true }
    });
  });

  /* ── 5. Cards — stagger up from bottom ─────────────────────── */
  byParent('.card, .card-accent').forEach((cards, parent) => {
    gsap.from(cards, {
      opacity: 0, y: 34, duration: 0.65, stagger: 0.1, ease,
      scrollTrigger: { trigger: parent, start: 'top 84%', once: true }
    });
  });

  /* ── 6. Pipeline step cards — slide from left ──────────────── */
  gsap.utils.toArray('.pipeline-step').forEach(el => {
    if (el.querySelector('.step-connector')) return; // skip spacer rows
    gsap.from(el, {
      opacity: 0, x: -24, duration: 0.6, ease,
      scrollTrigger: { trigger: el, start: 'top 86%', once: true }
    });
  });

  /* ── 7. Connector lines — draw downward ────────────────────── */
  gsap.utils.toArray('.step-connector-line').forEach(line => {
    gsap.from(line, {
      scaleY: 0, transformOrigin: 'top center',
      duration: 0.48, ease: 'power2.inOut',
      scrollTrigger: { trigger: line, start: 'top 82%', once: true }
    });
  });

  /* ── 8. Result sections — fade up ──────────────────────────── */
  gsap.utils.toArray('.result-section').forEach(el => {
    gsap.from(el, {
      opacity: 0, y: 26, duration: 0.65, ease,
      scrollTrigger: { trigger: el, start: 'top 84%', once: true }
    });
  });

  /* ── 9. Chart placeholders — scale + fade zoom-in ──────────── */
  byParent('.chart-placeholder').forEach((charts, parent) => {
    gsap.from(charts, {
      opacity: 0, scale: 0.93, y: 18,
      duration: 0.65, stagger: 0.13, ease,
      scrollTrigger: { trigger: parent, start: 'top 84%', once: true }
    });
  });

  /* ── 10. Table rows — stagger slide ────────────────────────── */
  gsap.utils.toArray('tbody tr').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, x: -12, duration: 0.38, delay: i * 0.05, ease,
      scrollTrigger: { trigger: el, start: 'top 92%', once: true }
    });
  });

  /* ── 11. Skill bars — animate width from 0 ─────────────────── */
  gsap.utils.toArray('.skill-bar-fill').forEach(el => {
    const target = el.style.width;
    gsap.fromTo(el,
      { width: '0%' },
      {
        width: target, duration: 1.1, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      }
    );
  });

  /* ── 12. Finding chips — bounce in ─────────────────────────── */
  byParent('.finding-chip').forEach((chips, parent) => {
    gsap.from(chips, {
      opacity: 0, scale: 0.84, duration: 0.4, stagger: 0.07,
      ease: 'back.out(1.5)',
      scrollTrigger: { trigger: parent, start: 'top 90%', once: true }
    });
  });

  /* ── 13. Key finding highlight boxes ───────────────────────── */
  gsap.utils.toArray('.result-section-body').forEach(body => {
    const box = body.querySelector('[style*="background:#f0fdfa"]');
    if (!box) return;
    gsap.from(box, {
      opacity: 0, y: 16, duration: 0.52, ease,
      scrollTrigger: { trigger: box, start: 'top 88%', once: true }
    });
  });

  /* ── 14. About: avatar + bio — cinematic sequence ──────────── */
  const avatar = document.querySelector('.avatar-ring');
  if (avatar) {
    const bioText = avatar.nextElementSibling;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: avatar, start: 'top 82%', once: true }
    });
    tl.from(avatar, {
      opacity: 0, scale: 0.72, rotation: -10,
      duration: 0.75, ease: 'back.out(1.8)'
    });
    if (bioText) {
      tl.from([...bioText.children], {
        opacity: 0, x: 28, duration: 0.55, stagger: 0.1, ease: 'power2.out'
      }, '-=0.4');
    }
  }

  /* ── 15. Tool tags — stagger per card ──────────────────────── */
  byParent('.tool-tag').forEach((tags, parent) => {
    gsap.from(tags, {
      opacity: 0, y: 8, duration: 0.32, stagger: 0.045, ease: 'power2.out',
      scrollTrigger: { trigger: parent, start: 'top 85%', once: true }
    });
  });

  /* ── 16. Contact buttons — stagger fade up ──────────────────── */
  const contactBtns = gsap.utils.toArray('section a.btn-primary, section a.btn-outline');
  if (contactBtns.length) {
    gsap.from(contactBtns, {
      opacity: 0, y: 18, duration: 0.5, stagger: 0.1, ease: 'back.out(1.2)',
      scrollTrigger: { trigger: contactBtns[0], start: 'top 88%', once: true }
    });
  }

  /* ── 17. Stat numbers with data-count (optional) ───────────── */
  gsap.utils.toArray('[data-count]').forEach(el => {
    const end    = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const proxy  = { val: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter() {
        gsap.to(proxy, {
          val: end, duration: 1.8, ease: 'power2.out',
          onUpdate() {
            const n = Math.round(proxy.val);
            el.textContent = (n >= 1000 ? n.toLocaleString() : n) + suffix;
          }
        });
      }
    });
  });

})();
