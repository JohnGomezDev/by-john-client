import { Card, CardContent } from '@repo/ui/components/ui/card';

import type { IPost } from '../types/admin.types';
import { getAuthorInitials } from '../utils/post-detail.utils';

interface IPostDetailAuthorCardProps {
  post: IPost;
}

export function PostDetailAuthorCard({ post }: IPostDetailAuthorCardProps): React.JSX.Element {
  return (
    <Card className="border-slate-200 py-0 shadow-sm">
      <CardContent className="px-5 py-5">
        <h2 className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
          Detalles del autor
        </h2>

        <div className="mt-4 flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700"
          >
            {getAuthorInitials(post.admin)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {post.admin.name} {post.admin.lastName}
            </p>
            <p className="truncate text-sm text-slate-500">Administrador</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
