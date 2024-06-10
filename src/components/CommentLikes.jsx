import PropTypes from 'prop-types';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { StyledCommentLikes } from '../styles/PostDetailsPage.styled';

function CommentLikes({ comment, user }) {
  const { likes, dislikes } = comment;

  return (
    <StyledCommentLikes>
      <div className="like-icon-wrapper">
        <FaArrowUp
          className={likes.includes(user._id) ? 'like-icon liked' : 'like-icon'}
          data-testid="up-arrow"
        />
      </div>
      <span className="likes-count">{likes.length - dislikes.length}</span>
      <div className="dislike-icon-wrapper">
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
};

export default CommentLikes;
