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
      <div
        className="like-icon-wrapper"
        onClick={() => handleCommentLikeClick(_id)}
        title="Like Comment"
      >
        <FaArrowUp
          className={likes.includes(user._id) ? 'like-icon liked' : 'like-icon'}
          data-testid="up-arrow"
        />
      </div>
      <span className="likes-count">{likes.length - dislikes.length}</span>
      <div
        className="dislike-icon-wrapper"
        onClick={() => handleCommentDislikeClick(_id)}
        title="Dislike Comment"
      >
        <FaArrowDown
          className={
            dislikes.includes(user._id)
              ? 'dislike-icon disliked'
              : 'dislike-icon'
          }
          data-testid="down-arrow"
        />
      </div>
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
