import type { EventBasic } from '@src/common-libs/types';
import { EventsGrid } from '@src/pages/EventsPage/components/EventsGrid/EventsGrid';
import { SectionTitle } from '@src/components/SectionTitle/SectionTitle';
import { getPastEventsSectionTitle } from '@src/helpers/labelHelpers';
import './community-section-past-events.css';

const MAX_DISPLAYED_PAST_EVENTS = 3;

type CommunitySectionPastEventsProps = {
  count: number;
  events: EventBasic[];
  shouldUseExactValue?: boolean;
  onPastEventsClick?: () => void;
};

export function CommunitySectionPastEvents({
  count,
  events,
  shouldUseExactValue,
  onPastEventsClick,
}: CommunitySectionPastEventsProps) {
  const displayedEvents = events.slice(0, MAX_DISPLAYED_PAST_EVENTS);

  return (
    <section className="community-section-past-events">
      <SectionTitle
        title={getPastEventsSectionTitle(count, shouldUseExactValue)}
        hideMore={count <= MAX_DISPLAYED_PAST_EVENTS}
        moreHref="#"
        moreLabel="past events →"
        onMoreClick={(event) => {
          event.preventDefault();
          onPastEventsClick?.();
        }}
      />
      <EventsGrid events={displayedEvents} />
    </section>
  );
}
