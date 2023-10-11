<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { QInputProps } from 'quasar';
import { VNodeRef, ref, watch } from 'vue';

export interface InputProps extends QInputProps {
  modelValue: string | null | undefined;
  validate?: boolean;
}

const props = defineProps<InputProps>();

const imputRef = ref<VNodeRef | null>(null);

const emit = defineEmits(['update:modelValue']);
const model = useVModel(props, 'modelValue', emit);

watch(
  () => props.validate,
  () => {
    imputRef.value ? imputRef.value.validate() : null;
  }
);

watch(
  () => props.rules,
  () => {
    imputRef.value?.resetValidation()
  }
);
</script>

<template>
  <q-input
    v-bind="$props"
    ref="imputRef"
    v-model="model"
    color="primary"
    square
    outlined
  />
</template>
