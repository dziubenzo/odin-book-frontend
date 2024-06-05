import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaRegCommentAlt } from 'react-icons/fa';
import { LuDot } from 'react-icons/lu';
import { format, formatDistanceToNow } from 'date-fns';
import { StyledPostBody } from '../styles/AllPostsPage.styled';

function PostBody({ post }) {
  const { slug, title, content, author, created_at, category, comments } = post;

  return (
    <StyledPostBody>
      <Link to={`/posts/${slug}`}>
        <p className="post-title">{title}</p>
        <p className="post-content">{content}</p>
      </Link>
      <div className="post-info">
        <Link to={`/users/${author.username}`} className="user-link">
          {author.username}
        </Link>
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
        <span className="post-comments">
          {comments.length} <FaRegCommentAlt />
        </span>
      </div>
    </StyledPostBody>
  );
}

PostBody.propTypes = {
  post: PropTypes.object,
};

export default PostBody;
