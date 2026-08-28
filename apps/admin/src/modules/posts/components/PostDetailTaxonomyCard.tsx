import { Card, CardContent } from '@repo/ui/components/ui/card';

import type { IPost } from '../types/admin.types';

interface IPostDetailTaxonomyCardProps {
  post: IPost;
}

export function PostDetailTaxonomyCard({ post }: IPostDetailTaxonomyCardProps): React.JSX.Element {
  return (
    <Card className="border-slate-200 py-0 shadow-sm">
      <CardContent className="space-y-5 px-5 py-5">
        <h2 className="text-xs font-semibold tracking-wide text-slate-500 uppercase">Taxonomía</h2>

        <div className="space-y-2">
          <p className="text-sm text-slate-500">Categoría</p>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            {post.category.name}
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-slate-500">Etiquetas</p>
          {post.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">Sin etiquetas</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
