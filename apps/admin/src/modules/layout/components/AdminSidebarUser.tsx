'use client';

import { useState } from 'react';
import { LogOut } from 'lucide-react';

import { Button } from '@repo/ui/components/ui/button';
import { useAppSelector } from '@/store/hooks';

import { useAuth } from '@/modules/auth/hooks/use-auth';

export function AdminSidebarUser(): React.JSX.Element {
  const user = useAppSelector((state) => state.auth.user);
  const { logout } = useAuth();
  const [isPending, setIsPending] = useState(false);

  const displayName = user ? `${user.name} ${user.lastName}` : 'Administrador';

  const handleLogout = async (): Promise<void> => {
    setIsPending(true);
    try {
      await logout();
    } catch {
      setIsPending(false);
    }
  };

  return (
    <div className="flex items-center gap-3 border-t border-slate-200 px-4 py-4">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900">{displayName}</p>
        <p className="truncate text-xs text-slate-500">Administrador</p>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleLogout}
        disabled={isPending}
        aria-label={isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
        className="shrink-0 text-slate-500 hover:text-slate-900"
      >
        <LogOut className="cursor-pointer size-5" />
      </Button>
    </div>
  );
}
