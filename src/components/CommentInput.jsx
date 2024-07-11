import PropTypes from 'prop-types';
import { StyledCommentInput } from '../styles/PostDetailsPage.styled';
import { useRef, useState } from 'react';
import { createComment } from '../helpers';
import { MAX_COMMENT_LENGTH } from '../helpers';
import CommentInputTop from './CommentInputTop';
import CommentInputBottom from './CommentInputBottom';

function CommentInput({ user, post, setPost }) {
  const commentFieldRef = useRef(null);

  const [content, setContent] = useState('');
  const [contentLength, setContentLength] = useState(MAX_COMMENT_LENGTH);
  const [commentError, setCommentError] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmitCommentClick() {
    await createComment(
      user._id,
      post,
      content,
      inProgress,
      commentFieldRef,
      setCommentError,
      setInProgress,
      setIsSubmitted,
      setContent,
      setContentLength,
      setPost,
    );
  }

  return (
    <StyledCommentInput>
      <h2>New Comment</h2>
      <CommentInputTop
        user={user}
        commentFieldRef={commentFieldRef}
        content={content}
        contentLength={contentLength}
        setContent={setContent}
        setContentLength={setContentLength}
      />
      <CommentInputBottom
        handleSubmitCommentClick={handleSubmitCommentClick}
        inProgress={inProgress}
        isSubmitted={isSubmitted}
        commentError={commentError}
      />
      <hr />
    </StyledCommentInput>
  );
}

CommentInput.propTypes = {
  user: PropTypes.object,
  post: PropTypes.object,
  setPost: PropTypes.func,
};

export default CommentInput;
