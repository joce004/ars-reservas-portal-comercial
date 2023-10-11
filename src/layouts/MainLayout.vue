<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import FormBtnComponent from 'src/components/ui/buttom/FormBtnComponent.vue';
import { useAuthStore } from 'src/stores/auth.store';
import { Loader } from 'src/utils/loading';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MenuDrawer from './MenuDrawer.vue';
import { useCatalogStore } from 'src/stores/catalog.store';

const DrawerState = ref(true);
const drawerToggle = () => {
  DrawerState.value = !DrawerState.value;
};

// STORES
const catalogStore = useCatalogStore();

const store = useAuthStore();
const { signOut } = store;
const { profile } = storeToRefs(store);
const loader = Loader;
loader.qLoading = useQuasar().loading;

const route = useRoute();
const router = useRouter();
const logOut = async () => {
  loader.showLoader('Cerrando la Sesión...');
  catalogStore.reset();
  signOut();
  Loader.hideLoader();
  router.push({ name: 'login' });
};
</script>

<template>
  <q-layout view="lHh Lpr lFf" class="flex">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawerToggle"
        />

        <q-toolbar-title class="flex justify-end">
          <div class="flex items-center">
            <q-btn-dropdown split rounded>
              <template #label>
                <div class="row items-center no-wrap">
                  <q-icon left name="fa-solid fa-user" size="xs" />
                  <div class="text-center">
                    {{ profile?.username }}
                  </div>
                </div>
              </template>
              <div class="text-center q-pa-md">
                <q-icon name="fa-solid fa-circle-user" size="xl" />
                <div class="text-subtitle1">
                  {{ profile?.fullName?.toLocaleUpperCase() }}
                </div>
                <q-space class="q-my-xs" />
                <div>
                  <FormBtnComponent
                    label="Cambiar clave"
                    icon="fa-solid fa-unlock-keyhole"
                    color="secondary"
                    class="fit"
                    @click="$router.push({ name: 'cambiarClave' })"
                  />
                  <q-space class="q-my-xs" />
                  <FormBtnComponent
                    label="Salir"
                    icon="fa-solid fa-right-from-bracket"
                    color="accent"
                    class="fit"
                    @click="logOut"
                  />
                </div>
              </div>
            </q-btn-dropdown>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <menu-drawer
      :model-value="DrawerState"
      :user-type="profile?.type ?? 'Admin'"
      @drawer-toggle="drawerToggle()"
    ></menu-drawer>

  <q-page-container class="fit bg-page" style="min-height: calc(100vh);" :class="`${route.name === 'inicio' ? 'index-bg-image' : ''}`">
      <router-view />
  </q-page-container>
  </q-layout>
</template>

<style scoped>
.index-bg-image {
  background-image: url(src/assets/img/abstract-blur-hotel-lobby-2.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
