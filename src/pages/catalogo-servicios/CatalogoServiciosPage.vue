<script setup lang="ts">
// TODO: Terminar este mantenimiento
import { IColumn } from 'src/models/schemas/IColumn';
import { onMounted, ref } from 'vue';

import { useCloned } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import {
  BusinessServiceRequestTypeEditionModel,
  BusinessServiceRequestTypeModel,
  BusinessServiceRequestTypeModelPaged,
  ServiceRequestTypeCreationModel,
  ServiceRequestTypeModel,
  ServiceRequestTypeModelPaged,
} from 'src/api';
import DialogFormComponent from 'src/components/ui/containers/DialogFormComponent.vue';
import PageContainerComponent from 'src/components/ui/containers/PageContainerComponent.vue';
import QuerableRecordsComponent from 'src/components/ui/controls/QuerableRecordComponent.vue';
import FormGeneratorComponent from 'src/components/ui/forms/FormGeneratorComponent.vue';
import { Estados } from 'src/enums/Dictionary.enum';
import {
  initBusinessServiceForm,
  initEditBusinessServiceModel,
} from 'src/models/forms/catalogo-servicios/model.catalogoServicios';
import { IForm } from 'src/models/schemas/IFormSpecification';
import { useAuthStore } from 'src/stores/auth.store';
import { getSelectList } from 'src/utils/array';
import { Loader } from 'src/utils/loading';
import { ResolveRequestOperation } from 'src/utils/request';
import {
  $businessServiceRequestTypeApi,
  $serviceRequestTypeApi,
} from 'src/boot/api';

const columns = ref<IColumn<ServiceRequestTypeModel>[]>();
const data = ref<ServiceRequestTypeModel[]>([]);
const pages = ref<{ curent: number; total: number }>({ curent: 0, total: 0 });

const { cloned: dialogHandler, sync: resetDialogData } = useCloned<
  Nullable<{
    show: boolean;
    model: BusinessServiceRequestTypeEditionModel;
    schema:
      | IForm<ServiceRequestTypeCreationModel>
      | IForm<BusinessServiceRequestTypeModel>;
    formTitle: string;
    formAction: 'C' | 'U' | 'UR';
  }>
>({
  show: false,
  model: null,
  schema: null,
  formTitle: null,
  formAction: null,
});

// STORES
//const catalogStore = useCatalogStore();
//const { fetchBusinessesList } = catalogStore;
//const { businesses: businessesList } = storeToRefs(catalogStore);
//
//const businessStore = fetchBusinessesList();
//businessStore.fetchBusinessExec();

const authStore = useAuthStore();
const { profile: userInfo } = storeToRefs(authStore);

const $q = useQuasar();
const loader = Loader;

const alert = (title: string, message: string) => {
  $q.dialog({
    title: title,
    message: message,
  });
};

//function deleteConfirm(id: number) {
//  const subject = data.value.find((business) => business.id == id);
//  $q.dialog({
//    title: 'Intermediario',
//    message: `Está seguro de que desea eliminar ${subject?.name} del sistema`,
//    cancel: true,
//  }).onOk(() => {
//    deleteBusiness(id);
//  });
//}

//const createBusiness = () => {
//  dialogHandler.value = {
//    show: true,
//    model: initCreateBusinessModel(userInfo.value?.type),
//    schema: initBusinessForm(userInfo.value?.type, userList.value),
//    formTitle: 'Crear Intermediario',
//    formAction: 'C',
//  };
//};

//const editServiceRequestType = async (id: number) => {
//  loader.showLoader('Guardando...');
//  const serviceRequestTypeResult = await GetServiceRequestType(id);
//  loader.hideLoader();
//  if (
//    serviceRequestTypeResult.IsSuccessful() &&
//    serviceRequestTypeResult.Payload
//  )
//    dialogHandler.value = {
//      show: true,
//      model: initEditarSolicitudModel(serviceRequestTypeResult.Payload),
//      schema: initServiceForm(),
//      formTitle: 'Editar Intermediario',
//      formAction: 'U',
//    };
//};

const editBusinessServiceRequestType = async (id: number) => {
  loader.showLoader('Guardando...');
  const serviceRequestTypeResult =
    await ResolveRequestOperation<ServiceRequestTypeModel>({
      request: () =>
        $businessServiceRequestTypeApi.apiBusinessesServiceRequestTypesIdGet({
          id: id,
        }),
    });

  loader.hideLoader();
  if (
    serviceRequestTypeResult.IsSuccessful() &&
    serviceRequestTypeResult.Payload
  ) {
    dialogHandler.value = {
      show: true,
      model: initEditBusinessServiceModel(serviceRequestTypeResult.Payload),
      schema: initBusinessServiceForm(),
      formTitle: 'Configuración del Servicio',
      formAction: 'UR',
    };
  } else {
    alert(
      'Intermediarios',
      'Error: No se pudo obtener los datos del servicio.'
    );
  }
};

const fetchServiceRequestType = async (params?: {
  page?: number;
  query?: object;
}) => {
  const businessesResult =
    await ResolveRequestOperation<ServiceRequestTypeModelPaged>({
      request: () =>
        $serviceRequestTypeApi.apiServiceRequestTypesGet({
          page: params?.page ?? 1,
          rawIncludes: ['requestType'],
        }),
    });

  if (businessesResult.IsSuccessful()) {
    data.value =
      businessesResult.Payload?.items?.map((x) => ({
        id: x.id,
        name: x.name,
        status: x.status,
      })) ?? [];
    pages.value.total = businessesResult.Payload?.totalPages ?? 1;
    pages.value.curent = businessesResult.Payload?.page ?? 1;
  } else {
    alert(
      'Intermediarios',
      'Error: No se pudo obtener el listado de servicios.'
    );
  }
};

const fetchBusinessServiceRequestType = async (params?: {
  page?: number;
  query?: object;
}) => {
  const businessesResult =
    await ResolveRequestOperation<BusinessServiceRequestTypeModelPaged>({
      request: () =>
        $businessServiceRequestTypeApi.apiBusinessesServiceRequestTypesGet({
          page: params?.page ?? 1,
          rawIncludes: ['requestType'],
        }),
    });

  if (businessesResult.IsSuccessful()) {
    data.value =
      businessesResult.Payload?.items?.map((x) => ({
        id: x.id,
        name: x.requestType?.name,
        status: x.status,
      })) ?? [];
    pages.value.total = businessesResult.Payload?.totalPages ?? 1;
    pages.value.curent = businessesResult.Payload?.page ?? 1;
  } else {
    alert('Intermediarios', 'Error: No se pudo obtener el servicio.');
  }
};

const fetchServiceRequestTypeByQuery = async (params?: {
  page?: number;
  query?: object;
}) => {
  loader.showLoader('Buscando...');
  await fetchServiceRequestType(params);
  loader.hideLoader();
};

const submit = async () => {
  loader.showLoader('Guardando...');
  if (dialogHandler.value.model) {
    if (dialogHandler.value.formAction == 'UR') {
      const businessServiceRequestResult =
        await ResolveRequestOperation<BusinessServiceRequestTypeModel>({
          request: () =>
            $businessServiceRequestTypeApi.apiBusinessesServiceRequestTypesPut({
              businessServiceRequestTypeEditionModel:
                dialogHandler.value.model ?? {},
            }),
        });

      if (businessServiceRequestResult?.IsSuccessful()) {
        await fetchServiceRequestType();
        resetDialogData();
      } else {
        alert('Intermediarios', 'Error: No se pudo modificar el servicio.');
      }
    }
  }
  loader.hideLoader();
};

onMounted(async () => {
  loader.showLoader('Cargando...');
  if (userInfo.value?.type == 'Business') {
    await fetchBusinessServiceRequestType();
  } else {
    await fetchServiceRequestType();
  }
  columns.value = [
    {
      name: 'id',
      label: 'ID',
      field: (row) => row.id as number,
      required: true,
      align: 'left',
      sortable: true,
      format: (val) => `${val}`,
    },
    {
      name: 'name',
      align: 'left',
      label: 'Nombre',
      field: 'name',
      sortable: true,
    },
    {
      name: 'status',
      label: 'Estado',
      field: 'status',
      format: (val) =>
        `${
          (
            Object.entries(Estados).find((x) => x[1] == val) as [
              string,
              'Active' | 'Inactive'
            ]
          )[0]
        }`,
      sortable: true,
      options: getSelectList(Estados),
    },
  ];

  loader.hideLoader();
});
</script>

<template>
  <PageContainerComponent :user-type="userInfo?.type">
    <QuerableRecordsComponent
      :model-value="data"
      title="Servicios"
      :column-props="columns"
      :pages-number="pages.total"
      :current-page="pages.curent"
      hide-filters
      :allow-edit="
        userInfo?.roles?.includes('BusinessServiceRequestTypes.Edit') &&
        userInfo.type == 'Business'
      "
      @edit="editBusinessServiceRequestType"
      @filter="fetchServiceRequestTypeByQuery"
    />
  </PageContainerComponent>

  <!-- Dialogs -->
  <template
    v-if="
      dialogHandler.model &&
      dialogHandler.schema &&
      dialogHandler.show &&
      dialogHandler.formTitle
    "
  >
    <DialogFormComponent :model-value="dialogHandler.show">
      <FormGeneratorComponent
        v-model="dialogHandler.model"
        :form-schema="dialogHandler.schema.form"
        :form-name="dialogHandler.formTitle"
        icon="fa-solid fa-industry"
        :submit-label="dialogHandler.formTitle"
        controls
        @close="resetDialogData()"
        @submit="submit()"
      />
    </DialogFormComponent>
  </template>
  <!-- /Dialogs -->
</template>
