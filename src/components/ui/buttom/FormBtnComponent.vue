<script setup lang="ts">
defineProps<{
  label?: string;
  icon?: string;
  color?: string;
  outlined?: boolean;
  disabled?: boolean;
  submit?: boolean;
  to?: string;
}>()

defineEmits(['click']);
</script>

<template>
  <q-btn
    square
    :color="color ?? 'primary'"
    :disable="disabled"
    :outline="outlined"
    unelevated
    class=" font-boldregular "
    :type="submit ? 'submit' : undefined "
    :to="to"
    @click="$emit('click')">
    <slot>
      <div class="flex items-center q-px-sm">
      <q-icon v-if="icon" :name="icon" size="xs" :class="`${ label ? 'q-mr-sm' : ''}`"/>
      {{ label }}
      </div>
    </slot>
  </q-btn>
</template>
