<script setup lang="ts">
import { useQuasar } from 'quasar';
import { $accountApi } from 'src/boot/api';
import FormBtnComponent from 'src/components/ui/buttom/FormBtnComponent.vue';
import StandarInputComponent from 'src/components/ui/inputs/StandarInputComponent.vue';
import { useAuthStore } from 'src/stores/auth.store';
import { getAssetUrl } from 'src/utils/assets';
import { Loader } from 'src/utils/loading';
import { ResolveRequestOperation } from 'src/utils/request';
import { ref } from 'vue';

const newPassword = ref<string>('');
const currentPassword = ref<string>('');
const confirmNewPassword = ref<string>('');
const message = ref<string>();

const success = ref<boolean>(false);
// STORES
const store = useAuthStore();
const { signOut } = store;

const loader = Loader;
const $q = useQuasar();

const changePass = async () => {
  message.value = undefined;
  loader.showLoader('Cambiando Contraseña...');
  if (newPassword.value == confirmNewPassword.value) {
    try {
      const changePassResult = await ResolveRequestOperation<void>({
        request: () =>
          $accountApi.apiAccountChangePasswordPut({
            accountChangePasswordModel: {
              currentPassword: currentPassword.value,
              newPassword: newPassword.value,
              confirmNewPassword: confirmNewPassword.value,
            },
          }),
      });
      if (changePassResult.IsSuccessful()) {
        success.value = true;
        message.value = 'Contraseña actualizada, vuelva a iniciar sesión';
        signOut();
      } else {
        message.value = changePassResult.Message;
      }
    } catch (error) {
      message.value = 'No se pudo obtener los datos del usuario.';
    }
  } else {
    message.value = 'Las contraseñas no coinciden.';
  }
  Loader.hideLoader();
};
</script>

<template>
  <div
    class="q-pa-xl flex items-center justify-center"
    :style="{
      height: `${$q.screen.height}px`,
      backgroundImage: `url(${getAssetUrl('img/loging-bg.jpg')})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }"
  >
    <q-card :class="`${$q.screen.gt.xs ? 'q-pa-xl' : 'q-pa-md'} shadow-15`">
      <q-card-section
        v-if="$q.screen.gt.xs"
        class="flex items-center justify-center"
      >
        <div>
          <q-img :src="getAssetUrl('svg/Logo.svg')" width="12em" />
        </div>
        <q-separator vertical />
        <div
          class="font-boldregular q-px-md"
          style="line-height: 0.9em; font-size: 1.9em"
        >
          OFICINA
          <br />
          VIRTUAL
        </div>
      </q-card-section>
      <q-card-section v-if="$q.screen.xs" class="flex justify-center q-py-sm">
        <div>
          <q-img :src="getAssetUrl('svg/isotipo.svg')" width="5em" />
        </div>
      </q-card-section>
      <q-card-section v-if="$q.screen.xs" class="q-py-none">
        <div
          class="font-boldregular q-px-md text-center"
          style="line-height: 0.8em; font-size: 1.8em"
        >
          OFICINA VIRTUAL
        </div>
      </q-card-section>

      <q-card-section>
        <div class="fit text-center">
          <span class="text-subtitle1 font-semibold">
            ACTUALIZAR CONTRASEÑA
          </span>
        </div>
        <q-space class="q-my-sm" />
        <q-form
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
        >
          <StandarInputComponent
            v-model="currentPassword"
            label="Contraseña Actual"
            type="password"
            hide-bottom-space
          />
          <StandarInputComponent
            v-model="newPassword"
            label="Nueva Contraseña"
            type="password"
            hide-bottom-space
          />
          <StandarInputComponent
            v-model="confirmNewPassword"
            label="Confirmar Contraseña"
            type="password"
            hide-bottom-space
          />
        </q-form>
        <template v-if="message">
          <q-space class="q-my-sm" />
          <div
            class="flex items-baseline justify-center q-pa-sm"
            :style="`outline: 1px solid #${
              success ? '639777' : 'bf112b'
            }; outline-offset: -1px`"
          >
            <q-icon
              name="fa-solid fa-circle-exclamation"
              :color="success ? 'positive' : 'negative'"
              class="q-mr-sm"
            />
            <span :class="`text-${success ? 'positive' : 'negative'}`">
              {{ message }}
            </span>
          </div>
        </template>
        <q-space class="q-my-sm" />
        <FormBtnComponent
          label="Recuperar Contraseña"
          color="primary"
          class="full-width font-boldregular"
          @click="changePass"
        />
        <q-space class="q-my-sm" />
        <FormBtnComponent
          label="Regresar"
          color="secondary"
          class="full-width font-boldregular"
          @click="$router.go(-1)"
        />
      </q-card-section>
    </q-card>
  </div>
</template>
