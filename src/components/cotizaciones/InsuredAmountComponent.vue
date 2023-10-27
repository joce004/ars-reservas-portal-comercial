<script setup lang="ts">
import { toRefs, useVModel } from '@vueuse/core';
import NumberInputComponent from 'src/components/ui/inputs/NumberInputComponent.vue';
import { CotizacionTipoDistribucion } from 'src/enums/Dictionary.enum';
import { ISelectOption } from 'src/models/schemas/IFormSpecification';
import { IProductQuote } from 'src/models/schemas/IProductQuote.js';
import { getSelectList } from 'src/utils/array';
import { getPG } from 'src/utils/string';

const props = defineProps<{
  modelValue: IProductQuote;
  products: ISelectOption[];
  readonly?: boolean;
  maxInsuredAmount?: number;
}>();

const modes = getSelectList(CotizacionTipoDistribucion);

const emit = defineEmits(['update:modelValue', 'mode']);
const model = useVModel(props, 'modelValue', emit);

const productoRef = toRefs(props).products;
</script>

<template>
  <div class="flex justify-between">
    <div class="text-h6 flex items-center">
      <q-icon name="fa-solid fa-file-circle-plus" size="sm" class="q-pr-md" />
      Distribución de Asegurados / Dependientes
    </div>
    <template v-if="!readonly">
      <q-chip class="q-pa-md" color="accent">
        <span class="text-white q-px-md">
          {{ `${modes.find((x) => x.value == model.DistributionType)?.text}` }}
        </span>
        <q-toggle
          v-model="model.DistributionType"
          :true-value="CotizacionTipoDistribucion.PorTarifa"
          :false-value="CotizacionTipoDistribucion.Global"
          color="white"
          keep-color
          class="q-ma-none q-pa-none"
          left-label
        />
      </q-chip>
    </template>
  </div>
  <q-space class="q-my-lg" />
  <q-markup-table
    separator="cell"
    flat
    bordered
    class="text-primary"
    wrap-cells
  >
    <thead>
      <tr>
        <th style="width: 15%">
          <span class="text-subtitle1">TARIFAS</span>
        </th>
        <th style="width: 15%">
          <span class="text-subtitle1">TIPO PERSONAS</span>
        </th>
        <template v-for="(producto, index) in productoRef" :key="index">
          <th style="width: 17.5%">
            <span class="text-subtitle1">
              {{ producto?.text.toLocaleUpperCase() }}
            </span>
          </th>
        </template>
      </tr>
    </thead>

    <tbody>
      <template
        v-if="model.DistributionType == CotizacionTipoDistribucion.PorTarifa"
      >
        <template v-for="(fee, feeIndex) in model.Fees" :key="feeIndex">
          <tr class="text-center">
            <th
              class="text-left"
              rowspan="2"
              style="border: 1px solid gainsboro"
            >
              <span class="text-subtitle1">
                {{ `${getPG(fee.Name, true, 'F')}` }}
              </span>
            </th>
            <td>
              <span class="text-subtitle1 text-secondary">Asegurados</span>
            </td>
            <template
              v-for="(item, index) in model.Distributions.filter((x) =>
                productoRef.map((x) => x.value).includes(x.ProductCode)
              )"
              :key="index"
            >
              <td>
                <template
                  v-for="(amount, indexAmount) in item.EmployeeAmount"
                  :key="indexAmount"
                >
                  <NumberInputComponent
                    v-if="!readonly && amount.Fee == fee.Code"
                    v-model="amount.Amount"
                    dense
                    borderless
                    input-style="text-align: center"
                    hide-bottom-space
                    :disable="readonly"
                    :min="0"
                    :max="maxInsuredAmount"
                  />
                  <template v-if="readonly && amount.Fee == fee.Code">
                    {{ amount.Amount }}
                  </template>
                </template>
              </td>
            </template>
          </tr>
          <tr class="text-center">
            <td>
              <span class="text-subtitle1 text-accent">Dependientes</span>
            </td>
            <template
              v-for="(item, index) in model.Distributions.filter((x) =>
                productoRef.map((x) => x.value).includes(x.ProductCode)
              )"
              :key="index"
            >
              <td>
                <template
                  v-for="(amount, indexAmount) in item.DepandantAmount"
                  :key="indexAmount"
                >
                  <NumberInputComponent
                    v-if="!readonly && amount.Fee == fee.Code"
                    v-model="amount.Amount"
                    dense
                    borderless
                    input-style="text-align: center"
                    hide-bottom-space
                    :disable="
                      readonly ||
                      (item.EmployeeAmount?.find(
                        (amountOfEmployee) => amountOfEmployee.Fee == amount.Fee
                      )?.Amount ?? 0) <= 0
                    "
                    :rest-value-if="
                      (item.EmployeeAmount?.find(
                        (amountOfEmployee) => amountOfEmployee.Fee == amount.Fee
                      )?.Amount ?? 0) <= 0
                    "
                    :min="0"
                    :max="maxInsuredAmount"
                  />
                  <template v-if="readonly && amount.Fee == fee.Code">
                    {{ amount.Amount }}
                  </template>
                </template>
              </td>
            </template>
          </tr>
        </template>
      </template>
      <template
        v-if="model.DistributionType == CotizacionTipoDistribucion.Global"
      >
        <tr class="text-center">
          <th class="text-left" rowspan="2" style="border: 1px solid gainsboro">
            <div class="text-subtitle1">En todas las Tarifas</div>
          </th>
          <td><span class="text-subtitle1 text-secondary">Asegurados</span></td>
          <template
            v-for="(item, index) in model.Distributions.filter((x) =>
              productoRef.map((x) => x.value).includes(x.ProductCode)
            )"
            :key="index"
          >
            <td>
              <template
                v-for="(amount, indexAmount) in item.EmployeeAmount"
                :key="indexAmount"
              >
                <NumberInputComponent
                  v-if="!readonly"
                  v-model="amount.Amount"
                  dense
                  borderless
                  input-style="text-align: center"
                  hide-bottom-space
                  :disable="readonly"
                  :min="0"
                  :max="maxInsuredAmount"
                />

                <template v-if="readonly">
                  {{ amount.Amount }}
                </template>
              </template>
            </td>
          </template>
        </tr>
        <tr class="text-center">
          <td><span class="text-subtitle1 text-accent">Dependientes</span></td>
          <template
            v-for="(item, index) in model.Distributions.filter((x) =>
              productoRef.map((x) => x.value).includes(x.ProductCode)
            )"
            :key="index"
          >
            <td>
              <template
                v-for="(amount, indexAmount) in item.DepandantAmount"
                :key="indexAmount"
              >
                <NumberInputComponent
                  v-if="!readonly"
                  v-model="amount.Amount"
                  dense
                  borderless
                  input-style="text-align: center"
                  hide-bottom-space
                  :disable="
                    readonly ||
                    (item.EmployeeAmount?.find(
                      (amountOfEmployee) => amountOfEmployee.Fee == amount.Fee
                    )?.Amount ?? 0) <= 0
                  "
                  :rest-value-if="
                    (item.EmployeeAmount?.find(
                      (amountOfEmployee) => amountOfEmployee.Fee == amount.Fee
                    )?.Amount ?? 0) <= 0
                  "
                  :min="0"
                  :max="maxInsuredAmount"
                />
                <template v-if="readonly">
                  {{ amount.Amount }}
                </template>
              </template>
            </td>
          </template>
        </tr>
      </template>
    </tbody>
  </q-markup-table>
</template>
