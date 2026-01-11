/**
 * Sistema de Internacionalización (i18n)
 *
 * Contiene todas las traducciones del sitio en español e inglés.
 * Estructura organizada por secciones para fácil mantenimiento.
 */

export const languages = {
	es: "Español",
	en: "English",
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = "es";

/**
 * Traducciones organizadas por sección
 */
export const translations = {
	es: {
		// Navegación
		nav: {
			obra: "Obra",
			sobreMi: "Sobre mí",
			contacto: "Contacto",
			inicio: "Inicio",
		},

		// Página de inicio
		home: {
			subtitle: "Arte desde la emoción y la materia",
			description:
				"En esta web encontrarás obras originales, proyectos personalizados y una práctica artística en constante investigación, pensada para quienes buscan piezas que resuenen más allá de la forma.",
			verObra: "Ver Obra",
			contactar: "Contactar",
			miTrabajo: "Mi trabajo",
			ventanaTrabajo: "Este sitio es una ventana a mi trabajo",
			coleccionCuadros:
				"Una colección de cuadros que abarcan diferentes etapas y estilos.",
			sobreMi: "Sobre mí",
			sobreMiIntro:
				"Soy Raissa, artista visual apasionada por explorar la mente, la identidad y todo aquello que se mueve entre lo tangible y lo emocional.",
			trabajoNace:
				"Mi trabajo nace de la experimentación constante y del impulso por transformar sensaciones en obras que conecten con quien las mira.",
			pintoParaEntender:
				"Pinto para entender, para sentir y para generar un diálogo sincero a través del color, el símbolo y la intuición.",
			bienvenido: "Bienvenido a mi espacio creativo.",
			conocerMas: "Conocer más",
			portafolio: "Portafolio",
			obraReciente: "Obra reciente",
			verTodaObra: "Ver toda la obra",
			testimonios: "Testimonios",
			vocesAcompanan: "Voces que acompañan mi obra",
			conectemos: "¿Conectamos?",
			estariaEncantada:
				"Estaría encantada de saber de ti. Ya sea para hablar sobre una obra, una colaboración o simplemente para saludar.",
			escribeme: "Escríbeme",
		},

		// Página de obra
		obra: {
			titulo: "Obra",
			subtitulo: "Portafolio de arte y pintura",
			descripcion:
				"Una colección de cuadros que abarcan diferentes etapas y estilos, donde cada pieza es un diálogo entre la emoción y la materia.",
			todas: "Todas",
			pintura: "Pintura",
			tecnicaMixta: "Técnica Mixta",
			escultura: "Escultura",
			galeriaVacia: "La galería está vacía",
			galeriaVaciaDesc:
				"Pronto encontrarás aquí mi colección de obras. Mientras tanto, puedes contactarme para conocer más sobre mi trabajo.",
			anadirObra: "Añadir obra",
			interesadoPieza: "¿Interesado en una pieza?",
			interesadoDesc:
				"Si alguna obra ha captado tu atención o deseas encargar un proyecto personalizado, estaré encantada de conversar contigo.",
		},

		// Página sobre mí
		sobreMi: {
			titulo: "Sobre mí",
			subtitulo: "Artista visual",
			intro:
				"Me llamo Raissa y soy artista visual. Trabajo desde Altea, Alicante, explorando las posibilidades expresivas de la pintura, el collage y la técnica mixta.",
			propuesta: "Mi propuesta",
			propuestaTexto:
				"Mi obra se mueve entre lo íntimo y lo colectivo, buscando traducir emociones, memorias y fragmentos de identidad en un lenguaje visual que invite a la contemplación.",
			tecnicas: "Técnicas y materiales",
			tecnicasTexto:
				"Trabajo principalmente con óleo, acrílico y técnica mixta sobre lienzo y madera. Experimento con texturas, capas y collage para crear superficies que respiren y evolucionen.",
			trayectoria: "Trayectoria y exposiciones",
			trayectoriaTexto:
				"He expuesto en espacios como el MUA (Museo de la Universidad de Alicante) y el Palau Altea Centre d'Arts, entre otros. Mi trabajo forma parte de colecciones privadas en España y Europa.",
		},

		// Página de contacto
		contacto: {
			titulo: "Contacto",
			subtitulo: "Hablemos",
			intro:
				"Ya sea para consultar sobre una obra, encargar un proyecto personalizado o simplemente saludar, estaré encantada de leerte.",
			email: "Email",
			instagram: "Instagram",
			nombreLabel: "Nombre",
			nombrePlaceholder: "Tu nombre",
			emailLabel: "Email",
			emailPlaceholder: "tu@email.com",
			mensajeLabel: "Mensaje",
			mensajePlaceholder: "Cuéntame sobre tu proyecto o consulta...",
			enviar: "Enviar mensaje",
			gracias: "¡Gracias por tu mensaje!",
			graciasDesc: "He recibido tu mensaje y te responderé lo antes posible.",
			volverInicio: "Volver al inicio",
		},

		// Footer
		footer: {
			derechos: "Todos los derechos reservados.",
			navegacion: "Navegación",
			sigueme: "Sígueme",
		},

		// Características (home)
		features: {
			f1Title: "Lenguaje visual introspectivo",
			f1Desc:
				"La obra parte de la emoción y se construye desde el gesto, la memoria y lo sensorial.",
			f2Title: "Exploración material constante",
			f2Desc:
				"Trabajo con técnicas mixtas, madera, óleo, acrílico y escultura desde un enfoque experimental.",
			f3Title: "Producción honesta y libre",
			f3Desc:
				"Solo hay pulsos visuales abiertos a la interpretación del espectador.",
			f4Title: "Obra entre lo íntimo y lo colectivo",
			f4Desc:
				"Cada pieza contiene fragmentos de identidad que buscan resonar más allá de lo personal.",
			f5Title: "Trayectoria emergente sólida",
			f5Desc:
				"Con exposiciones en espacios como el MUA de Alicante y Palau Altea, mi obra crece con coherencia conceptual y material.",
		},

		// Detalle de obra
		obraDetalle: {
			volverGaleria: "Volver a la galería",
			dimensiones: "Dimensiones",
			tecnica: "Técnica",
			disponibilidad: "Disponibilidad",
			disponible: "Disponible",
			vendida: "Vendida",
			consultarObra: "Consultar sobre esta obra",
			otrasObras: "Otras obras",
		},

		// Testimonios
		testimonials: {
			t1Quote:
				"Sus piezas tienen una fuerza silenciosa que te atrapa. No buscan explicarse, sino sentirse, y transforma por completo la energía del lugar.",
			t1Author: "Coleccionista privado",
			t2Quote:
				"Las obras de Raissa transmiten una sensibilidad única; cada pieza invita a detenerse y sentir.",
			t2Author: "@albittfckb_",
		},

		// Obras (títulos y descripciones)
		works: {
			fragmentosIdentidad: {
				title: "Fragmentos de Identidad",
				description:
					"Exploración de la identidad a través de capas y texturas. Esta obra representa un viaje introspectivo donde cada capa revela aspectos ocultos del ser, utilizando materiales que evocan memoria y transformación.",
			},
			memoriaSensorial: {
				title: "Memoria Sensorial",
				description:
					"Obra que evoca recuerdos a través del color y la forma. Los tonos cálidos y las texturas suaves invitan al espectador a sumergirse en sus propias memorias, creando un diálogo íntimo entre la pieza y quien la contempla.",
			},
			dialogoInterior: {
				title: "Diálogo Interior",
				description:
					"Conversación silenciosa entre la emoción y la materia. Esta pieza surge de la necesidad de expresar lo inexpresable, utilizando capas de materiales que se superponen como pensamientos en la mente.",
			},
			pulsoVisual: {
				title: "Pulso Visual",
				description:
					"Latido cromático que invita a la contemplación. Una explosión de color que representa el ritmo interno de la vida, la energía que fluye constantemente aunque no siempre la percibamos.",
			},
		},
	},

	en: {
		// Navigation
		nav: {
			obra: "Work",
			sobreMi: "About",
			contacto: "Contact",
			inicio: "Home",
		},

		// Home page
		home: {
			subtitle: "Art from emotion and matter",
			description:
				"On this website you will find original works, custom projects, and an artistic practice in constant research, designed for those seeking pieces that resonate beyond form.",
			verObra: "View Work",
			contactar: "Contact",
			miTrabajo: "My work",
			ventanaTrabajo: "This site is a window into my work",
			coleccionCuadros:
				"A collection of paintings spanning different stages and styles.",
			sobreMi: "About me",
			sobreMiIntro:
				"I'm Raissa, a visual artist passionate about exploring the mind, identity, and everything that moves between the tangible and the emotional.",
			trabajoNace:
				"My work is born from constant experimentation and the drive to transform sensations into pieces that connect with the viewer.",
			pintoParaEntender:
				"I paint to understand, to feel, and to generate a sincere dialogue through color, symbol, and intuition.",
			bienvenido: "Welcome to my creative space.",
			conocerMas: "Learn more",
			portafolio: "Portfolio",
			obraReciente: "Recent work",
			verTodaObra: "View all work",
			testimonios: "Testimonials",
			vocesAcompanan: "Voices that accompany my work",
			conectemos: "Shall we connect?",
			estariaEncantada:
				"I would love to hear from you. Whether to discuss a piece, a collaboration, or just to say hello.",
			escribeme: "Write to me",
		},

		// Work page
		obra: {
			titulo: "Work",
			subtitulo: "Art and painting portfolio",
			descripcion:
				"A collection of paintings spanning different stages and styles, where each piece is a dialogue between emotion and matter.",
			todas: "All",
			pintura: "Painting",
			tecnicaMixta: "Mixed Media",
			escultura: "Sculpture",
			galeriaVacia: "The gallery is empty",
			galeriaVaciaDesc:
				"Soon you will find my collection of works here. In the meantime, you can contact me to learn more about my work.",
			anadirObra: "Add work",
			interesadoPieza: "Interested in a piece?",
			interesadoDesc:
				"If any work has caught your attention or you wish to commission a custom project, I would be happy to talk with you.",
		},

		// About page
		sobreMi: {
			titulo: "About me",
			subtitulo: "Visual artist",
			intro:
				"My name is Raissa and I am a visual artist. I work from Altea, Alicante, exploring the expressive possibilities of painting, collage, and mixed media.",
			propuesta: "My approach",
			propuestaTexto:
				"My work moves between the intimate and the collective, seeking to translate emotions, memories, and fragments of identity into a visual language that invites contemplation.",
			tecnicas: "Techniques and materials",
			tecnicasTexto:
				"I mainly work with oil, acrylic, and mixed media on canvas and wood. I experiment with textures, layers, and collage to create surfaces that breathe and evolve.",
			trayectoria: "Career and exhibitions",
			trayectoriaTexto:
				"I have exhibited in spaces such as the MUA (Museum of the University of Alicante) and Palau Altea Centre d'Arts, among others. My work is part of private collections in Spain and Europe.",
		},

		// Contact page
		contacto: {
			titulo: "Contact",
			subtitulo: "Let's talk",
			intro:
				"Whether to inquire about a work, commission a custom project, or just say hello, I would love to hear from you.",
			email: "Email",
			instagram: "Instagram",
			nombreLabel: "Name",
			nombrePlaceholder: "Your name",
			emailLabel: "Email",
			emailPlaceholder: "you@email.com",
			mensajeLabel: "Message",
			mensajePlaceholder: "Tell me about your project or inquiry...",
			enviar: "Send message",
			gracias: "Thank you for your message!",
			graciasDesc:
				"I have received your message and will respond as soon as possible.",
			volverInicio: "Back to home",
		},

		// Footer
		footer: {
			derechos: "All rights reserved.",
			navegacion: "Navigation",
			sigueme: "Follow me",
		},

		// Features (home)
		features: {
			f1Title: "Introspective visual language",
			f1Desc:
				"The work starts from emotion and is built from gesture, memory, and the sensory.",
			f2Title: "Constant material exploration",
			f2Desc:
				"I work with mixed techniques, wood, oil, acrylic, and sculpture from an experimental approach.",
			f3Title: "Honest and free production",
			f3Desc:
				"There are only visual pulses open to the viewer's interpretation.",
			f4Title: "Work between the intimate and the collective",
			f4Desc:
				"Each piece contains fragments of identity that seek to resonate beyond the personal.",
			f5Title: "Solid emerging career",
			f5Desc:
				"With exhibitions in spaces like the MUA in Alicante and Palau Altea, my work grows with conceptual and material coherence.",
		},

		// Work detail
		obraDetalle: {
			volverGaleria: "Back to gallery",
			dimensiones: "Dimensions",
			tecnica: "Technique",
			disponibilidad: "Availability",
			disponible: "Available",
			vendida: "Sold",
			consultarObra: "Inquire about this piece",
			otrasObras: "Other works",
		},

		// Testimonials
		testimonials: {
			t1Quote:
				"Her pieces have a quiet strength that captivates you. They don't seek to explain themselves, but to be felt, and they completely transform the energy of a space.",
			t1Author: "Private collector",
			t2Quote:
				"Raissa's works convey a unique sensitivity; each piece invites you to pause and feel.",
			t2Author: "@albittfckb_",
		},

		// Works (titles and descriptions)
		works: {
			fragmentosIdentidad: {
				title: "Fragments of Identity",
				description:
					"An exploration of identity through layers and textures. This work represents an introspective journey where each layer reveals hidden aspects of the self, using materials that evoke memory and transformation.",
			},
			memoriaSensorial: {
				title: "Sensory Memory",
				description:
					"A work that evokes memories through color and form. Warm tones and soft textures invite viewers to immerse themselves in their own memories, creating an intimate dialogue between the piece and its observer.",
			},
			dialogoInterior: {
				title: "Inner Dialogue",
				description:
					"A silent conversation between emotion and matter. This piece arises from the need to express the inexpressible, using layers of materials that overlap like thoughts in the mind.",
			},
			pulsoVisual: {
				title: "Visual Pulse",
				description:
					"A chromatic heartbeat that invites contemplation. An explosion of color representing the internal rhythm of life, the energy that flows constantly even when we don't perceive it.",
			},
		},
	},
} as const;

/**
 * Obtiene la traducción para una clave específica
 * @param lang - Idioma actual
 * @param key - Clave de traducción (ej: 'nav.obra')
 * @returns El texto traducido
 */
export function t(lang: Language, key: string): string {
	const keys = key.split(".");
	let value: any = translations[lang];

	for (const k of keys) {
		value = value?.[k];
	}

	return value || key;
}

/**
 * Obtiene el idioma desde la URL o cookie
 * @param url - URL actual
 * @returns El idioma detectado o el por defecto
 */
export function getLangFromUrl(url: URL): Language {
	const pathname = url.pathname;
	
	// Obtener el base path de la configuración (ej: /raissa-portfolio)
	const base = import.meta.env.BASE_URL || '/';
	const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
	
	// Quitar el base path del pathname para trabajar con rutas relativas
	let relativePath = pathname;
	if (normalizedBase && normalizedBase !== '/' && pathname.startsWith(normalizedBase)) {
		relativePath = pathname.slice(normalizedBase.length) || '/';
	}
	
	// Ahora buscar el idioma en la ruta relativa
	const [, lang] = relativePath.split("/");
	if (lang in languages) {
		return lang as Language;
	}
	return defaultLang;
}

/**
 * Genera la URL equivalente en otro idioma
 * @param url - URL actual
 * @param lang - Idioma destino
 * @returns Nueva URL con el idioma
 */
export function getLocalizedUrl(url: URL, lang: Language): string {
	const pathname = url.pathname;
	const currentLang = getLangFromUrl(url);
	
	// Obtener el base path de la configuración (ej: /raissa-portfolio)
	const base = import.meta.env.BASE_URL || '/';
	const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
	
	// Quitar el base path del pathname para trabajar con rutas relativas
	let relativePath = pathname;
	if (normalizedBase && normalizedBase !== '/' && pathname.startsWith(normalizedBase)) {
		relativePath = pathname.slice(normalizedBase.length) || '/';
	}

	// Si estamos en español (idioma por defecto), las rutas no tienen prefijo
	// Si estamos en inglés, las rutas tienen /en/ prefijo

	let newRelativePath: string;
	
	if (currentLang === defaultLang) {
		// Estamos en español, añadir prefijo si vamos a inglés
		if (lang === "en") {
			newRelativePath = `/en${relativePath === '/' ? '' : relativePath}`;
		} else {
			newRelativePath = relativePath;
		}
	} else {
		// Estamos en inglés, quitar prefijo si vamos a español
		if (lang === defaultLang) {
			newRelativePath = relativePath.replace(/^\/en/, "") || "/";
		} else {
			newRelativePath = relativePath;
		}
	}
	
	// Reconstruir la URL completa con el base path
	if (normalizedBase && normalizedBase !== '/') {
		return `${normalizedBase}${newRelativePath}`;
	}
	return newRelativePath;
}

/**
 * Genera la ruta con prefijo de idioma
 * @param path - Ruta base (ej: '/obra')
 * @param lang - Idioma
 * @returns Ruta con prefijo si es necesario
 */
export function localizedPath(path: string, lang: Language): string {
	if (lang === defaultLang) {
		return path;
	}
	return `/${lang}${path}`;
}

/**
 * Obtiene la ruta sin el prefijo de idioma
 * @param pathname - Ruta actual
 * @returns Ruta sin prefijo
 */
export function getPathWithoutLang(pathname: string): string {
	const match = pathname.match(/^\/(en|es)(\/.*)?$/);
	if (match) {
		return match[2] || "/";
	}
	return pathname;
}
