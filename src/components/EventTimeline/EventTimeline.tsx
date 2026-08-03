import type { EventBasic } from '@src/common-libs/types';
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
        const { dateLabel, timeLabel } = getEventTimelineLabels(event.startTime);

        return (
          <div key={event.id} className="event-timeline__item">
            <div className="event-timeline__item-line" />
            <div className="event-timeline__item-header">
              <div className="event-timeline__item-datetime">
                <span className="event-timeline__item-date">
                  {dateLabel}
                </span>&nbsp;<span className="event-timeline__item-time">
                  {timeLabel}
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

function getEventTimelineLabels(startTime: Date) {
  const dateLabel = startTime.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const weekdayLabel = startTime.toLocaleDateString('en-US', {
    weekday: 'long',
  });

  const timePart = startTime
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .toLowerCase()
    .replace(/\s/g, '');

  return {
    dateLabel,
    timeLabel: `${weekdayLabel}, ${timePart}`,
  };
}
