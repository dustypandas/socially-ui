import { signupVerifyCode } from '@src/data';
import { useEffect, useRef, useState } from 'react';
import './auth-signup-verify.css';

const CODE_LENGTH = 6;

function createEmptyDigits() {
  return Array.from({ length: CODE_LENGTH }, () => '');
}

type VerifyStatus = 'idle' | 'loading';

type AuthSignupVerifyProps = {
  email: string;
  onSuccess: () => void | Promise<void>;
  onBack: () => void;
};

export function AuthSignupVerify({
  email,
  onSuccess,
  onBack,
}: AuthSignupVerifyProps) {
  const [digits, setDigits] = useState(createEmptyDigits);
  const [status, setStatus] = useState<VerifyStatus>('idle');
  const [error, setError] = useState('');
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const isVerifyingRef = useRef(false);

  const isLoading = status === 'loading';

  const focusDigit = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const resetDigits = () => {
    setDigits(createEmptyDigits());
    focusDigit(0);
  };

  const verifyCode = async (code: string) => {
    if (code.length !== CODE_LENGTH || isVerifyingRef.current) {
      return;
    }

    isVerifyingRef.current = true;
    setStatus('loading');
    setError('');

    try {
      await signupVerifyCode(code);
      await onSuccess();
    } catch (caughtError) {
      isVerifyingRef.current = false;
      setStatus('idle');
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Something went wrong. Please try again.',
      );
      resetDigits();
    }
  };

  const handleDigitChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);

    setDigits(currentDigits => {
      const nextDigits = [...currentDigits];
      nextDigits[index] = digit;

      if (digit && index < CODE_LENGTH - 1) {
        queueMicrotask(() => focusDigit(index + 1));
      }

      if (nextDigits.every(nextDigit => nextDigit !== '')) {
        queueMicrotask(() => void verifyCode(nextDigits.join('')));
      }

      return nextDigits;
    });
  };

  const handleDigitKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Backspace' && digits[index] === '' && index > 0) {
      event.preventDefault();
      setDigits(currentDigits => {
        const nextDigits = [...currentDigits];
        nextDigits[index - 1] = '';
        return nextDigits;
      });
      focusDigit(index - 1);
      return;
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      focusDigit(index - 1);
      return;
    }

    if (event.key === 'ArrowRight' && index < CODE_LENGTH - 1) {
      event.preventDefault();
      focusDigit(index + 1);
    }
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    void verifyCode(digits.join(''));
  };

  useEffect(() => {
    focusDigit(0);
  }, []);

  return (
    <div className="auth-form__panel">
      <p className="auth-signup-verify__instruction">
        Please enter the 6 digit code we sent to <strong>{email}</strong>.
      </p>

      <form
        className={[
          'auth-form__form',
          isLoading && 'auth-signup-verify__form--loading',
        ].filter(Boolean).join(' ')}
        onSubmit={handleSubmit}
      >
        <div className="auth-signup-verify__digits">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={element => {
                inputRefs.current[index] = element;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? 'one-time-code' : 'off'}
              className="auth-signup-verify__digit"
              value={digit}
              maxLength={1}
              disabled={isLoading}
              onChange={event => handleDigitChange(index, event.target.value)}
              onKeyDown={event => handleDigitKeyDown(index, event)}
            />
          ))}
        </div>
        {error && <p className="auth-form__error">{error}</p>}
      </form>

      <div className="auth-form__cross-link-label">
        <div className="auth-form__divider" />
        Didn't receive the email?{' '}
        <button
          type="button"
          className="auth-signup-verify__try-again"
          onClick={onBack}
          disabled={isLoading}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
