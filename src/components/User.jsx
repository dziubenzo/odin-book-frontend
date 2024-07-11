import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { StyledUser } from '../styles/AllUsersPage.styled';
import FollowUserButton from '../components/FollowUserButton';
import { Link } from 'react-router-dom';

function User({ loggedInUser, user, handleUserButtonClick, inProgress }) {
  const { _id: loggedInUserID, username: loggedInUserUsername } = loggedInUser;
  const { _id: renderedUserID, username: renderedUserUsername } = user;

  return (
    <StyledUser>
      <Avatar object={user} size={100} />
      {loggedInUserUsername === renderedUserUsername ? undefined : (
        <Link to={`/users/${renderedUserUsername}`} className="user-link">
          <p className="username">{renderedUserUsername}</p>
        </Link>
      )}
      {renderedUserID === loggedInUserID ? undefined : (
        <FollowUserButton
          loggedInUser={loggedInUser}
          renderedUser={user}
          inProgress={inProgress}
          handleUserButtonClick={handleUserButtonClick}
        />
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
