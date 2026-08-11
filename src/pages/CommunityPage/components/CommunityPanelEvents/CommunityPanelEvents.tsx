import type { MapLocation, MemberAvatar } from '@src/common-libs/types';
import { ColumnsLayout } from '@src/components';
import { CommunityLocations } from '../CommunityLocations/CommunityLocations';
import { CommunityOrganizers } from '../CommunityPanelAbout/CommunityOrganizers';
import './community-panel-events.css';

type CommunityPanelEventsProps = {
  organizers: MemberAvatar[];
  recentLocations: Array<MapLocation & { id: string }>;
};

export function CommunityPanelEvents({
  organizers,
  recentLocations,
}: CommunityPanelEventsProps) {
  return (
    <ColumnsLayout>
      <ColumnsLayout.Main>
        <section className="community-panel-events" />
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
