<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { QInputProps } from 'quasar';
import { VNodeRef, ref, watch } from 'vue';

export interface InputProps extends QInputProps {
  modelValue: number | null | undefined;
  validate?: boolean;
  restValueIf?: boolean;
  min?: number;
  max?: number;
}

const props = defineProps<InputProps>();

const imputRef = ref<VNodeRef | null>(null);

const emit = defineEmits(['update:modelValue']);
const model = useVModel(props, 'modelValue', emit);

watch(
  () => props.restValueIf,
  () => {
    props.restValueIf && (model.value = 0);
  }
);
watch(
  () => props.validate,
  () => {
    imputRef.value ? imputRef.value.validate() : null;
  }
);


watch(
  () => model.value,
  () => {
    (model.value ?? 0) < (props.min ?? 0) ? (model.value = (props.min ?? 0)) : undefined;
    props.max && +(model.value ?? 0) > props.max ? (model.value = props.max) : undefined;
  }
);


watch(
  () => props.rules,
  () => {
    imputRef.value?.resetValidation();
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
    :outlined="!borderless"
    type="number"
  />
</template>
