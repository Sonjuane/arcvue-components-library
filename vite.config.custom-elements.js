import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'
import autoprefixer from 'autoprefixer'
import { glob } from 'glob'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

/**
 * Get all Custom Element entry files
 * @returns {Object} Entry points for Custom Elements build
 */
function getCustomElementEntries() {
    const ceFiles = glob.sync('src/components/*/*.ce.js', { cwd: __dirname })
    const entries = {}

    ceFiles.forEach(file => {
        const componentName = file.split('/')[2] // Extract component name from path
        entries[componentName] = resolve(__dirname, file)
    })

    return entries
}

export default defineConfig({
    plugins: [
        vue({
            customElement: true,
            template: {
                compilerOptions: {
                    // Treat all tags with a dash as custom elements
                    isCustomElement: (tag) => tag.includes('-')
                }
            }
        })
    ],
    define: {
        // Define process.env for browser compatibility
        'process.env': {},
        'process.env.NODE_ENV': '"production"'
    },
    build: {
        lib: {
            entry: getCustomElementEntries(),
            formats: ['es']
        },
        rollupOptions: {
            output: {
                dir: 'dist/custom-elements',
                entryFileNames: '[name].js',
                format: 'es',
                // Don't externalize Vue for Custom Elements - they need to be standalone
                globals: {}
            }
        },
        cssCodeSplit: false,
        outDir: 'dist/custom-elements',
        emptyOutDir: false, // Don't clear the entire dist folder
        target: 'es2015' // Ensure browser compatibility
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
    }
})