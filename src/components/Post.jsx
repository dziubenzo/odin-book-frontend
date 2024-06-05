import PropTypes from 'prop-types';
import { StyledPost } from '../styles/AllPostsPage.styled';
import PostLikes from './PostLikes';
import PostBody from './PostBody';

function Post({ post, user, handleLikeClick, handleDislikeClick }) {
  return (
    <StyledPost>
      <PostLikes
        post={post}
        user={user}
        handleLikeClick={handleLikeClick}
        handleDislikeClick={handleDislikeClick}
      />
      <PostBody post={post} />
    </StyledPost>
  );
}

Post.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
  handleLikeClick: PropTypes.func,
  handleDislikeClick: PropTypes.func,
};

export default Post;
