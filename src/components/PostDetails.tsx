import parse from 'html-react-parser';
import { StyledPostDetails } from '../styles/PostDetailsPage.styled';
import type { DetailedPost } from '../types';
import PostInfo from './PostInfo';
import PostLikes from './PostLikes';

type PostDetailsProps = {
  post: DetailedPost;
  handlePostLikeClick: () => Promise<void>;
  handlePostDislikeClick: () => Promise<void>;
  inProgress: boolean;
};

function PostDetails({
  post,
  handlePostLikeClick,
  handlePostDislikeClick,
  inProgress,
}: PostDetailsProps) {
  const { title, content } = post;

  // Wrap image post in <a> for the image to be opened in new tab on click
  // Otherwise do not do nothing
  function wrapPostContent() {
    if (content.startsWith('<img')) {
      const splitContent = content.split('"');
      const imageSrc = splitContent[3];
      return (
        <a href={imageSrc} target="_blank" title="Open image in new tab">
          {parse(content)}
        </a>
      );
    }
    return parse(content);
  }

  return (
    <StyledPostDetails>
      <div className="post-body">
        <div className="post-top-bar">
          <h2 className="post-title">{title}</h2>
          <PostLikes
            type="single-post"
            post={post}
            handlePostLikeClick={handlePostLikeClick}
            handlePostDislikeClick={handlePostDislikeClick}
            inProgress={inProgress}
          />
        </div>
        <div className="post-content">{wrapPostContent()}</div>
      </div>
      <PostInfo post={post} isPostInfoPostDetails={true} />
      <hr />
    </StyledPostDetails>
  );
}

export default PostDetails;
