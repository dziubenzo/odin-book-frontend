import { allowedImageFormats } from '../constants';
import { StyledImageUploader } from '../styles/NewPostPage.styled';
import { StyledButton } from '../styles/WelcomePage.styled';

type ImageUploaderProps = {
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  setImageFilePreview: React.Dispatch<React.SetStateAction<string>>;
  setImageURL: React.Dispatch<React.SetStateAction<string>>;
};

function ImageUploader({
  imageFile,
  setImageFile,
  setImageFilePreview,
  setImageURL,
}: ImageUploaderProps) {
  function uploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    if (event.target.files[0]) {
      // Make sure the file attached is an image in the allowed format
      // On Linux, you can attach anything despite the accept attribute being set
      if (!allowedImageFormats.includes(event.target.files[0].type)) {
        return;
      }
      setImageFile(event.target.files[0]);
      setImageFilePreview(URL.createObjectURL(event.target.files[0]));
      setImageURL('');
    }
  }

  function clearUploadedImage() {
    setImageFile(null);
    setImageFilePreview('');
  }

  return (
    <StyledImageUploader>
      {!imageFile && (
        <div className="image-uploader">
          <label className="image-picker" htmlFor="image" tabIndex={0}>
            Or Upload Image From File
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            data-testid="image-picker"
            onChange={uploadImage}
          />
        </div>
      )}
      {imageFile && (
        <div className="clear-image-button-wrapper">
          <StyledButton
            className="clear-image-button"
            onClick={clearUploadedImage}
          >
            Clear Uploaded Image
          </StyledButton>
        </div>
      )}
    </StyledImageUploader>
  );
}

export default ImageUploader;
