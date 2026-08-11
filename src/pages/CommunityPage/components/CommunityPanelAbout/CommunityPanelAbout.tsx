import type { EventBasic } from '@src/common-libs/types';
import { CommunitySectionAbout } from './CommunitySectionAbout';
import { CommunitySectionEvents } from './CommunitySectionEvents';
import { CommunityPastEvents } from '../CommunityPastEvents/CommunityPastEvents';
import './community-panel-about.css';

type CommunityPanelAboutProps = {
  descriptionHtml: string;
  futureEvents: EventBasic[];
  pastEvents: EventBasic[];
  pastEventsTotalCount: number;
};

export function CommunityPanelAbout({
  descriptionHtml,
  futureEvents,
  pastEvents,
  pastEventsTotalCount,
}: CommunityPanelAboutProps) {
  return (
    <div className="community-panel-about">
      <CommunitySectionAbout detailsHtml={descriptionHtml} />
      <div className="community-page__divider--hidden" />
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
  );
}
