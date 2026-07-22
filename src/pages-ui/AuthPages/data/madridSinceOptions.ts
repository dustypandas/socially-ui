export function getMadridSinceOptions(now = new Date()) {
  const currentYear = now.getFullYear();
  const years = Array.from({ length: 21 }, (_, index) => String(currentYear - index));

  return [...years, 'eons ago'];
}
