import { useMemo } from 'react';
import { mockCurrentUser } from '../../../../data/dummyData.js';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { addPost, addReply } from '../../../../store/slices/postsSlice.js';
import { DiscussionComposer } from './DiscussionComposer.js';
import { PostCard } from './PostCard.js';
import './discussion-section.css';

type DiscussionSectionProps = {
  interestId: string;
  isEmpty?: boolean;
};

export function DiscussionSection({ interestId, isEmpty = false }: DiscussionSectionProps) {
  const dispatch = useAppDispatch();
  const allPosts = useAppSelector(state => state.posts.items);

  const posts = useMemo(() => {
    if (isEmpty) return [];
    return allPosts.filter(post => post.interestId === interestId);
  }, [allPosts, interestId, isEmpty]);

  const handleAddPost = (body: string) => {
    dispatch(addPost({
      interestId,
      authorId: mockCurrentUser.id,
      body,
    }));
  };

  const handleAddReply = (postId: string, body: string) => {
    dispatch(addReply({
      postId,
      authorId: mockCurrentUser.id,
      body,
    }));
  };

  return (
    <section className="discussion-section">
      <div className="discussion-section__composer">
        <DiscussionComposer
          placeholder="Questions & Ideas..."
          submitLabel="Post"
          onSubmit={handleAddPost}
        />
      </div>

      {posts.length === 0 ? (
        <p className="discussion-section__empty">No discussions yet</p>
      ) : (
        <div className="discussion-section__list">
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onReplySubmit={body => handleAddReply(post.id, body)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
