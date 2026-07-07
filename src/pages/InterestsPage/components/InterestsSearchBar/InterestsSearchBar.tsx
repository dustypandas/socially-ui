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
        placeholder="search..."
        value={value}
        onChange={event => onChange(event.target.value)}
      />
      <button
        type="button"
        className={[
          'interests-search-bar__add-btn',
          showAddButton && 'interests-search-bar__add-btn--visible',
        ].filter(Boolean).join(' ')}
        disabled={isAddButtonDisabled}
        onClick={onAdd}
      >
        <span className="interests-list__btn-icon">+</span>&thinsp;<span className="interests-search-bar__add-btn-text">follow</span>
      </button>
    </div>
  );
}
