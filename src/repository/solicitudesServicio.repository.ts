//TODO: Hacer util generico para encapsular lo que se

import { AxiosError } from 'axios';
import { ServiceRequestCreationModel, ServiceRequestEditionModel, ServiceRequestModel, ServiceRequestModelPaged, ServiceRequestStatusChangeModel } from 'src/api';
import {
  $businessServiceRequestTypeApi,
  $serviceRequestApi,
  $serviceRequestTypeApi,
} from 'src/boot/api';
import { ISelectOption } from 'src/models/schemas/IFormSpecification';
import { Errors } from 'src/enums/error-list-enum';
import { initOperationResult } from 'src/utils/operation-result';

export const FetchServiceRequests = async (
  visibility: 'ServiceRequestForm' | 'PlanQuoterForm',
  params?: {
    page?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query?: any;
  }
) => {
  const OperationResult = initOperationResult<ServiceRequestModelPaged>();
  try {
    const { data, status } = await $serviceRequestApi.apiServiceRequestsGet({
      page: params?.page ?? 1,
      visibility: visibility,
      status: params?.query?.status,
      fullNameContains: params?.query?.FullNameContains,
      responsibleUserId: params?.query?.ResponsibleUserId,
      businessOwnerId: params?.query?.BusinessOwnerId,
      rawIncludes: ['type', 'responsibleuser', 'businessOwner', 'businessOwner.responsibleUser'],
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
        'No se pudo obtener el listado de solicitudes.'
      ).setError(error.response?.data?.messages[0].message ?? Errors.problem);
    }
    return OperationResult;
  }
};

export const FetchServiceRequestType = async (businessId?: number) => {
  const OperationResult = initOperationResult<ISelectOption[]>();
  try {
    if (businessId) {
      const { data, status } =
        await $businessServiceRequestTypeApi.apiBusinessesServiceRequestTypesListGet(
          {
            businessId: businessId,
            visibility: 'ServiceRequestForm',
            status: 'Active',
            rawIncludes: ['requestType'],
          }
        );

      if (status === 200 || status === 204) {
        OperationResult.OperationSuccess(
          data
            ? data.map((x) => ({
              value: x.id ?? -1,
              text: x.requestType?.name ?? 'INDETERMINADO',
            }))
            : []
        );
      } else {
        OperationResult.SetMessage(
          'No se pudo obtener el listado de servicios.'
        );
        OperationResult.setError('unknown fetch error');
      }
    } else {
      const { data, status } =
        await $serviceRequestTypeApi.apiServiceRequestTypesListGet({
          status: 'Active',
        });

      if (status === 200 || status === 204) {
        OperationResult.OperationSuccess(
          data?.sort((a, b) => {
            if (a.name && b.name) {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
            }
            return 0;
          }).map((x) => ({
            value: x.id ?? -1,
            text: x.name ?? 'INDETERMINADO',
          }))
        );
      } else {
        OperationResult.SetMessage(
          'No se pudo obtener el listado de servicios.'
        );
        OperationResult.setError('unknown fetch error');
      }
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo obtener el listado de servicios.'
      ).setError(error.response?.data?.messages[0].message ?? Errors.problem);
    }
    return OperationResult;
  }
};

export const PostServiceRequestType = async (
  formData: ServiceRequestCreationModel
) => {
  const OperationResult = initOperationResult<ServiceRequestModel>();
  try {
    const { data, status } = await $serviceRequestApi.apiServiceRequestsPost({
      serviceRequestCreationModel: formData,
    });

    if (status === 200 || status === 201) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se pudo crear solicitud.');
      OperationResult.setError('unknown post error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage('No se pudo crear solicitud.').setError(
        error.response?.data?.messages[0].message ?? Errors.problem
      );
    }
    return OperationResult;
  }
};

export const GetServiceRequest = async (id: number) => {
  const OperationResult = initOperationResult<ServiceRequestModel>();
  try {
    const { data, status } = await $serviceRequestApi.apiServiceRequestsIdGet({
      id: id,
      rawIncludes: ['type', 'responsibleuser', 'businessOwner.responsibleuser', 'interactions'],
    });

    if (status === 200 || status === 204) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage(
        'No se pudo obtener los datos de la solicitud.'
      );
      OperationResult.setError('unknown get error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo obtener los datos de la solicitud.'
      ).setError(error.response?.data?.messages[0].message ?? Errors.problem);
    }
    return OperationResult;
  }
};

export const PutServiceRequest = async (
  formData: ServiceRequestEditionModel
) => {
  const OperationResult = initOperationResult<ServiceRequestModel>();
  try {
    const { data, status } = await $serviceRequestApi.apiServiceRequestsPut({
      serviceRequestEditionModel: formData,
    });
    if (status === 200 || status === 204) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage(
        'No se pudo verificar la modificación del de la solicitud.'
      );
      OperationResult.setError('unknown put error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage('No se pudo modificar la solicitud.').setError(
        error.response?.data?.messages[0].message ?? Errors.problem
      );
    }
    return OperationResult;
  }
};

export const PutServiceRequestsStatus = async (
  formData: ServiceRequestStatusChangeModel
) => {
  const OperationResult = initOperationResult<null>();
  try {
    const { status } = await $serviceRequestApi.apiServiceRequestsStatusPut({
      serviceRequestStatusChangeModel: formData,
    });
    if (status === 200 || status === 204) {
      OperationResult.OperationSuccess(null);
    } else {
      OperationResult.SetMessage(
        'No se pudo verificar la modificación del de la solicitud.'
      );
      OperationResult.setError('unknown put error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage('No se pudo modificar la solicitud.').setError(
        error.response?.data?.messages[0].message ?? Errors.problem
      );
    }
    return OperationResult;
  }
};

export const DeleteServiceRequest = async (id: number) => {
  const OperationResult = initOperationResult<null>();
  try {
    await $serviceRequestApi.apiServiceRequestsIdDelete({
      id: id,
    });

    OperationResult.OperationSuccess(null);

    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage('No se pudo eliminar la solicitud.').setError(
        error.response?.data?.messages[0].message ?? Errors.problem
      );
    }
    return OperationResult;
  }
};
