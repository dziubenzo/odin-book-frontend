import { useTheme } from 'styled-components';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '../constants';
import { useUserAndTheme } from '../hooks';
import { StyledCommentInputTop } from '../styles/PostDetailsPage.styled';
import Avatar from './Avatar';
import { moveCaretToEnd } from '../helpers';

type CommentInputTopProps = {
  commentFieldRef: React.RefObject<HTMLParagraphElement | null>;
  content: string;
  contentLength: number;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setContentLength: React.Dispatch<React.SetStateAction<number>>;
  handleSubmitCommentClick: () => Promise<void>;
};

function CommentInputTop({
  commentFieldRef,
  content,
  contentLength,
  setContent,
  setContentLength,
  handleSubmitCommentClick,
}: CommentInputTopProps) {
  const { user } = useUserAndTheme();
  const theme = useTheme();

  function handleCommentFieldInput(
    event: React.FormEvent<HTMLParagraphElement>,
  ) {
    event.preventDefault();
    if (event.currentTarget.textContent === null) return;
    // Prevent the field from going above MAX_COMMENT_LENGTH
    if (event.currentTarget.textContent.length > MAX_COMMENT_LENGTH) {
      event.currentTarget.textContent = content;
      // Move caret to the end of the field after replacing textContent
      return moveCaretToEnd(event.currentTarget);
    }
    setContent(event.currentTarget.textContent);
    // Make sure new lines do not count towards the character limit
    const textWithNoNewLines = event.currentTarget.textContent.replaceAll(
      '\n',
      '',
    );
    setContentLength(MAX_COMMENT_LENGTH - textWithNoNewLines.length);
  }

  // Submit comment on Enter key press
  // Insert a new line on Shift and Enter keys press
  function submitCommentOnEnter(
    event: React.KeyboardEvent<HTMLParagraphElement>,
  ) {
    // Prevent submitting with Enter on mobile devices
    if (document.body.clientWidth < parseInt(theme.mobile)) return;
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmitCommentClick();
    }
  }

  return (
    <StyledCommentInputTop $contentLength={content.length}>
      <Avatar object={user} size={36} type="user" />
      <p
        ref={commentFieldRef}
        className="comment-input-field"
        contentEditable="plaintext-only"
        data-testid="comment-input-field"
        onKeyDown={submitCommentOnEnter}
        onInput={handleCommentFieldInput}
      ></p>
      <p
        className={
          contentLength > MAX_COMMENT_LENGTH - MIN_COMMENT_LENGTH ||
          contentLength < 5
            ? 'comment-length warning'
            : 'comment-length'
        }
      >
        {contentLength}
      </p>
    </StyledCommentInputTop>
  );
}

export default CommentInputTop;
