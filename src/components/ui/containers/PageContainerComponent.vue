<script setup lang="ts">
import { UserType } from 'src/api';
import { useRoute } from 'vue-router';

const props = defineProps<{
  parent?: string;
  userType?: UserType;
}>();

const route = useRoute();

const page: string =
  typeof route.meta.displayName == 'function'
    ? route.meta.displayName(props?.userType ?? 'Business')
    : route.meta.displayName;
const pageIcon: string = route.meta.icon as string;


</script>

<template>
  <div class="relative-position fit">

      <div
        class="bg-white full-width flex justify-between items-center q-pa-lg shadow-8 absolute-top"
        style="z-index: 1"
      >
        <div class="text-h5 font-semiboldregular flex items-center text-primary">
          <q-icon class="q-pr-md" size="sm" :name="pageIcon" />
          {{ page }}
        </div>
        <div class="flex justify-end">
          <slot name="actions"></slot>
        </div>
      </div>
      <q-space class="q-py-md" />
      <q-space class="q-py-md" />
      <div :class="`${$q.screen.gt.sm ? 'q-pa-xl' : 'q-pa-md'}`">
        <slot></slot>
      </div>
  </div>
</template>
