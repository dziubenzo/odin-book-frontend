import { StyledCategory } from '../styles/AllCategoriesPage.styled';
import type { Category as CategoryType } from '../types';
import Avatar from './Avatar';
import CategoryBody from './CategoryBody';
import FollowCategoryButton from './FollowCategoryButton';

type CategoryProps = {
  category: CategoryType;
  handleCategoryButtonClick: (categoryID: CategoryType['_id']) => Promise<void>;
  inProgress: CategoryType['_id'] | null;
};

function Category({
  category,
  handleCategoryButtonClick,
  inProgress,
}: CategoryProps) {
  return (
    <StyledCategory>
      <Avatar object={category} size={50} type="category" />
      <CategoryBody category={category} />
      <FollowCategoryButton
        category={category}
        inProgress={inProgress}
        handleCategoryButtonClick={handleCategoryButtonClick}
      />
    </StyledCategory>
  );
}

export default Category;
