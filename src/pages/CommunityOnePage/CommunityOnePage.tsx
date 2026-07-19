import { useEffect, useState } from 'react';
import { ColumnsLayout, PageLayout } from '@src/components';
import { getCommunityOnePageData, type CommunityOnePageData } from '@src/data';
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
  const [communityOnePageData, setCommunityOnePageData] = useState<CommunityOnePageData | null>(null);

  useEffect(() => {
    getCommunityOnePageData().then(setCommunityOnePageData);
  }, []);

  if (!communityOnePageData) {
    return null;
  }

  return (
    <PageLayout hasStaticHeader>
      <section className="community-one-page">
        <div className="width-container community-one-page__hero">
          <ColumnsLayout>
            <ColumnsLayout.Main>
              <CommunityHero image={communityOnePageData.image} name={communityOnePageData.name} />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside asideWidth="min(380px, 38%)">
              <CommunityIntroPanel
                name={communityOnePageData.name}
                memberCount={communityOnePageData.membersCount}
                rating={communityOnePageData.rating}
                ratingCount={communityOnePageData.ratingCount}
              />
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>

        <CommunityNav />

        <div className="width-container community-one-page__content">
          <ColumnsLayout>
            <ColumnsLayout.Main>
              <CommunityAbout detailsHtml={communityOnePageData.descriptionHtml} />
              <div className="community-one-page__divider--hidden" />
              <CommunityEventsSection events={communityOnePageData.futureEvents} />
              <div className="community-one-page__divider--hidden" />
              <CommunityPastEvents
                count={communityOnePageData.pastEventsCount}
                events={communityOnePageData.pastEvents}
              />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky={58} asideWidth="min(380px, 38%)">
              <div className="community-one-page__aside">
                <div className="community-one-page__divider--hidden" />
                <CommunityOrganizers organizers={communityOnePageData.organizers} />
                <CommunityMembers
                  membersCount={communityOnePageData.membersCount}
                  memberAvatars={communityOnePageData.memberAvatars}
                />
              </div>
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
    </PageLayout>
  );
}
