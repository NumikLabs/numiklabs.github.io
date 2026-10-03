// El trazado del hero: retícula de cruces, la línea que se dibuja y los nodos que se acercan un poco al cursor.
(function () {
  'use strict';
  var svg = document.getElementById('trazado');
  if (!svg) return;
  document.documentElement.classList.add('js');
  var NS = 'http://www.w3.org/2000/svg', g = document.getElementById('reticula');
  for (var x = 30; x <= 470; x += 40) for (var y = 30; y <= 430; y += 40) {
    [[x - 3, y, x + 3, y], [x, y - 3, x, y + 3]].forEach(function (c) {
      var l = document.createElementNS(NS, 'line');
      l.setAttribute('x1', c[0]); l.setAttribute('y1', c[1]); l.setAttribute('x2', c[2]); l.setAttribute('y2', c[3]);
      g.appendChild(l);
    });
  }
  var camino = document.getElementById('camino');
  camino.style.setProperty('--largo', Math.ceil(camino.getTotalLength()));

  var quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lectura = document.getElementById('lectura');
  var nodos = [].slice.call(svg.querySelectorAll('.nodo'));
  var centros = nodos.map(function (n) { var b = n.querySelector('circle,rect').getBBox(); return [b.x + b.width / 2, b.y + b.height / 2]; });
  var dos = function (n) { return String(Math.max(0, Math.min(99, n))).padStart(2, '0'); };
  svg.addEventListener('pointermove', function (e) {
    var p = new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM().inverse());
    lectura.textContent = 'x ' + dos(Math.round((p.x - 30) / 40)) + ' · y ' + dos(Math.round((430 - p.y) / 40));
    if (quieto) return;
    nodos.forEach(function (n, i) {
      var dx = p.x - centros[i][0], dy = p.y - centros[i][1], d = Math.hypot(dx, dy);
      var f = Math.max(0, 1 - d / 160) * 6;
      n.style.transform = d ? 'translate(' + dx / d * f + 'px,' + dy / d * f + 'px)' : '';
    });
  });
  svg.addEventListener('pointerleave', function () {
    nodos.forEach(function (n) { n.style.transform = ''; });
    lectura.textContent = 'x 00 · y 00';
  });
})();
