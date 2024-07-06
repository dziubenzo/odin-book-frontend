import { NavLink } from 'react-router-dom';
import { StyledHeaderBottomBar } from '../styles/Header.styled';
import { BiCategoryAlt } from 'react-icons/bi';
import { PiUsersFour } from 'react-icons/pi';
import { MdOutlineCreate } from "react-icons/md";


function HeaderBottomBar() {
  return (
    <StyledHeaderBottomBar>
      <NavLink to={'/categories'} className="link" end>
        <BiCategoryAlt />
        <p>ALL CATEGORIES</p>
      </NavLink>
      <NavLink to={'/posts/create'} className="link">
        <MdOutlineCreate />
        <p>CREATE POST</p>
      </NavLink>
      <NavLink to={'/users'} className="link" end>
        <PiUsersFour />
        <p>ALL USERS</p>
      </NavLink>
    </StyledHeaderBottomBar>
  );
}

export default HeaderBottomBar;
