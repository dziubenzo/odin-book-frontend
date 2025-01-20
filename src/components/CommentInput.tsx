import { useRef, useState } from 'react';
import type { Updater } from 'use-immer';
import { MAX_COMMENT_LENGTH } from '../constants';
import { createComment } from '../helpers';
import { useUserAndTheme } from '../hooks';
import { StyledCommentInput } from '../styles/PostDetailsPage.styled';
import type { DetailedPost } from '../types';
import CommentInputBottom from './CommentInputBottom';
import CommentInputTop from './CommentInputTop';

type CommentInputProps = {
  post: DetailedPost;
  setPost: Updater<DetailedPost | null>;
};

function CommentInput({ post, setPost }: CommentInputProps) {
  const { user } = useUserAndTheme();
  const commentFieldRef = useRef<HTMLTextAreaElement>(null);

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
        commentFieldRef={commentFieldRef}
        content={content}
        contentLength={contentLength}
        setContent={setContent}
        setContentLength={setContentLength}
        handleSubmitCommentClick={handleSubmitCommentClick}
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

export default CommentInput;
