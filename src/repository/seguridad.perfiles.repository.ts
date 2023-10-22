//TODO: Hacer util generico para encapsular lo que se repite
import { AxiosError } from 'axios';
import { RoleApiApiRolesGetRequest, AddOrDeleteRoleToProfileModel, ErrorResponse, RoleProfileCreationModel, RoleProfileEditionModel, RoleProfileModel, RoleProfileModelPaged } from 'src/api';
import { $roleProfileApi } from 'src/boot/api';
import { Errors } from 'src/enums/error-list-enum';
import { initOperationResult } from 'src/utils/operation-result';

//ResolveRequestOperation<void>(
//  () =>
//  $accountApi.apiAccountChangePasswordPut({
//    accountChangePasswordModel: params,
//  }),
//  'No se pudo obtener los datos del usuario.'
//);

export const FetchRoleProfiles = async (params?: {
  page?: number;
  query?: object;
}) => {
  const OperationResult = initOperationResult<RoleProfileModelPaged>();
  try {
    const { data, status } = await $roleProfileApi.apiProfilesGet({
      page: params?.page ?? 1,
      nameContains: (params?.query as RoleApiApiRolesGetRequest)?.nameContains,
    });

    if (status === 200 || status === 204) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se pudo obtener el listado de perfiles.');
      OperationResult.setError('unknown fetch error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo obtener el listado de perfiles.'
      ).setError(
        error.response?.data?.messages[0].message ?? Errors.unknownError
      );
    }
    return OperationResult;
  }
};

export const GetProfile = async (id: number) => {
  const OperationResult = initOperationResult<RoleProfileModel>();
  try {
    const { data, status } = await $roleProfileApi.apiProfilesIdGet({
      id: id,
      rawIncludes: ['Roles.Role'],
    });

    if (status === 200 || status === 204) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se pudo obtener los datos del perfil.');
      OperationResult.setError('unknown get error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo obtener los datos del perfil.'
      ).setError(
        error.response?.data?.messages[0].message ?? Errors.unknownError
      );
    }
    return OperationResult;
  }
};

export const PostProfile = async (profile: RoleProfileCreationModel) => {
  const OperationResult = initOperationResult<RoleProfileModel>();

  try {
    const { data, status } = await $roleProfileApi.apiProfilesPost({
      roleProfileCreationModel: profile,
    });
    if (status === 200 || status === 201) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage(
        'No se pudo verificar la creación del perfil.'
      );
      OperationResult.setError('unknown post error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage('No se pudo crear el perfil.').setError(
        error.response?.data?.messages[0].message ?? Errors.unknownError
      );
    }
    return OperationResult;
  }
};

export const PostRoleProfile = async (role: AddOrDeleteRoleToProfileModel) => {
  const OperationResult = initOperationResult<ErrorResponse>();
  try {
    const { data, status } = await $roleProfileApi.apiProfilesRolePost({
      addOrDeleteRoleToProfileModel: role,
    });
    if (status === 200 || status === 201) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se pudo añadir el rol del perfil.');
      OperationResult.setError('unknown post error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo añadir el rol del perfil.'
      ).setError(
        error.response?.data?.messages[0].message ?? Errors.unknownError
      );
    }
    return OperationResult;
  }
};

export const DeleteRoleProfile = async (
  role: AddOrDeleteRoleToProfileModel
) => {
  const OperationResult = initOperationResult<ErrorResponse>();

  try {
    const { data, status } = await $roleProfileApi.apiProfilesRoleDelete({
      addOrDeleteRoleToProfileModel: role,
    });
    if (status === 200 || status === 204) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se pudo remover el rol del perfil.');
      OperationResult.setError('unknown delete error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo remover el rol del perfil.'
      ).setError(
        error.response?.data?.messages[0].message ?? Errors.unknownError
      );
    }
    return OperationResult;
  }
};

export const PutProfiles = async (profile: RoleProfileEditionModel) => {
  const OperationResult = initOperationResult<RoleProfileModel>();
  try {
    const { data, status } = await $roleProfileApi.apiProfilesPut({
      roleProfileEditionModel: profile,
    });
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

export const DeleteProfiles = async (id: number) => {
  const OperationResult = initOperationResult<null>();
  try {
    await $roleProfileApi.apiProfilesIdDelete({
      id: id,
    });

    OperationResult.OperationSuccess(null);

    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage('No se pudo eliminar el perfil.').setError(
        error.response?.data?.messages[0].message ?? Errors.unknownError
      );
    }
    return OperationResult;
  }
};
