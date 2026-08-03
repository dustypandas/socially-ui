import { Fragment, useEffect, useState, type ReactNode } from 'react';
import {
  ColumnsLayout,
  PageLayout,
} from '@src/components';
import type { HomeSectionId, HomeProfilePageData } from '@src/common-libs/types';
import {
  HomeProfileNav,
  type HomeProfileNavItem,
  HomeProfileFreshCommunities,
  HomeProfilePopularInterests,
  HomeProfileNewMembers,
  HomeProfileUpcomingEvents,
} from './components';
import { useHomeResolveSections } from './hooks/useHomeResolveSections';
import { getHomeProfilePageData } from '@src/data';
import { useSession } from '@src/providers/SessionProvider';
import './home-profile-page.css';

type HomeProfileVisibleSection = {
  id: HomeSectionId;
  label: string;
  count?: number;
  content: ReactNode;
};

export function HomeProfilePage() {
  const { sessionUser } = useSession();
  const [homeProfilePageData, setHomeProfilePageData] = useState<HomeProfilePageData | null>(null);

  useEffect(() => {
    getHomeProfilePageData().then(setHomeProfilePageData);
  }, []);

  const communities = homeProfilePageData?.freshCommunities ?? [];
  const popularInterests = homeProfilePageData?.popularInterests ?? [];
  const newMembers = homeProfilePageData?.newMembers ?? [];

  const visibleSections: HomeProfileVisibleSection[] = [
    {
      id: 'upcoming-events' as const,
      label: 'Upcoming events',
      visible: true,
      content: (
        <HomeProfileUpcomingEvents
          events={homeProfilePageData?.upcomingEvents ?? []}
          eventScopeIds={homeProfilePageData?.eventScopeIds ?? {
            myInterests: {},
            attending: {},
            discover: {},
          }}
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
      visible: popularInterests.length > 0,
      count: popularInterests.length,
      content: <HomeProfilePopularInterests interests={popularInterests} />,
    },
  ]
    .filter(section => section.visible)
    .map(({ visible, ...section }) => {
      void visible;
      return section;
    });

  const sectionIds = visibleSections.map(section => section.id);

  const { activeSectionId, navigateToSection, isResolved } = useHomeResolveSections(sectionIds);

  const navItemsWithCounts: HomeProfileNavItem[] = visibleSections.map(section => ({
    id: section.id,
    label: section.label,
    count: section.count !== undefined && !isResolved(section.id)
      ? section.count
      : undefined,
  }));

  return (
    <PageLayout>
      <section className="home-profile-page">
        <div className="width-container">
          <ColumnsLayout>
            <ColumnsLayout.Aside sticky  asideWidth="max(250px, 25%)">
              <HomeProfileNav
                firstName={sessionUser?.firstName ?? ''}
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
