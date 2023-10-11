//TODO: Componente con logica que sera reutilizada en caracteristica del
cotizador que se desarrollara en el futuro, se mantiene aqui unicamente como
referencia.

<!-- <script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { ValueItemResponseModel } from 'src/api/models/value-item-response-model';
import SelectComponent from 'src/components/ui/inputs/SelectComponent.vue';
import { IProductOptionals } from 'src/models/schemas/IProductOptionals';
import { TipoPlanEnumKeys } from 'src/enums/Dictionary.enum';
import { formatMoney } from 'src/utils/string';

///////////////////////////////
// DATA
///////////////////////////////

const props =
  defineProps<{
    modelValue: IProductOptionals[];
    opcionales: ValueItemResponseModel[];
    tipoPlan: TipoPlanEnumKeys | null;
    productos: string[];
  }>();

const emit = defineEmits(['update:modelValue']);
const model = useVModel(props, 'modelValue', emit, {
  deep: true,
  passive: true,
});
</script>

<template>
  <q-markup-table separator="cell" flat bordered class="text-primary">
    <thead>
      <tr>
        <th style="width: 16%"></th>
        <template v-for="(product, index) in productos" :key="index">
          <th style="width: 21%">
            <span class="text-subtitle1">{{
              product?.toLocaleUpperCase()
            }}</span>
          </th>
        </template>
      </tr>
    </thead>
    <tbody>
      <template
        v-for="(optional, optionalIndex) in opcionales"
        :key="optionalIndex"
      >
        <tr class="text-center">
          <td class="text-left">
            <span class="text-subtitle1">{{ optional.name }}</span>
          </td>
          <template v-for="(_, productIndex) in productos" :key="productIndex">
            <td>
              <SelectComponent
                v-model="model[productIndex].Opcionales[optionalIndex].value"
                dense
                options-html
                default-null-text="Ninguno"
                :options="
                  optional.values?.map((x) => ({
                    value: `${x.id}`,
                    text: `${x.group}  —  ${formatMoney(x.value)}`,
                  })) ?? []
                "
              />
            </td>
          </template>
        </tr>
      </template>
    </tbody>
  </q-markup-table>
</template>
 -->
