import { Card, CardContent } from '@repo/ui/components/ui/card';

import type { IPost } from '../types/admin.types';
import { PostDetailMarkdown } from './PostDetailMarkdown';

interface IPostDetailContentProps {
  post: IPost;
}

export function PostDetailContent({ post }: IPostDetailContentProps): React.JSX.Element {
  return (
    <Card className="border-slate-200 py-0 shadow-sm lg:flex lg:h-full lg:min-h-0 lg:flex-col lg:overflow-hidden">
      <CardContent className="flex flex-col px-5 py-6 sm:px-8 sm:py-8 lg:min-h-0 lg:flex-1 lg:overflow-hidden">
        <h1 className="shrink-0 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-4 shrink-0 text-lg leading-relaxed text-slate-600">{post.excerpt}</p>
        )}

        <div className="mt-6 min-h-0 flex-1 overflow-y-auto lg:pr-1">
          <PostDetailMarkdown content={post.content} />
        </div>
      </CardContent>
    </Card>
  );
}
