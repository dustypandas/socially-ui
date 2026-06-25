import { useState } from 'react';
import { ColumnsLayout, Layout } from '../../components';
import { interestFollowers } from '../../data/dummyData.js';
import {
  FollowersMap,
  InterestsList,
  InterestsSearchBar,
} from './components';
import './interests-page.css';

export function InterestsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout>
      <section className="interests-page">
        <div className="width-container">
          <ColumnsLayout mainPosition="left" stackAt={780}>
            <ColumnsLayout.Main>
              <h2 className="interests-page__heading">My interests:</h2>
              <InterestsSearchBar
                value={searchQuery}
                onChange={setSearchQuery}
              />
              <InterestsList searchQuery={searchQuery} />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky asideWidth="min(380px, 38%)">
              <h3 className="interests-page__followers-heading">
                {interestFollowers.length}+ followers
              </h3>
              <FollowersMap followers={interestFollowers} />
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
    </Layout>
  );
}
