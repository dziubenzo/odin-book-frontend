import { StyledTopHeaderBar } from '../styles/Header.styled';
import { NavLink } from 'react-router-dom';
import { RiGlobalLine, RiUserStarLine } from 'react-icons/ri';
import { AiOutlineLike, AiOutlineUser } from 'react-icons/ai';

function TopHeaderBar() {
  return (
    <StyledTopHeaderBar>
      <div className="link">
        <RiGlobalLine />
        <NavLink to={'/posts'}>ALL</NavLink>
      </div>
      <div className="link">
        <RiUserStarLine />
        <NavLink to={'/posts/following'}>FOLLOWING</NavLink>
      </div>
      <div className="link">
        <AiOutlineLike />
        <NavLink to={'/posts/liked'}>LIKED</NavLink>
      </div>
      <div className="link">
        <AiOutlineUser />
        <NavLink to={'/posts/mine'}>MINE</NavLink>
      </div>
    </StyledTopHeaderBar>
  );
}

export default TopHeaderBar;
