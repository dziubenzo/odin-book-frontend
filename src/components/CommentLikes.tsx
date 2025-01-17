import { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { SyncLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import { useUserAndTheme } from '../hooks';
import { StyledCommentLikes } from '../styles/PostDetailsPage.styled';
import type { Comment } from '../types';

type CommentLikesProps = {
  comment: Comment;
  handleCommentLikeClick: (commentID: Comment['_id']) => Promise<void>;
  handleCommentDislikeClick: (commentID: Comment['_id']) => Promise<void>;
  inProgress: boolean;
};

function CommentLikes({
  comment,
  handleCommentLikeClick,
  handleCommentDislikeClick,
  inProgress,
}: CommentLikesProps) {
  const { user } = useUserAndTheme();
  const theme = useTheme();
  const { _id, likes, dislikes } = comment;

  const [arrowClicked, setArrowClicked] = useState<'like' | 'dislike' | null>(
    null,
  );

  // Reset arrow click after the action of liking/disliking is completed
  useEffect(() => {
    if (!inProgress) setArrowClicked(null);
  }, [inProgress]);

  function handleArrowClick(arrow: 'like' | 'dislike') {
    if (arrow === 'like') {
      handleCommentLikeClick(_id);
      if (!inProgress) setArrowClicked('like');
    } else {
      handleCommentDislikeClick(_id);
      if (!inProgress) setArrowClicked('dislike');
    }
  }

  return (
    <StyledCommentLikes>
      <button
        className="like-icon"
        onClick={() => handleArrowClick('like')}
        aria-label="Like Comment Icon"
        title="Like Comment"
      >
        {inProgress && arrowClicked === 'like' ? (
          <SyncLoader
            className="loader"
            size={4}
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
      <span className="likes-count">{likes.length - dislikes.length}</span>
      <button
        className="dislike-icon"
        onClick={() => handleArrowClick('dislike')}
        aria-label="Dislike Comment Icon"
        title="Dislike Comment"
      >
        {inProgress && arrowClicked === 'dislike' ? (
          <SyncLoader
            className="loader"
            size={4}
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
    </StyledCommentLikes>
  );
}

export default CommentLikes;
