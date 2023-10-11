<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth.store';
import { storeToRefs } from 'pinia';
import { routes } from 'src/router/routes';

const store = useAuthStore();
const { profile: userInfo } = storeToRefs(store);
</script>

<template>
  <div :class="`${$q.screen.gt.sm ? 'q-pa-xl' : 'q-pa-lg'} fit`">
    <q-card class="my-card shadow-15">
      <q-card-section>
        <div class="text-h5 font-semiboldregular max-width">Bienvenido</div>
      </q-card-section>
    </q-card>
    <q-space class="q-my-xl" />
    <div class="row q-col-gutter-md">
      <template
        v-for="(pageItem, indexPage) in routes[1].children?.filter(
            (page) =>
              page.meta?.navItem &&
              (!page.meta?.requiredRoles ||
              userInfo?.roles?.some((role) => (page.meta?.requiredRoles as string[])?.includes(role)))
          )"
        :key="`xl-${indexPage}`"
      >
        <div class="col-xs-12 col-sm-4">
          <q-btn class="q-pa-none fit" :to="{ name: pageItem.name }">
            <q-card class="shadow-15 q-pa-lg fit">
              <q-icon
                :name="(pageItem.meta?.icon as string)"
                size="xl"
                color="accent"
              />
              <q-separator class="q-my-md" />
              <div
                class="text-h6 font-semiboldregular"
                style="white-space: normal"
              >
                {{
                  typeof pageItem.meta?.displayName == 'function'
                    ? (pageItem.meta?.displayName as Function)(
                        userInfo?.type ?? 'Business'
                      )
                    : pageItem.meta?.displayName
                }}
              </div>
            </q-card>
          </q-btn>
        </div>
      </template>
    </div>
  </div>
</template>
