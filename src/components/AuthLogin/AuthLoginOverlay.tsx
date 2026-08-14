import { useCallback } from 'react';
import { Overlay } from '../Overlay/Overlay';
import { AuthLogin } from './AuthLogin';
import './auth-login-overlay.css';

type AuthLoginOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export function AuthLoginOverlay({
  isOpen,
  onClose,
  onSuccess,
}: AuthLoginOverlayProps) {
  const handleSuccess = useCallback(async () => {
    onSuccess?.();
    onClose();
  }, [onSuccess, onClose]);

  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <div className="auth-login-overlay">
        <div className="auth-login-overlay__header">
          <h2 className="auth-login-overlay__title">Sign in</h2>
          <button
            type="button"
            className="auth-login-overlay__close"
            onClick={onClose}
          >
            <span className="auth-login-overlay__close-icon" />
          </button>
        </div>
        <AuthLogin onSuccess={handleSuccess} />
      </div>
    </Overlay>
  );
}
