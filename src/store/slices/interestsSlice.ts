import { createSlice } from '@reduxjs/toolkit';
import { interests } from '../../data/dummyData.js';

export type Interest = {
  id: string;
  name: string;
  followersCount: number;
};

type InterestsState = {
  items: Interest[];
};

const initialState: InterestsState = {
  items: interests as Interest[],
};

export const interestsSlice = createSlice({
  name: 'interests',
  initialState,
  reducers: {},
});

export default interestsSlice.reducer;
