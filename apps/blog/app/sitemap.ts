import type { MetadataRoute } from 'next';

import { fetchPosts } from '@/modules/posts/services/posts.service';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  const first = await fetchPosts({ page: 1, limit: 30 });
  const remaining = await Promise.all(
    Array.from({ length: first.meta.totalPages - 1 }, (_, i) =>
      fetchPosts({ page: i + 2, limit: 30 }),
    ),
  );
  const allPosts = [first, ...remaining].flatMap((response) => response.items);

  const postEntries: MetadataRoute.Sitemap = allPosts
    .filter((post) => post.published && post.publishedAt)
    .map((post) => ({
      url: `${siteUrl}/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...postEntries,
  ];
}
