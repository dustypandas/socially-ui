import { CommunityCard, SectionTitle } from '@src/components';
import { newCommunities } from '../data/homeProfileData';
import './home-profile-new-communities.css';

export function HomeProfileNewCommunities() {
  return (
    <section className="home-profile-new-communities">
      <SectionTitle title="New Communities" moreHref="#/communities-ui" />
      <div className="home-profile-new-communities__list">
        {newCommunities.map(community => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>
    </section>
  );
}
