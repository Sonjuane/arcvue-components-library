import { parse } from '@vue/compiler-sfc';
import { readFileSync } from 'fs';

/**
 * Parse a Vue SFC file and extract its components
 * @param {string} filePath - Path to the .story.vue file
 * @returns {Object} Parsed SFC data
 */
export function parseVueSFC(filePath) {
    try {
        const source = readFileSync(filePath, 'utf-8');
        const { descriptor, errors } = parse(source, { filename: filePath });

        if (errors.length > 0) {
            throw new Error(`Parse errors in ${filePath}: ${errors.map(e => e.message).join(', ')}`);
        }

        return {
            filePath,
            script: descriptor.script || descriptor.scriptSetup,
            template: descriptor.template,
            styles: descriptor.styles,
            customBlocks: descriptor.customBlocks,
            source
        };
    } catch (error) {
        throw new Error(`Failed to parse ${filePath}: ${error.message}`);
    }
}

/**
 * Extract metadata from script content
 * @param {Object} script - Script descriptor from Vue SFC
 * @returns {Object} Extracted metadata
 */
export function extractMetadata(script) {
    if (!script || !script.content) {
        return { imports: [], exports: {}, meta: {} };
    }

    const content = script.content;
    const metadata = {
        imports: [],
        exports: {},
        meta: {}
    };

    // Extract import statements
    const importRegex = /import\s+(?:{[^}]+}|[\w]+)\s+from\s+['"]([^'"]+)['"]/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
        metadata.imports.push(match[0]);
    }

    // Extract default export
    const defaultExportRegex = /export\s+default\s+({[\s\S]*?})\s*;?\s*$/m;
    const defaultMatch = content.match(defaultExportRegex);
    if (defaultMatch) {
        try {
            // Extract the object content
            const objContent = defaultMatch[1];
            metadata.exports.default = objContent;

            // Try to extract meta object if present
            const metaRegex = /meta:\s*({[\s\S]*?})\s*,?\s*$/m;
            const metaMatch = objContent.match(metaRegex);
            if (metaMatch) {
                metadata.meta = metaMatch[1];
            }
        } catch (error) {
            console.warn(`Could not parse default export: ${error.message}`);
        }
    }

    return metadata;
}

/**
 * Extract component name from file path or import statement
 * @param {string} filePath - Path to the .story.vue file
 * @param {Object} metadata - Metadata containing imports
 * @returns {string} Component name
 */
export function extractComponentName(filePath, metadata = null) {
    // First, try to extract from import statement if metadata is provided
    if (metadata && metadata.imports) {
        for (const importStatement of metadata.imports) {
            // Match: import ComponentName from './ComponentName.vue'
            const match = importStatement.match(/import\s+(\w+)\s+from/);
            if (match) {
                return match[1];
            }
        }
    }

    // Fallback: extract from file path
    const parts = filePath.split('/');
    const fileName = parts[parts.length - 1];

    // Remove .story.vue extension
    const baseName = fileName.replace('.story.vue', '');

    // Convert to PascalCase if needed
    if (baseName === 'default') {
        // For default.story.vue, look for a non-'stories' directory name
        for (let i = parts.length - 2; i >= 0; i--) {
            const dirName = parts[i];
            if (dirName !== 'stories' && dirName !== 'story' && !dirName.startsWith('.')) {
                return dirName;
            }
        }
        // Fallback to immediate parent
        return parts[parts.length - 2];
    }

    return baseName.charAt(0).toUpperCase() + baseName.slice(1);
}

/**
 * Extract story name from file path
 * @param {string} filePath - Path to the .story.vue file
 * @returns {string} Story name
 */
export function extractStoryName(filePath) {
    const parts = filePath.split('/');
    const fileName = parts[parts.length - 1];
    const baseName = fileName.replace('.story.vue', '');

    if (baseName === 'default') {
        return 'Default';
    }

    // Convert kebab-case or snake_case to Title Case
    return baseName
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Extract template content and convert to render function
 * @param {Object} template - Template descriptor from Vue SFC
 * @returns {string} Template content
 */
export function extractTemplate(template) {
    if (!template || !template.content) {
        return '';
    }

    return template.content.trim();
}

/**
 * Parse all story files in a directory
 * @param {string[]} filePaths - Array of .story.vue file paths
 * @returns {Object[]} Array of parsed story data
 */
export function parseStoryFiles(filePaths) {
    const stories = [];

    for (const filePath of filePaths) {
        try {
            const parsed = parseVueSFC(filePath);
            const metadata = extractMetadata(parsed.script);
            const componentName = extractComponentName(filePath, metadata);
            const storyName = extractStoryName(filePath);
            const template = extractTemplate(parsed.template);

            stories.push({
                filePath,
                componentName,
                storyName,
                metadata,
                template,
                isDefault: filePath.includes('default.story.vue')
            });
        } catch (error) {
            console.error(`Error parsing ${filePath}:`, error.message);
        }
    }

    return stories;
}