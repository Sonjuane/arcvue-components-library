/**
 * Card Component Stories
 * Interactive documentation and testing for the Card component
 */

import Card from './Card.vue'

export default {
    title: 'Components/Card',
    component: Card,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'A flexible card container with header, content, and footer slots. Supports multiple variants and interactive states.'
            }
        }
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['default', 'elevated', 'outlined', 'filled'],
            description: 'Card style variant'
        },
        padding: {
            control: { type: 'select' },
            options: ['none', 'small', 'medium', 'large'],
            description: 'Card padding size'
        },
        clickable: {
            control: 'boolean',
            description: 'Whether the card is clickable with hover effects'
        },
        header: {
            control: 'text',
            description: 'Header slot content'
        },
        default: {
            control: 'text',
            description: 'Main content slot'
        },
        footer: {
            control: 'text',
            description: 'Footer slot content'
        }
    }
}

// Default story
export const Default = {
    args: {
        default: 'This is the main content of the card. It can contain any type of content including text, images, buttons, and more.',
        header: 'Card Header',
        footer: 'Card Footer'
    }
}

// Default variant
export const DefaultVariant = {
    args: {
        variant: 'default',
        default: 'Default card with subtle border and shadow.',
        header: 'Default Card'
    }
}

// Elevated variant
export const Elevated = {
    args: {
        variant: 'elevated',
        default: 'Elevated card with prominent shadow for emphasis.',
        header: 'Elevated Card'
    }
}

// Outlined variant
export const Outlined = {
    args: {
        variant: 'outlined',
        default: 'Outlined card with transparent background and border.',
        header: 'Outlined Card'
    }
}

// Filled variant
export const Filled = {
    args: {
        variant: 'filled',
        default: 'Filled card with background color variant.',
        header: 'Filled Card'
    }
}

// No padding
export const NoPadding = {
    args: {
        padding: 'none',
        default: 'Card with no internal padding.',
        header: 'No Padding'
    }
}

// Small padding
export const SmallPadding = {
    args: {
        padding: 'small',
        default: 'Card with small internal padding.',
        header: 'Small Padding'
    }
}

// Medium padding (default)
export const MediumPadding = {
    args: {
        padding: 'medium',
        default: 'Card with medium internal padding (default).',
        header: 'Medium Padding'
    }
}

// Large padding
export const LargePadding = {
    args: {
        padding: 'large',
        default: 'Card with large internal padding.',
        header: 'Large Padding'
    }
}

// Clickable card
export const Clickable = {
    args: {
        clickable: true,
        default: 'This card is clickable! It has hover effects and keyboard navigation support.',
        header: 'Clickable Card'
    }
}

// Content only (no header/footer)
export const ContentOnly = {
    args: {
        default: 'This card only has main content, no header or footer slots are used.'
    }
}

// Header only
export const HeaderOnly = {
    args: {
        header: 'Header Only Card',
        default: 'This card has a header and content, but no footer.'
    }
}

// All variants showcase
export const AllVariants = {
    render: () => ({
        components: { Card },
        template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
        <Card variant="default">
          <template #header>Default Card</template>
          <p>Default variant with border and subtle shadow.</p>
        </Card>
        <Card variant="elevated">
          <template #header>Elevated Card</template>
          <p>Elevated variant with prominent shadow.</p>
        </Card>
        <Card variant="outlined">
          <template #header>Outlined Card</template>
          <p>Outlined variant with transparent background.</p>
        </Card>
        <Card variant="filled">
          <template #header>Filled Card</template>
          <p>Filled variant with background color.</p>
        </Card>
      </div>
    `
    })
}

// All padding sizes showcase
export const AllPaddingSizes = {
    render: () => ({
        components: { Card },
        template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
        <Card padding="none" variant="outlined">
          <template #header>None</template>
          <p>No padding</p>
        </Card>
        <Card padding="small" variant="outlined">
          <template #header>Small</template>
          <p>Small padding</p>
        </Card>
        <Card padding="medium" variant="outlined">
          <template #header>Medium</template>
          <p>Medium padding</p>
        </Card>
        <Card padding="large" variant="outlined">
          <template #header>Large</template>
          <p>Large padding</p>
        </Card>
      </div>
    `
    })
}

// Interactive example with events
export const Interactive = {
    render: (args) => ({
        components: { Card },
        setup() {
            const handleClick = (event) => {
                console.log('Card clicked:', event)
                alert('Card clicked! Check console for details.')
            }
            return { args, handleClick }
        },
        template: `
      <Card 
        :variant="args.variant" 
        :padding="args.padding" 
        :clickable="args.clickable"
        @click="handleClick"
      >
        <template #header v-if="args.header">{{ args.header }}</template>
        {{ args.default }}
        <template #footer v-if="args.footer">{{ args.footer }}</template>
      </Card>
    `
    }),
    args: {
        variant: 'elevated',
        padding: 'medium',
        clickable: true,
        header: 'Interactive Card',
        default: 'Click me to see the interaction!',
        footer: 'Footer content'
    }
}

// Real-world example: User Profile Card
export const UserProfileCard = {
    render: () => ({
        components: { Card },
        template: `
      <Card variant="elevated" padding="large" style="max-width: 300px;">
        <template #header>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);"></div>
            <div>
              <h3 style="margin: 0; font-size: 1.1rem;">Sarah Johnson</h3>
              <p style="margin: 0; color: #666; font-size: 0.9rem;">Product Designer</p>
            </div>
          </div>
        </template>
        <p style="margin: 0.5rem 0;">Passionate about creating user-centered designs that solve real problems. 5+ years experience in UX/UI design.</p>
        <template #footer>
          <div style="display: flex; gap: 0.5rem;">
            <button style="flex: 1; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; background: white; cursor: pointer;">Message</button>
            <button style="flex: 1; padding: 0.5rem; border: 1px solid #007bff; border-radius: 4px; background: #007bff; color: white; cursor: pointer;">Connect</button>
          </div>
        </template>
      </Card>
    `
    })
}

// Real-world example: Product Card
export const ProductCard = {
    render: () => ({
        components: { Card },
        template: `
      <Card variant="default" padding="none" clickable style="max-width: 280px;">
        <template #header>
          <div style="height: 200px; background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%); border-radius: 8px 8px 0 0;"></div>
        </template>
        <div style="padding: 1rem;">
          <h3 style="margin: 0 0 0.5rem 0;">Wireless Headphones</h3>
          <p style="margin: 0 0 1rem 0; color: #666;">Premium noise-cancelling headphones with 30-hour battery life.</p>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 1.25rem; font-weight: bold; color: #007bff;">$199.99</span>
            <button style="padding: 0.5rem 1rem; border: none; border-radius: 4px; background: #007bff; color: white; cursor: pointer;">Add to Cart</button>
          </div>
        </div>
      </Card>
    `
    })
}

// Real-world example: Notification Card
export const NotificationCard = {
    render: () => ({
        components: { Card },
        template: `
      <Card variant="filled" padding="medium" style="max-width: 400px;">
        <template #header>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div style="width: 8px; height: 8px; border-radius: 50%; background: #28a745;"></div>
            <span style="font-weight: 500;">System Update</span>
            <span style="margin-left: auto; font-size: 0.8rem; color: #666;">2 minutes ago</span>
          </div>
        </template>
        <p style="margin: 0;">Your system has been successfully updated to version 2.1.0. New features include improved performance and bug fixes.</p>
        <template #footer>
          <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
            <button style="padding: 0.25rem 0.75rem; border: 1px solid #ddd; border-radius: 4px; background: white; cursor: pointer; font-size: 0.9rem;">Dismiss</button>
            <button style="padding: 0.25rem 0.75rem; border: 1px solid #007bff; border-radius: 4px; background: #007bff; color: white; cursor: pointer; font-size: 0.9rem;">View Details</button>
          </div>
        </template>
      </Card>
    `
    })
}