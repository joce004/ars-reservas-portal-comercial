<script setup lang="ts">
import { toRefs, useVModel } from '@vueuse/core';
import { QSelectProps } from 'quasar';
import { ISelectOption } from 'src/models/schemas/IFormSpecification';
import { VNodeRef, ref, watch } from 'vue';

export interface InputSelectProps extends QSelectProps {
  modelValue: string | string[] | number | null | undefined;
  options: ISelectOption[] | undefined;
  defaultNullText?: string;
  validate?: boolean;
}

const props = defineProps<InputSelectProps>();
const imputRef = ref<VNodeRef | null>(null);

const emit = defineEmits(['update:modelValue']);
const model = useVModel(props, 'modelValue', emit);

const optionsRef = toRefs(props).options;

const setDefault = () => {
  if (props.options?.length) {
    props.defaultNullText
      ? optionsRef.value?.unshift({
          value: null,
          text: `-- ${props.defaultNullText} --`,
        })
      : undefined;
  }
};

setDefault();

watch(
  () => props.options,
  () => {
    setDefault();
  }
);
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

const filter = ref<(val: string, update: (p: () => void) => void) => void>();
</script>

<template>
  <q-select
    ref="imputRef"
    v-bind="$props"
    v-model="model"
    square
    outlined
    color="primary"
    :options="optionsRef"
    option-value="value"
    option-label="text"
    emit-value
    map-options
    stack-label
    :loading="!optionsRef"
    :use-input="filter != null"
    :hide-selected="filter != null"
    :fill-input="filter != null"
    @filter="filter"
  >
    <template #no-option>
      <q-item>
        <q-item-section class="text-italic text-grey">
          Sin opciones que mostrar.
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
