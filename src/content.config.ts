import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Configuración de Content Collections
 *
 * Define los esquemas de validación para el contenido del portafolio.
 */

// Colección de Proyectos
const projects = defineCollection({
	loader: glob({ pattern: "**/*.mdoc", base: "./src/content/projects" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			date: z.coerce.date(),
			featured: z.boolean().default(false),
			category: z.string(),
			tags: z.array(z.string()).default([]),
			coverImage: image(),
			coverAlt: z.string(),
			gallery: z
				.array(
					z.object({
						image: image(),
						alt: z.string(),
						caption: z.string().optional(),
					}),
				)
				.default([]),
			client: z.string().optional(),
			externalUrl: z.string().url().optional(),
			draft: z.boolean().default(false),
		}),
});

// Colección de Categorías
const categories = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "./src/content/categories" }),
	schema: z.object({
		name: z.string(),
		description: z.string().optional(),
		color: z.string().default("#6366f1"),
		order: z.number().default(0),
	}),
});

// Singleton de Configuración del Sitio
const settings = defineCollection({
	loader: glob({ pattern: "site.json", base: "./src/content/settings" }),
	schema: z.object({
		siteName: z.string(),
		siteDescription: z.string(),
		contactEmail: z.string().email(),
		footerText: z.string().optional(),
	}),
});

// Singleton de Redes Sociales
const social = defineCollection({
	loader: glob({ pattern: "social.json", base: "./src/content/settings" }),
	schema: z.object({
		instagram: z.string().url().nullable().optional(),
		linkedin: z.string().url().nullable().optional(),
		behance: z.string().url().nullable().optional(),
		dribbble: z.string().url().nullable().optional(),
		twitter: z.string().url().nullable().optional(),
		github: z.string().url().nullable().optional(),
		youtube: z.string().url().nullable().optional(),
		pinterest: z.string().url().nullable().optional(),
	}),
});

export const collections = {
	projects,
	categories,
	settings,
	social,
};
