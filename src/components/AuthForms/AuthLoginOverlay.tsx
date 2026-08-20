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
    <Overlay isOpen={isOpen} onClose={onClose} title="Sign in">
      <AuthLogin onSuccess={handleSuccess} />
    </Overlay>
  );
}
