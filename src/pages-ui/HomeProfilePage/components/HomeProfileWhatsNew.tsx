import {
  CommunityCard,
  EventCardHorizontal,
} from '@src/components';
import type { Interest } from '@src/data';
import {
  newCommunities,
  newEvents,
  newMembers,
} from '../data/homeProfileData';
import './home-profile-whats-new.css';

type HomeProfileWhatsNewProps = {
  popularInterests: Interest[];
};

export function HomeProfileWhatsNew({ popularInterests }: HomeProfileWhatsNewProps) {
  const newPopularInterests = popularInterests.slice(0, 4);

  return (
    <section className="home-profile-whats-new">
      <h2 className="home-profile-whats-new__title">What's new</h2>

      <div className="home-profile-whats-new__subsection">
        <h3 className="home-profile-whats-new__heading">New members</h3>
        <ul className="home-profile-whats-new__member-list">
          {newMembers.map(member => (
            <li key={member.id}>
              <a href={member.href} className="home-profile-whats-new__member">
                <img
                  className="home-profile-whats-new__member-avatar"
                  src={member.image}
                  alt=""
                />
                <span className="home-profile-whats-new__member-label">{member.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="home-profile-whats-new__subsection">
        <h3 className="home-profile-whats-new__heading">New communities</h3>
        <div className="home-profile-whats-new__community-list">
          {newCommunities.map(community => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      </div>

      <div className="home-profile-whats-new__subsection">
        <h3 className="home-profile-whats-new__heading">New popular interests</h3>
        <ul className="home-profile-whats-new__interest-list">
          {newPopularInterests.map(interest => (
            <li key={interest.label}>
              <a
                href="#/one-interest-ui"
                className="home-profile-whats-new__interest"
              >
                {interest.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="home-profile-whats-new__subsection">
        <h3 className="home-profile-whats-new__heading">New events</h3>
        <div className="home-profile-whats-new__event-list">
          {newEvents.map(event => (
            <EventCardHorizontal key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
