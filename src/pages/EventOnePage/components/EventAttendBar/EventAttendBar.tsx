import './event-attend-bar.css';

type AttendeeProfile = {
  name: string;
  img: string;
};

type EventAttendBarProps = {
  profiles: AttendeeProfile[];
  attendeeCount: number;
  priceLabel?: string;
};

export function EventAttendBar({
  profiles,
  attendeeCount,
  priceLabel = 'Free',
}: EventAttendBarProps) {
  return (
    <div className="event-attend-bar">
      <div className="event-attend-bar__inner width-container">
        <div className="event-attend-bar__left">
          <div className="event-attend-bar__attendees">
            <div className="event-attend-bar__avatars">
              {profiles.map((profile, index) => (
                <img
                  key={profile.name}
                  className="event-attend-bar__avatar"
                  src={profile.img}
                  alt=""
                  style={{ zIndex: 20 - index }}
                />
              ))}
            </div>
            <span className="event-attend-bar__attendees-label">
              +{attendeeCount} others are going
            </span>
          </div>
          <span className="event-attend-bar__price">{priceLabel}</span>
        </div>
        <button type="button" className="global-btn global-btn--purple-white event-attend-bar__btn">
          Join this event
        </button>
      </div>
    </div>
  );
}
