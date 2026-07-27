import { SectionTitle } from '@src/components';
import { newMembers } from '../data/homeProfileData';
import './home-profile-new-members.css';

export function HomeProfileNewMembers() {
  return (
    <section className="home-profile-new-members">
      <SectionTitle title="New Members" hideMore />
      <ul className="home-profile-new-members__list">
        {newMembers.map(member => (
          <li key={member.id}>
            <a href={member.href} className="home-profile-new-members__member">
              <img
                className="home-profile-new-members__avatar"
                src={member.image}
                alt=""
              />
              <span className="home-profile-new-members__label">{member.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
