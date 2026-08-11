import { useState } from 'react';
import { PageLayout } from '@src/components';
import { signupInitial } from '@src/data';
import './signup-page.css';

type SignupStatus = 'idle' | 'loading' | 'complete';

export function SignupPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SignupStatus>('idle');
  const [error, setError] = useState('');

  const isLoading = status === 'loading';
  const isComplete = status === 'complete';

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setError('');

    try {
      await signupInitial(email);
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

  const formContent = (
    <>
      <form className="auth-page__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="auth-page__input"
          placeholder="email..."
          value={email}
          onChange={event => setEmail(event.target.value)}
          disabled={isLoading}
          required
        />
        <button
          type="submit"
          className={[
            'auth-page__submit',
            isLoading && 'auth-page__submit--loading',
          ].filter(Boolean).join(' ')}
          disabled={isLoading}
        >
          Continue
          {/* Join our waitlist! */}
        </button>
        {error && <p className="auth-page__error">{error}</p>}
      </form>

      <div className="auth-page__cross-link-label">
        <div className="auth-page__divider" />
        Already have an account?{' '}
        <a
          href="#/login-ui"
          className={[
            'auth-page__cross-link',
            isLoading && 'auth-page__cross-link--disabled',
          ].filter(Boolean).join(' ')}
          onClick={handleLoginClick}
        >
          Login
        </a>
      </div>
    </>
  );

  return (
    <PageLayout hasStaticHeader headerVariant="auth">
      <section className="auth-page">
        <div className="width-container auth-page__content">
          <h1 className="auth-page__title">
            Bienvenido, let's get started!
            {/* <span className="text--full-color">🙂</span> */}
          </h1>
          {isComplete ? (
            <div className="signup-page__transition">
              <div className="signup-page__panel signup-page__panel--form signup-page__panel--exiting">
                {formContent}
              </div>
              <div className="signup-page__panel signup-page__panel--confirmation signup-page__panel--entering">
                <div className="signup-page__confirmation-text">
                  We've sent a link to <strong>{email}</strong> 👍
                </div>
                <div className="signup-page__confirmation-text">
                  Check your email to complete the next step.
                </div>

                <div className="auth-page__cross-link-label">
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
            </div>
          ) : (
            formContent
          )}
        </div>
      </section>
    </PageLayout>
  );
}
