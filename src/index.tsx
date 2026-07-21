import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import {
  CommunitiesPageClient,
  CommunityPageClient,
  EventPageClient,
  EventsPageClient,
  HomePage,
  IndexPage,
  InterestsPageClient,
  InterestPageClient,
  MemberPageClient,
  PrevCommunityPage,
  PrevEventPage,
} from './pages';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<IndexPage />} />
        <Route path='/home-ui' element={<HomePage />} />
        <Route path='/interests-ui' element={<InterestsPageClient />} />
        <Route path='/one-interest-ui' element={<InterestPageClient />} />
        <Route path='/one-interest-ui-empty' element={<InterestPageClient variant="empty" />} />
        <Route path='/events-ui' element={<EventsPageClient />} />
        <Route path='/one-event-ui' element={<EventPageClient />} />
        <Route path='/one-event-ui-empty' element={<EventPageClient variant="empty" />} />
        <Route path='/communities-ui' element={<CommunitiesPageClient />} />
        <Route path='/one-community-ui' element={<CommunityPageClient />} />
        <Route path='/one-community-ui-empty' element={<CommunityPageClient variant="empty" />} />
        <Route path='/one-member-ui' element={<MemberPageClient />} />
        <Route path='/one-member-ui-empty' element={<MemberPageClient variant="empty" />} />
        <Route path='/one-member-ui-related' element={<MemberPageClient variant="related" />} />
        <Route path='/one-member-ui-admin' element={<MemberPageClient variant="admin" />} />
        <Route path='/prev-community-ui' element={<PrevCommunityPage />} />
        <Route path='/prev-event-ui' element={<PrevEventPage />} />
        {/* default invalid? */}
      </Routes>
    </HashRouter>
  </StrictMode>,
)
