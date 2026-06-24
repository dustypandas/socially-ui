import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './slices/eventsSlice';
import interestsReducer from './slices/interestsSlice';

export const store = configureStore({
  reducer: {
    interests: interestsReducer,
    events: eventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
