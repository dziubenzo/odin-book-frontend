import PropTypes from 'prop-types';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { StyledPostLikes } from '../styles/AllPostsPage.styled';

function PostLikes({ post, user }) {
  const { likes, dislikes } = post;

  return (
    <StyledPostLikes>
      <div className="like-icon-wrapper">
        <FaArrowUp
          className={likes.includes(user._id) ? 'like-icon liked' : 'like-icon'}
        />
      </div>
      <p className="likes-count">{likes.length - dislikes.length}</p>
      <div className="dislike-icon-wrapper">
        <FaArrowDown
          className={
            dislikes.includes(user._id)
              ? 'dislike-icon disliked'
              : 'dislike-icon'
          }
        />
      </div>
    </StyledPostLikes>
  );
}

PostLikes.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
};

export default PostLikes;
