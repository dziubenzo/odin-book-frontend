import { useShrinkHeader } from '../hooks';
import { StyledHeader } from '../styles/Header.styled';
import HeaderBottomBar from './HeaderBottomBar';
import HeaderTopBar from './HeaderTopBar';

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
