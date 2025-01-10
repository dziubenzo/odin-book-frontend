import { useUserAndTheme } from '../hooks';
import { StyledButton } from '../styles/WelcomePage.styled';
import type { DetailedCategory } from '../types';

type FollowCategoryButtonProps = {
  category: DetailedCategory;
  inProgress: DetailedCategory['_id'] | null;
  handleCategoryButtonClick: (
    categoryID: DetailedCategory['_id'],
  ) => Promise<void>;
};

function FollowCategoryButton({
  category,
  inProgress,
  handleCategoryButtonClick,
}: FollowCategoryButtonProps) {
  const { user } = useUserAndTheme();
  const { followed_categories } = user;
  const { _id: categoryID } = category;

  return (
    <StyledButton
      className="follow-button"
      onClick={() => handleCategoryButtonClick(categoryID)}
    >
      {inProgress === categoryID
        ? 'Changing...'
        : followed_categories.includes(categoryID)
          ? 'Unfollow'
          : 'Follow'}
    </StyledButton>
  );
}

export default FollowCategoryButton;
