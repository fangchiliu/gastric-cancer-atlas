/**
 * Injects the shared navigation bar into #site-nav and marks the active link.
 * Call after DOM is ready: <script src="assets/nav.js" defer></script>
 */
(function () {
  const pages = [
    { href: 'index.html',   label: 'Overview' },
    { href: 'methods.html', label: 'Methods' },
    { href: 'results.html', label: 'Results' },
    { href: 'discussion.html', label: 'Discussion' },
    { href: 'https://github.com/fangchiliu/stomach-cancer/tree/main', label: 'Code', external: true },
    { href: 'about.html',   label: 'About' },
  ];

  const current = window.location.pathname.split('/').pop() || 'index.html';

  const links = pages
    .map(({ href, label, external }) => {
      const isActive = !external && (href === current || (current === '' && href === 'index.html'));
      const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${href}"${attrs} class="${isActive ? 'active' : ''}">${label}</a>`;
    })
    .join('');

  const html = `
    <div style="max-width:1100px;margin:0 auto;padding:0 1.5rem;display:flex;align-items:center;justify-content:space-between;height:56px;position:relative;">
      <a href="index.html" class="nav-brand">STAD<span>-Seq</span></a>
      <button id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav id="nav-links">
        ${links}
      </nav>
    </div>
  `;

  const container = document.getElementById('site-nav');
  if (container) {
    container.innerHTML = html;

    const toggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });

    // Close menu when a link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();
