import { createSlice } from '@reduxjs/toolkit';
import { events } from '../../data/dummyData.js';

export type EventHost = {
  name: string;
  href: string;
};

export type EventLocation = {
  name: string;
  href: string;
};

export type HomeEvent = {
  id: string;
  title: string;
  image: string;
  host: EventHost;
  dateLabel: string;
  timeLabel: string;
  location: EventLocation;
  rating: number;
  ratingCount: number;
};

type EventsState = {
  items: HomeEvent[];
};

const initialState: EventsState = {
  items: events as HomeEvent[],
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
});

export default eventsSlice.reducer;
