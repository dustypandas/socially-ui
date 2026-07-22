import { PageLayout } from '@src/components';
import './login-page.css';

export function LoginPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <PageLayout hasStaticHeader headerVariant="auth">
      <section className="login-page">
        <div className="width-container signup-page__content">
          <h1 className="signup-page__title">Log In</h1>
          <form className="signup-page__form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="signup-page__input"
              placeholder="email..."
            />
            <input
              type="password"
              className="signup-page__input"
              placeholder="password..."
            />
            <button type="submit" className="signup-page__submit">
              Sign in
            </button>
          </form>
          <a href="#/signup-ui" className="signup-page__cross-link">
            Create an account
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
