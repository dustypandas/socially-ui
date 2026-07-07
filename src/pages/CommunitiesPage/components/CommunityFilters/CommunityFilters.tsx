import { ButtonsGroup } from '@src/components';
import { COMMUNITY_SCOPE_OPTIONS, type CommunityScope } from '@src/pages/CommunitiesPage/helpers';
import './community-filters.css';

type CommunityFiltersProps = {
  value: string;
  onChange: (value: string) => void;
  scope: CommunityScope;
  onScopeChange: (scope: CommunityScope) => void;
};

export function CommunityFilters({
  value,
  onChange,
  scope,
  onScopeChange,
}: CommunityFiltersProps) {
  return (
    <div className="community-filters">
      <h3 className="community-filters__title">Find</h3>
      <input
        type="search"
        className="community-filters__search"
        placeholder="search..."
        value={value}
        onChange={event => onChange(event.target.value)}
      />
      <div className="community-filters__scope-group">
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
