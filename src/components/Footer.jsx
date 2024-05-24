import PropTypes from 'prop-types';
import { StyledFooter } from '../styles/Footer.styled';
import FooterLeft from './FooterLeft';
import FooterCentre from './FooterCentre';
import FooterRight from './FooterRight';

function Footer({ user }) {
  return (
    <StyledFooter>
      <FooterLeft />
      <FooterCentre />
      <FooterRight user={user} />
    </StyledFooter>
  );
}

Footer.propTypes = {
  user: PropTypes.object,
};

export default Footer;
