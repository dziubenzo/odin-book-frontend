import { NavLink } from 'react-router-dom';
import { StyledHeaderBottomBar } from '../styles/Header.styled';
import { BiCategoryAlt } from 'react-icons/bi';
import { PiUsersFour } from 'react-icons/pi';

function HeaderBottomBar() {
  return (
    <StyledHeaderBottomBar>
      <NavLink to={'/categories'} className="link">
        <BiCategoryAlt />
        <p>ALL CATEGORIES</p>
      </NavLink>
      <NavLink to={'/users'} className="link">
        <PiUsersFour />
        <p>ALL USERS</p>
      </NavLink>
    </StyledHeaderBottomBar>
  );
}

export default HeaderBottomBar;
