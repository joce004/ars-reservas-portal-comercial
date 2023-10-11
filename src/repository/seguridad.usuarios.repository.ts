//TODO: Hacer util generico para encapsular lo que se repite
import { AxiosError } from 'axios';
import { AddOrDeleteUserToProfileModel, BusinessUserEditionModel, BusinessUserModel, BusinessUserModelPaged, BusinessUserType, ErrorResponse, UserChangePasswordModel, UserCreationModel, UserEditionModel, UserModel, UserModelPaged } from 'src/api';
import { $roleProfileApi, $userApi, $businessUserApi } from 'src/boot/api';
import { Errors } from 'src/enums/error-list-enum';
import { initOperationResult } from 'src/utils/operation-result';

export const FetchUsers = async (params?: {
  page?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query?: any;
}) => {
  const OperationResult = initOperationResult<UserModelPaged>();
  try {
    const { data, status } = await $userApi.apiUsersGet({
      firstNameContains: params?.query?.firstNameContains,
      firstLastNameContains: params?.query?.firstLastNameContains,
      businessUserType: params?.query?.businessUserType,
      page: params?.page ?? 1,
      businessId: params?.query?.businessId,
      rawIncludes: ['briefBusinessUsers'],
    });

    if (status === 200 || status === 204) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se pudo obtener el listado de usuarios.');
      OperationResult.setError('unknown fetch error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo obtener el listado de usuarios.'
      ).setError(
        error.response?.data?.messages[0].message ?? Errors.unknownError
      );
    }
    return OperationResult;
  }
};

export const FetchUsersList = async (params?: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  businessId?: number;
  firstNameContains?: string;
  firstLastNameContains?: string;
  businessUserType?: BusinessUserType;
}) => {
  const OperationResult = initOperationResult<UserModel[]>();
  try {
    const { data, status } = await $userApi.apiUsersListGet({
      businessId: params?.businessId,
      firstNameContains: params?.firstNameContains,
      firstLastNameContains: params?.firstLastNameContains,
      businessUserType: params?.businessUserType,
      rawIncludes: ['briefBusinessUsers'],
    });

    if (status === 200 || status === 204) {

      OperationResult.OperationSuccess(data?.sort((a, b) => {
        if (a.fullName && b.fullName) {
          if (a.fullName > b.fullName) return 1;
          if (a.fullName < b.fullName) return -1;
        }
        return 0;
      }));
    } else {
      OperationResult.SetMessage('No se pudo obtener el listado de usuarios.');
      OperationResult.setError('unknown fetch error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo obtener el listado de usuarios.'
      ).setError(
        error.response?.data?.messages[0].message ?? Errors.unknownError
      );
    }
    return OperationResult;
  }
};

export const GetUser = async (id: string) => {
  const OperationResult = initOperationResult<UserModel>();
  try {
    const { data, status } = await $userApi.apiUsersIdGet({
      id: id,
      rawIncludes: ['Profiles', 'briefBusinessUsers'],
    });

    if (status === 200 || status === 204) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se pudo obtener los datos del usuario.');
      OperationResult.setError('unknown get error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo obtener los datos del usuario.'
      ).setError(
        error.response?.data?.messages[0].message ?? Errors.unknownError
      );
    }
    return OperationResult;
  }
};

export const PostUser = async (user: UserCreationModel) => {
  const OperationResult = initOperationResult<UserModel>();

  try {
    user.businessType = {
      type: user.businessType as string as BusinessUserType,
    };
    const { data, status } = await $userApi.apiUsersPost({
      userCreationModel: user,
    });
    if (status === 200 || status === 201) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage(
        'No se pudo verificar la creación del usuario.'
      );
      OperationResult.setError('unknown post error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage('No se pudo crear el usuario.').setError(
        error.response?.data?.messages[0].message ?? Errors.unknownError
      );
    }
    return OperationResult;
  }
};

export const PostProfilesUser = async (
  profile: AddOrDeleteUserToProfileModel
) => {
  const OperationResult = initOperationResult<ErrorResponse>();

  try {
    const { data } = await $roleProfileApi.apiProfilesUserPost({
      addOrDeleteUserToProfileModel: profile,
    });
    if (data) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se pudo añadir el perfil al usuario.');
      OperationResult.setError('unknown post error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo añadir el perfil al usuario.'
      ).setError(
        error.response?.data?.messages[0].message ?? 'Error desconocido'
      );
    }
    return OperationResult;
  }
};

export const DeleteProfilesUser = async (
  profile: AddOrDeleteUserToProfileModel
) => {
  const OperationResult = initOperationResult<ErrorResponse>();

  try {
    const { data, status } = await $roleProfileApi.apiProfilesUserDelete({
      addOrDeleteUserToProfileModel: profile,
    });
    if (status === 200 || status === 204) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se pudo remover el perfil al usuario.');
      OperationResult.setError('unknown delete error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo remover el perfil al usuario.'
      ).setError(
        error.response?.data?.messages[0].message ?? Errors.unknownError
      );
    }
    return OperationResult;
  }
};

export const PutUser = async (user: UserEditionModel) => {
  const OperationResult = initOperationResult<UserModel>();
  try {
    const { data, status } = await $userApi.apiUsersPut({
      userEditionModel: user,
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

export const PutUserChangePassword = async (
  credentials: UserChangePasswordModel
) => {
  const OperationResult = initOperationResult<null>();
  try {
    await $userApi.apiUsersChangePasswordPut({
      userChangePasswordModel: credentials,
    });
    OperationResult.OperationSuccess(null);

    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo actualizar la contraseña.'
      ).setError(
        error.response?.data?.messages[0].message ?? Errors.unknownError
      );
    }
    return OperationResult;
  }
};

export const DeleteUser = async (id: string) => {
  const OperationResult = initOperationResult<null>();
  try {
    await $userApi.apiUsersIdDelete({
      id: id,
    });

    OperationResult.OperationSuccess(null);

    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage('No se pudo eliminar el usuario.').setError(
        error.response?.data?.messages[0].message ?? Errors.unknownError
      );
    }
    return OperationResult;
  }
};

export const FetchBusinessesUsers = async (params?: {
  userId?: string;
  page?: number;
  query?: object;
}) => {
  const OperationResult = initOperationResult<BusinessUserModelPaged>();
  try {
    const { data, status } = await $businessUserApi.apiBusinessesUsersGet({
      userId: params?.userId,
      page: params?.page ?? 1,
      rawIncludes: ['business', 'responsibleBusinessUser.User'],
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
        'No se pudo obtener el listado del intermediarios.'
      ).setError(error.response?.data?.messages[0].message ?? Errors.problem);
    }
    return OperationResult;
  }
};

export const GetBusinessUser = async (id: number) => {
  const OperationResult = initOperationResult<BusinessUserModel>();
  try {
    const { data, status } = await $businessUserApi.apiBusinessesUsersIdGet({
      id: id,
    });

    if (status === 200 || status === 204) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se pudo obtener los datos del acceso.');
      OperationResult.setError('unknown get error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo obtener los datos del acceso.'
      ).setError(error.response?.data?.messages[0].message ?? Errors.problem);
    }
    return OperationResult;
  }
};

export const PutBusinessUser = async (formData: BusinessUserEditionModel) => {
  const OperationResult = initOperationResult<BusinessUserModel>();
  try {
    formData.type = { type: formData.type as string as BusinessUserType };
    const { data, status } = await $businessUserApi.apiBusinessesUsersPut({
      businessUserEditionModel: formData,
    });
    if (status === 200 || status === 204) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage(
        'No se pudo verificar la modificación del acceso.'
      );
      OperationResult.setError('unknown put error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage('No se pudo modificar el acceso.').setError(
        error.response?.data?.messages[0].message ?? Errors.problem
      );
    }
    return OperationResult;
  }
};
