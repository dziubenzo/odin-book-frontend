import { useState } from 'react';
import { followOrUnfollowUser } from '../helpers';
import { useFetchPageData, useUserAndTheme } from '../hooks';
import { StyledPopover } from '../styles/App.styled';
import { StyledButton } from '../styles/WelcomePage.styled';
import { DetailedCategory, DetailedUser, User } from '../types';
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
} & (UserPopover | CategoryPopover);

function Popover({ type, query, positionX, positionY }: PopoverProps) {
  const { user, setUser } = useUserAndTheme();
  const { data, setData, loading, error } = useFetchPageData<
    DetailedUser | DetailedCategory
  >(query);

  const [inProgress, setInProgress] = useState<
    DetailedUser['_id'] | DetailedCategory['_id'] | null
  >(null);
  const [followError, setFollowError] = useState<string | null>(null);

  if (loading) {
    return (
      <StyledPopover style={{ top: positionY, left: positionX }}>
        <p>Loading data...</p>
      </StyledPopover>
    );
  }

  if (error) {
    return (
      <StyledPopover style={{ top: positionY, left: positionX }}>
        <p>{error}</p>
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
    async function handleUserButtonClick(userID: User['_id']) {
      await followOrUnfollowUser(
        inProgress,
        user,
        userID,
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
        if (user.followed_users.includes(userID)) {
          draft.followersCount--;
          return;
        }
        draft.followersCount++;
      });
    }

    return (
      <StyledPopover style={{ top: positionY, left: positionX }}>
        <div className="top-row">
          <Avatar type="user" size={64} object={data as DetailedUser} />
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
          onClick={() => handleUserButtonClick(popoverUser)}
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
  } else if (type === 'category' && data) {
    const { name, followersCount, postsCount } = data as DetailedCategory;

    return (
      <StyledPopover style={{ top: positionY, left: positionX }}>
        <Avatar type="category" size={64} object={data as DetailedCategory} />
        <p>{name}</p>
        <p>Posts: {postsCount}</p>
        <p>Followers: {followersCount}</p>
        <StyledButton>FOLLOW</StyledButton>
      </StyledPopover>
    );
  }
}
export default Popover;
