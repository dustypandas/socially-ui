import { useState } from 'react';
import { PageLayout } from '@src/components';
import { resetPassword } from '@src/data';
import './reset-password-page.css';

type ResetPasswordStatus = 'idle' | 'loading' | 'complete';

export function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<ResetPasswordStatus>('idle');
  const [error, setError] = useState('');

  const isLoading = status === 'loading';
  const isComplete = status === 'complete';

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setError('');

    try {
      await resetPassword(email);
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
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="auth-form__input"
          placeholder="email..."
          value={email}
          onChange={event => setEmail(event.target.value)}
          disabled={isLoading}
          required
        />
        <button
          type="submit"
          className={[
            'auth-form__submit',
            isLoading && 'auth-form__submit--loading',
          ].filter(Boolean).join(' ')}
          disabled={isLoading}
        >
          Send reset link
        </button>
        {error && <p className="auth-form__error">{error}</p>}
      </form>

      <div className="auth-form__cross-link-label">
        <div className="auth-form__divider" />
        Remember your password?{' '}
        <a
          href="#/login-ui"
          className={[
            'auth-form__cross-link',
            isLoading && 'auth-form__cross-link--disabled',
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
          <h1 className="auth-page__title">Reset my password</h1>
          {isComplete ? (
            <div className="reset-password-page__transition">
              <div className="reset-password-page__panel reset-password-page__panel--form reset-password-page__panel--exiting">
                {formContent}
              </div>
              <div className="reset-password-page__panel reset-password-page__panel--confirmation reset-password-page__panel--entering">
                <div className="reset-password-page__confirmation-text">
                  We've sent a reset link to <strong>{email}</strong> 👍
                </div>
                <div className="reset-password-page__confirmation-text">
                  Check your email to continue.
                </div>

                <div className="auth-form__cross-link-label">
                  <div className="auth-form__divider" />
                  Didn't receive the email?{' '}
                  <button
                    type="button"
                    className="reset-password-page__try-again"
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
