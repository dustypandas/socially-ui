import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { interests } from '../../data/dummyData.js';

export type RelatedLink = {
  label: string;
  href: string;
};

export type Interest = {
  id: string;
  name: string;
  category?: string;
  followerIds?: string[];
  followersCount?: number;
  relatedLinks?: RelatedLink[];
};

type InterestsState = {
  items: Interest[];
};

type AddRelatedLinkPayload = {
  interestId: string;
  label: string;
  href: string;
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
    addRelatedLink: (state, action: PayloadAction<AddRelatedLinkPayload>) => {
      const { interestId, label, href } = action.payload;
      const interest = state.items.find(item => item.id === interestId);
      if (!interest) return;

      if (!interest.relatedLinks) {
        interest.relatedLinks = [];
      }

      interest.relatedLinks.push({ label, href });
    },
  },
});

export const { addInterest, addRelatedLink } = interestsSlice.actions;
export default interestsSlice.reducer;
