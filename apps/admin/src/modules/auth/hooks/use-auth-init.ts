'use client';

import { useAppSelector } from '@/store/hooks';

export function useAuthInit(): {
  isChecking: boolean;
  isAuthenticated: boolean;
  sessionError: string | null;
} {
  const isInitializing = useAppSelector((state) => state.auth.isInitializing);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const sessionError = useAppSelector((state) => state.auth.sessionError);

  return {
    isChecking: isInitializing,
    isAuthenticated,
    sessionError,
  };
}
