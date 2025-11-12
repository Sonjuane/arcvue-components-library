<template>
    <div
        class="arc-card arc-component"
        :class="cardClasses"
        :role="clickable ? 'button' : undefined"
        :tabindex="clickable ? '0' : undefined"
        :aria-label="clickable ? 'Clickable card' : undefined"
        @click="handleClick"
        @keydown="handleKeydown">

        <!-- Header slot -->
        <header v-if="$slots.header" class="arc-card__header">
            <slot name="header" />
        </header>

        <!-- Main content slot -->
        <div class="arc-card__content">
            <slot />
        </div>

        <!-- Footer slot -->
        <footer v-if="$slots.footer" class="arc-card__footer">
            <slot name="footer" />
        </footer>
    </div>
</template>

<script setup>
import { computed } from 'vue'

/**
 * Card Component
 * A flexible card container with header, content, and footer slots
 */

/**
 * @typedef {'default' | 'elevated' | 'outlined' | 'filled'} CardVariant
 * @typedef {'none' | 'small' | 'medium' | 'large'} CardPadding
 */

/**
 * Component props
 * @type {Object}
 */
const props = defineProps({
    /**
     * Card variant style
     * @type {CardVariant}
     */
    variant: {
        type: String,
        default: 'default',
        validator: (value) => ['default', 'elevated', 'outlined', 'filled'].includes(value)
    },

    /**
     * Card padding size
     * @type {CardPadding}
     */
    padding: {
        type: String,
        default: 'medium',
        validator: (value) => ['none', 'small', 'medium', 'large'].includes(value)
    },

    /**
     * Whether card is clickable (adds hover effects and keyboard navigation)
     * @type {boolean}
     */
    clickable: {
        type: Boolean,
        default: false
    }
})

/**
 * Component emits
 */
const emit = defineEmits(['click'])

/**
 * Computed card classes
 * @returns {string[]} Array of CSS classes
 */
const cardClasses = computed(() => [
    `arc-card--${props.variant}`,
    `arc-card--padding-${props.padding}`,
    {
        'arc-card--clickable': props.clickable
    }
])

/**
 * Handle card click
 * @param {Event} event - Click event
 */
function handleClick(event) {
    if (props.clickable) {
        emit('click', event)
    }
}

/**
 * Handle keyboard navigation for clickable cards
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleKeydown(event) {
    if (props.clickable && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault()
        emit('click', event)
    }
}
</script>

<style scoped>
/* Card component styles using the enhanced design system */

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

/* Card base styles */
.arc-card {
    /* Layout */
    display: flex;
    flex-direction: column;

    /* Styling */
    background-color: var(--arc-color-surface);
    border-radius: var(--arc-radius-lg);
    transition: var(--arc-transition-colors), var(--arc-transition-shadow);

    /* Ensure proper text rendering */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Card sections */
.arc-card__header {
    border-bottom: 1px solid var(--arc-color-border-light);
}

.arc-card__content {
    flex: 1;
}

.arc-card__footer {
    border-top: 1px solid var(--arc-color-border-light);
}

/* === CARD VARIANTS === */

/* Default Card */
.arc-card--default {
    background-color: var(--arc-color-surface);
    border: 1px solid var(--arc-color-border);
    box-shadow: var(--arc-shadow-sm);
}

/* Elevated Card */
.arc-card--elevated {
    background-color: var(--arc-color-surface);
    border: none;
    box-shadow: var(--arc-shadow-lg);
}

.arc-card--elevated:hover {
    box-shadow: var(--arc-shadow-xl);
}

/* Outlined Card */
.arc-card--outlined {
    background-color: transparent;
    border: 2px solid var(--arc-color-border);
    box-shadow: none;
}

/* Filled Card */
.arc-card--filled {
    background-color: var(--arc-color-surface-variant);
    border: 1px solid var(--arc-color-border-light);
    box-shadow: none;
}

/* === CARD PADDING === */

/* No padding */
.arc-card--padding-none .arc-card__header,
.arc-card--padding-none .arc-card__content,
.arc-card--padding-none .arc-card__footer {
    padding: 0;
}

/* Small padding */
.arc-card--padding-small .arc-card__header,
.arc-card--padding-small .arc-card__content,
.arc-card--padding-small .arc-card__footer {
    padding: var(--arc-spacing-3);
}

/* Medium padding (default) */
.arc-card--padding-medium .arc-card__header,
.arc-card--padding-medium .arc-card__content,
.arc-card--padding-medium .arc-card__footer {
    padding: var(--arc-spacing-4);
}

/* Large padding */
.arc-card--padding-large .arc-card__header,
.arc-card--padding-large .arc-card__content,
.arc-card--padding-large .arc-card__footer {
    padding: var(--arc-spacing-6);
}

/* === CLICKABLE CARD === */

.arc-card--clickable {
    cursor: pointer;
    transition: var(--arc-transition-colors), var(--arc-transition-shadow), var(--arc-transition-transform);
}

.arc-card--clickable:hover {
    transform: translateY(-2px);
}

.arc-card--clickable:active {
    transform: translateY(0);
}

.arc-card--clickable:focus-visible {
    outline: 2px solid var(--arc-color-border-focus);
    outline-offset: 2px;
    box-shadow: var(--arc-shadow-focus);
}

/* Clickable variant interactions */
.arc-card--clickable.arc-card--default:hover {
    border-color: var(--arc-color-border-hover);
    box-shadow: var(--arc-shadow-md);
}

.arc-card--clickable.arc-card--elevated:hover {
    box-shadow: var(--arc-shadow-xl);
}

.arc-card--clickable.arc-card--outlined:hover {
    border-color: var(--arc-color-primary);
    background-color: var(--arc-color-primary-light);
}

.arc-card--clickable.arc-card--filled:hover {
    background-color: var(--arc-color-surface-variant-hover);
}

/* === RESPONSIVE ENHANCEMENTS === */

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
    .arc-card {
        transition: none;
    }

    .arc-card--clickable:hover {
        transform: none;
    }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
    .arc-card--clickable:hover {
        transform: none;
    }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    .arc-card--outlined {
        border-width: 3px;
    }

    .arc-card--clickable:focus-visible {
        outline-width: 3px;
    }
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {

    .arc-card--padding-large .arc-card__header,
    .arc-card--padding-large .arc-card__content,
    .arc-card--padding-large .arc-card__footer {
        padding: var(--arc-spacing-4);
    }
}
</style>