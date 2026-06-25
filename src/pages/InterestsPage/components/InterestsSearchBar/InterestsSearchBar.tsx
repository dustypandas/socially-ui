import './interests-search-bar.css';

type InterestsSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function InterestsSearchBar({ value, onChange }: InterestsSearchBarProps) {
  return (
    <input
      type="search"
      className="interests-search-bar"
      placeholder="search"
      value={value}
      onChange={event => onChange(event.target.value)}
      aria-label="Search interests"
    />
  );
}
