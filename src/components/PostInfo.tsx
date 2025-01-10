import { format, formatDistanceToNow } from 'date-fns';
import { FaRegCommentAlt } from 'react-icons/fa';
import { LuDot } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { StyledPostInfoPostDetails } from '../styles/PostDetailsPage.styled';
import { StyledPostInfo } from '../styles/PostsPage.styled';
import { Post } from '../types';
import Avatar from './Avatar';

type PostInfoProps = {
  post: Post;
  isPostInfoPostDetails: boolean;
};

function PostInfo({ post, isPostInfoPostDetails }: PostInfoProps) {
  const { author, created_at, category, comments } = post;

  const info = (
    <>
      <div className="post-author">
        <Avatar object={author} size={14.4} type="user" />
        <Link to={`/users/${author.username}`} className="user-link">
          {author.username}
        </Link>
      </div>
      <LuDot />
      <span
        className="post-date"
        title={format(created_at, 'HH:mm, dd/MM/yyyy')}
      >
        {formatDistanceToNow(created_at, { addSuffix: true })}{' '}
      </span>
      <LuDot />
      <Link to={`/categories/${category.slug}`} className="category-link">
        {category.name}
      </Link>
      <LuDot />
      <div className="post-comments">
        <p className="comments-count" data-testid="comments-count">
          {comments.length}
        </p>
        <FaRegCommentAlt />
      </div>
    </>
  );

  if (isPostInfoPostDetails) {
    return <StyledPostInfoPostDetails>{info}</StyledPostInfoPostDetails>;
  }

  return <StyledPostInfo>{info}</StyledPostInfo>;
}

export default PostInfo;
