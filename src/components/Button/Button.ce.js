import { defineCustomElement } from 'vue'
import ButtonComponent from './Button.vue'
import { makeThemeAware, getCurrentTheme } from '../../styles/theme.js'

/**
 * Custom Element version of the Button component with theme support
 *
 * This file converts the Vue Button component into a Custom Element
 * that can be used in vanilla HTML/JavaScript without Vue framework.
 * Includes automatic theme synchronization with the document theme.
 *
 * Usage:
 * <arc-button variant="primary" size="md">Click me</arc-button>
 *
 * @example
 * // In HTML
 * <arc-button variant="primary">Primary Button</arc-button>
 * <arc-button variant="secondary" size="lg">Large Secondary</arc-button>
 * <arc-button variant="outline" disabled>Disabled Outline</arc-button>
 *
 * @example
 * // In JavaScript
 * const button = document.createElement('arc-button');
 * button.setAttribute('variant', 'primary');
 * button.textContent = 'Dynamic Button';
 * document.body.appendChild(button);
 *
 * // Listen to events
 * button.addEventListener('click', (event) => {
 *   console.log('Button clicked!', event);
 * });
 *
 * @example
 * // Theme integration
 * import { setTheme, toggleTheme } from '@arcvue/vue-components';
 * setTheme('dark'); // All arc-button elements will automatically update
 */

// Create enhanced Custom Element class with theme support
class ArcButtonElement extends defineCustomElement(ButtonComponent) {
    constructor() {
        super()
        this._themeCleanup = null
    }

    connectedCallback() {
        super.connectedCallback()

        // Make this element theme-aware
        if (this.shadowRoot) {
            this._themeCleanup = makeThemeAware(this)
        }

        // Set initial theme
        const currentTheme = getCurrentTheme()
        this.setAttribute('data-theme', currentTheme)
    }

    disconnectedCallback() {
        super.disconnectedCallback()

        // Cleanup theme listener
        if (this._themeCleanup) {
            this._themeCleanup()
            this._themeCleanup = null
        }
    }
}

// Use the enhanced class
const ArcButton = ArcButtonElement

// Auto-register the custom element when this module is imported
if (typeof customElements !== 'undefined' && !customElements.get('arc-button')) {
    customElements.define('arc-button', ArcButton)
}

// Export the custom element class for manual registration if needed
export default ArcButton

/**
 * Manual registration function
 * Use this if you want to register the element with a different name
 * or if you want to control when the registration happens
 * 
 * @param {string} tagName - The custom element tag name (default: 'arc-button')
 * @example
 * import { registerArcButton } from './Button.ce.js'
 * registerArcButton('my-custom-button')
 */
export function registerArcButton(tagName = 'arc-button') {
    if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
        customElements.define(tagName, ArcButton)
    }
}

/**
 * Check if the custom element is already registered
 * @param {string} tagName - The custom element tag name to check
 * @returns {boolean} True if the element is registered
 */
export function isArcButtonRegistered(tagName = 'arc-button') {
    return typeof customElements !== 'undefined' && !!customElements.get(tagName)
}