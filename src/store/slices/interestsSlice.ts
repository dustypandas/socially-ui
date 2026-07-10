
export type RelatedLink = {
  label: string;
  href: string;
};

export type Interest = {
  name: string;
  category?: string;
  followerIds?: string[];
  relatedLinks?: RelatedLink[];
};

type InterestsState = {
  items: Interest[];
};

type AddRelatedLinkPayload = {
  interestName: string;
  label: string;
  href: string;
};

// const initialState: InterestsState = {
//   items: interests as Interest[],
// };

// export const interestsSlice = createSlice({
//   name: 'interests',
//   initialState,
//   reducers: {
//     addInterest: (state, action: PayloadAction<Interest>) => {
//       const nameLower = action.payload.name.toLowerCase();
//       const exists = state.items.some(i => i.name.toLowerCase() === nameLower);
//       if (!exists) {
//         state.items.push({
//           ...action.payload,
//           category: action.payload.category ?? 'General',
//           followerIds: action.payload.followerIds ?? [], // TODO include self id
//         });
//       }
//     },
//     addRelatedLink: (state, action: PayloadAction<AddRelatedLinkPayload>) => {
//       const { interestName, label, href } = action.payload;
//       const interest = state.items.find(item => item.name === interestName);
//       if (!interest) return;

//       if (!interest.relatedLinks) {
//         interest.relatedLinks = [];
//       }

//       interest.relatedLinks.push({ label, href });
//     },
//   },
// });

// export const { addInterest, addRelatedLink } = interestsSlice.actions;
// export default interestsSlice.reducer;
