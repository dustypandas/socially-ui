import { useEffect, useState } from 'react';
import {
  ColumnsLayout,
  PageLayout,
} from '@src/components';
import { getHomePageData, type HomePageData } from '@src/data';
import {
  HomeProfileMember,
  HomeProfileUpcomingEvents,
  HomeProfileWhatsNew,
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

                <HomeProfileWhatsNew
                  popularInterests={homePageData?.popularInterests ?? []}
                />
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
