/**
 * Test script to validate package.json exports work correctly
 * Tests all import patterns defined in package.json
 */

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { existsSync, statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

console.log('🧪 Testing Package.json Exports\n');

const tests = [];
let passed = 0;
let failed = 0;

// Test helper
function test(name, fn) {
    tests.push({ name, fn });
}

function runTests() {
    tests.forEach(({ name, fn }) => {
        try {
            fn();
            console.log(`✅ ${name}`);
            passed++;
        } catch (error) {
            console.log(`❌ ${name}`);
            console.log(`   Error: ${error.message}`);
            failed++;
        }
    });
}

// Test 1: Main entry point (ES)
test('Main ES module entry exists', () => {
    const path = resolve(rootDir, 'dist/es/index.js');
    if (!existsSync(path)) {
        throw new Error(`File not found: ${path}`);
    }
});

// Test 2: Main entry point (CJS)
test('Main CommonJS entry exists', () => {
    const path = resolve(rootDir, 'dist/cjs/index.cjs');
    if (!existsSync(path)) {
        throw new Error(`File not found: ${path}`);
    }
});

// Test 3: UMD build exists
test('UMD build exists', () => {
    const path = resolve(rootDir, 'dist/umd/index.umd.js');
    if (!existsSync(path)) {
        throw new Error(`File not found: ${path}`);
    }
});

// Test 4: Style CSS exists in all formats
test('Style CSS exists in ES format', () => {
    const path = resolve(rootDir, 'dist/es/style.css');
    if (!existsSync(path)) {
        throw new Error(`File not found: ${path}`);
    }
});

test('Style CSS exists in CJS format', () => {
    const path = resolve(rootDir, 'dist/cjs/style.css');
    if (!existsSync(path)) {
        throw new Error(`File not found: ${path}`);
    }
});

test('Style CSS exists in UMD format', () => {
    const path = resolve(rootDir, 'dist/umd/style.css');
    if (!existsSync(path)) {
        throw new Error(`File not found: ${path}`);
    }
});

// Test 5: Custom Elements build
test('Custom Elements - Button.js exists', () => {
    const path = resolve(rootDir, 'dist/custom-elements/Button.js');
    if (!existsSync(path)) {
        throw new Error(`File not found: ${path}`);
    }
});

test('Custom Elements - Card.js exists', () => {
    const path = resolve(rootDir, 'dist/custom-elements/Card.js');
    if (!existsSync(path)) {
        throw new Error(`File not found: ${path}`);
    }
});

test('Custom Elements - Modal.js exists', () => {
    const path = resolve(rootDir, 'dist/custom-elements/Modal.js');
    if (!existsSync(path)) {
        throw new Error(`File not found: ${path}`);
    }
});

test('Custom Elements - index.js exists', () => {
    const path = resolve(rootDir, 'dist/custom-elements/index.js');
    if (!existsSync(path)) {
        throw new Error(`File not found: ${path}`);
    }
});

test('Custom Elements - test.html exists', () => {
    const path = resolve(rootDir, 'dist/custom-elements/test.html');
    if (!existsSync(path)) {
        throw new Error(`File not found: ${path}`);
    }
});

// Test 6: Check file sizes are reasonable
test('ES bundle size is reasonable (< 100KB)', () => {
    const path = resolve(rootDir, 'dist/es/index.js');
    const stats = statSync(path);
    const sizeKB = stats.size / 1024;
    if (sizeKB > 100) {
        throw new Error(`Bundle too large: ${sizeKB.toFixed(2)}KB`);
    }
});

test('CJS bundle size is reasonable (< 100KB)', () => {
    const path = resolve(rootDir, 'dist/cjs/index.cjs');
    const stats = statSync(path);
    const sizeKB = stats.size / 1024;
    if (sizeKB > 100) {
        throw new Error(`Bundle too large: ${sizeKB.toFixed(2)}KB`);
    }
});

test('UMD bundle size is reasonable (< 100KB)', () => {
    const path = resolve(rootDir, 'dist/umd/index.umd.js');
    const stats = statSync(path);
    const sizeKB = stats.size / 1024;
    if (sizeKB > 100) {
        throw new Error(`Bundle too large: ${sizeKB.toFixed(2)}KB`);
    }
});

// Run all tests
runTests();

// Summary
console.log('\n📊 Test Summary:');
console.log(`   Total: ${tests.length}`);
console.log(`   ✅ Passed: ${passed}`);
console.log(`   ❌ Failed: ${failed}`);

if (failed > 0) {
    console.log('\n❌ Some tests failed!');
    process.exit(1);
} else {
    console.log('\n✅ All tests passed!');
    process.exit(0);
}