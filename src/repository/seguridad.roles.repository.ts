//TODO: Hacer util generico para encapsular lo que se repite

import { AxiosError } from 'axios';
import { RoleApiApiRolesGetRequest, RoleCreationModel, RoleEditionModel, RoleModel, RoleModelPaged } from 'src/api';
import { $roleApi } from 'src/boot/api';
import { Errors } from 'src/enums/error-list-enum';
import { initOperationResult } from 'src/utils/operation-result';

export const FetchRoles = async (params?: {
  page?: number;
  query?: object;
}) => {
  const OperationResult = initOperationResult<RoleModelPaged>();
  try {
    const { data, status } = await $roleApi.apiRolesGet({
      page: params?.page ?? 1,
      nameContains: (params?.query as RoleApiApiRolesGetRequest)?.nameContains,
    });

    if (status === 200 || status === 204) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se pudo obtener el listado de roles.');
      OperationResult.setError('unknown fetch error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo obtener el listado de roles.'
      ).setError(
        (error.response?.data?.messages[0])?.message ?? Errors.unknownError
      );
    }
    return OperationResult;
  }
};

export const GetRole = async (id: string) => {
  const OperationResult = initOperationResult<RoleModel>();
  try {
    const { data, status } = await $roleApi.apiRolesIdGet({ id: id });

    if (status === 200 || status === 204) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se pudo obtener los datos del Rol.');
      OperationResult.setError('unknown get error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo obtener los datos del Rol.'
      ).setError(
        error.response?.data?.messages[0].message ?? Errors.unknownError
      );
    }
    return OperationResult;
  }
};

export const PostRoles = async (roles: RoleCreationModel) => {
  const OperationResult = initOperationResult<RoleModel>();

  try {
    const { data, status } = await $roleApi.apiRolesPost({ roleCreationModel: roles });
    if (status === 200 || status === 201) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se pudo verificar la creación del rol.');
      OperationResult.setError('unknown post error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage('No se pudo crear el rol.').setError(
        error.response?.data?.messages[0].message ?? Errors.unknownError
      );
    }
    return OperationResult;
  }
};

export const PutRoles = async (role: RoleEditionModel) => {
  const OperationResult = initOperationResult<RoleModel>();
  try {
    const { data, status } = await $roleApi.apiRolesPut({ roleEditionModel: role });
    if (status === 200 || status === 204) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage(
        'No se pudo verificar la modificación del usuario.'
      );
      OperationResult.setError('unknown put error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage('No se pudo modificar el usuario.').setError(
        error.response?.data?.messages[0].message ?? Errors.unknownError
      );
    }
    return OperationResult;
  }
};

export const DeleteRoles = async (id: string) => {
  const OperationResult = initOperationResult<null>();
  try {
    await $roleApi.apiRolesIdDelete({
      id: id,
    });

    OperationResult.OperationSuccess(null);

    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage('No se pudo eliminar el rol.').setError(
        error.response?.data?.messages[0].message ?? Errors.unknownError
      );
    }
    return OperationResult;
  }
};
