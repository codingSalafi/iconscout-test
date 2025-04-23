<template>
    <div class="w-100 px-5 py-6 border-bottom d-flex flex-column justify-content-center gap-4">
        <div class="w-100 d-flex justify-content-between align-items-center" role="button" @click="visible = !visible">
            <p class="fs-14 fw-semibold me-auto p-0 m-0">
                Asset
            </p>
            <Icon role="button" :name="visible ? 'mdi:chevron-down' : 'mdi:chevron-up'" class="text-grey-1"
                style="font-size: 24px;" :class="visible ? null : 'collapsed'"
                :aria-expanded="visible ? 'true' : 'false'" aria-controls="collapse-asset" />
        </div>

        <BCollapse id="collapse-asset" v-model="visible" class="mt-1">
            <ul class="w-100 d-flex flex-column gap-2 align-items-center m-0 p-0">
                <li v-for="[label, value] in Object.entries(assetLabelToValue)" :key="value"
                    class="w-100 d-flex justify-content-start align-items-start gap-2">
                    <input type="radio" :id="value" :value="value" v-model="selected" @change="onChange(value)"
                        class="form-check-input border-1 border-grey-600 mt-0" name="asset-options"
                        style="border-color: #8F95B2;" />
                    <label :for="value" class="text-grey-5 fs-14 fw-normal m-0">
                        {{ label }}
                    </label>
                </li>
            </ul>
        </BCollapse>

    </div>
</template>
<script lang="ts" setup>
import { assetLabelToValue } from '~/composables/useAssetMap'

const visible = ref(true)

const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])
const selected = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
    selected.value = val
})

function onChange(value: string) {
    selected.value = value
    emit('update:modelValue', value)
}


</script>