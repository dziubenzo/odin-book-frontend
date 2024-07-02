import PropTypes from 'prop-types';
import { StyledImageEditor } from '../styles/NewPostPage.styled';
import { isValidImageURL } from '../helpers';
import ImageUploader from './ImageUploader';
import { useState } from 'react';

function ImageEditor({ imageURL, imageFile, setImageURL, setImageFile }) {
  const [imageFilePreview, setImageFilePreview] = useState('');

  return (
    <StyledImageEditor>
      {!imageFile && (
        <div className="link-input-wrapper">
          <label htmlFor="image_url">Image URL:</label>
          <input
            type="url"
            name="image_url"
            id="image_url"
            title={
              'Supported file formats: .avif | .jpg | .jpeg | .gif | .png | .webp'
            }
            onChange={(event) => {
              setImageURL(event.target.value);
            }}
            value={imageURL}
          />
        </div>
      )}
      <ImageUploader
        imageFile={imageFile}
        setImageFile={setImageFile}
        setImageFilePreview={setImageFilePreview}
        setImageURL={setImageURL}
      />
      {(isValidImageURL(imageURL) || imageFilePreview) && (
        <div className="image-preview-wrapper">
          <h2>Image Preview:</h2>
          <img src={imageURL || imageFilePreview} alt="Image Preview" />
        </div>
      )}
    </StyledImageEditor>
  );
}

ImageEditor.propTypes = {
  imageURL: PropTypes.string,
  imageFile: PropTypes.object,
  setImageURL: PropTypes.func,
  setImageFile: PropTypes.func,
};

export default ImageEditor;
