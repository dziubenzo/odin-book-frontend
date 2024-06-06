import PropTypes from 'prop-types';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { StyledPostLikes } from '../styles/AllPostsPage.styled';

function PostLikes({ post, user, handleLikeClick, handleDislikeClick }) {
  const { likes, dislikes } = post;

  return (
    <StyledPostLikes>
      <div
        className="like-icon-wrapper"
        title="Like Post"
        onClick={() => handleLikeClick(post)}
      >
        <FaArrowUp
          className={likes.includes(user._id) ? 'like-icon liked' : 'like-icon'}
          data-testid="up-arrow"
        />
      </div>
      <p className="likes-count" data-testid="likes-count">
        {likes.length - dislikes.length}
      </p>
      <div
        className="dislike-icon-wrapper"
        title="Dislike Post"
        onClick={() => handleDislikeClick(post)}
      >
        <FaArrowDown
          className={
            dislikes.includes(user._id)
              ? 'dislike-icon disliked'
              : 'dislike-icon'
          }
          data-testid="down-arrow"
        />
      </div>
    </StyledPostLikes>
  );
}

PostLikes.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
  handleLikeClick: PropTypes.func,
  handleDislikeClick: PropTypes.func,
};

export default PostLikes;
