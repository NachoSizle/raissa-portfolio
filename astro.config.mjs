// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://raissagr.com',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap(),
    markdoc(),
    react(),
    keystatic()
  ],

  // Configuración de prefetch para mejorar navegación
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },

  adapter: node({
    mode: 'standalone'
  })
});