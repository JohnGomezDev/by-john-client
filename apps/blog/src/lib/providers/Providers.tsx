'use client';

import { Toaster } from '@repo/ui/components/ui/sonner';
import { QueryClientProvider } from '@tanstack/react-query';

import { getQueryClient } from './get-query-client';

interface IProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: IProvidersProps): React.JSX.Element {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors closeButton position="top-right" />
    </QueryClientProvider>
  );
}
