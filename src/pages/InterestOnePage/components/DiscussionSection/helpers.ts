import { memberAvatarUrls, memberFollowers } from '@src/data/dummyData.js';

export function getMemberById(id: string) {
  return memberFollowers.find(member => member.id === id);
}

export function getMemberAvatarUrl(memberId: string): string {
  let seed = 0;
  for (let i = 0; i < memberId.length; i += 1) {
    seed = (seed * 31 + memberId.charCodeAt(i)) | 0;
  }

  const index = (seed >>> 0) % memberAvatarUrls.length;
  return memberAvatarUrls[index];
}

export function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
