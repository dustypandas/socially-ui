import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageLayout } from '@src/components';
import { login } from '@src/data';
import { getAuthSuccessRedirect } from '@src/pages/AuthPages/helpers/getAuthSuccessRedirect';
import { useSession } from '@src/providers/SessionProvider';
import './login-page.css';

type LoginStatus = 'idle' | 'loading';

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { refreshSession } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<LoginStatus>('idle');
  const [error, setError] = useState('');

  const isLoading = status === 'loading';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setError('');

    try {
      await login(email, password);
      await refreshSession();
      navigate(getAuthSuccessRedirect(searchParams));
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
    <PageLayout hasStaticHeader headerVariant="auth">
      <section className="auth-page">
        <div className="width-container auth-page__content">
          <h1 className="auth-page__title">Welcome back</h1>
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
            <div className="login-page__submit-group">
              <div
                className={[
                  'login-page__messages',
                  error && 'login-page__messages--visible',
                ].filter(Boolean).join(' ')}
              >
                <div className="login-page__messages-inner">
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
        </div>
      </section>
    </PageLayout>
  );
}
