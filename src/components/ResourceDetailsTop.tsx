import { format } from 'date-fns';
import { StyledResourceDetailsTop } from '../styles/PostsPage.styled';
import type { DetailedCategory, DetailedUser } from '../types';
import Avatar from './Avatar';

type CategoryDetailsTop = {
  resourceType: 'category';
  object: DetailedCategory;
};

type UserDetailsTop = {
  resourceType: 'user';
  object: DetailedUser;
};

type ResourceDetailsTopProps = CategoryDetailsTop | UserDetailsTop;

function ResourceDetailsTop({ resourceType, object }: ResourceDetailsTopProps) {
  if (resourceType === 'category') {
    const { name, created_at } = object;

    return (
      <StyledResourceDetailsTop>
        <Avatar object={object} size={100} type="category" />
        <h1 className="name">{name}</h1>
        <div className="date-wrapper">
          <p className="date">created</p>
          <span>{format(created_at, 'dd MMMM yyyy')}</span>
        </div>
      </StyledResourceDetailsTop>
    );
  } else {
    const { username, registered_at } = object;

    return (
      <StyledResourceDetailsTop>
        <Avatar object={object} size={100} type="user" />
        <h1 className="name">{username}</h1>
        <div className="date-wrapper">
          <p className="date">member since</p>
          <span>{format(registered_at, 'dd MMMM yyyy')}</span>
        </div>
      </StyledResourceDetailsTop>
    );
  }
}

export default ResourceDetailsTop;
