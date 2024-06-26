import API_URL from '../API';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { useOutletContext, useParams } from 'react-router-dom';
import { StyledUserPage } from '../styles/UserPage.styled';
import { StyledButton } from '../styles/WelcomePage.styled';
import { useFetchPageData } from '../hooks';
import { useState } from 'react';
import UserInfo from '../components/UserInfo';
import UserStats from '../components/UserStats';

function UserPage() {
  const [user] = useOutletContext();
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
    return;
  }

  return (
    <StyledUserPage>
      {loading && <Loading message="User Info" />}
      {error && <Error errorMessage={error} />}
      {renderedUser && (
        <>
          <UserInfo user={renderedUser} />
          {renderedUser.bio && <p className="bio">{renderedUser.bio}</p>}
          <UserStats user={renderedUser} />
          {renderedUser._id === user._id ? undefined : (
            <StyledButton
              className="follow-button"
              onClick={() => handleUserButtonClick(renderedUser._id)}
            >
              {inProgress
                ? 'Changing...'
                : user.followed_users.includes(renderedUser._id)
                  ? 'Unfollow'
                  : 'Follow'}
            </StyledButton>
          )}
        </>
      )}
    </StyledUserPage>
  );
}

export default UserPage;
