import { SectionHeader } from '@src/components/SectionHeader/SectionHeader';
import type { CommunityActivityHistory } from '@src/data';
import './member-active-communities.css';

type MemberActiveCommunitiesProps = {
  communities: CommunityActivityHistory[];
};

export function MemberActiveCommunities({ communities }: MemberActiveCommunitiesProps) {
  return (
    <section className="member-active-communities">
      <SectionHeader title="Active Communities" hideMore />
      {communities.length > 0 && (
        <ul className="member-active-communities__list">
          {communities.map(community => (
            <li key={community.communityId} className="member-active-communities__item">
              <a
                href="#/community-one-ui"
                className="member-active-communities__name"
              >
                {community.name}
              </a>
              <span className="member-active-communities__meta">
                {community.joinedCount} joined
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
