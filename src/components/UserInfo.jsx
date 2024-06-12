import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { StyledUserInfo } from '../styles/ProfilePage.styled';

function UserInfo({ user }) {
  return (
    <StyledUserInfo>
      <div className="top-line">
        {user.avatar && <img className="user-avatar" src={user.avatar} />}
        <h1>
          <Link to={`/users/${user.username}`}>{user.username}</Link>
        </h1>
      </div>
      <h2>
        member since <span>{format(user.registered_at, 'dd MMMM yyyy')}</span>
      </h2>
      <Link className="previous-page-link" to={-1}>
        Back To
        <br />
        Previous Page
      </Link>
    </StyledUserInfo>
  );
}

UserInfo.propTypes = {
  user: PropTypes.object,
};

export default UserInfo;
