import type { EventBasic, MapLocation, MemberAvatar } from '@src/common-libs/types';
import { ColumnsLayout, CommunityLocations } from '@src/components';
import { CommunityOrganisers } from './CommunityOrganisers';
import { CommunitySectionAbout } from './CommunitySectionAbout';
import { CommunitySectionEvents } from './CommunitySectionEvents';
import { CommunitySectionPastEvents } from './CommunitySectionPastEvents';
import './community-panel-about.css';

type CommunityPanelAboutProps = {
  descriptionHtml: string;
  futureEvents: EventBasic[];
  pastEvents: EventBasic[];
  pastEventsTotalCount: number;
  organisers: MemberAvatar[];
  recentLocations: Array<MapLocation & { id: string }>;
};

export function CommunityPanelAbout({
  descriptionHtml,
  futureEvents,
  pastEvents,
  pastEventsTotalCount,
  organisers,
  recentLocations,
}: CommunityPanelAboutProps) {
  return (
    <ColumnsLayout>
      <ColumnsLayout.Main>
        <div className="community-panel-about">
          <CommunitySectionAbout detailsHtml={descriptionHtml} />
          <CommunitySectionEvents events={futureEvents.slice(0, 3)} />
          {pastEventsTotalCount > 0 && (
            <>
              <div className="community-page__divider--hidden" />
              <CommunitySectionPastEvents
                count={pastEventsTotalCount}
                events={pastEvents}
              />
            </>
          )}
        </div>
      </ColumnsLayout.Main>
      <ColumnsLayout.Aside sticky={58} asideWidth="min(380px, 38%)">
        <div className="community-page__aside">
          <div className="community-page__divider--hidden" />
          <CommunityOrganisers organisers={organisers} />
          <CommunityLocations locations={recentLocations} />
        </div>
      </ColumnsLayout.Aside>
    </ColumnsLayout>
  );
}
