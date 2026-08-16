import { AuthSignup, PageLayout } from '@src/components';
import './auth-page.css';

export function SignupPage() {
  return (
    <PageLayout hasStaticHeader headerVariant="auth">
      <section className="auth-page">
        <div className="width-container auth-page__content">
          <h1 className="auth-page__title">
            Bienvenido, let's get started!
          </h1>
          <AuthSignup />
        </div>
      </section>
    </PageLayout>
  );
}
