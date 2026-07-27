import { EventCardHorizontal, SectionTitle } from '@src/components';
import { newEvents } from '../data/homeProfileData';
import './home-profile-new-events.css';

export function HomeProfileNewEvents() {
  return (
    <section className="home-profile-new-events">
      <SectionTitle title="New Events" moreHref="#/events-ui" />
      <div className="home-profile-new-events__list">
        {newEvents.map(event => (
          <EventCardHorizontal key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
