import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageLayout } from '@src/components';
import { signupFinal } from '@src/data';
import { getAuthSuccessRedirect } from '@src/pages/AuthPages/helpers/getAuthSuccessRedirect';
import { SearchDropdown } from './components/SearchDropdown';
import { SearchDropdownMultiple } from './components/SearchDropdownMultiple';
import { countries } from './data/countries';
import { getMadridSinceOptions } from './data/madridSinceOptions';
import { livingNearOptions } from './data/livingNearOptions';
import './signup-final-page.css';

const madridSinceOptions = getMadridSinceOptions();

type SignupFinalStatus = 'idle' | 'loading';

export function SignupFinalPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<SignupFinalStatus>('idle');
  const [madridSince, setMadridSince] = useState('');
  const [livingNear, setLivingNear] = useState('');
  const [previousHomes, setPreviousHomes] = useState<string[]>([]);

  const isLoading = status === 'loading';

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordError('');
    setError('');

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get('firstName') ?? '');
    const lastName = String(formData.get('lastName') ?? '');
    const password = String(formData.get('password') ?? '');
    const passwordConfirmation = String(formData.get('passwordConfirmation') ?? '');

    if (password !== passwordConfirmation) {
      setPasswordError('Passwords do not match.');
      return;
    }

    if (!madridSince || previousHomes.length === 0) {
      return;
    }

    setStatus('loading');

    try {
      await signupFinal({
        firstName,
        lastName,
        password,
        madridSince,
        livingNear,
        previousHomes,
      });
      navigate(getAuthSuccessRedirect(searchParams));
    } catch {
      setStatus('idle');
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <PageLayout hasStaticHeader headerVariant="auth2">
      <section className="signup-final-page">
        <div className="width-container signup-final-page__content">
          <h1 className="auth-page__title">Bienvenido <span className="text--full-color">🙂</span> Last Step!</h1>
          <form className="signup-final-page__form" onSubmit={handleSubmit}>
            <div className="auth-page__field">
              <label className="auth-page__label" htmlFor="signup-first-name">
                Hi, my name is
                <span className="auth-page__label-required"> *</span>
              </label>
              <div className="signup-final-page__input-row">
                <input
                  id="signup-first-name"
                  name="firstName"
                  type="text"
                  className="signup-final-page__input"
                  placeholder="first name..."
                  required
                />
                <input
                  id="signup-last-name"
                  name="lastName"
                  type="text"
                  className="signup-final-page__input"
                  placeholder="last name..."
                  required
                />
              </div>
            </div>

            <div className="auth-page__field">
              <label className="auth-page__label" htmlFor="signup-password">
                Password
                <span className="auth-page__label-required"> *</span>
              </label>
              <div className="signup-final-page__input-row">
                <input
                  id="signup-password"
                  name="password"
                  type="password"
                  className="signup-final-page__input"
                  placeholder="1 character minimum..."
                  required
                />
                <input
                  id="signup-password-confirmation"
                  name="passwordConfirmation"
                  type="password"
                  className="signup-final-page__input"
                  placeholder="repeat password..."
                  required
                />
              </div>
            </div>

            <div className="auth-page__field">
              <label className="auth-page__label" htmlFor="signup-madrid-since">
                I've been in Madrid since
                <span className="auth-page__label-required"> *</span>
              </label>
              <SearchDropdown
                id="signup-madrid-since"
                placeholder="select year..."
                options={madridSinceOptions}
                value={madridSince}
                onChange={setMadridSince}
              />
            </div>

            <div className="auth-page__field">
              <label className="auth-page__label" htmlFor="signup-living-near">
                Living near
              </label>
              <SearchDropdown
                id="signup-living-near"
                placeholder="my ghetto..."
                options={livingNearOptions}
                value={livingNear}
                onChange={setLivingNear}
              />
            </div>

            <div className="auth-page__field">
              <label className="auth-page__label" htmlFor="signup-previous-homes">
                I previously lived in
                <span className="auth-page__label-required"> *</span>
              </label>
              <SearchDropdownMultiple
                id="signup-previous-homes"
                placeholder="previous homes..."
                options={countries}
                values={previousHomes}
                onValuesChange={setPreviousHomes}
              />
            </div>

            {passwordError && (
              <p className="auth-page__error">{passwordError}</p>
            )}

            {error && (
              <p className="auth-page__error">{error}</p>
            )}

            <button
              type="submit"
              className={[
                'auth-page__submit',
                isLoading && 'auth-page__submit--loading',
              ].filter(Boolean).join(' ')}
              disabled={isLoading}
            >
              Create My Account
            </button>
          </form>
        </div>
      </section>
    </PageLayout>
  );
}
