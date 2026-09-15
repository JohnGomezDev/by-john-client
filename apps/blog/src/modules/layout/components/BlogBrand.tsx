import Link from 'next/link';

import { cn } from '@repo/ui/lib/utils';

import { ROUTES } from '@/lib/constants/routes.constants';

import { SITE_NAME } from '../constants/layout.constants';

interface IBlogBrandProps {
  className?: string;
  /** Show a stronger wordmark for footer / marketing surfaces. */
  size?: 'sm' | 'md';
  /** Caret blink — intended for the header mark only. */
  animated?: boolean;
}

function BrandMark({
  className,
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}): React.JSX.Element {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-md bg-secondary text-primary',
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

export function BlogBrand({
  className,
  size = 'md',
  animated = false,
}: IBlogBrandProps): React.JSX.Element {
  const markSize = size === 'sm' ? 'size-7' : 'size-8 sm:size-9';
  const textSize = size === 'sm' ? 'text-base' : 'text-lg sm:text-xl';

  return (
    <Link
      href={ROUTES.home}
      className={cn(
        'inline-flex items-center gap-2.5 text-primary transition-opacity hover:opacity-90',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
    >
      <BrandMark className={markSize} animated={animated} />
      <span className={cn('font-display font-bold tracking-tight', textSize)}>{SITE_NAME}</span>
    </Link>
  );
}
