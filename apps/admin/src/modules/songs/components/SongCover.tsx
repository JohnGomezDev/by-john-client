import { cn } from '@repo/ui/lib/utils';

interface ISongCoverProps {
  src: string;
  alt: string;
  size: 'sm' | 'lg';
}

const COVER_SIZE_CLASS: Record<ISongCoverProps['size'], string> = {
  sm: 'size-12 sm:size-14',
  lg: 'size-24 sm:size-32',
};

export function SongCover({ src, alt, size }: ISongCoverProps): React.JSX.Element {
  return (
    <img
      src={src}
      alt={alt}
      width={size === 'lg' ? 128 : 56}
      height={size === 'lg' ? 128 : 56}
      className={cn(
        'shrink-0 rounded-lg object-cover',
        COVER_SIZE_CLASS[size],
      )}
    />
  );
}
