import Cookies from 'js-cookie';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { StyledFooterLeft } from '../styles/Footer.styled';

function FooterLeft() {
  function logOut() {
    return Cookies.remove('jwt');
  }

  return (
    <StyledFooterLeft>
      <Link to={'/profile'} className="link">
        <IoSettingsOutline />
        <p>My Profile</p>
      </Link>
      <Link to={'/'} onClick={logOut} className="link">
        <MdLogout />
        <p>Log Out</p>
      </Link>
    </StyledFooterLeft>
  );
}

export default FooterLeft;
