import { StyledPostTypeSelector } from '../styles/NewPostPage.styled';
import type { PostType } from '../types';

type PostTypeSelectorProps = {
  postType: PostType;
  setPostType: React.Dispatch<React.SetStateAction<PostType>>;
};

function PostTypeSelector({ postType, setPostType }: PostTypeSelectorProps) {
  return (
    <StyledPostTypeSelector data-testid={'post-type-selector'}>
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

export default PostTypeSelector;
