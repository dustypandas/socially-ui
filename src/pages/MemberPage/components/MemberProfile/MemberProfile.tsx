import type { MemberProfile } from '@src/data';
import './member-profile.css';

type MemberProfileProps = {
  member: MemberProfile;
};

export function MemberProfile({ member }: MemberProfileProps) {
  const inCurrCitySinceLabel = getInCurrCitySinceLabel(member.inCurrCitySince);
  const prevCountry = member.prevCountries[0];
  const prevCountriesCount = member.prevCountries.length - 1;

  return (
    <section className="member-profile">
      <img className="member-profile__avatar" src={member.image} alt="" />
      <h1 className="member-profile__name">{member.label}</h1>
      <div className="member-profile__details">
        <div className="member-profile__detail-group">
          <div className="member-profile__detail-label">In Madrid since:</div>
          <div className="member-profile__detail-value">{inCurrCitySinceLabel}</div>
        </div>
        <div className="member-profile__detail-group">
          <div className="member-profile__detail-label">Near:</div>
          <div className="member-profile__detail-value">{member.nearestMetro}</div>
        </div>
        <div className="member-profile__detail-group">
          <div className="member-profile__detail-label">Previously lived in:</div>
          <div className="member-profile__detail-value">
            <div className="member-profile__previous-homes">{prevCountry}</div>
            <div className="member-profile__previous-homes-count">
              {prevCountriesCount > 0 && `+${prevCountriesCount} others`}
            </div>
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

function getInCurrCitySinceLabel(inCurrCitySince: Date): string {
  const now = new Date();
  const monthsElapsed =
    (now.getFullYear() - inCurrCitySince.getFullYear()) * 12
    + (now.getMonth() - inCurrCitySince.getMonth());
  const yearsElapsed = monthsElapsed / 12;

  if (yearsElapsed < 1) return '< 1 year';
  if (yearsElapsed < 2) return '1 year';
  if (yearsElapsed < 5) return '2+ years';
  if (yearsElapsed < 10) return '5+ years';
  return '10+ years';
}
