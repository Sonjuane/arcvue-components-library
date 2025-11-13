# Vue to Storybook Converter

Convert `.story.vue` files to Storybook `.stories.js` format (CSF3).

## Overview

This tool automates the conversion of Vue Single File Component (SFC) story files to Storybook's Component Story Format 3 (CSF3). It recursively scans directories for `.story.vue` files, parses them using `@vue/compiler-sfc`, and generates corresponding `.stories.js` files.

## Installation

```bash
cd lab-ex/vue-to-storybook
npm install
```

## Usage

### Basic Usage

```bash
node convert-stories.js <directory-path>

# Example
node convert-stories.js stories/
```

### Examples

Convert stories in a specific component directory:

```bash
node convert-stories.js ../../src/components/Button
```

Convert all stories in the components directory:

```bash
node convert-stories.js ../../src/components
```

Use absolute path:

```bash
node convert-stories.js /absolute/path/to/components
```

## File Structure

The converter expects the following structure:

```
ComponentDirectory/
├── Component.vue          # Main component file
├── default.story.vue      # Default story (provides meta)
├── variant1.story.vue     # Additional story variant
└── variant2.story.vue     # Additional story variant
```

### Input: `.story.vue` Files

**default.story.vue** (provides metadata):

```vue
<script>
export default {
  meta: {
    title: 'Components/Button',
    tags: ['autodocs'],
  },
};
</script>

<template>
  <Button label="Click me" />
</template>
```

**primary.story.vue** (story variant):

```vue
<template>
  <Button variant="primary" label="Primary Button" />
</template>
```

### Output: `.stories.js` File

**Button.stories.js**:

```javascript
/**
 * Storybook stories for Button
 * Auto-generated from .story.vue files
 */

import Button from './Button.vue';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export const Default = {
  render: (args) => ({
    components: { Button: Component },
    setup() {
      return { args };
    },
    template: `<Button label="Click me" />`,
  }),
  args: {
    label: 'Click me',
  },
};

export const Primary = {
  render: (args) => ({
    components: { Button: Component },
    setup() {
      return { args };
    },
    template: `<Button variant="primary" label="Primary Button" />`,
  }),
  args: {
    variant: 'primary',
    label: 'Primary Button',
  },
};
```

## Features

- **Recursive Directory Scanning**: Finds all `.story.vue` files in nested directories
- **Automatic Grouping**: Groups stories by component directory
- **Meta Extraction**: Uses `default.story.vue` for Storybook meta configuration
- **Template Parsing**: Converts Vue templates to Storybook render functions
- **Args Extraction**: Automatically extracts args from template bindings
- **Error Handling**: Comprehensive error reporting and validation
- **Progress Logging**: Detailed console output during conversion

## Architecture

### Core Modules

1. **parser.js** - Vue SFC parsing utilities
   - Parse `.story.vue` files using `@vue/compiler-sfc`
   - Extract script, template, and metadata
   - Handle component and story naming

2. **converter.js** - Conversion logic
   - Convert Vue templates to Storybook render functions
   - Extract args from template bindings
   - Generate Storybook meta and story objects

3. **generator.js** - File generation
   - Generate formatted `.stories.js` content
   - Create import statements and exports
   - Format output code

4. **convert-stories.js** - Main CLI script
   - Handle command-line arguments
   - Orchestrate conversion process
   - Provide user feedback and error handling

## Conversion Rules

### Story Naming

- `default.story.vue` → `Default` story (provides meta)
- `primary.story.vue` → `Primary` story
- `large-button.story.vue` → `Large Button` story

### Component Detection

The converter looks for component files in this order:

1. `ComponentName.vue`
2. `ComponentName.js`
3. `ComponentName.ts`

### Args Extraction

Args are automatically extracted from template bindings:

```vue
<!-- Input -->
<Button :variant="primary" :size="large" label="Click" />

<!-- Generated Args -->
{ variant: "primary", size: "large", label: "Click" }
```

## Limitations

- Only supports Vue 3 SFC format
- Template must be valid Vue template syntax
- Complex JavaScript expressions in templates may not convert perfectly
- Scoped styles are not transferred to Storybook stories

## Error Handling

The converter provides detailed error messages:

- **Parse Errors**: Issues parsing Vue SFC files
- **Missing Files**: Component files not found
- **Invalid Syntax**: Template or script syntax errors
- **Write Errors**: File system permission issues

## Output

The converter provides a summary after completion:

```
📊 Conversion Summary:
   ✅ Success: 3
   ❌ Failed: 0
   📁 Total: 3
```

## Development

### Project Structure

```
lab-ex/vue-to-storybook/
├── package.json           # Dependencies and scripts
├── convert-stories.js     # Main CLI script
├── lib/
│   ├── parser.js         # Vue SFC parsing
│   ├── converter.js      # Conversion logic
│   └── generator.js      # File generation
└── README.md             # This file
```

### Dependencies

- `@vue/compiler-sfc` - Vue Single File Component compiler

## License

MIT
