/**
 * @fileoverview Main entry point for @arcvue/vue-components library
 * @author ArcVue Team
 * @version 1.0.0
 *
 * This file provides multiple export patterns for maximum compatibility:
 *
 * 1. Named Exports (for tree-shaking):
 *    import { Button, Card, Modal } from '@arcvue/vue-components'
 *    import { useDebounce, useLocalStorage, useApi } from '@arcvue/vue-components'
 *
 * 2. Default Exports (for full library import):
 *    import * as ArcVue from '@arcvue/vue-components'
 *
 * 3. Direct Path Imports:
 *    import Button from '@arcvue/vue-components/Button'
 *    import { useApi } from '@arcvue/vue-components/useApi'
 *
 * 4. Theme Utilities:
 *    import { getElevation, getSpacing, BREAKPOINTS } from '@arcvue/vue-components'
 *
 * 5. Plugin Installation:
 *    import ArcVue from '@arcvue/vue-components'
 *    app.use(ArcVue)
 */

// Component imports for plugin registration
import Button from './components/Button/index.js'
import Card from './components/Card/index.js'
import Modal from './components/Modal/index.js'

// Component exports - Named exports for tree-shaking
export { default as Button } from './components/Button/index.js'
export { default as Card } from './components/Card/index.js'
export { default as Modal } from './components/Modal/index.js'

// Composable exports - Named exports for tree-shaking
export { useDebounce } from './composables/useDebounce/index.js'
export { useLocalStorage } from './composables/useLocalStorage/index.js'
export { useApi } from './composables/useApi/index.js'

// Style exports (will be handled by Vite)
import './styles/variables.css'
import './styles/base.css'
import './styles/utilities.css'
import './styles/components.css'

// Theme utilities export
export * from './styles/theme.js'

/**
 * Library version
 * @type {string}
 */
export const version = '1.0.0'

/**
 * Install function for Vue plugin usage
 * Registers all components globally when used as a plugin
 * @param {import('vue').App} app - Vue application instance
 * @param {Object} options - Plugin options
 */
export function install(app, options = {}) {
    // Register all components globally
    app.component('ArcButton', Button)
    app.component('ArcCard', Card)
    app.component('ArcModal', Modal)

    if (options.debug) {
        console.log('ArcVue Components installed', { version, options })
    }
}

// Default export for plugin usage
export default {
    install,
    version
}

// Re-export everything for convenience
export * from './components/Button/index.js'
export * from './components/Card/index.js'
export * from './components/Modal/index.js'
export * from './composables/useDebounce/index.js'
export * from './composables/useLocalStorage/index.js'
export * from './composables/useApi/index.js'