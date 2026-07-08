import { SectionHeader } from '@src/pages/HomePage/components/SectionHeader/SectionHeader';
import './event-details.css';

type EventDetailsProps = {
  details: string;
};

export function EventDetails({ details }: EventDetailsProps) {
  return (
    <section className="event-details">
      <SectionHeader title="Event Details" hideMore />

      <div
        className="event-details__content"
        dangerouslySetInnerHTML={{ __html: details }}
      />
    </section>
  );
}
