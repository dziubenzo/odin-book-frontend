import PropTypes from 'prop-types';
import { StyledButton } from '../styles/WelcomePage.styled';

function FollowUserButton({
  loggedInUser,
  renderedUser,
  inProgress,
  handleUserButtonClick,
}) {
  const { followed_users } = loggedInUser;
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

FollowUserButton.propTypes = {
  loggedInUser: PropTypes.object,
  renderedUser: PropTypes.object,
  inProgress: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  handleUserButtonClick: PropTypes.func,
};

export default FollowUserButton;
