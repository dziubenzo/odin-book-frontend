import PropTypes from 'prop-types';
import { StyledAvatar } from '../styles/App.styled';

function Avatar({ user, size }) {
  const { username, avatar } = user;

  return (
    <StyledAvatar $size={size}>
      <img src={avatar} alt={`${username}'s avatar`} />
    </StyledAvatar>
  );
}

Avatar.propTypes = {
  user: PropTypes.object,
  size: PropTypes.number,
};

export default Avatar;
