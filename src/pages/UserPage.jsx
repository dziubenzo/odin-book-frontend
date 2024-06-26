import API_URL from '../API';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { useOutletContext, useParams } from 'react-router-dom';
import { StyledUserPage } from '../styles/UserPage.styled';
import FollowUserButton from '../components/FollowUserButton';
import { useFetchPageData } from '../hooks';
import { useState } from 'react';
import UserInfo from '../components/UserInfo';
import UserStats from '../components/UserStats';
import { followOrUnfollowUser } from '../helpers';

function UserPage() {
  const [user, setUser] = useOutletContext();
  const { username } = useParams();
  const {
    data: renderedUser,
    setData: setRenderedUser,
    loading,
    error,
    setError,
  } = useFetchPageData(`${API_URL}/users/${username}`);
  const [inProgress, setInProgress] = useState(false);

  async function handleUserButtonClick(userID) {
    await followOrUnfollowUser(
      inProgress,
      user,
      userID,
      setInProgress,
      setError,
      setUser,
    );
    if (inProgress) {
      return;
    }
    // Update the rendered user
    setRenderedUser((draft) => {
      if (user.followed_users.includes(renderedUser._id)) {
        draft.followersCount--;
        return;
      }
      draft.followersCount++;
    });
  }

  return (
    <StyledUserPage>
      {loading && <Loading message="User Info" />}
      {error && <Error errorMessage={error} />}
      {renderedUser && (
        <>
          <UserInfo user={renderedUser} />
          {renderedUser.bio && (
            <p className="bio" data-testid="bio">
              {renderedUser.bio}
            </p>
          )}
          <UserStats user={renderedUser} />
          {renderedUser._id === user._id ? undefined : (
            <FollowUserButton
              loggedInUser={user}
              renderedUser={renderedUser}
              inProgress={inProgress}
              handleUserButtonClick={handleUserButtonClick}
            />
          )}
        </>
      )}
    </StyledUserPage>
  );
}

export default UserPage;
