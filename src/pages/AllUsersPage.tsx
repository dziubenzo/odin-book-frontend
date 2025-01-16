import { useState } from 'react';
import Error from '../components/Error';
import Loading from '../components/Loading';
import User from '../components/User';
import { followOrUnfollowUser } from '../helpers';
import { useChangeTitle, useFetchPageData, useUserAndTheme } from '../hooks';
import { StyledAllUsersPage } from '../styles/AllUsersPage.styled';
import type { User as UserType } from '../types';

function AllUsersPage() {
  const { user, setUser } = useUserAndTheme();
  const {
    data: users,
    loading,
    error,
    setError,
  } = useFetchPageData<UserType[]>(`/users`);
  const [inProgress, setInProgress] = useState<UserType['_id'] | null>(null);

  useChangeTitle('All Users');

  function renderUsers() {
    if (!users) return;
    return users.map((singleUser) => {
      return (
        <User
          key={singleUser._id}
          user={singleUser}
          handleUserButtonClick={handleUserButtonClick}
          inProgress={inProgress}
        />
      );
    });
  }

  async function handleUserButtonClick(userID: UserType['_id']) {
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
