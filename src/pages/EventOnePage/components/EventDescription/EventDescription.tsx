import './event-description.css';

type EventDescriptionProps = {
  details: string;
};

export function EventDescription({ details }: EventDescriptionProps) {
  return (
    <section className="event-description">
      <h3 className="global-heading-text event-description__title">Event Details</h3>
      <div
        className="event-description__content"
        dangerouslySetInnerHTML={{ __html: details }}
      />
    </section>
  );
}
