import { StyledComment } from '../styles/PostDetailsPage.styled';
import type { Comment as CommentType } from '../types';
import Avatar from './Avatar';
import CommentBody from './CommentBody';
import CommentLikes from './CommentLikes';

type CommentProps = {
  comment: CommentType;
  handleCommentLikeClick: (commentID: CommentType['_id']) => Promise<void>;
  handleCommentDislikeClick: (commentID: CommentType['_id']) => Promise<void>;
};

function Comment({
  comment,
  handleCommentLikeClick,
  handleCommentDislikeClick,
}: CommentProps) {
  return (
    <StyledComment>
      <Avatar object={comment.author} size={36} type="user" />
      <CommentBody comment={comment} />
      <CommentLikes
        comment={comment}
        handleCommentLikeClick={handleCommentLikeClick}
        handleCommentDislikeClick={handleCommentDislikeClick}
      />
    </StyledComment>
  );
}

export default Comment;
