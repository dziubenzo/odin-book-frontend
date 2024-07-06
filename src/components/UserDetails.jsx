import PropTypes from 'prop-types';
import API_URL from '../API';
import { useOutletContext, useParams } from 'react-router-dom';
import { StyledResourceDetails } from '../styles/PostsPage.styled';
import { useFetchPageData } from '../hooks';
import { useRef, useState } from 'react';
import ResourceDetailsTop from './ResourceDetailsTop';
import UserStats from './UserStats';
import FollowUserButton from './FollowUserButton';
import { followOrUnfollowUser } from '../helpers';
import { MdOutlineErrorOutline } from 'react-icons/md';

function UserDetails({ loadingPosts }) {
  const [user, setUser] = useOutletContext();
  const { username } = useParams();
  const { data: renderedUser, setData: setRenderedUser } = useFetchPageData(
    `${API_URL}/users/${username}`,
  );
  const errorMessageRef = useRef(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [inProgress, setInProgress] = useState(false);

  async function handleUserButtonClick(renderedUserID) {
    await followOrUnfollowUser(
      inProgress,
      user,
      renderedUserID,
      setInProgress,
      setErrorMessage,
      setUser,
    );
    // Scroll to the error message if there was an error and clear the error message after a timeout
    if (errorMessage) {
      errorMessageRef.current.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
    if (inProgress) {
      return;
    }
    // Update rendered user's followers
    setRenderedUser((draft) => {
      if (user.followed_users.includes(renderedUserID)) {
        draft.followersCount--;
        return;
      }
      draft.followersCount++;
    });
  }

  if (renderedUser && !loadingPosts) {
    const { bio } = renderedUser;

    return (
      <StyledResourceDetails>
        <ResourceDetailsTop resourceType="user" object={renderedUser} />
        <p className="bio">{bio ? bio : 'No bio to show.'}</p>
        {errorMessage && (
          <div className="error-message-wrapper">
            <MdOutlineErrorOutline />
            <p ref={errorMessageRef}>{errorMessage}</p>
          </div>
        )}
        <UserStats user={renderedUser} />
        {renderedUser._id === user._id ? undefined : (
          <div className="mystery-wrapper">
            <FollowUserButton
              loggedInUser={user}
              renderedUser={renderedUser}
              inProgress={inProgress}
              handleUserButtonClick={handleUserButtonClick}
            />
          </div>
        )}
      </StyledResourceDetails>
    );
  }
}

UserDetails.propTypes = {
  loadingPosts: PropTypes.bool,
};

export default UserDetails;
