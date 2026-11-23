# Caquiviento 🎄

Calendario de Adviento web para Caqui. HTML + CSS + JS puro, sin build: se sube tal cual a GitHub Pages.

## Estructura

```
index.html          página
css/styles.css      estilos
js/regalos.js       👉 LOS REGALOS (lo único que necesitas editar)
js/app.js           lógica (fechas, estados, modal, nieve, música…)
js/iconos.js        ilustraciones SVG propias
assets/             favicon, preview.png (WhatsApp), fotos, vídeo, música
tools/preview.html  página para regenerar assets/preview.png
```

## Publicar en GitHub Pages

1. `git push` a `main`.
2. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
3. En 1–2 minutos estará en **https://diiegoo72.github.io/caquidviento/**

Si cambias el nombre del repo o tu usuario, actualiza la URL en las etiquetas `og:url`, `og:image` y `twitter:image` de `index.html` (están comentadas).

## Editar regalos

Abre `js/regalos.js`. Cada día es un bloque `{ dia, tipo, titulo, texto, ... }` y arriba del archivo están explicados todos los campos. Tipos: `vale`, `invitacion`, `foto`, `carta`, `cancion`, `video`. Cualquier regalo puede llevar además `imagen`, `spotify`, `video` o `youtube` para combinarlos.

- **Fotos**: copia la imagen en `assets/fotos/` (jpg/png/webp, idealmente < 500 KB) y pon `imagen: 'assets/fotos/nombre.jpg'`.
- **Vídeo del día 25**: guárdalo como `assets/video25.mp4` (MP4 H.264, idealmente < 50 MB; GitHub no admite archivos > 100 MB). Si pesa mucho, súbelo a YouTube como «oculto» y usa `youtube: 'ID'` en vez de `video`.
- **Spotify**: en la app, Compartir → Copiar enlace de la canción, y pégalo en `spotify: '...'`.
- **Música de fondo**: si subes `assets/musica.mp3`, el botón 🎵 la usará; si no, suena una caja de música con «Noche de paz».

## Modo prueba

- Simular una fecha (hora de España): `?prueba=caqui&fecha=2026-12-05T10:00`
- Marcar casillas como ya abiertas: `&abiertas=1,2,3`
- Abrir directamente un regalo: `&abrir=7`
- Borrar el progreso guardado: `?prueba=caqui&reset=1`

En modo prueba aparece la etiqueta «MODO PRUEBA» y no se guarda nada en el navegador.

## Regenerar la imagen de vista previa

Abre `tools/preview.html` con un servidor local (`python -m http.server`) en una ventana de 1200×630 y haz una captura, guardándola como `assets/preview.png`.
