import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ColumnsLayout, PageLayout, SectionHeader } from '../../components';
import { memberFollowers, spanishInterestEvents } from '../../data/dummyData.js';
import { useAppSelector } from '../../store/hooks';
import { EventCardHorizontal } from './components/EventCardHorizontal/EventCardHorizontal.js';
import { FollowersMap } from '../InterestsPage/components/FollowedInterests/FollowersMap/FollowersMap';
import { getUniqueMapFollowers } from '../InterestsPage/helpers';
import './one-interest-page.css';

const INTEREST_ID = 'spanish';

export function OneInterestPage() {
  const location = useLocation();
  const interest = useAppSelector(state =>
    state.interests.items.find(item => item.id === INTEREST_ID),
  );

  const mapFollowers = useMemo(
    () => (interest ? getUniqueMapFollowers([interest], memberFollowers) : []),
    [interest],
  );

  const isEmptyVariant = location.pathname === '/one-interest-ui-empty';
  const events = isEmptyVariant
    ? []
    : spanishInterestEvents.filter(event => event.interestIds?.includes(INTEREST_ID));

  return (
    <PageLayout>
      <section className="one-interest-page">
        <div className="width-container">
          <div className="one-interest-page__header">
            <a href="#/interests-ui" className="one-interest-page__back">
              ← Interests
            </a>
            <h1 className="one-interest-page__title section-header__title">
              {interest?.name ?? 'Spanish'}
            </h1>
          </div>
          <ColumnsLayout mainPosition="left" stackAt={780}>
            <ColumnsLayout.Main>
              <div
                className={[
                  'one-interest-page__events',
                  events.length > 0 && 'one-interest-page__events--has-items',
                ].filter(Boolean).join(' ')}
              >
                {events.length > 0 ? (
                  <>
                    <SectionHeader title={`${events.length} Upcoming Events`} hideMore />
                    <div className="one-interest-page__events-list">
                      {events.map(event => (
                        <div key={event.id} className="one-interest-page__event-item">
                          <div className="one-interest-page__event-item-line" />
                          <div className="one-interest-page__event-item-timeline">
                            <div className="one-interest-page__event-item-datetime">
                              <span className="one-interest-page__event-item-date">
                                {event.dateLabel}
                              </span>
                              <span className="one-interest-page__event-item-time">
                                {event.timeLabel}
                              </span>
                            </div>
                            <div className="one-interest-page__event-item-dot-wrapper">
                              <div className="one-interest-page__event-item-dot" />
                            </div>
                          </div>
                          <EventCardHorizontal event={event} />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="one-interest-page__events-empty">No upcoming events</p>
                )}
                <div className="one-interest-page__suggest">
                  <button
                    type="button"
                    className="global-btn global-btn--white-purple one-interest-page__suggest-btn"
                  >
                    {events.length > 0 ? 'Suggest Another Activity?' : 'Suggest An Activity?'}
                  </button>
                </div>
              </div>
              <div className="one-interest-page__events-divider" />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky asideWidth="min(380px, 38%)">
              <div className="one-interest-page__aside">
                {interest && (
                  <p className="one-interest-page__followers">
                    {interest.followersCount}+ followers
                  </p>
                )}
                <FollowersMap followers={mapFollowers} />
              </div>
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
    </PageLayout>
  );
}
