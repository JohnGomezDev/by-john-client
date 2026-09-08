import { Card, CardContent } from '@repo/ui/components/ui/card';

import type { IPost } from '../types/post.types';
import { getAuthorInitials } from '../utils/post-detail.utils';

interface IPostDetailAuthorCardProps {
  post: IPost;
}

export function PostDetailAuthorCard({ post }: IPostDetailAuthorCardProps): React.JSX.Element {
  return (
    <Card className="border-border py-0 shadow-sm">
      <CardContent className="px-5 py-5">
        <h2 className="text-xs font-semibold tracking-wide text-neutral/65 uppercase">
          Detalles del autor
        </h2>

        <div className="mt-4 flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary/40 text-sm font-semibold text-primary"
          >
            {getAuthorInitials(post.admin)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-primary">
              {post.admin.name} {post.admin.lastName}
            </p>
            <p className="truncate text-sm text-neutral/65">Administrador</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
