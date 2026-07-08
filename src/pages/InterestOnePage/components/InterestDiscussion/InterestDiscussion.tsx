import { useMemo } from 'react';
import { mockCurrentUser } from '@src/data/dummyData.js';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { addPost, addReply } from '@src/store/slices/postsSlice.js';
import { DiscussionComposer } from './DiscussionComposer.js';
import { PostCard } from './PostCard.js';
import './interest-discussion.css';

type InterestDiscussionProps = {
  interestId: string;
  isEmpty?: boolean;
};

export function InterestDiscussion({ interestId, isEmpty = false }: InterestDiscussionProps) {
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
    <section className="interest-discussion">
      <div className="interest-discussion__composer">
        <DiscussionComposer
          placeholder="Questions & Ideas..."
          submitLabel="Post"
          onSubmit={handleAddPost}
        />
      </div>

      {posts.length === 0 ? (
        <p className="interest-discussion__empty">No discussions yet</p>
      ) : (
        <div className="interest-discussion__list">
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
