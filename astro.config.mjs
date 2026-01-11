// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import compressor from 'astro-compressor';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages URL (sin dominio personalizado usa subdirectorio)
  site: 'https://nachosizle.github.io',
  base: '/raissa-portfolio',
  
  // Output estático para GitHub Pages (sin Keystatic CMS)
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
    build: {
      // Optimización de chunks para mejor caching
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['react', 'react-dom'],
          }
        }
      }
    }
  },

  // Optimización de imágenes
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      }
    },
    // Formatos modernos para mejor compresión
    domains: [],
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
          en: 'en-US',
        },
      },
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    markdoc(),
    react(),
    // Compresión de assets (HTML, CSS, JS)
    compressor({
      gzip: true,
      brotli: true,
    }),
  ],

  // Configuración de prefetch para mejorar navegación
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },

  // Build optimizations
  build: {
    inlineStylesheets: 'auto',
  },
});