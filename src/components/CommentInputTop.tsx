import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '../constants';
import { isMobile, moveCaretToEnd } from '../helpers';
import { useUserAndTheme } from '../hooks';
import { StyledCommentInputTop } from '../styles/PostDetailsPage.styled';
import Avatar from './Avatar';

type CommentInputTopProps = {
  commentFieldRef: React.RefObject<HTMLTextAreaElement | null>;
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

  function handleCommentFieldInput(
    event: React.FormEvent<HTMLTextAreaElement>,
  ) {
    event.preventDefault();
    if (event.currentTarget.value === null) return;
    // Make sure new lines do not count towards the character limit
    const textWithNoNewLines = event.currentTarget.value.replaceAll('\n', '');
    // Prevent the field from going above MAX_COMMENT_LENGTH
    if (textWithNoNewLines.length > MAX_COMMENT_LENGTH) {
      event.currentTarget.value = content;
      // Move caret to the end of the field
      return moveCaretToEnd(event.currentTarget);
    }
    setContent(event.currentTarget.value);
    setContentLength(MAX_COMMENT_LENGTH - textWithNoNewLines.length);
  }

  // Submit comment on Enter key press
  // Insert a new line on Shift and Enter keys press
  function submitCommentOnEnter(
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) {
    // Prevent submitting with Enter on mobile devices
    if (isMobile()) return;
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmitCommentClick();
    }
  }

  return (
    <StyledCommentInputTop $contentLength={content.length}>
      <Avatar object={user} size={36} type="user" />
      <textarea
        ref={commentFieldRef}
        rows={isMobile() ? 6 : 4}
        className="comment-input-field"
        onKeyDown={submitCommentOnEnter}
        onInput={handleCommentFieldInput}
        placeholder={
          isMobile()
            ? undefined
            : '1. Press Shift+Enter to insert a new line\n2. Press Enter to send your comment'
        }
      ></textarea>
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
