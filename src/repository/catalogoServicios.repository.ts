//TODO: Hacer util generico para encapsular lo que se repite

import { AxiosError } from 'axios';
import { $businessServiceRequestTypeApi, $serviceRequestTypeApi } from 'boot/api';
import { BusinessServiceRequestTypeEditionModel, BusinessServiceRequestTypeModel, BusinessServiceRequestTypeModelPaged, ServiceRequestTypeCreationModel, ServiceRequestTypeEditionModel, ServiceRequestTypeModel, ServiceRequestTypeModelPaged } from 'src/api';
import { Errors } from 'src/enums/error-list-enum';
import { initOperationResult } from 'src/utils/operation-result';

export const FetchServiceRequestType = async (params?: {
  page?: number;
  query?: object;
}) => {
  const OperationResult = initOperationResult<ServiceRequestTypeModelPaged>();
  try {
    const { data, status } =
      await $serviceRequestTypeApi.apiServiceRequestTypesGet({
        page: params?.page ?? 1,
        rawIncludes: ['requestType']
      });

    if (status === 200 || status === 204) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se pudo obtener el listado de servicios.');
      OperationResult.setError('unknown fetch error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo obtener el listado de servicios.'
      ).setError(
        error.response?.data?.messages[0].message ??
        Errors.problem
      );
    }
    return OperationResult;
  }
};

export const FetchBusinessServiceRequestType = async (params?: {
  page?: number;
  query?: object;
}) => {
  const OperationResult = initOperationResult<BusinessServiceRequestTypeModelPaged>();
  try {
    const { data, status } =
      await $businessServiceRequestTypeApi.apiBusinessesServiceRequestTypesGet({
        page: params?.page ?? 1,
        rawIncludes: ['requestType']
      });

    if (status === 200 || status === 204) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se pudo obtener el listado de servicios.');
      OperationResult.setError('unknown fetch error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo obtener el listado de servicios.'
      ).setError(
        error.response?.data?.messages[0].message ??
        Errors.problem
      );
    }
    return OperationResult;
  }
};

export const PostServiceRequestType = async (
  formData: ServiceRequestTypeCreationModel
) => {
  const OperationResult = initOperationResult<ServiceRequestTypeModel>();
  try {
    const { data, status } = await $serviceRequestTypeApi.apiServiceRequestTypesPost({
      serviceRequestTypeCreationModel: formData,
    });

    if (status === 200 || status === 201) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se pudo crear el servicio.');
      OperationResult.setError('unknown post error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage('No se pudo crear el servicio.').setError(
        error.response?.data?.messages[0].message ??
        Errors.problem
      );
    }
    return OperationResult;
  }
};

export const GetServiceRequestType = async (id: number) => {
  const OperationResult = initOperationResult<ServiceRequestTypeModel>();
  try {
    const { data, status } = await $serviceRequestTypeApi.apiServiceRequestTypesIdGet({
      id: id,
    });

    if (status === 200 || status === 204) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage(
        'No se pudo obtener los datos del servicio.'
      );
      OperationResult.setError('unknown get error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo obtener los datos del servicio.'
      ).setError(
        error.response?.data?.messages[0].message ??
        Errors.problem
      );
    }
    return OperationResult;
  }
};

export const GetBusinessesServiceRequestType = async (id: number) => {
  const OperationResult = initOperationResult<ServiceRequestTypeModel>();
  try {
    const { data, status } = await $businessServiceRequestTypeApi.apiBusinessesServiceRequestTypesIdGet({
      id: id,
    });

    if (status === 200 || status === 204) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage(
        'No se pudo obtener los datos del servicio.'
      );
      OperationResult.setError('unknown get error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo obtener los datos del servicio.'
      ).setError(
        error.response?.data?.messages[0].message ??
        Errors.problem
      );
    }
    return OperationResult;
  }
};

export const PutServiceRequestType = async (
  formData: ServiceRequestTypeEditionModel
) => {
  const OperationResult = initOperationResult<ServiceRequestTypeModel>();
  try {
    const { data, status } = await $serviceRequestTypeApi.apiServiceRequestTypesPut({
      serviceRequestTypeEditionModel: formData,
    });
    if (status === 200 || status === 204) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage(
        'No se pudo verificar la modificación del servicio.'
      );
      OperationResult.setError('unknown put error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage('No se pudo modificar el servicio.').setError(
        error.response?.data?.messages[0].message ??
        Errors.problem
      );
    }
    return OperationResult;
  }
};

export const PutBusinessesServiceRequestType = async (
  formData: BusinessServiceRequestTypeEditionModel
) => {
  const OperationResult = initOperationResult<BusinessServiceRequestTypeModel>();
  try {
    const { data, status } = await $businessServiceRequestTypeApi.apiBusinessesServiceRequestTypesPut({
      businessServiceRequestTypeEditionModel: formData,
    });
    if (status === 200 || status === 204) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage(
        'No se pudo verificar la modificación del servicio.'
      );
      OperationResult.setError('unknown put error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage('No se pudo modificar el servicio.').setError(
        error.response?.data?.messages[0].message ??
        Errors.problem
      );
    }
    return OperationResult;
  }
};

export const DeleteServiceRequestType = async (id: number) => {
  const OperationResult = initOperationResult<null>();
  try {
    await $serviceRequestTypeApi.apiServiceRequestTypesIdDelete({
      id: id,
    });

    OperationResult.OperationSuccess(null);

    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage('No se pudo eliminar el servicio.').setError(
        error.response?.data?.messages[0].message ??
        Errors.problem
      );
    }
    return OperationResult;
  }
};
