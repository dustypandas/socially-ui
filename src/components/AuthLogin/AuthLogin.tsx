import { useState } from 'react';
import { login } from '@src/data';
import { useSession } from '@src/providers/SessionProvider';
import './auth-login.css';

type LoginStatus = 'idle' | 'loading';

type AuthLoginProps = {
  onSuccess: () => void | Promise<void>;
};

export function AuthLogin({ onSuccess }: AuthLoginProps) {
  const { refreshSession } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<LoginStatus>('idle');
  const [error, setError] = useState('');

  const isLoading = status === 'loading';

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setError('');

    try {
      await login(email, password);
      await refreshSession();
      await onSuccess();
    } catch (caughtError) {
      setStatus('idle');
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Something went wrong. Please try again.',
      );
    }
  };

  const handleSignupClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isLoading) {
      event.preventDefault();
    }
  };

  return (
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
        <input
          type="password"
          name="password"
          className="auth-page__input"
          placeholder="password..."
          value={password}
          onChange={event => setPassword(event.target.value)}
          disabled={isLoading}
          required
        />
        <div className="auth-login__submit-group">
          <div
            className={[
              'auth-login__messages',
              error && 'auth-login__messages--visible',
            ].filter(Boolean).join(' ')}
          >
            <div className="auth-login__messages-inner">
              <div
                className={[
                  'auth-page__error',
                  error && 'auth-page__error--visible',
                ].filter(Boolean).join(' ')}
              >
                {error || '\u00A0'}
              </div>
              <div
                className={[
                  'auth-page__reset-prompt',
                  error !== 'Incorrect email or password.' && 'auth-page__reset-prompt--hidden',
                ].filter(Boolean).join(' ')}
              >
                {error === 'Incorrect email or password.' ? (
                  <>
                    Can't log in?{' '}
                    <a href="#/reset-password-ui" className="auth-page__cross-link">
                      Reset my password
                    </a>
                  </>
                ) : (
                  '\u00A0'
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={[
              'auth-page__submit',
              isLoading && 'auth-page__submit--loading',
            ].filter(Boolean).join(' ')}
            disabled={isLoading}
          >
            Sign in
          </button>
        </div>
      </form>
      <div className="auth-page__cross-link-label">
        <div className="auth-page__divider" />
        Don't have an account yet?{' '}
        <a
          href="#/signup-ui"
          className={[
            'auth-page__cross-link',
            isLoading && 'auth-page__cross-link--disabled',
          ].filter(Boolean).join(' ')}
          onClick={handleSignupClick}
        >
          Join Us!
        </a>
      </div>
    </>
  );
}
