/**
 * Generate Storybook .stories.js file content
 */

/**
 * Generate import statements
 * @param {string} componentName - Component name
 * @param {string} componentPath - Path to component file
 * @returns {string} Import statements
 */
export function generateImports(componentName, componentPath) {
    return `import ${componentName} from '${componentPath}';`;
}

/**
 * Generate meta export
 * @param {Object} meta - Meta object
 * @param {string} componentName - Component name
 * @returns {string} Meta export code
 */
export function generateMeta(meta, componentName) {
    const metaObj = {
        title: meta.title || componentName,
        component: componentName,
        tags: meta.tags || ['autodocs']
    };

    return `export default ${JSON.stringify(metaObj, null, 2).replace(/"([^"]+)":/g, '$1:')};`;
}

/**
 * Generate a single story export
 * @param {string} storyName - Story name
 * @param {Object} storyData - Story data
 * @returns {string} Story export code
 */
export function generateStory(storyName, storyData) {
    const varName = storyName.replace(/\s+/g, '');

    let code = `export const ${varName} = {\n`;

    // Add render function
    if (storyData.render) {
        code += `  render: ${storyData.render},\n`;
    }

    // Add args
    if (storyData.args && Object.keys(storyData.args).length > 0) {
        code += `  args: ${JSON.stringify(storyData.args, null, 4).replace(/^/gm, '  ')},\n`;
    }

    code += `};\n`;

    return code;
}

/**
 * Generate complete Storybook file content
 * @param {Object} storybookData - Converted Storybook data
 * @param {string} componentPath - Path to component file
 * @returns {string} Complete file content
 */
export function generateStorybookFile(storybookData, componentPath) {
    const { meta, stories, componentName } = storybookData;

    let content = '';

    // Add file header comment
    content += `/**\n`;
    content += ` * Storybook stories for ${componentName}\n`;
    content += ` * Auto-generated from .story.vue files\n`;
    content += ` */\n\n`;

    // Add imports
    content += generateImports(componentName, componentPath) + '\n\n';

    // Add meta
    content += generateMeta(meta, componentName) + '\n\n';

    // Add stories
    for (const story of stories) {
        content += generateStory(story.name, story.data) + '\n';
    }

    return content;
}

/**
 * Format JavaScript code (basic formatting)
 * @param {string} code - JavaScript code
 * @returns {string} Formatted code
 */
export function formatCode(code) {
    // Basic formatting - replace with prettier if needed
    return code
        .replace(/\n{3,}/g, '\n\n') // Remove excessive newlines
        .trim() + '\n';
}

/**
 * Generate output file path
 * @param {string} componentDir - Component directory path
 * @param {string} componentName - Component name
 * @returns {string} Output file path
 */
export function generateOutputPath(componentDir, componentName) {
    return `${componentDir}/${componentName}.stories.js`;
}

/**
 * Generate complete Storybook file with formatting
 * @param {Object} storybookData - Converted Storybook data
 * @param {string} componentPath - Path to component file
 * @returns {string} Formatted file content
 */
export function generateFormattedStorybookFile(storybookData, componentPath) {
    const content = generateStorybookFile(storybookData, componentPath);
    return formatCode(content);
}