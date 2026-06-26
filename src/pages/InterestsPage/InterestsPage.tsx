import { useMemo, useState } from 'react';
import { ColumnsLayout, Layout } from '../../components';
import {
  followedInterestIds,
  interestFollowers,
  MAX_FOLLOWED_INTERESTS,
} from '../../data/dummyData.js';
import { useAppSelector } from '../../store/hooks';
import {
  InterestFollowers,
  InterestsList,
  InterestsSearchBar,
} from './components';
import './interests-page.css';

export function InterestsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const interests = useAppSelector(state => state.interests.items);

  const followedInterests = useMemo(
    () => interests.filter(interest => followedInterestIds.includes(interest.id)),
    [interests],
  );

  return (
    <Layout>
      <section className="interests-page">
        <div className="width-container">
          <ColumnsLayout mainPosition="left" stackAt={780}>
            <ColumnsLayout.Main>
              <h2 className="interests-page__heading section-header__title">Popular Interests:</h2>
              <InterestsSearchBar
                value={searchQuery}
                onChange={setSearchQuery}
              />
              <InterestsList searchQuery={searchQuery} />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky asideWidth="min(380px, 38%)">
              <InterestFollowers
                followedInterests={followedInterests}
                maxFollowed={MAX_FOLLOWED_INTERESTS}
                mapFollowers={interestFollowers}
              />
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
    </Layout>
  );
}
