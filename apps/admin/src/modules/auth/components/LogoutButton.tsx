'use client';

import { useState } from 'react';

import { Button } from '@repo/ui/components/ui/button';

import { useAuth } from '../hooks/use-auth';

export function LogoutButton(): React.JSX.Element {
  const { logout } = useAuth();
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async (): Promise<void> => {
    setIsPending(true);
    try {
      await logout();
    } catch {
      setIsPending(false);
    }
  };

  return (
    <Button type="button" variant="outline" onClick={handleLogout} disabled={isPending}>
      {isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
    </Button>
  );
}
