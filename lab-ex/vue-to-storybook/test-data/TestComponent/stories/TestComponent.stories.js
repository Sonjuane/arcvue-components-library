/**
 * Storybook stories for TestComponent
 * Auto-generated from .story.vue files
 */

import TestComponent from '../TestComponent.vue';

export default {
  title: "Test/TestComponent",
  component: "TestComponent",
  tags: [
    "autodocs"
  ]
};

export const Primary = {
  render: (args) => ({
  components: { TestComponent },
  setup() {
    return { args };
  },
  template: `<TestComponent :variant="primary" label="Primary Button" />`,
}),
  args:   {
      "variant": "primary",
      "label": "Primary Button"
  },
};
