/* Barbearia Manchester — interações (sem dependências) */
(function () {
  'use strict';

  var doc = document.documentElement;
  var body = document.body;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Entrada do hero */
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { doc.classList.add('is-loaded'); });
  });

  /* ---------- Fotos: espaço reservado se a imagem não carregar ---------- */
  function markFallback(img) {
    var box = img.closest('.media');
    if (box) box.classList.add('is-fallback');
  }
  document.querySelectorAll('.media > img').forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) markFallback(img);
    img.addEventListener('error', function () { markFallback(img); });
  });

  /* ---------- Navbar: transparente sobre o hero, escura ao rolar ---------- */
  var nav = document.querySelector('.nav');
  var hero = document.querySelector('.hero');
  var quickbar = document.querySelector('.quickbar');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle('is-solid', y > 40);
    if (quickbar && hero) {
      var pastHero = y > hero.offsetHeight * 0.7;
      var nearEnd = window.innerHeight + y > document.body.scrollHeight - 40;
      quickbar.classList.toggle('is-visible', pastHero && !nearEnd);
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu');

  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    body.classList.toggle('is-locked', open);
    nav.classList.toggle('is-solid', open || window.scrollY > 40);
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(function () { menu.classList.add('is-open'); });
    } else {
      menu.classList.remove('is-open');
      setTimeout(function () { if (!menu.classList.contains('is-open')) menu.hidden = true; }, reduceMotion ? 0 : 450);
    }
  }
  burger.addEventListener('click', function () {
    setMenu(burger.getAttribute('aria-expanded') !== 'true');
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      burger.focus();
    }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', function (m) {
    if (m.matches) setMenu(false);
  });

  /* ---------- Revelação ao rolar ---------- */
  var revealables = document.querySelectorAll('.reveal, .reveal-img');
  if (!('IntersectionObserver' in window) || reduceMotion) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add('is-in');
        io.unobserve(el);
        // Remove o atraso para não afetar o hover depois da entrada
        if (el.style.transitionDelay) setTimeout(function () { el.style.transitionDelay = ''; }, 1500);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    revealables.forEach(function (el) {
      // Pequeno escalonamento entre elementos irmãos
      var siblings = el.parentElement ? el.parentElement.querySelectorAll(':scope > .reveal, :scope > .reveal-img') : [];
      var i = Array.prototype.indexOf.call(siblings, el);
      if (i > 0) el.style.transitionDelay = Math.min(i * 90, 360) + 'ms';
      io.observe(el);
    });
  }

  /* ---------- Link ativo no menu conforme a seção ---------- */
  var links = document.querySelectorAll('.nav__links a');
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('is-active'); });
        var link = map[entry.target.id];
        if (link) link.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) spy.observe(sec);
    });
  }
})();
