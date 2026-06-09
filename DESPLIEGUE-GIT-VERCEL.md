# Subir a GitHub y publicar (Vercel / Cloudflare Pages)

Sigue estos pasos en orden. Todos los comandos van en **CMD**, dentro de
`C:\xampp\htdocs\PaginaWebALD`.

---

## 0. Instalar Git (una sola vez)

Descarga e instala Git desde https://git-scm.com/download/win (deja todo por
defecto, solo "Next"). Verifica abriendo un CMD nuevo:

```
git --version
```

Si muestra una versión, listo.

---

## 1. Configurar tu identidad de Git (una sola vez)

```
git config --global user.name "Tu Nombre"
git config --global user.email "hernandoconeo18@gmail.com"
```

---

## 2. Crear el repositorio local

```
cd C:\xampp\htdocs\PaginaWebALD
git init
git add .
git commit -m "Primera version - American Local Dumpsters"
```

> El archivo `.gitignore` ya está incluido, así que `node_modules` y `dist`
> NO se suben (no hace falta, se generan solos en el servidor).

---

## 3. Crear el repo en GitHub y conectarlo

1. Entra a https://github.com  → botón **New** (o https://github.com/new).
2. Ponle un nombre, por ejemplo **`american-local-dumpsters`**.
3. **No** marques "Add a README" ni nada más. Crea el repo.
4. GitHub te mostrará una URL. Conéctala y sube (reemplaza `TU-USUARIO`):

```
git branch -M main
git remote add origin https://github.com/TU-USUARIO/american-local-dumpsters.git
git push -u origin main
```

> La primera vez te pedirá iniciar sesión en GitHub (se abre una ventana del
> navegador). Acepta y listo.

---

## 4. Publicar en Vercel (para mostrar al cliente — gratis)

1. Entra a https://vercel.com  → **Sign Up** → **Continue with GitHub**.
2. **Add New… → Project** → elige el repo `american-local-dumpsters`.
3. Vercel detecta Vite solo. Confirma:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. **Deploy**. En ~1 minuto te da una URL pública tipo
   `https://american-local-dumpsters.vercel.app` para enviarle al cliente.

> Recordatorio: el plan gratis de Vercel es para demos/uso no comercial. Para el
> sitio definitivo de un negocio, usa Cloudflare Pages (paso 5) o el plan Pro.

---

## 5. (Alternativa gratis para uso comercial) Cloudflare Pages

1. Entra a https://dash.cloudflare.com  → **Workers & Pages → Create → Pages →
   Connect to Git**.
2. Autoriza GitHub y elige el repo.
3. Configura:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. **Save and Deploy**. Te da una URL `https://....pages.dev`.

---

## 6. Cómo actualizar la web a partir de ahora

Cada vez que cambies algo en el código:

```
cd C:\xampp\htdocs\PaginaWebALD
git add .
git commit -m "describe el cambio"
git push
```

Vercel (o Cloudflare) detecta el `push` y **republica solo** en ~1 minuto.
No tienes que volver a tocar nada en sus paneles.
