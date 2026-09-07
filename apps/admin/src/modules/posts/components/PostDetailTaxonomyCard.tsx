import { Card, CardContent } from '@repo/ui/components/ui/card';

import type { IPost } from '../types/admin.types';

interface IPostDetailTaxonomyCardProps {
  post: IPost;
}

export function PostDetailTaxonomyCard({ post }: IPostDetailTaxonomyCardProps): React.JSX.Element {
  return (
    <Card className="border-border py-0 shadow-sm">
      <CardContent className="space-y-5 px-5 py-5">
        <h2 className="text-xs font-semibold tracking-wide text-neutral/65 uppercase">Taxonomía</h2>

        <div className="space-y-2">
          <p className="text-sm text-neutral/65">Categoría</p>
          <span className="inline-flex items-center rounded-full bg-secondary/30 px-3 py-1 text-xs font-medium text-primary">
            {post.category.name}
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-neutral/65">Etiquetas</p>
          {post.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-neutral"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral/50">Sin etiquetas</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
