import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { StyledUser } from '../styles/AllUsersPage.styled';
import { StyledButton } from '../styles/WelcomePage.styled';
import { Link } from 'react-router-dom';

function User({ loggedInUser, user }) {
  const { followed_users } = loggedInUser;
  const { _id, username } = user;

  return (
    <StyledUser>
      <Link to={`/users/${username}`} className="user-link">
        <Avatar object={user} size={100} />
        <p className="username">{username}</p>
      </Link>
      <StyledButton className="follow-button">
        {followed_users.includes(_id) ? 'Unfollow' : 'Follow'}
      </StyledButton>
    </StyledUser>
  );
}

User.propTypes = {
  loggedInUser: PropTypes.object,
  user: PropTypes.object,
};

export default User;
