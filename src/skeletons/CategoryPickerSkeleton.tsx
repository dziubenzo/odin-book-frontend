import { StyledCategoryPicker } from '../styles/NewPostPage.styled';

function CategoryPickerSkeleton() {
  return (
    <StyledCategoryPicker>
      <label htmlFor="category">Category:</label>
      <select name="category" id="category" className="skeleton">
        <option>--CHOOSE CATEGORY--</option>
      </select>
      <label htmlFor="followed-categories">Followed Categories Only?</label>
      <div className="checkbox-skeleton"></div>
    </StyledCategoryPicker>
  );
}

export default CategoryPickerSkeleton;
