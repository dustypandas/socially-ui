import IconClose from '@src/assets/icon-close-outline.svg?react';
import { SearchDropdown } from './SearchDropdown';
import './search-dropdown-multiple.css';

type SearchDropdownMultipleProps = {
  label: string;
  placeholder: string;
  options: readonly string[];
  values: string[];
  onValuesChange: (values: string[]) => void;
};

export function SearchDropdownMultiple({
  label,
  placeholder,
  options,
  values,
  onValuesChange,
}: SearchDropdownMultipleProps) {
  const availableOptions = options.filter(option => !values.includes(option));

  const handleSelect = (option: string) => {
    if (option === '' || values.includes(option)) {
      return;
    }

    onValuesChange([...values, option]);
  };

  const handleRemove = (option: string) => {
    onValuesChange(values.filter(value => value !== option));
  };

  return (
    <div className="search-dropdown-multiple signup-page__field">
      <span className="signup-page__label">{label}</span>
      {values.length > 0 && (
        <ul className="search-dropdown-multiple__selected-list">
          {values.map(value => (
            <li key={value} className="search-dropdown-multiple__selected-item">
              <button
                type="button"
                className="search-dropdown-multiple__selected-btn"
                onMouseDown={event => event.preventDefault()}
                onClick={() => handleRemove(value)}
              >
                {value}
                <IconClose className="search-dropdown-multiple__selected-icon" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <SearchDropdown
        label=""
        placeholder={placeholder}
        options={availableOptions}
        value=""
        onChange={handleSelect}
      />
    </div>
  );
}
