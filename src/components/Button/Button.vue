<template>
    <button
        class="arc-button arc-component"
        :class="buttonClasses"
        :disabled="disabled"
        @click="handleClick">
        <slot />
    </button>
</template>

<script setup>
import { computed } from 'vue'

/**
 * Button Component
 * A simple, accessible button component with variant support
 */

/**
 * @typedef {'primary' | 'secondary' | 'outline'} ButtonVariant
 * @typedef {'sm' | 'md' | 'lg'} ButtonSize
 */

/**
 * Component props
 * @type {Object}
 */
const props = defineProps({
    /**
     * Button variant style
     * @type {ButtonVariant}
     */
    variant: {
        type: String,
        default: 'primary',
        validator: (value) => ['primary', 'secondary', 'outline'].includes(value)
    },

    /**
     * Button size
     * @type {ButtonSize}
     */
    size: {
        type: String,
        default: 'md',
        validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },

    /**
     * Whether button is disabled
     * @type {boolean}
     */
    disabled: {
        type: Boolean,
        default: false
    }
})

/**
 * Component emits
 */
const emit = defineEmits(['click'])

/**
 * Computed button classes
 * @returns {string[]} Array of CSS classes
 */
const buttonClasses = computed(() => [
    `arc-button--${props.variant}`,
    `arc-button--${props.size}`
])

/**
 * Handle button click
 * @param {Event} event - Click event
 */
function handleClick(event) {
    if (!props.disabled) {
        emit('click', event)
    }
}
</script>

<style scoped>
/* Button component styles using the enhanced design system */

/* Component base styles */
.arc-component {
    font-family: var(--arc-font-family);
    font-size: var(--arc-font-size-base);
    line-height: var(--arc-line-height-normal);
    color: var(--arc-color-text);
}

/* Focus styles for accessibility */
.arc-component:focus-visible {
    outline: 2px solid var(--arc-color-border-focus);
    outline-offset: 2px;
    box-shadow: var(--arc-shadow-focus);
}

/* Button reset and base styles */
.arc-button {
    /* Reset */
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    font: inherit;
    cursor: pointer;
    outline: none;
    text-decoration: none;

    /* Layout */
    display: inline-flex;
    align-items: center;
    justify-content: center;

    /* Styling */
    border-radius: var(--arc-radius-md);
    font-weight: var(--arc-font-weight-medium);
    transition: var(--arc-transition-colors);

    /* Ensure proper text rendering */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.arc-button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
}

.arc-button:focus-visible {
    outline: 2px solid var(--arc-color-border-focus);
    outline-offset: 2px;
    box-shadow: var(--arc-shadow-focus);
}

/* === BUTTON VARIANTS === */

/* Primary Button */
.arc-button--primary {
    background-color: var(--arc-color-primary);
    color: var(--arc-color-text-on-primary);
    border: 1px solid var(--arc-color-primary);
}

.arc-button--primary:hover:not(:disabled) {
    background-color: var(--arc-color-primary-hover);
    border-color: var(--arc-color-primary-hover);
    transform: translateY(-1px);
    box-shadow: var(--arc-shadow-md);
}

.arc-button--primary:active:not(:disabled) {
    background-color: var(--arc-color-primary-active);
    border-color: var(--arc-color-primary-active);
    transform: translateY(0);
    box-shadow: var(--arc-shadow-sm);
}

/* Secondary Button */
.arc-button--secondary {
    background-color: var(--arc-color-secondary);
    color: var(--arc-color-text-on-secondary);
    border: 1px solid var(--arc-color-secondary);
}

.arc-button--secondary:hover:not(:disabled) {
    background-color: var(--arc-color-secondary-hover);
    border-color: var(--arc-color-secondary-hover);
    transform: translateY(-1px);
    box-shadow: var(--arc-shadow-md);
}

.arc-button--secondary:active:not(:disabled) {
    background-color: var(--arc-color-secondary-active);
    border-color: var(--arc-color-secondary-active);
    transform: translateY(0);
    box-shadow: var(--arc-shadow-sm);
}

/* Outline Button */
.arc-button--outline {
    background-color: transparent;
    color: var(--arc-color-primary);
    border: 1px solid var(--arc-color-primary);
}

.arc-button--outline:hover:not(:disabled) {
    background-color: var(--arc-color-primary-light);
    border-color: var(--arc-color-primary-hover);
    color: var(--arc-color-primary-hover);
    transform: translateY(-1px);
    box-shadow: var(--arc-shadow-md);
}

.arc-button--outline:active:not(:disabled) {
    background-color: var(--arc-color-primary);
    border-color: var(--arc-color-primary);
    color: var(--arc-color-text-on-primary);
    transform: translateY(0);
    box-shadow: var(--arc-shadow-sm);
}

/* === BUTTON SIZES === */

/* Small Button */
.arc-button--sm {
    padding: var(--arc-spacing-1_5) var(--arc-spacing-3);
    font-size: var(--arc-font-size-sm);
    line-height: var(--arc-line-height-tight);
    min-height: 2rem;
}

/* Medium Button (Default) */
.arc-button--md {
    padding: var(--arc-spacing-2_5) var(--arc-spacing-4);
    font-size: var(--arc-font-size-base);
    line-height: var(--arc-line-height-normal);
    min-height: 2.5rem;
}

/* Large Button */
.arc-button--lg {
    padding: var(--arc-spacing-3) var(--arc-spacing-6);
    font-size: var(--arc-font-size-lg);
    line-height: var(--arc-line-height-normal);
    min-height: 3rem;
}

/* === BUTTON STATES === */

/* Loading state (for future enhancement) */
.arc-button--loading {
    position: relative;
    color: transparent;
}

.arc-button--loading::after {
    content: '';
    position: absolute;
    width: 1rem;
    height: 1rem;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: arc-spin 1s linear infinite;
}

/* Icon buttons (for future enhancement) */
.arc-button--icon-only {
    padding: var(--arc-spacing-2);
    aspect-ratio: 1;
}

.arc-button--icon-only.arc-button--sm {
    padding: var(--arc-spacing-1_5);
}

.arc-button--icon-only.arc-button--lg {
    padding: var(--arc-spacing-3);
}

/* === ANIMATIONS === */

@keyframes arc-spin {
    to {
        transform: rotate(360deg);
    }
}

/* === RESPONSIVE ENHANCEMENTS === */

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
    .arc-button {
        transition: none;
    }

    .arc-button:hover:not(:disabled) {
        transform: none;
    }

    .arc-button--loading::after {
        animation: none;
    }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
    .arc-button {
        min-height: 44px;
        /* iOS accessibility guideline */
    }

    .arc-button:hover:not(:disabled) {
        transform: none;
        /* Disable hover transforms on touch devices */
    }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    .arc-button {
        border-width: 2px;
    }

    .arc-button:focus-visible {
        outline-width: 3px;
    }
}
</style>