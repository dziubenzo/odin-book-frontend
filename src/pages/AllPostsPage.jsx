import API_URL from '../API';
import { useOutletContext } from 'react-router-dom';
import { StyledAllPostsPage } from '../styles/AllPostsPage.styled';
import { useFetchPageData } from '../hooks';
import Post from '../components/Post';
import Error from '../components/Error';
import Loading from '../components/Loading';
import { useState } from 'react';
import { dislikePost, likePost } from '../helpers';

function AllPostsPage() {
  const [user] = useOutletContext();
  const {
    data: posts,
    setData: setPosts,
    loading,
    error,
    setError,
  } = useFetchPageData(`${API_URL}/posts/`);
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
    <StyledAllPostsPage>
      {loading && <Loading message="All Posts" />}
      {error && <Error errorMessage={error} />}
      {posts && (
        <>
          <h1 className="top-header">Feed - All Posts</h1>
          {renderPosts()}
        </>
      )}
    </StyledAllPostsPage>
  );
}

export default AllPostsPage;
