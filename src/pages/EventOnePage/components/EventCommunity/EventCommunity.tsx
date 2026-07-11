import { CommunityAvatar } from '@src/data';
import './event-community.css';

type EventCommunityProps = {
  community: CommunityAvatar;
};

export function EventCommunity({ community }: EventCommunityProps) {
  return (
    <section className="event-community">
      <a href={community.href} className="event-community__header" target="_blank">
        <img className="event-community__img" src={community.image} alt="" />
        <div className="event-community__title-group">
          <div className="event-community__label">Organised by</div>
          <div className="event-community__name">{community.name}</div>
        </div>
      </a>
      <div
        className="event-community__about"
        dangerouslySetInnerHTML={{ __html: community.description }}
      />
    </section>
  );
}
