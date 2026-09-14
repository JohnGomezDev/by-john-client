import { ROUTES } from "@/lib/constants/routes.constants";

export function buildCategoryHref(slug: string): string {
  const params = new URLSearchParams({ categorySlug: slug });
  return `${ROUTES.home}?${params.toString()}`;
}