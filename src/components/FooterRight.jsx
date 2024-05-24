import PropTypes from 'prop-types';
import { StyledFooterRight } from '../styles/Footer.styled';

function FooterRight({ user }) {
  return (
    <StyledFooterRight>
      <div className="avatar">IMG</div>
      <p className='username'>{user.username}</p>
    </StyledFooterRight>
  );
}

FooterRight.propTypes = {
  user: PropTypes.object,
};

export default FooterRight;
