import { ColumnsLayout, PageLayout } from '@src/components';
import {
  MemberProfile,
  MemberCommunities,
  MemberInterests,
} from './components';
import { useMemberOneStates } from './useMemberOneStates';
import './member-one-page.css';

export function MemberOnePage() {
  const { memberOnePageData } = useMemberOneStates();

  if (!memberOnePageData) {
    return null;
  }

  return (
    <PageLayout hasStaticHeader>
      <section className="member-one-page">
        <div className="width-container">
          <ColumnsLayout mainPosition="right">
            <ColumnsLayout.Main>
              <MemberInterests
                interests={memberOnePageData.engagements.interests}
              />
              <MemberCommunities
                communities={memberOnePageData.engagements.communities}
              />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky asideWidth="min(320px, 32%)">
              <MemberProfile member={memberOnePageData} />
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
    </PageLayout>
  );
}
