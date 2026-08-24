import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import type { AuthIntent } from '@src/common-libs/types';
import { Overlay } from '../Overlay/Overlay';
import { AuthSignupAllSteps, type SignupStep } from './AuthSignupAllSteps';
import { AuthLogin } from './AuthLogin';
import './auth-forms.css';

const SWITCH_ANIMATION_MS = 600;

type AuthOverlayMode = 'signup' | 'login';

type AuthOverlayProps = {
  isOpen: boolean;
  initialMode: AuthOverlayMode;
  authIntent?: AuthIntent;
  onClose: () => void;
  onSuccess?: () => void | Promise<void>;
};

export function AuthOverlay({
  isOpen,
  initialMode,
  authIntent,
  onClose,
  onSuccess,
}: AuthOverlayProps) {
  const [mode, setMode] = useState<AuthOverlayMode>(initialMode);
  const [signupStep, setSignupStep] = useState<SignupStep>('initial');
  const [signupFlowKey, setSignupFlowKey] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);
  const prevIsOpenRef = useRef(isOpen);

  useEffect(() => {
    const wasOpen = prevIsOpenRef.current;
    prevIsOpenRef.current = isOpen;

    if (isOpen && !wasOpen) {
      const timer = window.setTimeout(() => {
        setMode(initialMode);
        setSignupStep('initial');
        setSignupFlowKey(currentKey => currentKey + 1);
        setIsSwitching(false);
      }, 0);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen, initialMode]);

  const handleSwitchToLogin = () => {
    if (isSwitching || mode === 'login') {
      return;
    }

    setIsSwitching(true);
    setMode('login');
    window.setTimeout(() => setIsSwitching(false), SWITCH_ANIMATION_MS);
  };

  const handleSwitchToSignup = () => {
    if (isSwitching || mode === 'signup') {
      return;
    }

    setIsSwitching(true);
    setSignupStep('initial');
    setMode('signup');
    window.setTimeout(() => setIsSwitching(false), SWITCH_ANIMATION_MS);
  };

  const handleAuthSuccess = useCallback(async () => {
    await onSuccess?.();
    onClose();
  }, [onSuccess, onClose]);

  let title: ReactNode;
  let subtitle: string | undefined;

  if (mode === 'login') {
    title = authIntent ? 'Welcome back' : 'Sign in';
    if (authIntent?.intentLabel) {
      subtitle = `Sign in to ${authIntent.intentLabel}`;
    }
  } else if (signupStep === 'initial') {
    if (authIntent?.intent === 'fresh') {
      title = "Bienvenido, let's get started!";
    } else {
      title = authIntent ? 'Join Socially' : 'Sign up';
    }
    if (authIntent?.intentLabel) {
      subtitle = `Sign up to ${authIntent.intentLabel}`;
    }
  } else if (signupStep === 'verify') {
    title = 'Verify Code';
  } else if (signupStep === 'final') {
    title = authIntent
      ? (
        <>
          Welcome to Socially!{' '}
          <span className="text--full-color">🕺</span>
        </>
      )
      : 'Complete sign up';
  }

  const panel = mode === 'signup'
    ? (
      <AuthSignupAllSteps
        key={signupFlowKey}
        onSwitchToLogin={handleSwitchToLogin}
        onComplete={handleAuthSuccess}
        onStepChange={setSignupStep}
        submitLabel={authIntent?.actionLabel}
        subtitle={subtitle}
      />
    )
    : (
      <AuthLogin
        onSuccess={handleAuthSuccess}
        onSwitchToSignup={handleSwitchToSignup}
        subtitle={subtitle}
      />
    );

  const content = isSwitching
    ? <div className="auth-forms__panel--entering">{panel}</div>
    : panel;

  return (
    <Overlay isOpen={isOpen} onClose={onClose} title={title}>
      {content}
    </Overlay>
  );
}
