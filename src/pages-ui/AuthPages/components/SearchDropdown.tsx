import { useEffect, useId, useRef, useState } from 'react';
import './search-dropdown.css';

type SearchDropdownProps = {
  label: string;
  placeholder: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
};

export function SearchDropdown({
  label,
  placeholder,
  options,
  value,
  onChange,
}: SearchDropdownProps) {
  const inputId = useId();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const blurTimeoutRef = useRef<number | null>(null);
  const hasLabel = label.length > 0;

  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current !== null) {
        window.clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  const inputValue = isOpen ? query : value;
  const normalizedQuery = query.trim().toLowerCase();
  const filteredOptions = normalizedQuery.length === 0
    ? options
    : options.filter(option => option.toLowerCase().includes(normalizedQuery));

  const openDropdown = () => {
    if (blurTimeoutRef.current !== null) {
      window.clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
    setQuery(value);
    setIsOpen(true);
  };

  const handleFocus = () => {
    openDropdown();
  };

  const handleClick = () => {
    if (!isOpen) {
      openDropdown();
    }
  };

  const handleBlur = () => {
    blurTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleSelect = (option: string) => {
    onChange(option);
    setQuery(option);
    setIsOpen(false);
  };

  const handleInputChange = (nextValue: string) => {
    setQuery(nextValue);
    onChange('');
    setIsOpen(true);
  };

  return (
    <div className={hasLabel ? 'search-dropdown signup-page__field' : 'search-dropdown'}>
      {hasLabel && (
        <label className="signup-page__label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type="text"
        className="search-dropdown__input"
        placeholder={placeholder}
        value={inputValue}
        onChange={event => handleInputChange(event.target.value)}
        onFocus={handleFocus}
        onClick={handleClick}
        onBlur={handleBlur}
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="search-dropdown__list">
          {filteredOptions.map(option => (
            <li key={option} className="search-dropdown__item">
              <button
                type="button"
                className="search-dropdown__option"
                onMouseDown={event => event.preventDefault()}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
