import { useState } from 'react';
import { ColumnsLayout, PageTitle, PageLayout } from '@src/components';
import { CommunityScope } from '@src/data';
import { CommunitiesGrid, CommunitiesFilters } from './components';
import { useCommunitiesStates } from './useCommunitiesStates';
import './communities-page.css';

export function CommunitiesPageClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [communityScope, setCommunityScope] = useState<CommunityScope>('all');
  const { filteredCommunities } = useCommunitiesStates(searchQuery, communityScope);

  const pageTitle = communityScope === 'mine' ? 'My Communities' : 'Popular Communities';

  const filterProps = {
    value: searchQuery,
    onChange: setSearchQuery,
    scope: communityScope,
    onScopeChange: setCommunityScope,
  };

  return (
    <PageLayout>
      <section className="communities-page">
        <div className="width-container">
          <ColumnsLayout>
            <ColumnsLayout.Main>
              <PageTitle
                title={pageTitle}
                backLabel="←&thinsp;Home"
                backHref="#/home-ui"
              />
              <div className="communities-page__filters communities-page__filters--main">
                <CommunitiesFilters {...filterProps} />
              </div>
              <CommunitiesGrid communities={filteredCommunities} />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky={50} className="communities-page__aside">
              <CommunitiesFilters {...filterProps} />
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
    </PageLayout>
  );
}
