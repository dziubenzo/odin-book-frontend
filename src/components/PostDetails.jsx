import PropTypes from 'prop-types';
import {
  StyledPostDetails,
  StyledPostInfoPostDetails,
} from '../styles/PostDetailsPage.styled';
import PostLikes from './PostLikes';
import PostInfo from './PostInfo';
import parse from 'html-react-parser';

function PostDetails({
  post,
  user,
  handlePostLikeClick,
  handlePostDislikeClick,
}) {
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
            post={post}
            user={user}
            handlePostLikeClick={handlePostLikeClick}
            handlePostDislikeClick={handlePostDislikeClick}
          />
        </div>
        <div className="post-content">{wrapPostContent()}</div>
      </div>
      <PostInfo post={post} StyledComponent={StyledPostInfoPostDetails} />
      <hr />
    </StyledPostDetails>
  );
}

PostDetails.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
  handlePostLikeClick: PropTypes.func,
  handlePostDislikeClick: PropTypes.func,
};

export default PostDetails;
