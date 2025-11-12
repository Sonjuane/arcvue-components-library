/**
 * Storybook Configuration for Vue 3 + Vite
 * Supports standard .stories.js files with recursive discovery
 */

import { fileURLToPath, URL } from 'node:url'

export default {
    stories: [
        '../src/**/*.stories.@(js|jsx|ts|tsx|mdx|vue)'
    ],

    addons: ['@storybook/addon-links', '@storybook/addon-docs'],

    framework: {
        name: '@storybook/vue3-vite',
        options: {}
    },

    async viteFinal(config) {
        // Customize Vite config for Storybook
        return {
            ...config,
            define: {
                ...config.define,
                global: 'globalThis'
            },
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve?.alias,
                    '@': fileURLToPath(new URL('../src', import.meta.url)),
                    '@components': fileURLToPath(new URL('../src/components', import.meta.url)),
                    '@composables': fileURLToPath(new URL('../src/composables', import.meta.url)),
                    '@styles': fileURLToPath(new URL('../src/styles', import.meta.url)),
                    '@utils': fileURLToPath(new URL('../src/utils', import.meta.url))
                }
            }
        }
    },

    docs: {
        autodocs: 'tag'
    }
}