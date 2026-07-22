import { useState } from 'react';
import { PageLayout } from '@src/components';
import { SearchDropdown } from './components/SearchDropdown';
import { SearchDropdownMultiple } from './components/SearchDropdownMultiple';
import { countries } from './data/countries';
import { getMadridSinceOptions } from './data/madridSinceOptions';
import { livingNearOptions } from './data/livingNearOptions';
import './signup-step2-page.css';

const madridSinceOptions = getMadridSinceOptions();

export function SignupStep2Page() {
  const [passwordError, setPasswordError] = useState('');
  const [madridSince, setMadridSince] = useState('');
  const [livingNear, setLivingNear] = useState('');
  const [previousHomes, setPreviousHomes] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordError('');

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get('password') ?? '');
    const passwordConfirmation = String(formData.get('passwordConfirmation') ?? '');

    if (password !== passwordConfirmation) {
      setPasswordError('Passwords do not match.');
      return;
    }

    if (!madridSince || !livingNear || previousHomes.length === 0) {
      return;
    }
  };

  return (
    <PageLayout hasStaticHeader headerVariant="auth2">
      <section className="signup-step2-page">
        <div className="width-container signup-step2-page__content">
          <h1 className="signup-page__title">Bienvenido <span className="text--full-color">🙂</span> Last Step!</h1>
          <form className="signup-step2-page__form" onSubmit={handleSubmit}>
            <div className="signup-step2-page__row">
              <div className="signup-page__field">
                <label className="signup-page__label" htmlFor="signup-first-name">
                  Hi, my name is
                </label>
                <input
                  id="signup-first-name"
                  name="firstName"
                  type="text"
                  className="signup-step2-page__input"
                  placeholder="first name..."
                  required
                />
              </div>

              <div className="signup-page__field">
                <label className="signup-page__label" htmlFor="signup-last-name">
                  &nbsp;
                </label>
                <input
                  id="signup-last-name"
                  name="lastName"
                  type="text"
                  className="signup-step2-page__input"
                  placeholder="last name..."
                  required
                />
              </div>
            </div>

            <div className="signup-step2-page__row">
              <div className="signup-page__field">
                <label className="signup-page__label" htmlFor="signup-password">
                  Password
                </label>
                <input
                  id="signup-password"
                  name="password"
                  type="password"
                  className="signup-step2-page__input"
                  placeholder="1 character minimum..."
                  required
                />
              </div>

              <div className="signup-page__field">
                <label className="signup-page__label" htmlFor="signup-password-confirmation">
                  &nbsp;
                </label>
                <input
                  id="signup-password-confirmation"
                  name="passwordConfirmation"
                  type="password"
                  className="signup-step2-page__input"
                  placeholder="repeat..."
                  required
                />
              </div>
            </div>

            <SearchDropdown
              label="I've been in Madrid since"
              placeholder="select year..."
              options={madridSinceOptions}
              value={madridSince}
              onChange={setMadridSince}
            />

            <SearchDropdown
              label="Living near"
              placeholder="my ghetto..."
              options={livingNearOptions}
              value={livingNear}
              onChange={setLivingNear}
            />

            <SearchDropdownMultiple
              label="I previously lived in"
              placeholder="previous homes..."
              options={countries}
              values={previousHomes}
              onValuesChange={setPreviousHomes}
            />

            {passwordError && (
              <p className="signup-page__error">{passwordError}</p>
            )}

            <button type="submit" className="signup-page__submit">
              Create My Account
            </button>
          </form>
        </div>
      </section>
    </PageLayout>
  );
}
