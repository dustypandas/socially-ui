import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './pages/index.css';
import {
  CommunityPage,
  EventPage,
  EventsPage,
  HomePage,
  IndexPage,
  InterestsPage,
  InterestOnePage,
  EventOnePage,
} from './pages';
import { store } from './store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path='/' element={<IndexPage />} />
        <Route path='/home-ui' element={<HomePage />} />
        <Route path='/events-ui' element={<EventsPage />} />
        <Route path='/event-one-ui' element={<EventOnePage />} />
        <Route path='/interests-ui' element={<InterestsPage />} />
        <Route path='/interest-one-ui' element={<InterestOnePage />} />
        <Route path='/interest-one-ui-empty' element={<InterestOnePage />} />
        <Route path='/prev-community-ui' element={<CommunityPage />} />
        <Route path='/prev-event-ui' element={<EventPage />} />
        {/* default invalid? */}
      </Routes>
    </HashRouter>
    </Provider>
  </StrictMode>,
)
