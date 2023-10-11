import { AxiosError } from 'axios';
import { CeduladoDispatcherFindEmpresaResponseModel, CeduladoDispatcherFindPersonaResponseModel } from 'src/api';
import { $helpersApi } from 'src/boot/api';
import { Errors } from 'src/enums/error-list-enum';
import { initOperationResult } from 'src/utils/operation-result';

export const FindPersona = async (numero: string) => {
  const OperationResult =
    initOperationResult<CeduladoDispatcherFindPersonaResponseModel>();
  try {
    const { data, status } = await $helpersApi.apiSharedHelpersFindPersonaGet({
      numero: numero,
    });

    if (status === 200 || status === 204) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se pudo obtener los datos de la persona.');
      OperationResult.setError('unknown get error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage(
        'No se pudo obtener los datos de la persona.'
      ).setError(error.response?.data?.messages[0].message ?? Errors.problem);
    }
    return OperationResult;
  }
};

export const FindEmpresa = async (numero: string) => {
  const OperationResult =
    initOperationResult<CeduladoDispatcherFindEmpresaResponseModel>();
  try {
    const { data, status } = await $helpersApi.apiSharedHelpersFindEmpresaGet({
      numero: numero,
    });

    if (status === 200 || status === 204) {
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
      ).setError(error.response?.data?.messages[0].message ?? Errors.problem);
    }
    return OperationResult;
  }
};
