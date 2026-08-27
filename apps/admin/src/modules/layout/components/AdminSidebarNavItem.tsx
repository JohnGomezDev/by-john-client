'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@repo/ui/lib/utils';

import type { ISidebarNavItem } from '../constants/sidebar-nav.constants';

interface IAdminSidebarNavItemProps {
  item: ISidebarNavItem;
  onNavigate?: () => void;
}

export function AdminSidebarNavItem({
  item,
  onNavigate,
}: IAdminSidebarNavItemProps): React.JSX.Element {
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        'flex items-center gap-3 border-l-4 px-4 py-3 text-sm font-medium transition-colors',
        isActive
          ? 'border-blue-600 bg-blue-50 text-blue-700'
          : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900',
      )}
    >
      <Icon aria-hidden="true" className="size-5 shrink-0 text-blue-700" />
      {item.label}
    </Link>
  );
}
