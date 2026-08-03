export type CommunityAvatar = {
  id: string;
  name: string;
  image: string;
  href: string;
  description: string;
};

export type CommunityBasic =
& CommunityAvatar
& {
  membersCount: number;
  rating: number;
  ratingCount: number;
  interests: string[];
};

export type Community =
& Omit<CommunityBasic, 'description'>
& {
  descriptionHtml: string;
};
