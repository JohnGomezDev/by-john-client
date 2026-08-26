import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { createApiClient } from '@repo/lib/api/api-client';

import { ROUTES } from '@/lib/constants/routes.constants';
import { store } from '@/store';
import { clearAuth, setAccessToken } from '@/store/slices/auth.slice';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export const apiClient = createApiClient(BASE_URL, { withCredentials: true });

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = store.getState().auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null): void => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
      return;
    }

    resolve(token);
  });

  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: unknown) => {
    const originalRequest = (
      error as { config: InternalAxiosRequestConfig & { _retry?: boolean } }
    ).config;
    const status = (error as { response?: { status: number } }).response?.status;

    const AUTH_SKIP_URLS = ['/auth/login', '/auth/refresh'];
    const isAuthEndpoint = AUTH_SKIP_URLS.some((url) =>
      originalRequest.url?.includes(url),
    );

    if (status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token as string}`;
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post<{ data: { accessToken: string } }>(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const newToken = data.data.accessToken;
        store.dispatch(setAccessToken(newToken));
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        const refreshStatus = (refreshError as { response?: { status?: number } }).response
          ?.status;

        // Only clear the session when the refresh token itself is invalid (401).
        // Transient errors (429, 5xx, network) must not log the user out.
        if (refreshStatus === 401) {
          store.dispatch(clearAuth());

          if (typeof window !== 'undefined') {
            window.location.href = ROUTES.login;
          }
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
