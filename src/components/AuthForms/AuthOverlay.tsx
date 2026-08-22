import { useCallback, useEffect, useRef, useState } from 'react';
import { Overlay } from '../Overlay/Overlay';
import { AuthSignupAllSteps, type SignupStep } from './AuthSignupAllSteps';
import { AuthLogin } from './AuthLogin';
import './auth-overlay.css';

const SWITCH_ANIMATION_MS = 600;

type AuthOverlayMode = 'signup' | 'login';

type AuthOverlayProps = {
  isOpen: boolean;
  initialMode: AuthOverlayMode;
  onClose: () => void;
  onSuccess?: () => void | Promise<void>;
};

export function AuthOverlay({
  isOpen,
  initialMode,
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

  const title =
    mode === 'login'
      ? 'Sign in'
      : signupStep === 'verify'
        ? 'Verify Code'
        : signupStep === 'final'
          ? 'Complete sign up'
          : 'Sign up';

  const panel = mode === 'signup'
    ? (
      <AuthSignupAllSteps
        key={signupFlowKey}
        onSwitchToLogin={handleSwitchToLogin}
        onComplete={handleAuthSuccess}
        onStepChange={setSignupStep}
      />
    )
    : <AuthLogin onSuccess={handleAuthSuccess} onSwitchToSignup={handleSwitchToSignup} />;

  const content = isSwitching
    ? <div className="auth-overlay__panel--entering">{panel}</div>
    : panel;

  return (
    <Overlay isOpen={isOpen} onClose={onClose} title={title}>
      {content}
    </Overlay>
  );
}
