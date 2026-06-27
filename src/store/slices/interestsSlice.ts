import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { interests } from '../../data/dummyData.js';

export type Interest = {
  id: string;
  name: string;
  followersCount: number;
  category?: string;
  followerIds?: string[];
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
          followerIds: action.payload.followerIds ?? [],
        });
      }
    },
  },
});

export const { addInterest } = interestsSlice.actions;
export default interestsSlice.reducer;
