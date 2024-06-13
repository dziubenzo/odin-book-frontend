import PropTypes from 'prop-types';
import { StyledFooterRight } from '../styles/Footer.styled';
import Avatar from './Avatar';

function FooterRight({ user }) {
  return (
    <StyledFooterRight>
      <Avatar user={user} size={50} />
      <p className="username">{user.username}</p>
    </StyledFooterRight>
  );
}

FooterRight.propTypes = {
  user: PropTypes.object,
};

export default FooterRight;
