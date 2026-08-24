import { useState } from 'react';
import { resetPassword } from '@src/data';
import './auth-reset-password-initial.css';

type ResetPasswordStatus = 'idle' | 'loading';

type AuthResetPasswordInitialProps = {
  onSuccess?: (email: string) => void | Promise<void>;
  onSwitchToLogin?: () => void;
};

export function AuthResetPasswordInitial({
  onSuccess,
  onSwitchToLogin,
}: AuthResetPasswordInitialProps = {}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<ResetPasswordStatus>('idle');
  const [error, setError] = useState('');

  const isLoading = status === 'loading';

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setError('');

    try {
      await resetPassword(email);
      await onSuccess?.(email);
    } catch {
      setStatus('idle');
      setError('Something went wrong. Please try again.');
    }
  };

  const handleLoginClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isLoading) {
      event.preventDefault();
      return;
    }

    if (onSwitchToLogin) {
      event.preventDefault();
      onSwitchToLogin();
    }
  };

  return (
    <div className="auth-form__panel">
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
          Send reset code
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
    </div>
  );
}
