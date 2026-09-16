import Link from 'next/link';

import { cn } from '../lib/cn';
import type { TLayoutTone } from '../types/layout.types';

interface ISiteBrandProps {
  href: string;
  name: string;
  className?: string;
  size?: 'sm' | 'md';
  /** Caret blink — intended for the header mark only. */
  animated?: boolean;
  /** `light` = blog (mint on navy text). `dark` = web (mint on dark canvas). */
  tone?: TLayoutTone;
}

function BrandMark({
  className,
  animated = false,
  tone = 'light',
}: {
  className?: string;
  animated?: boolean;
  tone?: TLayoutTone;
}): React.JSX.Element {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-md',
        tone === 'light'
          ? 'bg-secondary text-primary'
          : 'bg-accent text-accent-foreground',
        className,
      )}
      aria-hidden="true"
    >
      <span
        className={cn(
          'h-[52%] w-0.5 rounded-full bg-current sm:w-[2.5px]',
          animated && 'animate-brand-caret-blink motion-reduce:animate-none',
        )}
      />
    </span>
  );
}

export function SiteBrand({
  href,
  name,
  className,
  size = 'md',
  animated = false,
  tone = 'light',
}: ISiteBrandProps): React.JSX.Element {
  const markSize = size === 'sm' ? 'size-7' : 'size-8 sm:size-9';
  const textSize = size === 'sm' ? 'text-base' : 'text-lg sm:text-xl';

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2.5 transition-opacity',
        tone === 'light'
          ? 'text-primary hover:opacity-90 focus-visible:ring-ring'
          : 'text-foreground hover:opacity-80 focus-visible:ring-accent focus-visible:ring-offset-background',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        className,
      )}
    >
      <BrandMark className={markSize} animated={animated} tone={tone} />
      <span className={cn('font-display font-bold tracking-tight', textSize)}>
        {name}
      </span>
    </Link>
  );
}
