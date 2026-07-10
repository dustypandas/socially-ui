export type TimeFilter = 'today' | 'thisWeek' | 'nextWeek' | 'anytime';

export type OpenToFilter = 'any' | 'public' | 'selective' | 'inviteOnly';

export const TIME_FILTER_OPTIONS: { value: TimeFilter; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: 'thisWeek', label: 'This Week' },
  { value: 'nextWeek', label: 'Next Week' },
  { value: 'anytime', label: 'Anytime' },
];

export const TIME_FILTER_LABELS = Object.fromEntries(
  TIME_FILTER_OPTIONS.map(option => [option.value, option.label]),
) as Record<TimeFilter, string>;

export const OPEN_TO_FILTER_OPTIONS: { value: OpenToFilter; label: string }[] = [
  { value: 'any', label: 'Any' },
  { value: 'public', label: 'Public' },
  { value: 'selective', label: 'Selective' },
  { value: 'inviteOnly', label: 'Invite Only' },
];
