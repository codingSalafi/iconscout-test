<template>
    <SearchOps :playerType="playerType" />
</template>

<script setup lang="ts">
import SearchOps from '~/components/SearchOps.vue';
//we pull the parameters
const route = useRoute()
const asset = route.params.asset as string
const searchTerm = route.params.searchTerm as string

import { assetValueToLabel } from '~/composables/useAssetMap';
const assetLabel = assetValueToLabel[asset as keyof typeof assetValueToLabel]
const url = `${process.env.MY_PUBLIC_URL}/searchdot/${asset}/${encodeURIComponent(searchTerm)}`

useHead({
    title: `${assetLabel}: "${searchTerm}" - IconScout Search Test with DotLottie Player`,
    meta: [
        { name: 'description', content: `Browse free ${assetLabel.toLowerCase()} for "${searchTerm}" on IconScout with DotLottie Player` },
        { name: 'robots', content: 'index,follow' },

        //Now for openGraph
        { property: 'og:title', content: `${assetLabel}: ${searchTerm}` },
        { property: 'og:description', content: `Explore free ${assetLabel.toLowerCase()} for “${searchTerm} with DotLottie Player.”` },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: url },
        // Twitter Card
        { name: 'twitter:card', content: '/images/IconScout-colour-logo.png' },
        { name: 'twitter:title', content: `${assetLabel}: ${searchTerm}` },
        { name: 'twitter:description', content: `Free ${assetLabel.toLowerCase()} assets for “${searchTerm} with DotLottie Player.”` }
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": `${assetLabel} search results for ${searchTerm} with DotLottie Player`,
                "url": url,
            })
        }
    ]
})
const playerType = 'dotLottie'
</script>