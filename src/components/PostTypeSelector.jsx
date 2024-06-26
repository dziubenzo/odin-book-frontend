import PropTypes from 'prop-types';
import { StyledPostTypeSelector } from '../styles/NewPostPage.styled';

function PostTypeSelector({ postType, setPostType }) {
  return (
    <StyledPostTypeSelector>
      <button
        className={postType === 'text' ? 'selected left' : 'left'}
        onClick={() => setPostType('text')}
      >
        Text
      </button>
      <button
        className={postType === 'image' ? 'selected' : undefined}
        onClick={() => setPostType('image')}
      >
        Image
      </button>
      <button
        className={postType === 'video' ? 'selected right' : 'right'}
        onClick={() => setPostType('video')}
      >
        Video
      </button>
    </StyledPostTypeSelector>
  );
}
PostTypeSelector.propTypes = {
  postType: PropTypes.string,
  setPostType: PropTypes.func,
};

export default PostTypeSelector;
