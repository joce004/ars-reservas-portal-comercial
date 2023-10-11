<script setup lang="ts">
import { until, useCloned, useDateFormat } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { RoleProfileEditionModel, RoleModel, RoleProfileModel } from 'src/api';
import DialogFormComponent from 'src/components/ui/containers/DialogFormComponent.vue';
import QuerableRecordsComponent from 'src/components/ui/controls/QuerableRecordComponent.vue';
import FormGeneratorComponent from 'src/components/ui/forms/FormGeneratorComponent.vue';
import { Estados } from 'src/enums/Dictionary.enum';
import { initEditProfileForm } from 'src/models/forms/seguridad/model.seguridad.perfiles';
import { IColumn } from 'src/models/schemas/IColumn';
import { IFormSpecification } from 'src/models/schemas/IFormSpecification';
import {
  DeleteProfiles,
  DeleteRoleProfile,
  FetchRoleProfiles,
  GetProfile,
  PostRoleProfile,
  PutProfiles,
} from 'src/repository/seguridad.perfiles.repository';
import { useAuthStore } from 'src/stores/auth.store';
import { useCatalogStore } from 'src/stores/catalog.store';
import { getSelectList, sortObjectArray } from 'src/utils/array';
import { Loader } from 'src/utils/loading';
import { onMounted, ref } from 'vue';

const roleProfileData = ref<RoleProfileModel[]>([]);
const profileColums = ref<IColumn<RoleProfileModel>[]>();

const { cloned: rolesSeter, sync: resetRolesSeter } = useCloned<
  { id: string; name: string; val: boolean }[]
>([]);

const pages = ref<{ curent: number; total: number }>({ curent: 1, total: 1 });

const { cloned: dialogHandler, sync: resetDialogData } = useCloned<
  Nullable<{
    show: boolean;
    model: object;
    schema: IFormSpecification<RoleProfileEditionModel>;
    formTitle: string;
  }>
>({
  show: false,
  model: null,
  schema: null,
  formTitle: null,
});

// STORES
const store = useCatalogStore();
const { fetchRolesList } = store;
const { roles: roleList } = storeToRefs(store);

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
  const roleProfile = roleProfileData.value.find(
    (roleProfile) => roleProfile.id?.toString() == id
  );

  $q.dialog({
    title: 'Perfiles',
    message: `Está seguro de que desea eliminar el perfil (${roleProfile?.name}) del sistema`,
    cancel: true,
  }).onOk(() => {
    deleteRoleProfile(Number.parseInt(id));
  });
}

const roleControlInitializer = (userRoles: RoleModel[]) => {
  const roles = sortObjectArray<RoleModel>(roleList.value ?? [], 'name');
  roles.forEach((role) =>
    rolesSeter.value.push({
      id: role.id as string,
      name: role.name as string,
      val: !!userRoles?.find((userRole) =>
        userRole.id ? userRole.id === role.id : false
      ),
    })
  );
};

const editProfile = async (id: number) => {
  loader.showLoader('Cargando...');
  const resultProfile = await GetProfile(id);

  if (resultProfile.IsSuccessful() && resultProfile.Payload) {
    roleControlInitializer(resultProfile.Payload.roles ?? []);
    dialogHandler.value = {
      show: true,
      model: resultProfile.Payload,
      schema: initEditProfileForm().form,
      formTitle: 'Editar Perfil',
    };
  }
  loader.hideLoader();
};

const submit = async () => {
  loader.showLoader('Guardando...');
  if (dialogHandler.value.model) {
    const roleProfileResult = await PutProfiles(dialogHandler.value.model);

    if (roleProfileResult?.IsSuccessful()) {
      dialogHandler.value.show = false;
      await fetchRoleProfiles();
    } else {
      alert(
        'Perfiles',
        `Error: ${roleProfileResult.Errors[0] ?? roleProfileResult.Message}`
      );
    }
  }

  loader.hideLoader();
};

const updateUserRole = async (
  index: number,
  roleId: string,
  profileId: number,
  val: boolean
) => {
  if (index && roleId && profileId) {
    if (val) {
      loader.showLoader('Agregando...');

      const roleResult = await PostRoleProfile({
        profileId: profileId,
        roleId: roleId,
      });

      loader.hideLoader();

      if (!roleResult?.IsSuccessful()) {
        rolesSeter.value[index].val = !rolesSeter.value[index].val;
        alert('Roles', `Error: ${roleResult.Errors[0] ?? roleResult.Message}`);
      }
    }
    if (!val) {
      loader.showLoader('Eliminando...');

      const roleResult = await DeleteRoleProfile({
        profileId: profileId,
        roleId: roleId,
      });
      loader.hideLoader();

      if (!roleResult?.IsSuccessful()) {
        rolesSeter.value[index].val = !rolesSeter.value[index].val;
        alert('Roles', `Error: ${roleResult.Errors[0] ?? roleResult.Message}`);
      }
    }
  } else {
    rolesSeter.value[index].val = !rolesSeter.value[index].val;
  }
};

const deleteRoleProfile = async (id: number) => {
  loader.showLoader('Eliminando...');
  const roleProfileResult = await DeleteProfiles(id);
  loader.hideLoader();

  if (roleProfileResult?.IsSuccessful()) {
    await fetchRoleProfiles();
  } else {
    alert(
      'Perfiles',
      `Error: ${roleProfileResult.Errors[0] ?? roleProfileResult.Message}`
    );
  }
};

const fetchRoleProfiles = async (params?: {
  page?: number;
  query?: object;
}) => {
  const roleProfileResult = await FetchRoleProfiles(params);
  if (roleProfileResult.IsSuccessful()) {
    roleProfileData.value = roleProfileResult.Payload?.items ?? [];
    pages.value.total = roleProfileResult.Payload?.totalPages ?? 1;
    pages.value.curent = roleProfileResult.Payload?.page ?? 1;
  } else {
    alert(
      'Perfiles',
      `Error: ${roleProfileResult.Errors[0] ?? roleProfileResult.Message}`
    );
  }
};

const fetchProfileRolesByQuery = async (params?: {
  page?: number;
  query?: object;
}) => {
  loader.showLoader('Buscando...');
  await fetchRoleProfiles(params);
  loader.hideLoader();
};

onMounted(async () => {
  loader.showLoader('Cargando...');
  if (userInfo.value?.roles?.includes('Roles.Read')) {
    const rolesList = fetchRolesList();
    rolesList.fetchRolesExec();
    await until(rolesList.fetchRolesIsReady).toBe(true);
  }

  await fetchRoleProfiles();

  profileColums.value = [
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
      name: 'nameContains',
      label: 'Descripción',
      field: (row) => row.description as string,
      style: 'max-width: 500px',
      required: true,
      align: 'left',
      format: (val) => `${val ?? ''}`,
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
    {
      name: 'updatedBy',
      label: 'Actualizado por:',
      field: (row) => row.updatedBy as string,
      align: 'left',
      format: (val) => `${val ? val : ''}`,
      sortable: true,
    },
    {
      name: 'updatedOnUtc',
      label: 'Última Actualización',
      field: (row) => row.updatedOnUtc as string,
      align: 'left',
      format: (val) => `${val ? useDateFormat(val, 'YYYY-MM-DD').value : ''}`,
      sortable: true,
    },
  ];

  loader.hideLoader();
});
</script>

<template>
  <QuerableRecordsComponent
    :model-value="roleProfileData"
    title="Perfiles"
    :column-props="profileColums"
    :pages-number="pages.total"
    :current-page="pages.curent"
    hide-filters
    :allow-edit="userInfo?.roles?.includes('RoleProfiles.Edit')"
    :allow-delete="userInfo?.roles?.includes('RoleProfiles.Delete')"
    @edit="editProfile"
    @delete="(id) => deleteConfirm(id)"
    @filter="fetchProfileRolesByQuery"
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
            resetRolesSeter();
          }
        "
      >
        <template #extraFields>
          <q-expansion-item class="full-width" header-class="text-primary">
            <template #header>
              <q-item-section>
                <span class="flex items-center text-h6 font-semiboldregular">
                  <q-icon
                    name="fa-solid fa-unlock-keyhole"
                    size="1.1rem"
                    class="q-mr-md"
                  />
                  Roles
                </span>
              </q-item-section>
            </template>
            <q-card>
              <template
                v-for="(role, roleIndex) in rolesSeter"
                :key="roleIndex"
              >
                <q-separator class="q-mx-sm q-my-sm" />
                <q-card-section
                  class="q-py-none flex no-wrap items-center justify-between"
                >
                  <div>{{ role.name }}</div>
                  <q-chip
                    class="q-pa-md"
                    :color="role.val ? 'secondary' : 'info'"
                  >
                    <template v-if="$q.screen.gt.xs">
                      <span class="text-white q-px-md">
                        {{ role.val ? 'Activo' : 'Inactivo' }}
                      </span>
                    </template>
                    <q-toggle
                      v-model="role.val"
                      color="white"
                      keep-color
                      class="q-ma-none q-pa-none"
                      @update:model-value="
                        updateUserRole(
                          roleIndex,
                          role.id,
                          (dialogHandler.model as RoleProfileModel)
                            .id as number,
                          role.val
                        )
                      "
                    />
                  </q-chip>
                </q-card-section>
              </template>
            </q-card>
          </q-expansion-item>
        </template>
      </FormGeneratorComponent>
    </DialogFormComponent>
  </template>
  <!-- /Dialogs -->
</template>
