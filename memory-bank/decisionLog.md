# Decision Log

This file records architectural and implementation decisions using a list format.
2025-11-11 19:02:00 - Memory Bank initialized for decision tracking.

## Decision

Single Repository Structure over Monorepo

## Rationale 

User specifically requested "Do not setup as Monorepo if possible. Make it a single simple repo which is optimized for readability" - prioritizing simplicity and maintainability over complex workspace management.

## Implementation Details

- Single package.json at root level
- All source code in /src directory
- Components and composables in same package (@arcvue/vue-components)
- Simplified build process with single Vite configuration

---

## Decision

Vanilla JavaScript over TypeScript

## Rationale

User clarified "In the initial prompt it says you'll be using Vanilla js only there will be no use of typescript" - ensuring broad compatibility and reducing build complexity.

## Implementation Details

- ES2020+ JavaScript with modern features
- JSDoc for type annotations and documentation
- jsconfig.json for IDE support and path mapping
- No TypeScript compilation step required

---

## Decision

Latest npm Package Versions

## Rationale

User feedback: "Make sure to use the latest npm packages so it's not outdated" - ensuring modern tooling and security updates.

## Implementation Details

- Storybook 8.3.0 (latest major version)
- Vue 3.5.0 (latest stable)
- Vite 5.4.0 (latest stable)
- All dev dependencies updated to current versions

---

## Decision

ES Module Configuration Fixes

## Rationale

User reported that `pnpm install` doesn't work and `pnpm storybook` fails. Root cause identified as ES module syntax issues in configuration files when package.json has `"type": "module"`.

## Implementation Details

- Fixed vite.config.js to use `fileURLToPath(new URL())` instead of `__dirname`
- Updated .storybook/main.js to use proper ES module imports
- Replaced `require('autoprefixer')` with `import autoprefixer`
- Added proper .gitignore file for development workflow
