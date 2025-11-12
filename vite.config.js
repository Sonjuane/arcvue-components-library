import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'
import autoprefixer from 'autoprefixer'
import { glob } from 'glob'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// Get all component entries for individual builds
function getComponentEntries() {
    const componentFiles = glob.sync('src/components/*/index.js', { cwd: __dirname })
    const composableFiles = glob.sync('src/composables/*/index.js', { cwd: __dirname })

    const entries = {}

    // Add component entries
    componentFiles.forEach(file => {
        const name = file.split('/')[2] // Extract component name from path
        entries[`components/${name}`] = resolve(__dirname, file)
    })

    // Add composable entries
    composableFiles.forEach(file => {
        const name = file.split('/')[2] // Extract composable name from path
        entries[`composables/${name}`] = resolve(__dirname, file)
    })

    return entries
}

export default defineConfig(({ command, mode }) => {
    const isLibBuild = command === 'build' && !process.env.STORYBOOK

    if (isLibBuild) {
        // Build main library bundle (ES, CJS, UMD)
        const mainBuild = {
            plugins: [
                vue({
                    customElement: true
                })
            ],
            build: {
                lib: {
                    entry: resolve(__dirname, 'src/index.js'),
                    name: 'ArcVueComponents',
                    fileName: (format) => {
                        const ext = format === 'es' ? 'js' : format === 'cjs' ? 'cjs' : `${format}.js`
                        return `index.${ext}`
                    },
                    formats: ['es', 'cjs', 'umd']
                },
                rollupOptions: {
                    external: ['vue'],
                    output: [
                        // ES modules
                        {
                            format: 'es',
                            dir: 'dist/es',
                            entryFileNames: 'index.js',
                            assetFileNames: '[name].[ext]',
                            globals: {
                                vue: 'Vue'
                            }
                        },
                        // CommonJS
                        {
                            format: 'cjs',
                            dir: 'dist/cjs',
                            entryFileNames: 'index.cjs',
                            assetFileNames: '[name].[ext]',
                            exports: 'named',
                            globals: {
                                vue: 'Vue'
                            }
                        },
                        // UMD
                        {
                            format: 'umd',
                            dir: 'dist/umd',
                            entryFileNames: 'index.umd.js',
                            name: 'ArcVueComponents',
                            assetFileNames: '[name].[ext]',
                            globals: {
                                vue: 'Vue'
                            }
                        }
                    ]
                },
                cssCodeSplit: false,
                outDir: 'dist'
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
        }

        return mainBuild
    }

    // Development configuration
    return {
        plugins: [
            vue({
                customElement: true
            })
        ],
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
    }
})