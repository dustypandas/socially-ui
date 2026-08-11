import { useState } from 'react';
import type { CommunityMember, CommunityMemberRequest } from '@src/common-libs/types';
import { ColumnsLayout, MemberItemBasic, MemberItemRequest } from '@src/components';
import { SectionTitle } from '@src/components/SectionTitle/SectionTitle';
import {
  CommunityMemberFilters,
  type CommunityMemberFilterId,
} from './CommunityMemberFilters';
import './community-panel-members.css';

type CommunityPanelMembersProps = {
  members: CommunityMember[];
  memberRequests: CommunityMemberRequest[];
};

export function CommunityPanelMembers({
  members,
  memberRequests,
}: CommunityPanelMembersProps) {
  const [memberFilter, setMemberFilter] = useState<CommunityMemberFilterId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const isRequests = memberFilter === 'requests';
  const visibleMembers = getFilteredMembers(members, memberFilter, searchQuery);
  const visibleRequests = getFilteredRequests(memberRequests, searchQuery);
  const visibleItems = isRequests ? visibleRequests : visibleMembers;

  return (
    <ColumnsLayout>
      <ColumnsLayout.Main>
        <section className="community-panel-members">
          <SectionTitle title={getMembersSectionTitle(members, memberRequests, memberFilter)} hideMore />
          {visibleItems.length === 0 ? (
            <div className="community-panel-members__empty">
              {isRequests ? 'No requests' : 'No members'}
            </div>
          ) : (
            <ul className="community-panel-members__list">
              {isRequests
                ? visibleRequests.map(request => (
                  <MemberItemRequest key={request.id} member={request} />
                ))
                : visibleMembers.map(member => (
                  <MemberItemBasic key={member.id} member={member} />
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

function getFilteredMembers(
  members: CommunityMember[],
  filter: CommunityMemberFilterId,
  query: string,
): CommunityMember[] {
  const visibleMembers = filter === 'organizers'
    ? members.filter(member => member.isOrganizer)
    : members;

  return filterByLabel(visibleMembers, query);
}

function getFilteredRequests(
  requests: CommunityMemberRequest[],
  query: string,
): CommunityMemberRequest[] {
  return filterByLabel(requests, query);
}

function filterByLabel<T extends { label: string }>(items: T[], query: string): T[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery.length === 0) {
    return items;
  }

  return items.filter(item => item.label.toLowerCase().includes(normalizedQuery));
}

function getMembersSectionTitle(
  members: CommunityMember[],
  memberRequests: CommunityMemberRequest[],
  filter: CommunityMemberFilterId,
): string {
  switch (filter) {
    case 'organizers': {
      const count = members.filter(member => member.isOrganizer).length;
      return `${count} ${count === 1 ? 'organizer' : 'organizers'}`;
    }
    case 'requests': {
      const count = memberRequests.length;
      return `${count} ${count === 1 ? 'membership request' : 'membership requests'}`;
    }
    default: {
      const count = members.length;
      return `${count} ${count === 1 ? 'member' : 'members'}`;
    }
  }
}
