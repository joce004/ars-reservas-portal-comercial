//TODO: Hacer util generico para encapsular lo que se repite
import { AxiosError } from 'axios';
import { AccountChangePasswordModel, AccountProfileResponseModel, UserLoginResponseModel } from 'src/api';
import { $accountApi } from 'src/boot/api';
import { useRetryPromise } from 'src/composables/use-retry-promise';
import { Errors, ErrorsEnumKeys } from 'src/enums/error-list-enum';
import { initOperationResult } from 'src/utils/operation-result';

export const Login = async (userName: string, password: string) => {
  const OperationResult = initOperationResult<UserLoginResponseModel>();
  try {
    const { data } = await useRetryPromise(
      $accountApi.apiAccountLoginPost({
        userLoginRequestModel: { username: userName, password: password },
      })
    );
    if (data.token) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se obtuvo el token de autenticación.');
      OperationResult.setError('authToken is null');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo completar la autenticación'
      ).setError(
        error.response?.data?.messages[0].message ?? Errors.problem
      );
    }
    return OperationResult;
  }
};

export const getAccount = async () => {
  const OperationResult = initOperationResult<AccountProfileResponseModel>();
  try {
    const { data } = await useRetryPromise(
      $accountApi.apiAccountGet()
    );
    if (data) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se pudo obtener los datos del usuario.');
      OperationResult.setError('userInfo is null');
      await LogOut();
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo obtener los datos del usuario.'
      ).setError(
        error.response?.data?.messages[0].message ?? Errors.problem
      );
      await LogOut();
    }
    return OperationResult;
  }
};

export const LogOut = async () => {
  try {
    await $accountApi.apiAccountLogoutPost();
  }
  catch (ex) {

  }
};

export const ResetPassword = async (params?: AccountChangePasswordModel) => {
  const OperationResult = initOperationResult<UserLoginResponseModel>();
  try {
    await $accountApi.apiAccountChangePasswordPut({
      accountChangePasswordModel: params,
    });
    //if (data.token) {
    //  OperationResult.OperationSuccess(data);
    //} else {
    //  OperationResult.SetMessage('No se obtuvo el token de autenticación.');
    //  OperationResult.setError('authToken is null');
    //}
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        Errors[error.response?.data?.messages[0]?.code as ErrorsEnumKeys] ??
        Errors.unknownError
      ).setError(
        error.response?.data?.messages[0].message ?? Errors.unknownError
      );
    }
    return OperationResult;
  }
};
