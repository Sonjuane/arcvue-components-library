# @arcvue/vue-components

Vue 3 component library with Custom Elements support. Build once, use everywhere - in Vue apps or vanilla JavaScript.

## Install

```bash
npm install @arcvue/vue-components
```

## Quick Start

### Vue 3 Usage

```javascript
import { Button, Card, Modal } from '@arcvue/vue-components';
import '@arcvue/vue-components/dist/style.css';

// Use in your Vue components
```

### Custom Elements (Vanilla JS)

```html
<script type="module">
  import { registerComponents } from '@arcvue/vue-components/custom-elements';
  registerComponents();
</script>

<arc-button variant="primary">Click Me</arc-button>
<arc-card title="Card Title">Card content</arc-card>
```

## Components

### Button
Interactive button with multiple variants and states.

**Props:**
- `variant`: `'primary' | 'secondary' | 'success' | 'danger'` (default: `'primary'`)
- `size`: `'small' | 'medium' | 'large'` (default: `'medium'`)
- `disabled`: `boolean` (default: `false`)
- `loading`: `boolean` (default: `false`)

**Events:**
- `click`: Emitted on button click

**Example:**
```vue
<Button variant="primary" size="large" @click="handleClick">
  Submit
</Button>
```

### Card
Flexible container with header, body, and footer slots.

**Props:**
- `title`: `string` - Card title
- `variant`: `'default' | 'bordered' | 'elevated' | 'flat'` (default: `'default'`)
- `padding`: `'none' | 'small' | 'medium' | 'large'` (default: `'medium'`)
- `clickable`: `boolean` (default: `false`)

**Slots:**
- `header`: Custom header content
- `default`: Card body content
- `footer`: Footer content

**Events:**
- `click`: Emitted when clickable card is clicked

**Example:**
```vue
<Card title="User Profile" variant="elevated" clickable @click="viewProfile">
  <p>User information goes here</p>
  <template #footer>
    <Button>View Details</Button>
  </template>
</Card>
```

### Modal
Accessible modal dialog with focus management.

**Props:**
- `modelValue`: `boolean` - Controls modal visibility
- `title`: `string` - Modal title
- `size`: `'small' | 'medium' | 'large' | 'fullscreen'` (default: `'medium'`)
- `closeOnEscape`: `boolean` (default: `true`)
- `closeOnBackdrop`: `boolean` (default: `true`)
- `showClose`: `boolean` (default: `true`)
- `persistent`: `boolean` (default: `false`)
- `scrollable`: `boolean` (default: `false`)
- `centered`: `boolean` (default: `false`)

**Slots:**
- `header`: Custom header content
- `default`: Modal body content
- `footer`: Footer actions

**Events:**
- `update:modelValue`: Emitted when modal visibility changes
- `open`: Emitted when modal opens
- `close`: Emitted when modal closes

**Example:**
```vue
<Modal v-model="showModal" title="Confirm Action" size="small">
  <p>Are you sure you want to proceed?</p>
  <template #footer>
    <Button @click="showModal = false">Cancel</Button>
    <Button variant="primary" @click="confirm">Confirm</Button>
  </template>
</Modal>
```

## Composables

### useDebounce
Debounce reactive values with configurable delay.

**Parameters:**
- `value`: `Ref<T>` - Reactive value to debounce
- `delay`: `number` (default: `300`) - Debounce delay in ms

**Returns:**
- `debouncedValue`: `Ref<T>` - Debounced reactive value

**Example:**
```javascript
import { ref } from 'vue';
import { useDebounce } from '@arcvue/vue-components';

const searchQuery = ref('');
const debouncedQuery = useDebounce(searchQuery, 500);

watch(debouncedQuery, (value) => {
  // API call with debounced value
});
```

### useLocalStorage
Reactive localStorage with JSON serialization and cross-tab sync.

**Parameters:**
- `key`: `string` - localStorage key
- `defaultValue`: `T` - Default value if key doesn't exist

**Returns:**
- `value`: `Ref<T>` - Reactive localStorage value
- `remove`: `() => void` - Remove item from localStorage

**Example:**
```javascript
import { useLocalStorage } from '@arcvue/vue-components';

const [theme, removeTheme] = useLocalStorage('theme', 'light');

// Automatically syncs across tabs
theme.value = 'dark';
```

### useApi
HTTP request management with loading states and error handling.

**Parameters:**
- `url`: `string` - API endpoint URL
- `options`: `object` - Fetch options

**Returns:**
- `data`: `Ref<T | null>` - Response data
- `error`: `Ref<Error | null>` - Error object
- `loading`: `Ref<boolean>` - Loading state
- `execute`: `() => Promise<void>` - Execute request
- `cancel`: `() => void` - Cancel pending request

**Example:**
```javascript
import { useApi } from '@arcvue/vue-components';

const { data, loading, error, execute } = useApi('/api/users');

// Execute request
await execute();

// Access data
console.log(data.value);
```

## Custom Elements API

### Registration

```javascript
// Register all components
import { registerComponents } from '@arcvue/vue-components/custom-elements';
registerComponents();

// Register individual components
import { registerButton, registerCard, registerModal } from '@arcvue/vue-components/custom-elements';
registerButton();
registerCard();
registerModal();
```

### Usage in HTML

```html
<!-- Button -->
<arc-button variant="primary" size="large">Click Me</arc-button>

<!-- Card -->
<arc-card title="Card Title" variant="elevated">
  <p>Card content</p>
</arc-card>

<!-- Modal -->
<arc-modal id="myModal" title="Modal Title" size="medium">
  <p>Modal content</p>
</arc-modal>

<script>
  const modal = document.getElementById('myModal');
  modal.addEventListener('close', () => console.log('Modal closed'));
  
  // Open modal programmatically
  modal.setAttribute('model-value', 'true');
</script>
```

## Theming

### CSS Variables

The library uses CSS variables for theming. Override in your global CSS:

```css
:root {
  --arc-primary: #3b82f6;
  --arc-secondary: #64748b;
  --arc-success: #10b981;
  --arc-danger: #ef4444;
  --arc-border-radius: 0.5rem;
  --arc-font-family: system-ui, sans-serif;
}
```

### Theme Utilities

```javascript
import { 
  setTheme, 
  getTheme, 
  setColorScheme, 
  getColorScheme 
} from '@arcvue/vue-components';

// Set theme
setTheme('dark');

// Get current theme
const theme = getTheme(); // 'light' | 'dark'

// Set color scheme
setColorScheme('blue');
```

## Development

### Setup

```bash
# Install dependencies
npm install

# Start dev server with Storybook
npm run storybook

# Start API server (for useApi examples)
npm run server
```

### Build

```bash
# Build all outputs
npm run build

# Build Custom Elements only
npm run build:custom-elements
```

### Project Structure

```
src/
├── components/          # Vue components
│   ├── Button/
│   ├── Card/
│   └── Modal/
├── composables/         # Vue composables
│   ├── useApi/
│   ├── useDebounce/
│   └── useLocalStorage/
├── custom-elements/     # Custom Elements registry
├── styles/              # Global styles and theme
└── index.js            # Main entry point
```

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Custom Elements: All modern browsers with native support

## License

MIT

## Contributing

Contributions welcome! Please follow existing code style and include tests for new features.