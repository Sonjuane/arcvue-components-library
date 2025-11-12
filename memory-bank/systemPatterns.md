# System Patterns

This file documents recurring patterns and standards used in the project.
It is optional, but recommended to be updated as the project evolves.
2025-11-11 19:03:00 - Initial patterns established for Vue/Vite component library.

## Coding Patterns

- **Component Structure**: Each component in its own directory with Component.vue, index.js, and types.js
- **JSDoc Documentation**: Comprehensive type annotations for all public APIs
- **CSS Variables**: Design system using --arc-\* prefixed custom properties
- **Scoped Styles**: Component styles use <style scoped> to prevent global pollution
- **Named Exports**: Both default and named exports for flexibility

## Architectural Patterns

- **Single Entry Point**: src/index.js exports all components and composables
- **Path Aliases**: @components, @composables, @styles for clean imports
- **Composition API**: Vue 3 composition API for all reactive logic
- **Plugin Pattern**: Optional Vue.use() installation with install function
- **Tree Shaking**: Individual exports for optimal bundle sizes

## Testing Patterns

- **Story-Driven Development**: .story.vue files for each component/composable
- **JSDoc Validation**: Automated documentation validation scripts
- **Build Verification**: Multiple output format testing (ES, CJS, UMD, CE)
- **Custom Elements Testing**: Vanilla HTML integration validation

---

[2025-11-11 22:22] - **Phase 3: System Patterns Established**

## Component Patterns (Phase 3)

**Card Component Pattern:**

- **Variant System**: Use `variant` prop for visual hierarchy (default, elevated, outlined, filled)
- **Padding System**: Use `padding` prop for content density (none, small, medium, large)
- **Slot Architecture**: Three-slot pattern (header, default, footer) for flexible layouts
- **Clickable Pattern**: Boolean `clickable` prop with hover/focus states and keyboard navigation
- **CSS Variables**: Component-specific variables with `--arc-card-*` prefix
- **Accessibility**: ARIA labels for interactive elements, keyboard support (Enter/Space)

**Modal Component Pattern:**

- **Size System**: Four sizes (small, medium, large, fullscreen) for different content needs
- **Behavioral Props**: Six boolean options for fine-grained control (closeOnEscape, closeOnBackdrop, etc.)
- **Focus Management**: Focus trap implementation with return focus on close
- **Animation Pattern**: Smooth transitions with reduced motion support
- **Backdrop Pattern**: Semi-transparent overlay with configurable click behavior
- **Slot Architecture**: Three-slot pattern matching Card component for consistency

## Composable Patterns (Phase 3)

**useLocalStorage Pattern:**

- **Reactive Wrapper**: Return Vue ref for automatic reactivity
- **JSON Serialization**: Automatic stringify/parse for complex data types
- **Cross-Tab Sync**: Storage event listener for multi-tab consistency
- **Error Handling**: Try-catch with fallback values for quota/parse errors
- **SSR Safety**: Check for window object before accessing localStorage
- **API Simplicity**: Single function call returns reactive ref

**useApi Pattern:**

- **State Management**: Separate refs for loading, error, and data states
- **Request Cancellation**: AbortController integration for cleanup
- **Error Structure**: Consistent error objects with status, message, and data
- **Method Helpers**: Dedicated functions for GET, POST, PUT, DELETE, PATCH
- **Configuration**: Base URL and headers support for API consistency
- **Cleanup Pattern**: Automatic abort on component unmount

## Styling Patterns (Phase 3)

**CSS Variable Architecture:**

- **Naming Convention**: `--arc-{component}-{property}-{variant}`
- **Component Prefixes**: Each component has dedicated variable namespace
- **Hierarchical Structure**: Base variables → component variables → variant variables
- **Theming Support**: All colors and sizes defined as CSS variables
- **Shadow DOM Compatibility**: Variables work within Custom Element shadow roots

**Component Styling Pattern:**

- **Scoped Styles**: Use `<style scoped>` in Vue components
- **Shared Utilities**: Common styles in components.css (682 lines)
- **Variable Defaults**: Define defaults in variables.css (200+ variables)
- **Theme Utilities**: JavaScript helpers in theme.js (20+ functions)
- **Responsive Design**: Mobile-first approach with breakpoint variables

**Animation Patterns:**

- **Timing Variables**: `--arc-transition-*` for consistent timing
- **Reduced Motion**: `@media (prefers-reduced-motion: reduce)` support
- **Transform-Based**: Use transforms for better performance
- **Opacity Transitions**: Fade effects for smooth appearance/disappearance
- **Backdrop Animations**: Coordinated modal and backdrop transitions

## Build Patterns (Phase 3)

**Custom Elements Pattern:**

- **Same-Directory Approach**: `.ce.js` files alongside Vue components
- **defineCustomElement**: Use Vue's built-in Custom Element API
- **Theme Integration**: Import and apply theme utilities in Custom Elements
- **Shadow DOM**: Automatic style encapsulation
- **Registration**: Flexible registration through registry utilities

**Export Pattern:**

- **Named Exports**: Individual component/composable exports for tree-shaking
- **Default Export**: Plugin with install function for Vue.use()
- **Index Files**: Component directories have index.js for clean imports
- **Main Entry**: src/index.js exports everything with proper organization

**Storybook Pattern:**

- **Story Files**: `.stories.js` files alongside components
- **Interactive Examples**: Use Storybook controls for prop manipulation
- **Real-World Scenarios**: Include practical use case examples
- **API Integration**: Connect to Express server for realistic data
- **Accessibility Testing**: Document keyboard navigation and ARIA usage

## Accessibility Patterns (Phase 3)

**Keyboard Navigation:**

- **Focus Management**: Visible focus indicators on all interactive elements
- **Keyboard Shortcuts**: Enter/Space for activation, Escape for dismissal
- **Tab Order**: Logical tab sequence through interactive elements
- **Focus Trap**: Contain focus within modals and dialogs

**ARIA Attributes:**

- **Semantic Roles**: Use appropriate ARIA roles (dialog, button, etc.)
- **Labels**: aria-label or aria-labelledby for all interactive elements
- **Descriptions**: aria-describedby for additional context
- **States**: aria-expanded, aria-hidden for dynamic content

**Visual Accessibility:**

- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus Indicators**: High-contrast focus rings on all interactive elements
- **Reduced Motion**: Respect prefers-reduced-motion media query
- **Text Sizing**: Relative units (rem, em) for scalable text

## Testing Patterns (Phase 3)

**Component Testing:**

- **Storybook Visual Testing**: Test all variants and states visually
- **Custom Elements Testing**: Verify vanilla HTML integration
- **Accessibility Testing**: Keyboard navigation and screen reader compatibility
- **Responsive Testing**: Test across different viewport sizes

**Composable Testing:**

- **Interactive Stories**: Storybook examples with live state updates
- **API Integration**: Test with real Express server endpoints
- **Error Scenarios**: Test error handling and edge cases
- **Cleanup Testing**: Verify proper cleanup on unmount

**Build Testing:**

- **Tree-Shaking**: Verify individual imports work correctly
- **Format Testing**: Test ES modules, CommonJS, and Custom Elements
- **Bundle Analysis**: Check bundle sizes and dependencies
- **Cross-Browser**: Test in Chrome, Firefox, Safari, Edge

---

[2025-11-12 09:01] - **Phase 4: Testing and Validation Patterns Established**

## Testing Patterns (Phase 4)

**Package Export Validation Pattern:**

- Test all export patterns from package.json
- Validate named imports for components and composables
- Verify tree-shaking compatibility
- Test multiple import formats (ES, CommonJS)
- Confirm style and utility imports work
- Pattern: Create test script that imports and validates each export

**API Integration Testing Pattern:**

- Test all REST endpoints (GET, POST, PUT, DELETE, PATCH)
- Validate request/response formats
- Confirm error handling and status codes
- Test data persistence and CRUD operations
- Verify server functionality
- Pattern: Automated endpoint testing with fetch API

**Documentation Coverage Pattern:**

- Analyze all source files for JSDoc comments
- Calculate coverage percentage
- Generate detailed coverage reports
- Validate against quality thresholds (70% minimum)
- Ensure all public APIs are documented
- Pattern: Automated script scanning for JSDoc presence

## Validation Patterns (Phase 4)

**Build Output Verification:**

- Validate all build formats (ES, CJS, UMD, Custom Elements)
- Check bundle sizes against performance targets
- Verify gzipped sizes for web delivery
- Confirm zero critical errors or warnings
- Test build performance and speed
- Pattern: Run builds and analyze output files

**Integration Point Validation:**

- Test package.json export patterns (14 patterns)
- Verify API server endpoints (5 endpoints)
- Validate Custom Elements in vanilla HTML
- Confirm Storybook integration
- Test tree-shaking and named imports
- Pattern: Comprehensive integration test suite

**Quality Assurance Standards:**

- 100% JSDoc documentation coverage required
- All build outputs must be validated
- All import patterns must be tested
- Bundle sizes must meet performance targets
- Zero tolerance for console errors/warnings
- Comprehensive integration testing required
- Pattern: Automated quality checks before deployment

## Build Verification Patterns (Phase 4)

**Multi-Format Build Testing:**

- ES Module: Test tree-shaking and modern syntax
- CommonJS: Test Node.js compatibility and require()
- UMD: Test browser globals and script tag usage
- Custom Elements: Test vanilla HTML integration
- Pattern: Build all formats and run format-specific tests

**Bundle Size Monitoring:**

- Track bundle sizes for all formats
- Monitor gzipped sizes for web delivery
- Compare against performance targets
- Alert on size increases
- Optimize when necessary
- Pattern: Automated size tracking and reporting

**Tree-Shaking Verification:**

- Test individual component imports
- Verify unused code is eliminated
- Confirm named exports work correctly
- Test with multiple bundlers
- Validate bundle size reduction
- Pattern: Import single components and measure bundle size

## Quality Assurance Patterns (Phase 4)

**Documentation Quality Standards:**

- All public functions must have JSDoc comments
- All parameters must be documented with types
- All return values must be documented
- Usage examples should be included
- Complex logic needs inline comments
- Pattern: Automated JSDoc coverage validation

**Production Readiness Checklist:**

- ✅ Build quality: All outputs validated
- ✅ Documentation: 100% coverage achieved
- ✅ Testing: Comprehensive validation complete
- ✅ Quality: Zero technical debt
- ✅ Integration: All points validated
- Pattern: Systematic checklist before deployment

**Test Infrastructure Organization:**

```
tests/
├── test-exports.js       # Package export validation
├── test-api-server.js    # API endpoint testing
├── test-commonjs.js      # CommonJS compatibility
├── test-named-imports.js # Named import validation
├── test-tree-shaking.js  # Tree-shaking verification
└── test-*.html           # Browser integration tests

scripts/
└── validate-jsdoc.js     # Documentation coverage
```

- Pattern: Organized test structure with clear separation of concerns

## Test Script Patterns (Phase 4)

**Self-Contained Test Scripts:**

- Each script tests a specific aspect
- Clear pass/fail indicators
- Detailed error reporting
- Fast execution times
- Easy to extend and maintain
- Pattern: Independent, focused test scripts

**Test Output Format:**

```
Testing [Feature Name]...
✅ Test 1: Description - PASSED
✅ Test 2: Description - PASSED
❌ Test 3: Description - FAILED
   Error: Detailed error message

Summary: X/Y tests passed
```

- Pattern: Consistent, readable test output

**Integration with Development Workflow:**

- Run manually during development
- Integrate into CI/CD pipeline
- Use as pre-publish checks
- Provide deployment confidence
- Enable continuous validation
- Pattern: Flexible test execution options

## Performance Monitoring Patterns (Phase 4)

**Build Performance Tracking:**

- Monitor build times for all formats
- Track bundle size changes over time
- Alert on performance regressions
- Optimize slow builds
- Maintain fast development workflow
- Pattern: Automated performance monitoring

**Bundle Size Optimization:**

- Keep ES module under 35 KB (achieved: 33.75 KB)
- Keep CommonJS under 30 KB (achieved: 28.17 KB)
- Keep UMD under 30 KB (achieved: 28.11 KB)
- Optimize gzipped sizes for web delivery
- Monitor size increases in PRs
- Pattern: Size budgets with automated enforcement

## Deployment Validation Patterns (Phase 4)

**Pre-Deployment Checklist:**

1. Run all test scripts
2. Validate JSDoc coverage (100%)
3. Check build outputs
4. Verify bundle sizes
5. Test API server
6. Confirm Custom Elements work
7. Review documentation

- Pattern: Systematic pre-deployment validation

**Production Readiness Criteria:**

- All tests passing (14/14 exports, 5/5 endpoints)
- Documentation complete (49/49 exports documented)
- Build quality verified (all formats working)
- Zero critical issues
- Performance targets met
- Integration points validated

---

[2025-11-12 09:12] - **Phase 5: Final Documentation and Configuration Patterns**

## Documentation Patterns (Phase 5)

**Brief, Pragmatic Documentation:**

- Concise yet comprehensive approach
- Maximum clarity with minimum words
- Scannable structure for quick reference
- Code examples for practical understanding
- Production-ready standards
- Pattern: Brief but complete documentation

**README Structure:**

- Quick start section first
- API documentation organized by component
- Code examples for all features
- Installation and setup instructions
- Development workflow guidance
- Pattern: User-focused, practical documentation

## Configuration Patterns (Phase 5)

**Standard Tooling Configuration:**

- .prettierrc: Basic formatting rules (semi, singleQuote, trailingComma)
- .eslintrc.js: Vue 3 + ES2020 setup with recommended rules
- Minimal but complete configurations
- Industry-standard settings
- Pattern: Standard, minimal configuration files

**Package Configuration:**

- Files array includes all distribution files
- Custom-elements export for vanilla HTML usage
- Exports field optimized for tree-shaking
- Metadata complete and production-ready
- Pattern: Complete package.json configuration

## Demo Implementation Patterns (Phase 5)

**Interactive Custom Elements Demo:**

- Showcase all components with multiple variants
- Interactive examples with event logging
- Beautiful, responsive design
- Real-time output display
- Copy-paste ready code examples
- Pattern: Comprehensive, interactive demo

**Demo Structure:**

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Styles and meta -->
  </head>
  <body>
    <!-- Component showcases -->
    <script type="module">
      // Component imports and setup
    </script>
  </body>
</html>
```

- Pattern: Single-file demo with all features

## Production Readiness Patterns (Phase 5)

**Final Package Preparation:**

- All configuration files in place
- Documentation complete and concise
- Demo showcasing all features
- License file included
- Package metadata verified
- Pattern: Complete production package

**Distribution Checklist:**

- ✅ README.md comprehensive
- ✅ Configuration files added
- ✅ LICENSE file included
- ✅ Demo implementation complete
- ✅ Package.json finalized
- ✅ All exports validated
- Pattern: Systematic final review

## Project Completion Patterns

**Five-Phase Completion:**

1. Phase 1: Foundation Setup ✅
2. Phase 2: Custom Elements Build System ✅
3. Phase 3: Core Library Implementation ✅
4. Phase 4: Testing and Validation ✅
5. Phase 5: Final Polish and Delivery ✅

**Final Statistics:**

- 3 production-ready components
- 3 production-ready composables
- 100% JSDoc coverage
- Complete test infrastructure
- Interactive demo
- Production-ready configuration

**Status: 🎉 PROJECT COMPLETE - READY FOR NPM PUBLISHING**

- Pattern: Clear production readiness definition
