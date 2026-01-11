/**
 * Datos de las obras de la artista
 *
 * Archivo compartido para usar en la galería y páginas de detalle.
 * TODO: Migrar a Content Collections cuando haya más obras.
 */

export interface Work {
	slug: string;
	data: {
		title: string;
		coverImage: string;
		category: string;
		year: number;
		description: string;
		dimensions?: string;
		technique?: string;
		available?: boolean;
	};
}

/**
 * Colección de obras de la artista
 */
export const allWorks: Work[] = [
	{
		slug: "fragmentos-de-identidad",
		data: {
			title: "Fragmentos de Identidad",
			coverImage: "/images/hero-artwork-full.jpg",
			category: "Técnica Mixta",
			year: 2024,
			description:
				"Exploración de la identidad a través de capas y texturas. Esta obra representa un viaje introspectivo donde cada capa revela aspectos ocultos del ser, utilizando materiales que evocan memoria y transformación.",
			dimensions: "100 x 80 cm",
			technique: "Acrílico, collage y óleo sobre lienzo",
			available: true,
		},
	},
	{
		slug: "memoria-sensorial",
		data: {
			title: "Memoria Sensorial",
			coverImage: "/images/hero-artwork.jpg",
			category: "Pintura",
			year: 2024,
			description:
				"Obra que evoca recuerdos a través del color y la forma. Los tonos cálidos y las texturas suaves invitan al espectador a sumergirse en sus propias memorias, creando un diálogo íntimo entre la pieza y quien la contempla.",
			dimensions: "80 x 60 cm",
			technique: "Óleo sobre lienzo",
			available: true,
		},
	},
	{
		slug: "dialogo-interior",
		data: {
			title: "Diálogo Interior",
			coverImage: "/images/testimonial-01.jpg",
			category: "Técnica Mixta",
			year: 2023,
			description:
				"Conversación silenciosa entre la emoción y la materia. Esta pieza surge de la necesidad de expresar lo inexpresable, utilizando capas de materiales que se superponen como pensamientos en la mente.",
			dimensions: "120 x 100 cm",
			technique: "Técnica mixta sobre madera",
			available: false,
		},
	},
	{
		slug: "pulso-visual",
		data: {
			title: "Pulso Visual",
			coverImage: "/images/testimonial-02.jpg",
			category: "Pintura",
			year: 2023,
			description:
				"Latido cromático que invita a la contemplación. Una explosión de color que representa el ritmo interno de la vida, la energía que fluye constantemente aunque no siempre la percibamos.",
			dimensions: "90 x 70 cm",
			technique: "Acrílico sobre lienzo",
			available: true,
		},
	},
];

/**
 * Categorías disponibles para filtrar
 */
export const categories = [
	{ id: "all", name: "Todas" },
	{ id: "pintura", name: "Pintura" },
	{ id: "técnica-mixta", name: "Técnica Mixta" },
	{ id: "escultura", name: "Escultura" },
];
