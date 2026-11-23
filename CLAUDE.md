# Caquiviento — contexto para Claude

Calendario de Adviento web, regalo de Diego para su novia Andrea ("Caqui"). Ya está publicado y enviado:
**https://diiegoo72.github.io/caquidviento/** (GitHub Pages, rama `main`, raíz). Cada push a `main` se publica en 1–2 min y ella lo ve sin hacer nada.

## Reglas
- **Nunca hagas `git push` sin preguntar a Diego.** Commits sí, con mensajes claros en español.
- Todo el texto visible va en **español**, tono cariñoso y algo gracioso; firma **Diego**.
- El contenido de los regalos se edita **solo en `js/regalos.js`** (array `REGALOS` + `MENSAJES_BLOQUEO`). No metas contenido en la lógica.
- **Cuidado con los días ya desbloqueados** (día N se abre el N/12/2026 a las 00:00 hora de España): si un cambio afecta a un día que ella ya puede ver, avisa a Diego antes. Los cambios de un día deben estar subidos antes de su medianoche.
- Sin frameworks ni build: HTML + CSS + JS puro. Ilustraciones en SVG propio (nada de imágenes con copyright). `referencia.png` es solo referencia visual y no se commitea.
- Mobile-first (ella usa Android/Chrome): nada debe desbordar a 360 px, áreas táctiles ≥ 44 px, respetar `prefers-reduced-motion`.

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
