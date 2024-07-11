import PropTypes from 'prop-types';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { StyledCommentLikes } from '../styles/PostDetailsPage.styled';

function CommentLikes({
  comment,
  user,
  handleCommentLikeClick,
  handleCommentDislikeClick,
}) {
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

CommentLikes.propTypes = {
  comment: PropTypes.object,
  user: PropTypes.object,
  handleCommentLikeClick: PropTypes.func,
  handleCommentDislikeClick: PropTypes.func,
};

export default CommentLikes;
