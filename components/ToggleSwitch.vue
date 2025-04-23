<template>
    <label class="toggle-switch shadow-sm">
        <input type="checkbox" :checked="modelValue" @change="handleToggle" />
        <span class="slider"></span>
    </label>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

function handleToggle(event: Event) {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.checked)
}
</script>

<style scoped>
.toggle-switch {
    position: relative;
    display: inline-block;
    width: 36px;
    height: 20px;
}

.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #cbd5e1;
    transition: 0.4s;
    border-radius: 34px;
}

.slider::before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 1px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

input:checked+.slider {
    background-color: #0092E4;
}

input:checked+.slider::before {
    transform: translateX(16px);
}
</style>