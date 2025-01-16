import { BiCategoryAlt } from 'react-icons/bi';
import { MdOutlineCreate } from 'react-icons/md';
import { PiUsersFour } from 'react-icons/pi';
import { NavLink } from 'react-router-dom';
import { StyledHeaderBottomBar } from '../styles/Header.styled';

function HeaderBottomBar() {
  return (
    <StyledHeaderBottomBar>
      <NavLink to={'/categories'} className="link" end title="All Categories">
        <BiCategoryAlt />
        <p>ALL CATEGORIES</p>
      </NavLink>
      <NavLink to={'/posts/create'} className="link" title="Create Post">
        <MdOutlineCreate />
        <p>CREATE POST</p>
      </NavLink>
      <NavLink to={'/users'} className="link" end title="All Users">
        <PiUsersFour />
        <p>ALL USERS</p>
      </NavLink>
    </StyledHeaderBottomBar>
  );
}

export default HeaderBottomBar;
