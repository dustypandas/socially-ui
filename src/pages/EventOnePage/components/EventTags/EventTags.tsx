import './event-tags.css';

type EventTagsProps = {
  interests: string[];
};

export function EventTags({ interests }: EventTagsProps) {
  if (interests.length === 0) return null;

  return (
    <section className="event-tags">
      <ul className="event-tags__list">
        {interests.map(interestLabel => (
          <li key={interestLabel} className="event-tags__item">
            #{interestLabel}
          </li>
        ))}
      </ul>
    </section>
  );
}
