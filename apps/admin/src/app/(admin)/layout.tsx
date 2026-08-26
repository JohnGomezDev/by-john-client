'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/lib/constants/routes.constants';
import { AuthLoadingState } from '@/modules/auth/components/AuthLoadingState';
import { LogoutButton } from '@/modules/auth/components/LogoutButton';
import { SessionErrorState } from '@/modules/auth/components/SessionErrorState';
import { useAuthInit } from '@/modules/auth/hooks/use-auth-init';

interface IAdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: IAdminLayoutProps): React.JSX.Element {
  const { isChecking, isAuthenticated, sessionError } = useAuthInit();
  const router = useRouter();

  useEffect(() => {
    if (!isChecking && !isAuthenticated && !sessionError) {
      router.replace(ROUTES.login);
    }
  }, [isChecking, isAuthenticated, sessionError, router]);

  if (isChecking) {
    return <AuthLoadingState />;
  }

  if (sessionError) {
    return <SessionErrorState message={sessionError} />;
  }

  if (!isAuthenticated) {
    return <></>;
  }

  return (
    <div className="min-h-screen p-6">
      <header className="mb-6 flex justify-end">
        <LogoutButton />
      </header>
      {children}
    </div>
  );
}
