import { useMemo, useState } from 'react';
import { ColumnsLayout, PageLayout } from '../../components';
import { memberFollowers } from '../../data/dummyData.js';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addInterest } from '../../store/slices/interestsSlice';
import {
  FollowedInterests,
  InterestsList,
  InterestsSearchBar,
} from './components';
import { useDummyFollowedInterests } from './hooks/useDummyFollowedInterests';
import { createInterestId, hasExactInterestMatch, getUniqueMapFollowers } from './helpers';
import './interests-page.css';

export function InterestsPage() {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const interests = useAppSelector(state => state.interests.items);
  const {
    dummyFollowedIds,
    dummyFollowedInterests,
    dummyFollowInterest,
    dummyUnfollowInterest,
    dummyMaxFollowed,
    canDummyFollowMore,
  } = useDummyFollowedInterests(interests);

  const mapFollowers = useMemo(
    () => getUniqueMapFollowers(dummyFollowedInterests, memberFollowers),
    [dummyFollowedInterests],
  );

  const trimmedQuery = searchQuery.trim();
  const hasExactMatch = hasExactInterestMatch(interests, trimmedQuery);
  const showAddButton = trimmedQuery.length >= 3 && !hasExactMatch;
  const isAddButtonDisabled = !canDummyFollowMore;

  const handleAddInterest = () => {
    if (isAddButtonDisabled) return;

    const name = trimmedQuery;
    const id = createInterestId(name, new Set(interests.map(interest => interest.id)));
    dispatch(addInterest({
      id,
      name,
    }));
    dummyFollowInterest(id);
    setSearchQuery('');
  };

  return (
    <PageLayout>
      <section className="interests-page">
        <div className="width-container">
          <ColumnsLayout mainPosition="left" stackAt={780}>
            <ColumnsLayout.Main>
              <h2 className="interests-page__heading section-header__title">Popular Interests:</h2>
              <InterestsSearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                showAddButton={showAddButton}
                isAddButtonDisabled={isAddButtonDisabled}
                onAdd={handleAddInterest}
              />
              <InterestsList
                searchQuery={searchQuery}
                followedIds={dummyFollowedIds}
                maxFollowed={dummyMaxFollowed}
                canFollowMore={canDummyFollowMore}
                onFollow={dummyFollowInterest}
                onUnfollow={dummyUnfollowInterest}
              />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky asideWidth="min(380px, 38%)">
              <FollowedInterests
                followedInterests={dummyFollowedInterests}
                maxFollowed={dummyMaxFollowed}
                mapFollowers={mapFollowers}
                onUnfollow={dummyUnfollowInterest}
              />
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
    </PageLayout>
  );
}
