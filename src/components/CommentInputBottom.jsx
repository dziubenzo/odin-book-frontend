import PropTypes from 'prop-types';
import {
  StyledCommentInputBottom,
  StyledSubmitButton,
} from '../styles/PostDetailsPage.styled';
import { RiErrorWarningLine } from 'react-icons/ri';

function CommentInputBottom({
  handleSubmitCommentClick,
  inProgress,
  isSubmitted,
  commentError,
}) {
  return (
    <StyledCommentInputBottom>
      <StyledSubmitButton onClick={handleSubmitCommentClick}>
        {isSubmitted ? 'Submitted!' : inProgress ? 'Submitting...' : 'Submit'}
      </StyledSubmitButton>
      {commentError && (
        <>
          <div className="error-message-wrapper">
            <RiErrorWarningLine />
            <p className="error-message">{commentError}</p>
          </div>
        </>
      )}
    </StyledCommentInputBottom>
  );
}

CommentInputBottom.propTypes = {
  handleSubmitCommentClick: PropTypes.func,
  inProgress: PropTypes.bool,
  isSubmitted: PropTypes.bool,
  commentError: PropTypes.string,
};

export default CommentInputBottom;
