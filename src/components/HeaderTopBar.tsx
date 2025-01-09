import { AiOutlineLike, AiOutlineUser } from 'react-icons/ai';
import { RiGlobalLine, RiUserStarLine } from 'react-icons/ri';
import { TbCategoryPlus } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import { StyledHeaderTopBar } from '../styles/Header.styled';

function HeaderTopBar() {
  return (
    <StyledHeaderTopBar>
      <NavLink to={'/posts'} className="link" end>
        <RiGlobalLine />
        <p>ALL</p>
      </NavLink>
      <NavLink to={'/posts/categories'} className="link">
        <TbCategoryPlus />
        <p>CATEGORIES</p>
      </NavLink>
      <NavLink to={'/posts/following'} className="link">
        <RiUserStarLine />
        <p>FOLLOWING</p>
      </NavLink>
      <NavLink to={'/posts/liked'} className="link">
        <AiOutlineLike />
        <p>LIKED</p>
      </NavLink>
      <NavLink to={'/posts/by-you'} className="link">
        <AiOutlineUser />
        <p>YOURS</p>
      </NavLink>
    </StyledHeaderTopBar>
  );
}

export default HeaderTopBar;
