import { useState } from 'react';
import { ColumnsLayout, PageLayout } from '../../components';
import { interestFollowers } from '../../data/dummyData.js';
import { useAppSelector } from '../../store/hooks';
import {
  FollowedInterests,
  InterestsList,
  InterestsSearchBar,
} from './components';
import { useDummyFollowedInterests } from './hooks/useDummyFollowedInterests';
import './interests-page.css';

export function InterestsPage() {
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
                mapFollowers={interestFollowers}
                onUnfollow={dummyUnfollowInterest}
              />
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
    </PageLayout>
  );
}
