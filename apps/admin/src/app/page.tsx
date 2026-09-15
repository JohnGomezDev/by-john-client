import { redirect } from 'next/navigation';

import { ROUTES } from '@/lib/constants/routes.constants';

export default function RootPage(): never {
  redirect(ROUTES.login);
}
