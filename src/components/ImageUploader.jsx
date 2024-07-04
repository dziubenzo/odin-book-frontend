import PropTypes from 'prop-types';
import { StyledImageUploader } from '../styles/NewPostPage.styled';
import { StyledButton } from '../styles/WelcomePage.styled';
import { allowedImageFormats } from '../helpers';

function ImageUploader({
  imageFile,
  setImageFile,
  setImageFilePreview,
  setImageURL,
}) {
  function uploadImage(event) {
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
    setImageFile('');
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

ImageUploader.propTypes = {
  imageFile: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  setImageFile: PropTypes.func,
  setImageFilePreview: PropTypes.func,
  setImageURL: PropTypes.func,
};

export default ImageUploader;
