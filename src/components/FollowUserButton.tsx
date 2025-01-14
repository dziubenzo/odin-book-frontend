import { useUserAndTheme } from '../hooks';
import { StyledButton } from '../styles/WelcomePage.styled';
import type { DetailedUser, User } from '../types';

type FollowUserButtonProps = {
  renderedUser: DetailedUser | User;
  inProgress: DetailedUser['_id'] | User['_id'] | null;
  handleUserButtonClick: (
    renderedUserID: DetailedUser['_id'] | User['_id'],
  ) => Promise<void>;
};

function FollowUserButton({
  renderedUser,
  inProgress,
  handleUserButtonClick,
}: FollowUserButtonProps) {
  const { user } = useUserAndTheme();
  const { followed_users } = user;
  const { _id: renderedUserID } = renderedUser;

  return (
    <StyledButton
      className="follow-button"
      onClick={() => handleUserButtonClick(renderedUserID)}
    >
      {inProgress === renderedUserID
        ? 'Changing...'
        : followed_users.includes(renderedUserID)
          ? 'Unfollow'
          : 'Follow'}
    </StyledButton>
  );
}

export default FollowUserButton;
