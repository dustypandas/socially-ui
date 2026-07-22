import type { EventBasic } from '@src/data';
import { EventCardHorizontal, SectionTitle, SectionMoreLink } from '@src/components';
import { getDateAndTimeLabels, getUpcomingEventsSectionTitle } from '@src/helpers/labelHelpers';
import './community-events-section.css';

type CommunityEventsSectionProps = {
  events: EventBasic[];
};

export function CommunityEventsSection({ events }: CommunityEventsSectionProps) {
  const isEmpty = events.length === 0;

  return (
    <section className="community-events-section">
      <SectionTitle
        title={getUpcomingEventsSectionTitle(events.length)}
        hideMore={events.length <= 3}
        moreHref="#"
        moreLabel="more events →"
      />
      {isEmpty ? (
        <div className="community-events-section__empty">No upcoming events</div>
      ) : (
        <div className="community-events-section__list">
          {events.map(event => {
            const dateAndTimeLabels = getDateAndTimeLabels(event.startTime);

            return (
              <div key={event.id} className="community-events-section__item">
                <div className="community-events-section__item-line" />
                <div className="community-events-section__item-timeline">
                  <div className="community-events-section__item-datetime">
                    <span className="community-events-section__item-date">
                      {dateAndTimeLabels.dateLabel}
                    </span>
                    <span className="community-events-section__item-time">
                      {dateAndTimeLabels.timeLabel}
                    </span>
                  </div>
                  <div className="community-events-section__item-dot-wrapper">
                    <div className="community-events-section__item-dot" />
                  </div>
                </div>
                <EventCardHorizontal event={{ ...event }} />
              </div>
            );
          })}
        </div>
      )}
      {!isEmpty && (
        <div className="community-events-section__footer">
          <SectionMoreLink href="#" label="See all events" variant="footer" />
        </div>
      )}
    </section>
  );
}
