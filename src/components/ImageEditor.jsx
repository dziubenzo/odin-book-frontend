import PropTypes from 'prop-types';
import { StyledImageEditor } from '../styles/NewPostPage.styled';
import { isValidImageURL } from '../helpers';

function ImageEditor({ imageURL, setImageURL }) {
  return (
    <StyledImageEditor>
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
      {isValidImageURL(imageURL) && (
        <div className="image-preview-wrapper">
          <h2>Image Preview:</h2>
          <img src={imageURL} alt="Image Preview" />
        </div>
      )}
    </StyledImageEditor>
  );
}

ImageEditor.propTypes = {
  imageURL: PropTypes.string,
  setImageURL: PropTypes.func,
};

export default ImageEditor;
