import './interests-search-bar.css';

type InterestsSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  showAddButton: boolean;
  isAddButtonDisabled?: boolean;
  onAdd: () => void;
};

export function InterestsSearchBar({
  value,
  onChange,
  showAddButton,
  isAddButtonDisabled = false,
  onAdd,
}: InterestsSearchBarProps) {
  return (
    <div className="interests-search-bar-wrap">
      <input
        type="search"
        className="interests-search-bar"
        placeholder="search"
        value={value}
        onChange={event => onChange(event.target.value)}
        aria-label="Search interests"
      />
      <button
        type="button"
        className={[
          'interests-search-bar__add-btn',
          showAddButton && 'interests-search-bar__add-btn--visible',
        ].filter(Boolean).join(' ')}
        disabled={isAddButtonDisabled}
        onClick={onAdd}
        aria-label={`Add ${value.trim()} as a new interest`}
      >
        <span className="interests-list__btn-icon">+</span>&thinsp;follow
      </button>
    </div>
  );
}
