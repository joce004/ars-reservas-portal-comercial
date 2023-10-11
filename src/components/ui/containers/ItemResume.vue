<script setup lang="ts">
defineProps<{
    title: string;
    value: string | number | null | undefined;
    htmlClass: string;
    type: 'v' | 'h';
  }>();
</script>

<template>
  <div>
    <template v-if="type == 'v'">
      <div class="q-pa-md full-width flex">
        <div :class="`full-width ${htmlClass}`">
          <strong class="text-secondary q-pr-md">{{ title }}:</strong>
          <q-separator />
          <div class="font-boldregular q-pr-md">{{ value }}</div>
        </div>
      </div>
    </template>
    <template v-if="type == 'h'">
      <span :class="`q-pa-sm ${htmlClass}`">
        <strong class="text-primary">{{ title }}:</strong>
        <div class="q-px-sm">{{ value }}</div>
      </span>
    </template>
  </div>
</template>
