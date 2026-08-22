import { useEffect, useState, type ReactNode } from 'react';
import { AuthSignupInitial } from './AuthSignupInitial';
import { AuthSignupFinal } from './AuthSignupFinal';
import { AuthSignupVerify } from './AuthSignupVerify';
import './auth-overlay.css';

const SWITCH_ANIMATION_MS = 600;

export type SignupStep = 'initial' | 'verify' | 'final';

type AuthSignupAllStepsProps = {
  onSwitchToLogin?: () => void;
  onComplete: () => void | Promise<void>;
  onStepChange?: (step: SignupStep) => void;
};

export function AuthSignupAllSteps({
  onSwitchToLogin,
  onComplete,
  onStepChange,
}: AuthSignupAllStepsProps) {
  const [step, setStep] = useState<SignupStep>('initial');
  const [email, setEmail] = useState('');
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  const goToStep = (next: SignupStep) => {
    if (isSwitching || next === step) {
      return;
    }

    setIsSwitching(true);
    setStep(next);
    window.setTimeout(() => setIsSwitching(false), SWITCH_ANIMATION_MS);
  };

  let stepPanel: ReactNode;

  switch (step) {
    case 'initial':
      stepPanel = (
        <AuthSignupInitial
          onSwitchToLogin={onSwitchToLogin}
          onSuccess={async (submittedEmail) => {
            setEmail(submittedEmail);
            goToStep('verify');
          }}
        />
      );
      break;
    case 'verify':
      stepPanel = (
        <AuthSignupVerify
          email={email}
          onBack={() => goToStep('initial')}
          onSuccess={() => goToStep('final')}
        />
      );
      break;
    case 'final':
      stepPanel = <AuthSignupFinal onSuccess={onComplete} />;
      break;
  }

  return isSwitching
    ? <div className="auth-overlay__panel--entering">{stepPanel}</div>
    : stepPanel;
}
