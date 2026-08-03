// export type DiscussionReply = {
//   id: string;
//   authorId: string;
//   body: string;
//   createdAt: string;
// };

// export type DiscussionPost = {
//   id: string;
//   interestName: string;
//   authorId: string;
//   body: string;
//   createdAt: string;
//   replies: DiscussionReply[];
// };

export type InterestBasic = {
  label: string;
};

export type Interest =
InterestBasic & {
  category?: string;
  followerIds?: string[];
};

export type InterestCategoryGroup = {
  category: string;
  items: Interest[];
};

export type HomeProfilePopularInterest = Interest & {
  newFollowersCount?: number;
};
