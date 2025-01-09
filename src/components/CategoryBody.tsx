import { Link } from 'react-router-dom';
import { StyledCategoryBody } from '../styles/AllCategoriesPage.styled';
import type { Category } from '../types';

type CategoryBodyProps = {
  category: Category;
};

function CategoryBody({ category }: CategoryBodyProps) {
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

export default CategoryBody;
