import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ColumnsLayout, PageHeader, PageLayout } from '@src/components';
import { memberFollowers, spanishInterestEvents, spanishRelatedCommunities } from '@src/data/dummyData.js';
import { useAppSelector } from '@src/store/hooks';
import { CommunitiesSection, EventCardHorizontal, ExternalLinks, FollowersSection } from './components';
import { getUniqueMapFollowers } from '@src/pages/InterestsPage/helpers';
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
  const communities = isEmptyVariant ? [] : spanishRelatedCommunities;

  return (
    <PageLayout>
      <section className="interest-one-page">
        <div className="width-container">
          <ColumnsLayout>
            <ColumnsLayout.Main>
              <PageHeader
                title={interest?.name ?? 'Spanish'}
                backLabel="←&thinsp;Interests"
                backHref="#/interests-ui"
              />
              <div className="interest-one-page__events">
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
                          <EventCardHorizontal event={{ ...event, dateTimeLabel: `${event.dateLabel}, ${event.timeLabel}` }} />
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
                    className="interest-one-page__suggest-btn"
                  >
                    {events.length > 0 ? 'Suggest Another Activity?' : 'Suggest An Activity?'}
                  </button>
                </div>
              </div>
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky={50}>
              <div className="interest-one-page__divider--hidden" />
              <div className="interest-one-page__aside">
                {interest && (
                  <FollowersSection
                    followers={mapFollowers}
                    followersCount={interest.followersCount ?? 0}
                  />
                )}
              </div>
            </ColumnsLayout.Aside>
          </ColumnsLayout>
          <ColumnsLayout className="interest-one-page__second-section">
            <ColumnsLayout.Main>
              <div className="interest-one-page__divider" />
              <CommunitiesSection communities={communities} />
              {/* <div className="interest-one-page__divider" />
              <DiscussionSection interestId='Spanish' /> */}
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky={12}>
              <div className="interest-one-page__divider--hidden" />
              <div className="interest-one-page__aside">
                {interest && (
                  <ExternalLinks
                    interestId={INTEREST_ID}
                    links={interest.relatedLinks ?? []}
                  />
                )}
              </div>
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
    </PageLayout>
  );
}
