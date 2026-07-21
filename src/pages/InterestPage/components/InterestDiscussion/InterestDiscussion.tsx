// import { useMemo } from 'react';
// // import { currentUser } from '@src/data';
// import { addPost, addReply } from '@src/store/slices/postsSlice.js';
// import { DiscussionComposer } from './DiscussionComposer.js';
// import { PostCard } from './PostCard.js';
// import './interest-discussion.css';

// type InterestDiscussionProps = {
//   interestName: string;
//   isEmpty?: boolean;
// };

// export function InterestDiscussion({ interestName, isEmpty = false }: InterestDiscussionProps) {

//   const posts = useMemo(() => {
//     if (isEmpty) return [];
//     return allPosts.filter(post => post.interestName === interestName);
//   }, [allPosts, interestName, isEmpty]);

//   const handleAddPost = (body: string) => {
//     dispatch(addPost({
//       interestName,
//       authorId: currentUser.id,
//       body,
//     }));
//   };

//   const handleAddReply = (postId: string, body: string) => {
//     dispatch(addReply({
//       postId,
//       authorId: currentUser.id,
//       body,
//     }));
//   };

//   return (
//     <section className="interest-discussion">
//       <div className="interest-discussion__composer">
//         <DiscussionComposer
//           placeholder="Questions & Ideas..."
//           submitLabel="Post"
//           onSubmit={handleAddPost}
//         />
//       </div>

//       {posts.length === 0 ? (
//         <div className="interest-discussion__empty">No discussions yet</div>
//       ) : (
//         <div className="interest-discussion__list">
//           {posts.map(post => (
//             <PostCard
//               key={post.id}
//               post={post}
//               onReplySubmit={body => handleAddReply(post.id, body)}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }
