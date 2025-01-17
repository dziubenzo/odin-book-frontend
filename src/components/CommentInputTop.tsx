import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '../constants';
import { useUserAndTheme } from '../hooks';
import { StyledCommentInputTop } from '../styles/PostDetailsPage.styled';
import Avatar from './Avatar';

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

  function handleCommentFieldInput(
    event: React.FormEvent<HTMLParagraphElement>,
  ) {
    if (!event.currentTarget.textContent) return;
    // Prevent the field from going above MAX_COMMENT_LENGTH
    if (event.currentTarget.textContent.length > MAX_COMMENT_LENGTH) {
      return (event.currentTarget.textContent = content);
    }
    setContent(event.currentTarget.textContent);
    setContentLength(
      MAX_COMMENT_LENGTH - event.currentTarget.textContent.length,
    );
  }

  function submitCommentOnEnter(
    event: React.KeyboardEvent<HTMLParagraphElement>,
  ) {
    if (event.key === 'Enter') {
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
        contentEditable
        data-testid="comment-input-field"
        onKeyDown={submitCommentOnEnter}
        onInput={handleCommentFieldInput}
        onPaste={(event) => event.preventDefault()}
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
