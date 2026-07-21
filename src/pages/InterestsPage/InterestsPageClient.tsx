import { useState } from 'react';
import { ColumnsLayout, PageTitle, PageLayout } from '@src/components';
import {
  FollowedInterests,
  InterestsList,
  InterestsSearchBar,
} from './components';
import { useInterestsStates } from './useInterestsStates';
import { hasExactInterestMatch } from './helpers';
import './interests-page.css';

export function InterestsPageClient() {
  const [searchQuery, setSearchQuery] = useState('');
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
                backHref="#/home-ui"
              />
              <InterestsSearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                showAddButton={showAddButton}
                isAddButtonDisabled={!canFollowMore}
                onAdd={onAddInterest}
              />
              <InterestsList
                interests={filteredInterests}
                followedInterests={followedInterests}
                canFollowMore={canFollowMore}
                onFollow={handleFollowInterest}
                onUnfollow={handleUnfollowInterest}
              />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky={50}>
              <div className="interests-page__divider--hidden" />
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
