import { SectionTitle } from '@src/components';
import type { CommunityBasic } from '@src/common-libs/types';
import { CommunitiesGrid } from '@src/pages/CommunitiesPage/components/CommunitiesGrid/CommunitiesGrid';
import './home-profile-fresh-communities.css';

type HomeProfileFreshCommunitiesProps = {
  communities: CommunityBasic[];
};

export function HomeProfileFreshCommunities({ communities }: HomeProfileFreshCommunitiesProps) {
  return (
    <section id="fresh-communities" className="home-profile-fresh-communities">
      <SectionTitle
        title="Fresh Communities"
        moreHref="#/communities-ui"
        moreLabel="more communities →"
      />
      <CommunitiesGrid communities={communities} />
      <div
        className="home-profile-section__end"
        data-section-id="fresh-communities"
      />
    </section>
  );
}
