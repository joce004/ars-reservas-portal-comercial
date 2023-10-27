<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import SelectComponent from 'src/components/ui/inputs/SelectComponent.vue';
import {
  CotizacionDistribucion,
  CotizacionTipoDistribucion,
  TipoPlan,
  TipoPlanType,
} from 'src/enums/Dictionary.enum';
import { ISelectOption } from 'src/models/schemas/IFormSpecification';
import {
  IFee,
  IProductQuote,
  IProductTotal,
} from 'src/models/schemas/IProductQuote.js';
import { formatMoney, getPG } from 'src/utils/string';

const props = defineProps<{
  modelValue: IProductQuote;
  totals: IProductTotal[];
  typePlan: TipoPlanType;
  products: ISelectOption[];
  forAll?: boolean;
  readonly?: boolean;
}>();

const emit = defineEmits(['update:modelValue', 'mode']);
const model = useVModel(props, 'modelValue', emit);

const periodicityOptions: ISelectOption[] = [
  { text: 'Mensuales', value: 1 },
  { text: 'Bimestrales', value: 2 },
  { text: 'Trimestrales', value: 3 },
  { text: 'Cuatrimestrales', value: 4 },
  { text: 'Semestrales', value: 6 },
  { text: 'Anuales', value: 12 },
];

const countForColectivePrincipals = (plan: string, fee: string) => {
  if (model.value.DistributionType == CotizacionTipoDistribucion.Global)
    fee = CotizacionDistribucion.Global;
  let amount = 0;
  amount = +(
    model.value.Distributions.find(
      (x) => x.ProductCode == plan
    )?.EmployeeAmount?.find((x) => x.Fee == fee)?.Amount ?? 0
  );
  return amount;
};

const countForColectiveDependants = (plan: string, fee: string) => {
  if (model.value.DistributionType == CotizacionTipoDistribucion.Global)
    fee = CotizacionDistribucion.Global;
  let amount = 0;
  amount = +(
    model.value.Distributions.find(
      (x) => x.ProductCode == plan
    )?.DepandantAmount?.find((x) => x.Fee == fee)?.Amount ?? 0
  );
  return amount;
};

const total = (
  totalIndex: number,
  feeCode: string,
  total: IProductTotal,
  subject: 'principal' | 'dependant' | 'all'
) => {
  const principalOptionalTotal =
    props.totals[totalIndex].generalValues[feeCode] +
    props.totals[totalIndex].principalValues[feeCode];

  const dependantOptionalTotal =
    props.totals[totalIndex].generalValues[feeCode] +
    props.totals[totalIndex].dependantValues[feeCode];

  const principalAmount =
    props.typePlan == TipoPlan.Colectivo
      ? countForColectivePrincipals(total.code, feeCode)
      : 1;

  const dependantAmount =
    props.typePlan == TipoPlan.Colectivo
      ? countForColectiveDependants(total.code, feeCode)
      : model.value.PersonsAmount - 1;

  const productFee =
    model.value.Products.find((product) => product.Code == total.code)
      ?.Fees.find((item) => item.Code == feeCode)
      ?.Costs.find((item) => item.Type == props.typePlan)
      ?.Value ?? 0;

  const principalTotalFee =
    (principalOptionalTotal + productFee) *
    (props.forAll ? principalAmount : 1) *
    (props.forAll ? model.value.Periodicity : 1);

  const dependanttotalFee =
    (dependantOptionalTotal + productFee) *
    (props.forAll ? dependantAmount : 1) *
    (props.forAll ? model.value.Periodicity : 1);

  if (subject == 'principal') {
    return principalTotalFee;
  }

  if (subject == 'dependant') {
    return dependanttotalFee;
  }

  if (subject == 'all') {
    return principalTotalFee + dependanttotalFee;
  }
};

const granTotal = (fee: IFee) => {
  const principalExtraTotal = props.totals.reduce(
    (acumulator, adder) =>
      acumulator +
      adder.principalValues[fee.Code] *
        countForColectivePrincipals(adder.code, fee.Code),
    0
  );

  const dependantExtraTotal = props.totals.reduce(
    (acumulator, adder) =>
      acumulator +
      adder.dependantValues[fee.Code] *
        countForColectiveDependants(adder.code, fee.Code),
    0
  );

  const generalExtraTotal = props.totals.reduce(
    (acumulator, adder) =>
      acumulator +
      adder.generalValues[fee.Code] *
        countForColectivePrincipals(adder.code, fee.Code) +
      adder.generalValues[fee.Code] *
        countForColectiveDependants(adder.code, fee.Code),
    0
  );

  const TotalPrincipalProducts = model.value.Products.reduce(
    (acumulator, adder) =>
      acumulator +
      (adder.Fees.find((item) => item.Code == fee.Code)?.Costs.find(
        (cost) => cost.Type == props.typePlan.toLowerCase()
      )?.Value ?? 0) *
        countForColectivePrincipals(adder.Code, fee.Code),
    0
  );

  const TotalDependantProducts = model.value.Products.reduce(
    (acumulator, adder) =>
      acumulator +
      (adder.Fees.find((item) => item.Code == fee.Code)?.Costs.find(
        (cost) => cost.Type == props.typePlan.toLowerCase()
      )?.Value ?? 0) *
        countForColectiveDependants(adder.Code, fee.Code),
    0
  );

  const grandTotal =
    generalExtraTotal +
    principalExtraTotal +
    TotalPrincipalProducts +
    dependantExtraTotal +
    TotalDependantProducts;

  return grandTotal * (props.forAll ? model.value.Periodicity : 1);
};
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="text-h6">
      <q-icon name="fa-solid fa-coins" size="sm" class="q-pr-md" />
      <span>
        {{
          forAll
            ? typePlan.toLowerCase() == TipoPlan.Individual
              ? `Totales de las Cuotas para (${model.PersonsAmount}) Personas`
              : `Totales de las Cuotas`
            : 'Totales de las Tarifas más Servicios Opcionales'
        }}
      </span>
    </div>
    <template v-if="forAll">
      <div class="flex no-wrap items-center">
        <span class="text-subtitle1 q-mr-sm">En Periodos:</span>
        <SelectComponent
          v-if="!readonly"
          v-model="model.Periodicity"
          :options="periodicityOptions"
          dense
          hide-bottom-space
          :disable="readonly"
        />
        <q-chip v-if="readonly" color="accent" text-color="white">
          {{
            periodicityOptions
              .find((period) => period.value == model.Periodicity)
              ?.text.toUpperCase()
          }}
        </q-chip>
      </div>
    </template>
  </div>

  <q-space class="q-my-lg" />

  <q-markup-table separator="cell" flat bordered class="text-primary">
    <thead>
      <tr>
        <th style="width: 15%"><span class="text-subtitle1">TARIFAS</span></th>
        <th style="width: 15%">
          <span class="text-subtitle1">TIPO PERSONAS</span>
        </th>
        <template v-for="(producto, index) in products" :key="index">
          <th style="width: 17.5%">
            <span class="text-subtitle1">
              {{ producto?.text.toLocaleUpperCase() }}
            </span>
          </th>
        </template>
      </tr>
    </thead>

    <tbody>
      <template v-for="(fee, feeIndex) in modelValue.Fees" :key="feeIndex">
        <tr class="text-center">
          <th
            class="text-left"
            :rowspan="forAll ? 3 : 2"
            style="border: 1px solid gainsboro"
          >
            <span class="text-subtitle1">
              {{ `${getPG(fee.Name, true, 'F')}` }}
            </span>
          </th>
          <td>
            <span class="text-subtitle1 text-secondary">
              {{
                typePlan.toLowerCase() == TipoPlan.Individual
                  ? 'Asegurado'
                  : 'Asegurados'
              }}
            </span>
          </td>
          <template v-for="(item, index) in totals" :key="index">
            <td>
              <q-chip color="secondary" text-color="white">
                {{ formatMoney(total(index, fee.Code, item, 'principal')) }}
              </q-chip>
            </td>
          </template>
        </tr>
        <tr class="text-center">
          <td>
            <span class="text-subtitle1 text-accent">Dependientes</span>
          </td>
          <template v-for="(item, index) in totals" :key="index">
            <td>
              <q-chip color="secondary" text-color="white">
                {{ formatMoney(total(index, fee.Code, item, 'dependant')) }}
              </q-chip>
            </td>
          </template>
        </tr>
        <template v-if="forAll">
          <tr class="text-center">
            <td class="text-center">
              <span class="text-subtitle1 text-primary">Total</span>
            </td>
            <template v-if="typePlan == TipoPlan.Individual">
              <template v-for="(item, index) in totals" :key="index">
                <td>
                  <q-chip color="secondary" text-color="white">
                    {{ formatMoney(total(index, fee.Code, item, 'all')) }}
                  </q-chip>
                </td>
              </template>
            </template>
            <template v-if="typePlan == TipoPlan.Colectivo">
              <td colspan="4">
                <q-chip color="secondary" text-color="white">
                  {{ formatMoney(granTotal(fee)) }}
                </q-chip>
              </td>
            </template>
          </tr>
        </template>
        <template v-if="!feeIndex">
          <tr>
            <td
              colspan="6"
              class="q-pa-none"
              style="padding: 0 !important; height: 20px"
            ></td>
          </tr>
        </template>
      </template>
    </tbody>
  </q-markup-table>
</template>
