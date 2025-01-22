import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { handlePopoverHiding, handlePopoverShowing } from '../helpers';
import { StyledAvatar } from '../styles/App.styled';
import type { Category, DetailedUser, PostAuthor, User } from '../types';
import Popover from './Popover';

type CategoryIcon = {
  type: 'category' | 'category-no-popover';
  object: Category;
};

type UserAvatar = {
  type: 'user' | 'user-no-popover';
  object: DetailedUser | User | PostAuthor;
};

type AvatarProps = { size: number } & (CategoryIcon | UserAvatar);

function Avatar({ object, size, type }: AvatarProps) {
  const [showPopover, setShowPopover] = useState(false);
  const [isPopoverClosing, setIsPopoverClosing] = useState(false);
  const [popoverX, setPopoverX] = useState(0);
  const [popoverY, setPopoverY] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  // Do not show popover in some cases
  if (type === 'user-no-popover') {
    const { username, avatar } = object;

    return (
      <StyledAvatar $size={size}>
        <Link to={`/users/${username}`}>
          <img src={avatar} alt={`${username}'s avatar`} />
        </Link>
      </StyledAvatar>
    );
  }

  // Do not show popover in some cases
  if (type === 'category-no-popover') {
    const { icon, slug, name } = object;

    return (
      <StyledAvatar $size={size}>
        <Link to={`/users/${slug}`}>
          <img src={icon} alt={`Icon for the ${name} category`} />
        </Link>
      </StyledAvatar>
    );
  }

  return (
    <div
      onMouseEnter={(event) => {
        handlePopoverShowing(
          event,
          isPopoverClosing,
          setPopoverX,
          setPopoverY,
          timeoutRef,
          setShowPopover,
        );
      }}
      onMouseLeave={() => {
        handlePopoverHiding(timeoutRef, showPopover, setIsPopoverClosing);
      }}
    >
      <StyledAvatar $size={size}>
        {type === 'category' && (
          <Link to={`/categories/${object.slug}`}>
            <img
              src={object.icon}
              alt={`Icon for the ${object.name} category`}
            />
          </Link>
        )}
        {type === 'user' && (
          <Link to={`/users/${object.username}`}>
            <img src={object.avatar} alt={`${object.username}'s avatar`} />
          </Link>
        )}
      </StyledAvatar>
      {type === 'category' && showPopover && (
        <Popover
          type="category"
          query={`/categories/${object.slug}`}
          positionX={popoverX}
          positionY={popoverY}
          isClosing={isPopoverClosing}
          setIsClosing={setIsPopoverClosing}
          setShowPopover={setShowPopover}
        />
      )}
      {type === 'user' && showPopover && (
        <Popover
          type="user"
          query={`/users/${object.username}`}
          positionX={popoverX}
          positionY={popoverY}
          isClosing={isPopoverClosing}
          setIsClosing={setIsPopoverClosing}
          setShowPopover={setShowPopover}
        />
      )}
    </div>
  );
}

export default Avatar;
