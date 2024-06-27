import PropTypes from 'prop-types';
import { StyledCategoryPicker } from '../styles/NewPostPage.styled';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

function CategoryPicker({ categories, setCategory }) {
  const [user] = useOutletContext();
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

  return (
    <StyledCategoryPicker>
      <label htmlFor="category">Category:</label>
      <select
        name="category"
        id="category"
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
        onChange={() => setCheckboxTicked(!checkboxTicked)}
      />
    </StyledCategoryPicker>
  );
}

CategoryPicker.propTypes = {
  categories: PropTypes.array,
  setCategory: PropTypes.func,
};

export default CategoryPicker;
