<template>
    <div class="w-100 px-5 py-6 border-bottom d-flex flex-column justify-content-center gap-4">
        <div class="w-100 d-flex justify-content-between align-items-center" role="button" @click="visible = !visible">
            <p class="fs-14 fw-semibold me-auto p-0 m-0">
                Categories
            </p>
            <Icon role="button" :name="visible ? 'mdi:chevron-down' : 'mdi:chevron-up'" class="text-grey-1"
                style="font-size: 24px;" :class="visible ? null : 'collapsed'"
                :aria-expanded="visible ? 'true' : 'false'" aria-controls="collapse-category" />
        </div>

        <BCollapse id="collapse-category" v-model="visible" class="mt-1">

            <ul class="w-100 d-flex flex-column gap-2 align-items-center m-0 p-0">
                <li v-for="option in categoryOptions" :key="option"
                    class="w-100 d-flex justify-content-start align-items-start gap-2">
                    <input type="radio" :id="option" :value="option" v-model="selectedCategory"
                        class="form-check-input border-1 border-grey-600 mt-0" name="category-options"
                        style="border-color: #8F95B2;" />
                    <label :for="option" class="text-grey-5 fs-14 fw-normal m-0">
                        {{ option }}
                    </label>
                </li>
            </ul>
        </BCollapse>
    </div>
</template>
<script lang="ts" setup>

const visible = ref(true)
const categoryOptions: string[] = []
const selectedCategory = ref<string>()
</script>