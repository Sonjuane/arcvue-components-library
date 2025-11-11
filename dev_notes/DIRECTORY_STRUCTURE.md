# Directory Structure Diagram

**Project:** Vue/Vite Web Component & Composable Library  
**Version:** 1.0.0  
**Created:** 2025-11-11  
**Structure Type:** Single Repository (Optimized for Readability)

## Complete Directory Tree

```
vue-web-components-v3/
│
├── 📁 dev_notes/                          # Project documentation
│   ├── 📄 PROJECT_REQUIREMENTS.md         # Comprehensive requirements doc
│   └── 📄 DIRECTORY_STRUCTURE.md          # This file
│
├── 📁 src/                                # Main source code
│   │
│   ├── 📁 components/                     # Vue Components
│   │   ├── 📁 Button/                     # Button component
│   │   │   ├── 🔵 Button.vue              # Main component file
│   │   │   ├── 📖 Button.story.vue        # Storybook story
│   │   │   ├── 📄 index.js                # Component exports
│   │   │   └── 📄 types.js                # JSDoc type definitions
│   │   │
│   │   ├── 📁 Card/                       # Card component
│   │   │   ├── 🔵 Card.vue
│   │   │   ├── 📖 Card.story.vue
│   │   │   ├── 📄 index.js
│   │   │   └── 📄 types.js
│   │   │
│   │   ├── 📁 Modal/                      # Modal component
│   │   │   ├── 🔵 Modal.vue
│   │   │   ├── 📖 Modal.story.vue
│   │   │   ├── 📄 index.js
│   │   │   └── 📄 types.js
│   │   │
│   │   └── 📁 [other-components]/         # Additional components...
│   │
│   ├── 📁 composables/                    # Vue Composables
│   │   ├── 📁 useDebounce/                # Debounce composable
│   │   │   ├── 📄 index.js                # Main composable logic
│   │   │   ├── 📖 useDebounce.story.vue   # Interactive story
│   │   │   └── 📄 types.js                # JSDoc type definitions
│   │   │
│   │   ├── 📁 useLocalStorage/            # LocalStorage composable
│   │   │   ├── 📄 index.js
│   │   │   ├── 📖 useLocalStorage.story.vue
│   │   │   └── 📄 types.js
│   │   │
│   │   ├── 📁 useApi/                     # API composable
│   │   │   ├── 📄 index.js
│   │   │   ├── 📖 useApi.story.vue
│   │   │   └── 📄 types.js
│   │   │
│   │   └── 📁 [other-composables]/        # Additional composables...
│   │
│   ├── 📁 styles/                         # Global Styles
│   │   ├── 🎨 variables.css               # CSS custom properties
│   │   ├── 🎨 base.css                    # Base/reset styles
│   │   └── 🎨 components.css              # Component-specific globals
│   │
│   ├── 📁 utils/                          # Utility Functions
│   │   ├── 📄 helpers.js                  # General helper functions
│   │   └── 📄 constants.js                # Application constants
│   │
│   └── 📄 index.js                        # 🚀 Main library entry point
│
├── 📁 server/                             # Development API Server
│   ├── 📁 routes/                         # API route handlers
│   │   ├── 📄 api.js                      # Main API routes
│   │   └── 📄 mock.js                     # Mock data endpoints
│   │
│   ├── 📁 middleware/                     # Express middleware
│   │   ├── 📄 cors.js                     # CORS configuration
│   │   └── 📄 auth.js                     # Authentication mock
│   │
│   ├── 📁 models/                         # Data models
│   │   └── 📄 data.js                     # In-memory data store
│   │
│   ├── 📁 utils/                          # Server utilities
│   │   └── 📄 helpers.js                  # Server helper functions
│   │
│   └── 📄 server.js                       # 🖥️ Express server entry
│
├── 📁 .storybook/                         # Storybook Configuration
│   ├── 📄 main.js                         # Main Storybook config
│   ├── 📄 preview.js                      # Global story settings
│   └── 📄 manager.js                      # Storybook UI customization
│
├── 📁 dist/                               # 📦 Build Outputs (Generated)
│   ├── 📄 index.js                        # Main library bundle
│   ├── 🎨 index.css                       # Compiled styles
│   │
│   ├── 📁 custom-elements/                # Individual Custom Elements
│   │   ├── 📄 button.js                   # Button as Custom Element
│   │   ├── 📄 card.js                     # Card as Custom Element
│   │   ├── 📄 modal.js                    # Modal as Custom Element
│   │   └── 📄 [other-components].js       # Other CE builds
│   │
│   └── 📁 types/                          # JSDoc Type Definitions
│       ├── 📄 components.d.js             # Component type exports
│       └── 📄 composables.d.js            # Composable type exports
│
├── 📁 scripts/                            # Build & Utility Scripts
│   ├── 📄 build.js                        # Main build script
│   ├── 📄 build-custom-elements.js        # Custom Elements builder
│   ├── 📄 generate-exports.js             # Auto-generate exports
│   └── 📄 dev-setup.js                    # Development setup
│
├── 📁 public/                             # Static Assets
│   └── 🖼️ favicon.ico                     # Favicon
│
├── 📄 package.json                        # 📋 Package configuration
├── 📄 vite.config.js                      # ⚡ Vite configuration
├── 📄 jsconfig.json                       # 🔧 JavaScript config for IDE
├── 📄 .eslintrc.js                        # 📏 ESLint rules
├── 📄 .prettierrc                         # 💅 Code formatting rules
├── 📄 .gitignore                          # 🚫 Git ignore patterns
└── 📄 README.md                           # 📚 Project documentation
```

## Directory Explanations

### 📁 `/src` - Main Source Code
The heart of the library containing all components, composables, and core functionality.

#### 📁 `/src/components` - Vue Components
- Each component gets its own directory
- **Component.vue**: Main Vue SFC file
- **Component.story.vue**: Storybook story for documentation/testing
- **index.js**: Exports and component registration
- **types.js**: JSDoc type definitions for props, events, slots

#### 📁 `/src/composables` - Vue Composables
- Each composable gets its own directory
- **index.js**: Main composable logic with Vue 3 Composition API
- **useComposable.story.vue**: Interactive story showing usage
- **types.js**: JSDoc type definitions for parameters and return values

#### 📁 `/src/styles` - Global Styles
- **variables.css**: CSS custom properties for theming
- **base.css**: Reset/normalize styles
- **components.css**: Global component styles (minimal)

### 📁 `/server` - Development API Server
Full-featured Express.js server for component development and testing.

- **Routes**: API endpoints for components that need external data
- **Middleware**: CORS, authentication mocks, logging
- **Models**: In-memory data simulation
- **Utils**: Server-side helper functions

### 📁 `/.storybook` - Documentation & Development
Storybook configuration for interactive component documentation.

- **main.js**: Core Storybook configuration, story discovery
- **preview.js**: Global decorators, parameters, and theming
- **manager.js**: Storybook UI customization

### 📁 `/dist` - Build Outputs
Generated build artifacts (not committed to git).

- **index.js**: Main library bundle (ES modules)
- **index.css**: Compiled and optimized styles
- **custom-elements/**: Individual Custom Element builds for vanilla JS
- **types/**: Generated JSDoc type definitions

### 📁 `/scripts` - Automation
Build and development automation scripts.

- **build.js**: Main library build process
- **build-custom-elements.js**: Generates individual CE builds
- **generate-exports.js**: Auto-generates export statements
- **dev-setup.js**: Development environment setup

## File Naming Conventions

### Components
- **PascalCase**: `Button.vue`, `DataTable.vue`
- **Stories**: `ComponentName.story.vue`
- **Exports**: `index.js` (consistent across all directories)
- **Types**: `types.js` (JSDoc definitions)

### Composables
- **camelCase with 'use' prefix**: `useDebounce`, `useLocalStorage`
- **Stories**: `useComposableName.story.vue`
- **Exports**: `index.js`
- **Types**: `types.js`

### Styles
- **kebab-case**: `variables.css`, `base.css`
- **Scoped**: Component styles use `<style scoped>`
- **Global**: Minimal global styles in `/src/styles`

## Import Patterns

### Library Usage
```javascript
// Named imports from main package
import { Button, Card, useDebounce, useApi } from '@arcvue/vue-components'

// Selective imports (tree-shakable)
import { Button } from '@arcvue/vue-components'
```

### Custom Elements Usage
```html
<!-- Individual Custom Element builds -->
<script src="./dist/custom-elements/button.js"></script>
<arc-button variant="primary">Click me</arc-button>
```

### Development Imports
```javascript
// Direct imports during development
import Button from './src/components/Button/Button.vue'
import { useDebounce } from './src/composables/useDebounce'
```

## Build Targets

### Main Library Build
- **ES Modules**: Modern bundler support
- **Tree Shakable**: Individual component/composable imports
- **Styled**: CSS included in build

### Custom Elements Build
- **Individual Files**: Each component as standalone CE
- **Vanilla JS**: No Vue runtime dependency
- **Shadow DOM**: Encapsulated styling

### Development Build
- **Hot Reload**: Fast development with Vite HMR
- **Source Maps**: Full debugging support
- **API Server**: Integrated development server

## Story File Discovery

Storybook automatically discovers `.story.vue` files using this pattern:
```javascript
// In .storybook/main.js
stories: [
  '../src/**/*.story.vue'
]
```

This recursively finds all story files in:
- `/src/components/**/*.story.vue`
- `/src/composables/**/*.story.vue`

## Optimization Features

### Bundle Size
- **Tree Shaking**: Unused code elimination
- **Code Splitting**: Lazy loading support
- **CSS Optimization**: PostCSS with autoprefixer

### Development Experience
- **Fast Refresh**: Vue 3 HMR support
- **Type Hints**: JSDoc integration with IDE
- **Linting**: ESLint + Prettier integration

### Production Ready
- **Minification**: Optimized production builds
- **Source Maps**: Optional for debugging
- **Browser Support**: Modern browsers (ES2020+)

---

*This structure prioritizes simplicity, readability, and maintainability while supporting all required features.*