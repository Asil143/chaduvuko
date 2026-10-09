export const THEME_STORAGE_KEY = 'chaduvuko_theme'

/** No stored value means Auto: follow the device's light or dark setting. */
export type ThemePreference = 'light' | 'dark' | 'auto'

// Runs in <head> before first paint.
export const themeInitScript = `try{var p=localStorage.getItem('${THEME_STORAGE_KEY}');document.documentElement.dataset.theme=p==='light'||p==='dark'?p:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}catch(e){document.documentElement.dataset.theme='dark'}`
