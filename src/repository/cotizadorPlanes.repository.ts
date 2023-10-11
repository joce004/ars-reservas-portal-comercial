//TODO: Hacer util generico para encapsular lo que se repite

import { useRetryPromise } from 'src/composables/use-retry-promise';
import { $productApi } from 'src/boot/api';
import { initOperationResult } from 'src/utils/operation-result';
import { AxiosError } from 'axios';
import { Errors } from 'src/enums/error-list-enum';
import { QuoteProductsRequestModel, QuoteProductsResponseModel, FileResultModel } from 'src/api';

export const FetchProductos = async () => {
  const { data } = await useRetryPromise(
    $productApi.apiProductsAvailablesGet()
  );
  return data;
};

export const PostProductsQuote = async (quote: QuoteProductsRequestModel) => {
  const OperationResult = initOperationResult<QuoteProductsResponseModel>();

  try {
    const { data, status } = await $productApi.apiProductsQuotePost({
      quoteProductsRequestModel: quote,
    });
    if (status === 200 || status === 201) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se pudo realizar la cotización.');
      OperationResult.setError('unknown post error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      const code = error.response?.data?.code ?? 'IE';
      OperationResult.SetMessage('No se pudo realizar la cotización.').setError(
        `No se pudo realizar la cotización. Code: ${code}`
      );
    }
    return OperationResult;
  }
};

export const PrintQuote = async (id: number) => {
  const OperationResult = initOperationResult<FileResultModel>();

  try {
    const { data, status } = await $productApi.apiProductsQuoteIdReportPost({
      id: id,
    });
    if (status === 200 || status === 201) {
      OperationResult.OperationSuccess(data);
    } else {
      OperationResult.SetMessage('No se pudo imprimir la cotización.');
      OperationResult.setError('unknown post error');
    }
    return OperationResult;
  } catch (err) {
    if (err) {
      const error = err as AxiosError;
      OperationResult.SetMessage('No se pudo imprimir la cotización.').setError(
        error.response?.data?.messages[0].message ?? Errors.problem
      );
    }
    return OperationResult;
  }
};
