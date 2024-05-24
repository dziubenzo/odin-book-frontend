import { StyledHeader } from '../styles/Header.styled';
import HeaderTopBar from './HeaderTopBar';
import HeaderBottomBar from './HeaderBottomBar';

function Header() {
  return (
    <StyledHeader>
      <HeaderTopBar />
      <hr />
      <HeaderBottomBar />
    </StyledHeader>
  );
}

export default Header;
