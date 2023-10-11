<script setup lang="ts">

defineProps<{
  label?: string ;
  icon?: string;
  color?: string;
  disabled?: boolean;
  to?: string;
}>();

defineEmits(['click']);
</script>

<template>
  <q-btn
    square
    outline
    :color="color ?? 'primary'"
    :disable="disabled"
    unelevated
    class="font-boldregular "
    :to="to"
    @click="$emit('click')">
    <slot>
      <div :class="`${ label ? 'q-px-xs': ''} flex items-center`" >
      <q-icon v-if="icon" :name="icon" size="xs" :class="`${ label ? 'q-mr-sm': ''}`"/>
      {{ label }}
      </div>
    </slot>
  </q-btn>

</template>
