# Caquiviento — contexto para Claude

Calendario de Adviento web, regalo de Diego para su novia Andrea ("Caqui"). Ya está publicado (aún sin enviar a ella):
**https://diiegoo72.github.io/caquidviento/** (GitHub Pages, rama `main`, raíz). Cada push a `main` se publica en 1–2 min y ella lo ve sin hacer nada.

## Reglas
- **Nunca hagas `git push` sin preguntar a Diego.** Commits sí, con mensajes claros en español.
- Todo el texto visible va en **español**, tono cariñoso y algo gracioso; firma **Diego**.
- El contenido de los regalos se edita **solo en `js/regalos.js`** (array `REGALOS` + `MENSAJES_BLOQUEO`). No metas contenido en la lógica.
- **Cuidado con los días ya desbloqueados** (día N se abre el N/12/2026 a las 00:00 hora de España): si un cambio afecta a un día que ella ya puede ver, avisa a Diego antes. Los cambios de un día deben estar subidos antes de su medianoche.
- Sin frameworks ni build: HTML + CSS + JS puro. Ilustraciones en SVG propio (nada de imágenes con copyright). `referencia.png` es solo referencia visual y no se commitea.
- Mobile-first (ella usa Android/Chrome): nada debe desbordar a 360 px, áreas táctiles ≥ 44 px, respetar `prefers-reduced-motion`.

## Vocabulario nuestro (úsalo en todo texto nuevo)
Diego irá diciendo más motes y expresiones: añádelos aquí, al array `MOTES` de `js/regalos.js` si es un mote, y úsalos en los textos. Repártelos de forma natural, sin meterlos en todas las frases.

**Motes de Andrea:** Caqui, Caquiñotérreo, Caquiñoterrenal, Al-Caquet, Caq, Caquet, Caquiño, Cagarro, Anotop. En `MENSAJES_BLOQUEO`, `{MOTE}` se sustituye por uno al azar (y `{N}` por el día). El saludo de la pantalla de espera también usa un mote al azar.

**Expresiones:**
- «Escolta!» → para decir «escucha» u «oye».
- «Tah como ilipollah» → para decirle que está tonta, que espabile (en broma).
- «Promete» → para prometer algo de forma muy cursi, en broma.
- «Iug» → de broma, justo después de decir algo demasiado empalagoso.
- «Onichan» → comodín, vale en cualquier contexto.
- «Añe-a-se-o» → para decir «¡bien!».
- Otras que usa Diego al escribir: «mi shica», «de to un poco vaya», «Besos de fresa» (despedida).

## Pantalla del contador (antes del 1/12)
Textos fijos en `index.html` (`#espera`). En `js/regalos.js`: `FRASES_FALTA` (línea bajo el contador según las noches que quedan / última hora) y `FRASES_ESPERA` (frases que rotan cada 6 s). Tocar el mote del saludo lo cambia por otro; el saludo se encoge solo para caber en una línea (`ajustarSaludo` en `app.js`).

## Juego del día
`js/juego.js` («Atrapa los regalos»: saco con el dedo, regalos +1, carbón −2). Textos, fecha, objetivo, duración y premio en `JUEGO_HOY` (`js/regalos.js`). Sale **siempre** al abrir o recargar la web el día `fecha` (hora España); no se guarda nada, puede jugar las veces que quiera. Ese día aparece «🎮 Jugar otra vez» bajo el contador (`#jugar-otra`). Al ganar ve el premio (la pista). `fecha: ''` lo desactiva. Prueba: `?prueba=caqui&fecha=2026-11-27T20:00` o `&juego=1`. Usa `window.CAQUI` (expuesto al final de `app.js`).
Primer juego (27/11/2026): premio = pista del día 1, que será un **vale por un masaje relajante** (aún hay que poner ese regalo en `REGALOS`).

**Caché:** `index.html` carga CSS/JS con `?v=N`. Al cambiar cualquier CSS/JS, sube ese número en todos los enlaces para que el móvil no use versiones viejas.

## Estructura
- `index.html` — página, metas Open Graph (URL absoluta de GitHub Pages).
- `css/styles.css` — estilos. Paleta: rojo `#C0393B`, rosa `#F2A3A3`, crema `#F3E5CF`, verde `#1F9B57`, oro `#E8B64C`. Fuentes: Great Vibes (título), Fredoka (números/UI), Dancing Script (firma), Caveat (cartas).
- `js/regalos.js` — regalos. Tipos: `vale`, `invitacion`, `foto`, `carta`, `cancion` (Spotify), `video` (mp4 local o `youtube`); combinables con `imagen`/`spotify`/`video`/`youtube`. El día 25 tiene modal especial.
- `js/app.js` — lógica: `LAYOUT` (posición, tamaño, color e ilustración de cada casilla en la rejilla de 4 columnas), fechas con `Intl` en Europe/Madrid, estados (espera / adviento / navidad), localStorage (`caquiviento-abiertas`), modal, confeti, nieve, música (mp3 o «Noche de paz» con Web Audio).
- `js/iconos.js` — ilustraciones SVG y patrones.
- `assets/` — `preview.png` (1200×630, se regenera desde `tools/preview.html`), `favicon.svg`, `fotos/`, y opcionalmente `video25.mp4` y `musica.mp3`. Archivos < 100 MB (límite de GitHub); fotos idealmente < 500 KB.

## Cómo verificar cambios
1. Servidor local: `python -m http.server 8765 --bind 127.0.0.1` en la raíz.
2. Modo prueba (no guarda nada): `?prueba=caqui&fecha=2026-12-14T18:00`, más `&abiertas=1,2,3` (marcar abiertas) y `&abrir=N` (abrir un regalo directamente). `?prueba=caqui&reset=1` borra el progreso.
3. Capturas en móvil real (390×844, `isMobile`) con puppeteer-core usando el Chrome instalado (`C:/Program Files/Google/Chrome/Application/chrome.exe`), instalado en el scratchpad, no en el repo. Chrome headless por línea de comandos no baja de ~500 px de ancho, así que no sirve para capturas móviles.
4. Revisa las capturas, comprueba que no hay errores de consola ni scroll horizontal y corrige antes de hacer commit.
