/**
 * useDebounce Composable
 * @fileoverview Simple debounce functionality for Vue 3
 */

import { ref, watch } from 'vue'

/**
 * Debounce a reactive value
 * @param {import('vue').Ref} value - Reactive value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {import('vue').Ref} Debounced value
 */
export function useDebounce(value, delay = 300) {
    const debouncedValue = ref(value.value)
    let timeoutId = null

    watch(value, (newValue) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
            debouncedValue.value = newValue
        }, delay)
    })

    return debouncedValue
}