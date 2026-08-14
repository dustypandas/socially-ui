import { MemberAvatar, MemberQuestion, MemberQuestionResponse } from "./member";

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

export type CommunityQuestion =
& MemberQuestion
& {
  isRequired?: boolean;
};

type CommunityEntryRule = string; // placeholder

export type CommunityEntryConditions = {
  questions: CommunityQuestion[];
  rules?: CommunityEntryRule[];
}

export type CommunityMemberRequest =
& MemberAvatar
& {
  basicDetails: MemberQuestionResponse[];
  otherDetails: MemberQuestionResponse[];
};

export type CommunityViewerStatus =
| 'visitor' // logged in, but not a member of the community
| 'pending' // requested to join community, not yet approved
| 'member' // is a member of the community
| 'rejected' // rejected to join community
| 'banned' // rejected or banned from community
| null; // not logged in