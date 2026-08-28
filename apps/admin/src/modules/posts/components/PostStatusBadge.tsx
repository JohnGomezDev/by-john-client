import type { IPostListItem } from '../types/admin.types';

interface IPostStatusBadgeProps {
  published: IPostListItem['published'];
}

export function PostStatusBadge({ published }: IPostStatusBadgeProps): React.JSX.Element {
  if (published) {
    return (
      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
        Publicado
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
      Borrador
    </span>
  );
}
