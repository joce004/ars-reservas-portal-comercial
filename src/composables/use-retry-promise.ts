import { ref } from 'vue';

export const useRetryPromise = async <T>(
  promise: Promise<T>,
  retries = 3
): Promise<T> => {
  const _retries = ref(retries);
  try {
    return await promise;
  } catch (e) {
    if (_retries.value === 1) {
      return Promise.reject(e);
    }
    return useRetryPromise(promise, _retries.value - 1);
  }
};
