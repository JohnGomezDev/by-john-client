import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PostDetail } from '@/modules/posts/components/PostDetail';
import { fetchPostBySlug, fetchPosts } from '@/modules/posts/services/posts.service';
import {
  buildPostBreadcrumbItems,
  getAuthorFullName,
  getPostCanonicalUrl,
} from '@/modules/posts/utils/post-detail.utils';

interface IPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: IPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug).catch(() => null);

  if (!post) {
    return { title: 'Post no encontrado' };
  }

  const title = post.metaTitle ?? post.title;
  const description = post.metaDescription ?? post.excerpt;
  const canonicalUrl = getPostCanonicalUrl(post.slug);
  const publishedTime = post.publishedAt ?? post.createdAt;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url: canonicalUrl,
      locale: 'es_ES',
      publishedTime,
      modifiedTime: post.updatedAt,
      authors: [getAuthorFullName(post.admin)],
      tags: post.tags.map((tag) => tag.name),
      images: post.ogImageUrl
        ? [{ url: post.ogImageUrl, width: 1200, height: 630, alt: title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.ogImageUrl ? [post.ogImageUrl] : [],
    },
    robots: { index: post.published, follow: true },
  };
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const first = await fetchPosts({ page: 1, limit: 30 });
  const remaining = await Promise.all(
    Array.from({ length: first.meta.totalPages - 1 }, (_, index) =>
      fetchPosts({ page: index + 2, limit: 30 }),
    ),
  );

  return [first, ...remaining].flatMap((response) =>
    response.items.map((post) => ({ slug: post.slug })),
  );
}

export default async function PostPage({
  params,
}: IPostPageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug).catch(() => null);

  if (!post) {
    notFound();
  }

  const canonicalUrl = getPostCanonicalUrl(post.slug);
  const breadcrumbItems = buildPostBreadcrumbItems(post);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.excerpt,
    url: canonicalUrl,
    datePublished: post.publishedAt ?? post.createdAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: getAuthorFullName(post.admin),
    },
    image: post.ogImageUrl ?? undefined,
    inLanguage: 'es',
    keywords: post.tags.map((tag) => tag.name).join(', '),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PostDetail post={post} />
    </>
  );
}
