import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthSignupAllSteps, PageLayout } from '@src/components';
import { getAuthSuccessRedirect } from '@src/pages/AuthPages/helpers/getAuthSuccessRedirect';
import './auth-page.css';

export function SignupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <PageLayout hasStaticHeader headerVariant="auth">
      <section className="auth-page">
        <div className="width-container">
          <h1 className="auth-page__title">
            Bienvenido, let's get started!
          </h1>
          <AuthSignupAllSteps
            onComplete={() => navigate(getAuthSuccessRedirect(searchParams))}
          />
        </div>
      </section>
    </PageLayout>
  );
}
