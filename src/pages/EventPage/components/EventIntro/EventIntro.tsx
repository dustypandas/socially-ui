import IconLocation from '@src/assets/icon-map-marker-outline.svg?react';
import type { AddressLocation } from '@src/common-libs/types';
import { smoothScrollToSection } from '@src/helpers/smoothScroll';
import './event-intro.css';

type EventIntroProps = {
  title: string;
  startTime: Date;
  addressLocation: AddressLocation;
  isAttending: boolean;
};

export function EventIntro({ title, startTime, addressLocation, isAttending }: EventIntroProps) {

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
        <button
          type="button"
          className="event-intro__calendar-row"
          onClick={() => smoothScrollToSection('event-description')}
        >
          <div className="event-intro__calendar">
            <div className="event-intro__calendar-month">{monthShort}</div>
            <div className="event-intro__calendar-date">{dateShort}</div>
          </div>
          <div className="event-intro__attribute-details">
            <div className="event-intro__attribute-primary">{dateLong}</div>
            <div className="event-intro__attribute-secondary">{timeLong}</div>
          </div>
        </button>
        <button
          type="button"
          className="event-intro__location-row"
          onClick={() => smoothScrollToSection('event-location-details')}
        >
          <div className="event-intro__icon-box">
            <IconLocation className="event-intro__icon" />
          </div>
          <div className="event-intro__attribute-details">
            <div className="event-intro__attribute-primary">
              {isAttending
                ? addressLocation.address.join(', ')
                : addressLocation.label}
            </div>
            <div className="event-intro__attribute-secondary">
              {isAttending
                ? addressLocation.label
                : 'Exact location visible for attendees'}
            </div>
          </div>
        </button>
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
