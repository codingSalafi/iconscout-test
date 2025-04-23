<template>
    <div class="w-100 bg-white-4">
        <div>
            <BContainer class="d-flex flex-column justify-content-center gap-6 p-6 ">
                <div class="w-100 d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center gap-4 flex-wrap">
                        <NuxtImg src="/images/IconScout-colour-logo.svg" class="" width="185" />
                        <p class="fs-14 text-black">Design Resource Marketplace</p>
                    </div>

                    <p class="fs-14 text-black">
                        <span class="text-primary">5,663,871 </span>graphics resources & counting
                    </p>
                </div>
                <hr class="bg-grey-3">
                <BRow class="g-6 justify-content-between ">
                    <BCol v-for="item in items" cols="6" sm="6" md="4" lg="3" xl="2">

                        <p class="text-grey-5 fs-14 fw-bold">
                            {{ item.category }}
                        </p>
                        <div class="mt-3 p-0 d-flex flex-column align-items-start gap-2">
                            <div v-for="link in item.items" class="w-100  fs-14 text-gray-400 text-decoration-none">
                                <a href="#" class="text-gray-400 text-start text-decoration-none">{{ link }}</a>
                            </div>
                        </div>

                    </BCol>
                    <BCol cols="12" sm="6" md="4" lg="3" xl="2" class="d-flex flex-column gap-6">
                        <div class="d-flex flex-column gap-3">
                            <p class="text-grey-5 fs-14 fw-bold">
                                Get IconScout for Desktop
                            </p>
                            <div class="d-flex justify-content-start align-items-center text-grey-3">
                                <div class="border border-white-6 p-3">
                                    <Icon name="mdi:apple" size="24" />
                                </div>
                                <div class="border border-white-6 p-3">
                                    <Icon name="mdi:microsoft" size="24" />
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-column justify-content-start align-items-start">
                            <p class="text-grey-5 fs-14 fw-bold">
                                Get LottieFiles mobile app
                            </p>
                            <div class="d-flex justify-content-start align-items-center gap-3 ">
                                <div class="d-flex justify-content-center align-items-center gap-2 bg-black px-4 py-2 rounded-3 text-white"
                                    style="min-width: 118px;">
                                    <Icon name="mdi:apple" size="32" />
                                    <div class="d-flex flex-column gap-0">
                                        <p class="fs-12 text-nowrap p-0 m-0">
                                            Download on the
                                        </p>
                                        <p class="fs-6 p-0 m-0">
                                            App Store
                                        </p>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center align-items-center gap-2 bg-black px-4 py-2 rounded-3 text-white"
                                    style="min-width: 118px;">
                                    <Icon name="logos:google-play-icon" size="32" />
                                    <div class="d-flex flex-column gap-0">
                                        <p class="fs-12 text-nowrap p-0 m-0">
                                            GET IT ON
                                        </p>
                                        <p class="fs-6 text-nowrap p-0 m-0">
                                            Google Play
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-column gap-3">
                            <p class="text-grey-5 fs-14 fw-bold">
                                Follow us
                            </p>
                            <div class="d-flex justify-content-start align-items-center text-grey-3">
                                <div class="border border-white-6 p-4">
                                    <Icon name="fe:facebook" size="24" />
                                </div>
                                <div class="border border-white-6 p-4">
                                    <Icon name="mdi:instagram" size="24" />
                                </div>
                                <div class="border border-white-6 p-4">
                                    <Icon name="mdi:twitter" size="24" />
                                </div>
                                <div class="border border-white-6 p-4">
                                    <Icon name="mdi:linkedin" size="24" />
                                </div>
                                <div class="border border-white-6 p-4">
                                    <Icon name="mdi:dribbble" size="24" />
                                </div>
                            </div>
                        </div>
                    </BCol>
                </BRow>
            </BContainer>
        </div>
        <div class="w-100 bg-white-5 p-6">
            <BContainer>
                <div class="d-flex justify-content-between text-gray-400 flex-wrap">
                    <div class="d-flex">
                        <Icon name="mdi:copyright" />
                        <p class="fs-14 text-nowrap">
                            {{ currentYear }} Design Barn Inc. Made with <span>
                                <Icon name="mdi:heart" style="background-color: red;" />
                            </span> from India
                        </p>
                    </div>
                    <div class="d-flex justify-content-start align-items-center gap-6 ">
                        <div class="d-flex justify-content-center align-items-center gap-2 px-4 py-2 rounded-3 text-gray-400"
                            style="min-width: 118px;">
                            <Icon name="uis:lock" size="32" style="background-color: #E7B549;" />
                            <div class="d-flex flex-column gap-0">
                                <p class="fs-14 text-nowrap p-0 m-0" style="font-style: italic; font-weight: 200;">
                                    Secure Payment
                                </p>
                            </div>
                        </div>
                        <Icon name="logos:stripe" size="32" />

                    </div>
                </div>
            </BContainer>
        </div>
    </div>
</template>
<script setup lang="ts">

const items = ref([
    {
        "category": "Graphic Resources",
        "items": [
            "Free Icons",
            "Free Emoji Icons",
            "Free Logo Icons",
            "iOS Icons",
            "Sticker Icons",
            "Gradient Icons",
            "Curated Bundle",
            "Calendar of Festival",
            "Free Assets of the day",
            "Explore Design Assets"
        ]
    },
    {
        "category": "Products",
        "items": [
            "Unicon Icon Font",
            "Color editor",
            "Apps & Plugins",
            "Hire designers",
            "IconScout API",
            "Top Illustrations",
            "Top 3D Assets",
            "Reverse Image Search",
            "Unicon Plugin for Figma"
        ]
    },
    {
        "category": "Company",
        "items": [
            "Blog",
            "About",
            "Access features",
            "Sell on IconScout",
            "Startup program",
            "We’re hiring"
        ]
    },
    {
        "category": "Legal",
        "items": [
            "Terms of use",
            "Privacy policy",
            "License agreement",
            "Contributor terms",
            "Support center",
            "Join discord community"
        ]
    }
])

const currentYear = new Date().getFullYear();
</script>