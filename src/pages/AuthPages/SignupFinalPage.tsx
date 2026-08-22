import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthSignupFinal, PageLayout } from '@src/components';
import { getAuthSuccessRedirect } from '@src/pages/AuthPages/helpers/getAuthSuccessRedirect';
import './auth-page.css';
import './signup-final-page.css';

export function SignupFinalPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <PageLayout hasStaticHeader headerVariant="auth2">
      <section className="signup-final-page">
        <div className="width-container signup-final-page__content">
          <h1 className="auth-page__title">
            Bienvenido <span className="text--full-color">🙂</span> Last Step!
          </h1>
          <AuthSignupFinal
            onSuccess={() => navigate(getAuthSuccessRedirect(searchParams))}
          />
        </div>
      </section>
    </PageLayout>
  );
}
