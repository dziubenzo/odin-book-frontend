import PropTypes from 'prop-types';
import { StyledAvatar } from '../styles/App.styled';
import { Link } from 'react-router-dom';

function Avatar({ object, size, isCategory = false }) {
  if (isCategory) {
    const { name, icon, slug } = object;

    return (
      <StyledAvatar $size={size}>
        <Link to={`/categories/${slug}`}>
          <img src={icon} alt={`Icon for the ${name} category`} />
        </Link>
      </StyledAvatar>
    );
  }

  if (!isCategory) {
    const { username, avatar } = object;

    return (
      <StyledAvatar $size={size}>
        <Link to={`/users/${username}`}>
          <img src={avatar} alt={`${username}'s avatar`} />
        </Link>
      </StyledAvatar>
    );
  }
}

Avatar.propTypes = {
  object: PropTypes.object,
  size: PropTypes.number,
  isCategory: PropTypes.bool,
};

export default Avatar;
