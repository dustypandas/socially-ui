export function getDateAndTimeLabels(startTime: number) {
  const date = new Date(startTime);

  const dateLabel = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const timeLabel = date.toLocaleTimeString('en-US', {
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