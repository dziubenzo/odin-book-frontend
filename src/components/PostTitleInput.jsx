import PropTypes from 'prop-types';
import { StyledPostTitleInput } from '../styles/NewPostPage.styled';
import { MIN_POST_TITLE_LENGTH, MAX_POST_TITLE_LENGTH } from '../helpers';

function PostTitleInput({ title, setTitle }) {
  return (
    <StyledPostTitleInput>
      <label htmlFor="title">Post Title:</label>
      <input
        type="text"
        name="title"
        id="title"
        className={
          title.length < MIN_POST_TITLE_LENGTH ? 'short-title' : undefined
        }
        maxLength={MAX_POST_TITLE_LENGTH}
        defaultValue={title}
        onChange={(event) => setTitle(event.target.value)}
      />
    </StyledPostTitleInput>
  );
}

PostTitleInput.propTypes = {
  title: PropTypes.string,
  setTitle: PropTypes.func,
};

export default PostTitleInput;
