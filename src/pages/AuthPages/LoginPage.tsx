import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthLogin, PageLayout } from '@src/components';
import { getAuthSuccessRedirect } from '@src/pages/AuthPages/helpers/getAuthSuccessRedirect';
import './auth-page.css';

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <PageLayout hasStaticHeader headerVariant="auth">
      <section className="auth-page">
        <div className="width-container auth-page__content">
          <h1 className="auth-page__title">Welcome back</h1>
          <AuthLogin
            onSuccess={() => navigate(getAuthSuccessRedirect(searchParams))}
          />
        </div>
      </section>
    </PageLayout>
  );
}
