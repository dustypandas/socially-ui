import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import {
  CommunitiesPage,
  CommunityOnePage,
  EventOnePage,
  EventsPage,
  HomePage,
  IndexPage,
  InterestsPage,
  InterestOnePage,
  MemberOnePage,
  PrevCommunityPage,
  PrevEventPage,
} from './pages';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<IndexPage />} />
        <Route path='/home-ui' element={<HomePage />} />
        <Route path='/interests-ui' element={<InterestsPage />} />
        <Route path='/interest-one-ui' element={<InterestOnePage />} />
        <Route path='/interest-one-ui-empty' element={<InterestOnePage variant="empty" />} />
        <Route path='/events-ui' element={<EventsPage />} />
        <Route path='/event-one-ui' element={<EventOnePage />} />
        <Route path='/event-one-ui-empty' element={<EventOnePage variant="empty" />} />
        <Route path='/communities-ui' element={<CommunitiesPage />} />
        <Route path='/community-one-ui' element={<CommunityOnePage />} />
        <Route path='/member-one-ui' element={<MemberOnePage />} />
        <Route path='/member-one-ui-empty' element={<MemberOnePage variant="empty" />} />
        <Route path='/member-one-ui-related' element={<MemberOnePage variant="related" />} />
        <Route path='/member-one-ui-admin' element={<MemberOnePage variant="admin" />} />
        <Route path='/prev-community-ui' element={<PrevCommunityPage />} />
        <Route path='/prev-event-ui' element={<PrevEventPage />} />
        {/* default invalid? */}
      </Routes>
    </HashRouter>
  </StrictMode>,
)
