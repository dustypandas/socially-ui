import { ColumnsLayout, EventTimeline, PageTitle, PageLayout } from '@src/components';
import { InterestCommunities, InterestExternalLinks, InterestFollowers } from './components';
import { InterestPageClientProps, useInterestPageStates } from './useInterestPageStates';
import './interest-page.css';

export function InterestPageClient({ variant }: InterestPageClientProps) {
  const {
    interestPageData,
    events,
    communities,
    externalLinks,
    handleAddExternalLink,
  } = useInterestPageStates({ variant });

  if (!interestPageData) {
    return null;
  }

  return (
    <PageLayout>
      <section className="interest-page">
        <div className="width-container">
          <ColumnsLayout>
            <ColumnsLayout.Main>
              <PageTitle
                title={`#${interestPageData.interestLabel}`}
                backLabel="←&thinsp;Interests"
                backHref="#/interests-ui"
              />
              <div className="interest-page__events">
                {events.length > 0 ? (
                  <>
                    <EventTimeline events={events} className="interest-page__events-list" />
                  </>
                ) : (
                  <div className="interest-page__events-empty">No upcoming events</div>
                )}
                <div className="interest-page__suggest">
                  <button
                    type="button"
                    className="interest-page__suggest-btn"
                  >
                    {events.length > 0 ? 'Suggest Another Activity?' : 'Suggest An Activity?'}
                  </button>
                </div>
              </div>
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky={50}>
              <div className="interest-page__divider--hidden" />
              <div className="interest-page__aside">
                <InterestFollowers
                  followers={interestPageData.memberFollowers}
                  followersCount={interestPageData.memberFollowersCount}
                />
              </div>
            </ColumnsLayout.Aside>
          </ColumnsLayout>
          <ColumnsLayout className="interest-page__second-section">
            <ColumnsLayout.Main>
              <div className="interest-page__divider" />
              <InterestCommunities communities={communities} />
              {/* <div className="interest-page__divider" />
              <InterestDiscussion interestName='spanish' /> */}
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky={12}>
              <div className="interest-page__divider--hidden" />
              <div className="interest-page__aside">
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
