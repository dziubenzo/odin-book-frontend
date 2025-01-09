import {
  MAX_CATEGORY_DESCRIPTION_LENGTH,
  MAX_CATEGORY_NAME_LENGTH,
  MIN_CATEGORY_DESCRIPTION_LENGTH,
  MIN_CATEGORY_NAME_LENGTH,
} from '../constants';
import { StyledNewCategoryForm } from '../styles/NewCategoryPage.styled';

type NewCategoryFormProps = {
  nameLength: number;
  descriptionLength: number;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setNameLength: React.Dispatch<React.SetStateAction<number>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setDescriptionLength: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

function NewCategoryForm({
  nameLength,
  descriptionLength,
  setName,
  setNameLength,
  setDescription,
  setDescriptionLength,
  onSubmit,
}: NewCategoryFormProps) {
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
        className={
          MAX_CATEGORY_NAME_LENGTH - nameLength < MIN_CATEGORY_NAME_LENGTH
            ? 'short-warning'
            : undefined
        }
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
        className={
          MAX_CATEGORY_DESCRIPTION_LENGTH - descriptionLength <
          MIN_CATEGORY_DESCRIPTION_LENGTH
            ? 'short-warning'
            : undefined
        }
        placeholder="Description"
        rows={6}
        minLength={MIN_CATEGORY_DESCRIPTION_LENGTH}
        maxLength={MAX_CATEGORY_DESCRIPTION_LENGTH}
        required
        onInput={(event) => {
          setDescription(event.currentTarget.value);
          setDescriptionLength(
            MAX_CATEGORY_DESCRIPTION_LENGTH - event.currentTarget.value.length,
          );
        }}
      />
    </StyledNewCategoryForm>
  );
}

export default NewCategoryForm;
