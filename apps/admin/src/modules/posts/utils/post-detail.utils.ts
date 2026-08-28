import type { IPostAuthor } from '../types/admin.types';

export function getAuthorInitials(admin: IPostAuthor): string {
  const firstInitial = admin.name.charAt(0);
  const lastInitial = admin.lastName.charAt(0);

  return `${firstInitial}${lastInitial}`.toUpperCase();
}