/* =========================================================
   Caquiviento — Juegos del día
   Los juegos (fecha, tipo, textos y premio) están en js/regalos.js (JUEGOS).
   Tipos: 'atrapa' (saco + regalos que caen) y 'memory' (parejas).
   Usa utilidades de app.js expuestas en window.CAQUI.
   Modo prueba: ?prueba=caqui&fecha=2026-11-28T20:00  (o &juego=1 para forzarlo)
   No se guarda nada: se puede jugar las veces que quiera y al recargar empieza de cero.
   ========================================================= */
(function () {
  'use strict';

  const C = window.CAQUI;
  if (!C || typeof JUEGOS === 'undefined' || !JUEGOS.length || typeof ICONOS === 'undefined') return;

  const $ = sel => document.querySelector(sel);
  const dos = n => String(n).padStart(2, '0');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const p = C.partesMadrid(C.ahora());
  const hoy = `${p.y}-${dos(p.mo)}-${dos(p.d)}`;
  const forzar = C.PRUEBA && C.params.get('juego') === '1';
  const J = JUEGOS.find(j => j.fecha === hoy) || (forzar ? JUEGOS[JUEGOS.length - 1] : null);
  if (!J) return;

  const elJuego = $('#juego');
  const elMarcador = $('#juego-marcador');
  const elPanel = $('#juego-panel');
  const elTitulo = $('#juego-titulo');
  const elCuerpo = $('#juego-cuerpo');
  const elBoton = $('#juego-boton');
  const jugarOtra = $('#jugar-otra');

  let ganado = false;
  let premioHTML = '';
  // Un mismo mote para el título de victoria y el premio de esta visita
  const moteVisita = C.rellenar('{MOTE}');
  const conMote = t => String(t || '').replace(/\{MOTE\}/g, moteVisita);

  /* ---------- Paneles comunes (intro / perder / ganar) ---------- */
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

  // El premio se genera una vez por visita (así el mote no cambia al volver a verlo)
  function htmlPremio() {
    if (!premioHTML) {
      const parrafos = C.rellenar(conMote(J.premio)).split(/\n{2,}/);
      const carta = parrafos.length > 1 ? ' carta' : '';
      premioHTML = `<div class="juego-pista${carta}">${parrafos.map(t => `<p>${esc(t).replace(/\n/g, '<br>')}</p>`).join('')}</div>`;
    }
    return premioHTML;
  }

  function abrir() {
    elJuego.hidden = false;
    elJuego.classList.remove('saliendo');
    juego.preparar();
  }
  function cerrar() {
    juego.parar();
    elJuego.classList.add('saliendo');
    setTimeout(() => { elJuego.hidden = true; elJuego.classList.remove('saliendo'); }, 450);
  }

  function intro() {
    // Si ya ha ganado en esta visita, el premio se queda visible en la intro
    const premio = ganado ? `<p class="juego-premio">${esc(J.premioTitulo || 'Tu premio')}</p>${htmlPremio()}`
      : `<p class="juego-premio">${esc(J.premioIntro || '')}</p>`;
    mostrarPanel(J.titulo, `<p>${esc(juego.texto(J.intro))}</p>${premio}`, '¡A jugar!', empezar);
  }

  function empezar() {
    elPanel.hidden = true;
    elMarcador.hidden = false;
    juego.empezar();
  }

  function perder(extra) {
    mostrarPanel('¡Casi!', `<p>${esc(juego.texto(C.azar(J.perder), extra))}</p>`, 'Otra vez', empezar);
  }

  function ganar() {
    ganado = true;
    C.lanzarConfeti(window.innerWidth / 2, window.innerHeight / 3, 140);
    mostrarPanel(juego.texto(conMote(J.ganar)), htmlPremio(), 'Ver mi calendario 🎄', cerrar);
  }

  /* =========================================================
     Tipo «atrapa»: atrapar regalos con el saco
     ========================================================= */
  function juegoAtrapa() {
    const OBJETIVO = J.objetivo || 15;
    const SEGUNDOS = J.segundos || 30;
    const lienzo = $('#juego-lienzo');
    const ctx = lienzo.getContext('2d');
    lienzo.hidden = false;
    elMarcador.innerHTML = `<span>🎁 <strong id="juego-puntos">0</strong>/${OBJETIVO}</span><span>⏱️ <strong id="juego-tiempo">${SEGUNDOS}</strong></span>`;
    const elPuntos = $('#juego-puntos');
    const elTiempo = $('#juego-tiempo');

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

    let W = 0, H = 0;
    const saco = { x: 0, objetivo: 0, y: 0, tam: 100 };
    let cosas = [], textos = [], puntos = 0, transcurrido = 0, proxima = 0, temblor = 0, jugando = false, ultimo = 0;

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

    function moverA(clientX) { saco.objetivo = Math.max(saco.tam / 2, Math.min(W - saco.tam / 2, clientX)); }
    lienzo.addEventListener('pointerdown', e => { moverA(e.clientX); });
    lienzo.addEventListener('pointermove', e => { if (jugando) moverA(e.clientX); });
    window.addEventListener('keydown', e => {
      if (!jugando) return;
      if (e.key === 'ArrowLeft') moverA(saco.objetivo - 40);
      if (e.key === 'ArrowRight') moverA(saco.objetivo + 40);
    });

    function soltar(progreso) {
      const malo = Math.random() < 0.28 + progreso * 0.16;
      const tam = Math.min(W * 0.14, 62) * (0.85 + Math.random() * 0.3);
      cosas.push({
        tipo: malo ? 'carbon' : BUENOS[Math.floor(Math.random() * BUENOS.length)],
        x: tam / 2 + Math.random() * (W - tam),
        y: -tam,
        tam,
        v: H * (0.44 + progreso * 0.38) * (0.85 + Math.random() * 0.3),
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
        if (!c.fin && c.y + c.tam * 0.3 >= boca && c.y < boca + saco.tam * 0.35 && Math.abs(c.x - saco.x) < saco.tam * 0.38) {
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

      if (puntos >= OBJETIVO) { jugando = false; cosas = []; dibujar(); return ganar(); }
      if (transcurrido >= SEGUNDOS) { jugando = false; return perder({ puntos, faltan: OBJETIVO - puntos }); }
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

    return {
      texto: (t, extra = {}) => C.rellenar(String(t)
        .replace(/\{OBJETIVO\}/g, OBJETIVO).replace(/\{SEGUNDOS\}/g, SEGUNDOS)
        .replace(/\{PUNTOS\}/g, extra.puntos ?? 0).replace(/\{FALTAN\}/g, extra.faltan ?? OBJETIVO)),
      preparar() { ajustar(); ctx.clearRect(0, 0, W, H); },
      empezar() {
        ajustar();
        cosas = []; textos = []; puntos = 0; transcurrido = 0; proxima = 0.4; temblor = 0;
        saco.x = saco.objetivo = W / 2;
        elPuntos.textContent = '0';
        elTiempo.textContent = SEGUNDOS;
        jugando = true;
        ultimo = performance.now();
        requestAnimationFrame(paso);
      },
      parar() { jugando = false; }
    };
  }

  /* =========================================================
     Tipo «memory»: encontrar las parejas (6 u 8)
     ========================================================= */
  function juegoMemory() {
    const INTENTOS = J.intentos || 18;
    const FIGURAS = ['caqui', 'regalo', 'reno', 'bola', 'muneco', 'estrella', 'jengibre', 'arbol'].slice(0, J.parejas === 8 ? 8 : 6);
    const PAREJAS = FIGURAS.length;
    const elTablero = $('#juego-memory');
    elTablero.classList.toggle('grande', PAREJAS === 8);
    elTablero.hidden = false;
    elMarcador.innerHTML = `<span>🃏 <strong id="mem-parejas">0</strong>/${PAREJAS}</span><span>Intentos <strong id="mem-intentos">0</strong>/${INTENTOS}</span>`;
    const elParejas = $('#mem-parejas');
    const elIntentos = $('#mem-intentos');

    let abiertas = [], parejas = 0, intentos = 0, bloqueado = false, activo = false;

    function barajar(lista) {
      for (let i = lista.length - 1; i > 0; i--) {
        const k = Math.floor(Math.random() * (i + 1));
        [lista[i], lista[k]] = [lista[k], lista[i]];
      }
      return lista;
    }

    function repartir() {
      elTablero.innerHTML = barajar([...FIGURAS, ...FIGURAS]).map(f => `
        <button type="button" class="mem-carta" data-figura="${f}" aria-label="Carta boca abajo">
          <span class="mem-interior">
            <span class="mem-cara mem-dorso" aria-hidden="true">${ICONOS.copo}</span>
            <span class="mem-cara mem-frente" aria-hidden="true">${ICONOS[f]}</span>
          </span>
        </button>`).join('');
    }

    elTablero.addEventListener('click', e => {
      const carta = e.target.closest('.mem-carta');
      if (!carta || !activo || bloqueado || carta.classList.contains('volteada')) return;
      carta.classList.add('volteada');
      carta.setAttribute('aria-label', 'Carta: ' + carta.dataset.figura);
      abiertas.push(carta);
      if (abiertas.length < 2) return;

      intentos++;
      elIntentos.textContent = intentos;
      const [a, b] = abiertas;
      abiertas = [];
      if (a.dataset.figura === b.dataset.figura) {
        a.classList.add('acertada'); b.classList.add('acertada');
        parejas++;
        elParejas.textContent = parejas;
        if (parejas === PAREJAS) { activo = false; setTimeout(ganar, 600); return; }
      } else {
        bloqueado = true;
        setTimeout(() => {
          [a, b].forEach(c => { c.classList.remove('volteada'); c.setAttribute('aria-label', 'Carta boca abajo'); });
          bloqueado = false;
        }, 800);
      }
      if (intentos >= INTENTOS && parejas < PAREJAS) {
        activo = false;
        setTimeout(() => perder({ parejas }), 900);
      }
    });

    return {
      texto: (t, extra = {}) => C.rellenar(String(t)
        .replace(/\{INTENTOS\}/g, INTENTOS).replace(/\{TOTAL\}/g, PAREJAS).replace(/\{PAREJAS\}/g, extra.parejas ?? 0)),
      preparar() { if (!elTablero.children.length) repartir(); },
      empezar() {
        abiertas = []; parejas = 0; intentos = 0; bloqueado = false; activo = true;
        elParejas.textContent = '0';
        elIntentos.textContent = '0';
        repartir();
      },
      parar() { activo = false; }
    };
  }

  const juego = J.tipo === 'memory' ? juegoMemory() : juegoAtrapa();

  // Botón «Jugar otra vez» en la tarjeta de espera (todo el día del juego)
  jugarOtra.hidden = false;
  jugarOtra.addEventListener('click', () => { abrir(); intro(); });

  abrir();
  intro();
})();
