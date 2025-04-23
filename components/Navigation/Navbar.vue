<template>
    <BNavbar sticky="top" v-b-color-mode="'light'" toggleable="md"
        class="bg-white py-3  px-md-6 shadow-none shadow-medium">
        <BNavbarBrand href="#"
            class="d-flex align-items-center justify-content-start flex-wrap flex-xl-nowrap px-0 gap-6">
            <div class="nav-left d-flex justify-content-between">
                <div class="d-flex gap-2 me-auto">
                    <div class="rounded-circle d-flex d-xl-none align-items-center me-4"
                        style="width: 40px; height: 40px; border: 1px solid #DDDDDD;" @click="toggleCanvas">
                        <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            fill="currentColor" class="ui-svg-inline mx-auto">
                            <path
                                d="M3,8H21a1,1,0,0,0,0-2H3A1,1,0,0,0,3,8Zm18,8H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm0-5H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z">
                            </path>
                        </svg>
                    </div>
                    <NuxtImg src="/images/IconScout-colour-logo.svg" class="" width="192" />
                </div>
                <BButton class="d-xl-none border-light-500 rounded-pill px-5 py-2 fs-6">
                    <NuxtLink to="/login" class="text-decoration-none text-black">Login</NuxtLink>
                </BButton>
            </div>






            <!--Search bar.  -->
            <div class="searchInput d-flex align-items-center bg-white-4 rounded-2 px-3 py-2 gap-2" style="">

                <AssetDropdown :modelValue="assetLabel" :options="assetLabels" :labelToValue="assetLabelToValue"
                    @update:modelValue="onLabelChange" />
                <!-- Search Icon -->
                <Icon name="mdi:search" class="text-black flex-shrink-0" style="font-size: 16px;" />

                <!-- Input -->
                <input type="text" class="form-control bg-white-4 w-[219]  border-0 fs-14 lh-24" :value="searchText"
                    @input="onInput" @keyup.enter="onSearch" placeholder="Search from 8 Million+ assets"
                    style="box-shadow: none;" />

                <!-- Upload Icon Button -->
                <button type="button" class="btn btn-white d-flex align-items-center justify-content-center" style="">
                    <Icon name="my-icon:reverse-image-search-icon" />
                </button>
            </div>
            <!--Menu items-->
            <div class="d-none d-lg-flex align-items-center flex-shrink-0 gap-2 gap-md-4">
                <div class="d-flex align-items-center">
                    <p class="fs-6 fw-semibold p-0 m-0">Explore</p>
                    <Icon name="mdi:chevron-down" />
                </div>
                <div class="d-flex align-items-center">
                    <p class="fs-6 fw-semibold p-0 m-0">Tools</p>
                    <Icon name="mdi:chevron-down" />
                </div>
                <div class="d-flex align-items-center">
                    <p class="fs-6 fw-semibold p-0 m-0">All Features</p>
                    <Icon name="mdi:chevron-down" />
                </div>
                <div class="d-flex align-items-center">
                    <p class="fs-6 fw-semibold p-0 m-0">Free Asset</p>
                    <Icon name="mdi:chevron-down" />
                </div>
                <div class="d-flex align-items-center">
                    <p class="fs-6 fw-semibold p-0 m-0">Learn</p>
                    <Icon name="mdi:chevron-down" />
                </div>
            </div>
        </BNavbarBrand>

        <BNavbarNav class="d-none d-xl-flex flex-row align-items-center justify-content-center gap-2 gap-md-3">
            <BButton class="border-light-500 rounded-pill px-5 py-2 fs-6">
                <NuxtLink to="/login" class="text-decoration-none text-black">Login</NuxtLink>
            </BButton>
            <BButton class="d-none d-md-block bg-primary rounded-pill px-5 py-2 fs-6">
                <NuxtLink to="/login" class="text-decoration-none text-white">Signup</NuxtLink>
            </BButton>
        </BNavbarNav>

        <BOffcanvas v-model="showCanvas" id="nav-offcanvas" title="" placement="start" is-nav>
            <BNavbarNav>
                <BNavItem v-for="[label, value] in Object.entries(assetLabelToValue)"
                    :href="`/${searchType}/${value}/${searchTerm}`" class="fs-16 fw-semibold">
                    {{ label }}
                </BNavItem>
                <hr>
                <BNavItem class="fs-16 fw-semibold">
                    Contact us
                </BNavItem>
                <BNavItem>
                    <button class="btn bg-primary d-flex align-items-center justify-content-center gap-2 px-12 py-3 rounded-pill text-white fs-6 fw-semibold">
                        <Icon name="fa6-solid:crown"/>
                        <p class="p-0 m-0">Get Unlimited Downloads</p>
                    </button>
                </BNavItem>
            </BNavbarNav>

        </BOffcanvas>
    </BNavbar>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { assetLabels, assetValueToLabel, assetLabelToValue } from '~/composables/useAssetMap'
import { useRouter } from 'vue-router'


const showCanvas = ref(false)

const assetOptions = Object.keys(assetLabelToValue)

const props = defineProps<{
    modelValue: string
    searchTerm: string
    searchType: string
}>()
const emit = defineEmits(['update:asset', 'update:search'])
const router = useRouter()

const assetLabel = computed(() => {
    return assetValueToLabel[props.modelValue as keyof typeof assetValueToLabel] || 'Assets'
})
//replaces (1) above
const selectedAsset = ref(props.modelValue)
const searchText = ref(props.searchTerm)

watch(() => props.modelValue, (val) => {
    selectedAsset.value = val
})
watch(() => props.searchTerm, (val) => {
    searchText.value = val
})



const toggleCanvas = () => {
    showCanvas.value = !showCanvas.value
}

async function onLabelChange(newLabel: string) {
    const newValue = assetLabelToValue[newLabel as keyof typeof assetLabelToValue]
    const path = `/search/${encodeURIComponent(newValue)}/${encodeURIComponent(searchText.value.trim())}`
    await router.push(path)
    emit('update:asset', newValue)
}

function onInput(event: Event) {
    const target = event.target as HTMLInputElement
    searchText.value = target.value
}

async function onSearch() {
    const path = `/search/${encodeURIComponent(props.modelValue)}/${encodeURIComponent(searchText.value.trim())}`
    await router.push(path)
    emit('update:search', searchText.value)
}

</script>
<style>
:where(.i-my-icon\:reverse-image-search-icon) {
    width: 1.5rem;
    height: 1.5rem;
}

.nav-left {
    width: 100%;
}

.searchInput {
    width: 100%;
}

@media (min-width: 768px) {
    .nav-left {
        width: fit-content;
    }

    .searchInput {
        width: fit-content;
    }
}

/* col-lg-4 */
@media (min-width: 992px) {
    .nav-left {
        width: auto;
    }

    .searchInput {
        width: fit-content;
    }
}
</style>