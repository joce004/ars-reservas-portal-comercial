import { ValueItemResponseModel } from 'src/api';
import {
  CotizacionTipoDistribucionType,
  TipoPlanType,
} from 'src/enums/Dictionary.enum';
import { formatMoney } from 'src/utils/string';

export type IProduct = {
  Id: string;
  Name: string;
  Code: string;
  Benefits: string;
  Fees: IProductFee[];
};

export type IProductFee = {
  Id: string;
  Name: string;
  Code: string;
  Costs: ICost[];
};

export type IFee = {
  Id: string;
  Name: string;
  Code: string;
};

export type ICost = { Id: string, Type: string; Value: number }

export type IProductOptional = {
  Id: string;
  Name: string;
  ForPlan: string[];
  Tags: string[];
  OptionList?: ValueItemResponseModel[];
  Option?: string | null;
  Percent?: string | null;
};

export type IProductDistribution = {
  ProductId: string;
  ProductCode: string;
  EmployeeAmount?: { Fee: string; Amount: number }[];
  DepandantAmount?: { Fee: string; Amount: number }[];
};

export type IProductQuote = {
  Products: IProduct[];
  ProductSelected: string[];
  Fees: IFee[];
  Extras: IProductOptional[];
  Distributions: IProductDistribution[];
  DistributionType?: CotizacionTipoDistribucionType;
  PersonsAmount: number;
  TypePlan?: TipoPlanType;
  Periodicity: number;
};

export type IProductOptionalValues = Record<string, number>

export type IProductTotal = {
  plan: string;
  code: string;
  generalValues: IProductOptionalValues;
  principalValues: IProductOptionalValues;
  dependantValues: IProductOptionalValues;
};

export const initProductQuote = () => {
  const model: IProductQuote = {
    Products: [],
    ProductSelected: [],
    Fees: [],
    Extras: [],
    Distributions: [],
    PersonsAmount: 1,
    Periodicity: 1,
  };
  return model;
};

export const getExtraValueOptional = (
  { extra, productCode, fees }: {
    extra: IProductOptional | null;
    productCode: string;
    fees?: IFee[];
  },
) => {

  if (extra && extra.ForPlan?.includes(productCode)) {


    const option = extra.OptionList?.find(
      (x) =>
        (extra.Option == 'true' || x.id == extra.Option) &&
        (!x.groups || x.groups?.includes(productCode))
    );


    if (option) {

      let valueToEvaluate: ValueItemResponseModel | undefined = option
      if (option.values) {
        if (extra.Tags.includes('select')) {
          if (extra.Option) {
            valueToEvaluate = option.values?.find((x) => x.groups?.includes(productCode));
          }

          if (extra.Percent) {
            const percent = option?.values?.find((x) => x.id == extra.Percent);
            if (percent) {
              if ((percent.value || percent.value == 0) && (!percent.groups || percent.groups.includes(productCode))) {
                return percent.value != 0 ? percent.value : 'Incluido';
              }
            }

            if (percent?.values) {
              valueToEvaluate = percent.values?.find((x) =>
                x.groups?.includes(productCode)
              );
            }
          }
        }

        if (valueToEvaluate?.values) {
          const values: Record<string, number> = {};
          fees?.forEach(fee => values[fee.Code] = valueToEvaluate?.values?.find(value => value.groups?.includes(fee.Code))?.value ?? 0);
          return values
        }

        if (valueToEvaluate?.value || valueToEvaluate?.value == 0) {
          return valueToEvaluate.value != 0 ? valueToEvaluate.value : 'Incluido';
        }
      }

      if (option.value || option.value == 0) {
        return option.value != 0 ? option.value : 'Incluido';
      }

    }
  }
  return 'No Aplica';
};

export const displayValueForOptional = (
  { extra, product, fees, fee }:
    {
      extra: IProductOptional;
      product?: string;
      fees?: IFee[]
      fee?: IFee
    }
) => {
  const value =
    extra.Tags.includes('value') || extra.Tags.includes('checkbox')
      ? getExtraValueOptional({ extra, productCode: product ?? '0', fees: fees })
      : extra.Tags.includes('select')
        ? getExtraValueOptional({ extra, productCode: product ?? '0', fees: fees })
        : 'No Aplica'
  switch (typeof value) {
    case 'number': return formatMoney(value)
    case 'object': return value[`${fee?.Code}`] ? formatMoney(value[`${fee?.Code}`]) : 'Incluido'
    default: return value
  }
}

export const getTotalOptionals = (
  { optional, productTotal, discriminator, exclusions, fees, fee }:
    {
      optional: IProductOptional[];
      productTotal: IProductTotal;
      discriminator?: string;
      exclusions?: string[];
      fees: IFee[]
      fee: IFee;
    }) =>
  optional.reduce((accumulator, adder) => {
    let value = 0;
    if (
      (discriminator && adder.Tags.includes(discriminator)) ||
      (exclusions && adder.Tags.every((tag) => !exclusions.includes(tag)))
    ) {
      if (
        (adder.Option &&
          !adder.OptionList?.every((x) => x.tags?.includes('select'))) ||
        (adder.Option && adder.Percent)
      ) {
        const obtainedValue = getExtraValueOptional({ extra: adder, productCode: productTotal.code, fees: fees });

        switch (typeof obtainedValue) {
          case 'number':
            value = obtainedValue
            break;
          case 'object':
            value = obtainedValue[fee.Code];
            break;
          default: value = 0
        }
      }
    }
    return accumulator + value;
  }, 0);
