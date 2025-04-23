<template>
    <div class="d-flex flex-column align-items-start justify-content-center py-6 px-10 bg-very-light-grey">
        <div class="d-flex flex-column align-items-start justify-content-center">
            <h1 class="text-start fs-32 fw-bold">{{format(noOfItems)}} {{capitalizeWords(searchTerm)}} 
                <span v-if="assetName == 'All assets'">Design</span>
                <span v-else>{{capitalizeWords(assetName)}}</span>
            </h1>
            <p class="text-start fs-14 text-grey-300">{{format(noOfItems)}} 
                <span v-if="assetValue === 'all'">design</span>
                <span v-else>{{assetValue}}</span><span v-if="noOfItems > 1">s</span> exclusively selected by our designer community.</p>
        </div>
        </div>
</template>
<script setup lang="ts">
import { useNumberFormatter } from '~/composables/useNumberFormatter'
const {format} = useNumberFormatter()

    defineProps<{noOfItems: number; searchTerm: string;  assetName: string; assetValue:string}>()

    function capitalizeWords(input: string): string {
    return input.replace(/\b\w/g, char => char.toUpperCase());
}
</script>