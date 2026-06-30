import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './pages/index.css';
import { ScrollToTop } from './components';
import {
  CommunityPage,
  EventPage,
  EventsPage,
  HomePage,
  IndexPage,
  InterestsPage,
  InterestOnePage,
} from './pages';
import { store } from './store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<IndexPage />} />
        <Route path='/home-ui' element={<HomePage />} />
        <Route path='/events-ui' element={<EventsPage />} />
        <Route path='/interests-ui' element={<InterestsPage />} />
        <Route path='/interest-one-ui' element={<InterestOnePage />} />
        <Route path='/interest-one-ui-empty' element={<InterestOnePage />} />
        <Route path='/community-ui' element={<CommunityPage />} />
        <Route path='/event-ui' element={<EventPage />} />
        {/* default invalid? */}
      </Routes>
    </HashRouter>
    </Provider>
  </StrictMode>,
)
