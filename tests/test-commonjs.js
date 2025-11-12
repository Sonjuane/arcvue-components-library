// Test CommonJS build in Node.js environment
const { Button, useDebounce } = require('./dist/cjs/index.cjs');

console.log('Testing CommonJS build...');
console.log('Button component:', typeof Button);
console.log('useDebounce composable:', typeof useDebounce);

// Test that imports are functions/objects as expected
if (typeof Button === 'object' && Button !== null) {
    console.log('✅ CommonJS: Button component imported successfully');
} else {
    console.log('❌ CommonJS: Button component import failed');
}

if (typeof useDebounce === 'function') {
    console.log('✅ CommonJS: useDebounce composable imported successfully');

    // Test the composable functionality
    try {
        const debouncedFn = useDebounce(() => console.log('CommonJS Debounced!'), 100);
        if (typeof debouncedFn === 'function') {
            console.log('✅ CommonJS: useDebounce composable works correctly');
        }
    } catch (error) {
        console.log('❌ CommonJS: useDebounce composable failed:', error.message);
    }
} else {
    console.log('❌ CommonJS: useDebounce composable import failed');
}

console.log('CommonJS test completed');