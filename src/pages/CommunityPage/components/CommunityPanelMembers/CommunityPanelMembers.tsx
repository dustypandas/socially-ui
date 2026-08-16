import { useEffect, useState } from 'react';
import type { CommunityMember, CommunityMemberRequest } from '@src/common-libs/types';
import { ColumnsLayout, MemberItemBasic, MemberItemRequest } from '@src/components';
import { SectionTitle } from '@src/components/SectionTitle/SectionTitle';
import {
  CommunityMemberFilters,
  type CommunityMemberFilterId,
} from './CommunityMemberFilters';
import './community-panel-members.css';

const PAGE_SIZE = 20;

type CommunityPanelMembersProps = {
  members: CommunityMember[];
  memberRequests?: CommunityMemberRequest[];
  isOrganiser?: boolean;
  requestBadgeCount?: number;
  onRequestsViewed?: () => void;
  onScrollToTop?: () => void;
};

export function CommunityPanelMembers({
  members,
  memberRequests = [],
  isOrganiser = false,
  requestBadgeCount = 0,
  onRequestsViewed,
  onScrollToTop,
}: CommunityPanelMembersProps) {
  const [memberFilter, setMemberFilter] = useState<CommunityMemberFilterId>(
    requestBadgeCount > 0 ? 'requests' : 'all',
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    if (requestBadgeCount > 0) {
      onRequestsViewed?.();
    }
  }, [onRequestsViewed, requestBadgeCount]);

  const handleFilterChange = (filter: CommunityMemberFilterId) => {
    setMemberFilter(filter);
    setVisibleCount(PAGE_SIZE);
    onScrollToTop?.();
    if (filter === 'requests') {
      onRequestsViewed?.();
    }
  };
  const handleQueryChange = (value: string) => {
    setSearchQuery(value);
    setVisibleCount(PAGE_SIZE);
    onScrollToTop?.();
  };
  const activeFilter = memberFilter === 'requests' && !isOrganiser ? 'all' : memberFilter;
  const isRequests = activeFilter === 'requests';
  const visibleMembers = getFilteredMembers(members, activeFilter, searchQuery);
  const visibleRequests = getFilteredRequests(memberRequests, searchQuery);
  const visibleItems = isRequests ? visibleRequests : visibleMembers;
  const hasMoreItems = visibleItems.length > visibleCount;

  return (
    <ColumnsLayout mainPosition="right">
      <ColumnsLayout.Aside sticky={58} asideWidth="min(380px, 38%)">
        <div className="community-page__aside">
          <div className="community-page__aside-spacer" />

          <CommunityMemberFilters
            query={searchQuery}
            onQueryChange={handleQueryChange}
            value={activeFilter}
            onChange={handleFilterChange}
            isOrganiser={isOrganiser}
            requestBadgeCount={requestBadgeCount}
          />

          {/* <div className="community-page__divider--hidden" /> */}
        </div>
      </ColumnsLayout.Aside>
      <ColumnsLayout.Main>
        <section className="community-panel-members">
          <SectionTitle title={getMembersSectionTitle(members, memberRequests, activeFilter)} hideMore />
          {visibleItems.length === 0 ? (
            <div className="community-panel-members__empty">
              {isRequests ? 'No requests' : 'No members'}
            </div>
          ) : (
            <>
              <ul className="community-panel-members__list">
                {isRequests
                  ? visibleRequests.slice(0, visibleCount).map(request => (
                    <MemberItemRequest key={request.id} member={request} />
                  ))
                  : visibleMembers.slice(0, visibleCount).map(member => (
                    <MemberItemBasic key={member.id} member={member} />
                  ))}
              </ul>
              {hasMoreItems && (
                <button
                  type="button"
                  className="community-page__show-more-btn"
                  onClick={() => setVisibleCount(current => current + PAGE_SIZE)}
                >
                  Show more
                </button>
              )}
            </>
          )}
        </section>
      </ColumnsLayout.Main>
    </ColumnsLayout>
  );
}

function getFilteredMembers(
  members: CommunityMember[],
  filter: CommunityMemberFilterId,
  query: string,
): CommunityMember[] {
  const visibleMembers = filter === 'organisers'
    ? members.filter(member => member.isOrganiser)
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
    case 'organisers': {
      const count = members.filter(member => member.isOrganiser).length;
      return `${count} ${count === 1 ? 'organiser' : 'organisers'}`;
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
