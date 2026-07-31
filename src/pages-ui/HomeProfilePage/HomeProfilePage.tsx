import { Fragment, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  ColumnsLayout,
  PageLayout,
} from '@src/components';
import {
  getFilteredInterests,
  getHomePageData,
  type CommunityBasic,
  type HomePageData,
  type HomeProfileSectionId,
  type Interest,
} from '@src/data';
import {
  HomeProfileNav,
  type HomeProfileNavItem,
  HomeProfileFreshCommunities,
  HomeProfilePopularInterests,
  HomeProfileNewMembers,
  HomeProfileUpcomingEvents,
} from './components';
import {
  freshCommunities,
  newMembers,
  profileData,
  popularInterestNewFollowers,
  type HomeProfilePopularInterest,
} from './data/homeProfileData';
import { useActiveSection } from './hooks/useActiveSection';
import { useSectionViewed } from './hooks/useSectionViewed';
import './home-profile-page.css';

type HomeProfileVisibleSection = {
  id: HomeProfileSectionId;
  label: string;
  count?: number;
  content: ReactNode;
};

export function HomeProfilePage() {
  const [homePageData, setHomePageData] = useState<HomePageData | null>(null);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [communities] = useState<CommunityBasic[]>(freshCommunities);

  useEffect(() => {
    Promise.all([
      getHomePageData(),
      getFilteredInterests(''),
    ]).then(([homeData, filteredInterests]) => {
      setHomePageData(homeData);
      setInterests(filteredInterests);
    });
  }, []);

  const popularInterests: HomeProfilePopularInterest[] = useMemo(
    () => interests.map(interest => ({
      ...interest,
      newFollowersCount: popularInterestNewFollowers[interest.label],
    })),
    [interests],
  );

  const visibleSections = useMemo((): HomeProfileVisibleSection[] => (
    [
      {
        id: 'upcoming-events' as const,
        label: 'Upcoming events',
        visible: true,
        content: (
          <HomeProfileUpcomingEvents
            events={homePageData?.upcomingEvents ?? []}
          />
        ),
      },
      {
        id: 'fresh-communities' as const,
        label: 'Fresh communities',
        visible: communities.length > 0,
        count: communities.length,
        content: <HomeProfileFreshCommunities communities={communities} />,
      },
      {
        id: 'new-members' as const,
        label: 'New members',
        visible: newMembers.length > 0,
        count: newMembers.length,
        content: <HomeProfileNewMembers members={newMembers} />,
      },
      {
        id: 'popular-interests' as const,
        label: 'Popular interests',
        visible: interests.length > 0,
        count: interests.length,
        content: <HomeProfilePopularInterests interests={popularInterests} />,
      },
    ]
      .filter(section => section.visible)
      .map(({ visible, ...section }) => {
        void visible;
        return section;
      })
  ), [homePageData, communities, popularInterests, interests.length]);

  const sectionIds = useMemo(
    () => visibleSections.map(section => section.id),
    [visibleSections],
  );

  const { isViewed } = useSectionViewed(sectionIds);

  const navItemsWithCounts = useMemo((): HomeProfileNavItem[] => (
    visibleSections.map(section => ({
      id: section.id,
      label: section.label,
      count: section.count !== undefined && !isViewed(section.id)
        ? section.count
        : undefined,
    }))
  ), [visibleSections, isViewed]);

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
                {visibleSections.map(section => (
                  <Fragment key={section.id}>{section.content}</Fragment>
                ))}
              </div>
            </ColumnsLayout.Main>
          </ColumnsLayout>
        </div>
      </section>
    </PageLayout>
  );
}
