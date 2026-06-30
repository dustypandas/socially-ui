import { getAttendeesLabel } from '../../../../utils/getAttendeesLabel';
import './event-attend-card.css';

type AttendeeProfile = {
  name: string;
  img: string;
};

type EventAttendCardProps = {
  profiles: AttendeeProfile[];
  attendeeCount: number;
  priceLabel?: string;
  className?: string;
};

export function EventAttendCard({
  profiles,
  attendeeCount,
  priceLabel = 'Free',
  className = '',
}: EventAttendCardProps) {
  return (
    <div className={['event-attend-card', className].filter(Boolean).join(' ')}>
      <div className="event-attend-card__header">
        <span className="event-attend-card__header-label">Attend</span>
      </div>
      <div className="event-attend-card__body">
        <div className="event-attend-card__left">
          <div className="event-attend-card__attendees">
            <div className="event-attend-card__avatars">
              {profiles.map((profile, index) => (
                <img
                  key={profile.name}
                  className="event-attend-card__avatar"
                  src={profile.img}
                  alt=""
                  style={{ zIndex: 20 - index }}
                />
              ))}
            </div>
            <span className="event-attend-card__attendees-label">
              {getAttendeesLabel(attendeeCount, profiles.length)}
            </span>
          </div>
          <span className="event-attend-card__price">{priceLabel}</span>
        </div>
        <button type="button" className="global-btn global-btn--purple-white event-attend-card__btn">
          Join event
        </button>
      </div>
    </div>
  );
}
