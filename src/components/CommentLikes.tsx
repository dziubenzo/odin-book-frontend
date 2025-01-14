import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { useUserAndTheme } from '../hooks';
import { StyledCommentLikes } from '../styles/PostDetailsPage.styled';
import type { Comment } from '../types';

type CommentLikesProps = {
  comment: Comment;
  handleCommentLikeClick: (commentID: Comment['_id']) => Promise<void>;
  handleCommentDislikeClick: (commentID: Comment['_id']) => Promise<void>;
};

function CommentLikes({
  comment,
  handleCommentLikeClick,
  handleCommentDislikeClick,
}: CommentLikesProps) {
  const { user } = useUserAndTheme();
  const { _id, likes, dislikes } = comment;

  return (
    <StyledCommentLikes>
      <button
        className="like-icon"
        onClick={() => handleCommentLikeClick(_id)}
        aria-label="Like Comment Icon"
        title="Like Comment"
      >
        <FaArrowUp
          className={likes.includes(user._id) ? 'liked' : undefined}
          data-testid="up-arrow"
        />
      </button>
      <span className="likes-count">{likes.length - dislikes.length}</span>
      <button
        className="dislike-icon"
        onClick={() => handleCommentDislikeClick(_id)}
        aria-label="Dislike Comment Icon"
        title="Dislike Comment"
      >
        <FaArrowDown
          className={dislikes.includes(user._id) ? 'disliked' : undefined}
          data-testid="down-arrow"
        />
      </button>
    </StyledCommentLikes>
  );
}

export default CommentLikes;
