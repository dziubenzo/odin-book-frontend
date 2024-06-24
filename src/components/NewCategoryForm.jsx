import PropTypes from 'prop-types';
import { StyledNewCategoryForm } from '../styles/NewCategoryPage.styled';
import {
  MIN_CATEGORY_NAME_LENGTH,
  MIN_CATEGORY_DESCRIPTION_LENGTH,
  MAX_CATEGORY_DESCRIPTION_LENGTH,
  MAX_CATEGORY_NAME_LENGTH,
} from '../helpers';

function NewCategoryForm({
  nameLength,
  descriptionLength,
  setName,
  setNameLength,
  setDescription,
  setDescriptionLength,
  onSubmit,
}) {
  return (
    <StyledNewCategoryForm id="new-category-form" onSubmit={onSubmit}>
      <h1 className="top-header">New Category</h1>
      <label htmlFor="name">
        Name (
        {nameLength !== 1
          ? `${nameLength} characters `
          : `${nameLength} character `}
        left):
      </label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        minLength={MIN_CATEGORY_NAME_LENGTH}
        maxLength={MAX_CATEGORY_NAME_LENGTH}
        required
        onChange={(event) => {
          setName(event.target.value);
          setNameLength(MAX_CATEGORY_NAME_LENGTH - event.target.value.length);
        }}
      />
      <label htmlFor="description">
        Description (
        {descriptionLength !== 1
          ? `${descriptionLength} characters `
          : `${descriptionLength} character `}
        left):
      </label>
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        rows={6}
        minLength={MIN_CATEGORY_DESCRIPTION_LENGTH}
        maxLength={MAX_CATEGORY_DESCRIPTION_LENGTH}
        required
        onInput={(event) => {
          setDescription(event.target.value);
          setDescriptionLength(
            MAX_CATEGORY_DESCRIPTION_LENGTH - event.target.value.length,
          );
        }}
      />
    </StyledNewCategoryForm>
  );
}

NewCategoryForm.propTypes = {
  nameLength: PropTypes.number,
  descriptionLength: PropTypes.number,
  setName: PropTypes.func,
  setNameLength: PropTypes.func,
  setDescription: PropTypes.func,
  setDescriptionLength: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default NewCategoryForm;
