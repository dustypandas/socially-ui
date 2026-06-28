import { useEffect, useState } from 'react';
import IconMembers from '../../assets/icon-group-outline.svg?react';
import IconMember from '../../assets/icon-user-outline.svg?react';
import IconRatings from '../../assets/icon-star.svg?react';
import IconLocation from '../../assets/icon-map-marker-outline.svg?react';
import IconContact from '../../assets/icon-email-outline.svg?react';
import './community-page.css';
import {
  PageFooter,
  PageHeader,
} from '../_components';
import { communities, sampleFullEvent } from '../_data';

export function CommunityPage() {
  const [hasScrolledLittle, setHasScrolledLittle] = useState(false);
  const [hasScrolledMuch, setHasScrolledMuch] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      // set hasScrolledLittle
      const hasScrolledLittleCalc = window.scrollY > 10;
      if (hasScrolledLittleCalc !== hasScrolledLittle) {
        setHasScrolledLittle(hasScrolledLittleCalc);
      }
      // set hasScrolledMuch
      const hasScrolledMuchCalc = window.scrollY > 240; // 274 height of header area
      if (hasScrolledMuchCalc !== hasScrolledMuch) {
        setHasScrolledMuch(hasScrolledMuchCalc);
      }
    });
    // add effect resize to set scroll distance based on header height
  }, [hasScrolledLittle, hasScrolledMuch]);

  const communityData = communities.polylogue;
  const eventsData = [
    sampleFullEvent,
    { ...sampleFullEvent, date: { ...sampleFullEvent.date, timelineLabels: ['Feb 18, 2025', 'Tuesday, 7:10pm'] } },
    { ...sampleFullEvent, date: { ...sampleFullEvent.date, timelineLabels: ['Mar 4, 2025', 'Tuesday, 7:10pm'] } },
    { ...sampleFullEvent, date: { ...sampleFullEvent.date, timelineLabels: ['Mar 18, 2025', 'Tuesday, 7:10pm'] } },
    { ...sampleFullEvent, date: { ...sampleFullEvent.date, timelineLabels: ['Apr 1, 2025', 'Tuesday, 7:10pm'] } },
  ];

  return (<div className='community-page'>
    <div className='page-bg'>
      <div className='page-bg__solid'></div>
      <div className='page-bg__gradient'></div>
    </div>
    <PageHeader isSticky={true}/> {/* isSubtle={!hasScrolledLittle} */}
    <section className='section-container community-intro'>
      <div className='width-container columns-layout'>
        <div className='community-intro__img-container column-main'>
          <img
            className='community-intro__img'
            src='./assets/community-philosophy.webp'
          />
        </div>
        <div className='community-intro__info-container column-right'>
          <h1 className='community-intro__title'>
            {communityData.name}
          </h1>
          <div className='community-intro__attributes-container'>
            <div className='community-intro__attribute'>
              {/* <i className='gm-icon gm-icon-members' /> */}
              <IconMembers className='gm-icon gm-icon-members' />
              <div className='community-intro__attribute-label'>
                {communityData.members.count} followers
              </div>
            </div>
            <div className='community-intro__attribute'>
              {/* <i className='gm-icon icon-member'/> */}
              <IconMember className='gm-icon gm-icon-member' />
              <div className='community-intro__attribute-label'>
                Organized by {nameAndOthersLabel(communityData.organizers)}
              </div>
            </div>
            <div className='community-intro__attribute'>
              <IconRatings className='gm-icon gm-icon-ratings' />
              <div className='community-intro__attribute-label'>
                <strong>{communityData.ratings.rating}</strong> from {communityData.ratings.count} ratings
              </div>
            </div>
          </div>
          <a href='#' className='gm-link-btn gm-primary gm-animated community-intro__primary-btn'>
            <span className='gm-link-btn__label'>
              Follow for updates
            </span>
          </a>
        </div>
      </div>
    </section>
    <section className={`section-container community-menu${!!hasScrolledMuch ? ' has-border' : ''}`}>
      <div className='width-container columns-layout'>
        <div className='community-menu__links-container column-main'>
          <a href='#' className='gm-link gm-animated community-menu__link'>About</a>
          <a href='#' className='gm-link gm-animated community-menu__link'>Events</a>
          <a href='#' className='gm-link gm-animated community-menu__link'>Members</a>
          <a href='#' className='gm-link gm-animated community-menu__link'>Disussions</a>
        </div>
        <div className='community-menu__actions-container column-right'>
          <a href='#' className='gm-link-btn gm-primary gm-animated community-menu__primary-btn'>
            <span className='gm-link-btn__label'>
              Follow for updates
            </span>
            {/* Follow, Subscribe, Join this group, Join community, [Subscribe] to future events, Follow future event, Join this community */}
          </a>
          {/* <span className='community-menu__link-btn, community-menu__label'>
            to receive email updates
          </span> */}
        </div>
      </div>
    </section>
    <section className='section-container community-details'>
      <div className='width-container columns-layout'>
        <div className='column-main'>
          <div className='about-section-prev'>
            <h2>Who we are</h2>
            <div className='about-section-prev__content' dangerouslySetInnerHTML={{
              __html: communityData.details,
            }} />
          </div>
          <div className='events-section'>
            <div className='section-container__title'>
              <h2>Upcoming Events ({eventsData.length})</h2>
              <a href='#' className='gm-link gm-animated'>See all events</a>
            </div>

            <div className='events-section__events-container'>
              {eventsData.slice(0,3).map(event => (
                <div className='event-item'>
                  <div className='event-item__timeline-line'></div>
                  <div className='event-item__timeline-title'>
                    <div className='event-item__timeline-datetime'>
                      <span className='event-item__timeline-part-date'>
                        {event.date.timelineLabels[0]}
                        {/* Jan 12, 2025 */}
                      </span>
                      <span className='event-item__timeline-part-time'>
                        {event.date.timelineLabels[1]}
                        {/* Sunday, 7:10pm */}
                      </span>
                    </div>
                    <div className='event-item__timeline-dot-wrapper'>
                      <div className='event-item__timeline-dot'></div>
                    </div>
                  </div>
                  <a href='#/event-ui' className='event-card-prev gm-animated'>
                    <div className='event-card__inner'>
                      <div className='event-card__cover-container'>
                        <div className='event-card__img-wrapper'>
                          <img className='event-card__img' src={event.img} />
                        </div>
                        <div className='event-card__cover-details-container'>
                          <h3 className='event-card__cover-title'>
                            {event.title}
                            {/* Lightning Talks @ Maria Pandora */}
                          </h3>
                          <div className='event-card__cover-attributes'>
                            <div className='event-card__cover-attribute-row'>
                              {/* <i className='gm-icon gm-icon-ratings' /> */}
                              <IconMember className='gm-icon gm-icon-member' />
                              <div className='event-card__cover-attribute-label'>
                                hosted by {nameAndOthersLabel(event.hosts)}
                                {/* {`${event.ratings.rating} (from ${event.ratings.count} ratings)`} */}
                                {/* 4.7 (313 ratings) */}
                              </div>
                            </div>
                            <div className='event-card__cover-attribute-row'>
                              {/* <i className='gm-icon gm-icon-location' /> */}
                              <IconLocation className='gm-icon gm-icon-location' />
                              <div className='event-card__cover-attribute-label'>
                                {event.location}
                                {/* Palacio */}
                              </div>
                            </div>
                          </div>
                          <div
                            className='event-card__details'
                            dangerouslySetInnerHTML={{__html: event.details}}
                          />
                          {/* <p>
                              5 Speakers, 5 minute presentations, 5 diverse topics! 🙌⚡️
                            </p>
                            <p>
                              Lightning Talks is a format where a number of speakers give <strong>5 minute presentations</strong> about <strong>any topic of their choosing</strong>, followed by 5 minutes of open questions.
                            </p> */}
                        </div>
                      </div>
                      <div className='event-card__attendance-container'>
                        <div className='event-card__attendees'>
                          <div className='event-card__attendees-img-container'>
                            {event.attendees.profiles.map((profile, index) => (
                              <img
                                className='event-card__attendee-img'
                                src={profile.img}
                                style={{zIndex: 5-index}}
                              />
                            ))}
                          </div>
                          <div className='event-card__attendees-label'>
                            {`${event.attendees.count} attendees`}
                            {/* 27 attendees */}
                          </div>
                        </div>

                        <div className='event-card__actions-container'>
                          <a href='#' className='gm-link-btn gm-secondary gm-animated event-card__attend-btn'>
                            <span className='gm-link-btn__label'>
                              Join event
                              {/* Attend, Register, Join event */}
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
            <div className='section-container__bottom-link'>
              <a href='#' className='gm-link gm-animated'>See all events</a>
            </div>
          </div>
          <div className='past-events-section'>
            <div className='section-container__title'>
              <h2>Past Events ({communityData.ratings.eventsCount})</h2>
              <a href='#' className='gm-link gm-animated'>See past events</a>
            </div>
          </div>
        </div>
        <div className='community-details__sidebar column-right'>
          <div className='community-details__sidebar-sticky'>
            <h2>Organizers</h2>
            <div className='organizers-container'>
              <img
                className='member-item__member-img'
                src={communityData.organizers.slice(0, 1).pop()?.img}
              />
              <div className='organizers-details'>
                <div className='organizers-details__label'>
                  {nameAndOthersLabel(communityData.organizers)}
                </div>
                <a href='#' className='organizers-details__contact gm-animated'>
                  <IconContact className='gm-icon gm-icon-contact' />
                  <div className='organizers-details__contact-label'>
                    contact
                  </div>
                </a>
              </div>
            </div>

            <div className='section-container__title'>
              <h2>Followers ({communityData.members.count})</h2>
              <a href='#' className='gm-link gm-animated'>See followers</a>
            </div>
            <a href='#' className='members-container'>
              {communityData.members.profiles.slice(0, 15).map(profile => (
                <img
                  className='member-item__member-img'
                  src={profile.img}
                />
              ))}
            </a>
          </div>
        </div>
      </div>
    </section>
    <PageFooter />
  </div>);
}

/*
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
  </p>
  <h3>
    1914 translation by H. Rackham
  </h3>
  <p>
    "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
  </p>
  <h3>
    Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
  </h3>
  <p>
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
  </p>
  <h3>
    1914 translation by H. Rackham
  </h3>
  <p>
    "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
  </p>
*/

function nameAndOthersLabel(membersArray: { name: string }[]) {
  return (
    <>
      <strong>{membersArray.slice(0, 1).pop()?.name}</strong>
      {
        membersArray.length > 1
          ? (
            <>
              {/* &nbsp;and <strong>
                {membersArray.length - 1} {membersArray.length > 2 ? 'others' : 'other'}
              </strong> */}
              &nbsp;and <span>
                {membersArray.length - 1} {membersArray.length > 2 ? 'others' : 'other'}
              </span>
            </>
          )
          : ''
      }
    </>
  );
}
