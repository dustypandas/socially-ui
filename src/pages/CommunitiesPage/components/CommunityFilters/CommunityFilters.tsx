import { ButtonsGroup } from '../../../../components';
import { COMMUNITY_SCOPE_OPTIONS, type CommunityScope } from '../../helpers';
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
      <h3 className="global-heading-text global-h3 community-filters__title">Find</h3>
      <input
        type="search"
        className="community-filters__search"
        placeholder="search..."
        value={value}
        onChange={event => onChange(event.target.value)}
        aria-label="Search communities"
      />
      <div
        className="community-filters__scope-group"
        role="radiogroup"
        aria-label="Filter communities by membership"
      >
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
