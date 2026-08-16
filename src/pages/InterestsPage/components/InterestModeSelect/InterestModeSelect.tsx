import { ButtonsGroup } from '@src/components';
import './interest-mode-select.css';

export type InterestsPageMode = 'explore' | 'follow';

const MODE_OPTIONS = [
  { value: 'explore', label: 'Explore' },
  { value: 'follow', label: 'Follow +' },
] as const satisfies { value: InterestsPageMode; label: string }[];

type InterestModeSelectProps = {
  value: InterestsPageMode;
  onChange: (value: InterestsPageMode) => void;
};

export function InterestModeSelect({ value, onChange }: InterestModeSelectProps) {
  return (
    <div className="interest-mode-select">
      <div className="interest-mode-select__group">
        {MODE_OPTIONS.map(option => (
          <ButtonsGroup
            key={option.value}
            selected={value === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </ButtonsGroup>
        ))}
      </div>
    </div>
  );
}
