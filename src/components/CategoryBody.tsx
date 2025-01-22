import { StyledCategoryBody } from '../styles/AllCategoriesPage.styled';
import type { Category } from '../types';
import DetailsLink from './DetailsLink';

type CategoryBodyProps = {
  category: Category;
};

function CategoryBody({ category }: CategoryBodyProps) {
  const { slug, name, description } = category;

  return (
    <StyledCategoryBody>
      <DetailsLink type="category" name={name} slug={slug} />
      <p className="description">{description}</p>
    </StyledCategoryBody>
  );
}

export default CategoryBody;
