/**
 * useApi Composable
 * @fileoverview HTTP request management with loading states and error handling for Vue 3
 */

import { ref, watch, onMounted, onUnmounted } from 'vue'

/**
 * Create a reactive API request handler with loading and error states
 * @param {string} url - API endpoint URL
 * @param {Object} [options={}] - Configuration options
 * @param {string} [options.method='GET'] - HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param {*} [options.body] - Request body (automatically JSON stringified for objects)
 * @param {Object} [options.headers] - Custom headers
 * @param {boolean} [options.immediate=true] - Execute request immediately on mount
 * @param {Function} [options.onSuccess] - Success callback function
 * @param {Function} [options.onError] - Error callback function
 * @param {Function} [options.transform] - Transform response data function
 * @param {number} [options.timeout] - Request timeout in milliseconds
 * @returns {Object} API request state and control functions
 * @returns {import('vue').Ref} returns.data - Response data
 * @returns {import('vue').Ref} returns.loading - Loading state
 * @returns {import('vue').Ref} returns.error - Error state
 * @returns {Function} returns.execute - Manually trigger request
 * @returns {Function} returns.abort - Abort ongoing request
 * 
 * @example
 * // Basic GET request
 * const { data: users, loading, error } = useApi('/api/users')
 * 
 * @example
 * // POST request with manual execution
 * const { data, loading, error, execute } = useApi('/api/users', {
 *   method: 'POST',
 *   immediate: false,
 *   onSuccess: (data) => console.log('User created:', data)
 * })
 * await execute({ body: { name: 'John', email: 'john@example.com' } })
 * 
 * @example
 * // With transformation
 * const { data: userNames } = useApi('/api/users', {
 *   transform: (users) => users.map(user => user.name)
 * })
 * 
 * @example
 * // With request cancellation
 * const { data, loading, abort } = useApi('/api/slow-endpoint')
 * // Later, cancel the request
 * abort()
 */
export function useApi(url, options = {}) {
    const {
        method = 'GET',
        body = null,
        headers = {},
        immediate = true,
        onSuccess = null,
        onError = null,
        transform = null,
        timeout = 0
    } = options

    // Reactive state
    const data = ref(null)
    const loading = ref(false)
    const error = ref(null)

    // AbortController for request cancellation
    let abortController = null
    let timeoutId = null

    /**
     * Build request configuration
     * @param {Object} executeOptions - Options passed to execute function
     * @returns {Object} Fetch request configuration
     */
    const buildRequestConfig = (executeOptions = {}) => {
        const config = {
            method: executeOptions.method || method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
                ...executeOptions.headers
            },
            signal: abortController?.signal
        }

        // Add body if present and method supports it
        const requestBody = executeOptions.body !== undefined ? executeOptions.body : body
        if (requestBody && config.method !== 'GET' && config.method !== 'HEAD') {
            config.body = typeof requestBody === 'string'
                ? requestBody
                : JSON.stringify(requestBody)
        }

        return config
    }

    /**
     * Parse response based on content type
     * @param {Response} response - Fetch response object
     * @returns {Promise<*>} Parsed response data
     */
    const parseResponse = async (response) => {
        const contentType = response.headers.get('content-type')

        if (!contentType) {
            return null
        }

        if (contentType.includes('application/json')) {
            return response.json()
        }

        if (contentType.includes('text/')) {
            return response.text()
        }

        if (contentType.includes('application/octet-stream')) {
            return response.blob()
        }

        return response.text()
    }

    /**
     * Execute the API request
     * @param {Object} [executeOptions={}] - Override options for this execution
     * @param {string} [executeOptions.method] - Override HTTP method
     * @param {*} [executeOptions.body] - Override request body
     * @param {Object} [executeOptions.headers] - Override/extend headers
     * @param {string} [executeOptions.url] - Override URL
     * @returns {Promise<*>} Response data
     */
    const execute = async (executeOptions = {}) => {
        // Reset state
        error.value = null
        loading.value = true

        // Create new AbortController for this request
        abortController = new AbortController()

        try {
            const requestUrl = executeOptions.url || url
            const config = buildRequestConfig(executeOptions)

            // Set up timeout if specified
            if (timeout > 0) {
                timeoutId = setTimeout(() => {
                    abortController?.abort()
                    error.value = new Error(`Request timeout after ${timeout}ms`)
                }, timeout)
            }

            // Make the request
            const response = await fetch(requestUrl, config)

            // Clear timeout if request completes
            if (timeoutId) {
                clearTimeout(timeoutId)
                timeoutId = null
            }

            // Handle HTTP errors
            if (!response.ok) {
                const errorMessage = await parseResponse(response).catch(() => response.statusText)
                throw new Error(
                    typeof errorMessage === 'string'
                        ? errorMessage
                        : `HTTP ${response.status}: ${response.statusText}`
                )
            }

            // Parse response
            let responseData = await parseResponse(response)

            // Apply transformation if provided
            if (transform && typeof transform === 'function') {
                responseData = transform(responseData)
            }

            // Update data
            data.value = responseData

            // Call success callback
            if (onSuccess && typeof onSuccess === 'function') {
                onSuccess(responseData)
            }

            loading.value = false
            return responseData

        } catch (err) {
            // Clear timeout on error
            if (timeoutId) {
                clearTimeout(timeoutId)
                timeoutId = null
            }

            // Handle abort errors
            if (err.name === 'AbortError') {
                error.value = new Error('Request was cancelled')
            } else {
                error.value = err
            }

            // Call error callback
            if (onError && typeof onError === 'function') {
                onError(error.value)
            }

            loading.value = false
            throw error.value
        }
    }

    /**
     * Abort the ongoing request
     */
    const abort = () => {
        if (abortController) {
            abortController.abort()
            abortController = null
        }
        if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
        }
        loading.value = false
    }

    // Execute immediately if requested
    if (immediate) {
        onMounted(() => {
            execute().catch(() => {
                // Error already handled in execute function
            })
        })
    }

    // Cleanup on unmount
    onUnmounted(() => {
        abort()
    })

    return {
        data,
        loading,
        error,
        execute,
        abort
    }
}