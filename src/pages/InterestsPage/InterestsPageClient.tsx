import { useState } from 'react';
import { ColumnsLayout, PageTitle, PageLayout } from '@src/components';
import { useSession } from '@src/providers/SessionProvider';
import {
  FollowedInterests,
  InterestsList,
  InterestsSearchBar,
  InterestModeSelect,
  type InterestsPageMode,
} from './components';
import { useInterestsStates } from './useInterestsStates';
import { hasExactInterestMatch } from './helpers';
import './interests-page.css';

export function InterestsPageClient() {
  const { isLoggedIn } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [interestMode, setInterestMode] = useState<InterestsPageMode>('explore');
  const {
    filteredInterests,
    followedInterests,
    memberFollowers,
    maxFollowed,
    canFollowMore,
    handleFollowInterest,
    handleUnfollowInterest,
    handleAddInterest,
  } = useInterestsStates(searchQuery);

  const trimmedQuery = searchQuery.trim();
  const hasExactMatch = hasExactInterestMatch(filteredInterests, trimmedQuery);
  const showAddButton = trimmedQuery.length >= 3 && !hasExactMatch;

  const onAddInterest = async () => {
    const added = await handleAddInterest(trimmedQuery);
    if (added) setSearchQuery('');
  };

  return (
    <PageLayout>
      <section className="interests-page">
        <div className="width-container">
          <ColumnsLayout>
            <ColumnsLayout.Main>
              <PageTitle
                title="Popular Interests"
                backLabel="←&thinsp;Home"
                backHref={isLoggedIn ? '#/home-profile-ui' : '#/home-ui'}
              />
              <InterestsSearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                showAddButton={showAddButton && interestMode === 'follow'}
                isAddButtonDisabled={!canFollowMore}
                onAdd={onAddInterest}
              />
              <InterestsList
                interests={filteredInterests}
                followedInterests={followedInterests}
                canFollowMore={canFollowMore}
                mode={interestMode}
                onFollow={handleFollowInterest}
                onUnfollow={handleUnfollowInterest}
              />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky={50}>
              <div className="interests-page__divider--hidden" />
              <InterestModeSelect value={interestMode} onChange={setInterestMode} />
              <FollowedInterests
                followedInterests={followedInterests}
                maxFollowed={maxFollowed}
                mapFollowers={memberFollowers}
                onUnfollow={handleUnfollowInterest}
              />
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
    </PageLayout>
  );
}
