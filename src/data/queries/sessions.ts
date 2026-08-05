import type { MemberProfile, MemberQuestionResponse } from '@src/common-libs/types';
import {
  sessionState,
  SessionUser,
  sessionUser,
  sessionUserQuestionResponses,
} from '../stores/userData/index.ts';

export async function getSessionUser(): Promise<MemberProfile | null> {
  if (!sessionState.isLoggedIn) return null;

  return toMemberProfile(sessionUser);
}

export async function getSessionUserQuestionResponses(): Promise<MemberQuestionResponse[]> {
  if (!sessionState.isLoggedIn) {
    return [];
  }

  return sessionUserQuestionResponses;
}

function toMemberProfile(user: SessionUser): MemberProfile {
  const {
    id,
    label,
    image,
    href,
    lat,
    lng,
    firstName,
    lastName,
    city,
    inCurrCitySince,
    prevCountries,
    livingNear,
  } = user;

  return {
    id,
    label,
    image,
    href,
    lat,
    lng,
    firstName,
    lastName,
    city,
    inCurrCitySince,
    prevCountries,
    livingNear,
  };
}