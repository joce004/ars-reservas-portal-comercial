import { AxiosError } from 'axios';

export interface IOperationResult<T> {
  OperationSuccess: (payload: T) => IOperationResult<T>;
  SetMessage: (message: string) => IOperationResult<T>;
  setError: (message: string) => IOperationResult<T>;
  IsSuccessful: () => boolean;
  Message: string | undefined;
  Errors: string[];
  RequestError?: AxiosError;
  Payload?: T | null;
}

export const initOperationResult = <T>() => {
  const OperationResult: IOperationResult<T> = {
    OperationSuccess: (payload) => {
      OperationResult.Payload = payload;
      return OperationResult;
    },
    SetMessage: (message) => {
      OperationResult.Message = message;
      return OperationResult;
    },
    setError: (message) => {
      OperationResult.Errors.push(message);
      return OperationResult;
    },
    IsSuccessful: () => (OperationResult.Errors.length == 0 ? true : false ),
    Message: undefined,
    Errors: [],
    Payload: undefined,
  };

  return OperationResult;
};
