import { StyledNewCategoryPage } from '../styles/NewCategoryPage.styled';
import AvatarUploader from '../components/AvatarUploader';
import { useState } from 'react';
import {
  MAX_CATEGORY_DESCRIPTION_LENGTH,
  MAX_CATEGORY_NAME_LENGTH,
  defaultCategoryIcon,
} from '../helpers';
import { StyledButton } from '../styles/WelcomePage.styled';
import NewCategoryInputs from '../components/NewCategoryInputs';

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
      <NewCategoryInputs
        nameLength={nameLength}
        descriptionLength={descriptionLength}
        setName={setName}
        setNameLength={setNameLength}
        setDescription={setDescription}
        setDescriptionLength={setDescriptionLength}
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
      <StyledButton className="create-category-button">
        Create Category
      </StyledButton>
    </StyledNewCategoryPage>
  );
}

export default NewCategoryPage;
