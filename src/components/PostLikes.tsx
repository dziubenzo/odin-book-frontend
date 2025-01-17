import { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { SyncLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
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

type PostLikesProps = { inProgress: boolean } & (SinglePost | MultiplePosts);

function PostLikes({
  type,
  post,
  handlePostLikeClick,
  handlePostDislikeClick,
  inProgress,
}: PostLikesProps) {
  const { user } = useUserAndTheme();
  const theme = useTheme();
  const { likes, dislikes } = post;

  const [arrowClicked, setArrowClicked] = useState<'like' | 'dislike' | null>(
    null,
  );

  // Reset arrow click after the action of liking/disliking is completed
  useEffect(() => {
    if (!inProgress) setArrowClicked(null);
  }, [inProgress]);

  function handleArrowClick(arrow: 'like' | 'dislike') {
    if (arrow === 'like') {
      if (type === 'single-post') handlePostLikeClick();
      else handlePostLikeClick(post);

      if (!inProgress) setArrowClicked('like');
    } else {
      if (type === 'single-post') handlePostDislikeClick();
      else handlePostDislikeClick(post);

      if (!inProgress) setArrowClicked('dislike');
    }
  }

  return (
    <StyledPostLikes>
      <button
        className="like-icon"
        aria-label="Like Post Icon"
        title="Like Post"
        onClick={() => handleArrowClick('like')}
      >
        {inProgress && arrowClicked === 'like' ? (
          <SyncLoader
            className="loader"
            size={6}
            color={theme.colours.primary}
            speedMultiplier={0.8}
          />
        ) : (
          <FaArrowUp
            className={likes.includes(user._id) ? 'liked' : undefined}
            data-testid="up-arrow"
          />
        )}
      </button>
      <p className="likes-count" data-testid="likes-count">
        {likes.length - dislikes.length}
      </p>
      <button
        className="dislike-icon"
        aria-label="Dislike Post Icon"
        title="Dislike Post"
        onClick={() => handleArrowClick('dislike')}
      >
        {inProgress && arrowClicked === 'dislike' ? (
          <SyncLoader
            className="loader"
            size={6}
            color={theme.colours.primary}
            speedMultiplier={0.8}
          />
        ) : (
          <FaArrowDown
            className={dislikes.includes(user._id) ? 'disliked' : undefined}
            data-testid="down-arrow"
          />
        )}
      </button>
    </StyledPostLikes>
  );
}

export default PostLikes;
