<script setup lang="ts">
import { useCloned } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import {
  RoleCreationModel,
  RoleModel,
  RoleProfileCreationModel,
  RoleProfileModel,
  UserCreationModel,
  UserModel,
} from 'src/api';
import { $roleApi, $roleProfileApi, $userApi } from 'src/boot/api';
import ProfileControlComponent from 'src/components/seguridad/ProfileControlComponent.vue';
import RoleControlComponent from 'src/components/seguridad/RoleControlComponent.vue';
import UserControlComponent from 'src/components/seguridad/UserControlComponent.vue';
import NavigationBtnComponent from 'src/components/ui/buttom/NavigationBtnComponent.vue';
import DialogFormComponent from 'src/components/ui/containers/DialogFormComponent.vue';
import PageContainerComponent from 'src/components/ui/containers/PageContainerComponent.vue';
import FormGeneratorComponent from 'src/components/ui/forms/FormGeneratorComponent.vue';
import {
  ProfileCreationForm,
  initCrearPerfilForm,
  initCreateProfileModel,
} from 'src/models/forms/seguridad/model.seguridad.perfiles';
import {
  initCrearRolModel,
  initCreateRolForm,
} from 'src/models/forms/seguridad/model.seguridad.roles';
import {
  customUserCreationModel,
  initCreateUserForm,
  initCreateUserModel,
  mapUserCreationModel,
} from 'src/models/forms/seguridad/model.seguridad.usuarios';
import { IFormSpecification } from 'src/models/schemas/IFormSpecification';
import { siteMap } from 'src/router/siteMap';
import { useAuthStore } from 'src/stores/auth.store';
import { useCatalogStore } from 'src/stores/catalog.store';
import { Loader } from 'src/utils/loading';
import { ResolveRequestOperation } from 'src/utils/request';
import { onMounted, ref, toRaw } from 'vue';
import { useRouter } from 'vue-router';

const tab = ref<'usuarios' | 'perfiles' | 'roles'>('usuarios');
const updateCount = ref(0);

const { cloned: dialogHandler, sync: resetDialogData } = useCloned<
  Nullable<
    | {
        action: 'CreatUser';
        show: boolean;
        model: customUserCreationModel;
        schema: IFormSpecification<UserCreationModel>;
        formTitle: string;
      }
    | {
        action: 'CreateProfile';
        show: boolean;
        model: RoleProfileCreationModel;
        schema: IFormSpecification<ProfileCreationForm>;
        formTitle: string;
      }
    | {
        action: 'CreateRole';
        show: boolean;
        model: RoleCreationModel;
        schema: IFormSpecification<RoleCreationModel>;
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

// STORES
const store = useCatalogStore();
const { fetchBusinessesList } = store;
const { businesses: businessList } = storeToRefs(store);

const businessesList = fetchBusinessesList();
businessesList.fetchBusinessExec();

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

const createUser = async () => {
  await fetchBusinessesList().fetchBusinessExec();
  dialogHandler.value = {
    action: 'CreatUser',
    show: true,
    model: initCreateUserModel(),
    schema: initCreateUserForm(businessList.value ?? []).form,
    formTitle: 'Crear Usuario',
  };
};

const createProfile = () => {
  dialogHandler.value = {
    action: 'CreateProfile',
    show: true,
    model: initCreateProfileModel(),
    schema: initCrearPerfilForm().form,
    formTitle: 'Crear Perfil',
  };
};

const createRole = () => {
  dialogHandler.value = {
    action: 'CreateRole',
    show: true,
    model: initCrearRolModel(),
    schema: initCreateRolForm().form,
    formTitle: 'Crear Rol',
  };
};

const submit = async () => {
  loader.showLoader('Guardando...');
  if (dialogHandler.value.model) {
    if (dialogHandler.value.action == 'CreatUser') {
      const model = dialogHandler.value.model;
      const userResult = await ResolveRequestOperation<UserModel>({
        request: () =>
          $userApi.apiUsersPost({
            userCreationModel: mapUserCreationModel(toRaw(model)),
          }),
      });

      if (userResult?.IsSuccessful()) {
        dialogHandler.value.show = false;
        updateCount.value += 1;
      } else {
        alert('Usurios', 'Error: No se pudo crear el usuario.');
      }
    }

    if (dialogHandler.value.action == 'CreateProfile') {
      const model = dialogHandler.value.model;
      const roleProfileResult = await ResolveRequestOperation<RoleProfileModel>(
        {
          request: () =>
            $roleProfileApi.apiProfilesPost({
              roleProfileCreationModel: model,
            }),
        }
      );

      if (roleProfileResult?.IsSuccessful()) {
        dialogHandler.value.show = false;
        updateCount.value += 1;
      } else {
        alert('Perfiles', 'Error: No se pudo crear el perfil.');
      }
    }

    if (dialogHandler.value.action == 'CreateRole') {
      const model = dialogHandler.value.model;
      const roleResult = await ResolveRequestOperation<RoleModel>({
        request: () => $roleApi.apiRolesPost({ roleCreationModel: model }),
      });

      if (roleResult?.IsSuccessful()) {
        dialogHandler.value.show = false;
        updateCount.value += 1;
      } else {
        alert('Roles', 'No se pudo crear el rol.');
      }
    }
  }

  loader.hideLoader();
};

onMounted(() => {
  userInfo?.value?.roles?.includes('Users.Read')
    ? (tab.value = 'usuarios')
    : userInfo?.value?.roles?.includes('RoleProfiles.Read')
    ? (tab.value = 'perfiles')
    : userInfo?.value?.roles?.includes('Roles.Read')
    ? (tab.value = 'roles')
    : router.push({ name: siteMap.inicio.name });
});
</script>

<template>
  <PageContainerComponent>
    <template #actions>
      <NavigationBtnComponent
        v-if="tab == 'usuarios' && userInfo?.roles?.includes('Users.Create')"
        :label="
          $q.screen.gt.md ? 'Crear Usuario' : $q.screen.gt.sm ? 'Crear' : ''
        "
        icon="fa-solid fa-circle-plus"
        @click="createUser"
      />
      <NavigationBtnComponent
        v-if="
          tab == 'perfiles' && userInfo?.roles?.includes('RoleProfiles.Create')
        "
        :label="
          $q.screen.gt.md ? 'Crear Perfil' : $q.screen.gt.sm ? 'Crear' : ''
        "
        icon="fa-solid fa-circle-plus"
        @click="createProfile"
      />
      <NavigationBtnComponent
        v-if="tab == 'roles' && userInfo?.roles?.includes('Roles.Create')"
        :label="$q.screen.gt.md ? 'Crear Rol' : $q.screen.gt.sm ? 'Crear' : ''"
        icon="fa-solid fa-circle-plus"
        @click="createRole"
      />
    </template>

    <q-tabs
      v-model="tab"
      dense
      class="bg-primary text-white q-mt-md"
      align="justify"
      indicator-color="accent"
      spread
    >
      <q-tab
        v-if="userInfo?.roles?.includes('Users.Read')"
        name="usuarios"
        class="full-width"
      >
        <span class="full-width">Usuarios</span>
      </q-tab>
      <q-tab
        v-if="userInfo?.roles?.includes('RoleProfiles.Read')"
        name="perfiles"
        class="full-width"
      >
        <span>Perfiles</span>
      </q-tab>
      <q-tab
        v-if="userInfo?.roles?.includes('Roles.Read')"
        name="roles"
        class="full-width"
      >
        <span>Roles</span>
      </q-tab>
    </q-tabs>
    <q-tab-panels
      v-model="tab"
      animated
      :class="`${
        $q.screen.gt.sm ? 'q-px-md' : 'q-px-none'
      } bg-dark-page flex justify-between`"
    >
      <q-tab-panel
        v-if="userInfo?.roles?.includes('Users.Read')"
        name="usuarios"
      >
        <UserControlComponent :key="updateCount" />
      </q-tab-panel>

      <q-tab-panel
        v-if="userInfo?.roles?.includes('RoleProfiles.Read')"
        name="perfiles"
      >
        <ProfileControlComponent :key="updateCount" />
      </q-tab-panel>

      <q-tab-panel v-if="userInfo?.roles?.includes('Roles.Read')" name="roles">
        <RoleControlComponent :key="updateCount" />
      </q-tab-panel>
    </q-tab-panels>
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
      ></FormGeneratorComponent>
    </DialogFormComponent>
  </template>
  <!-- /Dialogs -->
</template>
