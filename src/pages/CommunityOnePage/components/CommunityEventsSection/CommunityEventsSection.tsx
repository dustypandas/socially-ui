import type { HomeEvent } from '@src/data';
import { SectionHeader, SectionMoreLink } from '@src/pages/HomePage/components/SectionHeader/SectionHeader';
import { EventCardHorizontal } from '@src/pages/InterestOnePage/components/EventCardHorizontal/EventCardHorizontal';
import './community-events-section.css';

type CommunityEventsSectionProps = {
  events: HomeEvent[];
};

export function CommunityEventsSection({ events }: CommunityEventsSectionProps) {
  return (
    <section className="community-events-section">
      <SectionHeader
        title={`Upcoming Events (${events.length})`}
        hideMore={events.length <= 3}
        moreHref="#"
        moreLabel="more events →"
      />
      <div className="community-events-section__list">
        {events.map(event => (
          <div key={event.id} className="community-events-section__item">
            <div className="community-events-section__item-line" />
            <div className="community-events-section__item-timeline">
              <div className="community-events-section__item-datetime">
                <span className="community-events-section__item-date">
                  {event.dateLabel}
                </span>
                <span className="community-events-section__item-time">
                  {event.timeLabel}
                </span>
              </div>
              <div className="community-events-section__item-dot-wrapper">
                <div className="community-events-section__item-dot" />
              </div>
            </div>
            <EventCardHorizontal event={{ ...event, dateTimeLabel: `${event.dateLabel}, ${event.timeLabel}` }} />
          </div>
        ))}
      </div>
      <div className="community-events-section__footer">
        <SectionMoreLink href="#" label="See all events" variant="footer" />
      </div>
    </section>
  );
}
