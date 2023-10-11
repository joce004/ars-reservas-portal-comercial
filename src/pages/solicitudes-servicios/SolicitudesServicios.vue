<script setup lang="ts">
import { until, useDateFormat } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { ServiceRequestModel } from 'src/api';
import NavigationBtnComponent from 'src/components/ui/buttom/NavigationBtnComponent.vue';
import PageContainerComponent from 'src/components/ui/containers/PageContainerComponent.vue';
import QuerableRecordsComponent from 'src/components/ui/controls/QuerableRecordComponent.vue';
import {
  TipoEstadoSolicitud,
  TipoEstadoSolicitudType,
} from 'src/enums/Dictionary.enum';
import { IColumn } from 'src/models/schemas/IColumn';
import {
  DeleteServiceRequest,
  FetchServiceRequests,
} from 'src/repository/solicitudesServicio.repository';
import { siteMap } from 'src/router/siteMap';
import { useAuthStore } from 'src/stores/auth.store';
import { useCatalogStore } from 'src/stores/catalog.store';
import { getSelectList, mapSelectList } from 'src/utils/array';
import { Loader } from 'src/utils/loading';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const columns = ref<IColumn<ServiceRequestModel>[]>();
const pages = ref<{ curent: number; total: number }>({ curent: 0, total: 0 });

const data = ref<ServiceRequestModel[]>([]);

// STORES
const authStore = useAuthStore();
const { profile: userInfo } = storeToRefs(authStore);

const catalogStore = useCatalogStore();
const { fetchBusinessesList, fetchUsersList } = catalogStore;
const { businesses: businessList, users: userList } = storeToRefs(catalogStore);

const businessStore = fetchBusinessesList();
businessStore.fetchBusinessExec();

const usersStore = fetchUsersList();
usersStore.fetchUsersExec();

const loader = Loader;
const $q = useQuasar();
const router = useRouter();

const alert = (title: string, message: string) => {
  $q.dialog({
    title: title,
    message: message,
  });
};

function deleteConfirm(id: number) {
  const subject = data.value.find((serviceRequest) => serviceRequest.id == id);
  $q.dialog({
    title: 'Solicitudes de Servicio',
    message: `Está seguro de que desea eliminar la Solicitud de ${subject?.type?.name} (Código: ${subject?.id}) del sistema`,
    cancel: true,
  }).onOk(() => {
    deleteServiceRequest(id);
  });
}

const fetchServiceRequests = async (params?: {
  page?: number;
  query?: object;
}) => {
  const serviceRequestResult = await FetchServiceRequests(
    'ServiceRequestForm',
    params
  );

  if (serviceRequestResult.IsSuccessful()) {
    data.value = serviceRequestResult.Payload?.items ?? [];
    pages.value.total = serviceRequestResult.Payload?.totalPages ?? 0;
    pages.value.curent = serviceRequestResult.Payload?.page ?? 0;
  } else {
    alert(
      'Solicitudes de Servicio',
      `Error: ${serviceRequestResult.Errors[0] ?? serviceRequestResult.Message}`
    );
  }
};

const fetchServiceRequestByQuery = async (params?: {
  page?: number;
  query?: object;
}) => {
  loader.showLoader('Buscando...');
  await fetchServiceRequests(params);
  loader.hideLoader();
};

const deleteServiceRequest = async (id: number) => {
  loader.showLoader('Eliminando...');

  const serviceRequestResult = await DeleteServiceRequest(id);

  if (serviceRequestResult?.IsSuccessful()) {
    await fetchServiceRequests();
  } else {
    alert(
      'Solicitudes de Servicio',
      `Error: ${serviceRequestResult.Errors[0] ?? serviceRequestResult.Message}`
    );
  }

  loader.hideLoader();
};

const goToDetail = (id: string) => {
  router.push({ name: siteMap.solicitudesServicios.detalleSolicitudServicio.name, params: { id: id } });
};

onMounted(async () => {
  loader.showLoader('Cargando...');
  await fetchServiceRequests();

  if (userInfo.value?.type != 'Business') {
    await until(businessStore.fetchBusinessIsReady).toBe(true);
    await until(usersStore.fetchUserIsReady).toBe(true);
  }
  columns.value = [
    {
      name: 'id',
      label: 'Código',
      field: (row) => row.id as number,
      required: true,
      align: 'left',
      sortable: true,
      format: (val) => `${val}`,
    },
    {
      name: 'name',
      label: 'Tipo de Solicitud',
      align: 'left',
      field: (row) => row.type?.name as string,
      sortable: true,
    },
    {
      name: 'status',
      label: 'Estado',
      field: 'status',
      format: (val) =>
        `${
          (
            Object.entries(TipoEstadoSolicitud).find((x) => x[1] == val) as [
              string,
              TipoEstadoSolicitudType
            ]
          )[0]
        }`,
      sortable: true,
      filterable: 'select',
      options: getSelectList(TipoEstadoSolicitud),
    },
    {
      name: 'createdOnUtc',
      label: 'Fecha',
      field: 'createdOnUtc',
      format: (val) => `${useDateFormat(val ?? '', 'YYYY-MM-DD').value}`,
    },
    {
      name: 'clientIdentification',
      label: 'Identificación del Cliente',
      field: (row) => row.clientIdentification?.value as string,
    },
    {
      name: 'FullNameContains',
      label: 'Nombre del Cliente',
      field: (row) => row.client?.fullName as string,
      filterable: 'input',
    },
  ];

  if (
    userInfo.value?.type == 'Business'
      ? userInfo.value?.businesses?.[0].type?.type !== 'Operator'
      : true
  )
    columns.value.push(
      {
        name: 'ResponsibleUserId',
        label: 'Representante',
        field: (row) => row.responsibleUser?.fullName as string,
        filterable: 'select',
        options: mapSelectList(userList.value ?? [], 'fullName', 'id'),
      },
      {
        name: 'BusinessOwnerId',
        label: 'Intermediario',
        field: (row) => row.businessOwner?.name as string,
        filterable: 'select',
        options: mapSelectList(businessList.value ?? [], 'name', 'id'),
      },
      {
        name: 'businessOwnerResponsibleUser',
        label: 'Gerente',
        field: (row) => row.businessOwner?.responsibleUser?.fullName as string,
      }
    );

  loader.hideLoader();
});
</script>

<template>
  <PageContainerComponent>
    <template #actions>
      <NavigationBtnComponent
        v-if="
          userInfo?.roles?.includes('ServiceRequests.Create')
        "
        :label="
          $q.screen.gt.md ? 'Crear Solicitud' : $q.screen.gt.sm ? 'Crear' : ''
        "
        icon="fa-solid fa-circle-plus"
        to="nueva-solicitud-servicio"
      />
    </template>
    <QuerableRecordsComponent
      :model-value="data"
      :title="'Solicitudes'"
      :column-props="columns"
      :pages-number="pages.total"
      :current-page="pages.curent"
      :allow-detail="userInfo?.roles?.includes('ServiceRequests.Read')"
      :allow-delete="userInfo?.roles?.includes('ServiceRequests.Delete')"
      @detail="goToDetail"
      @delete="deleteConfirm"
      @filter="fetchServiceRequestByQuery"
    />
  </PageContainerComponent>
</template>
