<template>
  <BDropdown variant="link" menu-class="custom-dropdown-menu" toggle-class="text-decoration-none"
    class="p-0 border-end pe-3 border-white-6" @show="isOpen = true" @hide="isOpen = false">
    <!-- Toggle Button Content -->
    <template #button-content>
      <div class="d-flex align-items-center justify-content-between gap-2 text-black fw-bold fs-6">
        {{ modelValue }}
        <Icon name="mdi:chevron-down" class="text-black transition" :class="{ 'rotate-180': isOpen }"
          style="font-size: 18px;" />
      </div>
    </template>

    <!-- Dropdown Items -->
    <BDropdownItem v-for="label in options" :key="label" @click="select(label)"
      class="d-flex justify-content-between align-items-center">
      <div class="w-100 d-flex justify-content-between fw-medium fs-6">
        <span class="d-flex ">{{ label }}</span>
        <Icon v-if="selected === label" name="mdi:check" class="text-success" style="font-size: 16px;" />
      </div>

    </BDropdownItem>
  </BDropdown>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { assetLabelToValue } from '~/composables/useAssetMap'

const props = defineProps<{
  modelValue?: string
  options: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const isOpen = ref(false)

const selected = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  if (newVal !== selected.value) {
    selected.value = newVal
  }
})

function select(label: string) {
  emit('update:modelValue', label)
}
</script>

<style>
.custom-dropdown-menu {
  padding: 0.5rem;
  border: 0px;
  border-radius: 10px;
  box-shadow: 0 1.5rem 1rem rgba(0, 0, 0, 0.1);
  min-width: 180px;
  background-color: #EBEDF5;
}

.custom-dropdown-menu .dropdown-item {
  border-radius: 6px;
  font-size: 14px;
  padding: 0.5rem 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.custom-dropdown-menu .dropdown-item+.dropdown-item {
  margin-top: 0.25rem;
}

.custom-dropdown-menu .dropdown-item:hover {
  background-color: white;
  color: #0092E4;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}
</style>