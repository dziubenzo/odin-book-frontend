import { NavLink } from 'react-router-dom';
import { StyledBottomHeaderBar } from '../styles/Header.styled';
import { BiCategoryAlt } from 'react-icons/bi';
import { PiUsersFour } from 'react-icons/pi';

function BottomHeaderBar() {
  return (
    <StyledBottomHeaderBar>
      <div className="link">
        <BiCategoryAlt />
        <NavLink to={'/categories'}>ALL CATEGORIES</NavLink>
      </div>
      <div className="link">
        <PiUsersFour />
        <NavLink to={'/users'}>ALL USERS</NavLink>
      </div>
    </StyledBottomHeaderBar>
  );
}

export default BottomHeaderBar;
