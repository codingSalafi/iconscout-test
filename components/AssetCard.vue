<template>
  <BCard role="button" no-body class="position-relative 
  overflow-hidden d-flex 
  justify-content-center 
  align-items-center
  px-3 py-2 border-0 bg-white-1 rounded-2" :class="asset === 'icon' ? 'asset-icon' : 'asset-card'">
    <client-only>
      <div v-if="playerType == 'lottie'">
        <lottie-player v-if="lottieUrl" :src="lottieUrl" autoplay loop
          :class="asset === 'icon' ? 'asset-icon-asset' : 'asset-card-asset'" />
        <div v-else class="d-flex align-items-center justify-content-center">
          <BSpinner small />
        </div>
      </div>
      <div v-if="playerType == 'dotLottie'">
        <dotlottie-player v-if="lottieUrl" :src="lottieUrl" autoplay loop
          :class="asset === 'icon' ? 'asset-icon-asset' : 'asset-card-asset'" />
        <div v-else class="d-flex align-items-center justify-content-center">
          <BSpinner small />
        </div>
      </div>

    </client-only>
    <BCardBody class="asset-card-body w-100 p-3 d-flex justify-content-between align-items-end">
      <BCardText class="small text-grey-2 p-0 m-0 title-text">{{ title }}</BCardText>
      <div class="w-[36] h-[36] bg-white-3 border border-white-4 justify-content-center align-items-center"
        style="padding: 6px; border-radius: 6px;">
        <Icon name="iconoir:download" class="text-grey-3" style="font-size: 24px;" />
      </div>
    </BCardBody>
    <BCardBody class="asset-card-top w-100 p-3 d-flex justify-content-end align-items-end">
      <div class="w-[36] h-[36] bg-white-3 border border-white-4 justify-content-center align-items-center"
        style="padding: 6px; border-radius: 6px;">
        <Icon name="mynaui:folder-plus-solid" class="text-grey-3" style="font-size: 24px;" />
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useState } from '#app'


const props = defineProps<{
  uuid: string
  title: string
  asset: string
  playerType: 'lottie' | 'dotLottie'
}>()

const cache = useState<Record<string, string>>('downloadUrlCache', () => ({}))
const lottieUrl = ref<string | null>(null)

//console.log("props", props);

onMounted(async () => {
  //first check if we have the url in the cache
  const cached = cache.value[props.uuid]
  if (cached) {
    lottieUrl.value = cached
    return
  }
  //if not, 
  try {
    // here i call our server endpoint
    const { url } = await $fetch<{ url: string }>(
      `/api/download/${props.uuid}`,
      {
        method: 'POST',
        body: { format: 'json'   }
      }
    )
    //we save the url in the cache
    cache.value[props.uuid] = url
    //and set the lottieUrl to the url
    lottieUrl.value = url
    //console.log("lottieUrl", lottieUrl.value);

  } catch {
    lottieUrl.value = null
  }
})
</script>
<style>
.asset-card {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-width: 190px;
  height: 210px;
}

.asset-card:hover {
  background-color: #E2E2E5;
}

.asset-icon {
  position: relative;
  overflow: hidden;
  width: 100%;
  width: 140px;
  height: 140px;
}

.asset-icon:hover {
  background-color: #E2E2E5;
}

.asset-card-asset {
  max-height: 162px;
  max-width: 162px;
}

.asset-icon-asset {
  max-height: 70px;
  max-width: 70px;
}

.asset-card-body {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  transform: translateY(100%);
  transition: transform 0.4s ease, opacity 0.3s ease;
  opacity: 1;
  background-color: transparent;
  z-index: 1;
}

.asset-card:hover .asset-card-body {
  transform: translateY(0);
  opacity: 1;
}

.asset-card-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transform: translateY(-100%);
  transition: transform 0.4s ease, opacity 0.3s ease;
  opacity: 0;
  background-color: transparent;
}

.asset-card:hover .asset-card-top {
  transform: translateY(0);
  opacity: 1;
}


.title-text {
  flex: 0 1 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>