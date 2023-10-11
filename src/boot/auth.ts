import { storeToRefs } from 'pinia';
import { boot } from 'quasar/wrappers';
import { useAuthStore } from 'stores/auth.store';

export const AUTH_META = {
  GUEST: 'GUEST',
  USER: 'USER',
} as const;

export default boot(async ({ router, store }) => {


  const authStore = useAuthStore(store);
  const { fetchProfile } = authStore;
  const { isUserAuthenticated, profile } = storeToRefs(authStore);

  if (isUserAuthenticated.value) await fetchProfile();

  router.beforeEach((to, _, next) => {
    const requiredRoles = (to.meta['requiredRoles'] as string[]) ?? null;
    const accessType =
      (to.meta['accessType'] as 'soft' | 'hard' | null) ?? null;
    const userRoles = profile.value?.roles ?? [];

    const autorized = () => {
      if (requiredRoles) {
        if (accessType == 'hard') {
          return requiredRoles.every((element) => userRoles.includes(element));
        } else {
          return requiredRoles.some((element) => userRoles.includes(element));
        }
      } else {
        return true;
      }
    };

    if (to.meta[AUTH_META.USER] && !isUserAuthenticated.value) {
      return next({ name: 'login', query: { r: to.fullPath } });
    }

    if (!autorized()) {
      return next({ name: 'inicio' });
    }

    if (to.meta[AUTH_META.GUEST] && isUserAuthenticated.value) {
      return next({ name: 'inicio' });
    }

    next();
  });
});
