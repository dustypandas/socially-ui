export type EventDateFormat = 'home' | 'community';

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

function toLocalIso(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
}

function formatShortTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).toLowerCase().replace(/\s/g, '');
}

export class EventDateHelper {
  private readonly date: Date;

  constructor(
    startTime: number,
    private readonly format: EventDateFormat = 'home',
  ) {
    this.date = new Date(startTime);
  }

  get dateLabel(): string {
    if (this.format === 'community') {
      return this.date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }

    return this.date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }

  get timeLabel(): string {
    const shortTime = formatShortTime(this.date);

    if (this.format === 'community') {
      const weekday = this.date.toLocaleDateString('en-US', { weekday: 'long' });
      return `${weekday}, ${shortTime}`;
    }

    return shortTime;
  }

  get startsAt(): string {
    return toLocalIso(this.date);
  }

  get dateTimeLabel(): string {
    return `${this.dateLabel}, ${this.timeLabel}`;
  }
}
