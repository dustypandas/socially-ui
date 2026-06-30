
export function getAttendeesLabel(total: number, visibleCount: number): string {
  const hiddenCount = total - visibleCount;
  if (hiddenCount <= 0) return 'going';
  if (hiddenCount === 1) return '+1 other going';
  return `+${hiddenCount} others going`;
}
  