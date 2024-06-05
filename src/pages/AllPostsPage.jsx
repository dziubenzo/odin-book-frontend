import { useOutletContext } from 'react-router-dom';
import { StyledAllPostsPage } from '../styles/AllPostsPage.styled';
import { useFetchAllPosts } from '../hooks';
import Post from '../components/Post';
import Error from '../components/Error';
import Loading from '../components/Loading';
import { useState } from 'react';
import { likePost } from '../helpers';

function AllPostsPage() {
  const [user] = useOutletContext();
  const [posts, setPosts, loading, error, setError] = useFetchAllPosts();
  const [inProgress, setInProgress] = useState(false);

  function renderPosts() {
    return posts.map((post) => {
      return (
        <Post
          key={post._id}
          post={post}
          user={user}
          handleLikeClick={handleLikeClick}
          handleDislikeClick={handleDislikeClick}
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

  async function handleDislikeClick(post) {}

  return (
    <StyledAllPostsPage>
      {loading && <Loading message="All Posts" />}
      {error && <Error errorMessage={error} />}
      {posts && (
        <>
          <h1>Feed - All Posts</h1>
          {renderPosts()}
        </>
      )}
    </StyledAllPostsPage>
  );
}

export default AllPostsPage;
