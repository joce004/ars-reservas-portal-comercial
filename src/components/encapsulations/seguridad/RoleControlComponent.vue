<script setup lang="ts">
import { useCloned, useDateFormat } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { RoleModel } from 'src/api';
import DialogFormComponent from 'src/components/ui/containers/DialogFormComponent.vue';
import QuerableRecordsComponent from 'src/components/ui/controls/QuerableRecordComponent.vue';
import FormGeneratorComponent from 'src/components/ui/forms/FormGeneratorComponent.vue';
import { Estados } from 'src/enums/Dictionary.enum';
import {
initEditarRolForm,
initEditarRolModel
} from 'src/models/forms/seguridad/model.seguridad.roles';
import { IColumn } from 'src/models/schemas/IColumn';
import { IFieldSpecification } from 'src/models/schemas/IFormSpecification';
import {
DeleteRoles,
FetchRoles,
GetRole,
PutRoles
} from 'src/repository/seguridad.roles.repository';
import { useAuthStore } from 'src/stores/auth.store';
import { getSelectList } from 'src/utils/array';
import { Loader } from 'src/utils/loading';
import { onMounted, ref } from 'vue';

const roles = ref<RoleModel[]>([]);
const roleColums = ref<IColumn<RoleModel>[]>();

const pages = ref<{ curent: number; total: number }>({ curent: 1, total: 1 });

const { cloned: dialogHandler, sync: resetDialogData } = useCloned<
  Nullable<{
    show: boolean;
    model: object;
    schema: Record<string, IFieldSpecification>;
    formTitle: string;
  }>
>({
  show: false,
  model: null,
  schema: null,
  formTitle: null,
});

// STORES
const authStore = useAuthStore();
const { profile: userInfo } = storeToRefs(authStore);

const loader = Loader;
const $q = useQuasar();

const alert = (title: string, message: string) => {
  $q.dialog({
    title: title,
    message: message,
  });
};

function deleteConfirm(id: string) {
  const role = roles.value.find((role) => role.id == id);

  $q.dialog({
    title: 'Roles',
    message: `Está seguro de que desea eliminar el rol (${role?.name}) del sistema`,
    cancel: true,
  }).onOk(() => {
    deleteRole(id);
  });
}

const editRole = async (id: string) => {
  loader.showLoader('Cargando...');
  const resultProfile = await GetRole(id);
  if (resultProfile.IsSuccessful() && resultProfile.Payload) {
    dialogHandler.value = {
      show: true,
      model: initEditarRolModel(resultProfile.Payload),
      schema: initEditarRolForm().form,
      formTitle: 'Editar Rol',
    };
  }
  loader.hideLoader();
};

const submit = async () => {
  loader.showLoader('Guardando...');
  if (dialogHandler.value.model) {
    const roleResult = await PutRoles(dialogHandler.value.model);
    if (roleResult?.IsSuccessful()) {
      dialogHandler.value.show = false;
      await fetchRoles();
    } else {
      alert('Roles', `Error: ${roleResult.Errors[0] ?? roleResult.Message}`);
    }
  }
  loader.hideLoader();
};

const deleteRole = async (id: string) => {
  loader.showLoader('Eliminando...');
  const roleResult = await DeleteRoles(id);
  loader.hideLoader();

  if (roleResult?.IsSuccessful()) {
    await fetchRoles();
  } else {
    alert('Roles', `Error: ${roleResult.Errors[0] ?? roleResult.Message}`);
  }
};

const fetchRoles = async (params?: { page?: number; query?: object }) => {
  const rolesResult = await FetchRoles(params);
  if (rolesResult.IsSuccessful()) {
    roles.value = rolesResult.Payload?.items ?? [];
    pages.value.total = rolesResult.Payload?.totalPages ?? 1;
    pages.value.curent = rolesResult.Payload?.page ?? 1;
  } else {
    alert('Roles', `Error: ${rolesResult.Errors[0] ?? rolesResult.Message}`);
  }
};

const fetchRolesByQuery = async (params?: {
  page?: number;
  query?: object;
}) => {
  loader.showLoader('Buscando...');
  await fetchRoles(params);
  loader.hideLoader();
};

onMounted(async () => {
  loader.showLoader('Cargando...');

  await fetchRoles();

  roleColums.value = [
    {
      name: 'nameContains',
      label: 'Nombre',
      field: (row) => row.name as string,
      required: true,
      align: 'left',
      format: (val) => `${val}`,
      sortable: true,
      filterable: 'input',
    },
    {
      name: 'status',
      align: 'left',
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
    {
      name: 'createdBy',
      label: 'Creado por:',
      field: (row) => row.createdBy as string,
      align: 'left',
      format: (val) => `${val}`,
      sortable: true,
    },
    {
      name: 'createdOnUtc',
      label: 'Fecha de Creación',
      field: (row) => row.createdOnUtc as string,
      align: 'left',
      format: (val) => `${useDateFormat(val ?? '', 'YYYY-MM-DD').value}`,
      sortable: true,
    },
  ];
  loader.hideLoader();
});
</script>

<template>
  <QuerableRecordsComponent
    :model-value="roles"
    title="Roles"
    :column-props="roleColums"
    :pages-number="pages.total"
    :current-page="pages.curent"
    hide-filters
    :allow-edit="userInfo?.roles?.includes('Roles.Edit')"
    :allow-delete="userInfo?.roles?.includes('Roles.Delete')"
    @edit="editRole"
    @delete="(id) => deleteConfirm(id)"
    @filter="fetchRolesByQuery"
  />
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
        :form-schema="dialogHandler.schema"
        :form-name="dialogHandler.formTitle"
        :submit-label="dialogHandler.formTitle"
        controls
        icon="fa-solid fa-user"
        @submit="submit"
        @close="
          () => {
            resetDialogData();
          }
        "
      >
      </FormGeneratorComponent>
    </DialogFormComponent>
  </template>
  <!-- /Dialogs -->
</template>
