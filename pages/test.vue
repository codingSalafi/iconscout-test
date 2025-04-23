<template>
    <BContainer class="py-5">
        <h1 class="mb-3">Bootstrap‑VueNext + Lottie player</h1>
        <BRow>
            <BCol cols="3" v-for="n in 4" :key="n">
                <BCard no-body>
                    <client-only>
                        <lottie-player autoplay loop src="https://assets9.lottiefiles.com/packages/lf20_touohxv0.json"
                            style="height:140px" />
                    </client-only>
                    <BCardBody>
                        <BCardText>Card {{ n }}</BCardText>
                    </BCardBody>
                </BCard>
            </BCol>
        </BRow>
    </BContainer>
</template>
<script setup lang="ts">
</script>