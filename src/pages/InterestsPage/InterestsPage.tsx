import { useState } from 'react';
import { ColumnsLayout, PageHeader, PageLayout } from '@src/components';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { addInterest } from '@src/store/slices/interestsSlice';
import {
  FollowedInterests,
  InterestsList,
  InterestsSearchBar,
} from './components';
import { useFollowedInterests } from './hooks/useFollowedInterests';
import { hasExactInterestMatch } from './helpers';
import './interests-page.css';

export function InterestsPage() {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const interests = useAppSelector(state => state.interests.items);
  const {
    followedInterests,
    dummyFollowedInterests,
    memberFollowers,
    dummyFollowInterest,
    dummyUnfollowInterest,
    dummyMaxFollowed,
    canDummyFollowMore,
  } = useFollowedInterests(interests);

  const trimmedQuery = searchQuery.trim();
  const hasExactMatch = hasExactInterestMatch(interests, trimmedQuery);
  const showAddButton = trimmedQuery.length >= 3 && !hasExactMatch;
  const isAddButtonDisabled = !canDummyFollowMore;

  const handleAddInterest = () => {
    if (isAddButtonDisabled) return;

    const name = trimmedQuery;
    dispatch(addInterest({ name }));
    dummyFollowInterest(name);
    setSearchQuery('');
  };

  return (
    <PageLayout>
      <section className="interests-page">
        <div className="width-container">
          <ColumnsLayout>
            <ColumnsLayout.Main>
              <PageHeader
                title="Popular Interests"
                backLabel="←&thinsp;Home"
                backHref="#/home-ui"
              />
              <InterestsSearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                showAddButton={showAddButton}
                isAddButtonDisabled={isAddButtonDisabled}
                onAdd={handleAddInterest}
              />
              <InterestsList
                searchQuery={searchQuery}
                followedInterests={followedInterests}
                maxFollowed={dummyMaxFollowed}
                canFollowMore={canDummyFollowMore}
                onFollow={dummyFollowInterest}
                onUnfollow={dummyUnfollowInterest}
              />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky={50}>
              <div className="interests-page__divider--hidden" />
              <FollowedInterests
                followedInterests={dummyFollowedInterests}
                maxFollowed={dummyMaxFollowed}
                mapFollowers={memberFollowers}
                onUnfollow={dummyUnfollowInterest}
              />
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
    </PageLayout>
  );
}
