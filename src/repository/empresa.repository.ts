//TODO: Hacer util generico para encapsular lo que se repite

import { AxiosError } from 'axios';
import { $businessApi } from 'boot/api';
import {
  Status,
  BusinessApiApiBusinessesGetRequest,
  BusinessCreationModel,
  BusinessEditionModel,
  BusinessModel,
  BusinessModelPaged,
  UserType } from 'src/api';
import { Errors } from 'src/enums/error-list-enum';
import { initOperationResult } from 'src/utils/operation-result';

export const FetchBusinesses = async (
  params?: {
    page?: number;
    query?: Record<string, string>;
  },
  userType?: UserType
) => {
  const OperationResult = initOperationResult<BusinessModelPaged>();
  try {
    const { data, status } = await $businessApi.apiBusinessesGet({
      page: params?.page ?? 1,
      nameContains: params?.query?.name,
      status: params?.query?.status as Status,
      type:
        userType == 'Business'
          ? 'Intermediary'
          : (params?.query as BusinessApiApiBusinessesGetRequest)?.type,
        rawIncludes: ['owner'],

    });

    if (status === 200 || status === 204) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage(
        'No se pudo obtener el listado de intermediarios.'
      );
      OperationResult.setError('unknown fetch error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo obtener el listado de intermediarios.'
      ).setError(
        error.response?.data?.messages[0].message ??
          Errors.problem
      );
    }
    return OperationResult;
  }
};

export const PostBusiness = async (formData: BusinessCreationModel) => {
  const OperationResult = initOperationResult<BusinessModel>();
  try {
    const { data, status } = await $businessApi.apiBusinessesPost({
      businessCreationModel: formData,
    });

    if (status === 200 || status === 201){
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se pudo crear el intermediario.');
      OperationResult.setError('unknown post error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage('No se pudo crear el intermediario.').setError(
        error.response?.data?.messages[0].message ??
          Errors.problem
      );
    }
    return OperationResult;
  }
};

export const GetBusiness = async (id: number) => {
  const OperationResult = initOperationResult<BusinessModel>();
  try {
    const { data, status } = await $businessApi.apiBusinessesIdGet({
      id: id,
    });

    if (status === 200 || status === 204){
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se pudo obtener los datos del intermediario.');
      OperationResult.setError('unknown get error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo obtener los datos del intermediario.'
      ).setError(
        error.response?.data?.messages[0].message ??
          Errors.problem
      );
    }
    return OperationResult;
  }
};

export const PutBusiness = async (formData: BusinessEditionModel) => {
  const OperationResult = initOperationResult<BusinessModel>();
  try {
    const { data, status } = await $businessApi.apiBusinessesPut({
      businessEditionModel: formData,
    });
    if (status === 200 || status === 204){
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage(
        'No se pudo verificar la modificación del intermediario.'
      );
      OperationResult.setError('unknown put error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage('No se pudo modificar el intermediario.').setError(
        error.response?.data?.messages[0].message ??
          Errors.problem
      );
    }
    return OperationResult;
  }
};

export const DeleteBusiness = async (id: number) => {
  const OperationResult = initOperationResult<null>();
  try {
    await $businessApi.apiBusinessesIdDelete({
      id: id,
    });

    OperationResult.OperationSuccess(null);

    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage('No se pudo eliminar el intermediario.').setError(
        error.response?.data?.messages[0].message ??
          Errors.problem
      );
    }
    return OperationResult;
  }
};
