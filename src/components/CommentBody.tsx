import { format, formatDistanceToNow } from 'date-fns';
import { LuDot } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { StyledCommentBody } from '../styles/PostDetailsPage.styled';
import type { Comment } from '../types';

type CommentBodyProps = {
  comment: Comment;
};

function CommentBody({ comment }: CommentBodyProps) {
  const { author, created_at, content } = comment;

  return (
    <StyledCommentBody>
      <div className="top-bar">
        <Link className="user-link" to={`/users/${author.username}`}>
          {author.username}
        </Link>
        <LuDot />
        <span className="date" title={format(created_at, 'HH:mm, dd/MM/yyyy')}>
          {formatDistanceToNow(created_at, { addSuffix: true })}{' '}
        </span>
      </div>
      <p className="content">{content}</p>
    </StyledCommentBody>
  );
}

export default CommentBody;
