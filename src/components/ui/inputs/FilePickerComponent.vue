<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { QFileProps, useQuasar } from 'quasar';
import { VNodeRef, ref, watch } from 'vue';

export interface InputFileProps extends QFileProps {
  modelValue: File | null | undefined;
  validate?: boolean;
}

const props = defineProps<InputFileProps>();

const imputRef = ref<VNodeRef | null>(null);

const emit = defineEmits(['update:modelValue']);
const model = useVModel(props, 'modelValue', emit);
const $q = useQuasar();

const alert = () => {
  $q.dialog({
    title: 'Carga de documentos',
    message: 'Solo se admiten archivos: JPG, PNG y PDF',
  });
};

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
  <q-file
    v-bind="$props"
    ref="imputRef"
    v-model="model"
    :label="label"
    color="primary"
    square
    outlined
    accept=".jpg, .jpeg, .png, .pdf"
    :stack-label="$q.screen.lt.md"
    @rejected="alert()"
  >
    <template #prepend>
      <q-icon name="fa-solid fa-paperclip" color="accent" />
    </template>
  </q-file>
</template>
