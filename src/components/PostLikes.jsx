import PropTypes from 'prop-types';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { StyledPostLikes } from '../styles/PostsPage.styled';

function PostLikes({
  post,
  user,
  handlePostLikeClick,
  handlePostDislikeClick,
}) {
  const { likes, dislikes } = post;

  return (
    <StyledPostLikes>
      <button
        className="like-icon"
        aria-label="Like Post Icon"
        title="Like Post"
        onClick={() => handlePostLikeClick(post)}
      >
        <FaArrowUp
          className={likes.includes(user._id) ? 'liked' : undefined}
          data-testid="up-arrow"
        />
      </button>
      <p className="likes-count" data-testid="likes-count">
        {likes.length - dislikes.length}
      </p>
      <button
        className="dislike-icon"
        aria-label="Dislike Post Icon"
        title="Dislike Post"
        onClick={() => handlePostDislikeClick(post)}
      >
        <FaArrowDown
          className={dislikes.includes(user._id) ? 'disliked' : undefined}
          data-testid="down-arrow"
        />
      </button>
    </StyledPostLikes>
  );
}

PostLikes.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
  handlePostLikeClick: PropTypes.func,
  handlePostDislikeClick: PropTypes.func,
};

export default PostLikes;
