# 🎨 Raissa Portfolio

Portafolio digital moderno construido con **Astro** y **Keystatic** como CMS. Diseñado para ofrecer un rendimiento excepcional y una experiencia de edición visual intuitiva.

## ✨ Características

- ⚡ **Ultra rápido**: Astro genera HTML estático con Zero-JS por defecto
- 📝 **CMS Visual**: Keystatic para edición de contenido sin tocar código
- 🎨 **Tailwind CSS v4**: Diseño moderno y responsivo
- 🖼️ **Optimización de imágenes**: Conversión automática a WebP/AVIF
- 🔄 **View Transitions**: Navegación fluida entre páginas
- 📱 **100% Responsivo**: Funciona en cualquier dispositivo
- 🔍 **SEO Optimizado**: Meta tags, sitemap y Open Graph

## 🚀 Inicio Rápido

### Requisitos previos

- [Bun](https://bun.sh/) (recomendado) o Node.js 18+
- Git

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/NachoSizle/raissa-portfolio.git
cd raissa-portfolio

# Instalar dependencias
bun install

# Iniciar servidor de desarrollo
bun run dev
```

### Acceder al CMS

Una vez iniciado el servidor de desarrollo, accede a:

- **Sitio web**: http://localhost:4321
- **Panel de administración**: http://localhost:4321/keystatic

## 📁 Estructura del Proyecto

```
/
├── public/                  # Archivos estáticos (favicon, robots.txt)
├── src/
│   ├── assets/             # Imágenes optimizadas por Astro
│   │   ├── projects/       # Imágenes de proyectos
│   │   ├── about/          # Foto de perfil
│   │   └── brand/          # Logo y branding
│   ├── components/         # Componentes Astro reutilizables
│   ├── content/            # Contenido gestionado por Keystatic
│   │   ├── projects/       # Proyectos del portafolio
│   │   ├── categories/     # Categorías de proyectos
│   │   └── settings/       # Configuración del sitio
│   ├── layouts/            # Layouts de páginas
│   ├── pages/              # Rutas del sitio
│   └── styles/             # Estilos globales (Tailwind)
├── keystatic.config.ts     # Configuración del CMS
└── astro.config.mjs        # Configuración de Astro
```

## 📝 Gestión de Contenido

### Añadir un nuevo proyecto

1. Accede a `/keystatic` en tu navegador
2. Ve a **Proyectos** > **Crear nuevo**
3. Rellena el título, fecha y sube la imagen de portada
4. Añade imágenes a la galería (arrastra para reordenar)
5. Escribe la descripción del proyecto
6. Haz clic en **Guardar**

### Editar la información "Sobre Mí"

1. En Keystatic, ve a **Configuración** > **Sobre Mí**
2. Actualiza tu foto de perfil, biografía y habilidades
3. Guarda los cambios

### Configurar redes sociales

1. Ve a **Configuración** > **Redes Sociales**
2. Añade los enlaces a tus perfiles
3. Los iconos aparecerán automáticamente en el footer

## 🔧 Configuración

### Variables de entorno

Copia `.env.example` a `.env` y configura:

```env
# Web3Forms para el formulario de contacto
WEB3FORMS_ACCESS_KEY=tu_api_key
```

Obtén tu API key gratis en [web3forms.com](https://web3forms.com).

### Despliegue en producción

El proyecto está configurado para desplegarse en **Netlify** o **Cloudflare Pages**:

```bash
# Build de producción
bun run build

# Preview local
bun run preview
```

## 🛠️ Comandos

| Comando          | Acción                                       |
| :--------------- | :------------------------------------------- |
| `bun install`    | Instalar dependencias                        |
| `bun run dev`    | Iniciar servidor de desarrollo               |
| `bun run build`  | Build de producción                          |
| `bun run preview`| Preview del build local                      |

## 📄 Licencia

MIT © Raissa

---

Desarrollado con ❤️ usando [Astro](https://astro.build) y [Keystatic](https://keystatic.com)

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun dev`             | Starts local dev server at `localhost:4321`      |
| `bun build`           | Build your production site to `./dist/`          |
| `bun preview`         | Preview your build locally, before deploying     |
| `bun astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
