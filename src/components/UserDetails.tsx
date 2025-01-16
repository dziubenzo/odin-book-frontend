import { useRef, useState } from 'react';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { followOrUnfollowUser } from '../helpers';
import { useFetchPageData, useSyncWithParent, useUserAndTheme } from '../hooks';
import { StyledResourceDetails } from '../styles/PostsPage.styled';
import type { DetailedUser } from '../types';
import FollowUserButton from './FollowUserButton';
import ResourceDetailsTop from './ResourceDetailsTop';
import UserStats from './UserStats';

type UserDetailsProps = {
  loadingPosts: boolean;
  setResourceError: React.Dispatch<React.SetStateAction<string | null>>;
  setLoadingResource: React.Dispatch<React.SetStateAction<boolean>>;
};

function UserDetails({
  loadingPosts,
  setResourceError,
  setLoadingResource,
}: UserDetailsProps) {
  const { user, setUser } = useUserAndTheme();
  const { username } = useParams();
  const {
    data: renderedUser,
    setData: setRenderedUser,
    loading,
    error,
  } = useFetchPageData<DetailedUser>(`/users/${username}`);
  const errorMessageRef = useRef<HTMLParagraphElement>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [inProgress, setInProgress] = useState<DetailedUser['_id'] | null>(
    null,
  );

  async function handleUserButtonClick(renderedUserID: DetailedUser['_id']) {
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
      if (!errorMessageRef.current) return;
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
      if (!draft) return;
      if (user.followed_users.includes(renderedUserID)) {
        draft.followersCount--;
        return;
      }
      draft.followersCount++;
    });
  }

  useSyncWithParent(error, loading, setResourceError, setLoadingResource);

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
        <UserStats renderedUser={renderedUser} />
        {renderedUser._id === user._id ? undefined : (
          <div className="mystery-wrapper">
            <FollowUserButton
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

export default UserDetails;
