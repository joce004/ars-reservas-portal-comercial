<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { QInputProps } from 'quasar';
import { VNodeRef, ref, watch } from 'vue';

export interface InputProps extends QInputProps {
  modelValue: string | null;
  validate?: boolean;
}

const props = defineProps<InputProps>();

const emit = defineEmits(['update:modelValue']);
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
    imputRef.value?.resetValidation();
  }
);
</script>

<template>
  <q-input
    v-bind="$props"
    ref="imputRef"
    v-model="model"
    :label="label"
    standout="bg-primary text-white"
    readonly
    square
    outlined
  >
    <template #default>
      <div class="flex items-center">
        <q-icon name="event" size="sm" class="cursor-pointer">
          <q-popup-proxy
            v-if="!readonly && !disable"
            cover
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date v-model="model" mask="YYYY-MM-DD">
              <div class="items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </div>
    </template>
  </q-input>
</template>
