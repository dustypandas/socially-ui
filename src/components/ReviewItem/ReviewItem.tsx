import IconStar from '@src/assets/icon-star.svg?react';
import type { EventReview } from '@src/common-libs/types';
import { getReviewTimeLabel } from '@src/helpers/labelHelpers';
import './review-item.css';

type ReviewItemProps = {
  review: EventReview;
  showEventName?: boolean;
};

export function ReviewItem({ review, showEventName = false }: ReviewItemProps) {
  const { member, event, rating, content, date } = review;

  return (
    <article className="review-item">
      <img className="review-item__avatar" src={member.image} alt="" />
      <div className="review-item__details">
        <div className="review-item__name-row">
          <div className="review-item__name">
            {member.label}
            {showEventName && (
              <span className="review-item__event-name">&nbsp;-&nbsp;{event.title}</span>
            )}
          </div>
          <div className="review-item__time-label">
            {getReviewTimeLabel(date)}
          </div>
        </div>
        <div className="review-item__stars">
          {Array.from({ length: rating }, (_, index) => (
            <IconStar key={index} className="review-item__star" />
          ))}
        </div>
        <div className="review-item__content">{content}</div>
      </div>
    </article>
  );
}
