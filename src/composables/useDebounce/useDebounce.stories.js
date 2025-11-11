/**
 * useDebounce Composable Stories
 * Interactive documentation and testing for the useDebounce composable
 */

import { ref, watch } from 'vue'
import { useDebounce } from './index.js'

export default {
    title: 'Composables/useDebounce',
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'A composable that debounces reactive values to prevent excessive updates.'
            }
        }
    }
}

// Basic debounce example
export const BasicUsage = {
    render: () => ({
        setup() {
            const searchQuery = ref('')
            const debouncedQuery = useDebounce(searchQuery, 300)

            return {
                searchQuery,
                debouncedQuery
            }
        },
        template: `
      <div style="max-width: 600px; padding: 2rem;">
        <h3>Basic useDebounce Example</h3>
        <p>Type in the input to see debouncing in action (300ms delay):</p>
        
        <div style="margin: 1rem 0;">
          <label for="search-input" style="display: block; margin-bottom: 0.5rem; font-weight: bold;">
            Search Input:
          </label>
          <input 
            id="search-input"
            v-model="searchQuery" 
            type="text" 
            placeholder="Start typing..."
            style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem;"
          >
        </div>
        
        <div style="background: #f5f5f5; padding: 1rem; border-radius: 4px; margin-top: 1rem;">
          <div style="margin-bottom: 0.5rem;">
            <strong>Original Value:</strong> "{{ searchQuery }}"
          </div>
          <div>
            <strong>Debounced Value:</strong> "{{ debouncedQuery }}"
          </div>
        </div>
        
        <p style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
          Notice how the debounced value only updates after you stop typing for 300ms.
        </p>
      </div>
    `
    })
}

// Configurable delay example
export const ConfigurableDelay = {
    render: () => ({
        setup() {
            const input = ref('')
            const delay = ref(500)
            const debouncedInput = useDebounce(input, delay.value)

            const updateCount = ref(0)
            const debouncedUpdateCount = ref(0)

            watch(input, () => {
                updateCount.value++
            })

            watch(debouncedInput, () => {
                debouncedUpdateCount.value++
            })

            const resetCounters = () => {
                updateCount.value = 0
                debouncedUpdateCount.value = 0
            }

            return {
                input,
                delay,
                debouncedInput,
                updateCount,
                debouncedUpdateCount,
                resetCounters
            }
        },
        template: `
      <div style="max-width: 600px; padding: 2rem;">
        <h3>Configurable Delay Example</h3>
        
        <div style="margin: 1rem 0;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">
            Delay: {{ delay }}ms
          </label>
          <input 
            v-model.number="delay" 
            type="range" 
            min="100" 
            max="2000" 
            step="100"
            style="width: 100%;"
          >
        </div>
        
        <div style="margin: 1rem 0;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">
            Test Input:
          </label>
          <input 
            v-model="input" 
            type="text" 
            placeholder="Type to test debouncing..."
            style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem;"
          >
        </div>
        
        <div style="background: #f5f5f5; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
          <div style="margin-bottom: 0.5rem;">
            <strong>Original:</strong> "{{ input }}"
          </div>
          <div>
            <strong>Debounced ({{ delay }}ms):</strong> "{{ debouncedInput }}"
          </div>
        </div>
        
        <div style="background: #e8f4fd; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
          <h4 style="margin-top: 0;">Performance Metrics:</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
              <strong>Total Updates:</strong> {{ updateCount }}
            </div>
            <div>
              <strong>Debounced Updates:</strong> {{ debouncedUpdateCount }}
            </div>
          </div>
          <div style="margin-top: 0.5rem;">
            <strong>Updates Prevented:</strong> {{ updateCount - debouncedUpdateCount }}
          </div>
          <button 
            @click="resetCounters"
            style="margin-top: 1rem; padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            Reset Counters
          </button>
        </div>
      </div>
    `
    })
}

// Search simulation example
export const SearchSimulation = {
    render: () => ({
        setup() {
            const searchTerm = ref('')
            const debouncedSearchTerm = useDebounce(searchTerm, 400)
            const isSearching = ref(false)
            const searchResults = ref([])

            // Mock data
            const mockUsers = [
                { id: 1, name: 'John Doe', email: 'john@example.com' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
                { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
                { id: 4, name: 'Alice Brown', email: 'alice@example.com' },
                { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com' }
            ]

            const performSearch = async (query) => {
                if (!query.trim()) {
                    searchResults.value = []
                    return
                }

                isSearching.value = true

                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 300))

                // Filter mock data
                searchResults.value = mockUsers.filter(user =>
                    user.name.toLowerCase().includes(query.toLowerCase()) ||
                    user.email.toLowerCase().includes(query.toLowerCase())
                )

                isSearching.value = false
            }

            watch(debouncedSearchTerm, (newValue) => {
                performSearch(newValue)
            })

            return {
                searchTerm,
                debouncedSearchTerm,
                isSearching,
                searchResults
            }
        },
        template: `
      <div style="max-width: 600px; padding: 2rem;">
        <h3>Search Simulation Example</h3>
        <p>Real-world example showing how useDebounce prevents excessive API calls:</p>
        
        <div style="margin: 1rem 0;">
          <input 
            v-model="searchTerm" 
            type="text" 
            placeholder="Search users..."
            style="width: 100%; padding: 1rem; border: 2px solid #ccc; border-radius: 4px; font-size: 1rem;"
          >
          <div style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
            Search will trigger after 400ms of inactivity
          </div>
        </div>
        
        <div style="background: #f5f5f5; padding: 1rem; border-radius: 4px; min-height: 200px;">
          <h4 style="margin-top: 0;">Search Results:</h4>
          
          <div v-if="isSearching" style="color: #007bff; font-style: italic;">
            Searching for "{{ debouncedSearchTerm }}"...
          </div>
          
          <div v-else-if="searchResults.length > 0">
            <div 
              v-for="result in searchResults" 
              :key="result.id"
              style="display: flex; justify-content: space-between; padding: 0.75rem; background: white; border-radius: 4px; margin-bottom: 0.5rem; border: 1px solid #ddd;"
            >
              <strong>{{ result.name }}</strong>
              <span style="color: #666;">{{ result.email }}</span>
            </div>
          </div>
          
          <div v-else-if="debouncedSearchTerm" style="color: #666; font-style: italic; text-align: center; padding: 2rem;">
            No results found for "{{ debouncedSearchTerm }}"
          </div>
          
          <div v-else style="color: #666; font-style: italic; text-align: center; padding: 2rem;">
            Start typing to search...
          </div>
        </div>
        
        <div style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
          <strong>Current search term:</strong> "{{ searchTerm }}"<br>
          <strong>Debounced search term:</strong> "{{ debouncedSearchTerm }}"
        </div>
      </div>
    `
    })
}