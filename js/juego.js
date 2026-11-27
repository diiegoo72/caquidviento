/* =========================================================
   Caquiviento — Juego del día: «Atrapa los regalos»
   Los textos y la fecha están en js/regalos.js (JUEGO_HOY).
   Usa utilidades de app.js expuestas en window.CAQUI.
   Modo prueba: ?prueba=caqui&fecha=2026-11-27T20:00  (o &juego=1 para forzarlo)
   ========================================================= */
(function () {
  'use strict';

  const C = window.CAQUI;
  if (!C || typeof JUEGO_HOY === 'undefined' || !JUEGO_HOY.fecha || typeof ICONOS === 'undefined') return;
  const J = JUEGO_HOY;

  const $ = sel => document.querySelector(sel);
  const dos = n => String(n).padStart(2, '0');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const CLAVE = 'caquiviento-juego-' + J.fecha;
  const OBJETIVO = J.objetivo || 15;
  const SEGUNDOS = J.segundos || 30;

  const p = C.partesMadrid(C.ahora());
  const esHoy = `${p.y}-${dos(p.mo)}-${dos(p.d)}` === J.fecha;
  const forzar = C.PRUEBA && C.params.get('juego') === '1';
  let ganado = false;
  if (!C.PRUEBA) { try { ganado = localStorage.getItem(CLAVE) === 'ganado'; } catch (e) { /* sin almacenamiento */ } }

  const elJuego = $('#juego');
  const lienzo = $('#juego-lienzo');
  const ctx = lienzo.getContext('2d');
  const elMarcador = $('#juego-marcador');
  const elPuntos = $('#juego-puntos');
  const elTiempo = $('#juego-tiempo');
  const elPanel = $('#juego-panel');
  const elTitulo = $('#juego-titulo');
  const elCuerpo = $('#juego-cuerpo');
  const elBoton = $('#juego-boton');
  const verPista = $('#ver-pista');
  $('#juego-objetivo').textContent = OBJETIVO;

  const texto = (t, extra = {}) => C.rellenar(String(t)
    .replace(/\{OBJETIVO\}/g, OBJETIVO).replace(/\{SEGUNDOS\}/g, SEGUNDOS)
    .replace(/\{PUNTOS\}/g, extra.puntos ?? 0).replace(/\{FALTAN\}/g, extra.faltan ?? OBJETIVO));

  /* ---------- Paneles (intro / perder / ganar / pista) ---------- */
  let accionBoton = null;
  function mostrarPanel(titulo, cuerpoHTML, boton, accion) {
    elTitulo.textContent = titulo;
    elCuerpo.innerHTML = cuerpoHTML;
    elBoton.textContent = boton;
    accionBoton = accion;
    elPanel.hidden = false;
    elMarcador.hidden = true;
    setTimeout(() => elBoton.focus({ preventScroll: true }), 50);
  }
  elBoton.addEventListener('click', () => accionBoton && accionBoton());

  const htmlPista = () => `<p class="juego-pista">${esc(J.pista)}</p>`;

  function abrir() {
    elJuego.hidden = false;
    elJuego.classList.remove('saliendo');
    ajustar();
  }
  function cerrar() {
    jugando = false;
    elJuego.classList.add('saliendo');
    setTimeout(() => { elJuego.hidden = true; elJuego.classList.remove('saliendo'); }, 450);
  }

  function intro() {
    mostrarPanel(J.titulo,
      `<p>${esc(texto(J.intro))}</p><p class="juego-premio">${esc(J.premioIntro || '')}</p>`,
      '¡A jugar!', empezar);
  }

  // Botón de la tarjeta de espera para releer la pista
  verPista.addEventListener('click', () => {
    abrir();
    pintarFondo();
    mostrarPanel('Tu pista 🔑', htmlPista(), 'Cerrar', cerrar);
  });

  if (esHoy && ganado) verPista.hidden = false;
  if (!(forzar || (esHoy && !ganado))) return;

  /* ---------- Imágenes (SVG propios de iconos.js) ---------- */
  function imagen(svg) {
    const img = new Image();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.replace('<svg ', '<svg width="100" height="100" '));
    return img;
  }
  const IMG = {
    regalo: imagen(ICONOS.regalo), caqui: imagen(ICONOS.caqui), estrella: imagen(ICONOS.estrella),
    bola: imagen(ICONOS.bola), carbon: imagen(ICONOS.carbon), saco: imagen(ICONOS.saco)
  };
  const BUENOS = ['regalo', 'caqui', 'estrella', 'bola', 'regalo', 'caqui'];

  /* ---------- Lienzo ---------- */
  let W = 0, H = 0;
  function ajustar() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    lienzo.width = Math.round(W * dpr); lienzo.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    saco.tam = Math.min(W * 0.26, 120);
    saco.y = H - saco.tam - 22;
    if (!saco.x) saco.x = saco.objetivo = W / 2;
  }
  window.addEventListener('resize', () => { if (!elJuego.hidden) ajustar(); });

  function pintarFondo() {
    ctx.clearRect(0, 0, W, H);
  }

  /* ---------- Estado de la partida ---------- */
  const saco = { x: 0, objetivo: 0, y: 0, tam: 100 };
  let cosas = [], textos = [], puntos = 0, transcurrido = 0, proxima = 0, temblor = 0, jugando = false, ultimo = 0;

  function moverA(clientX) { saco.objetivo = Math.max(saco.tam / 2, Math.min(W - saco.tam / 2, clientX)); }
  lienzo.addEventListener('pointerdown', e => { moverA(e.clientX); });
  lienzo.addEventListener('pointermove', e => { if (jugando) moverA(e.clientX); });
  window.addEventListener('keydown', e => {
    if (!jugando) return;
    if (e.key === 'ArrowLeft') moverA(saco.objetivo - 40);
    if (e.key === 'ArrowRight') moverA(saco.objetivo + 40);
  });

  function empezar() {
    ajustar();
    cosas = []; textos = []; puntos = 0; transcurrido = 0; proxima = 0.4; temblor = 0;
    saco.x = saco.objetivo = W / 2;
    elPuntos.textContent = '0';
    elTiempo.textContent = SEGUNDOS;
    elPanel.hidden = true;
    elMarcador.hidden = false;
    jugando = true;
    ultimo = performance.now();
    requestAnimationFrame(paso);
  }

  function soltar(progreso) {
    const malo = Math.random() < 0.24 + progreso * 0.14;
    const tam = Math.min(W * 0.14, 62) * (0.85 + Math.random() * 0.3);
    cosas.push({
      tipo: malo ? 'carbon' : BUENOS[Math.floor(Math.random() * BUENOS.length)],
      x: tam / 2 + Math.random() * (W - tam),
      y: -tam,
      tam,
      v: H * (0.38 + progreso * 0.34) * (0.85 + Math.random() * 0.3),
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 2.4
    });
  }

  function paso(t) {
    if (!jugando) return;
    const dt = Math.min((t - ultimo) / 1000, 0.05);
    ultimo = t;
    if (!document.hidden) actualizar(dt);
    dibujar();
    if (jugando) requestAnimationFrame(paso);
  }

  function actualizar(dt) {
    transcurrido += dt;
    const progreso = Math.min(transcurrido / SEGUNDOS, 1);
    const resto = Math.max(0, Math.ceil(SEGUNDOS - transcurrido));
    if (elTiempo.textContent !== String(resto)) elTiempo.textContent = resto;

    proxima -= dt;
    if (proxima <= 0) { soltar(progreso); proxima = 0.62 - progreso * 0.27; }

    saco.x += (saco.objetivo - saco.x) * Math.min(1, dt * 16);
    temblor = Math.max(0, temblor - dt);

    const boca = saco.y + saco.tam * 0.32;
    for (const c of cosas) {
      c.y += c.v * dt;
      c.rot += c.vr * dt;
      if (!c.fin && c.y + c.tam * 0.3 >= boca && c.y < boca + saco.tam * 0.35 && Math.abs(c.x - saco.x) < saco.tam * 0.42) {
        c.fin = true;
        if (c.tipo === 'carbon') {
          puntos = Math.max(0, puntos - 2);
          temblor = 0.35;
          if (navigator.vibrate) navigator.vibrate(120);
          textos.push({ x: c.x, y: boca, t: '-2', color: '#3A2A22', vida: 0 });
        } else {
          puntos++;
          textos.push({ x: c.x, y: boca, t: '+1', color: '#1F9B57', vida: 0 });
        }
        elPuntos.textContent = puntos;
      }
    }
    cosas = cosas.filter(c => !c.fin && c.y < H + c.tam);
    for (const x of textos) { x.vida += dt; x.y -= 50 * dt; }
    textos = textos.filter(x => x.vida < 0.7);

    if (puntos >= OBJETIVO) return ganar();
    if (transcurrido >= SEGUNDOS) return perder();
  }

  function dibujar() {
    ctx.save();
    ctx.clearRect(0, 0, W, H);
    if (temblor > 0) ctx.translate((Math.random() - 0.5) * 12 * temblor / 0.35, 0);
    for (const c of cosas) {
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rot);
      ctx.drawImage(IMG[c.tipo], -c.tam / 2, -c.tam / 2, c.tam, c.tam);
      ctx.restore();
    }
    ctx.drawImage(IMG.saco, saco.x - saco.tam / 2, saco.y, saco.tam, saco.tam);
    ctx.font = '700 24px Fredoka, system-ui, sans-serif';
    ctx.textAlign = 'center';
    for (const x of textos) {
      ctx.globalAlpha = 1 - x.vida / 0.7;
      ctx.fillStyle = x.color;
      ctx.strokeStyle = '#FFF8EE';
      ctx.lineWidth = 4;
      ctx.strokeText(x.t, x.x, x.y);
      ctx.fillText(x.t, x.x, x.y);
    }
    ctx.restore();
  }

  function perder() {
    jugando = false;
    const msg = texto(C.azar(J.perder), { puntos, faltan: OBJETIVO - puntos });
    mostrarPanel('¡Casi!', `<p>${esc(msg)}</p>`, 'Otra vez', empezar);
  }

  function ganar() {
    jugando = false;
    ganado = true;
    if (!C.PRUEBA) { try { localStorage.setItem(CLAVE, 'ganado'); } catch (e) { /* ignorar */ } }
    verPista.hidden = false;
    cosas = []; dibujar();
    C.lanzarConfeti(W / 2, H / 3, 140);
    mostrarPanel(texto(J.ganar), htmlPista(), 'Ver mi calendario 🎄', cerrar);
  }

  abrir();
  pintarFondo();
  intro();
})();
