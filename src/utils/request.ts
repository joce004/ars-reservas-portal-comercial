import { AxiosError, AxiosResponse } from 'axios';
import { Errors } from 'src/enums/error-list-enum';
import { initOperationResult } from './operation-result';

export const ResolveRequestOperation = async <TModel>(
  request: () => Promise<AxiosResponse<TModel>>,
  messageError?: string) => {
  const OperationResult = initOperationResult<TModel>();
  try {
    await request().then((response) => OperationResult.OperationSuccess(response.data));
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        messageError ?? 'Hubo un problema al realizar la operación.'
      ).setError(
        error.response?.data?.messages[0].message ??
        Errors.problem
      );
    }
    return OperationResult;
  }
};
