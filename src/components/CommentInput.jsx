import PropTypes from 'prop-types';
import {
  StyledCommentInput,
  StyledSubmitButton,
} from '../styles/PostDetailsPage.styled';
import { useRef, useState } from 'react';

function CommentInput() {
  const MAX_COMMENT_LENGTH = 320;
  const commentFieldRef = useRef(null);
  const [content, setContent] = useState('');
  const [contentLength, setContentLength] = useState(MAX_COMMENT_LENGTH);

  // Prevent Enter from inserting a br tag
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
    <StyledCommentInput>
      <h3>New Comment</h3>
      <div className="top-section">
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
            contentLength > 317 || contentLength < 5
              ? 'comment-length warning'
              : 'comment-length'
          }
        >
          {contentLength}
        </p>
      </div>
      <div className="bottom-section">
        <StyledSubmitButton>Submit</StyledSubmitButton>
        <hr />
      </div>
    </StyledCommentInput>
  );
}

CommentInput.propTypes = {
  user: PropTypes.object,
};

export default CommentInput;
