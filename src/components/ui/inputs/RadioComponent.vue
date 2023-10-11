<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { ISelectOption } from 'src/models/schemas/IFormSpecification';
import { watch } from 'vue';

const props = defineProps<{
  modelValue: string | null | undefined;
  options: ISelectOption[];
  disable?: boolean;
}>();

const emit = defineEmits(['update:modelValue', 'updated']);
const model = useVModel(props, 'modelValue', emit);

watch(
  () => model.value,
  () => emit('updated')
);
</script>

<template>
  <div class="q-pa-sm" style="outline: 1px solid #bbbbbb; outline-offset: -1px">
    <div
      class="flex items-center fit q-px-sm justify-between no-wrap q-gutter-md"
    >
      <span class="text-subtitle1">
        <slot name="text"></slot>
      </span>
      <div class="flex no-wrap">
        <q-radio
          v-for="(_, index) in options"
          :key="index"
          v-model="model"
          :val="options[index].value"
          :label="<string>options[index].text"
          class="fit"
          :disable="disable"
        />
      </div>
    </div>
  </div>
</template>
