<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import FormBtnComponent from 'src/components/ui/buttom/FormBtnComponent.vue';
import DatePickerInput from 'src/components/ui/inputs/DatePickerInput.vue';
import EmailComponent from 'src/components/ui/inputs/EmailComponent.vue';
import FilePickerComponent from 'src/components/ui/inputs/FilePickerComponent.vue';
import InputComponent from 'src/components/ui/inputs/InputComponent.vue';
import MultipleInputComponent from 'src/components/ui/inputs/MultipleInputComponent.vue';
import MultipleSelectComponent from 'src/components/ui/inputs/MultipleSelectComponent.vue';
import NumberInputComponent from 'src/components/ui/inputs/NumberInputComponent.vue';
import PersonalIdComponent from 'src/components/ui/inputs/PersonalIdComponent.vue';
import PhoneComponent from 'src/components/ui/inputs/PhoneComponent.vue';
import RadioComponent from 'src/components/ui/inputs/RadioComponent.vue';
import SelectComponent from 'src/components/ui/inputs/SelectComponent.vue';
import StandarInputComponent from 'src/components/ui/inputs/StandarInputComponent.vue';
import TextAreaComponent from 'src/components/ui/inputs/TextAreaComponent.vue';
import { IFieldSpecification } from 'src/models/schemas/IFormSpecification';
import { VNodeRef, ref, watch } from 'vue';
import ComercialIdComponent from '../inputs/ComercialIdComponent.vue';

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

const emit = defineEmits([
  'update:modelValue',
  'submit',
  'close',
  'fetch-person',
  'fetch-business'
]);
const model = useVModel(props, 'modelValue', emit, {
  deep: true,
  passive: true,
});

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
    sectionsRef.value = props.sections ?? ['default'];
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
    <div class="text-h5 q-pa-sm flex items-baseline">
      <q-icon v-if="icon" class="q-pr-md" size="sm" :name="icon" />
      <span class="font-boldregular">{{ formName }}</span>
    </div>
    <q-separator class="q-mx-sm q-my-md" />
    <template
      v-for="(section, sectionIndex) in sectionsRef"
      :key="sectionIndex"
    >
      <template v-if="section != 'default'">
        <div class="q-pa-sm q-pt-md full-width">
          <span class="text-h6">{{ section.toLocaleUpperCase() }}</span>
          <q-separator />
        </div>
      </template>

      <div class="row">
        <template v-for="(field, key) in formSchema" :key="key">
          <template v-if="field.section == section || !sections">
            <template v-if="field.GetType == 'input'">
              <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-sm">
                <InputComponent
                  v-model="model[key]"
                  :label="field.label"
                  :rules="field.rules"
                  :validate="validate"
                  :input-style="field.style"
                />
              </div>
            </template>
            <template v-if="field.GetType == 'standar-input'">
              <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-sm">
                <StandarInputComponent
                  v-model="model[key]"
                  :label="field.label"
                  :rules="field.rules"
                  :validate="validate"
                  :input-style="field.style"
                />
              </div>
            </template>
            <template v-if="field.GetType == 'personal-id'">
              <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-sm">
                <PersonalIdComponent
                  v-model="model[key]"
                  :label="field.label"
                  :rules="field.rules"
                  :validate="validate"
                  @fetch-person="(val) => emit('fetch-person', val)"
                />
              </div>
            </template>
            <template v-if="field.GetType == 'business-id'">
              <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-sm">
                <ComercialIdComponent
                  v-model="model[key]"
                  :label="field.label"
                  :rules="field.rules"
                  :validate="validate"
                  @fetch-business="(val) => emit('fetch-business', val)"
                />
              </div>
            </template>
            <template v-if="field.GetType == 'number'">
              <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-sm">
                <NumberInputComponent
                  v-model="model[key]"
                  :label="field.label"
                  :rules="field.rules"
                  :validate="validate"
                />
              </div>
            </template>
            <template v-if="field.GetType == 'date-picker'">
              <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-sm">
                <DatePickerInput
                  v-model="model[key]"
                  :label="field.label"
                  :rules="field.rules"
                  :validate="validate"
                />
              </div>
            </template>
            <template v-if="field.GetType == 'select'">
              <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-sm">
                <SelectComponent
                  v-model="model[key]"
                  default-null-text="Seleccione"
                  :label="field.label"
                  :options="field.options ?? []"
                  :rules="field.rules"
                  :validate="validate"
                />
              </div>
            </template>
            <template v-if="field.GetType == 'radio'">
              <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-sm">
                <RadioComponent
                  v-model="model[key]"
                  :options="field.options ?? []"
                >
                  <template #text>
                    {{ field.label }}
                  </template>
                </RadioComponent>
              </div>
            </template>
            <template v-if="field.GetType == 'email'">
              <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-sm">
                <EmailComponent
                  v-model="model[key]"
                  :label="field.label"
                  :rules="field.rules"
                  :validate="validate"
                  :input-style="field.style"
                />
              </div>
            </template>
            <template v-if="field.GetType == 'phone'">
              <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-sm">
                <PhoneComponent
                  v-model="model[key]"
                  :label="field.label"
                  :rules="field.rules"
                  :validate="validate"
                  :input-style="field.style"
                />
              </div>
            </template>
            <template v-if="field.GetType == 'text-area'">
              <div class="col-12 col-lg-6 q-pa-sm">
                <TextAreaComponent
                  v-model="model[key]"
                  :label="field.label"
                  :rules="field.rules"
                  :validate="validate"
                  :input-style="field.style"
                />
              </div>
            </template>
            <template v-if="field.GetType == 'multiple-input'">
              <div class="col-12 q-pa-sm">
                <MultipleInputComponent
                  v-model="model[key]"
                  :label="field.label"
                  :rules="field.rules"
                  :validate="validate"
                >
                  <template #text>
                    {{ field.label }}
                  </template>
                </MultipleInputComponent>
              </div>
            </template>
            <template v-if="field.GetType == 'multiple-select'">
              <div class="col-12 q-pa-sm">
                <MultipleSelectComponent
                  v-model="model[key]"
                  :label="field.label"
                  :options="field.options ?? []"
                  :rules="field.rules"
                  :validate="validate"
                >
                  <template #text>
                    {{ field.label }}
                  </template>
                </MultipleSelectComponent>
              </div>
            </template>
          </template>
        </template>
      </div>
    </template>
    <template v-if="files">
      <div class="text-h6 q-pa-sm q-mt-sm">
        DOCUMENTOS A CARGAR
        <q-separator />
      </div>
      <div class="row">
        <template v-for="(field, key) in formSchema" :key="key">
          <template v-if="field.GetType == 'file-picker'">
            <div class="col-md-4 col-sm-6 col-xs-12 q-pa-sm">
              <FilePickerComponent
                v-model="model[key]"
                :label="field.label"
                :rules="field.rules"
                :validate="validate"
              />
            </div>
          </template>
        </template>
      </div>
    </template>
    <template v-if="$slots.extraFields">
      <q-separator class="q-mx-sm q-mb-md" />
      <slot name="extraFields"></slot>
    </template>
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
  </q-form>
</template>
