import { useState } from 'react';
import { signupFinal } from '@src/data';
import { countries } from './data/countries';
import { getMadridSinceOptions } from './data/madridSinceOptions';
import { SearchDropdown } from './components/SearchDropdown';
import { SearchDropdownMultiple } from './components/SearchDropdownMultiple';
import './auth-signup-final.css';

const madridSinceOptions = getMadridSinceOptions();

type SignupFinalStatus = 'idle' | 'loading';

type AuthSignupFinalProps = {
  onSuccess: () => void | Promise<void>;
};

export function AuthSignupFinal({ onSuccess }: AuthSignupFinalProps) {
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<SignupFinalStatus>('idle');
  const [madridSince, setMadridSince] = useState('');
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
        previousHomes,
      });
      await onSuccess();
    } catch {
      setStatus('idle');
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <form className="auth-signup-final__form" onSubmit={handleSubmit}>
      <div className="auth-form__field">
        <label className="auth-form__label" htmlFor="signup-first-name">
          Hi, my name is
          <span className="auth-form__label-required"> *</span>
        </label>
        <div className="auth-signup-final__input-row">
          <input
            id="signup-first-name"
            name="firstName"
            type="text"
            className="auth-signup-final__input"
            placeholder="first name..."
            required
          />
          <input
            id="signup-last-name"
            name="lastName"
            type="text"
            className="auth-signup-final__input"
            placeholder="last name..."
            required
          />
        </div>
      </div>

      <div className="auth-form__field">
        <label className="auth-form__label" htmlFor="signup-password">
          Password
          <span className="auth-form__label-required"> *</span>
        </label>
        <div className="auth-signup-final__input-row">
          <input
            id="signup-password"
            name="password"
            type="password"
            className="auth-signup-final__input"
            placeholder="1 character minimum..."
            required
          />
          <input
            id="signup-password-confirmation"
            name="passwordConfirmation"
            type="password"
            className="auth-signup-final__input"
            placeholder="repeat password..."
            required
          />
        </div>
      </div>

      <div className="auth-form__field">
        <label className="auth-form__label" htmlFor="signup-madrid-since">
          I've been in Madrid since
          <span className="auth-form__label-required"> *</span>
        </label>
        <SearchDropdown
          id="signup-madrid-since"
          placeholder="select year..."
          options={madridSinceOptions}
          value={madridSince}
          onChange={setMadridSince}
        />
      </div>

      <div className="auth-form__field">
        <label className="auth-form__label" htmlFor="signup-previous-homes">
          I previously lived in
          <span className="auth-form__label-required"> *</span>
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
        <p className="auth-form__error">{passwordError}</p>
      )}

      {error && (
        <p className="auth-form__error">{error}</p>
      )}

      <button
        type="submit"
        className={[
          'auth-form__submit',
          isLoading && 'auth-form__submit--loading',
        ].filter(Boolean).join(' ')}
        disabled={isLoading}
      >
        Create My Account
      </button>
    </form>
  );
}
