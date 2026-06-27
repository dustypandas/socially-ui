import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './pages/index.css';
import {
  CommunityPage,
  EventPage,
  HomePage,
  IndexPage,
  InterestsPage,
  OneInterestPage,
} from './pages';
import { store } from './store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path='/' element={<IndexPage />} />
        <Route path='/home-ui' element={<HomePage />} />
        <Route path='/interests-ui' element={<InterestsPage />} />
        <Route path='/one-interest-ui' element={<OneInterestPage />} />
        <Route path='/community-ui' element={<CommunityPage />} />
        <Route path='/event-ui' element={<EventPage />} />
        {/* default invalid? */}
      </Routes>
    </HashRouter>
    </Provider>
  </StrictMode>,
)
