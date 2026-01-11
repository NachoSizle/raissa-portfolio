/**
 * Índice del módulo de internacionalización
 *
 * Exporta todas las utilidades y tipos necesarios para i18n
 */

export type { Language } from "./translations";
export {
	defaultLang,
	getLangFromUrl,
	getLocalizedUrl,
	getPathWithoutLang,
	languages,
	localizedPath,
	t,
	translations,
} from "./translations";
