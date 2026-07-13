import type { InterestEngagement } from '@src/data';
import { SectionHeader } from '@src/components/SectionHeader/SectionHeader';
import './member-interests.css';

type MemberInterestsProps = {
  interests: InterestEngagement[];
};

export function MemberInterests({ interests }: MemberInterestsProps) {
  return (
    <section className="member-interests">
      <SectionHeader title="Top interests" moreHref="#/interests-ui" />
      {interests.length === 0 ? (
        <div className="member-interests__empty">no followed interests</div>
      ) : (
        <ul className="member-interests__grid">
          {interests.map(interest => (
            <li key={interest.label} className="member-interests__item">
              <a href="#/interest-one-ui" className="member-interests__link">
                #{interest.label}
              </a>
              <span className="member-interests__count">
                {getAttendedLabel(interest.attendedCount)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function getAttendedLabel(attendedCount: number): string {
  if (attendedCount <= 4) {
    return `${attendedCount} attended`;
  }

  if (attendedCount < 10) {
    return '5+ attended';
  }

  if (attendedCount >= 50) {
    return '50+ attended';
  }

  if (attendedCount >= 100) {
    return '100+ attended';
  }

  const bucket = Math.floor(attendedCount / 10) * 10;
  return `${bucket}+ attended`;
}
