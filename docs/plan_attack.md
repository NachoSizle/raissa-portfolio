# **Informe de Ingeniería de Producto y Estrategia de Migración Tecnológica: Arquitectura de Portafolio Digital en Astro**

## **1\. Resumen Ejecutivo y Visión del Producto**

### **1.1 Alcance del Proyecto y Definición del Problema**

El presente informe técnico tiene como objetivo articular una estrategia integral para la migración, refactorización y optimización del portafolio digital raissagr.com. Actualmente, la plataforma opera sobre una infraestructura monolítica, presumiblemente WordPress o un sistema de gestión de contenidos (CMS) tradicional, lo cual presenta limitaciones inherentes en términos de rendimiento web (Core Web Vitals), experiencia de desarrollo y mantenibilidad a largo plazo. El cliente final, identificada como una profesional creativa no técnica ("la Autora"), requiere una solución que elimine la fricción tecnológica en la gestión de su contenido visual sin sacrificar la autonomía operativa.

Como Ingeniero de Producto encargado de la supervisión técnica, la misión trasciende la simple clonación visual del sitio existente. Se busca implementar una arquitectura **Jamstack** moderna utilizando **Astro** como framework principal. Esta decisión responde a la necesidad de entregar un producto final que combine la velocidad de un sitio estático con la flexibilidad de una aplicación web moderna, manteniendo una separación estricta entre la capa de presentación (Frontend) y la capa de gestión de contenido (Content Layer).

La premisa central de esta migración es la **"Complejidad Abstraída"**: mientras que la arquitectura subyacente aprovechará tecnologías avanzadas como renderizado en el borde (Edge Rendering), optimización de activos en tiempo de compilación y control de versiones basado en Git, la interfaz de usuario para la Autora debe permanecer visual, intuitiva y libre de código. El éxito del proyecto se medirá no solo por métricas de rendimiento (Lighthouse Score 100/100), sino por la adopción exitosa del nuevo flujo de trabajo por parte de la usuaria no técnica.

### **1.2 Justificación Arquitectónica: La Elección de Astro en 2026**

El ecosistema de desarrollo web ha oscilado pendularmente entre la simplicidad de los sitios estáticos y la interactividad de las Single Page Applications (SPAs). Frameworks como Next.js o React han dominado el mercado, pero a menudo introducen una sobrecarga de JavaScript innecesaria para sitios orientados al contenido, como lo es un portafolio personal.

La elección de **Astro** para este proyecto se fundamenta en su filosofía de **"Islands Architecture" (Arquitectura de Islas)** y su enfoque de **"Zero-JS by default"**.1 A diferencia de los competidores que "hidratan" la página completa, Astro envía HTML puro al navegador, cargando JavaScript solo en los componentes interactivos específicos que lo requieren. Para un portafolio cargado de imágenes de alta resolución:

1. **Rendimiento Crítico:** Elimina el bloqueo del hilo principal (Main Thread Blocking), garantizando una interacción fluida incluso en dispositivos móviles de gama baja.  
2. **Optimización de Activos:** Utiliza la API astro:assets para transformar, optimizar y servir imágenes en formatos modernos (AVIF, WebP) automáticamente, evitando el cambio acumulativo de diseño (CLS) que penaliza el SEO.2  
3. **Independencia del Framework:** Permite integrar componentes de React, Vue o Svelte si fuera necesario, sin comprometer la arquitectura global.

Este informe detalla la ejecución técnica de esta visión, analizando desde la selección del CMS "Git-based" (evaluando Keystatic, TinaCMS y CloudCannon) hasta la implementación de transiciones de vista (View Transitions) y el despliegue en infraestructuras globales como Netlify o Vercel.

## ---

**2\. Análisis de Requerimientos y Experiencia de Usuario (UX/DX)**

### **2.1 Perfil de Usuario y Restricciones Técnicas**

El desafío principal de este proyecto es la **Experience Gap** (Brecha de Experiencia) entre el desarrollador y el usuario final.

* **El Ingeniero (Usted):** Valora el control de versiones, la integración continua (CI/CD), la seguridad del código y la eficiencia del renderizado.  
* **La Autora (Raissa):** Valora la inmediatez visual, la facilidad de "arrastrar y soltar" (drag-and-drop), y la capacidad de ver sus cambios reflejados al instante sin tocar una terminal ni editar archivos Markdown.

La solución actual (WordPress) resuelve la necesidad de la Autora mediante una interfaz WYSIWYG (What You See Is What You Get) acoplada a una base de datos. Para migrar a Astro sin degradar su experiencia, debemos implementar un **Headless CMS** que actúe como una capa de abstracción sobre el repositorio de Git. La Autora no debe saber que está editando archivos .mdx o haciendo git commit; ella debe percibir que está "guardando su trabajo" en un panel administrativo visual.

### **2.2 Análisis del Portafolio Objetivo (raissagr.com)**

Basándonos en la naturaleza de los portafolios creativos y la información contextual 4, inferimos que la estructura de contenido del sitio actual incluye:

1. **Galería Principal (Home):** Una rejilla visual (Masonry o Grid) que muestra miniaturas de proyectos destacados.  
2. **Páginas de Proyecto (Detalle):** Vistas individuales con narrativas ricas, múltiples imágenes, videos embebidos y descripciones de texto.  
3. **Página "Sobre Mí" (Bio):** Texto biográfico, foto de perfil y enlaces a redes sociales.  
4. **Contacto:** Un formulario funcional para clientes potenciales.

La migración debe clonar esta estructura pero mejorarla mediante:

* **Transiciones de Estado:** Navegación fluida entre la galería y el detalle del proyecto sin recargas de página completas, utilizando el enrutador del cliente de Astro (\<ClientRouter /\>).6  
* **Carga Diferida Inteligente (Lazy Loading):** Las imágenes fuera del viewport no deben consumir ancho de banda hasta que el usuario haga scroll, pero las imágenes críticas (LCP) deben precargarse.  
* **Tipografía Optimizada:** Eliminación del parpadeo de texto invisible (FOIT) mediante la inyección optimizada de fuentes.

## ---

**3\. Matriz de Decisión: Selección del CMS (Content Management System)**

La decisión más crítica de ingeniería en este proyecto no es el frontend, sino el CMS. Dado que la usuaria es "nada técnica", un flujo de trabajo basado en archivos crudos es inviable. Necesitamos un CMS que se integre con Astro y ofrezca una interfaz gráfica robusta. Evaluamos tres candidatos principales bajo la óptica de **usabilidad para no técnicos** y **robustez técnica**.

### **3.1 Opción A: Keystatic (El Enfoque "Local-First")**

Keystatic ha ganado tracción masiva en la comunidad de Astro por su capacidad de vivir dentro del repositorio sin requerir una base de datos externa.

* **Arquitectura:** Funciona como una aplicación React que lee y escribe archivos directamente en src/content. En producción, utiliza la API de GitHub para realizar commits.7  
* **Experiencia de Editor (EX):** Ofrece una interfaz limpia y libre de distracciones. Permite definir "Colecciones" (Proyectos) y "Singletons" (Configuración Global) con campos tipados.8  
* **Manejo de Imágenes:** Soporta carga de imágenes directa. Aunque históricamente ha tenido limitaciones con la carga masiva (bulk upload), las versiones recientes y herramientas comunitarias han mejorado el flujo de arrastrar y soltar en campos de tipo array de imágenes.9  
* **Ventaja Competitiva:** **Cero Bloqueo de Proveedor (Vendor Lock-in).** Si Keystatic deja de existir, el contenido sigue siendo archivos Markdown y JSON estándar en el repositorio de la Autora. Esto es crucial para la longevidad del portafolio.  
* **Integración con Astro:** Se alinea perfectamente con las "Content Collections" de Astro, permitiendo validación de esquemas con Zod.10

### **3.2 Opción B: TinaCMS (Edición Visual Contextual)**

TinaCMS se distingue por ofrecer **Edición Visual en Tiempo Real**. Permite a la usuaria navegar por su sitio web y hacer clic directamente en los textos o imágenes para editarlos ("Click-to-edit").

* **Experiencia de Editor (EX):** Es superior en términos de inmediatez visual. La barra lateral de edición permite ver los cambios en el diseño real antes de guardar.11  
* **Gestión de Medios:** Cuenta con un "Media Manager" robusto que permite organizar carpetas, lo cual es vital para un portafolio con cientos de activos.12 Soporta repositorios de medios basados en Git o integración con Cloudinary.  
* **Desventaja Técnica:** La integración con Astro, aunque soportada oficialmente, puede añadir complejidad al código. Requiere envolver componentes en React para habilitar la edición visual en tiempo real, lo que podría diluir la pureza de la arquitectura "Zero-JS" de Astro si no se implementa con cuidado.13 Además, el plan gratuito tiene límites, aunque generosos para un solo usuario.

### **3.3 Opción C: CloudCannon (El Constructor de Sitios Git)**

CloudCannon es una plataforma de hosting y CMS que parsea los archivos HTML generados y permite editarlos visualmente.

* **Experiencia de Editor (EX):** Ofrece una experiencia similar a Wix o Squarespace pero sobre un stack tecnológico profesional. Sus "Array Structures" permiten a los usuarios construir páginas apilando bloques (e.g., "Añadir bloque de Texto", luego "Añadir Galería").14  
* **Manejo de Arrays:** Es particularmente fuerte en el manejo de arrays de datos, permitiendo reordenar elementos de una galería visualmente con gran facilidad.15  
* **Desventaja:** Es una plataforma propietaria (SaaS). Aunque el contenido vive en Git, la interfaz de edición depende de su servicio. El plan gratuito es excelente, pero escalar a más funciones puede implicar costos.16

### **3.4 Veredicto y Recomendación Técnica**

Para el caso específico de raissagr.com, donde se busca **autonomía total, bajo mantenimiento y costo cero**, la recomendación es **Keystatic**.

**Razonamiento:**

1. **Seguridad de Datos:** La Autora posee sus datos físicamente en su repositorio GitHub. No depende de la solvencia de una startup de CMS SaaS.  
2. **Simplicidad de Ingeniería:** Keystatic se integra nativamente con las *Content Collections* de Astro sin requerir una capa de API compleja o componentes de React pesados en el frontend final.  
3. **Costos:** Al aprovechar el modo "GitHub", el costo operativo es $0, utilizando la infraestructura gratuita de GitHub y Netlify/Vercel.

**Plan de Contingencia (Fallback):** Si la Autora encuentra la interfaz de Keystatic demasiado abstracta (ya que no es edición "sobre la página" como tal), la alternativa directa sería **CloudCannon**, que ofrece la edición visual más amigable para usuarios acostumbrados a constructores visuales, sin requerir cambios drásticos en el código de Astro.

## ---

**4\. Arquitectura Técnica y Estrategia de Implementación**

### **4.1 Estructura del Proyecto y Modelado de Contenido**

El éxito de la migración depende de un modelado de datos (Content Modeling) preciso que refleje la naturaleza del trabajo de la Autora. Utilizaremos el esquema de configuración de Keystatic (keystatic.config.ts) para definir la estructura.

#### **4.1.1 Definición de Colecciones**

Identificamos dos tipos principales de datos:

1. **Proyectos (collection):** Entidades repetitivas que conforman el portafolio.  
2. **Configuración (singleton):** Datos únicos como la biografía o configuración SEO.

TypeScript

// keystatic.config.ts (Extracto Conceptual)  
import { config, fields, collection, singleton } from '@keystatic/core';

export default config({  
  storage: { kind: 'github', repo: 'usuario/raissa-portfolio' },  
  collections: {  
    projects: collection({  
      label: 'Proyectos',  
      slugField: 'title',  
      path: 'src/content/projects/\*',  
      schema: {  
        title: fields.slug({ name: { label: 'Título del Proyecto' } }),  
        coverImage: fields.image({  
          label: 'Imagen de Portada',  
          directory: 'src/assets/projects',  
          publicPath: '@assets/projects/',  
          validation: { required: true }  
        }),  
        // Insight: Uso de array para galería flexible  
        gallery: fields.array(  
          fields.image({ label: 'Imagen de Galería' }),  
          {   
            label: 'Galería del Proyecto',  
            itemLabel: (props) \=\> \`Imagen: ${props.value?.filename |

| 'Sin nombre'}\`   
          }  
        ),  
        description: fields.document({  
          label: 'Descripción',  
          formatting: true,  
          links: true,  
        }),  
        category: fields.select({  
          label: 'Categoría',  
          options:,  
          defaultValue: 'graphic-design'  
        }),  
        date: fields.date({ label: 'Fecha de Publicación' }),  
      },  
    }),  
  },  
  singletons: {  
    settings: singleton({  
      label: 'Configuración Global',  
      path: 'src/content/settings/global',  
      schema: {  
        siteTitle: fields.text({ label: 'Título del Sitio' }),  
        seoDescription: fields.text({ label: 'Descripción SEO' }),  
        socialLinks: fields.object({  
          instagram: fields.text({ label: 'Instagram' }),  
          linkedin: fields.text({ label: 'LinkedIn' }),  
        })  
      }  
    })  
  }  
});

**Análisis de Ingeniería:**

* **Arrays para Galerías:** El uso de fields.array para la galería es crucial. Permite a la Autora añadir un número arbitrario de imágenes por proyecto y reordenarlas visualmente arrastrando los elementos.9 Esto replica la flexibilidad de los bloques de Gutenberg en WordPress pero con una estructura de datos limpia (JSON/YAML) por debajo.  
* **Gestión de Rutas de Activos:** La configuración directory: 'src/assets/projects' y publicPath: '@assets/projects/' es intencional. Almacenar las imágenes dentro de src/ (en lugar de public/) permite que el compilador de Astro (Vite) las procese, optimice y genere los hash de caché correspondientes. Esto es vital para el rendimiento.18

### **4.2 Pipeline de Optimización de Imágenes**

Para un portafolio, las imágenes son el "ciudadano de primera clase". La implementación técnica debe resolver la tensión entre "Alta Calidad" y "Bajo Peso".

Utilizaremos el componente \<Image /\> de Astro (astro:assets).

* **Generación de Formatos:** Astro convertirá automáticamente JPEGs y PNGs a **WebP** y **AVIF** modernos, sirviendo el formato más ligero que soporte el navegador del visitante.3  
* **Atributos srcset y sizes:** Implementaremos un componente ResponsiveImage.astro que acepte una imagen y genere automáticamente las variantes de tamaño.

Fragmento de código

\---  
// src/components/ResponsiveImage.astro  
import { Image } from 'astro:assets';  
interface Props {  
  src: ImageMetadata;  
  alt: string;  
  class?: string;  
}  
const { src, alt, class: className } \= Astro.props;  
\---  
\<Image   
  src={src}   
  widths={\[320, 640, 960, 1280, src.width\]}   
  sizes={\`(max-width: 640px) 320px, (max-width: 1024px) 640px, 1280px\`}  
  formats={\['avif', 'webp'\]}  
  alt={alt}  
  class={className}  
  quality="mid" // Equilibrio entre calidad visual y compresión \[19\]  
/\>

**Estrategia de Carga:**

* **LCP (Largest Contentful Paint):** La imagen de portada del proyecto debe tener el atributo loading="eager" para asegurar una carga inmediata.  
* **Lazy Loading:** Las imágenes de la galería inferior (fuera del primer pantallazo) tendrán loading="lazy" nativo, ahorrando datos y acelerando la carga inicial.2

### **4.3 Diseño de Interfaz: Masonry Layout y View Transitions**

El diseño de rejilla tipo "Masonry" (estilo Pinterest) es un estándar en portafolios pero técnicamente desafiante en CSS puro, ya que display: grid opera en filas y columnas estrictas, dejando huecos verticales si las imágenes tienen alturas variadas.

**Solución Técnica:**

* **CSS Columns:** Una aproximación ligera utilizando column-count. Es simple y funciona sin JavaScript, ideal para la filosofía de Astro.  
* **Librería Astro-Masonry:** Si se requiere un control más granular (e.g., orden cronológico estricto de izquierda a derecha), utilizaremos una librería ligera compatible con Astro.20

View Transitions (Transiciones de Vista):  
Astro 3.0+ introdujo soporte nativo para la API de View Transitions. Esto permite que al hacer clic en una miniatura de la galería, la imagen se "expanda" suavemente hacia la página de detalle, en lugar de un corte abrupto.

* **Implementación:** Añadir \<ClientRouter /\> (anteriormente \<ViewTransitions /\>) en el \<head\> del layout principal.  
* **Directivas de Animación:** Asignar un transition:name={img-${slug}} único a cada imagen tanto en la galería como en la página de detalle. El navegador interpolará automáticamente la posición y tamaño entre ambas vistas.6  
* **Manejo de Flickering:** Se debe tener cuidado con el parpadeo en navegadores no basados en Chromium. Implementaremos estrategias de fallback y pre-carga (prefetch) para mitigar retardos en la carga de la nueva imagen.22

## ---

**5\. Integraciones Funcionales y Lógica de Negocio**

### **5.1 Estrategia de Formularios de Contacto (Serverless)**

Al abandonar WordPress y PHP, perdemos la capacidad nativa de procesar formularios en el servidor de origen. Necesitamos una solución "Serverless" o basada en API.

**Análisis Comparativo:**

| Característica | Netlify Forms | Web3Forms | Formspree |
| :---- | :---- | :---- | :---- |
| **Requiere JS** | No (HTML puro) | No (API POST) | No (API POST) |
| **Costo (Gratis)** | 100 envíos/mes 23 | 250 envíos/mes 24 | 50 envíos/mes 25 |
| **Portabilidad** | Solo Netlify | Cualquier Hosting | Cualquier Hosting |
| **Configuración** | Atributo HTML | API Key Pública | API Key |

Recomendación: Web3Forms.  
Aunque Netlify Forms es extremadamente cómodo, ata el proyecto a la infraestructura de Netlify. Web3Forms ofrece un límite gratuito superior (250 vs 100\) y desacopla la lógica del formulario del proveedor de hosting, permitiendo migrar a Vercel o Cloudflare en el futuro sin reescribir código. Además, no requiere librerías de cliente, manteniendo el sitio ligero.  
**Implementación en Astro:**

Fragmento de código

\<form action="https://api.web3forms.com/submit" method="POST" class="contact-form"\>  
  \<input type="hidden" name="access\_key" value="TU\_CLAVE\_PUBLICA\_AQUI"\>  
  \<input type="checkbox" name="botcheck" class="hidden" style="display: none;"\>  
    
  \<div class="form-group"\>  
    \<label for="name"\>Nombre\</label\>  
    \<input type="text" name="name" id="name" required placeholder="Tu nombre" /\>  
  \</div\>  
  \<button type="submit"\>Enviar Mensaje\</button\>  
\</form\>

Este enfoque utiliza un "Honeypot" (botcheck) para la protección contra SPAM sin necesitar CAPTCHAs invasivos.26

### **5.2 SEO Técnico y Metadatos**

La visibilidad es clave para un portafolio. Configuraremos el paquete @astrojs/sitemap para generar un mapa del sitio XML automáticamente en cada compilación (build).

* **Open Graph Dinámico:** Crearemos un componente \<SEO /\> que inyecte las etiquetas og:image y twitter:card dinámicamente basándose en la imagen de portada del proyecto actual. Esto asegura que al compartir un enlace en WhatsApp o LinkedIn, aparezca la previsualización correcta del trabajo de Raissa, no una imagen genérica del sitio.

## ---

**6\. Infraestructura, Despliegue y Costos**

### **6.1 Selección del Proveedor de Hosting**

El hosting para sitios estáticos es un commodity en 2026, pero las condiciones de uso y los límites gratuitos varían significativamente.

**Análisis de Costos y Límites (Free Tier):**

* **Netlify:**  
  * **Ancho de Banda:** 100 GB/mes.28  
  * **Builds:** 300 minutos/mes.29 Importante: Netlify cuenta los minutos de compilación. Si el portafolio tiene muchas imágenes, la optimización puede tardar.  
  * **Uso Comercial:** Permitido en el plan gratuito.30  
  * **Créditos:** Nuevo sistema de "créditos" (300/mes) que combina ancho de banda, builds y funciones.31  
* **Vercel:**  
  * **Ancho de Banda:** 100 GB/mes.  
  * **Uso Comercial:** **Prohibido** estrictamente en el plan Hobby (Gratuito).32 Si Raissa utiliza su web para captar clientes freelance o vender servicios, técnicamente viola los términos de servicio y debería pagar $20/mes.  
  * **Builds:** 6,000 minutos/mes (Hobby).33  
* **Cloudflare Pages:**  
  * **Ancho de Banda:** Ilimitado.  
  * **Builds:** 500 compilaciones/mes (no cuenta minutos, sino ejecuciones).  
  * **Uso Comercial:** Permitido.

Veredicto: Netlify o Cloudflare Pages.  
Vercel queda descartado para un proyecto profesional gratuito debido a sus restricciones de uso comercial. Netlify es generalmente más amigable para configuraciones iniciales (especialmente DNS y formularios), mientras que Cloudflare ofrece escalabilidad bruta ilimitada. Recomendamos comenzar con Netlify por su facilidad de uso y su integración transparente con GitHub, pero mantener la arquitectura agnóstica (usando Web3Forms) para poder mover a Cloudflare si se superan los límites de ancho de banda.

### **6.2 Pipeline de Despliegue (CI/CD)**

El flujo de trabajo automatizado será el siguiente:

1. **Edición:** La Autora entra a raissagr.com/keystatic, edita un texto y pulsa "Guardar".  
2. **Commit:** Keystatic realiza un commit automático a la rama main en GitHub.  
3. **Trigger:** Netlify detecta el cambio en el repositorio.  
4. **Build:** Netlify ejecuta npm run build. Astro compila el HTML y optimiza las nuevas imágenes.  
5. **Deploy:** La nueva versión del sitio se publica en el CDN global en aproximadamente 1-2 minutos.

## ---

**7\. Estrategia de Migración: De WordPress a Astro**

### **Fase 1: Ingeniería Inversa y Extracción (Días 1-2)**

Como no tenemos acceso directo al backend de WordPress, realizaremos una extracción "Black Box":

1. **Crawling:** Utilizar herramientas como wget o scripts de Node.js para rastrear el sitio actual y descargar todas las imágenes originales a una estructura de carpetas local.  
2. **Mapeo de Rutas:** Listar todas las URLs existentes (e.g., /proyectos/design-2023) para configurar redirecciones en Astro (redirects en configuración) y evitar enlaces rotos (404), preservando el "Link Juice" de SEO existente.  
3. **Extracción de Texto:** Copiar manualmente o mediante script los textos de descripciones y biografías a archivos Markdown iniciales.

### **Fase 2: Desarrollo del "Starter" en Astro (Días 3-6)**

1. **Scaffolding:** Iniciar el proyecto con la plantilla oficial o un starter minimalista (npm create astro@latest).  
2. **Integración de Tailwind CSS:** Para un desarrollo rápido de estilos y diseño responsivo.  
3. **Configuración de Keystatic:** Implementar el esquema de datos definido en la sección 4.1.  
4. **Desarrollo de Componentes:** Crear los componentes base: Navbar, Footer, ProjectCard, MasonryGrid.

### **Fase 3: La Prueba de "La Amiga" (User Acceptance Testing) (Día 7\)**

Antes de lanzar, es crucial validar la **Experiencia de Editor**.

* Desplegar una versión de prueba en Netlify (subdominio staging).  
* Entregar a Raissa el acceso a /keystatic.  
* **Tarea:** Pedirle que suba un nuevo proyecto ficticio con título, descripción y 3 imágenes.  
* **Observación:** Si logra hacerlo sin preguntas, la arquitectura es válida. Si falla, iterar sobre las etiquetas de los campos en Keystatic o simplificar el esquema.

### **Fase 4: Lanzamiento y DNS (Día 8\)**

1. Conectar el dominio raissagr.com a los servidores de nombre de Netlify.  
2. Activar el certificado SSL (HTTPS) automático (Let's Encrypt).  
3. Verificar el funcionamiento del formulario de contacto en producción.

## ---

**8\. Guía de Transferencia: Empoderando a la Usuaria No Técnica**

El éxito final no es el código, sino la autonomía de la usuaria. Entregaremos no solo el sitio, sino un **Manual de Operaciones** simplificado.

### **8.1 Conceptos Clave para la Autora**

Debemos traducir la terminología técnica a lenguaje de usuario:

* No le diremos "Hacer un deploy"; le diremos **"Publicar cambios"**.  
* No hablaremos de "Markdown"; hablaremos de **"El Editor de Texto"**.  
* No mencionaremos "Git"; explicaremos que **"El sistema guarda un historial de cada cambio"**.

### **8.2 Flujo de Trabajo Simplificado**

1. **Acceso:** Entrar a raissagr.com/keystatic.  
2. **Dashboard:** Seleccionar "Proyectos".  
3. **Creación:** Clic en "Crear nuevo". Llenar Título, Fecha y subir Imagen de Portada.  
4. **Galería:** Arrastrar 10 fotos desde su escritorio al área de "Galería". Reordenarlas a gusto.  
5. **Publicación:** Clic en el botón "Publicar".  
6. **Espera:** Explicar que el sitio tardará unos minutos en actualizarse (tiempo de build). Esto es vital para manejar la expectativa de "inmediatez" que tenía con WordPress.

## ---

**9\. Conclusión**

La migración de raissagr.com a Astro representa un salto cualitativo en la madurez digital del portafolio. Pasamos de un modelo **dinámico, vulnerable y pesado** (WordPress) a uno **estático, seguro y ultrarrápido** (Astro).

Al seleccionar **Keystatic** como la interfaz de gestión, respetamos la restricción "no técnica" de la usuaria, proporcionándole una herramienta profesional y limpia, mientras que la arquitectura subyacente basada en Git asegura que el ingeniero (usted) mantenga un control total sobre la calidad del código, el rendimiento y la escalabilidad futura.

Este enfoque no solo resuelve el problema inmediato de rendimiento o diseño, sino que establece una infraestructura de **bajo costo y cero mantenimiento** que servirá a Raissa durante años, permitiéndole enfocarse en lo que realmente importa: su trabajo creativo.

## ---

**10\. Apéndice: Comparativa Técnica de Soluciones de Hosting y CMS**

### **Tabla 1: Comparativa de CMS Git-Based para Usuarios No Técnicos**

| Característica | Keystatic | TinaCMS | CloudCannon |
| :---- | :---- | :---- | :---- |
| **Estilo de Edición** | Formularios en Panel Admin (Dashboard) | Visual Contextual (Sidebar en sitio vivo) | Visual "On-page" y Bloques |
| **Dificultad Setup** | Baja (Plugin de Astro) | Media (Requiere conocimientos de React) | Baja (Basado en archivo config) |
| **Modelo de Hosting** | Auto-alojado / Git (Gratis) | Cloud / Self-hosted (Límites en Free Tier) | SaaS (Tier gratuito generoso) |
| **Gestión de Imágenes** | Buena (Selector estándar) | Excelente (Media Manager dedicado) | Excelente (Integración DAM) |
| **Soporte Astro** | Integración de Primera Clase | Integración de Primera Clase | Soporte Nativo |
| **Ideal Para...** | Desarrolladores que buscan código limpio y UI simple | Usuarios que necesitan ver cambios "en vivo" | Equipos que necesitan un constructor visual tipo Wix |

### **Tabla 2: Restricciones de Capa Gratuita en Hosting**

28

| Métrica | Netlify Starter | Vercel Hobby | Cloudflare Pages |
| :---- | :---- | :---- | :---- |
| **Minutos de Build** | 300 / mes (compartido con ancho de banda en créditos) | 6,000 / mes | Ilimitados (500 ejecuciones) |
| **Ancho de Banda** | 100 GB / mes | 100 GB / mes | Ilimitado |
| **Uso Comercial** | **Permitido** | **Prohibido** (Términos de Servicio) | **Permitido** |
| **Formularios** | 100 envíos/mes (Nativo) | N/A (Requiere terceros) | N/A (Requiere Plugin/Function) |
| **Serverless Fn** | 125k invocaciones / mes | 100k invocaciones / mes | 100k / día (Workers) |

*Nota sobre Vercel:* Aunque técnicamente funciona, el uso de Vercel Hobby para un portafolio profesional que promueve servicios comerciales es una violación de sus términos de servicio, lo que introduce un riesgo innecesario para el proyecto. Netlify o Cloudflare son las opciones seguras y éticas.

#### **Obras citadas**

1. Building a Modern Portfolio with Astro \- Mirza Muric, fecha de acceso: enero 11, 2026, [https://mirzamuric.com/blog/building-modern-portfolio-with-astro/](https://mirzamuric.com/blog/building-modern-portfolio-with-astro/)  
2. SEO for Astro: How to Make the Fastest Framework Also the Smartest \- DEV Community, fecha de acceso: enero 11, 2026, [https://dev.to/cookieduster\_n/seo-for-astro-how-to-make-the-fastest-framework-also-the-smartest-501o](https://dev.to/cookieduster_n/seo-for-astro-how-to-make-the-fastest-framework-also-the-smartest-501o)  
3. How to optimize images in Astro: A step-by-step guide | Uploadcare, fecha de acceso: enero 11, 2026, [https://uploadcare.com/blog/how-to-optimize-images-in-astro/](https://uploadcare.com/blog/how-to-optimize-images-in-astro/)  
4. Gold Award Ceremony 2025 by Girl Scouts of Greater New York \- Issuu, fecha de acceso: enero 11, 2026, [https://issuu.com/girlscoutsnyc/docs/gold\_award\_ceremony\_2025](https://issuu.com/girlscoutsnyc/docs/gold_award_ceremony_2025)  
5. Stay Extra Warm This Season With 66North's Wool Accessories \- Hypebae, fecha de acceso: enero 11, 2026, [https://hypebae.com/2022/12/66north-dyngja-wool-knitwear-balaclava-scarf-beanie-release-where-to-buy](https://hypebae.com/2022/12/66north-dyngja-wool-knitwear-balaclava-scarf-beanie-release-where-to-buy)  
6. View transitions \- Astro Docs, fecha de acceso: enero 11, 2026, [https://docs.astro.build/en/guides/view-transitions/](https://docs.astro.build/en/guides/view-transitions/)  
7. Keystatic vs TinaCMS \- Wisp CMS, fecha de acceso: enero 11, 2026, [https://www.wisp.blog/compare/keystatic/tina](https://www.wisp.blog/compare/keystatic/tina)  
8. User interface \- Docs \- Keystatic, fecha de acceso: enero 11, 2026, [https://keystatic.com/docs/user-interface](https://keystatic.com/docs/user-interface)  
9. Image field \- Docs \- Keystatic, fecha de acceso: enero 11, 2026, [https://keystatic.com/docs/fields/image](https://keystatic.com/docs/fields/image)  
10. Adding Keystatic to an Astro project \- Docs, fecha de acceso: enero 11, 2026, [https://keystatic.com/docs/installation-astro](https://keystatic.com/docs/installation-astro)  
11. TinaCMS for Astro, fecha de acceso: enero 11, 2026, [https://tina.io/astro](https://tina.io/astro)  
12. Media Overview | TinaCMS, fecha de acceso: enero 11, 2026, [https://tina.io/docs/reference/media/overview](https://tina.io/docs/reference/media/overview)  
13. tinacms/tina-astro-starter \- GitHub, fecha de acceso: enero 11, 2026, [https://github.com/tinacms/tina-astro-starter](https://github.com/tinacms/tina-astro-starter)  
14. Using arrays to make a gallery | CloudCannon Documentation, fecha de acceso: enero 11, 2026, [https://cloudcannon.com/documentation/articles/using-arrays-to-make-a-gallery/](https://cloudcannon.com/documentation/articles/using-arrays-to-make-a-gallery/)  
15. What is an Array input? | CloudCannon Documentation, fecha de acceso: enero 11, 2026, [https://cloudcannon.com/documentation/articles/what-is-an-array-input/](https://cloudcannon.com/documentation/articles/what-is-an-array-input/)  
16. Which Top Git-Based CMS Should You Use in 2025? Full Comparison Inside \- StaticMania, fecha de acceso: enero 11, 2026, [https://staticmania.com/blog/top-git-based-cms](https://staticmania.com/blog/top-git-based-cms)  
17. Multiselect field \- Docs \- Keystatic, fecha de acceso: enero 11, 2026, [https://keystatic.com/docs/fields/multiselect](https://keystatic.com/docs/fields/multiselect)  
18. Use Astro's Image component with the Keystatic image field \- Docs, fecha de acceso: enero 11, 2026, [https://keystatic.com/docs/recipes/astro-images](https://keystatic.com/docs/recipes/astro-images)  
19. Zero-dependency responsive masonry layout component for Astro with minimal setup. \- GitHub, fecha de acceso: enero 11, 2026, [https://github.com/OlivierEstevez/astro-masonry](https://github.com/OlivierEstevez/astro-masonry)  
20. Flickering images on morph transitions · Issue \#12045 · withastro/astro \- GitHub, fecha de acceso: enero 11, 2026, [https://github.com/withastro/astro/issues/12045](https://github.com/withastro/astro/issues/12045)  
21. How can I remove flickering in transitions? : r/astrojs \- Reddit, fecha de acceso: enero 11, 2026, [https://www.reddit.com/r/astrojs/comments/1cxtqlr/how\_can\_i\_remove\_flickering\_in\_transitions/](https://www.reddit.com/r/astrojs/comments/1cxtqlr/how_can_i_remove_flickering_in_transitions/)  
22. Forms setup | Netlify Docs, fecha de acceso: enero 11, 2026, [https://docs.netlify.com/forms/setup/](https://docs.netlify.com/forms/setup/)  
23. Web3Forms \- Free Contact Form to Email Service API, fecha de acceso: enero 11, 2026, [https://web3forms.com/](https://web3forms.com/)  
24. Account limits \- Formspree Help, fecha de acceso: enero 11, 2026, [https://help.formspree.io/hc/en-us/articles/47605896654227-Account-limits](https://help.formspree.io/hc/en-us/articles/47605896654227-Account-limits)  
25. Astro Contact Form using free API (with examples) \- Web3Forms, fecha de acceso: enero 11, 2026, [https://web3forms.com/platforms/astro-contact-form](https://web3forms.com/platforms/astro-contact-form)  
26. Astro | Web3Forms, fecha de acceso: enero 11, 2026, [https://docs.web3forms.com/how-to-guides/static-site-generators/astro](https://docs.web3forms.com/how-to-guides/static-site-generators/astro)  
27. Netlify pricing plans and cost breakdown for 2025 \- Orb, fecha de acceso: enero 11, 2026, [https://www.withorb.com/blog/netlify-pricing](https://www.withorb.com/blog/netlify-pricing)  
28. Build Minutes Pricing FAQ \- Netlify, fecha de acceso: enero 11, 2026, [https://www.netlify.com/pricing/faq/](https://www.netlify.com/pricing/faq/)  
29. Introducing Netlify's Free plan, fecha de acceso: enero 11, 2026, [https://www.netlify.com/blog/introducing-netlify-free-plan/](https://www.netlify.com/blog/introducing-netlify-free-plan/)  
30. Pricing and Plans \- Netlify, fecha de acceso: enero 11, 2026, [https://www.netlify.com/pricing/](https://www.netlify.com/pricing/)  
31. Can i use vercel free plan for my startup website? : r/nextjs \- Reddit, fecha de acceso: enero 11, 2026, [https://www.reddit.com/r/nextjs/comments/12kbj4o/can\_i\_use\_vercel\_free\_plan\_for\_my\_startup\_website/](https://www.reddit.com/r/nextjs/comments/12kbj4o/can_i_use_vercel_free_plan_for_my_startup_website/)  
32. Vercel Hobby Plan, fecha de acceso: enero 11, 2026, [https://vercel.com/docs/plans/hobby](https://vercel.com/docs/plans/hobby)