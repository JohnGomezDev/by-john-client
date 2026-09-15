import { ROUTES } from "@/lib/constants/routes.constants";

export function buildCategoryHref(slug: string): string {
  const params = new URLSearchParams({ category: slug });
  return `${ROUTES.home}?${params.toString()}`;
}