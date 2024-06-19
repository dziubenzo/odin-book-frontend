import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { StyledCategoryBody } from '../styles/AllCategoriesPage.styled';

function CategoryBody({ category }) {
  const { slug, name, description } = category;

  return (
    <StyledCategoryBody>
      <Link to={`/categories/${slug}`}>
        <p className="name">{name}</p>
      </Link>
      <p className="description">{description}</p>
    </StyledCategoryBody>
  );
}

CategoryBody.propTypes = {
  category: PropTypes.object,
};

export default CategoryBody;
