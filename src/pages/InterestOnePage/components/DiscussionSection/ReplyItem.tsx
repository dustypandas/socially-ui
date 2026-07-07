import type { DiscussionReply } from '@src/store/slices/postsSlice.js';
import { formatRelativeTime, getMemberAvatarUrl, getMemberById } from './helpers.js';
import './reply-item.css';

type ReplyItemProps = {
  reply: DiscussionReply;
};

export function ReplyItem({ reply }: ReplyItemProps) {
  const author = getMemberById(reply.authorId);
  const avatarUrl = getMemberAvatarUrl(reply.authorId);

  return (
    <article className="discussion-reply">
      <img
        className="discussion-reply__avatar"
        src={avatarUrl}
        alt=""
      />
      <div className="discussion-reply__content">
        <div className="discussion-reply__meta">
          <span className="discussion-reply__author">
            {author?.name ?? 'Unknown member'}
          </span>
          <span className="discussion-reply__time">
            {formatRelativeTime(reply.createdAt)}
          </span>
        </div>
        <p className="discussion-reply__body">{reply.body}</p>
      </div>
    </article>
  );
}
