#!/usr/bin/env node

/**
 * Custom Elements Build Script
 * 
 * This script builds Vue components as standalone Custom Elements
 * that can be used in vanilla HTML/JavaScript without Vue framework.
 * 
 * Usage: node scripts/build-custom-elements.js
 * Or: pnpm build:custom-elements
 */

import { execSync } from 'child_process'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { glob } from 'glob'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = resolve(__dirname, '..')

console.log('🚀 Building Custom Elements...\n')

try {
    // Ensure dist directory exists
    const distDir = resolve(rootDir, 'dist')
    if (!existsSync(distDir)) {
        mkdirSync(distDir, { recursive: true })
    }

    // Check if any .ce.js files exist
    const ceFiles = glob.sync('src/components/*/*.ce.js', { cwd: rootDir })

    if (ceFiles.length === 0) {
        console.log('⚠️  No Custom Element files found (*.ce.js)')
        console.log('   Create .ce.js files in your component directories to build Custom Elements')
        process.exit(0)
    }

    console.log(`📦 Found ${ceFiles.length} Custom Element(s):`)
    ceFiles.forEach(file => {
        const componentName = file.split('/')[2]
        console.log(`   - ${componentName} (${file})`)
    })
    console.log()

    // Build using the custom elements Vite config
    console.log('🔨 Building Custom Elements with Vite...')
    execSync('vite build --config vite.config.custom-elements.js', {
        cwd: rootDir,
        stdio: 'inherit'
    })

    // Create an index file for easy importing of all custom elements
    console.log('\n📝 Creating Custom Elements index file...')
    createCustomElementsIndex(ceFiles)

    // Create usage documentation
    console.log('📚 Creating usage documentation...')
    createUsageDocumentation(ceFiles)

    console.log('\n✅ Custom Elements build completed!')
    console.log('📁 Output directory: dist/custom-elements/')
    console.log('🌐 Test your Custom Elements by opening: dist/custom-elements/test.html')

} catch (error) {
    console.error('❌ Build failed:', error.message)
    process.exit(1)
}

/**
 * Create an index file that imports and registers all custom elements
 * @param {string[]} ceFiles - Array of custom element file paths
 */
function createCustomElementsIndex(ceFiles) {
    const imports = []
    const exports = []

    ceFiles.forEach(file => {
        const componentName = file.split('/')[2]
        const className = `Arc${componentName}`

        imports.push(`import ${className} from './${componentName}.js'`)
        exports.push(`export { default as ${className} } from './${componentName}.js'`)
    })

    const indexContent = `/**
 * Custom Elements Index
 * 
 * This file imports and auto-registers all Custom Elements.
 * Import this file to register all components at once.
 * 
 * Usage:
 * <script type="module" src="./custom-elements/index.js"></script>
 */

${imports.join('\n')}

// All custom elements are auto-registered when their modules are imported
console.log('🎉 ArcVue Custom Elements loaded and registered!')

${exports.join('\n')}
`

    writeFileSync(resolve(rootDir, 'dist/custom-elements/index.js'), indexContent)
}

/**
 * Create usage documentation and test HTML file
 * @param {string[]} ceFiles - Array of custom element file paths
 */
function createUsageDocumentation(ceFiles) {
    const components = ceFiles.map(file => {
        const componentName = file.split('/')[2]
        return {
            name: componentName,
            tagName: `arc-${componentName.toLowerCase()}`,
            file: `${componentName}.js`
        }
    })

    const testHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ArcVue Custom Elements Test</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.6;
        }
        .component-section {
            margin: 2rem 0;
            padding: 1rem;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
        }
        .component-section h3 {
            margin-top: 0;
            color: #374151;
        }
        .examples {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            margin: 1rem 0;
        }
        code {
            background: #f3f4f6;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-family: 'Monaco', 'Menlo', monospace;
        }
    </style>
</head>
<body>
    <h1>🎉 ArcVue Custom Elements Test</h1>
    <p>This page demonstrates the Custom Elements built from Vue components.</p>
    
    ${components.map(comp => `
    <div class="component-section">
        <h3>&lt;${comp.tagName}&gt; Component</h3>
        <p>Source: <code>${comp.file}</code></p>
        
        <div class="examples">
            ${comp.name === 'Button' ? `
            <arc-button variant="primary">Primary Button</arc-button>
            <arc-button variant="secondary">Secondary Button</arc-button>
            <arc-button variant="outline">Outline Button</arc-button>
            <arc-button variant="primary" size="sm">Small</arc-button>
            <arc-button variant="primary" size="lg">Large</arc-button>
            <arc-button variant="primary" disabled>Disabled</arc-button>
            ` : `
            <${comp.tagName}>Default ${comp.name}</${comp.tagName}>
            `}
        </div>
    </div>
    `).join('')}

    <div class="component-section">
        <h3>JavaScript Usage</h3>
        <p>You can also create and manipulate elements with JavaScript:</p>
        <div id="js-examples"></div>
        <button onclick="addDynamicButton()">Add Dynamic Button</button>
    </div>

    <!-- Import all custom elements -->
    <script type="module" src="./index.js"></script>
    
    <script>
        // Example of creating elements dynamically
        function addDynamicButton() {
            const container = document.getElementById('js-examples');
            const button = document.createElement('arc-button');
            button.setAttribute('variant', 'primary');
            button.textContent = 'Dynamic Button ' + (container.children.length + 1);
            
            button.addEventListener('click', (e) => {
                alert('Dynamic button clicked!');
            });
            
            container.appendChild(button);
        }

        // Add event listeners to all buttons
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('arc-button').forEach(button => {
                button.addEventListener('click', (e) => {
                    console.log('Button clicked:', e.target);
                });
            });
        });
    </script>
</body>
</html>`

    writeFileSync(resolve(rootDir, 'dist/custom-elements/test.html'), testHtml)
}