import IconLocation from '@src/assets/icon-map-marker-outline.svg?react';
import type { EventPageLocation } from '@src/data';
import './event-intro.css';

type DateLabels = {
  monthShort: string;
  dateShort: string;
  dateLong: string;
  timeLong: string;
};

type EventIntroProps = {
  title: string;
  date: DateLabels;
  location: EventPageLocation;
};

export function EventIntro({ title, date, location }: EventIntroProps) {
  return (
    <header className="event-intro">
      <h1 className="event-intro__title">{title}</h1>
      <div className="event-intro__attributes">
        <div className="event-intro__attribute-row">
          <div className="event-intro__calendar">
            <div className="event-intro__calendar-month">{date.monthShort}</div>
            <div className="event-intro__calendar-date">{date.dateShort}</div>
          </div>
          <div className="event-intro__attribute-details">
            <div className="event-intro__attribute-primary">{date.dateLong}</div>
            <div className="event-intro__attribute-secondary">{date.timeLong}</div>
          </div>
        </div>
        <div className="event-intro__attribute-row">
          <div className="event-intro__icon-box">
            <IconLocation className="event-intro__icon" />
          </div>
          <div className="event-intro__attribute-details">
            <div className="event-intro__attribute-primary">
              Exact location visible for attendees
            </div>
            <div className="event-intro__attribute-secondary">
              {location.name}, Madrid
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
