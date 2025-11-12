/**
 * Theme Management Utilities for ArcVue Components
 * Provides theme switching functionality for both regular DOM and Shadow DOM
 */

/**
 * Available theme names
 * @type {string[]}
 */
export const THEMES = ['light', 'dark'];

/**
 * Default theme
 * @type {string}
 */
export const DEFAULT_THEME = 'light';

/**
 * Storage key for theme preference
 * @type {string}
 */
const THEME_STORAGE_KEY = 'arc-theme';

/**
 * Get the current theme from various sources
 * Priority: localStorage > system preference > default
 * @returns {string} Current theme name
 */
export function getCurrentTheme() {
    // Check localStorage first
    if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        if (stored && THEMES.includes(stored)) {
            return stored;
        }
    }

    // Check system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            return 'dark';
        }
    }

    return DEFAULT_THEME;
}

/**
 * Set theme on document root and optionally store preference
 * @param {string} theme - Theme name to apply
 * @param {boolean} [persist=true] - Whether to store in localStorage
 */
export function setTheme(theme, persist = true) {
    if (!THEMES.includes(theme)) {
        console.warn(`Invalid theme: ${theme}. Available themes:`, THEMES);
        return;
    }

    // Apply to document root
    if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
    }

    // Store preference
    if (persist && typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }

    // Dispatch theme change event
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('arc-theme-change', {
            detail: { theme, previousTheme: getCurrentTheme() }
        }));
    }
}

/**
 * Toggle between light and dark themes
 * @param {boolean} [persist=true] - Whether to store in localStorage
 */
export function toggleTheme(persist = true) {
    const current = getCurrentTheme();
    const next = current === 'light' ? 'dark' : 'light';
    setTheme(next, persist);
}

/**
 * Initialize theme system
 * Sets up theme based on stored preference or system preference
 */
export function initializeTheme() {
    const theme = getCurrentTheme();
    setTheme(theme, false); // Don't persist during initialization

    // Listen for system theme changes
    if (typeof window !== 'undefined' && window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleSystemThemeChange = (e) => {
            // Only auto-switch if no stored preference exists
            if (!localStorage.getItem(THEME_STORAGE_KEY)) {
                setTheme(e.matches ? 'dark' : 'light', false);
            }
        };

        // Modern browsers
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleSystemThemeChange);
        } else {
            // Legacy browsers
            mediaQuery.addListener(handleSystemThemeChange);
        }
    }
}

/**
 * Apply theme to a Shadow DOM element
 * @param {ShadowRoot} shadowRoot - Shadow root to apply theme to
 * @param {string} [theme] - Theme to apply (defaults to current theme)
 */
export function applyShadowTheme(shadowRoot, theme = null) {
    if (!shadowRoot || !shadowRoot.host) {
        console.warn('Invalid shadow root provided to applyShadowTheme');
        return;
    }

    const targetTheme = theme || getCurrentTheme();
    shadowRoot.host.setAttribute('data-theme', targetTheme);
}

/**
 * Create a theme-aware Custom Element mixin
 * @param {HTMLElement} element - Custom element instance
 */
export function makeThemeAware(element) {
    if (!element.shadowRoot) {
        console.warn('Element must have shadow root to be theme-aware');
        return;
    }

    // Apply current theme
    applyShadowTheme(element.shadowRoot);

    // Listen for theme changes
    const handleThemeChange = (event) => {
        applyShadowTheme(element.shadowRoot, event.detail.theme);
    };

    window.addEventListener('arc-theme-change', handleThemeChange);

    // Cleanup function
    return () => {
        window.removeEventListener('arc-theme-change', handleThemeChange);
    };
}

/**
 * Get CSS custom properties for current theme
 * Useful for programmatic access to theme values
 * @param {string[]} properties - Array of CSS custom property names
 * @returns {Object} Object with property names as keys and values
 */
export function getThemeProperties(properties) {
    if (typeof window === 'undefined' || !window.getComputedStyle) {
        return {};
    }

    const root = document.documentElement;
    const computedStyle = window.getComputedStyle(root);
    const result = {};

    properties.forEach(prop => {
        const value = computedStyle.getPropertyValue(prop).trim();
        result[prop] = value;
    });

    return result;
}

/**
 * Create a theme toggle button component
 * @param {Object} options - Configuration options
 * @param {string} [options.lightLabel='☀️'] - Label for light theme
 * @param {string} [options.darkLabel='🌙'] - Label for dark theme
 * @param {string} [options.className='arc-theme-toggle'] - CSS class name
 * @returns {HTMLButtonElement} Theme toggle button element
 */
export function createThemeToggle(options = {}) {
    const {
        lightLabel = '☀️',
        darkLabel = '🌙',
        className = 'arc-theme-toggle'
    } = options;

    const button = document.createElement('button');
    button.className = className;
    button.setAttribute('aria-label', 'Toggle theme');
    button.setAttribute('type', 'button');

    const updateButton = () => {
        const current = getCurrentTheme();
        button.textContent = current === 'light' ? darkLabel : lightLabel;
        button.setAttribute('data-theme', current);
    };

    button.addEventListener('click', () => {
        toggleTheme();
    });

    window.addEventListener('arc-theme-change', updateButton);
    updateButton();

    return button;
}

/**
 * Vue 3 Composition API composable for theme management
 * @returns {Object} Theme management functions and reactive state
 */
export function useTheme() {
    // This will be enhanced when Vue is available
    return {
        currentTheme: getCurrentTheme(),
        setTheme,
        toggleTheme,
        initializeTheme,
        THEMES
    };
}

// Auto-initialize theme system when module loads
if (typeof window !== 'undefined') {
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
        initializeTheme();
    });
}

/**
 * Color Palette Utilities
 */

/**
 * Generate color variations from a base color
 * @param {string} baseColor - Base color in hex format
 * @param {number} steps - Number of variations to generate
 * @returns {string[]} Array of color variations
 */
export function generateColorVariations(baseColor, steps = 9) {
    // Simple implementation - in production, use a color manipulation library
    const variations = [];
    for (let i = 0; i < steps; i++) {
        variations.push(baseColor); // Placeholder
    }
    return variations;
}

/**
 * Calculate contrast ratio between two colors
 * @param {string} color1 - First color
 * @param {string} color2 - Second color
 * @returns {number} Contrast ratio
 */
export function getContrastRatio(color1, color2) {
    // Simplified implementation
    // In production, implement WCAG contrast calculation
    return 4.5; // Placeholder
}

/**
 * Check if color combination meets WCAG AA standards
 * @param {string} foreground - Foreground color
 * @param {string} background - Background color
 * @returns {boolean} True if meets WCAG AA
 */
export function meetsWCAGAA(foreground, background) {
    const ratio = getContrastRatio(foreground, background);
    return ratio >= 4.5;
}

/**
 * Elevation Utilities
 */

/**
 * Get elevation shadow value by level
 * @param {number} level - Elevation level (0-6)
 * @returns {string} CSS box-shadow value
 */
export function getElevation(level) {
    const elevations = {
        0: 'var(--arc-elevation-0)',
        1: 'var(--arc-elevation-1)',
        2: 'var(--arc-elevation-2)',
        3: 'var(--arc-elevation-3)',
        4: 'var(--arc-elevation-4)',
        5: 'var(--arc-elevation-5)',
        6: 'var(--arc-elevation-6)'
    };
    return elevations[level] || elevations[0];
}

/**
 * Apply elevation to an element
 * @param {HTMLElement} element - Element to apply elevation to
 * @param {number} level - Elevation level (0-6)
 */
export function applyElevation(element, level) {
    if (!element) return;
    element.style.boxShadow = getElevation(level);
}

/**
 * Spacing Utilities
 */

/**
 * Get spacing value by size
 * @param {string|number} size - Spacing size (0-32 or 'xs', 'sm', 'md', 'lg', 'xl')
 * @returns {string} CSS spacing value
 */
export function getSpacing(size) {
    const spacingMap = {
        'xs': 'var(--arc-spacing-xs)',
        'sm': 'var(--arc-spacing-sm)',
        'md': 'var(--arc-spacing-md)',
        'lg': 'var(--arc-spacing-lg)',
        'xl': 'var(--arc-spacing-xl)',
        '2xl': 'var(--arc-spacing-2xl)'
    };

    if (typeof size === 'string' && spacingMap[size]) {
        return spacingMap[size];
    }

    return `var(--arc-spacing-${size})`;
}

/**
 * Calculate spacing scale
 * @param {number} multiplier - Multiplier for base spacing
 * @returns {string} Calculated spacing value
 */
export function calculateSpacing(multiplier) {
    const baseSpacing = 4; // 4px base
    return `${baseSpacing * multiplier}px`;
}

/**
 * Animation Utilities
 */

/**
 * Get transition preset
 * @param {string} preset - Preset name ('fast', 'normal', 'slow')
 * @returns {string} CSS transition value
 */
export function getTransition(preset = 'normal') {
    const transitions = {
        fast: 'var(--arc-transition-fast)',
        normal: 'var(--arc-transition-normal)',
        slow: 'var(--arc-transition-slow)'
    };
    return transitions[preset] || transitions.normal;
}

/**
 * Create custom transition
 * @param {string} property - CSS property to transition
 * @param {number} duration - Duration in milliseconds
 * @param {string} timing - Timing function
 * @returns {string} CSS transition value
 */
export function createTransition(property, duration = 200, timing = 'ease-out') {
    return `${property} ${duration}ms ${timing}`;
}

/**
 * Apply animation class to element
 * @param {HTMLElement} element - Element to animate
 * @param {string} animation - Animation class name
 * @param {Function} callback - Callback after animation completes
 */
export function animate(element, animation, callback) {
    if (!element) return;

    element.classList.add(animation);

    const handleAnimationEnd = () => {
        element.classList.remove(animation);
        element.removeEventListener('animationend', handleAnimationEnd);
        if (callback) callback();
    };

    element.addEventListener('animationend', handleAnimationEnd);
}

/**
 * Responsive Utilities
 */

/**
 * Breakpoint values
 */
export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
};

/**
 * Check if viewport matches breakpoint
 * @param {string} breakpoint - Breakpoint name
 * @returns {boolean} True if viewport matches
 */
export function matchesBreakpoint(breakpoint) {
    if (typeof window === 'undefined') return false;
    const width = BREAKPOINTS[breakpoint];
    return window.innerWidth >= width;
}

/**
 * Create media query for breakpoint
 * @param {string} breakpoint - Breakpoint name
 * @returns {string} Media query string
 */
export function createMediaQuery(breakpoint) {
    const width = BREAKPOINTS[breakpoint];
    return `(min-width: ${width}px)`;
}

/**
 * Listen for breakpoint changes
 * @param {string} breakpoint - Breakpoint name
 * @param {Function} callback - Callback function
 * @returns {Function} Cleanup function
 */
export function onBreakpointChange(breakpoint, callback) {
    if (typeof window === 'undefined') return () => { };

    const mediaQuery = window.matchMedia(createMediaQuery(breakpoint));

    const handleChange = (e) => callback(e.matches);

    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
    }
}

/**
 * Typography Utilities
 */

/**
 * Get font size by scale
 * @param {string} scale - Font size scale ('xs', 'sm', 'base', 'lg', 'xl', etc.)
 * @returns {string} CSS font-size value
 */
export function getFontSize(scale) {
    return `var(--arc-font-size-${scale})`;
}

/**
 * Get line height by scale
 * @param {string} scale - Line height scale ('none', 'tight', 'normal', 'relaxed', 'loose')
 * @returns {string} CSS line-height value
 */
export function getLineHeight(scale) {
    return `var(--arc-line-height-${scale})`;
}

/**
 * Create typography style object
 * @param {Object} options - Typography options
 * @returns {Object} Style object
 */
export function createTypography({ size = 'base', weight = 'normal', lineHeight = 'normal' } = {}) {
    return {
        fontSize: getFontSize(size),
        fontWeight: `var(--arc-font-weight-${weight})`,
        lineHeight: getLineHeight(lineHeight)
    };
}

/**
 * CSS Variable Utilities
 */

/**
 * Get CSS variable value
 * @param {string} variable - CSS variable name (with or without --)
 * @param {HTMLElement} element - Element to get value from (defaults to root)
 * @returns {string} Variable value
 */
export function getCSSVariable(variable, element = null) {
    if (typeof window === 'undefined') return '';

    const varName = variable.startsWith('--') ? variable : `--${variable}`;
    const target = element || document.documentElement;
    return getComputedStyle(target).getPropertyValue(varName).trim();
}

/**
 * Set CSS variable value
 * @param {string} variable - CSS variable name (with or without --)
 * @param {string} value - Variable value
 * @param {HTMLElement} element - Element to set value on (defaults to root)
 */
export function setCSSVariable(variable, value, element = null) {
    if (typeof window === 'undefined') return;

    const varName = variable.startsWith('--') ? variable : `--${variable}`;
    const target = element || document.documentElement;
    target.style.setProperty(varName, value);
}

/**
 * Get multiple CSS variables
 * @param {string[]} variables - Array of variable names
 * @param {HTMLElement} element - Element to get values from
 * @returns {Object} Object with variable names as keys
 */
export function getCSSVariables(variables, element = null) {
    const result = {};
    variables.forEach(variable => {
        result[variable] = getCSSVariable(variable, element);
    });
    return result;
}

/**
 * Accessibility Utilities
 */

/**
 * Check if user prefers reduced motion
 * @returns {boolean} True if reduced motion is preferred
 */
export function prefersReducedMotion() {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if user prefers dark color scheme
 * @returns {boolean} True if dark scheme is preferred
 */
export function prefersDarkScheme() {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Check if user prefers high contrast
 * @returns {boolean} True if high contrast is preferred
 */
export function prefersHighContrast() {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * Listen for accessibility preference changes
 * @param {string} preference - Preference type ('reduced-motion', 'dark-scheme', 'high-contrast')
 * @param {Function} callback - Callback function
 * @returns {Function} Cleanup function
 */
export function onAccessibilityChange(preference, callback) {
    if (typeof window === 'undefined') return () => { };

    const queries = {
        'reduced-motion': '(prefers-reduced-motion: reduce)',
        'dark-scheme': '(prefers-color-scheme: dark)',
        'high-contrast': '(prefers-contrast: high)'
    };

    const mediaQuery = window.matchMedia(queries[preference]);

    const handleChange = (e) => callback(e.matches);

    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
    }
}

/**
 * Component Style Utilities
 */

/**
 * Generate component class names with modifiers
 * @param {string} base - Base class name
 * @param {Object} modifiers - Modifier flags
 * @returns {string} Combined class names
 */
export function classNames(base, modifiers = {}) {
    const classes = [base];

    Object.entries(modifiers).forEach(([key, value]) => {
        if (value) {
            classes.push(`${base}--${key}`);
        }
    });

    return classes.join(' ');
}

/**
 * Create style object from CSS variables
 * @param {Object} variables - Object with CSS variable names and values
 * @returns {Object} Style object
 */
export function createStyleObject(variables) {
    const style = {};
    Object.entries(variables).forEach(([key, value]) => {
        const varName = key.startsWith('--') ? key : `--${key}`;
        style[varName] = value;
    });
    return style;
}