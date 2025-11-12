/**
 * Modal Component Stories
 * Interactive documentation and testing for the Modal component
 */

import Modal from './Modal.vue'

export default {
    title: 'Components/Modal',
    component: Modal,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'A flexible modal dialog with accessibility features, focus trapping, and portal support.'
            }
        }
    },
    argTypes: {
        modelValue: {
            control: 'boolean',
            description: 'Controls modal visibility (v-model support)'
        },
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large', 'fullscreen'],
            description: 'Modal size variant'
        },
        persistent: {
            control: 'boolean',
            description: 'Prevents closing on backdrop click or escape key'
        },
        noBackdrop: {
            control: 'boolean',
            description: 'Removes the backdrop overlay'
        },
        scrollable: {
            control: 'boolean',
            description: 'Allows content area to scroll independently'
        },
        centered: {
            control: 'boolean',
            description: 'Centers modal vertically in viewport'
        }
    }
}

// Default story
export const Default = {
    render: (args) => ({
        components: { Modal },
        setup() {
            return { args }
        },
        template: `
            <div>
                <p style="padding: 2rem;">Click the button below to open the modal:</p>
                <button 
                    @click="args.modelValue = true"
                    style="padding: 0.75rem 1.5rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
                >
                    Open Modal
                </button>
                
                <Modal 
                    v-model="args.modelValue"
                    :size="args.size"
                    :persistent="args.persistent"
                    :no-backdrop="args.noBackdrop"
                    :scrollable="args.scrollable"
                    :centered="args.centered"
                    @open="() => console.log('Modal opened')"
                    @close="() => console.log('Modal closed')"
                >
                    <template #header>
                        <h2 style="margin: 0; font-size: 1.5rem;">Modal Title</h2>
                    </template>
                    
                    <div>
                        <p>This is the modal content. You can customize all aspects of the modal through Storybook controls.</p>
                        <p>This modal demonstrates accessibility features including focus trapping and keyboard navigation.</p>
                    </div>
                    
                    <template #footer>
                        <button 
                            @click="args.modelValue = false"
                            style="background: #6c757d; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; margin-right: 0.5rem;"
                        >
                            Cancel
                        </button>
                        <button 
                            @click="args.modelValue = false"
                            style="background: #007bff; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;"
                        >
                            Confirm
                        </button>
                    </template>
                </Modal>
            </div>
        `
    }),
    args: {
        modelValue: false,
        size: 'medium',
        persistent: false,
        noBackdrop: false,
        scrollable: false,
        centered: true
    }
}

// Small size
export const Small = {
    render: (args) => ({
        components: { Modal },
        setup() {
            return { args }
        },
        template: `
            <div>
                <button 
                    @click="args.modelValue = true"
                    style="padding: 0.75rem 1.5rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
                >
                    Open Small Modal
                </button>
                
                <Modal v-model="args.modelValue" :size="args.size">
                    <template #header>
                        <h3 style="margin: 0;">Small Modal</h3>
                    </template>
                    
                    <p>This is a small modal perfect for confirmations or simple forms.</p>
                    
                    <template #footer>
                        <button 
                            @click="args.modelValue = false"
                            style="background: #007bff; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;"
                        >
                            Close
                        </button>
                    </template>
                </Modal>
            </div>
        `
    }),
    args: {
        modelValue: false,
        size: 'small'
    }
}

// Large size
export const Large = {
    render: (args) => ({
        components: { Modal },
        setup() {
            return { args }
        },
        template: `
            <div>
                <button 
                    @click="args.modelValue = true"
                    style="padding: 0.75rem 1.5rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
                >
                    Open Large Modal
                </button>
                
                <Modal v-model="args.modelValue" :size="args.size">
                    <template #header>
                        <h2 style="margin: 0;">Large Modal</h2>
                    </template>
                    
                    <div>
                        <p>This is a large modal suitable for complex forms or detailed content.</p>
                        <p>It provides more space for content while maintaining good proportions on larger screens.</p>
                        <div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
                            <h4 style="margin-top: 0;">Example Content Section</h4>
                            <p>You can include forms, tables, or other complex content in large modals.</p>
                        </div>
                    </div>
                    
                    <template #footer>
                        <button 
                            @click="args.modelValue = false"
                            style="background: #6c757d; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; margin-right: 0.5rem;"
                        >
                            Cancel
                        </button>
                        <button 
                            @click="args.modelValue = false"
                            style="background: #28a745; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;"
                        >
                            Save Changes
                        </button>
                    </template>
                </Modal>
            </div>
        `
    }),
    args: {
        modelValue: false,
        size: 'large'
    }
}

// Scrollable content
export const ScrollableContent = {
    render: (args) => ({
        components: { Modal },
        setup() {
            return { args }
        },
        template: `
            <div>
                <button 
                    @click="args.modelValue = true"
                    style="padding: 0.75rem 1.5rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
                >
                    Open Scrollable Modal
                </button>
                
                <Modal v-model="args.modelValue" :scrollable="args.scrollable">
                    <template #header>
                        <h2 style="margin: 0;">Scrollable Modal</h2>
                    </template>
                    
                    <div>
                        <p>This modal has scrollable content. The header and footer remain fixed while the content area scrolls.</p>
                        <div v-for="i in 20" :key="i" style="padding: 1rem; margin: 0.5rem 0; background: #f8f9fa; border-radius: 4px;">
                            <h4 style="margin: 0 0 0.5rem 0;">Content Section {{ i }}</h4>
                            <p style="margin: 0;">This is example content to demonstrate scrolling behavior. The modal maintains its header and footer position while allowing the content to scroll independently.</p>
                        </div>
                    </div>
                    
                    <template #footer>
                        <button 
                            @click="args.modelValue = false"
                            style="background: #007bff; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;"
                        >
                            Close
                        </button>
                    </template>
                </Modal>
            </div>
        `
    }),
    args: {
        modelValue: false,
        scrollable: true
    }
}

// Persistent modal
export const Persistent = {
    render: (args) => ({
        components: { Modal },
        setup() {
            return { args }
        },
        template: `
            <div>
                <button 
                    @click="args.modelValue = true"
                    style="padding: 0.75rem 1.5rem; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;"
                >
                    Open Persistent Modal
                </button>
                
                <Modal v-model="args.modelValue" :persistent="args.persistent">
                    <template #header>
                        <h2 style="margin: 0;">Persistent Modal</h2>
                    </template>
                    
                    <div>
                        <p><strong>This modal cannot be closed by clicking the backdrop or pressing Escape.</strong></p>
                        <p>Notice there's no close button in the header. You must use the buttons in the footer to close it.</p>
                        <p>This is useful for critical actions that require explicit user confirmation.</p>
                    </div>
                    
                    <template #footer>
                        <button 
                            @click="args.modelValue = false"
                            style="background: #6c757d; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; margin-right: 0.5rem;"
                        >
                            Cancel
                        </button>
                        <button 
                            @click="args.modelValue = false"
                            style="background: #dc3545; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;"
                        >
                            Confirm Action
                        </button>
                    </template>
                </Modal>
            </div>
        `
    }),
    args: {
        modelValue: false,
        persistent: true
    }
}

// No backdrop
export const NoBackdrop = {
    render: (args) => ({
        components: { Modal },
        setup() {
            return { args }
        },
        template: `
            <div>
                <button 
                    @click="args.modelValue = true"
                    style="padding: 0.75rem 1.5rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
                >
                    Open Modal Without Backdrop
                </button>
                
                <Modal v-model="args.modelValue" :no-backdrop="args.noBackdrop">
                    <template #header>
                        <h2 style="margin: 0;">No Backdrop Modal</h2>
                    </template>
                    
                    <div>
                        <p>This modal has no backdrop overlay, allowing you to see and interact with the content behind it.</p>
                        <p>This can be useful for non-blocking notifications or floating panels.</p>
                    </div>
                    
                    <template #footer>
                        <button 
                            @click="args.modelValue = false"
                            style="background: #007bff; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;"
                        >
                            Close
                        </button>
                    </template>
                </Modal>
            </div>
        `
    }),
    args: {
        modelValue: false,
        noBackdrop: true
    }
}

// Form example
export const FormExample = {
    render: (args) => ({
        components: { Modal },
        setup() {
            return { args }
        },
        template: `
            <div>
                <button 
                    @click="args.modelValue = true"
                    style="padding: 0.75rem 1.5rem; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;"
                >
                    Open Form Modal
                </button>
                
                <Modal v-model="args.modelValue">
                    <template #header>
                        <h2 style="margin: 0;">User Information</h2>
                    </template>
                    
                    <form @submit.prevent="args.modelValue = false">
                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Name:</label>
                            <input 
                                type="text" 
                                style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
                                placeholder="Enter your name"
                            >
                        </div>
                        
                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email:</label>
                            <input 
                                type="email" 
                                style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
                                placeholder="Enter your email"
                            >
                        </div>
                        
                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Message:</label>
                            <textarea 
                                rows="4"
                                style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; resize: vertical;"
                                placeholder="Enter your message"
                            ></textarea>
                        </div>
                    </form>
                    
                    <template #footer>
                        <button 
                            @click="args.modelValue = false"
                            style="background: #6c757d; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; margin-right: 0.5rem;"
                        >
                            Cancel
                        </button>
                        <button 
                            @click="args.modelValue = false"
                            style="background: #28a745; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;"
                        >
                            Submit
                        </button>
                    </template>
                </Modal>
            </div>
        `
    }),
    args: {
        modelValue: false
    }
}