import { LoginPageContent } from '@/modules/auth/components/LoginPageContent';
import { LoginRedirect } from '@/modules/auth/components/LoginRedirect';

export default function LoginPage(): React.JSX.Element {
  return (
    <LoginRedirect>
      <LoginPageContent />
    </LoginRedirect>
  );
}
