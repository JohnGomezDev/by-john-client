import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface IFormPageHeaderProps {
  title: string;
  backHref: string;
  backAriaLabel: string;
}

export function FormPageHeader({
  title,
  backHref,
  backAriaLabel,
}: IFormPageHeaderProps): React.JSX.Element {
  return (
    <div className="flex items-center gap-3">
      <Link
        href={backHref}
        className="flex size-9 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50"
        aria-label={backAriaLabel}
      >
        <ArrowLeft className="size-4" />
      </Link>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
    </div>
  );
}
