<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { QSelectProps } from 'quasar';
import { VNodeRef, ref, watch } from 'vue';

export interface InputSelectProps extends QSelectProps {
  modelValue: string | string[] | number | null;
  defaultNullText?: string;
  validate?: boolean;
}

const props = defineProps<InputSelectProps>();
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
    imputRef.value?.resetValidation();
  }
);
</script>

<template>
  <q-select
    ref="imputRef"
    v-bind="$props"
    v-model="model"
    square
    outlined
    color="primary"
    use-input
    use-chips
    multiple
    hide-dropdown-icon
    input-debounce="0"
    new-value-mode="add-unique"
  />
</template>
