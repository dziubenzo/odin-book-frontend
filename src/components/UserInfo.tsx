import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAndTheme } from '../hooks';
import { StyledUserInfo } from '../styles/ProfilePage.styled';
import Avatar from './Avatar';
import DetailsLink from './DetailsLink';

function UserInfo() {
  const { user } = useUserAndTheme();
  const navigate = useNavigate();

  return (
    <StyledUserInfo>
      <div className="top-line">
        <Avatar object={user} size={100} type="user" />
        <DetailsLink type="user" username={user.username} />
      </div>
      <h2>
        member since <span>{format(user.registered_at, 'dd MMMM yyyy')}</span>
      </h2>
      <Link className="previous-page-link" to="" onClick={() => navigate(-1)}>
        Back To
        <br />
        Previous Page
      </Link>
    </StyledUserInfo>
  );
}

export default UserInfo;
