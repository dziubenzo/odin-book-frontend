import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { StyledUser } from '../styles/AllUsersPage.styled';
import { StyledButton } from '../styles/WelcomePage.styled';
import { Link } from 'react-router-dom';

function User({ loggedInUser, user, handleUserButtonClick, inProgress }) {
  const {
    _id: loggedInUserID,
    username: loggedInUserUsername,
    followed_users,
  } = loggedInUser;
  const { _id, username } = user;

  return (
    <StyledUser>
      <Link to={`/users/${username}`} className="user-link">
        <Avatar object={user} size={100} />
        <p className="username">
          {loggedInUserUsername === username ? undefined : username}
        </p>
      </Link>
      {_id === loggedInUserID ? undefined : (
        <StyledButton
          className="follow-button"
          onClick={() => handleUserButtonClick(_id)}
        >
          {inProgress === _id
            ? 'Changing...'
            : followed_users.includes(_id)
              ? 'Unfollow'
              : 'Follow'}
        </StyledButton>
      )}
    </StyledUser>
  );
}

User.propTypes = {
  loggedInUser: PropTypes.object,
  user: PropTypes.object,
  handleUserButtonClick: PropTypes.func,
  inProgress: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default User;
