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
    <Overlay isOpen={isOpen} onClose={onClose}>
      <div className="auth-signup-overlay">
        <div className="auth-signup-overlay__header">
          <h2 className="auth-signup-overlay__title">Sign up</h2>
          <button
            type="button"
            className="auth-signup-overlay__close"
            onClick={onClose}
          >
            <span className="auth-signup-overlay__close-icon" />
          </button>
        </div>
        <AuthSignup />
      </div>
    </Overlay>
  );
}
