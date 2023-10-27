import { useDateFormat } from '@vueuse/core';
import { AxiosError } from 'axios';
import { Errors } from 'src/enums/error-list-enum';
import { ResolveRequestOperation } from './request';
import { CeduladoDispatcherFindEmpresaResponseModel, CeduladoDispatcherFindPersonaResponseModel } from 'src/api';
import { $helpersApi } from 'src/boot/api';

export const padronPerson = async <
  T extends Nullable<{
    identification: string;
    firstName: string;
    secondName: string;
    firstLastName: string;
    secondLastName: string;
    birthDate: string;
  }>
>(
  model: T
) => {
  let error = undefined;
  try {
    if (model.identification?.length == 11) {
      const result = await ResolveRequestOperation<CeduladoDispatcherFindPersonaResponseModel>({
        request: () => $helpersApi.apiSharedHelpersFindPersonaGet({
          numero: `${model.identification}`,
        }), messageError: 'No se pudo obtener los datos de la persona.'
      })

      if (result?.IsSuccessful()) {
        const nombres = result.Payload?.nombres?.split(' ');
        model.firstName = nombres?.[0] ?? '';
        model.secondName = nombres?.splice(1, 1)?.join(' ') ?? '';
        model.firstLastName = result.Payload?.apellido1 ?? '';
        model.secondLastName = result.Payload?.apellido2 ?? '';
        model.birthDate = useDateFormat(
          result.Payload?.fechaNacimiento ?? '',
          'YYYY-MM-DD'
        ).value;
        model.identification = result.Payload?.numero ?? '';
      } else {
        error = `Error: ${result.Errors[0] ?? result.Message}`;
      }
    } else {
      error = 'Error: Número de cedúla invalido';
    }
  } catch (ex) {
    const responseError = ex as AxiosError;
    error = responseError.response?.data?.messages[0].message ?? Errors.problem;
  }
  return { model: model, error };
};

export const padronBusiness = async (identification: string) => {
  let model = undefined;
  let error = undefined;
  try {
    if (identification?.length == 9 || identification?.length == 11) {
      const result = await ResolveRequestOperation<CeduladoDispatcherFindEmpresaResponseModel>({
        request: () => $helpersApi.apiSharedHelpersFindEmpresaGet({
          numero: identification,
        }), messageError: 'No se pudo obtener los datos del intermediario.'
      });

      if (result?.IsSuccessful()) {
        model = result.Payload;
      } else {
        error = `Error: ${result.Errors[0] ?? result.Message}`;
      }
    } else {
      error = 'Error: Número de RNC invalido';
    }
  } catch (ex) {
    const responseError = ex as AxiosError;
    error = responseError.response?.data?.messages[0].message ?? Errors.problem;
  }
  return { model, error };
};
