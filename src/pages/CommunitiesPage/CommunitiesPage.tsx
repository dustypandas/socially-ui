import { useMemo, useState } from 'react';
import { ColumnsLayout, PageHeader, PageLayout } from '../../components';
import { communities, myCommunityIds } from '../../data/dummyData.js';
import { CommunitiesGrid, CommunityFilters } from './components';
import { filterCommunities, type CommunityScope } from './helpers';
import './communities-page.css';

export function CommunitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [communityScope, setCommunityScope] = useState<CommunityScope>('all');

  const scopedCommunities = useMemo(() => {
    if (communityScope === 'all') return communities;
    const joined = new Set(myCommunityIds);
    return communities.filter(community => joined.has(community.id));
  }, [communityScope]);

  const filteredCommunities = useMemo(
    () => filterCommunities(scopedCommunities, searchQuery),
    [scopedCommunities, searchQuery],
  );

  const pageTitle = communityScope === 'mine' ? 'My Communities' : 'Popular Communities';

  return (
    <PageLayout>
      <section className="communities-page">
        <div className="width-container">
          <ColumnsLayout>
            <ColumnsLayout.Main>
              <PageHeader title={pageTitle} />
              <CommunitiesGrid communities={filteredCommunities} />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky={50}>
              <CommunityFilters
                value={searchQuery}
                onChange={setSearchQuery}
                scope={communityScope}
                onScopeChange={setCommunityScope}
              />
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
    </PageLayout>
  );
}
