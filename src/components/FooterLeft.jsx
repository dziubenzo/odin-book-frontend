import { StyledFooterLeft } from '../styles/Footer.styled';
import { Link } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';

import Cookies from 'js-cookie';

function FooterLeft() {
  return (
    <StyledFooterLeft>
      <Link to={'/profile'} className="link">
        <IoSettingsOutline />
        <p>My Profile</p>
      </Link>
      <Link to={'/'} onClick={() => Cookies.remove('jwt')} className="link">
        <MdLogout />
        <p>Log Out</p>
      </Link>
    </StyledFooterLeft>
  );
}

export default FooterLeft;
