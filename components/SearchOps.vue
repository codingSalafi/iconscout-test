<template>
    <div class="page-wrapper">
        <Navbar :modelValue="asset" :searchTerm="search" :searchType="searchType" @update:asset="onAssetChange" @update:search="onSearchEnter" />
        <StatsHeader :noOfItems="noOfItems || totalNo" :searchTerm="search" :assetName="assetName"
            :assetValue="asset" />
        <div class="sticky-tabs d-none d-md-flex justify-content-start align-items-center pt-6 pb-0">
            <div class="d-flex justify-content-between align-items-cente px-6 border-end border-light-500"
                :class="sidebarOpen ? 'w-[300]' : 'w-[80]'">
                <div class="d-flex align-items-center gap-2" role="button" @click="openSidebar">
                    <Icon name="mingcute:settings-6-line" class="text-grey-5" style="font-size: 24px;" />
                    <p class="fs-16 fw-semibold text-grey-5 p-0 m-0">
                        Filter
                    </p>
                </div>
                <Icon v-if="sidebarOpen" role="button" name="mdi:close" class="text-grey-5" style="font-size: 24px;"
                    @click="closeSidebar" />
            </div>
            <AssetTabs :modelValue="assetName" :options="assetLabels" @update:modelValue="onTabChange" />
        </div>
        <div class="content-area d-flex justify-content-start align-items-start gap-10">
            <div class="sidebar-sticky sidebar-panel d-none flex-shrink-0 overflow-hidden"
                :class="sidebarOpen ? 'd-md-flex' : 'd-none'">
                <Sidebar class=" flex-shrink-0" :asset="asset" @update:asset="onAssetChange" />
            </div>
            <BContainer fluid class="flex-grow-1 d-flex flex-column gap-4 main-container position-relative">

                <TagsList :modelValue="selectedTag" :tags="tags" />
                <div v-if="asset === 'all'">
                    <AllAssetsGrid :search="search" :getColProps="getColProps" :perPage="8"
                        :playerType="props.playerType" @view-more="onAssetChange" @update:count="handleCountUpdate" />

                </div>

                <div v-else-if="asset === 'lottie'">
                    <BRow class="g-3 justify-content-start">

                        <!-- Skeleton placeholder -->
                        <BCol v-if="pending && items.length === 0" v-for="n in 34" :key="'skeleton-' + n" cols="12"
                            sm="6" md="4" lg="3" xl="2">
                            <SkeletonCard :asset="asset" />
                        </BCol>
                        <BCol v-for="item in items" :key="item.uuid" cols="12" sm="6" md="4" lg="3" xl="2">

                            <AssetCard :uuid="item.uuid" :title="item.title" :asset="asset"
                                :playerType="props.playerType" />

                        </BCol>

                    </BRow>

                    <!-- only render the sentinel when in Lottie tab -->
                    <div v-if="asset === 'lottie'" ref="sentinel" class="h-1"></div>

                    <!-- loading more indicator -->
                    <div v-if="pending && items.length > 0" class="text-center py-4">

                        <BSpinner small class="me-2" /> Loading more…

                    </div>
                    <p v-if="finished" class="text-center text-muted py-3">
                        No more results
                    </p>
                    <p v-if="error" class="text-danger">{{ error.message }}</p>
                </div>
                <div v-else>
                    <BRow class="g-3 justify-content-start">
                        <BCol v-if="pending && items.length === 0" v-for="n in 34" :key="'skeleton-' + n" cols="12"
                            sm="6" md="4" lg="3" xl="2">
                            <SkeletonCard :asset="asset" />
                        </BCol>
                        <BCol v-for="item in assetItems" :key="item.uuid" :cols="asset === 'icon' ? 'auto' : 12"
                            :sm="asset === 'icon' ? undefined : 6" :md="asset === 'icon' ? undefined : 4"
                            :lg="asset === 'icon' ? undefined : 3" :xl="asset === 'icon' ? undefined : 2">
                            <AssetCardNotAnim :uuid="item.uuid" :title="item.title" :asset="asset"
                                :previewUrl="item.previewUrl" />
                        </BCol>
                    </BRow>
                </div>
                <div v-if="showScrollBlocker"
                    class="scroll-blocker d-flex flex-column align-items-center justify-content-center gap-4 gap-md-5">
                    <p class="fw-bold fs-24 p-0 m-0">View all {{ capitalizeWords(search) }} {{ assetName }}.</p>
                    <div class="d-flex flex-column align-items-center justify-content-center gap-2 gap-md-3">
                        <button class="btn bg-primary px-12 py-3 rounded-3 text-white fs-6 fw-semibold">
                            Get Started - It's Free
                        </button>
                        <p class="fs-6">
                            Already have an account? <span class="text-primary" role="button">Log In</span>
                        </p>
                    </div>
                </div>
            </BContainer>
        </div>
    </div>
    <FooterNav/>
</template>

<script setup lang="ts">
import { useSearch } from '~/composables/useSearch'
import { assetLabels, assetValueToLabel, assetLabelToValue } from '~/composables/useAssetMap'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import AssetCard from '~/components/AssetCard.vue'
import Navbar from '~/components/Navigation/Navbar.vue'
import StatsHeader from '~/components/StatsHeader.vue'
import Sidebar from '~/components/Navigation/Sidebar.vue'
import AssetTabs from '~/components/AssetTabs.vue'
import TagsList from '~/components/TagsList.vue'
import tags from '~/data/tags.json'
import AssetCardNotAnim from '~/components/AssetCardNotAnim.vue'
import AllAssetsGrid from '~/components/AllAssetsGrid.vue'
import { useInfiniteScroll } from '~/composables/useInfiniteScroll'
import SkeletonCard from '~/components/SkeletonCard.vue'
import FooterNav from '~/components/Navigation/FooterNav.vue'


const props = defineProps<{ playerType: 'lottie' | 'dotLottie' }>()

const route = useRoute()
const router = useRouter()

// Let's grab the search term from the URL
const inputTerm = ref((route.params.searchTerm as string) || '')
const search = ref(route.params.searchTerm as string)
const asset = ref(route.params.asset as string)
const selectedTag = ref()
const sidebarOpen = ref(true)
const searchType = ref('')

const showScrollBlocker = ref(false);
const scrollCount = ref(0);
const lastScrollY = ref(0);
const scrollDirection = ref<'up' | 'down' | null>(null);
const scrollThreshold = 500;
let scrollLocked = false;
const pageJustLoaded = ref(true);



watch(
    () => [route.params.asset, route.params.searchTerm],
    ([newAsset, newQuery]) => {
        asset.value = newAsset as string
        search.value = newQuery as string
        inputTerm.value = newQuery as string
    },
    { immediate: true }
)

const assetName = computed(() =>
    assetValueToLabel[asset.value as keyof typeof assetValueToLabel] || 'All Assets'
)

if (props.playerType == 'lottie'){
    searchType.value = 'search'
    
}else{
    searchType.value = 'searchdot'
    
}



let { items, pending, finished, error, totalNo, loadMore } = useSearch(search, asset as Ref<'icon' | 'illustration' | 'lottie' | '3d'>, { price: 'free', perPage: 32 })

const iconItems = ref<AssetItem[]>([])
const illustrationItems = ref<AssetItem[]>([])
const threeDItems = ref<AssetItem[]>([])
const lottieItems = ref<AssetItem[]>([])

watch([asset, items], ([newAsset, newItems]) => {
    if (newAsset === '3d') {
        threeDItems.value = newItems
    } else if (newAsset === 'illustration') {
        illustrationItems.value = newItems
    } else if (newAsset === 'icon') {
        iconItems.value = newItems
    } else if (newAsset === 'lottie') {
        lottieItems.value = newItems
    }
})
const assetItems = computed(() => {
    switch (asset.value) {
        case 'icon':
            return iconItems.value
        case 'illustration':
            return illustrationItems.value
        case '3d':
            return threeDItems.value
        case 'lottie':
            return lottieItems.value
        default:
            return []
    }
})

const noOfItems = ref(0)

function handleCountUpdate(count: number) {
    noOfItems.value = count
}


function openSidebar() {
    sidebarOpen.value = true
}
function closeSidebar() {
    sidebarOpen.value = false
}

function onSearchEnter(newQuery: string) {
    const base = props.playerType === 'dotLottie' ? 'searchdot' : 'search'
    const path = `/${base}/${encodeURIComponent(asset.value)}/${encodeURIComponent(newQuery.trim())}`
    router.push(path)
}
function onAssetChange(newAsset: string) {
    const base = props.playerType === 'dotLottie' ? 'searchdot' : 'search'

    const path = `/${base}/${encodeURIComponent(newAsset)}/${encodeURIComponent(search.value.trim())}`
    resetScroll();
    router.push(path)
}

function onTabChange(newLabel: string) {
    const base = props.playerType === 'dotLottie' ? 'searchdot' : 'search'
    const newValue = assetLabelToValue[newLabel as keyof typeof assetLabelToValue]
    const path = `/${base}/${encodeURIComponent(newValue)}/${encodeURIComponent(search.value.trim())}`
    router.push(path)
}

function capitalizeWords(input: string): string {
    return input.replace(/\b\w/g, char => char.toUpperCase());
}

//coontrols the <BCol> size
const defaultCols = { cols: 12, sm: 6, md: 4, lg: 3, xl: 2 }
function getColProps(assetType: string) {
    if (assetType === 'icon') {
        return { cols: 'auto', }
    } else {
        return defaultCols
    }
}

//Infinite scroll using Intersection Observer only on lottie tab
const { sentinel } = useInfiniteScroll(() => {
    if (
        asset.value === 'lottie' &&
        !pending.value &&
        !finished.value
    ) {
        loadMore()
    }
})

const handleScroll = () => {
    if (asset.value === 'lottie' || asset.value == 'all') {
        return
    }
    

    const currentScrollY = window.scrollY;

    // Detect scroll direction change for counting discrete scroll actions
    const currentDirection = currentScrollY > lastScrollY.value ? 'down' : 'up';

    if (scrollDirection.value !== currentDirection) {
        scrollDirection.value = currentDirection as 'up' | 'down';
        scrollCount.value++;
    }

    // Check if we've met either condition
    if (currentScrollY >= scrollThreshold) {
        lockScroll();
    }

    lastScrollY.value = currentScrollY;
};

// Lock scrolling and show the blocker
const lockScroll = () => {
    if (!scrollLocked) {
        scrollLocked = true;
        showScrollBlocker.value = true;



        // Add styles to the body to disable scrolling
        //document.body.style.overflow = 'hidden';

    }
};

// Reset scrolling if needed
const resetScroll = () => {
    if (scrollLocked) {
        scrollLocked = false;
        showScrollBlocker.value = false;

        // Remove the styles that disable scrolling
        document.body.style.overflow = '';


        // Reset scroll position
       // window.scrollTo(0, lastScrollY.value);

        // Reset counter
        scrollCount.value = 0;
    }
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
    resetScroll(); // Make sure to clean up if component is destroyed
});


</script>
<style scoped>
.last-overlay {
    background-color: #000000CC;
    cursor: pointer;
    /* if you want a smooth fade in: */
    transition: opacity 0.2s;
}

.position-relative:hover .last-overlay {
    opacity: 1;
}



/* this allow stickies to work in this flex container */
.content-area {
    overflow: visible;
    /* override that “overflow: hidden” */
}

.sidebar-sticky {
    position: sticky;
    top: calc(56px + 48px);
    align-self: flex-start;
 
    max-height: calc(100vh - (56px + 48px));
    overflow-y: auto;
}

.sticky-tabs {
    position: sticky;
    height: 70px;
    padding-top: 24px;
    top: 85px;
    z-index: 20;
    background: white;
    border-bottom: 0px;
}



.sidebar-panel {
    position: sticky;
    top: calc(56px + 48px);
    max-height: calc(100vh - (56px+48px));
    overflow-y: auto;
    width: 300px;
    transform: translateX(0);
    transition: transform 0.3s ease;
}

/* when closed, push it fully off‐canvas to the left */
.sidebar-panel.sidebar-closed {
    transform: translateX(-100%);
    display: none;
}

.main-container {
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
}

.scroll-blocker {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 21.98%, rgba(255, 255, 255, 0.99) 100%);
    padding: 16px 24px;
    z-index: 1000;
    border-top: 1px solid #e9ecef;
    min-height: 400px;
    transition: transform 0.3s ease;
    transform: translateY(0);
}

/* Animation when scroll blocker appears */
.scroll-blocker-enter-active,
.scroll-blocker-leave-active {
    transition: transform 0.3s ease;
}

.scroll-blocker-enter-from,
.scroll-blocker-leave-to {
    transform: translateY(100%);
}

.scroll-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    z-index: 1029;
    cursor: not-allowed;
}

@media (min-width: 768px) {}

@media (min-width: 992px) {}
</style>