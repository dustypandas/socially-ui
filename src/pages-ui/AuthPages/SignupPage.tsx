import { useNavigate } from 'react-router-dom';
import { PageLayout } from '@src/components';
import './signup-page.css';

export function SignupPage() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/signup-step2-ui');
  };

  return (
    <PageLayout hasStaticHeader headerVariant="auth">
      <section className="signup-page">
        <div className="width-container signup-page__content">
          <h1 className="signup-page__title">
            Bienvenido, let's get started!
            {/* <span className="text--full-color">🙂</span> */}
          </h1>
          <form className="signup-page__form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="signup-page__input"
              placeholder="email..."
            />
            <button type="submit" className="signup-page__submit">
              Continue
            </button>
          </form>
          <div className="signup-page__cross-link-label">
            Already have an account?{' '}
            <a href="#/login-ui" className="signup-page__cross-link">
              Login
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
