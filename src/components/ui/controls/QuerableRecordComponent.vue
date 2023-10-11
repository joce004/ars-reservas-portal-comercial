<script setup lang="ts">
import { useCloned, useVModel } from '@vueuse/core';
import TableComponent from 'src/components/ui/tables/TableComponent.vue';
import { IColumn } from 'src/models/schemas/IColumn';

import FormBtnComponent from 'src/components/ui/buttom/FormBtnComponent.vue';
import DatePickerInput from 'src/components/ui/inputs/DatePickerInput.vue';
import InputComponent from 'src/components/ui/inputs/InputComponent.vue';
import NumberInputComponent from 'src/components/ui/inputs/NumberInputComponent.vue';
import RadioComponent from 'src/components/ui/inputs/RadioComponent.vue';
import SelectComponent from 'src/components/ui/inputs/SelectComponent.vue';
import { ISelectOption } from 'src/models/schemas/IFormSpecification';
import { ref, watch } from 'vue';
import MultipleSelectComponent from 'src/components/ui/inputs/MultipleSelectComponent.vue';
import SectionContainerComponent from '../containers/SectionContainerComponent.vue';

const props = defineProps<{
  modelValue: object[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columnProps?: IColumn<Record<string, any>>[];
  title?: string;
  pagesNumber: number;
  currentPage: number;
  allowDetail?: boolean;
  allowEdit?: boolean;
  allowDelete?: boolean;
  hideFilters?: boolean;
}>();

const emit = defineEmits(['filter', 'detail', 'edit', 'delete']);
const model = useVModel(props, 'modelValue');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { cloned: filter, sync: resetFilter } = useCloned<{ [key: string]: any }>(
  {}
);
const visibleColumnsOpt = ref<ISelectOption[]>([]);
const visibleColumns = ref<string[]>([]);

const setter = () => {
  filter.value = {};
  visibleColumnsOpt.value = [];
  visibleColumns.value = [];
  if (props.columnProps && visibleColumnsOpt.value) {
    if (!props.hideFilters) {
      props.columnProps
        .filter((x) => x.filterable != null && !(x.hide) )
        .forEach((x) => (filter.value[x.name] = null));
    }

    visibleColumnsOpt.value = props.columnProps
      .filter((x) => x.required != true  && !(x.hide))
      .map((x) => ({ value: x.name, text: x.label }));

    props.columnProps
      .filter((x) => x.required != true  && !(x.hide))
      .forEach((x) => visibleColumns.value.push(x.name));
  }
};

const clearFilter = () => {
  if (!props.hideFilters) {
    resetFilter();
    if (props.columnProps && visibleColumnsOpt.value)
      props.columnProps
        .filter((x) => x.filterable != null)
        .forEach((x) => (filter.value[x.name] = null));
    emit('filter', { query: filter.value });
  }
};

const execFilter = (number?: number) => {
  emit('filter', { page: number, query: filter.value });
};

setter();

watch(
  () => props.columnProps,
  () => setter()
);
</script>

<template>
  <template v-if="!hideFilters">
    <SectionContainerComponent>
      <q-expansion-item class="full-width" header-class="text-primary q-pa-none">
        <template #header>
          <q-item-section>
            <span class="flex items-center text-h6 font-semiboldregular">
              <q-icon name="fa-solid fa-filter" size="1.1rem" class="q-mr-md" />
              Buscar {{ title }}
            </span>
          </q-item-section>
        </template>
        <q-card>
          <q-separator class="q-mx-md" />

          <q-card-section>
            <div class="row">
              <template v-for="(field, index) in columnProps" :key="index">
                <template v-if="field.filterable == 'input'">
                  <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-sm">
                    <InputComponent
                      v-model="filter[field.name]"
                      :label="field.label"
                      hide-bottom-space
                    />
                  </div>
                </template>
                <template v-if="field.filterable == 'number'">
                  <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-sm">
                    <NumberInputComponent
                      v-model="filter[field.name]"
                      :label="field.label"
                    />
                  </div>
                </template>
                <template v-if="field.filterable == 'date-picker'">
                  <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-sm">
                    <DatePickerInput
                      v-model="filter[field.name]"
                      :label="field.label"
                      hide-bottom-space
                    />
                  </div>
                </template>
                <template v-if="field.filterable == 'select'">
                  <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-sm">
                    <SelectComponent
                      v-model="filter[field.name]"
                      :label="field.label"
                      :options="field.options ?? []"
                      default-null-text="Ninguno"
                      hide-bottom-space
                    />
                  </div>
                </template>
                <template v-if="field.filterable == 'radio'">
                  <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-sm">
                    <RadioComponent
                      v-model="filter[field.name]"
                      :options="field.options ?? []"
                    >
                      <template #text>
                        {{ field.label }}
                      </template>
                    </RadioComponent>
                  </div>
                </template>
              </template>
              <div class="col-12 q-pa-sm">
                <MultipleSelectComponent
                  v-model="visibleColumns"
                  prefix="Mostrar:"
                  :options="visibleColumnsOpt"
                  class="fit q-pa-none"
                  hide-bottom-space
                />
              </div>
            </div>
          </q-card-section>

          <q-separator class="q-mx-md" />
          <q-card-actions class="q-pa-md">
            <FormBtnComponent
              label="Buscar"
              icon="fa-solid fa-magnifying-glass"
              outlined
              @click="execFilter"
            ></FormBtnComponent>
            <FormBtnComponent
              label="Limpiar"
              icon="fa-solid fa-eraser"
              outlined
              @click="clearFilter"
            ></FormBtnComponent>
          </q-card-actions>
        </q-card>
      </q-expansion-item>
    </SectionContainerComponent>
  </template>
  <div :class="`q-my-md q-pa-md bg-white shadow-8 ${hideFilters ? 'q-px-lg' : 'q-mt-md'}`">
    <template v-if="hideFilters">
      <q-item-section >
        <span class="flex items-center text-h5 font-semiboldregular q-my-md">
           {{title}}
        </span>
        <q-separator />
      </q-item-section>
    </template>
    <TableComponent
      v-if="columnProps"
      :model-value="model"
      :column-props="columnProps"
      :visible-columns="visibleColumns"
      :pages-number="pagesNumber"
      :current-page="currentPage"
      :allow-detail="allowDetail"
      :allow-edit="allowEdit"
      :allow-delete="allowDelete"

      @detail="(value) => emit('detail', value)"
      @edit="(value) => emit('edit', value)"
      @delete="(value) => emit('delete', value)"
      @page-change="execFilter"
    />
  </div>
</template>
