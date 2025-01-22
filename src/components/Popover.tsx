import { useState } from 'react';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { followOrUnfollowCategory, followOrUnfollowUser } from '../helpers';
import { useFetchPageData, useUserAndTheme } from '../hooks';
import PopoverSkeleton from '../skeletons/PopoverSkeleton';
import { StyledPopover } from '../styles/App.styled';
import { StyledButton } from '../styles/WelcomePage.styled';
import { DetailedCategory, DetailedUser } from '../types';
import Avatar from './Avatar';

type UserPopover = {
  type: 'user';
  query: `/users/${string}`;
};

type CategoryPopover = {
  type: 'category';
  query: `/categories/${string}`;
};

type PopoverProps = {
  positionX: number;
  positionY: number;
  isClosing: boolean;
  setIsClosing: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPopover: React.Dispatch<React.SetStateAction<boolean>>;
} & (UserPopover | CategoryPopover);

function Popover({
  type,
  query,
  positionX,
  positionY,
  isClosing,
  setIsClosing,
  setShowPopover,
}: PopoverProps) {
  const { user, setUser } = useUserAndTheme();
  const { data, setData, loading, error } = useFetchPageData<
    DetailedUser | DetailedCategory
  >(query);

  const [inProgress, setInProgress] = useState<
    DetailedUser['_id'] | DetailedCategory['_id'] | null
  >(null);
  const [followError, setFollowError] = useState<string | null>(null);

  function handleAnimationEnd() {
    setShowPopover(false);
    setIsClosing(false);
  }

  if (loading) {
    return (
      <PopoverSkeleton
        type={type === 'user' ? 'user' : 'category'}
        positionX={positionX}
        positionY={positionY}
      />
    );
  }

  if (error) {
    return (
      <StyledPopover
        className={isClosing ? 'closing' : undefined}
        style={{ top: positionY, left: positionX }}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="error-msg-wrapper">
          <MdOutlineErrorOutline />
          <p>Error while retrieving {type}</p>
        </div>
      </StyledPopover>
    );
  }

  if (type === 'user' && data) {
    const {
      _id: popoverUser,
      username,
      postsCount,
      followersCount,
      commentsCount,
      followed_users,
    } = data as DetailedUser;

    // Follow or unfollow popover user
    async function handleUserButtonClick() {
      await followOrUnfollowUser(
        inProgress,
        user,
        popoverUser,
        setInProgress,
        setFollowError,
        setUser,
      );
      if (inProgress) {
        return;
      }
      // Update popover user's followers
      setData((draft) => {
        if (!draft) return;
        if (user.followed_users.includes(popoverUser)) {
          draft.followersCount--;
          return;
        }
        draft.followersCount++;
      });
    }

    return (
      <StyledPopover
        className={isClosing ? 'closing' : undefined}
        style={{ top: positionY, left: positionX }}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="top-row">
          <Avatar
            type="user-no-popover"
            size={64}
            object={data as DetailedUser}
          />
          <p>{username}</p>
        </div>
        <div className="user-stats">
          <div>
            <p>Posts</p>
            <p className="count">{postsCount}</p>
          </div>
          <div>
            <p>Comments</p>
            <p className="count">{commentsCount}</p>
          </div>
          <div>
            <p>Followers</p>
            <p className="count">{followersCount}</p>
          </div>
          <div>
            <p>Following</p>
            <p className="count">{followed_users.length}</p>
          </div>
        </div>
        <StyledButton
          className="popover-btn"
          onClick={handleUserButtonClick}
          disabled={user._id === popoverUser}
        >
          {inProgress === popoverUser
            ? 'Changing...'
            : followError
              ? followError
              : user.followed_users.includes(popoverUser)
                ? 'Unfollow'
                : 'Follow'}
        </StyledButton>
      </StyledPopover>
    );
  }

  if (type === 'category' && data) {
    const {
      _id: categoryID,
      name,
      followersCount,
      postsCount,
    } = data as DetailedCategory;

    // Follow or unfollow popover category
    async function handleCategoryButtonClick() {
      await followOrUnfollowCategory(
        inProgress,
        user,
        categoryID,
        setInProgress,
        setFollowError,
        setUser,
      );
      if (inProgress) {
        return;
      }
      // Update popover category followers
      setData((draft) => {
        if (!draft) return;
        if (user.followed_categories.includes(categoryID)) {
          draft.followersCount--;
          return;
        }
        draft.followersCount++;
      });
    }

    return (
      <StyledPopover
        className={isClosing ? 'closing' : undefined}
        style={{ top: positionY, left: positionX }}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="top-row">
          <Avatar
            type="category-no-popover"
            size={64}
            object={data as DetailedCategory}
          />
          <p>{name}</p>
        </div>
        <div className="category-stats">
          <div>
            <p>Posts</p>
            <p className="count">{postsCount}</p>
          </div>
          <div>
            <p>Followers</p>
            <p className="count">{followersCount}</p>
          </div>
        </div>
        <StyledButton
          className="popover-btn"
          onClick={handleCategoryButtonClick}
        >
          {inProgress === categoryID
            ? 'Changing...'
            : followError
              ? followError
              : user.followed_categories.includes(categoryID)
                ? 'Unfollow'
                : 'Follow'}
        </StyledButton>
      </StyledPopover>
    );
  }
}
export default Popover;
