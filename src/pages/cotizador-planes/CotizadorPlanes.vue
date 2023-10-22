<script setup lang="ts">
import { useCloned, useDateFormat } from '@vueuse/core';
import { until } from '@vueuse/shared';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import {
  AvailableProductItemResponseModel,
  AvailableProductsResponseModel,
  BusinessIntermediaryDataModel,
  FileResultModel,
  QuoteProductsDataModel,
  QuoteProductsRequestModel,
  QuoteProductsResponseModel,
  ServiceRequestModel,
  ValueItemResponseModel,
} from 'src/api';
import { $productApi, $serviceRequestApi } from 'src/boot/api';
import InsuredAmountComponent from 'src/components/encapsulations/cotizaciones/InsuredAmountComponent.vue';
import ProductFeeComponent from 'src/components/encapsulations/cotizaciones/ProductFeeComponent.vue';
import ProductsOpcionalsComponent from 'src/components/encapsulations/cotizaciones/ProductsOpcionalsComponent.vue';
import TotalFeeComponent from 'src/components/encapsulations/cotizaciones/TotalFeeComponent.vue';
import NavigationBtnComponent from 'src/components/ui/buttom/NavigationBtnComponent.vue';
import ItemResume from 'src/components/ui/containers/ItemResume.vue';
import PageContainerComponent from 'src/components/ui/containers/PageContainerComponent.vue';
import SectionContainerComponent from 'src/components/ui/containers/SectionContainerComponent.vue';
import FormGenerator from 'src/components/ui/forms/FormGeneratorComponent.vue';
import MultipleSelectComponent from 'src/components/ui/inputs/MultipleSelectComponent.vue';
import RadioComponent from 'src/components/ui/inputs/RadioComponent.vue';
import {
  CotizacionDistribucion,
  CotizacionTipoDistribucion,
  TipoClienteIdentificacion,
  TipoExtra,
  TipoPlan,
  TipoUsuario,
} from 'src/enums/Dictionary.enum';
import {
  IColectiveQuotePlan,
  initColectiveQuotePlan,
  initColectiveQuotePlanForm,
} from 'src/models/forms/cotizador-planes/model.cotizadorPlanes.cotizacionPlanColectivo.js';
import {
  IIndividualQuotePlan,
  initIndividualQuotePlan,
  initIndividualQuotePlanForm,
} from 'src/models/forms/cotizador-planes/model.cotizadorPlanes.cotizacionPlanIndividual.js';
import {
  IFormSpecification,
  ISelectOption,
} from 'src/models/schemas/IFormSpecification';
import {
  ICost,
  IProductDistribution,
  IProductOptional,
  IProductQuote,
  IProductTotal,
  getTotalOptionals,
  initProductQuote,
} from 'src/models/schemas/IProductQuote';
import { FetchUsersList } from 'src/repository/seguridad.usuarios.repository';
import { siteMap } from 'src/router/siteMap';
import { useAuthStore } from 'src/stores/auth.store';
import { useCatalogStore } from 'src/stores/catalog.store';
import { mapSelectList } from 'src/utils/array';
import { base64toFile } from 'src/utils/file';
import { Loader } from 'src/utils/loading';
import { padronBusiness, padronPerson } from 'src/utils/padron';
import { ResolveRequestOperation } from 'src/utils/request';
import { validators } from 'src/utils/validations';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  id?: string;
}>();

const isInitialized = ref<boolean>(false);

const model = ref<ServiceRequestModel>();

const { cloned: QuoteHandler, sync: resetQuoteHandler } =
  useCloned<IProductQuote>(initProductQuote());

const $q = useQuasar();

const router = useRouter();
const readOnly = computed(
  () => router.currentRoute.value.meta?.readonly == true
);

const typePlanOptions = ref<ISelectOption[]>(
  Object.entries(TipoPlan).map(([key, value]) => ({ value: value, text: key }))
);
const productOptions = computed<ISelectOption[]>(() =>
  QuoteHandler.value.Products.map((product) => ({
    text: product.Name,
    value: product.Code,
  }))
);

const form = ref<
  | {
      typePlan: 'Individual';
      modelValue: IIndividualQuotePlan;
      formSchema: IFormSpecification<IIndividualQuotePlan>;
    }
  | {
      typePlan: 'Colectivo';
      modelValue: IColectiveQuotePlan;
      formSchema: IFormSpecification<IColectiveQuotePlan>;
    }
  | null
>(null);

const pageForm = ref(null);

const sendEmail = ref<{ show: boolean; response: boolean }>({
  show: false,
  response: false,
});

const totalClienteInsured = computed(() => {
  let dependants = 0;
  let spouse = 0;
  if (form.value != null && form.value.typePlan == TipoPlan.Individual) {
    dependants = form.value.modelValue.dependantAmount ?? 0;
    spouse = form.value.modelValue.includeSpouse == 'S' ? 1 : 0;
  }
  return +spouse + +dependants + 1;
});

const totalCalc = computed(() => {
  let total: IProductTotal[] = [];

  QuoteHandler.value?.Products?.filter((x) =>
    QuoteHandler.value.ProductSelected.includes(`${x.Code}`)
  ).forEach((producto) => {
    let item: IProductTotal = {
      plan: producto.Name ?? 'INDEFINIDO',
      code: producto.Code ?? 'INDEFINIDO',
      generalValues: {},
      principalValues: {},
      dependantValues: {},
    };

    QuoteHandler.value.Fees.forEach((fee) => {
      item.generalValues[fee.Code] = getTotalOptionals({
        optional: QuoteHandler.value.Extras,
        productTotal: item,
        exclusions: [
          CotizacionDistribucion.Principal,
          CotizacionDistribucion.Dependiente,
        ],
        fees: QuoteHandler.value.Fees,
        fee: fee,
      });
      item.principalValues[fee.Code] = getTotalOptionals({
        optional: QuoteHandler.value.Extras,
        productTotal: item,
        discriminator: CotizacionDistribucion.Principal,
        fees: QuoteHandler.value.Fees,
        fee: fee,
      });

      item.dependantValues[fee.Code] = getTotalOptionals({
        optional: QuoteHandler.value.Extras,
        productTotal: item,
        discriminator: CotizacionDistribucion.Dependiente,
        fees: QuoteHandler.value.Fees,
        fee: fee,
      });
    });
    total.push(item);
  });
  return total;
});

const maxInsuredAmount = computed(
  () =>
    (
      userInfo.value?.businesses?.[0]?.business
        ?.dataByType as BusinessIntermediaryDataModel
    )?.cantidadMaximaAsegurados ?? undefined
);

// STORES
const catalogStore = useCatalogStore();
const { fetchBusinessesList } = catalogStore;
const { businesses: businessList } = storeToRefs(catalogStore);

const businessStore = fetchBusinessesList();
businessStore.fetchBusinessExec();

const authStore = useAuthStore();
const { profile: userInfo } = storeToRefs(authStore);

///////////////////////////////
//METHODS
///////////////////////////////

const loader = Loader;

const alert = (title: string, message: string) => {
  $q.dialog({
    title: title,
    message: message,
  });
};

const productFilter = () =>
  QuoteHandler.value?.Products?.filter((x) =>
    QuoteHandler.value.ProductSelected.includes(`${x.Code}`)
  ).map((x) => ({
    text: `${x.Name}`,
    value: `${x.Code}`,
  })) ?? [];

const quote = async () => {
  let data: QuoteProductsRequestModel = {
    products: productOptions.value
      .filter((x) => QuoteHandler.value.ProductSelected.includes(`${x.value}`))
      .map((producto) => {
        const product = QuoteHandler.value.Products.find(
          (product) => product.Code == producto.value
        );
        return {
          id: product?.Id,
          values: product?.Fees.map((fee) => ({
            id: fee.Id,
            values: fee.Costs.filter(
              (cost) => cost.Type == QuoteHandler.value.TypePlan?.toLowerCase()
            ).map((cost) => ({ id: cost.Id })),
          })),
        };
      }),

    extras: QuoteHandler.value.Extras.filter((x) => x.Option)
      .filter(
        (extra) =>
          (extra.Option &&
            extra.OptionList?.every((x) => x.value === undefined) &&
            extra.Percent) ||
          (extra.Option &&
            !extra.OptionList?.every((x) => x.value === undefined))
      )
      .map((extra) => {
        return {
          id: extra.Id,
          values:
            extra.Option && extra.Option !== 'true'
              ? [
                  {
                    id: extra.Option,
                    values: extra.Percent ? [{ id: extra.Percent }] : undefined,
                  },
                ]
              : undefined,
        };
      }),
    distributions: [],
  };

  if (form.value && form.value.typePlan == TipoPlan.Individual) {
    data.clientType = 'Individual';

    data.client = {
      firstName: form.value.modelValue?.firstName,
      secondName: form.value.modelValue?.secondName,
      firstLastName: form.value.modelValue?.firstLastName,
      secondLastName: form.value.modelValue?.secondLastName,
      birthDate: form.value.modelValue?.birthDate,
    };

    data.clientIdentification = {
      type: TipoClienteIdentificacion.Cédula,
      value: form.value.modelValue?.identification,
    };

    if (
      maxInsuredAmount.value &&
      (form.value.modelValue?.dependantAmount ?? 0) + 1 > maxInsuredAmount.value
    ) {
      alert(
        'Cotizaciones',
        `Error: La cantidad máxima de asegurados no puede mayor a ${maxInsuredAmount.value}`
      );
      return;
    }

    data.distributions = [
      {
        group: null,
        values: [
          {
            group: CotizacionDistribucion.Principal,
            value: 1,
          },
          {
            group: CotizacionDistribucion.Dependiente,
            value: form.value.modelValue?.dependantAmount ?? 0,
          },
        ],
      },
    ];
  }

  if (form.value && form.value.typePlan == TipoPlan.Colectivo) {
    data.clientType = 'Corporate';

    data.client = {
      firstName: form.value.modelValue?.client,
      firstLastName: form.value.modelValue?.contactName,
    };

    data.clientIdentification = {
      type: TipoClienteIdentificacion.RNC,
      value: form.value.modelValue?.identification,
    };

    if (
      QuoteHandler.value.Distributions.some((dist) => {
        maxInsuredAmount.value &&
          (dist.EmployeeAmount?.reduce(
            (accumulator, currentValuet) => accumulator + +currentValuet.Amount,
            0
          ) ?? 0) +
            (dist.DepandantAmount?.reduce(
              (accumulator, currentValuet) =>
                accumulator + +currentValuet.Amount,
              0
            ) ?? 0) >
            maxInsuredAmount.value;
      })
    ) {
      alert(
        'Cotizaciones',
        `Error: La cantidad máxima de asegurados para cada plan no puede ser mayor a ${maxInsuredAmount.value}`
      );
      return;
    }

    QuoteHandler.value.Distributions.forEach((distribution) =>
      data.distributions?.push({
        value: Number.parseInt(distribution.ProductId),
        group: distribution.ProductCode,
        values:
          [distribution.EmployeeAmount, distribution.DepandantAmount].map(
            (subjects, subjectIndex) => ({
              group:
                subjectIndex == 0
                  ? CotizacionDistribucion.Principal
                  : CotizacionDistribucion.Dependiente,
              values: subjects
                ? subjects.map((dist) => ({
                    group: dist.Fee,
                    value: dist.Amount,
                  }))
                : null,
            })
          ) ?? null,
      })
    );
  }

  if (props.id) {
    data.requestId = Number.parseInt(props.id);
  }

  data.extraData = {
    productSelected: QuoteHandler.value.ProductSelected,
    periodicity: QuoteHandler.value.Periodicity,
  };

  if (form.value && form.value.typePlan == TipoPlan.Individual) {
    data.extraData.includeSpouse = form.value.modelValue?.includeSpouse;
    data.extraData.spouseBirthDate = form.value.modelValue?.spouseBirthDate;
  }

  if (
    form.value &&
    (userInfo.value?.type != 'Business' ||
      userInfo.value?.businesses?.[0].type?.type == 'Officer')
  ) {
    data.businessOwnerId = form.value.modelValue?.businessOwnerId;
    data.responsibleUserId = form.value.modelValue?.responsibleUserId;
  }

  if (form.value) {
    data.clientContactInfo = [
      {
        type: 'Email',
        value: form.value.modelValue.EMail,
      },
    ];
    sendEmail.value.show = true;
    await until(sendEmail.value).toMatch((show) => show.show == false);
    data.sendEmail = sendEmail.value.response;
  }

  loader.showLoader('Generando cotización...');
  const quoteResult = await ResolveRequestOperation<QuoteProductsResponseModel>(
    () =>
      $productApi.apiProductsQuotePost({
        quoteProductsRequestModel: data,
      }),
    'No se pudo crear la cotización.'
  );

  if (quoteResult?.IsSuccessful()) {
    quoteResult.Payload?.generatedFile &&
      generateFile(quoteResult.Payload?.generatedFile);
    router.push({
      name: siteMap.cotizaciones.detalleCotizacion.name,
      params: { id: quoteResult.Payload?.requestId },
    });
  }
  if (!quoteResult?.IsSuccessful()) {
    alert(
      'Cotizaciones',
      `Error: ${quoteResult?.Errors?.[0] ?? quoteResult?.Message}`
    );
  }
  loader.hideLoader();
};

const findPersona = async () => {
  if (form.value && form.value.typePlan == TipoPlan.Individual) {
    loader.showLoader('Consultando...');
    const result = await padronPerson<IIndividualQuotePlan>(
      form.value.modelValue
    );
    loader.hideLoader();
    if (!result.error) {
      form.value.modelValue = result.model;
    } else {
      alert('Cotizaciones', result.error);
    }
  }
};

const findBusiness = async () => {
  if (form.value && form.value.typePlan == TipoPlan.Colectivo) {
    loader.showLoader('Consultando...');

    if (form.value.modelValue.identification) {
      const result = await padronBusiness(form.value.modelValue.identification);

      loader.hideLoader();

      if (!result.error && form.value) {
        form.value.modelValue.identification = result.model?.id ?? null;
        form.value.modelValue.client = result.model?.nombreComercial?.trim()
          .length
          ? result.model?.nombreComercial
          : result.model?.razonSocial ?? null;
      } else {
        alert('Cotizaciones', result.error ?? '');
      }
    }
  }
};

const setModelForm = () => {
  switch (QuoteHandler.value.TypePlan) {
    case TipoPlan.Individual:
      form.value = {
        typePlan: TipoPlan.Individual,
        modelValue: initIndividualQuotePlan(model.value),
        formSchema: initIndividualQuotePlanForm(
          businessList.value?.filter(
            (business) =>
              business.id != userInfo?.value?.businesses?.[0]?.businessId
          ) ?? [],
          userInfo.value?.type != 'Business' ||
            userInfo?.value?.businesses?.[0].type?.type == 'Officer'
        ).form,
      };
      break;
    case TipoPlan.Colectivo:
      form.value = {
        typePlan: TipoPlan.Colectivo,
        modelValue: initColectiveQuotePlan(model.value),
        formSchema: initColectiveQuotePlanForm(
          businessList.value?.filter(
            (business) =>
              business.id != userInfo?.value?.businesses?.[0]?.businessId
          ) ?? [],
          userInfo.value?.type != 'Business' ||
            userInfo.value?.businesses?.[0].type?.type == 'Officer'
        ).form,
      };
      break;
  }
};
const setFees = (products: AvailableProductItemResponseModel[]) => {
  products?.forEach((product) => {
    product.values?.forEach((feeItem) => {
      if (
        feeItem.name &&
        feeItem.id &&
        feeItem.group &&
        !QuoteHandler.value.Fees.some(
          (x) =>
            x.Id == feeItem.id &&
            x.Name == feeItem.name &&
            x.Code == feeItem.group
        )
      ) {
        QuoteHandler.value.Fees.push({
          Id: feeItem.id,
          Name: feeItem.name,
          Code: feeItem.group,
        });
      }
    });
  });
};

const setProducts = (products: AvailableProductItemResponseModel[]) => {
  const getFeeInProducts = (product: AvailableProductItemResponseModel) => {
    let fees: {
      Id: string;
      Name: string;
      Code: string;
      Costs: ICost[];
    }[] = [];
    product.values?.forEach((fee) =>
      fees.push({
        Id: `${fee.id}`,
        Name: `${fee.name}`,
        Code: `${fee.group}`,
        Costs:
          fee.values?.map((item) => ({
            Id: item.id ?? '',
            Type: `${item.group}`,
            Value: item.value ?? 0,
          })) ?? [],
      })
    );
    return fees;
  };

  products?.forEach((product) => {
    QuoteHandler.value.Products.push({
      Id: `${product.id}`,
      Name: `${product.name}`,
      Code: `${product.group}`,
      Benefits: `${product.benefitsUrl}`,
      Fees: getFeeInProducts(product),
    });
  });
};

const setInitialProductSelected = () => {
  QuoteHandler.value.ProductSelected = [];
  QuoteHandler.value.Products?.forEach((x) =>
    QuoteHandler.value.ProductSelected.push(`${x.Code}`)
  );
};

const initializeDistributions = () => {
  QuoteHandler.value.Distributions = [];
  if (
    QuoteHandler.value.DistributionType == CotizacionTipoDistribucion.PorTarifa
  ) {
    QuoteHandler.value.Products?.forEach((x) =>
      QuoteHandler.value.Distributions.push({
        ProductId: x.Id,
        ProductCode: x.Code,
        EmployeeAmount: QuoteHandler.value.Fees.map((x) => ({
          Fee: x.Code as string,
          Amount: 0,
        })),
        DepandantAmount: QuoteHandler.value.Fees.map((x) => ({
          Fee: x.Code as string,
          Amount: 0,
        })),
      })
    );
  }
  if (
    QuoteHandler.value.DistributionType == CotizacionTipoDistribucion.Global
  ) {
    QuoteHandler.value.Products?.forEach((x) =>
      QuoteHandler.value.Distributions.push({
        ProductId: x.Id,
        ProductCode: x.Code,
        EmployeeAmount: [
          {
            Fee: CotizacionDistribucion.Global,
            Amount: 0,
          },
        ],
        DepandantAmount: [
          {
            Fee: CotizacionDistribucion.Global,
            Amount: 0,
          },
        ],
      })
    );
  }
};

const setOptionals = (extras: ValueItemResponseModel[]) => {
  QuoteHandler.value.Extras =
    extras?.map((x) => ({
      Id: x.id as string,
      Name: `${x.name}`,
      ForPlan: x.groups ?? [],
      Tags: x.tags ?? [],
      OptionList: x.values ?? [],
      Option: x.values && x.values[0].group == 'incluido' ? 'true' : null,
      Percent: null,
    })) ?? [];
};

const printQuote = async () => {
  loader.showLoader('Imprimiendo cotización...');
  if (props.id) {
    const printResult = await ResolveRequestOperation<FileResultModel>(
      () =>
        $productApi.apiProductsQuoteIdReportPost({
          id: Number.parseInt(`${props.id}`),
        }),
      'No se pudo imprimir la cotización.'
    );

    if (printResult?.IsSuccessful()) {
      printResult.Payload && generateFile(printResult.Payload);
    }
    if (!printResult?.IsSuccessful()) {
      alert(
        'Cotizaciones',
        `Error: ${printResult?.Errors[0] ?? printResult?.Message}`
      );
    }
    loader.hideLoader();
  }
};

const generateFile = (data: FileResultModel) => {
  const fileBase64 = data?.fileContentsAsBytes ?? '';
  const fileName = data?.fileDownloadName ?? '';
  const fileContentType = data?.fileContentType ?? '';
  const file = base64toFile(fileBase64, fileName, fileContentType);
  const fileURL = URL.createObjectURL(file);
  window.open(fileURL, '_blank');
};

const buildProductSquema = (productInfo: AvailableProductsResponseModel) => {
  setFees(productInfo.products ?? []);
  setProducts(productInfo.products ?? []);
  setInitialProductSelected();
  setOptionals(productInfo.extras ?? []);
};

const setResponsibleUserList = async (businessId: number | null) => {
  if (businessId && form.value) {
    const usersResult = await FetchUsersList({ businessId: businessId });
    if (usersResult.IsSuccessful() && usersResult.Payload?.length) {
      form.value.formSchema.responsibleUserId.options = mapSelectList(
        usersResult.Payload,
        'fullName',
        'id'
      );
      form.value.formSchema.responsibleUserId.GetType = 'select';
      return;
    }
  }
  if (form.value) {
    form.value.formSchema.responsibleUserId.options = [];
    form.value.formSchema.responsibleUserId.GetType = 'hidden';
  }
};

const initializeSpouseBirthDataInput = (include: 'S' | 'N' | null) => {
  if (form.value?.typePlan == TipoPlan.Individual) {
    if (include == 'S') {
      form.value.formSchema.spouseBirthDate.GetType = 'date-picker';
      form.value.formSchema.spouseBirthDate.rules = [
        validators.Required,
        validators.maxAge,
      ];
    } else {
      form.value.formSchema.spouseBirthDate.GetType = 'hidden';
      form.value.formSchema.spouseBirthDate.rules = [];
    }
  }
};

const initializeModelForCreatedQuote = async () => {
  const { Payload } = await ResolveRequestOperation<ServiceRequestModel>(
    () =>
      $serviceRequestApi.apiServiceRequestsIdGet({
        id: Number.parseInt(props.id ?? '0'),
        rawIncludes: [
          'type',
          'responsibleuser',
          'businessOwner.responsibleuser',
          'interactions',
        ],
      }),
    'No se pudo obtener los datos de la solicitud.'
  );
  Payload && (model.value = Payload);

  const values = model.value?.formData as QuoteProductsDataModel;

  if (values) {
    const distribution = values.distributions ?? [];

    QuoteHandler.value.TypePlan = distribution.reduce(
      (boolValue: boolean, currentValue) =>
        currentValue.group ? (boolValue = false) : boolValue,
      true
    )
      ? TipoPlan.Individual
      : TipoPlan.Colectivo;

    setModelForm();

    (values.products as AvailableProductItemResponseModel[])?.forEach(
      (product) =>
        product.group && QuoteHandler.value.ProductSelected.push(product.group)
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values.extras?.forEach((extraValue) => {
      QuoteHandler.value.Extras.find((extra) => extra.Id == extraValue?.id)
        ? ((
            QuoteHandler.value.Extras.find(
              (extra) => extra.Id == extraValue?.id
            ) as IProductOptional
          ).Option = extraValue.values?.filter(
            (x) => x.group == TipoExtra.Opcional
          ).length
            ? 'true'
            : extraValue?.values?.[0]?.id ?? null)
        : null;

      QuoteHandler.value.Extras.find((extra) => extra.Id == extraValue?.id)
        ? ((
            QuoteHandler.value.Extras.find(
              (extra) => extra.Id == extraValue.id
            ) as IProductOptional
          ).Percent = extraValue?.values?.[0]?.values?.[0]?.id)
        : null;
    });

    if (form.value && form.value.typePlan == TipoPlan.Individual) {
      form.value.modelValue.includeSpouse = values.extraData.includeSpouse;
      initializeSpouseBirthDataInput(form.value.modelValue.includeSpouse);

      form.value.modelValue.dependantAmount =
        distribution?.[0]?.values?.find((val) => val?.group == 'dependiente')
          ?.value ?? null;
    }

    if (
      QuoteHandler.value.TypePlan == TipoPlan.Colectivo &&
      distribution.length
    ) {
      if (
        distribution.every((dist) =>
          dist.values?.every((item) =>
            item.values?.every(
              (item) => item.group == CotizacionDistribucion.Global
            )
          )
        )
      ) {
        QuoteHandler.value.DistributionType = CotizacionTipoDistribucion.Global;
      } else {
        QuoteHandler.value.DistributionType =
          CotizacionTipoDistribucion.PorTarifa;
      }

      QuoteHandler.value.Distributions = distribution.map((dist) => ({
        ProductId: `${dist.value}`,
        ProductCode: dist.group ?? 'undefined',
        EmployeeAmount:
          dist?.values
            ?.filter(
              (value) =>
                value.group == CotizacionDistribucion.Principal ||
                value.group == CotizacionDistribucion.Global
            )
            .reduce(
              (
                acumulator: { Fee: string; Amount: number }[],
                principalDist
              ) => {
                principalDist.values?.forEach((value) => {
                  acumulator.push({
                    Fee: `${value?.group}`,
                    Amount: value?.value ?? 0,
                  });
                }) ?? [];
                return acumulator;
              },
              []
            ) ?? [],
        DepandantAmount:
          dist?.values
            ?.filter(
              (value) =>
                value.group == CotizacionDistribucion.Dependiente ||
                value.group == CotizacionDistribucion.Global
            )
            .reduce(
              (
                acumulator: { Fee: string; Amount: number }[],
                principalDist
              ) => {
                principalDist.values?.forEach((value) => {
                  acumulator.push({
                    Fee: `${value?.group}`,
                    Amount: value?.value ?? 0,
                  });
                }) ?? [];
                return acumulator;
              },
              []
            ) ?? [],
      }));
    }

    await setResponsibleUserList(
      form.value?.modelValue?.businessOwnerId ?? null
    );

    values?.extraData?.productSelected &&
      (QuoteHandler.value.ProductSelected = values.extraData.productSelected);
    values?.extraData?.periodicity &&
      (QuoteHandler.value.Periodicity = values.extraData.periodicity);
  }
};

const initializeModel = async () => {
  isInitialized.value = false;
  const avaliables =
    await ResolveRequestOperation<AvailableProductsResponseModel>(() =>
      $productApi.apiProductsAvailablesGet()
    );

  if (userInfo.value?.type != TipoUsuario.Empresa) {
    await until(businessStore.fetchBusinessIsReady).toBe(true);
  }

  if (avaliables.Payload) {
    buildProductSquema(avaliables.Payload);
  } else {
    alert(
      'Cotizaciones',
      'No se pudo obtener la información de los productos.'
    );
    router.push({ name: siteMap.cotizaciones.name });
  }

  if (props.id) {
    await initializeModelForCreatedQuote();
  } else {
    QuoteHandler.value.DistributionType = CotizacionTipoDistribucion.PorTarifa;
    initializeDistributions();
  }
  isInitialized.value = true;
};

const editQuote = async () => {
  router.push({
    name: siteMap.cotizaciones.editarCotizacion.name,
    params: { id: props.id },
  });
  loader.showLoader('Cargando...');
  resetQuoteHandler();

  await initializeModel();
  loader.hideLoader();
};

///////////////////////////////
//WATCHERS
///////////////////////////////

onMounted(async () => {
  loader.showLoader('Cargando...');
  await initializeModel();
  loader.hideLoader();
});

watch(
  () => props.id,
  () => {
    resetQuoteHandler();
    initializeModel();
  }
);

watch(
  () => QuoteHandler.value.TypePlan,
  () => {
    if (isInitialized.value) {
      setModelForm();
      QuoteHandler.value.DistributionType =
        QuoteHandler.value.DistributionType ??
        CotizacionTipoDistribucion.Global;
      initializeDistributions();
    }
  }
);

watch(
  () =>
    form.value?.typePlan == TipoPlan.Individual &&
    form.value.modelValue.typeIdentification,
  (n) => {
    if (n == 'p') {
      form.value && (form.value.formSchema.identification.GetType = 'input');
    } else {
      if (form.value && QuoteHandler.value.TypePlan == TipoPlan.Individual) {
        form.value.formSchema.identification.GetType = 'personal-id';
      }
      if (form.value && QuoteHandler.value.TypePlan == TipoPlan.Colectivo) {
        form.value.formSchema.identification.GetType = 'business-id';
      }
    }
  }
);

watch(
  () =>
    form.value?.typePlan == TipoPlan.Individual &&
    form.value.modelValue.includeSpouse,
  (n) => {
    n && initializeSpouseBirthDataInput(n);
  }
);

watch(
  () => form.value && form.value.modelValue?.businessOwnerId,
  async (n) => {
    if (!readOnly.value) {
      await setResponsibleUserList(n ?? null);
    }
    if (!n && form.value) {
      form.value.modelValue.responsibleUserId = null;
    }
  }
);

watch(
  () => totalClienteInsured.value,
  (n) => {
    QuoteHandler.value.PersonsAmount = n ?? 1;
  }
);

watch(
  () => QuoteHandler.value.DistributionType,
  () => {
    isInitialized.value && initializeDistributions();
  }
);

watch(
  () => QuoteHandler.value.ProductSelected,
  (n) => {
    let newDist: IProductDistribution[] = [];
    QuoteHandler.value.Distributions.forEach((dist, i) => {
      newDist.push({
        ProductId: dist.ProductId,
        ProductCode: dist.ProductCode,
        EmployeeAmount: [],
        DepandantAmount: [],
      });

      dist.EmployeeAmount?.forEach((amount) => {
        n.includes(dist.ProductCode)
          ? newDist[i].EmployeeAmount?.push(amount)
          : newDist[i].EmployeeAmount?.push({
              Fee: amount.Fee,
              Amount: 0,
            });
      });

      dist.DepandantAmount?.forEach((amount) => {
        n.includes(dist.ProductCode)
          ? newDist[i].DepandantAmount?.push({
              Fee: amount.Fee,
              Amount: amount.Amount,
            })
          : newDist[i].DepandantAmount?.push({
              Fee: amount.Fee,
              Amount: 0,
            });
      });
    });
    QuoteHandler.value.Distributions = newDist;
  }
);
</script>

<template>
  <PageContainerComponent>
    <template #actions>
      <template v-if="!$q.screen.xs && QuoteHandler.TypePlan">
        <NavigationBtnComponent
          v-if="!readOnly"
          :label="
            $q.screen.gt.md
              ? `${!id ? 'Generar Cotización' : 'Actualizar Cotización'}`
              : $q.screen.gt.sm
              ? `${!id ? 'Cotizar' : 'Actualizar'}`
              : ''
          "
          icon="fa-solid fa-file-pdf"
          class="q-mx-sm"
          @click="($refs.pageForm as any).validateForm()"
        />

        <NavigationBtnComponent
          v-if="readOnly"
          :label="
            $q.screen.gt.md
              ? 'Editar Cotización'
              : $q.screen.gt.sm
              ? 'Editar'
              : ''
          "
          icon="fa-solid fa-pen-to-square"
          class="q-mx-sm"
          @click="editQuote"
        />

        <NavigationBtnComponent
          v-if="readOnly"
          :label="
            $q.screen.gt.md
              ? 'Imprimir Cotización'
              : $q.screen.gt.sm
              ? 'Imprimir'
              : ''
          "
          icon="fa-solid fa-print"
          class="q-mx-sm"
          @click="printQuote"
        />
      </template>

      <NavigationBtnComponent
        :label="
          $q.screen.gt.md
            ? 'Regresar al Listado'
            : $q.screen.gt.sm
            ? 'Regresar'
            : ''
        "
        icon="fa-solid fa-square-arrow-up-right"
        class="q-mx-sm"
        @click="$router.push({ name: siteMap.cotizaciones.name })"
      />
    </template>
    <template v-if="$q.screen.xs">
      <SectionContainerComponent>
        <q-card flat bordered class="fit text-center q-pa-lg bg-grey-2">
          <q-img src="src/assets/img/tilt-phone.png" width="50%" />
          <q-separator class="q-my-md" />
          <span class="text-h6 text-center" style="white-space: normal">
            Por favor, usa tu dispositivo horizontalmente para utilizar esta
            característica.
          </span>
        </q-card>
      </SectionContainerComponent>
    </template>

    <template v-if="!$q.screen.xs">
      <SectionContainerComponent v-if="!readOnly">
        <div :class="`flex  ${$q.screen.gt.md ? 'no-wrap' : ''}`">
          <div :class="`${$q.screen.lt.lg ? 'full-width' : ''}`">
            <RadioComponent
              v-model="QuoteHandler.TypePlan"
              :options="typePlanOptions"
              @updated="($refs.pageForm as any)?.validateFormReset()"
            >
              <template #text>Tipo de Plan:</template>
            </RadioComponent>
          </div>

          <q-separator v-if="$q.screen.gt.md" class="q-mx-md" vertical />
          <MultipleSelectComponent
            v-model="QuoteHandler.ProductSelected"
            prefix="Planes a cotizar:"
            :options="productOptions"
            class="fit q-pa-none"
          />
        </div>
      </SectionContainerComponent>

      <template
        v-if="!(!!QuoteHandler.TypePlan && QuoteHandler.ProductSelected.length)"
      >
        <SectionContainerComponent>
          <q-card flat bordered class="fit text-center q-pa-lg bg-grey-2">
            <q-icon
              name="fa-solid fa-circle-exclamation"
              color="accent"
              size="md"
              class="q-pr-md"
            />
            <span class="text-h6 text-center">Seleccione un tipo de Plan</span>
            <span class="text-h6 text-center">
              y los Planes que desea cotizar.
            </span>
          </q-card>
        </SectionContainerComponent>
      </template>

      <template
        v-if="!!QuoteHandler.TypePlan && QuoteHandler.ProductSelected.length"
      >
        <template v-if="form && !readOnly">
          <SectionContainerComponent>
            <FormGenerator
              ref="pageForm"
              :model-value="form.modelValue"
              :form-schema="form.formSchema"
              form-name="Datos del Solicitante"
              @submit="quote"
              @fetch-person="findPersona"
              @fetch-business="findBusiness"
            ></FormGenerator>
          </SectionContainerComponent>
        </template>

        <template v-if="readOnly">
          <SectionContainerComponent>
            <div class="text-h5">
              <q-icon
                class="q-pr-md"
                size="sm"
                name="fa-solid fa-file-invoice-dollar"
              />
              Datos de la cotización
            </div>

            <q-separator class="q-my-md" />
            <div class="row">
              <ItemResume
                :title="`${$q.screen.gt.md ? 'Número de' : '#'}  Seguimiento`"
                :value="model?.id"
                html-class="text-subtitle1"
                type="v"
                class="col-xs-12 col-md-auto"
              />
              <ItemResume
                title="Fecha de Creación"
                :value="
                  useDateFormat(model?.createdOnUtc ?? '', 'YYYY-MM-DD').value
                "
                html-class="text-subtitle1"
                type="v"
                class="col-xs-12 col-md-auto"
              />
              <ItemResume
                title="Intermediario"
                :value="model?.businessOwner?.name?.toLocaleUpperCase()"
                html-class="text-subtitle1"
                type="v"
                class="col-xs-12 col-md-auto"
              />
              <ItemResume
                v-if="
                  model?.businessOwner?.responsibleUser?.fullName?.toLocaleUpperCase() !=
                  model?.responsibleUser?.fullName?.toLocaleUpperCase()
                "
                title="Representante"
                :value="model?.responsibleUser?.fullName?.toLocaleUpperCase()"
                html-class="text-subtitle1"
                type="v"
                class="col-xs-12 col-md-auto"
              />
              <ItemResume
                v-if="model?.businessOwner?.responsibleUser?.fullName"
                title="Gerente"
                :value="
                  model?.businessOwner?.responsibleUser?.fullName?.toLocaleUpperCase()
                "
                html-class="text-subtitle1"
                type="v"
                class="col-xs-12 col-md-auto"
              />
            </div>
          </SectionContainerComponent>
          <SectionContainerComponent>
            <div class="text-h5 q-pa-sm flex items-baseline">
              <q-icon class="q-pr-md" size="sm" name="fa-solid fa-user" />
              Cliente
            </div>
            <q-separator class="q-mx-sm q-my-md" />
            <div class="row">
              <ItemResume
                :title="`${
                  $q.screen.gt.sm ? 'Número de' : '#'
                }  Identificación`"
                :value="model?.clientIdentification?.value"
                html-class="text-subtitle1"
                type="v"
                class="col-xs-12 col-md-auto"
              />
              <ItemResume
                title="Nombre"
                :value="model?.client?.fullName"
                html-class="text-subtitle1"
                type="v"
                class="col-xs-12 col-md-auto"
              />
              <ItemResume
                v-if="model?.client?.birthDate"
                title="Fecha de Nacimiento"
                :value="
                  useDateFormat(model?.client?.birthDate ?? '', 'YYYY-MM-DD')
                    .value
                "
                html-class="text-subtitle1"
                type="v"
                class="col-xs-12 col-md-auto"
              />
              <ItemResume
                v-if="model?.clientContactInfo"
                title="Correo Electrónico"
                :value="model?.clientContactInfo[0].value"
                html-class="text-subtitle1"
                type="v"
                class="col-xs-12 col-md-auto"
              />
              <template v-if="form && form.typePlan == TipoPlan.Individual">
                <ItemResume
                  v-if="model?.clientContactInfo"
                  title="Incluye Conyuge"
                  :value="form.modelValue?.includeSpouse == 'S' ? 'Si' : 'No'"
                  html-class="text-subtitle1"
                  type="v"
                  class="col-xs-12 col-md-auto"
                />
                <ItemResume
                  v-if="model?.clientContactInfo"
                  title="Otros Dependientes"
                  :value="form.modelValue?.dependantAmount"
                  html-class="text-subtitle1"
                  type="v"
                  class="col-xs-12 col-md-auto"
                />
              </template>
            </div>
          </SectionContainerComponent>
        </template>
        <SectionContainerComponent>
          <ProductFeeComponent
            :model-value="
              QuoteHandler?.Products?.filter((product) =>
                QuoteHandler.ProductSelected.includes(`${product.Code}`)
              ) ?? []
            "
            :type-plan="QuoteHandler.TypePlan"
            :fee="QuoteHandler.Fees"
          />
        </SectionContainerComponent>

        <SectionContainerComponent>
          <ProductsOpcionalsComponent
            :model-value="QuoteHandler.Extras"
            :products="productFilter()"
            :fees="QuoteHandler.Fees"
            :readonly="readOnly"
          />
        </SectionContainerComponent>

        <SectionContainerComponent>
          <TotalFeeComponent
            :model-value="QuoteHandler"
            :totals="totalCalc"
            :type-plan="QuoteHandler.TypePlan"
            :products="productFilter()"
          />
        </SectionContainerComponent>

        <template v-if="QuoteHandler.TypePlan == TipoPlan.Colectivo">
          <SectionContainerComponent>
            <InsuredAmountComponent
              :model-value="QuoteHandler"
              :products="productFilter()"
              :readonly="readOnly"
              :max-insured-amount="maxInsuredAmount"
              @mode="(val) => (QuoteHandler.DistributionType = val)"
            />
          </SectionContainerComponent>
        </template>

        <SectionContainerComponent>
          <TotalFeeComponent
            :model-value="QuoteHandler"
            :totals="totalCalc"
            :type-plan="QuoteHandler.TypePlan"
            :products="productFilter()"
            :for-all="true"
            :readonly="readOnly"
          />
        </SectionContainerComponent>
      </template>
    </template>
  </PageContainerComponent>

  <q-dialog v-model="sendEmail.show" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ma-sm">
          Desea enviar esta cotización al correo del cliente?.
        </span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn v-close-popup flat label="No" color="primary" />
        <q-btn
          v-close-popup
          flat
          label="Si"
          color="primary"
          @click="() => (sendEmail.response = true)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
