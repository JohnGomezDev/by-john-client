/**
 * Extracts a user-facing message from an API / Axios error.
 * Falls back to `fallbackMessage` when no useful message is found.
 */
export function getApiErrorMessage(error: unknown, fallbackMessage: string): string {
  const axiosError = error as {
    response?: { data?: { message?: string | string[] } };
  };
  const apiMessage = axiosError.response?.data?.message;

  if (Array.isArray(apiMessage)) {
    return apiMessage.join(', ');
  }

  if (typeof apiMessage === 'string' && apiMessage.length > 0) {
    return apiMessage;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}
