<script setup lang="ts">
import { UserType } from 'src/api';
import { RouteRecordName } from 'vue-router';

defineProps<{
  to: RouteRecordName;
  icon: string;
  displayName: string | ((param: string) => string);
  drawerState: boolean;
  userType: UserType;
}>();
</script>

<template>
  <q-item v-ripple clickable tag="a" class="q-py-lg q-px-lg" :to="{ name: to }">
    <q-item-section v-if="icon && typeof icon == 'string'" avatar>
      <q-icon color="white" :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-white">
        <div class="text-subtitle1 font-MediumRegular">
          <span class="q-pr-md">
            {{
              typeof displayName == 'function'
                ? displayName(userType)
                : displayName
            }}
          </span>
        </div>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
