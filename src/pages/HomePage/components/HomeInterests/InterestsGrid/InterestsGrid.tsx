import type { Interest } from '@src/data';
import './interests-grid.css';

type InterestsGridProps = {
  popularInterests: Interest[];
};

export function InterestsGrid({ popularInterests }: InterestsGridProps) {
  return (
    <ul className="interests-grid">
      {popularInterests.map(interest => (
        <li key={interest.label} className="interests-grid__item">
          <a href="#/one-interest-ui" className="interests-grid__link">
            #{interest.label} ({interest.followerIds?.length ?? 0})
          </a>
        </li>
      ))}
    </ul>
  );
}
