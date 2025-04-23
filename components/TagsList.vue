<template>
  <div class="tags-list-wrapper d-flex align-items-center">
    <!-- Left Scroll Button -->
    <BButton   class="scroll-btn border border-white-6 rounded-circle me-2" :disabled="!canScrollLeft" @click="scrollLeft">
      <Icon name="mdi:chevron-left" class="text-grey-300" style="font-size: 24px;" />
    </BButton>

    <!-- Scrollable Tags Container -->
    <div ref="container" class="tags-wrapper" @scroll="updateScroll">
      <div v-for="tag in tags" :key="tag" class="tag-item fs-14 text-tags-grey px-3 py-2 rounded-1 border me-2"
        :class="{ 'active': tag === modelValue }" @click="selectTag(tag)">
        {{ tag }}
      </div>
    </div>

    <!-- Right Scroll Button -->
    <BButton class="scroll-btn border border-white-6 rounded-circle ms-2" :disabled="!canScrollRight" @click="scrollRight">
      <Icon name="mdi:chevron-right" class="text-grey-300" style="font-size: 24px;" />
    </BButton>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  tags: string[],
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// refs for the container and scroll state
const container = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

function updateScroll() {
  if (!container.value) return
  const el = container.value
  canScrollLeft.value = el.scrollLeft > 0
  canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth
}

function scrollLeft() {
  if (!container.value) return
  container.value.scrollBy({ left: -container.value.clientWidth * 0.7, behavior: 'smooth' })
}

function scrollRight() {
  if (!container.value) return
  container.value.scrollBy({ left: container.value.clientWidth * 0.7, behavior: 'smooth' })
}

function selectTag(tag: string) {
  emit('update:modelValue', tag)
}

onMounted(() => {
  updateScroll()
  container.value?.addEventListener('scroll', updateScroll)
  window.addEventListener('resize', updateScroll)
})

onBeforeUnmount(() => {
  container.value?.removeEventListener('scroll', updateScroll)
  window.removeEventListener('resize', updateScroll)
})
</script>

<style scoped>
.tags-list-wrapper {
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.tags-wrapper {
  flex: 1 1 auto;
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  min-width: 0;
}

.tag-item {
  flex: 0 0 auto;
  white-space: nowrap;
  border: 1px solid var(--bs-light);
  cursor: pointer;
  user-select: none;
}

.tag-item.active {
  background-color: var(--bs-primary);
  color: white;
  border-color: var(--bs-primary);
}

.scroll-btn {
  flex: 0 0 auto;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

/* hide scrollbar */
.tags-wrapper::-webkit-scrollbar {
  display: none;
}

.tags-wrapper {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
