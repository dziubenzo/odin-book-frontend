import PropTypes from 'prop-types';
import {
  StyledPostDetails,
  StyledPostInfoPostDetails,
} from '../styles/PostDetailsPage.styled';
import PostLikes from './PostLikes';
import PostInfo from './PostInfo';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

function PostDetails({
  post,
  user,
  handlePostLikeClick,
  handlePostDislikeClick,
}) {
  const navigate = useNavigate();
  const { title, content } = post;

  return (
    <StyledPostDetails>
      <div
        className="return-icon-wrapper"
        data-testid="return-icon"
        onClick={() => navigate('/posts')}
      >
        <IoChevronBack />
      </div>
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
        <div className="post-content">{parse(content)}</div>
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
