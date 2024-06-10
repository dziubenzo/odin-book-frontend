import { useOutletContext, useParams } from 'react-router-dom';
import { StyledPostDetailsPage } from '../styles/PostDetailsPage.styled';
import { useFetchPostDetails } from '../hooks';
import Loading from '../components/Loading';
import Error from '../components/Error';
import PostDetails from '../components/PostDetails';
import Comments from '../components/Comments';
import { dislikeSinglePost, likeSinglePost } from '../helpers';
import { useState } from 'react';

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
          <Comments comments={post.comments} />
        </>
      )}
    </StyledPostDetailsPage>
  );
}

export default PostDetailsPage;
