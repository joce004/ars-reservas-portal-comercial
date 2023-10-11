<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { UserModel } from 'src/api';
import QuerableRecordsComponent from 'src/components/ui/controls/QuerableRecordComponent.vue';
import { Estados, TipoUsuarioEmpresa } from 'src/enums/Dictionary.enum';
import { IColumn } from 'src/models/schemas/IColumn';
import {
  DeleteUser,
  FetchUsers,
} from 'src/repository/seguridad.usuarios.repository.js';
import { siteMap } from 'src/router/siteMap';
import { useAuthStore } from 'src/stores/auth.store';
import { getSelectList } from 'src/utils/array';
import { Loader } from 'src/utils/loading';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const usersData = ref<UserModel[]>([]);

const userColums = ref<IColumn<UserModel>[]>();

const pages = ref<{ curent: number; total: number }>({
  curent: 1,
  total: 1,
});

// STORES
const authStore = useAuthStore();
const { profile: userInfo } = storeToRefs(authStore);

const loader = Loader;
const $q = useQuasar();
const router = useRouter();

const alert = (title: string, message: string) => {
  $q.dialog({
    title: title,
    message: message,
  });
};

const deleteConfirm = (id: string) => {
  const user = usersData.value.find((user) => user?.id == id);

  $q.dialog({
    title: 'Usuarios',
    message: `Está seguro de que desea eliminar al usurio ${user?.fullName} (${user?.userName}) del sistema`,
    cancel: true,
  }).onOk(() => {
    deleteUser(id);
  });
};

const deleteUser = async (id: string) => {
  loader.showLoader('Eliminando...');
  const userResult = await DeleteUser(id);
  loader.hideLoader();

  if (userResult?.IsSuccessful()) {
    await fetchUsers();
  } else {
    alert('Usuarios', `Error: ${userResult.Errors[0] ?? userResult.Message}`);
  }
};

const fetchUsers = async (params?: { page?: number; query?: object }) => {
  const usersResult = await FetchUsers(params);
  if (usersResult.IsSuccessful()) {
    usersData.value = usersResult.Payload?.items ?? [];
    pages.value.total = usersResult.Payload?.totalPages ?? 1;
    pages.value.curent = usersResult.Payload?.page ?? 1;
  } else {
    alert('Usuarios', `Error: ${usersResult.Errors[0] ?? usersResult.Message}`);
  }
};

const fetchUsersByQuery = async (params?: {
  page?: number;
  query?: object;
}) => {
  loader.showLoader('Buscando...');
  await fetchUsers(params);
  loader.hideLoader();
};

const goToUserDetail = (id: string) => {
  router.push({ name: siteMap.seguridad.seguridadUsuarioDetalle.name, params: { id: id } });
};

onMounted(async () => {
  loader.showLoader('Cargando...');

  userInfo.value?.roles?.includes('Users.Read') ? await fetchUsers() : null;

  userColums.value = [
    {
      name: 'code',
      label: 'Código',
      field: (row) => row.userName as string,
      required: true,
      align: 'left',
      format: (val) => `${val}`,
      sortable: true,
    },
    {
      name: 'firstNameContains',
      align: 'left',
      label: 'Primer Nombre',
      field: (row) => row.firstName as string,
      sortable: true,
      filterable: 'input',
      hide: true,
    },
    {
      name: 'firstLastNameContains',
      align: 'left',
      label: 'Primer Apellido',
      field: (row) => row.firstLastName as string,
      sortable: true,
      filterable: 'input',
      hide: true,
    },
    {
      name: 'fullName',
      align: 'left',
      label: 'Nombre',
      field: 'fullName',
      sortable: true,
    },
    {
      name: 'email',
      label: 'Correo',
      field: 'email',
      sortable: true,
    },
    {
      name: 'phoneNumber',
      label: 'Teléfono',
      field: 'phoneNumber',
    },
    {
      name: 'businessUserType',
      label: 'Tipo Usuario',
      field: 'businessUserType',
      filterable: 'select',
      options: getSelectList(TipoUsuarioEmpresa),
      hide: true,
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
      options: getSelectList(Estados),
    },
  ];

  loader.hideLoader();
});
</script>

<template>
  <QuerableRecordsComponent
    :model-value="usersData"
    title="Usuarios"
    :column-props="userColums"
    :pages-number="pages.total"
    :current-page="pages.curent"
    allow-detail
    :allow-delete="userInfo?.roles?.includes('Users.Delete')"
    @detail="goToUserDetail"
    @delete="(id) => deleteConfirm(id)"
    @filter="fetchUsersByQuery"
  />
</template>
