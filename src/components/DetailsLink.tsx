import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { handlePopoverHiding, handlePopoverShowing } from '../helpers';
import type { Category, User } from '../types';
import Popover from './Popover';

type UserDetailsLink = {
  type: 'user';
  username: User['username'];
};

type CategoryDetailsLink = {
  type: 'category';
  name: Category['name'];
  slug: Category['slug'];
};

type DetailsLinkProps = UserDetailsLink | CategoryDetailsLink;

function DetailsLink(props: DetailsLinkProps) {
  const [showPopover, setShowPopover] = useState(false);
  const [isPopoverClosing, setIsPopoverClosing] = useState(false);
  const [popoverX, setPopoverX] = useState(0);
  const [popoverY, setPopoverY] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

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
      <Link
        className={props.type === 'user' ? 'user-link' : 'category-link'}
        to={
          props.type === 'user'
            ? `/users/${props.username}`
            : `/categories/${props.slug}`
        }
      >
        {props.type === 'user' ? props.username : props.name}
      </Link>
      {props.type === 'category' && showPopover && (
        <Popover
          type="category"
          query={`/categories/${props.slug}`}
          positionX={popoverX}
          positionY={popoverY}
          isClosing={isPopoverClosing}
          setIsClosing={setIsPopoverClosing}
          setShowPopover={setShowPopover}
        />
      )}
      {props.type === 'user' && showPopover && (
        <Popover
          type="user"
          query={`/users/${props.username}`}
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

export default DetailsLink;
