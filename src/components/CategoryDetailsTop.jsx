import PropTypes from 'prop-types';
import Avatar from '../components/Avatar';
import { StyledCategoryDetailsTop } from '../styles/PostsPage.styled';
import { format } from 'date-fns';

function CategoryDetailsTop({ category }) {
  const { name, created_at } = category;

  return (
    <StyledCategoryDetailsTop>
      <Avatar object={category} size={100} isCategory={true} />
      <h1 className="name">{name}</h1>
      <div className="creation-date-wrapper">
        <p className="creation-date">created</p>
        <span>{format(created_at, 'dd MMMM yyyy')}</span>
      </div>
    </StyledCategoryDetailsTop>
  );
}

CategoryDetailsTop.propTypes = {
  category: PropTypes.object,
};

export default CategoryDetailsTop;
