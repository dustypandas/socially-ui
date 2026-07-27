import { profileData } from '../data/homeProfileData';
import './home-profile-member.css';

export function HomeProfileMember() {
  return (
    <section className="home-profile-member">
      <img
        className="home-profile-member__avatar"
        src={profileData.avatar}
        alt=""
      />
      <p className="home-profile-member__name">
        {profileData.firstName} {profileData.lastName}
      </p>
      <dl className="home-profile-member__details">
        <div className="home-profile-member__detail">
          <dt className="home-profile-member__detail-label">Near</dt>
          <dd className="home-profile-member__detail-value">{profileData.livingNear}</dd>
        </div>
        <div className="home-profile-member__detail">
          <dt className="home-profile-member__detail-label">In Madrid since</dt>
          <dd className="home-profile-member__detail-value">{profileData.madridSince}</dd>
        </div>
        <div className="home-profile-member__detail">
          <dt className="home-profile-member__detail-label">Previously lived in</dt>
          <dd className="home-profile-member__detail-value">{profileData.previousHome}</dd>
        </div>
      </dl>
      <a href={profileData.href} className="home-profile-member__link">
        View profile
      </a>
    </section>
  );
}
