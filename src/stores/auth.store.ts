import { toRefs, useCloned } from '@vueuse/core';
import { useAxios } from 'boot/axios';
import { isPast } from 'date-fns';
import fromUnixTime from 'date-fns/fromUnixTime';
import jwt, { JwtPayload } from 'jwt-decode';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { Cookies } from 'quasar';
import { AccountProfileResponseModel } from 'src/api';
import { LogOut, Login, getAccount } from 'src/repository/auth.repository';
import { computed, ref, watch } from 'vue';

interface Jwt extends JwtPayload {
  name: string;
  email: string;
}

type UserAuthState = Nullable<{
  user: Jwt;
  profile: AccountProfileResponseModel;
  expiration: Date;
}>;

const { setAuthHeader } = useAxios();

export const useAuthStore = defineStore('auth', () => {
  const options = {
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
    USER_COOKIE_NAME: 'auth.user.token',
  } as const;

  const userAccessToken = ref<string | null>(null);

  const { cloned: userAuthState, sync: resetUserAuthState } =
    useCloned<UserAuthState>({ user: null, profile: null, expiration: null });

  userAccessToken.value = Cookies.get(options.USER_COOKIE_NAME);

  const isUserAuthenticated = computed(() => !!userAccessToken.value);

  const logIn = async (userName: string, password: string) => {
    const result = await Login(userName, password);

    if (result.Payload?.token?.authToken) {
      signInWithToken(result.Payload?.token?.authToken);
    } else {
      throw {
        type: 'warning',
        message: 'Usuario o contraseña incorrectos.',
      };
    }
  };

  const signInWithToken = (accessToken: string) => {
    userAccessToken.value = accessToken;
  };

  const signOut = async () => {
    userAccessToken.value = null;
    userAuthState.value.user = null;
    userAuthState.value.profile = null;
    await LogOut();
  };

  const fetchProfile = async () => {
    try{
      userAuthState.value.profile = userAuthState.value.profile
      if(!userAuthState.value.profile){
        const account = await getAccount();
        if(account.IsSuccessful() && account.Payload){
          userAuthState.value.profile = account.Payload
        }
        else{
          await LogOut();
        }
      }
    }
    catch(ex){
      await LogOut();
    }
  };

  const initUserAuthState = async () => {
    if (!userAccessToken.value) {
      return;
    }
    const _jwt = jwt<Jwt>(userAccessToken.value);
    if (!_jwt?.exp) {
      resetUserAuthState();
      return;
    }
    userAuthState.value.user = _jwt;
    const expires = fromUnixTime(_jwt.exp);
    if (isPast(expires)) {
      resetUserAuthState();
      return;
    }
    userAuthState.value.expiration = expires;
    Cookies.set(options.USER_COOKIE_NAME, userAccessToken.value, {
      domain: options.COOKIE_DOMAIN,
      expires,
      path: '/',
      sameSite: 'Strict',
    });

    userAuthState.value.profile ? userAuthState.value.profile : await fetchProfile();

    if (!userAuthState.value.profile) {
      resetUserAuthState();
      return;
    }
  };

  watch(
    userAccessToken,
    async (value) => {
      if (value) {
        setAuthHeader(value);
        await initUserAuthState();
      } else {
        Cookies.remove(options.USER_COOKIE_NAME, {
          domain: options.COOKIE_DOMAIN,
          path: '/',
        });
      }
    },
    { immediate: true }
  );

  return {
    ...toRefs(userAuthState),
    isUserAuthenticated,
    logIn,
    signInWithToken,
    signOut,
    fetchProfile,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
