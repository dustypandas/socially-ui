import type { ReactNode } from 'react';
import './buttons-group.css';

type ButtonsGroupProps = {
  selected?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
};

export function ButtonsGroup({
  selected = false,
  onClick,
  children,
  className,
}: ButtonsGroupProps) {
  return (
    <button
      type="button"
      className={[
        'buttons-group',
        selected && 'buttons-group--selected',
        className,
      ].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
