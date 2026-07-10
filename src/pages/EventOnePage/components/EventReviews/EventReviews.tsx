import { SectionHeader } from '@src/components/SectionHeader/SectionHeader';
import './event-reviews.css';

export function EventReviews() {
  return (
    <section className="event-reviews">
      <SectionHeader title="Reviews" hideMore />
      {/* <h3 className="event-reviews__title">Reviews</h3> */}
      <p className="event-reviews__empty">No reviews yet</p>
    </section>
  );
}
