#!/usr/bin/env node

/**
 * Convert .story.vue files to Storybook .stories.js format
 * Usage: node convert-stories.js <directory-path>
 */

import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, dirname, relative } from 'path';
import { parseStoryFiles } from './lib/parser.js';
import { convertStoriesToStorybook } from './lib/converter.js';
import { generateFormattedStorybookFile, generateOutputPath } from './lib/generator.js';

/**
 * Recursively find all .story.vue files in a directory
 * @param {string} dir - Directory to search
 * @param {string[]} fileList - Accumulated file list
 * @returns {string[]} Array of file paths
 */
function findStoryFiles(dir, fileList = []) {
    try {
        const files = readdirSync(dir);

        for (const file of files) {
            const filePath = join(dir, file);
            const stat = statSync(filePath);

            if (stat.isDirectory()) {
                // Skip node_modules and hidden directories
                if (!file.startsWith('.') && file !== 'node_modules') {
                    findStoryFiles(filePath, fileList);
                }
            } else if (file.endsWith('.story.vue')) {
                fileList.push(filePath);
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error.message);
    }

    return fileList;
}

/**
 * Group story files by component directory
 * @param {string[]} storyFiles - Array of story file paths
 * @returns {Map} Map of directory to story files
 */
function groupStoryFilesByComponent(storyFiles) {
    const groups = new Map();

    for (const filePath of storyFiles) {
        const dir = dirname(filePath);
        if (!groups.has(dir)) {
            groups.set(dir, []);
        }
        groups.get(dir).push(filePath);
    }

    return groups;
}

/**
 * Find component file in directory or parent directories
 * @param {string} dir - Directory to search
 * @param {string} componentName - Component name
 * @param {Object[]} parsedStories - Parsed story data to extract import path
 * @returns {string|null} Component file path or null
 */
function findComponentFile(dir, componentName, parsedStories = []) {
    const possibleExtensions = ['.vue', '.js', '.ts'];

    // First, try to extract the import path from the stories
    for (const story of parsedStories) {
        if (story.metadata && story.metadata.imports) {
            for (const importStatement of story.metadata.imports) {
                // Extract the path from import statement
                const importMatch = importStatement.match(/from\s+['"]([^'"]+)['"]/);
                if (importMatch) {
                    const importPath = importMatch[1];
                    // Resolve relative path from story file location
                    const storyDir = dirname(story.filePath);
                    const resolvedPath = join(storyDir, importPath);
                    try {
                        statSync(resolvedPath);
                        return resolvedPath;
                    } catch {
                        // Continue searching
                    }
                }
            }
        }
    }

    // Fallback: Search in current directory
    for (const ext of possibleExtensions) {
        const filePath = join(dir, `${componentName}${ext}`);
        try {
            statSync(filePath);
            return filePath;
        } catch {
            // File doesn't exist, try next extension
        }
    }

    // Fallback: Search in parent directory
    const parentDir = join(dir, '..');
    for (const ext of possibleExtensions) {
        const filePath = join(parentDir, `${componentName}${ext}`);
        try {
            statSync(filePath);
            return filePath;
        } catch {
            // File doesn't exist, try next extension
        }
    }

    return null;
}

/**
 * Convert a group of story files to a single Storybook file
 * @param {string} dir - Component directory
 * @param {string[]} storyFiles - Array of story file paths
 * @returns {Object|null} Conversion result or null
 */
function convertStoryGroup(dir, storyFiles) {
    try {
        console.log(`\nProcessing ${storyFiles.length} story files in ${dir}...`);

        // Parse all story files
        const parsedStories = parseStoryFiles(storyFiles);

        if (parsedStories.length === 0) {
            console.warn(`  ⚠️  No valid stories found`);
            return null;
        }

        // Get component name from first story
        const componentName = parsedStories[0].componentName;

        // Find component file (pass parsedStories to extract import paths)
        const componentFile = findComponentFile(dir, componentName, parsedStories);
        if (!componentFile) {
            console.warn(`  ⚠️  Component file not found for ${componentName}`);
            return null;
        }

        // Generate relative path to component from the output directory
        // If component is in parent directory, use ../ComponentName.vue
        const componentDir = dirname(componentFile);
        const componentFileName = componentFile.split('/').pop();
        const isInParent = componentDir !== dir;
        const componentPath = isInParent ? `../${componentFileName}` : `./${componentFileName}`;

        // Convert to Storybook format
        const storybookData = convertStoriesToStorybook(parsedStories, componentPath);

        // Generate output file content
        const fileContent = generateFormattedStorybookFile(storybookData, componentPath);

        // Generate output path
        const outputPath = generateOutputPath(dir, componentName);

        return {
            outputPath,
            content: fileContent,
            componentName,
            storyCount: parsedStories.length
        };
    } catch (error) {
        console.error(`  ❌ Error converting stories:`, error.message);
        return null;
    }
}

/**
 * Main conversion function
 * @param {string} targetDir - Directory to process
 */
function convertStories(targetDir) {
    console.log(`🔍 Searching for .story.vue files in: ${targetDir}\n`);

    // Find all story files
    const storyFiles = findStoryFiles(targetDir);

    if (storyFiles.length === 0) {
        console.log('❌ No .story.vue files found');
        return;
    }

    console.log(`✅ Found ${storyFiles.length} .story.vue files`);

    // Group by component directory
    const groups = groupStoryFilesByComponent(storyFiles);
    console.log(`📦 Grouped into ${groups.size} component(s)`);

    // Convert each group
    let successCount = 0;
    let failCount = 0;

    for (const [dir, files] of groups) {
        const result = convertStoryGroup(dir, files);

        if (result) {
            try {
                writeFileSync(result.outputPath, result.content, 'utf-8');
                console.log(`  ✅ Created ${result.outputPath}`);
                console.log(`     - Component: ${result.componentName}`);
                console.log(`     - Stories: ${result.storyCount}`);
                successCount++;
            } catch (error) {
                console.error(`  ❌ Failed to write file:`, error.message);
                failCount++;
            }
        } else {
            failCount++;
        }
    }

    // Summary
    console.log(`\n${'='.repeat(50)}`);
    console.log(`📊 Conversion Summary:`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
    console.log(`   📁 Total: ${groups.size}`);
    console.log(`${'='.repeat(50)}\n`);
}

/**
 * CLI entry point
 */
function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.error('❌ Error: No directory path provided\n');
        console.log('Usage: node convert-stories.js <directory-path>\n');
        console.log('Example:');
        console.log('  node convert-stories.js ./src/components');
        console.log('  node convert-stories.js /absolute/path/to/components\n');
        process.exit(1);
    }

    const targetDir = args[0];

    try {
        const stat = statSync(targetDir);
        if (!stat.isDirectory()) {
            console.error(`❌ Error: ${targetDir} is not a directory`);
            process.exit(1);
        }
    } catch (error) {
        console.error(`❌ Error: Cannot access ${targetDir}`);
        console.error(`   ${error.message}`);
        process.exit(1);
    }

    try {
        convertStories(targetDir);
    } catch (error) {
        console.error('❌ Fatal error:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}

export { convertStories, findStoryFiles, groupStoryFilesByComponent };