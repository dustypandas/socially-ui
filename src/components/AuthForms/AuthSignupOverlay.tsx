import { AuthSignup } from './AuthSignup';
import { Overlay } from '../Overlay/Overlay';
import './auth-signup-overlay.css';

type AuthSignupOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AuthSignupOverlay({
  isOpen,
  onClose,
}: AuthSignupOverlayProps) {
  return (
    <Overlay isOpen={isOpen} onClose={onClose} title="Sign up">
      <AuthSignup />
    </Overlay>
  );
}
