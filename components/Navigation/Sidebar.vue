<template>
    <div class="sidebar min-vh-100 w-[300] bg-white border-end border-light-500 border-white-4">
        <div class="w-100 d-flex justify-content-between align-items-center p-6 border-top border-bottom">
            <p class="fs-14 fw-semibold text-grey-600 flex-shrink-0 m-0">Iconscout Exclusive</p>
            <ToggleSwitch v-model="exlusive" />
        </div>
        <AssetOptions :modelValue="asset" @update:modelValue="$emit('update:asset', $event)"/>
        <PriceOptions/>
        <ViewOptions />
        <SortbyOptions />
        <CategoryOptions />
    </div>
</template>
<script lang="ts" setup>
import AssetOptions from '../FiltersOptions/AssetOptions.vue';
import CategoryOptions from '../FiltersOptions/CategoryOptions.vue';
import PriceOptions from '../FiltersOptions/PriceOptions.vue';
import SortbyOptions from '../FiltersOptions/SortbyOptions.vue';
import ViewOptions from '../FiltersOptions/ViewOptions.vue';
import ToggleSwitch from '../ToggleSwitch.vue';

const exlusive = ref(false)

defineProps<{asset:string}>()
defineEmits(['update:asset'])

watch(exlusive, (val) => {
    //console.log('exclusive', val)
})

</script>