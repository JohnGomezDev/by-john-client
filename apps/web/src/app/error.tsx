'use client';

interface IErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: IErrorPageProps): React.JSX.Element {
  return (
    <main>
      <h1>Algo salió mal</h1>
      <p>Ocurrió un error inesperado.</p>
      <button type="button" onClick={reset}>
        Reintentar
      </button>
    </main>
  );
}
