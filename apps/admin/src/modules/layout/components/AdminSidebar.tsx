'use client';

import { AdminSidebarNav } from './AdminSidebarNav';
import { AdminSidebarUser } from './AdminSidebarUser';

interface IAdminSidebarProps {
  onNavigate?: () => void;
}

export function AdminSidebar({ onNavigate }: IAdminSidebarProps): React.JSX.Element {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-slate-200 px-6 py-5">
        <p className="text-lg font-bold tracking-tight text-blue-700 sm:text-xl">
          byJohn dashboard
        </p>
      </div>

      <AdminSidebarNav onNavigate={onNavigate} />

      <AdminSidebarUser />
    </div>
  );
}
