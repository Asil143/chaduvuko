import type { Metadata } from 'next'

/** Every page title except the homepage's goes through this template. */
export const TITLE_TEMPLATE = '%s | Chaduvuko'

/**
 * Title for a layout's own page. A layout with a plain string title would
 * clear the template for every page below it, so it is re-declared here.
 */
export function sectionTitle(name: string): Metadata['title'] {
  return { default: name, template: TITLE_TEMPLATE }
}
