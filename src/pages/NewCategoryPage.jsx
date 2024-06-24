import { StyledNewCategoryPage } from '../styles/NewCategoryPage.styled';
import AvatarUploader from '../components/AvatarUploader';
import { useState } from 'react';
import {
  MAX_CATEGORY_DESCRIPTION_LENGTH,
  MAX_CATEGORY_NAME_LENGTH,
  MIN_CATEGORY_DESCRIPTION_LENGTH,
  MIN_CATEGORY_NAME_LENGTH,
  defaultCategoryIcon,
} from '../helpers';
import { StyledButton } from '../styles/WelcomePage.styled';

function NewCategoryPage() {
  const [uploadedIcon, setUploadedIcon] = useState('');
  const [uploadedIconPreview, setUploadedIconPreview] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameLength, setNameLength] = useState(MAX_CATEGORY_NAME_LENGTH);
  const [descriptionLength, setDescriptionLength] = useState(
    MAX_CATEGORY_DESCRIPTION_LENGTH,
  );

  return (
    <StyledNewCategoryPage>
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
        minLength={MIN_CATEGORY_DESCRIPTION_LENGTH}
        maxLength={MAX_CATEGORY_DESCRIPTION_LENGTH}
        rows={6}
        onInput={(event) => {
          setDescription(event.target.value);
          setDescriptionLength(
            MAX_CATEGORY_DESCRIPTION_LENGTH - event.target.value.length,
          );
        }}
      />
      <div className="icon-wrapper">
        {!uploadedIcon && (
          <div className="default-icon-wrapper">
            <h2 className='default-icon-heading'>Default Icon</h2>
            <img src={defaultCategoryIcon} alt="Default Category Icon" />
          </div>
        )}
        <div className="avatar-uploader-wrapper">
          <AvatarUploader
            type="Icon"
            uploadedAvatar={uploadedIcon}
            uploadedAvatarPreview={uploadedIconPreview}
            setUploadedAvatar={setUploadedIcon}
            setUploadedAvatarPreview={setUploadedIconPreview}
            setSelectedAvatar={() => {
              return;
            }}
          />
        </div>
      </div>
      <StyledButton className="create-category-button">
        Create Category
      </StyledButton>
    </StyledNewCategoryPage>
  );
}

export default NewCategoryPage;
