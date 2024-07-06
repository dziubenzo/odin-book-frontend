import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { StyledResourceDetailsTop } from '../styles/PostsPage.styled';
import { format } from 'date-fns';

function ResourceDetailsTop({ resourceType, object }) {
  if (resourceType === 'category') {
    const { name, created_at } = object;

    return (
      <StyledResourceDetailsTop>
        <Avatar object={object} size={100} isCategory={true} />
        <h1 className="name">{name}</h1>
        <div className="date-wrapper">
          <p className="date">created</p>
          <span>{format(created_at, 'dd MMMM yyyy')}</span>
        </div>
      </StyledResourceDetailsTop>
    );
  }

  if (resourceType === 'user') {
    const { username, registered_at } = object;

    return (
      <StyledResourceDetailsTop>
        <Avatar object={object} size={100} isCategory={false} />
        <h1 className="name">{username}</h1>
        <div className="date-wrapper">
          <p className="date">member since</p>
          <span>{format(registered_at, 'dd MMMM yyyy')}</span>
        </div>
      </StyledResourceDetailsTop>
    );
  }
}

ResourceDetailsTop.propTypes = {
  resourceType: PropTypes.string,
  object: PropTypes.object,
};

export default ResourceDetailsTop;
