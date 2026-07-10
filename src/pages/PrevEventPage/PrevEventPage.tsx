import { useEffect, useState } from 'react';
import IconLocation from '@src/assets/icon-map-marker-outline.svg?react';
// import IconRatings from '@src/pages/assets/icon-star.svg?react';
import { PageFooter, PageHeader } from '@src/pages/PrevCommunityPage/prevComponents';
import { sampleFullEvent } from '@src/pages/PrevCommunityPage/prevData';
import './prev-event-page.css';

export function PrevEventPage() {
  const [hasScrolledABit, setHasScrolledABit] = useState(false);
  const [hasScrolledNearEnd, setHasScrolledNearEnd] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      // set hasScrolledABit
      const hasScrolledABitCalc = window.scrollY > 400;
      if (hasScrolledABitCalc !== hasScrolledABit) {
        setHasScrolledABit(hasScrolledABitCalc);
      }
      // set hasScrolledNearEnd
      const docBody = window.document.body;
      const hasScrolledNearEndCalc = window.scrollY > docBody.scrollHeight - docBody.offsetHeight - 50;
      if (hasScrolledNearEndCalc !== hasScrolledNearEnd) {
        setHasScrolledNearEnd(hasScrolledNearEndCalc);
      }
    });
    // add effect resize to set scroll distance based on header height
  }, [hasScrolledABit, hasScrolledNearEnd]);

  // extra long content to show scroll effect for events page
  const eventData = {
    ...sampleFullEvent,
    details: `${sampleFullEvent.details}
      <h3>
        The standard Lorem Ipsum passage, used since the 1500s
      </h3>
      <p>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      </p>
      <h3>
        Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
      </h3>
      <p>
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
      </p>`
  };

  return (<div className='event-page'>
    <div className='page-bg'>
      <div className='page-bg__solid'></div>
      <div className='page-bg__gradient'></div>
    </div>
    <PageHeader isSubtle={true} />
    <section className='section-container event-content'>
      <div className='width-container prev-columns-layout'>
        <div className='event-content-left prev-column-left'>
          <div className='event-img__container'>
            <div className='event-img__wrapper-glow'>
              <img
                className='event-img__img'
                src={eventData.img}
              />
            </div>
            <div className='event-img__wrapper'>
              <img
                className='event-img__img'
                src={eventData.img}
              />
            </div>
          </div>
          <div className='event-sidebar__sticky'>
            <div className={`event-sidebar__event-title gm-animated${hasScrolledABit ? ' is-visible' : ''}`}>
              <h3>
                {eventData.title}
                {/* TODO click to scroll to top */}
                {/* if double line, still center in line with top bar */}
              </h3>
            </div>
            <div className='event-community__container'>
              <a href='#/prev-community-ui' className='event-community__header-row gm-link-dark'>
                <img
                  className='event-community__title-img'
                  src={eventData.community.img}
                />
                <div className='event-community__title-container'>
                  <div className='event-community__title-label'>
                    Created by
                  </div>
                  {/* <div className='event-community__title-name-row'> */}
                  <div className='event-community__title-name gm-animated gm-link__label'>
                    {eventData.community.name}
                  </div>
                    {/* <div className='event-community__title-ratings'>
                      {event.ratings.rating}<IconRatings className='gm-icon gm-icon-ratings' />
                    </div> */}
                  {/* </div> */}
                </div>
              </a>
              <div className='event-community__about' dangerouslySetInnerHTML={{
                __html: eventData.community.details,
              }} />
            </div>
            <div className='event-sidebar__section-container'>
              <div className='event-sidebar__section-title'>
                Hosted by
              </div>
              <div className='event-hosts__hosts-container'>
                {eventData.hosts.map(host => (
                  <a href='#' className='event-hosts__host-row gm-link-dark'>
                    <img
                      className='event-hosts__host-img'
                      src={host.img}
                    />
                    <div className='event-hosts__host-label gm-link__label gm-animated'>
                      {host.name}
                    </div>
                  </a>
                ))}
              </div>
            </div>
            {/* <div className='event-sidebar__section-container'>
              <div className='event-sidebar__section-title'>
                {event.attendees.count} attendees
              </div>
              <div className='event-sidebar__attendees-label'>
                <div className='event-attendances__attendees-img-container'>
                  {event.attendees.profiles.map((img, index) => (
                    <img
                      className='event-attendances__attendee-img'
                      src={img}
                      style={{zIndex: 20-index}}
                    />
                  ))}
                </div>
                <div className='event-attendances__attendees-label'>
                  {`John Darwin, Maria M, and ${event.attendees.count} others are going`}
                </div>
              </div>
            </div> */}
            {/* Tags */}
            {/* <div className='event-sidebar__section-container'>
              <div className='event-sidebar__section-title'>
                How to find us:
              </div>
              <p><b>Saturday, March 8</b>, 12:00 PM - 1:00 PM</p>
              <p>Palacio, Madrid</p>
              Map
            </div> */}
          </div>
        </div>
        <div className='event-content-main prev-column-main'>
          <div className='event-intro'>
            <h1 className='prev-event-intro__title'>
              {eventData.title}
            </h1>
            <div className='event-intro__attributes'>
              <div className='event-intro__attribute-row'>
                <div className='event-intro__icon-container'>
                  <div className='event-intro__icon-calendar-month'>{eventData.date.pageLabels.monthShort}</div>
                  <div className='event-intro__icon-calendar-date'>{eventData.date.pageLabels.dateShort}</div>
                </div>
                <div className='event-intro__attribute-details-container'>
                  <div className='event-intro__attribute-details-row'>
                    {eventData.date.pageLabels.dateLong}
                  </div>
                  <div className='event-intro__attribute-details-row'>
                    {eventData.date.pageLabels.timeLong}
                  </div>
                </div>
              </div>
              <div className='event-intro__attribute-row'>
                <div className='event-intro__icon-container gm-flex-center-center'>
                  <IconLocation className='gm-icon gm-icon-location' />
                </div>
                <div className='event-intro__attribute-details-container'>
                  <div className='event-intro__attribute-details-row'>
                    Exact address visible for attendees
                  </div>
                  <div className='event-intro__attribute-details-row'>
                    {eventData.location}, Madrid
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`event-actions gm-animated${hasScrolledABit ? ' is-expanded' : ''}`}>
            <div className='card-container'>
              <div className='card-container__header'>
                <div className='card-container__header-label'>
                  Attend
                </div>
              </div>
              <div className='card-container__body event-actions__container'>
                <div className='event-actions__left-container'>
                  <div className='event-attendances__attendees'>
                    <div className='event-attendances__attendees-img-container'>
                      {eventData.attendees.profiles.map((profile, index) => (
                        <img
                          className='event-attendances__attendee-img'
                          src={profile.img}
                          style={{zIndex: 20-index}}
                        />
                      ))}
                    </div>
                    <div className='event-attendances__attendees-label'>
                      {`+${eventData.attendees.count} others are going`}
                    </div>
                  </div>
                  <div className='event-actions__pricing-label'>
                    Free
                    {/* Private, €15 */}
                  </div>
                </div>
                <a href='#' className='gm-link-btn gm-primary gm-animated event-actions__primary-btn'>
                  Join event
                  {/* Join waitlist */}
                </a>
              </div>
            </div>
          </div>
          {/* <div className='event-attendance' style={{
            display: 'none'
          }}>
            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
            }}>
              <img
                style={{
                  display: 'block',
                  borderRadius: '100%',
                  width: '2.5rem',
                  height: '2.5rem',
                }}
                src={event.attendees.profiles.slice(0, 1).pop()}
              />
              <div>
                <div style={{
                  fontSize: '14px',
                  // fontWeight: 500,
                  color: 'rgba(0, 15, 58, 0.64)',
                }}>
                  Hosted by
                </div>
                <div>
                  <span style={{ fontWeight: 500 }}>Achi J</span>
                  and 2 others
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className='event-description__section-container'>
            <div className='prev-event-description__title'>
              Hosted by
            </div>
            <div className='event-description__hosts-container'>
              <a href='#' className='event-description__host-row'>
                <img
                  className='event-description__host-img'
                  src={event.attendees.profiles[0]}
                />
                <div className='event-description__host-label'>
                  <strong>Achi J</strong> and 3 others
                </div>
              </a>
            </div>
          </div> */}
          <div className='event-description__section-container'>
            {/* <div className='prev-event-description__title'>
              About event
            </div> */}
            <h3>About event</h3>
            <div className='event-description__content' dangerouslySetInnerHTML={{
              __html: eventData.details,
            }} />
          </div>
        </div>
      </div>
    </section>

    <section className={`section-container event-actions-bottom${hasScrolledNearEnd ? '' : ' has-border'}`}>
      <div className='width-container prev-columns-layout'>
        <div className='event-actions__left-container'>
          <div className='event-attendances__attendees'>
            <div className='event-attendances__attendees-img-container'>
              {eventData.attendees.profiles.map((profile, index) => (
                <img
                  className='event-attendances__attendee-img'
                  src={profile.img}
                  style={{zIndex: 20-index}}
                />
              ))}
            </div>
            <div className='event-attendances__attendees-label'>
              {`+${eventData.attendees.count} others are going`}
            </div>
          </div>
          <div className='event-actions__pricing-label'>
            Free
            {/* Private, €15 */}
          </div>
        </div>
        <a href='#' className='gm-link-btn gm-primary gm-animated event-actions-bottom__primary-btn'>
          Join this event
          {/* Join waitlist */}
        </a>
      </div>
      {/* <div>
        <div style={{ flex: 1 }}>
          {event.title}
        </div>
        <div>
          <a href='#' className='gm-link-btn gm-primary gm-animated event-actions__primary-btn'>
            Join event
            Join waitlist
          </a>
        </div>
      </div> */}
    </section>
    <PageFooter />
  </div>);
}
