import './event-tags.css';

type EventTagsProps = {
  interests?: string[];
};

export function EventTags({ interests }: EventTagsProps) {
  if (!interests?.length) return null;

  return (
    <section className="event-tags">
      <ul className="event-tags__list">
        {interests.map(interestLabel => (
          <li key={interestLabel} className="event-tags__item">
            <a
              href="#/one-interest-ui"
              className="event-tags__link"
              target="_blank"
            >
              #{interestLabel}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
