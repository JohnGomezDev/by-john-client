'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/lib/constants/routes.constants';
import { AuthLoadingState } from '@/modules/auth/components/AuthLoadingState';
import { useAuthInit } from '@/modules/auth/hooks/use-auth-init';

interface ILoginRedirectProps {
  children: React.ReactNode;
}

export function LoginRedirect({ children }: ILoginRedirectProps): React.JSX.Element {
  const { isChecking, isAuthenticated } = useAuthInit();
  const router = useRouter();

  useEffect(() => {
    if (!isChecking && isAuthenticated) {
      router.replace(ROUTES.admin.posts.list);
    }
  }, [isChecking, isAuthenticated, router]);

  if (isChecking) {
    return <AuthLoadingState />;
  }

  if (isAuthenticated) {
    return <></>;
  }

  return <>{children}</>;
}
