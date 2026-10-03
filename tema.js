// Botón de tema (sol ↔ luna): cambia, guarda la elección y, sin elección guardada, sigue al sistema en vivo.
(function () {
  'use strict';
  var b = document.getElementById('btnTema'), raiz = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  function pintar() {
    var claro = raiz.getAttribute('data-theme') === 'light';
    b.setAttribute('aria-label', claro ? b.dataset.oscuro : b.dataset.claro);
    meta.setAttribute('content', claro ? '#eef3f8' : '#071a2b');
  }
  function poner(t) { raiz.setAttribute('data-theme', t); pintar(); }
  b.addEventListener('click', function () {
    var t = raiz.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('numik-web-tema', t); } catch (e) {}
    poner(t);
  });
  matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
    var guardado = null;
    try { guardado = localStorage.getItem('numik-web-tema'); } catch (err) {}
    if (!guardado) poner(e.matches ? 'light' : 'dark');
  });
  pintar();
})();
