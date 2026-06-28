import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { interests } from '../../data/dummyData.js';

export type Interest = {
  id: string;
  name: string;
  category?: string;
  followerIds?: string[];
  followersCount?: number;
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
  reducers: {
    addInterest: (state, action: PayloadAction<Interest>) => {
      const nameLower = action.payload.name.toLowerCase();
      const exists = state.items.some(i => i.name.toLowerCase() === nameLower);
      if (!exists) {
        state.items.push({
          ...action.payload,
          category: action.payload.category ?? 'General',
          followerIds: action.payload.followerIds ?? [], // TODO include self id
          followersCount: action.payload.followersCount ?? 0,
        });
      }
    },
  },
});

export const { addInterest } = interestsSlice.actions;
export default interestsSlice.reducer;
