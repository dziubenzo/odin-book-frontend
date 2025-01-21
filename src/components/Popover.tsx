import { useFetchPageData } from '../hooks';
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
} & (UserPopover | CategoryPopover);

function Popover({ type, query, positionX, positionY }: PopoverProps) {
  const { data, loading, error } = useFetchPageData<
    DetailedUser | DetailedCategory
  >(query);

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
      username,
      postsCount,
      followersCount,
      commentsCount,
      followed_users,
    } = data as DetailedUser;

    return (
      <StyledPopover style={{ top: positionY, left: positionX }}>
        <div className="top-row">
          <Avatar type="user" size={96} object={data as DetailedUser} />
          <p>{username}</p>
        </div>
        <p>Posts: {postsCount}</p>
        <p>Followers: {followersCount}</p>
        <p>Following: {followed_users.length}</p>
        <p>Comments: {commentsCount}</p>
      </StyledPopover>
    );
  } else if (type === 'category' && data) {
    const { name, followersCount, postsCount } = data as DetailedCategory;

    return (
      <StyledPopover style={{ top: positionY, left: positionX }}>
        <Avatar type="category" size={96} object={data as DetailedCategory} />
        <p>{name}</p>
        <p>Posts: {postsCount}</p>
        <p>Followers: {followersCount}</p>
        <StyledButton>FOLLOW</StyledButton>
      </StyledPopover>
    );
  }
}
export default Popover;
