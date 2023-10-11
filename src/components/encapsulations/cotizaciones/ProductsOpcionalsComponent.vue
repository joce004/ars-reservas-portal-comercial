<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { ValueItemResponseModel } from 'src/api';
import SelectComponent from 'src/components/ui/inputs/SelectComponent.vue';
import { ISelectOption } from 'src/models/schemas/IFormSpecification';
import {
  IFee,
  IProductOptional,
  displayValueForOptional,
} from 'src/models/schemas/IProductQuote';

const props = defineProps<{
  modelValue: IProductOptional[];
  products: ISelectOption[];
  fees: IFee[];
  readonly?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);
const model = useVModel(props, 'modelValue', emit, {
  deep: true,
  passive: true,
});

const showEmptyValue = ({
  model,
  extraIndex,
  extra,
}: {
  model: IProductOptional[];
  extraIndex: number;
  extra: IProductOptional;
}) =>
  !model[extraIndex].Option ||
  (!model[extraIndex].Percent &&
    extra.OptionList?.every((x) => x.tags?.includes('select')));

const showValue = ({
  model,
  extraIndex,
  extra,
}: {
  model: IProductOptional[];
  extraIndex: number;
  extra: IProductOptional;
}) =>
  (model[extraIndex].Option &&
    !extra.OptionList?.every((x) => x.tags?.includes('select'))) ||
  (model[extraIndex].Option && model[extraIndex].Percent);

const hasValuesByFees = (extra: IProductOptional, productCode: string) => {
  let valuesByFees = false;
  const hasValuesByFees = (values: ValueItemResponseModel[]) => {
    return (
      values
        .find((value) => value.groups?.includes(productCode))
        ?.values?.some((value) =>
          props.fees.some((fee) => fee.Code == value.name?.toLocaleLowerCase())
        ) ?? false
    );
  };

  if (extra.Option === 'true' && extra.OptionList) {
    valuesByFees = hasValuesByFees(
      extra.OptionList.filter((values) => values.values)
    );
  }

  if (!valuesByFees) {
    const option = extra.OptionList?.find(
      (option) => option.id == extra.Option
    );
    if (option?.values) {
      valuesByFees = hasValuesByFees(
        option.values.filter((values) => values.values)
      );
    }
  }

  if (!valuesByFees) {
    const percent = extra.OptionList?.find(
      (option) => option.id == extra.Option
    )?.values?.find((percent) => percent.id == extra.Percent);

    if (percent?.values) {
      valuesByFees = hasValuesByFees(
        percent.values.filter((values) => values.values)
      );
    }
  }

  return valuesByFees;

  //return (
  //  extra.OptionList?.find((option) => option.id == extra.Option)
  //    ?.values?.find((percent) => percent.id == extra.Percent)
  //    ?.values?.filter((percent) => percent.values)
  //    .find((value) => value.groups?.includes(productCode))?.values != null
  //);
};
</script>

<template>
  <div class="text-h6">
    <q-icon name="fa-solid fa-file-circle-plus" size="sm" class="q-pr-md" />
    Servicios Opcionales
  </div>
  <q-space class="q-my-lg" />
  <q-markup-table separator="cell" flat bordered class="text-primary">
    <thead>
      <tr>
        <th class="text-left" style="width: 15%"></th>
        <th class="text-left" style="width: 15%"></th>
        <template v-for="(product, index) in products" :key="index">
          <th style="width: 17.5%">
            <span class="text-subtitle1">
              {{ product.text.toLocaleUpperCase() }}
            </span>
          </th>
        </template>
      </tr>
    </thead>
    <tbody>
      <template v-for="(extra, extraIndex) in modelValue" :key="extraIndex">
        <template v-if="!(readonly && !model[extraIndex].Option)">
          <tr class="text-center">
            <td class="text-left">
              <span class="text-subtitle1">{{ extra.Name }}</span>
            </td>
            <td>
              <div class="flex justify-center no-wrap">
                <q-chip
                  v-if="extra.Tags.includes('value')"
                  color="accent"
                  class="text-white"
                >
                  Incluido
                </q-chip>

                <q-checkbox
                  v-if="extra.Tags.includes('checkbox')"
                  v-model="model[extraIndex].Option"
                  true-value="true"
                  :false-value="null"
                  color="accent"
                  default-null-text="Seleccione"
                  :disable="readonly"
                />

                <template v-if="extra.Tags.includes('select')">
                  <SelectComponent
                    v-if="!readonly"
                    v-model="model[extraIndex].Option"
                    dense
                    :options="
                      extra.OptionList?.map((x) => ({
                        value: `${x.id}`,
                        text: `${x.name}`,
                      })) ?? []
                    "
                    class="full-width"
                    default-null-text="Seleccione"
                    hide-bottom-space
                    :disable="readonly"
                  />

                  <q-chip v-if="readonly" color="accent" class="text-white">
                    {{
                      extra.OptionList?.map((x) => ({
                        value: `${x.id}`,
                        text: `${x.name}`,
                      })).find((opt) => opt.value == model[extraIndex].Option)
                        ?.text
                    }}
                  </q-chip>

                  <template
                    v-if="
                      model[extraIndex].Option &&
                      extra.OptionList?.every((x) => x.tags?.includes('select'))
                    "
                  >
                    <SelectComponent
                      v-if="!readonly"
                      v-model="model[extraIndex].Percent"
                      dense
                      options-html
                      :options="
                        extra.OptionList?.find(
                          (x) => x.id == model[extraIndex].Option
                        )?.values?.map((x) => ({
                          value: `${x.id}`,
                          text: `${x.name}`,
                        })) ?? []
                      "
                      class="full-width"
                      default-null-text="Seleccione"
                      hide-bottom-space
                      :disable="readonly"
                    />
                    <q-chip v-if="readonly" color="accent" class="text-white">
                      {{
                        extra.OptionList?.find(
                          (x) => x.id == model[extraIndex].Option
                        )
                          ?.values?.map((x) => ({
                            value: `${x.id}`,
                            text: `${x.name}`,
                          }))
                          .find((opt) => opt.value == model[extraIndex].Percent)
                          ?.text
                      }}
                    </q-chip>
                  </template>
                </template>
              </div>
            </td>
            <template
              v-for="(product, productIndex) in products"
              :key="productIndex"
            >
              <td>
                <div
                  v-if="
                    showEmptyValue({
                      model: model,
                      extraIndex: extraIndex,
                      extra: extra,
                    })
                  "
                >
                  -
                </div>
                <template
                  v-if="
                    showValue({
                      model: model,
                      extraIndex: extraIndex,
                      extra: extra,
                    })
                  "
                >
                  <q-chip
                    v-if="!hasValuesByFees(extra, `${product.value}`)"
                    color="secondary"
                    class="text-white"
                  >
                    {{
                      displayValueForOptional({
                        extra: extra,
                        product: product.value?.toString(),
                      })
                    }}
                  </q-chip>
                  <template v-if="hasValuesByFees(extra, `${product.value}`)">
                    <template v-for="(fee, feeIndex) in fees" :key="feeIndex">
                      <br v-if="feeIndex != 0" />
                      <q-chip color="secondary" class="text-white">
                        {{ fee.Name }}:
                        {{
                          displayValueForOptional({
                            extra: extra,
                            product: product.value?.toString(),
                            fees: fees,
                            fee: fee,
                          })
                        }}
                      </q-chip>
                    </template>
                  </template>
                </template>
              </td>
            </template>
          </tr>
        </template>
      </template>
    </tbody>
  </q-markup-table>
</template>
