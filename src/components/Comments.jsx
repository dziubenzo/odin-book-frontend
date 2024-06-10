import PropTypes from 'prop-types';
import { StyledComments } from '../styles/PostDetailsPage.styled';
import Comment from './Comment';

function Comments({ comments }) {
  function renderComments() {
    return comments.map((comment) => {
      return <Comment key={comment._id} comment={comment} />;
    });
  }

  return (
    <StyledComments>
      {renderComments()}
    </StyledComments>
  );
}

Comments.propTypes = {
  comments: PropTypes.array,
};

export default Comments;
