<template>
    <Teleport to="body">
        <Transition name="arc-modal-fade">
            <div
                v-if="modelValue"
                class="arc-modal arc-component"
                :class="modalClasses"
                role="dialog"
                aria-modal="true"
                :aria-labelledby="headerId"
                :aria-describedby="contentId"
                @click="handleBackdropClick"
                @keydown.esc="handleEscape">

                <!-- Backdrop -->
                <div v-if="!noBackdrop" class="arc-modal__backdrop" />

                <!-- Modal container -->
                <div
                    ref="modalRef"
                    class="arc-modal__container"
                    :class="containerClasses"
                    role="document"
                    @click.stop>

                    <!-- Header slot -->
                    <header
                        v-if="$slots.header"
                        :id="headerId"
                        class="arc-modal__header">
                        <slot name="header" />
                        <button
                            v-if="!persistent"
                            class="arc-modal__close"
                            type="button"
                            aria-label="Close modal"
                            @click="handleClose">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </header>

                    <!-- Main content slot -->
                    <div
                        :id="contentId"
                        class="arc-modal__content"
                        :class="{ 'arc-modal__content--scrollable': scrollable }">
                        <slot />
                    </div>

                    <!-- Footer slot -->
                    <footer v-if="$slots.footer" class="arc-modal__footer">
                        <slot name="footer" />
                    </footer>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

/**
 * Modal Component
 * A flexible modal dialog with accessibility features, focus trapping, and portal support
 */

/**
 * @typedef {'small' | 'medium' | 'large' | 'fullscreen'} ModalSize
 */

/**
 * Component props
 * @type {Object}
 */
const props = defineProps({
    /**
     * Controls modal visibility (v-model support)
     * @type {boolean}
     */
    modelValue: {
        type: Boolean,
        default: false
    },

    /**
     * Modal size variant
     * @type {ModalSize}
     */
    size: {
        type: String,
        default: 'medium',
        validator: (value) => ['small', 'medium', 'large', 'fullscreen'].includes(value)
    },

    /**
     * Prevents closing on backdrop click or escape key
     * @type {boolean}
     */
    persistent: {
        type: Boolean,
        default: false
    },

    /**
     * Removes the backdrop overlay
     * @type {boolean}
     */
    noBackdrop: {
        type: Boolean,
        default: false
    },

    /**
     * Allows content area to scroll independently
     * @type {boolean}
     */
    scrollable: {
        type: Boolean,
        default: false
    },

    /**
     * Centers modal vertically in viewport
     * @type {boolean}
     */
    centered: {
        type: Boolean,
        default: true
    }
})

/**
 * Component emits
 */
const emit = defineEmits(['update:modelValue', 'close', 'open'])

// Refs
const modalRef = ref(null)
const previousActiveElement = ref(null)
const focusableElements = ref([])

// Generate unique IDs for ARIA
const headerId = computed(() => `arc-modal-header-${Math.random().toString(36).substr(2, 9)}`)
const contentId = computed(() => `arc-modal-content-${Math.random().toString(36).substr(2, 9)}`)

/**
 * Computed modal wrapper classes
 * @returns {Object} Object of CSS classes
 */
const modalClasses = computed(() => ({
    'arc-modal--centered': props.centered,
    'arc-modal--no-backdrop': props.noBackdrop
}))

/**
 * Computed container classes
 * @returns {string[]} Array of CSS classes
 */
const containerClasses = computed(() => [
    `arc-modal__container--${props.size}`
])

/**
 * Get all focusable elements within the modal
 * @returns {HTMLElement[]} Array of focusable elements
 */
function getFocusableElements() {
    if (!modalRef.value) return []

    const selector = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
    ].join(', ')

    return Array.from(modalRef.value.querySelectorAll(selector))
}

/**
 * Trap focus within the modal
 * @param {KeyboardEvent} event - Keyboard event
 */
function trapFocus(event) {
    if (event.key !== 'Tab') return

    const elements = getFocusableElements()
    if (elements.length === 0) return

    const firstElement = elements[0]
    const lastElement = elements[elements.length - 1]

    if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
            event.preventDefault()
            lastElement.focus()
        }
    } else {
        // Tab
        if (document.activeElement === lastElement) {
            event.preventDefault()
            firstElement.focus()
        }
    }
}

/**
 * Handle backdrop click
 * @param {Event} event - Click event
 */
function handleBackdropClick(event) {
    if (!props.persistent && event.target.classList.contains('arc-modal')) {
        handleClose()
    }
}

/**
 * Handle escape key press
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleEscape(event) {
    if (!props.persistent) {
        handleClose()
    }
}

/**
 * Close the modal
 */
function handleClose() {
    emit('update:modelValue', false)
    emit('close')
}

/**
 * Prevent body scroll when modal is open
 */
function preventBodyScroll() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`
}

/**
 * Restore body scroll when modal is closed
 */
function restoreBodyScroll() {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
}

/**
 * Set initial focus when modal opens
 */
async function setInitialFocus() {
    await nextTick()

    if (!modalRef.value) return

    focusableElements.value = getFocusableElements()

    if (focusableElements.value.length > 0) {
        focusableElements.value[0].focus()
    } else {
        modalRef.value.focus()
    }
}

/**
 * Return focus to the element that triggered the modal
 */
function returnFocus() {
    if (previousActiveElement.value && typeof previousActiveElement.value.focus === 'function') {
        previousActiveElement.value.focus()
    }
}

// Watch for modal visibility changes
watch(() => props.modelValue, async (newValue) => {
    if (newValue) {
        // Modal is opening
        previousActiveElement.value = document.activeElement
        preventBodyScroll()
        await setInitialFocus()
        document.addEventListener('keydown', trapFocus)
        emit('open')
    } else {
        // Modal is closing
        restoreBodyScroll()
        returnFocus()
        document.removeEventListener('keydown', trapFocus)
    }
})

// Cleanup on unmount
onBeforeUnmount(() => {
    if (props.modelValue) {
        restoreBodyScroll()
        document.removeEventListener('keydown', trapFocus)
    }
})

// Handle initial mount if modal is already open
onMounted(() => {
    if (props.modelValue) {
        previousActiveElement.value = document.activeElement
        preventBodyScroll()
        setInitialFocus()
        document.addEventListener('keydown', trapFocus)
    }
})
</script>

<style scoped>
/* Modal component styles using the enhanced design system */

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

/* Modal overlay wrapper */
.arc-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: var(--arc-spacing-4);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}

/* Centered modal */
.arc-modal--centered {
    align-items: center;
}

/* Backdrop */
.arc-modal__backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    z-index: -1;
}

/* Modal container */
.arc-modal__container {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: calc(100vh - var(--arc-spacing-8));
    background-color: var(--arc-color-surface);
    border-radius: var(--arc-radius-lg);
    box-shadow: var(--arc-shadow-xl);
    z-index: 1;
    margin: auto 0;
}

/* Modal sizes */
.arc-modal__container--small {
    max-width: 400px;
}

.arc-modal__container--medium {
    max-width: 600px;
}

.arc-modal__container--large {
    max-width: 900px;
}

.arc-modal__container--fullscreen {
    max-width: 100%;
    max-height: 100vh;
    height: 100vh;
    border-radius: 0;
    margin: 0;
}

/* Modal header */
.arc-modal__header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--arc-spacing-4) var(--arc-spacing-5);
    border-bottom: 1px solid var(--arc-color-border-light);
    flex-shrink: 0;
}

/* Close button */
.arc-modal__close {
    position: absolute;
    top: var(--arc-spacing-4);
    right: var(--arc-spacing-4);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: var(--arc-radius-md);
    color: var(--arc-color-text-secondary);
    cursor: pointer;
    transition: var(--arc-transition-colors);
}

.arc-modal__close:hover {
    background-color: var(--arc-color-surface-variant);
    color: var(--arc-color-text);
}

.arc-modal__close:focus-visible {
    outline: 2px solid var(--arc-color-border-focus);
    outline-offset: 2px;
    box-shadow: var(--arc-shadow-focus);
}

.arc-modal__close svg {
    width: 20px;
    height: 20px;
}

/* Modal content */
.arc-modal__content {
    flex: 1;
    padding: var(--arc-spacing-5);
    overflow-y: visible;
}

.arc-modal__content--scrollable {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}

/* Modal footer */
.arc-modal__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--arc-spacing-3);
    padding: var(--arc-spacing-4) var(--arc-spacing-5);
    border-top: 1px solid var(--arc-color-border-light);
    flex-shrink: 0;
}

/* === ANIMATIONS === */

/* Fade transition for modal */
.arc-modal-fade-enter-active,
.arc-modal-fade-leave-active {
    transition: opacity 0.3s ease;
}

.arc-modal-fade-enter-active .arc-modal__container,
.arc-modal-fade-leave-active .arc-modal__container {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.arc-modal-fade-enter-from,
.arc-modal-fade-leave-to {
    opacity: 0;
}

.arc-modal-fade-enter-from .arc-modal__container,
.arc-modal-fade-leave-to .arc-modal__container {
    transform: scale(0.95);
    opacity: 0;
}

/* === RESPONSIVE ENHANCEMENTS === */

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {

    .arc-modal-fade-enter-active,
    .arc-modal-fade-leave-active,
    .arc-modal-fade-enter-active .arc-modal__container,
    .arc-modal-fade-leave-active .arc-modal__container {
        transition: none;
    }

    .arc-modal__backdrop {
        backdrop-filter: none;
    }
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
    .arc-modal {
        padding: var(--arc-spacing-2);
    }

    .arc-modal__container {
        max-height: calc(100vh - var(--arc-spacing-4));
    }

    .arc-modal__container--small,
    .arc-modal__container--medium,
    .arc-modal__container--large {
        max-width: 100%;
    }

    .arc-modal__header,
    .arc-modal__content,
    .arc-modal__footer {
        padding: var(--arc-spacing-4);
    }

    .arc-modal__footer {
        flex-direction: column;
        align-items: stretch;
    }

    .arc-modal__footer>* {
        width: 100%;
    }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    .arc-modal__backdrop {
        background-color: rgba(0, 0, 0, 0.8);
    }

    .arc-modal__container {
        border: 2px solid var(--arc-color-border);
    }

    .arc-modal__close:focus-visible {
        outline-width: 3px;
    }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
    .arc-modal__close {
        width: 44px;
        height: 44px;
    }
}
</style>