/* =========================================================
   Caquiviento — Ilustraciones SVG propias (planas y simples)
   Todas usan viewBox 0 0 100 100 salvo la guirnalda (200x70).
   Los que usan "currentColor" toman el color del CSS (style.color).
   ========================================================= */
(function () {
  'use strict';

  const ROJO = '#C0393B', ROJO_OSC = '#9E2A2C', VERDE = '#1F9B57', VERDE_OSC = '#157A43',
        CREMA = '#F3E5CF', BLANCO = '#FFF8EE', ORO = '#E8B64C', ORO_OSC = '#C9952F',
        MARRON = '#B8743F', MARRON_OSC = '#8A5A33', ROSA = '#F2A3A3';

  const svg = (contenido, vb = '0 0 100 100') =>
    `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">${contenido}</svg>`;

  // Estrella de 5 puntas centrada en (cx, cy)
  function puntosEstrella(cx, cy, rExt, rInt) {
    const p = [];
    for (let i = 0; i < 10; i++) {
      const r = i % 2 ? rInt : rExt;
      const a = -Math.PI / 2 + i * Math.PI / 5;
      p.push((cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1));
    }
    return p.join(' ');
  }

  // Hoja de acebo (apunta hacia la izquierda desde el origen)
  const hojaAcebo = (color, extra = '') =>
    `<path ${extra} fill="${color}" d="M0 0 Q-6 -9 -14 -6 Q-17 -14 -26 -11 Q-29 -19 -40 -16 Q-36 -4 -40 6 Q-29 4 -26 12 Q-17 9 -14 16 Q-6 10 0 0Z"/>`;

  const ICONOS = {
    lazo: svg(`
      <path fill="${ROJO}" d="M50 48 C38 26 12 22 12 40 C12 56 34 58 50 48Z"/>
      <path fill="${ROJO}" d="M50 48 C62 26 88 22 88 40 C88 56 66 58 50 48Z"/>
      <path fill="${ROJO_OSC}" d="M50 48 C42 38 26 34 22 40 C30 40 40 44 50 48Z"/>
      <path fill="${ROJO_OSC}" d="M50 48 C58 38 74 34 78 40 C70 40 60 44 50 48Z"/>
      <path fill="${ROJO}" d="M47 52 L32 86 L41 82 L45 91 L54 56Z"/>
      <path fill="${ROJO_OSC}" d="M53 52 L68 86 L59 82 L55 91 L46 56Z"/>
      <circle cx="30" cy="38" r="2.4" fill="${CREMA}"/><circle cx="70" cy="38" r="2.4" fill="${CREMA}"/>
      <circle cx="22" cy="46" r="1.8" fill="${CREMA}"/><circle cx="78" cy="46" r="1.8" fill="${CREMA}"/>
      <rect x="43" y="41" width="14" height="14" rx="5" fill="${ROJO_OSC}"/>`),

    calcetines: svg(`
      <g transform="rotate(-8 34 50)">
        <path fill="${ROJO}" d="M22 24 h24 v36 l12 9 a10 10 0 0 1 -7 18 l-22 -12 a11 11 0 0 1 -7 -10z"/>
        <path fill="${BLANCO}" opacity=".9" d="M22 40 h24 v5 h-24z M22 52 h24 v5 h-24z"/>
        <rect x="18" y="12" width="32" height="14" rx="5" fill="${BLANCO}"/>
      </g>
      <g transform="rotate(10 66 50)">
        <path fill="${VERDE}" d="M54 26 h24 v36 l12 9 a10 10 0 0 1 -7 18 l-22 -12 a11 11 0 0 1 -7 -10z"/>
        <circle cx="62" cy="44" r="2.5" fill="${CREMA}"/><circle cx="71" cy="52" r="2.5" fill="${CREMA}"/>
        <circle cx="62" cy="60" r="2.5" fill="${CREMA}"/><circle cx="75" cy="66" r="2.5" fill="${CREMA}"/>
        <rect x="50" y="14" width="32" height="14" rx="5" fill="${BLANCO}"/>
      </g>
      <path d="M34 14 Q50 2 66 14" fill="none" stroke="${ORO}" stroke-width="2.5"/>`),

    jengibre: svg(`
      <g stroke="${MARRON}" stroke-width="15" stroke-linecap="round">
        <line x1="28" y1="48" x2="72" y2="48"/>
        <line x1="43" y1="64" x2="34" y2="86"/>
        <line x1="57" y1="64" x2="66" y2="86"/>
      </g>
      <ellipse cx="50" cy="57" rx="16" ry="18" fill="${MARRON}"/>
      <circle cx="50" cy="27" r="16" fill="${MARRON}"/>
      <g fill="none" stroke="${BLANCO}" stroke-width="2.4" stroke-linecap="round">
        <path d="M24 44 l2 4 l2 -4 l2 4"/><path d="M70 44 l2 4 l2 -4 l2 4" transform="translate(-4 0)"/>
        <path d="M30 84 q4 3 8 0"/><path d="M62 84 q4 3 8 0"/>
        <path d="M43 32 q7 6 14 0"/>
      </g>
      <circle cx="44" cy="24" r="2.6" fill="#3A2A22"/><circle cx="56" cy="24" r="2.6" fill="#3A2A22"/>
      <circle cx="41" cy="31" r="2.6" fill="${ROSA}" opacity=".8"/><circle cx="59" cy="31" r="2.6" fill="${ROSA}" opacity=".8"/>
      <circle cx="50" cy="50" r="3.4" fill="${ROJO}"/><circle cx="50" cy="61" r="3.4" fill="${VERDE}"/>
      <path d="M44 42 l6 3 l6 -3 v6 l-6 -3 l-6 3z" fill="${ROJO}"/>`),

    reno: svg(`
      <g fill="none" stroke="${MARRON_OSC}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M40 32 L33 12 M35.5 20 L25 16 M34 15 L37 6"/>
        <path d="M60 32 L67 12 M64.5 20 L75 16 M66 15 L63 6"/>
      </g>
      <ellipse cx="29" cy="40" rx="9" ry="5" transform="rotate(-25 29 40)" fill="${MARRON}"/>
      <ellipse cx="71" cy="40" rx="9" ry="5" transform="rotate(25 71 40)" fill="${MARRON}"/>
      <path fill="${MARRON}" d="M50 28 C66 28 72 42 70 58 C68 76 60 88 50 88 C40 88 32 76 30 58 C28 42 34 28 50 28Z"/>
      <ellipse cx="50" cy="73" rx="14" ry="12" fill="#E7C9A0"/>
      <circle cx="42" cy="52" r="3.4" fill="#3A2A22"/><circle cx="58" cy="52" r="3.4" fill="#3A2A22"/>
      <circle cx="43" cy="51" r="1" fill="#fff"/><circle cx="59" cy="51" r="1" fill="#fff"/>
      <circle cx="50" cy="66" r="7" fill="${ROJO}"/><circle cx="48" cy="64" r="2" fill="#fff" opacity=".7"/>
      <path d="M45 78 q5 4 10 0" fill="none" stroke="#3A2A22" stroke-width="2" stroke-linecap="round"/>
      <path d="M36 86 h28 l-3 8 h-22z" fill="${VERDE}"/><circle cx="50" cy="90" r="3" fill="${ORO}"/>`),

    acebo: svg(`
      <g transform="translate(50 52)">
        ${hojaAcebo(VERDE, 'transform="rotate(-20)"')}
        ${hojaAcebo(VERDE_OSC, 'transform="scale(-1 1) rotate(-20)"')}
        ${hojaAcebo(VERDE, 'transform="rotate(-95) scale(.85)"')}
      </g>
      <circle cx="46" cy="52" r="7" fill="${ROJO}"/><circle cx="56" cy="50" r="6.5" fill="${ROJO}"/>
      <circle cx="51" cy="60" r="6.5" fill="${ROJO_OSC}"/>
      <circle cx="44" cy="50" r="1.8" fill="#fff" opacity=".7"/><circle cx="54" cy="48" r="1.6" fill="#fff" opacity=".7"/>`),

    arbol: svg(`
      <rect x="44" y="76" width="12" height="14" rx="2" fill="${MARRON_OSC}"/>
      <path fill="${VERDE}" d="M50 12 L72 40 H62 L80 62 H66 L86 80 H14 L34 62 H20 L38 40 H28Z"/>
      <path fill="${VERDE_OSC}" d="M50 12 L72 40 H62 L80 62 H66 L86 80 H50Z" opacity=".35"/>
      <path d="M36 50 Q50 58 66 48 M30 70 Q50 78 72 68" fill="none" stroke="${CREMA}" stroke-width="2" stroke-dasharray="1 4" stroke-linecap="round"/>
      <circle cx="42" cy="36" r="3.2" fill="${ROJO}"/><circle cx="58" cy="54" r="3.4" fill="${ORO}"/>
      <circle cx="40" cy="60" r="3.4" fill="${CREMA}"/><circle cx="62" cy="74" r="3.4" fill="${ROJO}"/>
      <circle cx="34" cy="76" r="3" fill="${ORO}"/><circle cx="52" cy="44" r="2.6" fill="${CREMA}"/>
      <polygon points="${puntosEstrella(50, 11, 9, 4)}" fill="${ORO}"/>`),

    regalo: svg(`
      <rect x="16" y="40" width="68" height="48" rx="5" fill="${ROJO}"/>
      <rect x="12" y="30" width="76" height="16" rx="4" fill="${ROJO_OSC}"/>
      <rect x="44" y="30" width="12" height="58" fill="${VERDE}"/>
      <circle cx="28" cy="58" r="2.6" fill="${CREMA}"/><circle cx="70" cy="70" r="2.6" fill="${CREMA}"/>
      <circle cx="30" cy="78" r="2" fill="${CREMA}"/><circle cx="72" cy="54" r="2" fill="${CREMA}"/>
      <path fill="${VERDE}" d="M50 30 C42 14 26 12 28 22 C30 30 42 31 50 30Z"/>
      <path fill="${VERDE}" d="M50 30 C58 14 74 12 72 22 C70 30 58 31 50 30Z"/>
      <circle cx="50" cy="29" r="5" fill="${VERDE_OSC}"/>`),

    estrella: svg(`
      <polygon points="${puntosEstrella(50, 52, 40, 18)}" fill="${ORO}" stroke="${ORO_OSC}" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="42" cy="52" r="2.8" fill="#3A2A22"/><circle cx="58" cy="52" r="2.8" fill="#3A2A22"/>
      <path d="M45 60 q5 4 10 0" fill="none" stroke="#3A2A22" stroke-width="2" stroke-linecap="round"/>
      <circle cx="38" cy="58" r="3" fill="${ROSA}" opacity=".8"/><circle cx="62" cy="58" r="3" fill="${ROSA}" opacity=".8"/>
      <path d="M50 20 L50 30" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".6"/>`),

    copo: svg(`
      <g fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round">
        ${[0, 60, 120].map(a => `<g transform="rotate(${a} 50 50)">
          <line x1="50" y1="12" x2="50" y2="88"/>
          <path d="M40 20 L50 30 L60 20 M40 80 L50 70 L60 80"/>
        </g>`).join('')}
      </g>
      <circle cx="50" cy="50" r="6" fill="currentColor"/>`),

    bola: svg(`
      <path d="M50 6 Q58 12 50 20" fill="none" stroke="${ORO_OSC}" stroke-width="2.5"/>
      <rect x="42" y="18" width="16" height="10" rx="2" fill="${ORO}"/>
      <circle cx="50" cy="60" r="32" fill="${ROJO}"/>
      <path d="M19 52 Q50 64 81 52 L82 60 Q50 72 18 60Z" fill="${CREMA}"/>
      <path d="M22 72 Q50 82 78 72" fill="none" stroke="${ORO}" stroke-width="3" stroke-dasharray="2 5" stroke-linecap="round"/>
      <ellipse cx="38" cy="44" rx="6" ry="9" transform="rotate(30 38 44)" fill="#fff" opacity=".35"/>`),

    // Caqui (la fruta) con carita
    caqui: svg(`
      <ellipse cx="50" cy="58" rx="36" ry="31" fill="#EE7A2B"/>
      <ellipse cx="50" cy="62" rx="30" ry="24" fill="#F38A3A"/>
      <path d="M50 30 L34 22 L40 34 L26 36 L40 40 L50 44 L60 40 L74 36 L60 34 L66 22Z" fill="${VERDE}"/>
      <rect x="47.5" y="16" width="5" height="12" rx="2.5" fill="${MARRON_OSC}"/>
      <circle cx="40" cy="60" r="3" fill="#3A2A22"/><circle cx="60" cy="60" r="3" fill="#3A2A22"/>
      <path d="M44 68 q6 5 12 0" fill="none" stroke="#3A2A22" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="34" cy="67" r="4" fill="${ROSA}" opacity=".85"/><circle cx="66" cy="67" r="4" fill="${ROSA}" opacity=".85"/>
      <ellipse cx="32" cy="48" rx="5" ry="8" transform="rotate(35 32 48)" fill="#fff" opacity=".3"/>`),

    // Carbón (lo que NO hay que coger)
    carbon: svg(`
      <path d="M22 58 L30 34 L52 24 L74 32 L84 54 L74 78 L48 86 L26 78Z" fill="#2F2B2B"/>
      <path d="M30 34 L52 24 L56 44 L36 50Z" fill="#4A4444"/>
      <path d="M56 44 L74 32 L84 54 L64 60Z" fill="#3C3737"/>
      <circle cx="40" cy="62" r="3" fill="#fff"/><circle cx="60" cy="62" r="3" fill="#fff"/>
      <path d="M42 74 q8 -6 16 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M34 54 l10 3 M66 54 l-10 3" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`),

    // Saco de Papá Noel (el que maneja ella)
    saco: svg(`
      <path d="M18 40 Q14 88 30 94 H70 Q86 88 82 40Z" fill="${ROJO}"/>
      <path d="M18 40 Q14 88 30 94 H40 Q26 80 28 40Z" fill="${ROJO_OSC}" opacity=".5"/>
      <ellipse cx="50" cy="40" rx="34" ry="9" fill="${ROJO_OSC}"/>
      <ellipse cx="50" cy="38" rx="32" ry="7" fill="#5A1416"/>
      <path d="M16 40 Q50 52 84 40 L84 47 Q50 60 16 47Z" fill="${BLANCO}"/>
      <polygon points="${puntosEstrella(50, 72, 11, 5)}" fill="${ORO}"/>`),

    baston: svg(`
      <path d="M58 92 V36 a16 16 0 0 0 -32 0" fill="none" stroke="${BLANCO}" stroke-width="13" stroke-linecap="round"/>
      <path d="M58 92 V36 a16 16 0 0 0 -32 0" fill="none" stroke="${ROJO}" stroke-width="13" stroke-dasharray="7 7" stroke-linecap="butt"/>
      <path d="M50 30 l4 -5 l4 5 l-4 5z" fill="${VERDE}"/>
      <path d="M58 30 q10 -6 14 2 q-8 4 -14 -2z" fill="${VERDE}"/><circle cx="56" cy="30" r="3.4" fill="${ROJO_OSC}"/>`),

    muneco: svg(`
      <circle cx="50" cy="70" r="22" fill="${BLANCO}"/>
      <circle cx="50" cy="38" r="16" fill="${BLANCO}"/>
      <rect x="34" y="16" width="32" height="5" rx="2" fill="#3A2A22"/>
      <rect x="39" y="2" width="22" height="16" rx="3" fill="#3A2A22"/>
      <rect x="39" y="12" width="22" height="4" fill="${ROJO}"/>
      <circle cx="44" cy="35" r="2.4" fill="#3A2A22"/><circle cx="56" cy="35" r="2.4" fill="#3A2A22"/>
      <path d="M50 40 l12 3 l-12 2z" fill="#E8893A"/>
      <path d="M34 52 Q50 58 66 52 L66 58 Q50 64 34 58Z" fill="${ROJO}"/>
      <path d="M58 56 l6 14 l-7 1 l-4 -13z" fill="${ROJO_OSC}"/>
      <circle cx="50" cy="68" r="2.6" fill="#3A2A22"/><circle cx="50" cy="78" r="2.6" fill="#3A2A22"/>`),

    corona: svg(`
      <g transform="translate(50 50)">
        ${Array.from({ length: 14 }, (_, i) => {
          const a = i * (360 / 14);
          return `<g transform="rotate(${a}) translate(0 -30)">${hojaAcebo(i % 2 ? VERDE : VERDE_OSC, 'transform="rotate(90) scale(.55)"')}</g>`;
        }).join('')}
        ${[20, 75, 130, 200, 250, 310].map(a => `<circle transform="rotate(${a}) translate(0 -30)" r="4" fill="${ROJO}"/>`).join('')}
      </g>
      <path fill="${ROJO}" d="M50 80 C40 70 26 72 30 80 C34 88 44 84 50 80Z M50 80 C60 70 74 72 70 80 C66 88 56 84 50 80Z"/>
      <path fill="${ROJO_OSC}" d="M48 82 l-7 14 l5 -1 l3 3 l2 -14z M52 82 l7 14 l-5 -1 l-3 3 l-2 -14z"/>
      <circle cx="50" cy="80" r="4" fill="${ROJO_OSC}"/>`),

    // Guirnalda horizontal (para casillas anchas)
    guirnalda: svg(`
      <path d="M-5 20 Q50 62 100 26 Q150 -6 205 30" fill="none" stroke="${VERDE_OSC}" stroke-width="7" stroke-linecap="round"/>
      ${[[12, 30], [34, 42], [58, 44], [82, 36], [118, 20], [142, 16], [166, 20], [188, 28]].map(([x, y], i) =>
        `<g transform="translate(${x} ${y}) rotate(${i % 2 ? 30 : -30})">
          <ellipse rx="9" ry="4" fill="${i % 2 ? VERDE : '#2BB36A'}"/></g>`).join('')}
      ${[[22, 38, ROJO], [48, 46, ORO], [72, 42, CREMA], [100, 28, ROJO], [130, 18, ORO], [155, 18, CREMA], [178, 25, ROJO]].map(([x, y, c]) =>
        `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 6}" stroke="${ORO_OSC}" stroke-width="2"/>
         <ellipse cx="${x}" cy="${y + 13}" rx="5.5" ry="7.5" fill="${c}"/>`).join('')}
    `, '0 0 200 70'),

    // Piezas que "asoman" de las cajitas abiertas
    corazon: svg(`
      <path fill="${ROJO}" d="M50 86 C20 64 8 46 14 30 C20 14 42 12 50 30 C58 12 80 14 86 30 C92 46 80 64 50 86Z"/>
      <ellipse cx="30" cy="32" rx="6" ry="9" transform="rotate(35 30 32)" fill="#fff" opacity=".35"/>`),
    estrellaAsoma: svg(`<polygon points="${puntosEstrella(50, 52, 40, 18)}" fill="${ORO}" stroke="${ORO_OSC}" stroke-width="2.5" stroke-linejoin="round"/>`),

    // Nota musical (botón de música)
    nota: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M9 18.5a3 3 0 1 1-2-2.83V5.5l12-2.5v11.5a3 3 0 1 1-2-2.83V7.2l-8 1.66z"/></svg>`,
    cerrar: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></svg>`,
    destello: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 0c.6 6.2 1.8 9.4 4 10.6 1.9 1 4.4 1.3 8 1.4-6.2.6-9.4 1.8-10.6 4-1 1.9-1.3 4.4-1.4 8-.6-6.2-1.8-9.4-4-10.6C6.1 12.4 3.6 12.1 0 12c6.2-.6 9.4-1.8 10.6-4 1-1.9 1.3-4.4 1.4-8z"/></svg>`
  };

  /* Patrones de fondo sutiles (como data-URI para background-image) */
  const PATRONES = {
    arbolitos: c => `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g fill="none" stroke="${c}" stroke-width="1.6" stroke-linejoin="round"><path d="M10 4 L16 14 H13 L18 22 H2 L7 14 H4Z M10 22 V26"/><path d="M30 22 L35 30 H32.5 L37 37 H23 L27.5 30 H25Z"/></g><circle cx="32" cy="8" r="1.4" fill="${c}"/><circle cx="6" cy="33" r="1.4" fill="${c}"/></svg>`,
    acebo: c => `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><g fill="none" stroke="${c}" stroke-width="1.6" stroke-linejoin="round"><path d="M14 14 Q11 9 7 11 Q6 6 2 7 Q4 13 2 17 Q7 16 8 20 Q12 17 14 14Z"/><path d="M14 14 Q19 11 18 7 Q23 7 24 3 Q17 3 14 1 Q13 6 9 7 Q11 11 14 14Z"/><path d="M38 38 Q35 33 31 35 Q30 30 26 31 Q28 37 26 41 Q31 40 32 44 Q36 41 38 38Z"/></g><circle cx="16" cy="16" r="2" fill="${c}"/><circle cx="40" cy="40" r="2" fill="${c}"/><circle cx="36" cy="12" r="1.3" fill="${c}"/><circle cx="10" cy="38" r="1.3" fill="${c}"/></svg>`,
    copos: c => `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><g stroke="${c}" stroke-width="1.5" stroke-linecap="round"><path d="M9 3 V15 M3.8 6 L14.2 12 M3.8 12 L14.2 6"/><path d="M27 21 V33 M21.8 24 L32.2 30 M21.8 30 L32.2 24"/></g><circle cx="28" cy="8" r="1.3" fill="${c}"/><circle cx="8" cy="28" r="1.3" fill="${c}"/></svg>`
  };

  function patronCSS(nombre, color) {
    const crudo = PATRONES[nombre] ? PATRONES[nombre](color) : '';
    return `url('data:image/svg+xml,${encodeURIComponent(crudo)}')`;
  }

  window.ICONOS = ICONOS;
  window.patronCSS = patronCSS;
})();
