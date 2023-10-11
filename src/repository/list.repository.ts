//TODO: Hacer util generico para encapsular lo que se repite

import { useRetryPromise } from 'src/composables/use-retry-promise';
import { $productApi, $resourcesLibraryApi } from 'src/boot/api';
import { FolderResponseViewType } from 'src/api';

export const FetchProductos = async () => {
  const { data } = await useRetryPromise(
    $productApi.apiProductsAvailablesGet()
  );
  return data;
};

export const FetchRecursos = async ({
  param: parametro,
  viewType,
}: {
  param?: string;
  viewType?: FolderResponseViewType;
}) => {
  const { data } = await useRetryPromise(
    $resourcesLibraryApi.apiSharedLibraryPublicGet({
      name: parametro,
      viewType: viewType,
    })
  );
  return data;
};
