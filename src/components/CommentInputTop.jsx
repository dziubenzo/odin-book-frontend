import PropTypes from 'prop-types';
import { StyledCommentInputTop } from '../styles/PostDetailsPage.styled';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '../helpers';

function CommentInputTop({
  commentFieldRef,
  content,
  contentLength,
  setContent,
  setContentLength,
}) {
  // Prevent Enter from inserting a <br> tag
  function disableEnter(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

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
    <StyledCommentInputTop>
      <div className="avatar">
        <div className="avatar-placeholder"></div>
      </div>
      <p
        ref={commentFieldRef}
        className="comment-input-field"
        contentEditable
        onKeyDown={disableEnter}
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

CommentInputTop.propTypes = {
  commentFieldRef: PropTypes.object,
  content: PropTypes.string,
  contentLength: PropTypes.number,
  setContent: PropTypes.func,
  setContentLength: PropTypes.func,
};

export default CommentInputTop;
