/**
 * useLocalStorage Composable Stories
 * Interactive documentation and testing for the useLocalStorage composable
 */

import { ref, watch, computed } from 'vue'
import { useLocalStorage } from './index.js'

export default {
    title: 'Composables/useLocalStorage',
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'A composable that provides reactive localStorage functionality with JSON serialization and cross-tab synchronization.'
            }
        }
    }
}

// Basic usage example
export const BasicUsage = {
    render: () => ({
        setup() {
            const count = useLocalStorage('demo-count', 0)
            const name = useLocalStorage('demo-name', '')

            const increment = () => {
                count.value++
            }

            const decrement = () => {
                count.value--
            }

            const reset = () => {
                count.value = 0
                name.value = ''
            }

            return {
                count,
                name,
                increment,
                decrement,
                reset
            }
        },
        template: `
            <div style="max-width: 600px; padding: 2rem;">
                <h3>Basic useLocalStorage Example</h3>
                <p>Values are automatically persisted to localStorage and restored on page reload:</p>
                
                <div style="background: #f5f5f5; padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">
                            Name (stored as 'demo-name'):
                        </label>
                        <input 
                            v-model="name" 
                            type="text" 
                            placeholder="Enter your name..."
                            style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem;"
                        >
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">
                            Counter (stored as 'demo-count'):
                        </label>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <button 
                                @click="decrement"
                                style="padding: 0.5rem 1rem; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;"
                            >
                                -
                            </button>
                            <span style="font-size: 1.5rem; font-weight: bold; min-width: 3rem; text-align: center;">
                                {{ count }}
                            </span>
                            <button 
                                @click="increment"
                                style="padding: 0.5rem 1rem; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    
                    <button 
                        @click="reset"
                        style="padding: 0.5rem 1rem; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;"
                    >
                        Reset All
                    </button>
                </div>
                
                <div style="background: #e8f4fd; padding: 1rem; border-radius: 4px; margin-top: 1rem;">
                    <h4 style="margin-top: 0;">Current Values:</h4>
                    <div><strong>Name:</strong> "{{ name }}"</div>
                    <div><strong>Count:</strong> {{ count }}</div>
                </div>
                
                <p style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
                    💡 Try refreshing the page - your values will be restored from localStorage!
                </p>
            </div>
        `
    })
}

// JSON serialization example
export const JSONSerialization = {
    render: () => ({
        setup() {
            const user = useLocalStorage('demo-user', {
                name: '',
                email: '',
                preferences: {
                    theme: 'light',
                    notifications: true
                }
            })

            const todos = useLocalStorage('demo-todos', [])

            const addTodo = () => {
                const newTodo = {
                    id: Date.now(),
                    text: `Todo item ${todos.value.length + 1}`,
                    completed: false
                }
                todos.value.push(newTodo)
            }

            const toggleTodo = (id) => {
                const todo = todos.value.find(t => t.id === id)
                if (todo) {
                    todo.completed = !todo.completed
                }
            }

            const removeTodo = (id) => {
                const index = todos.value.findIndex(t => t.id === id)
                if (index > -1) {
                    todos.value.splice(index, 1)
                }
            }

            const clearTodos = () => {
                todos.value = []
            }

            return {
                user,
                todos,
                addTodo,
                toggleTodo,
                removeTodo,
                clearTodos
            }
        },
        template: `
            <div style="max-width: 700px; padding: 2rem;">
                <h3>JSON Serialization Example</h3>
                <p>useLocalStorage automatically handles JSON serialization for objects and arrays:</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
                    <!-- User Object -->
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px;">
                        <h4 style="margin-top: 0;">User Object</h4>
                        
                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Name:</label>
                            <input 
                                v-model="user.name" 
                                type="text" 
                                style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
                            >
                        </div>
                        
                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email:</label>
                            <input 
                                v-model="user.email" 
                                type="email" 
                                style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
                            >
                        </div>
                        
                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Theme:</label>
                            <select 
                                v-model="user.preferences.theme" 
                                style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: flex; align-items: center; gap: 0.5rem;">
                                <input 
                                    v-model="user.preferences.notifications" 
                                    type="checkbox"
                                >
                                Enable Notifications
                            </label>
                        </div>
                    </div>
                    
                    <!-- Todos Array -->
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px;">
                        <h4 style="margin-top: 0;">Todos Array</h4>
                        
                        <div style="margin-bottom: 1rem;">
                            <button 
                                @click="addTodo"
                                style="padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 0.5rem;"
                            >
                                Add Todo
                            </button>
                            <button 
                                @click="clearTodos"
                                style="padding: 0.5rem 1rem; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;"
                            >
                                Clear All
                            </button>
                        </div>
                        
                        <div style="max-height: 200px; overflow-y: auto;">
                            <div 
                                v-for="todo in todos" 
                                :key="todo.id"
                                style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: white; border-radius: 4px; margin-bottom: 0.5rem;"
                            >
                                <input 
                                    :checked="todo.completed"
                                    @change="toggleTodo(todo.id)"
                                    type="checkbox"
                                >
                                <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none', flex: 1 }">
                                    {{ todo.text }}
                                </span>
                                <button 
                                    @click="removeTodo(todo.id)"
                                    style="padding: 0.25rem 0.5rem; background: #dc3545; color: white; border: none; border-radius: 2px; cursor: pointer; font-size: 0.8rem;"
                                >
                                    ×
                                </button>
                            </div>
                            <div v-if="todos.length === 0" style="text-align: center; color: #666; font-style: italic; padding: 2rem;">
                                No todos yet. Click "Add Todo" to get started!
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="background: #e8f4fd; padding: 1rem; border-radius: 4px;">
                    <h4 style="margin-top: 0;">Stored Data Preview:</h4>
                    <div style="font-family: monospace; font-size: 0.9rem; background: white; padding: 1rem; border-radius: 4px; overflow-x: auto;">
                        <div><strong>User:</strong> {{ JSON.stringify(user, null, 2) }}</div>
                        <div style="margin-top: 1rem;"><strong>Todos:</strong> {{ JSON.stringify(todos, null, 2) }}</div>
                    </div>
                </div>
            </div>
        `
    })
}

// Cross-tab synchronization example
export const CrossTabSync = {
    render: () => ({
        setup() {
            const sharedCounter = useLocalStorage('shared-counter', 0, {
                syncAcrossTabs: true
            })

            const sharedMessage = useLocalStorage('shared-message', 'Hello from tab!', {
                syncAcrossTabs: true
            })

            const increment = () => {
                sharedCounter.value++
            }

            const decrement = () => {
                sharedCounter.value--
            }

            return {
                sharedCounter,
                sharedMessage,
                increment,
                decrement
            }
        },
        template: `
            <div style="max-width: 600px; padding: 2rem;">
                <h3>Cross-Tab Synchronization</h3>
                <p>Open this story in multiple browser tabs to see real-time synchronization:</p>
                
                <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
                    <strong>🔄 Try this:</strong> Open this same story in another browser tab, then modify the values below. 
                    Watch how changes instantly appear in both tabs!
                </div>
                
                <div style="background: #f5f5f5; padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">
                            Shared Message:
                        </label>
                        <input 
                            v-model="sharedMessage" 
                            type="text" 
                            style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem;"
                        >
                        <div style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
                            Type here and see it update in other tabs instantly
                        </div>
                    </div>
                    
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">
                            Shared Counter:
                        </label>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <button 
                                @click="decrement"
                                style="padding: 0.5rem 1rem; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;"
                            >
                                Decrease
                            </button>
                            <span style="font-size: 2rem; font-weight: bold; min-width: 4rem; text-align: center; background: white; padding: 0.5rem; border-radius: 4px;">
                                {{ sharedCounter }}
                            </span>
                            <button 
                                @click="increment"
                                style="padding: 0.5rem 1rem; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;"
                            >
                                Increase
                            </button>
                        </div>
                        <div style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
                            Click buttons and watch the counter sync across tabs
                        </div>
                    </div>
                </div>
                
                <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 1rem; border-radius: 4px; margin-top: 1rem;">
                    <strong>✨ How it works:</strong> The <code>syncAcrossTabs: true</code> option enables listening 
                    to storage events, automatically updating the reactive value when localStorage changes in other tabs.
                </div>
            </div>
        `
    })
}

// Error handling example
export const ErrorHandling = {
    render: () => ({
        setup() {
            const errorLog = ref([])

            const validData = useLocalStorage('valid-data', { message: 'This works!' }, {
                onError: (error) => {
                    errorLog.value.push({
                        timestamp: new Date().toLocaleTimeString(),
                        error: error.message
                    })
                }
            })

            // Custom serializer that might fail
            const dateValue = useLocalStorage('demo-date', new Date(), {
                serializer: {
                    read: (value) => {
                        try {
                            return new Date(value)
                        } catch (e) {
                            throw new Error('Failed to parse date: ' + e.message)
                        }
                    },
                    write: (value) => {
                        if (!(value instanceof Date)) {
                            throw new Error('Value must be a Date object')
                        }
                        return value.toISOString()
                    }
                },
                onError: (error) => {
                    errorLog.value.push({
                        timestamp: new Date().toLocaleTimeString(),
                        error: error.message
                    })
                }
            })

            const triggerError = () => {
                try {
                    // This will trigger a serialization error
                    dateValue.value = "invalid date string"
                } catch (e) {
                    // Error will be caught by onError handler
                }
            }

            const clearErrors = () => {
                errorLog.value = []
            }

            const updateDate = () => {
                dateValue.value = new Date()
            }

            return {
                validData,
                dateValue,
                errorLog,
                triggerError,
                clearErrors,
                updateDate
            }
        },
        template: `
            <div style="max-width: 600px; padding: 2rem;">
                <h3>Error Handling Example</h3>
                <p>Demonstrates graceful error handling for serialization failures:</p>
                
                <div style="background: #f5f5f5; padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">
                            Valid Data (JSON):
                        </label>
                        <input 
                            v-model="validData.message" 
                            type="text" 
                            style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px;"
                        >
                    </div>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">
                            Date Value (Custom Serializer):
                        </label>
                        <div style="display: flex; gap: 0.5rem; align-items: center;">
                            <input 
                                :value="dateValue.toLocaleString()" 
                                readonly
                                style="flex: 1; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa;"
                            >
                            <button 
                                @click="updateDate"
                                style="padding: 0.75rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
                            >
                                Update to Now
                            </button>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 0.5rem;">
                        <button 
                            @click="triggerError"
                            style="padding: 0.5rem 1rem; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        >
                            Trigger Error
                        </button>
                        <button 
                            @click="clearErrors"
                            style="padding: 0.5rem 1rem; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        >
                            Clear Errors
                        </button>
                    </div>
                </div>
                
                <div style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 1rem; border-radius: 4px; margin-top: 1rem;">
                    <h4 style="margin-top: 0; color: #721c24;">Error Log:</h4>
                    <div v-if="errorLog.length === 0" style="color: #666; font-style: italic;">
                        No errors yet. Click "Trigger Error" to see error handling in action.
                    </div>
                    <div v-else>
                        <div 
                            v-for="(error, index) in errorLog" 
                            :key="index"
                            style="font-family: monospace; font-size: 0.9rem; margin-bottom: 0.5rem; padding: 0.5rem; background: rgba(255,255,255,0.5); border-radius: 2px;"
                        >
                            <strong>{{ error.timestamp }}:</strong> {{ error.error }}
                        </div>
                    </div>
                </div>
                
                <div style="background: #d1ecf1; border: 1px solid #bee5eb; padding: 1rem; border-radius: 4px; margin-top: 1rem;">
                    <strong>💡 Error Handling Features:</strong>
                    <ul style="margin: 0.5rem 0 0 1rem;">
                        <li>Graceful fallback to default values on parse errors</li>
                        <li>Custom error handlers via <code>onError</code> callback</li>
                        <li>Automatic recovery from localStorage quota exceeded</li>
                        <li>SSR-safe (works when localStorage is unavailable)</li>
                    </ul>
                </div>
            </div>
        `
    })
}

// Real-world examples
export const RealWorldExamples = {
    render: () => ({
        setup() {
            // User preferences
            const userPrefs = useLocalStorage('user-preferences', {
                theme: 'light',
                language: 'en',
                autoSave: true,
                notifications: {
                    email: true,
                    push: false,
                    sms: false
                }
            })

            // Shopping cart
            const cart = useLocalStorage('shopping-cart', [])

            // Form draft
            const formDraft = useLocalStorage('contact-form-draft', {
                name: '',
                email: '',
                subject: '',
                message: ''
            })

            const addToCart = () => {
                const item = {
                    id: Date.now(),
                    name: `Product ${cart.value.length + 1}`,
                    price: Math.floor(Math.random() * 100) + 10,
                    quantity: 1
                }
                cart.value.push(item)
            }

            const removeFromCart = (id) => {
                const index = cart.value.findIndex(item => item.id === id)
                if (index > -1) {
                    cart.value.splice(index, 1)
                }
            }

            const cartTotal = computed(() => {
                return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
            })

            const clearForm = () => {
                formDraft.value = {
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                }
            }

            return {
                userPrefs,
                cart,
                formDraft,
                addToCart,
                removeFromCart,
                cartTotal,
                clearForm
            }
        },
        template: `
            <div style="max-width: 800px; padding: 2rem;">
                <h3>Real-World Usage Examples</h3>
                <p>Common patterns for using useLocalStorage in production applications:</p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; margin: 2rem 0;">
                    <!-- User Preferences -->
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px;">
                        <h4 style="margin-top: 0;">🎨 User Preferences</h4>
                        
                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Theme:</label>
                            <select 
                                v-model="userPrefs.theme" 
                                style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="auto">Auto</option>
                            </select>
                        </div>
                        
                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Language:</label>
                            <select 
                                v-model="userPrefs.language" 
                                style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
                            >
                                <option value="en">English</option>
                                <option value="es">Español</option>
                                <option value="fr">Français</option>
                            </select>
                        </div>
                        
                        <div style="margin-bottom: 1rem;">
                            <label style="display: flex; align-items: center; gap: 0.5rem;">
                                <input v-model="userPrefs.autoSave" type="checkbox">
                                Auto-save drafts
                            </label>
                        </div>
                        
                        <div>
                            <strong>Notifications:</strong>
                            <div style="margin-left: 1rem; margin-top: 0.5rem;">
                                <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                                    <input v-model="userPrefs.notifications.email" type="checkbox">
                                    Email notifications
                                </label>
                                <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                                    <input v-model="userPrefs.notifications.push" type="checkbox">
                                    Push notifications
                                </label>
                                <label style="display: flex; align-items: center; gap: 0.5rem;">
                                    <input v-model="userPrefs.notifications.sms" type="checkbox">
                                    SMS notifications
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Shopping Cart -->
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px;">
                        <h4 style="margin-top: 0;">🛒 Shopping Cart</h4>
                        
                        <div style="margin-bottom: 1rem;">
                            <button 
                                @click="addToCart"
                                style="padding: 0.5rem 1rem; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;"
                            >
                                Add Random Item
                            </button>
                        </div>
                        
                        <div style="max-height: 200px; overflow-y: auto; margin-bottom: 1rem;">
                            <div 
                                v-for="item in cart" 
                                :key="item.id"
                                style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: white; border-radius: 4px; margin-bottom: 0.5rem;"
                            >
                                <div>
                                    <div style="font-weight: 500;">{{ item.name }}</div>
                                    <div style="font-size: 0.9rem; color: #666;">
                                        \${{ item.price }} × {{ item.quantity }}
                                    </div>
                                </div>
                                <button 
                                    @click="removeFromCart(item.id)"
                                    style="padding: 0.25rem 0.5rem; background: #dc3545; color: white; border: none; border-radius: 2px; cursor: pointer;"
                                >
                                    Remove
                                </button>
                            </div>
                            <div v-if="cart.length === 0" style="text-align: center; color: #666; font-style: italic; padding: 2rem;">
                                Cart is empty
                            </div>
                        </div>
                        
                        <div style="border-top: 1px solid #ddd; padding-top: 1rem; font-weight: bold;">
                            Total: \${{ cartTotal }}
                        </div>
                    </div>
                    
                    <!-- Form Draft -->
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; grid-column: 1 / -1;">
                        <h4 style="margin-top: 0;">📝 Form Draft Auto-Save</h4>
                        <p style="margin-bottom: 1rem; color: #666;">
                            Form data is automatically saved as you type and restored if you refresh the page.
                        </p>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Name:</label>
                                <input 
                                    v-model="formDraft.name" 
                                    type="text" 
                                    style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
                                >
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email:</label>
                                <input 
                                    v-model="formDraft.email" 
                                    type="email" 
                                    style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
                                >
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Subject:</label>
                            <input 
                                v-model="formDraft.subject" 
                                type="text" 
                                style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
                            >
                        </div>
                        
                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Message:</label>
                            <textarea
                                v-model="formDraft.message"
                                rows="4"
                                style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; resize: vertical;"
                            ></textarea>
                        </div>
                        
                        <button
                            @click="clearForm"
                            style="padding: 0.5rem 1rem; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        >
                            Clear Draft
                        </button>
                    </div>
                </div>
                
                <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 1rem; border-radius: 4px; margin-top: 1rem;">
                    <strong>🚀 Production Tips:</strong>
                    <ul style="margin: 0.5rem 0 0 1rem;">
                        <li><strong>User Preferences:</strong> Store theme, language, and app settings</li>
                        <li><strong>Shopping Cart:</strong> Persist cart items across sessions</li>
                        <li><strong>Form Drafts:</strong> Auto-save form data to prevent data loss</li>
                        <li><strong>Recent Items:</strong> Keep track of recently viewed/used items</li>
                        <li><strong>UI State:</strong> Remember sidebar collapsed state, selected tabs, etc.</li>
                    </ul>
                </div>
            </div>
        `
    })
}