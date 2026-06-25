import { useAppSelector } from '../../../../store/hooks';
import './interests-list.css';

type InterestsListProps = {
  searchQuery: string;
};

export function InterestsList({ searchQuery }: InterestsListProps) {
  const interests = useAppSelector(state => state.interests.items);
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredInterests = normalizedQuery
    ? interests.filter(interest =>
        interest.name.toLowerCase().includes(normalizedQuery),
      )
    : interests;

  return (
    <ul className="interests-list">
      {filteredInterests.map(interest => (
        <li key={interest.id} className="interests-list__item">
          <a href="#" className="interests-list__link">
            {interest.name} ({interest.followersCount})
          </a>
          <a href="#" className="interests-list__follow-btn">
            follow
          </a>
        </li>
      ))}
    </ul>
  );
}
