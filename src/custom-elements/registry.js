/**
 * Custom Elements Registry Utilities
 * 
 * This module provides utilities for registering and managing
 * Vue-based Custom Elements in vanilla JavaScript environments.
 * 
 * @example
 * import { registerAll, registerComponent } from './registry.js'
 * 
 * // Register all available components
 * registerAll()
 * 
 * // Or register individual components
 * registerComponent('Button')
 */

/**
 * Available components for Custom Element registration
 * Add new components here as they are created
 */
const AVAILABLE_COMPONENTS = {
    Button: () => import('../components/Button/Button.ce.js')
}

/**
 * Registry to track registered custom elements
 */
const registeredElements = new Set()

/**
 * Register a single component as a Custom Element
 * 
 * @param {string} componentName - Name of the component to register
 * @param {string} [tagName] - Custom tag name (defaults to arc-{componentName.toLowerCase()})
 * @returns {Promise<boolean>} True if registration was successful
 * 
 * @example
 * await registerComponent('Button')
 * await registerComponent('Button', 'my-button')
 */
export async function registerComponent(componentName, tagName) {
    if (!AVAILABLE_COMPONENTS[componentName]) {
        console.warn(`Component "${componentName}" is not available for Custom Element registration`)
        return false
    }

    const defaultTagName = `arc-${componentName.toLowerCase()}`
    const elementTagName = tagName || defaultTagName

    // Check if already registered
    if (registeredElements.has(elementTagName)) {
        console.log(`Custom Element "${elementTagName}" is already registered`)
        return true
    }

    // Check if the tag name is already taken by another element
    if (typeof customElements !== 'undefined' && customElements.get(elementTagName)) {
        console.warn(`Tag name "${elementTagName}" is already registered by another element`)
        return false
    }

    try {
        // Dynamically import and register the component
        const module = await AVAILABLE_COMPONENTS[componentName]()

        if (typeof customElements !== 'undefined') {
            customElements.define(elementTagName, module.default)
            registeredElements.add(elementTagName)
            console.log(`✅ Registered Custom Element: <${elementTagName}>`)
            return true
        } else {
            console.warn('customElements API is not available in this environment')
            return false
        }
    } catch (error) {
        console.error(`Failed to register component "${componentName}":`, error)
        return false
    }
}

/**
 * Register all available components as Custom Elements
 * 
 * @param {Object} [options] - Registration options
 * @param {string} [options.prefix='arc'] - Prefix for tag names
 * @param {string[]} [options.exclude] - Component names to exclude
 * @returns {Promise<Object>} Registration results
 * 
 * @example
 * await registerAll()
 * await registerAll({ prefix: 'my', exclude: ['Button'] })
 */
export async function registerAll(options = {}) {
    const { prefix = 'arc', exclude = [] } = options
    const results = {
        success: [],
        failed: [],
        skipped: []
    }

    for (const componentName of Object.keys(AVAILABLE_COMPONENTS)) {
        if (exclude.includes(componentName)) {
            results.skipped.push(componentName)
            continue
        }

        const tagName = `${prefix}-${componentName.toLowerCase()}`
        const success = await registerComponent(componentName, tagName)

        if (success) {
            results.success.push({ componentName, tagName })
        } else {
            results.failed.push({ componentName, tagName })
        }
    }

    console.log(`🎉 Custom Elements registration complete:`)
    console.log(`   ✅ Success: ${results.success.length}`)
    console.log(`   ❌ Failed: ${results.failed.length}`)
    console.log(`   ⏭️  Skipped: ${results.skipped.length}`)

    return results
}

/**
 * Check if a Custom Element is registered
 * 
 * @param {string} tagName - Tag name to check
 * @returns {boolean} True if the element is registered
 * 
 * @example
 * if (isRegistered('arc-button')) {
 *   console.log('Button component is available')
 * }
 */
export function isRegistered(tagName) {
    return typeof customElements !== 'undefined' && !!customElements.get(tagName)
}

/**
 * Get all registered Custom Elements from this library
 * 
 * @returns {string[]} Array of registered tag names
 */
export function getRegisteredElements() {
    return Array.from(registeredElements)
}

/**
 * Unregister a Custom Element (if supported by the browser)
 * Note: Most browsers don't support unregistering custom elements
 * 
 * @param {string} tagName - Tag name to unregister
 * @returns {boolean} True if unregistration was attempted
 */
export function unregisterComponent(tagName) {
    if (typeof customElements !== 'undefined' && customElements.get(tagName)) {
        console.warn(`Cannot unregister "${tagName}" - browsers don't support Custom Element unregistration`)
        console.warn('Consider using a different tag name or reloading the page')
        return false
    }

    registeredElements.delete(tagName)
    return true
}

/**
 * Wait for a Custom Element to be defined
 * 
 * @param {string} tagName - Tag name to wait for
 * @param {number} [timeout=5000] - Timeout in milliseconds
 * @returns {Promise<void>} Resolves when element is defined
 * 
 * @example
 * await waitForElement('arc-button')
 * console.log('Button element is now available')
 */
export function waitForElement(tagName, timeout = 5000) {
    if (typeof customElements === 'undefined') {
        return Promise.reject(new Error('customElements API is not available'))
    }

    return Promise.race([
        customElements.whenDefined(tagName),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Timeout waiting for ${tagName}`)), timeout)
        )
    ])
}

/**
 * Auto-register components when this module is imported
 * Set to false if you want manual control over registration
 */
export const AUTO_REGISTER = true

// Auto-register all components if enabled
if (AUTO_REGISTER && typeof window !== 'undefined') {
    // Use setTimeout to avoid blocking the main thread
    setTimeout(() => {
        registerAll().catch(error => {
            console.error('Auto-registration failed:', error)
        })
    }, 0)
}