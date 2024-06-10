import PropTypes from 'prop-types';
import { StyledComments } from '../styles/PostDetailsPage.styled';
import Comment from './Comment';

function Comments({
  comments,
  handleCommentLikeClick,
  handleCommentDislikeClick,
}) {
  function renderComments() {
    return comments.map((comment) => {
      return (
        <Comment
          key={comment._id}
          comment={comment}
          handleCommentLikeClick={handleCommentLikeClick}
          handleCommentDislikeClick={handleCommentDislikeClick}
        />
      );
    });
  }

  return <StyledComments>{renderComments()}</StyledComments>;
}

Comments.propTypes = {
  comments: PropTypes.array,
  handleCommentLikeClick: PropTypes.func,
  handleCommentDislikeClick: PropTypes.func,
};

export default Comments;
