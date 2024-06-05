import PropTypes from 'prop-types';
import { FaArrowUp } from 'react-icons/fa';
import { StyledPostLikes } from '../styles/AllPostsPage.styled';

function PostLikes({ post, user }) {
  const { likes } = post;

  return (
    <StyledPostLikes>
      <div className="like-icon-wrapper">
        <FaArrowUp
          className={likes.includes(user._id) ? 'like-icon liked' : 'like-icon'}
        />
      </div>
      <p className="likes-count">{likes.length}</p>
    </StyledPostLikes>
  );
}

PostLikes.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
};

export default PostLikes;
