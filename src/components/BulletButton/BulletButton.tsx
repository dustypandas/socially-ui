import type { ReactNode } from 'react';
import './bullet-button.css';

type BulletButtonProps = {
  selected?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
};

export function BulletButton({
  selected = false,
  onClick,
  children,
  className,
}: BulletButtonProps) {
  return (
    <button
      type="button"
      className={[
        'bullet-button',
        selected && 'bullet-button--selected',
        className,
      ].filter(Boolean).join(' ')}
      aria-pressed={selected}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
