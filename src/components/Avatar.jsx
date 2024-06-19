import PropTypes from 'prop-types';
import { StyledAvatar } from '../styles/App.styled';

function Avatar({ object, size, isCategory = false }) {
  if (isCategory)
    return (
      <StyledAvatar $size={size}>
        <img src={object.icon} alt={`Icon for the ${object.name} category`} />
      </StyledAvatar>
    );

  return (
    <StyledAvatar $size={size}>
      <img src={object.avatar} alt={`${object.username}'s avatar`} />
    </StyledAvatar>
  );
}

Avatar.propTypes = {
  object: PropTypes.object,
  size: PropTypes.number,
  isCategory: PropTypes.bool,
};

export default Avatar;
