'use client';

import { useEffect } from 'react';
import { getApiErrorMessage } from '@repo/lib/utils/get-api-error-message';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAccessToken, setAuth, setInitialized } from '@/store/slices/auth.slice';

import { refreshSession } from '@/modules/auth/services/auth.service';

interface IAuthInitializerProps {
  children: React.ReactNode;
}

function getErrorStatus(error: unknown): number | undefined {
  return (error as { response?: { status?: number } }).response?.status;
}

export function AuthInitializer({ children }: IAuthInitializerProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setInitialized({ sessionError: null }));
      return;
    }

    const restoreSession = async (): Promise<void> => {
      try {
        const { accessToken, admin } = await refreshSession();

        if (admin) {
          dispatch(setAuth({ accessToken, user: admin }));
        } else {
          dispatch(setAccessToken(accessToken));
        }

        dispatch(setInitialized({ sessionError: null }));
      } catch (error: unknown) {
        // Only a 401 means the session is truly invalid — not an error worth surfacing.
        // 429 / 5xx / network errors are transient and shown to the user.
        const sessionError =
          getErrorStatus(error) !== 401
            ? getApiErrorMessage(
                error,
                'Hubo un problema temporal. Recarga la página e inténtalo de nuevo.',
              )
            : null;

        dispatch(setInitialized({ sessionError }));
      }
    };

    void restoreSession();
    // Only on mount — intentional: restore session once after a full page reload
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
