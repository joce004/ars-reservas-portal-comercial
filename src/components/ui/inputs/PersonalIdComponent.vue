<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { QInputProps } from 'quasar';
import { VNodeRef, ref, watch } from 'vue';

export interface InputProps extends QInputProps {
  modelValue: string | number | null;
  search?: boolean;
  validate?: boolean;
}

const props = defineProps<InputProps>();

const emit = defineEmits(['update:modelValue', 'fetch-person']);
const model = useVModel(props, 'modelValue', emit);

const imputRef = ref<VNodeRef | null>(null);

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
    mask="###-#######-#"
    fill-mask
    unmasked-value
  >
    <template #append>
      <q-separator vertical class="q-mx-sm" />
      <q-btn round dense outline @click="$emit('fetch-person', model)">
        <q-icon name="fa-solid fa-magnifying-glass" padding="none" size="xs">
          <q-tooltip
            anchor="center left"
            self="center right"
            class="bg-primary"
          >
            Consultar Padrón
          </q-tooltip>
        </q-icon>
      </q-btn>
    </template>
  </q-input>
</template>
