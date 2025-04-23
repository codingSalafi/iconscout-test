<template>
    <BCard no-body class="h-100 skeleton-card">
        <div class="asset-skeleton"
        :class="asset === 'icon' ? 'skeleton-box-icon' : 'skeleton-box'"></div>
    </BCard>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    asset: string
}>()

</script>

<style scoped>
/* Base skeleton style with shimmer animation */
.skeleton-box {
    background-color: #f1f1f1;
    position: relative;
    overflow: hidden;
    min-width: 190px;
    height: 210px;
}

.skeleton-box-icon {
    background-color: #f1f1f1;
    position: relative;
    overflow: hidden;
    width: 140px;
    height: 140px;
}

.skeleton-box::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent);
    animation: shimmer 1.5s infinite;
}

/* Specific skeleton regions */
.asset-skeleton {
    width: 100%;
}


@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}
</style>