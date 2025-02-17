import { useState } from 'react';
import { useUserAndTheme } from '../hooks';
import { StyledCategoryPicker } from '../styles/NewPostPage.styled';
import type { Category } from '../types';

type CategoryPickerProps = {
  categories: Category[];
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

function CategoryPicker({
  categories,
  category,
  setCategory,
}: CategoryPickerProps) {
  const { user } = useUserAndTheme();
  const { followed_categories } = user;
  const [checkboxTicked, setCheckboxTicked] = useState(false);

  function renderCategoryOptions() {
    if (checkboxTicked) {
      return categories.map((category) => {
        if (followed_categories.includes(category._id))
          return (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          );
      });
    }
    return categories.map((category) => {
      return (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      );
    });
  }

  function handleFollowedCategoriesCheck() {
    setCheckboxTicked(!checkboxTicked);
    // Make sure to clear the category state if the previously selected category is not followed by the user
    if (!followed_categories.includes(category)) {
      setCategory('');
    }
  }

  return (
    <StyledCategoryPicker>
      <label htmlFor="category">Category:</label>
      <select
        name="category"
        id="category"
        defaultValue={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option key={'dummy'} value={''}>
          --CHOOSE CATEGORY--
        </option>
        {renderCategoryOptions()}
      </select>
      <label htmlFor="followed-categories">Followed Categories Only?</label>
      <input
        type="checkbox"
        name="followed-categories"
        id="followed-categories"
        onChange={handleFollowedCategoriesCheck}
      />
    </StyledCategoryPicker>
  );
}

export default CategoryPicker;
