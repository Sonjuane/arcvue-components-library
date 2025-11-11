# Vue/Vite Web Component & Composable Library - Project Requirements

**Version:** 1.1.0
**Created:** 2025-11-11
**Updated:** 2025-11-11
**Project Codename:** ArcVue Library

## Overview

A comprehensive Vue 3/Vite-based web component and composable library featuring a single, simple repository structure optimized for readability. Includes Storybook integration, Custom Elements builds, and a development API server. **Built entirely with vanilla JavaScript for simplicity and broad compatibility.**

## Core Requirements

### 1. Library Architecture

#### Single Package Structure
- **@arcvue/vue-components**: Combined Vue component and composable library
- **Simple Structure**: Single package with clear organization
- **Named Imports**: Support `import { ComponentName, useComposable } from '@arcvue/vue-components'`

#### Build Targets
- **ES Modules**: Modern bundler support
- **CommonJS**: Node.js compatibility
- **UMD**: Browser script tag support
- **Custom Elements**: Individual component builds for vanilla JS
- **JSDoc Types**: Type hints via JSDoc comments

### 2. Development Environment

#### Storybook Integration
- **Framework**: Storybook for Vue 3
- **Story Files**: `.story.vue` format using Vue SFC structure
- **Recursive Discovery**: Auto-detect stories in component/composable directories
- **Hot Reload**: Development server with live updates
- **Build Exclusion**: Stories excluded from production builds

#### Development API Server
- **Location**: `server/` directory
- **Features**:
  - REST API endpoints
  - WebSocket support
  - Authentication/authorization mock
  - In-memory database simulation
  - File upload handling
  - External API proxying
- **Framework**: Express.js with vanilla JavaScript
- **CORS**: Configured for local development

### 3. Component System

#### Component Structure
```
src/components/
├── ComponentName/
│   ├── ComponentName.vue
│   ├── ComponentName.story.vue
│   ├── index.js
│   └── types.js (JSDoc definitions)
```

#### Styling Requirements
- **Scoped Styles**: Component styles don't affect documentation
- **CSS Variables**: Theme-able design system
- **PostCSS**: Modern CSS processing
- **Style Isolation**: No global style pollution

#### Story File Format
```vue
<template>
  <!-- Story examples and variants -->
</template>

<script setup>
// Story logic and controls
</script>

<style scoped>
/* Story-specific styling */
</style>
```

### 4. Composable System

#### Composable Structure
```
src/composables/
├── useComposableName/
│   ├── index.js
│   ├── useComposableName.story.vue
│   ├── types.js (JSDoc definitions)
│   └── utils.js (optional)
```

#### Composable Requirements
- **JavaScript**: ES2020+ with JSDoc type annotations
- **Reactive**: Vue 3 reactivity system
- **Tree Shakable**: Individual function imports
- **Documentation**: Comprehensive JSDoc comments
- **Testing**: Unit test coverage

### 5. Build System

#### Vite Configuration
- **Multi-Entry**: Separate builds for components/composables
- **Code Splitting**: Optimized bundle sizes
- **Asset Handling**: Images, fonts, CSS processing
- **Development**: Fast HMR and dev server

#### Custom Elements Build
- **Individual Builds**: Each component as standalone Custom Element
- **Vanilla JS**: No Vue runtime dependency in output
- **Shadow DOM**: Encapsulated styling
- **Build Script**: Automated generation for all components

### 6. JavaScript Configuration

#### Modern JavaScript Setup
- **ES2020+**: Modern JavaScript features
- **Path Mapping**: Alias support for imports via Vite
- **JSDoc**: Type annotations and documentation
- **Vue SFC**: Template and script validation

#### Type Documentation
- **Component Props**: JSDoc prop definitions
- **Composable Returns**: Documented return values
- **Event Types**: JSDoc event definitions
- **Utility Types**: Shared JSDoc type definitions

## Technical Specifications

### Package Manager
- **Primary**: pnpm (performance and workspace support)
- **Lock File**: pnpm-lock.yaml
- **Workspace**: pnpm workspace configuration

### Dependencies

#### Core Dependencies
- Vue 3.x (latest stable)
- Vite 5.x
- @vitejs/plugin-vue

#### Development Dependencies
- Storybook 7.x for Vue 3
- @storybook/vue3-vite
- Express.js (vanilla JavaScript)
- PostCSS + Autoprefixer
- ESLint + Prettier
- Vitest (testing framework)

### Browser Support
- **Modern Browsers**: ES2020+ support (no transpilation needed)
- **Custom Elements**: Browsers with Custom Elements v1
- **Fallbacks**: Polyfills for older browsers (optional)
- **IE Support**: Not supported (modern browsers only)

## Directory Structure

```
vue-web-components-v3/
├── dev_notes/                    # Project documentation
│   ├── PROJECT_REQUIREMENTS.md
│   └── DIRECTORY_STRUCTURE.md
├── src/
│   ├── components/               # Vue components
│   │   ├── Button/
│   │   │   ├── Button.vue
│   │   │   ├── Button.story.vue
│   │   │   ├── index.js
│   │   │   └── types.js
│   │   ├── Card/
│   │   │   ├── Card.vue
│   │   │   ├── Card.story.vue
│   │   │   ├── index.js
│   │   │   └── types.js
│   │   └── [other components]/
│   ├── composables/              # Vue composables
│   │   ├── useDebounce/
│   │   │   ├── index.js
│   │   │   ├── useDebounce.story.vue
│   │   │   └── types.js
│   │   ├── useLocalStorage/
│   │   │   ├── index.js
│   │   │   ├── useLocalStorage.story.vue
│   │   │   └── types.js
│   │   └── [other composables]/
│   ├── styles/                   # Global styles
│   │   ├── variables.css
│   │   ├── base.css
│   │   └── components.css
│   ├── utils/                    # Utility functions
│   │   ├── helpers.js
│   │   └── constants.js
│   └── index.js                  # Main entry point
├── server/                       # Development API server
│   ├── routes/
│   │   ├── api.js
│   │   └── mock.js
│   ├── middleware/
│   │   ├── cors.js
│   │   └── auth.js
│   ├── models/
│   │   └── data.js
│   ├── utils/
│   │   └── helpers.js
│   └── server.js
├── .storybook/                   # Storybook configuration
│   ├── main.js
│   ├── preview.js
│   └── manager.js
├── dist/                         # Build outputs
│   ├── index.js                  # Main library build
│   ├── index.css                 # Compiled styles
│   ├── custom-elements/          # Individual CE builds
│   │   ├── button.js
│   │   ├── card.js
│   │   └── [other components].js
│   └── types/                    # JSDoc type definitions
├── scripts/                      # Build and utility scripts
│   ├── build.js
│   ├── build-custom-elements.js
│   ├── generate-exports.js
│   └── dev-setup.js
├── public/                       # Static assets
│   └── favicon.ico
├── package.json                  # Package configuration
├── vite.config.js               # Vite configuration
├── jsconfig.json                # JavaScript config for IDE support
├── .eslintrc.js                 # ESLint configuration
├── .prettierrc                  # Prettier configuration
├── .gitignore
└── README.md
```

## Development Workflow

### Setup Process
1. **Install Dependencies**: `pnpm install`
2. **Start Development**: `pnpm dev` (starts both API server and Storybook)
3. **Development**: Create components/composables with stories

### Build Process
1. **Library Build**: `pnpm build` (single library with components + composables)
2. **Custom Elements**: `pnpm build:custom-elements`
3. **JSDoc Validation**: `pnpm validate-docs`
4. **Linting**: `pnpm lint`

### Testing Strategy
- **Unit Tests**: Vitest for composables
- **Component Tests**: Vue Test Utils + Vitest
- **E2E Tests**: Playwright (optional)
- **Visual Tests**: Storybook visual regression

## Usage Examples

### Component and Composable Import
```javascript
import { Button, Card, Modal, useDebounce, useLocalStorage, useApi } from '@arcvue/vue-components'
```

### Selective Import
```javascript
import { Button } from '@arcvue/vue-components'
import { useDebounce } from '@arcvue/vue-components'
```

### Custom Elements
```html
<script src="./dist/custom-elements/button.js"></script>
<arc-button variant="primary">Click me</arc-button>
```

## Quality Standards

### Code Quality
- **JavaScript**: ES2020+ with JSDoc type annotations
- **ESLint**: Vue 3 + JavaScript rules
- **Prettier**: Consistent formatting
- **Husky**: Pre-commit hooks

### Documentation
- **JSDoc**: All public APIs documented
- **README**: Usage examples and API docs
- **Storybook**: Interactive component documentation
- **Changelog**: Version history tracking

### Performance
- **Tree Shaking**: Dead code elimination
- **Bundle Analysis**: Size monitoring
- **Lazy Loading**: Component code splitting
- **Caching**: Build output optimization

## Success Criteria

### Functional Requirements
- [ ] Components render correctly in Vue applications
- [ ] Composables work in Vue 3 composition API
- [ ] Custom Elements function in vanilla HTML
- [ ] Named imports work from single package
- [ ] Storybook displays all components/composables
- [ ] API server supports component development
- [ ] Build outputs are optimized and typed

### Non-Functional Requirements
- [ ] Fast development server startup (<3s)
- [ ] Small bundle sizes (<50kb gzipped per package)
- [ ] Comprehensive TypeScript support
- [ ] Cross-browser compatibility
- [ ] Maintainable code architecture
- [ ] Clear documentation and examples

## Risk Mitigation

### Technical Risks
- **Build Complexity**: Incremental implementation and testing
- **Storybook Integration**: Use official Vue 3 addon
- **Custom Elements**: Leverage Vue's built-in CE support
- **Workspace Management**: Follow pnpm best practices

### Maintenance Risks
- **Dependency Updates**: Automated dependency management
- **Breaking Changes**: Semantic versioning and migration guides
- **Documentation Drift**: Automated doc generation where possible
- **Testing Coverage**: Comprehensive test suite

## Future Enhancements

### Phase 2 Features
- **Theme System**: Advanced theming capabilities
- **Icon Library**: Integrated icon component system
- **Animation Library**: Reusable animation composables
- **Form Validation**: Comprehensive form handling
- **Accessibility**: Enhanced a11y features

### Tooling Improvements
- **CLI Tool**: Component/composable generators
- **VS Code Extension**: Enhanced development experience
- **Playground**: Online component playground
- **Design Tokens**: Design system integration

---

*This document serves as the single source of truth for project requirements and will be updated as the project evolves.*