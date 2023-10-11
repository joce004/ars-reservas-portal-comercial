<script setup lang="ts">
import { useVModel } from '@vueuse/core';

const props = defineProps<{
  modelValue: boolean;
}>();

const model = useVModel(props, 'modelValue');
</script>

<template>
  <q-dialog v-model="model" persistent>
    <q-card
      class="q-pa-md"
      :style="'min-width: ' + ($q.screen.gt.md == true ? '75vw' : '90vw')"
    >
      <slot></slot>
    </q-card>
  </q-dialog>
</template>
