import API_URL from '../API';
import { useOutletContext } from 'react-router-dom';
import Loading from '../components/Loading';
import Error from '../components/Error';
import User from '../components/User';
import { StyledAllUsersPage } from '../styles/AllUsersPage.styled';
import { useFetchPageData } from '../hooks';
import { useState } from 'react';
import { followOrUnfollowUser } from '../helpers';

function AllUsersPage() {
  const { user, setUser } = useOutletContext();
  const {
    data: users,
    loading,
    error,
    setError,
  } = useFetchPageData(`${API_URL}/users`);
  const [inProgress, setInProgress] = useState(false);

  function renderUsers() {
    return users.map((singleUser) => {
      return (
        <User
          key={singleUser._id}
          loggedInUser={user}
          user={singleUser}
          handleUserButtonClick={handleUserButtonClick}
          inProgress={inProgress}
        />
      );
    });
  }

  async function handleUserButtonClick(userID) {
    await followOrUnfollowUser(
      inProgress,
      user,
      userID,
      setInProgress,
      setError,
      setUser,
    );
  }

  return (
    <StyledAllUsersPage>
      {loading && <Loading message="All Users" />}
      {error && <Error errorMessage={error} />}
      {users && (
        <>
          <h1 className="top-header">All Users ({users.length})</h1>
          <div className="users-wrapper">{renderUsers()}</div>
        </>
      )}
    </StyledAllUsersPage>
  );
}

export default AllUsersPage;
