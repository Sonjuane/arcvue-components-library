// Test named imports from the ES modules build
import { Button, useDebounce } from './dist/es/index.js';

console.log('Testing named imports...');
console.log('Button component:', Button);
console.log('useDebounce composable:', useDebounce);

// Test that imports are functions/objects as expected
if (typeof Button === 'object' && Button !== null) {
    console.log('✅ Button component imported successfully');
} else {
    console.log('❌ Button component import failed');
}

if (typeof useDebounce === 'function') {
    console.log('✅ useDebounce composable imported successfully');
} else {
    console.log('❌ useDebounce composable import failed');
}

console.log('Named imports test completed');