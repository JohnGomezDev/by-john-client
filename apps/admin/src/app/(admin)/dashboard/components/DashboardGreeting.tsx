'use client';

import { useAppSelector } from '@/store/hooks';

export function DashboardGreeting(): React.JSX.Element {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <p className="text-muted-foreground">
      Bienvenido, {user?.name ?? 'administrador'}
    </p>
  );
}
