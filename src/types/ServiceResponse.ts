// Tirado do conteúdo da Trybe
export type ServiceResponseErrorStatus = 'UNAUTHORIZED' | 'NOT_FOUND';

export type ServiceResponseError = {
  status: ServiceResponseErrorStatus,
  data: { message: string }
};

export type ServiceResponseSuccess<DataType> = {
  status: 'SUCCESSFUL',
  data: DataType
};

export type ServiceResponse<T> = 
  ServiceResponseSuccess<T>
  | ServiceResponseError;