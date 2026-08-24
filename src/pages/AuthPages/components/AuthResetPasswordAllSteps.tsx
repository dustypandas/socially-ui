import { useEffect, useState, type ReactNode } from 'react';
import '../../../components/AuthForms/auth-forms.css';
import { AuthResetPasswordFinal } from './AuthResetPasswordFinal';
import { AuthResetPasswordInitial } from './AuthResetPasswordInitial';

const SWITCH_ANIMATION_MS = 600;

export type ResetPasswordStep = 'initial' | 'final';

type AuthResetPasswordAllStepsProps = {
  onSwitchToLogin?: () => void;
  onComplete: () => void | Promise<void>;
  onStepChange?: (step: ResetPasswordStep) => void;
};

export function AuthResetPasswordAllSteps({
  onSwitchToLogin,
  onComplete,
  onStepChange,
}: AuthResetPasswordAllStepsProps) {
  const [step, setStep] = useState<ResetPasswordStep>('initial');
  const [email, setEmail] = useState('');
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  const goToStep = (next: ResetPasswordStep) => {
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
        <AuthResetPasswordInitial
          onSwitchToLogin={onSwitchToLogin}
          onSuccess={async (submittedEmail) => {
            setEmail(submittedEmail);
            goToStep('final');
          }}
        />
      );
      break;
    case 'final':
      stepPanel = (
        <AuthResetPasswordFinal
          email={email}
          onBack={() => goToStep('initial')}
          onSuccess={onComplete}
        />
      );
      break;
  }

  return isSwitching
    ? <div className="auth-forms__panel--entering">{stepPanel}</div>
    : stepPanel;
}
