<template>
    <ul class="nav nav-tabs fs-14 fw-semibold text-primary">
        <li v-for="label in options" :key="label" class="nav-item">
            <a href="#" class="nav-link" :class="{ active: label === modelValue }" @click.prevent="select(label)">
                {{ capitalizeWords(label) }}
            </a>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
    modelValue: string
    options: string[]
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

function select(label: string) {
    emit('update:modelValue', label)
}

function capitalizeWords(input: string): string {
    return input.replace(/\b\w/g, char => char.toUpperCase());
}
</script>

<style scoped>
.nav-link {
    color: #0092E4;
    text-decoration: none;
    border-bottom: 0;
}

.nav-tabs{
    border-bottom: 0;
}

.nav-tabs .nav-link.active {
    border:0px;
    border-bottom: 4px solid black;
}
</style>