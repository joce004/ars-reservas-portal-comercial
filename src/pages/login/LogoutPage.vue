<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth.store';
import { Loader } from 'src/utils/loading';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

// STORES
const store = useAuthStore();
const { signOut } = store;
const {} = storeToRefs(store);

const route = useRouter();

const loader = Loader;
loader.qLoading = useQuasar().loading;

onMounted(async () => {
  loader.showLoader('Cerrando Sesión...');
  try {
    await signOut();
  } catch (error) {
  }
  route.push({ name: 'login' });
  Loader.hideLoader();
});
</script>

<template>
  <div>

  </div>
</template>
