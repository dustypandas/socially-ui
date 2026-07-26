import { useState } from 'react';
import { PageLayout } from '@src/components';
import { signupStep1 } from '@src/data';
import './signup-page.css';

type SignupStatus = 'idle' | 'loading' | 'complete';

export function SignupPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SignupStatus>('idle');
  const [error, setError] = useState('');

  const isLoading = status === 'loading';
  const isComplete = status === 'complete';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setError('');

    try {
      await signupStep1(email);
      setStatus('complete');
    } catch {
      setStatus('idle');
      setError('Something went wrong. Please try again.');
    }
  };

  const handleTryAgain = () => {
    setStatus('idle');
    setError('');
  };

  const handleLoginClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isLoading) {
      event.preventDefault();
    }
  };

  return (
    <PageLayout hasStaticHeader headerVariant="auth">
      <section className="signup-page">
        <div className="width-container signup-page__content">
          <h1 className="signup-page__title">
            Bienvenido, let's get started!
            {/* <span className="text--full-color">🙂</span> */}
          </h1>
          <div className="signup-page__transition">
            <div
              className={[
                'signup-page__panel',
                'signup-page__panel--form',
                isComplete && 'signup-page__panel--exiting',
              ].filter(Boolean).join(' ')}
            >
              <form className="signup-page__form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  className="signup-page__input"
                  placeholder="email..."
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  disabled={isLoading}
                  required
                />
                <button
                  type="submit"
                  className={[
                    'signup-page__submit',
                    isLoading && 'signup-page__submit--loading',
                  ].filter(Boolean).join(' ')}
                  disabled={isLoading}
                >
                  Continue
                  {/* Join our waitlist! */}
                </button>
                {error && <p className="signup-page__error">{error}</p>}
              </form>

              <div className="signup-page__cross-link-label">
                <div className="auth-page__divider" />
                Already have an account?{' '}
                <a
                  href="#/login-ui"
                  className={[
                    'signup-page__cross-link',
                    isLoading && 'signup-page__cross-link--disabled',
                  ].filter(Boolean).join(' ')}
                  onClick={handleLoginClick}
                >
                  Login
                </a>
              </div>
            </div>

            {isComplete && (
              <div className="signup-page__panel signup-page__panel--confirmation signup-page__panel--entering">
                <div className="signup-page__confirmation-text">
                  We've sent a link to <strong>{email}</strong> 👍
                </div>
                <div className="signup-page__confirmation-text">
                  Check your email to complete the next step.
                </div>

                <div className="signup-page__cross-link-label">
                  <div className="auth-page__divider" />
                  Didn't receive the email?{' '}
                  <button
                    type="button"
                    className="signup-page__try-again"
                    onClick={handleTryAgain}
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
