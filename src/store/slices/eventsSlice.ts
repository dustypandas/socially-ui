import { createSlice } from '@reduxjs/toolkit';
import { events, spanishInterestEvents } from '../../data/dummyData.js';

export type EventHost = {
  name: string;
  href: string;
};

export type EventLocation = {
  name: string;
  href: string;
};

export type Event = {
  id: string;
  title: string;
  image: string;
  host: EventHost;
  attendees: {
    count: number;
  };
  dateLabel: string;
  timeLabel: string;
  location: EventLocation;
  rating: number;
  ratingCount: number;
  startsAt: string;
  interestIds?: string[];
};

type EventsState = {
  items: Event[];
};

const allEvents = [...events, ...spanishInterestEvents];

const initialState: EventsState = {
  items: allEvents as Event[],
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
});

export default eventsSlice.reducer;
