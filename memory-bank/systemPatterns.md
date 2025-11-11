# System Patterns

This file documents recurring patterns and standards used in the project.
It is optional, but recommended to be updated as the project evolves.
2025-11-11 19:03:00 - Initial patterns established for Vue/Vite component library.

## Coding Patterns

- **Component Structure**: Each component in its own directory with Component.vue, index.js, and types.js
- **JSDoc Documentation**: Comprehensive type annotations for all public APIs
- **CSS Variables**: Design system using --arc-* prefixed custom properties
- **Scoped Styles**: Component styles use <style scoped> to prevent global pollution
- **Named Exports**: Both default and named exports for flexibility

## Architectural Patterns

- **Single Entry Point**: src/index.js exports all components and composables
- **Path Aliases**: @components, @composables, @styles for clean imports
- **Composition API**: Vue 3 composition API for all reactive logic
- **Plugin Pattern**: Optional Vue.use() installation with install function
- **Tree Shaking**: Individual exports for optimal bundle sizes

## Testing Patterns

- **Story-Driven Development**: .story.vue files for each component/composable
- **JSDoc Validation**: Automated documentation validation scripts
- **Build Verification**: Multiple output format testing (ES, CJS, UMD, CE)
- **Custom Elements Testing**: Vanilla HTML integration validation