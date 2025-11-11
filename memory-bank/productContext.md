# Product Context

This file provides a high-level overview of the project and the expected product that will be created. Initially it is based upon projectBrief.md (if provided) and all other available project-related information in the working directory. This file is intended to be updated as the project evolves, and should be used to inform all other modes of the project's goals and context.
2025-11-11 19:02:00 - Initial Memory Bank creation for Vue/Vite web component library project.

## Project Goal

Create a comprehensive Vue 3/Vite-based web component and composable library featuring:
- Single repository structure optimized for readability
- Vanilla JavaScript with JSDoc type annotations (no TypeScript)
- @arcvue/vue-components package for both components and composables
- Storybook integration with .story.vue files
- Custom Elements builds for vanilla JS usage
- Development API server for component testing
- One-day build timeline with phased approach

## Key Features

- **Single Package**: @arcvue/vue-components combining components and composables
- **Vanilla JavaScript**: ES2020+ with comprehensive JSDoc documentation
- **Storybook Integration**: .story.vue files with recursive discovery
- **Custom Elements**: Individual component builds for vanilla HTML usage
- **Development Server**: Express.js API server for component development
- **Build System**: Vite with multiple output targets
- **Pragmatic Architecture**: Simple, maintainable code patterns

## Overall Architecture

- **Source Structure**: /src with components/, composables/, styles/, utils/
- **Build Targets**: ES modules, CommonJS, UMD, Custom Elements
- **Documentation**: Storybook + JSDoc + comprehensive README
- **Development**: Hot reload, API server, story-driven development
- **Distribution**: npm package with tree-shakable exports