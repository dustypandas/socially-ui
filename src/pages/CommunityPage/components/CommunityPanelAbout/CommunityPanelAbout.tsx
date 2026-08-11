import type { EventBasic, MapLocation, MemberAvatar } from '@src/common-libs/types';
import { ColumnsLayout } from '@src/components';
import { CommunityLocations } from '../CommunityLocations/CommunityLocations';
import { CommunityOrganizers } from './CommunityOrganizers';
import { CommunityPastEvents } from '../CommunityPastEvents/CommunityPastEvents';
import { CommunitySectionAbout } from './CommunitySectionAbout';
import { CommunitySectionEvents } from './CommunitySectionEvents';
import './community-panel-about.css';

type CommunityPanelAboutProps = {
  descriptionHtml: string;
  futureEvents: EventBasic[];
  pastEvents: EventBasic[];
  pastEventsTotalCount: number;
  organizers: MemberAvatar[];
  recentLocations: Array<MapLocation & { id: string }>;
};

export function CommunityPanelAbout({
  descriptionHtml,
  futureEvents,
  pastEvents,
  pastEventsTotalCount,
  organizers,
  recentLocations,
}: CommunityPanelAboutProps) {
  return (
    <ColumnsLayout>
      <ColumnsLayout.Main>
        <div className="community-panel-about">
          <CommunitySectionAbout detailsHtml={descriptionHtml} />
          <CommunitySectionEvents events={futureEvents} />
          {pastEventsTotalCount > 0 && (
            <>
              <div className="community-page__divider--hidden" />
              <CommunityPastEvents
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
          <CommunityOrganizers organizers={organizers} />
          <CommunityLocations locations={recentLocations} />
        </div>
      </ColumnsLayout.Aside>
    </ColumnsLayout>
  );
}
