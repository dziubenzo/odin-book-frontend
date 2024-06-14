import PropTypes from 'prop-types';
import { StyledAvatarUploader } from '../styles/ProfilePage.styled';
import { StyledButton } from '../styles/WelcomePage.styled';

function AvatarUploader({
  uploadedAvatar,
  uploadedAvatarPreview,
  setUploadedAvatar,
  setUploadedAvatarPreview,
  setSelectedAvatar,
}) {
  function uploadAvatar(event) {
    if (event.target.files[0]) {
      // Make sure the file attached is an image
      // On Linux, you can attach anything despite the accept attribute being set
      if (!event.target.files[0].type.includes('image')) {
        return;
      }
      setUploadedAvatar(event.target.files[0]);
      setUploadedAvatarPreview(URL.createObjectURL(event.target.files[0]));
      setSelectedAvatar('');
    }
  }

  function clearUploadedAvatar() {
    setUploadedAvatar('');
    setUploadedAvatarPreview('');
  }

  return (
    <StyledAvatarUploader>
      {!uploadedAvatar && (
        <div className="avatar-uploader">
          <label className="avatar-picker" htmlFor="avatar" tabIndex={0}>
            Upload Your Own Avatar
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            data-testid="avatar-picker"
            onChange={uploadAvatar}
          />
        </div>
      )}
      {uploadedAvatar && (
        <div className="avatar-preview">
          <div className="avatar-preview-left-side">
            <h2>Avatar Preview</h2>
            <img
              className="avatar-preview"
              src={uploadedAvatarPreview}
              data-testid="avatar-preview"
            />
          </div>
          <StyledButton
            className="clear-avatar-button"
            onClick={clearUploadedAvatar}
          >
            Clear Uploaded Avatar
          </StyledButton>
        </div>
      )}
    </StyledAvatarUploader>
  );
}

AvatarUploader.propTypes = {
  uploadedAvatar: PropTypes.any,
  uploadedAvatarPreview: PropTypes.any,
  setUploadedAvatar: PropTypes.func,
  setUploadedAvatarPreview: PropTypes.func,
  setSelectedAvatar: PropTypes.func,
};

export default AvatarUploader;
