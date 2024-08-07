import PropTypes from 'prop-types';
import { StyledCommentInputTop } from '../styles/PostDetailsPage.styled';
import { disableEnter, MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '../helpers';
import Avatar from './Avatar';

function CommentInputTop({
  user,
  commentFieldRef,
  content,
  contentLength,
  setContent,
  setContentLength,
}) {
  function handleCommentFieldInput(event) {
    // Prevent the field from going above MAX_COMMENT_LENGTH
    if (event.currentTarget.textContent.length > MAX_COMMENT_LENGTH) {
      return (event.currentTarget.textContent = content);
    }
    setContent(event.currentTarget.textContent);
    setContentLength(
      MAX_COMMENT_LENGTH - event.currentTarget.textContent.length,
    );
  }

  return (
    <StyledCommentInputTop $contentLength={content.length}>
      <Avatar object={user} size={36} />
      <p
        ref={commentFieldRef}
        className="comment-input-field"
        contentEditable
        data-testid="comment-input-field"
        onKeyDown={disableEnter}
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

CommentInputTop.propTypes = {
  user: PropTypes.object,
  commentFieldRef: PropTypes.object,
  content: PropTypes.string,
  contentLength: PropTypes.number,
  setContent: PropTypes.func,
  setContentLength: PropTypes.func,
};

export default CommentInputTop;
