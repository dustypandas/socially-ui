import { useEffect, useState } from 'react';
import IconStar from '@src/assets/icon-star.svg?react';
import IconStarOutline from '@src/assets/icon-star-outline.svg?react';
import { Overlay } from '@src/components';
import './event-overlay-add-review.css';

const STAR_VALUES = [1, 2, 3, 4, 5] as const;

type SubmitStatus = 'idle' | 'loading';

type EventOverlayAddReviewProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (review: { rating: number; content: string }) => void | Promise<void>;
};

export function EventOverlayAddReview({
  isOpen,
  onClose,
  onSubmit,
}: EventOverlayAddReviewProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [poppingStar, setPoppingStar] = useState<number | null>(null);
  const [content, setContent] = useState('');
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const isSubmitting = submitStatus === 'loading';
  const isSendDisabled = rating === 0 || isSubmitting;
  const displayRating = hoverRating || rating;

  useEffect(() => {
    if (poppingStar === null) {
      return;
    }

    const timer = window.setTimeout(() => {
      setPoppingStar(null);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [poppingStar]);

  useEffect(() => {
    if (isOpen) {
      return;
    }

    const timer = window.setTimeout(() => {
      setRating(0);
      setHoverRating(0);
      setPoppingStar(null);
      setContent('');
      setSubmitStatus('idle');
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const handleStarClick = (starValue: number) => {
    setRating(starValue);
    setPoppingStar(starValue);
  };

  const handleSubmit = async () => {
    if (isSendDisabled) {
      return;
    }

    setSubmitStatus('loading');

    try {
      await onSubmit?.({ rating, content: content.trim() });
      onClose();
    } catch {
      setSubmitStatus('idle');
    }
  };

  return (
    <Overlay
      isOpen={isOpen}
      onClose={onClose}
      title="Add review:"
      closeDisabled={isSubmitting}
    >
      <form
        className="event-overlay-add-review__form"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit();
        }}
      >
        <div
          className="event-overlay-add-review__stars"
          onMouseLeave={() => setHoverRating(0)}
        >
          {STAR_VALUES.map(starValue => (
            <button
              key={starValue}
              type="button"
              className={[
                'event-overlay-add-review__star-btn',
                poppingStar !== null && starValue <= poppingStar && 'event-overlay-add-review__star-btn--pop',
              ].filter(Boolean).join(' ')}
              onClick={() => handleStarClick(starValue)}
              onMouseEnter={() => setHoverRating(starValue)}
              disabled={isSubmitting}
            >
              {starValue <= displayRating ? (
                <IconStar className="event-overlay-add-review__star event-overlay-add-review__star--filled" />
              ) : (
                <IconStarOutline className="event-overlay-add-review__star" />
              )}
            </button>
          ))}
        </div>
        <div className="event-overlay-add-review__field">
          <textarea
            id="event-add-review-content"
            className="event-overlay-add-review__textarea"
            placeholder="add a comment..."
            value={content}
            onChange={event => setContent(event.target.value)}
            disabled={isSubmitting}
            rows={2}
          />
        </div>
        <div className="event-overlay-add-review__actions">
          <button
            type="button"
            className="event-overlay-add-review__btn event-overlay-add-review__btn--cancel"
            onClick={onClose}
            disabled={isSubmitting}
          >
            cancel
          </button>
          <button
            type="submit"
            className={[
              'event-overlay-add-review__btn',
              'event-overlay-add-review__btn--send',
              isSubmitting && 'event-overlay-add-review__btn--loading',
            ].filter(Boolean).join(' ')}
            disabled={isSendDisabled}
          >
            send
          </button>
        </div>
      </form>
    </Overlay>
  );
}
