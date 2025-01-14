import { StyledPost } from '../styles/PostsPage.styled';
import type { Post as PostType } from '../types';
import PostBody from './PostBody';
import PostLikes from './PostLikes';

type PostProps = {
  post: PostType;
  handlePostLikeClick: (post: PostType) => Promise<void>;
  handlePostDislikeClick: (post: PostType) => Promise<void>;
};

function Post({
  post,
  handlePostLikeClick,
  handlePostDislikeClick,
}: PostProps) {
  return (
    <StyledPost>
      <PostLikes
        type="multiple-posts"
        post={post}
        handlePostLikeClick={handlePostLikeClick}
        handlePostDislikeClick={handlePostDislikeClick}
      />
      <PostBody post={post} />
    </StyledPost>
  );
}

export default Post;
