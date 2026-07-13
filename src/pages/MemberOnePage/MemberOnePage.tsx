import { ColumnsLayout, PageLayout } from '@src/components';
import {
  MemberProfile,
  MemberAbout,
  MemberCommunities,
  MemberInterests,
} from './components';
import { MemberOnePageProps, useMemberOneStates } from './useMemberOneStates';
import './member-one-page.css';

export function MemberOnePage({ variant }: MemberOnePageProps) {
  const { memberOnePageData, interests, communities } = useMemberOneStates({ variant });

  if (!memberOnePageData) {
    return null;
  }

  return (
    <PageLayout hasStaticHeader>
      <section className="member-one-page">
        <div className="width-container">
          <ColumnsLayout mainPosition="right">
            <ColumnsLayout.Main>
              <MemberInterests interests={interests} />
              <MemberCommunities communities={communities} />
              <MemberAbout about={memberOnePageData.about} />
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
