import type { MemberOneProfile } from '@src/data';
import './member-profile.css';

type MemberProfileProps = {
  member: MemberOneProfile;
};

const LIVED_IN_VISIBLE_COUNT = 1;

export function MemberProfile({ member }: MemberProfileProps) {
  const previousLocation = member.previousCities.slice(0, 1).pop();
  const extraLocations = member.previousCities.slice(1);

  return (
    <section className="member-profile">
      <img className="member-profile__avatar" src={member.image} alt="" />
      <h1 className="member-profile__name">{member.label}</h1>
      <div className="member-profile__details">
        <div className="member-profile__detail-group">
          <div className="member-profile__detail-label">In Madrid since:</div>
          <div className="member-profile__detail-value">{member.inCurrentCitySince}</div>
        </div>
        <div className="member-profile__detail-group">
          <div className="member-profile__detail-label">Previously lived in:</div>
          <div className="member-profile__detail-value">
            <div className="member-profile__previous-city">{previousLocation}</div>
            <div className="member-profile__other-cities">{extraLocations.length > 0 && `and ${extraLocations.length} more`}</div>
          </div>
        </div>
      </div>
      {/* <div className="member-profile__social-links">
        {member.socialLinks.map(link => (
          <a
            key={link.label}
            href={link.href}
            className="member-profile__social-link"
            target="_blank"
          >
            <span className="member-profile__social-link-label">{link.label}</span>
          </a>
        ))}
      </div> */}
    </section>
  );
}
