import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios';

export function createAxiosClient(
  baseURL: string,
  options?: CreateAxiosDefaults,
): AxiosInstance {
  return axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
}
