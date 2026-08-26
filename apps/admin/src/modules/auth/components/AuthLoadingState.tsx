'use client';

export function AuthLoadingState(): React.JSX.Element {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div
        className="size-8 animate-spin rounded-full border-2 border-muted border-t-primary"
        role="status"
        aria-label="Verificando sesión"
      />
    </main>
  );
}
