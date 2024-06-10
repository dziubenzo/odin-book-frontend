import PropTypes from 'prop-types';
import { StyledCommentAvatar } from '../styles/PostDetailsPage.styled';

function CommentAvatar({ avatar }) {
  return (
    <StyledCommentAvatar>
      <div className="avatar-placeholder">{avatar}</div>
    </StyledCommentAvatar>
  );
}

CommentAvatar.propTypes = {
  avatar: PropTypes.string,
};

export default CommentAvatar;
