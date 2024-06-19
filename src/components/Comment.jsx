import PropTypes from 'prop-types';
import { StyledComment } from '../styles/PostDetailsPage.styled';
import { useOutletContext } from 'react-router-dom';
import CommentBody from './CommentBody';
import CommentLikes from './CommentLikes';
import Avatar from './Avatar';

function Comment({
  comment,
  handleCommentLikeClick,
  handleCommentDislikeClick,
}) {
  const [user] = useOutletContext();

  return (
    <StyledComment>
      <Avatar object={comment.author} size={36} />
      <CommentBody comment={comment} />
      <CommentLikes
        comment={comment}
        user={user}
        handleCommentLikeClick={handleCommentLikeClick}
        handleCommentDislikeClick={handleCommentDislikeClick}
      />
    </StyledComment>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
  handleCommentLikeClick: PropTypes.func,
  handleCommentDislikeClick: PropTypes.func,
};

export default Comment;
