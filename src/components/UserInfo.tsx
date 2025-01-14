import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useUserAndTheme } from '../hooks';
import { StyledUserInfo } from '../styles/ProfilePage.styled';
import Avatar from './Avatar';

function UserInfo() {
  const { user } = useUserAndTheme();

  return (
    <StyledUserInfo>
      <div className="top-line">
        <Avatar object={user} size={100} type="user" />
        <h1 className="username">
          <Link to={`/users/${user.username}`}>{user.username}</Link>
        </h1>
      </div>
      <h2>
        member since <span>{format(user.registered_at, 'dd MMMM yyyy')}</span>
      </h2>
      <Link className="previous-page-link" to={'-1'}>
        Back To
        <br />
        Previous Page
      </Link>
    </StyledUserInfo>
  );
}

export default UserInfo;
