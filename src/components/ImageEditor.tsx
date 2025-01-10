import { useState } from 'react';
import { isValidImageURL } from '../helpers';
import {
  StyledImageEditor,
  StyledLinkInput,
} from '../styles/NewPostPage.styled';
import ImageUploader from './ImageUploader';

type ImageEditorProps = {
  imageURL: string;
  imageFile: File | null;
  setImageURL: React.Dispatch<React.SetStateAction<string>>;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
};

function ImageEditor({
  imageURL,
  imageFile,
  setImageURL,
  setImageFile,
}: ImageEditorProps) {
  const [imageFilePreview, setImageFilePreview] = useState('');

  return (
    <StyledImageEditor>
      {!imageFile && (
        <StyledLinkInput>
          <label htmlFor="image_url">Image URL:</label>
          <input
            type="url"
            className={!isValidImageURL(imageURL) ? 'invalid-link' : undefined}
            name="image_url"
            id="image_url"
            title={
              'Supported file formats: .avif | .jpg | .jpeg | .gif | .png | .webp'
            }
            placeholder={
              'Supported file formats: .avif | .jpg | .jpeg | .gif | .png | .webp'
            }
            onChange={(event) => {
              setImageURL(event.target.value);
            }}
            value={imageURL}
          />
        </StyledLinkInput>
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

export default ImageEditor;
