import { format, formatDistanceToNowStrict } from 'date-fns';
import { LuDot } from 'react-icons/lu';
import { StyledCommentBody } from '../styles/PostDetailsPage.styled';
import type { Comment } from '../types';
import DetailsLink from './DetailsLink';

type CommentBodyProps = {
  comment: Comment;
};

function CommentBody({ comment }: CommentBodyProps) {
  const { author, created_at, content } = comment;

  return (
    <StyledCommentBody>
      <div className="top-bar">
        <DetailsLink type="user" username={author.username} />
        <LuDot />
        <span className="date" title={format(created_at, 'HH:mm, dd/MM/yyyy')}>
          {formatDistanceToNowStrict(created_at, { addSuffix: true })}{' '}
        </span>
      </div>
      <p className="content">{content}</p>
    </StyledCommentBody>
  );
}

export default CommentBody;
