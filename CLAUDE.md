# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Contexto del Proyecto

Portafolio digital para Raissa (raissagr.com) - migración de WordPress a Astro. El objetivo es máximo rendimiento (Lighthouse 100) con una experiencia de edición simple para una usuaria no técnica.

## Stack Tecnológico

- **Framework:** Astro (Islands Architecture, Zero-JS by default)
- **CMS:** Keystatic (Git-based, integrado con GitHub)
- **Estilos:** Tailwind CSS
- **Formularios:** Web3Forms (independiente del hosting)
- **Hosting:** Netlify o Cloudflare Pages (evitar Vercel por restricciones comerciales)

## Comandos de Desarrollo

```bash
# Desarrollo local
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Acceso al CMS local
# Navegar a http://localhost:4321/keystatic
```

## Arquitectura

### Estructura de Contenido (Content Collections)

```
src/
├── content/
│   ├── projects/          # Colección de proyectos (MDX)
│   └── settings/          # Singletons (config global, bio)
├── assets/
│   └── projects/          # Imágenes procesadas por Vite
└── components/
    ├── ResponsiveImage.astro
    ├── ProjectCard.astro
    └── MasonryGrid.astro
```

### Keystatic Config

El archivo `keystatic.config.ts` define:
- **Colección `projects`:** título, coverImage, gallery (array de imágenes), descripción, categoría, fecha
- **Singleton `settings`:** título del sitio, descripción SEO, enlaces sociales

### Optimización de Imágenes

- Usar `<Image />` de `astro:assets` para todas las imágenes
- Imágenes en `src/assets/` (procesadas por Vite) NO en `public/`
- Formatos: AVIF y WebP automáticos
- `loading="eager"` solo para imágenes LCP (portada)
- `loading="lazy"` para galerías

### View Transitions

- `<ClientRouter />` en el layout principal
- Asignar `transition:name={`img-${slug}`}` único para animaciones fluidas entre galería y detalle

## Decisiones de Diseño

1. **Masonry Layout:** Preferir CSS `column-count` sobre librerías JS
2. **Formulario de contacto:** Web3Forms con honeypot anti-spam (sin CAPTCHA)
3. **SEO:** Componente `<SEO />` con Open Graph dinámico por proyecto
4. **Sitemap:** `@astrojs/sitemap` para generación automática

## Consideraciones para la Usuaria

La Autora (Raissa) no es técnica. Toda decisión de UX en Keystatic debe priorizar:
- Labels claros en español
- Campos con validación visual
- Flujo de subida de imágenes por arrastrar y soltar
- El sistema debe funcionar sin que ella toque código ni terminal
