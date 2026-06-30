import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { spanishDiscussionPosts } from '../../data/dummyData.js';

export type DiscussionReply = {
  id: string;
  authorId: string;
  body: string;
  createdAt: string;
};

export type DiscussionPost = {
  id: string;
  interestId: string;
  authorId: string;
  body: string;
  createdAt: string;
  replies: DiscussionReply[];
};

type PostsState = {
  items: DiscussionPost[];
};

const initialState: PostsState = {
  items: spanishDiscussionPosts as DiscussionPost[],
};

type AddPostPayload = {
  interestId: string;
  authorId: string;
  body: string;
};

type AddReplyPayload = {
  postId: string;
  authorId: string;
  body: string;
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<AddPostPayload>) => {
      const { interestId, authorId, body } = action.payload;
      state.items.unshift({
        id: `post-${crypto.randomUUID()}`,
        interestId,
        authorId,
        body,
        createdAt: new Date().toISOString(),
        replies: [],
      });
    },
    addReply: (state, action: PayloadAction<AddReplyPayload>) => {
      const { postId, authorId, body } = action.payload;
      const post = state.items.find(item => item.id === postId);
      if (!post) return;

      post.replies.push({
        id: `reply-${crypto.randomUUID()}`,
        authorId,
        body,
        createdAt: new Date().toISOString(),
      });
    },
  },
});

export const { addPost, addReply } = postsSlice.actions;
export default postsSlice.reducer;
