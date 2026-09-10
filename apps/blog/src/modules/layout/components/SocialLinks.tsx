import { cn } from '@repo/ui/lib/utils';

import { SOCIAL_LINKS, type ISocialLink } from '../constants/layout.constants';
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon } from './SocialIcons';

interface ISocialLinksProps {
  className?: string;
  /** Visually denser icons for the compact header strip. */
  size?: 'sm' | 'md';
}

function SocialIcon({ id, className }: { id: ISocialLink['id']; className?: string }): React.JSX.Element {
  switch (id) {
    case 'facebook':
      return <FacebookIcon className={className} />;
    case 'instagram':
      return <InstagramIcon className={className} />;
    case 'x':
      return <XIcon className={className} />;
    case 'linkedin':
      return <LinkedInIcon className={className} />;
  }
}

export function SocialLinks({ className, size = 'md' }: ISocialLinksProps): React.JSX.Element {
  const iconClass = size === 'sm' ? 'size-3.5' : 'size-4';
  const buttonClass =
    size === 'sm'
      ? 'size-8 rounded-md'
      : 'size-9 rounded-lg sm:size-10';

  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {SOCIAL_LINKS.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            aria-label={link.label}
            className={cn(
              'inline-flex items-center justify-center border border-border bg-background text-neutral transition-colors',
              'hover:border-secondary hover:bg-secondary/20 hover:text-primary',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              buttonClass,
            )}
          >
            <SocialIcon id={link.id} className={iconClass} />
          </a>
        </li>
      ))}
    </ul>
  );
}
