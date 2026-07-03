import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ColumnsLayout, PageHeader, PageLayout } from '../../components';
import { memberFollowers, spanishInterestEvents } from '../../data/dummyData.js';
import { useAppSelector } from '../../store/hooks';
import { DiscussionSection, EventCardHorizontal, ExternalLinks } from './components';
import { FollowersMap } from '../InterestsPage/components/FollowedInterests/FollowersMap/FollowersMap';
import { getUniqueMapFollowers } from '../InterestsPage/helpers';
import './interest-one-page.css';

const INTEREST_ID = 'spanish';

export function InterestOnePage() {
  const location = useLocation();
  const interest = useAppSelector(state =>
    state.interests.items.find(item => item.id === INTEREST_ID),
  );

  const mapFollowers = useMemo(
    () => (interest ? getUniqueMapFollowers([interest], memberFollowers) : []),
    [interest],
  );

  const isEmptyVariant = location.pathname === '/interest-one-ui-empty';
  const events = isEmptyVariant
    ? []
    : spanishInterestEvents.filter(event => event.interestIds?.includes(INTEREST_ID));

  return (
    <PageLayout>
      <section className="interest-one-page">
        <div className="width-container">
          <ColumnsLayout>
            <ColumnsLayout.Main>
              <PageHeader
                title={interest?.name ?? 'Spanish'}
                backHref="#/interests-ui"
              />
              <div
                className={[
                  'interest-one-page__events',
                  events.length > 0 && 'interest-one-page__events--has-items',
                ].filter(Boolean).join(' ')}
              >
                {events.length > 0 ? (
                  <>
                    <div className="interest-one-page__events-list">
                      {events.map(event => (
                        <div key={event.id} className="interest-one-page__event-item">
                          <div className="interest-one-page__event-item-line" />
                          <div className="interest-one-page__event-item-timeline">
                            <div className="interest-one-page__event-item-datetime">
                              <span className="interest-one-page__event-item-date">
                                {event.dateLabel}
                              </span>
                              <span className="interest-one-page__event-item-time">
                                {event.timeLabel}
                              </span>
                            </div>
                            <div className="interest-one-page__event-item-dot-wrapper">
                              <div className="interest-one-page__event-item-dot" />
                            </div>
                          </div>
                          <EventCardHorizontal event={event} />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="interest-one-page__events-empty">No upcoming events</p>
                )}
                <div className="interest-one-page__suggest">
                  <button
                    type="button"
                    className="global-btn global-btn--white-purple interest-one-page__suggest-btn"
                  >
                    {events.length > 0 ? 'Suggest Another Activity?' : 'Suggest An Activity?'}
                  </button>
                </div>
              </div>
              <DiscussionSection
                interestId={INTEREST_ID}
                isEmpty={isEmptyVariant}
              />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky>
              <div className="interest-one-page__aside">
                {interest && (
                  <>
                    <FollowersMap
                      followers={mapFollowers}
                      followersCount={interest.followersCount}
                    />
                    <ExternalLinks
                      interestId={INTEREST_ID}
                      links={interest.relatedLinks ?? []}
                    />
                  </>
                )}
              </div>
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
    </PageLayout>
  );
}
