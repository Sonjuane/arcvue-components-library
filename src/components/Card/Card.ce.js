import { defineCustomElement } from 'vue'
import CardComponent from './Card.vue'
import { makeThemeAware, getCurrentTheme } from '../../styles/theme.js'

/**
 * Custom Element version of the Card component with theme support
 *
 * This file converts the Vue Card component into a Custom Element
 * that can be used in vanilla HTML/JavaScript without Vue framework.
 * Includes automatic theme synchronization with the document theme.
 *
 * Usage:
 * <arc-card variant="elevated" padding="large">
 *   <div slot="header">Card Header</div>
 *   <p>Card content goes here</p>
 *   <div slot="footer">Card Footer</div>
 * </arc-card>
 *
 * @example
 * // In HTML
 * <arc-card variant="elevated">
 *   <h3 slot="header">Product Card</h3>
 *   <p>This is a product description with elevated styling.</p>
 *   <button slot="footer">Buy Now</button>
 * </arc-card>
 *
 * @example
 * // Clickable card
 * <arc-card variant="outlined" clickable="true">
 *   <h3>Clickable Card</h3>
 *   <p>This card responds to clicks and keyboard navigation.</p>
 * </arc-card>
 *
 * @example
 * // In JavaScript
 * const card = document.createElement('arc-card');
 * card.setAttribute('variant', 'filled');
 * card.setAttribute('padding', 'large');
 * card.setAttribute('clickable', 'true');
 * 
 * const header = document.createElement('div');
 * header.slot = 'header';
 * header.textContent = 'Dynamic Card Header';
 * card.appendChild(header);
 * 
 * const content = document.createElement('p');
 * content.textContent = 'Dynamic card content';
 * card.appendChild(content);
 * 
 * document.body.appendChild(card);
 *
 * // Listen to events
 * card.addEventListener('click', (event) => {
 *   console.log('Card clicked!', event);
 * });
 *
 * @example
 * // Theme integration
 * import { setTheme, toggleTheme } from '@arcvue/vue-components';
 * setTheme('dark'); // All arc-card elements will automatically update
 */

// Create enhanced Custom Element class with theme support
class ArcCardElement extends defineCustomElement(CardComponent) {
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
const ArcCard = ArcCardElement

// Auto-register the custom element when this module is imported
if (typeof customElements !== 'undefined' && !customElements.get('arc-card')) {
    customElements.define('arc-card', ArcCard)
}

// Export the custom element class for manual registration if needed
export default ArcCard

/**
 * Manual registration function
 * Use this if you want to register the element with a different name
 * or if you want to control when the registration happens
 * 
 * @param {string} tagName - The custom element tag name (default: 'arc-card')
 * @example
 * import { registerArcCard } from './Card.ce.js'
 * registerArcCard('my-custom-card')
 */
export function registerArcCard(tagName = 'arc-card') {
    if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
        customElements.define(tagName, ArcCard)
    }
}

/**
 * Check if the custom element is already registered
 * @param {string} tagName - The custom element tag name to check
 * @returns {boolean} True if the element is registered
 */
export function isArcCardRegistered(tagName = 'arc-card') {
    return typeof customElements !== 'undefined' && !!customElements.get(tagName)
}