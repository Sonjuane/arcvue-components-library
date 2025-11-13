/**
 * Button Component Stories
 * Interactive documentation and testing for the Button component
 */

import Button from './Button.vue'

export default {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A versatile button component with multiple variants and sizes.'
            },
            autodocs: true
        },
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'outline'],
            description: 'Button style variant'
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
            description: 'Button size'
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the button is disabled'
        },
        default: {
            control: 'text',
            description: 'Button text content'
        }
    }
}

// Default story
export const Default = {
    args: {
        default: 'Default Button'
    }
}

// Primary variant
export const Primary = {
    args: {
        variant: 'primary',
        default: 'Primary Button'
    }
}

// Secondary variant
export const Secondary = {
    args: {
        variant: 'secondary',
        default: 'Secondary Button'
    }
}

// Outline variant
export const Outline = {
    args: {
        variant: 'outline',
        default: 'Outline Button'
    }
}

// Small size
export const Small = {
    args: {
        size: 'sm',
        default: 'Small Button',
        disabled: true
    }
}

// Medium size (default)
export const Medium = {
    args: {
        size: 'md',
        default: 'Medium Button'
    }
}

// Large size
export const Large = {
    args: {
        size: 'lg',
        default: 'Large Button'
    }
}

// Disabled state
export const Disabled = {
    args: {
        disabled: true,
        default: 'Disabled Button'
    }
}

// All variants showcase
export const AllVariants = {
    render: () => ({
        components: { Button },
        template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </div>
    `
    })
}

// All sizes showcase
export const AllSizes = {
    render: () => ({
        components: { Button },
        template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    `
    })
}

// Interactive example with events
export const Interactive = {
    render: (args) => ({
        components: { Button },
        setup() {
            const handleClick = (event) => {
                console.log('Button clicked:', event)
                alert('Button clicked! Check console for details.')
            }
            return { args, handleClick }
        },
        template: `
      <Button 
        :variant="args.variant" 
        :size="args.size" 
        :disabled="args.disabled"
        @click="handleClick"
      >
        {{ args.default }}
      </Button>
    `
    }),
    args: {
        variant: 'primary',
        size: 'md',
        disabled: false,
        default: 'Click Me!'
    }
}