import { useEffect, useRef, useState } from 'react';
import { ColumnsLayout, PageLayout } from '@src/components';
import { attendEvent } from '@src/data';
import { getElementDocumentOffsetTop, useScrolledPastDistance } from '@src/hooks/useScrolledPastDistance';
import { CommunityJoinOverlay } from '@src/pages/CommunityPage/components';
import {
  EventAttendCard,
  EventCommunity,
  EventDescription,
  EventLocationDetails,
  EventHosts,
  EventImage,
  EventIntro,
  EventReviews,
  EventTags,
} from './components';
import { EventPageClientProps, useEventPageStates } from './useEventPageStates';
import './event-page.css';

export function EventPageClient({ variant }: EventPageClientProps) {
  const {
    eventPageData,
    markJoinPending,
    markAttending,
  } = useEventPageStates({ variant });
  const [isJoinOverlayOpen, setIsJoinOverlayOpen] = useState(false);
  const [isJoinLoading, setIsJoinLoading] = useState(false);

  const attendCardRef = useRef<HTMLDivElement>(null);
  const asideTitleRef = useRef<HTMLHeadingElement>(null);
  const asideStickyRef = useRef<HTMLDivElement>(null);
  const isPastAttendCard = useScrolledPastDistance(
    {
      ref: attendCardRef,
      getDistance: (card) => getElementDocumentOffsetTop(card) + card.offsetHeight,
    },
    { mediaQuery: '(min-width: 780px)' },
  );

  useEffect(() => {
    const $title = asideTitleRef.current;
    const $sticky = asideStickyRef.current;
    if (!$title || !$sticky || !eventPageData) {
      return;
    }

    const updateTitleHeight = () => {
      $sticky.style.setProperty(
        '--event-page-aside-title-height',
        `${$title.offsetHeight}px`,
      );
    };

    updateTitleHeight();
    window.addEventListener('resize', updateTitleHeight);

    return () => {
      window.removeEventListener('resize', updateTitleHeight);
      $sticky.style.removeProperty('--event-page-aside-title-height');
    };
  }, [eventPageData]);

  if (!eventPageData) {
    return null;
  }

  const memberEngagementStatus = eventPageData.memberEngagementStatus;

  const handleJoinClick = async () => {
    if (
      memberEngagementStatus === 'pending'
      || memberEngagementStatus === 'attending'
      || memberEngagementStatus === 'banned'
      || memberEngagementStatus === 'waitlisted'
      || isJoinLoading
    ) {
      return;
    }

    if (memberEngagementStatus === 'member') {
      setIsJoinLoading(true);
      try {
        await attendEvent(eventPageData.id);
        markAttending();
      } finally {
        setIsJoinLoading(false);
      }
      return;
    }

    setIsJoinOverlayOpen(true);
  };

  const handleJoinOverlayClose = () => setIsJoinOverlayOpen(false);

  return (
    <PageLayout hasStaticHeader>
      <section className="event-page">
        <div className="width-container">
          <ColumnsLayout mainPosition="right">
            <ColumnsLayout.Main>
              <div className="event-page__hero">
                <div className="event-page__stacked-image">
                  <EventImage src={eventPageData.image} alt={eventPageData.title} />
                </div>
                <EventIntro
                  title={eventPageData.title}
                  startTime={eventPageData.startTime}
                  location={eventPageData.location}
                />
              </div>
              <EventAttendCard
                ref={attendCardRef}
                className="event-page__attend-card"
                profiles={eventPageData.attendees.avatars}
                attendeeCount={eventPageData.attendees.count}
                memberEngagementStatus={memberEngagementStatus}
                onJoinClick={handleJoinClick}
                isJoinLoading={isJoinLoading}
              />
              <div className="interest-page__divider--hidden" />
              <EventDescription htmlContent={eventPageData.descriptionHtml} />
              <EventTags interests={eventPageData.interests} />
              <div className="event-page__divider" />
              <EventReviews reviews={eventPageData.reviews ?? []} />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside>
              <div className="event-page__aside">
                <div className="event-page__aside-image">
                  <EventImage src={eventPageData.image} alt={eventPageData.title} />
                </div>
                <div ref={asideStickyRef} className="event-page__aside-sticky">
                  <h3
                    ref={asideTitleRef}
                    className={[
                      'event-page__aside-title',
                      isPastAttendCard && 'event-page__aside-title--visible',
                    ].filter(Boolean).join(' ')}
                  >
                    {eventPageData.title}
                  </h3>
                  <div className="interest-page__divider--hidden" />
                  <EventCommunity community={eventPageData.community} />
                  <div className="event-page__divider--reverse-hidden" />
                  <EventHosts hosts={eventPageData.hosts} />
                  <div className="event-page__divider" />
                  <EventLocationDetails
                    location={eventPageData.location}
                    // label={eventPageData.title}
                  />
                </div>
              </div>
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
      <EventAttendCard
        isFixedBar
        isFixedBarVisible={isPastAttendCard}
        profiles={eventPageData.attendees.avatars}
        attendeeCount={eventPageData.attendees.count}
        memberEngagementStatus={memberEngagementStatus}
        onJoinClick={handleJoinClick}
        isJoinLoading={isJoinLoading}
      />
      <CommunityJoinOverlay
        communityId={eventPageData.community.id}
        entryConditions={eventPageData.communityEntryConditions}
        isOpen={isJoinOverlayOpen}
        onClose={handleJoinOverlayClose}
        onJoinSuccess={markJoinPending}
      />
    </PageLayout>
  );
}
