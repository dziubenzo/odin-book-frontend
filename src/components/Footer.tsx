import { StyledFooter } from '../styles/Footer.styled';
import type { ThemeValue, User } from '../types';
import FooterCentre from './FooterCentre';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';

type FooterProps = {
  user: User;
  theme: ThemeValue;
  setTheme: React.Dispatch<React.SetStateAction<ThemeValue>>;
};

function Footer({ user, theme, setTheme }: FooterProps) {
  return (
    <StyledFooter>
      <FooterLeft />
      <FooterCentre />
      <FooterRight user={user} theme={theme} setTheme={setTheme} />
    </StyledFooter>
  );
}

export default Footer;
