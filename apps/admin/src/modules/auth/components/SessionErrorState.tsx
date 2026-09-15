'use client';

import { Button } from '@repo/ui/components/ui/button';

interface ISessionErrorStateProps {
  message: string;
}

export function SessionErrorState({ message }: ISessionErrorStateProps): React.JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-xl font-semibold">No se pudo verificar tu sesión</h1>
      <p className="text-sm text-muted-foreground">{message}</p>
      <Button type="button" onClick={() => window.location.reload()}>
        Recargar página
      </Button>
    </main>
  );
}
