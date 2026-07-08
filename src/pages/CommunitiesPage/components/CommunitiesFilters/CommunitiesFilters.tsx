import { ButtonsGroup } from '@src/components';
import { COMMUNITY_SCOPE_OPTIONS, type CommunityScope } from '@src/pages/CommunitiesPage/helpers';
import './communities-filters.css';

type CommunitiesFiltersProps = {
  value: string;
  onChange: (value: string) => void;
  scope: CommunityScope;
  onScopeChange: (scope: CommunityScope) => void;
};

export function CommunitiesFilters({
  value,
  onChange,
  scope,
  onScopeChange,
}: CommunitiesFiltersProps) {
  return (
    <div className="communities-filters">
      <h3 className="communities-filters__title">Find</h3>
      <input
        type="search"
        className="communities-filters__search"
        placeholder="search..."
        value={value}
        onChange={event => onChange(event.target.value)}
      />
      <div className="communities-filters__scope-group">
        {COMMUNITY_SCOPE_OPTIONS.map(option => (
          <ButtonsGroup
            key={option.value}
            selected={scope === option.value}
            onClick={() => onScopeChange(option.value)}
          >
            {option.label}
          </ButtonsGroup>
        ))}
      </div>
    </div>
  );
}
