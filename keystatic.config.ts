import { config, fields, collection, singleton } from '@keystatic/core';

/**
 * Configuración de Keystatic para el portafolio de Raissa
 * 
 * Este archivo define el esquema de contenido y la configuración del CMS.
 * En desarrollo usa el modo local, en producción usa la API de GitHub.
 */
export default config({
  storage: import.meta.env.DEV 
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: 'NachoSizle/raissa-portfolio'
      },
  
  ui: {
    brand: {
      name: 'Raissa Portfolio'
    },
    navigation: {
      'Contenido': ['projects', 'categories'],
      'Configuración': ['settings', 'about', 'social']
    }
  },

  collections: {
    /**
     * Colección de Proyectos
     * 
     * Cada proyecto representa un trabajo del portafolio con su galería de imágenes,
     * descripción y metadatos asociados.
     */
    projects: collection({
      label: 'Proyectos',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'description' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: {
            label: 'Título del Proyecto',
            description: 'El nombre que aparecerá en la galería y el detalle',
            validation: { isRequired: true }
          }
        }),
        
        date: fields.date({
          label: 'Fecha del Proyecto',
          description: 'Fecha de realización o publicación',
          validation: { isRequired: true },
          defaultValue: { kind: 'today' }
        }),
        
        featured: fields.checkbox({
          label: 'Proyecto Destacado',
          description: 'Mostrar en la página principal',
          defaultValue: false
        }),
        
        category: fields.relationship({
          label: 'Categoría',
          description: 'Categoría principal del proyecto',
          collection: 'categories',
          validation: { isRequired: true }
        }),
        
        tags: fields.array(
          fields.text({ label: 'Etiqueta' }),
          {
            label: 'Etiquetas',
            description: 'Palabras clave para filtrar el proyecto',
            itemLabel: props => props.value || 'Nueva etiqueta'
          }
        ),
        
        coverImage: fields.image({
          label: 'Imagen de Portada',
          description: 'La imagen principal que aparecerá en la galería (recomendado: 1200x800px)',
          directory: 'src/assets/projects',
          publicPath: '@assets/projects/',
          validation: { isRequired: true }
        }),
        
        coverAlt: fields.text({
          label: 'Texto Alternativo (Portada)',
          description: 'Descripción de la imagen para accesibilidad y SEO',
          validation: { isRequired: true }
        }),
        
        gallery: fields.array(
          fields.object({
            image: fields.image({
              label: 'Imagen',
              directory: 'src/assets/projects',
              publicPath: '@assets/projects/',
              validation: { isRequired: true }
            }),
            alt: fields.text({
              label: 'Texto Alternativo',
              description: 'Descripción de la imagen',
              validation: { isRequired: true }
            }),
            caption: fields.text({
              label: 'Pie de Foto',
              description: 'Texto opcional que aparecerá debajo de la imagen'
            })
          }),
          {
            label: 'Galería de Imágenes',
            description: 'Arrastra para reordenar las imágenes',
            itemLabel: props => props.fields.alt.value || 'Nueva imagen'
          }
        ),
        
        description: fields.mdx({
          label: 'Descripción del Proyecto',
          description: 'Cuenta la historia detrás del proyecto',
          options: {
            bold: true,
            italic: true,
            strikethrough: true,
            link: true,
            heading: [2, 3, 4],
            blockquote: true,
            orderedList: true,
            unorderedList: true,
            divider: true
          }
        }),
        
        client: fields.text({
          label: 'Cliente',
          description: 'Nombre del cliente (opcional)'
        }),
        
        externalUrl: fields.url({
          label: 'Enlace Externo',
          description: 'URL del proyecto publicado (opcional)'
        }),
        
        draft: fields.checkbox({
          label: 'Borrador',
          description: 'Los borradores no se publican en el sitio',
          defaultValue: false
        })
      }
    }),

    /**
     * Colección de Categorías
     * 
     * Permite organizar los proyectos por tipo de trabajo.
     */
    categories: collection({
      label: 'Categorías',
      slugField: 'name',
      path: 'src/content/categories/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({
          name: {
            label: 'Nombre de la Categoría',
            validation: { isRequired: true }
          }
        }),
        description: fields.text({
          label: 'Descripción',
          description: 'Breve descripción de esta categoría'
        }),
        color: fields.text({
          label: 'Color (hex)',
          description: 'Color para identificar la categoría (ej: #FF5733)',
          defaultValue: '#6366f1'
        }),
        order: fields.integer({
          label: 'Orden',
          description: 'Orden de aparición en el menú',
          defaultValue: 0
        })
      }
    })
  },

  singletons: {
    /**
     * Configuración General del Sitio
     */
    settings: singleton({
      label: 'Configuración del Sitio',
      path: 'src/content/settings/site',
      format: { data: 'json' },
      schema: {
        siteName: fields.text({
          label: 'Nombre del Sitio',
          validation: { isRequired: true },
          defaultValue: 'Raissa Portfolio'
        }),
        siteDescription: fields.text({
          label: 'Descripción del Sitio',
          description: 'Aparece en los resultados de búsqueda (SEO)',
          validation: { isRequired: true },
          multiline: true
        }),
        logo: fields.image({
          label: 'Logo',
          directory: 'src/assets/brand',
          publicPath: '@assets/brand/'
        }),
        favicon: fields.image({
          label: 'Favicon',
          description: 'Icono que aparece en la pestaña del navegador',
          directory: 'public',
          publicPath: '/'
        }),
        ogImage: fields.image({
          label: 'Imagen OG por defecto',
          description: 'Imagen que aparece al compartir en redes sociales',
          directory: 'src/assets/brand',
          publicPath: '@assets/brand/'
        }),
        contactEmail: fields.text({
          label: 'Email de Contacto',
          validation: { isRequired: true }
        }),
        footerText: fields.text({
          label: 'Texto del Footer',
          defaultValue: '© 2026 Raissa. Todos los derechos reservados.'
        })
      }
    }),

    /**
     * Página "Sobre Mí"
     */
    about: singleton({
      label: 'Sobre Mí',
      path: 'src/content/settings/about',
      format: { contentField: 'bio' },
      schema: {
        headline: fields.text({
          label: 'Titular',
          description: 'Una frase que te defina',
          validation: { isRequired: true }
        }),
        profileImage: fields.image({
          label: 'Foto de Perfil',
          directory: 'src/assets/about',
          publicPath: '@assets/about/',
          validation: { isRequired: true }
        }),
        profileImageAlt: fields.text({
          label: 'Texto Alternativo (Foto)',
          validation: { isRequired: true }
        }),
        bio: fields.mdx({
          label: 'Biografía',
          description: 'Cuenta tu historia profesional',
          options: {
            bold: true,
            italic: true,
            link: true,
            heading: [2, 3],
            blockquote: true,
            orderedList: true,
            unorderedList: true
          }
        }),
        skills: fields.array(
          fields.text({ label: 'Habilidad' }),
          {
            label: 'Habilidades',
            itemLabel: props => props.value || 'Nueva habilidad'
          }
        ),
        experience: fields.array(
          fields.object({
            title: fields.text({ label: 'Puesto', validation: { isRequired: true } }),
            company: fields.text({ label: 'Empresa', validation: { isRequired: true } }),
            period: fields.text({ label: 'Período', validation: { isRequired: true } }),
            description: fields.text({ label: 'Descripción', multiline: true })
          }),
          {
            label: 'Experiencia Laboral',
            itemLabel: props => props.fields.title.value || 'Nueva experiencia'
          }
        ),
        cvFile: fields.file({
          label: 'Currículum (PDF)',
          directory: 'public/downloads',
          publicPath: '/downloads/'
        })
      }
    }),

    /**
     * Redes Sociales
     */
    social: singleton({
      label: 'Redes Sociales',
      path: 'src/content/settings/social',
      format: { data: 'json' },
      schema: {
        instagram: fields.url({
          label: 'Instagram'
        }),
        linkedin: fields.url({
          label: 'LinkedIn'
        }),
        behance: fields.url({
          label: 'Behance'
        }),
        dribbble: fields.url({
          label: 'Dribbble'
        }),
        twitter: fields.url({
          label: 'X (Twitter)'
        }),
        github: fields.url({
          label: 'GitHub'
        }),
        youtube: fields.url({
          label: 'YouTube'
        }),
        pinterest: fields.url({
          label: 'Pinterest'
        })
      }
    })
  }
});
