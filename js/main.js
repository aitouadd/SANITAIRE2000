// SANITAIRE 2000 — interactions
(function () {
  // Header shadow on scroll
  var header = document.getElementById('header');
  window.addEventListener('scroll', function () {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  });

  // Mobile menu
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('is-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Search toggle
  var search = document.getElementById('search');
  document.getElementById('searchBtn').addEventListener('click', function () {
    search.classList.toggle('is-open');
    if (search.classList.contains('is-open')) search.querySelector('input').focus();
  });

  // Hero slider
  var slides = document.querySelectorAll('.hero__slide');
  var dotsWrap = document.getElementById('heroDots');
  var current = 0, timer;
  slides.forEach(function (_, i) {
    var b = document.createElement('button');
    b.setAttribute('aria-label', 'Diapositive ' + (i + 1));
    b.addEventListener('click', function () { go(i); });
    dotsWrap.appendChild(b);
  });
  var dots = dotsWrap.querySelectorAll('button');
  function go(i) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    // restart the progress animation
    void dots[current].offsetWidth;
    dots[current].classList.add('is-active');
    clearInterval(timer);
    timer = setInterval(function () { go(current + 1); }, 6000);
  }
  document.getElementById('heroPrev').addEventListener('click', function () { go(current - 1); });
  document.getElementById('heroNext').addEventListener('click', function () { go(current + 1); });
  go(0);

  // Collection filters
  var filterBtns = document.querySelectorAll('#filters button');
  var cards = document.querySelectorAll('#grid .card');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var f = btn.dataset.filter;
      cards.forEach(function (c) {
        c.classList.toggle('is-hidden', f !== 'all' && c.dataset.cat !== f);
      });
    });
  });

  // Projects carousel arrows
  var track = document.getElementById('projects-track');
  function step() { var p = track.querySelector('.project'); return p ? p.offsetWidth + 28 : 300; }
  document.getElementById('projNext').addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
  document.getElementById('projPrev').addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });

  // Reveal on scroll + number counters
  var revealEls = document.querySelectorAll('.section__head, .card, .intro__grid > *, .split__text > *, .mosaic__item, .project, .numbers li, .store');
  revealEls.forEach(function (el) { el.classList.add('reveal'); });

  function countUp(el) {
    var target = +el.dataset.count, start = null;
    function tick(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / 1600, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString('fr-FR');
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-visible');
        var n = e.target.querySelector && e.target.querySelector('[data-count]');
        if (n) countUp(n);
        io.unobserve(e.target);
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    document.querySelectorAll('[data-count]').forEach(function (n) { n.textContent = n.dataset.count; });
  }

  // Contact form (front-end only — connect to your backend / email service)
  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('formMsg').textContent = 'Merci ! Votre demande a bien été envoyée. Nous vous recontactons sous 24 h.';
    this.reset();
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
