import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { SessionProvider } from './providers/SessionProvider';
import {
  CommunitiesPageClient,
  CommunityPageClient,
  EventPageClient,
  EventsPageClient,
  HomePage,
  HomeProfilePage,
  IndexPage,
  InterestsPageClient,
  InterestPageClient,
  LoginPage,
  MemberPageClient,
  ResetPasswordPage,
  SignupFinalPage,
  SignupPage,
} from './pages';
import {
  CreateCommunityPage,
  CreateEventPage,
  PrevCommunityPage,
  PrevEventPage,
} from './pages-ui';
import { EmailPreviewPage } from './pages-ui/_emails/EmailPreviewPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SessionProvider>
      <HashRouter>
      <Routes>
        {/* part 0.1 - concept arts */}
        <Route path='/' element={<IndexPage />} />
        <Route path='/home-ui' element={<HomePage />} />
        <Route path='/interests-ui' element={<InterestsPageClient />} />
        <Route path='/one-interest-ui' element={<InterestPageClient />} />
        <Route path='/one-interest-ui-empty' element={<InterestPageClient variant="empty" />} />
        <Route path='/events-ui' element={<EventsPageClient />} />
        <Route path='/one-event-ui' element={<EventPageClient />} />
        <Route path='/one-event-ui-empty' element={<EventPageClient variant="empty" />} />
        <Route path='/one-event-ui-public' element={<EventPageClient variant="public" />} />
        <Route path='/one-event-ui-member' element={<EventPageClient variant="member" />} />
        <Route path='/one-event-ui-attending' element={<EventPageClient variant="attending" />} />
        <Route path='/one-event-ui-host' element={<EventPageClient variant="host" />} />
        <Route path='/one-event-ui-past' element={<EventPageClient variant="past" />} />
        <Route path='/one-event-ui-rejected' element={<EventPageClient variant="rejected" />} />
        <Route path='/communities-ui' element={<CommunitiesPageClient />} />
        <Route path='/one-community-ui' element={<CommunityPageClient />} />
        <Route path='/one-community-ui-empty' element={<CommunityPageClient variant="empty" />} />
        <Route path='/one-community-ui-public' element={<CommunityPageClient variant="public" />} />
        <Route path='/one-community-ui-member' element={<CommunityPageClient variant="member" />} />
        <Route path='/one-community-ui-organiser' element={<CommunityPageClient variant="organiser" />} />
        <Route path='/one-community-ui-rejected' element={<CommunityPageClient variant="rejected" />} />
        <Route path='/one-member-ui' element={<MemberPageClient />} />
        <Route path='/one-member-ui-empty' element={<MemberPageClient variant="empty" />} />
        <Route path='/one-member-ui-related' element={<MemberPageClient variant="related" />} />
        <Route path='/one-member-ui-admin' element={<MemberPageClient variant="admin" />} />
        {/* part 0.2 - auth, member critial path funnel */}
        <Route path='/login-ui' element={<LoginPage />} />
        <Route path='/reset-password-ui' element={<ResetPasswordPage />} />
        <Route path='/signup-ui' element={<SignupPage />} />
        <Route path='/signup-final-ui' element={<SignupFinalPage />} />
        <Route path='/home-profile-ui' element={<HomeProfilePage />} />
        {/* part 0.3 - create content */}
        <Route path='/create-event-ui' element={<CreateEventPage />} />
        <Route path='/create-community-ui' element={<CreateCommunityPage />} />
        {/* emails */}
        <Route path='/emails-preview-ui' element={<EmailPreviewPage />} />
        {/* prev */}
        <Route path='/prev-community-ui' element={<PrevCommunityPage />} />
        <Route path='/prev-event-ui' element={<PrevEventPage />} />
        {/* default invalid? */}
      </Routes>
    </HashRouter>
    </SessionProvider>
  </StrictMode>,
)
