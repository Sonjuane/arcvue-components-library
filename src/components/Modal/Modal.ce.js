import { defineCustomElement } from 'vue'
import ModalComponent from './Modal.vue'
import { makeThemeAware, getCurrentTheme } from '../../styles/theme.js'

/**
 * Custom Element version of the Modal component with theme support
 *
 * This file converts the Vue Modal component into a Custom Element
 * that can be used in vanilla HTML/JavaScript without Vue framework.
 * Includes automatic theme synchronization with the document theme.
 *
 * Usage:
 * <arc-modal size="medium" centered="true">
 *   <div slot="header">Modal Title</div>
 *   <p>Modal content goes here</p>
 *   <div slot="footer">
 *     <button>Cancel</button>
 *     <button>Confirm</button>
 *   </div>
 * </arc-modal>
 *
 * @example
 * // In HTML - Basic modal
 * <arc-modal id="myModal">
 *   <h2 slot="header">Confirmation</h2>
 *   <p>Are you sure you want to proceed?</p>
 *   <div slot="footer">
 *     <button onclick="document.getElementById('myModal').open = false">Cancel</button>
 *     <button onclick="handleConfirm()">Confirm</button>
 *   </div>
 * </arc-modal>
 *
 * @example
 * // Fullscreen modal
 * <arc-modal size="fullscreen" persistent="true">
 *   <h1 slot="header">Full Screen Content</h1>
 *   <div>
 *     <p>This modal takes up the entire viewport.</p>
 *     <p>It cannot be closed by clicking outside or pressing escape.</p>
 *   </div>
 * </arc-modal>
 *
 * @example
 * // In JavaScript - Programmatic control
 * const modal = document.createElement('arc-modal');
 * modal.setAttribute('size', 'large');
 * modal.setAttribute('scrollable', 'true');
 * 
 * const header = document.createElement('div');
 * header.slot = 'header';
 * header.innerHTML = '<h2>Dynamic Modal</h2>';
 * modal.appendChild(header);
 * 
 * const content = document.createElement('div');
 * content.innerHTML = '<p>This modal was created dynamically.</p>';
 * modal.appendChild(content);
 * 
 * const footer = document.createElement('div');
 * footer.slot = 'footer';
 * footer.innerHTML = '<button id="closeBtn">Close</button>';
 * modal.appendChild(footer);
 * 
 * document.body.appendChild(modal);
 * 
 * // Open the modal
 * modal.open = true;
 * 
 * // Listen to events
 * modal.addEventListener('close', () => {
 *   console.log('Modal closed');
 * });
 * 
 * modal.addEventListener('open', () => {
 *   console.log('Modal opened');
 * });
 * 
 * // Close button handler
 * document.getElementById('closeBtn').addEventListener('click', () => {
 *   modal.open = false;
 * });
 *
 * @example
 * // Persistent modal (cannot be closed by backdrop or escape)
 * const persistentModal = document.createElement('arc-modal');
 * persistentModal.setAttribute('persistent', 'true');
 * persistentModal.setAttribute('size', 'small');
 * 
 * const header = document.createElement('div');
 * header.slot = 'header';
 * header.textContent = 'Important Notice';
 * persistentModal.appendChild(header);
 * 
 * const content = document.createElement('p');
 * content.textContent = 'You must acknowledge this message.';
 * persistentModal.appendChild(content);
 * 
 * const footer = document.createElement('div');
 * footer.slot = 'footer';
 * const acknowledgeBtn = document.createElement('button');
 * acknowledgeBtn.textContent = 'I Understand';
 * acknowledgeBtn.onclick = () => {
 *   persistentModal.open = false;
 * };
 * footer.appendChild(acknowledgeBtn);
 * persistentModal.appendChild(footer);
 * 
 * document.body.appendChild(persistentModal);
 * persistentModal.open = true;
 *
 * @example
 * // Theme integration
 * import { setTheme, toggleTheme } from '@arcvue/vue-components';
 * setTheme('dark'); // All arc-modal elements will automatically update
 */

// Create enhanced Custom Element class with theme support
class ArcModalElement extends defineCustomElement(ModalComponent) {
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

    /**
     * Expose open/close methods for easier programmatic control
     */
    get open() {
        return this.modelValue
    }

    set open(value) {
        this.modelValue = value
    }
}

// Use the enhanced class
const ArcModal = ArcModalElement

// Auto-register the custom element when this module is imported
if (typeof customElements !== 'undefined' && !customElements.get('arc-modal')) {
    customElements.define('arc-modal', ArcModal)
}

// Export the custom element class for manual registration if needed
export default ArcModal

/**
 * Manual registration function
 * Use this if you want to register the element with a different name
 * or if you want to control when the registration happens
 * 
 * @param {string} tagName - The custom element tag name (default: 'arc-modal')
 * @example
 * import { registerArcModal } from './Modal.ce.js'
 * registerArcModal('my-custom-modal')
 */
export function registerArcModal(tagName = 'arc-modal') {
    if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
        customElements.define(tagName, ArcModal)
    }
}

/**
 * Check if the custom element is already registered
 * @param {string} tagName - The custom element tag name to check
 * @returns {boolean} True if the element is registered
 */
export function isArcModalRegistered(tagName = 'arc-modal') {
    return typeof customElements !== 'undefined' && !!customElements.get(tagName)
}