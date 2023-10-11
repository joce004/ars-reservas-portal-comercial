import { toRefs, useAsyncState, useCloned } from '@vueuse/core';
import { $businessApi, $businessUserApi, $roleApi, $roleProfileApi, $userApi } from 'boot/api';
import { defineStore } from 'pinia';
import { BusinessModel, BusinessUserModel, RoleModel, RoleProfileModel, UserModel } from 'src/api';

type CatalogState = Nullable<{
  businesses: BusinessModel[];
  roles: RoleModel[];
  profiles: RoleProfileModel[];
  users: UserModel[];
  officers: BusinessUserModel[];
}>;

export const useCatalogStore = defineStore(
  'catalog_store',
  () => {
    const { cloned: state, sync: reset } = useCloned<CatalogState>({
      businesses: null,
      roles: null,
      profiles: null,
      users: null,
      officers: null,
    });

    const _fetchHelper = <T>(
      promise: () => Promise<T>,
      initialState: T,
      onSuccess: (data: T) => void
    ) =>
      useAsyncState(() => promise(), initialState, {
        immediate: false,
        resetOnExecute: true,
        shallow: true,
        onSuccess,
      });

    const fetchBusinessesList = () => {
      const { execute, isLoading, isReady } = _fetchHelper(
        () => $businessApi.apiBusinessesListGet({
          orderBies: [{
            propertyName: 'Name',
            order: 'ASC'
          }]
        }).then((x) => x.data),
        null,
        (data) => {
          if (data) {
            state.value.businesses = data?.sort((a, b) => {
              if (a.name && b.name) {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
              }
              return 0;
            });
          }
        }
      );
      return {
        fetchBusinessExec: state.value.businesses
          ? () => (isReady.value = true)
          : execute,
        fetchBusinessIsLoading: isLoading,
        fetchBusinessIsReady: isReady,
      };
    };

    const fetchRolesList = () => {
      const { execute, isLoading, isReady } = _fetchHelper(
        () => $roleApi.apiRolesListGet().then((x) => x.data),
        null,
        (data) => {
          if (data) {
            state.value.roles = data?.sort((a, b) => {
              if (a.name && b.name) {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
              }
              return 0;
            });
          }
        }
      );
      return {
        fetchRolesExec: state.value.roles
          ? () => (isReady.value = true)
          : execute,
        fetchRolesIsLoading: isLoading,
        fetchRolesIsReady: isReady,
      };
    };

    const fetchProfilesList = () => {
      const { execute, isLoading, isReady } = _fetchHelper(
        () => $roleProfileApi.apiProfilesListGet().then((x) => x.data),
        null,
        (data) => {
          if (data) {
            state.value.profiles = data?.sort((a, b) => {
              if (a.name && b.name) {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
              }
              return 0;
            });
          }
        }
      );
      return {
        fetchProfilesExec: state.value.profiles
          ? () => (isReady.value = true)
          : execute,
        fetchProfilesIsLoading: isLoading,
        fetchProfilesIsReady: isReady,
      };
    };

    const fetchUsersList = () => {
      const { execute, isLoading, isReady } = _fetchHelper(
        () => $userApi.apiUsersListGet().then((x) => x.data),
        null,
        (data) => {
          if (data) {
            state.value.users = data?.sort((a, b) => {
              if (a.fullName && b.fullName) {
                if (a.fullName > b.fullName) return 1;
                if (a.fullName < b.fullName) return -1;
              }
              return 0;
            });
          }
        }
      );

      return {
        fetchUsersExec: state.value.users
          ? () => (isReady.value = true)
          : execute,
        fetchUserIsLoading: isLoading,
        fetchUserIsReady: isReady,
      };
    };

    const fetchOfficersList = () => {
      const { execute, isLoading, isReady } = _fetchHelper(
        () =>
          $businessUserApi.apiBusinessesUsersListGet({
            type: 'Officer', rawIncludes: ['User'],
            orderBies: [{ propertyName: 'fullName' }]
          })
            .then((x) => x.data),
        null,
        (data) => {
          if (data) {
            state.value.officers = data?.sort((a, b) => {
              if (a.user?.fullName && b.user?.fullName) {
                if (a.user.fullName > b?.user.fullName) return 1;
                if (a.user.fullName < b.user.fullName) return -1;
              }
              return 0;
            });
          }
        }
      );

      return {
        fetchOfficersExec: state.value.officers
          ? () => (isReady.value = true)
          : execute,
        fetchOfficerIsLoading: isLoading,
        fetchOfficerIsReady: isReady,
      };
    };

    return {
      ...toRefs(state),
      fetchBusinessesList,
      fetchRolesList,
      fetchProfilesList,
      fetchUsersList,
      fetchOfficersList,
      reset,
    };
  },
  {
    //persist: false,
  }
);
