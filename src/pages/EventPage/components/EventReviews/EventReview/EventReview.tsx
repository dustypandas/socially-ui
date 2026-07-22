import IconStar from '@src/assets/icon-star.svg?react';
import type { EventReview as EventReviewData } from '@src/data';
import { getReviewTimeLabel } from '@src/helpers/labelHelpers';
import './event-review.css';

type EventReviewProps = {
  review: EventReviewData;
};

export function EventReview({ review }: EventReviewProps) {
  const { member, rating, content, date } = review;

  return (
    <article className="event-review">
      <img className="event-review__avatar" src={member.image} alt="" />
      <div className="event-review__details">
        <div className="event-review__name-row">
          <div className="event-review__name">
            {member.label}
          </div>
          {/* <span className="event-review__event-name">&nbsp;-&nbsp;{event.title}</span> */}
          <div className="event-review__time-label">
            {getReviewTimeLabel(date)}
          </div>
        </div>
        <div className="event-review__stars">
          {Array.from({ length: rating }, (_, index) => (
            <IconStar key={index} className="event-review__star" />
          ))}
        </div>
        <div className="event-review__content">{content}</div>
      </div>
    </article>
  );
}
