import { FileText, FolderOpen, Music, type LucideIcon } from 'lucide-react';

import { ROUTES } from '@/lib/constants/routes.constants';

export interface ISidebarNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const SIDEBAR_NAV_ITEMS: ISidebarNavItem[] = [
  {
    label: 'Posts',
    href: ROUTES.admin.posts,
    icon: FileText,
  },
  {
    label: 'Categorías',
    href: ROUTES.admin.categorias,
    icon: FolderOpen,
  },
  {
    label: 'Canciones',
    href: ROUTES.admin.canciones,
    icon: Music,
  },
];
