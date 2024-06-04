import { useOutletContext } from 'react-router-dom';
import { StyledAllPostsPage } from '../styles/AllPostsPage.styled';
import { useFetchAllPosts } from '../hooks';

function AllPostsPage() {
  const [user, setUser] = useOutletContext();
  const [data, loading, error] = useFetchAllPosts();

  return (
    <StyledAllPostsPage>
      {loading && <h1>Loading Posts...</h1>}
      {error && (
        <h1>Error while fetching the data. Refresh the page to try again.</h1>
      )}
      {data && <h1>Home Page</h1>}
    </StyledAllPostsPage>
  );
}

export default AllPostsPage;
