<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { QSelectProps } from 'quasar';
import { ISelectOption } from 'src/models/schemas/IFormSpecification';
import { VNodeRef, onMounted, ref, watch } from 'vue';

export interface InputSelectProps extends QSelectProps {
  modelValue: string | string[] | number | null;
  options: ISelectOption[] | undefined;
  defaultNullText?: string;
  validate?: boolean;
}

const props = defineProps<InputSelectProps>();
const imputRef = ref<VNodeRef | null>(null);

const emit = defineEmits(['update:modelValue']);
const model = useVModel(props, 'modelValue', emit);

model.value = model.value ?? null;

const selectOption = ref<ISelectOption[]>([]);
props.defaultNullText
  ? selectOption.value.push({
      value: null,
      text: `-- ${props.defaultNullText} --`,
    })
  : null;

onMounted(() => {
  selectOption.value = selectOption.value.concat(props.options ?? []);
});

watch(
  () => props.options,
  () => {
    selectOption.value = selectOption.value.concat(props.options ?? []);
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
    imputRef.value?.resetValidation();
  }
);
</script>

<template>
  <q-select
    ref="imputRef"
    v-bind="$props"
    v-model="model"
    multiple
    use-chips
    square
    outlined
    color="primary"
    :options="selectOption"
    option-value="value"
    option-label="text"
    emit-value
    map-options
    stack-label
    :loading="options == null"
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
