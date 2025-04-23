<template>
    <div>
        <div v-for="([label, key], idx) in sections" :key="key" class="mt-6">
            <p class="fs-24 fw-semibold text-grey-5 mb-3">
                {{ capitalizeWords(search) }} {{ label }}
            </p>

            <BRow class="g-3 justify-content-start mb-4">
                <!-- skeletons on first load -->
                <BCol v-if=" searchStates[key].pending &&  searchStates[key].items.length === 0" v-for="n in 34" :key="'skeleton-' + n" cols="12" sm="6" md="4" lg="3" xl="2">
                        <SkeletonCard  :asset="key"/>
                    </BCol>

                <!-- actual items -->
                <BCol v-for="(item, i) in searchStates[key].items" :key="item.uuid" v-bind="getColProps(key)">
                    <div class="position-relative">
                        <AssetCardNotAnim v-if="key !== 'lottie'" :uuid="item.uuid" :title="item.title" :asset="key"
                            :previewUrl="item.previewUrl" />
                        <AssetCard v-else :uuid="item.uuid" :title="item.title" :asset="key" :playerType="playerType" />

                        <!-- last‐item overlay -->
                        <div v-if="i === searchStates[key].items.length - 1"
                            class="last-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center rounded-2"
                            role="button" @click="$emit('view-more', key)">
                            <span class="text-white me-2">View more</span>
                            <Icon name="typcn:arrow-up" class="text-white"
                                style="font-size: 24px; transform: rotate(45deg);" />
                        </div>
                    </div>
                </BCol>
            </BRow>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSearch } from '~/composables/useSearch'
import { assetValueToLabel } from '~/composables/useAssetMap'
import AssetCard from '~/components/AssetCard.vue'
import AssetCardNotAnim from '~/components/AssetCardNotAnim.vue'
import { BRow, BCol, BCard, BCardBody, BPlaceholder } from 'bootstrap-vue-next'

// Props
const props = defineProps<{
    search: string
    getColProps: (asset: string) => Record<string, any>
    perPage?: number
    playerType: 'lottie' | 'dotLottie'
}>()
const emit = defineEmits<{
  (e: 'view-more', asset: string): void
  (e: 'update:count', count: number): void
}>()

// Supported asset keys
const assetKeys = ['3d', 'lottie', 'illustration', 'icon'] as const
type AssetKey = typeof assetKeys[number]

// Setup one search per asset
const searchStates = {} as Record<AssetKey, ReturnType<typeof useSearch>>
for (const key of assetKeys) {
    searchStates[key] = useSearch(
        ref(props.search),
        ref(key),
        { price: 'free', perPage: props.perPage || 12 }
    )
}

// sections from assetValueToLabel, filtered by our keys
const sections = computed<[string, AssetKey][]>(() =>
    assetKeys.map((key) => [assetValueToLabel[key], key])
)

const totalCount = computed(() =>
  assetKeys.reduce((sum, key) => sum + searchStates[key].totalNo.value, 0)
)
watch(totalCount, (count) => {
  emit('update:count', count)
}, { immediate: true })

function capitalizeWords(s: string) {
    return s.replace(/\b\w/g, c => c.toUpperCase())
}
</script>

<style scoped>
.last-overlay {
    background-color: rgba(0, 0, 0, 0.7);
    cursor: pointer;
    transition: opacity 0.2s;
}

.position-relative:hover .last-overlay {
    opacity: 1;
}
</style>