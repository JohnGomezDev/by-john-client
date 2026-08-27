'use client';

import { Menu } from 'lucide-react';

import { Button } from '@repo/ui/components/ui/button';
import { cn } from '@repo/ui/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSidebarOpen, toggleSidebar } from '@/store/slices/ui.slice';

import { AdminSidebar } from './AdminSidebar';

interface IAdminLayoutShellProps {
  children: React.ReactNode;
}

export function AdminLayoutShell({ children }: IAdminLayoutShellProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

  const closeSidebar = (): void => {
    dispatch(setSidebarOpen(false));
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Cerrar menú"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <AdminSidebar onNavigate={closeSidebar} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center border-b border-slate-200 bg-white px-4 lg:hidden">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => dispatch(toggleSidebar())}
            aria-label="Abrir menú"
            aria-expanded={sidebarOpen}
          >
            <Menu className="size-5" />
          </Button>
          <p className="ml-2 truncate text-base font-bold text-blue-700">byJohn dashboard</p>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
