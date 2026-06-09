# American Local Dumpsters — Cómo correr el sitio

Este proyecto **NO es PHP/HTML estático**: es una aplicación **React + Vite**.
XAMPP (Apache) solo sirve archivos ya compilados, así que **no puedes abrir esta
carpeta directamente en el navegador**. Primero hay que compilarla con Node.js.

Ya quité toda la dependencia de Base44, así que el sitio funciona por sí solo.

---

## Requisito previo: instalar Node.js (una sola vez)

1. Descarga Node.js LTS desde https://nodejs.org y instálalo.
2. Para verificar, abre **CMD** y escribe:
   ```
   node -v
   npm -v
   ```
   Si muestran versiones, ya está listo.

---

## Opción A — Modo desarrollo (lo más rápido para ver el sitio)

En CMD, dentro de la carpeta del proyecto:

```
cd C:\xampp\htdocs\PaginaWebALD
npm install
npm run dev
```

Abre la dirección que aparece (normalmente **http://localhost:5173**).
Esto NO usa XAMPP — es el servidor propio de Vite. Ideal para editar y ver cambios al instante.

---

## Opción B — Publicar en XAMPP (Apache)

1. Compila el sitio:
   ```
   cd C:\xampp\htdocs\PaginaWebALD
   npm install
   npm run build
   ```
   Esto crea la carpeta **`dist`** con el sitio final.

2. Copia el **contenido** de `dist` a una carpeta dentro de htdocs, por ejemplo
   `C:\xampp\htdocs\ald\`.

3. Inicia Apache desde el panel de XAMPP y abre:
   **http://localhost/ald/**

> El proyecto está configurado con rutas relativas (`base: './'`) y `HashRouter`,
> por eso funciona desde cualquier subcarpeta de htdocs **sin** configurar `.htaccess`.
> Las URLs internas se verán así: `http://localhost/ald/#/services`.

---

## Qué se cambió respecto al original de Base44

- Se eliminó `@base44/sdk` y `@base44/vite-plugin` (el sitio ya no necesita la cuenta ni los servidores de Base44).
- `vite.config.js`: base relativa + alias `@` → `src`.
- Routing cambiado a `HashRouter` para que funcione en cualquier carpeta de XAMPP.
- **Calculador de distancia**: ahora usa OpenStreetMap (Nominatim) + OSRM gratis, con
  cálculo de respaldo. Requiere internet (servicios públicos gratuitos, sin API key).
- **Formulario de contacto**: ahora abre el correo del usuario ya rellenado hacia
  `AmericanLocalDumpsters@gmail.com`. (Si prefieres recibirlo automáticamente sin abrir
  el correo, se puede conectar a un servicio gratis como Formspree — avísame.)
- Se añadió `favicon`, `manifest.json`, título y descripción propios.

## Notas

- Las **imágenes y el logo** todavía se cargan desde el CDN público de Base44
  (`media.base44.com`). Funcionan con internet. Si quieres que queden 100% locales
  (offline), hay que descargarlas a `public/images/` y cambiar las rutas — dime y lo hago.
