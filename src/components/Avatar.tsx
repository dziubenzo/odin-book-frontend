import { Link } from 'react-router-dom';
import { StyledAvatar } from '../styles/App.styled';
import type { Category, User } from '../types';

type CategoryAvatar = { object: Category; type: 'category' };

type UserAvatar = { object: User; type: 'user' };

type AvatarProps = { size: number } & (CategoryAvatar | UserAvatar);

function Avatar({ object, size, type }: AvatarProps) {
  if (type === 'category') {
    const { name, icon, slug } = object;

    return (
      <StyledAvatar $size={size}>
        <Link to={`/categories/${slug}`}>
          <img src={icon} alt={`Icon for the ${name} category`} />
        </Link>
      </StyledAvatar>
    );
  }

  if (type === 'user') {
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

export default Avatar;
