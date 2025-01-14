import { RiErrorWarningLine } from 'react-icons/ri';
import {
  StyledCommentInputBottom,
  StyledSubmitButton,
} from '../styles/PostDetailsPage.styled';

type CommentInputBottomProps = {
  handleSubmitCommentClick: () => Promise<void>;
  inProgress: boolean;
  isSubmitted: boolean;
  commentError: string;
};

function CommentInputBottom({
  handleSubmitCommentClick,
  inProgress,
  isSubmitted,
  commentError,
}: CommentInputBottomProps) {
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

export default CommentInputBottom;
