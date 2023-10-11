<script setup lang="ts">
import { until, useCloned } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import {
  BusinessCreationModel,
  BusinessEditionModel,
  BusinessIdentificationType,
  BusinessModel,
  BusinessType,
} from 'src/api';
import NavigationBtnComponent from 'src/components/ui/buttom/NavigationBtnComponent.vue';
import DialogFormComponent from 'src/components/ui/containers/DialogFormComponent.vue';
import PageContainerComponent from 'src/components/ui/containers/PageContainerComponent.vue';
import QuerableRecordsComponent from 'src/components/ui/controls/QuerableRecordComponent.vue';
import FormGeneratorComponent from 'src/components/ui/forms/FormGeneratorComponent.vue';
import { Estados, TipoEmpresa } from 'src/enums/Dictionary.enum';
import {
  BusinessForm,
  CustomBusinessCreationModel,
  CustomBusinessEditionModel,
  initBusinessForm,
  initCreateBusinessModel,
  initEditBusinessModel,
} from 'src/models/forms/empresas/model.empresas';
import { IColumn } from 'src/models/schemas/IColumn';
import { IForm } from 'src/models/schemas/IFormSpecification';
import {
  DeleteBusiness,
  FetchBusinesses,
  GetBusiness,
  PostBusiness,
  PutBusiness,
} from 'src/repository/empresa.repository';
import { useAuthStore } from 'src/stores/auth.store';
import { useCatalogStore } from 'src/stores/catalog.store';
import { getSelectList, mapSelectList } from 'src/utils/array';
import { Loader } from 'src/utils/loading';
import { padronBusiness } from 'src/utils/padron';
import { onMounted, ref, watch } from 'vue';

const columns = ref<IColumn<BusinessModel>[]>();
const data = ref<BusinessModel[]>([]);
const pages = ref<{ curent: number; total: number }>({ curent: 0, total: 0 });

const { cloned: dialogHandler, sync: resetDialogData } = useCloned<
  Nullable<{
    show: boolean;
    model:
      | { action: 'C'; schema: CustomBusinessCreationModel }
      | { action: 'U'; schema: CustomBusinessEditionModel };
    schema: IForm<BusinessForm>;
    formTitle: string;
  }>
>({
  show: false,
  model: null,
  schema: null,
  formTitle: null,
});

// STORES
const catalogStore = useCatalogStore();
const { fetchUsersList } = catalogStore;
const { users: userList } = storeToRefs(catalogStore);

const usersStore = fetchUsersList();
usersStore.fetchUsersExec();

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

function deleteConfirm(id: number) {
  const subject = data.value.find((business) => business.id == id);
  $q.dialog({
    title: 'Intermediarios',
    message: `Está seguro de que desea eliminar ${subject?.name} del sistema`,
    cancel: true,
  }).onOk(() => {
    deleteBusiness(id);
  });
}

const createBusiness = async () => {
  if (!usersStore.fetchUserIsReady.value) {
    loader.showLoader('Cargando...');
    await until(usersStore.fetchUserIsReady).toBe(true);
    loader.hideLoader();
  }
  dialogHandler.value = {
    show: true,
    model: {
      action: 'C',
      schema: initCreateBusinessModel(userInfo.value?.type),
    },
    schema: initBusinessForm(userInfo.value?.type),
    formTitle: 'Crear Intermediario',
  };

  if (dialogHandler.value.schema?.form?.responsibleUserId) {
    dialogHandler.value.schema.form.responsibleUserId.options = mapSelectList(
      userList.value ?? [],
      'fullName',
      'id'
    );
  }
};

const editBusiness = async (id: number) => {
  loader.showLoader('Cargando...');
  if (!usersStore.fetchUserIsReady.value) {
    await until(usersStore.fetchUserIsReady).toBe(true);
  }
  const businessResult = await GetBusiness(id);
  loader.hideLoader();
  if (businessResult.IsSuccessful() && businessResult.Payload)
    dialogHandler.value = {
      show: true,
      model: {
        action: 'U',
        schema: initEditBusinessModel(businessResult.Payload),
      },
      schema: initBusinessForm(userInfo.value?.type),
      formTitle: 'Editar Intermediarios',
    };

  if (dialogHandler.value.schema?.form?.responsibleUserId) {
    dialogHandler.value.schema.form.responsibleUserId.options = mapSelectList(
      userList.value ?? [],
      'fullName',
      'id'
    );
  }
};

const fetchBusinesses = async (params?: {
  page?: number;
  query?: Record<string, string>;
}) => {
  const businessesResult = await FetchBusinesses(params, userInfo.value?.type);

  if (businessesResult.IsSuccessful()) {
    data.value = businessesResult.Payload?.items ?? [];
    pages.value.total = businessesResult.Payload?.totalPages ?? 1;
    pages.value.curent = businessesResult.Payload?.page ?? 1;
  } else {
    alert(
      'Intermediarios',
      `Error: ${businessesResult.Errors[0] ?? businessesResult.Message}`
    );
  }
};

const fetchBusinessesByQuery = async (params?: {
  page?: number;
  query?: Record<string, string>;
}) => {
  loader.showLoader('Buscando...');
  await fetchBusinesses(params);
  loader.hideLoader();
};

const submit = async () => {
  loader.showLoader('Guardando...');
  if (dialogHandler.value.model) {
    if (dialogHandler.value?.model?.action == 'C') {
      const modelToPost: BusinessCreationModel = {
        name: dialogHandler.value.model.schema.name,
        code: dialogHandler.value.model.schema.code,
        identificationType: dialogHandler.value.model.schema
          .identificationType as BusinessIdentificationType,
        identification: dialogHandler.value.model.schema.identification,
        type: dialogHandler.value.model.schema.type as BusinessType,
        responsibleUserId: dialogHandler.value.model.schema.responsibleUserId,
        contactInfo: [
          { type: 'Email', value: dialogHandler.value.model.schema.email },
          { type: 'Phone', value: dialogHandler.value.model.schema.phone },
          {
            type: 'Cellphone',
            value: dialogHandler.value.model.schema.celPhone,
          },
        ],
        addressLine1: dialogHandler.value.model.schema.addressLine1,
        addressLine2: dialogHandler.value.model.schema.addressLine2,
        inheritServiceRequestTypesFromOwner:
          (dialogHandler.value.model.schema.type as BusinessType) ==
          'Intermediary'
            ? true
            : undefined,
        assignAllServiceRequestTypes:
          (dialogHandler.value.model.schema.type as BusinessType) == 'Default'
            ? true
            : undefined,
        dataByType: {
          CantidadMaximaAsegurados:
            dialogHandler.value.model.schema.cantidadMaximaAsegurados,
        },
      };

      const businessResult = await PostBusiness(modelToPost);

      if (businessResult?.IsSuccessful()) {
        resetDialogData();
        await fetchBusinesses();
      } else {
        alert(
          'Intermediarios',
          `Error: ${businessResult.Errors[0] ?? businessResult.Message}`
        );
      }
    }

    if (
      dialogHandler.value?.model?.action == 'U' &&
      dialogHandler.value.model.schema.id
    ) {
      const modelToPut: BusinessEditionModel = {
        id: dialogHandler.value.model.schema.id,
        name: dialogHandler.value.model.schema.name,
        code: dialogHandler.value.model.schema.code,
        identificationType: dialogHandler.value.model.schema
          .identificationType as BusinessIdentificationType,
        identification: dialogHandler.value.model.schema.identification,
        type: dialogHandler.value.model.schema.type as BusinessType,
        responsibleUserId: dialogHandler.value.model.schema.responsibleUserId,
        contactInfo: [
          { type: 'Email', value: dialogHandler.value.model.schema.email },
          { type: 'Phone', value: dialogHandler.value.model.schema.phone },
          {
            type: 'Cellphone',
            value: dialogHandler.value.model.schema.celPhone,
          },
        ],
        addressLine1: dialogHandler.value.model.schema.addressLine1,
        addressLine2: dialogHandler.value.model.schema.addressLine2,
        dataByType: {
          CantidadMaximaAsegurados: Number.parseInt(
            dialogHandler.value.model.schema.cantidadMaximaAsegurados ?? '0'
          ),
        },
      };

      const businessResult = await PutBusiness(modelToPut);

      if (businessResult?.IsSuccessful()) {
        resetDialogData();
        await fetchBusinesses();
      } else {
        alert(
          'Intermediarios',
          `Error: ${businessResult.Errors[0] ?? businessResult.Message}`
        );
      }
    }
  }
  loader.hideLoader();
  catalogStore.$state.businesses == null;
  catalogStore.fetchBusinessesList().fetchBusinessExec();
};

const deleteBusiness = async (id: number) => {
  loader.showLoader('Eliminando...');

  const businessResult = await DeleteBusiness(id);

  if (businessResult?.IsSuccessful()) {
    await fetchBusinesses();
  } else {
    alert(
      'Intermediarios',
      `Error: ${businessResult.Errors[0] ?? businessResult.Message}`
    );
  }
  loader.hideLoader();
};

const findBusiness = async () => {
  if (dialogHandler.value.model?.schema.identification) {
    loader.showLoader('Consultando...');
    const result = await padronBusiness(
      dialogHandler.value.model.schema.identification
    );

    loader.hideLoader();
    if (!result.error && dialogHandler.value.model) {
      dialogHandler.value.model.schema.identification = result.model?.id;
      dialogHandler.value.model.schema.name =
        result.model?.nombreComercial?.trim().length
          ? result.model?.nombreComercial
          : result.model?.razonSocial;
      dialogHandler.value.model.schema.phone = result.model?.telefono ?? null;
      dialogHandler.value.model.schema.addressLine1 = `${
        result.model?.sector?.trim().length ? result.model?.sector + ',' : ''
      } ${
        result.model?.calle?.trim().length ? result.model?.calle + ',' : ''
      } ${
        result.model?.numero?.trim().length ? result.model?.numero + ',' : ''
      }`;
    } else {
      alert('Solicitudes de Servicio', result.error ?? '');
    }
  }
};

onMounted(async () => {
  loader.showLoader('Cargando...');

  //await until(usersStore.fetchUserIsReady).toBe(true);
  await fetchBusinesses();

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
      align: 'left',
      label: 'Nombre',
      field: 'name',
      filterable: 'input',
      sortable: true,
    },
    {
      name: 'Owner',
      align: 'left',
      label: 'Broker',
      field: (model) => model.owner?.name ?? '',
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
      filterable: 'select',
      options: getSelectList(Estados),
    },
  ];

  if (userInfo.value?.type != 'Business') {
    columns.value.push({
      name: 'type',
      align: 'left',
      label: 'Tipo',
      format: (val) =>
        `${
          (
            Object.entries(TipoEmpresa).find((x) => x[1] == val) as [
              string,
              'Default' | 'Intermediary'
            ]
          )[0]
        }`,
      field: 'type',
      sortable: true,
    });
  }
  loader.hideLoader();
});

watch(
  () => dialogHandler.value.model?.schema.type,
  (n) => {
    n === TipoEmpresa.Intermediario &&
      dialogHandler.value.schema?.methods?.setResponsibleUserToRequired();
    n === TipoEmpresa.Empresa &&
      dialogHandler.value.schema?.methods?.setResponsibleUserToUnRequired();
  }
);
</script>

<template>
  <PageContainerComponent :user-type="userInfo?.type">
    <template #actions>
      <NavigationBtnComponent
        v-if="userInfo?.roles?.includes('Businesses.Create')"
        :label="
          $q.screen.gt.md
            ? 'Crear Intermediario'
            : $q.screen.gt.sm
            ? 'Crear'
            : ''
        "
        icon="fa-solid fa-circle-plus"
        @click="createBusiness"
      />
    </template>

    <QuerableRecordsComponent
      :model-value="data"
      title="Intermediarios"
      :column-props="columns"
      :pages-number="pages.total"
      :current-page="pages.curent"
      :allow-edit="userInfo?.roles?.includes('Businesses.Edit')"
      :allow-delete="userInfo?.roles?.includes('Businesses.Delete')"
      @edit="editBusiness"
      @delete="deleteConfirm"
      @filter="fetchBusinessesByQuery"
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
        v-model="dialogHandler.model.schema"
        :form-schema="dialogHandler.schema.form"
        :sections="dialogHandler.schema.sections"
        :form-name="dialogHandler.formTitle"
        icon="fa-solid fa-industry"
        :submit-label="dialogHandler.formTitle"
        controls
        @fetch-business="findBusiness()"
        @close="resetDialogData()"
        @submit="submit()"
      />
    </DialogFormComponent>
  </template>
  <!-- /Dialogs -->
</template>
