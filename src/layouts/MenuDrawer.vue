<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { UserType } from 'src/api';
import AppLinks from 'src/layouts/AppLinks.vue';
import { useAuthStore } from 'src/stores/auth.store';
import { getAssetUrl } from 'src/utils/assets';
import { ref, watch } from 'vue';
import { routes } from 'src/router/routes';

const props = defineProps<{
  modelValue: boolean;
  userType: UserType;
}>();

const emit = defineEmits(['update:modelValue', 'drawerToggle']);
const model = useVModel(props, 'modelValue', emit, {
  deep: true,
  passive: true,
});

// Store
const authStore = useAuthStore();
const { profile: userInfo } = storeToRefs(authStore);

const _useQuasar = useQuasar();
const DrawerOpen = ref(false);

watch(model, async () => {
  DrawerOpen.value = _useQuasar.screen.gt.sm ? true : model.value;
});

</script>

<template>
  <q-drawer
    v-model="DrawerOpen"
    :mini="$q.screen.gt.sm ? !model : undefined"
    show-if-above
    class="drawer-bg-image"
    :style="`background-image: url(${
      model || $q.screen.lt.md
        ? getAssetUrl('svg/Layout-Drawer-BG.svg')
        : getAssetUrl('svg/Layout-MiniDrawer-BG.svg')
    });`"
    @update:model-value="$emit('drawerToggle')"
  >
    <div
      class="absolute-top flex items-center justify-center"
      :style="`height: ${model || $q.screen.lt.md ? '170px;' : '80px;'})`"
    >
      <q-btn class="fit" padding="sm" :to="{ name: 'inicio' }">
        <q-img
          :src="
            model || $q.screen.lt.md
              ? getAssetUrl('svg/Logo-White.svg')
              : getAssetUrl('svg/Isotipo-White.svg')
          "
        />
      </q-btn>
    </div>

    <q-scroll-area
      :style="`height: calc(100% - ${
        model || $q.screen.lt.md ? '170px' : '80px'
      }); margin-top: ${model || $q.screen.lt.md ? '170px;' : '80px;'}`"
    >
      <q-separator />
      <q-list>
        <template
          v-for="(pageItem, indexPage) in routes[1].children?.filter(
            (page) =>
              page.meta?.navItem &&
              (!page.meta?.requiredRoles ||
              userInfo?.roles?.some((role) => (page.meta?.requiredRoles as string[])?.includes(role)))
          )"
          :key="indexPage"
        >
          <q-separator
            v-if="!(indexPage == 0 || pageItem.name == 'inicio')"
            color="blue-grey-3"
            :class="model || $q.screen.lt.md ? 'q-mx-lg' : 'q-mx-sm'"
            size="1px"
          />
          <AppLinks
            v-if="
              pageItem.name && pageItem.meta?.icon && pageItem.meta?.displayName
            "
            :to="pageItem.name"
            :icon="(pageItem.meta?.icon as string)"
            :display-name="(pageItem.meta?.displayName as string | (() => string))"
            :drawer-state="model"
            :user-type="userType"
          />
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<style>
.drawer-bg-image {
  background-repeat: none;
  background-size: cover;
}
</style>
