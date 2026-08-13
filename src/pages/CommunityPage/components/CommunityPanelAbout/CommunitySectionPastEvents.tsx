import type { EventBasic } from '@src/common-libs/types';
import { EventsGrid } from '@src/pages/EventsPage/components/EventsGrid/EventsGrid';
import { SectionTitle } from '@src/components/SectionTitle/SectionTitle';
import { getPastEventsSectionTitle } from '@src/helpers/labelHelpers';
import './community-section-past-events.css';

type CommunitySectionPastEventsProps = {
  count: number;
  events: EventBasic[];
};

export function CommunitySectionPastEvents({ count, events }: CommunitySectionPastEventsProps) {
  return (
    <section className="community-section-past-events">
      <SectionTitle
        title={getPastEventsSectionTitle(count)}
        hideMore={count <= 3}
        moreHref="#"
        moreLabel="past events →"
      />
      <EventsGrid events={events} />
    </section>
  );
}
