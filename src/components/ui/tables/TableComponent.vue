<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { IColumn } from 'src/models/schemas/IColumn';
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: object[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columnProps: IColumn<Record<string, any>>[];
  visibleColumns: string[];
  pagesNumber: number;
  currentPage: number;
  allowDetail?: boolean;
  allowEdit?: boolean;
  allowDelete?: boolean;
}>();

const emit = defineEmits(['detail', 'edit', 'delete', 'pageChange']);

const model = useVModel(props, 'modelValue');
const visibleColumnsRef = useVModel(props, 'visibleColumns');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: IColumn<Record<string, any>>[] = [];
const setter = () => {
  props.columnProps.filter(column => !column.hide).forEach((x) =>
    columns.push({
      name: x.name,
      label: x.label,
      field: x.field,
      required: x.required ?? false,
      align: x.align ?? 'left',
      sortable: x.sortable ?? true,
      sort: x.sort ?? undefined,
      sortOrder: x.sortOrder ?? 'ad',
      format: x.format ?? undefined,
      style: x.style ?? '',
      classes: x.classes ?? 'font-mediumregular',
      headerStyle: x.headerStyle ?? '',
      headerClasses: x.headerClasses ?? 'font-boldregular',
    })
  );

  columns.push({
    name: 'actions',
    label: '',
    field: (row) => {
      return row['id'];
    },
    required: true,
  });
};

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: props.currentPage,
  rowsPerPage: 25,
});

setter();

watch(
  () => props.columnProps,
  () => setter()
);
</script>

<template>
  <q-table
    :rows="model"
    :pagination="{ rowsPerPage: pagination.rowsPerPage }"
    :columns="columns"
    row-key="name"
    :visible-columns="visibleColumnsRef"
    class="text-primary"
    flat
    hide-pagination
  >
    <template #body-cell-actions="fields">
      <q-td :props="fields">
        <div>
          <q-btn
            v-if="allowDetail"
            round
            color="dark"
            size="sm"
            class="q-mx-xs"
            square
            outline
            @click="emit('detail', fields.value)"
          >
            <slot>
              <q-icon name="fa-solid fa-magnifying-glass" size="xs" />
            </slot>
          </q-btn>
          <q-btn
            v-if="allowEdit"
            round
            color="dark"
            size="sm"
            class="q-mx-xs"
            square
            outline
            @click="emit('edit', fields.value)"
          >
            <slot>
              <q-icon name="fa-solid fa-pen-to-square" size="xs" />
            </slot>
          </q-btn>
          <q-btn
            v-if="allowDelete"
            round
            color="dark"
            size="sm"
            class="q-mx-xs"
            square
            outline
            @click="emit('delete', fields.value)"
          >
            <slot>
              <q-icon name="fa-solid fa-trash-can" size="xs" />
            </slot>
          </q-btn>
        </div>
      </q-td>
    </template>
    <template #no-data>
      <div class="full-width row flex-center text-accent q-gutter-sm">
        <q-icon size="2em" name="fa-solid fa-circle-exclamation" />
        <span>Sin datos que mostrar.</span>
      </div>
    </template>
  </q-table>
  <q-separator />
  <template v-if="pagesNumber > 1">
    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        size="md"
        active-color="primary"
        class="font-semiboldregular"
        @update:model-value="emit('pageChange', pagination.page)"
      />
    </div>
  </template>
</template>
