import { ColumnsLayout } from '@src/components';
import './community-panel-events.css';

export function CommunityPanelEvents() {
  return (
    <ColumnsLayout>
      <ColumnsLayout.Main>
        <section className="community-panel-events" />
      </ColumnsLayout.Main>
      <ColumnsLayout.Aside sticky={58} asideWidth="min(380px, 38%)">
        <div className="community-page__aside">
        </div>
      </ColumnsLayout.Aside>
    </ColumnsLayout>
  );
}
