<template>
    <button :class="variant" @click="handleClick">
        {{ label }}
    </button>
</template>

<script>
export default {
    name: 'TestComponent',
    props: {
        label: {
            type: String,
            default: 'Button'
        },
        variant: {
            type: String,
            default: 'default'
        }
    },
    emits: ['click'],
    methods: {
        handleClick(event) {
            this.$emit('click', event);
        }
    }
}
</script>

<style scoped>
button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.default {
    background: #e0e0e0;
    color: #333;
}

.primary {
    background: #007bff;
    color: white;
}
</style>