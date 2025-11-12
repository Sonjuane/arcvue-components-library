/**
 * Storybook Preview Configuration
 * Global settings, decorators, and parameters
 */


import '../src/styles/variables.css'
import '../src/styles/base.css'


/**
 * Global parameters for all stories
 */
export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    },
    docs: {
        description: {
            component: 'ArcVue Component Library - Vue 3 components and composables'
        }
    },
    backgrounds: {
        options: {
            light: {
                name: 'light',
                value: '#ffffff'
            },

            dark: {
                name: 'dark',
                value: '#1a1a1a'
            },

            gray: {
                name: 'gray',
                value: '#f5f5f5'
            }
        }
    },
    viewport: {
        options: {
            mobile: {
                name: 'Mobile',
                styles: {
                    width: '375px',
                    height: '667px'
                }
            },
            tablet: {
                name: 'Tablet',
                styles: {
                    width: '768px',
                    height: '1024px'
                }
            },
            desktop: {
                name: 'Desktop',
                styles: {
                    width: '1200px',
                    height: '800px'
                }
            }
        }
    }
}

/**
 * Global decorators for all stories
 */
export const decorators = [
    (story) => ({
        components: { story },
        template: `
      <div style="padding: 1rem; font-family: var(--arc-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);">
        <story />
      </div>
    `
    })
]

/**
 * Global arg types for consistent controls
 */
export const globalTypes = {
    theme: {
        name: 'Theme',
        description: 'Global theme for components',
        defaultValue: 'light',
        toolbar: {
            icon: 'paintbrush',
            items: ['light', 'dark'],
            showName: true
        }
    }
}

export const initialGlobals = {
    backgrounds: {
        value: 'light'
    }
};