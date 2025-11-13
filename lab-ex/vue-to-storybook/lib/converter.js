/**
 * Convert parsed story data to Storybook CSF3 format
 */

/**
 * Convert Vue template to Storybook render function
 * @param {string} template - Vue template content
 * @param {string} componentName - Component name
 * @returns {string} Storybook render function
 */
export function convertTemplateToRender(template, componentName) {
    if (!template) {
        return '() => ({})';
    }

    // Clean up template
    const cleanTemplate = template
        .replace(/^\s*<template>\s*/i, '')
        .replace(/\s*<\/template>\s*$/i, '')
        .trim();

    // Create render function that returns the template
    return `(args) => ({
  components: { ${componentName} },
  setup() {
    return { args };
  },
  template: \`${cleanTemplate}\`,
})`;
}

/**
 * Extract args from template bindings
 * @param {string} template - Vue template content
 * @returns {Object} Args object
 */
export function extractArgsFromTemplate(template) {
    const args = {};

    if (!template) {
        return args;
    }

    // Extract v-bind or : bindings
    const bindingRegex = /(?:v-bind:|:)(\w+)="([^"]+)"/g;
    let match;
    while ((match = bindingRegex.exec(template)) !== null) {
        const [, propName, propValue] = match;

        // Try to infer type from value
        if (propValue === 'true' || propValue === 'false') {
            args[propName] = propValue === 'true';
        } else if (!isNaN(propValue)) {
            args[propName] = Number(propValue);
        } else if (propValue.startsWith('args.')) {
            // Reference to args, extract default
            args[propName] = propValue.replace('args.', '');
        } else {
            args[propName] = propValue;
        }
    }

    // Extract regular attributes
    const attrRegex = /\s(\w+)="([^"]+)"/g;
    while ((match = attrRegex.exec(template)) !== null) {
        const [, attrName, attrValue] = match;

        // Skip Vue directives
        if (attrName.startsWith('v-') || attrName.startsWith(':') || attrName.startsWith('@')) {
            continue;
        }

        if (!args[attrName]) {
            args[attrName] = attrValue;
        }
    }

    return args;
}

/**
 * Convert story metadata to Storybook meta
 * @param {Object} defaultStory - Default story data
 * @param {string} componentPath - Path to component file
 * @returns {Object} Storybook meta object
 */
export function convertToStorybookMeta(defaultStory, componentPath) {
    const meta = {
        title: defaultStory.componentName,
        component: 'Component',
        tags: ['autodocs']
    };

    // Extract additional meta from default story if available
    if (defaultStory.metadata.meta) {
        try {
            // Parse meta object string
            const metaStr = defaultStory.metadata.meta
                .replace(/^{/, '')
                .replace(/}$/, '')
                .trim();

            // Extract title if present
            const titleMatch = metaStr.match(/title:\s*['"]([^'"]+)['"]/);
            if (titleMatch) {
                meta.title = titleMatch[1];
            }

            // Extract tags if present
            const tagsMatch = metaStr.match(/tags:\s*\[([^\]]+)\]/);
            if (tagsMatch) {
                const tags = tagsMatch[1]
                    .split(',')
                    .map(t => t.trim().replace(/['"]/g, ''));
                meta.tags = tags;
            }
        } catch (error) {
            console.warn('Could not parse meta object:', error.message);
        }
    }

    return meta;
}

/**
 * Convert a single story to Storybook story object
 * @param {Object} story - Parsed story data
 * @param {string} componentName - Component name
 * @returns {Object} Storybook story object
 */
export function convertToStorybookStory(story, componentName) {
    const storyObj = {
        name: story.storyName,
        render: convertTemplateToRender(story.template, componentName),
        args: extractArgsFromTemplate(story.template)
    };

    return storyObj;
}

/**
 * Convert all stories to Storybook format
 * @param {Object[]} stories - Array of parsed story data
 * @param {string} componentPath - Path to component file
 * @returns {Object} Complete Storybook file data
 */
export function convertStoriesToStorybook(stories, componentPath) {
    // Find default story for meta
    const defaultStory = stories.find(s => s.isDefault) || stories[0];

    if (!defaultStory) {
        throw new Error('No stories found to convert');
    }

    const componentName = defaultStory.componentName;

    // Generate meta
    const meta = convertToStorybookMeta(defaultStory, componentPath);

    // Convert all non-default stories
    const convertedStories = stories
        .filter(s => !s.isDefault)
        .map(story => ({
            name: story.storyName,
            data: convertToStorybookStory(story, componentName)
        }));

    // If only default story exists, create a Default story
    if (convertedStories.length === 0 && defaultStory) {
        convertedStories.push({
            name: 'Default',
            data: convertToStorybookStory(defaultStory, componentName)
        });
    }

    return {
        meta,
        stories: convertedStories,
        componentName: componentName,
        imports: defaultStory.metadata.imports
    };
}

/**
 * Generate argTypes from template analysis
 * @param {string} template - Vue template content
 * @returns {Object} ArgTypes object
 */
export function generateArgTypes(template) {
    const argTypes = {};

    if (!template) {
        return argTypes;
    }

    // Extract props from template
    const bindingRegex = /(?:v-bind:|:)(\w+)="([^"]+)"/g;
    let match;
    while ((match = bindingRegex.exec(template)) !== null) {
        const [, propName, propValue] = match;

        // Infer control type
        if (propValue === 'true' || propValue === 'false') {
            argTypes[propName] = { control: 'boolean' };
        } else if (!isNaN(propValue)) {
            argTypes[propName] = { control: 'number' };
        } else if (propValue.includes('|')) {
            // Enum-like value
            const options = propValue.split('|').map(v => v.trim());
            argTypes[propName] = {
                control: 'select',
                options
            };
        } else {
            argTypes[propName] = { control: 'text' };
        }
    }

    return argTypes;
}