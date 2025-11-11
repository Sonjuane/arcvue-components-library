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
.arc-button {
    border-radius: var(--arc-radius-md);
    font-weight: var(--arc-font-weight-medium);
    transition: all var(--arc-transition-fast);
}

/* Variants */
.arc-button--primary {
    background-color: var(--arc-color-primary);
    color: var(--arc-color-text-inverse);
}

.arc-button--primary:hover:not(:disabled) {
    background-color: var(--arc-color-primary-hover);
}

.arc-button--secondary {
    background-color: var(--arc-color-secondary);
    color: var(--arc-color-text-inverse);
}

.arc-button--secondary:hover:not(:disabled) {
    background-color: var(--arc-color-secondary-hover);
}

.arc-button--outline {
    background-color: transparent;
    color: var(--arc-color-primary);
    border: 1px solid var(--arc-color-primary);
}

.arc-button--outline:hover:not(:disabled) {
    background-color: var(--arc-color-primary);
    color: var(--arc-color-text-inverse);
}

/* Sizes */
.arc-button--sm {
    padding: var(--arc-spacing-xs) var(--arc-spacing-sm);
    font-size: var(--arc-font-size-sm);
}

.arc-button--md {
    padding: var(--arc-spacing-sm) var(--arc-spacing-md);
    font-size: var(--arc-font-size-base);
}

.arc-button--lg {
    padding: var(--arc-spacing-md) var(--arc-spacing-lg);
    font-size: var(--arc-font-size-lg);
}
</style>