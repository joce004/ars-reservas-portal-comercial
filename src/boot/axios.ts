import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';
import { ref, Ref } from 'vue';

let $axios: Ref<AxiosInstance>;

const useAxios = () => {
  const setAuthHeader = (accessToken: string | null) => {
    $axios.value.defaults.headers.common['Authorization'] = accessToken
      ? `Bearer ${accessToken}`
      : '';
  };

  const removeAuthHeader = () => setAuthHeader(null);

  return {
    setAuthHeader,
    removeAuthHeader,
  };
};

export default boot(({ router }) => {
  $axios = ref(
    axios.create({
      baseURL: process.env.APP_API_PATH,
      withCredentials: true,
      headers: { Accept: 'application/json' },
      validateStatus: (status) =>
        (status >= 200 && status < 400) || status == 403,
    })
  );

  $axios.value.interceptors.response.use(async function (response) {
    if (response.status === 400) {
      return Promise.reject(response);
    }

    if (response.status === 403) {
      const logoutRoute = 'logout';
      if (router.currentRoute.value.name !== logoutRoute) {
        router.push({ name: logoutRoute });
      }
      return Promise.reject(response);
    }

    return response;
  });
});

export { $axios, useAxios };
