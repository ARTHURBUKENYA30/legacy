/* Legacy Rackets Academy — image slideshow and navigation polish */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.querySelector('.legacy-home .hero');
  if (hero) {
    const fallback = hero.querySelector('.hero-fallback');
    const images = ['/img/109.jpeg', '/img/1.jpg', '/img/10.jpg'];
    const slides = [];
    let active = 0;
    let paused = reduceMotion;
    let timer = null;
    images.forEach((src, index) => {
      const img = new Image();
      img.className = 'hero-slide-image' + (index === 0 ? ' is-active' : '');
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      img.decoding = 'async';
      img.src = src;
      img.addEventListener('error', () => { img.remove(); slides[index] = null; });
      if (fallback) hero.insertBefore(img, fallback.nextSibling);
      slides[index] = img;
    });
    const usable = () => slides.map((img, index) => img ? index : -1).filter(index => index >= 0);
    const controls = document.createElement('div');
    controls.className = 'legacy-hero-controls';
    controls.setAttribute('aria-label', 'Hero image slideshow controls');
    const dots = document.createElement('div');
    dots.className = 'legacy-hero-dots';
    images.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Show hero image ' + (index + 1));
      dot.setAttribute('aria-current', index === 0 ? 'true' : 'false');
      dot.addEventListener('click', () => show(index));
      dots.append(dot);
    });
    const pause = document.createElement('button');
    pause.type = 'button';
    pause.textContent = paused ? 'Play' : 'Pause';
    pause.setAttribute('aria-pressed', paused ? 'true' : 'false');
    pause.addEventListener('click', () => {
      paused = !paused;
      pause.textContent = paused ? 'Play' : 'Pause';
      pause.setAttribute('aria-pressed', String(paused));
      schedule();
    });
    controls.append(dots, pause);
    hero.append(controls);
    function show(index) {
      const valid = usable();
      if (!valid.length) return;
      active = valid.includes(index) ? index : valid[0];
      slides.forEach((img, i) => img && img.classList.toggle('is-active', i === active));
      [...dots.children].forEach((dot, i) => dot.setAttribute('aria-current', String(i === active)));
      schedule();
    }
    function schedule() {
      if (timer) window.clearInterval(timer);
      if (paused || reduceMotion || usable().length < 2) return;
      timer = window.setInterval(() => {
        const valid = usable();
        const position = valid.indexOf(active);
        show(valid[(position + 1) % valid.length]);
      }, 6500);
    }
    schedule();
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && timer) window.clearInterval(timer);
      else schedule();
    });
  }

  const progress = document.createElement('div');
  progress.className = 'legacy-scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);
  const backTop = document.createElement('button');
  backTop.type = 'button';
  backTop.className = 'legacy-back-top';
  backTop.setAttribute('aria-label', 'Back to top');
  backTop.innerHTML = '<i class="fa-solid fa-arrow-up" aria-hidden="true"></i>';
  backTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: reduceMotion ? 'auto' : 'smooth'}));
  document.body.append(backTop);

  let queued = false;
  const updateScroll = () => {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = percent + '%';
      backTop.classList.toggle('is-visible', window.scrollY > 520);
      queued = false;
    });
  };
  window.addEventListener('scroll', updateScroll, {passive: true});
  updateScroll();

  const navLinks = [...document.querySelectorAll('.legacy-home .navbar a[href^="#"]')].filter(link => (link.getAttribute('href') || '').length > 1);
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          if (link.getAttribute('href') === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, {rootMargin: '-28% 0px -62% 0px'});
    sections.forEach(section => observer.observe(section));
  }

  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (link.hostname && link.hostname !== window.location.hostname && !link.hasAttribute('target')) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });
})();