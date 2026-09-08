export function parsePage(value: string | null): number {
  const page = Number(value);

  return Number.isInteger(page) && page >= 1 ? page : 1;
}

export function buildUrl(pathname: string, params: URLSearchParams): string {
  const query = params.toString();

  return query ? `${pathname}?${query}` : pathname;
}
