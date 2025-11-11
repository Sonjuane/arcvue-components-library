# Web Component / Composables library

## Intial Prompt

I would like to create a vue/vite web component and composable library. Which will have optional build targets.
It will be built in a very simple and pragmatic way and will avoid using overcomplicated code at all costs.

## Requirements

Built using vanilla js.
The documenation style should not be affected by the add styling of any component

**Dev Environment / Documentation / Demos**

- It would use https://storybook.js.org to create the demos and documentation.
- Storybook will be used to vue components or composables during development
- It should recursively look through the component and composable directories for a .story.vue
- Although the .story.vue file for each component will exists in the component directory it should not be included during the production build process
- Basic story stucture example: (so it resembles a vue component)

```js
  <template>
    <Button :color="color">{{ label }}</Button>
  </template>

  <script setup>
  import Button from '../src/components/Button.vue'
  import { ref } from 'vue'

  const color = ref('primary')
  const label = ref('Vue SFC Story')
  </script>

  <style scoped>
  /* optional styles */
  </style>
```

- Component styling would be scoped to each component
- A server/ directory which would run the server incase any of the components are dependent on an external api

**Dev API Server**
It will have a server/ directory at the root which will be used in case any of the components require an api service

**Folder Structure**
The folder structure should be something like this:

- root
  - server
    - routes/
    - index.js
  - src
    - components
      - MyComponent/
        - myComponent.vue
        - myComponent.story.vue
      - MyComponent2/
        - myComponent2.vue
        - myComponent2.story.vue
    - composables
      - MyComposable/
        - myComposable.js
        - myComposable.story.vue
  - App.vue

**Build Options:**

- Composables should be create so each can be used in a named import example: `import { debounce } from '@arcvue/composables'`
- Components can be be bundled in a way so it can be used with a named import example: `import { debounce } from '@arcvue/components'`
- An interface that would allow the build of either single or multiple components as Custom Elements
  - Would build out as single or mutiple files in the dist directory then can be included in any web project.

Please create a simple Project Requirement Document as a markdown file and put in /dev_notes directory
Please ask any questions for anything that is unclear or needs more clarification.
Please include a directory structure diagram.

# Enhanced Version

Create a comprehensive Vue/Vite web component and composable library with vanilla JavaScript implementation, featuring optional build targets and pragmatic architecture. The library must support Storybook integration for development and documentation, with recursive discovery of .story.vue files in component and composable directories. Implement scoped component styling that doesn't affect documentation presentation. Include a development API server in the server/ directory for components requiring external services. Structure the project with components in individual directories containing both .vue and .story.vue files, composables with corresponding story files, and ensure .story.vue files are excluded from production builds. Support named imports for both composables and components (e.g., import { debounce } from '@arcvue/composables'), and provide Custom Elements build interface for single or multiple component distribution. The story files should follow Vue SFC structure with template, script setup, and optional scoped styles. Generate a Project Requirements Document in markdown format within a /dev_notes directory, include a complete directory structure diagram, maintain simplicity and avoid overcomplicated code patterns, and clarify any ambiguous requirements through targeted questions.



