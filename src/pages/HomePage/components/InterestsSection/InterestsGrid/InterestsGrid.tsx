import { useMemo } from 'react';
import { useAppSelector } from '../../../../../store/hooks';
import './interests-grid.css';

const MAX_POPULAR_INTERESTS = 12;

export function InterestsGrid() {
  const interests = useAppSelector(state => state.interests.items);
  const popularInterests = useMemo(
    () => interests.slice(0, MAX_POPULAR_INTERESTS),
    [interests],
  );

  return (
    <ul className="interests-grid">
      {popularInterests.map(interest => (
        <li key={interest.id} className="interests-grid__item">
          <a href="#" className="interests-grid__link">
            {interest.name} ({interest.followersCount})
          </a>
        </li>
      ))}
    </ul>
  );
}
