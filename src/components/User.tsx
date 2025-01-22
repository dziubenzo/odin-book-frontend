import FollowUserButton from '../components/FollowUserButton';
import { useUserAndTheme } from '../hooks';
import { StyledUser } from '../styles/AllUsersPage.styled';
import type { User as UserType } from '../types';
import Avatar from './Avatar';
import DetailsLink from './DetailsLink';

type UserProps = {
  user: UserType;
  handleUserButtonClick: (userID: UserType['_id']) => Promise<void>;
  inProgress: UserType['_id'] | null;
};

function User({ user, handleUserButtonClick, inProgress }: UserProps) {
  const { user: loggedInUser } = useUserAndTheme();
  const { _id: loggedInUserID, username: loggedInUserUsername } = loggedInUser;
  const { _id: renderedUserID, username: renderedUserUsername } = user;

  return (
    <StyledUser>
      <Avatar object={user} size={100} type="user" />
      {loggedInUserUsername === renderedUserUsername ? undefined : (
        <DetailsLink type="user" username={renderedUserUsername} />
      )}
      {renderedUserID === loggedInUserID ? undefined : (
        <FollowUserButton
          renderedUser={user}
          inProgress={inProgress}
          handleUserButtonClick={handleUserButtonClick}
        />
      )}
    </StyledUser>
  );
}

export default User;
