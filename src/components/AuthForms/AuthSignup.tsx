import { useState } from 'react';
import { signupInitial } from '@src/data';
import './auth-signup.css';

type SignupStatus = 'idle' | 'loading' | 'complete';

export function AuthSignup() {
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
          Continue
        </button>
        {error && <p className="auth-form__error">{error}</p>}
      </form>

      <div className="auth-form__cross-link-label">
        <div className="auth-form__divider" />
        Already have an account?{' '}
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

  if (isComplete) {
    return (
      <div className="auth-signup__transition">
        <div className="auth-signup__panel auth-signup__panel--form auth-signup__panel--exiting">
          {formContent}
        </div>
        <div className="auth-signup__panel auth-signup__panel--confirmation auth-signup__panel--entering">
          <div className="auth-signup__confirmation-text">
            We've sent a link to <strong>{email}</strong> 👍
          </div>
          <div className="auth-signup__confirmation-text">
            Check your email to complete the next step.
          </div>

          <div className="auth-form__cross-link-label">
            <div className="auth-form__divider" />
            Didn't receive the email?{' '}
            <button
              type="button"
              className="auth-signup__try-again"
              onClick={handleTryAgain}
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return formContent;
}
