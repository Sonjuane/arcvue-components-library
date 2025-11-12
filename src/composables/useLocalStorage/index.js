/**
 * useLocalStorage Composable
 * @fileoverview Reactive localStorage functionality with JSON serialization for Vue 3
 */

import { ref, watch, onMounted, onUnmounted } from 'vue'

/**
 * Default serializer for JSON data
 * @type {Object}
 */
const defaultSerializer = {
    read: (value) => JSON.parse(value),
    write: (value) => JSON.stringify(value)
}

/**
 * Check if localStorage is available
 * @returns {boolean} True if localStorage is available
 */
function isLocalStorageAvailable() {
    try {
        const test = '__localStorage_test__'
        localStorage.setItem(test, test)
        localStorage.removeItem(test)
        return true
    } catch (e) {
        return false
    }
}

/**
 * Create a reactive ref that syncs with localStorage
 * @param {string} key - localStorage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @param {Object} [options={}] - Configuration options
 * @param {Object} [options.serializer] - Custom serializer with read and write functions
 * @param {boolean} [options.syncAcrossTabs=false] - Listen for storage events across tabs
 * @param {Function} [options.onError] - Error handler for serialization/parsing errors
 * @returns {import('vue').Ref} Reactive ref that syncs with localStorage
 * 
 * @example
 * // Basic usage
 * const count = useLocalStorage('count', 0)
 * count.value++ // Automatically saves to localStorage
 * 
 * @example
 * // With options
 * const user = useLocalStorage('user', null, {
 *   syncAcrossTabs: true,
 *   onError: (error) => console.warn('localStorage error:', error)
 * })
 * 
 * @example
 * // Custom serializer for Date objects
 * const lastLogin = useLocalStorage('lastLogin', new Date(), {
 *   serializer: {
 *     read: (value) => new Date(value),
 *     write: (value) => value.toISOString()
 *   }
 * })
 */
export function useLocalStorage(key, defaultValue, options = {}) {
    const {
        serializer = defaultSerializer,
        syncAcrossTabs = false,
        onError = null
    } = options

    // Check if localStorage is available
    const storageAvailable = isLocalStorageAvailable()

    /**
     * Read value from localStorage
     * @returns {*} Parsed value or defaultValue
     */
    const readValue = () => {
        if (!storageAvailable) {
            return defaultValue
        }

        try {
            const item = localStorage.getItem(key)

            if (item === null) {
                return defaultValue
            }

            return serializer.read(item)
        } catch (error) {
            if (onError) {
                onError(error)
            }
            return defaultValue
        }
    }

    /**
     * Write value to localStorage
     * @param {*} value - Value to write
     */
    const writeValue = (value) => {
        if (!storageAvailable) {
            return
        }

        try {
            const serializedValue = serializer.write(value)
            localStorage.setItem(key, serializedValue)
        } catch (error) {
            if (onError) {
                onError(error)
            }
        }
    }

    // Create reactive ref with initial value from localStorage
    const storedValue = ref(readValue())

    // Watch for changes and sync to localStorage
    watch(storedValue, (newValue) => {
        writeValue(newValue)
    }, { deep: true })

    // Handle storage events for cross-tab synchronization
    let storageEventListener = null

    if (syncAcrossTabs && storageAvailable) {
        storageEventListener = (event) => {
            // Only respond to changes to our specific key from other tabs
            if (event.key === key && event.storageArea === localStorage) {
                try {
                    const newValue = event.newValue === null
                        ? defaultValue
                        : serializer.read(event.newValue)

                    storedValue.value = newValue
                } catch (error) {
                    if (onError) {
                        onError(error)
                    }
                }
            }
        }

        onMounted(() => {
            window.addEventListener('storage', storageEventListener)
        })

        onUnmounted(() => {
            if (storageEventListener) {
                window.removeEventListener('storage', storageEventListener)
            }
        })
    }

    return storedValue
}