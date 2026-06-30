import './event-description.css';

type EventDescriptionProps = {
  details: string;
};

export function EventDescription({ details }: EventDescriptionProps) {
  return (
    <section className="event-description">
      <h2 className="event-description__title section-header__title">Event Details</h2>
      <div
        className="event-description__content"
        dangerouslySetInnerHTML={{ __html: details }}
      />
    </section>
  );
}
