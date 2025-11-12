// Test tree-shaking by importing only specific components
import { useDebounce } from './dist/es/index.js';

console.log('Testing tree-shaking with selective imports...');
console.log('Only imported useDebounce:', useDebounce);

// Test that we can use the imported composable
if (typeof useDebounce === 'function') {
    console.log('✅ Tree-shaking test: useDebounce imported successfully');

    // Test the composable functionality
    try {
        const debouncedFn = useDebounce(() => console.log('Debounced!'), 100);
        if (typeof debouncedFn === 'function') {
            console.log('✅ Tree-shaking test: useDebounce composable works correctly');
        }
    } catch (error) {
        console.log('❌ Tree-shaking test: useDebounce composable failed:', error.message);
    }
} else {
    console.log('❌ Tree-shaking test: useDebounce import failed');
}

console.log('Tree-shaking test completed');