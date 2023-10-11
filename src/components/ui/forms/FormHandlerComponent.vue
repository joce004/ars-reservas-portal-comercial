<script setup lang="ts">
import FormBtnComponent from 'src/components/ui/buttom/FormBtnComponent.vue';
import { IFieldSpecification } from 'src/models/schemas/IFormSpecification';
import { VNodeRef, ref, watch } from 'vue';

const props = defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelValue: { [Key: string]: any };
  formSchema: { [Key: string]: IFieldSpecification };
  formName: string;
  files?: boolean;
  controls?: boolean;
  submitLabel?: string;
  icon?: string;
  sections?: string[];
}>();

const emit = defineEmits(['update:modelValue', 'submit', 'close']);


const form = ref<VNodeRef | null>(null);
const validate = ref<boolean>(false);
const sectionsRef = ref<string[]>(props.sections ?? ['default']);
const validateForm = async () => {
  const result = await form.value.validate();
  if (result) emit('submit');
};

const validateFormReset = () => {
  validate.value = false;
};

watch(
  () => props.formSchema,
  () => {
    form.value.reset();
    sectionsRef.value = (props.sections ?? ['default']);
  }
);

defineExpose({
  validateForm,
  validateFormReset,
});
</script>

<template>
  <!-- TODO: Buscar una manera mas elegante de hacer el prevent default -->
  <q-form ref="form" greedy @submit="() => null">
    <div class="q-pa-lg bg-white">
      <div class="text-h5 q-pa-sm  flex items-baseline">
        <q-icon v-if="icon" class="q-pr-md" size="sm" :name="icon" />
        {{ formName }}
      </div>
      <q-separator class="q-mx-sm q-my-md" />
      <div class="row">
        <template v-if="$slots.form">
          <slot name="form"></slot>
        </template>
      </div>
      <template v-if="controls">
        <q-separator class="q-mx-sm q-my-md" />
        <div class="flex justify-between q-pa-sm">
          <FormBtnComponent
            label="Cerrar"
            color="primary"
            outline
            @click="emit('close')"
          />
          <FormBtnComponent
            submit
            :label="submitLabel ?? 'Crear'"
            @click="validateForm"
          />
        </div>
      </template>
    </div>
  </q-form>
</template>
