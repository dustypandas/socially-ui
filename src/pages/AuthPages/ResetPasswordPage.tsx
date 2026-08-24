import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageLayout } from '@src/components';
import { AuthResetPasswordAllSteps } from './components/AuthResetPasswordAllSteps';
import { getAuthSuccessRedirect } from './helpers/getAuthSuccessRedirect';
import './auth-page.css';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <PageLayout hasStaticHeader headerVariant="auth">
      <section className="auth-page">
        <div className="width-container">
          <h1 className="auth-page__title">Reset my password</h1>
          <AuthResetPasswordAllSteps
            onSwitchToLogin={() => navigate('/login-ui')}
            onComplete={() => navigate(getAuthSuccessRedirect(searchParams))}
          />
        </div>
      </section>
    </PageLayout>
  );
}
