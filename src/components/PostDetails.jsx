import PropTypes from 'prop-types';
import {
  StyledPostDetails,
  StyledPostInfoPostDetails,
} from '../styles/PostDetailsPage.styled';
import PostLikes from './PostLikes';
import PostInfo from './PostInfo';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function PostDetails({
  post,
  user,
  handlePostLikeClick,
  handlePostDislikeClick,
}) {
  const navigate = useNavigate();

  return (
    <StyledPostDetails>
      <div className="return-icon-wrapper" onClick={() => navigate('/posts')}>
        <IoChevronBack />
      </div>
      <div className="post-body">
        <div className="post-top-bar">
          <h2 className="post-title">{post.title}</h2>
          <PostLikes
            post={post}
            user={user}
            handlePostLikeClick={handlePostLikeClick}
            handlePostDislikeClick={handlePostDislikeClick}
          />
        </div>
        <p className="post-content">{post.content}</p>
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
