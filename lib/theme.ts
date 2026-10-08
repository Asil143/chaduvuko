export const THEME_STORAGE_KEY = 'chaduvuko_theme'

// Runs in <head> before first paint; dark is the default for first-time visitors.
export const themeInitScript = `try{document.documentElement.dataset.theme=localStorage.getItem('${THEME_STORAGE_KEY}')==='light'?'light':'dark'}catch(e){}`
