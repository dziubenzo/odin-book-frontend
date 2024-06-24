import { StyledNewCategoryPage } from '../styles/NewCategoryPage.styled';
import AvatarUploader from '../components/AvatarUploader';
import { useState } from 'react';
import {
  MAX_CATEGORY_DESCRIPTION_LENGTH,
  MAX_CATEGORY_NAME_LENGTH,
  createNewCategory,
  defaultCategoryIcon,
} from '../helpers';
import { StyledButton } from '../styles/WelcomePage.styled';
import NewCategoryForm from '../components/NewCategoryForm';
import { useNavigate } from 'react-router-dom';
import { MdOutlineErrorOutline } from 'react-icons/md';

function NewCategoryPage() {
  const navigate = useNavigate();

  const [uploadedIcon, setUploadedIcon] = useState('');
  const [uploadedIconPreview, setUploadedIconPreview] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameLength, setNameLength] = useState(MAX_CATEGORY_NAME_LENGTH);
  const [descriptionLength, setDescriptionLength] = useState(
    MAX_CATEGORY_DESCRIPTION_LENGTH,
  );
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState('');
  const [categoryCreated, setCategoryCreated] = useState(false);

  async function handleCreateCategoryClick(event) {
    event.preventDefault();
    await createNewCategory(
      inProgress,
      name,
      description,
      uploadedIcon,
      setInProgress,
      setError,
      setCategoryCreated,
      navigate,
    );
  }

  if (categoryCreated)
    return (
      <StyledNewCategoryPage>
        <div className="success-message-wrapper">
          <p>New category created successfully!</p>
          <p>Redirecting to the new category page...</p>
        </div>
      </StyledNewCategoryPage>
    );

  return (
    <StyledNewCategoryPage>
      <NewCategoryForm
        nameLength={nameLength}
        descriptionLength={descriptionLength}
        setName={setName}
        setNameLength={setNameLength}
        setDescription={setDescription}
        setDescriptionLength={setDescriptionLength}
        onSubmit={handleCreateCategoryClick}
      />
      <div className="icon-wrapper">
        {!uploadedIcon && (
          <div className="default-icon-wrapper">
            <h2 className="default-icon-heading">Default Icon</h2>
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
      <StyledButton
        type="submit"
        form="new-category-form"
        className="create-category-button"
      >
        {inProgress ? 'Creating New Category...' : 'Create Category'}
      </StyledButton>
      {error && (
        <div className="error-message-wrapper">
          <MdOutlineErrorOutline />
          <p>{error}</p>
        </div>
      )}
    </StyledNewCategoryPage>
  );
}

export default NewCategoryPage;
