import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'
import autoprefixer from 'autoprefixer'

export default defineConfig({
    plugins: [
        vue({
            customElement: true
        })
    ],
    build: {
        lib: {
            entry: resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/index.js'),
            name: 'ArcVueComponents',
            fileName: (format) => `index.${format === 'es' ? 'js' : format}`
        },
        rollupOptions: {
            // Externalize Vue in library build
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        },
        cssCodeSplit: false
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
            '@composables': fileURLToPath(new URL('./src/composables', import.meta.url)),
            '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
            '@utils': fileURLToPath(new URL('./src/utils', import.meta.url))
        }
    },
    css: {
        postcss: {
            plugins: [
                autoprefixer
            ]
        }
    },
    server: {
        port: 3000,
        open: false
    }
})