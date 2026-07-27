import { useEffect, useState } from 'react';
import {
  ColumnsLayout,
  PageLayout,
} from '@src/components';
import { getHomePageData, type HomePageData } from '@src/data';
import {
  HomeProfileMember,
  HomeProfileNewCommunities,
  HomeProfileNewEvents,
  HomeProfileNewInterests,
  HomeProfileNewMembers,
  HomeProfileUpcomingEvents,
} from './components';
import './home-profile-page.css';

export function HomeProfilePage() {
  const [homePageData, setHomePageData] = useState<HomePageData | null>(null);

  useEffect(() => {
    getHomePageData().then(setHomePageData);
  }, []);

  return (
    <PageLayout headerVariant="loggedIn">
      <section className="home-profile-page">
        <div className="width-container">
          <ColumnsLayout>
            <ColumnsLayout.Main>
              <div className="home-profile-page__main">
                <HomeProfileUpcomingEvents
                  events={homePageData?.upcomingEvents ?? []}
                />

                <HomeProfileNewMembers />
                <HomeProfileNewCommunities />
                <HomeProfileNewInterests
                  popularInterests={homePageData?.popularInterests ?? []}
                />
                <HomeProfileNewEvents />
              </div>
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky>
              <HomeProfileMember />
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
    </PageLayout>
  );
}
