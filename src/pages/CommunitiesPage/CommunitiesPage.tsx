import { useMemo, useState } from 'react';
import { ColumnsLayout, PageHeader, PageLayout } from '@src/components';
import { getCommunities, CommunityScope } from '@src/data';
import { CommunitiesGrid, CommunitiesFilters } from './components';
import './communities-page.css';

export function CommunitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [communityScope, setCommunityScope] = useState<CommunityScope>('all');

  const filteredCommunities = useMemo(
    () => getCommunities(searchQuery, communityScope),
    [searchQuery, communityScope],
  );

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
              <PageHeader title={pageTitle} />
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
