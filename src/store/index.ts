import { configureStore } from '@reduxjs/toolkit';
// import eventsReducer from './slices/eventsSlice';
// import interestsReducer from './slices/interestsSlice';
// import postsReducer from './slices/postsSlice';

export const store = configureStore({
  reducer: {
    // interests: interestsReducer,
    // events: eventsReducer,
    // posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
