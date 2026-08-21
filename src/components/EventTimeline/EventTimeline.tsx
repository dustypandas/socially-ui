import type { EventBasic } from '@src/common-libs/types';
import { getEventTimelineLabel } from '@src/helpers/labelHelpers';
import { EventCardHorizontal } from '../EventCard/EventCardHorizontal';
import './event-timeline.css';

type EventTimelineProps = {
  events: EventBasic[];
  className?: string;
};

export function EventTimeline({ events, className }: EventTimelineProps) {
  return (
    <div className={['event-timeline', className].filter(Boolean).join(' ')}>
      {events.map(event => {
        const { primaryLabel, yearLabel } = getEventTimelineLabel(event.startTime);

        return (
          <div key={event.id} className="event-timeline__item">
            <div className="event-timeline__item-line" />
            <div className="event-timeline__item-header">
              <div className="event-timeline__item-datetime">
                <span className="event-timeline__item-label-primary">
                  {primaryLabel}
                </span>
                <span className="event-timeline__item-year">
                  , {yearLabel}
                </span>
              </div>
              <div className="event-timeline__item-dot-wrapper">
                <div className="event-timeline__item-dot" />
              </div>
            </div>
            <EventCardHorizontal event={event} />
          </div>
        );
      })}
    </div>
  );
}
