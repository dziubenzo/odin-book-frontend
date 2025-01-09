import { StyledAvatarUploader } from '../styles/ProfilePage.styled';
import { StyledButton } from '../styles/WelcomePage.styled';

type IconType = {
  type: 'Icon';
  setSelectedAvatar: () => void;
};

type AvatarType = {
  type: 'Avatar';
  setSelectedAvatar: React.Dispatch<React.SetStateAction<string>>;
};

type AvatarUploaderProps = {
  uploadedAvatar: File | null;
  uploadedAvatarPreview: string;
  setUploadedAvatar: React.Dispatch<React.SetStateAction<File | null>>;
  setUploadedAvatarPreview: React.Dispatch<React.SetStateAction<string>>;
} & (IconType | AvatarType);

function AvatarUploader({
  type,
  uploadedAvatar,
  uploadedAvatarPreview,
  setUploadedAvatar,
  setUploadedAvatarPreview,
  setSelectedAvatar,
}: AvatarUploaderProps) {
  function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    if (event.target.files[0]) {
      // Make sure the file attached is an image
      // On Linux, you can attach anything despite the accept attribute being set
      if (!event.target.files[0].type.includes('image')) {
        return;
      }
      setUploadedAvatar(event.target.files[0]);
      setUploadedAvatarPreview(URL.createObjectURL(event.target.files[0]));
      if (type === 'Avatar') setSelectedAvatar('');
    }
  }

  function clearUploadedAvatar() {
    setUploadedAvatar(null);
    setUploadedAvatarPreview('');
  }

  return (
    <StyledAvatarUploader>
      {!uploadedAvatar && (
        <div className="avatar-uploader">
          <label className="avatar-picker" htmlFor="avatar" tabIndex={0}>
            Or Upload Your Own {type}
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
            <h2 className="avatar-preview-heading">{type} Preview</h2>
            <img
              className="avatar-preview"
              src={uploadedAvatarPreview}
              alt={`Uploaded ${type}`}
            />
          </div>
          <div className="clear-avatar-button-wrapper">
            <StyledButton
              className="clear-avatar-button"
              onClick={clearUploadedAvatar}
            >
              Clear Uploaded {type}
            </StyledButton>
          </div>
        </div>
      )}
    </StyledAvatarUploader>
  );
}

export default AvatarUploader;
