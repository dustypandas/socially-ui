import { SectionHeader } from '@src/pages/HomePage/components/SectionHeader/SectionHeader';
import './event-description.css';

type EventDescriptionProps = {
  details: string;
};

export function EventDescription({ details }: EventDescriptionProps) {
  return (
    <section className="event-description">
      <SectionHeader title="Event Details" hideMore />
      <div
        className="event-description__content"
        dangerouslySetInnerHTML={{ __html: details }}
      />
    </section>
  );
}
