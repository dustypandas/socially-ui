import IconLocation from '@src/assets/icon-map-marker-outline.svg?react';
import type { MapLocation } from '@src/data';
import './event-intro.css';

type EventIntroProps = {
  title: string;
  startTime: Date;
  location: MapLocation;
};

export function EventIntro({ title, startTime, location }: EventIntroProps) {

  const {
    monthShort,
    dateShort,
    dateLong,
    timeLong,
  } = getDateLabels(startTime);

  return (
    <header className="event-intro">
      <h1 className="event-intro__title">{title}</h1>
      <div className="event-intro__attributes">
        <div className="event-intro__attribute-row">
          <div className="event-intro__calendar">
            <div className="event-intro__calendar-month">{monthShort}</div>
            <div className="event-intro__calendar-date">{dateShort}</div>
          </div>
          <div className="event-intro__attribute-details">
            <div className="event-intro__attribute-primary">{dateLong}</div>
            <div className="event-intro__attribute-secondary">{timeLong}</div>
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
              {location.label}, Madrid
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

type DateLabels = {
  monthShort: string;
  dateShort: string;
  dateLong: string;
  timeLong: string;
};

function getDateLabels(startTime: Date): DateLabels {
  const monthShort = startTime.toLocaleDateString('en-US', { month: 'short' });
  const dateShort = startTime.toLocaleDateString('en-US', { day: '2-digit' });
  const dateLong = startTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const timeLong = startTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).toLowerCase().replace(/\s/g, '');

  return { monthShort, dateShort, dateLong, timeLong };
}