import PropTypes from 'prop-types';
import API_URL from '../API';
import { useOutletContext } from 'react-router-dom';
import { StyledPostsPage } from '../styles/PostsPage.styled';
import { useFetchPageData } from '../hooks';
import Post from '../components/Post';
import Error from '../components/Error';
import Loading from '../components/Loading';
import NoPostsSection from '../components/NoPostsSection';
import { useState } from 'react';
import { dislikePost, likePost } from '../helpers';

function PostsPage({ fetchQuery = '', pageDescription = 'All Posts' }) {
  const [user] = useOutletContext();
  const {
    data: posts,
    setData: setPosts,
    loading,
    error,
    setError,
  } = useFetchPageData(`${API_URL}/posts/${fetchQuery}`);
  const [inProgress, setInProgress] = useState(false);

  function renderPosts() {
    return posts.map((post) => {
      return (
        <Post
          key={post._id}
          post={post}
          user={user}
          handlePostLikeClick={handleLikeClick}
          handlePostDislikeClick={handleDislikeClick}
        />
      );
    });
  }

  async function handleLikeClick(post) {
    await likePost(
      post,
      user._id,
      inProgress,
      setInProgress,
      setError,
      setPosts,
    );
  }

  async function handleDislikeClick(post) {
    await dislikePost(
      post,
      user._id,
      inProgress,
      setInProgress,
      setError,
      setPosts,
    );
  }

  return (
    <StyledPostsPage>
      {!error && <h1 className="top-header">Feed - {pageDescription}</h1>}
      {loading && <Loading message={pageDescription} />}
      {error && <Error errorMessage={error} />}
      {posts && <>{posts?.length === 0 ? <NoPostsSection /> : renderPosts()}</>}
    </StyledPostsPage>
  );
}

PostsPage.propTypes = {
  fetchQuery: PropTypes.string,
  pageDescription: PropTypes.string,
};

export default PostsPage;
