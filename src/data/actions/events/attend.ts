import { tempEventStatusesMap } from '../../stores/userData/index.ts';

export async function attendEvent(eventId: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  tempEventStatusesMap[eventId] = 'attending';
}
