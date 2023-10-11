<script setup lang="ts">
import { ref } from 'vue';

import StandarInputComponent from 'src/components/ui/inputs/StandarInputComponent.vue';
import FormBtnComponent from 'src/components/ui/buttom/FormBtnComponent.vue';
import { getAssetUrl } from 'src/utils/assets';
import { useAuthStore } from 'src/stores/auth.store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { Loader } from 'src/utils/loading';
import { siteMap } from 'src/router/siteMap';

const user = ref<string>('');
const pass = ref<string>('');
const errorMessage = ref<string>();

// STORES
const store = useAuthStore();
const { logIn } = store;
const {} = storeToRefs(store);

const route = useRouter();

const loader = Loader;
loader.qLoading = useQuasar().loading;

const login = async () => {
  loader.showLoader('Iniciando Sesión...');
  try {
    errorMessage.value = undefined;
    await logIn(user.value, pass.value);
    route.push({ name: siteMap.inicio.name });
  } catch (error) {
    errorMessage.value = (error as { message: string }).message;
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

      <q-card-section class="full-width">
        <StandarInputComponent
          v-model="user"
          label="Usuario"
          hide-bottom-space
        />
        <StandarInputComponent
          v-model="pass"
          label="Contraseña"
          type="password"
          hide-bottom-space
        />
        <template v-if="errorMessage">
          <q-space class="q-my-sm" />
          <div
            class="flex items-baseline justify-center q-pa-sm"
            style="outline: 1px solid #bf112b; outline-offset: -1px"
          >
            <q-icon
              name="fa-solid fa-circle-exclamation"
              color="negative"
              class="q-mr-sm"
            />
            <span class="text-negative">{{ errorMessage }}</span>
          </div>
        </template>
        <q-space class="q-my-sm" />
        <FormBtnComponent
          label="Acceder"
          class="full-width font-boldregular"
          @click="login"
        />
      </q-card-section>
    </q-card>
  </div>
</template>
