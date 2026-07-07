import { useState } from 'react';
import IconMessage from '@src/assets/icon-message-outline.svg?react';
import IconStar from '@src/assets/icon-star.svg?react';
import IconHeartOutline from '@src/assets/icon-heart-outline-temp.svg?react';
import type { DiscussionPost } from '@src/store/slices/postsSlice.js';
import { DiscussionComposer } from './DiscussionComposer.js';
import { ReplyItem } from './ReplyItem.js';
import { formatRelativeTime, getMemberAvatarUrl, getMemberById } from './helpers.js';
import './post-card.css';

type PostCardProps = {
  post: DiscussionPost;
  onReplySubmit: (body: string) => void;
};

export function PostCard({ post, onReplySubmit }: PostCardProps) {
  const author = getMemberById(post.authorId);
  const avatarUrl = getMemberAvatarUrl(post.authorId);
  const replyCount = post.replies.length;
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // const showReplyBox = replyCount === 0 || commentsExpanded;
  const showReplies = replyCount > 0 && commentsExpanded;

  const handleLikeClick = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(count => Math.max(0, count - 1));
      return;
    }

    setIsLiked(true);
    setLikeCount(count => count + 1);
  };

  const handleCommentsClick = () => {
    if (replyCount === 0) return;
    setCommentsExpanded(expanded => !expanded);
  };

  const handleReplySubmit = (body: string) => {
    onReplySubmit(body);
    setCommentsExpanded(true);
  };

  return (
    <article className="discussion-post">
      <div className="discussion-post__header">
        <img
          className="discussion-post__avatar"
          src={avatarUrl}
          alt=""
        />
        <div className="discussion-post__meta">
          <span className="discussion-post__author">
            {author?.name ?? 'Unknown member'}
          </span>
          <span className="discussion-post__time">
            {formatRelativeTime(post.createdAt)}
          </span>
        </div>
      </div>

      <p className="discussion-post__body">{post.body}</p>

      <div className="discussion-post__stats">
        <button
          type="button"
          className={[
            'discussion-post__stat',
            isLiked && 'discussion-post__stat--active',
          ].filter(Boolean).join(' ')}
          onClick={handleLikeClick}
        >
          {isLiked ? (
            <IconStar className="discussion-post__stat-icon" />
          ) : (
            <IconHeartOutline className="discussion-post__stat-icon" />
          )}
          <span className="discussion-post__stat-count">{likeCount}</span>
        </button>

        <button
          type="button"
          className={[
            'discussion-post__stat',
            commentsExpanded && replyCount > 0 && 'discussion-post__stat--active',
          ].filter(Boolean).join(' ')}
          onClick={handleCommentsClick}
          disabled={replyCount === 0}
        >
          <IconMessage className="discussion-post__stat-icon" />
          <span className="discussion-post__stat-count">{replyCount}</span>
        </button>
      </div>

      {showReplies && (
        <>
          <div className="discussion-post__divider" />
          <div className="discussion-post__replies">
            {post.replies.map(reply => (
              <ReplyItem key={reply.id} reply={reply} />
            ))}
          </div>
        </>
      )}

      <div className="discussion-post__divider" />
      <div className="discussion-post__reply-box">
        <DiscussionComposer
          placeholder="reply..."
          submitLabel="Send"
          onSubmit={handleReplySubmit}
        />
      </div>
    </article>
  );
}
