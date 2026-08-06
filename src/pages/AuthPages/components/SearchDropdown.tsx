import { useEffect, useId, useRef, useState } from 'react';
import './search-dropdown.css';

type SearchDropdownProps = {
  id?: string;
  placeholder: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
};

const MAX_VISIBLE_OPTIONS = 50;

export function SearchDropdown({
  id,
  placeholder,
  options,
  value,
  onChange,
}: SearchDropdownProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const blurTimeoutRef = useRef<number | null>(null);

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
  const visibleOptions = filteredOptions.slice(0, MAX_VISIBLE_OPTIONS);

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
    <div className="search-dropdown">
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
      {isOpen && visibleOptions.length > 0 && (
        <ul className="search-dropdown__list">
          {visibleOptions.map(option => (
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
