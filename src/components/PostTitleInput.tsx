import { MAX_POST_TITLE_LENGTH, MIN_POST_TITLE_LENGTH } from '../constants';
import { StyledPostTitleInput } from '../styles/NewPostPage.styled';

type PostTitleInputProps = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

function PostTitleInput({ title, setTitle }: PostTitleInputProps) {
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

export default PostTitleInput;
