<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import FormBtnComponent from '../buttom/FormBtnComponent.vue';

const props =
  defineProps<{
    modelValue?: boolean;
    title?: string;
    icon?: string;
  }>();

const emit = defineEmits(['update:modelValue', 'confirm', 'close']);

const model = useVModel(props, 'modelValue', emit);
</script>

<template>
  <q-dialog v-model="model" persistent>
    <q-card
      :style="'min-width: ' + ($q.screen.gt.md == true ? '75vw' : '90vw')"
    >
      <q-card-section class="fit flex justify-between items-center">
        <div class="text-h6 text-bold">
          <q-icon
            v-if="icon"
            :name="'fa-solid ' + icon"
            color="primary"
            size="sm"
            class="q-mx-sm"
          ></q-icon>
          {{ title }}
        </div>
        <q-btn
          v-close-popup
          icon="fa-solid fa-xmark"
          flat
          round
          @click="$emit('close')"
        />
      </q-card-section>

      <q-separator />

      <q-card-section class="q-py-lg">
        <slot name="content"></slot>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="text-primary q-pa-md">
        <FormBtnComponent
          label="Cerrar"
          color="primary"
          @click="$emit('close')"
        />
        <FormBtnComponent
          v-if="false"
          label="Guardar"
          color="accent"
          @click="$emit('confirm')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
