'use client';

import { useRouter } from 'next/navigation';

import { ROUTES } from '@/lib/constants/routes.constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearAuth, setAuth } from '@/store/slices/auth.slice';

import { login, logout } from '../services/auth.service';
import type { IAuthAdmin, ILoginPayload } from '../types/auth.types';

export function useAuth(): {
  user: IAuthAdmin | null;
  isAuthenticated: boolean;
  login: (payload: ILoginPayload) => Promise<void>;
  logout: () => Promise<void>;
} {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const handleLogin = async (payload: ILoginPayload): Promise<void> => {
    const { accessToken, admin } = await login(payload);
    dispatch(setAuth({ accessToken, user: admin }));
    router.push(ROUTES.admin.posts.list);
  };

  const handleLogout = async (): Promise<void> => {
    await logout();
    dispatch(clearAuth());
    router.push(ROUTES.login);
  };

  return {
    user,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
  };
}
