import { StyledComments } from '../styles/PostDetailsPage.styled';
import type { Comment as CommentType } from '../types';
import Comment from './Comment';
import NoCommentsSection from './NoCommentsSection';

type CommentsProps = {
  comments: CommentType[];
  handleCommentLikeClick: (commentID: CommentType['_id']) => Promise<void>;
  handleCommentDislikeClick: (commentID: CommentType['_id']) => Promise<void>;
  inProgress: boolean;
};

function Comments({
  comments,
  handleCommentLikeClick,
  handleCommentDislikeClick,
  inProgress,
}: CommentsProps) {
  function renderComments() {
    return comments.map((comment) => {
      return (
        <Comment
          key={comment._id}
          comment={comment}
          handleCommentLikeClick={handleCommentLikeClick}
          handleCommentDislikeClick={handleCommentDislikeClick}
          inProgress={inProgress}
        />
      );
    });
  }

  return (
    <StyledComments>
      <h2>Comments ({comments.length})</h2>
      {renderComments()}
      {comments.length === 0 && <NoCommentsSection />}
    </StyledComments>
  );
}

export default Comments;
