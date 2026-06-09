import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Absolute base ('/') for the dev server, relative base ('./') for the build
  // so the compiled site works from any folder inside XAMPP's htdocs
  // (e.g. http://localhost/PaginaWebALD/ or http://localhost/ald/).
  base: command === 'build' ? './' : '/',
  logLevel: 'info',
  server: {
    host: true,        // listen on IPv4 + IPv6 (fixes 127.0.0.1 refused)
    port: 5180,
    strictPort: true,  // fail instead of silently hopping ports
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}));
