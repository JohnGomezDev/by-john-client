export interface IApiResponse<T> {
  data: T;
  status: 'ok';
  message: string;
}

export interface IApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}
