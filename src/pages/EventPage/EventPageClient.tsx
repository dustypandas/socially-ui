import { useEffect, useRef, useState } from 'react';
import { AuthLoginOverlay, ColumnsLayout, PageLayout } from '@src/components';
import { getElementDocumentOffsetTop, useScrolledPastDistance } from '@src/hooks/useScrolledPastDistance';
import { CommunityOverlayJoin } from '@src/pages/CommunityPage/components';
import { isLoggedOut, useEventAccess } from './accessControl';
import {
  EventAttendCard,
  EventAttendanceOverlay,
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
    setEventViewerStatus,
    refreshEventPageData,
  } = useEventPageStates({ variant });
  const [isAttendanceOverlayOpen, setIsAttendanceOverlayOpen] = useState(false);

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

  const {
    handleJoinBtnClick,
    handleJoinOverlaySuccess,
    isJoinOverlayOpen,
    isLoginOverlayOpen,
    loginOnSuccess,
    isJoinLoading,
    handleJoinOverlayClose,
    handleLoginOverlayClose,
  } = useEventAccess({
    eventId: eventPageData?.id ?? '',
    communityId: eventPageData?.community.id ?? '',
    viewerStatus: eventPageData?.viewerStatus,
    refreshEventPageData,
    setEventViewerStatus,
  });

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

  const eventViewerStatus = eventPageData.viewerStatus;

  if (eventViewerStatus === 'banned') {
    return (
      <PageLayout hasStaticHeader>
        <div className="event-page event-page--unavailable">
          <p>This page is not available</p>
        </div>
      </PageLayout>
    );
  }

  const canViewExactAddress =
    eventViewerStatus === 'attending'
    || eventViewerStatus === 'late'
    || eventPageData.isHost === true;

  const handleUpdateClick = () => {
    setIsAttendanceOverlayOpen(true);
  };
  const handleAttendanceOverlayClose = () => setIsAttendanceOverlayOpen(false);

  return (
    <PageLayout hasStaticHeader headerVariant={isLoggedOut(eventViewerStatus) ? 'loggedOut' : undefined}>
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
                  addressLocation={eventPageData.addressLocation}
                  canViewExactAddress={canViewExactAddress}
                />
              </div>
              <EventAttendCard
                ref={attendCardRef}
                className="event-page__attend-card"
                profiles={eventPageData.attendees.avatars}
                attendeeCount={eventPageData.attendees.count}
                eventViewerStatus={eventViewerStatus}
                onJoinBtnClick={handleJoinBtnClick}
                onUpdateClick={handleUpdateClick}
                isJoinLoading={isJoinLoading}
              />
              <div className="interest-page__divider--hidden" />
              <EventDescription htmlContent={eventPageData.descriptionHtml} />
              <EventTags interests={eventPageData.interests} />
              <div className="event-page__divider" />
              <EventLocationDetails
                addressLocation={eventPageData.addressLocation}
                canViewExactAddress={canViewExactAddress}
              />
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
        eventViewerStatus={eventViewerStatus}
        onJoinBtnClick={handleJoinBtnClick}
        onUpdateClick={handleUpdateClick}
        isJoinLoading={isJoinLoading}
      />
      <AuthLoginOverlay
        isOpen={isLoginOverlayOpen}
        onClose={handleLoginOverlayClose}
        onSuccess={loginOnSuccess}
      />
      <CommunityOverlayJoin
        communityId={eventPageData.community.id}
        entryConditions={eventPageData.communityEntryConditions}
        isOpen={isJoinOverlayOpen}
        title="Community questions"
        onClose={handleJoinOverlayClose}
        onJoinSuccess={handleJoinOverlaySuccess}
      />
      <EventAttendanceOverlay
        eventId={eventPageData.id}
        currentStatus={eventViewerStatus}
        isOpen={isAttendanceOverlayOpen}
        onClose={handleAttendanceOverlayClose}
        onAttendanceUpdate={setEventViewerStatus}
      />
    </PageLayout>
  );
}
