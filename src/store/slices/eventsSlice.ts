import { createSlice } from '@reduxjs/toolkit';
import { events } from '@src/data/types.js';

export type EventHost = {
  name: string;
  href: string;
};

export type EventLocation = {
  name: string;
  href: string;
};

export type EventOpenTo = 'public' | 'selective' | 'invite-only';

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
  openTo: EventOpenTo;
  eventInterests?: string[];
};

type EventsState = {
  items: Event[];
};

const allEvents = events;

const initialState: EventsState = {
  items: allEvents as Event[],
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
});

export default eventsSlice.reducer;
