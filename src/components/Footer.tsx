import { StyledFooter } from '../styles/Footer.styled';
import type { User } from '../types';
import FooterCentre from './FooterCentre';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';

type FooterProps = {
  user: User;
};

function Footer({ user }: FooterProps) {
  return (
    <StyledFooter>
      <FooterLeft />
      <FooterCentre />
      <FooterRight user={user} />
    </StyledFooter>
  );
}

export default Footer;
