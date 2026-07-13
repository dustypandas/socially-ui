import type { EventBasic } from '../../types.ts';
import { OpenToFilter, TimeFilter } from '../global-helpers.ts';

export function matchesOpenToFilter(
  openTo: EventBasic['openTo'],
  filter: OpenToFilter,
): boolean {
  if (filter === 'any') return true;
  return openTo === filter;
}

function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function dayOffsetFromToday(date: Date, now: Date): number {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  return Math.floor((startOfDay(date).getTime() - startOfDay(now).getTime()) / MS_PER_DAY);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
  );
}

export function matchesTimeFilter(
  startTime: Date,
  filter: TimeFilter,
  now = new Date(),
): boolean {
  if (filter === 'anytime') return true;

  if (filter === 'today') {
    return isSameDay(startTime, now);
  }

  if (filter === 'thisWeek') {
    const dayOffset = dayOffsetFromToday(startTime, now);
    return dayOffset >= 0 && dayOffset <= 7;
  }

  if (filter === 'nextWeek') {
    const dayOffset = dayOffsetFromToday(startTime, now);
    return dayOffset >= 8 && dayOffset <= 14;
  }

  return false;
}

export function filterEvents(
  events: EventBasic[],
  searchQuery: string,
  timeFilter: TimeFilter,
  openToFilter: OpenToFilter,
  now = new Date(),
): EventBasic[] {
  const normalisedSearchQuery = searchQuery.trim().toLowerCase();

  return events.filter(event => {
    if (!matchesTimeFilter(event.startTime, timeFilter, now)) {
      return false;
    }

    if (!matchesOpenToFilter(event.openTo, openToFilter)) {
      return false;
    }

    if (!normalisedSearchQuery) {
      return true;
    }

    return (event.title.toLowerCase().includes(normalisedSearchQuery)
      // || !event.description.label.toLowerCase().includes(normalisedSearchQuery)
    );
  });
}
