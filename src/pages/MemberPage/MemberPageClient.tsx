import { ColumnsLayout, PageLayout } from '@src/components';
import {
  MemberProfile,
  MemberAbout,
  MemberCommunities,
  MemberInterests,
} from './components';
import { MemberPageClientProps, useMemberPageStates } from './useMemberPageStates';
import './member-page.css';

export function MemberPageClient({ variant }: MemberPageClientProps) {
  const { memberPageData, interests, communities } = useMemberPageStates({ variant });

  if (!memberPageData) {
    return null;
  }

  return (
    <PageLayout hasStaticHeader>
      <section className="member-page">
        <div className="width-container">
          <ColumnsLayout>
            <ColumnsLayout.Aside sticky asideWidth="min(320px, 32%)">
              <MemberProfile member={memberPageData} />
            </ColumnsLayout.Aside>
            <ColumnsLayout.Main>
              <div className="member-page__divider--hidden" />
              <MemberInterests interests={interests} />
              <div className="member-page__divider--hidden" />
              <MemberCommunities communities={communities} />
              <MemberAbout about={memberPageData.about} />
            </ColumnsLayout.Main>
          </ColumnsLayout>
        </div>
      </section>
    </PageLayout>
  );
}
