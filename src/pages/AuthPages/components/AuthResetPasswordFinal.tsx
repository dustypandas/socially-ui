import { useState } from 'react';
import { resetPasswordConfirm } from '@src/data';
import './auth-reset-password-final.css';

type ResetPasswordConfirmStatus = 'idle' | 'loading';

type AuthResetPasswordFinalProps = {
  email: string;
  onSuccess: () => void | Promise<void>;
  onBack: () => void;
};

export function AuthResetPasswordFinal({
  email,
  onSuccess,
  onBack,
}: AuthResetPasswordFinalProps) {
  const [resetCode, setResetCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [status, setStatus] = useState<ResetPasswordConfirmStatus>('idle');
  const [error, setError] = useState('');

  const isLoading = status === 'loading';

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (password !== passwordRepeat) {
      setError('Passwords do not match.');
      return;
    }

    setStatus('loading');

    try {
      await resetPasswordConfirm({ email, resetCode, password });
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

  return (
    <div className="auth-form__panel">
      <div className="auth-form__subtitle">
        Please enter the 6 digit code we sent to <strong>{email}</strong>
      </div>
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="resetCode"
          className="auth-form__input"
          placeholder="Code for reset password..."
          inputMode="numeric"
          autoComplete="one-time-code"
          minLength={6}
          maxLength={6}
          pattern="\d{6}"
          value={resetCode}
          onChange={event => setResetCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
          disabled={isLoading}
          required
        />
        <input
          type="password"
          name="password"
          className="auth-form__input"
          placeholder="New password..."
          value={password}
          onChange={event => setPassword(event.target.value)}
          disabled={isLoading}
          required
        />
        <input
          type="password"
          name="passwordRepeat"
          className="auth-form__input"
          placeholder="Repeat password..."
          value={passwordRepeat}
          onChange={event => setPasswordRepeat(event.target.value)}
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
          Set New Password
        </button>
        {error && <p className="auth-form__error">{error}</p>}
      </form>

      <div className="auth-form__cross-link-label">
        <div className="auth-form__divider" />
        Didn't receive the email?{' '}
        <button
          type="button"
          className="auth-reset-password-final__try-again"
          onClick={onBack}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
