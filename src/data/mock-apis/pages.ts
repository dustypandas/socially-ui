import { sampleFullCommunity, sampleFullEvent, sampleFullInterest } from '../dummyData';
import type { CommunityPageData, EventPageData, InterestPageData } from '../types.ts';

export async function getCommunityPageData(): Promise<CommunityPageData> {
  return sampleFullCommunity;
}

export async function getEventPageData(): Promise<EventPageData> {
  return sampleFullEvent;
}

export async function getInterestPageData(): Promise<InterestPageData> {
  return {
    relatedEvents: sampleFullInterest.relatedEvents,
    relatedCommunities: sampleFullInterest.relatedCommunities,
  };
}
