<script setup lang="ts">
import { until, useCloned, useDateFormat } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import {
  UserType,
  BusinessUserModel,
  RoleProfileModel,
  UserModel,
} from 'src/api';
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
} from 'src/models/forms/seguridad/model.seguridad.usuarios';
import { IColumn } from 'src/models/schemas/IColumn';
import { IFieldSpecification } from 'src/models/schemas/IFormSpecification';
import {
  DeleteProfilesUser,
  FetchBusinessesUsers,
  GetBusinessUser,
  GetUser,
  PostProfilesUser,
  PutBusinessUser,
  PutUser,
  PutUserChangePassword,
} from 'src/repository/seguridad.usuarios.repository.js';
import { siteMap } from 'src/router/siteMap';
import { useAuthStore } from 'src/stores/auth.store';
import { useCatalogStore } from 'src/stores/catalog.store';
import { Loader } from 'src/utils/loading';
import { IOperationResult } from 'src/utils/operation-result';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  id: string;
}>();

const model = ref<UserModel>();
const data = ref<BusinessUserModel[]>([]);
const columns = ref<IColumn<BusinessUserModel>[]>();
const pages = ref<{ curent: number; total: number }>({ curent: 0, total: 0 });

const { cloned: dialogHandler, sync: resetDialogData } = useCloned<
  Nullable<{
    show: boolean;
    model: object;
    schema: Record<string, IFieldSpecification>;
    action: 'UP' | 'UB' | 'U';
    formTitle: string;
  }>
>({
  show: false,
  model: null,
  schema: null,
  action: null,
  formTitle: null,
});

const { cloned: profilesSeter, sync: resetProfileSeter } = useCloned<
  { id: number; name: string; description: string; val: boolean }[]
>([]);

// STORES
const store = useCatalogStore();
const { fetchOfficersList, fetchProfilesList } = store;
const { officers: officerList, profiles: profileList } = storeToRefs(store);

const profilesList = fetchProfilesList();

const officersList = fetchOfficersList();
officersList.fetchOfficersExec();

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
      action: 'U',
      formTitle: 'Editar Datos del Usuario',
    };
  }
};

const editPassword = () => {
  dialogHandler.value = {
    show: true,
    model: initEditUserPass(props.id),
    schema: initEditUserPassForm(),
    action: 'UP',
    formTitle: 'Actulizar Contraseña',
  };
};

const editBusinessUser = async (id: number) => {
  loader.showLoader('Guardando...');
  const businessResult = await GetBusinessUser(id);
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
      action: 'UB',
    };
  }
};

const submit = async () => {
  loader.showLoader('Guardando...');
  if (dialogHandler.value.model) {
    let userResult:
      | IOperationResult<null>
      | IOperationResult<UserModel>
      | IOperationResult<BusinessUserModel>
      | null = null;
    switch (dialogHandler.value.action) {
      case 'UP':
        userResult = await PutUserChangePassword(dialogHandler.value.model);
        break;
      case 'U':
        userResult = await PutUser(dialogHandler.value.model);
        break;
      case 'UB':
        userResult = await PutBusinessUser(dialogHandler.value.model);
        break;
    }
    loader.hideLoader();

    if (userResult?.IsSuccessful()) {
      fechUser(props.id);
      fechBusinessUser();
      resetDialogData();
    } else {
      alert(
        'Usuario',
        `Error: ${userResult?.Errors[0] ?? userResult?.Message}`
      );
    }
  }
};

const fechUser = async (id: string) => {
  const userResult = await GetUser(id);
  if (userResult.IsSuccessful() && userResult.Payload) {
    model.value = userResult.Payload;
    roleControlInitializer(userResult.Payload.profiles ?? []);
  } else {
    alert('Usuario', `Error: ${userResult.Errors[0] ?? userResult.Message}`);
  }
};

const fechBusinessUser = async () => {
  const businessUserResult = await FetchBusinessesUsers({ userId: props.id });

  if (businessUserResult.IsSuccessful() && businessUserResult.Payload) {
    data.value = businessUserResult.Payload.items ?? [];
  } else {
    alert(
      'Usuario',
      `Error: ${businessUserResult.Errors[0] ?? businessUserResult.Message}`
    );
  }
};

const updateUserProfile = async (
  index: number,
  profileId: number,
  val: boolean
) => {
  if (index && profileId) {
    if (val) {
      loader.showLoader('Agregando...');

      const roleProfileResult = await PostProfilesUser({
        profileId: profileId,
        userId: model.value?.id,
      });

      if (roleProfileResult?.IsSuccessful()) {
        await fechUser(props.id);
      } else {
        profilesSeter.value[index].val = !profilesSeter.value[index].val;
        alert(
          'Usuario',
          `Error: ${roleProfileResult.Errors[0] ?? roleProfileResult.Message}`
        );
      }
      loader.hideLoader();
    }
    if (!val) {
      loader.showLoader('Eliminando...');
      const roleProfileResult = await DeleteProfilesUser({
        profileId: profileId,
        userId: model.value?.id,
      });

      if (roleProfileResult?.IsSuccessful()) {
        await fechUser(props.id);
      } else {
        profilesSeter.value[index].val = !profilesSeter.value[index].val;
        alert(
          'Usuario',
          `Error: ${roleProfileResult.Errors[0] ?? roleProfileResult.Message}`
        );
      }
      loader.hideLoader();
    }
  } else {
    profilesSeter.value[index].val = !profilesSeter.value[index].val;
  }
};

onMounted(async () => {
  loader.showLoader('Cargando...');

  await until(officersList.fetchOfficerIsReady).toBe(true);

  if (
    userInfo.value?.roles?.includes('RoleProfiles.Read') &&
    userInfo?.value.roles?.includes('Users.Edit')
  ) {
    profilesList.fetchProfilesExec();
    await until(profilesList.fetchProfilesIsReady).toBe(true);
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
            :value="model.createdBy?.toLocaleUpperCase()"
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
