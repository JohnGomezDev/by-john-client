import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios';

export function createApiClient(
  baseURL: string,
  options?: CreateAxiosDefaults,
): AxiosInstance {
  return axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
}
