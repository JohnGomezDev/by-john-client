import { Search } from 'lucide-react';

import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';

export function SongsSearchForm(): React.JSX.Element {
  return (
    <div
      role="search"
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Buscar canciones</span>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            placeholder="Buscar por título, artista o álbum"
            autoComplete="off"
            defaultValue=""
            className="h-10 pl-10"
          />
        </label>
        <Button
          type="button"
          className="h-10 w-full shrink-0 cursor-pointer bg-blue-600 hover:bg-blue-700 sm:w-auto"
        >
          <Search aria-hidden="true" className="size-4" />
          Buscar canciones
        </Button>
      </div>
    </div>
  );
}
