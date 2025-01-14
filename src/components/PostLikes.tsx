import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { useUserAndTheme } from '../hooks';
import { StyledPostLikes } from '../styles/PostsPage.styled';
import type { DetailedPost, Post } from '../types';

type SinglePost = {
  type: 'single-post';
  post: DetailedPost;
  handlePostLikeClick: () => Promise<void>;
  handlePostDislikeClick: () => Promise<void>;
};

type MultiplePosts = {
  type: 'multiple-posts';
  post: Post;
  handlePostLikeClick: (post: Post) => Promise<void>;
  handlePostDislikeClick: (post: Post) => Promise<void>;
};

type PostLikesProps = SinglePost | MultiplePosts;

function PostLikes({
  type,
  post,
  handlePostLikeClick,
  handlePostDislikeClick,
}: PostLikesProps) {
  const { user } = useUserAndTheme();
  const { likes, dislikes } = post;

  return (
    <StyledPostLikes>
      <button
        className="like-icon"
        aria-label="Like Post Icon"
        title="Like Post"
        onClick={() =>
          type === 'single-post'
            ? handlePostLikeClick()
            : handlePostLikeClick(post)
        }
      >
        <FaArrowUp
          className={likes.includes(user._id) ? 'liked' : undefined}
          data-testid="up-arrow"
        />
      </button>
      <p className="likes-count" data-testid="likes-count">
        {likes.length - dislikes.length}
      </p>
      <button
        className="dislike-icon"
        aria-label="Dislike Post Icon"
        title="Dislike Post"
        onClick={() =>
          type === 'single-post'
            ? handlePostDislikeClick()
            : handlePostDislikeClick(post)
        }
      >
        <FaArrowDown
          className={dislikes.includes(user._id) ? 'disliked' : undefined}
          data-testid="down-arrow"
        />
      </button>
    </StyledPostLikes>
  );
}

export default PostLikes;
