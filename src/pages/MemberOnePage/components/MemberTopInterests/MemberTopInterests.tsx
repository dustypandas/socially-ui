import { SectionHeader } from '@src/components/SectionHeader/SectionHeader';
import type { InterestActivityHistory } from '@src/data';
import './member-top-interests.css';

type MemberTopInterestsProps = {
  interests: InterestActivityHistory[];
};

export function MemberTopInterests({ interests }: MemberTopInterestsProps) {
  if (interests.length === 0) {
    return null;
  }

  return (
    <section className="member-top-interests">
      <SectionHeader title="Top interests" moreHref="#/interests-ui" />
      <ul className="member-top-interests__grid">
        {interests.map(interest => (
          <li key={interest.interest} className="member-top-interests__item">
            <a href="#/interest-one-ui" className="member-top-interests__link">
              #{interest.interest}
            </a>
            <span className="member-top-interests__count">
              ({getJoinedLabel(interest.joinedCount)})
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function getJoinedLabel(joinedCount: number): string {
  if (joinedCount <= 4) {
    return `${joinedCount} attended`;
  }

  if (joinedCount < 10) {
    return '5+ attended';
  }

  if (joinedCount >= 100) {
    return '100+ attended';
  }

  const bucket = Math.floor(joinedCount / 10) * 10;
  return `${bucket}+ attended`;
}
