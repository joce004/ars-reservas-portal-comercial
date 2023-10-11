<script setup lang="ts">
import { IColumn } from 'src/models/schemas/IColumn';
import { ref, Ref } from 'vue';

import QuerableRecordsComponent from 'src/components/ui/controls/QuerableRecordComponent.vue';
import PageContainerComponent from 'src/components/ui/containers/PageContainerComponent.vue';
const columns: IColumn[] = [
  {
    name: 'SampleColumn1',
    label: 'SampleColumn1',
    field: (row) => row.name,
    required: true,
    align: 'left',
    sortable: true,
    format: (val) => `${val}`,
    filterable: 'input',
  },
  {
    name: 'SampleColumn2',
    align: 'left',
    label: 'SampleColumn2',
    field: 'SampleColumn2',
    sortable: true,
    filterable: 'input',
  },
  {
    name: 'SampleColumn3',
    label: 'SampleColumn3',
    field: 'SampleColumn3',
    sortable: true,
    filterable: 'input',
  },
  { name: 'SampleColumn4', label: 'SampleColumn4', field: 'carbs', filterable: 'input' },
  { name: 'SampleColumn5', label: 'SampleColumn5', field: 'protein' },
  { name: 'SampleColumn6', label: 'SampleColumn6', field: 'sodium' },
  { name: 'SampleColumn7', label: 'SampleColumn7', field: 'calcium' },
  { name: 'SampleColumn8', label: 'SampleColumn8', field: 'iron' },
];

const data: Ref<object[]> = ref([
  {
    name: 'SampleData1',
    calories: 'SampleData1',
    fat: 'SampleData1',
    carbs: 'SampleData1',
    protein: 'SampleData1',
    sodium: 'SampleData1',
    calcium: 'SampleData1',
    iron: 'SampleData1',
  },
  {
    name: 'SampleData2',
    calories: 'SampleData2',
    fat: 'SampleData2',
    carbs: 'SampleData2',
    protein: 'SampleData2',
    sodium: 'SampleData2',
    calcium: 'SampleData2',
    iron: 'SampleData2',
  },
  {
    name: 'SampleData3',
    calories: 'SampleData3',
    fat: 'SampleData3',
    carbs: 'SampleData3',
    protein: 'SampleData3',
    sodium: 'SampleData3',
    calcium: 'SampleData3',
    iron: 'SampleData3',
  },
  {
    name: 'SampleData4',
    calories: 'SampleData4',
    fat: 'SampleData4',
    carbs: 'SampleData4',
    protein: 'SampleData4',
    sodium: 'SampleData4',
    calcium: 'SampleData4',
    iron: 'SampleData4',
  },
  {
    name: 'SampleData5',
    calories: 'SampleData5',
    fat: 'SampleData5',
    carbs: 'SampleData5',
    protein: 'SampleData5',
    sodium: 'SampleData5',
    calcium: 'SampleData5',
    iron: 'SampleData5',
  },
  {
    name: 'SampleData6',
    calories: 'SampleData6',
    fat: 'SampleData6',
    carbs: 'SampleData6',
    protein: 'SampleData6',
    sodium: 'SampleData6',
    calcium: 'SampleData6',
    iron: 'SampleData6',
  },
  {
    name: 'SampleData7',
    calories: 'SampleData7',
    fat: 'SampleData7',
    carbs: 'SampleData7',
    protein: 'SampleData7',
    sodium: 'SampleData7',
    calcium: 'SampleData7',
    iron: 'SampleData7',
  },
  {
    name: 'SampleData8',
    calories: 'SampleData8',
    fat: 'SampleData8',
    carbs: 'SampleData8',
    protein: 'SampleData8',
    sodium: 'SampleData8',
    calcium: 'SampleData8',
    iron: 'SampleData8',
  },
  {
    name: 'SampleData9',
    calories: 'SampleData9',
    fat: 'SampleData9',
    carbs: 'SampleData9',
    protein: 'SampleData9',
    sodium: 'SampleData9',
    calcium: 'SampleData9',
    iron: 'SampleData9',
  },
  {
    name: 'SampleData10',
    calories: 'SampleData10',
    fat: 'SampleData10',
    carbs: 'SampleData10',
    protein: 'SampleData10',
    sodium: 'SampleData10',
    calcium: 'SampleData10',
    iron: 'SampleData10',
  },
]);
</script>

<template>
  <PageContainerComponent>
    <QuerableRecordsComponent
        :model-value="data"
        :title="'Pólizas'"
        :column-props="columns"
      />
  </PageContainerComponent>

</template>
