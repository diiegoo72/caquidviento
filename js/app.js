/* =========================================================
   Caquiviento — lógica del calendario
   (Los regalos se editan en js/regalos.js, no aquí.)
   ========================================================= */
(function () {
  'use strict';

  const ANIO = 2026;
  const ZONA = 'Europe/Madrid';
  const CLAVE = 'caquiviento-abiertas';
  const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------------------------------------------------------
     Distribución de la rejilla (4 columnas). c = columna, f = fila,
     w/h = ancho/alto en celdas. num: posición del número.
     ilus: ilustración (ver iconos.js). patron: fondo sutil.
     --------------------------------------------------------- */
  const LAYOUT = [
    { dia: 14, c: 1, f: 1,  w: 2, h: 1, color: 'verde', num: 'der',  ilus: 'guirnalda', pos: 'abajo' },
    { dia: 3,  c: 3, f: 1,  w: 1, h: 2, color: 'rosa',  num: 'izq',  ilus: 'calcetines', pos: 'abajo-centro' },
    { dia: 9,  c: 4, f: 1,  w: 1, h: 1, color: 'crema', num: 'izq',  ilus: 'copo', pos: 'abajo-der', ilusColor: '#E58787' },
    { dia: 21, c: 1, f: 2,  w: 1, h: 1, color: 'rosa',  num: 'centro', numColor: 'rojo' },
    { dia: 6,  c: 2, f: 2,  w: 1, h: 1, color: 'crema', num: 'centro' },
    { dia: 17, c: 4, f: 2,  w: 1, h: 1, color: 'verde', num: 'centro', patron: 'arbolitos' },
    { dia: 1,  c: 1, f: 3,  w: 1, h: 2, color: 'crema', num: 'izq',  ilus: 'arbol', pos: 'abajo-centro' },
    { dia: 19, c: 2, f: 3,  w: 2, h: 1, color: 'verde', num: 'centro', patron: 'acebo' },
    { dia: 11, c: 4, f: 3,  w: 1, h: 2, color: 'rosa',  num: 'izq',  numColor: 'rojo', ilus: 'reno', pos: 'abajo-centro' },
    { dia: 8,  c: 2, f: 4,  w: 1, h: 1, color: 'rosa',  num: 'izq',  ilus: 'lazo', pos: 'abajo-der' },
    { dia: 24, c: 3, f: 4,  w: 1, h: 1, color: 'crema', num: 'izq',  ilus: 'regalo', pos: 'abajo-der' },
    { dia: 12, c: 1, f: 5,  w: 2, h: 2, color: 'verde', num: 'izq',  ilus: 'jengibre', pos: 'grande' },
    { dia: 5,  c: 3, f: 5,  w: 1, h: 1, color: 'rosa',  num: 'centro', numColor: 'rojo', patron: 'arbolitos' },
    { dia: 16, c: 4, f: 5,  w: 1, h: 1, color: 'verde', num: 'izq',  ilus: 'estrella', pos: 'abajo-der' },
    { dia: 22, c: 3, f: 6,  w: 2, h: 1, color: 'crema', num: 'lado', ilus: 'acebo', pos: 'der' },
    { dia: 2,  c: 1, f: 7,  w: 1, h: 1, color: 'crema', num: 'centro' },
    { dia: 7,  c: 2, f: 7,  w: 2, h: 1, color: 'rosa',  num: 'centro', patron: 'acebo' },
    { dia: 13, c: 4, f: 7,  w: 1, h: 2, color: 'verde', num: 'izq',  ilus: 'bola', pos: 'abajo-centro' },
    { dia: 18, c: 1, f: 8,  w: 2, h: 1, color: 'verde', num: 'centro', patron: 'arbolitos' },
    { dia: 10, c: 3, f: 8,  w: 1, h: 1, color: 'crema', num: 'izq',  ilus: 'baston', pos: 'abajo-der' },
    { dia: 4,  c: 1, f: 9,  w: 1, h: 1, color: 'crema', num: 'centro', patron: 'copos' },
    { dia: 20, c: 2, f: 9,  w: 1, h: 2, color: 'rosa',  num: 'izq',  numColor: 'rojo', ilus: 'muneco', pos: 'abajo-centro' },
    { dia: 15, c: 3, f: 9,  w: 2, h: 2, color: 'rosa',  num: 'izq',  ilus: 'corona', pos: 'grande', patron: 'arbolitos' },
    { dia: 23, c: 1, f: 10, w: 1, h: 1, color: 'verde', num: 'izq',  ilus: 'copo', pos: 'abajo-der', ilusColor: '#F3E5CF' },
    { dia: 25, c: 1, f: 11, w: 4, h: 2, color: 'verde', especial: true, ilus: 'lazo', patron: 'arbolitos' }
  ];

  const TONO_PATRON = { rosa: '#E28383', crema: '#E0C8A2', verde: '#15824A' };
  const ASOMAN = ['corazon', 'estrellaAsoma', 'lazo'];

  /* =========================================================
     Hora de España
     ========================================================= */
  const fmtMadrid = new Intl.DateTimeFormat('en-US', {
    timeZone: ZONA, hourCycle: 'h23',
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric'
  });

  function partesMadrid(ms) {
    const p = {};
    for (const { type, value } of fmtMadrid.formatToParts(new Date(ms))) p[type] = +value;
    return { y: p.year, mo: p.month, d: p.day, h: p.hour % 24, mi: p.minute, s: p.second };
  }

  // Instante (ms UTC) en que en Madrid son las y-mo-d h:mi
  function instanteMadrid(y, mo, d, h = 0, mi = 0, s = 0) {
    const objetivo = Date.UTC(y, mo - 1, d, h, mi, s);
    let t = objetivo;
    for (let i = 0; i < 3; i++) {
      const p = partesMadrid(t);
      const visto = Date.UTC(p.y, p.mo - 1, p.d, p.h, p.mi, p.s);
      if (visto === objetivo) break;
      t += objetivo - visto;
    }
    return t;
  }

  // DESBLOQUEO[n] = momento en que se abre el día n
  const DESBLOQUEO = [];
  for (let n = 1; n <= 26; n++) DESBLOQUEO[n] = instanteMadrid(ANIO, 12, n);

  /* =========================================================
     Modo prueba  (?prueba=caqui&fecha=2026-12-05T10:00)
     ========================================================= */
  const params = new URLSearchParams(location.search);
  const PRUEBA = params.get('prueba') === 'caqui';
  let desfase = 0;

  if (PRUEBA) {
    const f = params.get('fecha');
    const m = f && f.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
    if (m) {
      const simulado = instanteMadrid(+m[1], +m[2], +m[3], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0));
      desfase = simulado - Date.now();
    }
    if (params.get('reset') === '1') {
      try { localStorage.removeItem(CLAVE); } catch (e) { /* sin almacenamiento */ }
    }
  }
  const ahora = () => Date.now() + desfase;

  /* =========================================================
     Casillas abiertas (localStorage; en prueba solo en memoria)
     ========================================================= */
  const abiertas = new Set();
  if (PRUEBA) {
    (params.get('abiertas') || '').split(',').map(Number).filter(n => n >= 1 && n <= 25).forEach(n => abiertas.add(n));
  } else {
    try {
      const guardado = JSON.parse(localStorage.getItem(CLAVE) || '[]');
      if (Array.isArray(guardado)) guardado.forEach(n => abiertas.add(+n));
    } catch (e) { /* ignorar */ }
  }
  function marcarAbierta(dia) {
    abiertas.add(dia);
    if (PRUEBA) return;
    try { localStorage.setItem(CLAVE, JSON.stringify([...abiertas])); } catch (e) { /* ignorar */ }
  }

  /* =========================================================
     Utilidades
     ========================================================= */
  const $ = sel => document.querySelector(sel);
  const dos = n => String(n).padStart(2, '0');
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const parrafos = t => esc(t).split(/\n{2,}/).map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
  const azar = lista => lista[Math.floor(Math.random() * lista.length)];
  const moteAlAzar = () => (typeof MOTES !== 'undefined' && MOTES.length ? azar(MOTES) : 'Caqui');
  // Sustituye {MOTE} y pega el emoji final a la palabra anterior (que no se quede solo en una línea)
  const rellenar = texto => texto.replace(/\{MOTE\}/g, () => moteAlAzar()).replace(/ (\S+)$/, ' $1');

  function partirTiempo(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    return { d: Math.floor(s / 86400), h: Math.floor(s / 3600) % 24, m: Math.floor(s / 60) % 60, s: s % 60, totalH: Math.floor(s / 3600) };
  }

  /* =========================================================
     Construcción del calendario
     ========================================================= */
  const rejilla = $('#calendario');
  const casillas = new Map();

  function crearCasilla(cfg) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `casilla c-${cfg.color}${cfg.especial ? ' especial' : ''}`;
    b.dataset.dia = cfg.dia;
    b.dataset.tam = `${cfg.w}x${cfg.h}`;
    b.style.gridColumn = `${cfg.c} / span ${cfg.w}`;
    b.style.gridRow = `${cfg.f} / span ${cfg.h}`;

    const patron = cfg.patron
      ? `<span class="patron" style="background-image:${window.patronCSS(cfg.patron, TONO_PATRON[cfg.color])}"></span>` : '';
    const ilus = cfg.ilus
      ? `<span class="ilus ${cfg.pos || ''}"${cfg.ilusColor ? ` style="color:${cfg.ilusColor}"` : ''}>${ICONOS[cfg.ilus]}</span>` : '';

    let asoma, extra = '';
    if (cfg.especial) {
      asoma = `<span class="asoma doble">${ICONOS.corazon}${ICONOS.estrellaAsoma}${ICONOS.corazon}</span>`;
      const pos = [[38, 14], [55, 72], [30, 60], [48, 30], [92, 82]];
      extra = `<span class="navidad">¡Navidad!</span><span class="chispas">${pos.map(([x, y], i) =>
        `<i style="left:${x}%;top:${y}%;animation-delay:${i * -0.5}s">${ICONOS.destello}</i>`).join('')}</span>`;
    } else {
      asoma = `<span class="asoma">${ICONOS[ASOMAN[cfg.dia % ASOMAN.length]]}</span>`;
    }

    b.innerHTML = `
      <span class="interior" aria-hidden="true">${asoma}</span>
      <span class="tapa" aria-hidden="true">${patron}${ilus}${extra}
        <span class="num ${cfg.num || ''}${cfg.numColor ? ' n-' + cfg.numColor : ''}">${cfg.dia}</span>
      </span>
      <span class="destello" aria-hidden="true">${ICONOS.destello}</span>
      <span class="etiqueta-hoy" aria-hidden="true">¡Hoy!</span>`;
    return b;
  }

  LAYOUT.slice().sort((a, b) => a.f - b.f || a.c - b.c).forEach(cfg => {
    const b = crearCasilla(cfg);
    casillas.set(cfg.dia, b);
    rejilla.appendChild(b);
  });

  /* =========================================================
     Estado y reloj
     ========================================================= */
  const estado = { fase: null, n: -1 };
  const elProxima = $('#proxima');
  const elEspera = $('#espera');
  const elFinal = $('#final');
  const elPrueba = $('#etiqueta-prueba');
  const elCuenta = { d: $('#c-dias'), h: $('#c-horas'), m: $('#c-min'), s: $('#c-seg') };

  function calcular(ms) {
    let n = 0;
    while (n < 25 && ms >= DESBLOQUEO[n + 1]) n++;
    const fase = n === 0 ? 'espera' : ms < DESBLOQUEO[26] ? 'adviento' : 'navidad';
    return { fase, n };
  }

  function aplicarEstados() {
    const { fase, n } = estado;
    casillas.forEach((b, dia) => {
      const disponible = fase !== 'espera' && dia <= n;
      const abierta = disponible && abiertas.has(dia);
      b.classList.toggle('bloqueada', !disponible);
      b.classList.toggle('disponible', disponible);
      b.classList.toggle('abierta', abierta);
      b.classList.toggle('hoy', fase === 'adviento' && dia === n && !abierta);
      b.setAttribute('aria-label', abierta ? `Día ${dia}: abierto. Ver otra vez`
        : disponible ? `Día ${dia}: disponible. Abrir sorpresa`
        : `Día ${dia}: bloqueado hasta el ${dia} de diciembre`);
      b.tabIndex = fase === 'espera' ? -1 : 0;
    });
    const mostrarFinal = fase === 'navidad' || (n === 25 && abiertas.has(25));
    elFinal.hidden = !mostrarFinal;
  }

  function cambiarFase(nueva, anterior) {
    document.body.classList.remove('fase-cargando', 'fase-espera', 'fase-adviento', 'fase-navidad');
    document.body.classList.add('fase-' + nueva);
    if (nueva === 'espera') {
      elEspera.hidden = false;
      elEspera.classList.remove('saliendo');
    } else if (anterior === 'espera') {
      // ¡Llegó el 1 de diciembre! La tarjeta se va y el calendario se enciende.
      elEspera.classList.add('saliendo');
      setTimeout(() => { elEspera.hidden = true; elEspera.classList.remove('saliendo'); }, 1000);
      setTimeout(() => lanzarConfeti(window.innerWidth / 2, window.innerHeight / 3, 120), 600);
    } else {
      elEspera.hidden = true;
    }
  }

  // Frase bajo el contador según lo que quede (solo se reescribe al cambiar de tramo)
  const elFalta = $('#espera-falta');
  let tramoFalta = '';
  function actualizarFalta(restante) {
    if (!elFalta || typeof FRASES_FALTA === 'undefined') return;
    const noches = Math.ceil(restante / 86400000);
    const tramo = restante <= 3600000 ? 'ultimaHora' : noches <= 1 ? 'unaNoche' : 'variasNoches:' + noches;
    if (tramo === tramoFalta) return;
    tramoFalta = tramo;
    elFalta.textContent = rellenar(FRASES_FALTA[tramo.split(':')[0]] || '').replace(/\{NOCHES\}/g, noches);
  }

  function actualizarTextos(ms) {
    const { fase, n } = estado;
    if (fase === 'espera') {
      const t = partirTiempo(DESBLOQUEO[1] - ms);
      elCuenta.d.textContent = dos(t.d);
      elCuenta.h.textContent = dos(t.h);
      elCuenta.m.textContent = dos(t.m);
      elCuenta.s.textContent = dos(t.s);
      elProxima.hidden = true;
      actualizarFalta(DESBLOQUEO[1] - ms);
    } else if (fase === 'adviento') {
      elProxima.hidden = false;
      if (n < 25) {
        const t = partirTiempo(DESBLOQUEO[n + 1] - ms);
        elProxima.innerHTML = `✨ Próxima sorpresa en <strong>${dos(t.totalH)}:${dos(t.m)}:${dos(t.s)}</strong>`;
      } else {
        elProxima.innerHTML = abiertas.has(25) ? '🎄 ¡Feliz Navidad, Caqui!' : '🎄 ¡Hoy es Navidad! Abre tu última sorpresa';
      }
    } else {
      elProxima.hidden = true;
    }
    if (PRUEBA) {
      const p = partesMadrid(ms);
      elPrueba.hidden = false;
      elPrueba.textContent = `MODO PRUEBA · ${dos(p.d)}/${dos(p.mo)}/${p.y} ${dos(p.h)}:${dos(p.mi)}:${dos(p.s)}`;
    }
  }

  function tick() {
    const ms = ahora();
    const nuevo = calcular(ms);
    if (nuevo.fase !== estado.fase || nuevo.n !== estado.n) {
      const anterior = estado.fase;
      estado.fase = nuevo.fase;
      estado.n = nuevo.n;
      if (nuevo.fase !== anterior) cambiarFase(nuevo.fase, anterior);
      aplicarEstados();
    }
    actualizarTextos(ms);
  }

  function bucle() {
    tick();
    setTimeout(bucle, 1000 - (ahora() % 1000) + 15);
  }

  document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });

  /* =========================================================
     Interacción con las casillas
     ========================================================= */
  let abriendo = false;
  let ultimoMensaje = -1;

  rejilla.addEventListener('click', e => {
    const b = e.target.closest('.casilla');
    if (!b || estado.fase === 'espera' || abriendo) return;
    const dia = +b.dataset.dia;
    if (!b.classList.contains('disponible')) return casillaBloqueada(b, dia);
    abrirCasilla(b, dia);
  });

  function casillaBloqueada(b, dia) {
    b.classList.remove('tiembla');
    void b.offsetWidth; // reinicia la animación
    b.classList.add('tiembla');
    setTimeout(() => b.classList.remove('tiembla'), 550);
    let i;
    do { i = Math.floor(Math.random() * MENSAJES_BLOQUEO.length); } while (i === ultimoMensaje && MENSAJES_BLOQUEO.length > 1);
    ultimoMensaje = i;
    mostrarToast(MENSAJES_BLOQUEO[i].replace(/\{N\}/g, dia).replace(/\{MOTE\}/g, () => moteAlAzar()));
    if (navigator.vibrate) { try { navigator.vibrate(40); } catch (e) { /* nada */ } }
  }

  function abrirCasilla(b, dia) {
    const yaAbierta = abiertas.has(dia);
    if (yaAbierta) {
      if (!movimientoReducido.matches) {
        b.classList.add('bota');
        setTimeout(() => b.classList.remove('bota'), 350);
      }
      mostrarRegalo(dia, b);
      return;
    }
    if (movimientoReducido.matches) {
      marcarAbierta(dia);
      aplicarEstados();
      mostrarRegalo(dia, b);
      return;
    }
    abriendo = true;
    b.classList.add('abriendo');
    const r = b.getBoundingClientRect();
    setTimeout(() => lanzarConfeti(r.left + r.width / 2, r.top + r.height / 3, dia === 25 ? 160 : 70), 280);
    setTimeout(() => {
      marcarAbierta(dia);
      aplicarEstados();
      b.classList.remove('abriendo');
      actualizarTextos(ahora());
      mostrarRegalo(dia, b);
      abriendo = false;
    }, 820);
  }

  /* =========================================================
     Toast
     ========================================================= */
  const elToast = $('#toast');
  let temporizadorToast;
  function mostrarToast(texto) {
    elToast.textContent = texto;
    elToast.classList.add('visible');
    clearTimeout(temporizadorToast);
    temporizadorToast = setTimeout(() => elToast.classList.remove('visible'), 2800);
  }

  /* =========================================================
     Modal del regalo
     ========================================================= */
  const elModal = $('#modal');
  const elHoja = elModal.querySelector('.modal-hoja');
  const elContenido = $('#modal-contenido');
  elModal.querySelector('.modal-cerrar').innerHTML = ICONOS.cerrar;
  let focoPrevio = null;

  function urlSpotify(url) {
    const m = String(url).match(/open\.spotify\.com\/(?:intl-[a-z]+\/)?(track|album|playlist|episode|show)\/([A-Za-z0-9]+)/);
    return m ? { embed: `https://open.spotify.com/embed/${m[1]}/${m[2]}?utm_source=generator`, tipo: m[1] } : null;
  }
  function idYoutube(v) {
    const s = String(v).trim();
    const m = s.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : s;
  }

  const bloqueFoto = r => `
    <figure class="polaroid cinta">
      <img src="${esc(r.imagen)}" alt="${esc(r.pie || r.titulo || 'Foto')}" loading="lazy"
        onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'sin-medio',innerHTML:'<span class=grande>📷</span>Aquí irá una foto'}))">
      ${r.pie ? `<figcaption>${esc(r.pie)}</figcaption>` : ''}
    </figure>`;

  function bloqueSpotify(url) {
    const s = urlSpotify(url);
    if (!s) return '';
    const alto = s.tipo === 'track' || s.tipo === 'episode' ? 152 : 352;
    return `<div class="marco-spotify"><iframe src="${s.embed}" style="height:${alto}px" loading="lazy" title="Canción en Spotify"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe></div>
      <a class="enlace-ext" href="${esc(url)}" target="_blank" rel="noopener">Abrir en Spotify ↗</a>`;
  }

  function bloqueVideo(r) {
    if (r.youtube) {
      return `<div class="marco-video"><iframe src="https://www.youtube-nocookie.com/embed/${esc(idYoutube(r.youtube))}?rel=0&playsinline=1"
        title="Vídeo" loading="lazy" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`;
    }
    if (r.video) {
      return `<div class="marco-video"><video src="${esc(r.video)}" controls playsinline preload="metadata"></video></div>`;
    }
    return '';
  }

  const firma = (antes = 'Con cariño,') => `<p class="firma"><span>${antes}</span><b>Diego</b></p>`;

  function htmlRegalo(r) {
    const titulo = `<h2 class="regalo-titulo" id="modal-titulo">${esc(r.titulo)}</h2>`;
    const texto = r.texto ? `<div class="texto parrafos">${parrafos(r.texto)}</div>` : '';
    let principal = '';

    switch (r.tipo) {
      case 'vale':
        principal = `<div class="vale"><span class="vale-borde"></span>
          <div class="vale-cabecera"><span>Vale</span><span class="serie">Nº ${dos(r.dia)}/25</span></div>
          ${titulo}${texto}
          ${r.condiciones ? `<p class="vale-condiciones">${esc(r.condiciones)}</p>` : ''}
          ${firma('Firmado:')}</div>`;
        break;
      case 'invitacion': {
        const det = [['📅', r.fecha], ['🕘', r.hora], ['📍', r.lugar]].filter(x => x[1])
          .map(([i, v]) => `<div><dt aria-hidden="true">${i}</dt><dd>${esc(v)}</dd></div>`).join('');
        principal = `<div class="invitacion"><p class="inv-antetitulo">Estás invitada</p>${titulo}
          ${det ? `<dl class="inv-detalles">${det}</dl>` : ''}${texto}${firma('Te espera,')}</div>`;
        break;
      }
      case 'foto':
        principal = `${titulo}${r.imagen ? bloqueFoto(r) : ''}${texto}`;
        break;
      case 'carta':
        principal = `<div class="carta">${titulo}${texto}${firma('Tuyo,')}</div>`;
        break;
      case 'cancion':
        principal = `<div class="cancion-cabecera"><span class="disco" aria-hidden="true"></span>${titulo}</div>${texto}${r.spotify ? bloqueSpotify(r.spotify) : ''}`;
        break;
      case 'video':
        principal = `${titulo}${texto}${bloqueVideo(r) || ''}`;
        break;
      default:
        principal = `${titulo}${texto}`;
    }

    // Extras combinables
    let extras = '';
    if (r.imagen && r.tipo !== 'foto') extras += bloqueFoto(r);
    if (r.spotify && r.tipo !== 'cancion') extras += bloqueSpotify(r.spotify);
    if ((r.video || r.youtube) && r.tipo !== 'video') extras += bloqueVideo(r);

    return `<p class="chip-dia">Día ${r.dia} de diciembre</p><div class="regalo regalo-${esc(r.tipo)}">${principal}${extras}</div>`;
  }

  function htmlEspecial(r) {
    const pos = [[8, 20], [86, 14], [16, 70], [80, 64], [50, 4]];
    return `<div class="especial-cabecera">
        <span class="estrellitas">${pos.map(([x, y], i) => `<i style="left:${x}%;top:${y}%;animation-delay:${i * -0.4}s">${ICONOS.destello}</i>`).join('')}</span>
        <div class="lazo-grande" aria-hidden="true">${ICONOS.lazo}</div>
        <p class="chip-dia">Día 25 · Navidad</p>
        <h2 class="regalo-titulo" id="modal-titulo">${esc(r.titulo)}</h2>
      </div>
      <div class="regalo">
        ${r.texto ? `<div class="texto parrafos">${parrafos(r.texto)}</div>` : ''}
        ${bloqueVideo(r)}
        ${r.imagen ? bloqueFoto(r) : ''}
        ${r.spotify ? bloqueSpotify(r.spotify) : ''}
        ${firma('Te quiere,')}
      </div>`;
  }

  function mostrarRegalo(dia, origen) {
    const r = (window.REGALOS || REGALOS).find(x => +x.dia === dia) ||
      { dia, tipo: 'carta', titulo: 'Sorpresa', texto: 'Aquí irá tu sorpresa del día ' + dia + '.' };
    r.dia = dia;
    const especial = dia === 25;
    elContenido.innerHTML = especial ? htmlEspecial(r) : htmlRegalo(r);
    elHoja.classList.toggle('especial', especial);

    // Si el vídeo local no existe, mostramos un aviso bonito
    elContenido.querySelectorAll('video').forEach(v => v.addEventListener('error', () => {
      v.parentElement.outerHTML = `<div class="sin-medio"><span class="grande">🎬</span>Aquí irá el vídeo<br><small>(${esc(v.getAttribute('src'))})</small></div>`;
    }, { once: true }));

    focoPrevio = origen || document.activeElement;
    elModal.hidden = false;
    document.body.classList.add('modal-abierto');
    elHoja.scrollTop = 0;
    requestAnimationFrame(() => requestAnimationFrame(() => elModal.classList.add('visible')));
    elHoja.focus({ preventScroll: true });
  }

  function cerrarModal() {
    if (elModal.hidden) return;
    elModal.classList.remove('visible');
    document.body.classList.remove('modal-abierto');
    setTimeout(() => {
      elModal.hidden = true;
      elContenido.innerHTML = ''; // para vídeos y canciones
    }, movimientoReducido.matches ? 0 : 380);
    if (focoPrevio && focoPrevio.focus) focoPrevio.focus({ preventScroll: true });
  }

  elModal.addEventListener('click', e => { if (e.target.closest('[data-cerrar]')) cerrarModal(); });
  document.addEventListener('keydown', e => {
    if (elModal.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); cerrarModal(); return; }
    if (e.key === 'Tab') {
      const foc = [...elHoja.querySelectorAll('button, a[href], iframe, video[controls], [tabindex]:not([tabindex="-1"])')]
        .filter(el => el.offsetParent !== null);
      if (!foc.length) return;
      const primero = foc[0], ultimo = foc[foc.length - 1];
      if (e.shiftKey && (document.activeElement === primero || document.activeElement === elHoja)) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    }
  });

  /* =========================================================
     Confeti
     ========================================================= */
  const cvConfeti = $('#confeti');
  const ctxC = cvConfeti.getContext('2d');
  let piezas = [], animandoConfeti = false;
  const COLORES = ['#F3E5CF', '#F2A3A3', '#1F9B57', '#E8B64C', '#F6D57A', '#FFFFFF', '#C0393B'];

  function ajustarCanvas(cv, ctx) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(window.innerWidth * dpr);
    cv.height = Math.round(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function lanzarConfeti(x, y, cantidad) {
    if (movimientoReducido.matches) return;
    ajustarCanvas(cvConfeti, ctxC);
    for (let i = 0; i < cantidad; i++) {
      const ang = Math.random() * Math.PI * 2;
      const vel = 3 + Math.random() * 7;
      piezas.push({
        x, y,
        vx: Math.cos(ang) * vel,
        vy: Math.sin(ang) * vel - 5,
        r: Math.random() * Math.PI,
        vr: (Math.random() - .5) * .3,
        w: 5 + Math.random() * 6,
        h: 3 + Math.random() * 5,
        c: azar(COLORES),
        forma: Math.random() < .25 ? 'estrella' : Math.random() < .5 ? 'circulo' : 'rect',
        vida: 0
      });
    }
    if (!animandoConfeti) { animandoConfeti = true; requestAnimationFrame(pasoConfeti); }
  }

  function pasoConfeti() {
    ctxC.clearRect(0, 0, window.innerWidth, window.innerHeight);
    piezas = piezas.filter(p => p.vida < 170 && p.y < window.innerHeight + 30);
    for (const p of piezas) {
      p.vida++;
      p.vy += 0.22;
      p.vx *= 0.985;
      p.vy *= 0.985;
      p.x += p.vx + Math.sin(p.vida / 9) * 0.6;
      p.y += p.vy;
      p.r += p.vr;
      ctxC.save();
      ctxC.globalAlpha = Math.min(1, (170 - p.vida) / 40);
      ctxC.translate(p.x, p.y);
      ctxC.rotate(p.r);
      ctxC.fillStyle = p.c;
      if (p.forma === 'circulo') { ctxC.beginPath(); ctxC.arc(0, 0, p.w / 2.4, 0, Math.PI * 2); ctxC.fill(); }
      else if (p.forma === 'estrella') { dibujarEstrella(ctxC, p.w * .9); }
      else ctxC.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctxC.restore();
    }
    if (piezas.length) requestAnimationFrame(pasoConfeti);
    else { animandoConfeti = false; ctxC.clearRect(0, 0, window.innerWidth, window.innerHeight); }
  }

  function dibujarEstrella(ctx, r) {
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const rr = i % 2 ? r * .35 : r;
      const a = i * Math.PI / 4;
      ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
    }
    ctx.closePath();
    ctx.fill();
  }

  /* =========================================================
     Nieve
     ========================================================= */
  const cvNieve = $('#nieve');
  const ctxN = cvNieve.getContext('2d');
  let copos = [], nieveActiva = false;

  function iniciarNieve() {
    ajustarCanvas(cvNieve, ctxN);
    const cantidad = Math.round(Math.min(70, Math.max(30, window.innerWidth * window.innerHeight / 9000)));
    copos = Array.from({ length: cantidad }, () => nuevoCopo(true));
    if (movimientoReducido.matches) { dibujarNieve(); return; }
    if (!nieveActiva) { nieveActiva = true; requestAnimationFrame(pasoNieve); }
  }
  function nuevoCopo(inicio) {
    return {
      x: Math.random() * window.innerWidth,
      y: inicio ? Math.random() * window.innerHeight : -10,
      r: 1 + Math.random() * 2.6,
      v: .3 + Math.random() * .8,
      fase: Math.random() * Math.PI * 2,
      a: .35 + Math.random() * .5
    };
  }
  function dibujarNieve() {
    ctxN.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctxN.fillStyle = '#FFFFFF';
    for (const c of copos) {
      ctxN.globalAlpha = c.a;
      ctxN.beginPath();
      ctxN.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctxN.fill();
    }
    ctxN.globalAlpha = 1;
  }
  function pasoNieve() {
    if (document.hidden || movimientoReducido.matches) { nieveActiva = false; return; }
    for (const c of copos) {
      c.fase += 0.012;
      c.y += c.v * (0.6 + c.r / 3);
      c.x += Math.sin(c.fase) * 0.35;
      if (c.y > window.innerHeight + 6) Object.assign(c, nuevoCopo(false));
    }
    dibujarNieve();
    requestAnimationFrame(pasoNieve);
  }
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !nieveActiva && !movimientoReducido.matches) { nieveActiva = true; requestAnimationFrame(pasoNieve); }
  });
  let temporizadorResize;
  window.addEventListener('resize', () => {
    clearTimeout(temporizadorResize);
    temporizadorResize = setTimeout(iniciarNieve, 200);
  });

  /* =========================================================
     Música: assets/musica.mp3 o, si no existe, "Noche de paz"
     en caja de música con Web Audio.
     ========================================================= */
  const btnMusica = $('#musica');
  btnMusica.innerHTML = ICONOS.nota;
  let musica = null; // { play(), stop() }
  let sonando = false;

  async function prepararMusica() {
    try {
      const r = await fetch('assets/musica.mp3', { method: 'HEAD', cache: 'no-store' });
      if (r.ok && !(r.headers.get('content-type') || '').includes('text/html')) {
        const audio = new Audio('assets/musica.mp3');
        audio.loop = true;
        audio.volume = 0.35;
        return { play: () => audio.play(), stop: () => audio.pause() };
      }
    } catch (e) { /* sin archivo: usamos la caja de música */ }
    return cajaDeMusica();
  }

  function cajaDeMusica() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    const ctx = new AC();
    const maestro = ctx.createGain();
    maestro.gain.value = 0.09;
    maestro.connect(ctx.destination);

    // Noche de paz (6/8). [nota, duración en corcheas]
    const N = { C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46 };
    const melodia = [
      ['G4', 3], ['A4', 1], ['G4', 2], ['E4', 6],
      ['G4', 3], ['A4', 1], ['G4', 2], ['E4', 6],
      ['D5', 4], ['D5', 2], ['B4', 6],
      ['C5', 4], ['C5', 2], ['G4', 6],
      ['A4', 4], ['A4', 2], ['C5', 3], ['B4', 1], ['A4', 2],
      ['G4', 3], ['A4', 1], ['G4', 2], ['E4', 6],
      ['A4', 4], ['A4', 2], ['C5', 3], ['B4', 1], ['A4', 2],
      ['G4', 3], ['A4', 1], ['G4', 2], ['E4', 6],
      ['D5', 4], ['D5', 2], ['F5', 3], ['D5', 1], ['B4', 2],
      ['C5', 6], ['E5', 6],
      ['C5', 3], ['G4', 1], ['E4', 2], ['G4', 3], ['F4', 1], ['D4', 2],
      ['C4', 12], [null, 6]
    ];
    // Bajo suave, una nota por compás (6 corcheas)
    const bajos = [131, 131, 131, 131, 98, 98, 131, 131, 175, 175, 131, 131, 175, 175, 131, 131, 98, 98, 131, 131, 131, 98, 131, 131];
    const CORCHEA = 0.27;

    function nota(f, t, dur, vol) {
      [[1, 1], [2, .25], [3, .08]].forEach(([mult, g]) => {
        const o = ctx.createOscillator();
        const env = ctx.createGain();
        o.type = mult === 1 ? 'triangle' : 'sine';
        o.frequency.value = f * mult;
        env.gain.setValueAtTime(0, t);
        env.gain.linearRampToValueAtTime(vol * g, t + 0.012);
        env.gain.exponentialRampToValueAtTime(0.0008, t + Math.max(dur, 0.4) + 1.1);
        o.connect(env).connect(maestro);
        o.start(t);
        o.stop(t + Math.max(dur, 0.4) + 1.2);
      });
    }

    let siguiente = 0, indice = 0, compas = 0, corcheasCompas = 0, temporizador = null;
    function programar() {
      while (siguiente < ctx.currentTime + 1.2) {
        const [n, d] = melodia[indice];
        if (corcheasCompas === 0) nota(bajos[compas % bajos.length], siguiente, CORCHEA * 6, 0.5);
        if (n) nota(N[n], siguiente, d * CORCHEA, 0.9);
        siguiente += d * CORCHEA;
        corcheasCompas += d;
        while (corcheasCompas >= 6) { corcheasCompas -= 6; compas++; }
        indice = (indice + 1) % melodia.length;
        if (indice === 0) { compas = 0; corcheasCompas = 0; }
      }
    }
    return {
      play() {
        ctx.resume();
        siguiente = ctx.currentTime + 0.1;
        maestro.gain.cancelScheduledValues(ctx.currentTime);
        maestro.gain.setValueAtTime(0.09, ctx.currentTime);
        programar();
        temporizador = setInterval(programar, 300);
      },
      stop() {
        clearInterval(temporizador);
        maestro.gain.setTargetAtTime(0, ctx.currentTime, 0.15);
        indice = 0; compas = 0; corcheasCompas = 0;
      }
    };
  }

  btnMusica.addEventListener('click', async () => {
    if (!musica) musica = await prepararMusica();
    if (!musica) { mostrarToast('Este navegador no puede reproducir música 😢'); return; }
    sonando = !sonando;
    try { sonando ? await musica.play() : musica.stop(); } catch (e) { sonando = false; }
    btnMusica.classList.toggle('sonando', sonando);
    btnMusica.setAttribute('aria-pressed', String(sonando));
    btnMusica.setAttribute('aria-label', sonando ? 'Silenciar música' : 'Activar música');
    if (sonando) { const aviso = $('#espera-musica'); if (aviso) aviso.hidden = true; }
  });

  /* =========================================================
     Arranque
     ========================================================= */
  // Saludo de la pantalla de espera con un mote al azar, siempre en una línea
  const elMote = $('#mote-saludo');
  const elSaludo = $('#espera-titulo');
  function ajustarSaludo() {
    if (!elSaludo || elEspera.hidden) return;
    let px = parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.7;
    elSaludo.style.fontSize = px + 'px';
    while (elSaludo.scrollWidth > elSaludo.clientWidth && px > 24) {
      px -= 1;
      elSaludo.style.fontSize = px + 'px';
    }
  }
  if (elMote) {
    elMote.textContent = moteAlAzar();
    // Secreto: tocar el mote lo cambia por otro distinto
    elMote.addEventListener('click', () => {
      if (typeof MOTES === 'undefined' || MOTES.length < 2) return;
      const otros = MOTES.filter(m => m !== elMote.textContent);
      elMote.textContent = azar(otros);
      ajustarSaludo();
      elMote.classList.remove('salta');
      void elMote.offsetWidth;
      elMote.classList.add('salta');
    });
  }
  if (document.fonts) document.fonts.ready.then(ajustarSaludo);
  window.addEventListener('resize', ajustarSaludo);

  // Frases que van rotando bajo el contador
  const elFrase = $('#espera-frase');
  if (elFrase && typeof FRASES_ESPERA !== 'undefined' && FRASES_ESPERA.length) {
    let ultima = -1;
    const siguienteFrase = () => {
      let i;
      do { i = Math.floor(Math.random() * FRASES_ESPERA.length); } while (FRASES_ESPERA.length > 1 && i === ultima);
      ultima = i;
      elFrase.textContent = rellenar(FRASES_ESPERA[i]);
    };
    siguienteFrase();
    setInterval(() => {
      if (elEspera.hidden || document.hidden) return;
      if (movimientoReducido.matches) { siguienteFrase(); return; }
      elFrase.classList.add('fuera');
      setTimeout(() => { siguienteFrase(); elFrase.classList.remove('fuera'); }, 500);
    }, 6000);
  }

  iniciarNieve();
  bucle();
  ajustarSaludo();

  if (PRUEBA) {
    if (params.get('reset') === '1') mostrarToast('Progreso borrado 🧹');
    const abrir = +params.get('abrir');
    if (abrir >= 1 && abrir <= 25) {
      if (estado.fase !== 'espera') { marcarAbierta(abrir); aplicarEstados(); }
      mostrarRegalo(abrir, casillas.get(abrir));
    }
  }
})();
