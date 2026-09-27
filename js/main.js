// SANITAIRE 2000 — interactions
(function () {
  var nav = document.getElementById('nav');

  // ---------- Menu drop-downs ----------
  var btns = document.querySelectorAll('.menu__btn[data-panel]');
  function closeAll(except) {
    btns.forEach(function (b) {
      if (b === except) return;
      b.setAttribute('aria-expanded', 'false');
      document.getElementById(b.dataset.panel).hidden = true;
    });
  }
  btns.forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = b.getAttribute('aria-expanded') !== 'true';
      closeAll(b);
      b.setAttribute('aria-expanded', open);
      document.getElementById(b.dataset.panel).hidden = !open;
    });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.menu, .mega')) closeAll(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });
  document.querySelectorAll('.panel a, .mega a').forEach(function (a) {
    a.addEventListener('click', function () {
      closeAll();
      if (a.dataset.tabLink) selectTab(a.dataset.tabLink);
    });
  });

  // Hide the logo once the hero is scrolled past (desktop), recolor on mobile
  var dark = document.querySelectorAll('.hero, .slider, .inspiration');
  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    var onDark = false;
    dark.forEach(function (s) {
      var r = s.getBoundingClientRect();
      if (r.top <= 40 && r.bottom > 40) onDark = true;
    });
    nav.classList.toggle('on-dark', onDark);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Hero video play/pause ----------
  var video = document.querySelector('.hero__video');
  var vBtn = document.getElementById('videoToggle');
  vBtn.addEventListener('click', function () {
    if (video.paused) { video.play().catch(function () {}); vBtn.classList.remove('is-paused'); }
    else { video.pause(); vBtn.classList.add('is-paused'); }
  });

  // ---------- Full-screen slider with names "A, B, C" ----------
  var slides = document.querySelectorAll('.slider__slide');
  var titles = document.getElementById('sliderTitles');
  var sBtn = document.getElementById('sliderToggle');
  var current = 0, timer = null, playing = true;

  slides.forEach(function (s, i) {
    if (i) titles.appendChild(Object.assign(document.createElement('i'), { textContent: ', ' }));
    var span = document.createElement('span');
    span.textContent = s.dataset.name;
    span.addEventListener('click', function () { show(i); restart(); });
    titles.appendChild(span);
  });
  var names = titles.querySelectorAll('span');

  function show(i) {
    slides[current].classList.remove('is-active');
    names[current].classList.remove('is-current');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    names[current].classList.add('is-current');
  }
  function restart() {
    clearInterval(timer);
    if (playing) timer = setInterval(function () { show(current + 1); }, 4000);
  }
  sBtn.addEventListener('click', function () {
    playing = !playing;
    sBtn.classList.toggle('is-paused', !playing);
    restart();
  });
  show(0); restart();

  // ---------- Effects / Collections tabs ----------
  var tabs = document.querySelectorAll('.tab');
  var groups = document.querySelectorAll('.cards');
  var mobileIndex = 0;

  function activeCards() { return document.querySelectorAll('.cards.is-active .card'); }
  function selectTab(name) {
    tabs.forEach(function (t) {
      var on = t.dataset.tab === name;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on);
    });
    groups.forEach(function (g) { g.classList.toggle('is-active', g.dataset.group === name); });
    mobileIndex = 0; updateMobile();
  }
  tabs.forEach(function (t) { t.addEventListener('click', function () { selectTab(t.dataset.tab); }); });

  // Mobile: one card at a time with arrows
  var prev = document.querySelector('.arrow--prev');
  var next = document.querySelector('.arrow--next');
  function updateMobile() {
    var cards = activeCards();
    document.querySelectorAll('.card.is-current').forEach(function (c) { c.classList.remove('is-current'); });
    if (cards[mobileIndex]) cards[mobileIndex].classList.add('is-current');
    prev.disabled = mobileIndex === 0;
    next.disabled = mobileIndex === cards.length - 1;
  }
  prev.addEventListener('click', function () { if (mobileIndex > 0) { mobileIndex--; updateMobile(); } });
  next.addEventListener('click', function () { if (mobileIndex < activeCards().length - 1) { mobileIndex++; updateMobile(); } });
  updateMobile();

  // ---------- Inspiration gallery ----------
  var thumbs = document.querySelectorAll('.thumb');
  var inspSlides = document.querySelectorAll('.insp-slide');
  var inspIndex = 0;
  function showInsp(i) {
    thumbs[inspIndex].classList.remove('is-active');
    inspSlides[inspIndex].classList.remove('is-active');
    inspIndex = i;
    thumbs[i].classList.add('is-active');
    inspSlides[i].classList.add('is-active');
  }
  thumbs.forEach(function (t, i) { t.addEventListener('click', function () { showInsp(i); }); });
  setInterval(function () { showInsp((inspIndex + 1) % thumbs.length); }, 5000);

  // ---------- Reveal on scroll ----------
  var reveal = document.querySelectorAll('.discovery__tabs, .card, .inspiration__main, .inspiration__side, .feat, .footer__top > *, .footer__main > *');
  if ('IntersectionObserver' in window) {
    reveal.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    reveal.forEach(function (el) { io.observe(el); });
  }

  // ---------- Newsletter ----------
  document.getElementById('newsletter').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('newsletterNote').textContent = 'Merci ! Votre inscription est bien enregistrée.';
    this.reset();
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
