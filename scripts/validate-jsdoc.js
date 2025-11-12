/**
 * JSDoc Validation Script
 * Validates that all public APIs have proper JSDoc documentation
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('📚 Validating JSDoc Documentation\n');

let totalFiles = 0;
let filesWithDocs = 0;
let filesWithoutDocs = [];
let totalExports = 0;
let exportsWithDocs = 0;
let exportsWithoutDocs = [];

/**
 * Check if a file has JSDoc comments
 */
function hasJSDoc(content) {
    return /\/\*\*[\s\S]*?\*\//.test(content);
}

/**
 * Extract export statements from file
 */
function extractExports(content, filePath) {
    const exports = [];

    // Match export function, export const, export default
    const exportRegex = /export\s+(default\s+)?(function|const|class|async\s+function)\s+(\w+)/g;
    let match;

    while ((match = exportRegex.exec(content)) !== null) {
        const exportName = match[3];
        const exportType = match[2];

        // Check if this export has JSDoc before it
        const beforeExport = content.substring(0, match.index);
        const lastJSDoc = beforeExport.lastIndexOf('/**');
        const lastComment = beforeExport.lastIndexOf('*/');

        const hasDoc = lastJSDoc > -1 && lastComment > lastJSDoc &&
            (match.index - lastComment) < 100; // JSDoc should be close to export

        exports.push({
            name: exportName,
            type: exportType,
            hasDoc,
            filePath
        });
    }

    return exports;
}

/**
 * Recursively scan directory for JS/Vue files
 */
function scanDirectory(dir, baseDir = dir) {
    const files = readdirSync(dir);

    files.forEach(file => {
        const filePath = join(dir, file);
        const stat = statSync(filePath);

        if (stat.isDirectory()) {
            // Skip node_modules, dist, and test directories
            if (!['node_modules', 'dist', '.git', 'tests'].includes(file)) {
                scanDirectory(filePath, baseDir);
            }
        } else {
            const ext = extname(file);

            // Only check .js, .vue, .ts files in src directory
            if (['.js', '.vue', '.ts'].includes(ext) && filePath.includes('/src/')) {
                // Skip .stories.js and .ce.js files
                if (file.includes('.stories.') || file.includes('.ce.')) {
                    return;
                }

                totalFiles++;
                const content = readFileSync(filePath, 'utf-8');
                const relativePath = filePath.replace(baseDir + '/', '');

                // Check if file has any JSDoc
                if (hasJSDoc(content)) {
                    filesWithDocs++;
                } else {
                    filesWithoutDocs.push(relativePath);
                }

                // Extract and check exports
                const exports = extractExports(content, relativePath);
                exports.forEach(exp => {
                    totalExports++;
                    if (exp.hasDoc) {
                        exportsWithDocs++;
                    } else {
                        exportsWithoutDocs.push(`${exp.filePath} - ${exp.type} ${exp.name}`);
                    }
                });
            }
        }
    });
}

// Scan src directory
scanDirectory(join(rootDir, 'src'));

// Report results
console.log('📊 Documentation Coverage:\n');
console.log(`Files Analyzed: ${totalFiles}`);
console.log(`Files with JSDoc: ${filesWithDocs} (${((filesWithDocs / totalFiles) * 100).toFixed(1)}%)`);
console.log(`Files without JSDoc: ${filesWithoutDocs.length}\n`);

if (filesWithoutDocs.length > 0) {
    console.log('⚠️  Files missing JSDoc:');
    filesWithoutDocs.forEach(file => console.log(`   - ${file}`));
    console.log('');
}

console.log(`Total Exports: ${totalExports}`);
console.log(`Exports with JSDoc: ${exportsWithDocs} (${totalExports > 0 ? ((exportsWithDocs / totalExports) * 100).toFixed(1) : 0}%)`);
console.log(`Exports without JSDoc: ${exportsWithoutDocs.length}\n`);

if (exportsWithoutDocs.length > 0) {
    console.log('⚠️  Exports missing JSDoc:');
    exportsWithoutDocs.slice(0, 10).forEach(exp => console.log(`   - ${exp}`));
    if (exportsWithoutDocs.length > 10) {
        console.log(`   ... and ${exportsWithoutDocs.length - 10} more`);
    }
    console.log('');
}

// Determine pass/fail
const docCoverage = totalExports > 0 ? (exportsWithDocs / totalExports) * 100 : 0;
const threshold = 70; // 70% documentation coverage required

if (docCoverage >= threshold) {
    console.log(`✅ Documentation coverage (${docCoverage.toFixed(1)}%) meets threshold (${threshold}%)`);
    process.exit(0);
} else {
    console.log(`❌ Documentation coverage (${docCoverage.toFixed(1)}%) below threshold (${threshold}%)`);
    console.log(`   Need ${Math.ceil((threshold - docCoverage) * totalExports / 100)} more documented exports`);
    process.exit(1);
}