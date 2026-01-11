// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import node from '@astrojs/node';
import compressor from 'astro-compressor';

// https://astro.build/config
export default defineConfig({
  site: 'https://raissagr.com',

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
    keystatic(),
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

  adapter: node({
    mode: 'standalone'
  })
});