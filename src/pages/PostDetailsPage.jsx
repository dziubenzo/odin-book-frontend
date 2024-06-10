import { useOutletContext, useParams } from 'react-router-dom';
import { StyledPostDetailsPage } from '../styles/PostDetailsPage.styled';
import { useFetchPostDetails } from '../hooks';
import Loading from '../components/Loading';
import Error from '../components/Error';
import PostDetails from '../components/PostDetails';
import Comments from '../components/Comments';
import {
  dislikeComment,
  dislikeSinglePost,
  likeComment,
  likeSinglePost,
} from '../helpers';
import { useState } from 'react';
import CommentInput from '../components/CommentInput';

function PostDetailsPage() {
  const { slug } = useParams();
  const [user] = useOutletContext();
  const [post, setPost, loading, error, setError] = useFetchPostDetails(slug);

  const [inProgress, setInProgress] = useState(false);

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

  async function handleCommentLikeClick(commentID) {
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

  async function handleCommentDislikeClick(commentID) {
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
      {loading && <Loading message="Post" />}
      {error && <Error errorMessage={error} />}
      {post && (
        <>
          <PostDetails
            post={post}
            user={user}
            handlePostLikeClick={handlePostLikeClick}
            handlePostDislikeClick={handlePostDislikeClick}
          />
          <CommentInput />
          <Comments
            comments={post.comments}
            handleCommentLikeClick={handleCommentLikeClick}
            handleCommentDislikeClick={handleCommentDislikeClick}
          />
        </>
      )}
    </StyledPostDetailsPage>
  );
}

export default PostDetailsPage;
