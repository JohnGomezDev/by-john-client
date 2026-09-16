'use client';

import { Link2 } from 'lucide-react';

import { toast } from '@repo/ui/components/ui/sonner';
import { cn } from '@repo/ui/lib/utils';

import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@repo/modules/layout/components/SocialIcons';

import { WhatsAppIcon } from '@/modules/layout/components/WhatsAppIcon';

import type { IPostShareUrls } from '../utils/post-detail.utils';

type TShareActionId =
  | 'facebook'
  | 'instagram'
  | 'x'
  | 'linkedin'
  | 'whatsapp'
  | 'copy';

interface IShareAction {
  id: TShareActionId;
  label: string;
  href?: string;
}

interface IPostDetailShareButtonsProps {
  url: string;
  title: string;
  shareUrls: IPostShareUrls;
}

const SHARE_BUTTON_CLASS =
  'inline-flex size-9 items-center justify-center rounded-md border border-border bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:size-10';

const SHARE_BRAND_CLASSES: Record<TShareActionId, string> = {
  facebook: 'text-[#1877F2] hover:border-[#1877F2]/40 hover:bg-[#1877F2]/10',
  instagram: 'text-[#E1306C] hover:border-[#E1306C]/40 hover:bg-[#E1306C]/10',
  x: 'text-[#0F1419] hover:border-[#0F1419]/35 hover:bg-[#0F1419]/5',
  linkedin: 'text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10',
  whatsapp: 'text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/10',
  copy: 'text-neutral/70 hover:border-secondary hover:bg-secondary/20 hover:text-primary',
};

export function PostDetailShareButtons({
  url,
  title,
  shareUrls,
}: IPostDetailShareButtonsProps): React.JSX.Element {
  const actions: IShareAction[] = [
    { id: 'facebook', label: 'Compartir en Facebook', href: shareUrls.facebook },
    { id: 'instagram', label: 'Copiar enlace para Instagram' },
    { id: 'x', label: 'Compartir en X', href: shareUrls.x },
    { id: 'linkedin', label: 'Compartir en LinkedIn', href: shareUrls.linkedin },
    { id: 'whatsapp', label: 'Compartir en WhatsApp', href: shareUrls.whatsapp },
    { id: 'copy', label: 'Copiar enlace' },
  ];

  async function copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Enlace copiado al portapapeles');
    } catch {
      toast.error('No se pudo copiar el enlace');
    }
  }

  async function handleInstagramShare(): Promise<void> {
    // Instagram has no web share intent; prefer the system share sheet, else copy.
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, text: title, url });
        return;
      } catch {
        // User cancelled or share failed — fall through to clipboard.
      }
    }

    await copyLink();
  }

  return (
    <ul
      className="grid grid-cols-6 gap-2 self-start sm:grid-cols-3 sm:self-center"
      aria-label="Compartir artículo"
    >
      {actions.map((action) => {
        if (action.href) {
          return (
            <li key={action.id}>
              <a
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={action.label}
                className={cn(SHARE_BUTTON_CLASS, SHARE_BRAND_CLASSES[action.id])}
              >
                <ShareIcon id={action.id} />
              </a>
            </li>
          );
        }

        return (
          <li key={action.id}>
            <button
              type="button"
              aria-label={action.label}
              className={cn(
                SHARE_BUTTON_CLASS,
                SHARE_BRAND_CLASSES[action.id],
                'cursor-pointer',
              )}
              onClick={() => {
                if (action.id === 'instagram') {
                  void handleInstagramShare();
                  return;
                }

                void copyLink();
              }}
            >
              <ShareIcon id={action.id} />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function ShareIcon({ id }: { id: TShareActionId }): React.JSX.Element {
  const className = 'size-4';

  switch (id) {
    case 'facebook':
      return <FacebookIcon className={className} />;
    case 'instagram':
      return <InstagramIcon className={className} />;
    case 'x':
      return <XIcon className={className} />;
    case 'linkedin':
      return <LinkedInIcon className={className} />;
    case 'whatsapp':
      return <WhatsAppIcon className={className} />;
    case 'copy':
      return <Link2 className={className} aria-hidden />;
  }
}
