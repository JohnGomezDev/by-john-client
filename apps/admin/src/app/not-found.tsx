import Link from 'next/link';

import { ROUTES } from '@/lib/constants/routes.constants';

export default function NotFound(): React.JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-2xl font-semibold">Página no encontrada</h1>
      <Link href={ROUTES.login} className="text-primary underline">
        Volver al inicio de sesión
      </Link>
    </main>
  );
}
