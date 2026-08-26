import axios from 'axios';
import type { IApiResponse } from '@repo/lib/api/api-response.types';

import { apiClient } from '@/lib/api/api-client';

import type { IAuthAdmin, ILoginPayload } from '../types/auth.types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

type TRefreshSessionResult = {
  accessToken: string;
  admin?: IAuthAdmin;
};

let refreshSessionPromise: Promise<TRefreshSessionResult> | null = null;

export async function login(
  payload: ILoginPayload,
): Promise<{ accessToken: string; admin: IAuthAdmin }> {
  const { data } = await apiClient.post<
    IApiResponse<{ accessToken: string; admin: IAuthAdmin }>
  >('/auth/login', payload);

  return data.data;
}

export async function refreshSession(): Promise<TRefreshSessionResult> {
  // Deduplicate concurrent callers (e.g. React StrictMode double-mount):
  // only one HTTP request; all callers await the same Promise.
  if (refreshSessionPromise) {
    return refreshSessionPromise;
  }

  // Raw axios — must not go through apiClient interceptors (avoids refresh loops)
  refreshSessionPromise = axios
    .post<IApiResponse<{ accessToken: string; admin?: IAuthAdmin }>>(
      `${BASE_URL}/auth/refresh`,
      {},
      { withCredentials: true },
    )
    .then(({ data }) => data.data)
    .finally(() => {
      refreshSessionPromise = null;
    });

  return refreshSessionPromise;
}

export async function logout(): Promise<void> {
  await apiClient.delete('/auth/logout');
}
