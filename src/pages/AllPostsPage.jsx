import { useOutletContext } from 'react-router-dom';
import { StyledAllPostsPage } from '../styles/AllPostsPage.styled';
import { useFetchAllPosts } from '../hooks';
import Post from '../components/Post';
import Error from '../components/Error';
import Loading from '../components/Loading';

function AllPostsPage() {
  const [user, setUser] = useOutletContext();
  const [posts, setPosts, loading, error] = useFetchAllPosts();

  function renderPosts() {
    return posts.map((post) => {
      return <Post key={post._id} post={post} user={user} />;
    });
  }

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
