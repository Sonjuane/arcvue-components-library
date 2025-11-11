/**
 * @fileoverview Main entry point for @arcvue/vue-components library
 * @author ArcVue Team
 * @version 1.0.0
 */

// Component exports
export { default as Button } from './components/Button/index.js'

// Composable exports  
export { useDebounce } from './composables/useDebounce/index.js'

// Style exports (will be handled by Vite)
import './styles/base.css'
import './styles/variables.css'

/**
 * Library version
 * @type {string}
 */
export const version = '1.0.0'

/**
 * Install function for Vue plugin usage
 * @param {import('vue').App} app - Vue application instance
 * @param {Object} options - Plugin options
 */
export function install(app, options = {}) {
    // Register components globally if needed
    // This is optional - components can be imported individually
    console.log('ArcVue Components installed', { version, options })
}

// Default export for plugin usage
export default {
    install,
    version
}