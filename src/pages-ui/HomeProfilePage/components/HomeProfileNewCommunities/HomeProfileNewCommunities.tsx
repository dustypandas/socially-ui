import { SectionTitle } from '@src/components';
import type { CommunityBasic } from '@src/data';
import { CommunitiesGrid } from '@src/pages/CommunitiesPage/components/CommunitiesGrid/CommunitiesGrid';
import './home-profile-new-communities.css';

type HomeProfileNewCommunitiesProps = {
  communities: CommunityBasic[];
};

export function HomeProfileNewCommunities({ communities }: HomeProfileNewCommunitiesProps) {
  return (
    <section id="new-communities" className="home-profile-new-communities">
      <SectionTitle
        title="New Communities"
        moreHref="#/communities-ui"
        moreLabel="more communities →"
      />
      <CommunitiesGrid communities={communities} />
      <div
        className="home-profile-section__end"
        data-section-id="new-communities"
      />
    </section>
  );
}
