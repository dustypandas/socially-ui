import { useEffect, useMemo, useState } from 'react';
import {
  ColumnsLayout,
  PageLayout,
} from '@src/components';
import {
  getFilteredInterests,
  getHomePageData,
  type CommunityBasic,
  type HomePageData,
  type Interest,
} from '@src/data';
import {
  HomeProfileNav,
  type HomeProfileNavItem,
  HomeProfileFreshCommunities,
  HomeProfileTrendingInterests,
  HomeProfileNewMembers,
  HomeProfileUpcomingEvents,
} from './components';
import { newCommunities, newMembers, profileData } from './data/homeProfileData';
import { useActiveSection } from './hooks/useActiveSection';
import { useSectionViewed } from './hooks/useSectionViewed';
import './home-profile-page.css';

export function HomeProfilePage() {
  const [homePageData, setHomePageData] = useState<HomePageData | null>(null);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [communities] = useState<CommunityBasic[]>(newCommunities);

  useEffect(() => {
    Promise.all([
      getHomePageData(),
      getFilteredInterests(''),
    ]).then(([homeData, filteredInterests]) => {
      setHomePageData(homeData);
      setInterests(filteredInterests);
    });
  }, []);

  const sectionIds = useMemo(() => {
    const ids = ['upcoming-events'];

    if (communities.length > 0) {
      ids.push('fresh-communities');
    }

    if (newMembers.length > 0) {
      ids.push('new-members');
    }

    if (interests.length > 0) {
      ids.push('trending-interests');
    }

    return ids;
  }, [communities.length, interests.length]);

  const { isViewed } = useSectionViewed(sectionIds);

  const navItemsWithCounts = useMemo(() => {
    const items: HomeProfileNavItem[] = [
      { id: 'upcoming-events', label: 'Upcoming events' },
    ];

    if (communities.length > 0) {
      items.push({
        id: 'fresh-communities',
        label: 'Fresh communities',
        count: isViewed('fresh-communities') ? undefined : communities.length,
      });
    }

    if (newMembers.length > 0) {
      items.push({
        id: 'new-members',
        label: 'New members',
        count: isViewed('new-members') ? undefined : newMembers.length,
      });
    }

    if (interests.length > 0) {
      items.push({
        id: 'trending-interests',
        label: 'Trending interests',
        count: isViewed('trending-interests') ? undefined : interests.length,
      });
    }

    return items;
  }, [communities.length, interests.length, isViewed]);

  const { activeSectionId, navigateToSection } = useActiveSection(sectionIds);

  return (
    <PageLayout headerVariant="loggedIn">
      <section className="home-profile-page">
        <div className="width-container">
          <ColumnsLayout>
            <ColumnsLayout.Aside sticky  asideWidth="max(250px, 25%)">
              <HomeProfileNav
                firstName={profileData.firstName}
                items={navItemsWithCounts}
                activeSectionId={activeSectionId}
                onNavigate={navigateToSection}
              />
            </ColumnsLayout.Aside>
            <ColumnsLayout.Main>
              <div className="home-profile-page__main">
                <HomeProfileUpcomingEvents
                  events={homePageData?.upcomingEvents ?? []}
                />

                {communities.length > 0 && (
                  <HomeProfileFreshCommunities communities={communities} />
                )}

                {newMembers.length > 0 && (
                  <HomeProfileNewMembers memberCount={newMembers.length} />
                )}

                {interests.length > 0 && (
                  <HomeProfileTrendingInterests interests={interests} />
                )}
              </div>
            </ColumnsLayout.Main>
          </ColumnsLayout>
        </div>
      </section>
    </PageLayout>
  );
}
