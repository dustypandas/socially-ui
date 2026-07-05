import type { Interest } from '../../store/slices/interestsSlice';
import type { Event } from '../../store/slices/eventsSlice';

export type TimeFilter = 'today' | 'thisWeek' | 'nextWeek' | 'anytime';

export const TIME_FILTER_OPTIONS: { value: TimeFilter; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: 'thisWeek', label: 'This Week' },
  { value: 'nextWeek', label: 'Next Week' },
  { value: 'anytime', label: 'Anytime' },
];

const TIME_FILTER_LABELS = Object.fromEntries(
  TIME_FILTER_OPTIONS.map(option => [option.value, option.label]),
) as Record<TimeFilter, string>;

export function getTimeFilterLabel(filter: TimeFilter): string {
  return TIME_FILTER_LABELS[filter];
}

function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function startOfWeek(date: Date): Date {
  const result = startOfDay(date);
  const day = result.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  result.setDate(result.getDate() + diff);
  return result;
}

function endOfWeek(date: Date): Date {
  const result = startOfWeek(date);
  result.setDate(result.getDate() + 6);
  result.setHours(23, 59, 59, 999);
  return result;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
  );
}

export function matchesTimeFilter(
  startsAt: string,
  filter: TimeFilter,
  now = new Date(),
): boolean {
  if (filter === 'anytime') return true;

  const eventDate = new Date(startsAt);

  if (filter === 'today') {
    return isSameDay(eventDate, now);
  }

  if (filter === 'thisWeek') {
    const weekStart = startOfWeek(now);
    const weekEnd = endOfWeek(now);
    return eventDate >= weekStart && eventDate <= weekEnd;
  }

  const nextWeekStart = startOfWeek(now);
  nextWeekStart.setDate(nextWeekStart.getDate() + 7);
  const nextWeekEnd = endOfWeek(nextWeekStart);
  return eventDate >= nextWeekStart && eventDate <= nextWeekEnd;
}

function getMatchingInterestIds(interests: Interest[], query: string): Set<string> {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return new Set();

  return new Set(
    interests
      .filter(interest => interest.name.toLowerCase().includes(normalizedQuery))
      .map(interest => interest.id),
  );
}

export function filterEvents(
  events: Event[],
  interests: Interest[],
  interestQuery: string,
  timeFilter: TimeFilter,
  now = new Date(),
): Event[] {
  const matchingInterestIds = getMatchingInterestIds(interests, interestQuery);
  const hasInterestFilter = interestQuery.trim().length > 0;

  return events.filter(event => {
    if (!matchesTimeFilter(event.startsAt, timeFilter, now)) {
      return false;
    }

    if (!hasInterestFilter) {
      return true;
    }

    if (!event.interestIds?.length) {
      return false;
    }

    return event.interestIds.some(id => matchingInterestIds.has(id));
  });
}
