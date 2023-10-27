<script setup lang="ts">
import { until, useCloned, useDateFormat } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import {
  UserType,
  BusinessUserModel,
  RoleProfileModel,
  UserModel,
  ErrorResponse,
  UserEditionModel,
  UserChangePasswordModel,
  BusinessUserModelPaged,
} from 'src/api';
import { $businessUserApi, $roleProfileApi, $userApi } from 'src/boot/api';
import NavigationBtnComponent from 'src/components/ui/buttom/NavigationBtnComponent.vue';
import DialogFormComponent from 'src/components/ui/containers/DialogFormComponent.vue';
import ItemResume from 'src/components/ui/containers/ItemResume.vue';
import PageContainerComponent from 'src/components/ui/containers/PageContainerComponent.vue';
import SectionContainerComponent from 'src/components/ui/containers/SectionContainerComponent.vue';
import QuerableRecordsComponent from 'src/components/ui/controls/QuerableRecordComponent.vue';
import FormGeneratorComponent from 'src/components/ui/forms/FormGeneratorComponent.vue';
import { Estados } from 'src/enums/Dictionary.enum';
import {
  initEditAcess,
  initEditAcessForm,
  initEditUserForm,
  initEditUserModel,
  initEditUserPass,
  initEditUserPassForm,
  updateBusinessUserModel,
} from 'src/models/forms/seguridad/model.seguridad.usuarios';
import { IColumn } from 'src/models/schemas/IColumn';
import { IFormSpecification } from 'src/models/schemas/IFormSpecification';
import {} from 'src/repository/seguridad.usuarios.repository.js';
import { siteMap } from 'src/router/siteMap';
import { useAuthStore } from 'src/stores/auth.store';
import { useCatalogStore } from 'src/stores/catalog.store';
import { Loader } from 'src/utils/loading';
import { IOperationResult } from 'src/utils/operation-result';
import { ResolveRequestOperation } from 'src/utils/request';
import { onMounted, ref, toRaw } from 'vue';

const props = defineProps<{
  id: string;
}>();

const model = ref<UserModel>();
const data = ref<BusinessUserModel[]>([]);
const columns = ref<IColumn<BusinessUserModel>[]>();
const pages = ref<{ curent: number; total: number }>({ curent: 0, total: 0 });

const { cloned: dialogHandler, sync: resetDialogData } = useCloned<
  Nullable<
    | {
        action: 'update-user';
        show: boolean;
        model: UserEditionModel;
        schema: IFormSpecification<UserEditionModel>;
        formTitle: string;
      }
    | {
        action: 'update-password';
        show: boolean;
        model: UserChangePasswordModel;
        schema: IFormSpecification<UserChangePasswordModel>;
        formTitle: string;
      }
    | {
        action: 'update-access';
        show: boolean;
        model: updateBusinessUserModel;
        schema: IFormSpecification<updateBusinessUserModel>;
        formTitle: string;
      }
  >
>({
  action: null,
  show: false,
  model: null,
  schema: null,
  formTitle: null,
});

const { cloned: profilesSeter, sync: resetProfileSeter } = useCloned<
  { id: number; name: string; description: string; val: boolean }[]
>([]);

// STORES
const store = useCatalogStore();
const {
  users: userList,
  officers: officerList,
  profiles: profileList,
} = storeToRefs(store);
const { fetchUsersList, fetchOfficersList, fetchProfilesList } = store;

const usersList = fetchUsersList();
const profilesList = fetchProfilesList();
const officersList = fetchOfficersList();

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

const roleControlInitializer = (userProfiles: RoleProfileModel[]) => {
  resetProfileSeter();
  profileList.value?.forEach((profile) =>
    profilesSeter.value.push({
      id: profile.id as number,
      name: profile.name as string,
      description: profile.description as string,
      val: !!userProfiles?.find((userProfile) =>
        userProfile.id ? userProfile.id === profile.id : false
      ),
    })
  );
};

const edit = () => {
  if (model.value) {
    dialogHandler.value = {
      show: true,
      model: initEditUserModel(model.value),
      schema: initEditUserForm(),
      action: 'update-user',
      formTitle: 'Editar Datos del Usuario',
    };
  }
};

const editPassword = () => {
  dialogHandler.value = {
    show: true,
    model: initEditUserPass(props.id),
    schema: initEditUserPassForm(),
    action: 'update-password',
    formTitle: 'Actulizar Contraseña',
  };
};

const editBusinessUser = async (id: number) => {
  loader.showLoader('Guardando...');
  const businessResult = await ResolveRequestOperation<BusinessUserModel>({
    request: () =>
      $businessUserApi.apiBusinessesUsersIdGet({
        id: id,
      }),
  });
  loader.hideLoader();
  if (businessResult.IsSuccessful() && businessResult.Payload) {
    const officers = officerList.value?.filter(
      (officer) =>
        officer.businessId == model.value?.briefBusinessUsers?.[0]?.business?.id
    );
    dialogHandler.value = {
      show: true,
      model: initEditAcess(businessResult.Payload),
      schema: initEditAcessForm(officers ?? []),
      formTitle: 'Editar Acceso',
      action: 'update-access',
    };
  } else {
    alert(
      'Usuario',
      'Error: No se pudo obtener los datos para la gestión de los accesos.'
    );
  }
};

const submit = async () => {
  loader.showLoader('Guardando...');
  if (dialogHandler.value.model) {
    let result:
      | IOperationResult<void>
      | IOperationResult<UserModel>
      | IOperationResult<BusinessUserModel>
      | null = null;
    switch (dialogHandler.value.action) {
      case 'update-password':
        let updatePasswordModel = toRaw(dialogHandler.value.model);
        result = await ResolveRequestOperation<void>({
          request: () =>
            $userApi.apiUsersChangePasswordPut({
              userChangePasswordModel: updatePasswordModel,
            }),
          messageError: 'No se pudo actualizar la contraseña.',
        });

        break;
      case 'update-user':
        const updateUserModel = toRaw(dialogHandler.value.model);
        result = await ResolveRequestOperation<UserModel>({
          request: () =>
            $userApi.apiUsersPut({
              userEditionModel: updateUserModel,
            }),
          messageError: 'No se pudo modificar el usuario.',
        });

        break;
      case 'update-access':
        const updateBusinessUserModel = toRaw(dialogHandler.value.model);
        result = await ResolveRequestOperation<BusinessUserModel>({
          request: () =>
            $businessUserApi.apiBusinessesUsersPut({
              businessUserEditionModel: {
                id: updateBusinessUserModel.id,
                responsibleBusinessUserId:
                  updateBusinessUserModel.responsibleBusinessUserId,
                status: updateBusinessUserModel.status,
                type: { type: updateBusinessUserModel.type },
              },
            }),
          messageError: 'No se pudo modificar el acceso.',
        });
        break;
    }
    loader.hideLoader();

    if (result?.IsSuccessful()) {
      fechUser(props.id);
      fechBusinessUser();
      resetDialogData();
    } else {
      alert('Usuario', `Error: ${result?.Errors[0] ?? result?.Message}`);
    }
  }
};

const fechUser = async (id: string) => {
  const userResult = await ResolveRequestOperation<UserModel>({
    request: () =>
      $userApi.apiUsersIdGet({
        id: id,
        rawIncludes: ['Profiles', 'briefBusinessUsers'],
      }),
  });

  if (userResult.IsSuccessful() && userResult.Payload) {
    model.value = userResult.Payload;
    roleControlInitializer(userResult.Payload.profiles ?? []);
  } else {
    alert('Usuario', 'No se pudo obtener los datos del usuario.');
  }
};

const fechBusinessUser = async () => {
  const businessUserResult =
    await ResolveRequestOperation<BusinessUserModelPaged>({
      request: () =>
        $businessUserApi.apiBusinessesUsersGet({
          userId: props.id,
          rawIncludes: ['business', 'responsibleBusinessUser.User'],
        }),
    });

  if (businessUserResult.IsSuccessful() && businessUserResult.Payload) {
    data.value = businessUserResult.Payload.items ?? [];
  } else {
    alert(
      'Usuario',
      'Error: No se pudo obtener el listado de intermediarios para el manejo de los accesos.'
    );
  }
};

const updateUserProfile = async (
  index: number,
  profileId: number,
  val: boolean
) => {
  if (typeof index === 'number' && profileId) {
    if (val) {
      loader.showLoader('Agregando...');

      const roleProfileResult = await ResolveRequestOperation<ErrorResponse>({
        request: () =>
          $roleProfileApi.apiProfilesUserPost({
            addOrDeleteUserToProfileModel: {
              profileId: profileId,
              userId: model.value?.id,
            },
          }),
      });

      if (roleProfileResult?.IsSuccessful()) {
        await fechUser(props.id);
      } else {
        profilesSeter.value[index].val = !profilesSeter.value[index].val;
        alert('Usuario', 'Error: No se pudo añadir el perfil al usuario.');
      }
      loader.hideLoader();
    }
    if (!val) {
      loader.showLoader('Eliminando...');
      const roleProfileResult = await ResolveRequestOperation<ErrorResponse>({
        request: () =>
          $roleProfileApi.apiProfilesUserDelete({
            addOrDeleteUserToProfileModel: {
              profileId: profileId,
              userId: model.value?.id,
            },
          }),
      });

      if (roleProfileResult?.IsSuccessful()) {
        await fechUser(props.id);
      } else {
        profilesSeter.value[index].val = !profilesSeter.value[index].val;
        alert('Usuario', 'Error: No se pudo remover el perfil al usuario.');
      }
      loader.hideLoader();
    }
  } else {
    profilesSeter.value[index].val = !profilesSeter.value[index].val;
  }
};

onMounted(async () => {
  loader.showLoader('Cargando...');
  usersList.fetchUsersExec();
  if (
    userInfo.value?.roles?.includes('RoleProfiles.Read') &&
    userInfo?.value.roles?.includes('Users.Edit')
  ) {
    profilesList.fetchProfilesExec();
    await until(profilesList.fetchProfilesIsReady).toBe(true);
    await until(usersList.fetchUserIsReady).toBe(true);
  }

  await fechUser(props.id);
  if (model.value?.type == UserType.Business) {
    await fechBusinessUser();
  }

  columns.value = [
    {
      name: 'id',
      label: 'id',
      field: (row) => row.id as number,
      required: true,
      hide: true,
    },
    {
      name: 'business',
      label: 'Intermediario',
      field: (row) => row.business?.name ?? '',
      required: true,
      align: 'left',
      sortable: true,
      format: (val) => `${val}`,
    },
    {
      name: 'responsibleBusinessUser',
      align: 'left',
      label: 'Supervisor',
      field: (row) => row.responsibleBusinessUser?.user?.fullName ?? '',
      sortable: true,
    },
    {
      name: 'type',
      align: 'left',
      label: 'Tipo',
      field: (row) => row.type?.type ?? '',
      sortable: true,
    },
  ];
  loader.hideLoader();
});
</script>

<template>
  <PageContainerComponent parent="seguridad">
    <template #actions>
      <template v-if="userInfo?.roles?.includes('Users.Edit')">
        <NavigationBtnComponent
          :label="
            $q.screen.gt.md ? 'Editar Usuario' : $q.screen.gt.sm ? 'Editar' : ''
          "
          icon="fa-solid fa-pen-to-square"
          class="q-mx-sm"
          @click="edit"
        />
        <NavigationBtnComponent
          :label="
            $q.screen.gt.md
              ? 'Cambiar Contraseña'
              : $q.screen.gt.sm
              ? 'Cambiar Contraseña'
              : ''
          "
          icon="fa-solid fa-circle-plus"
          class="q-mx-sm"
          @click="editPassword"
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
        @click="$router.push({ name: siteMap.seguridad.name })"
      />
    </template>

    <template v-if="model">
      <SectionContainerComponent>
        <span class="text-h5">
          {{ `${model.userName?.toLocaleUpperCase()} - ${model.fullName}` }}
        </span>
        <q-separator class="q-my-md" />
        <div class="row">
          <ItemResume
            title="Correo Electrónico"
            :value="model.email"
            html-class="text-subtitle1"
            type="v"
            class="col-xs-12 col-sm-6 col-md-3 col-lg-2"
          />
          <ItemResume
            title="Teléfono"
            :value="model.phoneNumber"
            html-class="text-subtitle1"
            type="v"
            class="col-xs-12 col-sm-6 col-md-3 col-lg-2"
          />
          <ItemResume
            title="Estado"
            :value=" (Object.entries(Estados).find((x) => x[1] == model?.status) as [string,'Active' | 'Inactive'])[0]"
            html-class="text-subtitle1"
            type="v"
            class="col-xs-12 col-sm-6 col-md-3 col-lg-2"
          />
          <ItemResume
            title="Fecha de Creación"
            :value="useDateFormat(model.createdOnUtc ?? '', 'YYYY-MM-DD').value"
            html-class="text-subtitle1"
            type="v"
            class="col-xs-12 col-sm-6 col-md-3 col-lg-2"
          />

          <ItemResume
            title="Creado por"
            :value="
              userList
                ?.find((user) => user.userName == model?.createdBy)
                ?.fullName?.toUpperCase()
            "
            html-class="text-subtitle1"
            type="v"
            class="col-xs-12 col-sm-6 col-md-3 col-lg-2"
          />
        </div>
      </SectionContainerComponent>

      <template v-if="model.type == 'Business'">
        <QuerableRecordsComponent
          :model-value="data"
          :column-props="columns"
          :pages-number="pages.total"
          :current-page="pages.curent"
          title="Accesos"
          hide-filters
          :allow-edit="userInfo?.roles?.includes('BusinessUsers.Edit')"
          @edit="editBusinessUser"
        />
      </template>

      <template
        v-if="
          userInfo?.roles?.includes('RoleProfiles.Read') &&
          userInfo?.roles?.includes('Users.Edit') &&
          userInfo?.roles?.includes('RoleProfiles.Read') &&
          userInfo?.roles?.includes('RoleProfiles.Edit')
        "
      >
        <SectionContainerComponent>
          <q-expansion-item class="full-width" header-class="text-primary">
            <template #header>
              <q-item-section>
                <span class="flex items-baseline text-h6 font-semiboldregular">
                  <q-icon
                    name="fa-solid fa-id-badge"
                    size="1.1rem"
                    class="q-mr-md"
                  />
                  Perfiles
                </span>
              </q-item-section>
            </template>
            <q-card>
              <q-markup-table>
                <thead>
                  <tr>
                    <th class="text-left">Nombre</th>
                    <th class="text-left">Descripción</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <template
                    v-for="(profile, profileIndex) in profilesSeter"
                    :key="profileIndex"
                  >
                    <tr>
                      <td>
                        <span>{{ profile.name }}</span>
                      </td>
                      <td>
                        <div>
                          {{ profile.description }}
                        </div>
                      </td>
                      <td class="text-right">
                        <q-chip
                          class="q-pa-md"
                          :color="profile.val ? 'secondary' : 'info'"
                        >
                          <template v-if="$q.screen.gt.xs">
                            <span class="text-white q-px-md">
                              {{ profile.val ? 'Activo' : 'Inactivo' }}
                            </span>
                          </template>
                          <q-toggle
                            v-model="profile.val"
                            color="white"
                            keep-color
                            class="q-ma-none q-pa-none"
                            @update:model-value="
                              updateUserProfile(
                                profileIndex,
                                profile.id,
                                profile.val
                              )
                            "
                          />
                        </q-chip>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </q-markup-table>
            </q-card>
          </q-expansion-item>
        </SectionContainerComponent>
      </template>
    </template>
  </PageContainerComponent>

  <!-- Dialogs -->
  <template
    v-if="dialogHandler.model && dialogHandler.schema && dialogHandler.show"
  >
    <DialogFormComponent :model-value="dialogHandler.show">
      <FormGeneratorComponent
        v-model="dialogHandler.model"
        :form-schema="dialogHandler.schema"
        :form-name="dialogHandler.formTitle ?? ''"
        submit-label="Actualizar"
        controls
        icon="fa-solid fa-user"
        @close="resetDialogData()"
        @submit="submit()"
      />
    </DialogFormComponent>
  </template>
  <!-- /Dialogs -->
</template>
