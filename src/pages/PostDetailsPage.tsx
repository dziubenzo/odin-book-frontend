import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentInput from '../components/CommentInput';
import Comments from '../components/Comments';
import Error from '../components/Error';
import PostDetails from '../components/PostDetails';
import ReturnIcon from '../components/ReturnIcon';
import {
  dislikeComment,
  dislikeSinglePost,
  likeComment,
  likeSinglePost,
} from '../helpers';
import { useChangeTitle, useFetchPageData, useUserAndTheme } from '../hooks';
import PostDetailsSkeleton from '../skeletons/PostDetailsSkeleton';
import { StyledPostDetailsPage } from '../styles/PostDetailsPage.styled';
import type { Comment, DetailedPost } from '../types';

function PostDetailsPage() {
  const { slug } = useParams();
  const { user } = useUserAndTheme();
  const {
    data: post,
    setData: setPost,
    loading,
    error,
    setError,
  } = useFetchPageData<DetailedPost>(`/posts/${slug}`);

  const [inProgress, setInProgress] = useState(false);

  useChangeTitle('Post Details');

  async function handlePostLikeClick() {
    await likeSinglePost(
      post,
      user._id,
      inProgress,
      setInProgress,
      setError,
      setPost,
    );
  }

  async function handlePostDislikeClick() {
    await dislikeSinglePost(
      post,
      user._id,
      inProgress,
      setInProgress,
      setError,
      setPost,
    );
  }

  async function handleCommentLikeClick(commentID: Comment['_id']) {
    await likeComment(
      post,
      commentID,
      user._id,
      inProgress,
      setInProgress,
      setError,
      setPost,
    );
  }

  async function handleCommentDislikeClick(commentID: Comment['_id']) {
    await dislikeComment(
      post,
      commentID,
      user._id,
      inProgress,
      setInProgress,
      setError,
      setPost,
    );
  }

  return (
    <StyledPostDetailsPage>
      {loading && <PostDetailsSkeleton commentsLength={6} />}
      {error && <Error errorMessage={error} />}
      {post && (
        <>
          <PostDetails
            post={post}
            handlePostLikeClick={handlePostLikeClick}
            handlePostDislikeClick={handlePostDislikeClick}
            inProgress={inProgress}
          />
          <CommentInput post={post} setPost={setPost} />
          <Comments
            comments={post.comments}
            handleCommentLikeClick={handleCommentLikeClick}
            handleCommentDislikeClick={handleCommentDislikeClick}
            inProgress={inProgress}
          />
          <ReturnIcon />
        </>
      )}
    </StyledPostDetailsPage>
  );
}

export default PostDetailsPage;
