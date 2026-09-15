export interface IFetchRequestOptions extends RequestInit {
  next?: { revalidate?: number | false; tags?: string[] };
}

export interface IFetchClient {
  get: <T>(path: string, options?: IFetchRequestOptions) => Promise<T>;
  post: <T>(path: string, body: unknown, options?: IFetchRequestOptions) => Promise<T>;
  patch: <T>(path: string, body: unknown, options?: IFetchRequestOptions) => Promise<T>;
  put: <T>(path: string, body: unknown, options?: IFetchRequestOptions) => Promise<T>;
  delete: <T>(path: string, options?: IFetchRequestOptions) => Promise<T>;
}

export function createFetchClient(
  baseURL: string,
  defaultOptions?: IFetchRequestOptions,
): IFetchClient {
  async function request<T>(
    path: string,
    options?: IFetchRequestOptions,
  ): Promise<T> {
    const { headers: defaultHeaders, ...restDefaults } = defaultOptions ?? {};
    const { headers: optionHeaders, ...restOptions } = options ?? {};

    const response = await fetch(`${baseURL}${path}`, {
      ...restDefaults,
      ...restOptions,
      headers: {
        'Content-Type': 'application/json',
        ...(defaultHeaders as Record<string, string> | undefined),
        ...(optionHeaders as Record<string, string> | undefined),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  return {
    get: <T>(path: string, options?: IFetchRequestOptions): Promise<T> =>
      request<T>(path, { ...options, method: 'GET' }),

    post: <T>(path: string, body: unknown, options?: IFetchRequestOptions): Promise<T> =>
      request<T>(path, { ...options, method: 'POST', body: JSON.stringify(body) }),

    patch: <T>(path: string, body: unknown, options?: IFetchRequestOptions): Promise<T> =>
      request<T>(path, { ...options, method: 'PATCH', body: JSON.stringify(body) }),

    put: <T>(path: string, body: unknown, options?: IFetchRequestOptions): Promise<T> =>
      request<T>(path, { ...options, method: 'PUT', body: JSON.stringify(body) }),

    delete: <T>(path: string, options?: IFetchRequestOptions): Promise<T> =>
      request<T>(path, { ...options, method: 'DELETE' }),
  };
}
