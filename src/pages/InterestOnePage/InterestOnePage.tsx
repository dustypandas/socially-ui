import { ColumnsLayout, PageHeader, PageLayout } from '@src/components';
import { EventDateHelper } from '@src/utils/eventDateHelper';
import { EventCardHorizontal, InterestCommunities, InterestExternalLinks, InterestFollowers } from './components';
import { useInterestOne } from './useInterestOne';
import './interest-one-page.css';

export function InterestOnePage() {
  const {
    interestPageData,
    events,
    communities,
    externalLinks,
    handleAddExternalLink,
  } = useInterestOne();

  if (!interestPageData) {
    return null;
  }

  return (
    <PageLayout>
      <section className="interest-one-page">
        <div className="width-container">
          <ColumnsLayout>
            <ColumnsLayout.Main>
              <PageHeader
                title={`#${interestPageData.interestLabel}`}
                backLabel="←&thinsp;Interests"
                backHref="#/interests-ui"
              />
              <div className="interest-one-page__events">
                {events.length > 0 ? (
                  <>
                    <div className="interest-one-page__events-list">
                      {events.map(event => {
                        const dateHelper = new EventDateHelper(event.startTime, 'community');
                        return (
                        <div key={event.id} className="interest-one-page__event-item">
                          <div className="interest-one-page__event-item-line" />
                          <div className="interest-one-page__event-item-timeline">
                            <div className="interest-one-page__event-item-datetime">
                              <span className="interest-one-page__event-item-date">
                                {dateHelper.dateLabel}
                              </span>
                              <span className="interest-one-page__event-item-time">
                                {dateHelper.timeLabel}
                              </span>
                            </div>
                            <div className="interest-one-page__event-item-dot-wrapper">
                              <div className="interest-one-page__event-item-dot" />
                            </div>
                          </div>
                          <EventCardHorizontal event={{ ...event }} />
                        </div>
                        );
                      })}
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
                <InterestFollowers
                  followers={interestPageData.memberFollowers}
                  followersCount={interestPageData.memberFollowersCount}
                />
              </div>
            </ColumnsLayout.Aside>
          </ColumnsLayout>
          <ColumnsLayout className="interest-one-page__second-section">
            <ColumnsLayout.Main>
              <div className="interest-one-page__divider" />
              <InterestCommunities communities={communities} />
              {/* <div className="interest-one-page__divider" />
              <InterestDiscussion interestName='spanish' /> */}
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky={12}>
              <div className="interest-one-page__divider--hidden" />
              <div className="interest-one-page__aside">
                <InterestExternalLinks
                  links={externalLinks}
                  onAdd={handleAddExternalLink}
                />
              </div>
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
    </PageLayout>
  );
}
