// global singleton state, for managing homepage entry animation

let shouldPlayEntry = true;

export function getShouldPlayEntry(): boolean {
  return shouldPlayEntry;
}

export function markRouteLoaded(): void {
  shouldPlayEntry = false;
}
