import { PenLine } from 'lucide-react';

import { LoginForm } from './LoginForm';

export function LoginPageContent(): React.JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-md flex-col items-center gap-6 sm:gap-8">
        <header className="flex flex-col items-center gap-3 text-center">
          <div
            aria-hidden="true"
            className="flex size-12 items-center justify-center rounded-xl bg-blue-600 shadow-sm sm:size-14"
          >
            <PenLine className="size-6 text-white sm:size-7" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            byJohn dashboard
          </h1>
        </header>

        <LoginForm />
      </div>
    </main>
  );
}
