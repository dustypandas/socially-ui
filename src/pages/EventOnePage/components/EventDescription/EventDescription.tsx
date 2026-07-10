import { SectionHeader } from '@src/components/SectionHeader/SectionHeader';
import './event-description.css';

type EventDescriptionProps = {
  htmlContent: string;
};

export function EventDescription({ htmlContent }: EventDescriptionProps) {
  return (
    <section className="event-description">
      <SectionHeader title="Event Description" hideMore />

      <div
        className="event-description__content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </section>
  );
}
