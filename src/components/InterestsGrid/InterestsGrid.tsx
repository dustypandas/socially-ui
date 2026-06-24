import { useAppSelector } from '../../store/hooks';
import './interests-grid.css';

export function InterestsGrid() {
  const interests = useAppSelector(state => state.interests.items);

  return (
    <ul className="interests-grid">
      {interests.map(interest => (
        <li key={interest.id} className="interests-grid__item">
          <a href="#" className="interests-grid__link">
            {interest.name} ({interest.followersCount})
          </a>
        </li>
      ))}
    </ul>
  );
}
