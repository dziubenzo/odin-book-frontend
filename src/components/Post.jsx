import PropTypes from 'prop-types';
import { StyledPost } from '../styles/AllPostsPage.styled';
import PostLikes from './PostLikes';
import PostBody from './PostBody';

function Post({ post, user }) {
  return (
    <StyledPost>
      <PostLikes post={post} user={user} />
      <PostBody post={post} />
    </StyledPost>
  );
}

Post.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
};

export default Post;
