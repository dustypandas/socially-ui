import { useState } from 'react';
import IconMessage from '@src/assets/icon-message-outline.svg?react';
import IconMore from '@src/assets/icon-more-outline.svg?react';
import type { CommunityMember } from '@src/common-libs/types';
import { ColumnsLayout } from '@src/components';
import { SectionTitle } from '@src/components/SectionTitle/SectionTitle';
import { getReviewTimeLabel } from '@src/helpers/labelHelpers';
import {
  CommunityMemberFilters,
  type CommunityMemberFilterId,
} from './CommunityMemberFilters';
import './community-panel-members.css';

type CommunityPanelMembersProps = {
  members: CommunityMember[];
};

export function CommunityPanelMembers({
  members,
}: CommunityPanelMembersProps) {
  const [memberFilter, setMemberFilter] = useState<CommunityMemberFilterId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const visibleMembers = getFilteredMembers(members, memberFilter, searchQuery);

  return (
    <ColumnsLayout>
      <ColumnsLayout.Main>
        <section className="community-panel-members">
          <SectionTitle title={getMembersSectionTitle(members, memberFilter)} hideMore />
          {visibleMembers.length === 0 ? (
            <div className="community-panel-members__empty">No members</div>
          ) : (
            <ul className="community-panel-members__list">
              {visibleMembers.map(member => (
                <CommunityMemberItem key={member.id} member={member} />
              ))}
            </ul>
          )}
        </section>
      </ColumnsLayout.Main>
      <ColumnsLayout.Aside sticky={58} asideWidth="min(380px, 38%)">
        <div className="community-page__aside">
          <div className="community-page__aside-spacer" />
          <div className="community-page__divider--hidden" />

          <CommunityMemberFilters
            query={searchQuery}
            onQueryChange={setSearchQuery}
            value={memberFilter}
            onChange={setMemberFilter}
          />
        </div>
      </ColumnsLayout.Aside>
    </ColumnsLayout>
  );
}

function CommunityMemberItem({ member }: { member: CommunityMember }) {
  const roleLabel = member.isOrganizer === true ? 'Organizer' : 'Member';
  const joinedLabel = member.joinedSince.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <li className="community-member-item">
      <a href={member.href} className="community-member-item__avatar-link" target="_blank">
        <img
          className="community-member-item__avatar"
          src={member.image}
          alt=""
        />
        <div className="community-member-item__details">
          <div className="community-member-item__name">{member.label}</div>
          <div className="community-member-item__meta">
            {roleLabel}
            <span className="community-member-item__dot">·</span>
            Joined {joinedLabel}
          </div>
          <div className="community-member-item__meta">
            Last visited {getReviewTimeLabel(member.lastActivity)}
          </div>
        </div>
      </a>
      <div className="community-member-item__actions">
        <button type="button" className="community-member-item__action">
          <IconMessage className="community-member-item__action-icon" />
        </button>
        <button type="button" className="community-member-item__action">
          <IconMore className="community-member-item__action-icon community-member-item__action-icon--more" />
        </button>
      </div>
    </li>
  );
}

function getFilteredMembers(
  members: CommunityMember[],
  filter: CommunityMemberFilterId,
  query: string,
): CommunityMember[] {
  let visibleMembers = members;

  if (filter === 'organizers') {
    visibleMembers = members.filter(member => member.isOrganizer);
  } else if (filter === 'requests') {
    visibleMembers = members.filter(member => member.status === 'pending');
  }

  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery.length === 0) {
    return visibleMembers;
  }

  return visibleMembers.filter(member => member.label.toLowerCase().includes(normalizedQuery));
}

function getMembersSectionTitle(
  members: CommunityMember[],
  filter: CommunityMemberFilterId,
): string {
  switch (filter) {
    case 'organizers': {
      const count = members.filter(member => member.isOrganizer).length;
      return `${count} ${count === 1 ? 'organizer' : 'organizers'}`;
    }
    case 'requests': {
      const count = members.filter(member => member.status === 'pending').length;
      return `${count} ${count === 1 ? 'request' : 'requests'}`;
    }
    default: {
      const count = members.length;
      return `${count} ${count === 1 ? 'member' : 'members'}`;
    }
  }
}
