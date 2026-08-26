import { LoginForm } from '@/modules/auth/components/LoginForm';
import { LoginRedirect } from '@/modules/auth/components/LoginRedirect';

export default function LoginPage(): React.JSX.Element {
  return (
    <LoginRedirect>
      <main className="flex min-h-screen items-center justify-center p-6">
        <LoginForm />
      </main>
    </LoginRedirect>
  );
}
