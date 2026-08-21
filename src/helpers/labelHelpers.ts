import type { EventAttendees } from '@src/common-libs/types';

export function getAttendeesLabel(attendees: EventAttendees): string {
  const { count, avatars } = attendees;

  if (count <= avatars.length) {
    const names = avatars.slice(0, count).map(avatar => avatar.label);

    if (names.length === 1) {
      return `${names[0]} is going`;
    }
    if (names.length === 2) {
      return `${names[0]} and ${names[1]} are going`;
    }
    if (names.length === 3) {
      return `${names[0]}, ${names[1]} and ${names[2]} are going`;
    }

    const others = count - 2;
    return `${names[0]}, ${names[1]} and ${others} others are going`;
  }

  const hiddenCount = count - avatars.length;
  if (hiddenCount === 1) return '+1 other going';
  return `+${hiddenCount} others going`;
}
  
export function getEventTimelineLabel(startTime: Date) {
  const weekdayLabel = startTime.toLocaleDateString('en-US', {
    weekday: 'long',
  });

  const day = startTime.getDate();
  const monthLabel = startTime.toLocaleDateString('en-US', {
    month: 'short',
  });

  const yearLabel = startTime.toLocaleDateString('en-US', {
    year: 'numeric',
  });

  return {
    primaryLabel: `${weekdayLabel} ${day} ${monthLabel}`,
    yearLabel,
  };
}

export function getEventTimeLabel(startTime: Date) {
  return startTime
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .toLowerCase()
    .replace(/\s/g, '');
}

export function getDateAndTimeLabels(startTime: Date) {
  const dateLabel = startTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const timeLabel = startTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).toLowerCase().replace(/\s/g, '');

  return {
    dateLabel,
    timeLabel,
    datetimeLabel: `${dateLabel}, ${timeLabel}`,
  };
}

export function getReviewTimeLabel(date: Date, now = new Date()): string {
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 7) {
    const n = Math.max(1, diffDays);
    return n === 1 ? '1 day ago' : `${n} days ago`;
  }
  if (diffDays < 30) {
    const n = Math.max(1, Math.floor(diffDays / 7));
    return n === 1 ? '1 week ago' : `${n} weeks ago`;
  }
  if (diffDays < 365) {
    const n = Math.max(1, Math.floor(diffDays / 30));
    return n === 1 ? '1 month ago' : `${n} months ago`;
  }
  const n = Math.max(1, Math.floor(diffDays / 365));
  return n === 1 ? '1 year ago' : `${n} years ago`;
}

export function getUpcomingEventsSectionTitle(count: number): string {
  if (count === 0) {
    return 'No upcoming events';
  }
  const noun = count === 1 ? 'Event' : 'Events';
  return `${count} Upcoming ${noun}`;
}

export function getPastEventsSectionTitle(count: number, shouldUseExactValue?: boolean): string {
  if (count === 0) {
    return 'No past events';
  }
  const noun = count === 1 ? 'Event' : 'Events';
  const countLabel = shouldUseExactValue === true ? String(count) : getApproxCount(count);
  return `${countLabel} Past ${noun}`;
}

export function getReviewsSectionTitle(count: number, shouldUseExactValue?: boolean): string {
  if (count === 0) {
    return 'No reviews';
  }
  const noun = count === 1 ? 'Review' : 'Reviews';
  const countLabel = shouldUseExactValue === true ? String(count) : getApproxCount(count);
  return `${countLabel} ${noun}`;
}

export function getApproxCount(count: number): string {
  if (count < 10) {
    return String(count);
  }

  if (count < 100) {
    return `${Math.floor(count / 10) * 10}+`;
  }

  if (count < 1000) {
    return `${Math.floor(count / 100) * 100}+`;
  }

  return `${(count / 1000).toFixed(1)}k+`;
}