import { StyledHeader } from '../styles/Header.styled';
import HeaderTopBar from './HeaderTopBar';
import HeaderBottomBar from './HeaderBottomBar';
import { useShrinkHeader } from '../hooks';

function Header() {
  const isSmaller = useShrinkHeader();

  return (
    <StyledHeader className={isSmaller ? 'smaller' : undefined}>
      <HeaderTopBar />
      <hr />
      <HeaderBottomBar />
    </StyledHeader>
  );
}

export default Header;
