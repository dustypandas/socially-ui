import './event-community.css';

type EventCommunityProps = {
  name: string;
  img: string;
  details: string;
};

export function EventCommunity({ name, img, details }: EventCommunityProps) {
  return (
    <section className="event-community">
      <a href="#/community-one-ui" className="event-community__header" target="_blank">
        <img className="event-community__img" src={img} alt="" />
        <div className="event-community__title-group">
          <div className="event-community__label">Organised by</div>
          <div className="event-community__name">{name}{name}</div>
        </div>
      </a>
      <div
        className="event-community__about"
        dangerouslySetInnerHTML={{ __html: details }}
      />
    </section>
  );
}
