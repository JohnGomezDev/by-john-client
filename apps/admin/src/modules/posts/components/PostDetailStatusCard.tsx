import { Card, CardContent } from '@repo/ui/components/ui/card';

import type { IPost } from '../types/admin.types';
import { formatPostDate, formatPublishedDate } from '../utils/post-list.utils';
import { PostStatusBadge } from './PostStatusBadge';

interface IPostDetailStatusCardProps {
  post: IPost;
}

export function PostDetailStatusCard({ post }: IPostDetailStatusCardProps): React.JSX.Element {
  const isPublished = post.published;

  return (
    <Card className="border-slate-200 py-0 shadow-sm">
      <CardContent className="space-y-4 px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Estado
          </span>
          <PostStatusBadge published={post.published} />
        </div>

        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-slate-500">Creado</span>
          <span className="font-medium text-slate-900">{formatPostDate(post.createdAt)}</span>
        </div>

        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-slate-500">Actualizado</span>
          <span className="font-medium text-slate-900">{formatPostDate(post.updatedAt)}</span>
        </div>

        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-slate-500">Publicado</span>
          <span className="font-medium text-slate-900">{formatPublishedDate(isPublished ? post.publishedAt : null)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
