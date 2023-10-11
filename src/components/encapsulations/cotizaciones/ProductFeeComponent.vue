<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { TipoPlanType } from 'src/enums/Dictionary.enum';
import { IFee, IProduct } from 'src/models/schemas/IProductQuote';
import { routeResolver } from 'src/utils/route-resolver';
import { formatMoney, getPG } from 'src/utils/string';
import { reactive } from 'vue';

const props = defineProps<{
  modelValue?: IProduct[];
  typePlan: TipoPlanType;
  fee: IFee[];
}>();
const model = useVModel(props, 'modelValue');

const benefitsDialog = reactive<{
  show: boolean;
  title: string;
  url: string;
}>({
  show: false,
  title: '',
  url: '',
});

const showBenefits = (title: string, url: string) => {
  benefitsDialog.show = true;
  benefitsDialog.title = title;
  benefitsDialog.url = url;
};
</script>

<template>
  <div class="text-h6">
    <q-icon name="fa-solid fa-money-check-dollar" size="sm" class="q-pr-md" />
    Tarifas para Planes {{ getPG(typePlan, true) }} en RD$
  </div>

  <q-space class="q-my-lg" />
  <q-markup-table
    separator="cell"
    flat
    bordered
    class="text-primary"
    style="max-width: 100%"
  >
    <thead>
      <tr>
        <th class="text-left" style="width: 30%"></th>
        <th class="text-center" colspan="4">
          <div class="text-h6">PLANES</div>
        </th>
      </tr>
      <tr>
        <th></th>
        <template v-for="(product, index) in model" :key="index">
          <th class="text-center" style="width: 17.5%">
            <span class="text-subtitle1">
              {{ product.Name?.toLocaleUpperCase() }}
            </span>
          </th>
        </template>
      </tr>
    </thead>
    <tbody>
      <template v-for="(feeItem, indexFee) in fee" :key="indexFee">
        <tr>
          <td class="text-left">
            <span class="text-subtitle1">{{ feeItem.Name }}</span>
          </td>
          <template
            v-for="(product, indexProduct) in model"
            :key="indexProduct"
          >
            <td class="text-center">
              <q-chip color="secondary" text-color="white">
                {{
                  formatMoney(
                    product.Fees
                      ?.find((fee) => fee.Code == feeItem.Code)?.Costs?.find(cost => cost.Type == typePlan.toLowerCase())?.Value
                  )
                }}
              </q-chip>
            </td>
          </template>
        </tr>
      </template>
      <tr>
        <td><span class="text-subtitle1">Beneficios</span></td>
        <template v-for="(product, index) in model" :key="index">
          <td class="text-center">
            <q-btn
              round
              color="accent"
              @click="
                showBenefits(
                  `${product.Name}`,
                  routeResolver(product.Benefits ?? '')
                )
              "
            >
              <q-icon name="fa-solid fa-file-pdf" size="xs" />
            </q-btn>
          </td>
        </template>
      </tr>
    </tbody>
  </q-markup-table>
  <q-dialog v-model="benefitsDialog.show" persistent>
    <q-card style="width: 80vw; max-width: 100vw">
      <q-card-section
        class="row items-center absolute-top"
        style="z-index: 1000; border-bottom: 1px solid gainsboro"
      >
        <div class="text-h6">Beneficios - {{ benefitsDialog.title }}</div>
        <q-space />
        <q-btn v-close-popup icon="close" flat round dense />
      </q-card-section>

      <iframe
        :src="benefitsDialog.url"
        class="q-mt-lg q-pt-xl full-width"
        :title="`Beneficios - ${benefitsDialog.title}`"
        style="border: none; height: calc(59vh)"
      ></iframe>
    </q-card>
  </q-dialog>
</template>
