import PropTypes from 'prop-types';
import { StyledPost } from '../styles/PostsPage.styled';
import PostLikes from './PostLikes';
import PostBody from './PostBody';

function Post({ post, user, handlePostLikeClick, handlePostDislikeClick }) {
  return (
    <StyledPost>
      <PostLikes
        post={post}
        user={user}
        handlePostLikeClick={handlePostLikeClick}
        handlePostDislikeClick={handlePostDislikeClick}
      />
      <PostBody post={post} />
    </StyledPost>
  );
}

Post.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
  handlePostLikeClick: PropTypes.func,
  handlePostDislikeClick: PropTypes.func,
};

export default Post;
