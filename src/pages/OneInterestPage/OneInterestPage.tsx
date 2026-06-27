import { useMemo } from 'react';
import { ColumnsLayout, PageLayout, SectionHeader } from '../../components';
import { memberFollowers } from '../../data/dummyData.js';
import { useAppSelector } from '../../store/hooks';
import { FollowersMap } from '../InterestsPage/components/FollowedInterests/FollowersMap/FollowersMap';
import { getUniqueMapFollowers } from '../InterestsPage/helpers';
import './one-interest-page.css';

const INTEREST_ID = 'spanish';

export function OneInterestPage() {
  const interest = useAppSelector(state =>
    state.interests.items.find(item => item.id === INTEREST_ID),
  );

  const mapFollowers = useMemo(
    () => (interest ? getUniqueMapFollowers([interest], memberFollowers) : []),
    [interest],
  );

  const events: never[] = [];

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
              <div className="one-interest-page__events">
                {events.length > 0 ? (
                  <>
                    <SectionHeader title="Upcoming Events" hideMore />
                    {/* event cards */}
                  </>
                ) : (
                  <>
                    <p className="one-interest-page__events-empty">No upcoming events</p>
                    <button
                      type="button"
                      className="global-btn global-btn--white-purple one-interest-page__suggest-btn"
                    >
                      Suggest An Activity?
                    </button>
                  </>
                )}
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
