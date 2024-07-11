import PropTypes from 'prop-types';
import { StyledComments } from '../styles/PostDetailsPage.styled';
import Comment from './Comment';
import NoCommentsSection from './NoCommentsSection';

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

  return (
    <StyledComments>
      <h2>Comments ({comments.length})</h2>
      {renderComments()}
      {comments.length === 0 && <NoCommentsSection />}
    </StyledComments>
  );
}

Comments.propTypes = {
  comments: PropTypes.array,
  handleCommentLikeClick: PropTypes.func,
  handleCommentDislikeClick: PropTypes.func,
};

export default Comments;
