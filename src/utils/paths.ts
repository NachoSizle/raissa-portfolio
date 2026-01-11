/**
 * Utilidades para manejo de rutas con BASE_URL
 * 
 * Astro puede tener BASE_URL con o sin trailing slash dependiendo
 * de la configuración. Estas funciones aseguran rutas correctas.
 */

/**
 * Obtiene el base path normalizado (siempre con trailing slash)
 * @returns Base path con trailing slash
 */
export function getBase(): string {
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? base : `${base}/`;
}

/**
 * Construye una URL completa con el base path
 * @param path - Ruta relativa (sin leading slash)
 * @returns URL completa con base path
 */
export function url(path: string): string {
  const base = getBase();
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}

/**
 * Resuelve rutas de imágenes con el base path
 * @param imagePath - Ruta de imagen (puede empezar con /)
 * @returns Ruta completa de imagen
 */
export function resolveImage(imagePath: string): string {
  const base = getBase();
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  return `${base}${cleanPath}`;
}
