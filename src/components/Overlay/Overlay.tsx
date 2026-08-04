import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './overlay.css';

const ANIMATION_MS = 300;

type OverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Overlay({ isOpen, onClose, children }: OverlayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const prevIsOpenRef = useRef(false);

  useEffect(() => {
    const wasOpen = prevIsOpenRef.current;
    prevIsOpenRef.current = isOpen;

    if (isOpen && !wasOpen) {
      const timer = window.setTimeout(() => {
        setIsVisible(true);
        setIsExiting(false);
      }, 0);
      return () => window.clearTimeout(timer);
    }

    if (!isOpen && wasOpen && isVisible) {
      const exitTimer = window.setTimeout(() => {
        setIsExiting(true);
      }, 0);
      const unmountTimer = window.setTimeout(() => {
        setIsVisible(false);
        setIsExiting(false);
      }, ANIMATION_MS);
      return () => {
        window.clearTimeout(exitTimer);
        window.clearTimeout(unmountTimer);
      };
    }
  }, [isOpen, isVisible]);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return createPortal(
    <div
      className={[
        'overlay',
        isExiting ? 'overlay--exiting' : 'overlay--entering',
      ].join(' ')}
    >
      <button
        type="button"
        className="overlay__backdrop"
        onClick={onClose}
      />
      <div className="overlay__card">
        {children}
      </div>
    </div>,
    document.body,
  );
}
