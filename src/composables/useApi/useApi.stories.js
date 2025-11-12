/**
 * useApi Composable Stories
 * Interactive documentation and testing for the useApi composable
 */

import { ref, computed } from 'vue'
import { useApi } from './index.js'
import { useLocalStorage } from '../useLocalStorage/index.js'

export default {
    title: 'Composables/useApi',
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'A composable that provides HTTP request management with loading states, error handling, and request cancellation. Integrates with the project\'s Express.js API server running on port 3001.'
            }
        }
    }
}

// Basic GET request example
export const BasicGetRequest = {
    render: () => ({
        setup() {
            const { data: users, loading, error, execute } = useApi('http://localhost:3001/api/users')

            const refresh = () => {
                execute()
            }

            return {
                users,
                loading,
                error,
                refresh
            }
        },
        template: `
            <div style="max-width: 800px; padding: 2rem;">
                <h3>Basic GET Request</h3>
                <p>Fetches users from the API server automatically on mount:</p>
                
                <div style="margin: 1rem 0;">
                    <button 
                        @click="refresh"
                        :disabled="loading"
                        style="padding: 0.75rem 1.5rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;"
                        :style="{ opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }"
                    >
                        {{ loading ? 'Loading...' : 'Refresh Users' }}
                    </button>
                </div>
                
                <div v-if="loading" style="background: #e7f3ff; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="width: 20px; height: 20px; border: 3px solid #007bff; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                        <span>Loading users...</span>
                    </div>
                </div>
                
                <div v-if="error" style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 1rem; border-radius: 4px; margin: 1rem 0; color: #721c24;">
                    <strong>Error:</strong> {{ error.message }}
                </div>
                
                <div v-if="users && !loading" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
                    <h4 style="margin-top: 0;">Users ({{ users.length }}):</h4>
                    <div style="display: grid; gap: 1rem;">
                        <div 
                            v-for="user in users" 
                            :key="user.id"
                            style="background: white; padding: 1rem; border-radius: 4px; border: 1px solid #dee2e6;"
                        >
                            <div style="font-weight: bold; margin-bottom: 0.5rem;">{{ user.name }}</div>
                            <div style="color: #666; font-size: 0.9rem;">{{ user.email }}</div>
                        </div>
                    </div>
                </div>
                
                <style>
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                </style>
            </div>
        `
    })
}

// POST request with manual execution
export const PostRequest = {
    render: () => ({
        setup() {
            const newUser = ref({
                name: '',
                email: ''
            })

            const { data: createdUser, loading, error, execute } = useApi('http://localhost:3001/api/users', {
                method: 'POST',
                immediate: false,
                onSuccess: (data) => {
                    console.log('User created successfully:', data)
                    // Reset form
                    newUser.value = { name: '', email: '' }
                }
            })

            const createUser = async () => {
                if (!newUser.value.name || !newUser.value.email) {
                    return
                }

                try {
                    await execute({
                        body: newUser.value
                    })
                } catch (err) {
                    console.error('Failed to create user:', err)
                }
            }

            const isFormValid = computed(() => {
                return newUser.value.name.trim() && newUser.value.email.trim()
            })

            return {
                newUser,
                createdUser,
                loading,
                error,
                createUser,
                isFormValid
            }
        },
        template: `
            <div style="max-width: 600px; padding: 2rem;">
                <h3>POST Request (Manual Execution)</h3>
                <p>Create a new user with manual request execution:</p>
                
                <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">
                            Name:
                        </label>
                        <input 
                            v-model="newUser.name"
                            type="text"
                            placeholder="Enter name..."
                            :disabled="loading"
                            style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem;"
                        >
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">
                            Email:
                        </label>
                        <input 
                            v-model="newUser.email"
                            type="email"
                            placeholder="Enter email..."
                            :disabled="loading"
                            style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem;"
                        >
                    </div>
                    
                    <button 
                        @click="createUser"
                        :disabled="!isFormValid || loading"
                        style="padding: 0.75rem 1.5rem; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;"
                        :style="{ opacity: (!isFormValid || loading) ? 0.6 : 1, cursor: (!isFormValid || loading) ? 'not-allowed' : 'pointer' }"
                    >
                        {{ loading ? 'Creating...' : 'Create User' }}
                    </button>
                </div>
                
                <div v-if="loading" style="background: #e7f3ff; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="width: 20px; height: 20px; border: 3px solid #007bff; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                        <span>Creating user...</span>
                    </div>
                </div>
                
                <div v-if="error" style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 1rem; border-radius: 4px; margin: 1rem 0; color: #721c24;">
                    <strong>Error:</strong> {{ error.message }}
                </div>
                
                <div v-if="createdUser && !loading" style="background: #d4edda; border: 1px solid #c3e6cb; padding: 1rem; border-radius: 4px; margin: 1rem 0; color: #155724;">
                    <strong>✓ User Created Successfully!</strong>
                    <div style="margin-top: 0.5rem; font-family: monospace; font-size: 0.9rem;">
                        {{ JSON.stringify(createdUser, null, 2) }}
                    </div>
                </div>
                
                <style>
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                </style>
            </div>
        `
    })
}

// Request with transformation
export const DataTransformation = {
    render: () => ({
        setup() {
            // Get just the user names
            const { data: userNames, loading: loadingNames, error: errorNames } = useApi('http://localhost:3001/api/users', {
                transform: (users) => users.map(user => user.name)
            })

            // Get user count
            const { data: userCount, loading: loadingCount, error: errorCount } = useApi('http://localhost:3001/api/users', {
                transform: (users) => users.length
            })

            return {
                userNames,
                loadingNames,
                errorNames,
                userCount,
                loadingCount,
                errorCount
            }
        },
        template: `
            <div style="max-width: 600px; padding: 2rem;">
                <h3>Data Transformation</h3>
                <p>Transform API responses using the transform function:</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px;">
                        <h4 style="margin-top: 0;">User Names</h4>
                        <div v-if="loadingNames">Loading...</div>
                        <div v-else-if="errorNames" style="color: #dc3545;">{{ errorNames.message }}</div>
                        <ul v-else-if="userNames" style="margin: 0; padding-left: 1.5rem;">
                            <li v-for="name in userNames" :key="name">{{ name }}</li>
                        </ul>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px;">
                        <h4 style="margin-top: 0;">User Count</h4>
                        <div v-if="loadingCount">Loading...</div>
                        <div v-else-if="errorCount" style="color: #dc3545;">{{ errorCount.message }}</div>
                        <div v-else style="font-size: 3rem; font-weight: bold; text-align: center; color: #007bff;">
                            {{ userCount }}
                        </div>
                    </div>
                </div>
                
                <div style="background: #d1ecf1; border: 1px solid #bee5eb; padding: 1rem; border-radius: 4px; margin-top: 1rem;">
                    <strong>💡 Transform Function:</strong> The transform option allows you to process API responses before they're stored in the data ref.
                </div>
            </div>
        `
    })
}

// Request cancellation
export const RequestCancellation = {
    render: () => ({
        setup() {
            const { data: posts, loading, error, execute, abort } = useApi('http://localhost:3001/api/posts', {
                immediate: false
            })

            const startRequest = () => {
                execute()
            }

            const cancelRequest = () => {
                abort()
            }

            return {
                posts,
                loading,
                error,
                startRequest,
                cancelRequest
            }
        },
        template: `
            <div style="max-width: 600px; padding: 2rem;">
                <h3>Request Cancellation</h3>
                <p>Abort ongoing requests using the abort function:</p>
                
                <div style="display: flex; gap: 1rem; margin: 1rem 0;">
                    <button 
                        @click="startRequest"
                        :disabled="loading"
                        style="padding: 0.75rem 1.5rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        :style="{ opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }"
                    >
                        Start Request
                    </button>
                    
                    <button 
                        @click="cancelRequest"
                        :disabled="!loading"
                        style="padding: 0.75rem 1.5rem; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        :style="{ opacity: !loading ? 0.6 : 1, cursor: !loading ? 'not-allowed' : 'pointer' }"
                    >
                        Cancel Request
                    </button>
                </div>
                
                <div v-if="loading" style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="width: 20px; height: 20px; border: 3px solid #ffc107; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                        <span>Request in progress... Click "Cancel Request" to abort.</span>
                    </div>
                </div>
                
                <div v-if="error" style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 1rem; border-radius: 4px; margin: 1rem 0; color: #721c24;">
                    <strong>{{ error.message.includes('cancelled') ? '⚠️ Request Cancelled' : 'Error' }}:</strong> {{ error.message }}
                </div>
                
                <div v-if="posts && !loading" style="background: #d4edda; border: 1px solid #c3e6cb; padding: 1rem; border-radius: 4px; margin: 1rem 0; color: #155724;">
                    <strong>✓ Request Completed!</strong>
                    <div style="margin-top: 0.5rem;">Loaded {{ posts.length }} posts</div>
                </div>
                
                <style>
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                </style>
            </div>
        `
    })
}

// CRUD operations example
export const CRUDOperations = {
    render: () => ({
        setup() {
            const users = ref([])
            const selectedUser = ref(null)
            const editForm = ref({ name: '', email: '' })
            const createForm = ref({ name: '', email: '' })
            const loading = ref(false)
            const error = ref(null)

            // Fetch users
            const { execute: fetchUsers } = useApi('http://localhost:3001/api/users', {
                immediate: false,
                onSuccess: (data) => {
                    users.value = data
                }
            })

            // Create user
            const { execute: createUser } = useApi('http://localhost:3001/api/users', {
                method: 'POST',
                immediate: false,
                onSuccess: () => {
                    createForm.value = { name: '', email: '' }
                    fetchUsers()
                }
            })

            // Update user
            const { execute: updateUser } = useApi('http://localhost:3001/api/users/:id', {
                method: 'PUT',
                immediate: false,
                onSuccess: () => {
                    selectedUser.value = null
                    fetchUsers()
                }
            })

            // Delete user
            const { execute: deleteUser } = useApi('http://localhost:3001/api/users/:id', {
                method: 'DELETE',
                immediate: false,
                onSuccess: () => {
                    fetchUsers()
                }
            })

            const loadUsers = async () => {
                loading.value = true
                error.value = null
                try {
                    await fetchUsers()
                } catch (err) {
                    error.value = err
                } finally {
                    loading.value = false
                }
            }

            const handleCreate = async () => {
                if (!createForm.value.name || !createForm.value.email) return

                loading.value = true
                error.value = null
                try {
                    await createUser({ body: createForm.value })
                } catch (err) {
                    error.value = err
                } finally {
                    loading.value = false
                }
            }

            const handleEdit = (user) => {
                selectedUser.value = user
                editForm.value = { ...user }
            }

            const handleUpdate = async () => {
                if (!selectedUser.value) return

                loading.value = true
                error.value = null
                try {
                    await updateUser({
                        url: `http://localhost:3001/api/users/${selectedUser.value.id}`,
                        body: editForm.value
                    })
                } catch (err) {
                    error.value = err
                } finally {
                    loading.value = false
                }
            }

            const handleDelete = async (userId) => {
                if (!confirm('Are you sure you want to delete this user?')) return

                loading.value = true
                error.value = null
                try {
                    await deleteUser({
                        url: `http://localhost:3001/api/users/${userId}`
                    })
                } catch (err) {
                    error.value = err
                } finally {
                    loading.value = false
                }
            }

            const cancelEdit = () => {
                selectedUser.value = null
                editForm.value = { name: '', email: '' }
            }

            // Load users on mount
            loadUsers()

            return {
                users,
                selectedUser,
                editForm,
                createForm,
                loading,
                error,
                loadUsers,
                handleCreate,
                handleEdit,
                handleUpdate,
                handleDelete,
                cancelEdit
            }
        },
        template: `
            <div style="max-width: 900px; padding: 2rem;">
                <h3>CRUD Operations</h3>
                <p>Complete Create, Read, Update, Delete example:</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 1rem 0;">
                    <!-- Create Form -->
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px;">
                        <h4 style="margin-top: 0;">Create New User</h4>
                        <div style="margin-bottom: 1rem;">
                            <input 
                                v-model="createForm.name"
                                type="text"
                                placeholder="Name"
                                :disabled="loading"
                                style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 0.5rem;"
                            >
                            <input 
                                v-model="createForm.email"
                                type="email"
                                placeholder="Email"
                                :disabled="loading"
                                style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
                            >
                        </div>
                        <button 
                            @click="handleCreate"
                            :disabled="loading || !createForm.name || !createForm.email"
                            style="padding: 0.5rem 1rem; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; width: 100%;"
                        >
                            Create User
                        </button>
                    </div>
                    
                    <!-- Edit Form -->
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px;">
                        <h4 style="margin-top: 0;">Edit User</h4>
                        <div v-if="selectedUser">
                            <div style="margin-bottom: 1rem;">
                                <input 
                                    v-model="editForm.name"
                                    type="text"
                                    :disabled="loading"
                                    style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 0.5rem;"
                                >
                                <input 
                                    v-model="editForm.email"
                                    type="email"
                                    :disabled="loading"
                                    style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
                                >
                            </div>
                            <div style="display: flex; gap: 0.5rem;">
                                <button 
                                    @click="handleUpdate"
                                    :disabled="loading"
                                    style="flex: 1; padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
                                >
                                    Update
                                </button>
                                <button 
                                    @click="cancelEdit"
                                    :disabled="loading"
                                    style="flex: 1; padding: 0.5rem 1rem; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                        <div v-else style="text-align: center; color: #666; font-style: italic;">
                            Select a user to edit
                        </div>
                    </div>
                </div>
                
                <div v-if="error" style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 1rem; border-radius: 4px; margin: 1rem 0; color: #721c24;">
                    <strong>Error:</strong> {{ error.message }}
                </div>
                
                <!-- Users List -->
                <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-top: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h4 style="margin: 0;">Users ({{ users.length }})</h4>
                        <button 
                            @click="loadUsers"
                            :disabled="loading"
                            style="padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        >
                            {{ loading ? 'Loading...' : 'Refresh' }}
                        </button>
                    </div>
                    
                    <div style="display: grid; gap: 0.5rem;">
                        <div 
                            v-for="user in users" 
                            :key="user.id"
                            style="background: white; padding: 1rem; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;"
                            :style="{ border: selectedUser?.id === user.id ? '2px solid #007bff' : '1px solid #dee2e6' }"
                        >
                            <div>
                                <div style="font-weight: bold;">{{ user.name }}</div>
                                <div style="color: #666; font-size: 0.9rem;">{{ user.email }}</div>
                            </div>
                            <div style="display: flex; gap: 0.5rem;">
                                <button 
                                    @click="handleEdit(user)"
                                    :disabled="loading"
                                    style="padding: 0.25rem 0.75rem; background: #ffc107; color: #000; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9rem;"
                                >
                                    Edit
                                </button>
                                <button 
                                    @click="handleDelete(user.id)"
                                    :disabled="loading"
                                    style="padding: 0.25rem 0.75rem; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9rem;"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
}

// Integration with useLocalStorage for caching
export const CachingWithLocalStorage = {
    render: () => ({
        setup() {
            // Cache users in localStorage
            const cachedUsers = useLocalStorage('cached-users', [])
            const lastFetch = useLocalStorage('users-last-fetch', null)
            const cacheExpiry = 60000 // 1 minute

            const { data: users, loading, error, execute } = useApi('http://localhost:3001/api/users', {
                immediate: false,
                onSuccess: (data) => {
                    cachedUsers.value = data
                    lastFetch.value = Date.now()
                }
            })

            const isCacheValid = computed(() => {
                if (!lastFetch.value) return false
                return (Date.now() - lastFetch.value) < cacheExpiry
            })

            const loadUsers = async (forceRefresh = false) => {
                if (!forceRefresh && isCacheValid.value && cachedUsers.value.length > 0) {
                    console.log('Using cached data')
                    return
                }

                console.log('Fetching fresh data')
                await execute()
            }

            const clearCache = () => {
                cachedUsers.value = []
                lastFetch.value = null
            }

            const displayUsers = computed(() => {
                return users.value || cachedUsers.value
            })

            const cacheAge = computed(() => {
                if (!lastFetch.value) return 'No cache'
                const seconds = Math.floor((Date.now() - lastFetch.value) / 1000)
                return `${seconds}s ago`
            })

            // Load on mount
            loadUsers()

            return {
                displayUsers,
                loading,
                error,
                loadUsers,
                clearCache,
                isCacheValid,
                cacheAge
            }
        },
        template: `
            <div style="max-width: 700px; padding: 2rem;">
                <h3>Caching with useLocalStorage</h3>
                <p>Combine useApi with useLocalStorage for client-side caching:</p>
                
                <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <div>
                            <div style="font-weight: bold;">Cache Status:</div>
                            <div style="font-size: 0.9rem; color: #666;">
                                {{ isCacheValid ? '✓ Valid' : '✗ Expired' }} ({{ cacheAge }})
                            </div>
                        </div>
                        <div style="display: flex; gap: 0.5rem;">
                            <button 
                                @click="loadUsers(false)"
                                :disabled="loading"
                                style="padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
                            >
                                {{ loading ? 'Loading...' : 'Load (Use Cache)' }}
                            </button>
                            <button 
                                @click="loadUsers(true)"
                                :disabled="loading"
                                style="padding: 0.5rem 1rem; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;"
                            >
                                Force Refresh
                            </button>
                            <button 
                                @click="clearCache"
                                :disabled="loading"
                                style="padding: 0.5rem 1rem; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;"
                            >
                                Clear Cache
                            </button>
                        </div>
                    </div>
                    
                    <div v-if="loading" style="background: #e7f3ff; padding: 1rem; border-radius: 4px; margin-bottom: 1rem;">
                        Loading fresh data...
                    </div>
                    
                    <div v-if="error" style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 1rem; border-radius: 4px; margin-bottom: 1rem; color: #721c24;">
                        <strong>Error:</strong> {{ error.message }}
                    </div>
                    
                    <div v-if="displayUsers.length > 0">
                        <h4 style="margin-top: 0;">Users ({{ displayUsers.length }}):</h4>
                        <div style="display: grid; gap: 0.5rem;">
                            <div 
                                v-for="user in displayUsers" 
                                :key="user.id"
                                style="background: white; padding: 0.75rem; border-radius: 4px; border: 1px solid #dee2e6;"
                            >
                                <div style="font-weight: bold;">{{ user.name }}</div>
                                <div style="color: #666; font-size: 0.9rem;">{{ user.email }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="background: #d1ecf1; border: 1px solid #bee5eb; padding: 1rem; border-radius: 4px;">
                    <strong>💡 Caching Strategy:</strong>
                    <ul style="margin: 0.5rem 0 0 1rem; padding-left: 1rem;">
                        <li>Data is cached in localStorage after successful fetch</li>
                        <li>Cache expires after 1 minute</li>
                        <li>Valid cache is used automatically to reduce API calls</li>
                        <li>Force refresh bypasses cache and fetches fresh data</li>
                    </ul>
                </div>
            </div>
        `
    })
}

// Error handling scenarios
export const ErrorHandling = {
    render: () => ({
        setup() {
            const errorLog = ref([])

            const testEndpoint = ref('http://localhost:3001/api/users')
            const testMethod = ref('GET')

            const { data, loading, error, execute } = useApi(testEndpoint.value, {
                method: testMethod.value,
                immediate: false,
                onError: (err) => {
                    errorLog.value.push({
                        timestamp: new Date().toLocaleTimeString(),
                        endpoint: testEndpoint.value,
                        method: testMethod.value,
                        error: err.message
                    })
                }
            })

            const testSuccess = async () => {
                testEndpoint.value = 'http://localhost:3001/api/users'
                testMethod.value = 'GET'
                try {
                    await execute({
                        url: testEndpoint.value,
                        method: testMethod.value
                    })
                } catch (err) {
                    // Error logged by onError callback
                }
            }

            const test404 = async () => {
                testEndpoint.value = 'http://localhost:3001/api/nonexistent'
                testMethod.value = 'GET'
                try {
                    await execute({
                        url: testEndpoint.value,
                        method: testMethod.value
                    })
                } catch (err) {
                    // Error logged by onError callback
                }
            }

            const testNetworkError = async () => {
                testEndpoint.value = 'http://localhost:9999/api/users'
                testMethod.value = 'GET'
                try {
                    await execute({
                        url: testEndpoint.value,
                        method: testMethod.value
                    })
                } catch (err) {
                    // Error logged by onError callback
                }
            }

            const clearErrors = () => {
                errorLog.value = []
            }

            return {
                data,
                loading,
                error,
                errorLog,
                testSuccess,
                test404,
                testNetworkError,
                clearErrors
            }
        },
        template: `
            <div style="max-width: 700px; padding: 2rem;">
                <h3>Error Handling</h3>
                <p>Comprehensive error handling for various failure scenarios:</p>
                
                <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
                    <h4 style="margin-top: 0;">Test Scenarios:</h4>
                    <div style="display: grid; gap: 0.5rem;">
                        <button 
                            @click="testSuccess"
                            :disabled="loading"
                            style="padding: 0.75rem; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; text-align: left;"
                        >
                            ✓ Test Successful Request
                        </button>
                        <button 
                            @click="test404"
                            :disabled="loading"
                            style="padding: 0.75rem; background: #ffc107; color: #000; border: none; border-radius: 4px; cursor: pointer; text-align: left;"
                        >
                            ⚠️ Test 404 Error (Not Found)
                        </button>
                        <button 
                            @click="testNetworkError"
                            :disabled="loading"
                            style="padding: 0.75rem; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; text-align: left;"
                        >
                            ✗ Test Network Error (Connection Failed)
                        </button>
                    </div>
                </div>
                
                <div v-if="loading" style="background: #e7f3ff; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="width: 20px; height: 20px; border: 3px solid #007bff; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                        <span>Testing...</span>
                    </div>
                </div>
                
                <div v-if="data && !loading" style="background: #d4edda; border: 1px solid #c3e6cb; padding: 1rem; border-radius: 4px; margin: 1rem 0; color: #155724;">
                    <strong>✓ Success!</strong> Request completed successfully.
                </div>
                
                <div v-if="error && !loading" style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 1rem; border-radius: 4px; margin: 1rem 0; color: #721c24;">
                    <strong>Current Error:</strong> {{ error.message }}
                </div>
                
                <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h4 style="margin: 0;">Error Log ({{ errorLog.length }}):</h4>
                        <button 
                            @click="clearErrors"
                            style="padding: 0.5rem 1rem; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        >
                            Clear Log
                        </button>
                    </div>
                    
                    <div v-if="errorLog.length === 0" style="text-align: center; color: #666; font-style: italic; padding: 2rem;">
                        No errors logged yet. Try the test scenarios above.
                    </div>
                    
                    <div v-else style="max-height: 300px; overflow-y: auto;">
                        <div 
                            v-for="(log, index) in errorLog" 
                            :key="index"
                            style="background: white; padding: 1rem; border-radius: 4px; margin-bottom: 0.5rem; border: 1px solid #dee2e6;"
                        >
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <strong>{{ log.timestamp }}</strong>
                                <span style="background: #dc3545; color: white; padding: 0.25rem 0.5rem; border-radius: 3px; font-size: 0.8rem;">
                                    {{ log.method }}
                                </span>
                            </div>
                            <div style="font-family: monospace; font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">
                                {{ log.endpoint }}
                            </div>
                            <div style="color: #dc3545;">
                                {{ log.error }}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="background: #d1ecf1; border: 1px solid #bee5eb; padding: 1rem; border-radius: 4px;">
                    <strong>💡 Error Handling Features:</strong>
                    <ul style="margin: 0.5rem 0 0 1rem; padding-left: 1rem;">
                        <li>Automatic HTTP error detection (4xx, 5xx)</li>
                        <li>Network error handling (connection failures)</li>
                        <li>Custom error callbacks via <code>onError</code></li>
                        <li>Detailed error messages for debugging</li>
                        <li>Graceful error recovery</li>
                    </ul>
                </div>
                
                <style>
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                </style>
            </div>
        `
    })
}