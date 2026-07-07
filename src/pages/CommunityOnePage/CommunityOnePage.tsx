import { ColumnsLayout, PageLayout } from '@src/components';
import { sampleCommunityPage } from '@src/data/dummyData.js';
import {
  CommunityAbout,
  CommunityEventsSection,
  CommunityHero,
  CommunityIntroPanel,
  CommunityMembers,
  CommunityNav,
  CommunityOrganizers,
  CommunityPastEvents,
} from './components';
import './community-one-page.css';

export function CommunityOnePage() {
  const community = sampleCommunityPage;

  return (
    <PageLayout hasStaticHeader>
      <section className="community-one-page">
        <div className="width-container community-one-page__hero">
          <ColumnsLayout>
            <ColumnsLayout.Main>
              <CommunityHero image={community.image} name={community.name} />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside asideWidth="min(380px, 38%)">
              <CommunityIntroPanel
                name={community.name}
                memberCount={community.memberCount}
                rating={community.rating}
                ratingCount={community.ratingCount}
                organizers={community.organizers}
              />
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>

        <CommunityNav />

        <div className="width-container community-one-page__content">
          <ColumnsLayout>
            <ColumnsLayout.Main>
              <CommunityAbout detailsHtml={community.detailsHtml} />
              <CommunityEventsSection events={community.upcomingEvents} />
              <CommunityPastEvents
                count={community.pastEventsCount}
                events={community.pastEvents}
              />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky={50} asideWidth="min(380px, 38%)">
              <div className="community-one-page__aside">
                <CommunityOrganizers organizers={community.organizers} />
                <CommunityMembers
                  memberCount={community.memberCount}
                  memberProfiles={community.memberProfiles}
                />
              </div>
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
    </PageLayout>
  );
}
